// app/knowledge/esm-vs-commonjs/page.tsx

"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Package,
  ArrowRight,
  Zap,
  Clock,
  Layers,
  FileCode,
  Download,
  GitBranch,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Boxes,
  TreePine,
  Workflow,
  Globe,
  Server,
  Cpu,
  ToggleLeft,
  Code2,
  Lightbulb,
  BookOpen,
  Eye,
  Copy,
  Check,
  Play,
  RotateCcw,
} from "lucide-react";

/* ───────────────────────────────────────
   0.  全局样式（补丁，放入 style jsx）
   ─────────────────────────────────────── */
const GlobalStyles = () => (
  <style jsx global>{`
    @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap");

    :root {
      --background: #fffdf5;
      --foreground: #1e293b;
      --accent: #8b5cf6;
      --secondary: #f472b6;
      --tertiary: #fbbf24;
      --quaternary: #34d399;
      --border: #e2e8f0;
      --card: #ffffff;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: var(--background);
      color: var(--foreground);
      font-family: "Plus Jakarta Sans", sans-serif;
    }

    /* 波点网格 */
    .bg-dot-grid {
      background-image: radial-gradient(
          circle,
          #d4d4d8 1px,
          transparent 1px
        ),
        radial-gradient(circle, #d4d4d8 1px, transparent 1px);
      background-size: 24px 24px;
      background-position: 0 0, 12px 12px;
      min-height: 100vh;
    }

    /* 回弹入场 */
    @keyframes pop-in {
      0% {
        opacity: 0;
        transform: scale(0.7) translateY(20px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    .animate-pop {
      animation: pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }

    /* 纵向滑入 */
    @keyframes slide-up {
      0% {
        opacity: 0;
        transform: translateY(40px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-slide {
      animation: slide-up 0.5s ease-out both;
    }

    /* 浮动 */
    @keyframes float {
      0%,
      100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    /* 脉冲光环 */
    @keyframes pulse-ring {
      0% {
        box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4);
      }
      70% {
        box-shadow: 0 0 0 12px rgba(139, 92, 246, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
      }
    }
    .animate-pulse-ring {
      animation: pulse-ring 2s infinite;
    }

    /* 打字光标 */
    @keyframes blink {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
    }
    .cursor-blink::after {
      content: "▌";
      animation: blink 1s step-end infinite;
      color: var(--accent);
    }

    /* 渐变文字 */
    .text-gradient {
      background: linear-gradient(135deg, var(--accent), var(--secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* topic-card */
    .topic-card {
      background: var(--card);
      border: 2px solid var(--foreground);
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 8px 8px 0px 0px var(--foreground);
      transition: all 0.2s ease;
    }
    .topic-card:hover {
      transform: rotate(-1deg) scale(1.02);
      box-shadow: 10px 10px 0px 0px var(--foreground);
    }

    /* 不规则 blob */
    .blob {
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    }

    /* 代码块 */
    .code-block {
      background: #1e1e2e;
      color: #cdd6f4;
      border: 2px solid var(--foreground);
      border-radius: 12px;
      padding: 1.25rem;
      font-family: "JetBrains Mono", monospace;
      font-size: 0.85rem;
      line-height: 1.7;
      overflow-x: auto;
      box-shadow: 6px 6px 0px 0px var(--foreground);
      position: relative;
      white-space: pre;
    }
    .code-block .kw {
      color: #cba6f7;
    }
    .code-block .fn {
      color: #89b4fa;
    }
    .code-block .str {
      color: #a6e3a1;
    }
    .code-block .cm {
      color: #6c7086;
      font-style: italic;
    }
    .code-block .num {
      color: #fab387;
    }
    .code-block .op {
      color: #89dceb;
    }
    .code-block .type {
      color: #f9e2af;
    }
    .code-block .err {
      color: #f38ba8;
    }
    .code-block .prop {
      color: #f5c2e7;
    }

    /* 滚动条美化 */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: var(--border);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--foreground);
      border-radius: 4px;
    }

    /* 箭头流程线 */
    .flow-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border: 2px solid var(--foreground);
      border-radius: 50%;
      background: var(--tertiary);
      box-shadow: 3px 3px 0px 0px var(--foreground);
    }
  `}</style>
);

/* ───────────────────────────────────────
   辅助：复制按钮
   ─────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-lg border-2 border-[var(--foreground)] bg-[var(--card)] hover:bg-[var(--tertiary)] transition-all"
      style={{ boxShadow: "2px 2px 0px 0px var(--foreground)" }}
    >
      {copied ? (
        <Check size={14} strokeWidth={2.5} />
      ) : (
        <Copy size={14} strokeWidth={2.5} />
      )}
    </button>
  );
}

/* ───────────────────────────────────────
   辅助：带图标的信息 Badge
   ─────────────────────────────────────── */
