// app/knowledge/vite-principles/page.tsx
import type { Metadata } from "next";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import {
  Zap,
  Server,
  RefreshCw,
  Puzzle,
  Package,
  Layers,
  ArrowRight,
  Code2,
  Cpu,
  FileCode,
  Globe,
  GitBranch,
  Rocket,
  BookOpen,
  ChevronRight,
  Boxes,
  Workflow,
  Terminal,
  Lightbulb,
  Gauge,
  ArrowDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "结合源码详解 Vite 原理 | Knowledge Hub",
  description: "深入 Vite 源码，理解其极速开发体验背后的核心架构与设计哲学",
};

/* ────────────────────────────────────
   小型可复用组件
   ──────────────────────────────────── */

function GeometricBadge({
  icon: Icon,
  color = "accent",
  size = "md",
}: {
  icon: React.ElementType;
  color?: "accent" | "secondary" | "tertiary" | "quaternary";
  size?: "sm" | "md" | "lg";
}) {
  const colorMap = {
    accent: "bg-[#8B5CF6]",
    secondary: "bg-[#F472B6]",
    tertiary: "bg-[#FBBF24]",
    quaternary: "bg-[#34D399]",
  };
  const sizeMap = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };
  const iconSizeMap = { sm: 18, md: 22, lg: 28 };

  return (
    <div
      className={`${sizeMap[size]} ${colorMap[color]} rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center shadow-[4px_4px_0px_0px_var(--foreground)]`}
    >
      <Icon size={iconSizeMap[size]} strokeWidth={2.5} className="text-white" />
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <span className="inline-block px-4 py-1.5 bg-[var(--tertiary)] border-2 border-[var(--foreground)] rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_var(--foreground)]">
      {text}
    </span>
  );
}

function CodeBlock({
  code,
  filename,
  language = "typescript",
}: {
  code: string;
  filename?: string;
  language?: string;
}) {
  const html = Prism.highlight(code.trim(), Prism.languages[language] || Prism.languages.typescript, language);
  return (
    <div className="border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_var(--foreground)] bg-[#1E293B]">
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0F172A] border-b-2 border-[var(--foreground)]">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#F472B6] border border-[var(--foreground)]" />
            <span className="w-3 h-3 rounded-full bg-[#FBBF24] border border-[var(--foreground)]" />
            <span className="w-3 h-3 rounded-full bg-[#34D399] border border-[var(--foreground)]" />
          </div>
          <span className="ml-2 text-[#94A3B8] text-xs font-['Plus_Jakarta_Sans'] font-semibold">
            {filename}
          </span>
          <span className="ml-auto px-2 py-0.5 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
            {language}
          </span>
        </div>
      )}
      <pre className={`p-5 overflow-x-auto text-sm leading-relaxed language-${language}`}>
        <code 
          className={`font-['JetBrains_Mono',monospace] text-[#E2E8F0] language-${language}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  );
}


function ConceptCard({
  icon,
  color,
  title,
  description,
  index,
}: {
  icon: React.ElementType;
  color: "accent" | "secondary" | "tertiary" | "quaternary";
  title: string;
  description: string;
  index: number;
}) {
  const bgMap = {
    accent: "bg-[#8B5CF6]/10",
    secondary: "bg-[#F472B6]/10",
    tertiary: "bg-[#FBBF24]/10",
    quaternary: "bg-[#34D399]/10",
  };
  const borderColorMap = {
    accent: "border-[#8B5CF6]",
    secondary: "border-[#F472B6]",
    tertiary: "border-[#FBBF24]",
    quaternary: "border-[#34D399]",
  };

  return (
    <div
      className={`topic-card ${bgMap[color]} ${borderColorMap[color]} rounded-2xl p-6 animate-slide relative overflow-hidden`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* 装饰几何 */}
      <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full border-2 border-dashed border-[var(--border)] opacity-40" />
      <div className="flex items-start gap-4">
        <GeometricBadge icon={icon} color={color} />
        <div className="flex-1 min-w-0">
          <h3 className="font-['Outfit'] font-extrabold text-lg text-[var(--foreground)] mb-2">
            {title}
          </h3>
          <p className="text-[var(--foreground)]/70 text-sm leading-relaxed font-['Plus_Jakarta_Sans']">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function FlowStep({
  step,
  title,
  detail,
  icon: Icon,
  color,
  isLast,
}: {
  step: number;
  title: string;
  detail: string;
  icon: React.ElementType;
  color: string;
  isLast?: boolean;
}) {
  return (
    <div className="flex gap-4 animate-slide" style={{ animationDelay: `${step * 0.12}s` }}>
      {/* 时间轴 */}
      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full border-2 border-[var(--foreground)] flex items-center justify-center font-['Outfit'] font-extrabold text-sm text-white shadow-[3px_3px_0px_0px_var(--foreground)] shrink-0`}
          style={{ backgroundColor: color }}
        >
          {step}
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 min-h-[40px] border-l-2 border-dashed border-[var(--border)] my-2" />
        )}
      </div>
      {/* 内容 */}
      <div className="pb-8 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Icon size={18} strokeWidth={2.5} className="text-[var(--foreground)]" />
          <h4 className="font-['Outfit'] font-bold text-base text-[var(--foreground)]">{title}</h4>
        </div>
        <p className="text-sm text-[var(--foreground)]/65 font-['Plus_Jakarta_Sans'] leading-relaxed">
          {detail}
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────
   主页面
   ──────────────────────────────────── */
