"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { highlightCode } from "@/lib/prism-highlight";
import {
  Brain,
  Cpu,
  Globe,
  Zap,
  Shield,
  Layers,
  Terminal,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw,
  Clock,
  DollarSign,
  Wifi,
  WifiOff,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  BarChart3,
  Settings2,
  Monitor,
  Server,
  Database,
  Code2,
  Lightbulb,
  BookOpen,
  Rocket,
  Boxes,
  Binary,
  Workflow,
  MessageSquare,
  Timer,
  TrendingUp,
  HardDriveDownload,
  Activity,
} from "lucide-react";

/* ─────────────────── Code Block Component ─────────────────── */
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

/* ─────────────────── Geometric Badge ─────────────────── */
function GeoBadge({
  children,
  color = "var(--accent)",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-widest border-2 border-[var(--foreground)] rounded-full"
      style={{ backgroundColor: color, color: "#1E293B" }}
    >
      {children}
    </span>
  );
}

/* ─────────────────── Stat Card ─────────────────── */
function StatCard({
  value,
  label,
  icon: Icon,
  color,
  delay = 0,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
  color: string;
  delay?: number;
}) {
  return (
    <div
      className="animate-slide bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl p-5 shadow-[6px_6px_0px_0px_var(--foreground)] hover:rotate-[-1deg] hover:scale-[1.02] transition-transform"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="w-10 h-10 rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center mb-3"
        style={{ backgroundColor: color }}
      >
        <Icon size={20} strokeWidth={2.5} />
      </div>
      <div className="text-2xl font-extrabold font-['Outfit'] text-[var(--foreground)]">
        {value}
      </div>
      <div className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mt-1">
        {label}
      </div>
    </div>
  );
}

/* ─────────────────── Section Heading ─────────────────── */
function SectionHeading({
  tag,
  title,
  subtitle,
  color = "var(--accent)",
}: {
  tag: string;
  title: string;
  subtitle: string;
  color?: string;
}) {
  return (
    <div className="mb-10">
      <GeoBadge color={color}>{tag}</GeoBadge>
      <h2 className="font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[var(--foreground)] mt-4 leading-tight">
        {title}
      </h2>
      <p className="font-['Plus_Jakarta_Sans'] text-base md:text-lg text-[var(--foreground)]/60 mt-3 max-w-2xl">
        {subtitle}
      </p>
    </div>
  );
}

