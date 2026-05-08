"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Zap,
  Layers,
  Gamepad2,
  Image,
  FileCode,
  Cpu,
  Globe,
  BarChart3,
  Shield,
  Rocket,
  ArrowRight,
  Play,
  Pause,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Code2,
  Boxes,
  Workflow,
  Binary,
  Gauge,
  Monitor,
  Smartphone,
  Terminal,
  Database,
  Server,
} from "lucide-react";

/* ───────────────────────────── 数据 ───────────────────────────── */

const advantages = [
  {
    icon: Zap,
    title: "近原生性能",
    desc: "Wasm 以二进制格式分发，JIT/AOT 编译后可接近原生执行速度",
    color: "var(--accent)",
    bg: "var(--accent)",
  },
  {
    icon: Shield,
    title: "安全沙箱",
    desc: "运行在与 JavaScript 相同的安全沙箱中，无法直接访问系统资源",
    color: "var(--quaternary)",
    bg: "var(--quaternary)",
  },
  {
    icon: Globe,
    title: "跨平台一致",
    desc: "编译一次即可在所有现代浏览器中运行，无需平台适配",
    color: "var(--secondary)",
    bg: "var(--secondary)",
  },
  {
    icon: Layers,
    title: "多语言支持",
    desc: "C/C++、Rust、Go、AssemblyScript 等均可编译为 Wasm",
    color: "var(--tertiary)",
    bg: "var(--tertiary)",
  },
];

const scenarios = [
  {
    id: "image-processing",
    icon: Image,
    title: "图像 / 视频处理",
    color: "var(--accent)",
    tag: "性能关键",
    description:
      "在浏览器中实时执行图像滤镜、视频编解码、像素级操作。相比纯 JS 实现，Wasm 带来 5-10 型号的性能提升。",
    examples: [
      "Squoosh — Google 出品的图像压缩工具",
      "FFmpeg.wasm — 浏览器端完整视频编解码",
      "OpenCV.js — 计算机视觉在浏览器的落地",
      "Photopea — 浏览器中的 Photoshop 替代品",
    ],
    codeSnippet: `// Squoosh 使用 Wasm 处理图像
const image = await decode(rawData);
const result = wasmModule.encode(image, {
  quality: 75,
  target: 'webp'
});`,
    benchmark: { js: 100, wasm: 12 },
    benchmarkLabel: "1080p WebP 编码耗时 (ms)",
  },
  {
    id: "gaming",
    icon: Gamepad2,
    title: "游戏引擎 & 3D 渲染",
    color: "var(--secondary)",
    tag: "重度计算",
    description:
      "将 Unity / Unreal 等游戏引擎编译到浏览器，配合 WebGL/WebGPU 实现 3A 级别的浏览器游戏体验。",
    examples: [
      "Unity WebGL — 将 C# 游戏导出为 Wasm",
      "Doom 3 — id Software 的经典移植",
      "Figma — 设计工具的渲染引擎核心",
      "Google Earth — 3D 地球的 Wasm 渲染管线",
    ],
    codeSnippet: `// Unity WebGL 导出的核心加载流程
const module = await UnityLoader.instantiate(
  "game-container",
  "Build/game.wasm",
  {
    onProgress: (progress) => updateBar(progress),
    Module: { wasmBinary: wasmBinary }
  }
);`,
    benchmark: { js: 100, wasm: 25 },
    benchmarkLabel: "10K 三角形渲染帧时间 (ms)",
  },
  {
    id: "crypto",
    icon: Shield,
    title: "加密与安全计算",
    color: "var(--quaternary)",
    tag: "安全优先",
    description:
      "在客户端完成哈希计算、加解密、零知识证明等计算密集型密码学操作，避免敏感数据泄露到服务端。",
    examples: [
      "Signal — 端到端加密协议的 Wasm 实现",
      "1Password — 使用 Wasm 做密钥派生",
      "区块链钱包 — 签名验证与默克尔树",
      "Passkeys — WebAuthn 辅助计算",
    ],
    codeSnippet: `// 使用 Wasm 加速 Argon2 密钥派生
import { hash } from 'argon2-wasm';

const result = await hash({
  pass: password,
  salt: crypto.getRandomValues(new Uint8Array(16)),
  time: 3,
  mem: 65536,
  type: argon2.Argon2id,
});`,
    benchmark: { js: 100, wasm: 18 },
    benchmarkLabel: "Argon2id 密钥派生 (ms)",
  },
  {
    id: "ai-inference",
    icon: Cpu,
    title: "AI / ML 推理",
    color: "var(--tertiary)",
    tag: "前沿热门",
    description:
      "将训练好的模型通过 ONNX Runtime / TensorFlow Lite 编译为 Wasm，在浏览器端完成推理，保护用户隐私。",
    examples: [
      "LLM 推理 — llama.cpp → Wasm (Web-LLM)",
      "图像识别 — TensorFlow.js + Wasm 后端",
      "OCR 文字识别 — Tesseract.js 核心",
      "语音识别 — Whisper.wasm 浏览器端转写",
    ],
    codeSnippet: `// Transformers.js 使用 Wasm 后端推理
import { pipeline } from '@xenova/transformers';

const classifier = await pipeline(
  'text-classification',
  'Xenova/distilbert-base-uncased',
  { device: 'wasm' }
);

const result = await classifier('Wasm is amazing!');
// [{ label: 'POSITIVE', score: 0.9998 }]`,
    benchmark: { js: 100, wasm: 30 },
    benchmarkLabel: "MobileNet v2 推理耗时 (ms)",
  },
  {
    id: "document",
    icon: FileCode,
    title: "文档 & PDF 生成",
    color: "var(--accent)",
    tag: "生产力工具",
    description:
      "在浏览器端完成文档解析、PDF 渲染、电子表格计算等重型办公套件功能，无需依赖服务端。",
    examples: [
      "PDFium — Chrome 的 PDF 渲染引擎",
      "LibreOffice Online — 完整办公套件",
      "sqlite-wasm — 浏览器端 SQL 数据库",
      "Pandoc.wasm — 文档格式转换",
    ],
    codeSnippet: `// SQLite Wasm — 浏览器端数据库操作
import sqliteWasm from '@anthropic/sqlite-wasm';

const sqlite = await sqliteWasm();
const db = new sqlite.oo1.DB('/mydb.sqlite', 'ctf');

db.exec(\`CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)\`);`,
    benchmark: { js: 100, wasm: 22 },
    benchmarkLabel: "1000 行 CSV 解析 (ms)",
  },
  {
    id: "porting",
    icon: Boxes,
    title: "C/C++ 库移植",
    color: "var(--quaternary)",
    tag: "生态复用",
    description:
      "将成熟的 C/C++ 代码库通过 Emscripten 编译为 Wasm，避免用 JS 重写，直接复用数十年积累的开源代码。",
    examples: [
      "LAME MP3 — 经典编码器的浏览器版",
      "zlib / brotli — 压缩解压算法",
      "Hunspell — 拼写检查引擎",
      "protobuf / flatbuffers — 序列化库",
    ],
    codeSnippet: `// Emscripten 编译 C 代码到 Wasm
// compile.sh
emcc input.c -O3 \\
  -s WASM=1 \\
  -s EXPORTED_FUNCTIONS='["_processData"]' \\
  -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap"]' \\
  -o output.js

// JavaScript 调用
const processData = Module.cwrap(
  'processData', 'number', ['number', 'number']
);`,
    benchmark: { js: 100, wasm: 15 },
    benchmarkLabel: "gzip 解压 1MB 数据 (ms)",
  },
];

