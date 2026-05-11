// app/knowledge/css-grid/page.tsx
"use client";

import React, { useState } from "react";
import { highlightCode } from "@/lib/prism-highlight";
import {
  Grid3X3,
  Columns3,
  Rows3,
  Maximize2,
  Minimize2,
  ArrowRight,
  ArrowDown,
  LayoutGrid,
  Box,
  AlignHorizontalJustifyCenter,
  AlignVerticalJustifyCenter,
  Shuffle,
  Zap,
  BookOpen,
  ChevronRight,
  Sparkles,
  Code2,
  Eye,
  Layers,
  MoveHorizontal,
  MoveVertical,
  Repeat,
  SquareDashedBottom,
  Monitor,
  Smartphone,
} from "lucide-react";

export default function CSSGridPage() {
  const [activeGap, setActiveGap] = useState(16);
  const [activeTemplate, setActiveTemplate] = useState(0);

  const gridTemplates = [
    { label: "经典三栏", cols: "1fr 2fr 1fr", desc: "侧边栏 + 主内容 + 侧边栏" },
    { label: "圣杯布局", cols: "200px 1fr 200px", desc: "固定侧栏 + 弹性内容" },
    { label: "均分四列", cols: "repeat(4, 1fr)", desc: "四列均等分布" },
    { label: "瀑布流式", cols: "repeat(auto-fill, minmax(200px, 1fr))", desc: "自适应响应式列" },
  ];

  return (
    <div className="bg-dot-grid min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="container pt-20 pb-16 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div
          className="absolute -top-20 -right-32 w-80 h-80 opacity-20"
          style={{
            background: "var(--tertiary)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        <div
          className="absolute top-40 -left-20 w-52 h-52 opacity-15"
          style={{
            background: "var(--secondary)",
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          }}
        />

        {/* Badge */}
        <div className="animate-pop flex items-center gap-2 mb-8">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider"
            style={{
              background: "var(--tertiary)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-full)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
              color: "var(--foreground)",
            }}
          >
            <LayoutGrid size={16} strokeWidth={2.5} />
            CSS 布局核心
          </span>
          <span
            className="inline-flex items-center px-3 py-2 text-xs font-bold uppercase tracking-wider"
            style={{
              background: "var(--card)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-full)",
              boxShadow: "4px 4px 0px 0px var(--accent)",
            }}
          >
            二维布局系统
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
          <span style={{ color: "var(--accent)" }}>Grid</span>
          <br />
          <span className="text-4xl md:text-5xl lg:text-6xl" style={{ color: "var(--foreground)" }}>
            布局深度解析
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-slide text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            color: "var(--foreground)",
            opacity: 0.7,
            animationDelay: "0.15s",
          }}
        >
          CSS Grid 是第一个真正的<strong>二维布局系统</strong>。它让你同时控制行与列，
          用声明式语法构建复杂的网页布局，彻底告别 float 和各种 hack。
        </p>

        {/* Live Grid Demo in Hero */}
        <div
          className="animate-slide relative p-6 md:p-8 max-w-3xl"
          style={{
            background: "var(--card)",
            border: "3px solid var(--foreground)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "12px 12px 0px 0px var(--accent)",
            animationDelay: "0.25s",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Eye size={18} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: "var(--accent)" }}
            >
              实时预览 · 拖拽查看
            </span>
          </div>
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(3, 70px)",
            }}
          >
            <div
              className="flex items-center justify-center text-xs font-bold rounded-lg transition-transform hover:scale-105"
              style={{
                gridColumn: "1 / 3",
                gridRow: "1 / 3",
                background: "var(--accent)",
                color: "#fff",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              header
            </div>
            <div
              className="flex items-center justify-center text-xs font-bold rounded-lg transition-transform hover:scale-105"
              style={{
                background: "var(--secondary)",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              nav
            </div>
            <div
              className="flex items-center justify-center text-xs font-bold rounded-lg transition-transform hover:scale-105"
              style={{
                gridRow: "1 / 4",
                background: "var(--tertiary)",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              aside
            </div>
            <div
              className="flex items-center justify-center text-xs font-bold rounded-lg transition-transform hover:scale-105"
              style={{
                gridColumn: "1 / 3",
                background: "var(--quaternary)",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              main
            </div>
            <div
              className="flex items-center justify-center text-xs font-bold rounded-lg transition-transform hover:scale-105"
              style={{
                background: "#fbbf24",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              ad
            </div>
            <div
              className="flex items-center justify-center text-xs font-bold rounded-lg transition-transform hover:scale-105"
              style={{
                gridColumn: "1 / 4",
                background: "var(--accent)",
                color: "#fff",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              footer
            </div>
          </div>
          <p
            className="mt-4 text-sm text-center"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', opacity: 0.5 }}
          >
            grid-template-areas 可视化示意
          </p>
        </div>
      </section>

      {/* ===== CORE CONCEPT DIVIDER ===== */}
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
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              核心概念
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              两个角色，一张网
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONTAINER vs ITEMS ===== */}
      <section className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Grid Container Card */}
          <div
            className="animate-slide topic-card p-6 md:p-8 relative overflow-hidden"
            style={{
              animationDelay: "0.15s",
              boxShadow: "8px 8px 0px 0px var(--accent)",
            }}
          >
            <div
              className="absolute -top-6 -right-6 w-24 h-24 opacity-10"
              style={{
                background: "var(--accent)",
                borderRadius: "var(--radius-full)",
              }}
            />
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 flex items-center justify-center flex-shrink-0 rounded-xl"
                style={{
                  background: "var(--accent)",
                  border: "2px solid var(--foreground)",
                  boxShadow: "3px 3px 0px 0px var(--foreground)",
                }}
              >
                <Box size={20} strokeWidth={2.5} color="#fff" />
              </div>
              <h3 className="text-xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                Grid Container
              </h3>
            </div>
            <p
              className="mb-5 leading-relaxed"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', opacity: 0.8 }}
            >
              设置了 <code className="px-2 py-0.5 text-sm font-bold rounded" style={{ background: "var(--accent)", color: "#fff" }}>display: grid</code> 或{" "}
              <code className="px-2 py-0.5 text-sm font-bold rounded" style={{ background: "var(--accent)", color: "#fff" }}>inline-grid</code> 的元素。
              它是网格的<strong>父容器</strong>，定义行和列的轨道。
            </p>
            <div className="space-y-3">
              {[
                { prop: "grid-template-columns", desc: "定义列轨道的数量和宽度", icon: <Columns3 size={16} strokeWidth={2.5} /> },
                { prop: "grid-template-rows", desc: "定义行轨道的数量和高度", icon: <Rows3 size={16} strokeWidth={2.5} /> },
                { prop: "gap", desc: "行与列之间的间距", icon: <Shuffle size={16} strokeWidth={2.5} /> },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl transition-transform hover:translate-x-1"
                  style={{
                    background: "rgba(139, 92, 246, 0.06)",
                    border: "2px solid var(--border)",
                  }}
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-lg mt-0.5"
                    style={{
                      background: "var(--card)",
                      border: "2px solid var(--border)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <code className="text-sm font-bold" style={{ color: "var(--accent)" }}>
                      {item.prop}
                    </code>
                    <p className="text-xs mt-0.5 opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid Items Card */}
          <div
            className="animate-slide topic-card p-6 md:p-8 relative overflow-hidden"
            style={{
              animationDelay: "0.25s",
              boxShadow: "8px 8px 0px 0px var(--secondary)",
            }}
          >
            <div
              className="absolute -bottom-8 -left-8 w-28 h-28 opacity-10"
              style={{
                background: "var(--secondary)",
                borderRadius: "var(--radius-full)",
              }}
            />
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 flex items-center justify-center flex-shrink-0 rounded-xl"
                style={{
                  background: "var(--secondary)",
                  border: "2px solid var(--foreground)",
                  boxShadow: "3px 3px 0px 0px var(--foreground)",
                }}
              >
                <LayoutGrid size={20} strokeWidth={2.5} color="#fff" />
              </div>
              <h3 className="text-xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                Grid Items
              </h3>
            </div>
            <p
              className="mb-5 leading-relaxed"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', opacity: 0.8 }}
            >
              Grid 容器的<strong>直接子元素</strong>。每个 item 都可以独立控制
              自己跨越哪些行和列，实现复杂的布局编排。
            </p>
            <div className="space-y-3">
              {[
                { prop: "grid-column", desc: "控制元素跨越的列（起始/结束线）", icon: <MoveHorizontal size={16} strokeWidth={2.5} /> },
                { prop: "grid-row", desc: "控制元素跨越的行（起始/结束线）", icon: <MoveVertical size={16} strokeWidth={2.5} /> },
                { prop: "grid-area", desc: "简写属性，同时指定行和列位置", icon: <SquareDashedBottom size={16} strokeWidth={2.5} /> },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl transition-transform hover:translate-x-1"
                  style={{
                    background: "rgba(244, 114, 182, 0.06)",
                    border: "2px solid var(--border)",
                  }}
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-lg mt-0.5"
                    style={{
                      background: "var(--card)",
                      border: "2px solid var(--border)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <code className="text-sm font-bold" style={{ color: "var(--secondary)" }}>
                      {item.prop}
                    </code>
                    <p className="text-xs mt-0.5 opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRACK SIZING: fr, minmax, repeat ===== */}
      <section className="container pb-20">
        {/* Section Header */}
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--tertiary)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-md)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <Maximize2 size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              轨道尺寸单位
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              fr · minmax · repeat · auto-fill · auto-fit
            </p>
          </div>
        </div>

        {/* Bento Grid for Track Units */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          style={{ gridAutoRows: "minmax(160px, auto)" }}
        >
          {/* fr Unit */}
          <div
            className="animate-slide topic-card p-6 flex flex-col justify-between"
            style={{
              animationDelay: "0.1s",
              boxShadow: "6px 6px 0px 0px var(--accent)",
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-3xl font-extrabold"
                  style={{ fontFamily: '"Outfit", sans-serif', color: "var(--accent)" }}
                >
                  fr
                </span>
                <span
                  className="px-2 py-0.5 text-xs font-bold rounded-full"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  核心
                </span>
              </div>
              <p className="text-sm leading-relaxed opacity-70" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                <strong>fraction</strong>（分数单位），按比例分配剩余空间。
                <code className="ml-1 px-1 text-xs rounded" style={{ background: "var(--border)" }}>
                  1fr 2fr
                </code> = 1:2 分配。
              </p>
            </div>
          </div>

          {/* repeat() */}
          <div
            className="animate-slide topic-card p-6 flex flex-col justify-between"
            style={{
              animationDelay: "0.15s",
              boxShadow: "6px 6px 0px 0px var(--secondary)",
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-3xl font-extrabold"
                  style={{ fontFamily: '"Outfit", sans-serif', color: "var(--secondary)" }}
                >
                  repeat()
                </span>
              </div>
              <p className="text-sm leading-relaxed opacity-70" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                避免重复书写相同的轨道定义。
                <code className="block mt-1 px-2 py-1 text-xs rounded" style={{ background: "var(--border)" }}>
                  repeat(3, 1fr)
                </code>
              </p>
            </div>
          </div>

          {/* minmax() */}
          <div
            className="animate-slide topic-card p-6 flex flex-col justify-between"
            style={{
              animationDelay: "0.2s",
              boxShadow: "6px 6px 0px 0px var(--tertiary)",
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-2xl font-extrabold"
                  style={{ fontFamily: '"Outfit", sans-serif', color: "var(--tertiary)" }}
                >
                  minmax()
                </span>
              </div>
              <p className="text-sm leading-relaxed opacity-70" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                设定轨道的最小和最大尺寸。
                <code className="block mt-1 px-2 py-1 text-xs rounded" style={{ background: "var(--border)" }}>
                  minmax(200px, 1fr)
                </code>
              </p>
            </div>
          </div>

          {/* auto-fill / auto-fit */}
          <div
            className="animate-slide topic-card p-6 flex flex-col justify-between"
            style={{
              animationDelay: "0.25s",
              boxShadow: "6px 6px 0px 0px var(--quaternary)",
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-2xl font-extrabold"
                  style={{ fontFamily: '"Outfit", sans-serif', color: "var(--quaternary)" }}
                >
                  auto-fill
                </span>
              </div>
              <p className="text-sm leading-relaxed opacity-70" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                自动根据容器宽度填充尽可能多的列。
                <code className="block mt-1 px-2 py-1 text-xs rounded" style={{ background: "var(--border)" }}>
                  auto-fill / auto-fit
                </code>
              </p>
            </div>
          </div>
        </div>

        {/* fr vs px Visual Comparison */}
        <div
          className="animate-slide mt-8 p-6 md:p-8"
          style={{
            animationDelay: "0.3s",
            background: "var(--card)",
            border: "3px solid var(--foreground)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "10px 10px 0px 0px var(--tertiary)",
          }}
        >
          <h3 className="text-lg font-extrabold mb-6 flex items-center gap-2" style={{ fontFamily: '"Outfit", sans-serif' }}>
            <Eye size={20} strokeWidth={2.5} style={{ color: "var(--tertiary)" }} />
            <span>
              <code className="px-2 py-0.5 rounded text-sm" style={{ background: "var(--tertiary)" }}>fr</code> 与{" "}
              <code className="px-2 py-0.5 rounded text-sm" style={{ background: "var(--border)" }}>px</code> 的行为差异
            </span>
          </h3>

          <div className="space-y-6">
            {/* px: fixed */}
            <div>
              <p className="text-sm font-bold mb-2 opacity-70">
                <code style={{ color: "var(--foreground)" }}>grid-template-columns: 200px 1fr 1fr</code>
              </p>
              <div className="flex gap-2 rounded-xl overflow-hidden" style={{ border: "2px solid var(--foreground)" }}>
                <div
                  className="flex items-center justify-center text-xs font-bold"
                  style={{ width: 200, height: 50, background: "var(--accent)", color: "#fff", flexShrink: 0 }}
                >
                  200px
                </div>
                <div
                  className="flex-1 flex items-center justify-center text-xs font-bold"
                  style={{ height: 50, background: "var(--secondary)", color: "#fff" }}
                >
                  1fr
                </div>
                <div
                  className="flex-1 flex items-center justify-center text-xs font-bold"
                  style={{ height: 50, background: "var(--quaternary)", color: "#fff" }}
                >
                  1fr
                </div>
              </div>
            </div>

            {/* all fr */}
            <div>
              <p className="text-sm font-bold mb-2 opacity-70">
                <code style={{ color: "var(--foreground)" }}>grid-template-columns: 1fr 2fr 1fr</code>
              </p>
              <div className="flex gap-2 rounded-xl overflow-hidden" style={{ border: "2px solid var(--foreground)" }}>
                <div
                  className="flex-1 flex items-center justify-center text-xs font-bold"
                  style={{ height: 50, background: "var(--tertiary)" }}
                >
                  1fr
                </div>
                <div
                  className="flex-[2] flex items-center justify-center text-xs font-bold"
                  style={{ height: 50, background: "var(--accent)", color: "#fff" }}
                >
                  2fr
                </div>
                <div
                  className="flex-1 flex items-center justify-center text-xs font-bold"
                  style={{ height: 50, background: "var(--tertiary)" }}
                >
                  1fr
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GRID TEMPLATE AREAS ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--quaternary)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-md)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <Layers size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              grid-template-areas
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              用"ASCII 艺术"来画布局，直观到令人发指
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Side */}
          <div
            className="animate-slide topic-card overflow-hidden"
            style={{
              animationDelay: "0.15s",
              boxShadow: "8px 8px 0px 0px var(--quaternary)",
            }}
          >
            <div
              className="flex items-center gap-2 px-6 py-3"
              style={{
                borderBottom: "2px solid var(--foreground)",
                background: "var(--foreground)",
              }}
            >
              <Code2 size={16} strokeWidth={2.5} color="#fff" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">CSS</span>
            </div>
            <pre
              className="p-6 text-sm leading-relaxed overflow-x-auto"
              style={{
                fontFamily: '"Fira Code", monospace',
                background: "#1a1a2e",
                color: "#e2e8f0",
              }}
            >
              <code className="language-css" dangerouslySetInnerHTML={{ __html: highlightCode(`.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 16px;

  grid-template-areas:
    "header  header  header"
    "sidebar main    aside"
    "footer  footer  footer";
}

.header  { grid-area: header;  }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main;    }
.aside   { grid-area: aside;   }
.footer  { grid-area: footer;  }`, "css") }} />
            </pre>
          </div>

          {/* Visual Result Side */}
          <div
            className="animate-slide topic-card p-6"
            style={{
              animationDelay: "0.25s",
              boxShadow: "8px 8px 0px 0px var(--quaternary)",
            }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Eye size={18} strokeWidth={2.5} style={{ color: "var(--quaternary)" }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--quaternary)" }}>
                渲染结果
              </span>
            </div>
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: "140px 1fr 140px",
                gridTemplateRows: "60px 1fr 50px",
                minHeight: 280,
              }}
            >
              <div
                className="col-span-3 flex items-center justify-center text-sm font-bold rounded-xl transition-transform hover:scale-[1.02]"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  border: "2px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                🔷 header
              </div>
              <div
                className="flex items-center justify-center text-xs font-bold rounded-xl transition-transform hover:scale-[1.02]"
                style={{
                  background: "var(--tertiary)",
                  border: "2px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                sidebar
              </div>
              <div
                className="flex items-center justify-center text-sm font-bold rounded-xl transition-transform hover:scale-[1.02]"
                style={{
                  background: "var(--quaternary)",
                  border: "2px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                main
              </div>
              <div
                className="flex items-center justify-center text-xs font-bold rounded-xl transition-transform hover:scale-[1.02]"
                style={{
                  background: "var(--secondary)",
                  color: "#fff",
                  border: "2px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                aside
              </div>
              <div
                className="col-span-3 flex items-center justify-center text-sm font-bold rounded-xl transition-transform hover:scale-[1.02]"
                style={{
                  background: "var(--foreground)",
                  color: "#fff",
                  border: "2px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--secondary)",
                }}
              >
                🔻 footer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE: GAP EXPLORER ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--secondary)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-md)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <Shuffle size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              交互实验：调整 Gap
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              亲自感受 gap 对网格间距的影响
            </p>
          </div>
        </div>

        <div
          className="animate-slide topic-card p-6 md:p-8"
          style={{
            animationDelay: "0.2s",
            boxShadow: "10px 10px 0px 0px var(--secondary)",
          }}
        >
          {/* Gap Controls */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {[8, 16, 24, 32].map((g) => (
              <button
                key={g}
                onClick={() => setActiveGap(g)}
                className="px-4 py-2 text-sm font-bold rounded-xl transition-all"
                style={{
                  background: activeGap === g ? "var(--secondary)" : "var(--card)",
                  color: activeGap === g ? "#fff" : "var(--foreground)",
                  border: "2px solid var(--foreground)",
                  boxShadow: activeGap === g
                    ? "4px 4px 0px 0px var(--foreground)"
                    : "2px 2px 0px 0px var(--border)",
                  transform: activeGap === g ? "translate(-2px, -2px)" : "none",
                }}
              >
                {g}px
              </button>
            ))}
            <span
              className="ml-auto px-3 py-1.5 text-xs font-bold rounded-full"
              style={{
                background: "var(--card)",
                border: "2px solid var(--foreground)",
              }}
            >
              当前 gap: {activeGap}px
            </span>
          </div>

          {/* Grid Preview */}
          <div
            className="grid rounded-xl p-4 transition-all duration-300"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
              gap: activeGap,
              background: "var(--border)",
              border: "2px solid var(--foreground)",
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center text-xs font-bold rounded-lg transition-transform hover:scale-110"
                style={{
                  height: 70,
                  background:
                    i % 4 === 0
                      ? "var(--accent)"
                      : i % 4 === 1
                      ? "var(--secondary)"
                      : i % 4 === 2
                      ? "var(--tertiary)"
                      : "var(--quaternary)",
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
      </section>

      {/* ===== GRID TEMPLATES EXPLORER ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--tertiary)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-md)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <Columns3 size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              常用列模板
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              点击查看不同 grid-template-columns 的效果
            </p>
          </div>
        </div>

        <div
          className="animate-slide topic-card p-6 md:p-8"
          style={{
            animationDelay: "0.2s",
            boxShadow: "10px 10px 0px 0px var(--tertiary)",
          }}
        >
          {/* Template Selector */}
          <div className="flex flex-wrap gap-3 mb-8">
            {gridTemplates.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTemplate(i)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl transition-all"
                style={{
                  background: activeTemplate === i ? "var(--tertiary)" : "var(--card)",
                  color: "var(--foreground)",
                  border: "2px solid var(--foreground)",
                  boxShadow:
                    activeTemplate === i
                      ? "4px 4px 0px 0px var(--foreground)"
                      : "2px 2px 0px 0px var(--border)",
                  transform: activeTemplate === i ? "translate(-2px, -2px)" : "none",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="mb-5 flex items-center gap-3">
            <code
              className="px-3 py-2 text-sm font-bold rounded-lg"
              style={{
                background: "var(--foreground)",
                color: "var(--tertiary)",
                fontFamily: '"Fira Code", monospace',
              }}
            >
              {gridTemplates[activeTemplate].cols}
            </code>
            <span className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              → {gridTemplates[activeTemplate].desc}
            </span>
          </div>

          {/* Template Preview */}
          <div
            className="grid rounded-xl p-4 transition-all duration-300"
            style={{
              gridTemplateColumns: gridTemplates[activeTemplate].cols,
              gap: 12,
              background: "var(--border)",
              border: "2px solid var(--foreground)",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center text-sm font-bold rounded-lg transition-transform hover:scale-105"
                style={{
                  height: 80,
                  background:
                    i % 3 === 0 ? "var(--accent)" : i % 3 === 1 ? "var(--quaternary)" : "var(--secondary)",
                  color: i % 3 === 2 ? "#fff" : "var(--foreground)",
                  border: "2px solid var(--foreground)",
                  boxShadow: "3px 3px 0px 0px var(--foreground)",
                }}
              >
                Item {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ALIGNMENT PROPERTIES ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--accent)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-md)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <AlignHorizontalJustifyCenter size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              对齐系统
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              Grid 最强大的能力之一 — 完全控制对齐
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "justify-items",
              subtitle: "水平方向 · 所有 item",
              values: ["start", "center", "end", "stretch"],
              color: "var(--accent)",
              icon: <MoveHorizontal size={18} strokeWidth={2.5} />,
            },
            {
              title: "align-items",
              subtitle: "垂直方向 · 所有 item",
              values: ["start", "center", "end", "stretch"],
              color: "var(--secondary)",
              icon: <MoveVertical size={18} strokeWidth={2.5} />,
            },
            {
              title: "place-items",
              subtitle: "简写属性 (align + justify)",
              values: ["center center", "start end", "stretch", "center start"],
              color: "var(--tertiary)",
              icon: <Maximize2 size={18} strokeWidth={2.5} />,
            },
            {
              title: "justify-content",
              subtitle: "整个网格在容器中水平对齐",
              values: ["start", "center", "end", "space-between"],
              color: "var(--quaternary)",
              icon: <AlignHorizontalJustifyCenter size={18} strokeWidth={2.5} />,
            },
            {
              title: "align-content",
              subtitle: "整个网格在容器中垂直对齐",
              values: ["start", "center", "end", "space-around"],
              color: "var(--accent)",
              icon: <AlignVerticalJustifyCenter size={18} strokeWidth={2.5} />,
            },
            {
              title: "place-content",
              subtitle: "简写属性 (align-content + justify-content)",
              values: ["center", "start start", "space-between center"],
              color: "var(--secondary)",
              icon: <Box size={18} strokeWidth={2.5} />,
            },
          ].map((prop, i) => (
            <div
              key={i}
              className="animate-slide topic-card p-5 transition-all hover:-rotate-1 hover:scale-[1.02]"
              style={{
                animationDelay: `${0.1 + i * 0.08}s`,
                boxShadow: `6px 6px 0px 0px ${prop.color}`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{
                    background: prop.color,
                    border: "2px solid var(--foreground)",
                    boxShadow: "2px 2px 0px 0px var(--foreground)",
                  }}
                >
                  {React.cloneElement(prop.icon, { color: "#fff" })}
                </div>
                <div>
                  <code className="text-sm font-bold" style={{ color: prop.color }}>
                    {prop.title}
                  </code>
                  <p className="text-xs opacity-50" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    {prop.subtitle}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {prop.values.map((v, j) => (
                  <span
                    key={j}
                    className="px-2 py-1 text-xs font-bold rounded-lg"
                    style={{
                      background: "var(--card)",
                      border: "2px solid var(--border)",
                      fontFamily: '"Fira Code", monospace',
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== GRID LINES & NUMBERING ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--foreground)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-md)",
              boxShadow: "4px 4px 0px 0px var(--accent)",
            }}
          >
            <Grid3X3 size={22} strokeWidth={2.5} color="var(--tertiary)" />
          </div>
          <div>
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              网格线编号系统
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              理解网格线是精准放置元素的关键
            </p>
          </div>
        </div>

        <div
          className="animate-slide topic-card p-6 md:p-10"
          style={{
            animationDelay: "0.2s",
            boxShadow: "10px 10px 0px 0px var(--foreground)",
          }}
        >
          {/* Grid Lines Diagram */}
          <div className="relative mb-8">
            {/* Column line labels */}
            <div className="flex justify-between mb-2 px-1">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex flex-col items-center">
                  <span
                    className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-full"
                    style={{
                      background: "var(--accent)",
                      color: "#fff",
                      border: "2px solid var(--foreground)",
                    }}
                  >
                    {n}
                  </span>
                  <span className="text-xs mt-1 opacity-50">列线</span>
                </div>
              ))}
            </div>

            {/* Grid with lines */}
            <div className="relative">
              <div
                className="grid"
                style={{
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 12,
                  padding: 8,
                  background: "var(--border)",
                  borderRadius: "var(--radius-md)",
                  border: "2px solid var(--foreground)",
                }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center text-sm font-bold rounded-lg"
                    style={{
                      height: 70,
                      background:
                        i < 3 ? "var(--accent)" : "var(--secondary)",
                      color: "#fff",
                      border: "2px solid var(--foreground)",
                      boxShadow: "3px 3px 0px 0px var(--foreground)",
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Row labels */}
              <div className="absolute -right-12 top-8 bottom-8 flex flex-col justify-between">
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-full"
                    style={{
                      background: "var(--tertiary)",
                      border: "2px solid var(--foreground)",
                    }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "2px solid var(--foreground)" }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2"
                style={{ background: "var(--foreground)" }}
              >
                <Code2 size={14} strokeWidth={2.5} color="var(--tertiary)" />
                <span className="text-xs font-bold text-white">跨越多列</span>
              </div>
              <pre
                className="p-4 text-sm leading-relaxed overflow-x-auto"
                style={{
                  fontFamily: '"Fira Code", monospace',
                  background: "#1a1a2e",
                  color: "#e2e8f0",
                }}
              >
                <code className="language-css" dangerouslySetInnerHTML={{ __html: highlightCode(`.hero {
  grid-column: 1 / 3;
  /* 从列线 1 到列线 3 */
  /* 即跨越前两列 */
}`, "css") }} />
              </pre>
            </div>
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "2px solid var(--foreground)" }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2"
                style={{ background: "var(--foreground)" }}
              >
                <Code2 size={14} strokeWidth={2.5} color="var(--tertiary)" />
                <span className="text-xs font-bold text-white">跨越多行</span>
              </div>
              <pre
                className="p-4 text-sm leading-relaxed overflow-x-auto"
                style={{
                  fontFamily: '"Fira Code", monospace',
                  background: "#1a1a2e",
                  color: "#e2e8f0",
                }}
              >
                <code className="language-css" dangerouslySetInnerHTML={{ __html: highlightCode(`.sidebar {
  grid-row: 1 / -1;
  /* 从第 1 行到最后一行 */
  /* 负号 = 从末尾计数 */
}`, "css") }} />
              </pre>
            </div>
          </div>

          {/* Visual: span keyword */}
          <div
            className="mt-6 p-4 rounded-xl flex items-center gap-4"
            style={{
              background: "rgba(251, 191, 36, 0.1)",
              border: "2px dashed var(--tertiary)",
            }}
          >
            <Zap size={20} strokeWidth={2.5} style={{ color: "var(--tertiary)", flexShrink: 0 }} />
            <p className="text-sm" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              <strong>tip：</strong>
              <code className="px-1.5 py-0.5 rounded text-xs font-bold" style={{ background: "var(--tertiary)" }}>
                grid-column: span 2
              </code>{" "}
              表示"跨越 2 格"，等同于从当前线到 +2 条线，比手动指定数字更灵活！
            </p>
          </div>
        </div>
      </section>

      {/* ===== GRID vs FLEXBOX ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--card)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-md)",
              boxShadow: "4px 4px 0px 0px var(--tertiary)",
            }}
          >
            <Zap size={22} strokeWidth={2.5} style={{ color: "var(--tertiary)" }} />
          </div>
          <div>
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              Grid vs Flexbox
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              不是对立，而是互补
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Grid Card */}
          <div
            className="animate-slide topic-card p-6"
            style={{
              animationDelay: "0.15s",
              boxShadow: "8px 8px 0px 0px var(--accent)",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 flex items-center justify-center rounded-xl"
                style={{
                  background: "var(--accent)",
                  border: "2px solid var(--foreground)",
                  boxShadow: "3px 3px 0px 0px var(--foreground)",
                }}
              >
                <Grid3X3 size={20} strokeWidth={2.5} color="#fff" />
              </div>
              <h3 className="text-lg font-extrabold" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--accent)" }}>
                CSS Grid
              </h3>
            </div>
            <ul className="space-y-2.5" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              {[
                "✅ 二维布局（行 + 列同时控制）",
                "✅ 先定义结构，再放内容",
                "✅ 精确控制元素位置",
                "✅ 适合整页/大区域布局",
                "✅ grid-template-areas 直观可视化",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {/* Mini Grid Demo */}
            <div
              className="mt-5 grid rounded-lg p-2"
              style={{
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 4,
                background: "var(--border)",
                border: "2px solid var(--foreground)",
              }}
            >
              {["A", "B", "C", "D", "E", "F"].map((l, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center text-xs font-bold rounded"
                  style={{
                    height: 36,
                    background: "var(--accent)",
                    color: "#fff",
                    border: "1px solid var(--foreground)",
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
          </div>

          {/* Flexbox Card */}
          <div
            className="animate-slide topic-card p-6"
            style={{
              animationDelay: "0.25s",
              boxShadow: "8px 8px 0px 0px var(--quaternary)",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 flex items-center justify-center rounded-xl"
                style={{
                  background: "var(--quaternary)",
                  border: "2px solid var(--foreground)",
                  boxShadow: "3px 3px 0px 0px var(--foreground)",
                }}
              >
                <Columns3 size={20} strokeWidth={2.5} color="#fff" />
              </div>
              <h3 className="text-lg font-extrabold" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--quaternary)" }}>
                Flexbox
              </h3>
            </div>
            <ul className="space-y-2.5" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              {[
                "✅ 一维布局（行 或 列）",
                "✅ 内容驱动，自适应伸缩",
                "✅ 灵活的对齐与分布",
                "✅ 适合组件/小区域布局",
                "✅ 处理内容量不确定的场景",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {/* Mini Flex Demo */}
            <div
              className="mt-5 flex gap-1 rounded-lg p-2"
              style={{
                background: "var(--border)",
                border: "2px solid var(--foreground)",
              }}
            >
              {["A", "B", "C"].map((l, i) => (
                <div
                  key={i}
                  className="flex-1 flex items-center justify-center text-xs font-bold rounded"
                  style={{
                    height: 36,
                    background: "var(--quaternary)",
                    color: "#fff",
                    border: "1px solid var(--foreground)",
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Banner */}
        <div
          className="animate-slide mt-8 p-5 text-center rounded-xl"
          style={{
            animationDelay: "0.35s",
            background: "var(--foreground)",
            border: "2px solid var(--foreground)",
            boxShadow: "8px 8px 0px 0px var(--accent)",
          }}
        >
          <p className="text-lg font-bold" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--tertiary)" }}>
            💡 最佳实践：用 Grid 做页面骨架，用 Flexbox 做组件内部
          </p>
          <p className="text-sm mt-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: "rgba(255,255,255,0.6)" }}>
            它们是<strong style={{ color: "var(--secondary)" }}>搭档</strong>，不是<strong style={{ color: "var(--secondary)" }}>对手</strong>。
          </p>
        </div>
      </section>

      {/* ===== COMMON PATTERNS ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--card)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-md)",
              boxShadow: "4px 4px 0px 0px var(--quaternary)",
            }}
          >
            <BookOpen size={22} strokeWidth={2.5} style={{ color: "var(--quaternary)" }} />
          </div>
          <div>
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              实战模式库
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              6 种最常见的 Grid 布局模式
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "等宽 N 列",
              code: "repeat(N, 1fr)",
              pattern: [1, 1, 1],
              color: "var(--accent)",
            },
            {
              name: "Holy Grail",
              code: "200px 1fr 200px",
              pattern: [0.5, 2, 0.5],
              color: "var(--secondary)",
            },
            {
              name: "Sidebar + Content",
              code: "250px 1fr",
              pattern: [0.4, 1],
              color: "var(--tertiary)",
            },
            {
              name: "Auto-fill Grid",
              code: "auto-fill, minmax(200px,1fr)",
              pattern: [1, 1, 1, 1],
              color: "var(--quaternary)",
            },
            {
              name: "Span Full Width",
              code: "1 / -1",
              pattern: [1, 1, 1],
              featured: true,
              color: "var(--accent)",
            },
            {
              name: "Dashboard",
              code: "repeat(4, 1fr)",
              pattern: [1, 1, 1, 1],
              color: "var(--secondary)",
            },
          ].map((p, i) => (
            <div
              key={i}
              className="animate-slide topic-card p-5 transition-all hover:-rotate-1 hover:scale-[1.02]"
              style={{
                animationDelay: `${0.1 + i * 0.07}s`,
                boxShadow: `6px 6px 0px 0px ${p.color}`,
              }}
            >
              <h4 className="text-base font-extrabold mb-1" style={{ fontFamily: '"Outfit", sans-serif' }}>
                {p.name}
              </h4>
              <code
                className="text-xs px-2 py-0.5 rounded font-bold"
                style={{ background: p.color, color: "#fff" }}
              >
                {p.code}
              </code>
              {/* Mini pattern preview */}
              <div className="flex gap-1 mt-4">
                {p.pattern.map((ratio, j) => (
                  <div
                    key={j}
                    className="rounded transition-transform hover:scale-105"
                    style={{
                      flex: p.featured && j === 1 ? "0 0 100%" : ratio,
                      height: 40,
                      background:
                        j % 2 === 0 ? p.color : "var(--card)",
                      border: "2px solid var(--foreground)",
                      boxShadow: "2px 2px 0px 0px var(--foreground)",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== IMPLICIT GRID & AUTO-FLOW ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--secondary)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-md)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <Repeat size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              隐式网格与自动流
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              当内容超出显式定义时，Grid 如何自动扩展？
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Implicit Grid Explainer */}
          <div
            className="animate-slide topic-card p-6"
            style={{
              animationDelay: "0.15s",
              boxShadow: "8px 8px 0px 0px var(--secondary)",
            }}
          >
            <h3 className="text-lg font-extrabold mb-4 flex items-center gap-2" style={{ fontFamily: '"Outfit", sans-serif' }}>
              <span
                className="w-7 h-7 flex items-center justify-center text-xs rounded-full"
                style={{ background: "var(--secondary)", color: "#fff", border: "2px solid var(--foreground)" }}
              >
                ?
              </span>
              什么是隐式轨道？
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', opacity: 0.8 }}>
              当你只定义了 <code className="px-1 text-xs rounded" style={{ background: "var(--border)" }}>grid-template-rows: 100px 100px</code>（2行），
              但放入了 6 个 item 时，Grid 会自动生成<strong>隐式行</strong>来容纳多余的内容。
            </p>

            <div className="space-y-3">
              <div
                className="p-3 rounded-xl"
                style={{ background: "rgba(244, 114, 182, 0.08)", border: "2px solid var(--border)" }}
              >
                <code className="text-sm font-bold" style={{ color: "var(--secondary)" }}>
                  grid-auto-rows
                </code>
                <p className="text-xs mt-1 opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  设置隐式行的高度。推荐：<code className="px-1 rounded" style={{ background: "var(--border)" }}>minmax(100px, auto)</code>
                </p>
              </div>
              <div
                className="p-3 rounded-xl"
                style={{ background: "rgba(244, 114, 182, 0.08)", border: "2px solid var(--border)" }}
              >
                <code className="text-sm font-bold" style={{ color: "var(--secondary)" }}>
                  grid-auto-flow
                </code>
                <p className="text-xs mt-1 opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  <code className="px-1 rounded" style={{ background: "var(--border)" }}>row</code>（默认）·{" "}
                  <code className="px-1 rounded" style={{ background: "var(--border)" }}>column</code> ·{" "}
                  <code className="px-1 rounded" style={{ background: "var(--border)" }}>dense</code>
                </p>
              </div>
            </div>
          </div>

          {/* auto-flow dense demo */}
          <div
            className="animate-slide topic-card p-6"
            style={{
              animationDelay: "0.25s",
              boxShadow: "8px 8px 0px 0px var(--secondary)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Eye size={18} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--secondary)" }}>
                grid-auto-flow: dense
              </span>
            </div>
            <div
              className="grid rounded-xl p-3"
              style={{
                gridTemplateColumns: "repeat(3, 1fr)",
                gridAutoRows: "60px",
                gap: 8,
                background: "var(--border)",
                border: "2px solid var(--foreground)",
                gridAutoFlow: "dense",
              }}
            >
              <div
                className="col-span-2 flex items-center justify-center text-xs font-bold rounded-lg"
                style={{ background: "var(--accent)", color: "#fff", border: "2px solid var(--foreground)", boxShadow: "3px 3px 0px 0px var(--foreground)" }}
              >
                span 2
              </div>
              <div
                className="row-span-2 flex items-center justify-center text-xs font-bold rounded-lg"
                style={{ background: "var(--tertiary)", border: "2px solid var(--foreground)", boxShadow: "3px 3px 0px 0px var(--foreground)" }}
              >
                span 2↕
              </div>
              <div
                className="flex items-center justify-center text-xs font-bold rounded-lg"
                style={{ background: "var(--quaternary)", border: "2px solid var(--foreground)", boxShadow: "3px 3px 0px 0px var(--foreground)" }}
              >
                1
              </div>
              <div
                className="flex items-center justify-center text-xs font-bold rounded-lg"
                style={{ background: "var(--secondary)", color: "#fff", border: "2px solid var(--foreground)", boxShadow: "3px 3px 0px 0px var(--foreground)" }}
              >
                2
              </div>
              <div
                className="col-span-2 flex items-center justify-center text-xs font-bold rounded-lg"
                style={{ background: "var(--accent)", color: "#fff", border: "2px solid var(--foreground)", boxShadow: "3px 3px 0px 0px var(--foreground)" }}
              >
                span 2
              </div>
              <div
                className="flex items-center justify-center text-xs font-bold rounded-lg"
                style={{ background: "var(--tertiary)", border: "2px solid var(--foreground)", boxShadow: "3px 3px 0px 0px var(--foreground)" }}
              >
                3
              </div>
            </div>
            <p className="text-xs mt-3 opacity-50 text-center" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              dense 会回填空白间隙，紧凑排列
            </p>
          </div>
        </div>
      </section>

      {/* ===== RESPONSIVE: AUTO-FILL vs AUTO-FIT ===== */}
      <section className="container pb-20">
        <div
          className="animate-slide topic-card p-6 md:p-8"
          style={{
            animationDelay: "0.15s",
            boxShadow: "10px 10px 0px 0px var(--accent)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0"
              style={{
                background: "var(--accent)",
                border: "2px solid var(--foreground)",
                boxShadow: "3px 3px 0px 0px var(--foreground)",
              }}
            >
              <Monitor size={20} strokeWidth={2.5} color="#fff" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                响应式 Grid：无需 Media Query
              </h3>
              <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                auto-fill vs auto-fit — 一行代码实现完美自适应
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div
              className="p-4 rounded-xl"
              style={{ background: "rgba(139, 92, 246, 0.06)", border: "2px solid var(--border)" }}
            >
              <h4 className="text-sm font-bold mb-2" style={{ color: "var(--accent)" }}>
                <code>auto-fill</code> — 填充尽可能多的列
              </h4>
              <p className="text-xs opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                即使只有一项内容，也会保留所有空轨道的空间。
              </p>
            </div>
            <div
              className="p-4 rounded-xl"
              style={{ background: "rgba(52, 211, 153, 0.06)", border: "2px solid var(--border)" }}
            >
              <h4 className="text-sm font-bold mb-2" style={{ color: "var(--quaternary)" }}>
                <code>auto-fit</code> — 折叠空轨道并拉伸
              </h4>
              <p className="text-xs opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                内容少时会自动折叠空列，让已有内容拉伸填满。
              </p>
            </div>
          </div>

          {/* Live Demo */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider opacity-50">auto-fill, minmax(120px, 1fr)</p>
            <div
              className="grid rounded-xl p-3"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: 8,
                background: "var(--border)",
                border: "2px solid var(--foreground)",
              }}
            >
              {["🎨", "📐", "✏️"].map((emoji, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center text-2xl rounded-lg"
                  style={{
                    height: 60,
                    background: "var(--accent)",
                    border: "2px solid var(--foreground)",
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Super responsive pattern */}
          <div
            className="mt-6 p-4 rounded-xl flex items-start gap-3"
            style={{
              background: "rgba(139, 92, 246, 0.08)",
              border: "2px dashed var(--accent)",
            }}
          >
            <Code2 size={18} strokeWidth={2.5} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="text-sm font-bold mb-1" style={{ color: "var(--accent)" }}>
                神级一行代码：
              </p>
              <pre
                className="text-xs p-3 rounded-lg overflow-x-auto"
                style={{
                  background: "#1a1a2e",
                  color: "var(--tertiary)",
                  fontFamily: '"Fira Code", monospace',
                }}
              >
                <code className="language-css" dangerouslySetInnerHTML={{ __html: highlightCode(`.grid {
  grid-template-columns: repeat(
    auto-fit, minmax(min(250px, 100%), 1fr)
  );
}`, "css") }} />
              </pre>
              <p className="text-xs mt-2 opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                无需任何 media query，自动从 1 列到 N 列完美自适应！
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMPLETE CHEAT SHEET ===== */}
      <section className="container pb-20">
        <div className="animate-slide flex items-center gap-4 mb-10" style={{ animationDelay: "0.1s" }}>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--card)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-md)",
              boxShadow: "4px 4px 0px 0px var(--secondary)",
            }}
          >
            <BookOpen size={22} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
          </div>
          <div>
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              完整属性速查表
            </h2>
            <p className="text-sm opacity-60" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              一张表掌握 Grid 全部核心属性
            </p>
          </div>
        </div>

        <div
          className="animate-slide topic-card overflow-hidden"
          style={{
            animationDelay: "0.2s",
            boxShadow: "10px 10px 0px 0px var(--foreground)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              <thead>
                <tr style={{ background: "var(--foreground)" }}>
                  <th className="px-5 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    属性
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    作用对象
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    说明
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { prop: "display: grid", target: "容器", desc: "声明一个块级网格容器" },
                  { prop: "grid-template-columns", target: "容器", desc: "定义列轨道模板" },
                  { prop: "grid-template-rows", target: "容器", desc: "定义行轨道模板" },
                  { prop: "grid-template-areas", target: "容器", desc: "用命名区域定义布局" },
                  { prop: "gap / row-gap / column-gap", target: "容器", desc: "轨道之间的间距" },
                  { prop: "grid-auto-rows", target: "容器", desc: "隐式行的默认尺寸" },
                  { prop: "grid-auto-columns", target: "容器", desc: "隐式列的默认尺寸" },
                  { prop: "grid-auto-flow", target: "容器", desc: "自动放置算法（row/column/dense）" },
                  { prop: "grid-column", target: "子项", desc: "指定元素的列起止线" },
                  { prop: "grid-row", target: "子项", desc: "指定元素的行起止线" },
                  { prop: "grid-area", target: "子项", desc: "指定命名区域或行列简写" },
                  { prop: "justify-items", target: "容器", desc: "所有子项的水平对齐" },
                  { prop: "align-items", target: "容器", desc: "所有子项的垂直对齐" },
                  { prop: "justify-self", target: "子项", desc: "单个子项的水平对齐" },
                  { prop: "align-self", target: "子项", desc: "单个子项的垂直对齐" },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="transition-colors hover:bg-opacity-5"
                    style={{
                      borderBottom: "2px solid var(--border)",
                      background: i % 2 === 0 ? "transparent" : "rgba(139, 92, 246, 0.03)",
                    }}
                  >
                    <td className="px-5 py-3">
                      <code
                        className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{ background: "var(--accent)", color: "#fff" }}
                      >
                        {row.prop}
                      </code>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background:
                            row.target === "容器" ? "var(--tertiary)" : "var(--quaternary)",
                        }}
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

      {/* ===== FOOTER CTA ===== */}
      <section className="container pb-24">
        <div
          className="animate-slide p-8 md:p-12 text-center relative overflow-hidden rounded-2xl"
          style={{
            animationDelay: "0.1s",
            background: "var(--foreground)",
            border: "3px solid var(--foreground)",
            boxShadow: "12px 12px 0px 0px var(--accent)",
          }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute top-0 right-0 w-40 h-40 opacity-10"
            style={{
              background: "var(--accent)",
              borderRadius: "0 0 0 100%",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-32 h-32 opacity-10"
            style={{
              background: "var(--secondary)",
              borderRadius: "0 100% 0 0",
            }}
          />

          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4 relative z-10"
            style={{
              fontFamily: '"Outfit", sans-serif',
              color: "#fff",
            }}
          >
            现在，去用 Grid 重构你的页面吧！
          </h2>
          <p
            className="text-base md:text-lg mb-8 max-w-xl mx-auto relative z-10"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: "rgba(255,255,255,0.6)",
            }}
          >
            CSS Grid 不仅是布局工具，更是一种<strong style={{ color: "var(--tertiary)" }}>思维方式</strong>。
            掌握它，你将彻底告别布局焦虑。
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <a
              href="https://css-tricks.com/snippets/css/complete-guide-grid/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl transition-all hover:-translate-y-0.5"
              style={{
                background: "var(--accent)",
                color: "#fff",
                border: "2px solid var(--accent)",
                boxShadow: "4px 4px 0px 0px rgba(255,255,255,0.2)",
              }}
            >
              <BookOpen size={16} strokeWidth={2.5} />
              CSS-Tricks 完整指南
            </a>
            <a
              href="https://cssgrid-generator.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl transition-all hover:-translate-y-0.5"
              style={{
                background: "transparent",
                color: "#fff",
                border: "2px solid rgba(255,255,255,0.3)",
                boxShadow: "4px 4px 0px 0px rgba(255,255,255,0.1)",
              }}
            >
              <Zap size={16} strokeWidth={2.5} />
              Grid 生成器
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}