/* ═══════════════ INTERACTIVE PLAYGROUND: Latency Comparator ═══════════════ */
function LatencyPlayground() {
  const [networkSpeed, setNetworkSpeed] = useState<"fast" | "slow" | "offline">(
    "fast",
  );
  const [modelSize, setModelSize] = useState<"small" | "medium" | "large">(
    "medium",
  );
  const [promptLength, setPromptLength] = useState(100);

  const speeds = {
    fast: { rtt: 50, label: "5G / Fiber", icon: Wifi },
    slow: { rtt: 400, label: "3G / 拥挤", icon: Wifi },
    offline: { rtt: Infinity, label: "离线", icon: WifiOff },
  };

  const modelMetrics = {
    small: { name: "Qwen2-0.5B", params: "0.5B", tps: 85, loadTime: 8 },
    medium: { name: "Llama3.2-1B", params: "1B", tps: 42, loadTime: 18 },
    large: { name: "Phi-3.5-3.8B", params: "3.8B", tps: 12, loadTime: 45 },
  };

  const currentSpeed = speeds[networkSpeed];
  const currentModel = modelMetrics[modelSize];
  const outputTokens = Math.min(promptLength * 2, 512);

  const apiLatency =
    currentSpeed.rtt === Infinity
      ? Infinity
      : currentSpeed.rtt * 2 + (outputTokens / 30) * 1000; // ~30 tps for GPT-4 class

  const webllmLatency =
    currentModel.loadTime * 1000 + (outputTokens / currentModel.tps) * 1000;

  const winner = apiLatency > webllmLatency ? "webllm" : "api";

  return (
    <div className="bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_var(--tertiary)]">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 bg-[var(--tertiary)] border-b-2 border-[var(--foreground)]">
        <Gauge size={20} strokeWidth={2.5} />
        <span className="font-['Outfit'] font-bold text-lg">
          ⚡ 延迟对比实验场
        </span>
        <span className="ml-auto text-xs font-bold opacity-70 uppercase tracking-wider">
          Interactive
        </span>
      </div>

      {/* Controls */}
      <div className="p-6 grid md:grid-cols-3 gap-6">
        {/* Network */}
        <div>
          <label className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[var(--foreground)]/70 uppercase tracking-wider block mb-3">
            🌐 网络状况
          </label>
          <div className="flex flex-col gap-2">
            {(["fast", "slow", "offline"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setNetworkSpeed(s)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-[var(--foreground)] text-sm font-bold transition-all ${
                  networkSpeed === s
                    ? "bg-[var(--accent)] text-white shadow-[3px_3px_0px_0px_var(--foreground)]"
                    : "bg-[var(--card)] hover:bg-[var(--accent)]/10"
                }`}
              >
                {React.createElement(speeds[s].icon, {
                  size: 16,
                  strokeWidth: 2.5,
                })}
                {speeds[s].label}
              </button>
            ))}
          </div>
        </div>

        {/* Model Size */}
        <div>
          <label className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[var(--foreground)]/70 uppercase tracking-wider block mb-3">
            🧠 模型大小
          </label>
          <div className="flex flex-col gap-2">
            {(["small", "medium", "large"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setModelSize(m)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl border-2 border-[var(--foreground)] text-sm font-bold transition-all ${
                  modelSize === m
                    ? "bg-[var(--secondary)] text-[var(--foreground)] shadow-[3px_3px_0px_0px_var(--foreground)]"
                    : "bg-[var(--card)] hover:bg-[var(--secondary)]/10"
                }`}
              >
                <span>{modelMetrics[m].name}</span>
                <span className="text-xs opacity-70">
                  {modelMetrics[m].params}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Length */}
        <div>
          <label className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[var(--foreground)]/70 uppercase tracking-wider block mb-3">
            📏 输入 Token 数:{" "}
            <span className="text-[var(--accent)]">{promptLength}</span>
          </label>
          <input
            type="range"
            min={10}
            max={1024}
            step={10}
            value={promptLength}
            onChange={(e) => setPromptLength(Number(e.target.value))}
            className="w-full accent-[var(--accent)] h-2 rounded-full"
          />
          <div className="flex justify-between text-xs text-[var(--foreground)]/40 mt-1">
            <span>10</span>
            <span>1024</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="px-6 pb-6 grid md:grid-cols-2 gap-4">
        {/* API */}
        <div
          className={`rounded-xl border-2 p-5 transition-all ${
            winner === "api"
              ? "border-[var(--quaternary)] bg-[var(--quaternary)]/5 shadow-[4px_4px_0px_0px_var(--quaternary)]"
              : "border-[var(--foreground)]/20"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Server size={18} strokeWidth={2.5} />
            <span className="font-['Outfit'] font-bold">云端 API (GPT-4o)</span>
            {winner === "api" && (
              <span className="ml-auto text-xs font-bold bg-[var(--quaternary)] px-2 py-0.5 rounded-full border border-[var(--foreground)]">
                更快 ✨
              </span>
            )}
          </div>
          <div className="space-y-2 text-sm font-['Plus_Jakarta_Sans']">
            <div className="flex justify-between">
              <span className="opacity-60">RTT 延迟</span>
              <span className="font-bold">
                {currentSpeed.rtt === Infinity ? "∞" : `${currentSpeed.rtt}ms`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">生成速度</span>
              <span className="font-bold">~30 tokens/s</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">输出 tokens</span>
              <span className="font-bold">{outputTokens}</span>
            </div>
            <div className="h-px bg-[var(--foreground)]/10 my-2" />
            <div className="flex justify-between text-base">
              <span className="font-bold">总延迟</span>
              <span className="font-extrabold text-lg">
                {apiLatency === Infinity
                  ? "❌ 不可用"
                  : `~${(apiLatency / 1000).toFixed(1)}s`}
              </span>
            </div>
          </div>
        </div>

        {/* WebLLM */}
        <div
          className={`rounded-xl border-2 p-5 transition-all ${
            winner === "webllm"
              ? "border-[var(--quaternary)] bg-[var(--quaternary)]/5 shadow-[4px_4px_0px_0px_var(--quaternary)]"
              : "border-[var(--foreground)]/20"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Cpu size={18} strokeWidth={2.5} />
            <span className="font-['Outfit'] font-bold">WebLLM (本地)</span>
            {winner === "webllm" && (
              <span className="ml-auto text-xs font-bold bg-[var(--quaternary)] px-2 py-0.5 rounded-full border border-[var(--foreground)]">
                更快 ✨
              </span>
            )}
          </div>
          <div className="space-y-2 text-sm font-['Plus_Jakarta_Sans']">
            <div className="flex justify-between">
              <span className="opacity-60">模型加载</span>
              <span className="font-bold">{currentModel.loadTime}s (首次)</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">生成速度</span>
              <span className="font-bold">~{currentModel.tps} tokens/s</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">输出 tokens</span>
              <span className="font-bold">{outputTokens}</span>
            </div>
            <div className="h-px bg-[var(--foreground)]/10 my-2" />
            <div className="flex justify-between text-base">
              <span className="font-bold">总延迟</span>
              <span className="font-extrabold text-lg">
                ~{(webllmLatency / 1000).toFixed(1)}s
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="mx-6 mb-6 px-4 py-3 rounded-xl bg-[var(--foreground)]/5 border-2 border-dashed border-[var(--foreground)]/20 text-sm font-['Plus_Jakarta_Sans']">
        💡 <strong>洞察：</strong>
        {networkSpeed === "offline"
          ? "离线场景下，WebLLM 是唯一选择——浏览器即是一台完整的 AI 机器。"
          : networkSpeed === "slow"
            ? "弱网环境下，虽然 WebLLM 首次加载慢，但生成阶段完全不受网络影响，长文本场景优势明显。"
            : "高速网络下，云端 API 通常更快——但 WebLLM 胜在零 API 费用和完全隐私。"}
      </div>
    </div>
  );
}

/* ═══════════════ INTERACTIVE PLAYGROUND: Temperature Visualizer ═══════════════ */
function TemperaturePlayground() {
  const [temp, setTemp] = useState(0.7);
  const [topP, setTopP] = useState(0.9);

  const getDistribution = useCallback(() => {
    const words = ["的", "了", "在", "是", "我", "有", "和", "就", "不", "人"];
    const raw = words.map((_, i) => Math.exp(-i * (2 - temp)));
    const sum = raw.reduce((a, b) => a + b, 0);
    const probs = raw.map((r) => r / sum);

    // Apply top-p filtering
    const sorted = [...probs].sort((a, b) => b - a);
    let cumulative = 0;
    const threshold = sorted.findIndex((p) => {
      cumulative += p;
      return cumulative >= topP;
    });
    const cutoff = threshold === -1 ? probs.length : threshold + 1;
    const sortedProbs = [...probs].sort((a, b) => b - a);
    const minProb = sortedProbs[Math.min(cutoff, sortedProbs.length - 1)];

    return words.map((w, i) => ({
      word: w,
      prob: probs[i],
      active: probs[i] >= minProb || temp > 1.5,
    }));
  }, [temp, topP]);

  const distribution = getDistribution();

  return (
    <div className="bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_var(--secondary)]">
      <div className="flex items-center gap-3 px-6 py-4 bg-[var(--secondary)] border-b-2 border-[var(--foreground)]">
        <Activity size={20} strokeWidth={2.5} />
        <span className="font-['Outfit'] font-bold text-lg">
          🌡️ Temperature 可视化
        </span>
      </div>

      <div className="p-6">
        {/* Sliders */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-bold text-sm">Temperature</label>
              <span className="font-['JetBrains_Mono'] text-sm bg-[var(--accent)]/10 px-2 py-0.5 rounded-lg font-bold">
                {temp.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={2}
              step={0.05}
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            <div className="flex justify-between text-xs text-[var(--foreground)]/40 mt-1">
              <span>0 (确定性)</span>
              <span>2 (随机)</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-bold text-sm">
                Top-P (Nucleus Sampling)
              </label>
              <span className="font-['JetBrains_Mono'] text-sm bg-[var(--secondary)]/10 px-2 py-0.5 rounded-lg font-bold">
                {topP.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={topP}
              onChange={(e) => setTopP(Number(e.target.value))}
              className="w-full accent-[var(--secondary)]"
            />
            <div className="flex justify-between text-xs text-[var(--foreground)]/40 mt-1">
              <span>0.1 (聚焦)</span>
              <span>1.0 (全开)</span>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-[var(--background)] rounded-xl border-2 border-[var(--foreground)]/10 p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/40 mb-3">
            Token 概率分布 (简化示意)
          </div>
          <div className="flex items-end gap-2 h-32">
            {distribution.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold font-['JetBrains_Mono']">
                  {(d.prob * 100).toFixed(0)}%
                </span>
                <div
                  className="w-full rounded-t-md border-2 border-[var(--foreground)] transition-all duration-300"
                  style={{
                    height: `${d.prob * 100}%`,
                    backgroundColor: d.active
                      ? `var(--accent)`
                      : `var(--border)`,
                    opacity: d.active ? 1 : 0.3,
                    minHeight: "4px",
                  }}
                />
                <span className="text-xs font-bold">{d.word}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/50">
            {temp < 0.3
              ? "🧊 Temperature 接近 0 → 每次几乎选最高概率 token，输出极其确定/重复"
              : temp < 1.0
                ? "⚖️ Temperature ~0.7 → 平衡创造性和连贯性，多数场景推荐值"
                : "🎲 Temperature > 1.5 → 概率分布趋于平坦，输出高度随机/发散"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ Interactive Architecture Diagram ═══════════════ */
function ArchitectureExplorer() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const layers = [
    {
      id: 0,
      label: "用户界面层",
      subtitle: "React / Next.js UI",
      color: "var(--secondary)",
      icon: Monitor,
      details:
        "负责渲染对话界面、管理流式消息状态、处理用户输入。使用 ReadableStream 消费后端/WebGPU 返回的 token 流。",
      tech: ["React Server Components", "Streaming SSR", "useOptimistic"],
    },
    {
      id: 1,
      label: "路由编排层",
      subtitle: "Vercel AI SDK / Custom Router",
      color: "var(--accent)",
      icon: Workflow,
      details:
        "智能路由决策层：根据任务类型、隐私需求、延迟要求，自动选择本地 WebLLM 或云端 API。类似 CDN 的边缘计算策略，但用于 AI 推理。",
      tech: ["ai.chat()", "Middleware", "Edge Functions"],
    },
    {
      id: 2,
      label: "推理引擎层",
      subtitle: "WebLLM / WebGPU / WASM",
      color: "var(--tertiary)",
      icon: Cpu,
      details:
        "核心推理层。WebLLM 通过 WebGPU compute shader 调用 GPU 进行矩阵运算，模型权重以 int4/int8 量化存储在 IndexedDB 中缓存。",
      tech: ["WebGPU", "TVM Runtime", "Model Quantization"],
    },
    {
      id: 3,
      label: "模型存储层",
      subtitle: "HuggingFace / CDN / IndexedDB",
      color: "var(--quaternary)",
      icon: Database,
      details:
        "模型权重分片下载、增量更新、本地缓存。首次加载 ~1GB 权重需 30-60s，后续从 IndexedDB 读取仅需 2-5s。",
      tech: ["IndexedDB", "Cache API", "Web Workers"],
    },
  ];

  return (
    <div className="bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_var(--accent)]">
      <div className="flex items-center gap-3 px-6 py-4 bg-[var(--accent)]/10 border-b-2 border-[var(--foreground)]">
        <Boxes size={20} strokeWidth={2.5} />
        <span className="font-['Outfit'] font-bold text-lg">
          🏗️ 架构层级探索器
        </span>
        <span className="ml-auto text-xs text-[var(--foreground)]/50">
          点击各层查看详情
        </span>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {layers.map((layer) => {
            const isActive = activeLayer === layer.id;
            const Icon = layer.icon;
            return (
              <div key={layer.id}>
                <button
                  onClick={() => setActiveLayer(isActive ? null : layer.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 border-[var(--foreground)] transition-all text-left ${
                    isActive
                      ? "shadow-[4px_4px_0px_0px_var(--foreground)] scale-[1.01]"
                      : "hover:shadow-[2px_2px_0px_0px_var(--foreground)]"
                  }`}
                  style={{
                    backgroundColor: isActive
                      ? `${layer.color}20`
                      : "var(--background)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center shrink-0"
                    style={{ backgroundColor: layer.color }}
                  >
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-['Outfit'] font-bold text-[var(--foreground)]">
                      {layer.label}
                    </div>
                    <div className="text-xs text-[var(--foreground)]/50 font-['JetBrains_Mono']">
                      {layer.subtitle}
                    </div>
                  </div>
                  {isActive ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>

                {isActive && (
                  <div
                    className="mt-2 mx-2 p-5 rounded-xl border-2 border-dashed animate-pop"
                    style={{
                      borderColor: layer.color,
                      backgroundColor: `${layer.color}08`,
                    }}
                  >
                    <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/80 leading-relaxed mb-3">
                      {layer.details}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {layer.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-bold font-['JetBrains_Mono'] px-2 py-1 rounded-lg border border-[var(--foreground)]/20"
                          style={{ backgroundColor: `${layer.color}30` }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {layer.id < layers.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="w-0.5 h-4 bg-[var(--foreground)]/20" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ MAIN PAGE ═══════════════ */
export default function AIFrontendPage() {
  const [streamingDemo, setStreamingDemo] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fullText = `WebLLM 将大语言模型直接运行在浏览器的 WebGPU 上，无需后端服务器。这意味着你的前端应用可以拥有完整的 AI 推理能力——从对话生成到代码补全，全部在用户的设备上完成。`;

  useEffect(() => {
    if (streamingDemo) {
      let idx = 0;
      setStreamedText("");
      intervalRef.current = setInterval(() => {
        idx++;
        setStreamedText(fullText.slice(0, idx));
        if (idx >= fullText.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 40);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [streamingDemo]);

  return (
    <div className="bg-dot-grid min-h-screen pb-20">
      {/* ════════════ HERO ════════════ */}
      <section className="container pt-24 pb-16">
        <div className="relative">
          {/* Decorative Blobs */}
          <div
            className="absolute -top-10 -right-10 w-48 h-48 md:w-72 md:h-72 opacity-20 pointer-events-none"
            style={{
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              backgroundColor: "var(--tertiary)",
            }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-36 h-36 md:w-56 md:h-56 opacity-15 pointer-events-none"
            style={{
              borderRadius: "40% 60% 70% 30% / 30% 70% 40% 60%",
              backgroundColor: "var(--secondary)",
            }}
          />

          {/* Badge */}
          <div className="animate-pop">
            <GeoBadge color="var(--tertiary)">
              <Sparkles size={12} strokeWidth={2.5} /> AI × Frontend
            </GeoBadge>
          </div>

          {/* Title */}
          <h1 className="font-['Outfit'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--foreground)] mt-6 leading-[1.1] animate-pop">
            AI 驱动的
            <br />
            <span className="text-[var(--accent)]">前端新范式</span>
          </h1>

          {/* L1: Intuitive Anchor */}
          <div
            className="mt-6 max-w-2xl animate-slide"
            style={{ animationDelay: "150ms" }}
          >
            <p className="font-['Plus_Jakarta_Sans'] text-lg md:text-xl text-[var(--foreground)]/70 leading-relaxed">
              想象一下：你的浏览器不再只是一个"展示信息的窗口"， 而是一台
              <span className="font-bold text-[var(--accent)]">自带大脑</span>
              的智能终端。 WebLLM 让大语言模型直接在浏览器的 GPU 上运行——
              就像把一台 AI 服务器塞进了用户的标签页。
            </p>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <StatCard
              value="100%"
              label="浏览器端推理"
              icon={Globe}
              color="var(--tertiary)"
              delay={100}
            />
            <StatCard
              value="0$"
              label="API 调用费用"
              icon={DollarSign}
              color="var(--quaternary)"
              delay={200}
            />
            <StatCard
              value="42 t/s"
              label="1B 模型推理速度"
              icon={Zap}
              color="var(--secondary)"
              delay={300}
            />
            <StatCard
              value="WebGPU"
              label="底层加速引擎"
              icon={Cpu}
              color="var(--accent)"
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* ════════════ L2: WHY — Pain Points ════════════ */}
      <section className="container mt-10">
        <SectionHeading
          tag="L2 · 为什么需要"
          title="传统 AI 前端集成的三大痛点"
          subtitle="在 WebLLM 出现之前，前端想用 AI，必须忍受以下问题——"
          color="var(--secondary)"
        />

        <div className="grid md:grid-cols-3 gap-5">
          {/* Pain 1: Latency */}
          <div className="animate-slide bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl p-6 shadow-[6px_6px_0px_0px_var(--foreground)]">
            <div className="w-12 h-12 rounded-2xl bg-[var(--tertiary)] border-2 border-[var(--foreground)] flex items-center justify-center mb-4">
              <Clock size={24} strokeWidth={2.5} />
            </div>
            <h3 className="font-['Outfit'] font-bold text-xl mb-2">延迟地狱</h3>
            <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/60 leading-relaxed mb-4">
              每次 AI 请求都要跨越太平洋往返服务器。GPT-4o 的 P50 延迟为
              800ms-2s，在 3G 网络下可飙升至 8s+。用户等得起，体验等不起。
            </p>
            <div className="bg-[var(--foreground)]/5 rounded-xl p-3 border border-[var(--foreground)]/10">
              <code className="text-xs font-['JetBrains_Mono'] text-[var(--secondary)] font-bold">
                客户机 → TLS握手 → 跨洋 → API网关 → GPU推理 → 响应
              </code>
              <div className="text-xs text-[var(--foreground)]/40 mt-1">
                每一步都是延迟来源
              </div>
            </div>
          </div>

          {/* Pain 2: Privacy */}
          <div
            className="animate-slide bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl p-6 shadow-[6px_6px_0px_0px_var(--secondary)]"
            style={{ animationDelay: "100ms" }}
          >
            <div className="w-12 h-12 rounded-2xl bg-[var(--secondary)] border-2 border-[var(--foreground)] flex items-center justify-center mb-4">
              <Shield size={24} strokeWidth={2.5} />
            </div>
            <h3 className="font-['Outfit'] font-bold text-xl mb-2">隐私裸奔</h3>
            <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/60 leading-relaxed mb-4">
              用户的健康数据、法律文档、商业机密全都要发送到第三方服务器。GDPR
              合规？HIPAA 合规？每一条请求都是一次合规赌博。
            </p>
            <div className="bg-[var(--foreground)]/5 rounded-xl p-3 border border-[var(--foreground)]/10">
              <div className="text-xs font-['Plus_Jakarta_Sans']">
                <span className="text-[var(--secondary)] font-bold">⚠️</span>{" "}
                2023年三星芯片设计源码因员工粘贴到 ChatGPT
                导致泄露，直接禁用全公司 API
              </div>
            </div>
          </div>

          {/* Pain 3: Cost */}
          <div
            className="animate-slide bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl p-6 shadow-[6px_6px_0px_0px_var(--tertiary)]"
            style={{ animationDelay: "200ms" }}
          >
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent)] border-2 border-[var(--foreground)] flex items-center justify-center mb-4">
              <DollarSign size={24} strokeWidth={2.5} />
            </div>
            <h3 className="font-['Outfit'] font-bold text-xl mb-2">成本失控</h3>
            <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/60 leading-relaxed mb-4">
              GPT-4o 输入 $2.5/M tokens，输出 $10/M tokens。一个每天 10 万用户的
              AI 助手月均 API 成本轻松破万刀。C 端产品根本扛不住。
            </p>
            <div className="bg-[var(--foreground)]/5 rounded-xl p-3 border border-[var(--foreground)]/10">
              <div className="text-xs font-['JetBrains_Mono']">
                <span className="text-[var(--accent)] font-bold">
                  10万 DAU × 20次/天 =
                </span>
                <br />
                <span className="text-[var(--tertiary)] font-bold">
                  ~$6,000/月 (仅 API)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Before / After */}
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <div className="bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl p-6 shadow-[6px_6px_0px_0px_#ef4444]">
            <div className="flex items-center gap-2 mb-4">
              <XCircle size={20} strokeWidth={2.5} className="text-red-500" />
              <span className="font-['Outfit'] font-bold text-lg">
                传统方案
              </span>
            </div>
            <div className="space-y-3 font-['Plus_Jakarta_Sans'] text-sm">
              <div className="flex items-start gap-2">
                <span className="text-red-500">✗</span> 用户输入 → API 调用 →
                等待 1-5s → 渲染
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500">✗</span>{" "}
                数据离开浏览器，无法保证隐私
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500">✗</span> 按 token
                计费，规模化成本指数增长
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500">✗</span> 离线时完全不可用
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500">✗</span> 受限于 API 速率限制
                (Rate Limit)
              </div>
            </div>
          </div>
          <div className="bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl p-6 shadow-[6px_6px_0px_0px_var(--quaternary)]">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2
                size={20}
                strokeWidth={2.5}
                className="text-[var(--quaternary)]"
              />
              <span className="font-['Outfit'] font-bold text-lg">
                WebLLM 方案
              </span>
            </div>
            <div className="space-y-3 font-['Plus_Jakarta_Sans'] text-sm">
              <div className="flex items-start gap-2">
                <span className="text-[var(--quaternary)]">✓</span> 用户输入 →
                本地 GPU 推理 → 即时渲染
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--quaternary)]">✓</span>{" "}
                数据永不出浏览器，端到端零泄露
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--quaternary)]">✓</span>{" "}
                零边际成本，用户承担算力
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--quaternary)]">✓</span>{" "}
                完全离线可用，断网也能推理
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--quaternary)]">✓</span>{" "}
                无速率限制，并发只受硬件约束
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ L3: CORE PRINCIPLES ════════════ */}
      <section className="container mt-20">
        <SectionHeading
          tag="L3 · 核心原理"
          title="WebLLM 是怎么在浏览器里跑 LLM 的？"
          subtitle="从 WebGPU 到模型量化，拆解浏览器端 AI 推理的每一层技术栈"
        />

        {/* Architecture Explorer */}
        <ArchitectureExplorer />

        {/* WebGPU Explainer */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl p-6 shadow-[6px_6px_0px_0px_var(--tertiary)]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--tertiary)] border-2 border-[var(--foreground)] flex items-center justify-center">
                <Layers size={20} strokeWidth={2.5} />
              </div>
              <h3 className="font-['Outfit'] font-bold text-xl">
                WebGPU：浏览器的 GPU 钥匙
              </h3>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/70 leading-relaxed mb-4">
              WebGL 时代，浏览器只能用 GPU 画三角形。<strong>WebGPU</strong> 是
              W3C 2023 年发布的新标准， 允许浏览器直接调度 GPU 的{" "}
              <strong>Compute Shader</strong>——这正是矩阵乘法所需的核心能力。
            </p>
            <div className="space-y-3 text-sm font-['Plus_Jakarta_Sans']">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10">
                <span className="text-xl">🔴</span>
                <div>
                  <div className="font-bold">WebGL 2.0 (2017)</div>
                  <div className="text-[var(--foreground)]/50 text-xs">
                    仅图形管线，无 Compute Shader
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--quaternary)]/10 border-2 border-[var(--quaternary)]/30">
                <span className="text-xl">🟢</span>
                <div>
                  <div className="font-bold">WebGPU (2023)</div>
                  <div className="text-[var(--foreground)]/50 text-xs">
                    Compute Shader + Storage Buffer，LLM 可用
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl p-6 shadow-[6px_6px_0px_0px_var(--accent)]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)] border-2 border-[var(--foreground)] flex items-center justify-center">
                <HardDriveDownload size={20} strokeWidth={2.5} />
              </div>
              <h3 className="font-['Outfit'] font-bold text-xl">
                量化：把大象装进冰箱
              </h3>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/70 leading-relaxed mb-4">
              一个 FP16 的 7B 模型需要 <strong>14GB</strong>{" "}
              显存，浏览器根本放不下。
              <strong>量化</strong> (Quantization) 将权重精度从 FP16 压缩到
              INT4/INT8， 模型大小直降 <strong>75%</strong>，精度损失仅 1-3%。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-['Plus_Jakarta_Sans']">
                <thead>
                  <tr className="border-b-2 border-[var(--foreground)]/10">
                    <th className="text-left py-2 font-bold">精度</th>
                    <th className="text-left py-2 font-bold">7B 模型大小</th>
                    <th className="text-left py-2 font-bold">精度损失</th>
                    <th className="text-left py-2 font-bold">浏览器可用？</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--foreground)]/5">
                    <td className="py-2 font-['JetBrains_Mono'] font-bold">
                      FP16
                    </td>
                    <td className="py-2">14 GB</td>
                    <td className="py-2">—</td>
                    <td className="py-2">
                      <XCircle size={16} className="text-red-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--foreground)]/5">
                    <td className="py-2 font-['JetBrains_Mono'] font-bold">
                      INT8
                    </td>
                    <td className="py-2">7 GB</td>
                    <td className="py-2">~1%</td>
                    <td className="py-2">
                      <span className="text-yellow-500">⚠️ 勉强</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-['JetBrains_Mono'] font-bold text-[var(--quaternary)]">
                      INT4
                    </td>
                    <td className="py-2 font-bold text-[var(--quaternary)]">
                      3.5 GB
                    </td>
                    <td className="py-2">~2-3%</td>
                    <td className="py-2">
                      <CheckCircle2
                        size={16}
                        className="text-[var(--quaternary)]"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Data flow diagram */}
        <div className="mt-10 bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl p-6 md:p-8 shadow-[8px_8px_0px_0px_var(--foreground)]">
          <h3 className="font-['Outfit'] font-bold text-xl mb-6 flex items-center gap-2">
            <Binary size={22} strokeWidth={2.5} />
            完整推理数据流
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-sm font-['Plus_Jakarta_Sans'] font-bold">
            {[
              { label: "用户输入", bg: "var(--secondary)", icon: "💬" },
              { label: "Tokenizer\n分词", bg: "var(--tertiary)", icon: "🔤" },
              {
                label: "Token IDs\n→ GPU Buffer",
                bg: "var(--accent)",
                icon: "🔢",
              },
              {
                label: "Transformer\n× N 层",
                bg: "var(--foreground)",
                icon: "🧠",
                textColor: "white",
              },
              { label: "Logits\n概率分布", bg: "var(--tertiary)", icon: "📊" },
              { label: "采样\nTop-P/K", bg: "var(--secondary)", icon: "🎲" },
              { label: "解码\n→ 文字", bg: "var(--quaternary)", icon: "📝" },
              { label: "流式\n输出", bg: "var(--accent)", icon: "⚡" },
            ].map((step, i) => (
              <React.Fragment key={i}>
                <div
                  className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl border-2 border-[var(--foreground)] min-w-[90px] text-center"
                  style={{
                    backgroundColor: step.bg,
                    color: step.textColor || "#1E293B",
                  }}
                >
                  <span className="text-lg">{step.icon}</span>
                  <span className="text-xs whitespace-pre-line leading-tight">
                    {step.label}
                  </span>
                </div>
                {i < 7 && (
                  <ArrowRight
                    size={18}
                    strokeWidth={3}
                    className="text-[var(--foreground)]/30 hidden md:block"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ L4: CODE PRACTICE ════════════ */}
      <section className="container mt-20">
        <SectionHeading
          tag="L4 · 代码实战"
          title="从零构建 AI 驱动的前端应用"
          subtitle="三个递进的真实代码示例：Vercel AI SDK → WebLLM 本地推理 → 混合架构"
          color="var(--tertiary)"
        />

        {/* ── Example 1: Vercel AI SDK ── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent)] border-2 border-[var(--foreground)] flex items-center justify-center">
              <span className="text-xs font-bold text-white">1</span>
            </div>
            <h3 className="font-['Outfit'] font-bold text-xl">
              Vercel AI SDK — 最快的流式对话起步
            </h3>
            <GeoBadge color="var(--quaternary)">推荐</GeoBadge>
          </div>
          <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/60 mb-4 max-w-2xl">
            Vercel AI SDK 的{" "}
            <code className="font-['JetBrains_Mono'] text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded text-xs">
              useChat
            </code>{" "}
            hook 封装了流式传输、状态管理、错误重试——10 行代码搞定一个 ChatGPT
            级别的对话 UI。
          </p>
          <CodeBlock
            language="typescript"
            title="app/api/chat/route.ts — 服务端路由"
            code={`import { openai } from "@ai-sdk/openai";
import { streamText } from "ai"; // ← Vercel AI SDK 核心

export const runtime = "edge"; // ← 关键：使用 Edge Runtime，首字延迟降至 ~100ms

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    system: "你是一个专业的前端工程师助手。",
    messages,
    maxTokens: 1024,
    temperature: 0.7, // ← 交互式实验场里我们验证过的最佳值
  });

  return result.toDataStreamResponse(); // ← 自动处理 SSE 流式协议
}`}
          />

          <div className="mt-4">
            <CodeBlock
              language="tsx"
              title="components/ChatUI.tsx — 客户端组件"
              code={`"use client";
import { useChat } from "@ai-sdk/react"; // ← 一行搞定所有状态

export function ChatUI() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    maxSteps: 5, // ← 支持多轮工具调用（tool calling）
    onFinish: (message) => {
      console.log("Token usage:", message.usage); // ← 追踪 token 消耗
    },
  });

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
            <span className="inline-block px-4 py-2 rounded-2xl max-w-[80%]
              bg-white border-2 border-[var(--foreground)]
              shadow-[4px_4px_0px_0px_var(--foreground)]">
              {m.content} {/* ← 流式更新：每个 token 到达时自动 re-render */}
            </span>
          </div>
        ))}
      </div>

      {/* 输入框 */}
      <form onSubmit={handleSubmit} className="p-4 border-t-2 border-[var(--foreground)]">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="问点什么..."
            className="flex-1 px-4 py-3 rounded-xl border-2 border-[var(--foreground)]
              focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-[var(--accent)] text-white font-bold rounded-xl
              border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)]
              hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--foreground)]
              active:translate-y-[4px] active:shadow-none transition-all"
          >
            {isLoading ? "思考中..." : "发送"}
          </button>
        </div>
      </form>
    </div>
  );
}`}
            />
          </div>
        </div>

        {/* ── Example 2: WebLLM ── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[var(--tertiary)] border-2 border-[var(--foreground)] flex items-center justify-center">
              <span className="text-xs font-bold">2</span>
            </div>
            <h3 className="font-['Outfit'] font-bold text-xl">
              WebLLM — 浏览器内的完整推理引擎
            </h3>
            <GeoBadge color="var(--tertiary)">本地运行</GeoBadge>
          </div>
          <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/60 mb-4 max-w-2xl">
            WebLLM 将 Hugging Face 上的模型编译为 WebGPU shader，直接在浏览器
            GPU 上运行。 首次加载模型需下载权重（~1GB），后续从 IndexedDB
            缓存读取仅需 <strong>2-5 秒</strong>。
          </p>
          <CodeBlock
            language="typescript"
            title="lib/webllm-engine.ts — 引擎初始化"
            code={`import * as webllm from "@mlc-ai/web-llm";

// 模型配置：选择量化版本以适配浏览器
const MODEL_CONFIG: webllm.ModelRecord = {
  model: "https://huggingface.co/mlc-ai/Qwen2.5-1.5B-Instruct-q4f16_1-MLC",
  model_id: "Qwen2.5-1.5B-Instruct-q4f16_1", // ← q4 = INT4量化, f16 = 权重FP16
  model_lib: webllm.modelLibURLPrefix + "v0_2_48/Qwen2-1.5B-q4f16_1-ctx4k_cs1k-webgpu.wasm",
  overrides: {
    context_window_size: 4096, // ← 上下文窗口
  },
};

let engine: webllm.MLCEngine | null = null;

export async function initEngine(
  onProgress: (progress: webllm.InitProgressReport) => void
) {
  if (engine) return engine;

  engine = await webllm.CreateMLCEngine(MODEL_CONFIG.model_id, {
    initProgressCallback: onProgress, // ← 进度回调：模型加载 0% → 100%
    logLevel: "INFO",
  });

  return engine;
}

// 流式推理：与 GPT API 几乎相同的接口
export async function* streamChat(prompt: string) {
  if (!engine) throw new Error("Engine not initialized");

  const chunks = await engine.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 512,
    stream: true, // ← 关键：开启流式输出
  });

  for await (const chunk of chunks) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) yield content; // ← 逐 token yield
  }
}`}
          />

          <div className="mt-4">
            <CodeBlock
              language="tsx"
              title="components/LocalAI.tsx — 使用 WebLLM 的 React 组件"
              code={`"use client";
