// app/topics/ast-babel/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  TreePine,
  Code2,
  ArrowRight,
  Braces,
  Layers,
  GitBranch,
  Zap,
  BookOpen,
  Cpu,
  Play,
  RotateCcw,
  ChevronRight,
  Sparkles,
  Target,
  Workflow,
  Eye,
  Pen,
  Package,
  Lightbulb,
} from "lucide-react";

/* ─── 小型交互：AST 节点浏览器 ─── */
const AST_NODES = [
  {
    id: "program",
    label: "Program",
    color: "var(--accent)",
    x: 0,
    y: 0,
    children: ["variable"],
  },
  {
    id: "variable",
    label: "VariableDeclaration",
    color: "var(--secondary)",
    x: -1,
    y: 1,
    children: ["declarator"],
  },
  {
    id: "declarator",
    label: "VariableDeclarator",
    color: "var(--tertiary)",
    x: -1.5,
    y: 2,
    children: ["identifier", "literal"],
  },
  {
    id: "identifier",
    label: "Identifier: greeting",
    color: "var(--quaternary)",
    x: -2.5,
    y: 3,
    children: [],
  },
  {
    id: "literal",
    label: 'StringLiteral: "hello"',
    color: "#60A5FA",
    x: -0.5,
    y: 3,
    children: [],
  },
];

const CODE_SAMPLES = [
  {
    label: "输入代码",
    code: `const greeting = "hello";`,
  },
  {
    label: "Parse → AST",
    code: `{
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    kind: "const",
    declarations: [{
      type: "VariableDeclarator",
      id: { type: "Identifier", name: "greeting" },
      init: {
        type: "StringLiteral",
        value: "hello"
      }
    }]
  }]
}`,
  },
  {
    label: "Transform",
    code: `{
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    kind: "var",        // ← const 转为 var
    declarations: [{
      type: "VariableDeclarator",
      id: { type: "Identifier", name: "greeting" },
      init: {
        type: "StringLiteral",
        value: "hello"
      }
    }]
  }]
}`,
  },
  {
    label: "Generate → 输出",
    code: `var greeting = "hello";`,
  },
];

/* ─── Babel 插件示例 ─── */
const BABEL_PLUGINS = [
  {
    name: "@babel/plugin-transform-arrow-functions",
    input: `const add = (a, b) => a + b;`,
    output: `var add = function(a, b) { return a + b; };`,
    icon: Zap,
    color: "var(--tertiary)",
  },
  {
    name: "@babel/plugin-transform-template-literals",
    input: "const msg = `Hello ${name}!`;",
    output: 'var msg = "Hello ".concat(name, "!");',
    icon: Braces,
    color: "var(--secondary)",
  },
  {
    name: "@babel/plugin-transform-classes",
    input: `class Animal {
  constructor(name) {
    this.name = name;
  }
}`,
    output: `function Animal(name) {
  this.name = name;
}`,
    icon: Layers,
    color: "var(--accent)",
  },
];

/* ─── 三阶段管道 ─── */
const PIPELINE_STAGES = [
  {
    title: "Parse",
    subtitle: "解析",
    description: "将源代码字符串转换为 AST 语法树",
    steps: ["词法分析 (Tokenize)", "语法分析 (Parse)"],
    icon: Eye,
    color: "var(--accent)",
    bgColor: "rgba(139,92,246,0.1)",
  },
  {
    title: "Transform",
    subtitle: "转换",
    description: "遍历 AST，应用插件进行代码转换",
    steps: ["Visitor 模式遍历", "插件链式处理"],
    icon: Pen,
    color: "var(--secondary)",
    bgColor: "rgba(244,114,182,0.1)",
  },
  {
    title: "Generate",
    subtitle: "生成",
    description: "将转换后的 AST 重新生成目标代码字符串",
    steps: ["代码拼接", "Source Map 生成"],
    icon: Code2,
    color: "var(--quaternary)",
    bgColor: "rgba(52,211,153,0.1)",
  },
];

