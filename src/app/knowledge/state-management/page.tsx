// app/state-management/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Zap,
  Database,
  GitBranch,
  Layers,
  Settings,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Minus,
  ChevronDown,
  ChevronUp,
  Code2,
  Flame,
  Gauge,
  Shield,
  Cpu,
  FileCode,
  Braces,
  Sparkles,
  Scale,
  Rocket,
  RefreshCw,
  TrendingUp,
  BarChart3,
  Workflow,
  Puzzle,
  Heart,
  Star,
  Target,
  Lightbulb,
} from "lucide-react";

/* ──────────────────────────────────────────────
   展开面板组件
   ────────────────────────────────────────────── */
function Accordion({
  title,
  icon: Icon,
  color,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  color: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="animate-slide"
      style={{
        border: "2px solid var(--foreground)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: "var(--card)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 transition-colors"
        style={{ background: `${color}22` }}
      >
        <span className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              background: color,
              border: "2px solid var(--foreground)",
              boxShadow: `4px 4px 0px 0px var(--foreground)`,
            }}
          >
            <Icon size={20} strokeWidth={2.5} color="white" />
          </span>
          <span
            className="text-lg font-bold"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--foreground)" }}
          >
            {title}
          </span>
        </span>
        {open ? (
          <ChevronUp size={20} strokeWidth={2.5} />
        ) : (
          <ChevronDown size={20} strokeWidth={2.5} />
        )}
      </button>
      {open && (
        <div className="px-6 py-5" style={{ borderTop: "2px solid var(--border)" }}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   代码块组件
   ────────────────────────────────────────────── */
function CodeBlock({
  code,
  language,
  title,
}: {
  code: string;
  language: string;
  title?: string;
}) {
  return (
    <div
      style={{
        border: "2px solid var(--foreground)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        boxShadow: "8px 8px 0px 0px var(--foreground)",
      }}
    >
      {title && (
        <div
          className="flex items-center gap-2 px-4 py-2"
          style={{
            background: "var(--foreground)",
            color: "var(--card)",
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: "0.8rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          <FileCode size={14} strokeWidth={2.5} />
          {title}
        </div>
      )}
      <pre
        className="overflow-x-auto p-5 text-sm leading-relaxed"
        style={{
          background: "#1a1b2e",
          color: "#e2e8f0",
          fontFamily: "'Fira Code', monospace",
          margin: 0,
        }}
      >
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}

/* ──────────────────────────────────────────────
   指标条形图组件
   ────────────────────────────────────────────── */
function MetricBar({
  label,
  zustand,
  redux,
  mobx,
}: {
  label: string;
  zustand: number;
  redux: number;
  mobx: number;
}) {
  return (
    <div className="mb-5">
      <p
        className="mb-2 text-sm font-bold uppercase tracking-wider"
        style={{ color: "var(--foreground)", fontFamily: "Outfit, sans-serif" }}
      >
        {label}
      </p>
      <div className="flex flex-col gap-1.5">
        {[
          { name: "Zustand", val: zustand, color: "var(--quaternary)" },
          { name: "Redux", val: redux, color: "var(--accent)" },
          { name: "MobX", val: mobx, color: "var(--secondary)" },
        ].map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <span
              className="w-16 text-xs font-bold"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              {item.name}
            </span>
            <div
              className="relative h-6 flex-1 overflow-hidden rounded-full"
              style={{ border: "2px solid var(--foreground)", background: "var(--background)" }}
            >
              <div
                className="animate-slide absolute left-0 top-0 flex h-full items-center justify-end pr-2"
                style={{
                  width: `${item.val}%`,
                  background: item.color,
                  animationDelay: "0.3s",
                  borderRadius: "9999px",
                }}
              >
                <span
                  className="text-xs font-bold"
                  style={{ color: "var(--foreground)", fontFamily: "Outfit, sans-serif" }}
                >
                  {item.val}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   特性徽章
   ────────────────────────────────────────────── */
function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
      style={{
        background: color,
        border: "2px solid var(--foreground)",
        boxShadow: "4px 4px 0px 0px var(--foreground)",
        fontFamily: "Outfit, sans-serif",
        color: "var(--foreground)",
      }}
    >
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────═
   主页面
   ────────────────────────────────────────────── */
export default function StateManagementPage() {
  const [activeTab, setActiveTab] = useState<"zustand" | "redux" | "mobx">("zustand");

  /* 三个库的详细数据 */
  const libraries = {
    zustand: {
      name: "Zustand",
      tagline: "🐻 Bear Necessities for State",
      color: "var(--quaternary)",
      colorRaw: "#34D399",
      icon: Zap,
      year: 2019,
      size: "~1KB",
      creator: "Poimandres (pmndrs)",
      paradigm: "Flux-like（简化）",
      boilerplate: "极低",
      learningCurve: "低",
      description:
        "Zustand 是一个轻量、快速的状态管理库。它抛弃了 Redux 的繁琐模板代码，用最简洁的 API 实现了响应式状态管理。无需 Provider，无需 Context，只需一个 hook 即可。",
      pros: [
        "极小的包体积（~1KB gzipped）",
        "几乎零样板代码",
        "无需 Provider 包裹",
        "支持中间件（persist, devtools, immer）",
        "原生支持 React 18 concurrent features",
        "TypeScript 友好",
        "可以在 React 组件外使用",
      ],
      cons: [
        "生态不如 Redux 庞大",
        "大型应用的组织模式需要自行约定",
        "缺少官方的标准化 DevTools（但支持 Redux DevTools）",
        "社区文档相对较少",
      ],
      useCases: [
        "中小型应用快速开发",
        "对性能有极高要求的场景",
        "需要在组件外部访问状态",
        "想要最小化依赖和模板代码的团队",
      ],
    },
    redux: {
      name: "Redux",
      tagline: "🔄 Predictable State Container",
      color: "var(--accent)",
      colorRaw: "#8B5CF6",
      icon: Database,
      year: 2015,
      size: "~11KB (RTK)",
      creator: "Dan Abramov",
      paradigm: "Flux / 单向数据流",
      boilerplate: "中等（RTK已大幅降低）",
      learningCurve: "中-高",
      description:
        "Redux 是最经典的状态管理方案，通过严格的单向数据流和纯函数 reducer 管理状态。Redux Toolkit (RTK) 的出现极大地简化了使用体验，成为 Redux 官方推荐的编写方式。",
      pros: [
        "极其成熟的生态系统",
        "强大的 DevTools（时间旅行调试）",
        "可预测的状态变更（纯函数）",
        "Redux Toolkit 大幅降低样板代码",
        "庞大的社区和文档资源",
        "中间件系统灵活强大",
        "适合大型团队和复杂应用",
      ],
      cons: [
        "即使使用 RTK，概念仍然较多",
        "Action → Reducer → Selector 的链条较长",
        "学习曲线较陡峭",
        "小项目中显得过于臃肿",
        "需要 Provider 包裹",
      ],
      useCases: [
        "大型企业级应用",
        "需要严格状态可追溯性的场景",
        "多人协作的大型团队",
        "需要时间旅行调试",
      ],
    },
    mobx: {
      name: "MobX",
      tagline: "📊 Simple, Scalable State",
      color: "var(--secondary)",
      colorRaw: "#F472B6",
      icon: GitBranch,
      year: 2015,
      size: "~16KB",
      creator: "Michel Weststrate",
      paradigm: "响应式 / Observable",
      boilerplate: "极低",
      learningCurve: "低-中",
      description:
        "MobX 通过响应式编程管理状态。当你修改一个 observable 值时，所有依赖它的视图会自动更新。它让状态管理变得像操作普通 JavaScript 对象一样自然。",
      pros: [
        "极简的 API 和心智模型",
        "自动追踪依赖，精准更新",
        "Mutable 风格，更符合直觉",
        "优秀的性能（最小化重渲染）",
        "可在任何 JS 环境中使用",
        "透明的响应式系统",
        "mobx-state-tree 提供结构化模型",
      ],
      cons: [
        "魔法感较重，调试时依赖追踪不直观",
        "可变状态可能在大型应用中导致难以追踪的 bug",
        "与函数式编程范式冲突",
        "MobX 6 的装饰器语法变化增加了迁移成本",
        "社区规模不如 Redux",
      ],
      useCases: [
        "快速原型开发",
        "需要频繁更新的复杂 UI（如仪表盘）",
        "团队偏好面向对象风格",
        "数据模型层复杂的中大型应用",
      ],
    },
  };

  const lib = libraries[activeTab];

  return (
    <div className="bg-dot-grid min-h-screen pb-24" style={{ background: "var(--background)" }}>

      {/* ═══════════════════════════════════════
          HERO 区域
          ═══════════════════════════════════════ */}
      <section className="container relative overflow-hidden !px-6 !py-12 mb-12">
        {/* 装饰 Blob */}
        <div
          className="pointer-events-none absolute -top-20 -right-20 opacity-20"
          style={{
            width: 400,
            height: 400,
            background: "var(--tertiary)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(40px)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-10 -left-16 opacity-15"
          style={{
            width: 300,
            height: 300,
            background: "var(--secondary)",
            borderRadius: "30% 70% 60% 40% / 50% 60% 40% 50%",
            filter: "blur(40px)",
          }}
        />

        {/* 标签 */}
        <div className="animate-pop mb-6">
          <Badge color="var(--tertiary)">
            <BarChart3 size={12} strokeWidth={2.5} />
            前端核心知识
          </Badge>
        </div>

        {/* 主标题 */}
        <h1
          className="animate-pop mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl"
          style={{ fontFamily: "Outfit, sans-serif", color: "var(--foreground)" }}
        >
          状态管理
          <br />
          <span style={{ color: "var(--accent)" }}>三大方案</span> 深度对比
        </h1>

        <p
          className="animate-slide mb-10 max-w-2xl text-lg leading-relaxed md:text-xl"
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            color: "var(--foreground)",
            opacity: 0.7,
            animationDelay: "0.15s",
          }}
        >
          Zustand · Redux · MobX —— 它们代表了三种截然不同的状态管理哲学。
          本文将从架构思想、API 设计、性能表现、生态全景等多个维度，带你深入理解每一个方案的核心原理与最佳实践。
        </p>

        {/* 三个入口卡片 */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {(["zustand", "redux", "mobx"] as const).map((key, i) => {
            const item = libraries[key];
            const IconComp = item.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="animate-pop topic-card group relative flex flex-col items-start gap-4 p-6 text-left transition-all"
                style={{
                  animationDelay: `${0.1 + i * 0.1}s`,
                  borderColor:
                    activeTab === key ? "var(--foreground)" : "var(--border)",
                  background: activeTab === key ? `${item.colorRaw}18` : "var(--card)",
                  boxShadow:
                    activeTab === key
                      ? `8px 8px 0px 0px ${item.colorRaw}`
                      : "8px 8px 0px 0px var(--border)",
                }}
              >
                {/* 图标徽章 */}
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    background: item.colorRaw,
                    border: "2px solid var(--foreground)",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  <IconComp size={28} strokeWidth={2.5} color="white" />
                </span>
                <div>
                  <h3
                    className="text-2xl font-extrabold"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="mt-1 text-sm"
                    style={{
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      opacity: 0.6,
                    }}
                  >
                    {item.tagline}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  <Badge color={`${item.colorRaw}33`}>{item.size}</Badge>
                  <Badge color={`${item.colorRaw}33`}>{item.paradigm}</Badge>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          哲学对比 — 三条道路
          ═══════════════════════════════════════ */}
      <section className="container mx-auto px-6 py-16">
        <div className="animate-pop mb-3">
          <Badge color="var(--tertiary)">
            <Lightbulb size={12} strokeWidth={2.5} />
            核心哲学
          </Badge>
        </div>
        <h2
          className="animate-pop mb-10 text-3xl font-extrabold md:text-4xl"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          三种管理哲学，三条设计之路
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "最小化主义",
              lib: "Zustand",
              color: "#34D399",
              icon: Zap,
              points: [
                "Store 即函数",
                "一行代码创建状态",
                "直接在组件中使用 hook",
                "去掉一切不必要的抽象",
              ],
              quote: '"少即是多，简单即是力量"',
            },
            {
              title: "可预测性至上",
              lib: "Redux",
              color: "#8B5CF6",
              icon: Shield,
              points: [
                "Action 描述意图",
                "Reducer 纯函数处理变更",
                "单一数据源",
                "时间旅行调试",
              ],
              quote: '"每一个状态变更都可追溯"',
            },
            {
              title: "响应式透明化",
              lib: "MobX",
              color: "#F472B6",
              icon: RefreshCw,
              points: [
                "Observable 自动追踪依赖",
                "Mutation 与普通 JS 无异",
                "Computed 自动缓存",
                "Reactions 自动触发更新",
              ],
              quote: '"让状态管理回归直觉"',
            },
          ].map((item, i) => (
            <div
              key={item.lib}
              className="animate-pop topic-card flex flex-col p-6"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div
                className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold"
                style={{
                  background: item.color,
                  border: "2px solid var(--foreground)",
                  fontFamily: "Outfit, sans-serif",
                  color: "white",
                  width: "fit-content",
                }}
              >
                <item.icon size={16} strokeWidth={2.5} />
                {item.lib}
              </div>
              <h3
                className="mb-3 text-xl font-extrabold"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {item.title}
              </h3>
              <ul className="mb-4 flex-1 space-y-2">
                {item.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-2 text-sm"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: item.color,
                        border: "2px solid var(--foreground)",
                      }}
                    >
                      <CheckCircle2 size={12} strokeWidth={3} color="white" />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              <p
                className="mt-auto rounded-lg p-3 text-sm italic"
                style={{
                  background: `${item.color}18`,
                  border: `2px dashed ${item.color}`,
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                }}
              >
                {item.quote}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          深度展开区 — 选中库的详细信息
          ═══════════════════════════════════════ */}
      <section className="container mx-auto px-6 py-16">
        <div className="animate-pop mb-3">
          <Badge color={lib.colorRaw}>
            <Code2 size={12} strokeWidth={2.5} />
            {lib.name} 深度解析
          </Badge>
        </div>
        <h2
          className="animate-pop mb-4 text-3xl font-extrabold md:text-4xl"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {lib.name}
          <span className="ml-3 text-lg font-bold" style={{ color: lib.colorRaw }}>
            {lib.tagline}
          </span>
        </h2>
        <p
          className="animate-slide mb-10 max-w-3xl text-base leading-relaxed"
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            opacity: 0.7,
            animationDelay: "0.1s",
          }}
        >
          {lib.description}
        </p>

        {/* 基础信息卡片 */}
        <div className="animate-slide mb-8 grid grid-cols-2 gap-4 md:grid-cols-4" style={{ animationDelay: "0.15s" }}>
          {[
            { label: "诞生年份", value: lib.year.toString(), icon: Star },
            { label: "包大小", value: lib.size, icon: Gauge },
            { label: "样板代码", value: lib.boilerplate, icon: FileCode },
            { label: "学习曲线", value: lib.learningCurve, icon: TrendingUp },
          ].map((info) => (
            <div
              key={info.label}
              className="topic-card flex flex-col items-center gap-2 p-4 text-center"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: `${lib.colorRaw}22`,
                  border: "2px solid var(--foreground)",
                }}
              >
                <info.icon size={18} strokeWidth={2.5} />
              </span>
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--foreground)", opacity: 0.5, fontFamily: "Outfit, sans-serif" }}
              >
                {info.label}
              </span>
              <span className="text-lg font-extrabold" style={{ fontFamily: "Outfit, sans-serif" }}>
                {info.value}
              </span>
            </div>
          ))}
        </div>

        {/* 优势 & 劣势 */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 优势 */}
          <div
            className="animate-slide topic-card p-6"
            style={{ animationDelay: "0.2s" }}
          >
            <h4 className="mb-4 flex items-center gap-2 text-lg font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
              <CheckCircle2 size={20} strokeWidth={2.5} style={{ color: "var(--quaternary)" }} />
              核心优势
            </h4>
            <ul className="space-y-3">
              {lib.pros.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "var(--quaternary)", border: "2px solid var(--foreground)" }}
                  >
                    <span className="text-xs font-bold text-white">+</span>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          {/* 劣势 */}
          <div
            className="animate-slide topic-card p-6"
            style={{ animationDelay: "0.25s" }}
          >
            <h4 className="mb-4 flex items-center gap-2 text-lg font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
              <XCircle size={20} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
              潜在不足
            </h4>
            <ul className="space-y-3">
              {lib.cons.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "var(--secondary)", border: "2px solid var(--foreground)" }}
                  >
                    <span className="text-xs font-bold text-white">-</span>
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 适用场景 */}
        <div
          className="animate-slide topic-card mb-8 p-6"
          style={{ animationDelay: "0.3s" }}
        >
          <h4 className="mb-4 flex items-center gap-2 text-lg font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
            <Target size={20} strokeWidth={2.5} style={{ color: lib.colorRaw }} />
            最佳适用场景
          </h4>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {lib.useCases.map((uc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl p-3"
                style={{
                  background: `${lib.colorRaw}12`,
                  border: `2px dashed ${lib.colorRaw}`,
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: "0.9rem",
                }}
              >
                <Rocket size={16} strokeWidth={2.5} style={{ color: lib.colorRaw }} />
                {uc}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          代码示例区 — 每个库的基础用法
          ═══════════════════════════════════════ */}
      <section className="container mx-auto px-6 py-16">
        <div className="animate-pop mb-3">
          <Badge color="var(--accent)">
            <Braces size={12} strokeWidth={2.5} />
            代码示例
          </Badge>
        </div>
        <h2
          className="animate-pop mb-10 text-3xl font-extrabold md:text-4xl"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          从代码看三种风格差异
        </h2>

        {/* ── Zustand ── */}
        <div className="mb-12">
          <div className="animate-slide mb-5 flex items-center gap-3" style={{ animationDelay: "0.1s" }}>
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{
                background: "#34D399",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <Zap size={20} strokeWidth={2.5} color="white" />
            </span>
            <h3 className="text-2xl font-extrabold" style={{ fontFamily: "Outfit, sans-serif" }}>
              Zustand — 简洁到极致
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="animate-slide" style={{ animationDelay: "0.15s" }}>
              <CodeBlock
                title="store/counter.ts — 创建 Store"
                language="typescript"
                code={`import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CounterState {
  count: number
  bears: number
  increase: () => void
  decrease: () => void
  reset: () => void
  addBears: (n: number) => void
}

// 一行代码，一个函数，就是整个 store
export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      bears: 0,
      increase: () => set((s) => ({ count: s.count + 1 })),
      decrease: () => set((s) => ({ count: s.count - 1 })),
      reset: () => set({ count: 0 }),
      addBears: (n) => set((s) => ({ bears: s.bears + n })),
    }),
    { name: 'counter-storage' }
  )
)`}
              />
            </div>
            <div className="animate-slide" style={{ animationDelay: "0.2s" }}>
              <CodeBlock
                title="components/Counter.tsx — 使用 Store"
                language="tsx"
                code={`'use client'
import { useCounterStore } from '@/store/counter'

export function Counter() {
  // 选择性订阅，精准重渲染
  const count = useCounterStore((s) => s.count)
  const increase = useCounterStore((s) => s.increase)
  const decrease = useCounterStore((s) => s.decrease)

  return (
    <div className="counter">
      <button onClick={decrease}>-</button>
      <span>{count}</span>
      <button onClick={increase}>+</button>
    </div>
  )
}

// 💡 无需 Provider 包裹！
// 💡 可以在组件外直接调用：
//    useCounterStore.getState().increase()`}
              />
            </div>
          </div>

          {/* Zustand 架构图 */}
          <div
            className="animate-slide mt-6 rounded-2xl p-6"
            style={{
              border: "2px solid var(--foreground)",
              background: "#34D39918",
              boxShadow: "8px 8px 0px 0px #34D399",
              animationDelay: "0.25s",
            }}
          >
            <h4
              className="mb-4 text-lg font-bold"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              🐻 Zustand 数据流
            </h4>
            <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
              {[
                { label: "Component", sub: "useStore(selector)", bg: "#34D399" },
                { label: "Store", sub: "create() → state + actions", bg: "#34D399" },
                { label: "setState", sub: "set() → 触发订阅", bg: "#34D399" },
              ].map((node, i) => (
                <div key={node.label} className="flex items-center gap-3">
                  <div
                    className="flex flex-col items-center rounded-xl px-5 py-3 text-center"
                    style={{
                      background: node.bg,
                      border: "2px solid var(--foreground)",
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                      minWidth: 140,
                    }}
                  >
                    <span className="text-sm font-extrabold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {node.label}
                    </span>
                    <span className="text-xs text-white opacity-80" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                      {node.sub}
                    </span>
                  </div>
                  {i < 2 && (
                    <ArrowRight
                      size={24}
                      strokeWidth={3}
                      className="hidden md:block"
                      style={{ color: "var(--foreground)" }}
                    />
                  )}
                  {i < 2 && (
                    <ChevronDown
                      size={24}
                      strokeWidth={3}
                      className="block md:hidden"
                      style={{ color: "var(--foreground)" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Redux ── */}
        <div className="mb-12">
          <div className="animate-slide mb-5 flex items-center gap-3" style={{ animationDelay: "0.1s" }}>
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{
                background: "#8B5CF6",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <Database size={20} strokeWidth={2.5} color="white" />
            </span>
            <h3 className="text-2xl font-extrabold" style={{ fontFamily: "Outfit, sans-serif" }}>
              Redux Toolkit — 现代 Redux
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="animate-slide" style={{ animationDelay: "0.15s" }}>
              <CodeBlock
                title="store/counterSlice.ts — 创建 Slice"
                language="typescript"
                code={`import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
  status: 'idle' | 'loading'
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Immer 让你"直接修改"，实际生成新状态
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    reset: () => initialState,
  },
})

export const { increment, decrement, 
               incrementByAmount, reset } 
  = counterSlice.actions
export default counterSlice.reducer`}
              />
            </div>
            <div className="animate-slide" style={{ animationDelay: "0.2s" }}>
              <CodeBlock
                title="components/Counter.tsx — 使用 Selector"
                language="tsx"
                code={`'use client'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '@/store/counterSlice'
import type { RootState } from '@/store/store'

export function Counter() {
  const count = useSelector(
    (state: RootState) => state.counter.value
  )
  const dispatch = useDispatch()

  return (
    <div className="counter">
      <button onClick={() => dispatch(decrement())}>
        -
      </button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>
        +
      </button>
    </div>
  )
}

// 📌 需要用 <Provider store={store}> 包裹
// 📌 Redux DevTools 自动集成`}
              />
            </div>
          </div>

          {/* Redux 架构图 */}
          <div
            className="animate-slide mt-6 rounded-2xl p-6"
            style={{
              border: "2px solid var(--foreground)",
              background: "#8B5CF618",
              boxShadow: "8px 8px 0px 0px #8B5CF6",
              animationDelay: "0.25s",
            }}
          >
            <h4 className="mb-4 text-lg font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
              🔄 Redux 单向数据流
            </h4>
            <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
              {[
                { label: "View", sub: "dispatch(action)", bg: "#8B5CF6" },
                { label: "Action", sub: "{ type, payload }", bg: "#7C3AED" },
                { label: "Reducer", sub: "纯函数 (state, action)", bg: "#6D28D9" },
                { label: "Store", sub: "新 State → 订阅通知", bg: "#5B21B6" },
              ].map((node, i) => (
                <div key={node.label} className="flex items-center gap-3">
                  <div
                    className="flex flex-col items-center rounded-xl px-5 py-3 text-center"
                    style={{
                      background: node.bg,
                      border: "2px solid var(--foreground)",
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                      minWidth: 130,
                    }}
                  >
                    <span className="text-sm font-extrabold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {node.label}
                    </span>
                    <span className="text-xs text-white opacity-80" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                      {node.sub}
                    </span>
                  </div>
                  {i < 3 && (
                    <ArrowRight
                      size={24}
                      strokeWidth={3}
                      className="hidden md:block"
                      style={{ color: "var(--foreground)" }}
                    />
                  )}
                  {i < 3 && (
                    <ChevronDown
                      size={24}
                      strokeWidth={3}
                      className="block md:hidden"
                      style={{ color: "var(--foreground)" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MobX ── */}
        <div className="mb-6">
          <div className="animate-slide mb-5 flex items-center gap-3" style={{ animationDelay: "0.1s" }}>
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{
                background: "#F472B6",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <GitBranch size={20} strokeWidth={2.5} color="white" />
            </span>
            <h3 className="text-2xl font-extrabold" style={{ fontFamily: "Outfit, sans-serif" }}>
              MobX — 响应式魔法
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="animate-slide" style={{ animationDelay: "0.15s" }}>
              <CodeBlock
                title="store/CounterStore.ts — Observable Store"
                language="typescript"
                code={`import { makeAutoObservable, runInAction } from 'mobx'

class CounterStore {
  count = 0
  name = 'My Counter'

  constructor() {
    // MobX 6: 自动将所有属性变为 observable
    makeAutoObservable(this)
  }

  get doubled() {
    // computed: 自动缓存，依赖变化时重算
    return this.count * 2
  }

  increment() {
    this.count += 1  // 直接修改！
  }

  decrement() {
    this.count -= 1
  }

  // 异步操作需要用 runInAction
  async fetchData() {
    const data = await api.getCount()
    runInAction(() => {
      this.count = data.count
    })
  }
}

export const counterStore = new CounterStore()`}
              />
            </div>
            <div className="animate-slide" style={{ animationDelay: "0.2s" }}>
              <CodeBlock
                title="components/Counter.tsx — Observer 自动追踪"
                language="tsx"
                code={`'use client'
import { observer } from 'mobx-react-lite'
import { counterStore } from '@/store/CounterStore'

// observer HOC 自动追踪组件用到的
// 所有 observable 属性，精准重渲染
export const Counter = observer(() => {
  const { count, doubled, increment, decrement } 
    = counterStore

  return (
    <div className="counter">
      <button onClick={decrement}>-</button>
      <span>{count} (×2 = {doubled})</span>
      <button onClick={increment}>+</button>
    </div>
  )
})

// 💡 无需 Provider！Store 是普通实例
// 💡 直接 import 即可在任何地方使用
// 💡 computed 自动缓存，不会重复计算`}
              />
            </div>
          </div>

          {/* MobX 架构图 */}
          <div
            className="animate-slide mt-6 rounded-2xl p-6"
            style={{
              border: "2px solid var(--foreground)",
              background: "#F472B618",
              boxShadow: "8px 8px 0px 0px #F472B6",
              animationDelay: "0.25s",
            }}
          >
            <h4 className="mb-4 text-lg font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
              📊 MobX 响应式三角
            </h4>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  title: "Observable (State)",
                  desc: "被追踪的状态数据",
                  detail: "makeAutoObservable(this)",
                  color: "#F472B6",
                  icon: Database,
                },
                {
                  title: "Computed (Derived)",
                  desc: "从 State 自动派生的值",
                  detail: "get 属性 / 自动缓存",
                  color: "#EC4899",
                  icon: Cpu,
                },
                {
                  title: "Reaction (Effect)",
                  desc: "状态变化时自动执行",
                  detail: "observer() / autorun()",
                  color: "#DB2777",
                  icon: RefreshCw,
                },
              ].map((node) => (
                <div
                  key={node.title}
                  className="flex flex-col items-center gap-3 rounded-xl p-5 text-center"
                  style={{
                    background: node.color,
                    border: "2px solid var(--foreground)",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  <node.icon size={32} strokeWidth={2.5} color="white" />
                  <span className="text-base font-extrabold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {node.title}
                  </span>
                  <span className="text-sm text-white opacity-90" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                    {node.desc}
                  </span>
                  <span
                    className="mt-1 rounded-full px-3 py-1 text-xs font-bold text-white"
                    style={{ background: "rgba(0,0,0,0.2)" }}
                  >
                    {node.detail}
                  </span>
                </div>
              ))}
            </div>
            <p
              className="mt-4 text-center text-sm"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.7 }}
            >
              ✨ 修改 Observable → Computed 自动重算 → Reaction (UI) 自动重渲染
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          多维对比矩阵
          ═══════════════════════════════════════ */}
      <section className="container mx-auto px-6 py-16">
        <div className="animate-pop mb-3">
          <Badge color="var(--quaternary)">
            <Scale size={12} strokeWidth={2.5} />
            全面对比
          </Badge>
        </div>
        <h2
          className="animate-pop mb-10 text-3xl font-extrabold md:text-4xl"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          多维度对比矩阵
        </h2>

        {/* 数值化对比条 */}
        <div
          className="animate-slide topic-card mb-10 p-8"
          style={{ animationDelay: "0.1s" }}
        >
          <MetricBar label="📦 包体积（越小越好）" zustand={95} redux={60} mobx={55} />
          <MetricBar label="📝 样板代码（越少越好）" zustand={95} redux={50} mobx={85} />
          <MetricBar label="📈 学习曲线（越高越易学）" zustand={90} redux={45} mobx={70} />
          <MetricBar label="🛠️ 生态/工具链" zustand={60} redux={95} mobx={70} />
          <MetricBar label="⚡ 运行时性能" zustand={85} redux={75} mobx={90} />
          <MetricBar label="🏗️ 大型项目适用性" zustand={65} redux={95} mobx={80} />
          <MetricBar label="🔧 DevTools 支持" zustand={70} redux={95} mobx={65} />
          <MetricBar label="🧩 TypeScript 体验" zustand={95} redux={90} mobx={75} />
        </div>

        {/* 表格式对比 */}
        <div
          className="animate-slide overflow-x-auto"
          style={{ animationDelay: "0.15s" }}
        >
          <table
            className="w-full border-collapse"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            <thead>
              <tr>
                <th
                  className="border-2 px-4 py-3 text-left text-sm font-bold uppercase tracking-wider"
                  style={{
                    borderColor: "var(--foreground)",
                    background: "var(--foreground)",
                    color: "var(--card)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  特性
                </th>
                {["Zustand", "Redux (RTK)", "MobX"].map((name, i) => {
                  const colors = ["#34D399", "#8B5CF6", "#F472B6"];
                  return (
                    <th
                      key={name}
                      className="border-2 px-4 py-3 text-left text-sm font-bold uppercase tracking-wider"
                      style={{
                        borderColor: "var(--foreground)",
                        background: colors[i],
                        color: "white",
                        fontFamily: "Outfit, sans-serif",
                      }}
                    >
                      {name}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: "编程范式",
                  zustand: "类 Flux（简化）",
                  redux: "Flux / 单向数据流",
                  mobx: "响应式 / Observable",
                },
                {
                  feature: "状态定义方式",
                  zustand: "create() 函数",
                  redux: "createSlice() + Reducer",
                  mobx: "Class + makeAutoObservable",
                },
                {
                  feature: "状态更新",
                  zustand: "set() 直接更新",
                  redux: "dispatch(action) → reducer",
                  mobx: "直接赋值 (mutation)",
                },
                {
                  feature: "不可变性",
                  zustand: "可选（Immer 中间件）",
                  redux: "必须（Immer 内置）",
                  mobx: "可变（Mutable）",
                },
                {
                  feature: "Provider",
                  zustand: "❌ 不需要",
                  redux: "✅ 需要",
                  mobx: "❌ 不需要",
                },
                {
                  feature: "异步处理",
                  zustand: "在 actions 中直接 async",
                  redux: "createAsyncThunk / RTK Query",
                  mobx: "runInAction() 包裹",
                },
                {
                  feature: "DevTools",
                  zustand: "支持 Redux DevTools",
                  redux: "专属 DevTools（最强）",
                  mobx: "mobx-extensions",
                },
                {
                  feature: "持久化",
                  zustand: "persist 中间件",
                  redux: "redux-persist",
                  mobx: "手动序列化",
                },
                {
                  feature: "代码分割",
                  zustand: "✅ 动态创建 store",
                  redux: "⚠️ 需要配置",
                  mobx: "✅ 动态实例化",
                },
                {
                  feature: "SSR 支持",
                  zustand: "✅ 原生支持",
                  redux: "✅ 需配置",
                  mobx: "✅ 需配置",
                },
              ].map((row, idx) => (
                <tr key={idx} className="transition-colors hover:bg-[var(--background)]">
                  <td
                    className="border-2 px-4 py-3 text-sm font-bold"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {row.feature}
                  </td>
                  {[row.zustand, row.redux, row.mobx].map((val, ci) => (
                    <td
                      key={ci}
                      className="border-2 px-4 py-3 text-sm"
                      style={{ borderColor: "var(--border)" }}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          进阶用法 & 模式 — 可折叠面板
          ═══════════════════════════════════════ */}
      <section className="container mx-auto px-6 !py-16">
        <div className="animate-pop mb-3">
          <Badge color="var(--secondary)">
            <Layers size={12} strokeWidth={2.5} />
            进阶模式
          </Badge>
        </div>
        <h2
          className="animate-pop mb-10 text-3xl font-extrabold md:text-4xl"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          进阶模式与最佳实践
        </h2>

        <div className="flex flex-col gap-4">
          {/* Zustand 进阶 */}
          <Accordion title="Zustand — Slice 模式与中间件" icon={Zap} color="#34D399">
            <p className="mb-4 text-sm leading-relaxed" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              在大型应用中，我们可以用 <strong>Slice 模式</strong> 将 store 拆分为多个小模块，再组合成一个完整的 store。配合 immer、devtools、persist 中间件使用。
            </p>
            <CodeBlock
              title="slices 模式 — 模块化 Store"
              language="typescript"
              code={`import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist } from 'zustand/middleware'

// 每个 slice 是一个独立的状态模块
interface BearSlice {
  bears: number
  addBear: () => void
}

interface FishSlice {
  fishes: number
  addFish: () => void
}

type StoreState = BearSlice & FishSlice

const createBearSlice = (set: any): BearSlice => ({
  bears: 0,
  addBear: () => set((s: StoreState) => {
    s.bears += 1  // Immer 让 set 中也能直接修改
  }),
})

const createFishSlice = (set: any): FishSlice => ({
  fishes: 0,
  addFish: () => set((s: StoreState) => {
    s.fishes += 1
  }),
})

// 组合所有 slices，叠加中间件
export const useStore = create<StoreState>()(
  devtools(
    persist(
      immer((...args) => ({
        ...createBearSlice(...args),
        ...createFishSlice(...args),
      })),
      { name: 'zoo-storage' }
    )
  )
)`}
            />
          </Accordion>

          {/* Redux 进阶 */}
          <Accordion title="Redux Toolkit — createAsyncThunk & RTK Query" icon={Database} color="#8B5CF6">
            <p className="mb-4 text-sm leading-relaxed" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              Redux Toolkit 提供了 <strong>createAsyncThunk</strong> 处理异步逻辑，以及 <strong>RTK Query</strong> 作为强大的数据获取和缓存层。
            </p>
            <CodeBlock
              title="createAsyncThunk 异步操作"
              language="typescript"
              code={`import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 定义异步 thunk
export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(\`/api/users/\${userId}\`)
      if (!response.ok) throw new Error('Failed')
      return await response.json()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

interface UserState {
  entities: User[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

const userSlice = createSlice({
  name: 'users',
  initialState: { entities: [], loading: 'idle', error: null } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.entities.push(action.payload)
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
  },
})`}
            />
          </Accordion>

          {/* MobX 进阶 */}
          <Accordion title="MobX — Flow & MobX State Tree" icon={GitBranch} color="#F472B6" defaultOpen>
            <p className="mb-4 text-sm leading-relaxed" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              MobX 提供 <strong>flow</strong> 处理异步逻辑（基于 generator），<strong>mobx-state-tree (MST)</strong> 提供结构化的状态树模型。
            </p>
            <CodeBlock
              title="MobX flow() 异步 & MST 模型"
              language="typescript"
              code={`import { makeAutoObservable, flow } from 'mobx'

class UserStore {
  users = []
  state = 'idle'

  constructor() {
    makeAutoObservable(this)
  }

  // flow: 基于 generator 的优雅异步
  fetchUsers = flow(function* (this: UserStore) {
    this.state = 'loading'
    try {
      const response = yield fetch('/api/users')
      const data = yield response.json()
      this.users = data
      this.state = 'done'
    } catch (e) {
      this.state = 'error'
    }
  })
}

// ─── MobX State Tree (MST) ───
import { types } from 'mobx-state-tree'

const User = types.model('User', {
  id: types.identifier,
  name: types.string,
  email: types.string,
})

const RootStore = types
  .model('RootStore', {
    users: types.array(User),
    selectedId: types.maybeNull(types.string),
  })
  .views((self) => ({
    get selectedUser() {
      return self.users.find((u) => u.id === self.selectedId)
    },
  }))
  .actions((self) => ({
    selectUser(id: string) {
      self.selectedId = id
    },
    addUser(user: { id: string; name: string; email: string }) {
      self.users.push(user)
    },
  }))`}
            />
          </Accordion>

          {/* 性能优化 */}
          <Accordion title="性能优化策略对比" icon={Gauge} color="#FBBF24">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  lib: "Zustand",
                  color: "#34D399",
                  tips: [
                    "使用 selector 精准订阅状态片段",
                    "使用 shallow 比较避免不必要的重渲染",
                    "利用 Zustand 的 subscribe API 在组件外监听",
                    "将频繁变更的状态拆分到独立 store",
                  ],
                },
                {
                  lib: "Redux",
                  color: "#8B5CF6",
                  tips: [
                    "使用 createSelector (reselect) 创建记忆化 selector",
                    "避免在 mapStateToProps 中创建新引用",
                    "使用 React.memo 和 useCallback",
                    "RTK Query 自动缓存和去重请求",
                  ],
                },
                {
                  lib: "MobX",
                  color: "#F472B6",
                  tips: [
                    "observer 组件自动最小化重渲染",
                    "使用 computed 避免重复计算",
                    "拆分细粒度的 observable 对象",
                    "避免在 render 中创建新 observable",
                  ],
                },
              ].map((item) => (
                <div key={item.lib} className="flex flex-col gap-3">
                  <h5
                    className="text-base font-bold"
                    style={{ fontFamily: "Outfit, sans-serif", color: item.color }}
                  >
                    {item.lib}
                  </h5>
                  <ul className="space-y-2">
                    {item.tips.map((tip) => (
                      <li
                        key={tip}
                        className="flex items-start gap-2 rounded-lg p-2 text-sm"
                        style={{
                          background: `${item.color}12`,
                          border: `2px solid ${item.color}33`,
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                        }}
                      >
                        <Sparkles size={14} strokeWidth={2.5} style={{ color: item.color, marginTop: 2, flexShrink: 0 }} />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TypeScript 类型体操对比
          ═══════════════════════════════════════ */}
      <section className="container mx-auto px-6 py-16">
        <div className="animate-pop mb-3">
          <Badge color="var(--accent)">
            <FileCode size={12} strokeWidth={2.5} />
            TypeScript 体验
          </Badge>
        </div>
        <h2
          className="animate-pop mb-10 text-3xl font-extrabold md:text-4xl"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          TypeScript 类型体验对比
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              name: "Zustand",
              score: "S",
              color: "#34D399",
              desc: "泛型 create<T>() 天然类型推断，selector 自动推导返回类型",
              code: `const useStore = create<MyState>()(
  (set) => ({
    count: 0,
    // set 的参数自动推断
    inc: () => set((s) => ({ count: s.count + 1 })),
  })
)
// useStore((s) => s.count) → number ✅`,
            },
            {
              name: "Redux",
              score: "A",
              color: "#8B5CF6",
              desc: "RTK 的 createSlice 自动推断 action 类型，但 RootState 手动定义",
              code: `// RootState 需要从 store 推导
type RootState = ReturnType<typeof store.getState>
const useSelector = createSelectorHook<RootState>()
// useSelector(s => s.counter.value) → number ✅
// PayloadAction<T> 可约束 payload 类型`,
            },
            {
              name: "MobX",
              score: "B+",
              color: "#F472B6",
              desc: "Class 属性自然有类型，但 observable 包装器的类型推断偶尔不理想",
              code: `class Store {
  count: number = 0  // ✅ 自然类型
  name: string = ''
}
// class 属性天然有类型
// 但 makeAutoObservable 的推断
// 偶尔需要手动标注`,
            },
          ].map((item) => (
            <div
              key={item.name}
              className="animate-pop topic-card flex flex-col p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className="text-lg font-extrabold"
                  style={{ fontFamily: "Outfit, sans-serif", color: item.color }}
                >
                  {item.name}
                </span>
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-extrabold text-white"
                  style={{
                    background: item.color,
                    border: "2px solid var(--foreground)",
                    fontFamily: "Outfit, sans-serif",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  {item.score}
                </span>
              </div>
              <p
                className="mb-4 text-sm leading-relaxed"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.7 }}
              >
                {item.desc}
              </p>
              <pre
                className="flex-1 overflow-x-auto rounded-lg p-4 text-xs leading-relaxed"
                style={{
                  background: "#1a1b2e",
                  color: "#e2e8f0",
                  fontFamily: "'Fira Code', monospace",
                  border: "2px solid var(--foreground)",
                }}
              >
                <code>{item.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          技术选型决策树
          ═══════════════════════════════════════ */}
      <section className="container mx-auto px-6 py-16">
        <div className="animate-pop mb-3">
          <Badge color="var(--tertiary)">
            <Workflow size={12} strokeWidth={2.5} />
            选型指南
          </Badge>
        </div>
        <h2
          className="animate-pop mb-10 text-3xl font-extrabold md:text-4xl"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          如何选择？一张决策图
        </h2>

        <div
          className="animate-slide topic-card p-8"
          style={{ animationDelay: "0.1s" }}
        >
          {/* 决策节点 */}
          <div className="flex flex-col items-center gap-5">
            {/* 第一层问题 */}
            <div
              className="rounded-2xl px-8 py-4 text-center"
              style={{
                background: "var(--foreground)",
                color: "var(--card)",
                border: "2px solid var(--foreground)",
                boxShadow: "8px 8px 0px 0px var(--tertiary)",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              <p className="text-lg font-extrabold">你的项目规模如何？</p>
            </div>

            {/* 分支 */}
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
              {/* 小型项目 */}
              <div className="flex flex-col items-center gap-4">
                <span
                  className="rounded-full px-4 py-1 text-sm font-bold"
                  style={{
                    background: "#34D399",
                    border: "2px solid var(--foreground)",
                    fontFamily: "Outfit, sans-serif",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  🟢 小 / 中型项目
                </span>
                <ChevronDown size={20} strokeWidth={3} />
                <div
                  className="rounded-xl px-5 py-4 text-center"
                  style={{
                    background: "#34D39922",
                    border: "2px solid #34D399",
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                  }}
                >
                  <p className="text-sm font-bold">追求简洁 & 快速迭代？</p>
                  <ChevronDown size={16} className="mx-auto my-2" />
                  <span
                    className="inline-block rounded-full px-6 py-2 text-lg font-extrabold text-white"
                    style={{
                      background: "#34D399",
                      border: "2px solid var(--foreground)",
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    🐻 Zustand
                  </span>
                </div>
              </div>

              {/* 大型项目 */}
              <div className="flex flex-col items-center gap-4">
                <span
                  className="rounded-full px-4 py-1 text-sm font-bold"
                  style={{
                    background: "#8B5CF6",
                    border: "2px solid var(--foreground)",
                    fontFamily: "Outfit, sans-serif",
                    color: "white",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  🟣 大型 / 企业级项目
                </span>
                <ChevronDown size={20} strokeWidth={3} />
                <div
                  className="rounded-xl px-5 py-4 text-center"
                  style={{
                    background: "#8B5CF622",
                    border: "2px solid #8B5CF6",
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                  }}
                >
                  <p className="text-sm font-bold">需要严格可追溯 & 团队规范？</p>
                  <ChevronDown size={16} className="mx-auto my-2" />
                  <span
                    className="inline-block rounded-full px-6 py-2 text-lg font-extrabold text-white"
                    style={{
                      background: "#8B5CF6",
                      border: "2px solid var(--foreground)",
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    🔄 Redux (RTK)
                  </span>
                </div>
              </div>

              {/* 复杂交互 */}
              <div className="flex flex-col items-center gap-4">
                <span
                  className="rounded-full px-4 py-1 text-sm font-bold"
                  style={{
                    background: "#F472B6",
                    border: "2px solid var(--foreground)",
                    fontFamily: "Outfit, sans-serif",
                    color: "white",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  🩷 复杂交互 & 实时 UI
                </span>
                <ChevronDown size={20} strokeWidth={3} />
                <div
                  className="rounded-xl px-5 py-4 text-center"
                  style={{
                    background: "#F472B622",
                    border: "2px solid #F472B6",
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                  }}
                >
                  <p className="text-sm font-bold">数据关系复杂 & 仪表盘？</p>
                  <ChevronDown size={16} className="mx-auto my-2" />
                  <span
                    className="inline-block rounded-full px-6 py-2 text-lg font-extrabold text-white"
                    style={{
                      background: "#F472B6",
                      border: "2px solid var(--foreground)",
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    📊 MobX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          总结 — 终极推荐
          ═══════════════════════════════════════ */}
      <section className="container mx-auto px-6 py-16">
        <div
          className="animate-pop topic-card relative overflow-hidden p-10"
          style={{
            background: `linear-gradient(135deg, #34D39922, #8B5CF622, #F472B622)`,
            boxShadow: "12px 12px 0px 0px var(--foreground)",
          }}
        >
          {/* 装饰 */}
          <div
            className="pointer-events-none absolute -top-12 -right-12 opacity-10"
            style={{
              width: 200,
              height: 200,
              background: "var(--tertiary)",
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            }}
          />

          <div className="animate-pop mb-4">
            <Badge color="var(--tertiary)">
              <Heart size={12} strokeWidth={2.5} />
              最终总结
            </Badge>
          </div>

          <h2
            className="animate-pop mb-6 text-3xl font-extrabold md:text-4xl"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            没有最好的，只有最合适的
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                lib: "Zustand",
                emoji: "🐻",
                color: "#34D399",
                summary: "如果你追求极致简洁、零模板代码、快速上手 —— Zustand 是 2024 年的首选。它用最少的概念解决了 80% 的状态管理需求。",
              },
              {
                lib: "Redux",
                emoji: "🔄",
                color: "#8B5CF6",
                summary: "如果你的项目规模大、团队成员多、需要严格的状态变更审计 —— Redux Toolkit 依然是最稳的选择。它的工具链和生态系统无可匹敌。",
              },
              {
                lib: "MobX",
                emoji: "📊",
                color: "#F472B6",
                summary: "如果你偏好面向对象思维、数据模型关系复杂、需要极致的渲染性能 —— MobX 的响应式系统会让你的开发体验如丝般顺滑。",
              },
            ].map((item) => (
              <div
                key={item.lib}
                className="rounded-xl p-5"
                style={{
                  background: `${item.color}22`,
                  border: `2px solid ${item.color}`,
                }}
              >
                <p
                  className="mb-2 text-xl font-extrabold"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {item.emoji} {item.lib}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  {item.summary}
                </p>
              </div>
            ))}
          </div>

          <p
            className="animate-slide mt-8 text-center text-base font-bold"
            style={{
              fontFamily: "Outfit, sans-serif",
              opacity: 0.6,
              animationDelay: "0.3s",
            }}
          >
            🎯 理解原理比记忆 API 更重要 —— 选一个最适合你团队和项目的，然后深入掌握它。
          </p>
        </div>
      </section>
    </div>
  );
}