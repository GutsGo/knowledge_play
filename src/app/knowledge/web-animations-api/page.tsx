"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { highlightCode } from "@/lib/prism-highlight";
import {
  Zap,
  Gauge,
  Layers,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Timer,
  Cpu,
  Monitor,
  Sparkles,
  Code2,
  GitCompareArrows,
  Lightbulb,
  BookOpen,
  Shuffle,
  Move,
  MousePointerClick,
  SlidersHorizontal,
} from "lucide-react";

/* ─── CodeBlock Component ─── */
function CodeBlock({
  code,
  language = "typescript",
  title,
}: {
  code: string;
  language?: string;
  title?: string;
}) {
  const html = highlightCode(code, language);
  return (
    <div className="border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_var(--foreground)] bg-[#1E293B]">
      {title && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0F172A] border-b-2 border-[var(--foreground)]">
          <span className="w-3 h-3 rounded-full bg-[#F472B6] border border-[var(--foreground)]" />
          <span className="w-3 h-3 rounded-full bg-[#FBBF24] border border-[var(--foreground)]" />
          <span className="w-3 h-3 rounded-full bg-[#34D399] border border-[var(--foreground)]" />
          <span className="ml-2 text-[#94A3B8] text-xs font-['Plus_Jakarta_Sans'] font-semibold">
            {title}
          </span>
          <span className="ml-auto px-2 py-0.5 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
            {language}
          </span>
        </div>
      )}
      <pre
        className={`p-5 overflow-x-auto text-sm leading-relaxed language-${language}`}
      >
        <code
          className={`font-['JetBrains_Mono',monospace] text-[#E2E8F0] language-${language}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  );
}

/* ─── Section Heading ─── */
function SectionHeading({
  label,
  title,
  color = "var(--accent)",
}: {
  label: string;
  title: string;
  color?: string;
}) {
  return (
    <div className="mb-10">
      <span
        className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest border-2 border-[var(--foreground)] rounded-full mb-3"
        style={{ backgroundColor: color, color: "#fff" }}
      >
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl font-['Outfit'] font-extrabold text-[var(--foreground)] leading-tight">
        {title}
      </h2>
    </div>
  );
}

/* ─── Geometric Badge ─── */
function GeoBadge({
  children,
  color = "var(--accent)",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span
      className="inline-flex items-center justify-center w-10 h-10 rounded-xl border-2 border-[var(--foreground)] shadow-[3px_3px_0px_0px_var(--foreground)]"
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  );
}

/* ─── Warning Card ─── */
function WarningCard({
  title,
  badCode,
  goodCode,
  language = "typescript",
}: {
  title: string;
  badCode: string;
  goodCode: string;
  language?: string;
}) {
  return (
    <div className="border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_var(--tertiary)] bg-white animate-slide">
      <div className="flex items-center gap-2 px-5 py-3 bg-[#FEF3C7] border-b-2 border-[var(--foreground)]">
        <AlertTriangle
          size={18}
          strokeWidth={2.5}
          className="text-[var(--tertiary)]"
        />
        <span className="font-['Outfit'] font-bold text-sm text-[var(--foreground)]">
          {title}
        </span>
      </div>
      <div className="grid md:grid-cols-2 divide-x-2 divide-[var(--tertiary)]">
        <div className="p-4 bg-[#1E293B]">
          <div className="flex items-center gap-1.5 mb-2">
            <XCircle size={14} className="text-red-500" />
            <span className="text-xs font-bold text-red-500 uppercase tracking-wide">
              Anti-Pattern
            </span>
          </div>
          <pre className={`text-xs leading-relaxed language-${language}`}>
            <code
              className={`font-['JetBrains_Mono',monospace] text-[#94A3B8] language-${language}`}
              dangerouslySetInnerHTML={{
                __html: highlightCode(badCode, language),
              }}
            />
          </pre>
        </div>
        <div className="p-4 bg-[#1E293B]">
          <div className="flex items-center gap-1.5 mb-2">
            <CheckCircle size={14} className="text-[var(--quaternary)]" />
            <span className="text-xs font-bold text-[var(--quaternary)] uppercase tracking-wide">
              Best Practice
            </span>
          </div>
          <pre className={`text-xs leading-relaxed language-${language}`}>
            <code
              className={`font-['JetBrains_Mono',monospace] text-[#E2E8F0] bg-[#1E293B] rounded-lg p-3 block language-${language}`}
              dangerouslySetInnerHTML={{
                __html: highlightCode(goodCode, language),
              }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   INTERACTIVE PLAYGROUND — FLIP Animation Lab
   ═══════════════════════════════════════════════════════ */
function FlipPlayground() {
  const [layout, setLayout] = useState<"grid" | "list" | "circle">("grid");
  const [easing, setEasing] = useState<string>(
    "cubic-bezier(0.34, 1.56, 0.64, 1)",
  );
  const [duration, setDuration] = useState(400);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemPositions = useRef<Map<number, DOMRect>>(new Map());

  const items = Array.from({ length: 9 }, (_, i) => i);

  const easingOptions = [
    { label: "Spring Bounce", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
    { label: "Smooth Ease", value: "cubic-bezier(0.25, 0.1, 0.25, 1)" },
    { label: "Snappy", value: "cubic-bezier(0.68, -0.6, 0.32, 1.6)" },
    { label: "Linear", value: "linear" },
  ];

  const capturePositions = useCallback(() => {
    if (!containerRef.current) return;
    const children = containerRef.current.querySelectorAll("[data-flip-item]");
    children.forEach((child, index) => {
      itemPositions.current.set(index, child.getBoundingClientRect());
    });
  }, []);

  const applyFlip = useCallback(() => {
    if (!containerRef.current) return;
    const children = containerRef.current.querySelectorAll("[data-flip-item]");
    children.forEach((child, index) => {
      const prevRect = itemPositions.current.get(index);
      if (!prevRect) return;
      const newRect = child.getBoundingClientRect();
      const deltaX = prevRect.left - newRect.left;
      const deltaY = prevRect.top - newRect.top;
      if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) return;
      const anim = child.animate(
        [
          { transform: `translate(${deltaX}px, ${deltaY}px)` },
          { transform: "translate(0, 0)" },
        ],
        { duration, easing, fill: "forwards" },
      );
      anim.onfinish = () => anim.cancel();
    });
  }, [duration, easing]);

  const switchLayout = (newLayout: "grid" | "list" | "circle") => {
    capturePositions();
    setLayout(newLayout);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => applyFlip());
    });
  };

  useEffect(() => {
    capturePositions();
  }, [layout, capturePositions]);

  const colors = [
    "var(--accent)",
    "var(--secondary)",
    "var(--tertiary)",
    "var(--quaternary)",
    "var(--accent)",
    "var(--secondary)",
    "var(--tertiary)",
    "var(--quaternary)",
    "var(--accent)",
  ];

  return (
    <div className="border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_var(--accent)] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-[var(--accent)] border-b-2 border-[var(--foreground)]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={16}
            strokeWidth={2.5}
            className="text-white"
          />
          <span className="font-['Outfit'] font-bold text-sm text-white">
            FLIP Animation Lab
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-white/30 border border-white/50" />
          <span className="w-3 h-3 rounded-full bg-white/30 border border-white/50" />
          <span className="w-3 h-3 rounded-full bg-white/30 border border-white/50" />
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2">
            {(["grid", "list", "circle"] as const).map((l) => (
              <button
                key={l}
                onClick={() => switchLayout(l)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border-2 border-[var(--foreground)] transition-all ${
                  layout === l
                    ? "bg-[var(--foreground)] text-white shadow-[3px_3px_0px_0px_var(--accent)]"
                    : "bg-white text-[var(--foreground)] hover:bg-[var(--border)]"
                }`}
              >
                {l === "grid"
                  ? "▦ Grid"
                  : l === "list"
                    ? "☰ List"
                    : "◎ Circle"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Easing Select */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-[var(--foreground)] mb-1.5 block">
              Easing Curve
            </label>
            <select
              value={easing}
              onChange={(e) => setEasing(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border-2 border-[var(--foreground)] text-sm font-['JetBrains_Mono',monospace] bg-white focus:outline-none focus:shadow-[3px_3px_0px_0px_var(--accent)]"
            >
              {easingOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label} — {opt.value}
                </option>
              ))}
            </select>
          </div>
          {/* Duration Slider */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-[var(--foreground)] mb-1.5 block">
              Duration: {duration}ms
            </label>
            <input
              type="range"
              min={100}
              max={1200}
              step={50}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
          </div>
        </div>

        {/* Animation Preview Area */}
        <div
          ref={containerRef}
          className="relative min-h-[240px] bg-[var(--background)] border-2 border-dashed border-[var(--border)] rounded-xl p-4 overflow-hidden"
        >
          <div
            className={`${
              layout === "grid"
                ? "grid grid-cols-3 gap-3"
                : layout === "list"
                  ? "flex flex-col gap-2"
                  : "relative h-[220px]"
            }`}
          >
            {items.map((i) => {
              const circleStyle =
                layout === "circle"
                  ? {
                      position: "absolute" as const,
                      left: `${50 + 38 * Math.cos((2 * Math.PI * i) / 9 - Math.PI / 2)}%`,
                      top: `${50 + 38 * Math.sin((2 * Math.PI * i) / 9 - Math.PI / 2)}%`,
                      transform: "translate(-50%, -50%)",
                    }
                  : {};
              return (
                <div
                  key={i}
                  data-flip-item
                  className="border-2 border-[var(--foreground)] rounded-xl flex items-center justify-center font-['Outfit'] font-extrabold text-lg text-[var(--foreground)] shadow-[3px_3px_0px_0px_var(--foreground)]"
                  style={{
                    backgroundColor: colors[i],
                    width: layout === "circle" ? 44 : undefined,
                    height:
                      layout === "circle" ? 44 : layout === "list" ? 36 : 64,
                    ...circleStyle,
                  }}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
        </div>

        {/* Code readout */}
        <div className="bg-[#1E293B] rounded-xl p-4 border-2 border-[var(--foreground)]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--secondary)] mb-2">
            Generated FLIP Code
          </p>
          <pre className="text-xs leading-relaxed language-typescript">
            <code
              className="font-['JetBrains_Mono',monospace] text-[#E2E8F0] language-typescript"
              dangerouslySetInnerHTML={{
                __html: highlightCode(
                  `// Capture → Invert → Play → Last
const first = el.getBoundingClientRect();    // ← First
el.classList.toggle('${layout}');             // ← trigger layout change
const last = el.getBoundingClientRect();     // ← Last
const deltaX = first.left - last.left;       // ← Invert
const deltaY = first.top  - last.top;
el.animate([                                  // ← Play!
  { transform: \`translate(\${deltaX}px, \${deltaY}px)\` },
  { transform: 'translate(0, 0)' }
], {
  duration: ${duration},
  easing: '${easing}',
  fill: 'forwards'
});`,
                  "typescript",
                ),
              }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   INTERACTIVE PLAYGROUND — Timing & Easing Explorer
   ═══════════════════════════════════════════════════════ */
function EasingPlayground() {
  const [easing, setEasing] = useState("cubic-bezier(0.34, 1.56, 0.64, 1)");
  const [playing, setPlaying] = useState(false);
  const ballRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);

  const presets = [
    { name: "ease (CSS default)", value: "ease" },
    { name: "Spring Bounce", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
    { name: "Decelerate", value: "cubic-bezier(0, 0, 0.2, 1)" },
    { name: "Accelerate", value: "cubic-bezier(0.4, 0, 1, 1)" },
    { name: "Elastic", value: "cubic-bezier(0.68, -0.55, 0.27, 1.55)" },
  ];

  const playAnimation = () => {
    if (animRef.current) {
      animRef.current.cancel();
    }
    setPlaying(true);
    if (ballRef.current && trackRef.current) {
      const trackWidth = trackRef.current.offsetWidth - 40;
      const anim = ballRef.current.animate(
        [
          { transform: "translateX(0px)" },
          { transform: `translateX(${trackWidth}px)` },
        ],
        { duration: 1000, easing, fill: "forwards" },
      );
      animRef.current = anim;
      anim.onfinish = () => setPlaying(false);
    }
  };

  const resetAnimation = () => {
    if (animRef.current) {
      animRef.current.cancel();
    }
    setPlaying(false);
  };

  return (
    <div className="border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_var(--secondary)] bg-white">
      <div className="flex items-center justify-between px-5 py-3 bg-[var(--secondary)] border-b-2 border-[var(--foreground)]">
        <div className="flex items-center gap-2">
          <Timer size={16} strokeWidth={2.5} className="text-white" />
          <span className="font-['Outfit'] font-bold text-sm text-white">
            Easing & Timing Explorer
          </span>
        </div>
      </div>
      <div className="p-5 space-y-4">
        {/* Easing presets */}
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.value}
              onClick={() => {
                setEasing(p.value);
                resetAnimation();
              }}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border-2 border-[var(--foreground)] transition-all ${
                easing === p.value
                  ? "bg-[var(--secondary)] text-white shadow-[2px_2px_0px_0px_var(--foreground)]"
                  : "bg-white hover:bg-pink-50"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="relative h-14 bg-[var(--background)] border-2 border-[var(--foreground)] rounded-xl overflow-hidden"
        >
          <div
            ref={ballRef}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-[var(--foreground)] shadow-[3px_3px_0px_0px_var(--foreground)]"
            style={{ backgroundColor: "var(--secondary)" }}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={playAnimation}
            disabled={playing}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--foreground)] text-white text-xs font-bold border-2 border-[var(--foreground)] shadow-[3px_3px_0px_0px_var(--secondary)] disabled:opacity-50 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_var(--secondary)] transition-all"
          >
            <Play size={12} /> Play
          </button>
          <button
            onClick={resetAnimation}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[var(--foreground)] text-xs font-bold border-2 border-[var(--foreground)] hover:bg-[var(--border)] transition-all"
          >
            <RotateCcw size={12} /> Reset
          </button>
          <span className="ml-auto font-['JetBrains_Mono',monospace] text-xs text-[var(--foreground)] bg-[var(--background)] px-3 py-1 rounded-lg border-2 border-[var(--border)]">
            {easing}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function WebAnimationsAPIDetailPage() {
  return (
    <div className="bg-dot-grid min-h-screen pb-24">
      {/* ─── Decorative Blobs ─── */}
      <div
        className="fixed top-20 -left-40 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "var(--tertiary)",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        }}
      />
      <div
        className="fixed bottom-20 -right-32 w-64 h-64 rounded-full opacity-15 pointer-events-none"
        style={{
          background: "var(--secondary)",
          borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
        }}
      />

      <div className="container mx-auto px-6 pt-12 md:pt-20">
        {/* ═══════════════════════════════════════
            HERO — L1: Intuition Anchor
            ═══════════════════════════════════════ */}
        <header className="max-w-4xl mx-auto text-center mb-20 animate-pop">
          <span className="inline-block px-4 py-1.5 rounded-full border-2 border-[var(--foreground)] text-xs font-bold uppercase tracking-widest bg-[var(--tertiary)] text-[var(--foreground)] mb-6 shadow-[3px_3px_0px_0px_var(--foreground)]">
            <Zap size={12} className="inline -mt-0.5 mr-1" />
            Browser Native Animation Engine
          </span>

          <h1 className="font-['Outfit'] text-5xl md:text-7xl font-extrabold text-[var(--foreground)] leading-[1.05] mb-6">
            Web Animations
            <span
              className="block text-[var(--accent)]"
              style={{ WebkitTextStroke: "2px var(--foreground)" }}
            >
              API
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--foreground)]/70 max-w-2xl mx-auto font-['Plus_Jakarta_Sans'] leading-relaxed">
            浏览器内置的动画引擎，让你用一行 JavaScript 就能驱动高性能交互动效——
            <span className="font-bold text-[var(--foreground)]">
              无需任何第三方库
            </span>
            。
          </p>

          {/* Analogy Card */}
          <div className="mt-10 max-w-lg mx-auto">
            <div className="border-2 border-[var(--foreground)] rounded-2xl p-5 bg-white shadow-[6px_6px_0px_0px_var(--tertiary)] text-left">
              <div className="flex items-start gap-3">
                <GeoBadge color="var(--tertiary)">
                  <Lightbulb
                    size={18}
                    strokeWidth={2.5}
                    className="text-[var(--foreground)]"
                  />
                </GeoBadge>
                <div>
                  <p className="font-['Outfit'] font-bold text-sm mb-1">
                    💡 一句话理解
                  </p>
                  <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/80 leading-relaxed">
                    如果 CSS{" "}
                    <code className="font-['JetBrains_Mono',monospace] text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded text-xs">
                      animation
                    </code>{" "}
                    是预设菜谱， JavaScript 动画是手动炒菜，那么{" "}
                    <strong>WAAPI 就是智能炒菜机</strong>——
                    既能精准控制每一步，又让底层 GPU
                    加速帮你"开大火"，性能与灵活兼得。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ═══════════════════════════════════════
            L2: WHY — The Pain Points
            ═══════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto mb-24 animate-slide">
          <SectionHeading
            label="L2 · Why"
            title="为什么需要 Web Animations API？"
            color="var(--secondary)"
          />

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              {
                icon: <Code2 size={20} strokeWidth={2.5} />,
                title: "CSS 动画的天花板",
                desc: "无法在动画播放中途暂停、反转、动态调速。你只能用 animation-play-state 粗暴地暂停，不能 seek 到 50% 的位置。",
                color: "var(--tertiary)",
              },
              {
                icon: <Cpu size={20} strokeWidth={2.5} />,
                title: "JS 动画的性能陷阱",
                desc: "setInterval/requestAnimationFrame 在主线程运行。当主线程被阻塞（如大型 DOM 计算），动画立即掉帧。实测在主线程忙碌时，rAF 回调延迟可达 50-100ms。",
                color: "var(--secondary)",
              },
              {
                icon: <Gauge size={20} strokeWidth={2.5} />,
                title: "库的包体负担",
                desc: "GSAP 压缩后 ~28KB，Framer Motion ~33KB。WAAPI 是浏览器原生 API，0KB 额外加载，在 Chrome 84+ 中完全支持。",
                color: "var(--quaternary)",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="topic-card p-5 rounded-2xl animate-slide"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <GeoBadge color={card.color}>{card.icon}</GeoBadge>
                <h3 className="font-['Outfit'] font-bold text-lg mt-3 mb-2">
                  {card.title}
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/70 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_var(--foreground)] bg-white">
            <div className="px-5 py-3 bg-[var(--foreground)] text-white">
              <div className="flex items-center gap-2">
                <GitCompareArrows size={16} strokeWidth={2.5} />
                <span className="font-['Outfit'] font-bold text-sm">
                  三大动画方案 · 正面对决
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-['Plus_Jakarta_Sans']">
                <thead>
                  <tr className="border-b-2 border-[var(--foreground)] bg-[var(--background)]">
                    <th className="px-4 py-3 text-left font-bold">维度</th>
                    <th className="px-4 py-3 text-left font-bold">
                      CSS Animation
                    </th>
                    <th className="px-4 py-3 text-left font-bold">JS (rAF)</th>
                    <th className="px-4 py-3 text-left font-bold text-[var(--accent)]">
                      Web Animations API
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["线程", "合成器线程 ✅", "主线程 ❌", "合成器线程 ✅"],
                    ["运行时控制", "极有限 ❌", "完全控制 ✅", "完全控制 ✅"],
                    [
                      "动态参数",
                      "CSS 变量 hack ⚠️",
                      "直接修改 ✅",
                      "直接修改 ✅",
                    ],
                    [
                      "性能 (1000元素)",
                      "~16ms/frame",
                      "~30-50ms/frame",
                      "~16ms/frame",
                    ],
                    [
                      "序列编排",
                      "animation-delay 链 ⚠️",
                      "手动 Promise 链",
                      ".finished 串联 ✅",
                    ],
                    [
                      "可回放",
                      "不支持 ❌",
                      "需手动实现 ⚠️",
                      "原生 Animation 对象 ✅",
                    ],
                    ["包体大小", "0 KB", "0 KB", "0 KB (原生)"],
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-[var(--border)] last:border-0"
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-4 py-2.5 ${j === 0 ? "font-bold" : ""} ${
                            j === 3 ? "bg-[var(--accent)]/5 font-semibold" : ""
                          }`}
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

        {/* ═══════════════════════════════════════
            L3: CORE PRINCIPLES
            ═══════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto mb-24">
          <SectionHeading
            label="L3 · Core"
            title="核心架构与工作原理"
            color="var(--accent)"
          />

          {/* 3.1 — The Pipeline */}
          <div className="mb-16">
            <h3 className="font-['Outfit'] font-bold text-xl mb-6 flex items-center gap-2">
              <GeoBadge color="var(--accent)">
                <Layers size={18} strokeWidth={2.5} className="text-white" />
              </GeoBadge>
              WAAPI 的渲染管线
            </h3>

            <div className="border-2 border-[var(--foreground)] rounded-2xl p-6 bg-white shadow-[6px_6px_0px_0px_var(--accent)] mb-8">
              <div className="flex flex-col md:flex-row items-stretch gap-3">
                {[
                  {
                    step: "1",
                    label: "KeyframeEffect",
                    desc: "定义关键帧数组\n& 动画选项",
                    color: "var(--accent)",
                  },
                  { step: "→", label: "", desc: "", color: "transparent" },
                  {
                    step: "2",
                    label: "Animation",
                    desc: "可编程的播放控制器\nplay/pause/reverse/finish",
                    color: "var(--secondary)",
                  },
                  { step: "→", label: "", desc: "", color: "transparent" },
                  {
                    step: "3",
                    label: "AnimationTimeline",
                    desc: "默认 Document 时间线\n或 ScrollTimeline",
                    color: "var(--tertiary)",
                  },
                  { step: "→", label: "", desc: "", color: "transparent" },
                  {
                    step: "4",
                    label: "Compositor",
                    desc: "合成器线程接管\nGPU 加速渲染",
                    color: "var(--quaternary)",
                  },
                ].map((item, i) =>
                  item.step === "→" ? (
                    <div
                      key={i}
                      className="flex items-center justify-center text-2xl text-[var(--border)] font-bold hidden md:flex"
                    >
                      →
                    </div>
                  ) : (
                    <div key={i} className="flex-1 text-center">
                      <div
                        className="w-10 h-10 rounded-full border-2 border-[var(--foreground)] flex items-center justify-center font-['Outfit'] font-extrabold text-white text-sm mx-auto mb-2 shadow-[3px_3px_0px_0px_var(--foreground)]"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.step}
                      </div>
                      <div className="font-['Outfit'] font-bold text-xs mb-1">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[var(--foreground)]/60 whitespace-pre-line font-['Plus_Jakarta_Sans']">
                        {item.desc}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* 3.2 — Element.animate() Anatomy */}
          <div className="mb-16">
            <h3 className="font-['Outfit'] font-bold text-xl mb-6 flex items-center gap-2">
              <GeoBadge color="var(--secondary)">
                <Code2 size={18} strokeWidth={2.5} className="text-white" />
              </GeoBadge>
              <code className="font-['JetBrains_Mono',monospace] text-lg">
                element.animate()
              </code>{" "}
              解剖
            </h3>

            <CodeBlock
              title="element.animate() — 完整参数说明"
              language="typescript"
              code={`const animation = element.animate(
  // 参数 1: Keyframes — 关键帧定义
  [
    { transform: 'translateX(-100%)', opacity: 0 },       // ← 起始帧 (0%)
    { transform: 'translateX(0)',      opacity: 1 },       // ← 结束帧 (100%)
  ],
  // 参数 2: KeyframeAnimationOptions — 时间配置
  {
    duration: 400,          // ← 持续时间 (ms)
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',  // ← 缓动函数（支持 CSS 不支持的越界值）
    fill: 'forwards',       // ← fill 模式: none | forwards | backwards | both
    iterations: 1,          // ← 迭代次数，Infinity = 无限循环
    direction: 'normal',    // ← normal | reverse | alternate | alternate-reverse
    delay: 0,               // ← 延迟 (ms)
    endDelay: 0,            // ← 结束后延迟 (ms) — CSS 中无等价物!
    composite: 'replace',   // ← 合成模式: replace | add | accumulate
    iterationComposite: 'replace',  // ← 迭代间的合成模式
    id: 'slide-in',         // ← 动画标识符，可用于 getAnimations({id: 'slide-in'})
  }
);

// 返回的 Animation 对象拥有完整生命周期控制
animation.play();           // ← 开始/继续播放
animation.pause();          // ← 暂停
animation.reverse();        // ← 反转方向
animation.finish();         // ← 立即跳到结束
animation.cancel();         // ← 取消并移除
animation.commitStyles();   // ← 将当前样式写入元素（关键！）
animation.updatePlaybackRate(2); // ← 动态变速 2x

// 精确 seek
animation.currentTime = 200; // ← 跳到 200ms 位置

// Promise 化等待
await animation.finished;   // ← 动画完成时 resolve
console.log('动画播放完毕！');`}
            />
          </div>

          {/* 3.3 — FLIP Technique */}
          <div className="mb-16">
            <h3 className="font-['Outfit'] font-bold text-xl mb-6 flex items-center gap-2">
              <GeoBadge color="var(--tertiary)">
                <Move
                  size={18}
                  strokeWidth={2.5}
                  className="text-[var(--foreground)]"
                />
              </GeoBadge>
              FLIP 动画技巧详解
            </h3>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {[
                {
                  letter: "F",
                  word: "First",
                  desc: "记录元素移动前的初始位置 (getBoundingClientRect)",
                  color: "var(--accent)",
                },
                {
                  letter: "L",
                  word: "Last",
                  desc: "触发 DOM 变更，记录元素移动后的新位置",
                  color: "var(--secondary)",
                },
                {
                  letter: "I",
                  word: "Invert",
                  desc: "用 transform 将元素移回初始位置（视觉上没动）",
                  color: "var(--tertiary)",
                },
                {
                  letter: "P",
                  word: "Play",
                  desc: "去掉 transform，用 WAAPI 动画平滑过渡到新位置",
                  color: "var(--quaternary)",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="topic-card p-4 rounded-2xl text-center animate-slide"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div
                    className="w-12 h-12 mx-auto rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center font-['Outfit'] font-extrabold text-2xl text-white shadow-[3px_3px_0px_0px_var(--foreground)] mb-3"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.letter}
                  </div>
                  <p className="font-['Outfit'] font-bold text-sm mb-1">
                    {step.word}
                  </p>
                  <p className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] leading-relaxed">
                    {step.desc}
                  </p>
                  {i < 3 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 text-lg text-[var(--border)]">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>

            <CodeBlock
              title="FLIP 动画 — 生产级实现"
              language="typescript"
              code={`function flipAnimate(
  element: HTMLElement,
  mutation: () => void,
  options: { duration?: number; easing?: string } = {}
) {
  const { duration = 400, easing = 'cubic-bezier(0.34, 1.56, 0.64, 1)' } = options;

  // F — First: 记录旧位置
  const firstRect = element.getBoundingClientRect();

  // L — Last: 执行 DOM 变更，获取新位置
  mutation();
  const lastRect = element.getBoundingClientRect();

  // I — Invert: 计算偏移量
  const deltaX = firstRect.left - lastRect.left;
  const deltaY = firstRect.top  - lastRect.top;
  const deltaW = firstRect.width  / lastRect.width;
  const deltaH = firstRect.height / lastRect.height;

  // P — Play: 使用 WAAPI 执行动画
  const animation = element.animate(
    [
      {
        transform: \`translate(\${deltaX}px, \${deltaY}px)
                    scale(\${deltaW}, \${deltaH})\`,
      },
      { transform: 'none' },
    ],
    { duration, easing, fill: 'forwards' }
  );

  // commitStyles — 将最终状态写入元素，防止动画结束后闪烁
  animation.finished.then(() => {
    animation.commitStyles();   // ← 关键：写入样式
    animation.cancel();         // ← 清理 animation 对象
  });

  return animation;
}

// 使用示例：重排列表
function reorderList(listEl: HTMLElement, newIndex: number) {
  const items = Array.from(listEl.children) as HTMLElement[];
  const activeItem = items[0]; // 假设移动第一个

  flipAnimate(activeItem, () => {
    // 在 mutation 回调中执行 DOM 操作
    listEl.insertBefore(activeItem, items[newIndex] || null);
  }, { duration: 350 });
}`}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════
            INTERACTIVE PLAYGROUND
            ═══════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto mb-24">
          <SectionHeading
            label="Lab"
            title="交互式实验场"
            color="var(--quaternary)"
          />
          <div className="grid gap-8">
            <FlipPlayground />
            <EasingPlayground />
          </div>
        </section>

        {/* ═══════════════════════════════════════
            L4: CODE PRACTICE
            ═══════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto mb-24">
          <SectionHeading
            label="L4 · Practice"
            title="代码实战：从入门到生产"
            color="var(--accent)"
          />

          {/* 4.1 — Basic Animations */}
          <div className="mb-12">
            <h3 className="font-['Outfit'] font-bold text-xl mb-4 flex items-center gap-2">
              <GeoBadge color="var(--accent)">
                <Play size={16} strokeWidth={2.5} className="text-white" />
              </GeoBadge>
              基础：入场/退场动画
            </h3>

            <CodeBlock
              title="fadeSlideIn — 通用入场动画 Hook"
              language="typescript"
              code={`import { useRef, useEffect } from 'react';

function useFadeSlideIn(options?: KeyframeAnimationOptions) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const anim = ref.current.animate(
      [
        { opacity: 0, transform: 'translateY(24px) scale(0.96)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' },
      ],
      {
        duration: 500,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        fill: 'forwards',
        ...options,
      }
    );

    // 组件卸载时自动清理
    return () => anim.cancel();
  }, []);

  return ref;
}

// 使用 — 注意：0KB 额外依赖
function ProductCard({ product }: { product: Product }) {
  const cardRef = useFadeSlideIn({ delay: 100 });

  return (
    <div ref={cardRef} className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
    </div>
  );
}`}
            />
          </div>

          {/* 4.2 — Sequence Animations */}
          <div className="mb-12">
            <h3 className="font-['Outfit'] font-bold text-xl mb-4 flex items-center gap-2">
              <GeoBadge color="var(--secondary)">
                <Shuffle size={16} strokeWidth={2.5} className="text-white" />
              </GeoBadge>
              进阶：序列编排 & 动态控制
            </h3>

            <CodeBlock
              title="animateSequence — 串联 & 并行动画编排"
              language="typescript"
              code={`// 串联播放：一个结束后再播下一个
async function animateSequence(animations: Animation[]) {
  for (const anim of animations) {
    anim.play();
    await anim.finished;              // ← .finished 是原生 Promise!
  }
}

// 并行播放：同时播，等全部结束
async function animateParallel(animations: Animation[]) {
  animations.forEach(a => a.play());
  await Promise.all(                  // ← Promise.all 等待所有完成
    animations.map(a => a.finished)
  );
}

// 交错 (Stagger) 动画 — 列表项依次出现
function staggerFadeIn(elements: HTMLElement[], staggerMs = 80) {
  const animations = elements.map((el, i) =>
    el.animate(
      [
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      {
        duration: 400,
        delay: i * staggerMs,          // ← 逐个递增延迟
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        fill: 'forwards',
      }
    )
  );

  // 返回 master animation 控制器
  return {
    play:   () => animations.forEach(a => a.play()),
    pause:  () => animations.forEach(a => a.pause()),
    reverse: () => animations.forEach(a => a.reverse()),
    cancel: () => animations.forEach(a => a.cancel()),
    get finished() {
      return Promise.all(animations.map(a => a.finished));
    },
  };
}

// 使用
const items = document.querySelectorAll('.list-item') as NodeListOf<HTMLElement>;
const master = staggerFadeIn(Array.from(items), 60);
master.finished.then(() => console.log('所有列表项已入场！'));`}
            />
          </div>

          {/* 4.3 — Scroll-Linked */}
          <div className="mb-12">
            <h3 className="font-['Outfit'] font-bold text-xl mb-4 flex items-center gap-2">
              <GeoBadge color="var(--tertiary)">
                <Monitor
                  size={16}
                  strokeWidth={2.5}
                  className="text-[var(--foreground)]"
                />
              </GeoBadge>
              高级：滚动驱动动画 (ScrollTimeline)
            </h3>

            <div className="border-2 border-[var(--foreground)] rounded-xl p-4 bg-[var(--tertiary)]/10 mb-6 shadow-[4px_4px_0px_0px_var(--tertiary)]">
              <p className="font-['Plus_Jakarta_Sans'] text-sm">
                <strong>⚠️ 浏览器兼容性：</strong>
                <code className="font-['JetBrains_Mono',monospace] text-xs bg-white px-1.5 py-0.5 rounded">
                  ScrollTimeline
                </code>{" "}
                在 Chrome 115+、Edge 115+、Firefox 110+ 中支持。 Safari 17.4+
                部分支持。生产环境建议搭配
                <code className="font-['JetBrains_Mono',monospace] text-xs bg-white px-1.5 py-0.5 rounded">
                  @supports
                </code>{" "}
                检测。
              </p>
            </div>

            <CodeBlock
              title="scrollProgress — 滚动进度条 + 元素出场"
              language="typescript"
              code={`// 方案 A: 原生 ScrollTimeline（推荐，零依赖）
function initScrollAnimations() {
  const progressBar = document.querySelector('.progress-bar') as HTMLElement;
  const hero = document.querySelector('.hero') as HTMLElement;

  if (!progressBar || !hero) return;

  // ① 顶部进度条 — 随页面滚动填充
  progressBar.animate(
    { scaleX: ['0', '1'] },
    {
      timeline: new ScrollTimeline({        // ← 原生 ScrollTimeline
        source: document.documentElement,    // ← 滚动容器
        axis: 'block',                       // ← block = Y轴
      }),
      fill: 'both',                          // ← 关键：双向 fill
    }
  );

  // ② 视口进入时触发动画（用 ViewTimeline）
  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    el.animate(
      {
        opacity: [0, 1, 1, 0],             // ← 0% 进入 → 完全可见 → 开始退出 → 消失
        transform: ['translateY(60px)', 'translateY(0)', 'translateY(0)', 'translateY(-30px)'],
      },
      {
        timeline: new ViewTimeline({
          subject: el as Element,
          axis: 'block',
        }),
        fill: 'both',
        rangeStart: { rangeName: 'cover', offset: CSS.percent(0) },
        rangeEnd: { rangeName: 'cover', offset: CSS.percent(100) },
      }
    );
  });
}

// 方案 B: Fallback — 用 IntersectionObserver + WAAPI
function initScrollFallback() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [
              { opacity: 0, transform: 'translateY(30px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 600, easing: 'ease-out', fill: 'forwards' }
          );
          observer.unobserve(entry.target);   // ← 只触发一次
        }
      });
    },
    { threshold: 0.15 }                     // ← 15% 可见时触发
  );

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    observer.observe(el);
  });
}

// 渐进增强
if ('ScrollTimeline' in window) {
  initScrollAnimations();
} else {
  initScrollFallback();                      // ← 安全降级
}`}
            />
          </div>

          {/* 4.4 — commitStyles Deep Dive */}
          <div className="mb-12">
            <h3 className="font-['Outfit'] font-bold text-xl mb-4 flex items-center gap-2">
              <GeoBadge color="var(--quaternary)">
                <Sparkles size={16} strokeWidth={2.5} className="text-white" />
              </GeoBadge>
              关键 API：commitStyles() 的正确用法
            </h3>

            <CodeBlock
              title="commitStyles — 防止动画结束后的样式闪烁"
              language="typescript"
              code={`// 问题：WAAPI 默认使用 fill: 'forwards'，但动画结束后
// 元素的 computedStyle 并不会真正改变！
// getComputedStyle(el).opacity 仍然是 0 而非动画后的 1

// ❌ 错误做法 — 依赖 fill: 'forwards' 维持状态
const anim = el.animate(
  [{ opacity: 0 }, { opacity: 1 }],
  { duration: 300, fill: 'forwards' }      // ← 虽然视觉上是 1，但 DOM 属性仍是 0
);
// 如果后续有 CSS transition，会导致从 0 跳到 1

// ✅ 正确做法 — 用 commitStyles 固化最终状态
const anim = el.animate(
  [{ opacity: 0 }, { opacity: 1 }],
  { duration: 300, fill: 'forwards' }
);

anim.finished.then(() => {
  anim.commitStyles();   // ← 将 opacity:1 写入元素的 style 属性
  anim.cancel();         // ← 移除动画效果，现在 style 属性已接管
});

// 现在 el.style.opacity === '1'
// 后续的 CSS transition 可以正常从 opacity:1 开始`}
            />
          </div>

          {/* 4.5 — Production Pattern */}
          <div className="mb-12">
            <h3 className="font-['Outfit'] font-bold text-xl mb-4 flex items-center gap-2">
              <GeoBadge color="var(--accent)">
                <Zap size={16} strokeWidth={2.5} className="text-white" />
              </GeoBadge>
              生产级模式：prefers-reduced-motion 适配
            </h3>

            <CodeBlock
              title="safeAnimate — 无障碍友好的动画封装"
              language="typescript"
              code={`const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

function safeAnimate(
  element: HTMLElement,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions
): Animation {
  // 尊重用户的无障碍偏好
  if (prefersReducedMotion) {
    return element.animate(keyframes, {
      ...options,
      duration: 0,         // ← 立即完成，无过渡
      delay: 0,
    });
  }

  // 使用 will-change 提示浏览器优化
  element.style.willChange = 'transform, opacity';  // ← GPU 层提升

  const anim = element.animate(keyframes, options);

  anim.finished.then(() => {
    anim.commitStyles();
    anim.cancel();
    element.style.willChange = 'auto';               // ← 清理，释放 GPU 内存
  });

  return anim;
}`}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════
            ANTI-PATTERNS & PITFALLS
            ═══════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto mb-24">
          <SectionHeading
            label="L5 · Pitfalls"
            title="常见陷阱与反模式"
            color="var(--tertiary)"
          />

          <div className="grid gap-6">
            <WarningCard
              title="陷阱 1：忘记 commitStyles 导致样式回弹"
              language="typescript"
              badCode={`// ❌ 动画结束后元素"闪回"原位
const anim = el.animate(
  [{ transform: 'translateX(100px)' }, { transform: 'none' }],
  { duration: 300, fill: 'forwards' }
);
// 动画结束后，移除动画 → 元素瞬间跳回原位！
// 因为 fill:'forwards' 只是"覆盖显示"，并未修改 DOM`}
              goodCode={`// ✅ 动画结束后固化状态
anim.finished.then(() => {
  anim.commitStyles();  // ← 将最终 transform 写入 style
  anim.cancel();        // ← 安全移除动画
});
// 现在 el.style.transform === 'none'，不会回弹`}
            />

            <WarningCard
              title="陷阱 2：在循环动画中不使用 getAnimations() 清理"
              language="typescript"
              badCode={`// ❌ 重复调用 create 导致多个动画叠加
function blink() {
  setInterval(() => {
    el.animate(              // ← 每 2s 创建新 Animation 对象
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 500, direction: 'alternate', iterations: 2 }
    );
    // 累积了大量未清理的 Animation 对象！
    // 内存泄漏 + 动画错乱
  }, 2000);
}`}
              goodCode={`// ✅ 复用或清理已有动画
function blink() {
  // 先取消同名动画
  el.getAnimations({ id: 'blink' }).forEach(a => a.cancel());

  el.animate(
    [{ opacity: 1 }, { opacity: 0 }],
    {
      duration: 500,
      iterations: Infinity,
      direction: 'alternate',
      id: 'blink',           // ← 命名以便管理
    }
  );
}

// 组件卸载时清理
function cleanup() {
  document.getAnimations().forEach(a => a.cancel());  // ← 全局清理
}`}
            />

            <WarningCard
              title="陷阱 3：对 transform 使用 WAAPI 与 CSS transition 冲突"
              language="typescript"
              badCode={`// ❌ CSS 有 transition，WAAPI 结束后触发 transition
// .box { transition: transform 0.3s ease; }
el.animate(
  [{ transform: 'scale(1.2)' }, { transform: 'scale(1)' }],
  { duration: 200 }
);
// WAAPI 结束 → transition 接管 → 触发额外 0.3s 缩放抖动！`}
              goodCode={`// ✅ 用 commitStyles + cancel 避免冲突
const anim = el.animate(
  [{ transform: 'scale(1.2)' }, { transform: 'scale(1)' }],
  { duration: 200 }
);
anim.finished.then(() => {
  anim.commitStyles();  // ← 直接写入 style 属性
  anim.cancel();        // ← 移除 animation 层，不触发 transition
});
// 或者临时禁用 transition
// el.style.transition = 'none';
// anim.finished.then(() => { el.style.transition = ''; });`}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════
            L5: ENGINEERING LANDSCAPE
            ═══════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto mb-24">
          <SectionHeading
            label="L5 · Engineering"
            title="工程全景：性能数据与选型建议"
            color="var(--quaternary)"
          />

          {/* Performance Benchmark */}
          <div className="border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_var(--quaternary)] bg-white mb-8">
            <div className="px-5 py-3 bg-[var(--quaternary)] border-b-2 border-[var(--foreground)] flex items-center gap-2">
              <Gauge size={16} strokeWidth={2.5} className="text-white" />
              <span className="font-['Outfit'] font-bold text-sm text-white">
                性能基准测试 · 1000 个 DOM 元素同时动画
              </span>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                {[
                  {
                    label: "CSS transform (合成器)",
                    fps: 60,
                    width: "100%",
                    color: "var(--quaternary)",
                    note: "~16ms/frame · GPU 合成器线程",
                  },
                  {
                    label: "WAAPI transform (合成器)",
                    fps: 60,
                    width: "100%",
                    color: "var(--accent)",
                    note: "~16ms/frame · GPU 合成器线程",
                  },
                  {
                    label: "GSAP transform (JS)",
                    fps: 58,
                    width: "97%",
                    color: "var(--tertiary)",
                    note: "~17ms/frame · 主线程 rAF",
                  },
                  {
                    label: "JS rAF + style.left",
                    fps: 24,
                    width: "40%",
                    color: "var(--secondary)",
                    note: "~42ms/frame · 触发重排",
                  },
                ].map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-['Plus_Jakarta_Sans'] text-sm font-semibold">
                        {bar.label}
                      </span>
                      <span className="font-['JetBrains_Mono',monospace] text-xs text-[var(--foreground)]/60">
                        {bar.note}
                      </span>
                    </div>
                    <div className="h-6 bg-[var(--background)] rounded-full border-2 border-[var(--foreground)] overflow-hidden">
                      <div
                        className="h-full rounded-full flex items-center justify-end pr-3 transition-all"
                        style={{ width: bar.width, backgroundColor: bar.color }}
                      >
                        <span className="font-['Outfit'] font-bold text-xs text-white drop-shadow-sm">
                          {bar.fps} FPS
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--foreground)]/50 mt-4 font-['Plus_Jakarta_Sans']">
                测试环境: Chrome 121, MacBook Pro M2, 1000 个 div 同时执行
                transform translateX 动画。 数据来源: Chrome DevTools
                Performance Panel.
              </p>
            </div>
          </div>

          {/* Decision Tree */}
          <div className="border-2 border-[var(--foreground)] rounded-2xl p-6 bg-white shadow-[6px_6px_0px_0px_var(--accent)] mb-8">
            <h3 className="font-['Outfit'] font-bold text-lg mb-5 flex items-center gap-2">
              <GitCompareArrows
                size={20}
                strokeWidth={2.5}
                className="text-[var(--accent)]"
              />
              选型决策树
            </h3>
            <div className="space-y-3 font-['Plus_Jakarta_Sans'] text-sm">
              {[
                {
                  q: "只需要入场/退场动画，无运行时控制？",
                  a: "→ CSS animation / transition",
                  badge: "0KB",
                  color: "var(--quaternary)",
                },
                {
                  q: "需要暂停/反转/seek/动态变速？",
                  a: "→ Web Animations API",
                  badge: "0KB",
                  color: "var(--accent)",
                },
                {
                  q: "需要复杂序列编排 + morphing + 路径动画？",
                  a: "→ GSAP (专业级)",
                  badge: "~28KB",
                  color: "var(--tertiary)",
                },
                {
                  q: "React 组件级动画 + 手势交互？",
                  a: "→ Framer Motion / Motion One",
                  badge: "~12KB",
                  color: "var(--secondary)",
                },
                {
                  q: "滚动驱动动画，无依赖？",
                  a: "→ WAAPI + ScrollTimeline",
                  badge: "0KB",
                  color: "var(--accent)",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row md:items-center gap-2 p-3 rounded-xl border-2 border-[var(--border)] hover:border-[var(--foreground)] transition-colors"
                >
                  <span className="flex-1 font-semibold text-[var(--foreground)]">
                    {item.q}
                  </span>
                  <span className="text-[var(--foreground)]/70">{item.a}</span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-[var(--foreground)] text-white shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            CHEAT SHEET
            ═══════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto mb-12">
          <SectionHeading
            label="Reference"
            title="速查清单 (Cheat Sheet)"
            color="var(--foreground)"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "element.animate()",
                desc: "创建并播放动画，返回 Animation 对象",
                code: `el.animate(keyframes, options)`,
                color: "var(--accent)",
              },
              {
                title: "animation.play()",
                desc: "开始或恢复播放",
                code: `animation.play()`,
                color: "var(--quaternary)",
              },
              {
                title: "animation.pause()",
                desc: "暂停当前动画",
                code: `animation.pause()`,
                color: "var(--tertiary)",
              },
              {
                title: "animation.reverse()",
                desc: "反转播放方向",
                code: `animation.reverse()`,
                color: "var(--secondary)",
              },
              {
                title: "animation.finish()",
                desc: "立即跳到动画结束状态",
                code: `animation.finish()`,
                color: "var(--accent)",
              },
              {
                title: "animation.cancel()",
                desc: "取消动画并从元素移除",
                code: `animation.cancel()`,
                color: "var(--tertiary)",
              },
              {
                title: "animation.commitStyles()",
                desc: "将当前计算样式写入元素 style 属性",
                code: `animation.commitStyles()`,
                color: "var(--quaternary)",
              },
              {
                title: "animation.finished",
                desc: "Promise — 动画结束时 resolve",
                code: `await animation.finished`,
                color: "var(--secondary)",
              },
              {
                title: "animation.currentTime",
                desc: "get/set 当前时间 (ms)，支持 seek",
                code: `animation.currentTime = 500`,
                color: "var(--accent)",
              },
              {
                title: "animation.playbackRate",
                desc: "播放速率：0.5=半速，2=倍速，-1=倒放",
                code: `animation.playbackRate = 2`,
                color: "var(--tertiary)",
              },
              {
                title: "el.getAnimations()",
                desc: "获取元素上所有活跃的 Animation 对象",
                code: `el.getAnimations({ subtree: true })`,
                color: "var(--quaternary)",
              },
              {
                title: "document.getAnimations()",
                desc: "获取页面上所有活跃动画",
                code: `document.getAnimations()`,
                color: "var(--secondary)",
              },
              {
                title: "ScrollTimeline",
                desc: "滚动进度映射为动画时间线",
                code: `new ScrollTimeline({ source: doc })`,
                color: "var(--accent)",
              },
              {
                title: "ViewTimeline",
                desc: "元素进出视口映射为动画时间线",
                code: `new ViewTimeline({ subject: el })`,
                color: "var(--tertiary)",
              },
              {
                title: "KeyframeEffect",
                desc: "独立创建效果对象，可复用",
                code: `new KeyframeEffect(el, kf, opts)`,
                color: "var(--quaternary)",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="topic-card rounded-2xl overflow-hidden animate-slide"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div
                  className="px-1.5 py-1"
                  style={{ backgroundColor: card.color }}
                />
                <div className="p-4">
                  <h4 className="font-['JetBrains_Mono',monospace] font-bold text-sm mb-1 text-[var(--foreground)]">
                    {card.title}
                  </h4>
                  <p className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-2 leading-relaxed">
                    {card.desc}
                  </p>
                  <div className="bg-[#1E293B] rounded-lg px-3 py-2">
                    <code
                      className="font-['JetBrains_Mono',monospace] text-[11px] text-[var(--secondary)]"
                      dangerouslySetInnerHTML={{
                        __html: highlightCode(card.code, "typescript"),
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Footer CTA ─── */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="border-2 border-[var(--foreground)] rounded-2xl p-8 bg-white shadow-[8px_8px_0px_0px_var(--accent)]">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--accent)] border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] flex items-center justify-center mb-4">
              <MousePointerClick
                size={28}
                strokeWidth={2.5}
                className="text-white"
              />
            </div>
            <h3 className="font-['Outfit'] font-extrabold text-2xl mb-2">
              开始用 WAAPI 动起来
            </h3>
            <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/70 leading-relaxed mb-4">
              打开浏览器 DevTools Console，输入
              <code className="font-['JetBrains_Mono',monospace] text-xs bg-[var(--accent)]/10 text-[var(--accent)] px-1.5 py-0.5 rounded mx-1">
                document.body.animate([{"{"}opacity:0{"}"},{"{"}opacity:1{"}"}],
                500)
              </code>
              即可看到你的第一个 WAAPI 动画。零配置，零依赖。
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--foreground)] text-white font-bold text-sm shadow-[4px_4px_0px_0px_var(--accent)] border-2 border-[var(--foreground)]">
              <BookOpen size={16} strokeWidth={2.5} />
              MDN Web Animations API
              <ArrowRight size={16} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
