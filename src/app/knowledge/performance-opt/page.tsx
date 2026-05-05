// app/knowledge/web-vitals/page.tsx
import type { Metadata } from "next";
import {
  Gauge,
  Timer,
  Layers,
  Zap,
  Monitor,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MousePointerClick,
  Layout,
  Eye,
  Server,
  Smartphone,
  Globe,
  Search,
  BarChart3,
  Lightbulb,
  Target,
  RefreshCcw,
  FileCode2,
  Image as ImageIcon,
  Database,
  Cpu,
  Activity,
  Maximize2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Core Web Vitals 深度解析",
  description: "深入理解前端性能指标：LCP、INP、CLS 及完整 Web Vitals 体系",
};

/* ───────────────────────── 小型辅助组件 ───────────────────────── */

function GeometricBadge({
  icon: Icon,
  color,
  size = 48,
}: {
  icon: React.ElementType;
  color: string;
  size?: number;
}) {
  return (
    <div
      className="flex items-center justify-center rounded-full border-2 border-[var(--foreground)]"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: "4px 4px 0px 0px var(--foreground)",
      }}
    >
      <Icon strokeWidth={2.5} size={size * 0.5} className="text-[var(--foreground)]" />
    </div>
  );
}

function SectionLabel({ text, color = "var(--accent)" }: { text: string; color?: string }) {
  return (
    <span
      className="inline-block rounded-full border-2 border-[var(--foreground)] px-4 py-1 text-xs font-bold uppercase tracking-[0.05em]"
      style={{
        fontFamily: "var(--font-outfit)",
        backgroundColor: color,
        boxShadow: "4px 4px 0px 0px var(--foreground)",
      }}
    >
      {text}
    </span>
  );
}

function ScoreGauge({ score, label, color }: { score: string; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full border-3 border-[var(--foreground)] text-lg font-extrabold"
        style={{
          fontFamily: "var(--font-outfit)",
          backgroundColor: color,
          boxShadow: "4px 4px 0px 0px var(--foreground)",
        }}
      >
        {score}
      </div>
      <span
        className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {label}
      </span>
    </div>
  );
}

function MetricTimelineDot({ color, active }: { color: string; active?: boolean }) {
  return (
    <div
      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--foreground)]"
      style={{
        backgroundColor: color,
        boxShadow: active ? `0 0 0 4px ${color}40, 4px 4px 0px 0px var(--foreground)` : "4px 4px 0px 0px var(--foreground)",
      }}
    >
      <CheckCircle2 strokeWidth={2.5} size={18} className="text-[var(--foreground)]" />
    </div>
  );
}

function AnimatedBlob({ color, className = "" }: { color: string; className?: string }) {
  return (
    <div
      className={`absolute opacity-20 ${className}`}
      style={{
        width: 200,
        height: 200,
        backgroundColor: color,
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        filter: "blur(40px)",
      }}
    />
  );
}

/* ───────────────────── 页面主体 ───────────────────── */

