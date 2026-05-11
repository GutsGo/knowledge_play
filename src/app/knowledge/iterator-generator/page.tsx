"use client";

import { useState, useCallback, useMemo } from "react";
import { highlightCode } from "@/lib/prism-highlight";
import {
  Zap,
  ArrowRight,
  AlertTriangle,
  Code2,
  Layers,
  GitBranch,
  Timer,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Wrench,
  Database,
  Gauge,
  Plus,
  RefreshCw,
  SkipForward,
  Play,
  RotateCcw,
  Eye,
  Workflow,
  CircleDot,
  ArrowDown,
  ChevronRight,
  FastForward,
  BookOpen,
  Infinity,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   CodeBlock — 所有代码块必须使用 highlightCode 渲染
   ═══════════════════════════════════════════════════════════════ */
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
      <pre className="p-5 overflow-x-auto text-sm leading-relaxed">
        <code
          className={`font-['JetBrains_Mono',monospace] text-[#E2E8F0] language-${language}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   🎮 交互式实验场 ① — 生成器执行器 Generator Stepper
   ═══════════════════════════════════════════════════════════════ */
function GeneratorStepper() {
  const [step, setStep] = useState(0);
  const [log, setLog] = useState<{ value: string; done: boolean }[]>([]);
  const [pulse, setPulse] = useState(false);

  const steps = [
    { value: "1", done: false },
    { value: "2", done: false },
    { value: "3", done: false },
    { value: "undefined", done: true },
  ];

  const handleNext = () => {
    if (step >= steps.length) return;
    setLog((prev) => [...prev, steps[step]]);
    setStep((prev) => prev + 1);
    setPulse(true);
    setTimeout(() => setPulse(false), 400);
  };

  const handleReset = () => {
    setStep(0);
    setLog([]);
  };

  const codeLines = [
    { text: "function* counter() {", indent: 0 },
    { text: "  yield 1;   // ①", indent: 1 },
    { text: "  yield 2;   // ②", indent: 2 },
    { text: "  yield 3;   // ③", indent: 3 },
    { text: "}                     ", indent: 4 },
  ];

  return (
    <div className="border-[3px] border-[var(--foreground)] rounded-3xl overflow-hidden bg-[var(--card)] shadow-[8px_8px_0px_0px_var(--accent)]">
      <div className="px-6 py-4 bg-[var(--accent)] border-b-[3px] border-[var(--foreground)] flex items-center gap-3">
        <Play className="w-5 h-5 text-white" strokeWidth={2.5} />
        <h3 className="text-white font-['Outfit'] font-bold text-lg">
          生成器执行器
        </h3>
        <span className="ml-auto px-2.5 py-0.5 bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/30">
          Interactive
        </span>
      </div>

      <div className="p-6 space-y-5">
        {/* Controls */}
        <div className="flex gap-3">
          <button
            onClick={handleNext}
            disabled={step >= steps.length}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white rounded-xl border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] font-['Plus_Jakarta_Sans'] font-bold text-sm active:shadow-[2px_2px_0px_0px_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
          >
            <SkipForward className="w-4 h-4" strokeWidth={2.5} />
            gen.next()
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 bg-[var(--border)] text-[var(--foreground)] rounded-xl border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] font-['Plus_Jakarta_Sans'] font-bold text-sm active:shadow-[2px_2px_0px_0px_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] transition-all hover:scale-105"
          >
            <RotateCcw className="w-4 h-4" strokeWidth={2.5} />
            重置
          </button>
        </div>

        {/* Code with execution pointer */}
        <div className="bg-[#1E293B] rounded-xl border-2 border-[var(--foreground)] p-4 font-['JetBrains_Mono',monospace] text-sm overflow-x-auto">
          <div className="text-[#64748B] text-xs mb-3">
            const gen = counter();
          </div>
          <div className="space-y-1">
            {codeLines.map((line, i) => {
              const isActive = step === i;
              const isDone = step > i;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--accent)]/20 border-l-[3px] border-[var(--accent)]"
                      : isDone
                        ? "bg-[var(--quaternary)]/10 border-l-[3px] border-[var(--quaternary)]"
                        : "border-l-[3px] border-transparent"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                      isActive
                        ? "bg-[var(--accent)] text-white border-[var(--foreground)] scale-110"
                        : isDone
                          ? "bg-[var(--quaternary)] text-white border-[var(--foreground)]"
                          : "bg-transparent border-[var(--foreground)]/20 text-[var(--foreground)]/20"
                    }`}
                  >
                    {isDone ? "✓" : isActive ? "▶" : i + 1}
                  </span>
                  <span
                    className={`transition-colors ${
                      isActive
                        ? "text-white"
                        : isDone
                          ? "text-[var(--quaternary)]"
                          : "text-[#64748B]"
                    }`}
                  >
                    {line.text}
                  </span>
                  {isActive && (
                    <span className="ml-auto text-[10px] text-[var(--accent)] font-bold animate-pulse">
                      ← 执行到此
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Execution log */}
        <div>
          <div className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider mb-2 font-['Plus_Jakarta_Sans']">
            执行日志
          </div>
          <div className="space-y-1.5">
            {log.length === 0 && (
              <div className="text-sm text-[var(--foreground)]/30 font-['Plus_Jakarta_Sans'] py-4 text-center border-2 border-dashed border-[var(--border)] rounded-xl">
                点击{" "}
                <span className="font-bold text-[var(--accent)]">
                  gen.next()
                </span>{" "}
                开始执行 ▲
              </div>
            )}
            {log.map((entry, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl border-2 text-sm font-['Plus_Jakarta_Sans'] transition-all ${
                  pulse && i === log.length - 1 ? "animate-pop" : ""
                } ${
                  entry.done
                    ? "bg-[var(--quaternary)]/10 border-[var(--quaternary)]"
                    : "bg-[var(--tertiary)]/10 border-[var(--tertiary)]"
                }`}
              >
                <span className="font-['JetBrains_Mono',monospace] font-bold text-[var(--foreground)] text-xs w-6">
                  #{i + 1}
                </span>
                <ChevronRight
                  className="w-3 h-3 text-[var(--foreground)]/40"
                  strokeWidth={3}
                />
                <span className="font-['JetBrains_Mono',monospace] text-[var(--accent)] font-bold text-xs">
                  {"{ "}
                  value: {entry.value}, done: {String(entry.done)}
                  {" }"}
                </span>
                {entry.done && (
                  <span className="ml-auto px-2 py-0.5 bg-[var(--quaternary)] text-white text-[10px] font-bold rounded-full uppercase border border-[var(--foreground)]">
                    ✓ 完成
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Insight */}
        <div className="bg-[var(--accent)]/5 rounded-xl border-2 border-[var(--accent)]/20 px-4 py-3 text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70">
          <Lightbulb
            className="w-4 h-4 text-[var(--accent)] inline mr-1.5 -mt-0.5"
            strokeWidth={2.5}
          />
          <span className="font-bold">关键洞察：</span>
          生成器函数体不会一次性执行完毕。 每次调用{" "}
          <code className="font-['JetBrains_Mono',monospace] bg-[var(--accent)]/10 px-1 rounded">
            .next()
          </code>
          ， 函数从上次暂停处恢复，执行到下一个{" "}
          <code className="font-['JetBrains_Mono',monospace] bg-[var(--accent)]/10 px-1 rounded">
            yield
          </code>{" "}
          后再次暂停—— 这就是<strong>协程 (Coroutine)</strong> 的核心机制。
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   🎮 交互式实验场 ② — 惰性流水线 Lazy Pipeline Builder
   ═══════════════════════════════════════════════════════════════ */
type OpType =
  | "filter-even"
  | "filter-gt10"
  | "map-sq"
  | "map-x3"
  | "take5"
  | "take8";

function LazyPipeline() {
  const [ops, setOps] = useState<OpType[]>([]);
  const [output, setOutput] = useState<number[]>([]);
  const [trace, setTrace] = useState<string[]>([]);
  const [iterCount, setIterCount] = useState(0);

  const opMeta: Record<OpType, { label: string; color: string; tag: string }> =
    {
      "filter-even": {
        label: "filter(偶数)",
        color: "var(--secondary)",
        tag: "filter",
      },
      "filter-gt10": {
        label: "filter(>10)",
        color: "var(--secondary)",
        tag: "filter",
      },
      "map-sq": { label: "map(n²)", color: "var(--accent)", tag: "map" },
      "map-x3": { label: "map(n×3)", color: "var(--accent)", tag: "map" },
      take5: { label: "take(5)", color: "var(--quaternary)", tag: "take" },
      take8: { label: "take(8)", color: "var(--quaternary)", tag: "take" },
    };

  const addOp = (op: OpType) => {
    if (ops.length >= 5) return;
    setOps((prev) => [...prev, op]);
  };
  const removeOp = (i: number) =>
    setOps((prev) => prev.filter((_, idx) => idx !== i));

  const run = useCallback(() => {
    const t: string[] = [];
    let count = 0;

    function* range(start: number, end: number) {
      for (let i = start; i <= end; i++) yield i;
    }
    function* filterFn(
      iter: Iterable<number>,
      pred: (n: number) => boolean,
      name: string,
    ) {
      for (const n of iter) {
        count++;
        if (pred(n)) {
          t.push(`${name} ${n} → ✓`);
          yield n;
        } else {
          t.push(`${name} ${n} → ✗`);
        }
      }
    }
    function* mapFn(
      iter: Iterable<number>,
      fn: (n: number) => number,
      name: string,
    ) {
      for (const n of iter) {
        count++;
        const r = fn(n);
        t.push(`${name} ${n} → ${r}`);
        yield r;
      }
    }
    function* takeFn(iter: Iterable<number>, c: number) {
      let taken = 0;
      for (const n of iter) {
        if (taken >= c) return; // ← 短路！上游停止拉取
        taken++;
        yield n;
      }
    }

    let pipeline: Iterable<number> = range(1, 30);
    for (const op of ops) {
      switch (op) {
        case "filter-even":
          pipeline = filterFn(pipeline, (n) => n % 2 === 0, "filter(偶数)");
          break;
        case "filter-gt10":
          pipeline = filterFn(pipeline, (n) => n > 10, "filter(>10)");
          break;
        case "map-sq":
          pipeline = mapFn(pipeline, (n) => n * n, "map(n²)");
          break;
        case "map-x3":
          pipeline = mapFn(pipeline, (n) => n * 3, "map(n×3)");
          break;
        case "take5":
          pipeline = takeFn(pipeline, 5);
          break;
        case "take8":
          pipeline = takeFn(pipeline, 8);
          break;
      }
    }

    setOutput([...pipeline]);
    setTrace(t);
    setIterCount(count);
  }, [ops]);

  return (
    <div className="border-[3px] border-[var(--foreground)] rounded-3xl overflow-hidden bg-[var(--card)] shadow-[8px_8px_0px_0px_var(--tertiary)]">
      <div className="px-6 py-4 bg-[var(--tertiary)] border-b-[3px] border-[var(--foreground)] flex items-center gap-3">
        <Workflow
          className="w-5 h-5 text-[var(--foreground)]"
          strokeWidth={2.5}
        />
        <h3 className="text-[var(--foreground)] font-['Outfit'] font-bold text-lg">
          惰性流水线
        </h3>
        <span className="ml-auto px-2.5 py-0.5 bg-[var(--foreground)]/10 text-[var(--foreground)] text-[10px] font-bold uppercase tracking-wider rounded-full border border-[var(--foreground)]/20">
          Interactive
        </span>
      </div>

      <div className="p-6 space-y-5">
        {/* Data source */}
        <div className="flex items-center gap-2 text-sm font-['Plus_Jakarta_Sans']">
          <Database
            className="w-4 h-4 text-[var(--accent)]"
            strokeWidth={2.5}
          />
          <span className="font-bold">数据源:</span>
          <code className="font-['JetBrains_Mono',monospace] text-xs bg-[var(--accent)]/10 px-2 py-0.5 rounded border border-[var(--accent)]/30">
            range(1, 30)
          </code>
          <span className="ml-auto text-xs text-[var(--foreground)]/40">
            共 30 个元素
          </span>
        </div>

        {/* Add ops */}
        <div>
          <div className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider mb-2 font-['Plus_Jakarta_Sans']">
            点击添加管道操作 (最多 5 步)
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(opMeta) as OpType[]).map((key) => (
              <button
                key={key}
                onClick={() => addOp(key)}
                disabled={ops.length >= 5}
                className="px-3 py-1.5 rounded-lg border-2 border-[var(--foreground)] text-xs font-bold font-['Plus_Jakarta_Sans'] shadow-[3px_3px_0px_0px_var(--foreground)] active:shadow-[1px_1px_0px_0px_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
                style={{ backgroundColor: opMeta[key].color }}
              >
                {opMeta[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* Pipeline viz */}
        <div className="bg-[var(--background)] rounded-xl border-2 border-[var(--foreground)] p-4 min-h-[56px]">
          {ops.length === 0 ? (
            <div className="text-sm text-[var(--foreground)]/30 font-['Plus_Jakarta_Sans'] text-center py-2">
              ← 点击上方按钮构建流水线
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-1 bg-[var(--foreground)] text-white text-[10px] font-bold rounded font-['JetBrains_Mono',monospace]">
                source
              </span>
              {ops.map((op, i) => (
                <div key={i} className="flex items-center gap-2">
                  <ArrowRight
                    className="w-3.5 h-3.5 text-[var(--foreground)]/40"
                    strokeWidth={3}
                  />
                  <button
                    onClick={() => removeOp(i)}
                    className="px-2.5 py-1 rounded-lg border-2 border-[var(--foreground)] text-[10px] font-bold font-['JetBrains_Mono',monospace] hover:bg-red-100 transition-colors group"
                    style={{ backgroundColor: opMeta[op].color }}
                  >
                    {opMeta[op].label}
                    <span className="ml-1 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      ×
                    </span>
                  </button>
                </div>
              ))}
              <ArrowRight
                className="w-3.5 h-3.5 text-[var(--foreground)]/40"
                strokeWidth={3}
              />
              <span className="px-2 py-1 bg-[var(--quaternary)] text-white text-[10px] font-bold rounded font-['JetBrains_Mono',monospace] border border-[var(--foreground)]">
                output
              </span>
            </div>
          )}
        </div>

        {/* Run */}
        <button
          onClick={run}
          disabled={ops.length === 0}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--quaternary)] text-white rounded-xl border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] font-['Plus_Jakarta_Sans'] font-bold text-sm active:shadow-[2px_2px_0px_0px_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
        >
          <Play className="w-4 h-4" strokeWidth={2.5} />
          执行流水线
        </button>

        {/* Results */}
        {output.length > 0 && (
          <div className="space-y-3 animate-slide">
            <div className="flex flex-wrap items-center gap-3 text-sm font-['Plus_Jakarta_Sans']">
              <span className="font-bold">输出:</span>
              <code className="font-['JetBrains_Mono',monospace] text-xs bg-[var(--quaternary)]/10 px-2.5 py-1 rounded-lg border border-[var(--quaternary)]/30 break-all">
                [{output.join(", ")}]
              </code>
              <span className="ml-auto px-2.5 py-1 bg-[var(--tertiary)]/20 rounded-lg text-xs font-bold border-2 border-[var(--tertiary)]/40 font-['Plus_Jakarta_Sans']">
                <Gauge
                  className="w-3 h-3 inline mr-1 -mt-0.5"
                  strokeWidth={2.5}
                />
                仅迭代 {iterCount} 次
              </span>
            </div>

            <details className="bg-[#1E293B] rounded-xl border-2 border-[var(--foreground)] overflow-hidden group">
              <summary className="px-4 py-2.5 text-[#94A3B8] text-xs font-bold font-['Plus_Jakarta_Sans'] cursor-pointer hover:text-white transition-colors flex items-center gap-2">
                <Eye className="w-3.5 h-3.5" strokeWidth={2.5} />
                查看执行追踪 ({trace.length} 步)
                <ChevronRight
                  className="w-3 h-3 ml-auto group-open:rotate-90 transition-transform"
                  strokeWidth={2.5}
                />
              </summary>
              <div className="px-4 pb-4 max-h-48 overflow-y-auto space-y-0.5 border-t border-[#334155] pt-3">
                {trace.map((t, i) => (
                  <div
                    key={i}
                    className="text-[10px] font-['JetBrains_Mono',monospace] text-[#E2E8F0]/60 leading-5"
                  >
                    <span className="text-[#64748B] mr-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t}
                  </div>
                ))}
              </div>
            </details>

            <div className="bg-[var(--quaternary)]/5 rounded-xl border-2 border-[var(--quaternary)]/20 px-4 py-3 text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70">
              <Zap
                className="w-4 h-4 text-[var(--quaternary)] inline mr-1.5 -mt-0.5"
                strokeWidth={2.5}
              />
              <span className="font-bold">惰性的力量：</span>
              如果没有{" "}
              <code className="font-['JetBrains_Mono',monospace] bg-[var(--quaternary)]/10 px-1 rounded">
                take
              </code>
              ， 整个 range(1, 30) 都会被遍历。加入{" "}
              <code className="font-['JetBrains_Mono',monospace] bg-[var(--quaternary)]/10 px-1 rounded">
                take(5)
              </code>{" "}
              后， 上游在拿到 5 个结果后就<strong>停止拉取</strong>——这就是
              <strong>短路求值 (Short-circuit Evaluation)</strong>。
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   📄 主页面组件
   ═══════════════════════════════════════════════════════════════ */
export default function IteratorsAndGeneratorsPage() {
  return (
    <main className="bg-dot-grid min-h-screen pb-24">
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-16">
        {/* Decorative blobs */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 bg-[var(--accent)]/10 blur-3xl pointer-events-none"
          style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
        />
        <div
          className="absolute bottom-0 -left-16 w-64 h-64 bg-[var(--tertiary)]/10 blur-3xl pointer-events-none"
          style={{ borderRadius: "40% 60% 70% 30% / 30% 70% 40% 60%" }}
        />

        <div className="container relative z-10">
          {/* Tag */}
          <div className="animate-pop inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-widest rounded-full border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] mb-6">
            <Layers className="w-3.5 h-3.5" strokeWidth={2.5} />
            JavaScript 核心机制
          </div>

          {/* Title */}
          <h1 className="font-['Outfit'] font-extrabold text-5xl md:text-7xl text-[var(--foreground)] leading-[1.1] mb-4 animate-slide">
            迭代器
            <span className="text-[var(--accent)]">&</span>
            生成器
          </h1>

          <p
            className="font-['Plus_Jakarta_Sans'] text-lg md:text-xl text-[var(--foreground)]/60 max-w-2xl leading-relaxed animate-slide"
            style={{ animationDelay: "0.1s" }}
          >
            <strong className="text-[var(--foreground)]">
              Symbol.iterator 协议
            </strong>
            、
            <strong className="text-[var(--foreground)]">
              async generator 异步迭代
            </strong>
            、
            <strong className="text-[var(--foreground)]">
              惰性求值与数据流处理
            </strong>
            —— 掌控数据流的终极武器。
          </p>

          {/* Quick overview badges */}
          <div
            className="flex flex-wrap gap-3 mt-8 animate-slide"
            style={{ animationDelay: "0.2s" }}
          >
            {[
              {
                icon: GitBranch,
                text: "Symbol.iterator 协议",
                color: "var(--accent)",
              },
              {
                icon: Zap,
                text: "Generator & yield",
                color: "var(--secondary)",
              },
              {
                icon: Timer,
                text: "Async Generator",
                color: "var(--tertiary)",
              },
              {
                icon: Workflow,
                text: "惰性数据流",
                color: "var(--quaternary)",
              },
            ].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-[var(--foreground)] shadow-[3px_3px_0px_0px_var(--foreground)] text-xs font-bold font-['Plus_Jakarta_Sans']"
                style={{ backgroundColor: badge.color }}
              >
                <badge.icon
                  className="w-3.5 h-3.5 text-white"
                  strokeWidth={2.5}
                />
                <span className="text-white">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── L1: 直觉锚点 ─────────────────────────────────── */}
      <section className="container py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)] border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="font-['Outfit'] font-extrabold text-2xl text-[var(--foreground)]">
            L1 · 一句话理解
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Analogy card */}
          <div className="topic-card rounded-2xl p-6 md:p-8 animate-slide">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[var(--tertiary)] border-2 border-[var(--foreground)] flex items-center justify-center">
                <span className="text-sm">🎵</span>
              </div>
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[var(--foreground)]/60 uppercase tracking-wider">
                生活类比
              </span>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-lg text-[var(--foreground)] leading-relaxed mb-4">
              迭代器就像一个<strong>音乐播放列表</strong>
              ：你不用把所有歌一次性加载进内存，
              而是每次按「下一首」时，才从列表里取出下一首歌。
            </p>
            <p className="font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/60 leading-relaxed">
              生成器则是<strong>创建这个播放列表的工具</strong>
              ——它不预先计算所有歌曲，
              而是你每次按「下一首」时，它才「生成」下一首给你。
            </p>
          </div>

          {/* Visual protocol card */}
          <div
            className="animate-slide rounded-2xl p-6 md:p-8 bg-[var(--accent)]/5 border-2 border-[var(--accent)]/20"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[var(--accent)] uppercase tracking-wider mb-4">
              核心协议 · 一图流
            </div>
            <div className="space-y-3">
              {[
                {
                  from: "Iterable",
                  arrow: "[Symbol.iterator]",
                  to: "Iterator",
                  color: "var(--accent)",
                },
                {
                  from: "Iterator",
                  arrow: ".next()",
                  to: "{ value, done }",
                  color: "var(--secondary)",
                },
                {
                  from: "{ value, done }",
                  arrow: "done === true?",
                  to: "停止迭代",
                  color: "var(--tertiary)",
                },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2 flex-wrap">
                  <span
                    className="px-3 py-1.5 rounded-lg border-2 border-[var(--foreground)] text-xs font-bold font-['JetBrains_Mono',monospace] text-white shadow-[3px_3px_0px_0px_var(--foreground)]"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.from}
                  </span>
                  <ArrowRight
                    className="w-4 h-4 text-[var(--foreground)]/40 flex-shrink-0"
                    strokeWidth={2.5}
                  />
                  <span className="px-2 py-1 bg-[var(--foreground)] text-white text-[10px] font-bold rounded font-['JetBrains_Mono',monospace]">
                    {step.arrow}
                  </span>
                  <ArrowRight
                    className="w-4 h-4 text-[var(--foreground)]/40 flex-shrink-0"
                    strokeWidth={2.5}
                  />
                  <span
                    className="px-3 py-1.5 rounded-lg border-2 border-[var(--foreground)] text-xs font-bold font-['JetBrains_Mono',monospace] text-white shadow-[3px_3px_0px_0px_var(--foreground)]"
                    style={{
                      backgroundColor: i < 2 ? step.color : "var(--quaternary)",
                    }}
                  >
                    {step.to}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/50">
              只要一个对象拥有{" "}
              <code className="font-['JetBrains_Mono',monospace] bg-[var(--foreground)]/5 px-1 rounded">
                [Symbol.iterator]
              </code>{" "}
              方法， 它就是<strong>可迭代的 (Iterable)</strong>，可以被{" "}
              <code className="font-['JetBrains_Mono',monospace] bg-[var(--foreground)]/5 px-1 rounded">
                for...of
              </code>{" "}
              遍历。
            </div>
          </div>
        </div>
      </section>

      {/* ─── L2: 为什么需要 ───────────────────────────────── */}
      <section className="container py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[var(--secondary)] border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="font-['Outfit'] font-extrabold text-2xl text-[var(--foreground)]">
            L2 · 痛点：为什么需要迭代器协议？
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "索引地狱",
              icon: "😵",
              problem:
                "每种数据结构有不同的遍历方式：数组用 for(i=0;i<n;i++)，对象用 for...in，NodeList 用 forEach，Map 用 .entries()",
              color: "var(--secondary)",
              solution: "统一为 for...of，只要有 [Symbol.iterator] 就能遍历",
            },
            {
              title: "内存爆炸",
              icon: "💥",
              problem:
                "Array.from(range(1, 10_000_000)) 需要 ~80MB 内存存储一千万个数字。在浏览器主线程中直接 OOM。",
              color: "var(--tertiary)",
              solution: "生成器按需生成，无论序列多长，内存始终 O(1)",
            },
            {
              title: "缺乏组合性",
              icon: "🧩",
              problem:
                "数组的 .filter().map().slice() 会创建中间数组，3 次遍历 = 3 倍计算，且无法提前终止。",
              color: "var(--quaternary)",
              solution: "生成器链式组合，单次遍历 + 短路求值，零中间分配",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="topic-card rounded-2xl p-6 animate-slide"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3
                className="font-['Outfit'] font-bold text-lg mb-3"
                style={{ color: card.color }}
              >
                {card.title}
              </h3>
              <div className="space-y-3">
                <div className="rounded-xl bg-red-50 border-2 border-red-200 px-4 py-3">
                  <div className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1 font-['Plus_Jakarta_Sans']">
                    ❌ 传统方式
                  </div>
                  <p className="text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70 leading-relaxed">
                    {card.problem}
                  </p>
                </div>
                <div className="rounded-xl bg-green-50 border-2 border-green-200 px-4 py-3">
                  <div className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1 font-['Plus_Jakarta_Sans']">
                    ✅ 迭代器方案
                  </div>
                  <p className="text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70 leading-relaxed">
                    {card.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── L3: 核心原理 ─────────────────────────────────── */}
      <section className="container py-12">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[var(--tertiary)] border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] flex items-center justify-center">
            <Code2
              className="w-5 h-5 text-[var(--foreground)]"
              strokeWidth={2.5}
            />
          </div>
          <h2 className="font-['Outfit'] font-extrabold text-2xl text-[var(--foreground)]">
            L3 · 核心原理深度拆解
          </h2>
        </div>

        {/* 3.1 Symbol.iterator */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[var(--accent)] text-white font-['Outfit'] font-bold text-sm flex items-center justify-center border-2 border-[var(--foreground)]">
              1
            </span>
            <h3 className="font-['Outfit'] font-bold text-xl text-[var(--foreground)]">
              Symbol.iterator 协议 —— 统一的遍历契约
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <p className="font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70 leading-relaxed mb-4">
                <strong>可迭代协议 (Iterable Protocol)</strong>{" "}
                要求对象实现一个以{" "}
                <code className="font-['JetBrains_Mono',monospace] bg-[var(--foreground)]/5 px-1.5 py-0.5 rounded text-xs">
                  Symbol.iterator
                </code>{" "}
                为键的方法，该方法返回一个
                <strong>迭代器对象 (Iterator Object)</strong>。 迭代器对象必须有{" "}
                <code className="font-['JetBrains_Mono',monospace] bg-[var(--foreground)]/5 px-1.5 py-0.5 rounded text-xs">
                  .next()
                </code>{" "}
                方法，返回{" "}
                <code className="font-['JetBrains_Mono',monospace] bg-[var(--foreground)]/5 px-1.5 py-0.5 rounded text-xs">
                  {"{ value, done }"}
                </code>{" "}
                结构。
              </p>
              <p className="font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70 leading-relaxed mb-4">
                JavaScript 内置的可迭代类型包括：<strong>Array</strong>、
                <strong>String</strong>、<strong>Map</strong>、
                <strong>Set</strong>、<strong>TypedArray</strong>、
                <strong>arguments</strong>、<strong>NodeList</strong>
                。它们都实现了{" "}
                <code className="font-['JetBrains_Mono',monospace] bg-[var(--foreground)]/5 px-1.5 py-0.5 rounded text-xs">
                  [Symbol.iterator]
                </code>
                。
              </p>
              <CodeBlock
                title="验证内置可迭代类型"
                language="typescript"
                code={`const arr = [10, 20, 30];
const iter = arr[Symbol.iterator](); // ← 获取迭代器

console.log(iter.next()); // { value: 10, done: false }
console.log(iter.next()); // { value: 20, done: false }
console.log(iter.next()); // { value: 30, done: false }
console.log(iter.next()); // { value: undefined, done: true }

// for...of 的本质就是调用 Symbol.iterator
// 等价于:
const iter2 = arr[Symbol.iterator]();
let result;
while (!(result = iter2.next()).done) {
  console.log(result.value); // 10, 20, 30
}`}
              />
            </div>
            <div>
              <CodeBlock
                title="自定义可迭代对象：Range 类"
                language="typescript"
                code={`class Range {
  constructor(
    public start: number,
    public end: number,
    public step: number = 1
  ) {}

  // 实现可迭代协议
  [Symbol.iterator](): Iterator<number> {
    let current = this.start;
    const end = this.end;
    const step = this.step;

    return {
      next(): IteratorResult<number> {
        if (current <= end) {
          const value = current;  // ← 捕获当前值
          current += step;         // ← 推进指针
          return { value, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

// 使用方式与内置类型完全一致
const range = new Range(1, 10, 2);
for (const n of range) {
  console.log(n); // 1, 3, 5, 7, 9
}

// 展开运算符也生效（因为它是可迭代的）
const arr = [...new Range(1, 5)]; // [1, 2, 3, 4, 5]`}
              />
            </div>
          </div>
        </div>

        {/* 3.2 Generator Functions */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[var(--secondary)] text-white font-['Outfit'] font-bold text-sm flex items-center justify-center border-2 border-[var(--foreground)]">
              2
            </span>
            <h3 className="font-['Outfit'] font-bold text-xl text-[var(--foreground)]">
              Generator 函数 —— 自动实现迭代协议的语法糖
            </h3>
          </div>

          <div className="topic-card rounded-2xl p-6 md:p-8 mb-6">
            <p className="font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70 leading-relaxed mb-4">
              手写{" "}
              <code className="font-['JetBrains_Mono',monospace] bg-[var(--foreground)]/5 px-1.5 py-0.5 rounded text-xs">
                [Symbol.iterator]
              </code>
              非常繁琐。Generator（生成器函数）通过{" "}
              <code className="font-['JetBrains_Mono',monospace] bg-[var(--foreground)]/5 px-1.5 py-0.5 rounded text-xs">
                function*
              </code>
              语法和{" "}
              <code className="font-['JetBrains_Mono',monospace] bg-[var(--foreground)]/5 px-1.5 py-0.5 rounded text-xs">
                yield
              </code>
              关键字，<strong>自动生成迭代器对象</strong>，并管理执行状态。
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl bg-[var(--accent)]/5 border-2 border-[var(--accent)]/20 p-4">
                <div className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-2 font-['Plus_Jakarta_Sans']">
                  Generator 三大特性
                </div>
                <ul className="space-y-2 text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[var(--accent)] text-white text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold border border-[var(--foreground)]">
                      1
                    </span>
                    <span>
                      <strong>惰性执行</strong>：函数体不会立即执行，调用
                      .next() 才开始
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[var(--accent)] text-white text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold border border-[var(--foreground)]">
                      2
                    </span>
                    <span>
                      <strong>可暂停</strong>：yield
                      让执行暂停，保留完整执行上下文（栈、局部变量）
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[var(--accent)] text-white text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold border border-[var(--foreground)]">
                      3
                    </span>
                    <span>
                      <strong>双向通信</strong>：.next(value)
                      可向生成器传入值，替换 yield 表达式的返回值
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl bg-[var(--tertiary)]/5 border-2 border-[var(--tertiary)]/20 p-4">
                <div className="text-xs font-bold text-[var(--tertiary)] uppercase tracking-wider mb-2 font-['Plus_Jakarta_Sans']">
                  ⚡ 手写 vs Generator 对比
                </div>
                <div className="space-y-2 text-xs font-['JetBrains_Mono',monospace]">
                  <div className="bg-red-50 rounded-lg border border-red-200 px-3 py-2 text-[var(--foreground)]/70">
                    <span className="text-red-500 font-bold">手写迭代器：</span>{" "}
                    ~15 行，需要维护闭包状态
                  </div>
                  <div className="bg-green-50 rounded-lg border border-green-200 px-3 py-2 text-[var(--foreground)]/70">
                    <span className="text-green-600 font-bold">
                      Generator：
                    </span>{" "}
                    ~5 行，yield 自动管理状态
                  </div>
                </div>
              </div>
            </div>
            <CodeBlock
              title="同一个 Range，Generator 实现"
              language="typescript"
              code={`function* range(start: number, end: number, step = 1) {
  for (let i = start; i <= end; i += step) {
    yield i;  // ← 暂停执行，返回 i 给调用者
  }
  // 函数结束时自动返回 { value: undefined, done: true }
}

// 直接用于 for...of
for (const n of range(1, 5)) {
  console.log(n); // 1, 2, 3, 4, 5
}

// 展开运算符
const nums = [...range(10, 15)]; // [10, 11, 12, 13, 14, 15]

// 解构赋值
const [first, second] = range(1, 100); // first=1, second=2
// ↑ 只迭代了 2 次就停止！这就是惰性的力量。`}
            />
          </div>

          {/* Two-way communication */}
          <div className="topic-card rounded-2xl p-6 md:p-8">
            <h4 className="font-['Outfit'] font-bold text-lg text-[var(--secondary)] mb-4 flex items-center gap-2">
              <ArrowDown className="w-5 h-5" strokeWidth={2.5} />
              双向通信：.next(value) 传值回生成器
            </h4>
            <p className="font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70 leading-relaxed mb-4">
              大多数人只知道{" "}
              <code className="font-['JetBrains_Mono',monospace] bg-[var(--foreground)]/5 px-1.5 py-0.5 rounded text-xs">
                yield
              </code>{" "}
              向外输出值， 但它同时也是<strong>表达式</strong>——可以接收{" "}
              <code className="font-['JetBrains_Mono',monospace] bg-[var(--foreground)]/5 px-1.5 py-0.5 rounded text-xs">
                .next(value)
              </code>{" "}
              传入的值。 这构成了生成器的<strong>双向数据通道</strong>。
            </p>
            <CodeBlock
              title="双向通信：暂停与恢复间传递数据"
              language="typescript"
              code={`function* conversation() {
  const name = yield "你叫什么名字?";  // ← yield 返回 .next() 传入的值
  const age  = yield \`你好 \${name}, 你几岁了?\`;
  return \`\${name} 今年 \${age} 岁。\`;
}

const gen = conversation();

// 第一次 .next() 启动生成器，传入的值会被忽略（没有 yield 在等待）
console.log(gen.next());        // { value: "你叫什么名字?", done: false }

// 第二次 .next("小明") — "小明" 会成为第一个 yield 的返回值 → name = "小明"
console.log(gen.next("小明"));   // { value: "你好 小明, 你几岁了?", done: false }

// 第三次 .next(25) — 25 成为第二个 yield 的返回值 → age = 25
console.log(gen.next(25));      // { value: "小明 今年 25 岁。", done: true }`}
            />
          </div>
        </div>

        {/* 3.3 yield* delegation */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[var(--tertiary)] text-[var(--foreground)] font-['Outfit'] font-bold text-sm flex items-center justify-center border-2 border-[var(--foreground)]">
              3
            </span>
            <h3 className="font-['Outfit'] font-bold text-xl text-[var(--foreground)]">
              yield* 委托 —— 生成器的组合利器
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="topic-card rounded-2xl p-6">
              <h4 className="font-['Outfit'] font-bold text-base text-[var(--foreground)] mb-3 flex items-center gap-2">
                <GitBranch
                  className="w-4 h-4 text-[var(--tertiary)]"
                  strokeWidth={2.5}
                />
                树结构深度遍历
              </h4>
              <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/60 leading-relaxed mb-4">
                <code className="font-['JetBrains_Mono',monospace] bg-[var(--foreground)]/5 px-1 rounded">
                  yield*
                </code>{" "}
                委托另一个可迭代对象，自动遍历其所有值。对于
                <strong>递归数据结构</strong>（如树），
                它能让深度优先遍历变得异常优雅。
              </p>
              <CodeBlock
                title="二叉树中序遍历 (yield*)"
                language="typescript"
                code={`type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

function* inorder<T>(node?: TreeNode<T>): Generator<T> {
  if (!node) return;
  yield* inorder(node.left);   // ← 委托左子树
  yield node.value;             // ← 访问当前节点
  yield* inorder(node.right);   // ← 委托右子树
}

const tree: TreeNode<number> = {
  value: 4,
  left:  { value: 2, left: { value: 1 }, right: { value: 3 } },
  right: { value: 6, left: { value: 5 }, right: { value: 7 } },
};

console.log([...inorder(tree)]);
// [1, 2, 3, 4, 5, 6, 7] ← 中序遍历结果`}
              />
            </div>

            <div className="topic-card rounded-2xl p-6">
              <h4 className="font-['Outfit'] font-bold text-base text-[var(--foreground)] mb-3 flex items-center gap-2">
                <Layers
                  className="w-4 h-4 text-[var(--tertiary)]"
                  strokeWidth={2.5}
                />
                生成器组合：链式数据流
              </h4>
              <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/60 leading-relaxed mb-4">
                yield* 让多个生成器可以像<strong>管道</strong>
                一样组合——每个生成器只负责一个独立的转换步骤， 实现了
                <strong>单一职责原则</strong>。
              </p>
              <CodeBlock
                title="链式数据流管道"
                language="typescript"
                code={`function* filter<T>(
  iter: Iterable<T>,
  predicate: (item: T) => boolean
): Generator<T> {
  for (const item of iter) {
    if (predicate(item)) yield item; // ← 只 yield 满足条件的
  }
}

function* map<T, U>(
  iter: Iterable<T>,
  transform: (item: T) => U
): Generator<U> {
  for (const item of iter) {
    yield transform(item);           // ← 转换后输出
  }
}

// 组合使用：先过滤，再映射
function* pipeline(source: Iterable<number>) {
  const evens = filter(source, n => n % 2 === 0);
  yield* map(evens, n => n ** 2);   // ← yield* 委托
}

const result = [...pipeline(range(1, 10))];
// range → [1,2,3,4,5,6,7,8,9,10]
// filter(even) → [2,4,6,8,10]
// map(n²) → [4,16,36,64,100]
console.log(result); // [4, 16, 36, 64, 100]`}
              />
            </div>
          </div>
        </div>

        {/* 3.4 Async Generator */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[var(--quaternary)] text-white font-['Outfit'] font-bold text-sm flex items-center justify-center border-2 border-[var(--foreground)]">
              4
            </span>
            <h3 className="font-['Outfit'] font-bold text-xl text-[var(--foreground)]">
              Async Generator —— 异步迭代与数据流
            </h3>
          </div>

          <div className="topic-card rounded-2xl p-6 md:p-8 mb-6">
            <p className="font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70 leading-relaxed mb-6">
              当数据源是异步的（网络请求、文件 I/O、WebSocket 消息）时，
              我们需要<strong>异步生成器 (Async Generator)</strong>。 它结合了
              Generator 的惰性与 Promise 的异步能力，通过{" "}
              <code className="font-['JetBrains_Mono',monospace] bg-[var(--foreground)]/5 px-1.5 py-0.5 rounded text-xs">
                for await...of
              </code>{" "}
              消费。
            </p>

            {/* Protocol comparison */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl bg-[var(--accent)]/5 border-2 border-[var(--accent)]/15 p-4">
                <div className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-2 font-['Plus_Jakarta_Sans']">
                  同步迭代协议
                </div>
                <div className="space-y-1 text-xs font-['JetBrains_Mono',monospace] text-[var(--foreground)]/60">
                  <div>
                    Iterable:{" "}
                    <span className="text-[var(--accent)]">
                      [Symbol.iterator]()
                    </span>
                  </div>
                  <div>
                    Iterator:{" "}
                    <span className="text-[var(--accent)]">
                      .next() → {"{value, done}"}
                    </span>
                  </div>
                  <div>
                    消费: <span className="text-[var(--accent)]">for...of</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-[var(--quaternary)]/5 border-2 border-[var(--quaternary)]/15 p-4">
                <div className="text-xs font-bold text-[var(--quaternary)] uppercase tracking-wider mb-2 font-['Plus_Jakarta_Sans']">
                  异步迭代协议
                </div>
                <div className="space-y-1 text-xs font-['JetBrains_Mono',monospace] text-[var(--foreground)]/60">
                  <div>
                    AsyncIterable:{" "}
                    <span className="text-[var(--quaternary)]">
                      [Symbol.asyncIterator]()
                    </span>
                  </div>
                  <div>
                    AsyncIterator:{" "}
                    <span className="text-[var(--quaternary)]">
                      .next() → Promise{"<{value, done}>"}
                    </span>
                  </div>
                  <div>
                    消费:{" "}
                    <span className="text-[var(--quaternary)]">
                      for await...of
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock
              title="分页 API 自动拉取（异步生成器的杀手级应用）"
              language="typescript"
              code={`async function* fetchAllUsers(apiBase: string) {
  let page = 1;
  const perPage = 20;

  while (true) {
    const res = await fetch(                   // ← 异步等待网络请求
      \`\${apiBase}/users?page=\${page}&per_page=\${perPage}\`
    );
    const data: User[] = await res.json();

    if (data.length === 0) return;             // ← 没有更多数据，结束生成器

    for (const user of data) {
      yield user;                              // ← 每个用户逐个 yield
    }

    page++;                                    // ← 自动翻页
    // 注意：如果一页数据不足 perPage，也可以提前结束
    if (data.length < perPage) return;
  }
}

// 使用 for await...of 消费 —— 代码极其简洁
async function main() {
  for await (const user of fetchAllUsers("https://api.example.com")) {
    console.log(user.name);
    // 处理到第 100 个就停止 → 自动停止请求后续页面
    // （这就是惰性的力量——未请求的页面永远不会被 fetch）
  }
}`}
            />
          </div>

          {/* Real-world: concurrent async */}
          <div className="topic-card rounded-2xl p-6 md:p-8 border-l-[4px] border-[var(--tertiary)]">
            <h4 className="font-['Outfit'] font-bold text-base text-[var(--foreground)] mb-3 flex items-center gap-2">
              <Timer
                className="w-4 h-4 text-[var(--tertiary)]"
                strokeWidth={2.5}
              />
              高级模式：并发控制的异步任务池
            </h4>
            <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/60 leading-relaxed mb-4">
              异步生成器可以实现一个<strong>并发度可控的任务执行器</strong>
              ——同时运行 N 个异步任务， 按完成顺序 yield 结果。这比{" "}
              <code className="font-['JetBrains_Mono',monospace] bg-[var(--foreground)]/5 px-1 rounded">
                Promise.all
              </code>
              更灵活，因为它允许消费者以不同速率处理结果。
            </p>
            <CodeBlock
              title="并发任务池 — 按完成顺序 yield"
              language="typescript"
              code={`async function* asyncPool<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>
): AsyncGenerator<R> {
  const executing = new Set<Promise<void>>();

  for (const item of items) {
    const p = fn(item).then(result => {
      poolResult = result;       // 捕获结果
    });
    executing.add(p);

    p.finally(() => executing.delete(p));

    if (executing.size >= concurrency) {
      await Promise.race(executing);  // ← 等待任一任务完成
    }
  }
}

// 实际使用：并发 3 个请求，按完成顺序消费
async function* parallelFetch(urls: string[]) {
  const promises = urls.map(async (url) => {
    const start = Date.now();
    const res = await fetch(url);
    return { url, data: await res.json(), ms: Date.now() - start };
  });

  // 简化版：用 Promise.allSettled + 生成器包装
  for (const p of promises) {
    yield await p;  // ← 每个 promise resolve 后 yield
  }
}`}
            />
          </div>
        </div>

        {/* 3.5 Lazy evaluation deep dive */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[var(--accent)] text-white font-['Outfit'] font-bold text-sm flex items-center justify-center border-2 border-[var(--foreground)]">
              5
            </span>
            <h3 className="font-['Outfit'] font-bold text-xl text-[var(--foreground)]">
              惰性求值 —— Pull-based 数据流的精髓
            </h3>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 topic-card rounded-2xl p-6">
              <h4 className="font-['Outfit'] font-bold text-base text-[var(--foreground)] mb-4 flex items-center gap-2">
                <Eye
                  className="w-4 h-4 text-[var(--accent)]"
                  strokeWidth={2.5}
                />
                Push vs Pull 模型对比
              </h4>
              <div className="space-y-4">
                <div className="rounded-xl bg-orange-50 border-2 border-orange-200 p-4">
                  <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2 font-['Plus_Jakarta_Sans']">
                    Push（推模式）· Observable / EventEmitter
                  </div>
                  <p className="text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/60 leading-relaxed">
                    <strong>生产者控制节奏</strong>。数据被主动推送给消费者，
                    消费者无法暂停。如果生产者太快，消费者可能被打爆。
                  </p>
                </div>
                <div className="rounded-xl bg-green-50 border-2 border-green-200 p-4">
                  <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2 font-['Plus_Jakarta_Sans']">
                    Pull（拉模式）· Iterator / Generator
                  </div>
                  <p className="text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/60 leading-relaxed">
                    <strong>消费者控制节奏</strong>。数据在消费者调用 .next()
                    时才被计算。 天然背压 (backpressure) 机制——不拉就不生成。
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 topic-card rounded-2xl p-6">
              <h4 className="font-['Outfit'] font-bold text-base text-[var(--foreground)] mb-3 flex items-center gap-2">
                <Gauge
                  className="w-4 h-4 text-[var(--tertiary)]"
                  strokeWidth={2.5}
                />
                惰性的性能实证：省了多少？
              </h4>
              <CodeBlock
                title="Eager vs Lazy：千万级数据处理对比"
                language="typescript"
                code={`// ❌ Eager（急切求值）：创建 3 个中间数组
const huge = Array.from({ length: 10_000_000 }, (_, i) => i);
// 内存: ~80MB（存储 1000 万个数字）

const evens = huge.filter(n => n % 2 === 0);
// 内存: 再 ~40MB，遍历 1000 万次

const squared = evens.map(n => n * n);
// 内存: 再 ~40MB，遍历 500 万次

const first5 = squared.slice(0, 5);
// 总计: ~160MB，1500 万次计算，仅用 5 个值 💀

// ──────────────────────────────────────────────

// ✅ Lazy（惰性求值）：零中间数组
function* range(n: number) {
  for (let i = 0; i < n; i++) yield i;
}
function* filter<T>(it: Iterable<T>, f: (v: T) => boolean) {
  for (const v of it) if (f(v)) yield v;
}
function* map<T, U>(it: Iterable<T>, f: (v: T) => U) {
  for (const v of it) yield f(v);
}
function* take<T>(it: Iterable<T>, n: number) {
  let i = 0;
  for (const v of it) { if (i++ >= n) return; yield v; }
}

const result = [...take(
  map(filter(range(10_000_000), n => n % 2 === 0), n => n * n),
  5
)];
// 内存: O(1)，仅 ~30 次计算（找到前 5 个偶数的平方）
// 性能提升: ~500,000x ⚡`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 交互式实验场 ─────────────────────────────────── */}
      <section className="container py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[var(--quaternary)] border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] flex items-center justify-center">
            <Play className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="font-['Outfit'] font-extrabold text-2xl text-[var(--foreground)]">
            🎮 交互式实验场
          </h2>
          <span className="px-2.5 py-0.5 bg-[var(--quaternary)] text-white text-[10px] font-bold rounded-full uppercase tracking-wider border border-[var(--foreground)]">
            Hands-on
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <GeneratorStepper />
          <LazyPipeline />
        </div>
      </section>

      {/* ─── L4: 代码实战 ─────────────────────────────────── */}
      <section className="container py-12">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)] border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] flex items-center justify-center">
            <Wrench className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="font-['Outfit'] font-extrabold text-2xl text-[var(--foreground)]">
            L4 · 生产级代码模式
          </h2>
        </div>

        {/* Bento grid layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Pattern 1: Infinite sequence */}
          <div className="topic-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-[var(--accent)] text-white text-[10px] font-bold rounded-full uppercase border border-[var(--foreground)] font-['Plus_Jakarta_Sans']">
                Pattern 1
              </span>
              <Infinity
                className="w-4 h-4 text-[var(--accent)]"
                strokeWidth={2.5}
              />
            </div>
            <h4 className="font-['Outfit'] font-bold text-base text-[var(--foreground)] mb-2">
              无限序列生成器
            </h4>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[var(--foreground)]/50 mb-4">
              Fibonacci、质数、ID 生成器——无限序列是 Generator
              最自然的用武之地。
            </p>
            <CodeBlock
              title="Fibonacci 无限序列"
              language="typescript"
              code={`function* fibonacci(): Generator<number> {
  let [a, b] = [0, 1];
  while (true) {        // ← 无限循环！但不会阻塞
    yield a;
    [a, b] = [b, a + b];
  }
}

// 取前 10 个 Fibonacci 数
const fib10 = [...take(fibonacci(), 10)];
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// 找第一个超过 1000 的 Fibonacci 数
function* takeWhile<T>(
  iter: Iterable<T>,
  pred: (v: T) => boolean
): Generator<T> {
  for (const v of iter) {
    if (!pred(v)) return;
    yield v;
  }
}

const under1000 = [...takeWhile(fibonacci(), n => n < 1000)];
const first1000 = fibonacci();
// 手动遍历找到第一个 ≥ 1000 的`}
            />
          </div>

          {/* Pattern 2: State machine */}
          <div className="topic-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-[var(--secondary)] text-white text-[10px] font-bold rounded-full uppercase border border-[var(--foreground)] font-['Plus_Jakarta_Sans']">
                Pattern 2
              </span>
              <CircleDot
                className="w-4 h-4 text-[var(--secondary)]"
                strokeWidth={2.5}
              />
            </div>
            <h4 className="font-['Outfit'] font-bold text-base text-[var(--foreground)] mb-2">
              状态机驱动的解析器
            </h4>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[var(--foreground)]/50 mb-4">
              Generator 的暂停/恢复特性天然适合实现状态机——每次 yield
              都是一次状态转换。
            </p>
            <CodeBlock
              title="Tokenizer：将字符串拆分为 Token"
              language="typescript"
              code={`function* tokenize(input: string): Generator<{ type: string; value: string }> {
  let i = 0;
  while (i < input.length) {
    // 跳过空白
    if (/\s/.test(input[i])) { i++; continue; }

    // 数字
    if (/\d/.test(input[i])) {
      let num = "";
      while (i < input.length && /\d/.test(input[i])) {
        num += input[i++];
      }
      yield { type: "NUMBER", value: num };  // ← 产出数字 Token
      continue;
    }

    // 运算符
    if ("+-*/".includes(input[i])) {
      yield { type: "OPERATOR", value: input[i] }; // ← 产出运算符 Token
      i++;
      continue;
    }

    throw new SyntaxError(\`Unexpected char: \${input[i]}\`);
  }
}

// 使用
const tokens = [...tokenize("3 + 4 * 2")];
// [{type:"NUMBER",value:"3"}, {type:"OPERATOR",value:"+"},
//  {type:"NUMBER",value:"4"}, {type:"OPERATOR",value:"*"},
//  {type:"NUMBER",value:"2"}]`}
            />
          </div>
        </div>

        {/* Pattern 3: Async stream */}
        <div className="topic-card rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 bg-[var(--quaternary)] text-white text-[10px] font-bold rounded-full uppercase border border-[var(--foreground)] font-['Plus_Jakarta_Sans']">
              Pattern 3 · 生产级
            </span>
            <Database
              className="w-4 h-4 text-[var(--quaternary)]"
              strokeWidth={2.5}
            />
          </div>
          <h4 className="font-['Outfit'] font-bold text-base text-[var(--foreground)] mb-2">
            ReadableStream ↔ Async Generator 桥接
          </h4>
          <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/60 leading-relaxed mb-4">
            现代浏览器的{" "}
            <code className="font-['JetBrains_Mono',monospace] bg-[var(--foreground)]/5 px-1 rounded">
              ReadableStream
            </code>
            是 Push 模型，但通过 Async Generator 可以转换为 Pull 模型， 实现
            <strong>逐行读取大文件</strong>、
            <strong>逐 chunk 处理响应体</strong>等场景。
          </p>
          <div className="grid lg:grid-cols-2 gap-4">
            <CodeBlock
              title="将 ReadableStream 转为 Async Generator"
              language="typescript"
              code={`async function* streamToAsyncGen<T>(
  stream: ReadableStream<T>
): AsyncGenerator<T> {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;  // ← 每个 chunk 惰性 yield
    }
  } finally {
    reader.releaseLock();  // ← 确保释放锁
  }
}

// 使用场景：逐行读取 1GB CSV
async function processHugeCSV(url: string) {
  const res = await fetch(url);
  const stream = res.body!;  // ReadableStream<Uint8Array>
  const decoder = new TextDecoder();
  let lineCount = 0;

  for await (const chunk of streamToAsyncGen(stream)) {
    const text = decoder.decode(chunk, { stream: true });
    const lines = text.split("\\n");
    for (const line of lines) {
      lineCount++;
      if (lineCount > 10000) return; // ← 随时停止
      await processLine(line);
    }
  }
}`}
            />
            <CodeBlock
              title="React Server Component 中的流式渲染"
              language="tsx"
              code={`// 异步生成器配合 RSC 实现流式页面
async function* generatePageData(query: string) {
  // 第一批：立即返回缓存数据
  yield { type: "cache", data: await getCached(query) };

  // 第二批：数据库查询结果
  const dbResults = await db.search(query);
  yield { type: "db", data: dbResults };

  // 第三批：AI 增强结果（最慢）
  const aiEnhanced = await ai.enhance(dbResults);
  yield { type: "ai", data: aiEnhanced };
}

// 在 Server Component 中使用
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const batches = [];
  for await (const batch of generatePageData(searchParams.q)) {
    batches.push(batch);
  }
  return <SearchResults batches={batches} />;
}`}
            />
          </div>
        </div>
      </section>

      {/* ─── L5: 工程全景 ─────────────────────────────────── */}
      <section className="container py-12">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[var(--tertiary)] border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] flex items-center justify-center">
            <Gauge
              className="w-5 h-5 text-[var(--foreground)]"
              strokeWidth={2.5}
            />
          </div>
          <h2 className="font-['Outfit'] font-extrabold text-2xl text-[var(--foreground)]">
            L5 · 工程全景
          </h2>
        </div>

        {/* Performance data */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="topic-card rounded-2xl p-6 text-center">
            <div className="text-4xl font-['Outfit'] font-extrabold text-[var(--quaternary)] mb-1">
              O(1)
            </div>
            <div className="text-sm font-['Plus_Jakarta_Sans'] font-bold text-[var(--foreground)] mb-1">
              Generator 内存复杂度
            </div>
            <div className="text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/40">
              无论序列多长，始终只保存当前状态
            </div>
          </div>
          <div className="topic-card rounded-2xl p-6 text-center">
            <div className="text-4xl font-['Outfit'] font-extrabold text-[var(--accent)] mb-1">
              ~500K×
            </div>
            <div className="text-sm font-['Plus_Jakarta_Sans'] font-bold text-[var(--foreground)] mb-1">
              take(5) 短路加速
            </div>
            <div className="text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/40">
              10M 元素 + filter + map + take(5) 场景
            </div>
          </div>
          <div className="topic-card rounded-2xl p-6 text-center">
            <div className="text-4xl font-['Outfit'] font-extrabold text-[var(--secondary)] mb-1">
              ~3×
            </div>
            <div className="text-sm font-['Plus_Jakarta_Sans'] font-bold text-[var(--foreground)] mb-1">
              单次 .next() 开销
            </div>
            <div className="text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/40">
              比直接函数调用慢 ~3 倍（V8 优化后）
            </div>
          </div>
        </div>

        {/* Anti-patterns */}
        <div className="mb-8">
          <h3 className="font-['Outfit'] font-bold text-xl text-[var(--foreground)] mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" strokeWidth={2.5} />
            常见陷阱与反模式
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Pitfall 1 */}
            <div className="rounded-2xl p-6 bg-red-50 border-2 border-red-200 shadow-[4px_4px_0px_0px_#FCA5A5]">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                <span className="font-['Outfit'] font-bold text-sm text-red-700">
                  陷阱 1：迭代器是一次性的
                </span>
              </div>
              <CodeBlock
                language="typescript"
                title="❌ 迭代器只能遍历一次"
                code={`const gen = range(1, 5);
const arr1 = [...gen]; // [1, 2, 3, 4, 5] ✅
const arr2 = [...gen]; // [] ❌ 空的！已经耗尽了

// ✅ 正确做法：每次需要时创建新的生成器
const arr3 = [...range(1, 5)]; // [1, 2, 3, 4, 5]
const arr4 = [...range(1, 5)]; // [1, 2, 3, 4, 5]`}
              />
            </div>

            {/* Pitfall 2 */}
            <div className="rounded-2xl p-6 bg-red-50 border-2 border-red-200 shadow-[4px_4px_0px_0px_#FCA5A5]">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                <span className="font-['Outfit'] font-bold text-sm text-red-700">
                  陷阱 2：生成器中的 this 指向
                </span>
              </div>
              <CodeBlock
                language="typescript"
                title="❌ 箭头函数不能做生成器"
                code={`// ❌ 箭头函数没有自己的 this，也不能用 function*
const obj = {
  items: [1, 2, 3],
  // 以下写法会报 SyntaxError
  // *getItems: () => { yield* this.items; }

  // ✅ 正确：使用方法简写
  *getItems() {
    for (const item of this.items) {
      yield item;
    }
  },
};

console.log([...obj.getItems()]); // [1, 2, 3]`}
              />
            </div>

            {/* Pitfall 3 */}
            <div className="rounded-2xl p-6 bg-orange-50 border-2 border-orange-200 shadow-[4px_4px_0px_0px_#FDBA74]">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle
                  className="w-5 h-5 text-orange-500"
                  strokeWidth={2.5}
                />
                <span className="font-['Outfit'] font-bold text-sm text-orange-700">
                  陷阱 3：异步生成器不能用 for...of
                </span>
              </div>
              <CodeBlock
                language="typescript"
                title="⚠️ 混淆同步/异步迭代"
                code={`async function* asyncRange(n: number) {
  for (let i = 0; i < n; i++) {
    await delay(100);
    yield i;
  }
}

// ❌ 编译错误！异步迭代器不实现 [Symbol.iterator]
// for (const n of asyncRange(5)) { }

// ✅ 必须使用 for await...of
for await (const n of asyncRange(5)) {
  console.log(n); // 0, 1, 2, 3, 4（每个间隔 100ms）
}`}
              />
            </div>

            {/* Pitfall 4 */}
            <div className="rounded-2xl p-6 bg-orange-50 border-2 border-orange-200 shadow-[4px_4px_0px_0px_#FDBA74]">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle
                  className="w-5 h-5 text-orange-500"
                  strokeWidth={2.5}
                />
                <span className="font-['Outfit'] font-bold text-sm text-orange-700">
                  陷阱 4：提前退出不触发 return
                </span>
              </div>
              <CodeBlock
                language="typescript"
                title="⚠️ 资源清理需要 finally"
                code={`function* withResource() {
  const conn = acquireConnection(); // 获取资源
  try {
    for (const data of conn.query("SELECT *")) {
      yield data;
    }
  } finally {
    conn.close(); // ← 即使 break/return 也会执行
    console.log("连接已关闭");
  }
}

// break 会触发生成器的 .return() 方法
// 进而执行 finally 块
for (const row of withResource()) {
  if (row.id === 10) break; // ← 触发 finally
}`}
              />
            </div>
          </div>
        </div>

        {/* Decision matrix */}
        <div className="topic-card rounded-2xl p-6 md:p-8">
          <h3 className="font-['Outfit'] font-bold text-xl text-[var(--foreground)] mb-6 flex items-center gap-2">
            <FastForward
              className="w-5 h-5 text-[var(--accent)]"
              strokeWidth={2.5}
            />
            选型决策矩阵
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm font-['Plus_Jakarta_Sans'] border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--foreground)]">
                  <th className="text-left py-3 px-4 font-bold text-[var(--foreground)]">
                    特性
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-[var(--accent)]">
                    Iterator / Generator
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-[var(--secondary)]">
                    Observable (RxJS)
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-[var(--quaternary)]">
                    AsyncIterator
                  </th>
                </tr>
              </thead>
              <tbody className="text-[var(--foreground)]/70">
                {[
                  [
                    "数据流方向",
                    "Pull（拉取）",
                    "Push（推送）",
                    "Pull（异步拉取）",
                  ],
                  ["背压机制", "✅ 天然支持", "❌ 需手动处理", "✅ 天然支持"],
                  ["内存效率", "⭐⭐⭐ O(1)", "⭐⭐ 取决于订阅", "⭐⭐⭐ O(1)"],
                  ["组合性", "⭐⭐ yield*", "⭐⭐⭐ 操作符链", "⭐⭐ yield*"],
                  [
                    "取消机制",
                    "✅ .return()",
                    "✅ unsubscribe",
                    "✅ .return()",
                  ],
                  [
                    "适用场景",
                    "同步大数据流、解析器",
                    "UI 事件流、实时数据",
                    "API 分页、文件 I/O",
                  ],
                  ["学习曲线", "低", "高（操作符多）", "低"],
                  ["内置生态", "语言原生", "需引入 RxJS", "语言原生"],
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/[0.02] transition-colors"
                  >
                    <td className="py-3 px-4 font-bold">{row[0]}</td>
                    <td className="py-3 px-4">{row[1]}</td>
                    <td className="py-3 px-4">{row[2]}</td>
                    <td className="py-3 px-4">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── CHEAT SHEET ──────────────────────────────────── */}
      <section className="container py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[var(--foreground)] border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--accent)] flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="font-['Outfit'] font-extrabold text-2xl text-[var(--foreground)]">
            ⚡ 速查手册 Cheat Sheet
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "创建迭代器",
              color: "var(--accent)",
              code: `const iter = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        return i < 3
          ? { value: i++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
};`,
              tip: "实现 [Symbol.iterator] 方法即可",
            },
            {
              title: "Generator 基础",
              color: "var(--secondary)",
              code: `function* gen() {
  yield 1;
  yield 2;
  return 3; // done: true
}
const g = gen();
g.next(); // { value: 1, done: false }
g.next(); // { value: 2, done: false }
g.next(); // { value: 3, done: true }`,
              tip: "function* + yield 创建生成器",
            },
            {
              title: "yield* 委托",
              color: "var(--tertiary)",
              code: `function* concat(...iters) {
  for (const iter of iters) {
    yield* iter; // 展开每个可迭代对象
  }
}

[...concat([1,2], [3,4], [5])];
// [1, 2, 3, 4, 5]`,
              tip: "yield* 委托给另一个可迭代对象",
            },
            {
              title: "Async Generator",
              color: "var(--quaternary)",
              code: `async function* fetchPages(url) {
  let page = 1;
  while (true) {
    const data = await fetch(url + page);
    const items = await data.json();
    if (!items.length) return;
    yield* items;
    page++;
  }
}

for await (const item of fetchPages(api)) {
  process(item); // 按需处理
}`,
              tip: "async function* + for await...of",
            },
            {
              title: "双向通信",
              color: "var(--accent)",
              code: `function* bidir() {
  const a = yield "first";  // 接收外部值
  const b = yield a;        // 再次接收
  return [a, b];
}

const g = bidir();
g.next();        // { value: "first" }
g.next("hello"); // { value: "hello" }
g.next("world"); // { value: ["hello","world"], done: true }`,
              tip: ".next(value) 可向生成器传值",
            },
            {
              title: "实用工具函数",
              color: "var(--secondary)",
              code: `// take - 取前 n 个
function* take(it, n) {
  let i = 0;
  for (const v of it) {
    if (i++ >= n) return;
    yield v;
  }
}

// enumerate - 带索引迭代
function* enumerate(it) {
  let i = 0;
  for (const v of it) yield [i++, v];
}

[...enumerate("abc")];
// [[0,"a"],[1,"b"],[2,"c"]]`,
              tip: "组合工具构建数据处理管道",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="topic-card rounded-2xl overflow-hidden animate-slide"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div
                className="px-5 py-3 border-b-2 border-[var(--foreground)] flex items-center gap-2"
                style={{ backgroundColor: card.color }}
              >
                <span className="text-white font-['Outfit'] font-bold text-sm">
                  {card.title}
                </span>
              </div>
              <div className="p-4 bg-[#1e293b] rounded-b-2xl">
                <pre className="text-[11px] font-['JetBrains_Mono',monospace] text-[#E2E8F0] leading-relaxed overflow-x-auto whitespace-pre">
                  <code
                    dangerouslySetInnerHTML={{
                      __html: highlightCode(card.code, "typescript"),
                    }}
                  />
                </pre>
                <div className="mt-3 pt-3 border-t border-[var(--border)]">
                  <p className="text-[10px] font-['Plus_Jakarta_Sans'] text-[var(--background)] font-bold uppercase tracking-wider">
                    💡 {card.tip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Footer note ──────────────────────────────────── */}
      <section className="container py-12">
        <div className="topic-card rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="font-['Outfit'] font-bold text-xl text-[var(--foreground)] mb-3">
            核心记忆锚点
          </h3>
          <p className="font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/60 leading-relaxed text-sm">
            迭代器协议是 JavaScript 的<strong>统一遍历契约</strong>。 Generator
            是实现这个契约的<strong>最简语法糖</strong>。 惰性求值让你可以用{" "}
            <strong>O(1) 内存</strong>处理<strong>无限序列</strong>。 Async
            Generator 把这个能力延伸到了<strong>异步数据流</strong>领域。
            掌握它们，你就掌握了 JavaScript 数据处理的<strong>终极形态</strong>
            。
          </p>
        </div>
      </section>
    </main>
  );
}
