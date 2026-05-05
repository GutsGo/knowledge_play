"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Layers,
  FileCode,
  Paintbrush,
  Move,
  Monitor,
  Cpu,
  Zap,
  GitBranch,
  Eye,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Workflow,
  Box,
  Palette,
  Grid3X3,
  Sparkles,
  ChevronRight,
  CircleDot,
} from "lucide-react";

/* ─────────────────────────────────────────
   数据层：浏览器渲染全部知识点
   ───────────────────────────────────────── */

const pipelineSteps = [
  {
    id: 1,
    title: "解析 HTML → DOM 树",
    subtitle: "DOM Tree Construction",
    icon: FileCode,
    color: "var(--accent)",
    bgColor: "#EDE9FE",
    description:
      "浏览器接收 HTML 字节流，通过分词器（Tokenizer）将其转化为 Token，再构建成 DOM 节点树。遇到 <script> 标签会阻塞解析，遇到 async/defer 则异步处理。",
    details: [
      "字节 → 字符 → Token → 节点 → DOM 树",
      "遇到 <link> 不阻塞 HTML 解析，但阻塞渲染",
      "遇到 <script> 默认阻塞 HTML 解析",
      "预解析器（Preload Scanner）提前发现外部资源",
    ],
  },
  {
    id: 2,
    title: "解析 CSS → CSSOM 树",
    subtitle: "CSSOM Construction",
    icon: Palette,
    color: "var(--secondary)",
    bgColor: "#FCE7F3",
    description:
      "浏览器解析所有 CSS 来源（内联、外链、继承），构建 CSSOM（CSS Object Model）树。CSS 是渲染阻塞资源，解析完成前页面不会渲染。",
    details: [
      "CSS 下载和解析不阻塞 DOM 解析",
      "但 CSSOM 构建完成前会阻塞渲染",
      "CSS 选择器从右向左匹配以提升效率",
      "样式继承和层叠在此阶段计算",
    ],
  },
  {
    id: 3,
    title: "合并 → 渲染树",
    subtitle: "Render Tree",
    icon: GitBranch,
    color: "var(--tertiary)",
    bgColor: "#FEF3C7",
    description:
      "将 DOM 树和 CSSOM 树合并为渲染树（Render Tree）。只包含可见节点：display:none 的元素不包含，visibility:hidden 仍占据空间并包含在内。",
    details: [
      "排除 display:none 和 <head> 等不可见节点",
      "visibility:hidden 仍占据布局空间",
      "每个可见节点存储对应的计算样式",
      "伪元素 (::before / ::after) 也会生成节点",
    ],
  },
  {
    id: 4,
    title: "布局（回流）",
    subtitle: "Layout / Reflow",
    icon: Grid3X3,
    color: "var(--quaternary)",
    bgColor: "#D1FAE5",
    description:
      "计算渲染树中每个节点的几何信息——位置（x, y）和尺寸（width, height）。也称为「回流」。输出盒模型信息，以视口坐标为基准。",
    details: [
      "计算每个元素的确切位置和大小",
      "基于盒模型：content + padding + border + margin",
      "根节点是 <html>，布局以视口为坐标系",
      "Flex/Grid 布局在此阶段完成复杂计算",
    ],
  },
  {
    id: 5,
    title: "绘制（光栅化）",
    subtitle: "Paint / Rasterization",
    icon: Paintbrush,
    color: "var(--accent)",
    bgColor: "#EDE9FE",
    description:
      "将布局信息转化为屏幕上的实际像素。浏览器创建绘制记录（Paint Records），然后光栅化线程将指令转化为位图。通常分为多层（Layers）进行。",
    details: [
      "绘制记录描述：背景 → 文字 → 阴影等顺序",
      "光栅化将矢量指令转为位图像素",
      "GPU 参与纹理上传和合成",
      "分层（Layer）可优化重绘范围",
    ],
  },
  {
    id: 6,
    title: "合成（Composite）",
    subtitle: "Compositing",
    icon: Layers,
    color: "var(--secondary)",
    bgColor: "#FCE7F3",
    description:
      "合成器（Compositor）将各层按照正确的顺序（z-index、层叠上下文）合并为最终图像，发送到屏幕。合成是最高效的操作，因为它只移动图层而不重新布局或绘制。",
    details: [
      "独立层（will-change / transform）可单独合成",
      "合成由 GPU 高效处理，不影响主线程",
      "translate / opacity 动画可跳过布局和绘制",
      "层爆炸（Layer Explosion）反而会降低性能",
    ],
  },
];

