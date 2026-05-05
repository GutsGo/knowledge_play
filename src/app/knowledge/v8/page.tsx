// app/knowledge/v8-garbage-collection/page.tsx
import Link from "next/link";
import {
  ArrowLeft,
  Recycle,
  Layers,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  HardDrive,
  Workflow,
  Timer,
  Trash2,
  Copy,
  Move,
  Eye,
  ChevronRight,
  Sparkles,
  Shield,
  ArrowRight,
  Database,
  Gauge,
  Braces,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "V8 垃圾回收机制详解 | 知识库",
  description: "深入理解 V8 引擎的分代垃圾回收、标记清除、增量标记、并发 GC 等核心机制",
};

/* ─── 小型可复用组件 ─── */

function GeometricBadge({
  color,
  icon: Icon,
  size = "md",
}: {
  color: "accent" | "secondary" | "tertiary" | "quaternary";
  icon: React.ElementType;
  size?: "sm" | "md" | "lg";
}) {
  const colorMap = {
    accent: { bg: "var(--accent)", border: "var(--accent)" },
    secondary: { bg: "var(--secondary)", border: "var(--secondary)" },
    tertiary: { bg: "var(--tertiary)", border: "var(--tertiary)" },
    quaternary: { bg: "var(--quaternary)", border: "var(--quaternary)" },
  };
  const sizeMap = { sm: "w-10 h-10", md: "w-12 h-12", lg: "w-14 h-14" };
  const iconSizeMap = { sm: 18, md: 22, lg: 26 };
  const c = colorMap[color];

  return (
    <div
      className={`${sizeMap[size]} rounded-xl flex items-center justify-center shrink-0`}
      style={{
        backgroundColor: `color-mix(in srgb, ${c.bg} 15%, white)`,
        border: `2px solid ${c.border}`,
      }}
    >
      <Icon size={iconSizeMap[size]} strokeWidth={2.5} style={{ color: c.bg }} />
    </div>
  );
}

function SectionTitle({
  children,
  color = "foreground",
  align = "left",
}: {
  children: React.ReactNode;
  color?: string;
  align?: "left" | "center";
}) {
  return (
    <h2
      className="font-outfit font-extrabold text-2xl md:text-3xl"
      style={{
        color: `var(--${color})`,
        textAlign: align,
      }}
    >
      {children}
    </h2>
  );
}

function Tag({ children, color }: { children: React.ReactNode; color: "accent" | "secondary" | "tertiary" | "quaternary" }) {
  const colorMap = {
    accent: { bg: "var(--accent)", text: "white" },
    secondary: { bg: "var(--secondary)", text: "white" },
    tertiary: { bg: "var(--tertiary)", text: "var(--foreground)" },
    quaternary: { bg: "var(--quaternary)", text: "white" },
  };
  const c = colorMap[color];
  return (
    <span
      className="inline-block px-3 py-1 rounded-full font-plus font-bold text-xs uppercase tracking-wider"
      style={{
        backgroundColor: c.bg,
        color: c.text,
        letterSpacing: "0.05em",
      }}
    >
      {children}
    </span>
  );
}

