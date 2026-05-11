// app/topics/nodejs-async-io/page.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { highlightCode } from "@/lib/prism-highlight";
import {
  Zap,
  Layers,
  HardDrive,
  Waves,
  Cpu,
  MemoryStick,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  FileText,
  Database,
  Server,
  Monitor,
  Timer,
  AlertTriangle,
  CheckCircle,
  Code2,
  GitBranch,
  Workflow,
  Gauge,
  Activity,
  Box,
  CircleDot,
  ArrowDown,
  Binary,
  Braces,
} from "lucide-react";

/* ─── 辅助组件 ─── */

function CodeBlock({
  code,
  filename,
  accent = "var(--accent)",
  language = "javascript",
}: {
  code: string;
  filename?: string;
  accent?: string;
  language?: string;
}) {
  const html = highlightCode(code, language);
  return (
    <div
      className="relative overflow-hidden"
      style={{
        border: "2px solid var(--foreground)",
        borderRadius: "var(--radius-md)",
        boxShadow: "6px 6px 0px 0px var(--foreground)",
        background: "#1a1b2e",
      }}
    >
      {filename && (
        <div
          className="flex items-center gap-2 px-4 py-2"
          style={{
            borderBottom: `2px solid var(--foreground)`,
            background: accent,
          }}
        >
          <Braces size={14} strokeWidth={2.5} color="white" />
          <span
            className="font-mono text-xs font-bold"
            style={{ color: "white" }}
          >
            {filename}
          </span>
        </div>
      )}
      <pre className={`overflow-x-auto p-4 text-sm leading-relaxed language-${language}`}>
        <code className={`font-mono language-${language}`} dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}

function Badge({
  children,
  color = "var(--accent)",
  size = "md",
}: {
  children: React.ReactNode;
  color?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className="inline-flex items-center gap-1 font-bold uppercase tracking-wider"
      style={{
        background: color,
        color: "white",
        borderRadius: "var(--radius-full)",
        border: "2px solid var(--foreground)",
        boxShadow: "3px 3px 0px 0px var(--foreground)",
        padding: size === "sm" ? "2px 10px" : "4px 14px",
        fontSize: size === "sm" ? "0.65rem" : "0.75rem",
        fontFamily: '"Outfit", sans-serif',
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </span>
  );
}

function GeometricIcon({
  icon: Icon,
  color,
  size = 44,
}: {
  icon: React.ElementType;
  color: string;
  size?: number;
}) {
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: "var(--radius-md)",
        border: "2px solid var(--foreground)",
        boxShadow: "4px 4px 0px 0px var(--foreground)",
      }}
    >
      <Icon size={size * 0.5} strokeWidth={2.5} color="white" />
    </div>
  );
}