const criticalPathSteps = [
  { label: "收到 HTML", icon: Monitor, time: "0ms" },
  { label: "构建 DOM", icon: FileCode, time: "~100ms" },
  { label: "请求 CSS", icon: Zap, time: "并行" },
  { label: "构建 CSSOM", icon: Palette, time: "~200ms" },
  { label: "合并渲染树", icon: GitBranch, time: "~250ms" },
  { label: "Layout", icon: Grid3X3, time: "~260ms" },
  { label: "Paint", icon: Paintbrush, time: "~280ms" },
  { label: "首屏渲染", icon: Monitor, time: "~300ms" },
];

const optimizationCards = [
  {
    title: "减少回流 (Reflow)",
    icon: RefreshCw,
    color: "var(--accent)",
    bgColor: "#EDE9FE",
    tips: [
      "批量修改样式：使用 cssText 或 class 切换",
      "使用 transform 代替 top/left 动画",
      "避免频繁读取 offsetWidth 等布局属性",
      "使用 documentFragment 批量操作 DOM",
    ],
  },
  {
    title: "减少重绘 (Repaint)",
    icon: Eye,
    color: "var(--secondary)",
    bgColor: "#FCE7F3",
    tips: [
      "将频繁变动元素提升为独立图层 (will-change)",
      "使用 opacity 做透明度动画",
      "避免使用 box-shadow 的大范围模糊",
      "隐藏元素修改后再显示",
    ],
  },
  {
    title: "优化关键渲染路径",
    icon: TrendingUp,
    color: "var(--quaternary)",
    bgColor: "#D1FAE5",
    tips: [
      "CSS 放 <head>，JS 放 </body> 前或使用 defer",
      "内联关键 CSS，异步加载非关键 CSS",
      "减少关键资源数量和文件大小",
      "使用 preload / prefetch 预加载资源",
    ],
  },
  {
    title: "合成层优化",
    icon: Layers,
    color: "var(--tertiary)",
    bgColor: "#FEF3C7",
    tips: [
      "使用 transform 和 opacity 做动画",
      "合理使用 will-change（不要滥用）",
      "减少合成层的数量（避免层爆炸）",
      "利用 content-visibility: auto 跳过离屏渲染",
    ],
  },
];

const repaintVsReflow = [
  {
    label: "Reflow（回流）",
    icon: AlertTriangle,
    color: "var(--tertiary)",
    bgColor: "#FEF3C7",
    severity: "高开销",
    description: "修改了几何属性（尺寸、位置），浏览器需要重新计算布局树。",
    triggers: [
      "增删可见 DOM 元素",
      "修改 width / height / margin / padding",
      "修改窗口大小（resize）",
      "读取 offsetWidth / clientWidth 等属性",
      "修改字体大小 / 内容变化",
      "激活 CSS 伪类（:hover）",
    ],
  },
  {
    label: "Repaint（重绘）",
    icon: Eye,
    color: "var(--accent)",
    bgColor: "#EDE9FE",
    severity: "中开销",
    description: "修改了外观属性但不影响布局，浏览器只需重新绘制受影响的区域。",
    triggers: [
      "修改 color / background-color",
      "修改 visibility",
      "修改 box-shadow / outline",
      "修改 border-radius（仅视觉）",
    ],
  },
];

/* ─────────────────────────────────────────
   主组件
   ───────────────────────────────────────── */