import { useState, useCallback } from "react";
import { initEngine, streamChat } from "@/lib/webllm-engine";

export function LocalAI() {
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [response, setResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  // 1. 初始化引擎（只需一次）
  const handleInit = useCallback(async () => {
    setLoading(true);
    await initEngine((progress) => {
      setLoadProgress(Math.round(progress.progress * 100)); // ← "Loading model: 45%"
    });
    setLoading(false);
  }, []);

  // 2. 发起推理
  const handleGenerate = useCallback(async (prompt: string) => {
    setResponse("");
    setIsStreaming(true);

    try {
      for await (const token of streamChat(prompt)) {
        setResponse((prev) => prev + token); // ← 逐字追加，实现打字机效果
      }
    } finally {
      setIsStreaming(false);
    }
  }, []);

  return (
    <div className="p-6">
      {!engine && (
        <button onClick={handleInit} disabled={loading}>
          {loading ? \`加载中 \${loadProgress}%...\` : "🧠 初始化本地模型"}
        </button>
      )}

      {loading && (
        <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden border-2 border-[var(--foreground)]">
          <div
            className="h-full bg-[var(--accent)] transition-all duration-300"
            style={{ width: \`\${loadProgress}%\` }}
          />
        </div>
      )}

      <button onClick={() => handleGenerate("用一句话解释 WebGPU")}>
        ⚡ 本地推理
      </button>

      <p className="mt-4 whitespace-pre-wrap">{response}</p>
    </div>
  );
}`}
            />
          </div>
        </div>

        {/* ── Example 3: Hybrid Architecture ── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[var(--secondary)] border-2 border-[var(--foreground)] flex items-center justify-center">
              <span className="text-xs font-bold">3</span>
            </div>
            <h3 className="font-['Outfit'] font-bold text-xl">
              混合架构 — 智能路由，按需选择
            </h3>
            <GeoBadge color="var(--secondary)">生产级</GeoBadge>
          </div>
          <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/60 mb-4 max-w-2xl">
            真实项目中，本地小模型处理简单任务（语法检查、代码补全），复杂任务路由到云端大模型（GPT-4o
            / Claude）。 这就是<strong>「混合推理架构」</strong>
            ——兼顾隐私、成本和能力。
          </p>
          <CodeBlock
            language="typescript"
            title="lib/hybrid-router.ts — 智能推理路由"
            code={`import { streamChat as localChat } from "./webllm-engine";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

type TaskType = "simple" | "complex" | "private";

// 路由策略：根据任务类型选择推理后端
function routeInference(taskType: TaskType) {
  const strategies = {
    simple:  "local",   // ← 代码补全、语法检查、简单问答 → 本地小模型
    complex: "cloud",   // ← 长文分析、多步推理、创意写作 → 云端大模型
    private: "local",   // ← 涉及敏感数据 → 强制本地，数据不出浏览器
  } as const;
  return strategies[taskType];
}

// 统一接口：对外暴露相同的流式 API
export async function* smartChat(
  messages: Message[],
  taskType: TaskType = "simple"
) {
  const target = routeInference(taskType);

  if (target === "local") {
    // 本地 WebLLM 推理
    const lastMsg = messages[messages.length - 1].content;
    yield* localChat(lastMsg);
  } else {
    // 云端 API 推理
    const result = streamText({
      model: openai("gpt-4o"),
      messages,
      temperature: 0.7,
    });

    for await (const chunk of result.textStream) {
      yield chunk;
    }
  }
}

// 自动分类：使用简单的启发式规则（可替换为分类模型）
export function classifyTask(prompt: string): TaskType {
  const sensitiveKeywords = ["密码", "token", "key", "secret", "私钥"];
  const complexKeywords = ["分析", "比较", "总结", "写一篇", "设计一个"];

  if (sensitiveKeywords.some((k) => prompt.includes(k))) return "private";
  if (complexKeywords.some((k) => prompt.includes(k))) return "complex";
  if (prompt.length > 500) return "complex"; // ← 长 prompt 通常需要更强的模型
  return "simple";
}`}
          />
        </div>

        {/* Streaming Demo */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="font-['Outfit'] font-bold text-xl">
              🎛️ 流式输出体验演示
            </h3>
          </div>
          <div className="bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_var(--accent)]">
            <div className="flex items-center gap-2 px-5 py-3 bg-[var(--accent)] border-b-2 border-[var(--foreground)]">
              <MessageSquare
                size={18}
                strokeWidth={2.5}
                className="text-white"
              />
              <span className="font-['Outfit'] font-bold text-white">
                Token 流式输出模拟
              </span>
              <span className="ml-auto text-xs text-white/60 font-bold">
                ~40 tokens/s
              </span>
            </div>
            <div className="p-6">
              <div className="min-h-[100px] bg-[var(--background)] rounded-xl border-2 border-[var(--foreground)]/10 p-4 font-['Plus_Jakarta_Sans'] text-sm leading-relaxed">
                {streamingDemo ? (
                  <span>
                    {streamedText}
                    <span className="inline-block w-0.5 h-4 bg-[var(--accent)] ml-0.5 animate-pulse" />
                  </span>
                ) : (
                  <span className="text-[var(--foreground)]/30">
                    点击下方按钮体验 token 流式效果…
                  </span>
                )}
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setStreamingDemo(true);
                  }}
                  disabled={streamingDemo}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white font-bold rounded-xl
                    border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)]
                    hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--foreground)]
                    active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50"
                >
                  <Play size={16} strokeWidth={2.5} />
                  开始流式输出
                </button>
                <button
                  onClick={() => {
                    setStreamingDemo(false);
                    setStreamedText("");
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[var(--card)] font-bold rounded-xl
                    border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)]
                    hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--foreground)]
                    active:translate-y-[4px] active:shadow-none transition-all"
                >
                  <RotateCcw size={16} strokeWidth={2.5} />
                  重置
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Temperature Playground ── */}
        <TemperaturePlayground />
      </section>

      {/* ════════════ L5: ENGINEERING LANDSCAPE ════════════ */}
      <section className="container mt-20">
        <SectionHeading
          tag="L5 · 工程全景"
          title="生产级 AI 前端的关键决策"
          subtitle="模型选型、性能陷阱、安全考量——从 Demo 到 Production 的鸿沟"
          color="var(--quaternary)"
        />

        {/* Interactive Latency Playground */}
        <div className="mb-10">
          <LatencyPlayground />
        </div>

        {/* Model Comparison Table */}
        <div className="bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_var(--foreground)] mb-10">
          <div className="flex items-center gap-3 px-6 py-4 bg-[var(--foreground)] border-b-2 border-[var(--foreground)]">
            <BarChart3 size={20} strokeWidth={2.5} className="text-white" />
            <span className="font-['Outfit'] font-bold text-lg text-white">
              浏览器端模型选型速查
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-['Plus_Jakarta_Sans']">
              <thead>
                <tr className="bg-[var(--foreground)]/5 border-b-2 border-[var(--foreground)]/10">
                  <th className="text-left px-4 py-3 font-bold">模型</th>
                  <th className="text-left px-4 py-3 font-bold">参数量</th>
                  <th className="text-left px-4 py-3 font-bold">量化后大小</th>
                  <th className="text-left px-4 py-3 font-bold">
                    速度 (M2 MacBook)
                  </th>
                  <th className="text-left px-4 py-3 font-bold">适合场景</th>
                  <th className="text-left px-4 py-3 font-bold">推荐度</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Qwen2.5-0.5B",
                    params: "0.5B",
                    size: "~350MB",
                    speed: "85 t/s",
                    use: "代码补全、简单QA",
                    rating: "⭐⭐⭐",
                  },
                  {
                    name: "Llama3.2-1B",
                    params: "1B",
                    size: "~650MB",
                    speed: "42 t/s",
                    use: "通用对话、摘要",
                    rating: "⭐⭐⭐⭐",
                  },
                  {
                    name: "Phi-3.5-3.8B",
                    params: "3.8B",
                    size: "~2.2GB",
                    speed: "12 t/s",
                    use: "复杂推理、多语言",
                    rating: "⭐⭐⭐⭐⭐",
                  },
                  {
                    name: "Gemma2-2B",
                    params: "2B",
                    size: "~1.3GB",
                    speed: "22 t/s",
                    use: "指令跟随、工具调用",
                    rating: "⭐⭐⭐⭐",
                  },
                  {
                    name: "SmolLM2-1.7B",
                    params: "1.7B",
                    size: "~1.0GB",
                    speed: "28 t/s",
                    use: "轻量助手、移动端",
                    rating: "⭐⭐⭐⭐",
                  },
                ].map((m, i) => (
                  <tr
                    key={i}
                    className="border-b border-[var(--foreground)]/5 hover:bg-[var(--accent)]/5 transition-colors"
                  >
                    <td className="px-4 py-3 font-['JetBrains_Mono'] font-bold text-[var(--accent)]">
                      {m.name}
                    </td>
                    <td className="px-4 py-3">{m.params}</td>
                    <td className="px-4 py-3">{m.size}</td>
                    <td className="px-4 py-3 font-bold">{m.speed}</td>
                    <td className="px-4 py-3">{m.use}</td>
                    <td className="px-4 py-3">{m.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Anti-Patterns */}
        <div className="mb-10">
          <h3 className="font-['Outfit'] font-bold text-2xl mb-6 flex items-center gap-3">
            <AlertTriangle
              size={24}
              strokeWidth={2.5}
              className="text-[var(--tertiary)]"
            />
            ⚠️ 常见陷阱与反模式
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Trap 1 */}
            <div className="bg-red-50 border-2 border-red-400 rounded-2xl p-6 shadow-[6px_6px_0px_0px_#ef4444]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🚫</span>
                <h4 className="font-['Outfit'] font-bold">
                  陷阱 #1：不做模型缓存
                </h4>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/70 mb-3">
                每次刷新页面都重新下载 1GB 模型权重？用户体验直接归零。
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3 border border-red-200">
                  <div className="text-xs font-bold text-red-500 mb-1">
                    ❌ 错误
                  </div>
                  <pre className="text-xs font-['JetBrains_Mono'] text-[var(--foreground)]/70 leading-relaxed">
                    {`// 每次都重新初始化
const engine = await CreateMLCEngine(
  modelId
); // 下载 1GB...`}
                  </pre>
                </div>
                <div className="bg-white rounded-xl p-3 border border-green-200">
                  <div className="text-xs font-bold text-[var(--quaternary)] mb-1">
                    ✅ 正确
                  </div>
                  <pre className="text-xs font-['JetBrains_Mono'] text-[var(--foreground)]/70 leading-relaxed">
                    {`// 检查 IndexedDB 缓存
const cached = await caches.match(
  modelUrl
);
if (cached) { /* 直接读取 */ }`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Trap 2 */}
            <div className="bg-red-50 border-2 border-red-400 rounded-2xl p-6 shadow-[6px_6px_0px_0px_#ef4444]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🚫</span>
                <h4 className="font-['Outfit'] font-bold">
                  陷阱 #2：阻塞主线程
                </h4>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/70 mb-3">
                推理运算量极大，直接在主线程调用会让 UI 冻结 3-10 秒。
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3 border border-red-200">
                  <div className="text-xs font-bold text-red-500 mb-1">
                    ❌ 错误
                  </div>
                  <pre className="text-xs font-['JetBrains_Mono'] text-[var(--foreground)]/70 leading-relaxed">
                    {`// 主线程推理 → UI 冻结！
const result = await engine.chat(
  messages
);`}
                  </pre>
                </div>
                <div className="bg-white rounded-xl p-3 border border-green-200">
                  <div className="text-xs font-bold text-[var(--quaternary)] mb-1">
                    ✅ 正确
                  </div>
                  <pre className="text-xs font-['JetBrains_Mono'] text-[var(--foreground)]/70 leading-relaxed">
                    {`// WebLLM 内部已使用 Web Worker
// 但仍需流式更新 UI：
for await (const chunk of stream) {
  appendToken(chunk); // 非阻塞
}`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Trap 3 */}
            <div className="bg-orange-50 border-2 border-orange-400 rounded-2xl p-6 shadow-[6px_6px_0px_0px_#f97316]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">⚠️</span>
                <h4 className="font-['Outfit'] font-bold">
                  陷阱 #3：忽视设备差异
                </h4>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/70 mb-3">
                3.8B 模型在 MacBook M2 上跑 12 tokens/s，在低端安卓上可能只有 1
                token/s。
                <strong>必须做设备适配。</strong>
              </p>
              <CodeBlock
                language="typescript"
                title="自适应模型选择"
                code={`async function selectModelForDevice() {
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter?.requestDevice();

  // 检测 GPU 内存（WebGPU 特有 API）
  const limits = device?.limits;
  const maxBuffer = limits?.maxStorageBufferBindingSize ?? 0;

  // 策略：GPU 内存 > 2GB 用大模型，否则用小模型
  if (maxBuffer > 2 * 1024 ** 3) {
    return "Phi-3.5-3.8B";  // ← 高端设备
  } else if (maxBuffer > 1 * 1024 ** 3) {
    return "Llama3.2-1B";   // ← 中端设备
  } else {
    return "Qwen2.5-0.5B";  // ← 低端设备 / 移动端
  }
}`}
              />
            </div>

            {/* Trap 4 */}
            <div className="bg-orange-50 border-2 border-orange-400 rounded-2xl p-6 shadow-[6px_6px_0px_0px_#f97316]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">⚠️</span>
                <h4 className="font-['Outfit'] font-bold">
                  陷阱 #4：WebGPU 兼容性
                </h4>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/70 mb-3">
                WebGPU 截至 2025 年仅 Chrome / Edge / Firefox Nightly
                支持，Safari 仍在实验阶段。
                <strong>必须有 fallback 方案。</strong>
              </p>
              <div className="bg-white rounded-xl p-4 border-2 border-[var(--foreground)]/10 text-sm font-['Plus_Jakarta_Sans'] space-y-2">
                <div className="flex items-center gap-2">
                  <span>🟢</span> <span className="font-bold">Chrome 113+</span>{" "}
                  <span className="text-[var(--foreground)]/40">
                    — 完全支持
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🟢</span> <span className="font-bold">Edge 113+</span>{" "}
                  <span className="text-[var(--foreground)]/40">
                    — 完全支持
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🟡</span>{" "}
                  <span className="font-bold">Firefox Nightly</span>{" "}
                  <span className="text-[var(--foreground)]/40">
                    — 实验性 flag
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🟡</span> <span className="font-bold">Safari 18+</span>{" "}
                  <span className="text-[var(--foreground)]/40">
                    — 技术预览版
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🔴</span>{" "}
                  <span className="font-bold">移动端浏览器</span>{" "}
                  <span className="text-[var(--foreground)]/40">
                    — 极有限支持
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Benchmarks */}
        <div className="bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl p-6 md:p-8 shadow-[8px_8px_0px_0px_var(--quaternary)] mb-10">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp
              size={24}
              strokeWidth={2.5}
              className="text-[var(--quaternary)]"
            />
            <h3 className="font-['Outfit'] font-bold text-xl">
              真实性能基准 (Apple M2, 16GB)
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: "首次加载 (冷启动)",
                value: "18s",
                detail: "下载 + 编译 shader + 加载权重到 GPU",
                color: "var(--secondary)",
                icon: Timer,
              },
              {
                label: "缓存加载 (热启动)",
                value: "3.2s",
                detail: "IndexedDB 缓存命中，仅需 GPU 上传",
                color: "var(--tertiary)",
                icon: Zap,
              },
              {
                label: "推理速度 (Llama3.2-1B)",
                value: "42 t/s",
                detail: "首字延迟 ~50ms，与 GPT-3.5 感知相当",
                color: "var(--quaternary)",
                icon: Gauge,
              },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="bg-[var(--background)] rounded-xl border-2 border-[var(--foreground)]/10 p-5"
                >
                  <Icon
                    size={20}
                    strokeWidth={2.5}
                    style={{ color: b.color }}
                  />
                  <div
                    className="text-3xl font-extrabold font-['Outfit'] mt-2"
                    style={{ color: b.color }}
                  >
                    {b.value}
                  </div>
                  <div className="font-bold text-sm mt-1">{b.label}</div>
                  <div className="text-xs text-[var(--foreground)]/50 mt-1">
                    {b.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* When to use what */}
        <div className="bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_var(--accent)]">
          <div className="flex items-center gap-3 px-6 py-4 bg-[var(--accent)]/10 border-b-2 border-[var(--foreground)]">
            <Lightbulb
              size={20}
              strokeWidth={2.5}
              className="text-[var(--accent)]"
            />
            <span className="font-['Outfit'] font-bold text-lg">
              决策矩阵：何时用 WebLLM vs 云端 API
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-['Plus_Jakarta_Sans']">
              <thead>
                <tr className="bg-[var(--foreground)]/5 border-b-2 border-[var(--foreground)]/10">
                  <th className="text-left px-5 py-3 font-bold">场景</th>
                  <th className="text-left px-5 py-3 font-bold">推荐方案</th>
                  <th className="text-left px-5 py-3 font-bold">原因</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    scene: "医疗/法律文档分析",
                    solution: "🏠 本地 WebLLM",
                    reason: "数据合规强制要求零泄露",
                    color: "var(--quaternary)",
                  },
                  {
                    scene: "实时代码补全 (IDE)",
                    solution: "🏠 本地 WebLLM",
                    reason: "延迟敏感，<50ms 首字要求",
                    color: "var(--quaternary)",
                  },
                  {
                    scene: "深度论文分析",
                    solution: "☁️ 云端 API",
                    reason: "需要 100K+ context window 和强推理",
                    color: "var(--accent)",
                  },
                  {
                    scene: "离线笔记应用",
                    solution: "🏠 本地 WebLLM",
                    reason: "离线可用是核心卖点",
                    color: "var(--quaternary)",
                  },
                  {
                    scene: "企业客服机器人",
                    solution: "🔄 混合架构",
                    reason: "简单问题本地答，复杂问题转人工/API",
                    color: "var(--tertiary)",
                  },
                  {
                    scene: "多语言实时翻译",
                    solution: "🏠 本地 WebLLM",
                    reason: "高频低延迟，API 成本不可接受",
                    color: "var(--quaternary)",
                  },
                  {
                    scene: "AI 图片生成",
                    solution: "☁️ 云端 API",
                    reason: "SDXL 级模型无法在浏览器运行",
                    color: "var(--accent)",
                  },
                ].map((r, i) => (
                  <tr
                    key={i}
                    className="border-b border-[var(--foreground)]/5 hover:bg-[var(--accent)]/5 transition-colors"
                  >
                    <td className="px-5 py-3 font-bold">{r.scene}</td>
                    <td className="px-5 py-3">
                      <span className="font-bold" style={{ color: r.color }}>
                        {r.solution}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[var(--foreground)]/60">
                      {r.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ════════════ CHEAT SHEET ════════════ */}
      <section className="container mt-20">
        <SectionHeading
          tag="速查清单"
          title="AI × 前端 开发速查表"
          subtitle="一页纸搞定 WebLLM + Vercel AI SDK 的所有关键 API"
          color="var(--tertiary)"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "安装 WebLLM",
              code: "npm install @mlc-ai/web-llm",
              icon: Terminal,
              color: "var(--accent)",
            },
            {
              title: "安装 Vercel AI SDK",
              code: "npm install ai @ai-sdk/openai",
              icon: Terminal,
              color: "var(--secondary)",
            },
            {
              title: "流式响应 (Server)",
              code: `const result = streamText({
  model: openai("gpt-4o"),
  messages,
});
return result.toDataStreamResponse();`,
              icon: Server,
              color: "var(--tertiary)",
            },
            {
              title: "useChat Hook",
              code: `const { messages, input, handleSubmit }
  = useChat({ api: "/api/chat" });`,
              icon: MessageSquare,
              color: "var(--quaternary)",
            },
            {
              title: "初始化 WebLLM",
              code: `const engine = await CreateMLCEngine(
  "Llama-3.2-1B-Instruct-q4f16_1"
);`,
              icon: Cpu,
              color: "var(--accent)",
            },
            {
              title: "流式推理 (本地)",
              code: `const chunks = await engine.chat
  .completions.create({
    messages, stream: true
  });
for await (const c of chunks) { ... }`,
              icon: Activity,
              color: "var(--secondary)",
            },
            {
              title: "检测 WebGPU 支持",
              code: `if (!navigator.gpu) {
  console.log("WebGPU 不支持");
  // fallback to API
}`,
              icon: Shield,
              color: "var(--tertiary)",
            },
            {
              title: "模型加载进度",
              code: `await CreateMLCEngine(id, {
  initProgressCallback: (p) => {
    console.log(\`\${p.progress * 100}%\`);
  }
});`,
              icon: BarChart3,
              color: "var(--quaternary)",
            },
            {
              title: "useCompletion Hook",
              code: `const { completion, complete }
  = useCompletion({
    api: "/api/completion"
  });
await complete("写一个冒泡排序");`,
              icon: Code2,
              color: "var(--accent)",
            },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="animate-slide bg-[var(--card)] border-2 border-[var(--foreground)] rounded-2xl p-5 shadow-[5px_5px_0px_0px_var(--foreground)] hover:rotate-[-0.5deg] hover:scale-[1.02] transition-transform"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg border-2 border-[var(--foreground)] flex items-center justify-center"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon size={16} strokeWidth={2.5} />
                  </div>
                  <span className="font-['Outfit'] font-bold text-sm">
                    {card.title}
                  </span>
                </div>
                <pre className="text-xs font-['JetBrains_Mono'] bg-[#1E293B] text-[#E2E8F0] rounded-xl p-3 overflow-x-auto leading-relaxed border-2 border-[var(--foreground)]">
                  <code
                    dangerouslySetInnerHTML={{
                      __html: highlightCode(card.code, "typescript"),
                    }}
                  />
                </pre>
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <section className="container mt-20">
        <div className="bg-[var(--foreground)] rounded-2xl p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_var(--accent)]">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)] rounded-full border-2 border-white/20 mb-6">
            <Rocket size={16} strokeWidth={2.5} className="text-white" />
            <span className="text-white font-bold text-sm">下一步行动</span>
          </div>
          <h2 className="font-['Outfit'] text-3xl md:text-4xl font-extrabold text-white mb-4">
            浏览器是下一个 AI 平台
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
            WebGPU 标准刚满两年，WebLLM 生态正在爆发式增长。 2025
            年，你的前端应用不再只是"调 API 的壳"， 而是一台
            <span className="text-[var(--tertiary)] font-bold">
              拥有本地 AI 能力的智能终端
            </span>
            。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/mlc-ai/web-llm"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[var(--accent)] text-white font-bold rounded-xl
                border-2 border-white/20 shadow-[4px_4px_0px_0px_var(--secondary)]
                hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--secondary)]
                active:translate-y-[4px] active:shadow-none transition-all"
            >
              🧠 WebLLM GitHub
            </a>
            <a
              href="https://sdk.vercel.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[var(--card)] text-[var(--foreground)] font-bold rounded-xl
                border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)]
                hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--foreground)]
                active:translate-y-[4px] active:shadow-none transition-all"
            >
              ⚡ Vercel AI SDK
            </a>
            <a
              href="https://webgpu.rocks"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[var(--tertiary)] text-[var(--foreground)] font-bold rounded-xl
                border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)]
                hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--foreground)]
                active:translate-y-[4px] active:shadow-none transition-all"
            >
              🌐 WebGPU 文档
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