export default function VitePrinciplesPage() {
  return (
    <div className="bg-dot-grid min-h-screen pb-24">
      {/* ════════  HERO  ════════ */}
      <section className="relative overflow-hidden pb-10 md:pb-28">
        {/* 装饰性 Blob */}
        <div
          className="absolute -top-24 -left-24 w-72 h-72 bg-[var(--tertiary)] opacity-20 border-2 border-[var(--foreground)]/10 -z-10"
          style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
        />
        <div
          className="absolute -bottom-16 -right-16 w-56 h-56 bg-[var(--secondary)] opacity-15 border-2 border-[var(--foreground)]/10 -z-10"
          style={{ borderRadius: "30% 70% 60% 40% / 40% 60% 30% 70%" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-[var(--accent)] opacity-10 -z-10 rotate-45 rounded-2xl"
        />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
            {/* 左侧文字 */}
            <div className="flex-1 animate-pop">
              <SectionLabel text="Build Tool Deep Dive" />
              <h1 className="mt-3 md:mt-5 font-['Outfit'] font-extrabold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[var(--foreground)] leading-[1.1] tracking-tight">
                结合源码
                <br />
                详解{" "}
                <span className="relative inline-block">
                  <span className="text-[var(--accent)]">Vite</span>
                  <span className="absolute -bottom-1 left-0 w-full h-3 bg-[var(--tertiary)] opacity-40 -z-10 rounded-full" />
                </span>{" "}
                原理
              </h1>
              <p className="mt-3 md:mt-6 text-sm md:text-lg text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] leading-relaxed max-w-xl">
                深入 Vite 源码仓库，理解其<strong className="text-[var(--foreground)] font-bold">原生 ESM 驱动的开发服务器</strong>
                、<strong className="text-[var(--foreground)] font-bold">毫秒级 HMR</strong> 与{" "}
                <strong className="text-[var(--foreground)] font-bold">Rollup 生产构建</strong>是如何协同工作，
                彻底重塑前端开发体验的。
              </p>

              {/* 元信息标签 */}
              <div className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-8">
                {[
                  { label: "源码版本 5.x", icon: GitBranch },
                  { label: "阅读时长 ~25 min", icon: BookOpen },
                  { label: "深度原理", icon: Lightbulb },
                ].map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-[var(--foreground)] rounded-full text-xs font-bold font-['Plus_Jakarta_Sans'] shadow-[3px_3px_0px_0px_var(--foreground)]"
                  >
                    <item.icon size={14} strokeWidth={2.5} />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            {/* 右侧装饰卡片 */}
            <div className="w-full lg:w-[380px] shrink-0 animate-slide" style={{ animationDelay: "0.2s" }}>
              <div className="bg-white border-2 border-[var(--foreground)] rounded-3xl p-6 shadow-[8px_8px_0px_0px_var(--foreground)] relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-[var(--accent)] opacity-10 rounded-full" />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[var(--accent)] rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center">
                    <Zap size={20} strokeWidth={2.5} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Outfit'] font-bold text-sm">Vite 核心优势</h3>
                    <p className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">Why is it so fast?</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { value: "~300ms", label: "冷启动时间", color: "#8B5CF6" },
                    { value: "<50ms", label: "HMR 热更新", color: "#F472B6" },
                    { value: "0 次", label: "打包即可开发", color: "#34D399" },
                    { value: "Rollup", label: "生产级构建", color: "#FBBF24" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between p-3 rounded-xl border-2 border-[var(--foreground)]/10 bg-[var(--background)]"
                    >
                      <span className="text-xs font-semibold font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/60">
                        {stat.label}
                      </span>
                      <span
                        className="font-['Outfit'] font-extrabold text-base"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════  传统打包 vs Vite 对比  ════════ */}
      <section className="container px-4 md:px-6 mb-10 md:mb-20">
        <div className="mb-12">
          <SectionLabel text="The Problem" />
          <h2 className="mt-4 font-['Outfit'] font-extrabold text-3xl md:text-4xl text-[var(--foreground)]">
            传统打包器的困境
          </h2>
          <p className="mt-3 text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] max-w-2xl">
            Webpack 等工具将所有模块打包为 Bundle 再交给浏览器，项目越大，启动越慢。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 传统方案 */}
          <div className="bg-white border-2 border-[var(--foreground)] rounded-3xl p-8 shadow-[8px_8px_0px_0px_var(--foreground)] relative overflow-hidden animate-slide">
            <div className="absolute top-4 right-4 px-3 py-1 bg-red-100 border-2 border-red-400 rounded-full text-xs font-bold text-red-600 font-['Outfit']">
              传统打包器
            </div>
            <div className="flex items-center gap-3 mb-6">
              <GeometricBadge icon={Package} color="secondary" />
              <h3 className="font-['Outfit'] font-bold text-xl">Bundle-Based</h3>
            </div>
            <div className="flex items-center gap-2 mb-6">
              {["解析入口", "→", "递归打包", "→", "生成Bundle", "→", "启动服务"].map((t, i) =>
                t === "→" ? (
                  <ArrowRight key={i} size={16} className="text-[var(--foreground)]/30 shrink-0" />
                ) : (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-[var(--secondary)]/10 border border-[var(--secondary)]/30 rounded-lg text-xs font-bold text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] whitespace-nowrap"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
            <CodeBlock
              filename="webpack 启动流程"
              language="伪代码"
              code={`// Webpack 启动时必须完成全量打包
entry → resolve → transform → chunk → bundle
// 1000 个模块 ≈ 3~30s 冷启动
// 改一个文件 → 重新打包受影响 chunk ≈ 1~5s`}
            />
          </div>

          {/* Vite 方案 */}
          <div
            className="bg-white border-2 border-[var(--foreground)] rounded-3xl p-8 shadow-[8px_8px_0px_0px_var(--accent)] relative overflow-hidden animate-slide"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="absolute top-4 right-4 px-3 py-1 bg-green-100 border-2 border-green-400 rounded-full text-xs font-bold text-green-600 font-['Outfit']">
              Vite
            </div>
            <div className="flex items-center gap-3 mb-6">
              <GeometricBadge icon={Zap} color="quaternary" />
              <h3 className="font-['Outfit'] font-bold text-xl">ESM-Native</h3>
            </div>
            <div className="flex items-center gap-2 mb-6">
              {["启动服务", "→", "按需编译", "→", "浏览器原生加载"].map((t, i) =>
                t === "→" ? (
                  <ArrowRight key={i} size={16} className="text-[var(--foreground)]/30 shrink-0" />
                ) : (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-[var(--quaternary)]/10 border border-[var(--quaternary)]/30 rounded-lg text-xs font-bold text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] whitespace-nowrap"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
            <CodeBlock
              filename="vite 启动流程"
              language="伪代码"
              code={`// Vite 不打包！直接启动 Dev Server
server = createServer(config)
await server.listen()
// 浏览器请求时才编译单个模块
// 1000 个模块 ≈ 300ms 冷启动
// 改一个文件 → 只重编译该模块 ≈ 20ms`}
            />
          </div>
        </div>
      </section>

      {/* ════════  核心架构总览  ════════ */}
      <section className="container px-4 md:px-6 mb-10 md:mb-20">
        <div className="mb-12">
          <SectionLabel text="Architecture" />
          <h2 className="mt-4 font-['Outfit'] font-extrabold text-3xl md:text-4xl text-[var(--foreground)]">
            Vite 源码架构全景
          </h2>
          <p className="mt-3 text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] max-w-2xl">
            Vite 的源码仓库包含多个核心模块，每个模块各司其职，构成完整的工具链。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ConceptCard
            index={0}
            icon={Server}
            color="accent"
            title="Dev Server"
            description="基于 connect 的轻量 HTTP 服务器。接收浏览器请求，通过 Plugin Pipeline 编译模块并返回 ESM 响应。源码：packages/vite/src/node/server/"
          />
          <ConceptCard
            index={1}
            icon={RefreshCw}
            color="secondary"
            title="HMR 引擎"
            description="基于 WebSocket 的热更新通道。精确计算更新边界，仅替换变更模块。源码：packages/vite/src/node/hmr/"
          />
          <ConceptCard
            index={2}
            icon={Puzzle}
            color="tertiary"
            title="Plugin 系统"
            description="兼容 Rollup 插件接口，扩展了开发阶段独有钩子（configureServer, transformIndexHtml 等）。源码：packages/vite/src/node/plugin/"
          />
          <ConceptCard
            index={3}
            icon={Package}
            color="quaternary"
            title="Build (Rollup)"
            description="生产构建直接委托给 Rollup，Vite 在其上叠加 CSS 处理、HTML 处理等插件。源码：packages/vite/src/node/build.ts"
          />
          <ConceptCard
            index={4}
            icon={Cpu}
            color="accent"
            title="依赖预构建"
            description="使用 esbuild 将 CommonJS/UMD 依赖转为 ESM 并打包，缓存于 node_modules/.vite/。源码：packages/vite/src/node/optimizer/"
          />
          <ConceptCard
            index={5}
            icon={Code2}
            color="secondary"
            title="CSS / 静态资源"
            description="内置 CSS Modules、PostCSS、静态资源处理，所有资源均通过 Plugin Pipeline。源码：packages/vite/src/node/plugins/"
          />
        </div>
      </section>

      {/* ════════  源码解读 1: 创建 Dev Server  ════════ */}
      <section className="container px-4 md:px-6 mb-10 md:mb-20">
        <div className="flex items-center gap-3 mb-8">
          <GeometricBadge icon={Terminal} color="accent" size="lg" />
          <div>
            <SectionLabel text="Source Code 01" />
            <h2 className="mt-2 font-['Outfit'] font-extrabold text-2xl md:text-3xl text-[var(--foreground)]">
              创建开发服务器
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <p className="text-[var(--foreground)]/75 font-['Plus_Jakarta_Sans'] leading-relaxed mb-6">
              当你在终端执行 <code className="px-2 py-0.5 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-md text-sm font-bold text-[var(--accent)]">vite</code> 时，
              入口文件是 <code className="px-2 py-0.5 bg-[var(--foreground)]/5 border border-[var(--border)] rounded-md text-sm">packages/vite/src/node/cli.ts</code>，
              它最终调用 <code className="px-2 py-0.5 bg-[var(--foreground)]/5 border border-[var(--border)] rounded-md text-sm">createServer()</code> 创建实例：
            </p>
            <CodeBlock
              filename="packages/vite/src/node/server/index.ts"
              language="TypeScript"
              code={`export async function createServer(
  inlineConfig: InlineConfig = {}
): Promise<ViteDevServer> {
  // 1. 解析配置：合并默认配置 + 用户 vite.config.ts
  const config = await resolveConfig(inlineConfig, 'serve')

  // 2. 创建中间件容器（基于 connect）
  const middlewares = connect()

  // 3. 创建 WebSocket 服务器（用于 HMR 通信）
  const ws = createWebSocketServer(httpServer, config)

  // 4. 初始化插件容器
  const pluginContainer = await createPluginContainer(config)

  // 5. 注册内置中间件（静态文件、HTML回退、转换等）
  // ── 被封装在 internalPlugins 中
  for (const plugin of config.plugins) {
    if (plugin.configureServer) {
      await plugin.configureServer(server)
    }
  }

  // 6. 返回完整的 server 实例
  const server: ViteDevServer = {
    config,
    middlewares,
    ws,
    pluginContainer,
    transformRequest(url) { /* ... */ },
    listen(port) { /* ... */ },
    // ...
  }
  return server
}`}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-[var(--foreground)] rounded-3xl p-6 shadow-[8px_8px_0px_0px_var(--tertiary)] sticky top-8">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={18} strokeWidth={2.5} className="text-[var(--tertiary)]" />
                <h4 className="font-['Outfit'] font-bold text-sm">关键设计点</h4>
              </div>
              <ul className="space-y-4">
                {[
                  {
                    q: "为什么用 connect 而不是 Express？",
                    a: "connect 极轻量（无路由层），Vite 只需中间件管道，不需 Express 的额外抽象。",
                  },
                  {
                    q: "pluginContainer 是什么？",
                    a: "它是 Rollup 插件钩子的运行容器，负责 resolveId → load → transform 的管线调度。",
                  },
                  {
                    q: "configureServer 钩子的作用？",
                    a: "允许插件在服务启动前注入自定义中间件或拦截请求，如 vite-plugin-mock。",
                  },
                ].map((item, i) => (
                  <li key={i} className="pb-4 border-b border-[var(--border)] last:border-0 last:pb-0">
                    <p className="font-['Outfit'] font-bold text-sm text-[var(--foreground)] mb-1">{item.q}</p>
                    <p className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] leading-relaxed">
                      {item.a}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════  源码解读 2: 依赖预构建  ════════ */}
      <section className="container px-4 md:px-6 mb-10 md:mb-20">
        <div className="flex items-center gap-3 mb-8">
          <GeometricBadge icon={Cpu} color="tertiary" size="lg" />
          <div>
            <SectionLabel text="Source Code 02" />
            <h2 className="mt-2 font-['Outfit'] font-extrabold text-2xl md:text-3xl text-[var(--foreground)]">
              依赖预构建 (Pre-Bundling)
            </h2>
          </div>
        </div>

        <div className="bg-white border-2 border-[var(--foreground)] rounded-3xl p-8 shadow-[8px_8px_0px_0px_var(--foreground)] mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="font-['Outfit'] font-bold text-lg mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-[var(--tertiary)] border-2 border-[var(--foreground)] rounded-md flex items-center justify-center text-xs font-extrabold text-white shadow-[2px_2px_0px_0px_var(--foreground)]">?</span>
                为什么需要预构建？
              </h3>
              <div className="space-y-3 text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70 leading-relaxed">
                <p>
                  npm 上的大多数包仍然以 <strong className="text-[var(--foreground)]">CommonJS</strong> 或 <strong className="text-[var(--foreground)]">UMD</strong> 格式发布。
                  浏览器的原生 ESM 无法直接 <code className="px-1.5 py-0.5 bg-[var(--foreground)]/5 rounded text-xs">import</code> 这些模块。
                </p>
                <p>
                  此外，像 lodash-es 这样的包包含 <strong className="text-[var(--foreground)]">600+ 个内部模块文件</strong>。
                  如果逐个请求，浏览器会发起大量 HTTP 请求，导致严重的瀑布流延迟。
                </p>
                <p>
                  <strong className="text-[var(--accent)]">预构建的核心目标：</strong>将 CJS→ESM 转换 + 内部模块合并为单文件，
                  结果缓存到 <code className="px-1.5 py-0.5 bg-[var(--foreground)]/5 rounded text-xs">node_modules/.vite/deps/</code>。
                </p>
              </div>
            </div>
            <div className="flex-1">
              <CodeBlock
                filename="packages/vite/src/node/optimizer/index.ts"
                language="TypeScript"
                code={`async function runOptimizeDeps(config) {
  // 1. 扫描入口文件，收集裸模块引用
  const deps = await scanImports(config)
  // deps = { 'react': 'react', 
  //          'react-dom': 'react-dom', ... }

  // 2. 使用 esbuild 进行打包
  const result = await esbuild.build({
    entryPoints: Object.keys(deps),
    bundle: true,          // 合并内部模块
    format: 'esm',         // 输出 ESM 格式
    outdir: depsCacheDir,  // .vite/deps/
    splitting: true,       // 代码分割
    plugins: [
      cjsToEsmPlugin()     // CJS → ESM 转换
    ],
  })

  // 3. 写入元数据（哈希 + 依赖映射）
  writeDepsMetadata(depsCacheDir, {
    hash: getDepHash(deps, config),
    optimized: deps,
  })
}`}
              />
            </div>
          </div>
        </div>

        {/* 流程图 */}
        <div className="bg-[var(--accent)]/5 border-2 border-[var(--accent)]/20 rounded-3xl p-8">
          <h3 className="font-['Outfit'] font-bold text-lg mb-6 text-center">预构建流程图解</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {[
              { icon: FileCode, label: "扫描入口", sub: "scanImports", color: "#8B5CF6" },
              { icon: Boxes, label: "收集依赖", sub: "裸模块解析", color: "#F472B6" },
              { icon: Zap, label: "esbuild 打包", sub: "CJS→ESM + Bundle", color: "#FBBF24" },
              { icon: Globe, label: "缓存输出", sub: ".vite/deps/", color: "#34D399" },
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex flex-col items-center text-center animate-pop" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div
                    className="w-16 h-16 rounded-2xl border-2 border-[var(--foreground)] flex items-center justify-center shadow-[4px_4px_0px_0px_var(--foreground)] mb-2"
                    style={{ backgroundColor: step.color }}
                  >
                    <step.icon size={24} strokeWidth={2.5} className="text-white" />
                  </div>
                  <span className="font-['Outfit'] font-bold text-sm">{step.label}</span>
                  <span className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">{step.sub}</span>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight size={24} className="text-[var(--foreground)]/20 shrink-0 hidden md:block" />
                )}
                {i < arr.length - 1 && (
                  <ArrowDown size={20} className="text-[var(--foreground)]/20 shrink-0 md:hidden" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════  源码解读 3: 模块请求处理 ════════ */}
      <section className="container px-4 md:px-6 mb-10 md:mb-20">
        <div className="flex items-center gap-3 mb-8">
          <GeometricBadge icon={Globe} color="quaternary" size="lg" />
          <div>
            <SectionLabel text="Source Code 03" />
            <h2 className="mt-2 font-['Outfit'] font-extrabold text-2xl md:text-3xl text-[var(--foreground)]">
              模块请求处理管线
            </h2>
          </div>
        </div>

        <p className="text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] leading-relaxed mb-8 max-w-3xl">
          当浏览器遇到 <code className="px-2 py-0.5 bg-[var(--foreground)]/5 border border-[var(--border)] rounded-md text-sm font-semibold">import App from &apos;./App.tsx&apos;</code> 时，
          会向 Vite Dev Server 发起 HTTP 请求。Vite 通过 <strong className="text-[var(--foreground)]">中间件 + 插件管线</strong> 处理该请求。
        </p>

        {/* 流程步骤 */}
        <div className="max-w-2xl">
          <FlowStep
            step={1}
            icon={Server}
            title="transformMiddleware 拦截请求"
            detail="connect 中间件捕获对 .ts/.tsx/.vue/.css 等文件的请求，进入 transform 管线。"
            color="#8B5CF6"
          />
          <FlowStep
            step={2}
            icon={GitBranch}
            title="resolveId — 模块路径解析"
            detail="pluginContainer.resolveId() 遍历所有插件的 resolveId 钩子，将 import 路径转换为文件系统绝对路径。"
            color="#F472B6"
          />
          <FlowStep
            step={3}
            icon={FileCode}
            title="load — 加载文件内容"
            detail="pluginContainer.load() 读取文件内容。某些插件（如虚拟模块）可以在此阶段完全替换内容。"
            color="#FBBF24"
          />
          <FlowStep
            step={4}
            icon={Code2}
            title="transform — 代码转换"
            detail="pluginContainer.transform() 执行核心转换链：TypeScript → JavaScript、JSX → 函数调用、CSS 预处理等。"
            color="#34D399"
          />
          <FlowStep
            step={5}
            icon={Globe}
            title="返回 ESM 响应"
            detail="转换后的代码通过 HTTP 响应返回给浏览器。浏览器原生执行 ESM，无需额外编译。"
            color="#8B5CF6"
            isLast
          />
        </div>

        {/* 核心代码 */}
        <div className="mt-10">
          <CodeBlock
            filename="packages/vite/src/node/server/transformRequest.ts"
            language="TypeScript"
            code={`async function transformRequest(
  url: string,
  server: ViteDevServer,
  options?: TransformResult
): Promise<TransformResult | null> {
  // 1. resolve：将 URL 转换为文件路径
  const id = (await server.pluginContainer.resolveId(url))?.id
    ?? url

  // 2. load：读取文件内容
  const loadResult = await server.pluginContainer.load(id)
  const code = loadResult?.code ?? await fs.readFile(id, 'utf-8')

  // 3. transform：应用所有插件的 transform 钩子
  const result = await server.pluginContainer.transform(code, id)

  // 4. 缓存结果（后续相同请求直接返回）
  moduleGraph.ensureEntryFromUrl(url)
  return {
    code: result?.code,
    map: result?.map,
    etag: getEtag(result?.code),
  }
}`}
          />
        </div>
      </section>

      {/* ════════  源码解读 4: HMR  ════════ */}
      <section className="container px-4 md:px-6 mb-10 md:mb-20">
        <div className="flex items-center gap-3 mb-8">
          <GeometricBadge icon={RefreshCw} color="secondary" size="lg" />
          <div>
            <SectionLabel text="Source Code 04" />
            <h2 className="mt-2 font-['Outfit'] font-extrabold text-2xl md:text-3xl text-[var(--foreground)]">
              HMR 热模块替换原理
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* 左：原理说明 */}
          <div className="bg-white border-2 border-[var(--foreground)] rounded-3xl p-8 shadow-[8px_8px_0px_0px_var(--secondary)]">
            <h3 className="font-['Outfit'] font-bold text-xl mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[var(--secondary)] rounded-lg border-2 border-[var(--foreground)] flex items-center justify-center shadow-[2px_2px_0px_0px_var(--foreground)]">
                <RefreshCw size={16} strokeWidth={2.5} className="text-white" />
              </span>
              HMR 三步走
            </h3>
            <div className="space-y-5">
              {[
                {
                  title: "① 文件监听 → 检测变更",
                  detail:
                    "Vite 使用 chokidar 监听文件系统。当文件发生变化时，获取与变更模块关联的 HMR 边界。",
                  code: "watcher.on('change', async (file) => {\n  const mods = moduleGraph.getModulesByFile(file)\n  hmr(mods, file)\n})",
                },
                {
                  title: "② 推送更新消息",
                  detail:
                    "通过 WebSocket 向客户端推送类型为 update 的消息，包含变更模块的路径和时间戳。",
                  code: "ws.send({\n  type: 'update',\n  updates: [{\n    type: 'js-update',\n    path: '/src/App.tsx',\n    acceptedPath: '/src/App.tsx',\n    timestamp: Date.now()\n  }]\n})",
                },
                {
                  title: "③ 客户端接受更新",
                  detail:
                    "浏览器端 Vite HMR Runtime 收到消息后，重新 import 更新后的模块，并调用 accept 回调。",
                  code: "// 浏览器端 HMR Runtime\nconst newMod = await import(\n  modPath + '?t=' + timestamp\n)\nif (mod.callbacks) {\n  mod.callbacks.forEach(cb => cb(newMod))\n}",
                },
              ].map((item, i) => (
                <div key={i} className="pb-5 border-b border-[var(--border)] last:border-0 last:pb-0">
                  <h4 className="font-['Outfit'] font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] leading-relaxed mb-3">
                    {item.detail}
                  </p>
                  <pre className="bg-[#1E293B] rounded-xl p-4 overflow-x-auto border-2 border-[var(--foreground)]">
                    <code className="text-xs text-[#E2E8F0] font-['JetBrains_Mono',monospace] leading-relaxed">
                      {item.code}
                    </code>
                  </pre>
                </div>
              ))}
            </div>
          </div>

          {/* 右：Module Graph */}
          <div>
            <div className="bg-white border-2 border-[var(--foreground)] rounded-3xl p-8 shadow-[8px_8px_0px_0px_var(--accent)] mb-6">
              <h3 className="font-['Outfit'] font-bold text-lg mb-4 flex items-center gap-2">
                <Layers size={20} strokeWidth={2.5} className="text-[var(--accent)]" />
                Module Graph（模块图）
              </h3>
              <p className="text-sm text-[var(--foreground)]/65 font-['Plus_Jakarta_Sans'] leading-relaxed mb-4">
                Vite 维护一个内存中的模块依赖图。每个模块记录其 importers（谁引入了它）和 imported（它引入了谁），
                HMR 更新时据此精确计算影响边界。
              </p>
              <CodeBlock
                filename="packages/vite/src/node/server/moduleGraph.ts"
                language="TypeScript"
                code={`class ModuleNode {
  url: string
  file: string | null
  importers = new Set<ModuleNode>()
  importedModules = new Set<ModuleNode>()
  acceptedHmrDeps = new Set<ModuleNode>()
  transformResult: TransformResult | null
  lastHMRTimestamp = 0
}

class ModuleGraph {
  urlToModuleMap = new Map<string, ModuleNode>()
  fileToModulesMap = new Map<string, Set<ModuleNode>>()

  async ensureEntryFromUrl(rawUrl: string) {
    // URL → ModuleNode 的双向映射
    // 同时建立 import 关系图
  }

  invalidateModule(mod: ModuleNode) {
    mod.transformResult = null
    mod.lastHMRTimestamp = Date.now()
    // 递归标记所有 importers 为 stale
  }
}`}
              />
            </div>

            {/* HMR 边界示意 */}
            <div className="bg-[var(--tertiary)]/10 border-2 border-[var(--tertiary)]/30 rounded-3xl p-6">
              <h4 className="font-['Outfit'] font-bold text-sm mb-4">
                HMR 更新边界示意
              </h4>
              <div className="flex flex-col items-center gap-2 font-['Outfit'] text-xs font-bold">
                {[
                  { name: "main.ts", bg: "#E2E8F0", active: false },
                  { name: "App.tsx", bg: "#8B5CF6", active: false },
                  { name: "Header.tsx", bg: "#F472B6", active: true },
                  { name: "utils.ts", bg: "#E2E8F0", active: false },
                ].map((mod, i) => (
                  <div
                    key={mod.name}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 border-[var(--foreground)] w-full max-w-xs ${
                      mod.active ? "shadow-[4px_4px_0px_0px_var(--secondary)] animate-pop" : "opacity-50"
                    }`}
                    style={{ backgroundColor: mod.active ? "#F472B622" : mod.bg + "40" }}
                  >
                    <span
                      className="w-4 h-4 rounded-md border-2 border-[var(--foreground)]"
                      style={{ backgroundColor: mod.bg }}
                    />
                    <span className="text-[var(--foreground)]">{mod.name}</span>
                    {mod.active && (
                      <span className="ml-auto px-2 py-0.5 bg-[var(--secondary)] text-white rounded-full text-[10px]">
                        CHANGED
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════  源码解读 5: Plugin 系统  ════════ */}
      <section className="container px-4 md:px-6 mb-10 md:mb-20">
        <div className="flex items-center gap-3 mb-8">
          <GeometricBadge icon={Puzzle} color="accent" size="lg" />
          <div>
            <SectionLabel text="Source Code 05" />
            <h2 className="mt-2 font-['Outfit'] font-extrabold text-2xl md:text-3xl text-[var(--foreground)]">
              插件系统的设计哲学
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <div
            className="topic-card bg-[var(--accent)]/5 rounded-2xl p-6 animate-slide"
            style={{ animationDelay: "0s" }}
          >
            <div className="w-12 h-12 bg-[var(--accent)] rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_var(--foreground)]">
              <span className="font-['Outfit'] font-extrabold text-white text-lg">1</span>
            </div>
            <h3 className="font-['Outfit'] font-bold text-base mb-2">兼容 Rollup 插件</h3>
            <p className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] leading-relaxed">
              Vite 插件直接实现了 Rollup 的 Plugin 接口，80% 的 Rollup 插件可零修改在 Vite 中使用。
            </p>
          </div>
          <div
            className="topic-card bg-[var(--secondary)]/5 rounded-2xl p-6 animate-slide"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_var(--foreground)]">
              <span className="font-['Outfit'] font-extrabold text-white text-lg">2</span>
            </div>
            <h3 className="font-['Outfit'] font-bold text-base mb-2">扩展独有钩子</h3>
            <p className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] leading-relaxed">
              为了开发服务器的特殊需求，Vite 扩展了 <code className="text-xs">configureServer</code>、
              <code className="text-xs">transformIndexHtml</code>、<code className="text-xs">handleHotUpdate</code> 等钩子。
            </p>
          </div>
          <div
            className="topic-card bg-[var(--quaternary)]/5 rounded-2xl p-6 animate-slide"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-12 h-12 bg-[var(--quaternary)] rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_var(--foreground)]">
              <span className="font-['Outfit'] font-extrabold text-white text-lg">3</span>
            </div>
            <h3 className="font-['Outfit'] font-bold text-base mb-2">Plugin Ordering</h3>
            <p className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] leading-relaxed">
              通过 <code className="text-xs">enforce: &apos;pre&apos; | &apos;post&apos;</code> 控制插件执行顺序，
              确保关键转换（如 JSX → JS）在正确时机发生。
            </p>
          </div>
        </div>

        {/* Plugin Container 源码 */}
        <CodeBlock
          filename="packages/vite/src/node/server/pluginContainer.ts"
          language="TypeScript"
          code={`export async function createPluginContainer(config: ResolvedConfig) {
  // 按 enforce 排序: pre → normal → post
  const sortedPlugins = sortPlugins(config.plugins)

  const container = {
    async resolveId(rawId: string, importer?: string) {
      let id = rawId
      for (const plugin of sortedPlugins) {
        if (!plugin.resolveId) continue
        const result = await plugin.resolveId.call(
          ctx, id, importer, { ssr: false }
        )
        if (result) {
          id = typeof result === 'string' ? result : result.id
        }
      }
      return { id }
    },

    async load(id: string) {
      for (const plugin of sortedPlugins) {
        if (!plugin.load) continue
        const result = await plugin.load.call(ctx, id)
        if (result !== null) return result
      }
      return null
    },

    async transform(code: string, id: string) {
      for (const plugin of sortedPlugins) {
        if (!plugin.transform) continue
        const result = await plugin.transform.call(ctx, code, id)
        if (result !== null) {
          code = typeof result === 'string' ? result : result.code
        }
      }
      return { code }
    }
  }

  return container
}`}
        />
      </section>

      {/* ════════  源码解读 6: 生产构建  ════════ */}
      <section className="container px-4 md:px-6 mb-10 md:mb-20">
        <div className="flex items-center gap-3 mb-8">
          <GeometricBadge icon={Rocket} color="quaternary" size="lg" />
          <div>
            <SectionLabel text="Source Code 06" />
            <h2 className="mt-2 font-['Outfit'] font-extrabold text-2xl md:text-3xl text-[var(--foreground)]">
              生产构建：Vite + Rollup
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] leading-relaxed mb-6">
              在生产环境中，Vite 不再使用 esbuild 进行打包，而是直接调用 <strong className="text-[var(--foreground)]">Rollup</strong> 作为构建工具。
              这是因为 Rollup 提供了更成熟的代码分割、Tree-shaking 和 Chunk 优化能力。
            </p>
            <div className="space-y-4 mb-6">
              {[
                { title: "CSS 代码分割", desc: "自动提取异步 chunk 的 CSS，避免加载闪烁。" },
                { title: "异步 Chunk 加载优化", desc: "自动预加载关联 chunk，减少瀑布流。" },
                { title: "CSS Codegen", desc: "内联关键 CSS，异步加载非关键样式。" },
                { title: "多页面应用支持", desc: "自动检测 HTML 入口并生成对应 bundle。" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-[var(--foreground)]/10"
                >
                  <ChevronRight size={16} strokeWidth={3} className="text-[var(--quaternary)] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-['Outfit'] font-bold text-sm text-[var(--foreground)]">{item.title}</h4>
                    <p className="text-xs text-[var(--foreground)]/55 font-['Plus_Jakarta_Sans'] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <CodeBlock
              filename="packages/vite/src/node/build.ts"
              language="TypeScript"
              code={`import { rollup } from 'rollup'

export async function build(inlineConfig) {
  const config = await resolveConfig(inlineConfig, 'build')

  // Vite 内置插件自动注入
  const vitePlugins = [
    viteResolvePlugin(config),    // 路径解析
    viteCssPlugin(config),        // CSS 处理
    viteAssetPlugin(config),      // 静态资源
    viteHtmlPlugin(config),       // HTML 处理
    viteDefinePlugin(config),     // 环境变量
    ...(config.plugins),          // 用户插件
  ]

  // 调用 Rollup 构建
  const bundle = await rollup({
    input: config.build.rollupOptions.input,
    plugins: vitePlugins,
    ...config.build.rollupOptions,
  })

  // 写入产物
  await bundle.write({
    dir: config.build.outDir,
    format: 'es',           // ESM 输出
    sourcemap: true,
    manualChunks: config.build.rollupOptions
      .manualChunks,
  })
}`}
            />
          </div>
        </div>
      </section>

      {/* ════════  完整生命周期总览  ════════ */}
      <section className="container px-4 md:px-6 mb-10 md:mb-20">
        <div className="mb-12">
          <SectionLabel text="Full Lifecycle" />
          <h2 className="mt-4 font-['Outfit'] font-extrabold text-3xl md:text-4xl text-[var(--foreground)]">
            Vite 完整生命周期
          </h2>
        </div>

        {/* 双行对比：Dev vs Build */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Dev 模式 */}
          <div className="bg-white border-2 border-[var(--foreground)] rounded-3xl p-8 shadow-[8px_8px_0px_0px_var(--accent)] relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[var(--accent)] opacity-10 rounded-full" />
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 bg-[var(--accent)] rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center shadow-[3px_3px_0px_0px_var(--foreground)]">
                <Terminal size={20} strokeWidth={2.5} className="text-white" />
              </div>
              <h3 className="font-['Outfit'] font-bold text-xl">Dev 模式生命周期</h3>
            </div>
            <div className="space-y-0 relative z-10">
              {[
                { step: "1", text: "解析 vite.config.ts + 合并 CLI 参数", color: "#8B5CF6" },
                { step: "2", text: "resolveConfig — 解析别名、环境变量、插件排序", color: "#F472B6" },
                { step: "3", text: "createServer — 创建 connect + WebSocket 实例", color: "#FBBF24" },
                { step: "4", text: "预构建依赖 — esbuild 将 CJS → ESM + 打包", color: "#34D399" },
                { step: "5", text: "启动 HTTP 服务 — 监听端口，注册中间件", color: "#8B5CF6" },
                { step: "6", text: "等待浏览器请求 — 按需 transform 单个模块", color: "#F472B6" },
                { step: "7", text: "文件变更 — chokidar 监听 → WebSocket 推送 HMR", color: "#FBBF24" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5">
                  <span
                    className="w-7 h-7 rounded-full border-2 border-[var(--foreground)] flex items-center justify-center text-[10px] font-extrabold text-white font-['Outfit'] shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.step}
                  </span>
                  <span className="text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/75">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Build 模式 */}
          <div
            className="bg-white border-2 border-[var(--foreground)] rounded-3xl p-8 shadow-[8px_8px_0px_0px_var(--quaternary)] relative overflow-hidden"
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[var(--quaternary)] opacity-10 rounded-full" />
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 bg-[var(--quaternary)] rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center shadow-[3px_3px_0px_0px_var(--foreground)]">
                <Rocket size={20} strokeWidth={2.5} className="text-white" />
              </div>
              <h3 className="font-['Outfit'] font-bold text-xl">Build 模式生命周期</h3>
            </div>
            <div className="space-y-0 relative z-10">
              {[
                { step: "1", text: "解析配置 + 应用 build 专属插件", color: "#34D399" },
                { step: "2", text: "调用 Rollup.rollup() — 全量打包", color: "#8B5CF6" },
                { step: "3", text: "resolveId → load → transform 全量执行", color: "#F472B6" },
                { step: "4", text: "Tree-shaking + 代码分割 + Chunk 优化", color: "#FBBF24" },
                { step: "5", text: "bundle.write() — 输出到 dist/", color: "#34D399" },
                { step: "6", text: "生成 manifest.json（SSR / 路由映射）", color: "#8B5CF6" },
                { step: "7", text: "可选：SSR Bundle / Library 模式构建", color: "#F472B6" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5">
                  <span
                    className="w-7 h-7 rounded-full border-2 border-[var(--foreground)] flex items-center justify-center text-[10px] font-extrabold text-white font-['Outfit'] shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.step}
                  </span>
                  <span className="text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/75">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════  总结 & 延伸阅读  ════════ */}
      <section className="container px-4 md:px-6">
        <div className="bg-[var(--accent)] border-2 border-[var(--foreground)] rounded-3xl p-10 md:p-14 shadow-[10px_10px_0px_0px_var(--foreground)] relative overflow-hidden">
          {/* 装饰 */}
          <div
            className="absolute -top-16 -right-16 w-48 h-48 bg-[var(--tertiary)] opacity-30 border-2 border-[var(--foreground)]/10"
            style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
          />
          <div
            className="absolute -bottom-12 -left-12 w-36 h-36 bg-[var(--secondary)] opacity-25 border-2 border-[var(--foreground)]/10"
            style={{ borderRadius: "30% 70% 60% 40% / 40% 60% 30% 70%" }}
          />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-white rounded-2xl border-2 border-[var(--foreground)] flex items-center justify-center shadow-[4px_4px_0px_0px_var(--foreground)]">
                <Workflow size={28} strokeWidth={2.5} className="text-[var(--accent)]" />
              </div>
              <h2 className="font-['Outfit'] font-extrabold text-2xl md:text-3xl text-white">
                核心总结
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                "利用浏览器原生 ESM，开发阶段无需打包，冷启动极快",
                "esbuild 驱动依赖预构建，解决 CJS 兼容和请求瀑布流",
                "基于 WebSocket 的 HMR，精确模块级热更新",
                "插件系统兼容 Rollup 并扩展开发专属钩子",
                "生产构建委托 Rollup，获得成熟的优化能力",
                "Module Graph 内存模型驱动 HMR 边界计算",
              ].map((point, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-white/90 font-['Plus_Jakarta_Sans']"
                >
                  <Zap size={14} strokeWidth={3} className="text-[var(--tertiary)] mt-1 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* 延伸阅读 */}
            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-6">
              <h4 className="font-['Outfit'] font-bold text-white mb-3 flex items-center gap-2">
                <BookOpen size={18} strokeWidth={2.5} />
                延伸阅读
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: "Vite 官方文档", url: "https://vitejs.dev/guide/why.html" },
                  { title: "Vite GitHub 源码", url: "https://github.com/vitejs/vite" },
                  { title: "蒋豪群 - Vite 原理浅析", url: "#" },
                  { title: "尤雨溪 - Vite 2.0 发布博文", url: "#" },
                ].map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm text-white font-semibold font-['Plus_Jakarta_Sans'] transition-colors"
                  >
                    <Globe size={14} strokeWidth={2.5} className="shrink-0" />
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}