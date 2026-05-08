"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Layers,
  Palette,
  Box,
  Code2,
  Puzzle,
  GitBranch,
  Zap,
  Shield,
  Eye,
  Type,
  Grid3X3,
  Sparkles,
  ChevronRight,
  Copy,
  Check,
  Monitor,
  Smartphone,
  Tablet,
  ArrowRight,
  BookOpen,
  ToggleLeft,
  Package,
  Brush,
  FileCode2,
  Shapes,
  Target,
  RefreshCw,
  MessageSquare,
  Star,
  Clock,
  Users,
  Lightbulb,
  Workflow,
} from "lucide-react";

/* ───────────────────── 数据定义 ───────────────────── */

const designTokens = [
  {
    category: "色彩系统",
    icon: <Palette size={20} strokeWidth={2.5} />,
    color: "var(--accent)",
    bgColor: "bg-purple-100",
    tokens: [
      { name: "--color-primary", value: "#6366F1", desc: "主品牌色" },
      { name: "--color-success", value: "#22C55E", desc: "成功状态" },
      { name: "--color-warning", value: "#F59E0B", desc: "警告状态" },
      { name: "--color-error", value: "#EF4444", desc: "错误状态" },
    ],
  },
  {
    category: "间距系统",
    icon: <Grid3X3 size={20} strokeWidth={2.5} />,
    color: "var(--secondary)",
    bgColor: "bg-pink-100",
    tokens: [
      { name: "--space-1", value: "4px", desc: "微间距" },
      { name: "--space-2", value: "8px", desc: "小间距" },
      { name: "--space-4", value: "16px", desc: "标准间距" },
      { name: "--space-8", value: "32px", desc: "大间距" },
    ],
  },
  {
    category: "字号体系",
    icon: <Type size={20} strokeWidth={2.5} />,
    color: "var(--tertiary)",
    bgColor: "bg-yellow-100",
    tokens: [
      { name: "--text-xs", value: "12px", desc: "辅助文字" },
      { name: "--text-sm", value: "14px", desc: "正文小号" },
      { name: "--text-base", value: "16px", desc: "正文标准" },
      { name: "--text-lg", value: "18px", desc: "正文大号" },
    ],
  },
  {
    category: "圆角系统",
    icon: <Shapes size={20} strokeWidth={2.5} />,
    color: "var(--quaternary)",
    bgColor: "bg-green-100",
    tokens: [
      { name: "--radius-sm", value: "4px", desc: "小圆角" },
      { name: "--radius-md", value: "8px", desc: "中圆角" },
      { name: "--radius-lg", value: "16px", desc: "大圆角" },
      { name: "--radius-full", value: "9999px", desc: "全圆" },
    ],
  },
];

const architectureLayers = [
  {
    name: "Design Tokens",
    desc: "最底层的设计变量：颜色、间距、字号、阴影",
    icon: <Palette size={22} strokeWidth={2.5} />,
    color: "var(--accent)",
    bg: "var(--card)",
  },
  {
    name: "Primitives",
    desc: "无样式的原子组件：Button、Input、Typography",
    icon: <Box size={22} strokeWidth={2.5} />,
    color: "var(--secondary)",
    bg: "var(--card)",
  },
  {
    name: "Components",
    desc: "有业务语义的组件：Modal、Table、Form",
    icon: <Puzzle size={22} strokeWidth={2.5} />,
    color: "var(--tertiary)",
    bg: "var(--card)",
  },
  {
    name: "Patterns",
    desc: "可复用的组合模式：搜索筛选、表单向导、数据看板",
    icon: <Workflow size={22} strokeWidth={2.5} />,
    color: "var(--quaternary)",
    bg: "var(--card)",
  },
];

const principles = [
  {
    icon: <Target size={28} strokeWidth={2.5} />,
    title: "一致性",
    desc: "统一的视觉语言和交互模式，让用户体验无论在哪个产品模块都能无缝衔接。",
    color: "var(--accent)",
  },
  {
    icon: <Zap size={28} strokeWidth={2.5} />,
    title: "可复用性",
    desc: "每个组件都应像乐高积木一样——独立完整，又可以自由组合构建更大的系统。",
    color: "var(--tertiary)",
  },
  {
    icon: <Shield size={28} strokeWidth={2.5} />,
    title: "可访问性",
    desc: "WCAG 2.1 AA 标准不是可选项。键盘导航、屏幕阅读器、色彩对比度必须覆盖。",
    color: "var(--quaternary)",
  },
  {
    icon: <RefreshCw size={28} strokeWidth={2.5} />,
    title: "可维护性",
    desc: "语义化 API 设计、完善的类型定义、清晰的变更日志，让组件库能长期演进。",
    color: "var(--secondary)",
  },
];