const timeline = [
  {
    year: "2017",
    title: "MVP 发布",
    desc: "四大浏览器首次同步支持 Wasm MVP",
  },
  {
    year: "2019",
    title: "多线程提案",
    desc: "SharedArrayBuffer + Atomics 实现 Wasm 多线程",
  },
  {
    year: "2020",
    title: "SIMD 提案",
    desc: "128-bit SIMD 指令集支持，性能再飞跃",
  },
  {
    year: "2022",
    title: "GC 提案",
    desc: "直接操作宿主 GC 对象，消除线性内存拷贝",
  },
  {
    year: "2024",
    title: "组件模型",
    desc: "Component Model + WASI 实现跨模块互操作",
  },
  {
    year: "2025",
    title: "WASI 2.0",
    desc: "标准化系统接口，Wasm 走出浏览器",
  },
];

const techStack = [
  {
    name: "Emscripten",
    desc: "C/C++ → Wasm 工具链",
    color: "var(--accent)",
    langs: ["C", "C++"],
  },
  {
    name: "wasm-pack",
    desc: "Rust → Wasm 一键打包",
    color: "var(--secondary)",
    langs: ["Rust"],
  },
  {
    name: "TinyGo",
    desc: "Go 子集编译为 Wasm",
    color: "var(--quaternary)",
    langs: ["Go"],
  },
  {
    name: "AssemblyScript",
    desc: "类 TS 语法直接编译 Wasm",
    color: "var(--tertiary)",
    langs: ["TypeScript"],
  },
  {
    name: "wasm-bindgen",
    desc: "Rust 与 JS 无缝互操作",
    color: "var(--accent)",
    langs: ["Rust", "JS"],
  },
  {
    name: "Emscripten SDK",
    desc: "LLVM 编译器后端",
    color: "var(--secondary)",
    langs: ["LLVM"],
  },
];