function SectionTitle({
  badge,
  title,
  subtitle,
  badgeColor,
}: {
  badge: string;
  title: string;
  subtitle: string;
  badgeColor?: string;
}) {
  return (
    <div className="mb-10 animate-pop">
      <Badge color={badgeColor || "var(--accent)"}>{badge}</Badge>
      <h2
        className="mt-4"
        style={{
          fontFamily: '"Outfit", sans-serif',
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 800,
          color: "var(--foreground)",
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>
      <p
        className="mt-3 max-w-2xl"
        style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: "1.1rem",
          color: "#64748b",
          lineHeight: 1.7,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

/* ─── 事件循环可视化组件 ─── */

function EventLoopVisualizer() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const phases = [
    { name: "timers", label: "Timers", desc: "setTimeout / setInterval", color: "var(--accent)" },
    { name: "pending", label: "Pending Callbacks", desc: "延迟的 I/O 回调", color: "var(--secondary)" },
    { name: "idle", label: "Idle / Prepare", desc: "内部使用", color: "var(--border)" },
    { name: "poll", label: "Poll", desc: "轮询新的 I/O 事件", color: "var(--tertiary)" },
    { name: "check", label: "Check", desc: "setImmediate", color: "var(--quaternary)" },
    { name: "close", label: "Close Callbacks", desc: "socket.on('close')", color: "#94a3b8" },
  ];

  const startLoop = useCallback(() => {
    setIsRunning(true);
    setLogs([]);
    setCurrentPhase(0);
    let idx = 0;
    const tick = () => {
      setCurrentPhase(idx % phases.length);
      setLogs((prev) => [
        `→ [${phases[idx % phases.length].label}] ${phases[idx % phases.length].desc}`,
        ...prev.slice(0, 15),
      ]);
      idx++;
      timerRef.current = setTimeout(tick, 1200);
    };
    tick();
  }, []);

  const stopLoop = useCallback(() => {
    setIsRunning(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const resetLoop = useCallback(() => {
    stopLoop();
    setCurrentPhase(-1);
    setLogs([]);
  }, [stopLoop]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div
      className="animate-pop"
      style={{
        border: "3px solid var(--foreground)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "10px 10px 0px 0px var(--accent)",
        background: "var(--card)",
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{
          borderBottom: "2px solid var(--foreground)",
          background: "var(--accent)",
        }}
      >
        <div className="flex items-center gap-3">
          <Activity size={20} strokeWidth={2.5} color="white" />
          <span
            className="font-bold text-white"
            style={{ fontFamily: '"Outfit", sans-serif', fontSize: "1.1rem" }}
          >
            Event Loop 实时模拟器
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={isRunning ? stopLoop : startLoop}
            className="flex items-center gap-1 px-3 py-1.5 transition-transform hover:scale-105"
            style={{
              background: "white",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 700,
              fontSize: "0.8rem",
            }}
          >
            {isRunning ? <Pause size={14} strokeWidth={2.5} /> : <Play size={14} strokeWidth={2.5} />}
            {isRunning ? "暂停" : "运行"}
          </button>
          <button
            onClick={resetLoop}
            className="flex items-center gap-1 px-3 py-1.5 transition-transform hover:scale-105"
            style={{
              background: "white",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 700,
              fontSize: "0.8rem",
            }}
          >
            <RotateCcw size={14} strokeWidth={2.5} />
            重置
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* 环形相位指示 */}
        <div className="relative mx-auto mb-8" style={{ width: 320, height: 320 }}>
          {/* 中心文字 */}
          <div
            className="absolute flex flex-col items-center justify-center"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 100,
              height: 100,
              borderRadius: "var(--radius-full)",
              background: currentPhase >= 0 ? phases[currentPhase].color : "var(--border)",
              border: "3px solid var(--foreground)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
              transition: "background 0.3s",
            }}
          >
            <Zap size={20} strokeWidth={2.5} color="white" />
            <span className="text-xs font-bold text-white mt-0.5" style={{ fontFamily: '"Outfit", sans-serif' }}>
              {currentPhase >= 0 ? "RUNNING" : "IDLE"}
            </span>
          </div>

          {/* 六个阶段环绕 */}
          {phases.map((phase, i) => {
            const angle = (i * 60 - 90) * (Math.PI / 180);
            const radius = 130;
            const x = 160 + radius * Math.cos(angle) - 30;
            const y = 160 + radius * Math.sin(angle) - 30;
            const isActive = currentPhase === i;

            return (
              <div
                key={phase.name}
                className="absolute flex items-center justify-center transition-all duration-300"
                style={{
                  left: x,
                  top: y,
                  width: 60,
                  height: 60,
                  borderRadius: "var(--radius-md)",
                  background: isActive ? phase.color : "white",
                  border: `2px solid ${isActive ? "var(--foreground)" : "var(--border)"}`,
                  boxShadow: isActive ? `4px 4px 0px 0px var(--foreground)` : "none",
                  transform: isActive ? "scale(1.15)" : "scale(1)",
                  zIndex: isActive ? 10 : 1,
                }}
              >
                <span
                  className="text-center font-bold leading-tight"
                  style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: "0.55rem",
                    color: isActive ? "white" : "var(--foreground)",
                  }}
                >
                  {phase.label}
                </span>
              </div>
            );
          })}

          {/* 旋转指示弧 */}
          {isRunning && (
            <svg
              className="absolute inset-0"
              viewBox="0 0 320 320"
              style={{
                animation: "spin 8s linear infinite",
              }}
            >
              <circle
                cx="160"
                cy="160"
                r="100"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeDasharray="30 30"
                strokeLinecap="round"
                opacity="0.3"
              />
            </svg>
          )}
        </div>

        {/* 日志 */}
        <div
          className="overflow-hidden"
          style={{
            background: "#1a1b2e",
            border: "2px solid var(--foreground)",
            borderRadius: "var(--radius-md)",
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          <div className="p-3">
            {logs.length === 0 ? (
              <p className="text-sm font-mono text-gray-500 text-center py-4">
                点击 &quot;运行&quot; 开始事件循环模拟...
              </p>
            ) : (
              logs.map((log, i) => (
                <div
                  key={i}
                  className="text-xs font-mono py-1 transition-opacity"
                  style={{
                    color: i === 0 ? "var(--tertiary)" : "#94a3b8",
                    opacity: 1 - i * 0.06,
                  }}
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* ─── Stream 流处理模拟器 ─── */

function StreamSimulator() {
  const [mode, setMode] = useState<"buffer" | "stream">("buffer");
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [chunks, setChunks] = useState<number[]>([]);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startSimulation = useCallback(() => {
    setIsRunning(true);
    setProgress(0);
    setChunks([]);
    setMemoryUsage(0);

    const totalChunks = 20;
    let idx = 0;

    const tick = () => {
      if (idx >= totalChunks) {
        setIsRunning(false);
        return;
      }

      idx++;
      const prog = (idx / totalChunks) * 100;
      setProgress(prog);

      if (mode === "buffer") {
        // Buffer 模式: 内存持续攀升
        setMemoryUsage(Math.min(prog * 1.5, 150));
        setChunks((prev) => [...prev, idx]);
      } else {
        // Stream 模式: 内存保持低水位
        setMemoryUsage(15 + Math.random() * 10);
        setChunks((prev) => (prev.length > 4 ? [...prev.slice(1), idx] : [...prev, idx]));
      }

      timerRef.current = setTimeout(tick, mode === "buffer" ? 300 : 500);
    };

    tick();
  }, [mode]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setProgress(0);
    setChunks([]);
    setMemoryUsage(0);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div
      className="animate-pop"
      style={{
        border: "3px solid var(--foreground)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "10px 10px 0px 0px var(--tertiary)",
        background: "var(--card)",
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{
          borderBottom: "2px solid var(--foreground)",
          background: "var(--tertiary)",
        }}
      >
        <div className="flex items-center gap-3">
          <Waves size={20} strokeWidth={2.5} color="var(--foreground)" />
          <span
            className="font-bold"
            style={{ fontFamily: '"Outfit", sans-serif', fontSize: "1.1rem", color: "var(--foreground)" }}
          >
            Stream vs Buffer 内存对比
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="flex items-center gap-1 px-3 py-1.5 transition-transform hover:scale-105"
            style={{
              background: "white",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 700,
              fontSize: "0.8rem",
            }}
          >
            <RotateCcw size={14} strokeWidth={2.5} />
            重置
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* 模式选择 */}
        <div className="flex gap-3 mb-6">
          {(["buffer", "stream"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { reset(); setMode(m); }}
              className="flex-1 py-3 px-4 font-bold transition-transform hover:scale-[1.02]"
              style={{
                fontFamily: '"Outfit", sans-serif',
                border: `2px solid var(--foreground)`,
                borderRadius: "var(--radius-md)",
                background: mode === m ? (m === "buffer" ? "var(--secondary)" : "var(--quaternary)") : "white",
                color: mode === m ? "white" : "var(--foreground)",
                boxShadow: mode === m ? "4px 4px 0px 0px var(--foreground)" : "none",
              }}
            >
              {m === "buffer" ? "📦 Buffer 全量读取" : "🌊 Stream 流式读取"}
            </button>
          ))}
        </div>

        {/* 进度条 */}
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-bold" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}>
              读取进度
            </span>
            <span className="text-xs font-mono font-bold" style={{ color: "var(--foreground)" }}>
              {progress.toFixed(0)}%
            </span>
          </div>
          <div
            className="overflow-hidden"
            style={{
              height: 24,
              borderRadius: "var(--radius-full)",
              border: "2px solid var(--foreground)",
              background: "var(--background)",
            }}
          >
            <div
              className="h-full transition-all duration-300 flex items-center justify-end pr-2"
              style={{
                width: `${progress}%`,
                background: mode === "buffer" ? "var(--secondary)" : "var(--quaternary)",
              }}
            >
              {progress > 10 && (
                <span className="text-[10px] font-bold text-white">{progress.toFixed(0)}%</span>
              )}
            </div>
          </div>
        </div>

        {/* 内存使用 */}
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-bold" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}>
              <MemoryStick size={12} className="inline mr-1" strokeWidth={2.5} />
              内存使用 (MB)
            </span>
            <span
              className="text-xs font-mono font-bold"
              style={{ color: memoryUsage > 100 ? "var(--secondary)" : "var(--quaternary)" }}
            >
              {memoryUsage.toFixed(1)} MB
            </span>
          </div>
          <div
            className="overflow-hidden"
            style={{
              height: 24,
              borderRadius: "var(--radius-full)",
              border: "2px solid var(--foreground)",
              background: "var(--background)",
            }}
          >
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${Math.min((memoryUsage / 150) * 100, 100)}%`,
                background: memoryUsage > 100 ? "var(--secondary)" : memoryUsage > 50 ? "var(--tertiary)" : "var(--quaternary)",
              }}
            />
          </div>
        </div>

        {/* 数据块可视化 */}
        <div
          className="p-4 rounded-xl"
          style={{
            border: "2px solid var(--border)",
            background: "var(--background)",
            minHeight: 80,
          }}
        >
          <div className="text-xs font-bold mb-2" style={{ fontFamily: '"Outfit", sans-serif', color: "#64748b" }}>
            {mode === "buffer" ? "全部数据块加载到内存" : "数据块处理后释放（背压机制）"}
          </div>
          <div className="flex flex-wrap gap-2">
            {chunks.map((c, i) => (
              <div
                key={`${c}-${i}`}
                className="animate-pop flex items-center justify-center font-mono text-xs font-bold"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "var(--radius-sm)",
                  border: "2px solid var(--foreground)",
                  background:
                    mode === "buffer"
                      ? `hsl(${270 + c * 3}, 70%, 75%)`
                      : `hsl(${155 + c * 3}, 60%, 65%)`,
                  color: "white",
                }}
              >
                {c}
              </div>
            ))}
            {isRunning && (
              <div
                className="flex items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "var(--radius-sm)",
                  border: "2px dashed var(--foreground)",
                  animation: "pulse 1s infinite",
                }}
              >
                <span className="text-xs">⏳</span>
              </div>
            )}
          </div>
        </div>

        {/* 结论 */}
        {progress >= 100 && (
          <div
            className="mt-4 p-4 animate-pop"
            style={{
              borderRadius: "var(--radius-md)",
              border: "2px solid var(--foreground)",
              background: mode === "buffer" ? "#fef2f2" : "#ecfdf5",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <p className="text-sm font-bold" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}>
              {mode === "buffer"
                ? "⚠️ Buffer 模式：整个文件加载到内存，大文件会导致 OOM（内存溢出）！"
                : "✅ Stream 模式：内存保持低水位，可处理 GB 级文件！"}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

/* ─── Libuv 线程池可视化 ─── */

function ThreadPoolVisualizer() {
  const [tasks, setTasks] = useState<{ id: number; thread: number; type: string; progress: number; color: string }[]>([]);
  const [queue, setQueue] = useState<{ id: number; type: string; color: string }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const taskIdRef = useRef(0);
  const threadCount = 4;

  const taskTypes = [
    { type: "fs.readFile", color: "var(--accent)" },
    { type: "crypto.pbkdf2", color: "var(--secondary)" },
    { type: "dns.lookup", color: "var(--tertiary)" },
    { type: "zlib.gzip", color: "var(--quaternary)" },
  ];

  const startSimulation = useCallback(() => {
    setIsRunning(true);
    setTasks([]);
    setQueue([]);

    // 生成任务队列
    const initialQueue = Array.from({ length: 8 }, () => {
      const t = taskTypes[Math.floor(Math.random() * taskTypes.length)];
      taskIdRef.current++;
      return { id: taskIdRef.current, type: t.type, color: t.color };
    });
    setQueue(initialQueue);

    let queueIdx = 0;
    let activeTasks: { id: number; thread: number; type: string; progress: number; color: string }[] = [];

    const tick = () => {
      // 分配任务到空闲线程
      const busyThreads = new Set(activeTasks.map((t) => t.thread));
      const freeThreads = Array.from({ length: threadCount }, (_, i) => i).filter(
        (i) => !busyThreads.has(i)
      );

      for (const threadIdx of freeThreads) {
        if (queueIdx < initialQueue.length) {
          const task = initialQueue[queueIdx];
          activeTasks.push({
            id: task.id,
            thread: threadIdx,
            type: task.type,
            progress: 0,
            color: task.color,
          });
          queueIdx++;
        }
      }

      // 推进进度
      activeTasks = activeTasks
        .map((t) => ({ ...t, progress: t.progress + 15 + Math.random() * 15 }))
        .filter((t) => {
          if (t.progress >= 100) return false;
          return true;
        });

      setTasks([...activeTasks]);
      setQueue(initialQueue.slice(queueIdx));

      if (queueIdx >= initialQueue.length && activeTasks.length === 0) {
        setIsRunning(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        return;
      }

      timerRef.current = setTimeout(tick, 600);
    };

    tick();
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTasks([]);
    setQueue([]);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div
      className="animate-pop"
      style={{
        border: "3px solid var(--foreground)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "10px 10px 0px 0px var(--secondary)",
        background: "var(--card)",
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "2px solid var(--foreground)", background: "var(--secondary)" }}
      >
        <div className="flex items-center gap-3">
          <Cpu size={20} strokeWidth={2.5} color="white" />
          <span className="font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif', fontSize: "1.1rem" }}>
            Libuv 线程池模拟（默认4线程）
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={isRunning ? reset : startSimulation}
            className="flex items-center gap-1 px-3 py-1.5 transition-transform hover:scale-105"
            style={{
              background: "white",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 700,
              fontSize: "0.8rem",
            }}
          >
            {isRunning ? <RotateCcw size={14} strokeWidth={2.5} /> : <Play size={14} strokeWidth={2.5} />}
            {isRunning ? "重置" : "模拟"}
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* 等待队列 */}
        <div className="mb-6">
          <div className="text-xs font-bold mb-2" style={{ fontFamily: '"Outfit", sans-serif', color: "#64748b" }}>
            任务等待队列 ({queue.length})
          </div>
          <div className="flex gap-2 flex-wrap min-h-[40px] p-3 rounded-lg" style={{ border: "2px dashed var(--border)", background: "var(--background)" }}>
            {queue.length === 0 && !isRunning && (
              <span className="text-xs text-gray-400">等待任务...</span>
            )}
            {queue.map((t) => (
              <div
                key={t.id}
                className="px-2 py-1 rounded text-[10px] font-bold text-white"
                style={{ background: t.color, borderRadius: "var(--radius-sm)", border: "1px solid var(--foreground)" }}
              >
                {t.type}
              </div>
            ))}
          </div>
        </div>

        {/* 线程状态 */}
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: threadCount }, (_, threadIdx) => {
            const activeTask = tasks.find((t) => t.thread === threadIdx);
            return (
              <div
                key={threadIdx}
                className="p-4 transition-all"
                style={{
                  borderRadius: "var(--radius-md)",
                  border: `2px solid ${activeTask ? "var(--foreground)" : "var(--border)"}`,
                  background: activeTask ? `${activeTask.color}15` : "var(--background)",
                  boxShadow: activeTask ? `4px 4px 0px 0px ${activeTask.color}` : "none",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: activeTask ? activeTask.color : "var(--border)",
                      border: "1px solid var(--foreground)",
                    }}
                  />
                  <span className="text-xs font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                    Thread-{threadIdx}
                  </span>
                  {activeTask && (
                    <span className="text-[10px] font-mono ml-auto" style={{ color: activeTask.color }}>
                      {activeTask.progress.toFixed(0)}%
                    </span>
                  )}
                </div>
                {activeTask ? (
                  <>
                    <div className="text-[10px] font-mono mb-2" style={{ color: "#64748b" }}>
                      {activeTask.type}
                    </div>
                    <div
                      className="overflow-hidden"
                      style={{
                        height: 8,
                        borderRadius: "var(--radius-full)",
                        background: "var(--background)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${activeTask.progress}%`,
                          background: activeTask.color,
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-[10px] text-gray-400 font-mono">空闲 - 等待任务...</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── 主页面 ─── */

export default function NodejsAsyncIOPage() {
  const [activeArchLayer, setActiveArchLayer] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-dot-grid min-h-screen" style={{ background: "var(--background)" }}>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden container">
        {/* 装饰性 Blobs */}
        <div
          className="absolute -top-20 -right-20 opacity-15 pointer-events-none"
          style={{
            width: 500,
            height: 500,
            background: "var(--accent)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-0 -left-20 opacity-10 pointer-events-none"
          style={{
            width: 400,
            height: 400,
            background: "var(--tertiary)",
            borderRadius: "40% 60% 70% 30% / 30% 70% 40% 60%",
            filter: "blur(50px)",
          }}
        />

        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="animate-pop flex flex-wrap gap-3 mb-6">
              <Badge color="var(--accent)">NODE.JS INTERNALS</Badge>
              <Badge color="var(--secondary)">ASYNC I/O</Badge>
              <Badge color="var(--tertiary)">LIBUV</Badge>
              <Badge color="var(--quaternary)">STREAMS</Badge>
            </div>

            <h1
              className="animate-pop"
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: "clamp(2.2rem, 6vw, 4.2rem)",
                fontWeight: 800,
                color: "var(--foreground)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Node.js 底层与
              <br />
              <span style={{ color: "var(--accent)" }}>异步 I/O 深度剖析</span>
            </h1>

            <p
              className="mt-6 max-w-2xl animate-slide"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: "1.2rem",
                color: "#64748b",
                lineHeight: 1.7,
                animationDelay: "0.15s",
              }}
            >
              剖析 Libuv 线程池机制、Stream 流式处理与 Buffer 内存管理，掌握在大文件传输与高并发场景下的性能优化艺术。
            </p>

            {/* 核心数据 */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "默认线程", value: "4", icon: Cpu, color: "var(--accent)" },
                { label: "最大并发", value: "∞", icon: Activity, color: "var(--secondary)" },
                { label: "Stream 缓冲", value: "64KB", icon: Waves, color: "var(--tertiary)" },
                { label: "单进程 RAM", value: "~1.7GB", icon: MemoryStick, color: "var(--quaternary)" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="animate-slide p-4"
                  style={{
                    animationDelay: `${0.2 + i * 0.1}s`,
                    background: "var(--card)",
                    border: "2px solid var(--foreground)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "6px 6px 0px 0px var(--foreground)",
                  }}
                >
                  <stat.icon size={20} strokeWidth={2.5} style={{ color: stat.color }} />
                  <div
                    className="mt-2 font-extrabold"
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: "1.8rem",
                      color: stat.color,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      color: "#94a3b8",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ARCHITECTURE OVERVIEW ═══ */}
      <section className="container py-12">
        <div className="container">
          <SectionTitle
            badge="ARCHITECTURE"
            title="Node.js 运行时架构"
            subtitle="理解 V8 引擎、Libuv 与系统内核如何协同工作，构建非阻塞 I/O 的基石。"
            badgeColor="var(--accent)"
          />

          {/* 架构层次图 */}
          <div
            className="animate-pop"
            style={{
              border: "3px solid var(--foreground)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "10px 10px 0px 0px var(--accent)",
              background: "var(--card)",
              overflow: "hidden",
            }}
          >
            <div
              className="px-6 py-4"
              style={{
                borderBottom: "2px solid var(--foreground)",
                background: "var(--accent)",
              }}
            >
              <span className="font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif', fontSize: "1.1rem" }}>
                🏗️ Node.js 分层架构
              </span>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {[
                  {
                    id: "app",
                    label: "应用层 (Your Code)",
                    desc: "JavaScript/TypeScript 代码 — 业务逻辑、API 路由、中间件等。开发者在此层编写代码。",
                    color: "var(--accent)",
                    detail: "运行在 V8 引擎之上，通过 Node.js 提供的全局 API（如 fs, http, crypto）与底层交互。V8 编译 JS 为机器码执行。",
                  },
                  {
                    id: "node-api",
                    label: "Node.js Bindings (C++ 层)",
                    desc: "将 JS 调用桥接到 C++ 实现。分为直接系统调用和 Libuv 委托两类。",
                    color: "var(--secondary)",
                    detail: "例如 http.createServer() 中的 TCP 操作由 Libuv 处理，而 Buffer 的内存分配直接走 V8 的 ArrayBuffer。fs.readFile 等重型操作被委派给 Libuv 线程池。",
                  },
                  {
                    id: "libuv",
                    label: "Libuv (跨平台异步 I/O 库)",
                    desc: "事件循环 + 线程池。处理所有异步 I/O 操作，是 Node.js 非阻塞的核心。",
                    color: "var(--tertiary)",
                    detail: "在 Linux 上使用 epoll，macOS 使用 kqueue，Windows 使用 IOCP。文件 I/O、DNS 解析、密码学运算等阻塞操作被放到 4 线程（可配置）的线程池中异步执行。",
                  },
                  {
                    id: "kernel",
                    label: "操作系统内核",
                    desc: "底层的网络 I/O 由内核直接异步处理（如 TCP/UDP），文件 I/O 通过线程池模拟异步。",
                    color: "var(--quaternary)",
                    detail: "现代操作系统内核支持非阻塞 socket（epoll/kqueue/IOCP），网络 I/O 无需额外线程。但文件 I/O 在大多数系统上仍是同步的，所以 Libuv 用线程池来模拟异步文件操作。",
                  },
                ].map((layer, i) => (
                  <div key={layer.id}>
                    <button
                      onClick={() => setActiveArchLayer(activeArchLayer === layer.id ? null : layer.id)}
                      className="w-full text-left p-5 transition-all hover:scale-[1.005]"
                      style={{
                        borderRadius: "var(--radius-md)",
                        border: `2px solid ${activeArchLayer === layer.id ? layer.color : "var(--border)"}`,
                        background: activeArchLayer === layer.id ? `${layer.color}10` : "white",
                        boxShadow: activeArchLayer === layer.id ? `6px 6px 0px 0px ${layer.color}` : "none",
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="flex items-center justify-center shrink-0 font-extrabold text-white"
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "var(--radius-sm)",
                            background: layer.color,
                            border: "2px solid var(--foreground)",
                            fontFamily: '"Outfit", sans-serif',
                            fontSize: "0.9rem",
                          }}
                        >
                          L{i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className="font-bold"
                            style={{
                              fontFamily: '"Outfit", sans-serif',
                              fontSize: "1.05rem",
                              color: "var(--foreground)",
                            }}
                          >
                            {layer.label}
                          </div>
                          <div
                            className="text-sm mt-0.5"
                            style={{
                              fontFamily: '"Plus Jakarta Sans", sans-serif',
                              color: "#64748b",
                            }}
                          >
                            {layer.desc}
                          </div>
                        </div>
                        <ChevronDown
                          size={20}
                          strokeWidth={2.5}
                          className="shrink-0 transition-transform"
                          style={{
                            color: "var(--foreground)",
                            transform: activeArchLayer === layer.id ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        />
                      </div>
                      {activeArchLayer === layer.id && (
                        <div
                          className="mt-4 pt-4"
                          style={{ borderTop: "1px dashed var(--border)" }}
                        >
                          <p
                            className="text-sm leading-relaxed"
                            style={{
                              fontFamily: '"Plus Jakarta Sans", sans-serif',
                              color: "#475569",
                            }}
                          >
                            {layer.detail}
                          </p>
                        </div>
                      )}
                    </button>
                    {i < 3 && (
                      <div className="flex justify-center pt-3">
                        <ArrowDown size={18} strokeWidth={2.5} style={{ color: "var(--border)" }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LIBUV THREAD POOL ═══ */}
      <section className="container pb-12" style={{ background: "var(--card)" }}>
        <div className="container">
          <SectionTitle
            badge="LIBUV DEEP DIVE"
            title="Libuv 线程池机制"
            subtitle="Libuv 使用固定大小的线程池处理阻塞式系统调用。默认 4 个线程，可通过 UV_THREADPOOL_SIZE 调整至最多 1024。"
            badgeColor="var(--secondary)"
          />

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 左侧：原理说明 */}
            <div className="space-y-6">
              <div
                className="animate-pop p-6"
                style={{
                  background: "var(--card)",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "8px 8px 0px 0px var(--secondary)",
                }}
              >
                <h3
                  className="flex items-center gap-2 mb-4"
                  style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    color: "var(--foreground)",
                  }}
                >
                  <Layers size={22} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
                  线程池处理的操作类型
                </h3>
                <div className="space-y-3">
                  {[
                    { op: "文件系统 I/O", detail: "fs.readFile / fs.writeFile / fs.stat 等", icon: FileText, color: "var(--accent)" },
                    { op: "DNS 解析", detail: "dns.lookup() — 将域名解析为 IP", icon: Server, color: "var(--secondary)" },
                    { op: "密码学运算", detail: "crypto.pbkdf2 / crypto.scrypt 等", icon: Database, color: "var(--tertiary)" },
                    { op: "数据压缩", detail: "zlib.gzip / zlib.deflate 等", icon: HardDrive, color: "var(--quaternary)" },
                  ].map((item) => (
                    <div
                      key={item.op}
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{
                        border: `1px solid ${item.color}30`,
                        background: `${item.color}08`,
                      }}
                    >
                      <GeometricIcon icon={item.icon} color={item.color} size={36} />
                      <div>
                        <div className="font-bold text-sm" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}>
                          {item.op}
                        </div>
                        <div className="text-xs" style={{ color: "#64748b", fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <CodeBlock
                filename="thread-pool-config.js"
                accent="var(--secondary)"
                code={`// 设置线程池大小（必须在任何异步操作前设置）
process.env.UV_THREADPOOL_SIZE = '16';

// 验证
import os from 'os';
import crypto from 'crypto';

console.log('CPU 核心数:', os.cpus().length);

// 模拟 16 个并发密码学运算
// 默认 4 线程 → 分 4 批执行
// 设置 16 线程 → 全部并行执行
for (let i = 0; i < 16; i++) {
  const start = Date.now();
  crypto.pbkdf2('secret', 'salt', 1e5, 64, 'sha512', () => {
    console.log(\`Task \${i}: \${Date.now() - start}ms\`);
  });
}`}
              />

              <div
                className="animate-slide p-5"
                style={{
                  animationDelay: "0.2s",
                  background: "#fef3c7",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "6px 6px 0px 0px var(--tertiary)",
                }}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle size={22} strokeWidth={2.5} style={{ color: "var(--tertiary)", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p className="font-bold text-sm" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}>
                      ⚡ 性能陷阱：线程池饥饿
                    </p>
                    <p className="text-sm mt-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: "#78716c" }}>
                      当所有线程都被长时间运行的任务（如 crypto.pbkdf2）占据时，新提交的文件操作和 DNS 查询将排队等待，导致延迟飙升。
                      解决方案：<strong>增大 UV_THREADPOOL_SIZE</strong> 或使用 <strong>Worker Threads</strong> 隔离计算密集任务。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：线程池模拟器 */}
            <div>
              <ThreadPoolVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EVENT LOOP ═══ */}
      <section className="container pb-12">
        <div className="container">
          <SectionTitle
            badge="EVENT LOOP"
            title="事件循环的六个阶段"
            subtitle="理解事件循环每个阶段的职责，掌握 setTimeout、setImmediate、process.nextTick 的执行顺序。"
            badgeColor="var(--accent)"
          />

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 模拟器 */}
            <EventLoopVisualizer />

            {/* 阶段说明 */}
            <div className="space-y-4">
              {[
                {
                  phase: "1. Timers",
                  desc: "执行到期的 setTimeout / setInterval 回调。通过最小堆管理定时器，复杂度 O(log n)。",
                  color: "var(--accent)",
                  icon: Timer,
                },
                {
                  phase: "2. Pending Callbacks",
                  desc: "执行延迟到下一轮循环的 I/O 回调。如 TCP 连接错误的回调。",
                  color: "var(--secondary)",
                  icon: GitBranch,
                },
                {
                  phase: "3. Idle / Prepare",
                  desc: "仅供 Node.js 内部使用的阶段。用于 GC 空闲标记等内部维护。",
                  color: "var(--border)",
                  icon: CircleDot,
                },
                {
                  phase: "4. Poll（核心）",
                  desc: "计算应阻塞多久等待 I/O，然后处理 poll 队列中的事件。如队列为空，要么超时等待新 I/O，要么立即进入 check 阶段。",
                  color: "var(--tertiary)",
                  icon: Activity,
                },
                {
                  phase: "5. Check",
                  desc: "执行 setImmediate() 回调。在 poll 阶段完成后立即执行。",
                  color: "var(--quaternary)",
                  icon: CheckCircle,
                },
                {
                  phase: "6. Close Callbacks",
                  desc: "执行 close 事件回调，如 socket.on('close')。用于资源清理。",
                  color: "#94a3b8",
                  icon: Box,
                },
              ].map((p, i) => (
                <div
                  key={p.phase}
                  className="animate-slide flex gap-4 p-4 transition-all hover:scale-[1.01]"
                  style={{
                    animationDelay: `${i * 0.08}s`,
                    background: "var(--card)",
                    border: "2px solid var(--foreground)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "5px 5px 0px 0px var(--foreground)",
                  }}
                >
                  <GeometricIcon icon={p.icon} color={p.color} size={40} />
                  <div>
                    <div className="font-bold text-sm" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}>
                      {p.phase}
                    </div>
                    <div className="text-xs mt-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: "#64748b", lineHeight: 1.6 }}>
                      {p.desc}
                    </div>
                  </div>
                </div>
              ))}

              {/* 关键顺序 */}
              <div
                className="animate-slide p-5"
                style={{
                  animationDelay: "0.5s",
                  background: "#ede9fe",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "6px 6px 0px 0px var(--accent)",
                }}
              >
                <p className="font-bold text-sm mb-2" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}>
                  🧠 微任务 vs 宏任务执行顺序
                </p>
                <div className="font-mono text-xs leading-loose" style={{ color: "#4c1d95" }}>
                  <div>1️⃣ <strong>process.nextTick</strong> — 优先级最高，在任何阶段切换前执行</div>
                  <div>2️⃣ <strong>Promise.then / await</strong> — 微任务队列</div>
                  <div>3️⃣ <strong>setTimeout / setImmediate</strong> — 宏任务</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STREAMS ═══ */}
      <section className="container pb-12" style={{ background: "var(--card)" }}>
        <div className="container">
          <SectionTitle
            badge="STREAMS"
            title="Stream 流式处理"
            subtitle="Node.js 的 Stream 是处理大数据集的核心抽象。相比一次性读取，Stream 将数据分块处理，内存占用恒定。"
            badgeColor="var(--tertiary)"
          />

          {/* Stream 类型网格 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                type: "Readable",
                desc: "可读取的数据源",
                example: "fs.createReadStream()、http.IncomingMessage",
                color: "var(--accent)",
                icon: ArrowRight,
              },
              {
                type: "Writable",
                desc: "可写入的目标",
                example: "fs.createWriteStream()、http.ServerResponse",
                color: "var(--secondary)",
                icon: ArrowDown,
              },
              {
                type: "Duplex",
                desc: "可读可写的双工流",
                example: "net.Socket、TCP 连接",
                color: "var(--tertiary)",
                icon: Workflow,
              },
              {
                type: "Transform",
                desc: "转换数据的双工流",
                example: "zlib.createGzip()、crypto.createCipheriv()",
                color: "var(--quaternary)",
                icon: Zap,
              },
            ].map((s, i) => (
              <div
                key={s.type}
                className="animate-slide p-5 transition-all hover:-rotate-1 hover:scale-[1.02]"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  background: "white",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: `8px 8px 0px 0px ${s.color}`,
                }}
              >
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-lg mb-3"
                  style={{ background: s.color, border: "2px solid var(--foreground)" }}
                >
                  <s.icon size={18} strokeWidth={2.5} color="white" />
                </div>
                <div
                  className="font-bold text-lg mb-1"
                  style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}
                >
                  {s.type}
                </div>
                <div className="text-xs mb-2" style={{ color: "#64748b", fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  {s.desc}
                </div>
                <div
                  className="text-[10px] font-mono p-2 rounded"
                  style={{ background: "var(--background)", color: "#64748b" }}
                >
                  {s.example}
                </div>
              </div>
            ))}
          </div>

          {/* Stream vs Buffer 模拟器 */}
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <StreamSimulator />
            </div>
            <div className="lg:col-span-2 space-y-4">
              <CodeBlock
                filename="stream-pipeline.js"
                accent="var(--tertiary)"
                code={`import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';

// ✅ 正确的大文件处理：流式管道
async function compressFile(src, dest) {
  await pipeline(
    createReadStream(src),        // 源：文件读取流
    createGzip({ level: 6 }),     // 转换：gzip 压缩
    createWriteStream(dest)       // 目标：文件写入流
  );
  // 自动处理背压、错误传播和资源清理
  console.log('✅ 压缩完成，内存使用恒定！');
}

// ❌ 错误做法：全量读取
// const data = fs.readFileSync('huge.zip');
// → 内存爆炸！❌`}
              />

              <div
                className="animate-slide p-5"
                style={{
                  animationDelay: "0.2s",
                  background: "#ecfdf5",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "6px 6px 0px 0px var(--quaternary)",
                }}
              >
                <p className="font-bold text-sm mb-2" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}>
                  🌊 背压 (Backpressure) 机制
                </p>
                <p className="text-sm" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: "#065f46", lineHeight: 1.7 }}>
                  当消费端处理速度跟不上生产端时，内部缓冲区（highWaterMark，默认 16KB/64KB）被填满，
                  <code className="font-mono text-xs bg-green-100 px-1 rounded">write()</code> 返回 false，
                  流自动暂停。消费完毕后触发 drain 事件恢复读取。这就是 Node.js 处理 GB 级文件而不 OOM 的秘密。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BUFFER 内存管理 ═══ */}
      <section className="container pb-12">
        <div className="container">
          <SectionTitle
            badge="BUFFER"
            title="Buffer 内存管理"
            subtitle="Buffer 是 Node.js 处理二进制数据的核心。理解其内存分配策略、与 V8 堆的关系，避免常见的内存泄漏。"
            badgeColor="var(--quaternary)"
          />

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Buffer 内部机制 */}
            <div className="space-y-6">
              <div
                className="animate-pop p-6"
                style={{
                  background: "var(--card)",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "8px 8px 0px 0px var(--quaternary)",
                }}
              >
                <h3
                  className="flex items-center gap-2 mb-5"
                  style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    color: "var(--foreground)",
                  }}
                >
                  <Binary size={22} strokeWidth={2.5} style={{ color: "var(--quaternary)" }} />
                  Buffer 内存分配策略
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      title: "预分配内存池",
                      desc: "Buffer 小于 4KB 时，Node.js 从预分配的 8KB 内存池中切分，避免频繁向操作系统申请内存。Buffer.allocUnsafe() 从此池分配，速度快但可能包含旧数据。",
                      color: "var(--accent)",
                    },
                    {
                      title: "直接内存分配",
                      desc: "Buffer 大于 4KB 时，直接通过 C++ 层调用 malloc 分配堆外内存（Outside V8 Heap），不占用 V8 的堆空间，不受 V8 GC 管理。",
                      color: "var(--secondary)",
                    },
                    {
                      title: "Buffer.alloc vs allocUnsafe",
                      desc: "alloc() 用零填充，安全但慢。allocUnsafe() 不填充，快但可能泄露旧内存数据。在确定会立即写入全部字节时用 Unsafe。",
                      color: "var(--tertiary)",
                    },
                    {
                      title: "内存回收",
                      desc: "Buffer 对象本身在 V8 堆上（一个很小的 C++ 指针包装），但实际数据在堆外。当 JS 对象被 GC 回收时，对应的堆外内存通过析构函数释放。",
                      color: "var(--quaternary)",
                    },
                  ].map((item, i) => (
                    <div
                      key={item.title}
                      className="animate-slide flex gap-3 p-4 rounded-lg"
                      style={{
                        animationDelay: `${i * 0.08}s`,
                        border: `2px solid ${item.color}30`,
                        background: `${item.color}08`,
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 text-white font-bold text-xs"
                        style={{ background: item.color, border: "2px solid var(--foreground)", fontFamily: '"Outfit", sans-serif' }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-bold text-sm" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}>
                          {item.title}
                        </div>
                        <div className="text-xs mt-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: "#64748b", lineHeight: 1.6 }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 内存布局示意 */}
              <div
                className="animate-pop p-5"
                style={{
                  background: "var(--card)",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "6px 6px 0px 0px var(--foreground)",
                }}
              >
                <h4 className="font-bold text-sm mb-3" style={{ fontFamily: '"Outfit", sans-serif' }}>
                  📊 内存布局示意
                </h4>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ background: "var(--accent)", border: "1px solid var(--foreground)" }} />
                    <span>V8 Heap（~1.7GB 限制）— JS 对象、字符串、闭包</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ background: "var(--tertiary)", border: "1px solid var(--foreground)" }} />
                    <span>Buffer Pool（8KB 预分配）— 小 Buffer 共享</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ background: "var(--quaternary)", border: "1px solid var(--foreground)" }} />
                    <span>Native Memory（堆外）— 大 Buffer 直接分配</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ background: "var(--secondary)", border: "1px solid var(--foreground)" }} />
                    <span>Libuv Thread Pool — 4个工作者线程</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Buffer 代码 */}
            <div className="space-y-4">
              <CodeBlock
                filename="buffer-advanced.js"
                accent="var(--quaternary)"
                code={`import { Buffer } from 'buffer';

// 1️⃣ 内存池切分演示
const buf1 = Buffer.alloc(100); // < 4KB → 来自 8KB 内存池
const buf2 = Buffer.alloc(100);
console.log(buf1.buffer === buf2.buffer); // true (共享 ArrayBuffer!)

const buf3 = Buffer.alloc(5000); // > 4KB → 直接分配
console.log(buf1.buffer === buf3.buffer); // false

// 2️⃣ 零拷贝切片
const original = Buffer.from('Hello, Node.js Streams!');
const slice = original.subarray(7, 11); // 零拷贝！
console.log(slice.toString()); // "Node"
// ⚠️ slice 与 original 共享同一块内存
slice[0] = 'n'.charCodeAt(0);
console.log(original.toString()); // "Hello, node.js..."

// 3️⃣ 高效的 Buffer 转换
const utf8 = Buffer.from('你好世界');
console.log(utf8.length);          // 12 (UTF-8: 每中文字符3字节)
console.log(utf8.toString('hex'));  // "e4bda0e5a5bd..."
console.log(utf8.toString('base64')); // "5L2g5aW95LiW55..."}`}
              />

              <CodeBlock
                filename="buffer-pool-mechanism.js"
                accent="var(--quaternary)"
                code={`// 观察 Buffer 内存池的分配行为
import { Buffer } from 'buffer';

// 查看 Node.js 内部的 Buffer 内存池
class BufferPoolInspector {
  static analyze() {
    // 创建多个小 Buffer，它们共享同一个 ArrayBuffer
    const bufs = [];
    for (let i = 0; i < 10; i++) {
      bufs.push(Buffer.allocUnsafe(100));
    }

    // 检查是否共享底层 ArrayBuffer
    const uniqueABs = new Set(bufs.map(b => b.buffer));
    console.log('分配 10 个 100B Buffer');
    console.log('唯一 ArrayBuffer 数:', uniqueABs.size); // 远小于 10
    console.log('内存池大小:', bufs[0].buffer.byteLength); // 8192 (8KB)
  }

  static monitor() {
    // 实际项目中监控 Buffer 内存
    const before = process.memoryUsage();

    const bigBuf = Buffer.alloc(50 * 1024 * 1024); // 50MB

    const after = process.memoryUsage();
    console.log('外部内存增长:',
      ((after.external - before.external) / 1024 / 1024).toFixed(1), 'MB'
    );
    // arrayBuffers 不会显著增长（堆外分配）

    bigBuf.fill(0); // 触发实际内存分配（OS 层面）
  }
}`}
              />

              <div
                className="animate-slide p-5"
                style={{
                  animationDelay: "0.3s",
                  background: "#fef2f2",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "6px 6px 0px 0px var(--secondary)",
                }}
              >
                <p className="font-bold text-sm mb-1" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}>
                  🚨 常见内存泄漏场景
                </p>
                <ul className="text-sm space-y-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: "#991b1b", lineHeight: 1.7 }}>
                  <li>• 持续累积 Buffer 到数组中未释放</li>
                  <li>• 未关闭的 Stream 导致内部缓冲区堆积</li>
                  <li>• subarray() 的引用链导致原始大 Buffer 无法 GC</li>
                  <li>• 全局缓存中存储大量 Buffer 未设 TTL</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HIGH CONCURRENCY ═══ */}
      <section className="container pb-12" style={{ background: "var(--card)" }}>
        <div className="container">
          <SectionTitle
            badge="PERFORMANCE"
            title="大文件与高并发实战"
            subtitle="综合运用 Stream、Cluster、Worker Threads，攻克生产环境中的性能瓶颈。"
            badgeColor="var(--accent)"
          />

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* 大文件方案 */}
            <div
              className="animate-pop"
              style={{
                border: "3px solid var(--foreground)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "10px 10px 0px 0px var(--accent)",
                background: "white",
                overflow: "hidden",
              }}
            >
              <div className="px-6 py-4" style={{ background: "var(--accent)", borderBottom: "2px solid var(--foreground)" }}>
                <span className="font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif', fontSize: "1.05rem" }}>
                  📁 大文件处理方案
                </span>
              </div>
              <div className="p-6 space-y-4">
                {[
                  {
                    title: "文件分片上传",
                    desc: "客户端将文件切分为 5MB 分片，逐片上传。服务端通过 Writable Stream 接收并合并。",
                    tag: "Stream + 背压",
                  },
                  {
                    title: "流式 CSV/JSON 导出",
                    desc: "使用 Transform Stream 将数据库查询结果逐行转换为 CSV，通过 HTTP Response Stream 返回。",
                    tag: "Transform Stream",
                  },
                  {
                    title: "视频流服务",
                    desc: "利用 Range 请求 + ReadStream 实现视频 seek，支持断点续播。",
                    tag: "Range + ReadStream",
                  },
                  {
                    title: "文件校验",
                    desc: "对 GB 级文件计算 SHA256：ReadStream → crypto.Hash → digest，内存恒定 64KB。",
                    tag: "管道串联",
                  },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className="animate-slide p-4 rounded-lg"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      border: "2px solid var(--border)",
                      background: "var(--background)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}>
                        {item.title}
                      </span>
                      <Badge color="var(--accent)" size="sm">{item.tag}</Badge>
                    </div>
                    <p className="text-xs" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: "#64748b", lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 高并发方案 */}
            <div
              className="animate-pop"
              style={{
                animationDelay: "0.15s",
                border: "3px solid var(--foreground)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "10px 10px 0px 0px var(--secondary)",
                background: "white",
                overflow: "hidden",
              }}
            >
              <div className="px-6 py-4" style={{ background: "var(--secondary)", borderBottom: "2px solid var(--foreground)" }}>
                <span className="font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif', fontSize: "1.05rem" }}>
                  ⚡ 高并发优化策略
                </span>
              </div>
              <div className="p-6 space-y-4">
                {[
                  {
                    title: "Cluster 多进程",
                    desc: "利用 os.cpus().length 个 worker 进程，每个进程监听同一端口。由 OS 内核的 SO_REUSEPORT 负载均衡。",
                    tag: "Cluster",
                  },
                  {
                    title: "Worker Threads",
                    desc: "将 CPU 密集任务（图片处理、PDF生成）放到 Worker Thread，不阻塞事件循环。",
                    tag: "计算隔离",
                  },
                  {
                    title: "连接池复用",
                    desc: "数据库连接池、HTTP Keep-Alive、TCP 连接复用。避免频繁创建/销毁连接的开销。",
                    tag: "连接复用",
                  },
                  {
                    title: "Rate Limiting",
                    desc: "令牌桶 + 滑动窗口限流。在中间件层拦截过量请求，保护后端服务。",
                    tag: "流控",
                  },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className="animate-slide p-4 rounded-lg"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      border: "2px solid var(--border)",
                      background: "var(--background)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}>
                        {item.title}
                      </span>
                      <Badge color="var(--secondary)" size="sm">{item.tag}</Badge>
                    </div>
                    <p className="text-xs" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: "#64748b", lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 完整的大文件处理代码 */}
          <CodeBlock
            filename="production-file-server.js"
            accent="var(--accent)"
            code={`import http from 'http';
import { createReadStream, statSync } from 'fs';
import { join, extname } from 'path';
import cluster from 'cluster';
import { cpus } from 'os';

const MIME_TYPES = {
  '.mp4': 'video/mp4', '.pdf': 'application/pdf',
  '.zip': 'application/zip', '.json': 'application/json',
};

// ═══ Cluster 模式：利用全部 CPU 核心 ═══
if (cluster.isPrimary) {
  const numWorkers = cpus().length;
  console.log(\`🚀 Master \${process.pid} 启动 \${numWorkers} workers\`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(\`⚠️ Worker \${worker.process.pid} 退出，重启中...\`);
    cluster.fork();
  });
} else {
  const server = http.createServer((req, res) => {
    if (!req.url?.startsWith('/files/')) {
      res.writeHead(404);
      return res.end('Not Found');
    }

    const filePath = join(process.cwd(), 'uploads', req.url.slice(7));
    let stat;
    try { stat = statSync(filePath); } catch {
      res.writeHead(404);
      return res.end('File Not Found');
    }

    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // ═══ 支持 Range 请求（视频 seek / 断点续传）═══
    const range = req.headers.range;
    if (range) {
      const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
      const start = parseInt(startStr, 10);
      const end = endStr ? parseInt(endStr, 10) : stat.size - 1;
      const chunkSize = end - start + 1;

      res.writeHead(206, {
        'Content-Range': \`bytes \${start}-\${end}/\${stat.size}\`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType,
      });

      // createReadStream 只读取请求的字节范围
      createReadStream(filePath, { start, end }).pipe(res);
    } else {
      // ═══ 全量流式返回 ═══
      res.writeHead(200, {
        'Content-Length': stat.size,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
      });

      // 流式返回，内存恒定 ~64KB（highWaterMark）
      createReadStream(filePath).pipe(res);
    }
  });

  server.listen(3000, () => {
    console.log(\`✅ Worker \${process.pid} 监听 :3000\`);
  });
}`}
          />
        </div>
      </section>

      {/* ═══ PERFORMANCE CHEATSHEET ═══ */}
      <section className="container pb-12">
        <div className="container">
          <SectionTitle
            badge="CHEATSHEET"
            title="性能优化速查表"
            subtitle="覆盖事件循环、Stream、Buffer 的核心调优参数与最佳实践。"
            badgeColor="var(--tertiary)"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "UV_THREADPOOL_SIZE",
                value: "4 → 128",
                desc: "线程池大小。增大可提升并发文件 I/O 和 crypto 性能。最大 1024。",
                color: "var(--secondary)",
                icon: Cpu,
              },
              {
                title: "Stream highWaterMark",
                value: "16KB / 64KB",
                desc: "流的内部缓冲区大小。减小可降低内存占用，增大可提升吞吐量。",
                color: "var(--tertiary)",
                icon: Gauge,
              },
              {
                title: "--max-old-space-size",
                value: "默认 ~1.7GB",
                desc: "V8 堆内存上限。可调大但注意 32 位指针限制和 GC 停顿。",
                color: "var(--accent)",
                icon: MemoryStick,
              },
              {
                title: "cluster.fork()",
                value: "= CPU 核心数",
                desc: "多进程充分利用多核。每进程独立堆内存，总内存 = 进程数 × 堆大小。",
                color: "var(--quaternary)",
                icon: Monitor,
              },
              {
                title: "Buffer.allocUnsafe",
                value: "比 alloc 快 10x",
                desc: "不填充零字节。确定会立即写满时使用，避免信息泄露。",
                color: "var(--secondary)",
                icon: Zap,
              },
              {
                title: "pipeline() API",
                value: "替代 .pipe()",
                desc: "自动错误传播和资源清理。推荐使用 stream/promises 版本。",
                color: "var(--accent)",
                icon: Workflow,
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="animate-slide p-5 transition-all hover:-rotate-1 hover:scale-[1.02]"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  background: "var(--card)",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: `7px 7px 0px 0px ${item.color}`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <GeometricIcon icon={item.icon} color={item.color} size={38} />
                  <span
                    className="font-mono text-sm font-bold px-2 py-0.5 rounded"
                    style={{
                      background: `${item.color}20`,
                      color: item.color,
                      border: `1px solid ${item.color}40`,
                    }}
                  >
                    {item.value}
                  </span>
                </div>
                <div className="font-bold text-sm mb-1" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}>
                  {item.title}
                </div>
                <div className="text-xs" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: "#64748b", lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INTERVIEW / FAQ ═══ */}
      <section className="container pb-12" style={{ background: "var(--card)" }}>
        <div className="container">
          <SectionTitle
            badge="FAQ"
            title="高频面试题精选"
            subtitle="理解底层原理，用第一性原理解答，避免死记硬背。"
            badgeColor="var(--accent)"
          />

          <div className="max-w-3xl space-y-3">
            {[
              {
                q: "Node.js 是单线程的吗？",
                a: "不完全是。JS 执行（V8 引擎）是单线程的，但 Libuv 维护了一个 4 线程的线程池处理 I/O 操作。另外，Worker Threads 可以创建独立的 JS 执行线程。所以说「单线程事件驱动模型」更准确——主事件循环单线程，但底层 I/O 是多线程的。",
              },
              {
                q: "process.nextTick 和 setImmediate 有什么区别？",
                a: "nextTick 在当前操作完成后、事件循环下一个阶段前立即执行（优先级极高），属于微任务。setImmediate 在事件循环的 check 阶段执行，属于宏任务。递归调用 nextTick 可能导致 I/O 饥饿，因为事件循环被不断推迟。",
              },
              {
                q: "为什么 fs.readFile 是异步的但底层用了线程？",
                a: "因为操作系统没有提供真正的异步文件 I/O 接口（Linux 的 AIO 对普通文件支持有限）。Libuv 将文件操作委托给线程池中的线程执行同步 syscall，完成后将回调放入事件循环的通知队列。对 JS 层来说这是异步的（非阻塞），但底层确实是同步的。",
              },
              {
                q: "Stream 的 highWaterMark 是什么？调大有什么影响？",
                a: "highWaterMark 是流内部缓冲区的字节阈值。当缓冲数据量达到此值时，Readable 的 push() 返回 false，Writable 的 write() 返回 false，触发背压。调大可以减少流切换上下文的频率（提升吞吐），但会增加内存占用。对于日志文件可以调大，对于视频流要保持适中。",
              },
              {
                q: "如何处理 10GB 的 CSV 文件？",
                a: "绝对不能 fs.readFile 全量读取。正确方案：1) createReadStream 创建可读流；2) 通过 Transform Stream 逐行解析（按换行符 split）；3) 逐行处理或批量写入数据库（每 1000 行 flush 一次）；4) 使用 pipeline() 自动处理背压和错误。内存占用恒定在 ~几 MB。",
              },
              {
                q: "Buffer 和 ArrayBuffer 的关系？",
                a: "Buffer 是 Node.js 对 ArrayBuffer 的封装。每个 Buffer 实例底层关联一个 ArrayBuffer。多个小 Buffer 可能共享同一个 ArrayBuffer（内存池机制）。Buffer 提供了丰富的 API（readUInt32BE、toString('base64') 等），而 ArrayBuffer 是更底层的二进制容器。",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="transition-all"
                style={{
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-md)",
                  background: openFaq === i ? "var(--background)" : "white",
                  boxShadow: openFaq === i ? "6px 6px 0px 0px var(--accent)" : "4px 4px 0px 0px var(--border)",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center gap-3 p-5 text-left"
                >
                  <div
                    className="flex items-center justify-center shrink-0 font-extrabold text-white"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "var(--radius-sm)",
                      background: openFaq === i ? "var(--accent)" : "var(--border)",
                      border: "2px solid var(--foreground)",
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: "0.8rem",
                      transition: "background 0.2s",
                    }}
                  >
                    Q{i + 1}
                  </div>
                  <span
                    className="flex-1 font-bold"
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: "0.95rem",
                      color: "var(--foreground)",
                    }}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    strokeWidth={2.5}
                    className="shrink-0 transition-transform"
                    style={{
                      color: "var(--foreground)",
                      transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div
                    className="px-5 pb-5 pt-0 animate-pop"
                    style={{ marginLeft: 52 }}
                  >
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        color: "#475569",
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-12">
        <div className="container text-center">
          <div
            className="inline-flex items-center gap-2 px-6 py-3"
            style={{
              background: "var(--card)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-full)",
              boxShadow: "6px 6px 0px 0px var(--accent)",
            }}
          >
            <Zap size={18} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
            <span className="font-bold text-sm" style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}>
              掌握底层，方能驾驭高处 — Node.js 异步 I/O 全解析
            </span>
          </div>
          <p
            className="mt-4 text-xs"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: "#94a3b8",
            }}
          >
            深入理解 V8 · Libuv · Stream · Buffer · Event Loop · Worker Threads
          </p>
        </div>
      </footer>

      {/* 全局动画 */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}