const bestPractices = [
  {
    step: "01",
    title: "原子化设计",
    desc: "从最小的 UI 原子（按钮、输入框、标签）开始，逐层组合为分子、有机体。",
    icon: <Atom />,
    color: "var(--accent)",
  },
  {
    step: "02",
    title: "Storybook 驱动",
    desc: "用 Storybook 隔离开发每个组件，同时自动生成交互式文档和视觉回归测试。",
    icon: <BookOpen />,
    color: "var(--secondary)",
  },
  {
    step: "03",
    title: "变体与组合",
    desc: "通过 variant + size + state 三维矩阵覆盖所有场景，而非无限制的 props 膨胀。",
    icon: <Grid3X3 />,
    color: "var(--tertiary)",
  },
  {
    step: "04",
    title: "主题切换",
    desc: "所有颜色走 CSS 变量，支持 Light / Dark / Brand 三种主题一键切换。",
    icon: <Brush />,
    color: "var(--quaternary)",
  },
  {
    step: "05",
    title: "自动化发布",
    desc: "Semantic Release + Conventional Commits，每次合并自动打 Tag、发 npm、更新日志。",
    icon: <GitBranch />,
    color: "var(--accent)",
  },
  {
    step: "06",
    title: "文档即代码",
    desc: "Props 文档从 TypeScript 类型自动生成，示例代码从 Story 自动提取，零维护成本。",
    icon: <FileCode2 />,
    color: "var(--secondary)",
  },
];

function Atom() {
  return <Sparkles size={22} strokeWidth={2.5} />;
}

/* ───────── 交互式组件演示数据 ───────── */

const buttonVariants = [
  { label: "Primary", className: "bg-[var(--accent)] text-white" },
  { label: "Secondary", className: "bg-[var(--secondary)] text-white" },
  { label: "Outline", className: "bg-transparent text-[var(--foreground)]" },
  { label: "Ghost", className: "bg-transparent text-[var(--accent)]" },
];

const buttonSizes = ["sm", "md", "lg"];

/* ──────────────── 页面组件 ──────────────── */