export default function BrowserRenderingPage() {
  return (
    <div className="bg-dot-grid" style={{ minHeight: "100vh", paddingBottom: "6rem" }}>
      {/* ═══════════ Hero 头部 ═══════════ */}
      <header className="container" style={{ position: "relative", marginBottom: "4rem" }}>
        {/* 装饰 Blob */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-2rem",
            right: "-3rem",
            width: "260px",
            height: "260px",
            background: "var(--tertiary)",
            opacity: 0.15,
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(0px)",
            zIndex: 0,
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "6rem",
            right: "10rem",
            width: "120px",
            height: "120px",
            background: "var(--secondary)",
            opacity: 0.12,
            borderRadius: "30% 70% 60% 40% / 40% 60% 30% 70%",
            zIndex: 0,
          }}
        />

        <div className="animate-pop" style={{ position: "relative", zIndex: 1 }}>
          {/* 标签 */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "var(--radius-sm)",
                background: "var(--accent)",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <Monitor size={20} strokeWidth={2.5} color="white" />
            </div>
            <span
              style={{
                fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                fontWeight: 700,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--accent)",
                background: "#EDE9FE",
                padding: "0.3rem 0.75rem",
                borderRadius: "var(--radius-full)",
                border: "2px solid var(--foreground)",
              }}
            >
              核心原理
            </span>
          </div>

          {/* 主标题 */}
          <h1
            style={{
              fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "var(--foreground)",
              marginBottom: "1rem",
            }}
          >
            详解{" "}
            <span style={{ color: "var(--accent)" }}>浏览器渲染</span>
            <br />
            <span style={{ fontSize: "0.6em", color: "var(--secondary)" }}>
              Browser Rendering Pipeline
            </span>
          </h1>

          {/* 副标题描述 */}
          <p
            style={{
              fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
              fontSize: "1.15rem",
              lineHeight: 1.8,
              color: "#64748B",
              maxWidth: "640px",
              marginBottom: "1.5rem",
            }}
          >
            从 HTML 字节到屏幕像素 —— 深入理解浏览器将代码转化为可视化页面的六个关键步骤，
            以及如何利用这些知识打造高性能 Web 应用。
          </p>

          {/* 关键数据徽章 */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {[
              { label: "6 个核心阶段", bg: "var(--accent)", fg: "white" },
              { label: "关键渲染路径", bg: "var(--secondary)", fg: "white" },
              { label: "性能优化策略", bg: "var(--quaternary)", fg: "var(--foreground)" },
            ].map((badge) => (
              <span
                key={badge.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.4rem 1rem",
                  background: badge.bg,
                  color: badge.fg,
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  borderRadius: "var(--radius-full)",
                  border: "2px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                  fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                }}
              >
                <CircleDot size={14} strokeWidth={2.5} />
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ═══════════ 概述卡片 ═══════════ */}
      <section className="container" style={{ marginBottom: "4rem" }}>
        <div
          className="topic-card animate-pop"
          style={{
            padding: "2.5rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "-40px",
              right: "-40px",
              width: "160px",
              height: "160px",
              background: "var(--tertiary)",
              opacity: 0.1,
              borderRadius: "50%",
            }}
          />
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", position: "relative", zIndex: 1 }}>
            <div
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                borderRadius: "var(--radius-md)",
                background: "var(--tertiary)",
                border: "3px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <Cpu size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  color: "var(--foreground)",
                  marginBottom: "0.75rem",
                }}
              >
                什么是浏览器渲染？
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "#475569",
                  maxWidth: "720px",
                }}
              >
                浏览器渲染是将 <strong>HTML、CSS 和 JavaScript</strong> 转化为屏幕上可视化像素的过程。
                这个过程涉及多个关键步骤：<strong>解析 → 构建树 → 布局 → 绘制 → 合成</strong>。
                理解渲染流水线是优化 Web 性能的基础 —— 每一帧的渲染目标是在 <strong>16.6ms</strong>（60fps）
                内完成，任何超出这个时间的操作都可能导致用户感知到卡顿。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 渲染流水线六步骤 ═══════════ */}
      <section className="container" style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "var(--radius-sm)",
              background: "var(--secondary)",
              border: "2px solid var(--foreground)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <Workflow size={20} strokeWidth={2.5} color="white" />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 800,
              color: "var(--foreground)",
            }}
          >
            渲染流水线{" "}
            <span style={{ color: "var(--secondary)" }}>6 步走</span>
          </h2>
        </div>

        {/* 步骤列表 */}
        <div style={{ position: "relative" }}>
          {/* 垂直连接线 */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "28px",
              top: "0",
              bottom: "0",
              width: "3px",
              backgroundImage: `repeating-linear-gradient(
                to bottom,
                var(--border) 0px,
                var(--border) 8px,
                transparent 8px,
                transparent 16px
              )`,
              zIndex: 0,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className="animate-slide"
                  style={{ animationDelay: `${index * 0.1}s`, position: "relative", zIndex: 1 }}
                >
                  <div
                    className="topic-card"
                    style={{
                      padding: "2rem",
                      marginLeft: "0",
                      position: "relative",
                    }}
                  >
                    {/* 左侧编号圆圈 */}
                    <div
                      style={{
                        position: "absolute",
                        left: "-12px",
                        top: "2rem",
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        background: step.bgColor,
                        border: "3px solid var(--foreground)",
                        boxShadow: "4px 4px 0px 0px var(--foreground)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                        fontWeight: 800,
                        fontSize: "1.3rem",
                        color: "var(--foreground)",
                      }}
                    >
                      {step.id}
                    </div>

                    <div style={{ marginLeft: "60px" }}>
                      {/* 标题行 */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "32px",
                            height: "32px",
                            borderRadius: "var(--radius-sm)",
                            background: step.bgColor,
                            border: "2px solid var(--foreground)",
                          }}
                        >
                          <Icon size={16} strokeWidth={2.5} style={{ color: step.color }} />
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                            fontSize: "1.35rem",
                            fontWeight: 800,
                            color: "var(--foreground)",
                            margin: 0,
                          }}
                        >
                          {step.title}
                        </h3>
                        <span
                          style={{
                            fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            color: step.color,
                            background: step.bgColor,
                            padding: "0.2rem 0.6rem",
                            borderRadius: "var(--radius-full)",
                            border: "2px solid var(--foreground)",
                          }}
                        >
                          {step.subtitle}
                        </span>
                      </div>

                      {/* 描述 */}
                      <p
                        style={{
                          fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                          fontSize: "0.95rem",
                          lineHeight: 1.8,
                          color: "#475569",
                          marginBottom: "1rem",
                        }}
                      >
                        {step.description}
                      </p>

                      {/* 细节列表 */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                          gap: "0.5rem",
                        }}
                      >
                        {step.details.map((detail, di) => (
                          <div
                            key={di}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "0.5rem",
                              padding: "0.5rem 0.75rem",
                              background: "#F8FAFC",
                              borderRadius: "var(--radius-sm)",
                              border: "1px solid var(--border)",
                            }}
                          >
                            <ChevronRight
                              size={14}
                              strokeWidth={2.5}
                              style={{ color: step.color, marginTop: "3px", flexShrink: 0 }}
                            />
                            <span
                              style={{
                                fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                                fontSize: "0.85rem",
                                lineHeight: 1.6,
                                color: "#334155",
                              }}
                            >
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ 可视化流程图 ═══════════ */}
      <section className="container" style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "var(--radius-sm)",
              background: "var(--tertiary)",
              border: "2px solid var(--foreground)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <Sparkles size={20} strokeWidth={2.5} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 800,
              color: "var(--foreground)",
            }}
          >
            关键渲染路径{" "}
            <span style={{ color: "var(--tertiary)" }}>可视化</span>
          </h2>
        </div>

        <div
          className="topic-card"
          style={{
            padding: "2.5rem 2rem",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* 装饰 */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: "-60px",
              left: "-60px",
              width: "200px",
              height: "200px",
              background: "var(--accent)",
              opacity: 0.06,
              borderRadius: "50%",
            }}
          />

          {/* 流程步骤 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              overflowX: "auto",
              padding: "1rem 0",
              position: "relative",
              zIndex: 1,
            }}
          >
            {criticalPathSteps.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === criticalPathSteps.length - 1;
              return (
                <React.Fragment key={step.label}>
                  <div
                    className="animate-pop"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.5rem",
                      minWidth: "100px",
                      animationDelay: `${idx * 0.08}s`,
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "var(--radius-sm)",
                        background: isLast ? "var(--quaternary)" : "var(--card)",
                        border: "2px solid var(--foreground)",
                        boxShadow: isLast
                          ? "4px 4px 0px 0px var(--quaternary)"
                          : "4px 4px 0px 0px var(--foreground)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={20} strokeWidth={2.5} />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "var(--foreground)",
                        textAlign: "center",
                      }}
                    >
                      {step.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        color: "var(--quaternary)",
                        background: "#D1FAE5",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "var(--radius-full)",
                        border: "1px solid var(--foreground)",
                      }}
                    >
                      {step.time}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      style={{
                        flexShrink: 0,
                        width: "32px",
                        height: "2px",
                        background: "var(--foreground)",
                        margin: "0 0.25rem",
                        marginTop: "-24px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          right: "-2px",
                          top: "-4px",
                          width: 0,
                          height: 0,
                          borderLeft: "6px solid var(--foreground)",
                          borderTop: "5px solid transparent",
                          borderBottom: "5px solid transparent",
                        }}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* 底部说明 */}
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem 1.5rem",
              background: "#FFFBEB",
              borderRadius: "var(--radius-sm)",
              border: "2px solid var(--tertiary)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <Zap size={20} strokeWidth={2.5} style={{ color: "var(--tertiary)", flexShrink: 0 }} />
            <p
              style={{
                fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "#92400E",
                margin: 0,
              }}
            >
              <strong>关键渲染路径 (Critical Rendering Path)</strong> 指从收到 HTML 到首次渲染像素之间必须完成的所有步骤。
              优化 CRP 的目标是<strong>最小化关键资源数量</strong>、<strong>最小化关键路径长度</strong>和<strong>最小化关键字节数</strong>。
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ 回流 vs 重绘 对比 ═══════════ */}
      <section className="container" style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "var(--radius-sm)",
              background: "var(--quaternary)",
              border: "2px solid var(--foreground)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <AlertTriangle size={20} strokeWidth={2.5} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 800,
              color: "var(--foreground)",
            }}
          >
            回流{" "}
            <span style={{ color: "var(--tertiary)" }}>vs</span>{" "}
            重绘
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {repaintVsReflow.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="topic-card animate-slide"
                style={{ padding: "2rem", animationDelay: `${idx * 0.15}s` }}
              >
                {/* 头部 */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "44px",
                      height: "44px",
                      borderRadius: "var(--radius-sm)",
                      background: item.bgColor,
                      border: "2px solid var(--foreground)",
                      boxShadow: `4px 4px 0px 0px ${item.color}`,
                    }}
                  >
                    <Icon size={22} strokeWidth={2.5} style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                        fontSize: "1.2rem",
                        fontWeight: 800,
                        color: "var(--foreground)",
                        margin: 0,
                      }}
                    >
                      {item.label}
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: item.color === "var(--tertiary)" ? "#92400E" : "#6D28D9",
                        background: item.bgColor,
                        padding: "0.15rem 0.5rem",
                        borderRadius: "var(--radius-full)",
                      }}
                    >
                      {item.severity}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    color: "#475569",
                    marginBottom: "1rem",
                  }}
                >
                  {item.description}
                </p>

                {/* 触发条件 */}
                <div
                  style={{
                    background: "#F8FAFC",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    padding: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "#94A3B8",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    常见触发条件
                  </span>
                  {item.triggers.map((trigger, ti) => (
                    <div
                      key={ti}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.35rem 0",
                      }}
                    >
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: item.color,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                          fontSize: "0.85rem",
                          color: "#334155",
                        }}
                      >
                        {trigger}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════ 性能优化策略 Bento Grid ═══════════ */}
      <section className="container" style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "var(--radius-sm)",
              background: "var(--accent)",
              border: "2px solid var(--foreground)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <TrendingUp size={20} strokeWidth={2.5} color="white" />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 800,
              color: "var(--foreground)",
            }}
          >
            性能优化{" "}
            <span style={{ color: "var(--accent)" }}>实战策略</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
          }}
        >
          {optimizationCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="topic-card animate-slide"
                style={{
                  padding: "2rem",
                  animationDelay: `${idx * 0.1}s`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* 装饰角 */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "80px",
                    height: "80px",
                    background: card.color,
                    opacity: 0.08,
                    borderRadius: "50%",
                  }}
                />

                {/* 图标 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-sm)",
                    background: card.bgColor,
                    border: "2px solid var(--foreground)",
                    boxShadow: `4px 4px 0px 0px ${card.color}`,
                    marginBottom: "1.25rem",
                  }}
                >
                  <Icon size={24} strokeWidth={2.5} style={{ color: card.color }} />
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                    fontSize: "1.15rem",
                    fontWeight: 800,
                    color: "var(--foreground)",
                    marginBottom: "1rem",
                  }}
                >
                  {card.title}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {card.tips.map((tip, ti) => (
                    <div
                      key={ti}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                        padding: "0.5rem 0.75rem",
                        background: ti % 2 === 0 ? "#F8FAFC" : "transparent",
                        borderRadius: "var(--radius-sm)",
                        border: ti % 2 === 0 ? "1px solid var(--border)" : "1px solid transparent",
                      }}
                    >
                      <CheckCircle2
                        size={16}
                        strokeWidth={2.5}
                        style={{ color: card.color, marginTop: "2px", flexShrink: 0 }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                          fontSize: "0.85rem",
                          lineHeight: 1.6,
                          color: "#334155",
                        }}
                      >
                        {tip}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════ 渲染层级深入 ═══════════ */}
      <section className="container" style={{ marginBottom: "4rem" }}>
        <div className="topic-card animate-pop" style={{ padding: "2.5rem", position: "relative", overflow: "hidden" }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "-30px",
              width: "140px",
              height: "140px",
              background: "var(--secondary)",
              opacity: 0.08,
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                borderRadius: "var(--radius-sm)",
                background: "var(--secondary)",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <Box size={22} strokeWidth={2.5} color="white" />
            </div>
            <h2
              style={{
                fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 800,
                color: "var(--foreground)",
                margin: 0,
              }}
            >
              渲染引擎{" "}
              <span style={{ color: "var(--secondary)" }}>架构对比</span>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {[
              {
                engine: "Blink",
                browser: "Chrome / Edge / Opera",
                color: "var(--accent)",
                bg: "#EDE9FE",
                features: ["多进程架构，每个 Tab 独立进程", "V8 引擎执行 JS", "Skia / DirectWrite 绘制", "Compositor 线程处理合成"],
              },
              {
                engine: "Gecko",
                browser: "Firefox",
                color: "var(--tertiary)",
                bg: "#FEF3C7",
                features: ["Quantum 项目并行化渲染", "Stylo 引擎用 Rust 重写样式系统", "WebRender 基于 GPU 的合成", "Servo 引擎集成研究"],
              },
              {
                engine: "WebKit",
                browser: "Safari",
                color: "var(--quaternary)",
                bg: "#D1FAE5",
                features: ["Nitro (JavaScriptCore) 引擎", "单进程模型为主", "Metal 图形后端 (macOS)", "对 iOS 电量优化深度适配"],
              },
            ].map((eng) => (
              <div
                key={eng.engine}
                style={{
                  padding: "1.5rem",
                  background: eng.bg,
                  borderRadius: "var(--radius-md)",
                  border: "2px solid var(--foreground)",
                  boxShadow: `4px 4px 0px 0px ${eng.color}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                      fontSize: "1.3rem",
                      fontWeight: 800,
                      color: "var(--foreground)",
                    }}
                  >
                    {eng.engine}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#64748B",
                    display: "block",
                    marginBottom: "1rem",
                  }}
                >
                  {eng.browser}
                </span>
                {eng.features.map((f, fi) => (
                  <div
                    key={fi}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                      padding: "0.35rem 0",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: eng.color,
                        marginTop: "6px",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                        fontSize: "0.85rem",
                        lineHeight: 1.6,
                        color: "#334155",
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 总结 ═══════════ */}
      <section className="container">
        <div
          className="animate-pop"
          style={{
            padding: "3rem",
            background: "var(--foreground)",
            borderRadius: "var(--radius-lg)",
            border: "3px solid var(--foreground)",
            boxShadow: "12px 12px 0px 0px var(--accent)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* 装饰 */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "-40px",
              right: "-40px",
              width: "200px",
              height: "200px",
              background: "var(--accent)",
              opacity: 0.15,
              borderRadius: "50%",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "30%",
              width: "120px",
              height: "120px",
              background: "var(--secondary)",
              opacity: 0.1,
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48px",
                  height: "48px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--accent)",
                  border: "2px solid rgba(255,255,255,0.2)",
                }}
              >
                <Sparkles size={24} strokeWidth={2.5} color="white" />
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 800,
                  color: "white",
                  margin: 0,
                }}
              >
                核心要点速记
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {[
                {
                  num: "01",
                  text: "渲染流水线：HTML → DOM → CSSOM → Render Tree → Layout → Paint → Composite，六步缺一不可。",
                },
                {
                  num: "02",
                  text: "CSS 是渲染阻塞资源，JS 既阻塞解析又阻塞渲染。合理使用 async / defer / preload 解耦。",
                },
                {
                  num: "03",
                  text: "Reflow 代价最高 —— 修改几何属性触发布局重算。尽量用 transform/opacity 实现动画。",
                },
                {
                  num: "04",
                  text: "合成层 (Composite) 由 GPU 处理，是最高效的更新路径。善用 will-change 但切勿滥用。",
                },
              ].map((item) => (
                <div key={item.num} style={{ display: "flex", gap: "0.75rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: "var(--accent)",
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    {item.num}
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.8)",
                      margin: 0,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}