/* ─── 概念卡片 ─── */
const CONCEPTS = [
  {
    title: "什么是 AST？",
    icon: TreePine,
    color: "var(--accent)",
    content:
      "抽象语法树 (Abstract Syntax Tree) 是源代码结构的树形表示。每个节点代表源码中的一个结构——变量声明、函数调用、表达式等。编译器、转译器、Lint 工具、代码压缩器都依赖 AST 来理解代码。",
  },
  {
    title: "为什么需要 AST？",
    icon: Lightbulb,
    color: "var(--tertiary)",
    content:
      '计算机无法直接理解 "const x = 1" 这样的字符串含义。AST 将代码结构化，让程序能够：分析代码结构、检测错误、进行代码转换、自动生成代码。它是程序理解程序的桥梁。',
  },
  {
    title: "Babel 是什么？",
    icon: Package,
    color: "var(--secondary)",
    content:
      "Babel 是一个 JavaScript 编译器（转译器），主要用于将新版 ES6+ 语法转换为向后兼容的 ES5 代码。它由 Parse → Transform → Generate 三个核心阶段组成，并通过插件系统实现高度可扩展的代码转换。",
  },
  {
    title: "Babel 的核心价值",
    icon: Target,
    color: "var(--quaternary)",
    content:
      "Babel 不仅支持语法转换（Syntax Transform），还能通过 Polyfill 补充新的内置 API（如 Promise、Map），通过插件实现代码优化、自动国际化、性能追踪等。它是现代前端工程化的基石之一。",
  },
];