export default function EnterpriseComponentLibraryPage() {
  const [activeVariant, setActiveVariant] = useState(0);
  const [activeSize, setActiveSize] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeLayer, setActiveLayer] = useState(0);
  const [themePreview, setThemePreview] = useState<"light" | "dark">("light");

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-dot-grid min-h-screen pb-32">
      {/* ════════════════ HERO ════════════════ */}
      <section className="container pt-12 pb-20 md:pt-20 md:pb-28 relative overflow-hidden">
        {/* 装饰几何 */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 md:w-96 md:h-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--tertiary) 0%, transparent 70%)",
            border: "3px dashed var(--tertiary)",
          }}
        />
        <div
          className="absolute top-40 -left-16 w-40 h-40 md:w-56 md:h-56 opacity-15"
          style={{
            background: "var(--secondary)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            border: "3px dashed var(--secondary)",
          }}
        />
        <div
          className="absolute bottom-10 right-1/4 w-20 h-20 border-4 opacity-10"
          style={{
            borderColor: "var(--accent)",
            transform: "rotate(45deg)",
          }}
        />

        {/* 标签 */}
        <div
          className="animate-pop mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[var(--foreground)]"
          style={{
            background: "var(--tertiary)",
            boxShadow: "4px 4px 0px 0px var(--foreground)",
          }}
        >
          <Package size={16} strokeWidth={2.5} />
          <span
            className="font-bold text-sm uppercase tracking-wider"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            知识深度解析
          </span>
        </div>

        {/* 主标题 */}
        <h1
          className="animate-pop text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
          style={{
            fontFamily: "Outfit, sans-serif",
            color: "var(--foreground)",
          }}
        >
          企业级
          <br />
          <span
            className="relative inline-block"
            style={{ color: "var(--accent)" }}
          >
            组件库设计
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
            >
              <path
                d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8"
                stroke="var(--secondary)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <p
          className="animate-slide max-w-2xl text-lg md:text-xl text-[var(--foreground)] opacity-70 leading-relaxed"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          从 Design Tokens 到组件架构，从 API
          设计到发布运维——构建一套支撑数十个业务线、
          数百开发者的企业级组件库，需要哪些核心知识？
        </p>

        {/* 指标徽章 */}
        <div
          className="animate-slide flex flex-wrap gap-4 mt-10"
          style={{ animationDelay: "0.2s" }}
        >
          {[
            {
              icon: <Clock size={16} strokeWidth={2.5} />,
              label: "阅读 12 min",
              color: "var(--accent)",
            },
            {
              icon: <Users size={16} strokeWidth={2.5} />,
              label: "高级进阶",
              color: "var(--secondary)",
            },
            {
              icon: <Star size={16} strokeWidth={2.5} />,
              label: "实战导向",
              color: "var(--tertiary)",
            },
          ].map((badge, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-bold border-2 border-[var(--foreground)] rounded-full"
              style={{
                background: badge.color,
                boxShadow: "3px 3px 0px 0px var(--foreground)",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              {badge.icon}
              {badge.label}
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════ 为什么需要组件库 ════════════════ */}
      <section className="container mb-20">
        <SectionHeader
          icon={<Lightbulb size={24} strokeWidth={2.5} />}
          title="为什么需要企业级组件库？"
          color="var(--tertiary)"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              stat: "3x",
              label: "开发效率提升",
              desc: "统一组件减少重复开发，新业务线接入时间从数周缩短到数天",
              color: "var(--accent)",
              icon: <Zap size={24} strokeWidth={2.5} />,
            },
            {
              stat: "95%",
              label: "UI 一致性",
              desc: "跨团队、跨产品线保持统一的品牌形象和交互体验",
              color: "var(--quaternary)",
              icon: <Eye size={24} strokeWidth={2.5} />,
            },
            {
              stat: "60%",
              label: "维护成本降低",
              desc: "一次修复全局生效，不再逐个项目修补同样的 UI Bug",
              color: "var(--secondary)",
              icon: <Shield size={24} strokeWidth={2.5} />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="animate-slide topic-card p-6 relative overflow-hidden"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* 背景装饰圆 */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10"
                style={{ background: item.color }}
              />

              {/* 图标徽章 */}
              <div
                className="w-12 h-12 rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center mb-4"
                style={{
                  background: item.color,
                  boxShadow: "3px 3px 0px 0px var(--foreground)",
                }}
              >
                <span className="text-white">{item.icon}</span>
              </div>

              <div
                className="text-4xl font-extrabold mb-1"
                style={{ fontFamily: "Outfit, sans-serif", color: item.color }}
              >
                {item.stat}
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {item.label}
              </h3>
              <p
                className="text-sm opacity-70 leading-relaxed"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════ 架构分层 ════════════════ */}
      <section className="container mb-20">
        <SectionHeader
          icon={<Layers size={24} strokeWidth={2.5} />}
          title="四层架构模型"
          color="var(--accent)"
        />

        <p
          className="text-base opacity-70 mt-2 mb-8 max-w-2xl"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          一个优秀的组件库应该像洋葱一样分层——每一层只依赖下层，绝不反向引用。
          点击每一层查看详细说明。
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* 左侧层级选择 */}
          <div className="flex flex-col gap-3">
            {architectureLayers.map((layer, i) => (
              <button
                key={i}
                onClick={() => setActiveLayer(i)}
                className={`
                  animate-slide topic-card text-left p-5 flex items-center gap-4 transition-all duration-200
                  ${activeLayer === i ? "ring-4 ring-offset-2" : "opacity-70 hover:opacity-100"}
                `}
                style={
                  {
                    animationDelay: `${i * 0.08}s`,
                    ringColor: layer.color,
                  } as React.CSSProperties
                }
              >
                {/* 层级编号 */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg border-2 border-[var(--foreground)] flex items-center justify-center font-extrabold text-white text-sm"
                  style={{
                    background: layer.color,
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  L{i}
                </div>
                <div>
                  <h3
                    className="font-bold text-base"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {layer.name}
                  </h3>
                  <p
                    className="text-xs opacity-60 mt-0.5"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    {layer.desc}
                  </p>
                </div>
                <ChevronRight size={18} className="ml-auto opacity-40" />
              </button>
            ))}
          </div>

          {/* 右侧详情面板 */}
          <div
            className="topic-card p-8 relative overflow-hidden"
            style={{
              borderTop: `4px solid ${architectureLayers[activeLayer].color}`,
            }}
          >
            {/* 装饰 */}
            <div
              className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-5"
              style={{ background: architectureLayers[activeLayer].color }}
            />

            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-14 h-14 rounded-2xl border-2 border-[var(--foreground)] flex items-center justify-center"
                style={{
                  background: architectureLayers[activeLayer].color,
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                <span className="text-white">
                  {architectureLayers[activeLayer].icon}
                </span>
              </div>
              <div>
                <h3
                  className="text-2xl font-extrabold"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    color: architectureLayers[activeLayer].color,
                  }}
                >
                  {architectureLayers[activeLayer].name}
                </h3>
                <p
                  className="text-sm opacity-60"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Layer {activeLayer} ·{" "}
                  {activeLayer === 0
                    ? "Foundation"
                    : activeLayer === 1
                      ? "Base"
                      : activeLayer === 2
                        ? "Business"
                        : "Composition"}
                </p>
              </div>
            </div>

            {/* 该层的示例代码 */}
            <div className="mb-6">
              <h4
                className="text-sm font-bold uppercase tracking-wider opacity-50 mb-3"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                示例内容
              </h4>
              <div className="flex flex-wrap gap-2">
                {getLayerExamples(activeLayer).map((example, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm font-bold rounded-lg border-2 border-[var(--foreground)]"
                    style={{
                      background:
                        i % 2 === 0
                          ? "var(--background)"
                          : `${architectureLayers[activeLayer].color}22`,
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                    }}
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>

            {/* 规则 */}
            <div>
              <h4
                className="text-sm font-bold uppercase tracking-wider opacity-50 mb-3"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                关键原则
              </h4>
              <ul className="space-y-2">
                {getLayerRules(activeLayer).map((rule, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-[var(--foreground)] flex items-center justify-center text-[10px] font-bold mt-0.5"
                      style={{
                        background: architectureLayers[activeLayer].color,
                        color: "white",
                      }}
                    >
                      {i + 1}
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* 依赖箭头 */}
            {activeLayer < 3 && (
              <div
                className="mt-6 p-3 rounded-xl border-2 border-dashed text-center text-sm font-bold"
                style={{
                  borderColor: architectureLayers[activeLayer + 1].color,
                  color: architectureLayers[activeLayer + 1].color,
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                ↓ 被 {architectureLayers[activeLayer + 1].name} 层依赖
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════ 设计原则 ════════════════ */}
      <section className="container mb-20">
        <SectionHeader
          icon={<Target size={24} strokeWidth={2.5} />}
          title="四大设计原则"
          color="var(--quaternary)"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {principles.map((p, i) => (
            <div
              key={i}
              className="animate-slide topic-card p-7 flex gap-5 items-start group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="flex-shrink-0 w-16 h-16 rounded-2xl border-2 border-[var(--foreground)] flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6"
                style={{
                  background: p.color,
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                <span className="text-white">{p.icon}</span>
              </div>
              <div>
                <h3
                  className="text-xl font-extrabold mb-2"
                  style={{ fontFamily: "Outfit, sans-serif", color: p.color }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-sm opacity-70 leading-relaxed"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════ DESIGN TOKENS 展示 ════════════════ */}
      <section className="container mb-20">
        <SectionHeader
          icon={<Palette size={24} strokeWidth={2.5} />}
          title="Design Tokens 体系"
          color="var(--secondary)"
        />

        <p
          className="text-base opacity-70 mt-2 mb-8 max-w-2xl"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          Design Tokens 是组件库的"设计基因"——它将颜色、间距、字号等设计决策
          抽象为可编程的变量，实现"一处修改，全局生效"。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {designTokens.map((group, gi) => (
            <div
              key={gi}
              className="animate-slide topic-card p-6 overflow-hidden"
              style={{ animationDelay: `${gi * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center"
                  style={{
                    background: group.color,
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                  }}
                >
                  <span className="text-white">{group.icon}</span>
                </div>
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {group.category}
                </h3>
              </div>

              <div className="space-y-2.5">
                {group.tokens.map((token, ti) => {
                  const globalIndex = gi * 4 + ti;
                  return (
                    <div
                      key={ti}
                      className="flex items-center gap-3 p-2.5 rounded-xl border-2 border-[var(--border)] bg-[var(--background)] group/tok hover:border-[var(--foreground)] transition-colors"
                    >
                      {/* 色块预览 */}
                      {gi === 0 && (
                        <div
                          className="w-8 h-8 rounded-lg border-2 border-[var(--foreground)] flex-shrink-0"
                          style={{ background: token.value }}
                        />
                      )}

                      <div className="flex-1 min-w-0">
                        <code className="text-xs font-bold text-[var(--accent)] block truncate">
                          {token.name}
                        </code>
                        <span className="text-xs opacity-50">{token.desc}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <code className="text-xs font-bold px-2 py-1 rounded-md bg-[var(--card)] border border-[var(--border)]">
                          {token.value}
                        </code>
                        <button
                          onClick={() => handleCopy(token.name, globalIndex)}
                          className="p-1 rounded-md hover:bg-[var(--border)] transition-colors opacity-40 hover:opacity-100"
                        >
                          {copiedIndex === globalIndex ? (
                            <Check
                              size={14}
                              strokeWidth={2.5}
                              className="text-[var(--quaternary)]"
                            />
                          ) : (
                            <Copy size={14} strokeWidth={2.5} />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════ 交互式组件实验室 ════════════════ */}
      <section className="container mb-20">
        <SectionHeader
          icon={<Code2 size={24} strokeWidth={2.5} />}
          title="组件实验室"
          color="var(--accent)"
        />

        <p
          className="text-base opacity-70 mt-2 mb-8 max-w-2xl"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          亲身体验一个 Button 组件的设计空间。调整 Variant、Size、状态，观察 API
          设计如何覆盖所有场景。
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* 控制面板 */}
          <div className="lg:col-span-2 topic-card p-6">
            <h3
              className="text-sm font-bold uppercase tracking-wider opacity-50 mb-5"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              配置面板
            </h3>

            {/* Variant 选择 */}
            <div className="mb-5">
              <label
                className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2 block"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Variant
              </label>
              <div className="grid grid-cols-2 gap-2">
                {buttonVariants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveVariant(i)}
                    className={`
                      px-3 py-2 text-sm font-bold rounded-xl border-2 border-[var(--foreground)] transition-all
                      ${
                        activeVariant === i
                          ? "ring-4 ring-[var(--accent)] ring-offset-2"
                          : "opacity-60 hover:opacity-100"
                      }
                    `}
                    style={{
                      background:
                        activeVariant === i ? "var(--accent)" : "var(--card)",
                      color:
                        activeVariant === i ? "white" : "var(--foreground)",
                      boxShadow:
                        activeVariant === i
                          ? "3px 3px 0px 0px var(--foreground)"
                          : "none",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size 选择 */}
            <div className="mb-5">
              <label
                className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2 block"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Size
              </label>
              <div className="flex gap-2">
                {buttonSizes.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSize(i)}
                    className={`
                      px-4 py-2 text-sm font-bold rounded-xl border-2 border-[var(--foreground)] transition-all
                      ${
                        activeSize === i
                          ? "ring-4 ring-[var(--secondary)] ring-offset-2"
                          : "opacity-60 hover:opacity-100"
                      }
                    `}
                    style={{
                      background:
                        activeSize === i ? "var(--secondary)" : "var(--card)",
                      color: activeSize === i ? "white" : "var(--foreground)",
                      boxShadow:
                        activeSize === i
                          ? "3px 3px 0px 0px var(--foreground)"
                          : "none",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* 开关 */}
            <div className="space-y-3">
              <ToggleSwitch
                label="Disabled"
                checked={isDisabled}
                onChange={setIsDisabled}
              />
              <ToggleSwitch
                label="Show Icon"
                checked={showIcon}
                onChange={setShowIcon}
              />
            </div>

            {/* 生成的代码 */}
            <div className="mt-6">
              <label
                className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2 block"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                生成代码
              </label>
              <div className="relative rounded-xl border-2 border-[var(--foreground)] bg-[var(--foreground)] overflow-hidden">
                <button
                  onClick={() =>
                    handleCopy(
                      `<Button variant="${buttonVariants[activeVariant].label.toLowerCase()}" size="${buttonSizes[activeSize]}"${isDisabled ? " disabled" : ""}${showIcon ? " icon={<Zap />}" : ""} />`,
                      99,
                    )
                  }
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {copiedIndex === 99 ? (
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      className="text-[var(--quaternary)]"
                    />
                  ) : (
                    <Copy
                      size={14}
                      strokeWidth={2.5}
                      className="text-white/60"
                    />
                  )}
                </button>
                <pre
                  className="p-4 text-xs text-green-300 overflow-x-auto"
                  style={{ fontFamily: "monospace" }}
                >
                  <code>{`<Button\n  variant="${buttonVariants[activeVariant].label.toLowerCase()}"\n  size="${buttonSizes[activeSize]}"\n${isDisabled ? "  disabled\n" : ""}${showIcon ? "  icon={<Zap />}\n" : ""}/>`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* 预览区域 */}
          <div className="lg:col-span-3 topic-card p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">
            {/* 网格背景 */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(var(--foreground) 1px, transparent 1px),
                  linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
              }}
            />

            {/* 设备框架切换 */}
            <div className="flex gap-2 mb-8">
              {[
                {
                  icon: <Monitor size={16} strokeWidth={2.5} />,
                  label: "Desktop",
                },
                {
                  icon: <Tablet size={16} strokeWidth={2.5} />,
                  label: "Tablet",
                },
                {
                  icon: <Smartphone size={16} strokeWidth={2.5} />,
                  label: "Mobile",
                },
              ].map((device, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border-2 border-[var(--border)] opacity-50"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {device.icon}
                  {device.label}
                </span>
              ))}
            </div>

            {/* 按钮预览 */}
            <div className="flex flex-col items-center gap-6">
              {/* 主预览按钮 */}
              <div className="animate-pop">
                <PreviewButton
                  variant={activeVariant}
                  size={activeSize}
                  disabled={isDisabled}
                  showIcon={showIcon}
                />
              </div>

              {/* 所有状态展示 */}
              <div className="flex flex-wrap gap-3 justify-center">
                {["Default", "Hover", "Active", "Focus"].map((state, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider opacity-40"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {state}
                    </span>
                    <div
                      className={`
                        px-4 py-2 rounded-xl border-2 border-[var(--foreground)] text-sm font-bold flex items-center gap-2
                        ${buttonVariants[activeVariant].className}
                        ${isDisabled ? "opacity-40" : ""}
                        ${i === 1 ? "brightness-110" : ""}
                        ${i === 2 ? "brightness-90 translate-y-[1px]" : ""}
                        ${i === 3 ? "ring-4 ring-[var(--accent)] ring-offset-2" : ""}
                      `}
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontSize:
                          buttonSizes[activeSize] === "sm"
                            ? "12px"
                            : buttonSizes[activeSize] === "md"
                              ? "14px"
                              : "16px",
                        boxShadow:
                          i === 2
                            ? "2px 2px 0px 0px var(--foreground)"
                            : "4px 4px 0px 0px var(--foreground)",
                        border:
                          activeVariant === 2
                            ? "2px solid var(--foreground)"
                            : activeVariant === 3
                              ? "2px solid transparent"
                              : undefined,
                      }}
                    >
                      {showIcon && <Zap size={14} strokeWidth={2.5} />}
                      {buttonVariants[activeVariant].label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Props 矩阵 */}
            <div className="mt-10 w-full">
              <h4
                className="text-xs font-bold uppercase tracking-wider opacity-40 mb-3 text-center"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Variant × Size 矩阵
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs">
                  <thead>
                    <tr>
                      <th
                        className="py-2 px-3 font-bold opacity-40"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      ></th>
                      {buttonSizes.map((s) => (
                        <th
                          key={s}
                          className="py-2 px-3 font-bold uppercase opacity-40"
                          style={{ fontFamily: "Outfit, sans-serif" }}
                        >
                          {s}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {buttonVariants.map((v, vi) => (
                      <tr key={vi}>
                        <td
                          className="py-2 px-3 font-bold text-left"
                          style={{ fontFamily: "Outfit, sans-serif" }}
                        >
                          {v.label}
                        </td>
                        {buttonSizes.map((s, si) => {
                          const isActive =
                            vi === activeVariant && si === activeSize;
                          return (
                            <td key={si} className="py-2 px-3">
                              <div
                                className={`
                                  inline-block px-3 py-1 rounded-lg border-2 border-[var(--foreground)] font-bold cursor-pointer transition-all
                                  ${v.className}
                                  ${isActive ? "ring-4 ring-[var(--tertiary)] ring-offset-1 scale-110" : "opacity-50 hover:opacity-80"}
                                `}
                                style={{
                                  fontSize:
                                    s === "sm"
                                      ? "10px"
                                      : s === "md"
                                        ? "11px"
                                        : "12px",
                                  boxShadow: isActive
                                    ? "3px 3px 0px 0px var(--foreground)"
                                    : "2px 2px 0px 0px var(--foreground)",
                                }}
                                onClick={() => {
                                  setActiveVariant(vi);
                                  setActiveSize(si);
                                }}
                              >
                                {v.label}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ 主题切换演示 ════════════════ */}
      <section className="container mb-20">
        <SectionHeader
          icon={<Brush size={24} strokeWidth={2.5} />}
          title="主题系统"
          color="var(--tertiary)"
        />

        <p
          className="text-base opacity-70 mt-2 mb-8 max-w-2xl"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          优秀的组件库应该支持多主题切换。所有视觉属性通过 CSS
          变量控制，组件代码完全不需要修改。
        </p>

        <div className="topic-card overflow-hidden">
          {/* 主题切换栏 */}
          <div className="flex border-b-2 border-[var(--border)]">
            {(["light", "dark"] as const).map((theme) => (
              <button
                key={theme}
                onClick={() => setThemePreview(theme)}
                className={`
                  flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2
                  ${
                    themePreview === theme
                      ? "border-b-4 border-[var(--accent)] text-[var(--accent)]"
                      : "opacity-50 hover:opacity-80"
                  }
                `}
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {theme === "light" ? (
                  <Monitor size={16} strokeWidth={2.5} />
                ) : (
                  <Smartphone size={16} strokeWidth={2.5} />
                )}
                {theme === "light" ? "Light Theme" : "Dark Theme"}
              </button>
            ))}
          </div>

          {/* 预览区 */}
          <div className="p-8">
            <div
              className="rounded-2xl border-2 border-[var(--foreground)] p-8 transition-colors duration-300"
              style={{
                background: themePreview === "light" ? "#FFFFFF" : "#1E293B",
                color: themePreview === "light" ? "#1E293B" : "#F8FAFC",
                boxShadow: "8px 8px 0px 0px var(--foreground)",
              }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* 卡片示例 */}
                <div
                  className="flex-1 rounded-xl border-2 p-5"
                  style={{
                    borderColor:
                      themePreview === "light" ? "#E2E8F0" : "#475569",
                    background:
                      themePreview === "light" ? "#FFFFFF" : "#334155",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background:
                          themePreview === "light" ? "#8B5CF6" : "#A78BFA",
                        color: "white",
                      }}
                    >
                      <Layers size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4
                        className="font-bold text-sm"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      >
                        Dashboard Card
                      </h4>
                      <p className="text-xs opacity-50">Analytics overview</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {["Revenue", "Users", "Conversion"].map((metric, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <span className="text-xs opacity-60">{metric}</span>
                        <div
                          className="w-24 h-2 rounded-full overflow-hidden"
                          style={{
                            background:
                              themePreview === "light" ? "#E2E8F0" : "#475569",
                          }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${[78, 62, 45][i]}%`,
                              background: ["#8B5CF6", "#F472B6", "#FBBF24"][i],
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 按钮示例 */}
                <div className="flex-1 flex flex-col gap-3 justify-center">
                  <div
                    className="px-5 py-3 rounded-xl text-center text-sm font-bold"
                    style={{
                      background:
                        themePreview === "light" ? "#8B5CF6" : "#A78BFA",
                      color: "white",
                      fontFamily: "Outfit, sans-serif",
                      boxShadow:
                        "4px 4px 0px 0px " +
                        (themePreview === "light" ? "#1E293B" : "#0F172A"),
                    }}
                  >
                    Primary Action
                  </div>
                  <div
                    className="px-5 py-3 rounded-xl text-center text-sm font-bold border-2"
                    style={{
                      borderColor:
                        themePreview === "light" ? "#1E293B" : "#94A3B8",
                      color: themePreview === "light" ? "#1E293B" : "#F8FAFC",
                      fontFamily: "Outfit, sans-serif",
                      boxShadow:
                        "4px 4px 0px 0px " +
                        (themePreview === "light" ? "#E2E8F0" : "#334155"),
                    }}
                  >
                    Secondary
                  </div>
                  <div
                    className="flex items-center gap-2 justify-center text-xs opacity-40"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    <Code2 size={12} strokeWidth={2.5} />
                    Same component · Different CSS variables
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ 最佳实践时间线 ════════════════ */}
      <section className="container mb-20">
        <SectionHeader
          icon={<GitBranch size={24} strokeWidth={2.5} />}
          title="构建最佳实践"
          color="var(--accent)"
        />

        <div className="mt-8 relative">
          {/* 连接线 */}
          <div
            className="hidden md:block absolute left-[39px] top-0 bottom-0 w-[3px]"
            style={{
              background:
                "repeating-linear-gradient(to bottom, var(--border) 0, var(--border) 8px, transparent 8px, transparent 16px)",
            }}
          />

          <div className="space-y-6">
            {bestPractices.map((practice, i) => (
              <div
                key={i}
                className="animate-slide flex gap-5 items-start"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* 步骤编号 */}
                <div
                  className="flex-shrink-0 w-20 h-20 rounded-2xl border-2 border-[var(--foreground)] flex flex-col items-center justify-center relative z-10"
                  style={{
                    background: practice.color,
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  <span
                    className="text-white opacity-60 text-[10px] font-bold uppercase"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    Step
                  </span>
                  <span
                    className="text-white text-xl font-extrabold"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {practice.step}
                  </span>
                </div>

                {/* 内容卡片 */}
                <div className="flex-1 topic-card p-6 group">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `${practice.color}22`,
                      }}
                    >
                      <span style={{ color: practice.color }}>
                        {React.cloneElement(practice.icon, { size: 18 })}
                      </span>
                    </div>
                    <div>
                      <h3
                        className="text-lg font-extrabold mb-1"
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          color: practice.color,
                        }}
                      >
                        {practice.title}
                      </h3>
                      <p
                        className="text-sm opacity-70 leading-relaxed"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        {practice.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ 组件 API 设计速查表 ════════════════ */}
      <section className="container mb-20">
        <SectionHeader
          icon={<FileCode2 size={24} strokeWidth={2.5} />}
          title="API 设计速查表"
          color="var(--quaternary)"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[
            {
              title: "✅ 推荐做法",
              color: "var(--quaternary)",
              items: [
                "用 variant 而非大量 boolean props 控制样式",
                "默认导出 + 命名导出并存，支持 Tree Shaking",
                "用 asChild 模式支持自定义渲染元素",
                "所有交互组件支持键盘操作和 ARIA 属性",
                "用 displayName 方便调试，forwardRef 透传 ref",
                "提供 compound components 模式（如 Select.Option）",
              ],
            },
            {
              title: "❌ 避免的做法",
              color: "var(--secondary)",
              items: [
                "Props 数量超过 15 个（考虑拆分或用 composition）",
                "在组件内部硬编码颜色、字号等视觉属性",
                "直接操作 DOM（除 Portal、Focus Trap 等特殊场景）",
                "忽略 SSR 兼容性（避免 useEffect 中的 layout 计算）",
                "不提供 TypeScript 类型定义或文档注释",
                "破坏性变更不走 semver major 版本号",
              ],
            },
          ].map((list, i) => (
            <div key={i} className="topic-card p-6">
              <h3
                className="text-lg font-extrabold mb-5 flex items-center gap-2"
                style={{
                  fontFamily: "Outfit, sans-serif",
                  color: list.color,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg border-2 border-[var(--foreground)] flex items-center justify-center text-white"
                  style={{
                    background: list.color,
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                  }}
                >
                  {i === 0 ? (
                    <Check size={16} strokeWidth={3} />
                  ) : (
                    <span className="text-sm font-bold">✕</span>
                  )}
                </div>
                {list.title}
              </h3>
              <ul className="space-y-3">
                {list.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-sm"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    <ArrowRight
                      size={14}
                      strokeWidth={2.5}
                      className="flex-shrink-0 mt-0.5 opacity-40"
                    />
                    <span className="opacity-80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════ 技术选型对比 ════════════════ */}
      <section className="container mb-20">
        <SectionHeader
          icon={<MessageSquare size={24} strokeWidth={2.5} />}
          title="技术栈选型"
          color="var(--secondary)"
        />

        <div className="mt-8 overflow-x-auto">
          <div className="topic-card overflow-hidden min-w-[600px]">
            <table
              className="w-full text-sm"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              <thead>
                <tr style={{ background: "var(--background)" }}>
                  <th
                    className="p-4 text-left font-bold border-b-2 border-[var(--foreground)]"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    维度
                  </th>
                  <th
                    className="p-4 text-center font-bold border-b-2 border-[var(--foreground)]"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    <span className="text-[var(--accent)]">
                      Radix + Tailwind
                    </span>
                  </th>
                  <th
                    className="p-4 text-center font-bold border-b-2 border-[var(--foreground)]"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    <span className="text-[var(--secondary)]">shadcn/ui</span>
                  </th>
                  <th
                    className="p-4 text-center font-bold border-b-2 border-[var(--foreground)]"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    <span className="text-[var(--tertiary)]">Headless UI</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { dim: "无样式层", r: "★★★★★", s: "★★★★★", h: "★★★★☆" },
                  { dim: "可定制性", r: "★★★★★", s: "★★★★☆", h: "★★★★★" },
                  { dim: "无障碍性", r: "★★★★★", s: "★★★★★", h: "★★★★☆" },
                  { dim: "学习成本", r: "★★★☆☆", s: "★★★★★", h: "★★★☆☆" },
                  { dim: "生态丰富度", r: "★★★★★", s: "★★★★☆", h: "★★★☆☆" },
                  { dim: "企业级适用", r: "★★★★★", s: "★★★★☆", h: "★★★★☆" },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[var(--border)] hover:bg-[var(--background)] transition-colors"
                  >
                    <td
                      className="p-4 font-bold"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {row.dim}
                    </td>
                    <td className="p-4 text-center">{row.r}</td>
                    <td className="p-4 text-center">{row.s}</td>
                    <td className="p-4 text-center">{row.h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ════════════════ 底部总结 ════════════════ */}
      <section className="container">
        <div
          className="animate-pop topic-card p-8 md:p-12 text-center relative overflow-hidden"
          style={{
            background: "var(--accent)",
            color: "white",
            borderColor: "var(--foreground)",
            boxShadow: "12px 12px 0px 0px var(--foreground)",
          }}
        >
          {/* 装饰 */}
          <div className="absolute top-6 left-6 w-16 h-16 border-4 border-white/20 rounded-full" />
          <div
            className="absolute bottom-8 right-8 w-24 h-24 border-4 border-white/10"
            style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
          />
          <div className="absolute top-1/2 right-1/4 w-8 h-8 border-4 border-white/15 rotate-45" />

          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-sm font-bold uppercase tracking-wider mb-6"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              <Sparkles size={16} strokeWidth={2.5} />
              核心洞察
            </div>

            <h2
              className="text-3xl md:text-4xl font-extrabold mb-4"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              好的组件库是「设计系统」的代码化身
            </h2>

            <p
              className="text-base opacity-80 max-w-2xl mx-auto leading-relaxed mb-8"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              它不仅仅是 UI 组件的集合，而是团队协作的契约、产品一致性的保障、
              设计师与工程师之间的桥梁。从 Design Tokens 到自动化发布，
              每一个环节都需要精心设计。
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "Design Tokens",
                "分层架构",
                "API 设计",
                "主题系统",
                "自动化发布",
              ].map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-sm font-bold rounded-full bg-white/20 border-2 border-white/30"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────── 辅助组件 ─────── */

function SectionHeader({
  icon,
  title,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-12 h-12 rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center"
        style={{
          background: color,
          boxShadow: "4px 4px 0px 0px var(--foreground)",
        }}
      >
        <span className="text-white">{icon}</span>
      </div>
      <h2
        className="text-2xl md:text-3xl font-extrabold"
        style={{ fontFamily: "Outfit, sans-serif", color: "var(--foreground)" }}
      >
        {title}
      </h2>
    </div>
  );
}

function ToggleSwitch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between w-full p-3 rounded-xl border-2 border-[var(--border)] hover:border-[var(--foreground)] transition-colors"
    >
      <span
        className="text-sm font-bold"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        {label}
      </span>
      <div
        className="w-12 h-7 rounded-full border-2 border-[var(--foreground)] relative transition-colors"
        style={{
          background: checked ? "var(--accent)" : "var(--border)",
          boxShadow: "2px 2px 0px 0px var(--foreground)",
        }}
      >
        <div
          className="absolute top-0.5 w-5 h-5 rounded-full border-2 border-[var(--foreground)] bg-white transition-transform"
          style={{
            transform: checked ? "translateX(20px)" : "translateX(1px)",
          }}
        />
      </div>
    </button>
  );
}

function PreviewButton({
  variant,
  size,
  disabled,
  showIcon,
}: {
  variant: number;
  size: number;
  disabled: boolean;
  showIcon: boolean;
}) {
  const sizes = {
    sm: { px: "px-4", py: "py-2", text: "text-sm", iconSize: 14 },
    md: { px: "px-6", py: "py-3", text: "text-base", iconSize: 18 },
    lg: { px: "px-8", py: "py-4", text: "text-lg", iconSize: 22 },
  };
  const s = sizes[buttonSizes[size] as keyof typeof sizes];

  const variantStyles = [
    {
      bg: "var(--accent)",
      color: "white",
      border: "var(--foreground)",
      shadow: "var(--foreground)",
    },
    {
      bg: "var(--secondary)",
      color: "white",
      border: "var(--foreground)",
      shadow: "var(--foreground)",
    },
    {
      bg: "transparent",
      color: "var(--foreground)",
      border: "var(--foreground)",
      shadow: "var(--border)",
    },
    {
      bg: "transparent",
      color: "var(--accent)",
      border: "transparent",
      shadow: "transparent",
    },
  ];

  const vs = variantStyles[variant];

  return (
    <div
      className={`
        ${s.px} ${s.py} ${s.text} font-bold rounded-xl border-2 flex items-center gap-2 transition-all
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:brightness-110 active:brightness-90 active:translate-y-[1px]"}
      `}
      style={{
        background: vs.bg,
        color: vs.color,
        borderColor: vs.border,
        boxShadow: `4px 4px 0px 0px ${vs.shadow}`,
        fontFamily: "Outfit, sans-serif",
      }}
    >
      {showIcon && <Zap size={s.iconSize} strokeWidth={2.5} />}
      {buttonVariants[variant].label}
    </div>
  );
}

/* ─────── 辅助函数 ─────── */

function getLayerExamples(layer: number): string[] {
  switch (layer) {
    case 0:
      return [
        "colors",
        "spacing",
        "typography",
        "shadows",
        "radii",
        "breakpoints",
        "z-index",
      ];
    case 1:
      return [
        "Button",
        "Input",
        "Label",
        "Badge",
        "Icon",
        "Typography",
        "Divider",
      ];
    case 2:
      return [
        "Modal",
        "Table",
        "Form",
        "DatePicker",
        "Dropdown",
        "Tabs",
        "Toast",
      ];
    case 3:
      return [
        "SearchFilter",
        "FormWizard",
        "DataTable",
        "Dashboard",
        "AuthFlow",
      ];
    default:
      return [];
  }
}

function getLayerRules(layer: number): string[] {
  switch (layer) {
    case 0:
      return [
        "所有设计决策抽象为 CSS 变量或 JS 常量",
        "支持 Light / Dark / Brand 多主题",
        "变量命名遵循语义化（如 --color-primary 而非 --blue-500）",
        "由设计师和工程师共同维护，版本化管理",
      ];
    case 1:
      return [
        "不包含任何业务逻辑，纯 UI 层",
        "所有组件必须通过 a11y 审计",
        "支持 asChild 模式让使用者自定义渲染元素",
        "完善的 TypeScript 泛型类型定义",
      ];
    case 2:
      return [
        "可以引用业务语义（如「订单状态」「用户角色」）",
        "内部组合 Primitives 组件，不直接操作样式",
        "提供 controlled / uncontrolled 两种使用模式",
        "复杂的组件需要提供 useXxx hooks 拆分逻辑",
      ];
    case 3:
      return [
        "是组件的「配方」而非新组件",
        "以文档 + 代码示例形式提供",
        "允许业务团队按需修改和扩展",
        "记录适用场景和不适用场景",
      ];
    default:
      return [];
  }
}
