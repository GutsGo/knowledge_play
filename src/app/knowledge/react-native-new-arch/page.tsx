// app/knowledge/react-native-new-architecture/page.tsx

import {
  Cpu,
  Layers,
  Zap,
  ArrowRight,
  Code2,
  Boxes,
  RefreshCw,
  GitBranch,
  Shield,
  Gauge,
  Timer,
  Workflow,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Sparkles,
  Binary,
  FileCode,
  Network,
} from "lucide-react";

export default function ReactNativeNewArchitecturePage() {
  return (
    <div className="bg-dot-grid min-h-screen pb-32">
      {/* ==================== HERO ==================== */}
      <section className="container relative overflow-hidden pt-20 pb-24">
        {/* Decorative Blobs */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] opacity-30 animate-[spin_40s_linear_infinite]"
          style={{
            background:
              "radial-gradient(circle, var(--tertiary) 0%, transparent 70%)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[350px] h-[350px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--secondary) 0%, transparent 70%)",
            borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
          }}
        />

        <div className="container relative z-10 !py-6">
          {/* Tag */}
          <div className="animate-pop flex items-center gap-2 mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-widest"
              style={{
                backgroundColor: "var(--tertiary)",
                border: "2px solid var(--foreground)",
                borderRadius: "var(--radius-full)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
                color: "var(--foreground)",
              }}
            >
              <Sparkles size={16} strokeWidth={2.5} />
              深度技术解析
            </span>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-widest"
              style={{
                backgroundColor: "var(--quaternary)",
                border: "2px solid var(--foreground)",
                borderRadius: "var(--radius-full)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
                color: "var(--foreground)",
              }}
            >
              React Native 0.76+
            </span>
          </div>

          {/* Title */}
          <h1
            className="animate-pop text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] mb-6"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: "var(--foreground)",
            }}
          >
            React Native
            <br />
            <span style={{ color: "var(--accent)" }}>新架构</span>
            <span
              className="inline-block ml-4 w-4 h-4 md:w-5 md:h-5 rounded-full animate-bounce"
              style={{ backgroundColor: "var(--secondary)" }}
            />
          </h1>

          {/* Subtitle */}
          <p
            className="animate-slide max-w-2xl text-lg md:text-xl leading-relaxed mb-10"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "var(--foreground)",
              opacity: 0.7,
              animationDelay: "0.15s",
            }}
          >
            告别 Bridge，拥抱 JSI。Fabric 渲染器、TurboModules、Codegen
            三大支柱如何彻底重塑 React Native
            的性能基线与开发体验？本文将从架构原理到数据流，为你拆解每一个核心模块。
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {[
              { label: "启动提速", value: "~40%", icon: Timer, color: "var(--accent)" },
              { label: "内存降低", value: "~30%", icon: Gauge, color: "var(--secondary)" },
              { label: "帧率提升", value: "60fps+", icon: Zap, color: "var(--tertiary)" },
              { label: "类型安全", value: "100%", icon: Shield, color: "var(--quaternary)" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="animate-slide flex items-center gap-3 p-4"
                style={{
                  backgroundColor: "var(--card)",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                  animationDelay: `${0.2 + i * 0.08}s`,
                }}
              >
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-lg"
                  style={{
                    backgroundColor: stat.color,
                    border: "2px solid var(--foreground)",
                  }}
                >
                  <stat.icon size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <div
                    className="text-xl font-extrabold"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs opacity-60">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ARCHITECTURE OVERVIEW (Old vs New) ==================== */}
      <section className="container mt-16 mb-24">
        <SectionHeader
          tag="架构对比"
          tagColor="var(--secondary)"
          title="旧架构 vs 新架构"
          subtitle="从异步 Bridge 到同步 JSI，这是一次彻底的底层革命"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Old Architecture */}
          <div
            className="animate-slide topic-card p-6 md:p-8 relative overflow-hidden"
            style={{ animationDelay: "0.1s" }}
          >
            <div
              className="absolute top-0 right-0 w-20 h-20 flex items-center justify-center"
              style={{
                backgroundColor: "var(--secondary)",
                borderLeft: "2px solid var(--foreground)",
                borderBottom: "2px solid var(--foreground)",
                borderRadius: "0 var(--radius-md) 0 var(--radius-md)",
              }}
            >
              <XCircle size={28} strokeWidth={2.5} />
            </div>

            <h3
              className="text-2xl font-extrabold mb-6"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: "var(--secondary)",
              }}
            >
              旧架构 (Bridge)
            </h3>

            <div className="space-y-3">
              {[
                { text: "异步 JSON 序列化通信", desc: "Bridge 是异步的，无法同步调用原生方法" },
                { text: "单线程批处理瓶颈", desc: "所有消息经过 Bridge 排队，导致延迟" },
                { text: "原生模块全量初始化", desc: "启动时加载全部模块，浪费内存和时间" },
                { text: "无类型安全保障", desc: "JS ↔ Native 边界运行时才暴露错误" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 rounded-lg"
                  style={{ backgroundColor: "color-mix(in srgb, var(--secondary) 8%, transparent)" }}
                >
                  <XCircle
                    size={18}
                    strokeWidth={2.5}
                    className="shrink-0 mt-0.5"
                    style={{ color: "var(--secondary)" }}
                  />
                  <div>
                    <div className="font-bold text-sm">{item.text}</div>
                    <div className="text-xs opacity-60 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Old Flow */}
            <div
              className="mt-6 p-4 rounded-xl"
              style={{
                backgroundColor: "color-mix(in srgb, var(--secondary) 6%, transparent)",
                border: "2px dashed var(--border)",
              }}
            >
              <div className="flex items-center justify-center gap-2 text-sm font-bold opacity-70">
                <span
                  className="px-3 py-1.5 rounded-lg"
                  style={{ backgroundColor: "var(--tertiary)", border: "2px solid var(--foreground)" }}
                >
                  JS Thread
                </span>
                <span className="opacity-50">→</span>
                <span
                  className="px-3 py-1.5 rounded-lg"
                  style={{
                    backgroundColor: "var(--secondary)",
                    border: "2px solid var(--foreground)",
                    color: "white",
                  }}
                >
                  Bridge (JSON)
                </span>
                <span className="opacity-50">→</span>
                <span
                  className="px-3 py-1.5 rounded-lg"
                  style={{ backgroundColor: "var(--accent)", border: "2px solid var(--foreground)", color: "white" }}
                >
                  Native
                </span>
              </div>
            </div>
          </div>

          {/* New Architecture */}
          <div
            className="animate-slide topic-card p-6 md:p-8 relative overflow-hidden"
            style={{
              animationDelay: "0.2s",
              boxShadow: "8px 8px 0px 0px var(--quaternary)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-20 h-20 flex items-center justify-center"
              style={{
                backgroundColor: "var(--quaternary)",
                borderLeft: "2px solid var(--foreground)",
                borderBottom: "2px solid var(--foreground)",
                borderRadius: "0 var(--radius-md) 0 var(--radius-md)",
              }}
            >
              <CheckCircle2 size={28} strokeWidth={2.5} />
            </div>

            <h3
              className="text-2xl font-extrabold mb-6"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: "var(--quaternary)",
              }}
            >
              新架构 (JSI)
            </h3>

            <div className="space-y-3">
              {[
                { text: "JSI 同步直接调用", desc: "C++ 对象持有引用，JS 可直接调用原生方法" },
                { text: "Fabric 并发渲染", desc: "支持多线程渲染，告别主线程卡顿" },
                { text: "TurboModules 按需加载", desc: "懒加载原生模块，启动速度大幅提升" },
                { text: "Codegen 编译期类型检查", desc: "TypeScript/Flow 类型自动生成原生代码" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 rounded-lg"
                  style={{ backgroundColor: "color-mix(in srgb, var(--quaternary) 8%, transparent)" }}
                >
                  <CheckCircle2
                    size={18}
                    strokeWidth={2.5}
                    className="shrink-0 mt-0.5"
                    style={{ color: "var(--quaternary)" }}
                  />
                  <div>
                    <div className="font-bold text-sm">{item.text}</div>
                    <div className="text-xs opacity-60 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* New Flow */}
            <div
              className="mt-6 p-4 rounded-xl"
              style={{
                backgroundColor: "color-mix(in srgb, var(--quaternary) 6%, transparent)",
                border: "2px dashed var(--quaternary)",
              }}
            >
              <div className="flex items-center justify-center gap-2 text-sm font-bold opacity-70">
                <span
                  className="px-3 py-1.5 rounded-lg"
                  style={{ backgroundColor: "var(--tertiary)", border: "2px solid var(--foreground)" }}
                >
                  JS Thread
                </span>
                <span className="opacity-50">→</span>
                <span
                  className="px-3 py-1.5 rounded-lg"
                  style={{
                    backgroundColor: "var(--quaternary)",
                    border: "2px solid var(--foreground)",
                  }}
                >
                  JSI (C++ Direct)
                </span>
                <span className="opacity-50">→</span>
                <span
                  className="px-3 py-1.5 rounded-lg"
                  style={{ backgroundColor: "var(--accent)", border: "2px solid var(--foreground)", color: "white" }}
                >
                  Native
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CORE PILLARS (Bento Grid) ==================== */}
      <section className="container mb-24">
        <SectionHeader
          tag="三大支柱"
          tagColor="var(--accent)"
          title="新架构核心模块"
          subtitle="JSI · Fabric · TurboModules 构成了新架构的完整骨架"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          {/* JSI - Large Card */}
          <div
            className="animate-slide topic-card p-6 md:p-8 md:col-span-2 md:row-span-2"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex items-center justify-center w-14 h-14 rounded-2xl"
                style={{
                  backgroundColor: "var(--accent)",
                  border: "3px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                <Network size={28} strokeWidth={2.5} color="white" />
              </div>
              <div>
                <h3
                  className="text-2xl md:text-3xl font-extrabold"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "var(--accent)" }}
                >
                  JSI
                </h3>
                <div className="text-sm opacity-60 font-bold uppercase tracking-wider">
                  JavaScript Interface
                </div>
              </div>
            </div>

            <p className="text-base leading-relaxed mb-6 opacity-80" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              JSI 是新架构的基石。它取代了旧的 Bridge，允许 JavaScript
              引擎直接持有对 C++ 宿主对象的引用。JS 可以像调用普通对象方法一样同步调用原生功能，
              <strong>无需 JSON 序列化</strong>，也<strong>无需异步等待</strong>。
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: Zap, title: "同步调用", desc: "直接内存访问，零序列化开销" },
                { icon: RefreshCw, title: "引擎无关", desc: "可适配 Hermes、V8、JSC" },
                { icon: Binary, title: "共享内存", desc: "JS 与 Native 共享 C++ 堆" },
                { icon: Layers, title: "双向引用", desc: "原生对象可持有 JS 回调引用" },
              ].map((b, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-4 rounded-xl"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--accent) 6%, transparent)",
                    border: "2px solid var(--border)",
                  }}
                >
                  <div
                    className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg"
                    style={{
                      backgroundColor: "var(--accent)",
                      border: "2px solid var(--foreground)",
                    }}
                  >
                    <b.icon size={18} strokeWidth={2.5} color="white" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{b.title}</div>
                    <div className="text-xs opacity-60">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Code Example */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "2px solid var(--foreground)" }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{
                  backgroundColor: "var(--foreground)",
                  color: "white",
                }}
              >
                <FileCode size={16} strokeWidth={2.5} />
                <span className="text-xs font-bold uppercase tracking-wider">JSI C++ 概念示例</span>
              </div>
              <pre
                className="p-5 overflow-x-auto text-sm leading-relaxed"
                style={{
                  backgroundColor: "#1E1E2E",
                  color: "#CDD6F4",
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                }}
              >
                <code className="language-cpp">
{`// JSI HostObject — JS 端可直接调用的方法
class NativeCalculator : public jsi::HostObject {
  jsi::Value get(jsi::Runtime& rt, const jsi::PropNameID& name) override {
    auto methodName = name.utf8(rt);
    
    if (methodName == "add") {
      // 返回一个 JS 可直接调用的函数
      return jsi::Function::createFromHostFunction(
        rt, name, 2,
        [](jsi::Runtime& rt, const jsi::Value& thisVal,
           const jsi::Value* args, size_t count) -> jsi::Value {
          double a = args[0].getNumber();  // 同步读取！
          double b = args[1].getNumber();
          return jsi::Value(a + b);        // 同步返回！
        }
      );
    }
    return jsi::Value::undefined();
  }
};`}
                </code>
              </pre>
            </div>
          </div>

          {/* Fabric - Side Card */}
          <div
            className="animate-slide topic-card p-6 md:col-span-1"
            style={{
              animationDelay: "0.2s",
              boxShadow: "8px 8px 0px 0px var(--secondary)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-xl"
                style={{
                  backgroundColor: "var(--secondary)",
                  border: "3px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                <Layers size={24} strokeWidth={2.5} color="white" />
              </div>
              <h3
                className="text-xl font-extrabold"
                style={{ fontFamily: "'Outfit', sans-serif", color: "var(--secondary)" }}
              >
                Fabric
              </h3>
            </div>
            <p className="text-sm leading-relaxed mb-4 opacity-80" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              全新的渲染系统，将 Shadow Tree 的构建从 Java/Objective-C 迁移到 C++，
              实现跨平台共享和并发渲染。
            </p>
            <div className="space-y-2">
              {["并发渲染 (Concurrent)", "支持 Suspense", "简化跨平台渲染逻辑"].map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <ChevronRight size={14} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* TurboModules - Side Card */}
          <div
            className="animate-slide topic-card p-6 md:col-span-1"
            style={{
              animationDelay: "0.3s",
              boxShadow: "8px 8px 0px 0px var(--tertiary)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-xl"
                style={{
                  backgroundColor: "var(--tertiary)",
                  border: "3px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                <Cpu size={24} strokeWidth={2.5} />
              </div>
              <h3
                className="text-xl font-extrabold"
                style={{ fontFamily: "'Outfit', sans-serif", color: "#B45309" }}
              >
                TurboModules
              </h3>
            </div>
            <p className="text-sm leading-relaxed mb-4 opacity-80" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              取代旧的 NativeModules 系统，通过 JSI 实现同步调用，支持懒加载，大幅优化启动性能。
            </p>
            <div className="space-y-2">
              {["按需懒加载模块", "同步方法调用", "类型安全接口定义"].map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <ChevronRight size={14} strokeWidth={2.5} style={{ color: "var(--tertiary)" }} />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FABRIC DEEP DIVE ==================== */}
      <section className="container mb-24">
        <SectionHeader
          tag="渲染引擎"
          tagColor="var(--secondary)"
          title="Fabric 渲染器深度拆解"
          subtitle="新的渲染流水线如何实现并发渲染和更好的用户体验"
        />

        {/* Rendering Pipeline Flow */}
        <div
          className="animate-slide topic-card p-6 md:p-10 mb-8"
          style={{ animationDelay: "0.1s" }}
        >
          <h4
            className="text-lg font-extrabold mb-6 flex items-center gap-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <Workflow size={22} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
            Fabric 渲染流水线
          </h4>

          <div className="flex flex-col md:flex-row items-stretch gap-3">
            {[
              {
                step: "1",
                title: "React 描述",
                desc: "JSX 生成 React Element Tree",
                color: "var(--tertiary)",
              },
              {
                step: "2",
                title: "Shadow Tree",
                desc: "C++ 层计算布局 (Yoga)",
                color: "var(--accent)",
              },
              {
                step: "3",
                title: "Diff & Commit",
                desc: "对比新旧树，提交最小变更",
                color: "var(--secondary)",
              },
              {
                step: "4",
                title: "Mount",
                desc: "在 UI 线程挂载原生视图",
                color: "var(--quaternary)",
              },
            ].map((s, i) => (
              <div key={i} className="flex-1 flex items-center gap-3">
                <div className="flex-1 text-center">
                  <div
                    className="w-full py-4 px-3 rounded-xl mb-2"
                    style={{
                      backgroundColor: s.color,
                      border: "2px solid var(--foreground)",
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                    }}
                  >
                    <div
                      className="text-white text-xl font-extrabold"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {s.title}
                    </div>
                  </div>
                  <div className="text-xs opacity-60 font-medium">{s.desc}</div>
                </div>
                {i < 3 && (
                  <ArrowRight
                    size={20}
                    strokeWidth={2.5}
                    className="hidden md:block shrink-0 opacity-40"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Fabric Detail Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="animate-slide topic-card p-6" style={{ animationDelay: "0.15s" }}>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-extrabold"
                style={{
                  backgroundColor: "var(--secondary)",
                  border: "2px solid var(--foreground)",
                  color: "white",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                C
              </div>
              <h4 className="font-extrabold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Shadow Tree C++ 化
              </h4>
            </div>
            <p className="text-sm leading-relaxed opacity-80 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              旧架构中，Shadow Tree 在 Android (Java) 和 iOS (ObjC) 各自独立实现。Fabric 将其统一到
              C++ 层，这意味着：
            </p>
            <ul className="space-y-2 text-sm">
              {[
                "跨平台一致的布局计算逻辑",
                "利用 C++ 多线程能力并发构建",
                "减少平台特定 bug 和维护成本",
                "Shadow Tree 与 JS 运行时同进程访问",
              ].map((t, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <div
                    className="w-5 h-5 mt-0.5 shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: "var(--secondary)",
                      border: "2px solid var(--foreground)",
                      color: "white",
                    }}
                  >
                    {i + 1}
                  </div>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-slide topic-card p-6" style={{ animationDelay: "0.25s" }}>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-extrabold"
                style={{
                  backgroundColor: "var(--accent)",
                  border: "2px solid var(--foreground)",
                  color: "white",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                ∥
              </div>
              <h4 className="font-extrabold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                并发渲染能力
              </h4>
            </div>
            <p className="text-sm leading-relaxed opacity-80 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Fabric 引入了类似 React 18 的并发特性，允许渲染工作在优先级调度下进行：
            </p>
            <div className="space-y-3">
              {[
                {
                  label: "高优先级",
                  desc: "用户交互响应 (触摸、手势)",
                  color: "var(--secondary)",
                },
                {
                  label: "普通优先级",
                  desc: "常规 UI 更新和导航",
                  color: "var(--accent)",
                },
                {
                  label: "低优先级",
                  desc: "屏幕外内容的预渲染",
                  color: "var(--tertiary)",
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{
                    border: "2px solid var(--border)",
                    backgroundColor: "color-mix(in srgb, var(--card) 100%, transparent)",
                  }}
                >
                  <div
                    className="shrink-0 w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: p.color,
                      border: "2px solid var(--foreground)",
                    }}
                  />
                  <div>
                    <span className="font-bold text-sm">{p.label}</span>
                    <span className="text-sm opacity-60 ml-2">— {p.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TURBOMODULES + CODEGEN ==================== */}
      <section className="container mb-24">
        <SectionHeader
          tag="模块系统"
          tagColor="var(--tertiary)"
          title="TurboModules 与 Codegen"
          subtitle="按需加载、同步调用、编译期类型安全"
        />

        <div className="grid lg:grid-cols-5 gap-6">
          {/* TurboModules Detail */}
          <div
            className="animate-slide topic-card p-6 md:p-8 lg:col-span-3"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-xl"
                style={{
                  backgroundColor: "var(--tertiary)",
                  border: "3px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                <Cpu size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h3
                  className="text-2xl font-extrabold"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  TurboModules
                </h3>
                <div className="text-xs opacity-60 font-bold uppercase tracking-wider">
                  懒加载 · 同步 · 类型安全
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th
                      className="text-left py-3 px-4 font-extrabold uppercase tracking-wider text-xs"
                      style={{
                        borderBottom: "3px solid var(--foreground)",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      特性
                    </th>
                    <th
                      className="text-center py-3 px-4 font-extrabold uppercase tracking-wider text-xs"
                      style={{
                        borderBottom: "3px solid var(--foreground)",
                        fontFamily: "'Outfit', sans-serif",
                        color: "var(--secondary)",
                      }}
                    >
                      旧 NativeModules
                    </th>
                    <th
                      className="text-center py-3 px-4 font-extrabold uppercase tracking-wider text-xs"
                      style={{
                        borderBottom: "3px solid var(--foreground)",
                        fontFamily: "'Outfit', sans-serif",
                        color: "var(--quaternary)",
                      }}
                    >
                      TurboModules
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "加载时机", old: "启动时全量加载", fresh: "按需懒加载 ✓" },
                    { feature: "通信方式", old: "异步 Bridge", fresh: "JSI 同步调用 ✓" },
                    { feature: "类型检查", old: "运行时", fresh: "编译期 (Codegen) ✓" },
                    { feature: "方法签名", old: "手写原生代码", fresh: "自动生成代码 ✓" },
                    { feature: "性能", old: "JSON 序列化", fresh: "直接内存访问 ✓" },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <td className="py-3 px-4 font-bold">{row.feature}</td>
                      <td className="py-3 px-4 text-center opacity-60">{row.old}</td>
                      <td
                        className="py-3 px-4 text-center font-semibold"
                        style={{ color: "var(--quaternary)" }}
                      >
                        {row.fresh}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Code Example */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "2px solid var(--foreground)" }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{ backgroundColor: "var(--foreground)", color: "white" }}
              >
                <FileCode size={16} strokeWidth={2.5} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  NativeTurboModule.ts (Spec)
                </span>
              </div>
              <pre
                className="p-5 overflow-x-auto text-sm leading-relaxed"
                style={{
                  backgroundColor: "#1E1E2E",
                  color: "#CDD6F4",
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                }}
              >
                <code className="language-typescript">
{`// TurboModule Spec — Codegen 会据此生成原生接口
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // 同步方法 — 直接返回值，无 Bridge 延迟
  getConstants(): {
    screenWidth: number;
    screenHeight: number;
    isTablet: boolean;
  };

  // 异步方法 — 返回 Promise
  fetchUserData(userId: string): Promise<{
    name: string;
    email: string;
    avatar: string;
  }>;

  // 带回调的方法
  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

// 懒加载：仅在首次调用时初始化原生模块
export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeUserModule'
);`}
                </code>
              </pre>
            </div>
          </div>

          {/* Codegen Side */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div
              className="animate-slide topic-card p-6 flex-1"
              style={{
                animationDelay: "0.2s",
                boxShadow: "8px 8px 0px 0px var(--accent)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl"
                  style={{
                    backgroundColor: "var(--accent)",
                    border: "3px solid var(--foreground)",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  <Code2 size={24} strokeWidth={2.5} color="white" />
                </div>
                <div>
                  <h3
                    className="text-xl font-extrabold"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "var(--accent)" }}
                  >
                    Codegen
                  </h3>
                  <div className="text-xs opacity-60 font-bold uppercase tracking-wider">
                    编译期代码生成
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-4 opacity-80" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Codegen 读取 TypeScript / Flow 的类型定义 (Spec)，在编译期自动生成平台特定的胶水代码，
                消除手写序列化逻辑和运行时类型错误。
              </p>

              <div
                className="p-4 rounded-xl"
                style={{
                  border: "2px dashed var(--accent)",
                  backgroundColor: "color-mix(in srgb, var(--accent) 5%, transparent)",
                }}
              >
                <div className="text-xs font-bold uppercase tracking-wider mb-3 opacity-60">
                  生成产物
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { platform: "iOS", file: "RNUserModuleSpec.h / .mm" },
                    { platform: "Android", file: "NativeUserModuleSpec.java" },
                    { platform: "C++", file: "JSI 互操作接口" },
                  ].map((g, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span
                        className="px-2 py-0.5 rounded text-xs font-bold"
                        style={{
                          backgroundColor: "var(--accent)",
                          color: "white",
                          border: "1.5px solid var(--foreground)",
                        }}
                      >
                        {g.platform}
                      </span>
                      <code className="text-xs opacity-70" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {g.file}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Tip */}
            <div
              className="animate-slide p-5 rounded-xl"
              style={{
                animationDelay: "0.3s",
                backgroundColor: "var(--tertiary)",
                border: "2px solid var(--foreground)",
                boxShadow: "6px 6px 0px 0px var(--foreground)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} strokeWidth={2.5} />
                <span className="font-extrabold text-sm uppercase tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  开发提示
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                启用新架构只需在 <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--foreground)", color: "var(--tertiary)" }}>react-native.config.js</code> 中设置
                <code className="px-1.5 py-0.5 rounded text-xs ml-1" style={{ backgroundColor: "var(--foreground)", color: "var(--tertiary)" }}>
                  newArchEnabled: true
                </code>
                ，并确保 Hermes 引擎已启用。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== DATA FLOW DIAGRAM ==================== */}
      <section className="container mb-24">
        <SectionHeader
          tag="数据流"
          tagColor="var(--quaternary)"
          title="新架构完整数据流"
          subtitle="从 React 组件到原生像素的全链路追踪"
        />

        <div
          className="animate-slide topic-card p-6 md:p-10 overflow-x-auto"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="min-w-[700px]">
            {/* Row 1: JS Side */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="px-4 py-2 rounded-xl font-extrabold text-sm"
                style={{
                  backgroundColor: "var(--tertiary)",
                  border: "2px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                JS 线程
              </div>
              <div className="flex-1 h-[2px]" style={{ backgroundColor: "var(--border)" }} />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { title: "React 组件", desc: "useState / useReducer 触发更新", color: "var(--tertiary)", icon: Boxes },
                { title: "Reconciler", desc: "Virtual DOM Diff", color: "var(--tertiary)", icon: GitBranch },
                { title: "JSI 调用", desc: "同步传递 Shadow Tree", color: "var(--accent)", icon: Network },
                { title: "TurboModule", desc: "调用原生功能", color: "var(--tertiary)", icon: Cpu },
              ].map((node, i) => (
                <div key={i} className="relative">
                  <div
                    className="p-4 rounded-xl text-center"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--card) 90%, transparent)",
                      border: "2px solid var(--foreground)",
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                    }}
                  >
                    <div
                      className="w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: node.color,
                        border: "2px solid var(--foreground)",
                      }}
                    >
                      <node.icon size={20} strokeWidth={2.5} color={node.color === "var(--accent)" ? "white" : "var(--foreground)"} />
                    </div>
                    <div className="font-extrabold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {node.title}
                    </div>
                    <div className="text-xs opacity-60 mt-1">{node.desc}</div>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 z-10">
                      <ArrowRight size={16} strokeWidth={2.5} className="opacity-40" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center mb-2">
              <div
                className="w-[3px] h-8 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </div>
            <div className="text-center mb-4">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "white",
                  border: "2px solid var(--foreground)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                JSI (C++ Host Objects)
              </span>
            </div>
            <div className="flex justify-center mb-6">
              <div
                className="w-[3px] h-8 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </div>

            {/* Row 2: Native Side */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="px-4 py-2 rounded-xl font-extrabold text-sm"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "white",
                  border: "2px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                原生层 (C++ / Platform)
              </div>
              <div className="flex-1 h-[2px]" style={{ backgroundColor: "var(--border)" }} />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[
                { title: "Shadow Tree", desc: "C++ 构建 & Yoga 布局", color: "var(--secondary)", icon: Layers },
                { title: "Diff 计算", desc: "对比新旧树差异", color: "var(--secondary)", icon: RefreshCw },
                { title: "Commit", desc: "提交到 Mounting 层", color: "var(--secondary)", icon: CheckCircle2 },
                { title: "原生视图", desc: "UIView / AndroidView", color: "var(--quaternary)", icon: Boxes },
              ].map((node, i) => (
                <div key={i} className="relative">
                  <div
                    className="p-4 rounded-xl text-center"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--card) 90%, transparent)",
                      border: "2px solid var(--foreground)",
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                    }}
                  >
                    <div
                      className="w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: node.color,
                        border: "2px solid var(--foreground)",
                      }}
                    >
                      <node.icon size={20} strokeWidth={2.5} color={node.color === "var(--quaternary)" ? "var(--foreground)" : "white"} />
                    </div>
                    <div className="font-extrabold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {node.title}
                    </div>
                    <div className="text-xs opacity-60 mt-1">{node.desc}</div>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 z-10">
                      <ArrowRight size={16} strokeWidth={2.5} className="opacity-40" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MIGRATION & TIMELINE ==================== */}
      <section className="container mb-24">
        <SectionHeader
          tag="迁移路径"
          tagColor="var(--accent)"
          title="如何迁移到新架构"
          subtitle="分步骤、零停机的渐进式迁移策略"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Timeline */}
          <div className="animate-slide" style={{ animationDelay: "0.1s" }}>
            <div
              className="relative pl-8 border-l-[3px]"
              style={{ borderColor: "var(--accent)" }}
            >
              {[
                {
                  year: "Step 1",
                  title: "升级 React Native",
                  desc: "确保使用 RN 0.76+，Hermes 引擎已启用",
                  color: "var(--accent)",
                },
                {
                  year: "Step 2",
                  title: "迁移 NativeModules → TurboModules",
                  desc: "为每个模块创建 TurboModule Spec，使用 Codegen 生成代码",
                  color: "var(--secondary)",
                },
                {
                  year: "Step 3",
                  title: "适配 Fabric 渲染器",
                  desc: "更新自定义原生组件以兼容 Fabric 的 C++ 渲染管线",
                  color: "var(--tertiary)",
                },
                {
                  year: "Step 4",
                  title: "全量启用新架构",
                  desc: "在生产环境开启 newArchEnabled 标志，监控性能指标",
                  color: "var(--quaternary)",
                },
              ].map((item, i) => (
                <div key={i} className="relative mb-8 last:mb-0">
                  {/* Timeline Dot */}
                  <div
                    className="absolute -left-[calc(2rem+1.5px+5px)] top-1 w-[22px] h-[22px] rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: item.color,
                      border: "3px solid var(--foreground)",
                      boxShadow: "3px 3px 0px 0px var(--foreground)",
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>

                  <div
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: "var(--card)",
                      border: "2px solid var(--foreground)",
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: item.color,
                          border: "1.5px solid var(--foreground)",
                          color: item.color === "var(--tertiary)" ? "var(--foreground)" : "white",
                        }}
                      >
                        {item.year}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {item.title}
                    </h4>
                    <p className="text-sm opacity-70 mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Migration Checklist + Tips */}
          <div className="flex flex-col gap-6">
            <div
              className="animate-slide topic-card p-6"
              style={{ animationDelay: "0.2s" }}
            >
              <h4
                className="text-lg font-extrabold mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <GitBranch size={20} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
                迁移检查清单
              </h4>
              <div className="space-y-2.5">
                {[
                  "Hermes 引擎已启用且版本兼容",
                  "所有第三方库支持新架构",
                  "自定义 NativeModule 已迁移为 TurboModule",
                  "自定义 NativeComponent 已适配 Fabric",
                  "Codegen 配置已在 package.json 中声明",
                  "iOS Podfile 和 Android gradle 已更新",
                  "E2E 测试覆盖核心流程",
                  "性能基准测试已建立",
                ].map((item, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors"
                    style={{
                      border: "1.5px solid var(--border)",
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                      style={{
                        border: "2px solid var(--foreground)",
                        backgroundColor: "var(--card)",
                      }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{ backgroundColor: i < 5 ? "var(--quaternary)" : "transparent" }}
                      />
                    </div>
                    <span className="text-sm">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Interop Mode Tip */}
            <div
              className="animate-slide p-5 rounded-xl"
              style={{
                animationDelay: "0.3s",
                backgroundColor: "color-mix(in srgb, var(--accent) 8%, var(--card))",
                border: "2px solid var(--accent)",
                boxShadow: "6px 6px 0px 0px var(--accent)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
                <span
                  className="font-extrabold text-sm uppercase tracking-wider"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "var(--accent)" }}
                >
                  Interop 模式
                </span>
              </div>
              <p className="text-sm leading-relaxed opacity-80" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                新架构提供了 <strong>Interop Layer</strong>，允许未迁移的旧模块在新架构下继续工作。
                这意味着你可以逐步迁移，而不必一次性重写所有原生代码。但性能优化仅限于已迁移的模块。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== KEY TAKEAWAYS ==================== */}
      <section className="container">
        <SectionHeader
          tag="总结"
          tagColor="var(--quaternary)"
          title="核心要点速览"
          subtitle="记住这几点，你就掌握了新架构的精髓"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: Network,
              title: "JSI 替代 Bridge",
              desc: "C++ 层实现 JS ↔ Native 的同步直接调用，告别 JSON 序列化和异步等待",
              color: "var(--accent)",
            },
            {
              icon: Layers,
              title: "Fabric 并发渲染",
              desc: "C++ Shadow Tree + 优先级调度，实现流畅的并发 UI 更新",
              color: "var(--secondary)",
            },
            {
              icon: Cpu,
              title: "TurboModules 懒加载",
              desc: "原生模块按需初始化，启动时间缩短 40%，内存占用降低 30%",
              color: "var(--tertiary)",
            },
            {
              icon: Code2,
              title: "Codegen 类型安全",
              desc: "编译期从 TypeScript Spec 自动生成原生接口代码，消灭运行时类型错误",
              color: "var(--quaternary)",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="animate-slide topic-card p-6 text-center"
              style={{
                animationDelay: `${0.1 + i * 0.08}s`,
                boxShadow: `6px 6px 0px 0px ${item.color}`,
              }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: item.color,
                  border: "3px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                <item.icon size={28} strokeWidth={2.5} color="white" />
              </div>
              <h4
                className="font-extrabold text-base mb-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {item.title}
              </h4>
              <p className="text-sm opacity-70 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ==================== SHARED COMPONENTS ==================== */

function SectionHeader({
  tag,
  tagColor,
  title,
  subtitle,
}: {
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-10">
      <span
        className="animate-pop inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4"
        style={{
          backgroundColor: tagColor,
          border: "2px solid var(--foreground)",
          borderRadius: "var(--radius-full)",
          boxShadow: "4px 4px 0px 0px var(--foreground)",
          color:
            tagColor === "var(--tertiary)"
              ? "var(--foreground)"
              : "white",
        }}
      >
        {tag}
      </span>
      <h2
        className="animate-pop text-3xl md:text-4xl font-extrabold mb-3"
        style={{
          fontFamily: "'Outfit', sans-serif",
          color: "var(--foreground)",
        }}
      >
        {title}
      </h2>
      <p
        className="animate-slide text-base md:text-lg opacity-60 max-w-2xl"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          animationDelay: "0.1s",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}