function MemoryBar({
  label,
  segments,
}: {
  label: string;
  segments: { color: string; width: string; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <span className="font-plus font-bold text-xs uppercase tracking-wider" style={{ color: "var(--foreground)" }}>
        {label}
      </span>
      <div
        className="flex h-8 rounded-lg overflow-hidden"
        style={{ border: "2px solid var(--foreground)" }}
      >
        {segments.map((seg, i) => (
          <div
            key={i}
            className="flex items-center justify-center font-plus font-bold text-[10px] text-white shrink-0"
            style={{
              backgroundColor: seg.color,
              width: seg.width,
            }}
          >
            {seg.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center py-2">
      <div className="flex items-center gap-1">
        <div className="w-8 h-0.5" style={{ backgroundColor: "var(--foreground)" }} />
        <ArrowRight size={18} strokeWidth={3} style={{ color: "var(--foreground)" }} />
      </div>
    </div>
  );
}

/* ─── 主页面 ─── */
export default function V8GarbageCollectionPage() {
  return (
    <div className="bg-dot-grid min-h-screen pb-24">
      <main className="container mt-10 space-y-16">
        {/* ═══ Hero 区域 ═══ */}
        <section className="relative animate-pop">
          {/* 背景装饰 Blob */}
          <div
            className="absolute -top-16 -right-16 w-64 h-64 -z-10 opacity-30"
            style={{
              backgroundColor: "var(--tertiary)",
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            }}
          />
          <div
            className="absolute top-20 -left-10 w-40 h-40 -z-10 opacity-20"
            style={{
              backgroundColor: "var(--secondary)",
              borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
            }}
          />

          <div
            className="p-8 md:p-12 rounded-3xl relative overflow-hidden"
            style={{
              backgroundColor: "var(--card)",
              border: "3px solid var(--foreground)",
              boxShadow: "12px 12px 0px 0px var(--accent)",
            }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* 左侧图标 */}
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--secondary))",
                  border: "3px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                <Recycle size={44} strokeWidth={2.5} color="white" />
              </div>

              {/* 右侧内容 */}
              <div className="space-y-4">
                <h1
                  className="font-outfit font-extrabold text-4xl md:text-5xl leading-tight"
                  style={{ color: "var(--foreground)" }}
                >
                  V8 引擎
                  <span className="block" style={{ color: "var(--accent)" }}>
                    垃圾回收机制详解
                  </span>
                </h1>
                <p
                  className="font-plus text-lg md:text-xl leading-relaxed max-w-2xl"
                  style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}
                >
                  从分代假说到 Orinoco 并发 GC，全面拆解 V8 如何在不阻塞主线程的前提下，
                  高效回收数百万 JavaScript 对象所占用的内存。
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full font-plus font-bold text-sm"
                    style={{
                      backgroundColor: "var(--background)",
                      border: "2px solid var(--border)",
                    }}
                  >
                    <Clock size={16} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
                    阅读约 18 分钟
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full font-plus font-bold text-sm"
                    style={{
                      backgroundColor: "var(--background)",
                      border: "2px solid var(--border)",
                    }}
                  >
                    <Cpu size={16} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
                    难度：高级
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 一、为什么需要垃圾回收 ═══ */}
        <section className="space-y-8 animate-slide" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-4">
            <GeometricBadge color="secondary" icon={AlertTriangle} />
            <SectionTitle>为什么需要垃圾回收？</SectionTitle>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 左：栈与堆 */}
            <div
              className="topic-card p-6 rounded-2xl space-y-4"
              style={{
                backgroundColor: "var(--card)",
                boxShadow: "8px 8px 0px 0px var(--foreground)",
              }}
            >
              <h3 className="font-outfit font-bold text-xl flex items-center gap-2">
                <Layers size={22} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
                栈内存 vs 堆内存
              </h3>

              {/* 栈内存 */}
              <div className="space-y-2">
                <span className="font-plus font-bold text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                  栈内存 (Stack)
                </span>
                <div
                  className="p-4 rounded-xl space-y-1"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--accent) 8%, white)",
                    border: "2px solid color-mix(in srgb, var(--accent) 30%, white)",
                  }}
                >
                  <p className="font-plus text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                    存储<strong>原始类型</strong>值和函数调用帧。由操作系统自动分配和回收，遵循
                    <strong> LIFO</strong>（后进先出）原则，速度极快。
                  </p>
                  <div className="flex gap-1 pt-1">
                    {["number", "string", "boolean", "null", "undefined"].map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md font-plus font-bold text-[11px]"
                        style={{
                          backgroundColor: "var(--accent)",
                          color: "white",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 堆内存 */}
              <div className="space-y-2">
                <span className="font-plus font-bold text-xs uppercase tracking-wider" style={{ color: "var(--secondary)" }}>
                  堆内存 (Heap)
                </span>
                <div
                  className="p-4 rounded-xl"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--secondary) 8%, white)",
                    border: "2px solid color-mix(in srgb, var(--secondary) 30%, white)",
                  }}
                >
                  <p className="font-plus text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                    存储<strong>引用类型</strong>对象（Object、Array、Function 等）。
                    内存由开发者分配（<code>new</code>），但<strong>无法手动释放</strong>，
                    必须依赖 GC 自动回收。这就是 V8 垃圾回收器的舞台。
                  </p>
                  <div className="flex gap-1 pt-1">
                    {["Object", "Array", "Function", "Map", "Set", "Symbol"].map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md font-plus font-bold text-[11px]"
                        style={{
                          backgroundColor: "var(--secondary)",
                          color: "white",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 右：内存生命周期 */}
            <div
              className="topic-card p-6 rounded-2xl space-y-4"
              style={{
                backgroundColor: "var(--card)",
                boxShadow: "8px 8px 0px 0px var(--tertiary)",
              }}
            >
              <h3 className="font-outfit font-bold text-xl flex items-center gap-2">
                <Workflow size={22} strokeWidth={2.5} style={{ color: "var(--tertiary)" }} />
                内存生命周期
              </h3>

              {[
                {
                  step: "1",
                  title: "分配 (Allocation)",
                  desc: "声明变量或创建对象时，V8 在堆中分配内存",
                  color: "var(--accent)",
                },
                {
                  step: "2",
                  title: "使用 (Usage)",
                  desc: "读写对象属性、调用方法、传递引用",
                  color: "var(--quaternary)",
                },
                {
                  step: "3",
                  title: "释放 (Release)",
                  desc: "当对象不再被任何可达路径引用时，GC 将其标记为可回收",
                  color: "var(--secondary)",
                },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-outfit font-extrabold text-lg shrink-0"
                      style={{
                        backgroundColor: item.color,
                        color: "white",
                        border: "2px solid var(--foreground)",
                        boxShadow: "3px 3px 0px 0px var(--foreground)",
                      }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-outfit font-bold text-base" style={{ color: "var(--foreground)" }}>
                        {item.title}
                      </h4>
                      <p className="font-plus text-sm mt-1" style={{ color: "color-mix(in srgb, var(--foreground) 65%, transparent)" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  {i < 2 && <FlowArrow />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 二、可达性 — GC 的判断依据 ═══ */}
        <section className="space-y-8 animate-slide" style={{ animationDelay: "0.15s" }}>
          <div className="flex items-center gap-4">
            <GeometricBadge color="quaternary" icon={Eye} />
            <SectionTitle>可达性 (Reachability) — GC 的核心判据</SectionTitle>
          </div>

          <div
            className="topic-card p-6 md:p-8 rounded-2xl space-y-6"
            style={{
              backgroundColor: "var(--card)",
              boxShadow: "8px 8px 0px 0px var(--quaternary)",
            }}
          >
            <p className="font-plus text-base leading-relaxed" style={{ color: "var(--foreground)" }}>
              V8 判断一个对象是否能被回收的标准是<strong>可达性</strong>——从
              <strong> GC Roots</strong> 出发，通过引用链能够访问到的对象就是「活的」。
              以下都是 GC Roots：
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "全局对象", desc: "window / globalThis", icon: Database, color: "var(--accent)" },
                { title: "调用栈中的变量", desc: "当前正在执行的函数中引用的对象", icon: Braces, color: "var(--secondary)" },
                { title: "DOM 引用", desc: "已挂载的 DOM 元素及事件监听器", icon: Shield, color: "var(--quaternary)" },
                { title: "闭包引用", desc: "未被销毁的闭包所捕获的外部变量", icon: Copy, color: "var(--tertiary)" },
                { title: "WeakRef / FinalizationRegistry", desc: "特殊弱引用机制（不阻止 GC）", icon: Eye, color: "var(--accent)" },
                { title: "内置对象", desc: "原生 JS 内置对象及引擎内部对象", icon: Cpu, color: "var(--secondary)" },
              ].map((root, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--background) 100%, transparent)",
                    border: "2px solid var(--border)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: root.color, border: "2px solid var(--foreground)" }}
                  >
                    <root.icon size={16} strokeWidth={2.5} color="white" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-sm" style={{ color: "var(--foreground)" }}>
                      {root.title}
                    </h4>
                    <p className="font-plus text-xs mt-0.5" style={{ color: "color-mix(in srgb, var(--foreground) 60%, transparent)" }}>
                      {root.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 可达性图示 */}
            <div
              className="p-5 rounded-xl"
              style={{
                backgroundColor: "color-mix(in srgb, var(--quaternary) 6%, white)",
                border: "2px dashed var(--quaternary)",
              }}
            >
              <p className="font-plus text-sm text-center leading-relaxed" style={{ color: "var(--foreground)" }}>
                <strong>GC Root</strong>
                <span style={{ color: "var(--quaternary)" }}> ──引用──▶ </span>
                <strong>对象 A</strong>
                <span style={{ color: "var(--quaternary)" }}> ──引用──▶ </span>
                <strong>对象 B</strong>
                <span style={{ color: "var(--tertiary)" }}> ──引用──▶ </span>
                <strong>对象 C</strong>
                &nbsp;&nbsp;✅ 均可达，不可回收
              </p>
              <p className="font-plus text-sm text-center mt-2" style={{ color: "color-mix(in srgb, var(--foreground) 50%, transparent)" }}>
                <strong>对象 D</strong>
                <span style={{ color: "var(--secondary)" }}> ──无引用──▶ </span>
                <strong style={{ color: "var(--secondary)" }}>❌ 孤岛，可回收</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 三、分代假说 ═══ */}
        <section className="space-y-8 animate-slide" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-4">
            <GeometricBadge color="tertiary" icon={Sparkles} />
            <SectionTitle>分代假说 (Generational Hypothesis)</SectionTitle>
          </div>

          <div
            className="topic-card p-6 md:p-8 rounded-2xl space-y-6"
            style={{
              backgroundColor: "var(--card)",
              boxShadow: "8px 8px 0px 0px var(--tertiary)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "var(--tertiary)", border: "2px solid var(--foreground)" }}
              >
                <Zap size={16} strokeWidth={2.5} color="var(--foreground)" />
              </div>
              <p className="font-plus text-base leading-relaxed" style={{ color: "var(--foreground)" }}>
                绝大多数对象的生命周期极短——它们「生来即死」。少数存活较久的对象往往会继续存活很久。
              </p>
            </div>

            {/* 堆内存分布可视化 */}
            <div className="space-y-5">
              <h3 className="font-outfit font-bold text-lg" style={{ color: "var(--foreground)" }}>
                V8 堆内存结构
              </h3>

              <div className="space-y-3">
                <MemoryBar
                  label="新生代 (Young Generation) ~1-8 MB"
                  segments={[
                    { color: "var(--accent)", width: "50%", label: "From Space" },
                    { color: "var(--secondary)", width: "50%", label: "To Space" },
                  ]}
                />
                <MemoryBar
                  label="老生代 (Old Generation) ~700MB - 1.4GB"
                  segments={[
                    { color: "var(--tertiary)", width: "30%", label: "Old Pointer" },
                    { color: "var(--quaternary)", width: "50%", label: "Old Data" },
                    { color: "#94A3B8", width: "20%", label: "Code" },
                  ]}
                />
                <MemoryBar
                  label="大对象空间 (Large Object Space)"
                  segments={[
                    { color: "#6366F1", width: "100%", label: "大于其他空间半页大小的对象" },
                  ]}
                />
                <MemoryBar
                  label="Map 空间 (Map Space)"
                  segments={[
                    { color: "#EC4899", width: "100%", label: "存放隐藏类 (Hidden Classes / Maps)" },
                  ]}
                />
              </div>
            </div>

            {/* 关键数据 */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { stat: "90%+", desc: "的对象在新生代就被回收", color: "var(--accent)" },
                { stat: "Scavenge", desc: "新生代回收算法，速度极快（< 1ms）", color: "var(--secondary)" },
                { stat: "Mark-Sweep", desc: "老生代回收算法，需要增量/并发优化", color: "var(--tertiary)" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="text-center p-5 rounded-xl"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${item.color} 10%, white)`,
                    border: `2px solid ${item.color}`,
                  }}
                >
                  <div
                    className="font-outfit font-extrabold text-2xl"
                    style={{ color: item.color }}
                  >
                    {item.stat}
                  </div>
                  <p className="font-plus text-xs mt-1" style={{ color: "var(--foreground)" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 四、新生代 GC：Scavenge 算法 ═══ */}
        <section className="space-y-8 animate-slide" style={{ animationDelay: "0.25s" }}>
          <div className="flex items-center gap-4">
            <GeometricBadge color="accent" icon={Zap} size="lg" />
            <SectionTitle color="accent">新生代 GC：Scavenge 算法</SectionTitle>
          </div>

          <div
            className="topic-card p-6 md:p-8 rounded-2xl space-y-8"
            style={{
              backgroundColor: "var(--card)",
              boxShadow: "10px 10px 0px 0px var(--accent)",
            }}
          >
            {/* 算法步骤可视化 */}
            <div className="space-y-4">
              <h3 className="font-outfit font-bold text-lg flex items-center gap-2">
                <StepLabel step="A" color="var(--accent)" />
                Semispace（半空间）算法流程
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div
                  className="p-5 rounded-xl space-y-3"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--accent) 8%, white)",
                    border: "2px solid var(--accent)",
                  }}
                >
                  <div
                    className="w-full h-24 rounded-lg flex items-center justify-center gap-2"
                    style={{ border: "2px dashed var(--accent)" }}
                  >
                    <div className="text-center">
                      <div className="flex gap-2 justify-center mb-1">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: "var(--accent)" }} />
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: "var(--accent)" }} />
                        <div className="w-4 h-4 rounded bg-gray-200" />
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: "var(--accent)" }} />
                        <div className="w-4 h-4 rounded bg-gray-200" />
                      </div>
                      <span className="font-plus font-bold text-[10px]" style={{ color: "var(--accent)" }}>
                        From Space
                      </span>
                    </div>
                  </div>
                  <h4 className="font-outfit font-bold text-sm">① 分配阶段</h4>
                  <p className="font-plus text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}>
                    新对象只在 <strong>From Space</strong> 中分配。To Space 处于空闲状态。
                    当 From Space 使用率达到 <strong>25%</strong> 时触发 Scavenge。
                  </p>
                </div>

                {/* Step 2 */}
                <div
                  className="p-5 rounded-xl space-y-3"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--secondary) 8%, white)",
                    border: "2px solid var(--secondary)",
                  }}
                >
                  <div
                    className="w-full h-24 rounded-lg flex items-center justify-center"
                    style={{ border: "2px dashed var(--secondary)" }}
                  >
                    <div className="text-center">
                      <div className="flex gap-2 justify-center mb-1">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: "var(--secondary)" }} />
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: "var(--secondary)" }} />
                        <div className="w-4 h-4 rounded bg-gray-200 line-through" />
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: "var(--secondary)" }} />
                        <div className="w-4 h-4 rounded bg-gray-200 line-through" />
                      </div>
                      <span className="font-plus font-bold text-[10px]" style={{ color: "var(--secondary)" }}>
                        From → 标记存活
                      </span>
                    </div>
                  </div>
                  <h4 className="font-outfit font-bold text-sm">② 标记 & 复制</h4>
                  <p className="font-plus text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}>
                    从 GC Roots 遍历，标记所有<strong>存活对象</strong>。
                    将存活对象<strong>复制</strong>到 To Space 并紧密排列（消除碎片）。
                    死亡对象被直接抛弃。
                  </p>
                </div>

                {/* Step 3 */}
                <div
                  className="p-5 rounded-xl space-y-3"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--quaternary) 8%, white)",
                    border: "2px solid var(--quaternary)",
                  }}
                >
                  <div
                    className="w-full h-24 rounded-lg flex items-center justify-center gap-3"
                    style={{ border: "2px dashed var(--quaternary)" }}
                  >
                    <div className="text-center">
                      <div className="flex gap-2 justify-center mb-1">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: "var(--quaternary)" }} />
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: "var(--quaternary)" }} />
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: "var(--quaternary)" }} />
                      </div>
                      <span className="font-plus font-bold text-[10px]" style={{ color: "var(--quaternary)" }}>
                        To Space ✓
                      </span>
                    </div>
                    <span className="font-plus font-bold text-lg" style={{ color: "var(--quaternary)" }}>⇄</span>
                    <div className="text-center">
                      <div className="flex gap-2 justify-center mb-1">
                        <div className="w-4 h-4 rounded bg-gray-100" />
                        <div className="w-4 h-4 rounded bg-gray-100" />
                        <div className="w-4 h-4 rounded bg-gray-100" />
                      </div>
                      <span className="font-plus font-bold text-[10px] text-gray-400">
                        From (清空)
                      </span>
                    </div>
                  </div>
                  <h4 className="font-outfit font-bold text-sm">③ 角色翻转</h4>
                  <p className="font-plus text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}>
                    From 和 To 交换角色。新的 From Space（原 To）继续服务分配。
                    存活次数达 <strong>2 次</strong>的对象将被<strong>晋升</strong>到老生代。
                  </p>
                </div>
              </div>
            </div>

            {/* 关键特征 */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ backgroundColor: "color-mix(in srgb, var(--accent) 6%, white)", border: "2px solid var(--border)" }}
              >
                <CheckCircle2 size={20} strokeWidth={2.5} style={{ color: "var(--accent)" }} className="shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-outfit font-bold text-sm">速度快</h4>
                  <p className="font-plus text-xs mt-1" style={{ color: "color-mix(in srgb, var(--foreground) 65%, transparent)" }}>
                    只处理存活对象，新生代 90%+ 对象是短命的，所以复制量极小。
                    典型耗时 <strong>&lt; 1ms</strong>。
                  </p>
                </div>
              </div>
              <div
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ backgroundColor: "color-mix(in srgb, var(--secondary) 6%, white)", border: "2px solid var(--border)" }}
              >
                <CheckCircle2 size={20} strokeWidth={2.5} style={{ color: "var(--secondary)" }} className="shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-outfit font-bold text-sm">无碎片</h4>
                  <p className="font-plus text-xs mt-1" style={{ color: "color-mix(in srgb, var(--foreground) 65%, transparent)" }}>
                    复制过程中对象被紧密排列，天然避免内存碎片化问题。
                    代价是空间利用率仅 <strong>50%</strong>。
                  </p>
                </div>
              </div>
              <div
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ backgroundColor: "color-mix(in srgb, var(--tertiary) 6%, white)", border: "2px solid var(--border)" }}
              >
                <AlertTriangle size={20} strokeWidth={2.5} style={{ color: "var(--tertiary)" }} className="shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-outfit font-bold text-sm">晋升条件</h4>
                  <p className="font-plus text-xs mt-1" style={{ color: "color-mix(in srgb, var(--foreground) 65%, transparent)" }}>
                    ① 经历过 2 次 Scavenge 仍存活 → 晋升老生代。<br />
                    ② To Space 内存占用超过 <strong>25%</strong> → 直接晋升。
                  </p>
                </div>
              </div>
              <div
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ backgroundColor: "color-mix(in srgb, var(--quaternary) 6%, white)", border: "2px solid var(--border)" }}
              >
                <AlertTriangle size={20} strokeWidth={2.5} style={{ color: "var(--quaternary)" }} className="shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-outfit font-bold text-sm">新变化：Orinoco</h4>
                  <p className="font-plus text-xs mt-1" style={{ color: "color-mix(in srgb, var(--foreground) 65%, transparent)" }}>
                    Orinoco 优化中使用了 <strong>Parallel Scavenge</strong>——在多个线程上并行执行复制，
                    进一步缩短停顿时间。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 五、老生代 GC ═══ */}
        <section className="space-y-8 animate-slide" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-4">
            <GeometricBadge color="tertiary" icon={HardDrive} size="lg" />
            <SectionTitle color="tertiary">老生代 GC：标记清除 & 标记整理</SectionTitle>
          </div>

          {/* Mark-Sweep */}
          <div
            className="topic-card p-6 md:p-8 rounded-2xl space-y-6"
            style={{
              backgroundColor: "var(--card)",
              boxShadow: "10px 10px 0px 0px var(--tertiary)",
            }}
          >
            <h3 className="font-outfit font-bold text-xl flex items-center gap-3">
              <span
                className="px-3 py-1 rounded-lg font-outfit font-extrabold text-sm"
                style={{ backgroundColor: "var(--tertiary)", color: "var(--foreground)", border: "2px solid var(--foreground)" }}
              >
                阶段一
              </span>
              Mark-Sweep（标记-清除）
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 标记阶段 */}
              <div className="space-y-3">
                <h4 className="font-outfit font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: "var(--accent)", border: "2px solid var(--foreground)" }} />
                  标记阶段 (Mark)
                </h4>
                <div
                  className="p-4 rounded-xl font-plus text-sm leading-relaxed space-y-2"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--accent) 6%, white)",
                    border: "2px solid color-mix(in srgb, var(--accent) 20%, white)",
                    color: "var(--foreground)",
                  }}
                >
                  <p>从所有 GC Roots 出发，递归遍历所有可达对象并<strong>标记为「活跃」</strong>。</p>
                  <p>V8 使用<strong>三色标记法</strong>：</p>
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: "var(--border)" }} />
                      <span className="font-bold text-xs">白色</span>
                      <span className="text-xs">——未访问的对象（潜在垃圾）</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      <span className="font-bold text-xs">灰色</span>
                      <span className="text-xs">——已访问，但子引用尚未扫描</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "var(--foreground)" }} />
                      <span className="font-bold text-xs">黑色</span>
                      <span className="text-xs">——已访问，且所有子引用已扫描完毕</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 清除阶段 */}
              <div className="space-y-3">
                <h4 className="font-outfit font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: "var(--secondary)", border: "2px solid var(--foreground)" }} />
                  清除阶段 (Sweep)
                </h4>
                <div
                  className="p-4 rounded-xl font-plus text-sm leading-relaxed"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--secondary) 6%, white)",
                    border: "2px solid color-mix(in srgb, var(--secondary) 20%, white)",
                    color: "var(--foreground)",
                  }}
                >
                  <p>
                    遍历整个老生代空间，回收所有<strong>未被标记</strong>的白色对象，
                    将其占用的内存归还到<strong>空闲链表 (Free List)</strong>中。
                  </p>
                  <p className="mt-2">
                    <strong>问题：</strong>清除后会产生<strong>内存碎片</strong>——
                    大量不连续的小空闲块无法存放较大的新对象。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mark-Compact */}
          <div
            className="topic-card p-6 md:p-8 rounded-2xl space-y-6"
            style={{
              backgroundColor: "var(--card)",
              boxShadow: "10px 10px 0px 0px var(--secondary)",
            }}
          >
            <h3 className="font-outfit font-bold text-xl flex items-center gap-3">
              <span
                className="px-3 py-1 rounded-lg font-outfit font-extrabold text-sm"
                style={{ backgroundColor: "var(--secondary)", color: "white", border: "2px solid var(--foreground)" }}
              >
                阶段二
              </span>
              Mark-Compact（标记-整理）
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-outfit font-bold flex items-center gap-2">
                  <Move size={20} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
                  整理过程
                </h4>
                <p className="font-plus text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                  在标记之后，将所有存活对象<strong>向一端移动</strong>，使它们在内存中连续排列。
                  这样就消除了内存碎片，但<strong>移动对象的代价很高</strong>（需要更新所有引用指针）。
                </p>
              </div>

              {/* 对比表 */}
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "2px solid var(--foreground)" }}
              >
                <table className="w-full font-plus text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "var(--foreground)" }}>
                      <th className="px-4 py-2 text-left text-white font-bold text-xs uppercase">特性</th>
                      <th className="px-4 py-2 text-left text-white font-bold text-xs uppercase">Mark-Sweep</th>
                      <th className="px-4 py-2 text-left text-white font-bold text-xs uppercase">Mark-Compact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["碎片", "有", "无"],
                      ["速度", "较快", "较慢"],
                      ["移动对象", "否", "是"],
                      ["场景", "空间充足", "需要整理"],
                    ].map(([label, sweep, compact], i) => (
                      <tr
                        key={i}
                        style={{
                          backgroundColor: i % 2 === 0 ? "var(--background)" : "var(--card)",
                        }}
                      >
                        <td className="px-4 py-2 font-bold">{label}</td>
                        <td className="px-4 py-2">{sweep}</td>
                        <td className="px-4 py-2">{compact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 六、全停顿问题 & V8 优化方案 ═══ */}
        <section className="space-y-8 animate-slide" style={{ animationDelay: "0.35s" }}>
          <div className="flex items-center gap-4">
            <GeometricBadge color="secondary" icon={Timer} size="lg" />
            <SectionTitle color="secondary">Stop-The-World 与 V8 优化演进</SectionTitle>
          </div>

          <div
            className="topic-card p-6 md:p-8 rounded-2xl space-y-6"
            style={{
              backgroundColor: "var(--card)",
              boxShadow: "10px 10px 0px 0px var(--secondary)",
            }}
          >
            <div
              className="p-5 rounded-xl flex items-start gap-4"
              style={{
                backgroundColor: "color-mix(in srgb, var(--secondary) 8%, white)",
                border: "2px solid var(--secondary)",
              }}
            >
              <AlertTriangle size={24} strokeWidth={2.5} style={{ color: "var(--secondary)" }} className="shrink-0 mt-1" />
              <div>
                <h3 className="font-outfit font-bold text-lg" style={{ color: "var(--foreground)" }}>
                  什么是 STW (Stop-The-World)？
                </h3>
                <p className="font-plus text-sm mt-2 leading-relaxed" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}>
                  传统的垃圾回收需要<strong>暂停所有 JavaScript 执行</strong>来保证内存一致性。
                  对于老生代（数百 MB 以上），全量标记-清除可能导致<strong>数百毫秒</strong>的停顿，
                  造成页面卡顿、动画掉帧、响应延迟。V8 的演进目标就是<strong>尽可能减少甚至消除 STW</strong>。
                </p>
              </div>
            </div>

            {/* 优化演进时间线 */}
            <div className="space-y-2">
              <h3 className="font-outfit font-bold text-lg">V8 GC 优化演进路线</h3>

              <div className="relative pl-8 space-y-6">
                {/* 时间轴线 */}
                <div
                  className="absolute left-3 top-0 bottom-0 w-0.5"
                  style={{ backgroundColor: "var(--border)" }}
                />

                {[
                  {
                    era: "V8 早期",
                    title: "Full Mark-Sweep / Mark-Compact",
                    desc: "全量 STW，老生代回收时间随内存线性增长。大堆场景下卡顿明显。",
                    color: "var(--foreground)",
                    tags: ["STW", "单线程"],
                  },
                  {
                    era: "2011",
                    title: "增量标记 (Incremental Marking)",
                    desc: "将标记工作拆成多个小步骤（每个约 5-10ms），穿插执行 JavaScript 代码。通过写屏障 (Write Barrier) 追踪标记期间的引用变更。",
                    color: "var(--accent)",
                    tags: ["增量", "写屏障"],
                  },
                  {
                    era: "2016",
                    title: "并发标记 (Concurrent Marking)",
                    desc: "标记工作在后台线程中并发执行，主线程继续运行 JS。这大幅减少了主线程的 GC 暂停时间。",
                    color: "var(--quaternary)",
                    tags: ["并发", "后台线程"],
                  },
                  {
                    era: "2018",
                    title: "并行清除 (Parallel Sweeping)",
                    desc: "清除阶段由多个辅助线程并行完成，每个线程负责一个内存页 (Page)。",
                    color: "var(--tertiary)",
                    tags: ["并行", "多线程"],
                  },
                  {
                    era: "2018+",
                    title: "Orinoco — 并行 Scavenge + 并发标记",
                    desc: "新生代 Scavenge 在主线程 + 辅助线程并行执行；老生代标记主要在并发线程完成。主线程 STW 暂停压缩到 <strong>5-10ms 以内</strong>。",
                    color: "var(--secondary)",
                    tags: ["Orinoco", "< 10ms"],
                  },
                  {
                    era: "持续优化",
                    title: "并发回收 (Concurrent Sweeping/Compaction)",
                    desc: "进一步将清扫和整理操作也并发化，正在持续推进中。",
                    color: "var(--accent)",
                    tags: ["未来", "全面并发"],
                  },
                ].map((item, i) => (
                  <div key={i} className="relative flex items-start gap-4">
                    {/* 时间节点 */}
                    <div
                      className="absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10"
                      style={{
                        backgroundColor: item.color,
                        border: "2px solid var(--foreground)",
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>

                    <div
                      className="flex-1 p-4 rounded-xl"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${item.color} 6%, white)`,
                        border: `2px solid color-mix(in srgb, ${item.color} 25%, white)`,
                      }}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-outfit font-extrabold text-xs uppercase tracking-wider" style={{ color: item.color }}>
                          {item.era}
                        </span>
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full font-plus font-bold text-[10px] uppercase"
                            style={{
                              backgroundColor: `color-mix(in srgb, ${item.color} 15%, white)`,
                              color: item.color,
                              border: `1px solid ${item.color}`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h4 className="font-outfit font-bold text-base" style={{ color: "var(--foreground)" }}>
                        {item.title}
                      </h4>
                      <p
                        className="font-plus text-sm mt-1 leading-relaxed"
                        style={{ color: "color-mix(in srgb, var(--foreground) 68%, transparent)" }}
                        dangerouslySetInnerHTML={{ __html: item.desc }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 七、写屏障与并发标记细节 ═══ */}
        <section className="space-y-8 animate-slide" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-4">
            <GeometricBadge color="accent" icon={Shield} />
            <SectionTitle>写屏障 (Write Barrier) — 并发标记的守护者</SectionTitle>
          </div>

          <div
            className="topic-card p-6 md:p-8 rounded-2xl space-y-6"
            style={{
              backgroundColor: "var(--card)",
              boxShadow: "8px 8px 0px 0px var(--accent)",
            }}
          >
            <p className="font-plus text-base leading-relaxed" style={{ color: "var(--foreground)" }}>
              当 GC 在后台线程进行并发标记时，JavaScript 主线程可能正在修改对象引用。
              如果一个已标记为黑色的对象新增了一个指向白色对象的引用，而标记线程已经扫描过它，
              这个白色对象就会被<strong>错误地回收</strong>。
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 解决方案 */}
              <div
                className="p-5 rounded-xl space-y-3"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--accent) 6%, white)",
                  border: "2px solid var(--accent)",
                }}
              >
                <h4 className="font-outfit font-bold text-base flex items-center gap-2">
                  <Shield size={18} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
                  Dijkstra 写屏障
                </h4>
                <p className="font-plus text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                  在<strong>每次写引用操作</strong>时（如 <code>obj.field = val</code>），
                  检查被写入的对象是否已经被标记为灰色或黑色。如果不是，将其标记为灰色（放入标记队列）。
                </p>
                <div
                  className="p-3 rounded-lg font-mono text-xs"
                  style={{
                    backgroundColor: "var(--foreground)",
                    color: "#E2E8F0",
                    border: "2px solid var(--foreground)",
                  }}
                >
                  <div>
                    <span style={{ color: "#F472B6" }}>function</span>{" "}
                    <span style={{ color: "#FBBF24" }}>writeBarrier</span>(obj, val) {"{"}
                  </div>
                  <div className="pl-4">
                    <span style={{ color: "#F472B6" }}>if</span> (obj.color === BLACK &amp;&amp;
                  </div>
                  <div className="pl-8">val.color === WHITE) {"{"}</div>
                  <div className="pl-12">
                    obj.color = <span style={{ color: "#8B5CF6" }}>GRAY</span>;
                  </div>
                  <div className="pl-12">
                    <span style={{ color: "#34D399" }}>marking_queue</span>.push(obj);
                  </div>
                  <div className="pl-8">{"}"}</div>
                  <div>{"}"}</div>
                </div>
              </div>

              {/* 副作用表 */}
              <div className="space-y-3">
                <h4 className="font-outfit font-bold text-base flex items-center gap-2">
                  <Eye size={18} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
                  对象丢失 (Object Lost) 问题
                </h4>
                <div
                  className="p-5 rounded-xl font-plus text-sm space-y-3"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--secondary) 6%, white)",
                    border: "2px solid color-mix(in srgb, var(--secondary) 20%, white)",
                    color: "var(--foreground)",
                  }}
                >
                  <p><strong>场景：</strong></p>
                  <div className="pl-3 border-l-2" style={{ borderColor: "var(--secondary)" }}>
                    <p>① 标记线程将 A 标记为黑色（已扫描完）</p>
                    <p>② JS 主线程执行 <code>A.ref = B</code>（B 是白色未标记对象）</p>
                    <p>③ JS 主线程同时删除了 B 的其他引用路径</p>
                    <p>④ 标记线程不会再次扫描 A → B 被错误回收 💀</p>
                  </div>
                  <p className="pt-2">
                    <strong>写屏障</strong>正是为了解决这个问题：在写操作发生时，
                    确保 B 也进入标记队列，不会被遗漏。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 八、GC 触发策略 ═══ */}
        <section className="space-y-8 animate-slide" style={{ animationDelay: "0.45s" }}>
          <div className="flex items-center gap-4">
            <GeometricBadge color="quaternary" icon={Gauge} />
            <SectionTitle>GC 触发策略与内存限制</SectionTitle>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "定时触发",
                icon: Clock,
                color: "var(--accent)",
                points: [
                  "新生代：From Space 使用达 25%",
                  "老生代：老生代增长到一定阈值",
                  "基于分配速率的自适应策略",
                ],
              },
              {
                title: "内存压力",
                icon: HardDrive,
                color: "var(--secondary)",
                points: [
                  "V8 堆接近最大限制时强制 GC",
                  "默认限制：~1.4GB (64位)",
                  "可通过 --max-old-space-size 调整",
                ],
              },
              {
                title: "空闲时触发",
                icon: Timer,
                color: "var(--quaternary)",
                points: [
                  "Idle GC：利用 requestIdleCallback",
                  "在浏览器空闲期执行增量 GC",
                  "对用户完全透明无感知",
                ],
              },
            ].map((item, i) => (
              <div
                key={i}
                className="topic-card p-6 rounded-2xl space-y-4"
                style={{
                  backgroundColor: "var(--card)",
                  boxShadow: `6px 6px 0px 0px ${item.color}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${item.color} 15%, white)`,
                      border: `2px solid ${item.color}`,
                    }}
                  >
                    <item.icon size={20} strokeWidth={2.5} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-outfit font-bold text-base" style={{ color: "var(--foreground)" }}>
                    {item.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {item.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2 font-plus text-sm" style={{ color: "color-mix(in srgb, var(--foreground) 72%, transparent)" }}>
                      <ChevronRight size={14} strokeWidth={3} style={{ color: item.color }} className="shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 九、完整 GC 流程总览 ═══ */}
        <section className="space-y-8 animate-slide" style={{ animationDelay: "0.5s" }}>
          <div className="flex items-center gap-4">
            <GeometricBadge color="accent" icon={Workflow} size="lg" />
            <SectionTitle>V8 GC 完整流程总览</SectionTitle>
          </div>

          <div
            className="p-6 md:p-8 rounded-2xl"
            style={{
              backgroundColor: "var(--card)",
              border: "3px solid var(--foreground)",
              boxShadow: "12px 12px 0px 0px var(--accent)",
            }}
          >
            <div className="space-y-4">
              {/* 流程步骤 */}
              {[
                {
                  label: "1",
                  title: "新对象分配",
                  desc: "在新生代的 From Space 中分配。如果对象来自字面量或临时变量，它极大概率短命。",
                  color: "var(--accent)",
                  icon: Database,
                },
                {
                  label: "2",
                  title: "新生代 Scavenge",
                  desc: "From Space 达到 25% 阈值时触发。并行复制存活对象到 To Space，死亡对象被清除。存活 2 次的对象晋升到老生代。",
                  color: "var(--secondary)",
                  icon: Zap,
                },
                {
                  label: "3",
                  title: "老生代并发标记",
                  desc: "当老生代增长触发 GC 时，辅助线程执行并发标记（三色标记法 + 写屏障），主线程继续执行 JS。",
                  color: "var(--quaternary)",
                  icon: Eye,
                },
                {
                  label: "4",
                  title: "增量标记 / 主线程修正",
                  desc: "标记尾声会有短暂的 STW (5-10ms) 来完成最终标记和处理遗留的写屏障队列。",
                  color: "var(--tertiary)",
                  icon: Timer,
                },
                {
                  label: "5",
                  title: "并行清除 (Sweep)",
                  desc: "多线程并行清除不可达对象，将内存归还到空闲链表。如果碎片严重则触发 Mark-Compact。",
                  color: "var(--secondary)",
                  icon: Trash2,
                },
                {
                  label: "6",
                  title: "可选：Mark-Compact",
                  desc: "当碎片率过高或内存紧张时，执行标记-整理，将存活对象压缩到连续内存区域。这是最耗时的操作。",
                  color: "var(--accent)",
                  icon: Move,
                },
              ].map((step, i) => (
                <div key={i}>
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: step.color,
                          border: "3px solid var(--foreground)",
                          boxShadow: "4px 4px 0px 0px var(--foreground)",
                        }}
                      >
                        <step.icon size={22} strokeWidth={2.5} color="white" />
                      </div>
                      {i < 5 && (
                        <div
                          className="w-0.5 h-6 my-1"
                          style={{ backgroundColor: "var(--border)" }}
                        />
                      )}
                    </div>
                    <div className="pt-2">
                      <h4 className="font-outfit font-bold text-base flex items-center gap-2">
                        <span
                          className="w-6 h-6 rounded-md flex items-center justify-center font-outfit font-extrabold text-xs"
                          style={{
                            backgroundColor: step.color,
                            color: "white",
                            border: "2px solid var(--foreground)",
                          }}
                        >
                          {step.label}
                        </span>
                        {step.title}
                      </h4>
                      <p className="font-plus text-sm mt-1 leading-relaxed" style={{ color: "color-mix(in srgb, var(--foreground) 68%, transparent)" }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 十、GC 优化最佳实践 ═══ */}
        <section className="space-y-8 animate-slide" style={{ animationDelay: "0.55s" }}>
          <div className="flex items-center gap-4">
            <GeometricBadge color="tertiary" icon={Sparkles} />
            <SectionTitle>开发者 GC 优化最佳实践</SectionTitle>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "减少全局变量",
                desc: "全局变量始终可达，永远不会被 GC。使用模块作用域或 IIFE 隔离生命周期。",
                icon: Shield,
                color: "var(--accent)",
                type: "DO",
              },
              {
                title: "及时解除引用",
                desc: "不再需要的大对象设置为 null，帮助 GC 尽早识别不可达对象。",
                icon: Trash2,
                color: "var(--quaternary)",
                type: "DO",
              },
              {
                title: "使用 WeakRef / WeakMap",
                desc: "对于缓存和观察者模式，使用弱引用避免阻止 GC 回收。",
                icon: Eye,
                color: "var(--accent)",
                type: "DO",
              },
              {
                title: "避免内存泄漏",
                desc: "常见泄漏：未清理的事件监听器、定时器、闭包持有大对象、detached DOM 节点。",
                icon: AlertTriangle,
                color: "var(--secondary)",
                type: "AVOID",
              },
              {
                title: "避免频繁创建大对象",
                desc: "减少短命大对象的创建频率，使用对象池复用；避免在热路径中触发 GC。",
                icon: Gauge,
                color: "var(--tertiary)",
                type: "AVOID",
              },
              {
                title: "监控内存使用",
                desc: "使用 Chrome DevTools 的 Memory 面板、Performance Monitor 和 heap snapshot 定期排查。",
                icon: Cpu,
                color: "var(--quaternary)",
                type: "TIP",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="topic-card p-6 rounded-2xl space-y-3 relative overflow-hidden"
                style={{
                  backgroundColor: "var(--card)",
                  boxShadow: `6px 6px 0px 0px ${item.color}`,
                }}
              >
                {/* 角标 */}
                <span
                  className="absolute top-0 right-0 px-3 py-1 font-plus font-bold text-[10px] uppercase tracking-wider rounded-bl-xl"
                  style={{
                    backgroundColor: item.type === "DO" ? "var(--quaternary)" : item.type === "AVOID" ? "var(--secondary)" : "var(--accent)",
                    color: "white",
                  }}
                >
                  {item.type}
                </span>

                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${item.color} 15%, white)`,
                      border: `2px solid ${item.color}`,
                    }}
                  >
                    <item.icon size={20} strokeWidth={2.5} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-outfit font-bold text-base" style={{ color: "var(--foreground)" }}>
                    {item.title}
                  </h3>
                </div>
                <p className="font-plus text-sm leading-relaxed" style={{ color: "color-mix(in srgb, var(--foreground) 68%, transparent)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 十一、DevTools 实战：GC 可视化 ═══ */}
        <section className="space-y-8 animate-slide" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center gap-4">
            <GeometricBadge color="secondary" icon={Cpu} />
            <SectionTitle>Chrome DevTools 中观察 GC</SectionTitle>
          </div>

          <div
            className="topic-card p-6 md:p-8 rounded-2xl space-y-6"
            style={{
              backgroundColor: "var(--card)",
              boxShadow: "8px 8px 0px 0px var(--secondary)",
            }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-outfit font-bold text-lg">Performance 面板</h3>
                {[
                  { step: "1", text: "打开 DevTools → Performance 面板" },
                  { step: "2", text: "点击录制，执行页面操作" },
                  { step: "3", text: "停止录制，查看 GC 事件（灰色竖线）" },
                  { step: "4", text: "关注 JS Heap 曲线的锯齿状波动——每次下降就是一次 GC" },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-outfit font-extrabold text-xs"
                      style={{
                        backgroundColor: "var(--secondary)",
                        color: "white",
                        border: "2px solid var(--foreground)",
                      }}
                    >
                      {s.step}
                    </div>
                    <p className="font-plus text-sm" style={{ color: "var(--foreground)" }}>{s.text}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="font-outfit font-bold text-lg">Memory 面板</h3>
                {[
                  { step: "1", text: "Heap Snapshot：堆快照，查看对象类型和引用关系" },
                  { step: "2", text: "Allocation Timeline：实时观察内存分配热点" },
                  { step: "3", text: "Allocation Sampling：低开销的分配采样分析" },
                  { step: "4", text: "拍两个快照做 Comparison → 找出未释放的对象" },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-outfit font-extrabold text-xs"
                      style={{
                        backgroundColor: "var(--tertiary)",
                        color: "var(--foreground)",
                        border: "2px solid var(--foreground)",
                      }}
                    >
                      {s.step}
                    </div>
                    <p className="font-plus text-sm" style={{ color: "var(--foreground)" }}>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 代码示例 */}
            <div
              className="p-5 rounded-xl font-mono text-sm leading-relaxed"
              style={{
                backgroundColor: "var(--foreground)",
                color: "#E2E8F0",
                border: "2px solid var(--foreground)",
              }}
            >
              <div style={{ color: "#94A3B8" }}>// 手动触发 GC（仅在 DevTools 打开时有效）</div>
              <div>
                <span style={{ color: "#F472B6" }}>if</span> (global.gc) {"{"}
              </div>
              <div className="pl-4">global.gc(); <span style={{ color: "#94A3B8" }}>// 需要 node --expose-gc</span></div>
              <div>{"}"}</div>
              <div className="mt-2" style={{ color: "#94A3B8" }}>// 在 Node.js 中查看 V8 堆统计</div>
              <div>
                <span style={{ color: "#F472B6" }}>const</span> stats = process.memoryUsage();
              </div>
              <div>
                console.<span style={{ color: "#FBBF24" }}>log</span>(stats.heapUsed, stats.heapTotal);
              </div>
              <div className="mt-2" style={{ color: "#94A3B8" }}>// 调整堆内存上限（单位：MB）</div>
              <div style={{ color: "#34D399" }}>// node --max-old-space-size=4096 app.js</div>
            </div>
          </div>
        </section>

        {/* ═══ 十二、总结卡片 ═══ */}
        <section className="animate-slide" style={{ animationDelay: "0.65s" }}>
          <div
            className="p-8 md:p-10 rounded-3xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, white), color-mix(in srgb, var(--secondary) 8%, white))",
              border: "3px solid var(--foreground)",
              boxShadow: "12px 12px 0px 0px var(--foreground)",
            }}
          >
            {/* 装饰 Blob */}
            <div
              className="absolute -bottom-12 -right-12 w-48 h-48 opacity-20"
              style={{
                backgroundColor: "var(--tertiary)",
                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              }}
            />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--secondary))",
                    border: "3px solid var(--foreground)",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  <Sparkles size={24} strokeWidth={2.5} color="white" />
                </div>
                <h2 className="font-outfit font-extrabold text-2xl md:text-3xl" style={{ color: "var(--foreground)" }}>
                  核心要点速览
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { q: "核心算法", a: "新生代 Scavenge（半空间复制）+ 老生代 Mark-Sweep / Mark-Compact", color: "var(--accent)" },
                  { q: "关键优化", a: "增量标记 → 并发标记 → 并行清除 → Orinoco，STW < 10ms", color: "var(--secondary)" },
                  { q: "写屏障", a: "并发标记期间确保引用变更不丢失，是并发 GC 正确性的基石", color: "var(--quaternary)" },
                  { q: "分代假说", a: "绝大多数对象「生来即死」，据此将堆分为新生代和老生代分别管理", color: "var(--tertiary)" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl flex items-start gap-3"
                    style={{
                      backgroundColor: "var(--card)",
                      border: `2px solid ${item.color}`,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-2 shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <h4 className="font-outfit font-bold text-sm" style={{ color: item.color }}>
                        {item.q}
                      </h4>
                      <p className="font-plus text-xs mt-0.5 leading-relaxed" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 底部导航 ═══ */}
        <div className="flex justify-center pt-8">
          <Link
            href="/"
            className="back-btn flex items-center gap-2 px-6 py-3 font-plus font-bold"
            style={{
              backgroundColor: "var(--card)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-full)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
            返回知识库
          </Link>
        </div>
      </main>
    </div>
  );
}

/* ─── 内部辅助组件 ─── */
function StepLabel({ step, color }: { step: string; color: string }) {
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-md font-outfit font-extrabold text-sm"
      style={{
        backgroundColor: color,
        color: "white",
        border: "2px solid var(--foreground)",
      }}
    >
      {step}
    </span>
  );
}