/* ───────────────────────── 组件 ───────────────────────── */

function BenchmarkBar({ label, jsValue, wasmValue }: {
  label: string;
  jsValue: number;
  wasmValue: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const maxVal = Math.max(jsValue, wasmValue);

  return (
    <div ref={ref} className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/60">
        {label}
      </p>
      {/* JS bar */}
      <div className="flex items-center gap-3">
        <span className="w-10 shrink-0 text-right text-xs font-bold text-[var(--foreground)]/50">
          JS
        </span>
        <div className="relative h-7 flex-1 overflow-hidden rounded-md border-2 border-[var(--foreground)] bg-[var(--card)]">
          <div
            className="absolute inset-y-0 left-0 rounded-sm bg-[var(--secondary)] transition-all duration-1000 ease-out"
            style={{
              width: visible ? `${(jsValue / maxVal) * 100}%` : "0%",
              transitionDelay: "200ms",
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[var(--foreground)]">
            {jsValue}ms
          </span>
        </div>
      </div>
      {/* Wasm bar */}
      <div className="flex items-center gap-3">
        <span className="w-10 shrink-0 text-right text-xs font-bold text-[var(--foreground)]/50">
          Wasm
        </span>
        <div className="relative h-7 flex-1 overflow-hidden rounded-md border-2 border-[var(--foreground)] bg-[var(--card)]">
          <div
            className="absolute inset-y-0 left-0 rounded-sm bg-[var(--accent)] transition-all duration-1000 ease-out"
            style={{
              width: visible ? `${(wasmValue / maxVal) * 100}%` : "0%",
              transitionDelay: "500ms",
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[var(--foreground)]">
            {wasmValue}ms
          </span>
        </div>
      </div>
      {/* speedup */}
      <p className="text-right text-xs font-bold text-[var(--accent)]">
        ⚡ 快 {Math.round(jsValue / wasmValue)}x
      </p>
    </div>
  );
}

function WasmPlayground() {
  const [output, setOutput] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const simulateRun = () => {
    setRunning(true);
    setOutput([]);

    const steps = [
      "> Compiling Wasm module...",
      "> Module size: 42.7 KB (gzipped: 14.1 KB)",
      "> Instantiation: 3.2ms",
      "> Running fibonacci(40) with JS...",
      "  JS result: 102334155 | time: 1847ms",
      "> Running fibonacci(40) with Wasm...",
      "  Wasm result: 102334155 | time: 312ms",
      "> ✅ Wasm is 5.9x faster!",
      "> Running image blur (1920×1080)...",
      "  JS: 145ms | Wasm: 23ms (6.3x)",
      "> Running SHA-256 × 10000...",
      "  JS: 892ms | Wasm: 98ms (9.1x)",
      "> All benchmarks complete ✅",
    ];

    steps.forEach((step, i) => {
      setTimeout(() => {
        setOutput((prev) => [...prev, step]);
        if (i === steps.length - 1) setRunning(false);
      }, (i + 1) * 300);
    });
  };

  return (
    <div
      className="topic-card overflow-hidden"
      style={{ borderRadius: "var(--radius-lg)", boxShadow: "8px 8px 0px 0px var(--foreground)" }}
    >
      {/* terminal header */}
      <div
        className="flex items-center gap-2 border-b-2 border-[var(--foreground)] px-4 py-3"
        style={{ background: "var(--foreground)" }}
      >
        <div className="h-3 w-3 rounded-full bg-[var(--secondary)]" />
        <div className="h-3 w-3 rounded-full bg-[var(--tertiary)]" />
        <div className="h-3 w-3 rounded-full bg-[var(--quaternary)]" />
        <span className="ml-3 text-xs font-bold text-white/70">
          wasm-playground.tsx
        </span>
      </div>
      {/* code + output */}
      <div
        className="grid gap-0 md:grid-cols-2"
        style={{ background: "var(--foreground)" }}
      >
        {/* code panel */}
        <div className="border-r border-white/10 p-4 font-mono text-xs leading-relaxed text-green-300">
          <pre className="whitespace-pre-wrap">{`// 浏览器中直接加载 Wasm
const response = await fetch(
  'module.wasm'
);
const bytes = await response
  .arrayBuffer();

const { instance } = 
  await WebAssembly.instantiate(
    bytes, imports
  );

// 调用导出函数 — 零拷贝互操作
const result = instance.exports
  .fibonacci(40);`}</pre>
        </div>
        {/* output panel */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-white/50">OUTPUT</p>
            <button
              onClick={simulateRun}
              disabled={running}
              className="flex items-center gap-1 rounded-md border-2 border-[var(--accent)] px-3 py-1 text-xs font-bold text-[var(--accent)] transition-all hover:bg-[var(--accent)] hover:text-white disabled:opacity-50"
            >
              {running ? (
                <Pause size={12} strokeWidth={2.5} />
              ) : (
                <Play size={12} strokeWidth={2.5} />
              )}
              {running ? "运行中..." : "运行基准测试"}
            </button>
          </div>
          <div className="mt-3 min-h-[200px] font-mono text-xs leading-relaxed">
            {output.map((line, i) => (
              <p
                key={i}
                className="animate-slide"
                style={{
                  animationDelay: `${i * 50}ms`,
                  color: line.includes("✅")
                    ? "var(--quaternary)"
                    : line.includes("faster")
                    ? "var(--tertiary)"
                    : line.startsWith(">")
                    ? "white"
                    : "rgba(255,255,255,0.6)",
                }}
              >
                {line}
              </p>
            ))}
            {output.length === 0 && (
              <p className="text-white/30">
                点击「运行基准测试」查看结果...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureDiagram() {
  const steps = [
    {
      icon: FileCode,
      label: "源代码",
      sub: "C / Rust / Go",
      color: "var(--accent)",
    },
    {
      icon: Terminal,
      label: "编译器",
      sub: "Emscripten / wasm-pack",
      color: "var(--secondary)",
    },
    {
      icon: Binary,
      label: ".wasm 二进制",
      sub: "紧凑的二进制格式",
      color: "var(--tertiary)",
    },
    {
      icon: Monitor,
      label: "浏览器引擎",
      sub: "V8 / SpiderMonkey / JSC",
      color: "var(--quaternary)",
    },
    {
      icon: Gauge,
      label: "原生速度执行",
      sub: "JIT/AOT 机器码",
      color: "var(--accent)",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div
            className="animate-pop flex flex-col items-center"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[var(--foreground)]"
              style={{
                background: step.color,
                boxShadow: `4px 4px 0px 0px var(--foreground)`,
              }}
            >
              <step.icon size={28} strokeWidth={2.5} className="text-white" />
            </div>
            <p className="mt-2 text-sm font-bold text-[var(--foreground)]">
              {step.label}
            </p>
            <p className="text-xs text-[var(--foreground)]/50">{step.sub}</p>
          </div>
          {i < steps.length - 1 && (
            <div className="hidden items-center md:flex">
              <div className="mx-2 h-[3px] w-8 bg-[var(--foreground)]/30" />
              <ArrowRight size={20} className="text-[var(--foreground)]/40" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─────────────────────── 主页面 ─────────────────────── */

export default function WasmKnowledgePage() {
  const [activeScenario, setActiveScenario] = useState(0);
  const current = scenarios[activeScenario];

  return (
    <div className="bg-dot-grid min-h-screen pb-24" style={{ background: "var(--background)" }}>
      {/* ─── HERO ─── */}
      <section className="container relative overflow-hidden pt-20 pb-16">
        {/* blob decorations */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 opacity-20"
          style={{
            background: "var(--tertiary)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 opacity-15"
          style={{
            background: "var(--secondary)",
            borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
          }}
        />

        <div className="animate-pop relative z-10">
          {/* label */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[var(--foreground)] px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{ background: "var(--tertiary)", boxShadow: "4px 4px 0px 0px var(--foreground)" }}
          >
            <Binary size={14} strokeWidth={2.5} />
            DEEP DIVE
          </div>

          <h1
            className="font-outfit text-5xl font-extrabold leading-tight tracking-tight text-[var(--foreground)] md:text-7xl"
          >
            WebAssembly
            <br />
            <span style={{ color: "var(--accent)" }}>在前端的应用</span>
          </h1>

          <p className="mt-6 max-w-2xl font-jakarta text-lg leading-relaxed text-[var(--foreground)]/70 md:text-xl">
            从图像处理到 AI 推理，从游戏引擎到密码学计算 —— 探索 Wasm 如何突破
            JavaScript 的性能天花板，为 Web 带来近原生的计算能力。
          </p>

          {/* stat badges */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "主流浏览器支持", value: "96%+" },
              { label: "比 JS 快", value: "3~10×" },
              { label: "支持语言", value: "40+" },
            ].map((stat, i) => (
              <div
                key={i}
                className="animate-slide flex items-center gap-2 rounded-xl border-2 border-[var(--foreground)] bg-[var(--card)] px-4 py-2"
                style={{
                  animationDelay: `${300 + i * 100}ms`,
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                <span className="text-2xl font-extrabold text-[var(--accent)]">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-[var(--foreground)]/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT IS WASM ─── */}
      <section className="container py-12">
        <div
          className="topic-card animate-slide rounded-2xl p-8 md:p-10"
          style={{
            borderRadius: "var(--radius-lg)",
            boxShadow: "8px 8px 0px 0px var(--foreground)",
            border: "3px solid var(--foreground)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-[var(--foreground)]"
              style={{ background: "var(--accent)" }}
            >
              <Lightbulb size={24} strokeWidth={2.5} className="text-white" />
            </div>
            <div>
              <h2
                className="font-outfit text-2xl font-extrabold text-[var(--foreground)] md:text-3xl"
              >
                什么是 WebAssembly？
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--foreground)]/70">
                WebAssembly（简称 Wasm）是一种<strong>二进制指令格式</strong>，基于堆栈虚拟机设计。
                它不是用来替代 JavaScript，而是作为 JavaScript 的<strong>高性能补充</strong>。
                Wasm 模块可以以接近原生的速度运行，同时保持与 JavaScript 及 Web API 的完全互操作能力。
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  {
                    icon: Rocket,
                    text: "二进制格式 → 极快的解析与加载",
                    color: "var(--accent)",
                  },
                  {
                    icon: Code2,
                    text: "类型化指令集 → 可预测的高性能",
                    color: "var(--quaternary)",
                  },
                  {
                    icon: Database,
                    text: "线性内存模型 → 精确的内存控制",
                    color: "var(--tertiary)",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="animate-slide flex items-center gap-3 rounded-xl border-2 border-[var(--foreground)]/20 bg-[var(--background)] p-3"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: item.color }}
                    >
                      <item.icon
                        size={18}
                        strokeWidth={2.5}
                        className="text-white"
                      />
                    </div>
                    <span className="text-sm font-semibold text-[var(--foreground)]/80">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ARCHITECTURE PIPELINE ─── */}
      <section className="container py-12">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            编译管线
          </span>
          <h2 className="mt-2 font-outfit text-3xl font-extrabold text-[var(--foreground)] md:text-4xl">
            从源码到执行
          </h2>
        </div>
        <ArchitectureDiagram />
      </section>

      {/* ─── ADVANTAGES GRID ─── */}
      <section className="container py-12">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--secondary)]">
            核心优势
          </span>
          <h2 className="mt-2 font-outfit text-3xl font-extrabold text-[var(--foreground)] md:text-4xl">
            为什么选择 Wasm？
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((adv, i) => (
            <div
              key={i}
              className="topic-card animate-slide group relative overflow-hidden rounded-2xl p-6"
              style={{
                animationDelay: `${i * 100}ms`,
                borderRadius: "var(--radius-lg)",
                boxShadow: "8px 8px 0px 0px var(--foreground)",
              }}
            >
              <div
                className="absolute -top-6 -right-6 h-20 w-20 rounded-full opacity-20 transition-transform group-hover:scale-150"
                style={{ background: adv.bg }}
              />
              <div
                className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[var(--foreground)]"
                style={{ background: adv.bg }}
              >
                <adv.icon
                  size={28}
                  strokeWidth={2.5}
                  className="text-white"
                />
              </div>
              <h3 className="relative font-outfit text-lg font-bold text-[var(--foreground)]">
                {adv.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-[var(--foreground)]/60">
                {adv.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── INTERACTIVE SCENARIOS ─── */}
      <section className="container py-12">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--tertiary)]">
            场景全景
          </span>
          <h2 className="mt-2 font-outfit text-3xl font-extrabold text-[var(--foreground)] md:text-4xl">
            六大前端应用场景
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--foreground)]/60">
            点击下方标签切换不同场景，深入了解 Wasm 在每个领域的具体实践
          </p>
        </div>

        {/* scenario tabs */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {scenarios.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveScenario(i)}
              className="flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-sm font-bold transition-all"
              style={{
                borderColor: "var(--foreground)",
                background:
                  activeScenario === i ? s.color : "var(--card)",
                color:
                  activeScenario === i ? "white" : "var(--foreground)",
                boxShadow:
                  activeScenario === i
                    ? `4px 4px 0px 0px var(--foreground)`
                    : "none",
                transform:
                  activeScenario === i
                    ? "translate(-2px, -2px)"
                    : "none",
              }}
            >
              <s.icon size={16} strokeWidth={2.5} />
              <span className="hidden sm:inline">{s.title}</span>
              <span className="sm:hidden">{s.tag}</span>
            </button>
          ))}
        </div>

        {/* scenario detail card */}
        <div
          className="topic-card animate-pop overflow-hidden rounded-2xl"
          key={current.id}
          style={{
            borderRadius: "var(--radius-lg)",
            boxShadow: "8px 8px 0px 0px var(--foreground)",
            border: "3px solid var(--foreground)",
          }}
        >
          {/* header */}
          <div
            className="flex flex-wrap items-center gap-4 px-6 py-5 md:px-8"
            style={{ background: current.color }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white/30 bg-white/20"
            >
              <current.icon size={24} strokeWidth={2.5} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-outfit text-2xl font-extrabold text-white">
                {current.title}
              </h3>
              <span className="mt-1 inline-block rounded-full border-2 border-white/30 bg-white/20 px-3 py-0.5 text-xs font-bold text-white">
                {current.tag}
              </span>
            </div>
          </div>

          {/* body */}
          <div className="grid gap-0 md:grid-cols-2">
            {/* left: description + examples */}
            <div className="p-6 md:p-8">
              <p className="leading-relaxed text-[var(--foreground)]/80">
                {current.description}
              </p>
              <h4 className="mt-6 mb-3 font-outfit text-sm font-bold uppercase tracking-widest text-[var(--foreground)]/50">
                代表项目
              </h4>
              <ul className="space-y-2">
                {current.examples.map((ex, j) => (
                  <li
                    key={j}
                    className="animate-slide flex items-start gap-2 text-sm"
                    style={{ animationDelay: `${j * 80}ms` }}
                  >
                    <CheckCircle2
                      size={16}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0"
                      style={{ color: current.color }}
                    />
                    <span className="text-[var(--foreground)]/70">{ex}</span>
                  </li>
                ))}
              </ul>

              {/* benchmark */}
              <div className="mt-6">
                <BenchmarkBar
                  label={current.benchmarkLabel}
                  jsValue={current.benchmark.js}
                  wasmValue={current.benchmark.wasm}
                />
              </div>
            </div>

            {/* right: code snippet */}
            <div
              className="border-t-2 border-[var(--foreground)] md:border-t-0 md:border-l-2"
            >
              <div
                className="flex items-center gap-2 px-4 py-2"
                style={{ background: "var(--foreground)" }}
              >
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--secondary)]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--tertiary)]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--quaternary)]" />
                <span className="ml-2 text-xs text-white/50">example.js</span>
              </div>
              <pre
                className="overflow-x-auto p-6 font-mono text-xs leading-relaxed text-green-300"
                style={{ background: "#1a1a2e", minHeight: "300px" }}
              >
                {current.codeSnippet}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE PLAYGROUND ─── */}
      <section className="container py-12">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--quaternary)]">
            交互式实验
          </span>
          <h2 className="mt-2 font-outfit text-3xl font-extrabold text-[var(--foreground)] md:text-4xl">
            Wasm 性能基准测试
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--foreground)]/60">
            在终端模拟器中体验 Wasm vs JS 的真实性能差距
          </p>
        </div>
        <WasmPlayground />
      </section>

      {/* ─── JS VS WASM COMPARISON TABLE ─── */}
      <section className="container py-12">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            对比分析
          </span>
          <h2 className="mt-2 font-outfit text-3xl font-extrabold text-[var(--foreground)] md:text-4xl">
            JS vs Wasm 全维度对比
          </h2>
        </div>

        <div
          className="topic-card overflow-hidden rounded-2xl"
          style={{
            borderRadius: "var(--radius-lg)",
            boxShadow: "8px 8px 0px 0px var(--foreground)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr
                  style={{ background: "var(--foreground)" }}
                >
                  <th className="px-5 py-4 text-left font-bold text-white">
                    维度
                  </th>
                  <th className="px-5 py-4 text-center font-bold text-[var(--secondary)]">
                    JavaScript
                  </th>
                  <th className="px-5 py-4 text-center font-bold text-[var(--accent)]">
                    WebAssembly
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    dim: "执行速度",
                    js: "依赖 JIT 优化",
                    wasm: "接近原生速度 ⚡",
                  },
                  {
                    dim: "解析速度",
                    js: "需解析文本源码",
                    wasm: "直接编译二进制",
                  },
                  {
                    dim: "内存控制",
                    js: "GC 自动管理",
                    wasm: "线性内存，手动控制",
                  },
                  {
                    dim: "语言生态",
                    js: "JS/TS 原生",
                    wasm: "C/Rust/Go 等 40+ 语言",
                  },
                  {
                    dim: "调试体验",
                    js: "成熟，DevTools 完善",
                    wasm: "发展中，Source Map 支持",
                  },
                  {
                    dim: "适用场景",
                    js: "DOM 操作、UI 逻辑",
                    wasm: "计算密集型任务",
                  },
                  {
                    dim: "互操作",
                    js: "原生",
                    wasm: "通过 JS 胶水层",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-t-2 border-[var(--foreground)]/10 transition-colors hover:bg-[var(--accent)]/5"
                  >
                    <td className="px-5 py-4 font-bold text-[var(--foreground)]">
                      {row.dim}
                    </td>
                    <td className="px-5 py-4 text-center text-[var(--foreground)]/70">
                      {row.js}
                    </td>
                    <td className="px-5 py-4 text-center font-semibold text-[var(--foreground)]/80">
                      {row.wasm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── ECOSYSTEM / TOOLING ─── */}
      <section className="container py-12">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--secondary)]">
            工具链生态
          </span>
          <h2 className="mt-2 font-outfit text-3xl font-extrabold text-[var(--foreground)] md:text-4xl">
            编译工具 & 框架
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((tool, i) => (
            <div
              key={i}
              className="topic-card animate-slide group relative overflow-hidden rounded-2xl p-6"
              style={{
                animationDelay: `${i * 80}ms`,
                borderRadius: "var(--radius-lg)",
                boxShadow: "8px 8px 0px 0px var(--foreground)",
              }}
            >
              <div
                className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full opacity-20 transition-transform group-hover:scale-150"
                style={{ background: tool.color }}
              />
              <div className="relative flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[var(--foreground)]"
                  style={{ background: tool.color }}
                >
                  <Boxes size={20} strokeWidth={2.5} className="text-white" />
                </div>
                <div>
                  <h3 className="font-outfit text-lg font-bold text-[var(--foreground)]">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-[var(--foreground)]/50">
                    {tool.desc}
                  </p>
                </div>
              </div>
              <div className="relative mt-4 flex flex-wrap gap-1.5">
                {tool.langs.map((lang) => (
                  <span
                    key={lang}
                    className="rounded-full border-2 border-[var(--foreground)]/20 px-2.5 py-0.5 text-xs font-bold"
                    style={{ background: `${tool.color}20`, color: tool.color }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="container py-12">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--tertiary)]">
            演进历程
          </span>
          <h2 className="mt-2 font-outfit text-3xl font-extrabold text-[var(--foreground)] md:text-4xl">
            Wasm 标准演进
          </h2>
        </div>

        <div className="relative mx-auto max-w-3xl">
          {/* vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 md:left-1/2"
            style={{ borderLeft: "3px dashed var(--border)" }}
          />

          {timeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className={`animate-slide relative mb-8 flex items-center gap-4 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* content */}
                <div
                  className={`ml-14 flex-1 rounded-2xl border-2 border-[var(--foreground)] bg-[var(--card)] p-5 md:ml-0 ${
                    isLeft ? "md:text-right md:mr-10" : "md:ml-10"
                  }`}
                  style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
                >
                  <span
                    className="inline-block rounded-full px-3 py-0.5 text-sm font-extrabold"
                    style={{
                      background: "var(--tertiary)",
                      color: "var(--foreground)",
                    }}
                  >
                    {item.year}
                  </span>
                  <h4 className="mt-2 font-outfit text-lg font-bold text-[var(--foreground)]">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm text-[var(--foreground)]/60">
                    {item.desc}
                  </p>
                </div>

                {/* dot */}
                <div
                  className="absolute left-6 z-10 h-5 w-5 -translate-x-1/2 rounded-full border-3 border-[var(--foreground)] md:left-1/2"
                  style={{ background: "var(--accent)" }}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── WHEN TO USE / WHEN NOT ─── */}
      <section className="container py-12">
        <div className="grid gap-5 md:grid-cols-2">
          {/* DO */}
          <div
            className="topic-card animate-slide rounded-2xl p-7"
            style={{
              borderRadius: "var(--radius-lg)",
              boxShadow: "8px 8px 0px 0px var(--quaternary)",
              border: "3px solid var(--foreground)",
            }}
          >
            <div className="mb-5 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[var(--foreground)]"
                style={{ background: "var(--quaternary)" }}
              >
                <CheckCircle2
                  size={20}
                  strokeWidth={2.5}
                  className="text-white"
                />
              </div>
              <h3 className="font-outfit text-xl font-extrabold text-[var(--foreground)]">
                ✅ 适合使用 Wasm
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                "CPU 密集型计算（图像/音视频处理）",
                "密码学运算（哈希、加密、签名）",
                "已有成熟 C/C++/Rust 库需要复用",
                "AI/ML 模型在浏览器端推理",
                "需要确定性性能表现（游戏、音频）",
                "沙箱安全执行不可信代码",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground)]/80">
                  <CheckCircle2
                    size={16}
                    strokeWidth={2.5}
                    className="mt-0.5 shrink-0 text-[var(--quaternary)]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* DON'T */}
          <div
            className="topic-card animate-slide rounded-2xl p-7"
            style={{
              animationDelay: "100ms",
              borderRadius: "var(--radius-lg)",
              boxShadow: "8px 8px 0px 0px var(--secondary)",
              border: "3px solid var(--foreground)",
            }}
          >
            <div className="mb-5 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[var(--foreground)]"
                style={{ background: "var(--secondary)" }}
              >
                <XCircle
                  size={20}
                  strokeWidth={2.5}
                  className="text-white"
                />
              </div>
              <h3 className="font-outfit text-xl font-extrabold text-[var(--foreground)]">
                ❌ 不适合使用 Wasm
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                "纯 DOM 操作 / UI 渲染逻辑",
                "简单的表单验证与数据格式化",
                "网络请求密集型业务逻辑",
                "项目团队无 C/Rust/Go 开发能力",
                "首次加载性能要求极高（Wasm 包体积）",
                "需要快速原型开发的场景",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground)]/80">
                  <XCircle
                    size={16}
                    strokeWidth={2.5}
                    className="mt-0.5 shrink-0 text-[var(--secondary)]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── REAL WORLD CASES BENTO ─── */}
      <section className="container py-12">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            落地实践
          </span>
          <h2 className="mt-2 font-outfit text-3xl font-extrabold text-[var(--foreground)] md:text-4xl">
            你一定用过这些产品
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              name: "Figma",
              desc: "核心渲染引擎使用 C++ → Wasm，实现浏览器中的矢量设计体验",
              color: "var(--accent)",
              icon: Monitor,
              span: "md:col-span-2",
            },
            {
              name: "Google Earth",
              desc: "3D 地球完整运行在 Wasm 中",
              color: "var(--quaternary)",
              icon: Globe,
              span: "",
            },
            {
              name: "1Password",
              desc: "Argon2 密钥派生使用 Wasm 加速，保障安全同时提升速度",
              color: "var(--secondary)",
              icon: Shield,
              span: "",
            },
            {
              name: "Squoosh",
              desc: "Google 出品的图像压缩器，编解码核心全部由 Wasm 驱动",
              color: "var(--tertiary)",
              icon: Image,
              span: "md:col-span-2",
            },
          ].map((case_, i) => (
            <div
              key={i}
              className={`topic-card animate-slide group relative overflow-hidden rounded-2xl p-6 ${case_.span}`}
              style={{
                animationDelay: `${i * 80}ms`,
                borderRadius: "var(--radius-lg)",
                boxShadow: "8px 8px 0px 0px var(--foreground)",
              }}
            >
              <div
                className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-15 transition-transform group-hover:scale-150"
                style={{ background: case_.color }}
              />
              <div className="relative flex items-center gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--foreground)]"
                  style={{ background: case_.color }}
                >
                  <case_.icon
                    size={26}
                    strokeWidth={2.5}
                    className="text-white"
                  />
                </div>
                <div>
                  <h3 className="font-outfit text-xl font-extrabold text-[var(--foreground)]">
                    {case_.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--foreground)]/60">
                    {case_.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FUTURE OUTLOOK ─── */}
      <section className="container py-12">
        <div
          className="animate-pop relative overflow-hidden rounded-2xl p-8 text-center md:p-12"
          style={{
            background: "var(--foreground)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "8px 8px 0px 0px var(--accent)",
          }}
        >
          {/* blobs */}
          <div
            className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 opacity-20"
            style={{
              background: "var(--accent)",
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 opacity-15"
            style={{
              background: "var(--secondary)",
              borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
            }}
          />

          <div className="relative z-10">
            <div
              className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--foreground)]"
              style={{ background: "var(--tertiary)" }}
            >
              <Rocket size={14} strokeWidth={2.5} />
              前瞻展望
            </div>
            <h2 className="font-outfit text-3xl font-extrabold text-white md:text-4xl">
              Wasm 的未来不在浏览器
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/60">
              随着 <strong className="text-[var(--tertiary)]">WASI（WebAssembly System Interface）</strong>的成熟，
              Wasm 正从浏览器走向服务端、边缘计算、IoT 和插件系统。
              <strong className="text-[var(--accent)]">Write once, run anywhere</strong> 的愿景
              正在通过组件模型和标准化系统接口逐步实现。
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {[
                { icon: Server, label: "服务端" },
                { icon: Smartphone, label: "边缘计算" },
                { icon: Workflow, label: "插件系统" },
                { icon: Layers, label: "容器替代" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="animate-slide flex items-center gap-2 rounded-xl border-2 border-white/20 bg-white/10 px-4 py-2.5 text-sm font-bold text-white"
                  style={{ animationDelay: `${200 + i * 100}ms` }}
                >
                  <item.icon size={18} strokeWidth={2.5} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}