function Badge({
  icon: Icon,
  label,
  color,
}: {
  icon: any;
  label: string;
  color: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border-2 border-[var(--foreground)]"
      style={{
        background: color,
        boxShadow: "3px 3px 0px 0px var(--foreground)",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <Icon size={13} strokeWidth={2.5} />
      {label}
    </span>
  );
}

/* ───────────────────────────────────────
   辅助：几何图标容器
   ─────────────────────────────────────── */
function IconBox({
  icon: Icon,
  bg,
  size = 48,
}: {
  icon: any;
  bg: string;
  size?: number;
}) {
  return (
    <div
      className="flex items-center justify-center border-2 border-[var(--foreground)]"
      style={{
        width: size,
        height: size,
        background: bg,
        borderRadius: "12px",
        boxShadow: "4px 4px 0px 0px var(--foreground)",
      }}
    >
      <Icon size={size * 0.5} strokeWidth={2.5} />
    </div>
  );
}

/* ═══════════════════════════════════════
   主页面组件
   ═══════════════════════════════════════ */
export default function ESMvsCommonJSPage() {
  const [activeTab, setActiveTab] = useState<"cjs" | "esm">("cjs");
  const [showTimeline, setShowTimeline] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowTimeline(true);
      },
      { threshold: 0.2 }
    );
    if (timelineRef.current) observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <GlobalStyles />

      <div className="bg-dot-grid" style={{ paddingBottom: "6rem" }}>
        {/* ══════════════════════════════════
            HERO 区域
        ══════════════════════════════════ */}
        <section
          className="relative overflow-hidden container "
          style={{ padding: "5rem 0 4rem" }}
        >
          {/* 背景装饰 blob */}
          <div
            className="blob absolute animate-float"
            style={{
              width: 300,
              height: 300,
              background: "var(--accent)",
              opacity: 0.08,
              top: -60,
              right: -80,
            }}
          />
          <div
            className="blob absolute animate-float"
            style={{
              width: 200,
              height: 200,
              background: "var(--secondary)",
              opacity: 0.1,
              bottom: -40,
              left: -60,
              animationDelay: "1.5s",
            }}
          />

          <div
            className="mx-auto px-6"
            style={{ maxWidth: "72rem" }}
          >
            {/* 顶部标签 */}
            <div
              className="animate-pop mb-6 flex items-center gap-3 flex-wrap"
              style={{ animationDelay: "0.1s" }}
            >
              <Badge icon={Package} label="JavaScript" color="var(--tertiary)" />
              <Badge icon={Boxes} label="模块系统" color="var(--secondary)" />
              <Badge icon={Workflow} label="工程化" color="var(--quaternary)" />
            </div>

            {/* 主标题 */}
            <h1
              className="animate-pop"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                animationDelay: "0.2s",
              }}
            >
              <span style={{ color: "var(--accent)" }}>CommonJS</span>
              <span className="mx-3 text-[var(--border)]">vs</span>
              <span style={{ color: "var(--secondary)" }}>ESM</span>
            </h1>

            {/* 副标题 */}
            <p
              className="animate-slide mt-5 max-w-2xl"
              style={{
                fontSize: "1.25rem",
                fontWeight: 500,
                color: "#64748b",
                lineHeight: 1.7,
                animationDelay: "0.4s",
              }}
            >
              JavaScript 两大模块系统的深度对决 —— 从
              <strong style={{ color: "var(--foreground)" }}> require()</strong> 到
              <strong style={{ color: "var(--foreground)" }}> import</strong>，
              彻底理解它们的运行原理、差异与选型策略。
            </p>

            {/* 快速导航卡片 */}
            <div
              className="animate-slide mt-10 grid gap-4"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                animationDelay: "0.6s",
              }}
            >
              {[
                {
                  icon: BookOpen,
                  title: "是什么",
                  desc: "模块系统基础概念",
                  color: "var(--accent)",
                  anchor: "#what",
                },
                {
                  icon: GitBranch,
                  title: "怎么不同",
                  desc: "语法 / 加载 / 作用域",
                  color: "var(--secondary)",
                  anchor: "#diff",
                },
                {
                  icon: Cpu,
                  title: "运行原理",
                  desc: "编译与执行机制",
                  color: "var(--tertiary)",
                  anchor: "#how",
                },
                {
                  icon: Lightbulb,
                  title: "选型指南",
                  desc: "该用哪个？",
                  color: "var(--quaternary)",
                  anchor: "#guide",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.anchor}
                  className="topic-card group flex items-start gap-3 cursor-pointer no-underline"
                  style={{
                    textDecoration: "none",
                    color: "var(--foreground)",
                    animationDelay: `${0.6 + i * 0.1}s`,
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-xl border-2 border-[var(--foreground)]"
                    style={{
                      width: 44,
                      height: 44,
                      background: item.color,
                      flexShrink: 0,
                      boxShadow: "3px 3px 0px 0px var(--foreground)",
                    }}
                  >
                    <item.icon size={22} strokeWidth={2.5} color="#fff" />
                  </div>
                  <div>
                    <div
                      className="font-bold"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "1.05rem",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-sm mt-0.5"
                      style={{ color: "#94a3b8" }}
                    >
                      {item.desc}
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className="ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    strokeWidth={2.5}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            1. 什么是模块系统
        ══════════════════════════════════ */}
        <section id="what" className="container py-12" >
          {/* 标题 */}
          <div className="animate-slide flex items-center gap-4 mb-8">
            <IconBox icon={BookOpen} bg="var(--accent)" size={52} />
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{
                  color: "var(--accent)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Chapter 01
              </span>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 800,
                }}
              >
                什么是模块系统？
              </h2>
            </div>
          </div>

          {/* 概念卡片 */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* CJS 简介 */}
            <div
              className="animate-slide topic-card"
              style={{ animationDelay: "0.1s", borderColor: "var(--foreground)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg border-2 border-[var(--foreground)] flex items-center justify-center"
                  style={{
                    background: "var(--tertiary)",
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                  }}
                >
                  <Server size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.3rem",
                    }}
                  >
                    CommonJS (CJS)
                  </h3>
                  <span className="text-xs" style={{ color: "#94a3b8" }}>
                    Node.js 的默认模块系统
                  </span>
                </div>
              </div>
              <p style={{ lineHeight: 1.8, fontSize: "0.95rem" }}>
                CommonJS 诞生于 <strong>2009 年</strong>，最初是为服务端 JavaScript
                设计的模块规范。Node.js 全面采用了这套规范，使其成为
                Node 生态的基石。它的核心思想是：
                <strong>在运行时同步加载模块</strong>，每个文件就是一个独立的模块作用域。
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge icon={Server} label="服务端优先" color="#fef3c7" />
                <Badge icon={Clock} label="运行时加载" color="#fef3c7" />
              </div>
            </div>

            {/* ESM 简介 */}
            <div
              className="animate-slide topic-card"
              style={{
                animationDelay: "0.2s",
                borderColor: "var(--foreground)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg border-2 border-[var(--foreground)] flex items-center justify-center"
                  style={{
                    background: "var(--secondary)",
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                  }}
                >
                  <Globe size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.3rem",
                    }}
                  >
                    ES Modules (ESM)
                  </h3>
                  <span className="text-xs" style={{ color: "#94a3b8" }}>
                    ECMAScript 官方标准
                  </span>
                </div>
              </div>
              <p style={{ lineHeight: 1.8, fontSize: "0.95rem" }}>
                ESM 是 <strong>ECMAScript 2015 (ES6)</strong> 正式引入的官方模块标准。它具有
                <strong>静态结构</strong>，这意味着模块的依赖关系在代码执行前就可以确定，
                从而支持 Tree Shaking 等高级优化。现代浏览器和 Node.js (v12+) 均已原生支持。
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge icon={Globe} label="浏览器原生" color="#ede9fe" />
                <Badge icon={Zap} label="静态分析" color="#ede9fe" />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            2. 核心差异对比 (Bento Grid)
        ══════════════════════════════════ */}
        <section id="diff" className="container pb-12" >
          <div className="animate-slide flex items-center gap-4 mb-8">
            <IconBox icon={GitBranch} bg="var(--secondary)" size={52} />
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{
                  color: "var(--secondary)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Chapter 02
              </span>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 800,
                }}
              >
                核心差异：一图胜千言
              </h2>
            </div>
          </div>

          {/* ── 语法对比代码 ── */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* CJS 代码 */}
            <div className="animate-slide" style={{ animationDelay: "0.1s" }}>
              <div
                className="flex items-center gap-2 px-4 py-2.5 border-2 border-b-0 border-[var(--foreground)] rounded-t-xl"
                style={{
                  background: "var(--tertiary)",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  boxShadow: "6px 0px 0px 0px var(--foreground)",
                }}
              >
                <Server size={16} strokeWidth={2.5} />
                CommonJS — math.js
              </div>
              <div
                className="code-block"
                style={{ borderRadius: "0 12px 12px 12px", marginTop: -2 }}
              >
                <CopyButton
                  text={`// ── 导出 ──
const add = (a, b) => a + b;
const PI = 3.14159;

module.exports = { add, PI };

// ── 导入 ──
const math = require('./math');
console.log(math.add(1, 2)); // 3

// 解构导入
const { add } = require('./math');
console.log(add(1, 2)); // 3`}
                />
                <code>
                  <span className="cm">{"// ── 导出 ──"}</span>
                  {"\n"}
                  <span className="kw">const</span>{" "}
                  <span className="fn">add</span> <span className="op">=</span>{" "}
                  (<span className="prop">a</span>, <span className="prop">b</span>) <span className="op">=&gt;</span> a <span className="op">+</span> b;
                  {"\n"}
                  <span className="kw">const</span>{" "}
                  <span className="type">PI</span> <span className="op">=</span>{" "}
                  <span className="num">3.14159</span>;
                  {"\n\n"}
                  <span className="prop">module</span>.<span className="prop">exports</span>{" "}
                  <span className="op">=</span> {"{ "}
                  {"\n  "}
                  <span className="fn">add</span>,
                  {"\n  "}
                  <span className="type">PI</span>
                  {"\n"};
                  {"\n\n"}
                  <span className="cm">{"// ── 导入 ──"}</span>
                  {"\n"}
                  <span className="kw">const</span>{" "}
                  math <span className="op">=</span>{" "}
                  <span className="fn">require</span>(<span className="str">'./math'</span>);
                  {"\n"}
                  <span className="prop">console</span>.<span className="fn">log</span>(
                  math.<span className="fn">add</span>(<span className="num">1</span>,{" "}
                  <span className="num">2</span>)); <span className="cm">{"// 3"}</span>
                  {"\n\n"}
                  <span className="cm">{"// 解构导入"}</span>
                  {"\n"}
                  <span className="kw">const</span> {"{ "}<span className="fn">add</span>
                  {" }"} <span className="op">=</span>{" "}
                  <span className="fn">require</span>(<span className="str">'./math'</span>);
                  {"\n"}
                  <span className="prop">console</span>.<span className="fn">log</span>(
                  <span className="fn">add</span>(<span className="num">1</span>,{" "}
                  <span className="num">2</span>)); <span className="cm">{"// 3"}</span>
                </code>
              </div>
            </div>

            {/* ESM 代码 */}
            <div className="animate-slide" style={{ animationDelay: "0.2s" }}>
              <div
                className="flex items-center gap-2 px-4 py-2.5 border-2 border-b-0 border-[var(--foreground)] rounded-t-xl"
                style={{
                  background: "var(--secondary)",
                  color: "#fff",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  boxShadow: "6px 0px 0px 0px var(--foreground)",
                }}
              >
                <Globe size={16} strokeWidth={2.5} />
                ES Modules — math.mjs
              </div>
              <div
                className="code-block"
                style={{ borderRadius: "0 12px 12px 12px", marginTop: -2 }}
              >
                <CopyButton
                  text={`// ── 命名导出 ──
export const add = (a, b) => a + b;
export const PI = 3.14159;

// ── 或者默认导出 ──
export default { add, PI };

// ── 导入 ──
import { add, PI } from './math.mjs';
console.log(add(1, 2)); // 3

// 默认导入
import math from './math.mjs';`}
                />
                <code>
                  <span className="cm">{"// ── 命名导出 ──"}</span>
                  {"\n"}
                  <span className="kw">export</span>{" "}
                  <span className="kw">const</span>{" "}
                  <span className="fn">add</span> <span className="op">=</span>{" "}
                  (<span className="prop">a</span>, <span className="prop">b</span>) <span className="op">=&gt;</span> a <span className="op">+</span> b;
                  {"\n"}
                  <span className="kw">export</span>{" "}
                  <span className="kw">const</span>{" "}
                  <span className="type">PI</span> <span className="op">=</span>{" "}
                  <span className="num">3.14159</span>;
                  {"\n\n"}
                  <span className="cm">{"// ── 或者默认导出 ──"}</span>
                  {"\n"}
                  <span className="kw">export</span>{" "}
                  <span className="kw">default</span> {"{ "}
                  {"\n  "}<span className="fn">add</span>,
                  {"\n  "}<span className="type">PI</span>
                  {"\n"};
                  {"\n\n"}
                  <span className="cm">{"// ── 导入 ──"}</span>
                  {"\n"}
                  <span className="kw">import</span> {"{ "}
                  {"\n  "}<span className="fn">add</span>,
                  {"\n  "}<span className="type">PI</span>
                  {"\n"} {"}"} <span className="kw">from</span>{" "}
                  <span className="str">'./math.mjs'</span>;
                  {"\n\n"}
                  <span className="prop">console</span>.<span className="fn">log</span>(
                  <span className="fn">add</span>(<span className="num">1</span>, <span className="num">2</span>)
                  ); <span className="cm">{"// 3"}</span>
                  {"\n\n"}
                  <span className="cm">{"// 默认导入"}</span>
                  {"\n"}
                  <span className="kw">import</span> math{" "}
                  <span className="kw">from</span>{" "}
                  <span className="str">'./math.mjs'</span>;
                </code>
              </div>
            </div>
          </div>

          {/* ── 差异对比表格 (Bento Cards) ── */}
          <div
            className="grid gap-5 mb-8"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {[
              {
                dimension: "加载方式",
                cjs: "运行时同步加载 (require 是函数调用)",
                esm: "编译时静态解析 (import 是关键字)",
                icon: Clock,
                color: "var(--accent)",
              },
              {
                dimension: "值的绑定",
                cjs: "拷贝值 (Copy)：导出后修改不影响已导入方",
                esm: "活绑定 (Live Binding)：始终引用同一内存地址",
                icon: Layers,
                color: "var(--secondary)",
              },
              {
                dimension: "Tree Shaking",
                cjs: "❌ 无法做到，因为 require 是动态的",
                esm: "✅ 天然支持，静态结构可被打包器分析",
                icon: TreePine,
                color: "var(--quaternary)",
              },
              {
                dimension: "循环依赖",
                cjs: "返回已执行部分的「未完成导出」",
                esm: "通过活绑定解决，但可能遇到 TDZ 错误",
                icon: RotateCcw,
                color: "var(--tertiary)",
              },
              {
                dimension: "this 指向",
                cjs: "顶层 this === module.exports (模块对象)",
                esm: "顶层 this === undefined",
                icon: Eye,
                color: "var(--accent)",
              },
              {
                dimension: "文件扩展名",
                cjs: ".js / .cjs (由 package.json type 决定)",
                esm: ".mjs 或 package.json 设置 \"type\":\"module\"",
                icon: FileCode,
                color: "var(--secondary)",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="animate-slide topic-card"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg border-2 border-[var(--foreground)] flex items-center justify-center"
                    style={{ background: item.color }}
                  >
                    <item.icon size={16} strokeWidth={2.5} />
                  </div>
                  <span
                    className="text-sm font-bold uppercase tracking-wider"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      color: item.color,
                    }}
                  >
                    {item.dimension}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div
                    className="flex items-start gap-2 p-2.5 rounded-lg border-2 border-dashed"
                    style={{
                      borderColor: "var(--tertiary)",
                      background: "#fffbeb",
                    }}
                  >
                    <span
                      className="inline-block px-1.5 py-0.5 text-[10px] font-bold rounded border-2 border-[var(--foreground)]"
                      style={{
                        background: "var(--tertiary)",
                        fontFamily: "'Outfit', sans-serif",
                        flexShrink: 0,
                      }}
                    >
                      CJS
                    </span>
                    <span>{item.cjs}</span>
                  </div>
                  <div
                    className="flex items-start gap-2 p-2.5 rounded-lg border-2 border-dashed"
                    style={{
                      borderColor: "var(--secondary)",
                      background: "#fdf2f8",
                    }}
                  >
                    <span
                      className="inline-block px-1.5 py-0.5 text-[10px] font-bold rounded border-2 border-[var(--foreground)]"
                      style={{
                        background: "var(--secondary)",
                        color: "#fff",
                        fontFamily: "'Outfit', sans-serif",
                        flexShrink: 0,
                      }}
                    >
                      ESM
                    </span>
                    <span>{item.esm}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════
            3. 运行原理深度剖析
        ══════════════════════════════════ */}
        <section id="how" className="container pb-12" >
          <div className="animate-slide flex items-center gap-4 mb-8">
            <IconBox icon={Cpu} bg="var(--tertiary)" size={52} />
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{
                  color: "var(--tertiary)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Chapter 03
              </span>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 800,
                }}
              >
                运行原理：引擎如何加载模块？
              </h2>
            </div>
          </div>

          {/* ── CJS 加载流程 ── */}
          <div className="animate-slide topic-card mb-8" style={{ animationDelay: "0.1s" }}>
            <h3
              className="flex items-center gap-2 mb-5"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "1.3rem",
              }}
            >
              <span
                className="w-8 h-8 rounded-lg border-2 border-[var(--foreground)] flex items-center justify-center text-sm"
                style={{ background: "var(--tertiary)" }}
              >
                1
              </span>
              CommonJS 加载流程（运行时）
            </h3>

            {/* 流程图 */}
            <div className="flex flex-col md:flex-row items-center gap-3 mb-6 overflow-x-auto pb-2">
              {[
                { label: "require('./foo')", bg: "var(--tertiary)" },
                { label: "解析路径", bg: "var(--card)" },
                { label: "读取文件", bg: "var(--card)" },
                { label: "包装函数", bg: "var(--accent)" },
                { label: "执行 & 缓存", bg: "var(--quaternary)" },
              ].map((step, i) => (
                <React.Fragment key={i}>
                  <div
                    className="animate-slide flex-shrink-0 px-4 py-3 border-2 border-[var(--foreground)] rounded-xl text-sm font-bold text-center"
                    style={{
                      background: step.bg,
                      color: step.bg === "var(--card)" ? "var(--foreground)" : "#fff",
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                      fontFamily: "'Outfit', sans-serif",
                      minWidth: 140,
                      animationDelay: `${0.1 + i * 0.1}s`,
                    }}
                  >
                    {step.label}
                  </div>
                  {i < 4 && (
                    <ArrowRight
                      size={20}
                      strokeWidth={2.5}
                      className="flex-shrink-0 hidden md:block"
                      style={{ color: "var(--foreground)" }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* 包装函数详解 */}
            <div
              className="code-block"
              style={{ fontSize: "0.82rem" }}
            >
              <CopyButton
                text={`// Node.js 实际上把每个文件包装成了一个函数！
(function(exports, require, module, __filename, __dirname) {
    // ── 你的模块代码在这里 ──
    const secret = 42;                    // 私有变量！
    module.exports = { secret };

    // 所以 exports / require / module / __filename
    // 并非全局变量，而是函数参数
});`}
              />
              <code>
                <span className="cm">{"// Node.js 实际上把每个文件包装成了一个函数！"}</span>
                {"\n"}
                (<span className="kw">function</span>(<span className="prop">exports</span>,{" "}
                <span className="fn">require</span>, <span className="prop">module</span>,{" "}
                <span className="type">__filename</span>, <span className="type">__dirname</span>) {"{"}
                {"\n"}
                {"    "}<span className="cm">{"// ── 你的模块代码在这里 ──"}</span>
                {"\n"}
                {"    "}<span className="kw">const</span>{" "}
                secret <span className="op">=</span> <span className="num">42</span>;{" "}
                <span className="cm">{"// 私有变量！"}</span>
                {"\n"}
                {"    "}<span className="prop">module</span>.<span className="prop">exports</span>{" "}
                <span className="op">=</span> {"{ secret }"};
                {"\n\n"}
                {"    "}<span className="cm">
                  {"// 所以 exports / require / module / __filename"}
                </span>
                {"\n"}
                {"    "}<span className="cm">
                  {"// 并非全局变量，而是函数参数"}
                </span>
                {"\n"}{"}"});
              </code>
            </div>

            {/* 关键要点 */}
            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              {[
                {
                  icon: CheckCircle2,
                  title: "同步阻塞",
                  desc: "require() 会阻塞后续代码直到模块加载完成",
                  color: "var(--tertiary)",
                },
                {
                  icon: CheckCircle2,
                  title: "结果缓存",
                  desc: "同一路径第二次 require() 直接返回缓存",
                  color: "var(--quaternary)",
                },
                {
                  icon: CheckCircle2,
                  title: "拷贝导出",
                  desc: "exports 是 module.exports 的引用，但赋值是拷贝",
                  color: "var(--accent)",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 p-3 rounded-xl border-2 border-dashed border-[var(--border)]"
                  style={{ background: "rgba(255,255,255,0.7)" }}
                >
                  <item.icon
                    size={18}
                    strokeWidth={2.5}
                    style={{ color: item.color, flexShrink: 0, marginTop: 2 }}
                  />
                  <div>
                    <div className="text-sm font-bold">{item.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── ESM 加载流程 ── */}
          <div className="animate-slide topic-card mb-8" style={{ animationDelay: "0.2s" }}>
            <h3
              className="flex items-center gap-2 mb-5"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "1.3rem",
              }}
            >
              <span
                className="w-8 h-8 rounded-lg border-2 border-[var(--foreground)] flex items-center justify-center text-sm"
                style={{ background: "var(--secondary)", color: "#fff" }}
              >
                2
              </span>
              ES Modules 加载流程（三阶段）
            </h3>

            {/* 三阶段卡片 */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  phase: "① 构建 (Construction)",
                  desc: "引擎解析所有 import / export 语句，构建模块依赖图（Module Graph）。此阶段不执行任何代码。",
                  color: "var(--accent)",
                  detail: "解析 URL → 获取源码 → 解析 AST",
                },
                {
                  phase: "② 实例化 (Instantiation)",
                  desc: "为每个模块在内存中分配空间，将 export 和 import 指向同一块内存（活绑定 / Live Bindings）。",
                  color: "var(--secondary)",
                  detail: "创建 Module Record → 链接 bindings",
                },
                {
                  phase: "③ 求值 (Evaluation)",
                  desc: "按照依赖拓扑顺序，从「叶节点」到「根节点」依次执行模块代码，返回最终结果。",
                  color: "var(--quaternary)",
                  detail: "拓扑排序 → 逐个执行 → 返回值",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="animate-slide p-4 rounded-xl border-2 border-[var(--foreground)]"
                  style={{
                    background: `${item.color}15`,
                    boxShadow: "5px 5px 0px 0px var(--foreground)",
                    animationDelay: `${0.3 + i * 0.1}s`,
                  }}
                >
                  <div
                    className="text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: item.color, fontFamily: "'Outfit', sans-serif" }}
                  >
                    {item.phase}
                  </div>
                  <p className="text-sm mb-3" style={{ lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                  <div
                    className="text-xs px-2.5 py-1.5 rounded-lg border-2 border-dashed font-mono"
                    style={{
                      borderColor: item.color,
                      background: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* 活绑定演示代码 */}
            <div
              className="code-block"
              style={{ fontSize: "0.82rem" }}
            >
              <CopyButton
                text={`// counter.mjs — 演示 Live Binding
export let count = 0;
export function increment() { 
  count++; 
}

// main.mjs
import { count, increment } from './counter.mjs';

console.log(count);  // 0  ← 不是拷贝，是同一引用！
increment();
console.log(count);  // 1  ← 值自动更新了！

// 注意：你不能在导入方直接 count = 99
// 因为 import 绑定是只读的 (read-only view)`}
              />
              <code>
                <span className="cm">{"// counter.mjs — 演示 Live Binding"}</span>
                {"\n"}
                <span className="kw">export</span>{" "}
                <span className="kw">let</span> count <span className="op">=</span>{" "}
                <span className="num">0</span>;
                {"\n"}
                <span className="kw">export</span>{" "}
                <span className="kw">function</span>{" "}
                <span className="fn">increment</span>() {"{"}
                {"\n  "}count<span className="op">++</span>;
                {"\n"}
                {"}"}
                {"\n\n"}
                <span className="cm">{"// main.mjs"}</span>
                {"\n"}
                <span className="kw">import</span> {"{ count, increment }"} <span className="kw">from</span>{" "}
                <span className="str">'./counter.mjs'</span>;
                {"\n\n"}
                <span className="prop">console</span>.<span className="fn">log</span>(count);{"  "}
                <span className="cm">{"// 0  ← 不是拷贝，是同一引用！"}</span>
                {"\n"}
                <span className="fn">increment</span>();
                {"\n"}
                <span className="prop">console</span>.<span className="fn">log</span>(count);{"  "}
                <span className="cm">{"// 1  ← 值自动更新了！"}</span>
                {"\n\n"}
                <span className="cm">
                  {"// 注意：你不能在导入方直接 count = 99"}
                </span>
                {"\n"}
                <span className="cm">
                  {"// 因为 import 绑定是只读的 (read-only view)"}
                </span>
              </code>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            4. 交互实验场
        ══════════════════════════════════ */}
        <section className="container pb-12" >
          <div className="animate-slide flex items-center gap-4 mb-8">
            <IconBox icon={Play} bg="var(--quaternary)" size={52} />
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{
                  color: "var(--quaternary)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                交互实验场
              </span>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 800,
                }}
              >
                动手试一试：循环依赖
              </h2>
            </div>
          </div>

          <Playground />
        </section>

        {/* ══════════════════════════════════
            5. 发展时间线
        ══════════════════════════════════ */}
        <section className="container pb-12" >
          <div className="animate-slide flex items-center gap-4 mb-10">
            <IconBox icon={Clock} bg="var(--accent)" size={52} />
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{
                  color: "var(--accent)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                历史脉络
              </span>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 800,
                }}
              >
                JavaScript 模块化进化史
              </h2>
            </div>
          </div>

          <div ref={timelineRef} className="relative pl-8 md:pl-12">
            {/* 竖线 */}
            <div
              className="absolute left-3 md:left-5 top-0 bottom-0"
              style={{
                borderLeft: "3px dashed var(--border)",
              }}
            />

            {[
              {
                year: "1995",
                title: "无模块时代",
                desc: "所有 JS 代码共用全局作用域，通过 script 标签顺序加载，变量冲突频发。",
                color: "#94a3b8",
              },
              {
                year: "2009",
                title: "CommonJS 诞生",
                desc: "Ryan Dahl 创建 Node.js，采用 CommonJS 规范。服务端 JS 终于有了模块系统。",
                color: "var(--tertiary)",
              },
              {
                year: "2010",
                title: "AMD & RequireJS",
                desc: "浏览器端异步模块方案出现，define() / require() 在前端流行。",
                color: "var(--secondary)",
              },
              {
                year: "2013",
                title: "UMD 统一方案",
                desc: "Universal Module Definition 兼容 CJS + AMD + 全局变量，成为库作者的过渡选择。",
                color: "var(--accent)",
              },
              {
                year: "2015",
                title: "ES6 Modules 标准化 🎉",
                desc: "ES2015 正式引入 import / export 关键字，JS 模块化终于有了语言级别的标准。",
                color: "var(--quaternary)",
              },
              {
                year: "2018+",
                title: "ESM 成为主流",
                desc: "Node.js v12+ 支持 ESM，浏览器原生支持 <script type=\"module\">，打包器全面适配。",
                color: "var(--quaternary)",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="animate-slide relative mb-8 flex items-start gap-4"
                style={{
                  animationDelay: showTimeline ? `${i * 0.12}s` : "0s",
                  opacity: showTimeline ? 1 : 0,
                  transform: showTimeline ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease ${i * 0.12}s`,
                }}
              >
                {/* 时间点 */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full border-3 border-[var(--foreground)] flex items-center justify-center text-[11px] font-bold"
                  style={{
                    background: item.color,
                    color: item.color === "#94a3b8" ? "#fff" : "var(--foreground)",
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                    zIndex: 1,
                    borderWidth: 3,
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {item.year.slice(-2)}
                </div>

                {/* 内容卡片 */}
                <div className="topic-card flex-1" style={{ padding: "1rem 1.25rem" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-bold"
                      style={{
                        color: item.color,
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <h4
                    className="font-bold mb-1"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "1.1rem",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-sm" style={{ color: "#64748b", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════
            6. 选型指南
        ══════════════════════════════════ */}
        <section id="guide" className="container pb-12">
          <div className="animate-slide flex items-center gap-4 mb-8">
            <IconBox icon={Lightbulb} bg="var(--tertiary)" size={52} />
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{
                  color: "var(--tertiary)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Chapter 04
              </span>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 800,
                }}
              >
                选型指南：到底该用哪个？
              </h2>
            </div>
          </div>

          {/* 推荐策略卡片 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* 推荐 ESM */}
            <div
              className="animate-slide topic-card relative overflow-hidden"
              style={{ animationDelay: "0.1s" }}
            >
              {/* 装饰角标 */}
              <div
                className="absolute top-0 right-0 px-3 py-1 text-xs font-bold border-b-2 border-l-2 border-[var(--foreground)]"
                style={{
                  background: "var(--quaternary)",
                  fontFamily: "'Outfit', sans-serif",
                  borderRadius: "0 12px 0 8px",
                }}
              >
                ✅ 推荐
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center"
                  style={{
                    background: "var(--secondary)",
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                  }}
                >
                  <Zap size={20} strokeWidth={2.5} color="#fff" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.3rem",
                  }}
                >
                  新项目 → 用 ESM
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm" style={{ lineHeight: 1.7 }}>
                {[
                  "支持 Tree Shaking，打包体积更小",
                  "浏览器原生支持，无需 bundler 也能跑",
                  "静态结构利于 IDE 自动补全和类型检查",
                  "是 TC39 官方标准，未来唯一方向",
                  "Top-level await 支持",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2
                      size={18}
                      strokeWidth={2.5}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "var(--quaternary)" }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CJS 仍需了解 */}
            <div
              className="animate-slide topic-card relative overflow-hidden"
              style={{ animationDelay: "0.2s" }}
            >
              <div
                className="absolute top-0 right-0 px-3 py-1 text-xs font-bold border-b-2 border-l-2 border-[var(--foreground)]"
                style={{
                  background: "var(--tertiary)",
                  fontFamily: "'Outfit', sans-serif",
                  borderRadius: "0 12px 0 8px",
                }}
              >
                ⚠️ 仍需了解
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center"
                  style={{
                    background: "var(--tertiary)",
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                  }}
                >
                  <Package size={20} strokeWidth={2.5} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.3rem",
                  }}
                >
                  遗留项目 → CJS 不可避免
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm" style={{ lineHeight: 1.7 }}>
                {[
                  "npm 上大量包仍是 CommonJS 格式",
                  "Node.js 内部许多 API 仍用 CJS 导出",
                  "一些工具链（Jest、某些 ESLint 插件）对 ESM 支持不完善",
                  "CommonJS 更容易理解「执行时发生了什么」",
                  "在 __dirname、__filename 有用的场景下原生更方便",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle
                      size={18}
                      strokeWidth={2.5}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "var(--tertiary)" }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 快速决策流程图 */}
          <div
            className="animate-slide topic-card mb-8"
            style={{ animationDelay: "0.3s" }}
          >
            <h3
              className="flex items-center gap-2 mb-6"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "1.2rem",
              }}
            >
              <Workflow size={22} strokeWidth={2.5} />
              快速决策：3 秒选模块系统
            </h3>
            <div className="flex flex-col items-center gap-4">
              {/* 起点 */}
              <div
                className="px-6 py-3 rounded-2xl border-2 border-[var(--foreground)] font-bold text-sm"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                你要开始一个新项目吗？
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* YES */}
                <div className="flex flex-col items-center gap-2">
                  <div className="text-sm font-bold" style={{ color: "var(--quaternary)" }}>
                    YES ↓
                  </div>
                  <div
                    className="px-5 py-3 rounded-xl border-2 border-[var(--foreground)] font-bold text-sm"
                    style={{
                      background: "var(--quaternary)",
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    ✅ 用 ESM，毫不犹豫
                  </div>
                </div>
                {/* NO */}
                <div className="flex flex-col items-center gap-2">
                  <div className="text-sm font-bold" style={{ color: "var(--tertiary)" }}>
                    NO ↓
                  </div>
                  <div
                    className="px-5 py-3 rounded-xl border-2 border-[var(--foreground)] font-bold text-sm"
                    style={{
                      background: "var(--tertiary)",
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    🔧 保持现有 CJS，逐步迁移到 ESM
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── CJS ↔ ESM 互操作 ── */}
          <div
            className="animate-slide topic-card"
            style={{ animationDelay: "0.4s" }}
          >
            <h3
              className="flex items-center gap-2 mb-4"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "1.2rem",
              }}
            >
              <ToggleLeft size={22} strokeWidth={2.5} />
              互操作：在 ESM 中使用 CJS 包
            </h3>
            <div
              className="code-block"
              style={{ fontSize: "0.82rem" }}
            >
              <CopyButton
                text={`// ✅ ESM 可以直接 import CJS 包（Node.js 自动包装默认导出）
import express from 'express';
import _ from 'lodash';

// ✅ 使用 createRequire 在 ESM 中使用 require()
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const data = require('./legacy-config.json');  // 读 JSON 方便

// ❌ 不能在 CJS 中直接 require() 一个 .mjs 文件
// 但可以用 dynamic import()：
async function loadESM() {
    const { default: foo } = await import('./my-module.mjs');
}`}
              />
              <code>
                <span className="cm">{"// ✅ ESM 可以直接 import CJS 包（Node.js 自动包装默认导出）"}</span>
                {"\n"}
                <span className="kw">import</span> express <span className="kw">from</span>{" "}
                <span className="str">'express'</span>;
                {"\n"}
                <span className="kw">import</span> _ <span className="kw">from</span>{" "}
                <span className="str">'lodash'</span>;
                {"\n\n"}
                <span className="cm">{"// ✅ 使用 createRequire 在 ESM 中使用 require()"}</span>
                {"\n"}
                <span className="kw">import</span> {"{ createRequire }"} <span className="kw">from</span>{" "}
                <span className="str">'node:module'</span>;
                {"\n"}
                <span className="kw">const</span>{" "}
                require <span className="op">=</span>{" "}
                <span className="fn">createRequire</span>(<span className="type">import</span>.meta.url);
                {"\n"}
                <span className="kw">const</span>{" "}
                data <span className="op">=</span>{" "}
                <span className="fn">require</span>(<span className="str">'./legacy-config.json'</span>);{"  "}
                <span className="cm">{"// 读 JSON 方便"}</span>
                {"\n\n"}
                <span className="err">{"// ❌ 不能在 CJS 中直接 require() 一个 .mjs 文件"}</span>
                {"\n"}
                <span className="cm">{"// 但可以用 dynamic import()："}</span>
                {"\n"}
                <span className="kw">async function</span>{" "}
                <span className="fn">loadESM</span>() {"{"}
                {"\n"}
                {"    "}<span className="kw">const</span> {"{ "}<span className="kw">default</span>: foo{" }"}{" "}
                <span className="op">=</span> <span className="kw">await</span>{" "}
                <span className="fn">import</span>(<span className="str">'./my-module.mjs'</span>);
                {"\n"}{"}"}
              </code>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            7. 速查卡片 (Cheat Sheet)
        ══════════════════════════════════ */}
        <section className="container pb-12">
          <div className="animate-slide flex items-center gap-4 mb-8">
            <IconBox icon={Code2} bg="var(--secondary)" size={52} />
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{
                  color: "var(--secondary)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                速查表
              </span>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 800,
                }}
              >
                CommonJS vs ESM 速查卡
              </h2>
            </div>
          </div>

          {/* 标签切换 */}
          <div className="flex gap-3 mb-6">
            {[
              { key: "cjs" as const, label: "CommonJS", color: "var(--tertiary)" },
              { key: "esm" as const, label: "ES Modules", color: "var(--secondary)" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-5 py-2.5 rounded-xl border-2 border-[var(--foreground)] text-sm font-bold transition-all"
                style={{
                  background: activeTab === tab.key ? tab.color : "var(--card)",
                  color: activeTab === tab.key ? (tab.key === "cjs" ? "var(--foreground)" : "#fff") : "var(--foreground)",
                  boxShadow:
                    activeTab === tab.key
                      ? "4px 4px 0px 0px var(--foreground)"
                      : "2px 2px 0px 0px var(--foreground)",
                  fontFamily: "'Outfit', sans-serif",
                  transform: activeTab === tab.key ? "translateY(-2px)" : "none",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="topic-card" style={{ overflow: "hidden" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ minWidth: 500 }}>
                <thead>
                  <tr
                    style={{
                      background:
                        activeTab === "cjs" ? "var(--tertiary)" : "var(--secondary)",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    <th className="px-4 py-3 text-left font-bold border-2 border-[var(--foreground)]">
                      场景
                    </th>
                    <th className="px-4 py-3 text-left font-bold border-2 border-[var(--foreground)]">
                      代码
                    </th>
                    <th className="px-4 py-3 text-left font-bold border-2 border-[var(--foreground)]">
                      备注
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === "cjs"
                    ? [
                        ["默认导出", "module.exports = value", "覆盖整个 exports 对象"],
                        ["命名导出", "exports.name = value", "别直接 exports = ..."],
                        ["默认导入", "const x = require('./x')", "返回整个 exports"],
                        ["解构导入", "const { a, b } = require('./x')", "只是语法糖"],
                        ["动态导入", "require(variable)", "✅ 可以使用变量"],
                        ["JSON 导入", "require('./data.json')", "Node 内置支持"],
                        ["条件导入", "if (cond) require('./x')", "✅ 完全合法"],
                      ]
                    : [
                        ["默认导出", "export default value", "每个模块只能有一个"],
                        ["命名导出", "export { a, b }", "可以多个"],
                        ["默认导入", "import x from './x'", "名字可以自取"],
                        ["命名导入", "import { a, b } from './x'", "名字必须匹配"],
                        ["整体导入", "import * as ns from './x'", "命名空间对象"],
                        ["动态导入", "const m = await import(url)", "返回 Promise"],
                        ["重新导出", "export { a } from './x'", "转发导出"],
                      ]
                  ).map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.02)",
                      }}
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="px-4 py-3 border-2 border-[var(--border)]"
                          style={{
                            fontFamily: j === 1 ? "'JetBrains Mono', monospace" : "inherit",
                            fontSize: j === 1 ? "0.8rem" : "inherit",
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            总结
        ══════════════════════════════════ */}
        <section className="container pb-12">
          <div
            className="animate-slide topic-card relative overflow-hidden"
            style={{
              borderColor: "var(--accent)",
              borderWidth: 3,
              animationDelay: "0.1s",
            }}
          >
            {/* 装饰 blob */}
            <div
              className="blob absolute"
              style={{
                width: 200,
                height: 200,
                background: "var(--accent)",
                opacity: 0.06,
                top: -60,
                right: -40,
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  <Lightbulb size={24} strokeWidth={2.5} color="#fff" />
                </div>
                <h2
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                  }}
                >
                  一句话总结
                </h2>
              </div>

              <blockquote
                className="pl-5 py-3 mb-4"
                style={{
                  borderLeft: "4px solid var(--accent)",
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  lineHeight: 1.7,
                  color: "var(--foreground)",
                }}
              >
                <span style={{ color: "var(--tertiary)", fontWeight: 800 }}>CommonJS</span> 是
                Node.js 生态的「遗产」，运行时同步加载、拷贝值导出；
                <span style={{ color: "var(--secondary)", fontWeight: 800 }}> ESM</span> 是
                JavaScript 的「官方标准」，编译时静态解析、活绑定导出。
                <strong>新项目请无条件选择 ESM</strong>，但务必理解 CJS，因为你绕不开它。
              </blockquote>

              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-[var(--foreground)] text-sm font-bold"
                style={{
                  background: "var(--card)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                <Zap size={16} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
                记住这个顺序：<span style={{ color: "var(--quaternary)" }}>ESM 优先</span>
                ，CJS 兼容，逐步迁移。
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════
   子组件：交互式实验场 — 循环依赖演示
   ═══════════════════════════════════════ */
function Playground() {
  const [mode, setMode] = useState<"cjs" | "esm">("cjs");
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const cjsSteps = [
    {
      line: '开始执行 a.js',
      detail: 'Node 进入 a.js 模块',
      highlight: "a",
    },
    {
      line: 'a.js: exports.done = false',
      detail: '设置 a 的初始导出值 { done: false }',
      highlight: "a",
    },
    {
      line: 'a.js: require("./b")',
      detail: '阻塞！转去加载 b.js',
      highlight: "b",
    },
    {
      line: 'b.js: exports.done = false',
      detail: '设置 b 的初始导出值 { done: false }',
      highlight: "b",
    },
    {
      line: 'b.js: require("./a")',
      detail: '⚠️ a.js 正在加载中！返回已执行部分：{ done: false }',
      highlight: "warn",
    },
    {
      line: 'b.js: console.log(b.a.done) → false',
      detail: '拿到的是 a 的「未完成」导出',
      highlight: "b",
    },
    {
      line: 'b.js: exports.done = true',
      detail: 'b 完成执行，导出 { done: true }',
      highlight: "b",
    },
    {
      line: 'a.js: console.log(b.done) → true',
      detail: 'b 已经执行完毕，拿到完整导出',
      highlight: "a",
    },
    {
      line: 'a.js: exports.done = true',
      detail: 'a 完成执行',
      highlight: "done",
    },
  ];

  const esmSteps = [
    {
      line: '构建阶段：解析 a.mjs 和 b.mjs 的依赖图',
      detail: '发现循环依赖 a → b → a',
      highlight: "build",
    },
    {
      line: '实例化：为 a.done 和 b.done 分配内存空间',
      detail: '此时 a.done 和 b.done 都是 undefined（TDZ）',
      highlight: "instant",
    },
    {
      line: '将 b 中的 import { done } from "./a" 绑定到 a.done 的内存',
      detail: '活绑定！不是拷贝',
      highlight: "instant",
    },
    {
      line: '求值：执行 b.mjs',
      detail: 'console.log(a.done) → 暂时 undefined（a 还没执行）',
      highlight: "b",
    },
    {
      line: '求值：执行 a.mjs',
      detail: 'a.done = true → 由于活绑定，b 中的引用也指向 true',
      highlight: "a",
    },
    {
      line: '完成！b.mjs 中后续代码再次访问 a.done → true',
      detail: '活绑定保证了最终一致性',
      highlight: "done",
    },
  ];

  const steps = mode === "cjs" ? cjsSteps : esmSteps;

  useEffect(() => {
    if (!isPlaying) return;
    if (step >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => setStep((s) => s + 1), 1500);
    return () => clearTimeout(timer);
  }, [step, isPlaying, steps.length]);

  const handlePlay = () => {
    setStep(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="animate-slide topic-card" style={{ animationDelay: "0.2s" }}>
      {/* 模式切换 */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        {(["cjs", "esm"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setStep(0);
              setIsPlaying(false);
            }}
            className="px-4 py-2 rounded-xl border-2 border-[var(--foreground)] text-sm font-bold transition-all"
            style={{
              background: mode === m
                ? m === "cjs" ? "var(--tertiary)" : "var(--secondary)"
                : "var(--card)",
              color: mode === m && m === "esm" ? "#fff" : "var(--foreground)",
              boxShadow: mode === m ? "4px 4px 0px 0px var(--foreground)" : "2px 2px 0px 0px var(--foreground)",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {m === "cjs" ? "CommonJS" : "ES Modules"}
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-[var(--foreground)] text-sm font-bold transition-all"
          style={{
            background: "var(--quaternary)",
            boxShadow: "3px 3px 0px 0px var(--foreground)",
            fontFamily: "'Outfit', sans-serif",
            opacity: isPlaying ? 0.6 : 1,
          }}
        >
          <Play size={14} strokeWidth={2.5} />
          {isPlaying ? "演示中..." : "播放演示"}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-[var(--foreground)] text-sm font-bold transition-all"
          style={{
            background: "var(--card)",
            boxShadow: "2px 2px 0px 0px var(--foreground)",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          <RotateCcw size={14} strokeWidth={2.5} />
        </button>
      </div>

      {/* 场景说明 */}
      <div
        className="mb-4 p-3 rounded-xl border-2 border-dashed text-sm"
        style={{
          borderColor: "var(--accent)",
          background: "rgba(139, 92, 246, 0.05)",
        }}
      >
        <strong>场景：</strong>
        {mode === "cjs"
          ? 'a.js 导入 b.js，b.js 又导入 a.js（循环依赖）。观察 Node.js 如何处理这种"部分完成"的导出。'
          : 'a.mjs 和 b.mjs 互相导入。观察 ESM 的三阶段加载如何通过活绑定解决循环依赖。'}
      </div>

      {/* 步骤展示 */}
      <div className="space-y-2">
        {steps.map((s, i) => {
          const isActive = i <= step;
          const isCurrent = i === step;
          const borderColor =
            s.highlight === "warn"
              ? "var(--tertiary)"
              : s.highlight === "done"
                ? "var(--quaternary)"
                : s.highlight === "a" || s.highlight === "build"
                  ? "var(--accent)"
                  : s.highlight === "b" || s.highlight === "instant"
                    ? "var(--secondary)"
                    : "var(--border)";

          return (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl border-2 transition-all duration-300"
              style={{
                borderColor: isActive ? borderColor : "var(--border)",
                background: isCurrent
                  ? `${borderColor}15`
                  : isActive
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(0,0,0,0.02)",
                opacity: isActive ? 1 : 0.4,
                transform: isCurrent ? "scale(1.01)" : "scale(1)",
              }}
            >
              <div
                className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-[var(--foreground)] flex items-center justify-center text-[11px] font-bold"
                style={{
                  background: isActive ? borderColor : "var(--border)",
                  color: isActive ? "#fff" : "#999",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="font-bold text-sm"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    opacity: isActive ? 1 : 0.5,
                  }}
                >
                  {/* 如果有 → 符号，且还未运行到这一步，则只显示前半部分 */}
                  {!isActive ? s.line.split("→")[0] : s.line}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{
                    color: "#94a3b8",
                    opacity: isActive ? 1 : 0.5,
                  }}
                >
                  {/* 只有激活步才显示详情 */}
                  {isActive ? s.detail : "等待执行..."}
                </div>
              </div>
              {isCurrent && (
                <div
                  className="flex-shrink-0 w-2 h-2 rounded-full animate-pulse-ring"
                  style={{ background: borderColor }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 进度条 */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full overflow-hidden border-2 border-[var(--foreground)]" style={{ background: "var(--border)" }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${((step + 1) / steps.length) * 100}%`,
              background: mode === "cjs" ? "var(--tertiary)" : "var(--secondary)",
            }}
          />
        </div>
        <span
          className="text-xs font-bold"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {step + 1}/{steps.length}
        </span>
      </div>
    </div>
  );
}