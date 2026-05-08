// app/knowledge/css-flex/page.tsx
"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ArrowDown,
  ArrowLeftRight,
  ArrowUpDown,
  AlignHorizontalJustifyCenter,
  AlignVerticalJustifyCenter,
  AlignHorizontalDistributeCenter,
  AlignVerticalDistributeCenter,
  AlignStartHorizontal,
  AlignStartVertical,
  AlignEndHorizontal,
  AlignEndVertical,
  StretchHorizontal,
  Maximize2,
  Minimize2,
  MoveHorizontal,
  MoveVertical,
  BookOpen,
  Code2,
  Eye,
  Sparkles,
  Zap,
  Grip,
  Columns3,
  Rows3,
  LayoutGrid,
  Box,
  Repeat,
  ChevronRight,
  ChevronsRight,
  ChevronsLeft,
  FlipHorizontal2,
  FlipVertical2,
  Space,
  AlignCenter,
  GripHorizontal,
  BetweenHorizontalStart,
  BetweenHorizontalEnd,
  Layers,
  Shuffle,
} from "lucide-react";

export default function CSSFlexPage() {
  const [activeJustify, setActiveJustify] = useState(0);
  const [activeAlign, setActiveAlign] = useState(0);
  const [activeDirection, setActiveDirection] = useState(0);
  const [flexGrowValue, setFlexGrowValue] = useState(0);
  const [activeWrap, setActiveWrap] = useState(0);

  const justifyOptions = [
    { value: "flex-start", label: "flex-start", desc: "起点对齐（默认）" },
    { value: "center", label: "center", desc: "居中对齐" },
    { value: "flex-end", label: "flex-end", desc: "终点对齐" },
    { value: "space-between", label: "space-between", desc: "两端贴边，等距分布" },
    { value: "space-around", label: "space-around", desc: "两侧半间距" },
    { value: "space-evenly", label: "space-evenly", desc: "完全等距分布" },
  ];

  const alignOptions = [
    { value: "stretch", label: "stretch", desc: "拉伸填满（默认）" },
    { value: "flex-start", label: "flex-start", desc: "交叉轴起点" },
    { value: "center", label: "center", desc: "交叉轴居中" },
    { value: "flex-end", label: "flex-end", desc: "交叉轴终点" },
    { value: "baseline", label: "baseline", desc: "文字基线对齐" },
  ];

  const directionOptions = [
    { value: "row", label: "row", desc: "水平从左到右（默认）", icon: <ArrowRight size={16} strokeWidth={2.5} /> },
    { value: "row-reverse", label: "row-reverse", desc: "水平从右到左", icon: <ArrowLeftRight size={16} strokeWidth={2.5} /> },
    { value: "column", label: "column", desc: "垂直从上到下", icon: <ArrowDown size={16} strokeWidth={2.5} /> },
    { value: "column-reverse", label: "column-reverse", desc: "垂直从下到上", icon: <ArrowUpDown size={16} strokeWidth={2.5} /> },
  ];

  const wrapOptions = [
    { value: "nowrap", label: "nowrap", desc: "不换行（默认），可能溢出" },
    { value: "wrap", label: "wrap", desc: "自动换行，新行在下方" },
    { value: "wrap-reverse", label: "wrap-reverse", desc: "反转换行，新行在上方" },
  ];

  return (
    <div className="bg-dot-grid min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="container pt-20 pb-16 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div
          className="absolute -top-24 -left-16 w-96 h-96 opacity-15"
          style={{
            background: "var(--secondary)",
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          }}
        />
        <div
          className="absolute top-32 -right-24 w-72 h-72 opacity-10"
          style={{
            background: "var(--tertiary)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-40 h-40 opacity-10"
          style={{
            background: "var(--quaternary)",
            borderRadius: "40% 60% 60% 40% / 70% 30% 70% 30%",
          }}
        />

        {/* Badges */}
        <div className="animate-pop flex flex-wrap items-center gap-2 mb-8">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider"
            style={{
              background: "var(--secondary)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-full)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
              color: "#fff",
            }}
          >
            <Grip size={16} strokeWidth={2.5} />
            CSS 布局核心
          </span>
          <span
            className="inline-flex items-center px-3 py-2 text-xs font-bold uppercase tracking-wider"
            style={{
              background: "var(--card)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-full)",
              boxShadow: "4px 4px 0px 0px var(--secondary)",
            }}
          >
            一维弹性布局
          </span>
          <span
            className="inline-flex items-center px-3 py-2 text-xs font-bold uppercase tracking-wider"
            style={{
              background: "var(--tertiary)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-full)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            最常用的布局方式
          </span>
        </div>

        {/* Title */}
        <h1
          className="animate-pop text-5xl md:text-7xl lg:text-8xl font-extrabold leading-none mb-6"
          style={{
            fontFamily: '"Outfit", sans-serif',
            color: "var(--foreground)",
          }}
        >
          CSS{" "}
          <span style={{ color: "var(--secondary)" }}>Flex</span>
          <span style={{ color: "var(--foreground)" }}>box</span>
          <br />
          <span className="text-4xl md:text-5xl lg:text-6xl" style={{ color: "var(--foreground)" }}>
            弹性布局全解
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-slide text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            color: "var(--foreground)",
            opacity: 0.7,
            animationDelay: "0.15s",
          }}
        >
          Flexbox 是 CSS 中最灵活的<strong>一维布局模型</strong>。它让容器能智能地
          分配空间、对齐元素，无论内容尺寸是否已知都能完美适配。
        </p>

        {/* Hero Visual: Flex Concepts */}
        <div
          className="animate-slide relative max-w-4xl"
          style={{ animationDelay: "0.25s" }}
        >
          {/* Main Axis Arrow */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="px-3 py-1.5 text-xs font-bold rounded-full"
              style={{
                background: "var(--secondary)",
                color: "#fff",
                border: "2px solid var(--foreground)",
                boxShadow: "3px 3px 0px 0px var(--foreground)",
              }}
            >
              主轴 Main Axis →
            </div>
            <div className="flex-1 border-b-2 border-dashed" style={{ borderColor: "var(--secondary)" }} />
          </div>

          {/* Flex Container */}
          <div
            className="p-6 md:p-8 rounded-2xl"
            style={{
              background: "var(--card)",
              border: "3px solid var(--foreground)",
              boxShadow: "12px 12px 0px 0px var(--secondary)",
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Eye size={18} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--secondary)" }}
              >
                Flexbox 直觉演示
              </span>
            </div>

            <div
              className="flex items-end gap-4 p-5 rounded-xl"
              style={{
                background: "rgba(244, 114, 182, 0.06)",
                border: "2px dashed var(--secondary)",
                minHeight: 180,
              }}
            >
              {[
                { h: 80, w: "flex-[1.5]", bg: "var(--accent)", label: "flex: 1.5" },
                { h: 120, w: "flex-[2]", bg: "var(--secondary)", label: "flex: 2" },
                { h: 60, w: "flex-[1]", bg: "var(--tertiary)", label: "flex: 1" },
                { h: 100, w: "flex-[1.2]", bg: "var(--quaternary)", label: "flex: 1.2" },
                { h: 70, w: "flex-[0.8]", bg: "var(--accent)", label: "flex: 0.8" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="animate-pop flex flex-col items-center justify-end transition-transform hover:scale-105"
                  style={{
                    flex: item.w === "flex-[1.5]" ? 1.5 : item.w === "flex-[2]" ? 2 : item.w === "flex-[1]" ? 1 : item.w === "flex-[1.2]" ? 1.2 : 0.8,
                    height: item.h,
                    background: item.bg,
                    border: "2px solid var(--foreground)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                    animationDelay: `${0.3 + i * 0.08}s`,
                  }}
                >
                  <span className="text-xs font-bold mt-2 px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.3)", color: item.bg === "var(--tertiary)" || item.bg === "var(--quaternary)" ? "var(--foreground)" : "#fff", fontSize: 10 }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Cross Axis Arrow */}
            <div className="flex items-start gap-3 mt-4" style={{ height: 30 }}>
              <div
                className="px-3 py-1.5 text-xs font-bold rounded-full whitespace-nowrap"
                style={{
                  background: "var(--tertiary)",
                  border: "2px solid var(--foreground)",
                  boxShadow: "3px 3px 0px 0px var(--foreground)",
                }}
              >
                ↕ 交叉轴 Cross Axis
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CORE CONCEPT: Container vs Items ===== */}
      <section className="container py-8">
        <div className="animate-slide flex items-center gap-4" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--accent)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-md)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <Sparkles size={22} strokeWidth={2.5} color="#fff" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              核心概念
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              两个角色，一条轴
            </p>
          </div>
        </div>
      </section>

      <section className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Flex Container */}
          <div
            className="animate-slide topic-card p-6 md:p-8 relative overflow-hidden"
            style={{ animationDelay: "0.15s", boxShadow: "8px 8px 0px 0px var(--secondary)" }}
          >
            <div
              className="absolute -top-10 -right-10 w-32 h-32 opacity-8"
              style={{ background: "var(--secondary)", borderRadius: "var(--radius-full)", opacity: 0.08 }}
            />
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 flex items-center justify-center flex-shrink-0 rounded-xl"
                style={{ background: "var(--secondary)", border: "2px solid var(--foreground)", boxShadow: "3px 3px 0px 0px var(--foreground)" }}
              >
                <Box size={20} strokeWidth={2.5} color="#fff" />
              </div>
              <h3 className="text-xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                Flex Container
              </h3>
            </div>
            <p className="mb-5 leading-relaxed" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', opacity: 0.8 }}>
              设置了 <code className="px-2 py-0.5 text-sm font-bold rounded" style={{ background: "var(--secondary)", color: "#fff" }}>display: flex</code> 或{" "}
              <code className="px-2 py-0.5 text-sm font-bold rounded" style={{ background: "var(--secondary)", color: "#fff" }}>inline-flex</code> 的元素。
              它定义了<strong>主轴方向</strong>和<strong>换行规则</strong>。
            </p>
            <div className="space-y-3">
              {[
                { prop: "flex-direction", desc: "主轴方向（row/column）", icon: <ArrowRight size={16} strokeWidth={2.5} /> },
                { prop: "flex-wrap", desc: "是否允许换行", icon: <FlipHorizontal2 size={16} strokeWidth={2.5} /> },
                { prop: "justify-content", desc: "主轴方向的对齐与分布", icon: <AlignHorizontalJustifyCenter size={16} strokeWidth={2.5} /> },
                { prop: "align-items", desc: "交叉轴方向的对齐", icon: <AlignVerticalJustifyCenter size={16} strokeWidth={2.5} /> },
                { prop: "gap", desc: "子项之间的间距", icon: <Shuffle size={16} strokeWidth={2.5} /> },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl transition-transform hover:translate-x-1"
                  style={{ background: "rgba(244, 114, 182, 0.06)", border: "2px solid var(--border)" }}
                >
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-lg mt-0.5" style={{ background: "var(--card)", border: "2px solid var(--border)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <code className="text-sm font-bold" style={{ color: "var(--secondary)" }}>{item.prop}</code>
                    <p className="text-xs mt-0.5 opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flex Items */}
          <div
            className="animate-slide topic-card p-6 md:p-8 relative overflow-hidden"
            style={{ animationDelay: "0.25s", boxShadow: "8px 8px 0px 0px var(--tertiary)" }}
          >
            <div
              className="absolute -bottom-10 -left-10 w-36 h-36 opacity-8"
              style={{ background: "var(--tertiary)", borderRadius: "var(--radius-full)", opacity: 0.08 }}
            />
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 flex items-center justify-center flex-shrink-0 rounded-xl"
                style={{ background: "var(--tertiary)", border: "2px solid var(--foreground)", boxShadow: "3px 3px 0px 0px var(--foreground)" }}
              >
                <Grip size={20} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                Flex Items
              </h3>
            </div>
            <p className="mb-5 leading-relaxed" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', opacity: 0.8 }}>
              Flex 容器的<strong>直接子元素</strong>。每个 item 都可以通过弹性属性
              控制自身的伸缩行为和排列顺序。
            </p>
            <div className="space-y-3">
              {[
                { prop: "flex-grow", desc: "放大比例（剩余空间分配）", icon: <Maximize2 size={16} strokeWidth={2.5} /> },
                { prop: "flex-shrink", desc: "缩小比例（空间不足时）", icon: <Minimize2 size={16} strokeWidth={2.5} /> },
                { prop: "flex-basis", desc: "分配前的初始尺寸", icon: <MoveHorizontal size={16} strokeWidth={2.5} /> },
                { prop: "order", desc: "排列顺序（默认 0）", icon: <Layers size={16} strokeWidth={2.5} /> },
                { prop: "align-self", desc: "单独覆盖交叉轴对齐", icon: <AlignVerticalJustifyCenter size={16} strokeWidth={2.5} /> },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl transition-transform hover:translate-x-1"
                  style={{ background: "rgba(251, 191, 36, 0.06)", border: "2px solid var(--border)" }}
                >
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-lg mt-0.5" style={{ background: "var(--card)", border: "2px solid var(--border)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <code className="text-sm font-bold" style={{ color: "var(--tertiary)" }}>{item.prop}</code>
                    <p className="text-xs mt-0.5 opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE: flex-direction ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--secondary)", border: "2px solid var(--foreground)", borderRadius: "var(--radius-md)", boxShadow: "4px 4px 0px 0px var(--foreground)" }}
          >
            <ArrowRight size={22} strokeWidth={2.5} color="#fff" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              flex-direction · 主轴方向
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              点击切换，观察子元素排列变化
            </p>
          </div>
        </div>

        <div
          className="animate-slide topic-card p-6 md:p-8"
          style={{ animationDelay: "0.2s", boxShadow: "10px 10px 0px 0px var(--secondary)" }}
        >
          {/* Direction Controls */}
          <div className="flex flex-wrap gap-3 mb-8">
            {directionOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => setActiveDirection(i)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl transition-all"
                style={{
                  background: activeDirection === i ? "var(--secondary)" : "var(--card)",
                  color: activeDirection === i ? "#fff" : "var(--foreground)",
                  border: "2px solid var(--foreground)",
                  boxShadow: activeDirection === i ? "4px 4px 0px 0px var(--foreground)" : "2px 2px 0px 0px var(--border)",
                  transform: activeDirection === i ? "translate(-2px, -2px)" : "none",
                }}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm mb-5 opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            {directionOptions[activeDirection].desc}
          </p>

          {/* Visual */}
          <div
            className="rounded-xl p-5 transition-all duration-300"
            style={{
              background: "rgba(244, 114, 182, 0.06)",
              border: "2px dashed var(--secondary)",
              minHeight: activeDirection >= 2 ? 280 : 120,
            }}
          >
            <div
              className="flex gap-3 transition-all duration-300"
              style={{
                flexDirection: directionOptions[activeDirection].value as React.CSSProperties["flexDirection"],
                flexWrap: activeDirection >= 2 ? "nowrap" : "nowrap",
                alignItems: "flex-start",
              }}
            >
              {["A", "B", "C", "D"].map((label, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center text-sm font-bold rounded-xl transition-all duration-300"
                  style={{
                    width: activeDirection >= 2 ? "100%" : 80,
                    height: activeDirection >= 2 ? 60 : 80,
                    background: i % 2 === 0 ? "var(--accent)" : "var(--secondary)",
                    color: "#fff",
                    border: "2px solid var(--foreground)",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Code */}
          <div className="mt-4">
            <pre
              className="text-sm p-4 rounded-xl overflow-x-auto"
              style={{ background: "#1a1a2e", color: "#e2e8f0", fontFamily: '"Fira Code", monospace' }}
            >
              <code>{`.container {
  display: flex;
  flex-direction: ${directionOptions[activeDirection].value};
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE: justify-content ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--accent)", border: "2px solid var(--foreground)", borderRadius: "var(--radius-md)", boxShadow: "4px 4px 0px 0px var(--foreground)" }}
          >
            <AlignHorizontalJustifyCenter size={22} strokeWidth={2.5} color="#fff" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              justify-content · 主轴对齐
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              最常用的分布属性，6 种取值各有妙用
            </p>
          </div>
        </div>

        <div
          className="animate-slide topic-card p-6 md:p-8"
          style={{ animationDelay: "0.2s", boxShadow: "10px 10px 0px 0px var(--accent)" }}
        >
          {/* Justify Controls */}
          <div className="flex flex-wrap gap-2 mb-6">
            {justifyOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => setActiveJustify(i)}
                className="px-3 py-2 text-xs font-bold rounded-xl transition-all"
                style={{
                  background: activeJustify === i ? "var(--accent)" : "var(--card)",
                  color: activeJustify === i ? "#fff" : "var(--foreground)",
                  border: "2px solid var(--foreground)",
                  boxShadow: activeJustify === i ? "3px 3px 0px 0px var(--foreground)" : "2px 2px 0px 0px var(--border)",
                  transform: activeJustify === i ? "translate(-1px, -1px)" : "none",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <p className="text-sm mb-5 opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            {justifyOptions[activeJustify].desc}
          </p>

          {/* Visual */}
          <div
            className="rounded-xl p-5 transition-all duration-300"
            style={{
              background: "rgba(139, 92, 246, 0.06)",
              border: "2px dashed var(--accent)",
              minHeight: 100,
            }}
          >
            <div
              className="flex gap-3 transition-all duration-300"
              style={{
                justifyContent: justifyOptions[activeJustify].value as React.CSSProperties["justifyContent"],
              }}
            >
              {["", "", ""].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center text-xs font-bold rounded-xl transition-all"
                  style={{
                    width: 80,
                    height: 70,
                    background: i === 0 ? "var(--accent)" : i === 1 ? "var(--tertiary)" : "var(--quaternary)",
                    color: i === 0 ? "#fff" : "var(--foreground)",
                    border: "2px solid var(--foreground)",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Code */}
          <div className="mt-4">
            <pre
              className="text-sm p-4 rounded-xl overflow-x-auto"
              style={{ background: "#1a1a2e", color: "#e2e8f0", fontFamily: '"Fira Code", monospace' }}
            >
              <code>{`.container {
  display: flex;
  justify-content: ${justifyOptions[activeJustify].value};
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE: align-items ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--tertiary)", border: "2px solid var(--foreground)", borderRadius: "var(--radius-md)", boxShadow: "4px 4px 0px 0px var(--foreground)" }}
          >
            <AlignVerticalJustifyCenter size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              align-items · 交叉轴对齐
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              控制子元素在垂直（或交叉）方向的对齐
            </p>
          </div>
        </div>

        <div
          className="animate-slide topic-card p-6 md:p-8"
          style={{ animationDelay: "0.2s", boxShadow: "10px 10px 0px 0px var(--tertiary)" }}
        >
          {/* Align Controls */}
          <div className="flex flex-wrap gap-2 mb-6">
            {alignOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => setActiveAlign(i)}
                className="px-3 py-2 text-xs font-bold rounded-xl transition-all"
                style={{
                  background: activeAlign === i ? "var(--tertiary)" : "var(--card)",
                  color: "var(--foreground)",
                  border: "2px solid var(--foreground)",
                  boxShadow: activeAlign === i ? "3px 3px 0px 0px var(--foreground)" : "2px 2px 0px 0px var(--border)",
                  transform: activeAlign === i ? "translate(-1px, -1px)" : "none",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <p className="text-sm mb-5 opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            {alignOptions[activeAlign].desc}
          </p>

          {/* Visual */}
          <div
            className="rounded-xl p-5 transition-all duration-300"
            style={{
              background: "rgba(251, 191, 36, 0.08)",
              border: "2px dashed var(--tertiary)",
              minHeight: 200,
            }}
          >
            <div
              className="flex gap-3 transition-all duration-300"
              style={{
                alignItems: alignOptions[activeAlign].value as React.CSSProperties["alignItems"],
                minHeight: 170,
              }}
            >
              {[
                { h: 50, label: "Sm" },
                { h: 90, label: "Md" },
                { h: 65, label: "Sm" },
                { h: 120, label: "Lg" },
                { h: 40, label: "Xs" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center text-xs font-bold rounded-xl transition-all"
                  style={{
                    width: 70,
                    height: item.h,
                    background: i % 2 === 0 ? "var(--accent)" : "var(--secondary)",
                    color: "#fff",
                    border: "2px solid var(--foreground)",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                    flexShrink: 0,
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Code */}
          <div className="mt-4">
            <pre
              className="text-sm p-4 rounded-xl overflow-x-auto"
              style={{ background: "#1a1a2e", color: "#e2e8f0", fontFamily: '"Fira Code", monospace' }}
            >
              <code>{`.container {
  display: flex;
  align-items: ${alignOptions[activeAlign].value};
  min-height: 200px; /* 需要足够高度才能看到效果 */
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE: flex-wrap ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--quaternary)", border: "2px solid var(--foreground)", borderRadius: "var(--radius-md)", boxShadow: "4px 4px 0px 0px var(--foreground)" }}
          >
            <FlipHorizontal2 size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              flex-wrap · 换行控制
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              默认不换行 — 这也是 Flex 经常"失控"的原因
            </p>
          </div>
        </div>

        <div
          className="animate-slide topic-card p-6 md:p-8"
          style={{ animationDelay: "0.2s", boxShadow: "10px 10px 0px 0px var(--quaternary)" }}
        >
          {/* Wrap Controls */}
          <div className="flex flex-wrap gap-3 mb-6">
            {wrapOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => setActiveWrap(i)}
                className="px-4 py-2.5 text-sm font-bold rounded-xl transition-all"
                style={{
                  background: activeWrap === i ? "var(--quaternary)" : "var(--card)",
                  color: activeWrap === i ? "#fff" : "var(--foreground)",
                  border: "2px solid var(--foreground)",
                  boxShadow: activeWrap === i ? "4px 4px 0px 0px var(--foreground)" : "2px 2px 0px 0px var(--border)",
                  transform: activeWrap === i ? "translate(-2px, -2px)" : "none",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <p className="text-sm mb-5 opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            {wrapOptions[activeWrap].desc}
          </p>

          {/* Visual */}
          <div
            className="rounded-xl p-4 transition-all duration-300 overflow-hidden"
            style={{
              background: "rgba(52, 211, 153, 0.06)",
              border: "2px dashed var(--quaternary)",
            }}
          >
            <div
              className="flex gap-3 transition-all duration-300"
              style={{
                flexWrap: wrapOptions[activeWrap].value as React.CSSProperties["flexWrap"],
              }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center text-xs font-bold rounded-xl transition-all"
                  style={{
                    width: 100,
                    height: 60,
                    flexShrink: activeWrap === 0 ? 1 : 0,
                    background:
                      i % 4 === 0 ? "var(--accent)" :
                      i % 4 === 1 ? "var(--secondary)" :
                      i % 4 === 2 ? "var(--tertiary)" :
                      "var(--quaternary)",
                    color: i % 4 <= 1 ? "#fff" : "var(--foreground)",
                    border: "2px solid var(--foreground)",
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div
            className="mt-5 p-4 rounded-xl flex items-start gap-3"
            style={{ background: "rgba(244, 114, 182, 0.08)", border: "2px dashed var(--secondary)" }}
          >
            <Zap size={18} strokeWidth={2.5} style={{ color: "var(--secondary)", flexShrink: 0, marginTop: 2 }} />
            <p className="text-sm" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              <strong>注意：</strong><code className="px-1 text-xs rounded" style={{ background: "var(--secondary)", color: "#fff" }}>nowrap</code>（默认值）
              会让子项被压缩到极小甚至溢出容器。做卡片列表时，务必设置{" "}
              <code className="px-1 text-xs rounded" style={{ background: "var(--secondary)", color: "#fff" }}>flex-wrap: wrap</code>！
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE FLEX SHORTHAND DEEP DIVE ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--accent)", border: "2px solid var(--foreground)", borderRadius: "var(--radius-md)", boxShadow: "4px 4px 0px 0px var(--foreground)" }}
          >
            <Zap size={22} strokeWidth={2.5} color="#fff" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              flex 简写属性深度剖析
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              flex-grow · flex-shrink · flex-basis 的三合一
            </p>
          </div>
        </div>

        {/* Formula Card */}
        <div
          className="animate-slide p-6 md:p-8 mb-8"
          style={{
            animationDelay: "0.15s",
            background: "var(--foreground)",
            border: "3px solid var(--foreground)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "10px 10px 0px 0px var(--accent)",
          }}
        >
          <h3 className="text-2xl font-extrabold text-center mb-6" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--tertiary)" }}>
            flex: &lt;grow&gt; &lt;shrink&gt; &lt;basis&gt;
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "flex-grow",
                emoji: "📈",
                desc: "存在剩余空间时，按比例分配给子项",
                color: "var(--accent)",
                example: "flex-grow: 1",
              },
              {
                name: "flex-shrink",
                emoji: "📉",
                desc: "空间不足时，按比例缩小子项",
                color: "var(--secondary)",
                example: "flex-shrink: 0 (不缩小)",
              },
              {
                name: "flex-basis",
                emoji: "📏",
                desc: "分配前的“理想尺寸”，优先级高于 width",
                color: "var(--tertiary)",
                example: "flex-basis: 200px",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl text-center"
                style={{ background: "rgba(255,255,255,0.05)", border: `2px solid ${item.color}` }}
              >
                <div className="text-3xl mb-2">{item.emoji}</div>
                <h4 className="text-base font-extrabold mb-2" style={{ fontFamily: '"Outfit", sans-serif', color: item.color }}>
                  {item.name}
                </h4>
                <p className="text-xs opacity-60 mb-3" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: "#fff" }}>
                  {item.desc}
                </p>
                <code className="text-xs px-2 py-1 rounded" style={{ background: item.color, color: "#fff" }}>
                  {item.example}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Common Shorthand Values */}
        <div
          className="animate-slide topic-card p-6 md:p-8"
          style={{ animationDelay: "0.25s", boxShadow: "8px 8px 0px 0px var(--accent)" }}
        >
          <h3 className="text-lg font-extrabold mb-6 flex items-center gap-2" style={{ fontFamily: '"Outfit", sans-serif' }}>
            <BookOpen size={20} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
            常用简写值速查
          </h3>

          <div className="space-y-4">
            {[
              { shorthand: "flex: 0", expands: "grow: 0, shrink: 1, basis: 0%", meaning: "固定尺寸，不伸展，可收缩", color: "var(--secondary)" },
              { shorthand: "flex: 1", expands: "grow: 1, shrink: 1, basis: 0%", meaning: "等分剩余空间（最常用！）", color: "var(--accent)" },
              { shorthand: "flex: auto", expands: "grow: 1, shrink: 1, basis: auto", meaning: "根据内容自适应，可伸缩", color: "var(--tertiary)" },
              { shorthand: "flex: none", expands: "grow: 0, shrink: 0, basis: auto", meaning: "完全固定，不伸不缩", color: "var(--quaternary)" },
              { shorthand: "flex: 200px", expands: "grow: 1, shrink: 1, basis: 200px", meaning: "基础 200px，可弹性伸缩", color: "var(--secondary)" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-center gap-3 p-4 rounded-xl transition-transform hover:translate-x-1"
                style={{ background: "var(--card)", border: "2px solid var(--border)" }}
              >
                <code className="text-sm font-bold px-3 py-1.5 rounded-lg whitespace-nowrap" style={{ background: item.color, color: "#fff", minWidth: 100, textAlign: "center" }}>
                  {item.shorthand}
                </code>
                <ChevronRight size={16} strokeWidth={2.5} className="hidden md:block opacity-30 flex-shrink-0" />
                <code className="text-xs opacity-60" style={{ fontFamily: '"Fira Code", monospace' }}>{item.expands}</code>
                <span className="md:ml-auto text-xs font-bold opacity-70" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{item.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE: flex-grow DEMO ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--tertiary)", border: "2px solid var(--foreground)", borderRadius: "var(--radius-md)", boxShadow: "4px 4px 0px 0px var(--foreground)" }}
          >
            <Maximize2 size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              交互实验：flex-grow
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              调整第二个元素的 grow 值，观察空间分配变化
            </p>
          </div>
        </div>

        <div
          className="animate-slide topic-card p-6 md:p-8"
          style={{ animationDelay: "0.2s", boxShadow: "10px 10px 0px 0px var(--tertiary)" }}
        >
          {/* Grow Controls */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-bold" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              第二个元素 flex-grow:
            </span>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((v) => (
                <button
                  key={v}
                  onClick={() => setFlexGrowValue(v)}
                  className="w-10 h-10 text-sm font-bold rounded-xl transition-all"
                  style={{
                    background: flexGrowValue === v ? "var(--tertiary)" : "var(--card)",
                    color: "var(--foreground)",
                    border: "2px solid var(--foreground)",
                    boxShadow: flexGrowValue === v ? "3px 3px 0px 0px var(--foreground)" : "2px 2px 0px 0px var(--border)",
                    transform: flexGrowValue === v ? "translate(-1px, -1px)" : "none",
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div
            className="flex gap-3 p-5 rounded-xl transition-all duration-300"
            style={{
              background: "rgba(251, 191, 36, 0.08)",
              border: "2px dashed var(--tertiary)",
            }}
          >
            <div
              className="flex items-center justify-center text-sm font-bold rounded-xl"
              style={{
                flex: "0 1 100px",
                height: 80,
                background: "var(--accent)",
                color: "#fff",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              grow: 0
            </div>
            <div
              className="flex items-center justify-center text-sm font-bold rounded-xl transition-all duration-300"
              style={{
                flex: `${flexGrowValue} 1 100px`,
                height: 80,
                background: "var(--tertiary)",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              grow: {flexGrowValue}
            </div>
            <div
              className="flex items-center justify-center text-sm font-bold rounded-xl"
              style={{
                flex: "0 1 100px",
                height: 80,
                background: "var(--quaternary)",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              grow: 0
            </div>
          </div>

          <p className="text-xs mt-4 opacity-50 text-center" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            当 grow: 0 时保持基础宽度；grow 越大，占的剩余空间越多
          </p>
        </div>
      </section>

      {/* ===== COMMON PATTERNS ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--card)", border: "2px solid var(--foreground)", borderRadius: "var(--radius-md)", boxShadow: "4px 4px 0px 0px var(--quaternary)" }}
          >
            <BookOpen size={22} strokeWidth={2.5} style={{ color: "var(--quaternary)" }} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              实战模式库
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              8 个最经典的 Flexbox 布局模式
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: "完美居中",
              desc: "最经典的一行居中代码",
              code: "display: flex;\njustify-content: center;\nalign-items: center;",
              preview: (
                <div className="flex items-center justify-center h-32 rounded-xl" style={{ background: "rgba(139, 92, 246, 0.06)", border: "2px dashed var(--accent)" }}>
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center text-xs font-bold" style={{ background: "var(--accent)", color: "#fff", border: "2px solid var(--foreground)", boxShadow: "3px 3px 0px 0px var(--foreground)" }}>
                    🎯
                  </div>
                </div>
              ),
              color: "var(--accent",
            },
            {
              name: "导航栏",
              desc: "Logo 左 + 菜单右的经典布局",
              code: "display: flex;\njustify-content: space-between;\nalign-items: center;",
              preview: (
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(244, 114, 182, 0.06)", border: "2px dashed var(--secondary)" }}>
                  <div className="w-12 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: "var(--secondary)", color: "#fff", border: "2px solid var(--foreground)" }}>LOGO</div>
                  <div className="flex gap-2">
                    {["首页", "关于", "联系"].map((t, i) => (
                      <div key={i} className="px-2 py-1 text-xs font-bold rounded-lg" style={{ background: "var(--card)", border: "2px solid var(--border)" }}>{t}</div>
                    ))}
                  </div>
                </div>
              ),
              color: "var(--secondary)",
            },
            {
              name: "等分布局",
              desc: "flex: 1 让所有子项等宽",
              code: "display: flex;\n> * { flex: 1; }",
              preview: (
                <div className="flex gap-2">
                  {["A", "B", "C"].map((l, i) => (
                    <div key={i} className="flex-1 h-12 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: i === 0 ? "var(--tertiary)" : i === 1 ? "var(--accent)" : "var(--quaternary)", color: i === 0 || i === 2 ? "var(--foreground)" : "#fff", border: "2px solid var(--foreground)", boxShadow: "3px 3px 0px 0px var(--foreground)" }}>{l}</div>
                  ))}
                </div>
              ),
              color: "var(--tertiary)",
            },
            {
              name: "卡片底部对齐",
              desc: "flex 列 + margin-top: auto",
              code: "display: flex;\nflex-direction: column;\n> .cta { margin-top: auto; }",
              preview: (
                <div className="flex flex-col p-3 rounded-xl gap-2" style={{ background: "rgba(52, 211, 153, 0.06)", border: "2px dashed var(--quaternary)" }}>
                  <div className="h-3 w-3/4 rounded" style={{ background: "var(--quaternary)" }} />
                  <div className="h-2 w-full rounded opacity-50" style={{ background: "var(--quaternary)" }} />
                  <div className="h-2 w-2/3 rounded opacity-30" style={{ background: "var(--quaternary)" }} />
                  <div className="mt-auto h-7 w-full rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: "var(--quaternary)", color: "#fff", border: "2px solid var(--foreground)" }}>CTA 按钮</div>
                </div>
              ),
              color: "var(--quaternary)",
            },
            {
              name: "输入框组",
              desc: "输入框 flex: 1 + 固定按钮",
              code: "display: flex;\ninput { flex: 1; }\nbutton { flex-shrink: 0; }",
              preview: (
                <div className="flex gap-2">
                  <div className="flex-1 h-9 rounded-lg flex items-center px-3 text-xs opacity-60" style={{ background: "var(--card)", border: "2px solid var(--border)" }}>输入内容...</div>
                  <div className="h-9 px-4 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "var(--accent)", color: "#fff", border: "2px solid var(--foreground)", boxShadow: "3px 3px 0px 0px var(--foreground)" }}>发送</div>
                </div>
              ),
              color: "var(--accent)",
            },
            {
              name: "Sticky Footer",
              desc: "最小全高页面，底部永远贴底",
              code: "body {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\nfooter { margin-top: auto; }",
              preview: (
                <div className="flex flex-col rounded-xl overflow-hidden" style={{ height: 120, border: "2px solid var(--foreground)" }}>
                  <div className="h-6 flex items-center px-2 text-xs font-bold" style={{ background: "var(--secondary)", color: "#fff" }}>Header</div>
                  <div className="flex-1 flex items-center px-2 text-xs opacity-50">Content (弹性区域)</div>
                  <div className="h-6 flex items-center px-2 text-xs font-bold" style={{ background: "var(--foreground)", color: "#fff" }}>Footer (始终贴底)</div>
                </div>
              ),
              color: "var(--secondary)",
            },
            {
              name: "两端对齐行",
              desc: "标题左 + 操作右",
              code: "display: flex;\njustify-content: space-between;\nalign-items: center;",
              preview: (
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(251, 191, 36, 0.06)", border: "2px dashed var(--tertiary)" }}>
                  <span className="text-sm font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>标题</span>
                  <div className="flex gap-1.5">
                    <div className="w-7 h-7 rounded-lg" style={{ background: "var(--tertiary)", border: "2px solid var(--foreground)" }} />
                    <div className="w-7 h-7 rounded-lg" style={{ background: "var(--accent)", border: "2px solid var(--foreground)" }} />
                  </div>
                </div>
              ),
              color: "var(--tertiary)",
            },
            {
              name: "媒体对象",
              desc: "图片固定 + 文字弹性填充",
              code: "display: flex;\ngap: 16px;\nimg { flex-shrink: 0; }\ntext { flex: 1; }",
              preview: (
                <div className="flex gap-3 p-3 rounded-xl" style={{ background: "rgba(139, 92, 246, 0.06)", border: "2px dashed var(--accent)" }}>
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "var(--accent)", border: "2px solid var(--foreground)" }}>🖼</div>
                  <div className="flex-1 flex flex-col gap-1 justify-center">
                    <div className="h-3 w-2/3 rounded" style={{ background: "var(--accent)" }} />
                    <div className="h-2 w-full rounded opacity-40" style={{ background: "var(--accent)" }} />
                  </div>
                </div>
              ),
              color: "var(--accent)",
            },
          ].map((p, i) => (
            <div
              key={i}
              className="animate-slide topic-card p-5 transition-all hover:-rotate-1 hover:scale-[1.01]"
              style={{
                animationDelay: `${0.1 + i * 0.06}s`,
                boxShadow: `6px 6px 0px 0px ${p.color}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-base font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>{p.name}</h4>
              </div>
              <p className="text-xs opacity-60 mb-4" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{p.desc}</p>
              <div className="mb-4">{p.preview}</div>
              <pre
                className="text-xs p-3 rounded-lg overflow-x-auto"
                style={{ background: "#1a1a2e", color: "#e2e8f0", fontFamily: '"Fira Code", monospace' }}
              >
                <code>{p.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* ===== GAP PROPERTY ===== */}
      <section className="container pb-20">
        <div
          className="animate-slide topic-card p-6 md:p-8"
          style={{ animationDelay: "0.15s", boxShadow: "10px 10px 0px 0px var(--secondary)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0"
              style={{ background: "var(--secondary)", border: "2px solid var(--foreground)", boxShadow: "3px 3px 0px 0px var(--foreground)" }}
            >
              <Shuffle size={20} strokeWidth={2.5} color="#fff" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                gap · 告别 margin hack
              </h3>
              <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                Flexbox 现已全面支持 gap 属性
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Without gap */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full" style={{ background: "var(--secondary)", color: "#fff" }}>✕</span>
                <span className="text-sm font-bold opacity-70">用 margin 的旧方案</span>
              </div>
              <pre
                className="text-xs p-4 rounded-xl overflow-x-auto"
                style={{ background: "#1a1a2e", color: "#e2e8f0", fontFamily: '"Fira Code", monospace' }}
              >
                <code>{`/* 旧方案：需要 :not(:last-child) */
.item:not(:last-child) {
  margin-right: 16px;
}

/* 问题：最后一个元素也有 margin */`}</code>
              </pre>
            </div>

            {/* With gap */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full" style={{ background: "var(--quaternary)", color: "#fff" }}>✓</span>
                <span className="text-sm font-bold opacity-70">用 gap 的现代方案</span>
              </div>
              <pre
                className="text-xs p-4 rounded-xl overflow-x-auto"
                style={{ background: "#1a1a2e", color: "var(--quaternary)", fontFamily: '"Fira Code", monospace' }}
              >
                <code>{`/* 现代方案：一行搞定 */
.container {
  display: flex;
  gap: 16px;
  /* 或 gap: row-gap column-gap */
}`}</code>
              </pre>
            </div>
          </div>

          {/* Visual comparison */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 p-4 rounded-xl" style={{ background: "rgba(244, 114, 182, 0.06)", border: "2px dashed var(--secondary)" }}>
              <p className="text-xs font-bold mb-2 opacity-50">margin-right: 16px (旧方案)</p>
              <div className="flex">
                {["A", "B", "C"].map((l, i) => (
                  <div key={i} className="h-10 flex items-center justify-center text-xs font-bold rounded-lg" style={{ width: 60, marginRight: 16, background: "var(--secondary)", color: "#fff", border: "2px solid var(--foreground)" }}>{l}</div>
                ))}
              </div>
              <p className="text-xs mt-2 opacity-40">← 注意最后的多余间距</p>
            </div>
            <div className="flex-1 p-4 rounded-xl" style={{ background: "rgba(52, 211, 153, 0.06)", border: "2px dashed var(--quaternary)" }}>
              <p className="text-xs font-bold mb-2 opacity-50">gap: 16px (现代方案)</p>
              <div className="flex gap-4">
                {["A", "B", "C"].map((l, i) => (
                  <div key={i} className="h-10 flex items-center justify-center text-xs font-bold rounded-lg" style={{ width: 60, background: "var(--quaternary)", color: "#fff", border: "2px solid var(--foreground)" }}>{l}</div>
                ))}
              </div>
              <p className="text-xs mt-2 opacity-40">← 干净利落，无多余间距</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FLEX vs GRID ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--card)", border: "2px solid var(--foreground)", borderRadius: "var(--radius-md)", boxShadow: "4px 4px 0px 0px var(--secondary)" }}
          >
            <Zap size={22} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              Flexbox vs Grid 选择指南
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              不是"谁更好"，而是"什么时候用谁"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              question: "布局是几维的？",
              oneD: "Flexbox → 单行/单列",
              twoD: "Grid → 行 + 列同时控制",
              icon: <LayoutGrid size={18} strokeWidth={2.5} />,
              color: "var(--accent)",
            },
            {
              question: "内容还是布局优先？",
              oneD: "Flexbox → 内容驱动，自适应",
              twoD: "Grid → 布局驱动，先画骨架",
              icon: <Layers size={18} strokeWidth={2.5} />,
              color: "var(--tertiary)",
            },
            {
              question: "元素间需要对齐关系吗？",
              oneD: "Flexbox → 各自为政",
              twoD: "Grid → 行列对齐",
              icon: <AlignCenter size={18} strokeWidth={2.5} />,
              color: "var(--quaternary)",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="animate-slide topic-card p-5"
              style={{ animationDelay: `${0.15 + i * 0.1}s`, boxShadow: `6px 6px 0px 0px ${item.color}` }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center rounded-xl mb-3"
                style={{ background: item.color, border: "2px solid var(--foreground)", boxShadow: "3px 3px 0px 0px var(--foreground)" }}
              >
                {React.cloneElement(item.icon, { color: "#fff" })}
              </div>
              <h4 className="text-sm font-extrabold mb-3" style={{ fontFamily: '"Outfit", sans-serif' }}>{item.question}</h4>
              <div className="space-y-2">
                <p className="text-xs p-2 rounded-lg" style={{ background: "rgba(244, 114, 182, 0.1)", fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  <span className="font-bold" style={{ color: "var(--secondary)" }}>1D:</span> {item.oneD}
                </p>
                <p className="text-xs p-2 rounded-lg" style={{ background: "rgba(139, 92, 246, 0.1)", fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  <span className="font-bold" style={{ color: "var(--accent)" }}>2D:</span> {item.twoD}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Banner */}
        <div
          className="animate-slide p-5 text-center rounded-xl"
          style={{
            animationDelay: "0.45s",
            background: "var(--foreground)",
            border: "2px solid var(--foreground)",
            boxShadow: "8px 8px 0px 0px var(--secondary)",
          }}
        >
          <p className="text-lg font-bold" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--secondary)" }}>
            💡 Flexbox 是你的瑞士军刀，Grid 是你的建筑蓝图
          </p>
          <p className="text-sm mt-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: "rgba(255,255,255,0.6)" }}>
            日常 90% 的布局需求，<strong style={{ color: "var(--tertiary)" }}>Flexbox</strong> 都能优雅解决。
          </p>
        </div>
      </section>

      {/* ===== COMPLETE CHEAT SHEET ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--card)", border: "2px solid var(--foreground)", borderRadius: "var(--radius-md)", boxShadow: "4px 4px 0px 0px var(--accent)" }}
          >
            <BookOpen size={22} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              完整属性速查表
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              Flexbox 全部属性一览
            </p>
          </div>
        </div>

        <div
          className="animate-slide topic-card overflow-hidden"
          style={{ animationDelay: "0.2s", boxShadow: "10px 10px 0px 0px var(--foreground)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              <thead>
                <tr style={{ background: "var(--foreground)" }}>
                  <th className="px-5 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">属性</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">作用对象</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">说明</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { prop: "display: flex", target: "容器", desc: "声明一个 Flex 容器" },
                  { prop: "flex-direction", target: "容器", desc: "主轴方向（row/column/row-reverse/column-reverse）" },
                  { prop: "flex-wrap", target: "容器", desc: "换行控制（nowrap/wrap/wrap-reverse）" },
                  { prop: "flex-flow", target: "容器", desc: "direction + wrap 的简写" },
                  { prop: "justify-content", target: "容器", desc: "主轴对齐与分布（6 种取值）" },
                  { prop: "align-items", target: "容器", desc: "交叉轴对齐（stretch/flex-start/center/flex-end/baseline）" },
                  { prop: "align-content", target: "容器", desc: "多行交叉轴对齐（需 wrap）" },
                  { prop: "gap / row-gap / column-gap", target: "容器", desc: "子项之间的间距" },
                  { prop: "flex-grow", target: "子项", desc: "剩余空间放大比例（默认 0）" },
                  { prop: "flex-shrink", target: "子项", desc: "空间不足时缩小比例（默认 1）" },
                  { prop: "flex-basis", target: "子项", desc: "分配前的初始尺寸（默认 auto）" },
                  { prop: "flex", target: "子项", desc: "grow + shrink + basis 的简写" },
                  { prop: "order", target: "子项", desc: "排列顺序（默认 0，越小越前）" },
                  { prop: "align-self", target: "子项", desc: "单独覆盖交叉轴对齐" },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="transition-colors"
                    style={{
                      borderBottom: "2px solid var(--border)",
                      background: i % 2 === 0 ? "transparent" : "rgba(244, 114, 182, 0.03)",
                    }}
                  >
                    <td className="px-5 py-3">
                      <code className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: "var(--secondary)", color: "#fff" }}>
                        {row.prop}
                      </code>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: row.target === "容器" ? "var(--tertiary)" : "var(--quaternary)" }}
                      >
                        {row.target}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs opacity-70">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== GOTCHAS & TIPS ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--tertiary)", border: "2px solid var(--foreground)", borderRadius: "var(--radius-md)", boxShadow: "4px 4px 0px 0px var(--foreground)" }}
          >
            <Zap size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              常见坑点 & 最佳实践
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              这些经验能帮你避免 80% 的 Flex 布局问题
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "flex-shrink 默认为 1",
              desc: "子项默认会被压缩。如果不想缩小，设置 flex-shrink: 0 或 flex: none。",
              emoji: "⚠️",
              color: "var(--secondary)",
            },
            {
              title: "min-width 的隐形陷阱",
              desc: "Flex 子项默认 min-width: auto（最小为内容宽度），可能导致不换行。设置 min-width: 0 可修复。",
              emoji: "🪤",
              color: "var(--tertiary)",
            },
            {
              title: "margin: auto 的超能力",
              desc: "在 Flex 子项上设置 margin-left: auto 可以让它“吸”到另一端，比 justify-content 更灵活。",
              emoji: "🚀",
              color: "var(--accent)",
            },
            {
              title: "gap 代替 margin",
              desc: "现代浏览器已全面支持 Flex 的 gap 属性，告别 margin hack，代码更简洁。",
              emoji: "✅",
              color: "var(--quaternary)",
            },
            {
              title: "flex-basis 优先于 width",
              desc: "当同时设置 width 和 flex-basis 时，flex-basis 优先。建议统一使用 flex 简写。",
              emoji: "📏",
              color: "var(--accent)",
            },
            {
              title: "百分比 vs fr vs auto",
              desc: "flex: 1 等于 flex: 1 1 0%，而 flex: auto 等于 flex: 1 1 auto。两者行为不同！",
              emoji: "🔍",
              color: "var(--secondary)",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="animate-slide topic-card p-5 flex gap-4 transition-all hover:-rotate-0.5 hover:scale-[1.01]"
              style={{
                animationDelay: `${0.1 + i * 0.06}s`,
                boxShadow: `6px 6px 0px 0px ${item.color}`,
              }}
            >
              <div className="text-3xl flex-shrink-0">{item.emoji}</div>
              <div>
                <h4 className="text-sm font-extrabold mb-1" style={{ fontFamily: '"Outfit", sans-serif' }}>
                  {item.title}
                </h4>
                <p className="text-xs opacity-70 leading-relaxed" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FOOTER CTA ===== */}
      <section className="container pb-24">
        <div
          className="animate-slide p-8 md:p-12 text-center relative overflow-hidden rounded-2xl"
          style={{
            animationDelay: "0.1s",
            background: "var(--foreground)",
            border: "3px solid var(--foreground)",
            boxShadow: "12px 12px 0px 0px var(--secondary)",
          }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-48 h-48 opacity-10" style={{ background: "var(--secondary)", borderRadius: "0 0 100% 0" }} />
          <div className="absolute bottom-0 right-0 w-36 h-36 opacity-10" style={{ background: "var(--tertiary)", borderRadius: "100% 0 0 0" }} />

          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4 relative z-10"
            style={{ fontFamily: '"Outfit", sans-serif', color: "#fff" }}
          >
            现在，用 Flexbox 重构你的组件吧！
          </h2>
          <p
            className="text-base md:text-lg mb-8 max-w-xl mx-auto relative z-10"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: "rgba(255,255,255,0.6)" }}
          >
            从导航栏到卡片列表，从表单布局到弹窗居中 —{" "}
            <strong style={{ color: "var(--secondary)" }}>Flexbox 无处不在</strong>。
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <a
              href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl transition-all hover:-translate-y-0.5"
              style={{ background: "var(--secondary)", color: "#fff", border: "2px solid var(--secondary)", boxShadow: "4px 4px 0px 0px rgba(255,255,255,0.2)" }}
            >
              <BookOpen size={16} strokeWidth={2.5} />
              CSS-Tricks Flexbox 指南
            </a>
            <a
              href="https://flexbox.help/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl transition-all hover:-translate-y-0.5"
              style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", boxShadow: "4px 4px 0px 0px rgba(255,255,255,0.1)" }}
            >
              <Zap size={16} strokeWidth={2.5} />
              Flexbox 在线练习
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}