export default function WebVitalsPage() {
  return (
    <main className="bg-dot-grid min-h-screen pb-32 pt-8">
      <div className="container">
        {/* ════════ HERO 区域 ════════ */}
        <section className="animate-pop relative mb-20">
          <AnimatedBlob color="var(--tertiary)" className="-left-20 -top-20" />
          <AnimatedBlob color="var(--secondary)" className="-right-10 top-10" />

          <div className="relative">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <SectionLabel text="Performance" color="var(--accent)" />
              <SectionLabel text="Frontend" color="var(--quaternary)" />
              <SectionLabel text="2024 Edition" color="var(--tertiary)" />
            </div>

            <h1
              className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)] md:text-7xl"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Core Web Vitals
              <br />
              <span className="text-[var(--accent)]">深度解析</span>
            </h1>

            <p
              className="mb-10 max-w-2xl text-lg leading-relaxed text-[var(--foreground)]/70 md:text-xl"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Web Vitals 是 Google 提出的统一质量信号，旨在简化并量化影响用户体验的方方面面。
              本文将带你从 <strong>LCP、INP、CLS</strong> 三大核心指标出发，逐层剖析整个前端性能指标体系。
            </p>

            {/* 快速概览卡片 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  icon: Eye,
                  title: "LCP",
                  subtitle: "Largest Contentful Paint",
                  desc: "最大内容绘制时间",
                  color: "var(--accent)",
                  score: "≤2.5s",
                  label: "Good",
                },
                {
                  icon: MousePointerClick,
                  title: "INP",
                  subtitle: "Interaction to Next Paint",
                  desc: "交互到下一帧绘制",
                  color: "var(--secondary)",
                  score: "≤200ms",
                  label: "Good",
                },
                {
                  icon: Layout,
                  title: "CLS",
                  subtitle: "Cumulative Layout Shift",
                  desc: "累计布局偏移",
                  color: "var(--tertiary)",
                  score: "≤0.1",
                  label: "Good",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="topic-card animate-slide bg-card p-6"
                  style={{ animationDelay: `${(i + 1) * 150}ms` }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <GeometricBadge icon={item.icon} color={item.color} />
                    <ScoreGauge score={item.score} label={item.label} color="var(--quaternary)" />
                  </div>
                  <h3
                    className="mb-1 text-2xl font-extrabold text-[var(--foreground)]"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="mb-1 text-sm font-semibold text-[var(--foreground)]/50">{item.subtitle}</p>
                  <p
                    className="text-sm text-[var(--foreground)]/70"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ 为什么 Web Vitals 重要？ ════════ */}
        <section className="animate-slide mb-20" style={{ animationDelay: "300ms" }}>
          <div className="mb-8">
            <SectionLabel text="Why It Matters" color="var(--secondary)" />
          </div>
          <h2
            className="mb-4 text-4xl font-extrabold text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            为什么 Web Vitals 至关重要？
          </h2>
          <p
            className="mb-10 max-w-3xl text-base leading-relaxed text-[var(--foreground)]/60"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Google 已将 Core Web Vitals 作为搜索排名因素之一。性能不仅影响 SEO，
            更直接决定用户留存率和转化率。每一毫秒都至关重要。
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: TrendingUp, stat: "+24%", desc: "跳出率降低（满足 CWV）", color: "var(--quaternary)", delay: "100ms" },
              { icon: Search, stat: "排名因素", desc: "直接影响 Google SEO", color: "var(--accent)", delay: "200ms" },
              { icon: Globe, stat: "53%", desc: "移动端用户3s内离开", color: "var(--tertiary)", delay: "300ms" },
              { icon: Smartphone, stat: "全球标准", desc: "Chrome UX Report 真实数据", color: "var(--secondary)", delay: "400ms" },
            ].map((item) => (
              <div
                key={item.stat}
                className="animate-slide topic-card flex flex-col items-center p-6 text-center"
                style={{ animationDelay: item.delay }}
              >
                <GeometricBadge icon={item.icon} color={item.color} size={56} />
                <p
                  className="mt-4 text-2xl font-extrabold text-[var(--foreground)]"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {item.stat}
                </p>
                <p className="mt-1 text-sm text-[var(--foreground)]/60" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════ 三大核心指标深度剖析 ════════ */}
        <section className="mb-20">
          <div className="mb-8">
            <SectionLabel text="Core Metrics Deep Dive" color="var(--accent)" />
          </div>
          <h2
            className="mb-12 text-4xl font-extrabold text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            三大核心指标深度剖析
          </h2>

          {/* 时间轴布局 */}
          <div className="relative ml-6 border-l-3 border-dashed border-[var(--border)] pl-12 md:ml-12 md:pl-20">
            {/* ─── LCP ─── */}
            <div className="animate-slide relative mb-16" style={{ animationDelay: "100ms" }}>
              <div className="absolute -left-[calc(3rem+20px)] md:-left-[calc(5rem+20px)]">
                <MetricTimelineDot color="var(--accent)" active />
              </div>

              <div className="topic-card overflow-hidden">
                <div className="border-b-2 border-[var(--border)] bg-gradient-to-r from-[var(--accent)]/10 to-transparent p-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <GeometricBadge icon={Eye} color="var(--accent)" size={52} />
                    <div>
                      <h3
                        className="text-3xl font-extrabold text-[var(--foreground)]"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        LCP — Largest Contentful Paint
                      </h3>
                      <p className="text-sm text-[var(--foreground)]/50">最大内容绘制 · 衡量加载性能</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6 flex flex-wrap gap-3">
                    <ScoreGauge score="≤2.5s" label="Good" color="var(--quaternary)" />
                    <ScoreGauge score="≤4.0s" label="Needs Work" color="var(--tertiary)" />
                    <ScoreGauge score=">4.0s" label="Poor" color="var(--secondary)" />
                  </div>

                  <p className="mb-6 text-base leading-relaxed text-[var(--foreground)]/70" style={{ fontFamily: "var(--font-jakarta)" }}>
                    LCP 测量视口中最大可见内容元素（图片、视频海报、大块文本）完成渲染的时间点。
                    它反映了用户<strong>感知到页面主体内容可用</strong>的时刻。不同于 FCP，LCP 专注于「关键内容」而非任意像素。
                  </p>

                  {/* 常见 LCP 元素 */}
                  <div className="mb-6 rounded-xl border-2 border-[var(--foreground)] bg-[var(--background)] p-4" style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}>
                    <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--foreground)]" style={{ fontFamily: "var(--font-outfit)" }}>
                      📌 LCP 候选元素
                    </p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {["<img> 元素", "<image> 内 SVG <image>", "<video> 海报帧", "background-image (通过 url())", "包含文本节点的块级元素"].map((el) => (
                        <div key={el} className="flex items-center gap-2 text-sm text-[var(--foreground)]/70">
                          <ChevronRight strokeWidth={3} size={14} className="shrink-0 text-[var(--accent)]" />
                          <span style={{ fontFamily: "var(--font-jakarta)" }}>{el}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 优化策略 */}
                  <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--foreground)]" style={{ fontFamily: "var(--font-outfit)" }}>
                    🚀 优化策略
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      { icon: Server, text: "优化服务端响应时间 (TTFB < 800ms)", color: "var(--accent)" },
                      { icon: ImageIcon, text: "使用现代图片格式 (WebP/AVIF) + 响应式尺寸", color: "var(--secondary)" },
                      { icon: FileCode2, text: "关键资源预加载 <link rel='preload'>", color: "var(--tertiary)" },
                      { icon: Layers, text: "消除渲染阻塞资源 (inline 关键 CSS)", color: "var(--quaternary)" },
                      { icon: Database, text: "CDN 边缘缓存 + Service Worker 策略", color: "var(--accent)" },
                      { icon: RefreshCcw, text: "避免客户端渲染 LCP 元素 (优先 SSR/SSG)", color: "var(--secondary)" },
                    ].map((opt) => (
                      <div
                        key={opt.text}
                        className="flex items-center gap-3 rounded-lg border-2 border-[var(--border)] bg-white p-3"
                      >
                        <GeometricBadge icon={opt.icon} color={opt.color} size={36} />
                        <span className="text-sm text-[var(--foreground)]/80" style={{ fontFamily: "var(--font-jakarta)" }}>
                          {opt.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ─── INP ─── */}
            <div className="animate-slide relative mb-16" style={{ animationDelay: "200ms" }}>
              <div className="absolute -left-[calc(3rem+20px)] md:-left-[calc(5rem+20px)]">
                <MetricTimelineDot color="var(--secondary)" active />
              </div>

              <div className="topic-card overflow-hidden">
                <div className="border-b-2 border-[var(--border)] bg-gradient-to-r from-[var(--secondary)]/10 to-transparent p-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <GeometricBadge icon={MousePointerClick} color="var(--secondary)" size={52} />
                    <div>
                      <h3
                        className="text-3xl font-extrabold text-[var(--foreground)]"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        INP — Interaction to Next Paint
                      </h3>
                      <p className="text-sm text-[var(--foreground)]/50">交互到下一帧绘制 · 衡量交互响应性（2024年取代 FID）</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6 flex flex-wrap gap-3">
                    <ScoreGauge score="≤200ms" label="Good" color="var(--quaternary)" />
                    <ScoreGauge score="≤500ms" label="Needs Work" color="var(--tertiary)" />
                    <ScoreGauge score=">500ms" label="Poor" color="var(--secondary)" />
                  </div>

                  <p className="mb-6 text-base leading-relaxed text-[var(--foreground)]/70" style={{ fontFamily: "var(--font-jakarta)" }}>
                    INP 通过观察用户在页面停留期间所有<strong>点击、键盘输入和触摸交互</strong>的延迟，
                    选取最差交互延迟（高百分位数）作为最终评分。它全面评估页面的<strong>整体响应能力</strong>，
                    而不仅仅是最差的第一次交互（这是 FID 的局限）。
                  </p>

                  {/* INP 组成 */}
                  <div className="mb-6 rounded-xl border-2 border-[var(--foreground)] bg-[var(--background)] p-5" style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}>
                    <p className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--foreground)]" style={{ fontFamily: "var(--font-outfit)" }}>
                      ⏱️ INP 的三个阶段
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      {[
                        { label: "Input Delay", desc: "输入延迟", color: "var(--tertiary)", time: "主线程忙？" },
                        { label: "Processing", desc: "事件处理", color: "var(--secondary)", time: "JS 执行耗时" },
                        { label: "Presentation", desc: "帧呈现延迟", color: "var(--accent)", time: "DOM 更新 + 渲染" },
                      ].map((stage, i) => (
                        <div key={stage.label} className="flex flex-1 flex-col items-center gap-2 text-center">
                          <div
                            className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-[var(--foreground)] text-lg font-extrabold"
                            style={{ fontFamily: "var(--font-outfit)", backgroundColor: stage.color, boxShadow: "4px 4px 0px 0px var(--foreground)" }}
                          >
                            {i + 1}
                          </div>
                          <p className="text-sm font-bold text-[var(--foreground)]" style={{ fontFamily: "var(--font-outfit)" }}>
                            {stage.label}
                          </p>
                          <p className="text-xs text-[var(--foreground)]/50">{stage.desc}</p>
                          <p className="text-xs text-[var(--foreground)]/40">{stage.time}</p>
                          {i < 2 && (
                            <ArrowRight
                              strokeWidth={2.5}
                              size={20}
                              className="hidden text-[var(--border)] sm:block"
                              style={{ position: "absolute", right: -12 }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 优化策略 */}
                  <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--foreground)]" style={{ fontFamily: "var(--font-outfit)" }}>
                    🚀 优化策略
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      { icon: FileCode2, text: "拆分长任务 (Long Tasks > 50ms → scheduler.yield)", color: "var(--secondary)" },
                      { icon: Cpu, text: "减少主线程工作 (代码分割 + 懒加载)", color: "var(--accent)" },
                      { icon: Layers, text: "避免强制同步布局 (读写分离 DOM 属性)", color: "var(--tertiary)" },
                      { icon: Zap, text: "使用 requestIdleCallback 调度低优先级任务", color: "var(--quaternary)" },
                      { icon: Database, text: "Web Worker 卸载重计算逻辑", color: "var(--secondary)" },
                      { icon: RefreshCcw, text: "减少 DOM 节点数量 (虚拟列表)", color: "var(--accent)" },
                    ].map((opt) => (
                      <div
                        key={opt.text}
                        className="flex items-center gap-3 rounded-lg border-2 border-[var(--border)] bg-white p-3"
                      >
                        <GeometricBadge icon={opt.icon} color={opt.color} size={36} />
                        <span className="text-sm text-[var(--foreground)]/80" style={{ fontFamily: "var(--font-jakarta)" }}>
                          {opt.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ─── CLS ─── */}
            <div className="animate-slide relative mb-16" style={{ animationDelay: "300ms" }}>
              <div className="absolute -left-[calc(3rem+20px)] md:-left-[calc(5rem+20px)]">
                <MetricTimelineDot color="var(--tertiary)" active />
              </div>

              <div className="topic-card overflow-hidden">
                <div className="border-b-2 border-[var(--border)] bg-gradient-to-r from-[var(--tertiary)]/10 to-transparent p-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <GeometricBadge icon={Layout} color="var(--tertiary)" size={52} />
                    <div>
                      <h3
                        className="text-3xl font-extrabold text-[var(--foreground)]"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        CLS — Cumulative Layout Shift
                      </h3>
                      <p className="text-sm text-[var(--foreground)]/50">累计布局偏移 · 衡量视觉稳定性</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6 flex flex-wrap gap-3">
                    <ScoreGauge score="≤0.1" label="Good" color="var(--quaternary)" />
                    <ScoreGauge score="≤0.25" label="Needs Work" color="var(--tertiary)" />
                    <ScoreGauge score=">0.25" label="Poor" color="var(--secondary)" />
                  </div>

                  <p className="mb-6 text-base leading-relaxed text-[var(--foreground)]/70" style={{ fontFamily: "var(--font-jakarta)" }}>
                    CLS 测量页面整个生命周期中所有<strong>非用户触发的意外布局偏移</strong>的累计分数。
                    高 CLS 意味着页面元素在加载过程中不断跳动，严重破坏用户体验。
                    其计算公式为 <strong>影响分数 × 距离分数</strong>。
                  </p>

                  {/* CLS 公式 */}
                  <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[
                      { label: "影响区域", desc: "不稳定元素影响视口面积占比", icon: Maximize2, color: "var(--accent)" },
                      { label: "移动距离", desc: "元素在两帧之间移动的最大距离", icon: Activity, color: "var(--secondary)" },
                      { label: "CLS 分数", desc: "= 影响区域 × 移动距离 (累加)", icon: BarChart3, color: "var(--tertiary)" },
                    ].map((f) => (
                      <div
                        key={f.label}
                        className="flex flex-col items-center gap-3 rounded-xl border-2 border-[var(--foreground)] bg-[var(--background)] p-5 text-center"
                        style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
                      >
                        <GeometricBadge icon={f.icon} color={f.color} size={44} />
                        <p className="text-sm font-bold text-[var(--foreground)]" style={{ fontFamily: "var(--font-outfit)" }}>{f.label}</p>
                        <p className="text-xs text-[var(--foreground)]/50" style={{ fontFamily: "var(--font-jakarta)" }}>{f.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* 常见原因 + 修复 */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div
                      className="rounded-xl border-2 border-[var(--foreground)] p-5"
                      style={{ backgroundColor: "var(--secondary)", boxShadow: "4px 4px 0px 0px var(--foreground)" }}
                    >
                      <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--foreground)]" style={{ fontFamily: "var(--font-outfit)" }}>
                        <AlertTriangle strokeWidth={2.5} size={16} />
                        常见 CLS 罪魁祸首
                      </p>
                      {[
                        "未指定尺寸的图片/视频",
                        "异步加载的 Web 字体 (FOIT/FOUT)",
                        "动态注入的内容（广告、弹窗）",
                        "动态调整大小的元素",
                        "在已有内容上方插入 DOM",
                      ].map((item) => (
                        <p key={item} className="flex items-start gap-2 py-1 text-sm text-[var(--foreground)]/80">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--foreground)]" />
                          {item}
                        </p>
                      ))}
                    </div>

                    <div
                      className="rounded-xl border-2 border-[var(--foreground)] p-5"
                      style={{ backgroundColor: "var(--quaternary)", boxShadow: "4px 4px 0px 0px var(--foreground)" }}
                    >
                      <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--foreground)]" style={{ fontFamily: "var(--font-outfit)" }}>
                        <CheckCircle2 strokeWidth={2.5} size={16} />
                        修复方案
                      </p>
                      {[
                        "始终设置 width/height 属性或 aspect-ratio",
                        "font-display: swap + 预加载关键字体",
                        "为动态内容预留空间 (min-height)",
                        "使用 CSS contain 属性隔离布局",
                        "使用 transform 动画替代改变几何属性",
                      ].map((item) => (
                        <p key={item} className="flex items-start gap-2 py-1 text-sm text-[var(--foreground)]/80">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--foreground)]" />
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ 其他重要 Web Vitals 指标 ════════ */}
        <section className="mb-20">
          <div className="mb-8">
            <SectionLabel text="Supporting Metrics" color="var(--quaternary)" />
          </div>
          <h2
            className="mb-4 text-4xl font-extrabold text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            其他重要指标
          </h2>
          <p
            className="mb-10 max-w-3xl text-base text-[var(--foreground)]/60"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            除了三大核心指标，还有几个关键的辅助指标帮助诊断性能瓶颈。
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "FCP",
                fullName: "First Contentful Paint",
                desc: "首次内容绘制：浏览器渲染第一个 DOM 内容的时间。LCP 之前的“先行者”。",
                target: "≤1.8s",
                color: "var(--accent)",
                delay: "100ms",
              },
              {
                icon: Server,
                title: "TTFB",
                fullName: "Time to First Byte",
                desc: "首字节时间：请求发出到接收第一个字节的耗时。反映服务器响应速度。",
                target: "≤800ms",
                color: "var(--secondary)",
                delay: "200ms",
              },
              {
                icon: Clock,
                title: "SI",
                fullName: "Speed Index",
                desc: "速度指数：页面可视区域内容填充速度的综合指标，基于视频帧分析。",
                target: "≤3.4s",
                color: "var(--tertiary)",
                delay: "300ms",
              },
              {
                icon: Timer,
                title: "TBT",
                fullName: "Total Blocking Time",
                desc: "总阻塞时间：FCP 到 TTI 之间所有长任务 (>50ms) 超出部分的总和。",
                target: "≤200ms",
                color: "var(--quaternary)",
                delay: "400ms",
              },
              {
                icon: Monitor,
                title: "TTI",
                fullName: "Time to Interactive",
                desc: "可交互时间：页面完全可响应用户输入的时刻（长任务 ≤50ms）。",
                target: "≤3.8s",
                color: "var(--accent)",
                delay: "500ms",
              },
              {
                icon: Gauge,
                title: "FID ⚠️",
                fullName: "First Input Delay (已弃用)",
                desc: "首次输入延迟：已于 2024 年 3 月被 INP 正式取代，仅衡量首次交互。",
                target: "→ INP",
                color: "var(--border)",
                delay: "600ms",
              },
            ].map((m) => (
              <div
                key={m.title}
                className="animate-slide topic-card flex flex-col p-5"
                style={{ animationDelay: m.delay }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <GeometricBadge icon={m.icon} color={m.color} size={44} />
                  <span
                    className="rounded-full border-2 border-[var(--foreground)] bg-white px-3 py-1 text-xs font-bold"
                    style={{ fontFamily: "var(--font-outfit)", boxShadow: "2px 2px 0px 0px var(--foreground)" }}
                  >
                    {m.target}
                  </span>
                </div>
                <h4
                  className="text-xl font-extrabold text-[var(--foreground)]"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {m.title}
                </h4>
                <p className="mb-2 text-xs font-semibold text-[var(--foreground)]/40">{m.fullName}</p>
                <p className="text-sm leading-relaxed text-[var(--foreground)]/60" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════ 测量工具 Bento Grid ════════ */}
        <section className="mb-20">
          <div className="mb-8">
            <SectionLabel text="Measurement Tools" color="var(--tertiary)" />
          </div>
          <h2
            className="mb-4 text-4xl font-extrabold text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            测量工具全景
          </h2>
          <p
            className="mb-10 max-w-3xl text-base text-[var(--foreground)]/60"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            性能优化始于精确的测量。了解实验室数据与真实用户数据 (RUM) 的区别至关重要。
          </p>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Lab Tools */}
            <div
              className="animate-pop topic-card col-span-1 flex flex-col p-6 md:col-span-2"
              style={{ animationDelay: "100ms" }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="rounded-lg border-2 border-[var(--foreground)] bg-[var(--accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
                  style={{ fontFamily: "var(--font-outfit)", boxShadow: "4px 4px 0px 0px var(--foreground)" }}
                >
                  Lab Data · 实验室数据
                </div>
              </div>
              <h4 className="mb-4 text-xl font-extrabold text-[var(--foreground)]" style={{ fontFamily: "var(--font-outfit)" }}>
                模拟环境测试
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { name: "Lighthouse", desc: "Chrome 内置，综合审计评分 + 优化建议", tag: "CLI / DevTools" },
                  { name: "PageSpeed Insights", desc: "结合 Lighthouse + CrUX 真实数据", tag: "Web 工具" },
                  { name: "WebPageTest", desc: "多地点、多设备的瀑布流分析", tag: "高级诊断" },
                  { name: "Chrome DevTools", desc: "Performance 面板逐帧分析", tag: "开发者" },
                ].map((t) => (
                  <div
                    key={t.name}
                    className="flex items-start gap-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] p-3"
                  >
                    <Search strokeWidth={2.5} size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                    <div>
                      <p className="text-sm font-bold text-[var(--foreground)]" style={{ fontFamily: "var(--font-outfit)" }}>{t.name}</p>
                      <p className="text-xs text-[var(--foreground)]/50" style={{ fontFamily: "var(--font-jakarta)" }}>{t.desc}</p>
                      <span className="mt-1 inline-block rounded bg-[var(--foreground)]/5 px-2 py-0.5 text-[10px] font-semibold text-[var(--foreground)]/40">
                        {t.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Field Tools */}
            <div
              className="animate-pop topic-card flex flex-col p-6"
              style={{ animationDelay: "200ms" }}
            >
              <div className="mb-4">
                <div
                  className="rounded-lg border-2 border-[var(--foreground)] bg-[var(--quaternary)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--foreground)]"
                  style={{ fontFamily: "var(--font-outfit)", boxShadow: "4px 4px 0px 0px var(--foreground)" }}
                >
                  Field Data · 真实数据
                </div>
              </div>
              <h4 className="mb-4 text-xl font-extrabold text-[var(--foreground)]" style={{ fontFamily: "var(--font-outfit)" }}>
                用户真实体验
              </h4>
              {[
                { name: "CrUX", desc: "Chrome 用户体验报告", icon: Globe },
                { name: "web-vitals JS", desc: "npm 库，实时 RUM", icon: FileCode2 },
                { name: "GTMetrix", desc: "综合监控面板", icon: BarChart3 },
              ].map((t) => (
                <div key={t.name} className="mb-3 flex items-center gap-3">
                  <GeometricBadge icon={t.icon} color="var(--quaternary)" size={32} />
                  <div>
                    <p className="text-sm font-bold text-[var(--foreground)]" style={{ fontFamily: "var(--font-outfit)" }}>{t.name}</p>
                    <p className="text-xs text-[var(--foreground)]/40">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ web-vitals 代码示例 ════════ */}
        <section className="mb-20">
          <div className="mb-8">
            <SectionLabel text="Code Example" color="var(--accent)" />
          </div>
          <h2
            className="mb-4 text-4xl font-extrabold text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            实战：接入 web-vitals
          </h2>
          <p className="mb-8 max-w-3xl text-base text-[var(--foreground)]/60" style={{ fontFamily: "var(--font-jakarta)" }}>
            使用 <code className="rounded bg-[var(--foreground)]/5 px-1.5 py-0.5 text-sm font-semibold">web-vitals</code> 库在应用中收集真实用户指标并上报。
          </p>

          <div
            className="animate-pop overflow-hidden rounded-2xl border-2 border-[var(--foreground)]"
            style={{ boxShadow: "8px 8px 0px 0px var(--foreground)" }}
          >
            {/* 标题栏 */}
            <div className="flex items-center gap-2 border-b-2 border-[var(--foreground)] bg-[var(--foreground)] px-5 py-3">
              <div className="h-3 w-3 rounded-full bg-[var(--secondary)]" />
              <div className="h-3 w-3 rounded-full bg-[var(--tertiary)]" />
              <div className="h-3 w-3 rounded-full bg-[var(--quaternary)]" />
              <span className="ml-3 text-sm font-semibold text-white/60" style={{ fontFamily: "var(--font-outfit)" }}>
                lib/web-vitals.ts
              </span>
            </div>
            {/* 代码内容 */}
            <pre className="overflow-x-auto bg-[#1E293B] p-6 text-sm leading-relaxed text-[#E2E8F0]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <code>{`import { onLCP, onINP, onCLS, onFCP, onTTFB } from "web-vitals";

type MetricPayload = {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  id: string;
  delta: number;
  navigationType: string;
};

function sendToAnalytics(metric: MetricPayload) {
  // 上报到你的分析平台
  const body = JSON.stringify({
    ...metric,
    page: window.location.pathname,
    userAgent: navigator.userAgent,
    timestamp: Date.now(),
  });

  // 使用 sendBeacon 确保页面关闭前也能发送
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/vitals", body);
  } else {
    fetch("/api/vitals", { body, method: "POST", keepalive: true });
  }
}

export function initWebVitals() {
  onLCP(sendToAnalytics);   // 最大内容绘制
  onINP(sendToAnalytics);   // 交互到下一帧绘制
  onCLS(sendToAnalytics);   // 累计布局偏移
  onFCP(sendToAnalytics);   // 首次内容绘制
  onTTFB(sendToAnalytics);  // 首字节时间
}`}</code>
            </pre>
          </div>
        </section>

        {/* ════════ 优化清单 Bento Grid ════════ */}
        <section className="mb-20">
          <div className="mb-8">
            <SectionLabel text="Optimization Checklist" color="var(--quaternary)" />
          </div>
          <h2
            className="mb-10 text-4xl font-extrabold text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            性能优化全栈清单
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {/* 加载层 */}
            <div
              className="animate-slide topic-card col-span-1 flex flex-col p-6"
              style={{ animationDelay: "100ms" }}
            >
              <div className="mb-4 flex items-center gap-3">
                <GeometricBadge icon={Zap} color="var(--accent)" size={40} />
                <h4 className="text-xl font-extrabold text-[var(--foreground)]" style={{ fontFamily: "var(--font-outfit)" }}>
                  加载性能
                </h4>
              </div>
              <div className="space-y-2">
                {[
                  "Tree Shaking 移除未使用代码",
                  "路由级代码分割 (dynamic import)",
                  "图片优化：AVIF > WebP > PNG，lazy loading",
                  "字体优化：subset + font-display: swap",
                  "资源预加载：preload / prefetch / preconnect",
                  "HTTP/2 Push 或 103 Early Hints",
                  "Service Worker 离线缓存策略",
                  "Bundle 分析：@next/bundle-analyzer",
                ].map((item) => (
                  <label key={item} className="flex items-start gap-2 text-xs text-[var(--foreground)]/70">
                    <input type="checkbox" className="mt-1 accent-[var(--accent)]" />
                    <span style={{ fontFamily: "var(--font-jakarta)" }}>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 渲染层 */}
            <div
              className="animate-slide topic-card flex flex-col p-6"
              style={{ animationDelay: "200ms" }}
            >
              <div className="mb-4 flex items-center gap-3">
                <GeometricBadge icon={Layers} color="var(--secondary)" size={40} />
                <h4 className="text-lg font-extrabold text-[var(--foreground)]" style={{ fontFamily: "var(--font-outfit)" }}>
                  渲染性能
                </h4>
              </div>
              <div className="space-y-2">
                {[
                  "避免强制回流 (read/write分离)",
                  "使用 contain 属性隔离布局",
                  "CSS will-change 提示浏览器",
                  "虚拟滚动 (react-window)",
                  "减少重绘：使用 transform/opacity",
                ].map((item) => (
                  <label key={item} className="flex items-start gap-2 text-xs text-[var(--foreground)]/70">
                    <input type="checkbox" className="mt-0.5 accent-[var(--secondary)]" />
                    <span style={{ fontFamily: "var(--font-jakarta)" }}>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* JS 运行时 */}
            <div
              className="animate-slide topic-card flex flex-col p-6"
              style={{ animationDelay: "300ms" }}
            >
              <div className="mb-4 flex items-center gap-3">
                <GeometricBadge icon={Cpu} color="var(--tertiary)" size={40} />
                <h4 className="text-lg font-extrabold text-[var(--foreground)]" style={{ fontFamily: "var(--font-outfit)" }}>
                  JS 运行时
                </h4>
              </div>
              <div className="space-y-2">
                {[
                  "长任务拆分 (scheduler.yield)",
                  "Web Worker 卸载计算",
                  "requestIdleCallback 调度",
                  "减少 hydration (React Server Components)",
                  "Debounce/Throttle 事件处理",
                ].map((item) => (
                  <label key={item} className="flex items-start gap-2 text-xs text-[var(--foreground)]/70">
                    <input type="checkbox" className="mt-0.5 accent-[var(--tertiary)]" />
                    <span style={{ fontFamily: "var(--font-jakarta)" }}>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 网络层 - 跨整行 */}
            <div
              className="animate-slide topic-card col-span-1 flex flex-col p-6"
              style={{ animationDelay: "400ms" }}
            >
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <GeometricBadge icon={Globe} color="var(--quaternary)" size={40} />
                <h4 className="text-xl font-extrabold text-[var(--foreground)]" style={{ fontFamily: "var(--font-outfit)" }}>
                  网络与基础设施
                </h4>
                <span className="rounded-full border-2 border-[var(--foreground)] bg-[var(--background)] px-3 py-1 text-xs font-bold" style={{ fontFamily: "var(--font-outfit)", boxShadow: "2px 2px 0px 0px var(--foreground)" }}>
                  影响 TTFB
                </span>
              </div>
              <div className="space-y-2">
                {[
                  "CDN 全球边缘节点分发",
                  "HTTP/2 或 HTTP/3 (QUIC)",
                  "Brotli 压缩 (优于 Gzip)",
                  "服务端缓存：Redis / Varnish",
                  "数据库查询优化 + 连接池",
                  "Edge Functions (Vercel/Cloudflare)",
                  "Stale-While-Revalidate 策略",
                  "资源哈希长期缓存 (immutable)",
                ].map((item) => (
                  <label key={item} className="flex items-start gap-2 text-xs text-[var(--foreground)]/70">
                    <input type="checkbox" className="mt-1 accent-[var(--quaternary)]" />
                    <span style={{ fontFamily: "var(--font-jakarta)" }}>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════ 总结卡片 ════════ */}
        <section className="animate-pop relative">
          <AnimatedBlob color="var(--accent)" className="-left-32 top-0" />
          <AnimatedBlob color="var(--tertiary)" className="-right-20 bottom-0" />

          <div
            className="relative overflow-hidden rounded-3xl border-3 border-[var(--foreground)] bg-gradient-to-br from-[var(--accent)] via-[var(--secondary)] to-[var(--tertiary)] p-8 text-center md:p-14"
            style={{ boxShadow: "12px 12px 0px 0px var(--foreground)" }}
          >
            <div className="mb-6 flex justify-center">
              <GeometricBadge icon={Target} color="white" size={64} />
            </div>
            <h2
              className="mb-4 text-3xl font-extrabold text-white md:text-5xl"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              性能即用户体验
            </h2>
            <p
              className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              记住核心目标：<strong className="text-white">LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.1</strong>。
              持续监测、渐进优化、用数据驱动决策 —— 让每一毫秒都成为竞争优势。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://web.dev/vitals"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--foreground)] bg-white px-6 py-3 text-sm font-bold text-[var(--foreground)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ fontFamily: "var(--font-outfit)", boxShadow: "4px 4px 0px 0px var(--foreground)" }}
              >
                <Globe strokeWidth={2.5} size={18} />
                web.dev/vitals
              </a>
              <a
                href="https://developer.chrome.com/docs/crux/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--foreground)] bg-white px-6 py-3 text-sm font-bold text-[var(--foreground)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ fontFamily: "var(--font-outfit)", boxShadow: "4px 4px 0px 0px var(--foreground)" }}
              >
                <BarChart3 strokeWidth={2.5} size={18} />
                CrUX Dashboard
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}