/* ══════════════════════════════════════════════ */
/*                    PAGE                       */
/* ══════════════════════════════════════════════ */
export default function ASTBabelPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [pluginIdx, setPluginIdx] = useState(0);
  const [activeNode, setActiveNode] = useState("program");
  const [showOutput, setShowOutput] = useState(false);

  // 自动播放管线动画
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const selectedNode = AST_NODES.find((n) => n.id === activeNode);

  return (
    <div
      className="bg-dot-grid min-h-screen pb-24"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* ────────────── HERO ────────────── */}
      <section className="container pt-16 pb-12 md:pt-24 md:pb-16 relative">
        {/* 装饰性 Blob */}
        <div
          className="absolute -top-16 -right-24 w-72 h-72 opacity-20 pointer-events-none hidden md:block"
          style={{
            background: "var(--accent)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        <div
          className="absolute bottom-0 -left-16 w-48 h-48 opacity-15 pointer-events-none hidden md:block"
          style={{
            background: "var(--tertiary)",
            borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
          }}
        />

        {/* 标签 */}
        <div className="animate-pop flex items-center gap-2 mb-6">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{
              background: "var(--accent)",
              color: "#fff",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-full)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <TreePine size={14} strokeWidth={2.5} />
            编译原理
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{
              background: "var(--tertiary)",
              color: "var(--foreground)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-full)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <Package size={14} strokeWidth={2.5} />
            前端工具链
          </span>
        </div>

        {/* 主标题 */}
        <h1
          className="animate-pop font-extrabold leading-none mb-6"
          style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "var(--foreground)",
          }}
        >
          AST 语法树
          <span className="mx-3" style={{ color: "var(--accent)" }}>
            &
          </span>
          <br className="hidden md:block" />
          <span style={{ color: "var(--secondary)" }}>Babel</span>
        </h1>

        <p
          className="animate-slide max-w-2xl text-lg md:text-xl leading-relaxed"
          style={{
            color: "var(--foreground)",
            opacity: 0.75,
            animationDelay: "0.15s",
          }}
        >
          理解编译器如何「看懂」你的代码，以及 Babel 如何将现代 JavaScript
          转化为任何浏览器都能运行的版本。
        </p>

        {/* 关键数字 */}
        <div
          className="animate-slide mt-10 flex flex-wrap gap-4"
          style={{ animationDelay: "0.3s" }}
        >
          {[
            { num: "3", label: "核心阶段", color: "var(--accent)" },
            { num: "200+", label: "Babel 插件", color: "var(--secondary)" },
            { num: "100%", label: "前端覆盖", color: "var(--tertiary)" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 px-5 py-3"
              style={{
                background: "var(--card)",
                border: "2px solid var(--foreground)",
                borderRadius: "var(--radius-md)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <span
                className="text-3xl font-extrabold"
                style={{ fontFamily: '"Outfit", sans-serif', color: s.color }}
              >
                {s.num}
              </span>
              <span
                className="text-sm font-bold uppercase tracking-wide"
                style={{ color: "var(--foreground)", opacity: 0.6 }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────── 概念网格 ────────────── */}
      <section className="container mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONCEPTS.map((c, i) => (
            <div
              key={c.title}
              className="animate-slide topic-card p-6 md:p-8 relative overflow-hidden"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* 角标装饰 */}
              <div
                className="absolute -top-2 -right-2 w-16 h-16"
                style={{
                  background: c.color,
                  opacity: 0.12,
                  borderRadius: "0 0 0 100%",
                }}
              />
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full"
                  style={{
                    background: c.color,
                    border: "2px solid var(--foreground)",
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                  }}
                >
                  <c.icon size={22} color="#fff" strokeWidth={2.5} />
                </div>
                <div>
                  <h3
                    className="text-xl font-extrabold mb-2"
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      color: "var(--foreground)",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{ color: "var(--foreground)", opacity: 0.7 }}
                  >
                    {c.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────── 可视化 AST 探索器 ────────────── */}
      <section className="container mt-20">
        <SectionHeader
          icon={TreePine}
          color="var(--accent)"
          title="AST 节点探索器"
          subtitle="点击节点，查看每种 AST 节点的类型与关系"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* 左：源码 */}
          <div
            className="animate-slide topic-card overflow-hidden"
            style={{ animationDelay: "0.1s" }}
          >
            <div
              className="px-5 py-3 font-bold text-sm uppercase tracking-wider flex items-center gap-2"
              style={{
                borderBottom: "2px solid var(--foreground)",
                background: "rgba(139,92,246,0.06)",
                fontFamily: '"Outfit", sans-serif',
              }}
            >
              <Code2 size={16} strokeWidth={2.5} />
              源代码
            </div>
            <pre
              className="p-5 text-sm md:text-base leading-relaxed overflow-x-auto"
              style={{ fontFamily: "monospace", color: "var(--foreground)" }}
            >
              <code>
                <span style={{ color: "var(--accent)" }}>const</span>{" "}
                <span style={{ color: "var(--quaternary)" }}>greeting</span>{" "}
                <span style={{ opacity: 0.5 }}>=</span>{" "}
                <span style={{ color: "var(--tertiary)" }}>
                  &quot;hello&quot;
                </span>
                <span style={{ opacity: 0.5 }}>;</span>
              </code>
            </pre>
          </div>

          {/* 右：AST 树交互 */}
          <div
            className="animate-slide topic-card overflow-hidden"
            style={{ animationDelay: "0.2s" }}
          >
            <div
              className="px-5 py-3 font-bold text-sm uppercase tracking-wider flex items-center gap-2"
              style={{
                borderBottom: "2px solid var(--foreground)",
                background: "rgba(244,114,182,0.06)",
                fontFamily: '"Outfit", sans-serif',
              }}
            >
              <GitBranch size={16} strokeWidth={2.5} />
              AST 结构
            </div>

            <div className="p-5 flex flex-wrap gap-2">
              {AST_NODES.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  className="px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-200"
                  style={{
                    background:
                      activeNode === node.id ? node.color : "var(--card)",
                    color:
                      activeNode === node.id ? "#fff" : "var(--foreground)",
                    border: `2px solid ${activeNode === node.id ? node.color : "var(--border)"}`,
                    boxShadow:
                      activeNode === node.id
                        ? `3px 3px 0px 0px var(--foreground)`
                        : "none",
                    transform:
                      activeNode === node.id ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  {node.label}
                </button>
              ))}
            </div>

            {/* 节点详情 */}
            {selectedNode && (
              <div className="px-5 pb-5">
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: `${selectedNode.color}15`,
                    border: `2px dashed ${selectedNode.color}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: selectedNode.color }}
                    />
                    <span
                      className="font-extrabold text-lg"
                      style={{
                        fontFamily: '"Outfit", sans-serif',
                        color: selectedNode.color,
                      }}
                    >
                      {selectedNode.label}
                    </span>
                  </div>
                  <p className="text-sm" style={{ opacity: 0.7 }}>
                    <strong>type:</strong> &quot;
                    {selectedNode.label.split(":")[0].trim()}&quot;
                    {selectedNode.children.length > 0 && (
                      <> → 子节点: {selectedNode.children.join(", ")}</>
                    )}
                  </p>
                  <div
                    className="flex items-center gap-1 mt-3 text-xs font-bold"
                    style={{ color: selectedNode.color }}
                  >
                    <ArrowRight size={12} strokeWidth={2.5} />
                    {selectedNode.children.length === 0
                      ? "叶子节点 (无子节点)"
                      : `${selectedNode.children.length} 个子节点`}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ────────────── 三阶段管线 ────────────── */}
      <section className="container mt-24">
        <SectionHeader
          icon={Workflow}
          color="var(--secondary)"
          title="Babel 三阶段管线"
          subtitle="Parse → Transform → Generate，每一阶段都至关重要"
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PIPELINE_STAGES.map((stage, i) => (
            <div
              key={stage.title}
              className="animate-slide topic-card p-6 relative overflow-hidden group"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* 顶部彩色条 */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ background: stage.color }}
              />

              {/* 编号 */}
              <div
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full font-extrabold text-lg"
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  background: stage.bgColor,
                  color: stage.color,
                  border: `2px solid ${stage.color}`,
                }}
              >
                {i + 1}
              </div>

              <div
                className="w-14 h-14 flex items-center justify-center rounded-2xl mb-4"
                style={{
                  background: stage.bgColor,
                  border: `2px solid var(--foreground)`,
                  boxShadow: `4px 4px 0px 0px ${stage.color}`,
                }}
              >
                <stage.icon size={28} strokeWidth={2.5} color={stage.color} />
              </div>

              <h3
                className="text-2xl font-extrabold"
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  color: stage.color,
                }}
              >
                {stage.title}
              </h3>
              <p
                className="text-sm font-bold mb-3"
                style={{ color: "var(--foreground)", opacity: 0.5 }}
              >
                {stage.subtitle}
              </p>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ opacity: 0.7 }}
              >
                {stage.description}
              </p>

              <ul className="space-y-2">
                {stage.steps.map((step) => (
                  <li
                    key={step}
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
                    <ChevronRight
                      size={14}
                      strokeWidth={2.5}
                      color={stage.color}
                    />
                    {step}
                  </li>
                ))}
              </ul>

              {/* 箭头连接（非最后一个） */}
              {i < 2 && (
                <div
                  className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full"
                  style={{
                    background: "var(--card)",
                    border: "2px solid var(--foreground)",
                  }}
                >
                  <ArrowRight size={16} strokeWidth={2.5} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ────────────── 代码转换动画演示 ────────────── */}
      <section className="container mt-24">
        <SectionHeader
          icon={Play}
          color="var(--tertiary)"
          title="代码转换全流程"
          subtitle="点击步骤或等待自动播放，观察代码在每个阶段的变化"
        />

        {/* 步骤导航 */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {CODE_SAMPLES.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActiveStep(i)}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-full transition-all duration-200"
              style={{
                background:
                  activeStep === i ? "var(--tertiary)" : "var(--card)",
                color:
                  activeStep === i ? "var(--foreground)" : "var(--foreground)",
                border: "2px solid var(--foreground)",
                boxShadow:
                  activeStep === i
                    ? "4px 4px 0px 0px var(--foreground)"
                    : "2px 2px 0px 0px var(--border)",
                transform: activeStep === i ? "translateY(-2px)" : "none",
              }}
            >
              <span
                className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-extrabold"
                style={{
                  background:
                    activeStep === i ? "var(--foreground)" : "var(--border)",
                  color:
                    activeStep === i ? "var(--tertiary)" : "var(--foreground)",
                }}
              >
                {i + 1}
              </span>
              {s.label}
            </button>
          ))}
        </div>

        {/* 代码展示 */}
        <div
          className="animate-slide mt-6 topic-card overflow-hidden"
          style={{ animationDelay: "0.1s" }}
        >
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{
              borderBottom: "2px solid var(--foreground)",
              background: "rgba(251,191,36,0.06)",
            }}
          >
            <span
              className="font-bold text-sm uppercase tracking-wider flex items-center gap-2"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              <Sparkles size={16} strokeWidth={2.5} color="var(--tertiary)" />
              {CODE_SAMPLES[activeStep].label}
            </span>
            <div className="flex gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "var(--secondary)" }}
              />
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "var(--tertiary)" }}
              />
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "var(--quaternary)" }}
              />
            </div>
          </div>
          <pre
            className="p-6 text-sm md:text-base leading-relaxed overflow-x-auto"
            style={{
              fontFamily: "monospace",
              color: "var(--foreground)",
              minHeight: "120px",
            }}
          >
            <code>{CODE_SAMPLES[activeStep].code}</code>
          </pre>
        </div>
      </section>

      {/* ────────────── Babel 插件实验场 ────────────── */}
      <section className="container mt-24">
        <SectionHeader
          icon={Zap}
          color="var(--quaternary)"
          title="Babel 插件实验场"
          subtitle="体验不同 Babel 插件如何将现代语法转译为兼容代码"
        />

        <div className="mt-8 flex flex-wrap gap-3 justify-center mb-6">
          {BABEL_PLUGINS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => {
                setPluginIdx(i);
                setShowOutput(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl transition-all duration-200"
              style={{
                background: pluginIdx === i ? p.color : "var(--card)",
                color: pluginIdx === i ? "#fff" : "var(--foreground)",
                border: "2px solid var(--foreground)",
                boxShadow:
                  pluginIdx === i
                    ? "4px 4px 0px 0px var(--foreground)"
                    : "2px 2px 0px 0px var(--border)",
              }}
            >
              <p.icon size={16} strokeWidth={2.5} />
              插件 {i + 1}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 输入 */}
          <div
            className="animate-slide topic-card overflow-hidden"
            style={{ animationDelay: "0.05s" }}
          >
            <div
              className="px-5 py-3 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              style={{
                borderBottom: "2px solid var(--foreground)",
                background: `${BABEL_PLUGINS[pluginIdx].color}10`,
                fontFamily: '"Outfit", sans-serif',
              }}
            >
              <Code2 size={14} strokeWidth={2.5} />
              输入 (ES6+)
            </div>
            <pre
              className="p-5 text-sm leading-relaxed overflow-x-auto"
              style={{ fontFamily: "monospace", color: "var(--foreground)" }}
            >
              <code>{BABEL_PLUGINS[pluginIdx].input}</code>
            </pre>
          </div>

          {/* 输出 */}
          <div
            className="animate-slide topic-card overflow-hidden relative"
            style={{ animationDelay: "0.15s" }}
          >
            <div
              className="px-5 py-3 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              style={{
                borderBottom: "2px solid var(--foreground)",
                background: "rgba(52,211,153,0.08)",
                fontFamily: '"Outfit", sans-serif',
              }}
            >
              <Sparkles size={14} strokeWidth={2.5} />
              输出 (ES5) — {BABEL_PLUGINS[pluginIdx].name.split("/").pop()}
            </div>

            {!showOutput ? (
              <div
                className="p-5 flex items-center justify-center"
                style={{ minHeight: "120px" }}
              >
                <button
                  onClick={() => setShowOutput(true)}
                  className="flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl transition-all duration-200 hover:scale-105"
                  style={{
                    background: "var(--quaternary)",
                    color: "#fff",
                    border: "2px solid var(--foreground)",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  <Play size={16} strokeWidth={2.5} />
                  运行转换
                </button>
              </div>
            ) : (
              <pre
                className="p-5 text-sm leading-relaxed overflow-x-auto animate-pop"
                style={{ fontFamily: "monospace", color: "var(--foreground)" }}
              >
                <code>{BABEL_PLUGINS[pluginIdx].output}</code>
              </pre>
            )}
          </div>
        </div>

        {/* 插件信息 */}
        <div
          className="animate-slide mt-6 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{
            animationDelay: "0.25s",
            background: `${BABEL_PLUGINS[pluginIdx].color}10`,
            border: `2px dashed ${BABEL_PLUGINS[pluginIdx].color}`,
          }}
        >
          <div
            className="w-10 h-10 flex items-center justify-center rounded-xl shrink-0"
            style={{
              background: BABEL_PLUGINS[pluginIdx].color,
              border: "2px solid var(--foreground)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
            }}
          >
            {(() => {
              const IconComp = BABEL_PLUGINS[pluginIdx].icon;
              return <IconComp size={20} color="#fff" strokeWidth={2.5} />;
            })()}
          </div>
          <div>
            <p
              className="font-bold text-sm"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              {BABEL_PLUGINS[pluginIdx].name}
            </p>
            <p className="text-xs mt-1" style={{ opacity: 0.6 }}>
              将上图左侧的现代语法自动转换为右侧的兼容写法
            </p>
          </div>
          <button
            onClick={() => setShowOutput(false)}
            className="sm:ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg"
            style={{
              border: "2px solid var(--foreground)",
              background: "var(--card)",
              boxShadow: "2px 2px 0px 0px var(--border)",
            }}
          >
            <RotateCcw size={12} strokeWidth={2.5} />
            重置
          </button>
        </div>
      </section>

      {/* ────────────── Babel 配置速查 ────────────── */}
      <section className="container mt-24">
        <SectionHeader
          icon={Cpu}
          color="var(--accent)"
          title="Babel 配置速查"
          subtitle="核心配置文件与 Preset / Plugin 的使用方式"
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* babel.config.json */}
          <div
            className="animate-slide topic-card overflow-hidden"
            style={{ animationDelay: "0.1s" }}
          >
            <div
              className="px-5 py-3 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              style={{
                borderBottom: "2px solid var(--foreground)",
                background: "rgba(139,92,246,0.06)",
                fontFamily: '"Outfit", sans-serif',
              }}
            >
              <Package size={14} strokeWidth={2.5} />
              babel.config.json
            </div>
            <pre
              className="p-5 text-sm leading-relaxed overflow-x-auto"
              style={{ fontFamily: "monospace", color: "var(--foreground)" }}
            >
              <code>
                {`{
  "presets": [
    ["@babel/preset-env", {
      "targets": "> 0.25%, not dead",
      "useBuiltIns": "usage",
      "corejs": 3
    }],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}`}
              </code>
            </pre>
          </div>

          {/* Preset 说明 */}
          <div
            className="animate-slide topic-card overflow-hidden"
            style={{ animationDelay: "0.2s" }}
          >
            <div
              className="px-5 py-3 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              style={{
                borderBottom: "2px solid var(--foreground)",
                background: "rgba(244,114,182,0.06)",
                fontFamily: '"Outfit", sans-serif',
              }}
            >
              <BookOpen size={14} strokeWidth={2.5} />
              核心概念
            </div>
            <div className="p-5 space-y-4">
              {[
                {
                  term: "Preset (预设)",
                  def: "一组插件的集合。如 @babel/preset-env 包含所有将 ES6+ 转为 ES5 的插件。",
                  color: "var(--accent)",
                },
                {
                  term: "Plugin (插件)",
                  def: "最小转换单元，每个插件负责一种语法转换。如箭头函数、模板字符串等。",
                  color: "var(--secondary)",
                },
                {
                  term: "Polyfill",
                  def: "补充运行时缺失的 API（如 Promise、Array.from），通过 core-js 实现。",
                  color: "var(--tertiary)",
                },
                {
                  term: "Source Map",
                  def: "映射转换后代码到原始代码位置，便于调试。",
                  color: "var(--quaternary)",
                },
              ].map((item) => (
                <div key={item.term} className="flex items-start gap-3">
                  <div
                    className="shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ background: item.color }}
                  />
                  <div>
                    <span
                      className="font-bold text-sm"
                      style={{
                        fontFamily: '"Outfit", sans-serif',
                        color: item.color,
                      }}
                    >
                      {item.term}
                    </span>
                    <p
                      className="text-xs mt-0.5 leading-relaxed"
                      style={{ opacity: 0.65 }}
                    >
                      {item.def}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── Visitor 模式说明 ────────────── */}
      <section className="container mt-24">
        <SectionHeader
          icon={Eye}
          color="var(--secondary)"
          title="Visitor 模式：Babel 插件的心脏"
          subtitle="理解 Babel 如何通过 Visitor 模式遍历和转换 AST"
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* 说明 */}
          <div
            className="lg:col-span-2 animate-slide topic-card p-6"
            style={{ animationDelay: "0.1s" }}
          >
            <h4
              className="text-lg font-extrabold mb-3"
              style={{
                fontFamily: '"Outfit", sans-serif',
                color: "var(--secondary)",
              }}
            >
              什么是 Visitor 模式？
            </h4>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ opacity: 0.7 }}
            >
              Babel 遍历 AST 时使用 <strong>Visitor 模式</strong>
              ：你定义一个对象，其属性名对应 AST
              节点类型。当遍历器进入或离开某类型节点时，自动调用对应的回调函数。
            </p>
            <div className="space-y-3">
              {[
                {
                  label: "enter()",
                  desc: "进入节点时触发",
                  color: "var(--accent)",
                },
                {
                  label: "exit()",
                  desc: "离开节点时触发",
                  color: "var(--secondary)",
                },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-3">
                  <span
                    className="px-2.5 py-1 text-xs font-bold rounded-lg"
                    style={{
                      background: `${m.color}18`,
                      color: m.color,
                      border: `1.5px solid ${m.color}`,
                      fontFamily: "monospace",
                    }}
                  >
                    {m.label}
                  </span>
                  <span className="text-xs" style={{ opacity: 0.6 }}>
                    {m.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 插件代码示例 */}
          <div
            className="lg:col-span-3 animate-slide topic-card overflow-hidden"
            style={{ animationDelay: "0.2s" }}
          >
            <div
              className="px-5 py-3 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              style={{
                borderBottom: "2px solid var(--foreground)",
                background: "rgba(244,114,182,0.06)",
                fontFamily: '"Outfit", sans-serif',
              }}
            >
              <Pen size={14} strokeWidth={2.5} />
              自定义插件示例：将 const 转为 var
            </div>
            <pre
              className="p-5 text-sm leading-relaxed overflow-x-auto"
              style={{ fontFamily: "monospace", color: "var(--foreground)" }}
            >
              <code>
                {`// my-plugin.js
module.exports = function () {
  return {
    visitor: {
      // 当遍历器进入 VariableDeclaration 节点
      VariableDeclaration(path) {
        if (path.node.kind === "const") {
          path.node.kind = "var"; // 直接修改 AST
        }
      }
    }
  };
};

// babel.config.json
// { "plugins": ["./my-plugin.js"] }`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* ────────────── 核心对比表 ────────────── */}
      <section className="container mt-24">
        <SectionHeader
          icon={GitBranch}
          color="var(--tertiary)"
          title="编译 vs 转译 vs 解释"
          subtitle="厘清三个容易混淆的概念"
        />

        <div className="mt-8 overflow-x-auto">
          <div className="min-w-[600px] grid grid-cols-3 gap-4">
            {[
              {
                title: "编译 (Compile)",
                from: "高级语言",
                to: "机器码 / 字节码",
                example: "C → 机器码",
                tools: "GCC, Clang, V8 (JIT)",
                color: "var(--accent)",
              },
              {
                title: "转译 (Transpile)",
                from: "高级语言",
                to: "同级高级语言",
                example: "ES6+ → ES5",
                tools: "Babel, TypeScript, SWC",
                color: "var(--secondary)",
              },
              {
                title: "解释 (Interpret)",
                from: "源代码",
                to: "直接执行",
                example: "Python 逐行执行",
                tools: "Python, Ruby (MRI)",
                color: "var(--quaternary)",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="animate-slide topic-card p-5 relative overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: item.color }}
                />
                <h4
                  className="font-extrabold text-base mb-2"
                  style={{
                    fontFamily: '"Outfit", sans-serif',
                    color: item.color,
                  }}
                >
                  {item.title}
                </h4>
                <div className="space-y-2 text-xs" style={{ opacity: 0.7 }}>
                  <p>
                    <strong>输入 → 输出：</strong>
                    {item.from} → {item.to}
                  </p>
                  <p>
                    <strong>示例：</strong>
                    {item.example}
                  </p>
                  <p>
                    <strong>工具：</strong>
                    {item.tools}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── 总结 ────────────── */}
      <section className="container mt-24">
        <div
          className="animate-slide topic-card p-8 md:p-12 relative overflow-hidden text-center"
          style={{
            animationDelay: "0.1s",
            borderColor: "var(--accent)",
            borderWidth: "3px",
          }}
        >
          {/* 装饰 */}
          <div
            className="absolute -top-12 -right-12 w-40 h-40 opacity-10 pointer-events-none"
            style={{
              background: "var(--accent)",
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-32 h-32 opacity-10 pointer-events-none"
            style={{
              background: "var(--tertiary)",
              borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
            }}
          />

          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
            style={{
              background: "var(--accent)",
              border: "3px solid var(--foreground)",
              boxShadow: "5px 5px 0px 0px var(--foreground)",
            }}
          >
            <Sparkles size={32} color="#fff" strokeWidth={2.5} />
          </div>

          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{
              fontFamily: '"Outfit", sans-serif',
              color: "var(--foreground)",
            }}
          >
            核心要点回顾
          </h2>

          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mt-8">
            {[
              {
                icon: "🌲",
                text: "AST 是代码结构的树形表示，是所有代码分析工具的基础",
              },
              {
                icon: "⚙️",
                text: "Babel 经历 Parse → Transform → Generate 三阶段完成转译",
              },
              {
                icon: "🔌",
                text: "插件 (Plugin) 是最小转换单元，Preset 是插件的集合",
              },
              {
                icon: "👁️",
                text: "Visitor 模式是 Babel 插件遍历 AST 的核心机制",
              },
            ].map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{
                  background: "rgba(139,92,246,0.04)",
                  border: "1.5px solid var(--border)",
                }}
              >
                <span className="text-xl shrink-0">{point.icon}</span>
                <span
                  className="text-sm leading-relaxed"
                  style={{ opacity: 0.75 }}
                >
                  {point.text}
                </span>
              </div>
            ))}
          </div>

          {/* 继续学习链接 */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {[
              { label: "AST Explorer", url: "#", color: "var(--accent)" },
              { label: "Babel 官方文档", url: "#", color: "var(--secondary)" },
              {
                label: "编写你的第一个插件",
                url: "#",
                color: "var(--quaternary)",
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  color: "#fff",
                  background: link.color,
                  border: "2px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                <ArrowRight size={14} strokeWidth={2.5} />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Section Header 辅助组件 ─── */
function SectionHeader({
  icon: Icon,
  color,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{
    size: number;
    strokeWidth: number;
    color?: string;
  }>;
  color: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="w-14 h-14 flex items-center justify-center rounded-2xl mb-4"
        style={{
          background: `${color}18`,
          border: "2px solid var(--foreground)",
          boxShadow: `4px 4px 0px 0px ${color}`,
        }}
      >
        <Icon size={28} strokeWidth={2.5} color={color} />
      </div>
      <span
        className="text-xs font-bold uppercase tracking-widest mb-2"
        style={{ color }}
      >
        {subtitle}
      </span>
      <h2
        className="text-3xl md:text-4xl font-extrabold"
        style={{
          fontFamily: '"Outfit", sans-serif',
          color: "var(--foreground)",
        }}
      >
        {title}
      </h2>
      <div
        className="w-16 h-1 mt-3 rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}
