"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
} from "react";
import { highlightCode } from "@/lib/prism-highlight";
import {
  Zap,
  Clock,
  Cpu,
  Layers,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Timer,
  Monitor,
  Activity,
  ChevronRight,
  Lightbulb,
  Code2,
  Sparkles,
  Gauge,
  Workflow,
  Target,
  Info,
  MousePointerClick,
  Box,
  CircleDot,
} from "lucide-react";

/* ─────────────────── helper: icon badge ─────────────────── */
function IconBadge({
  icon: Icon,
  bg = "var(--accent)",
  size = 40,
}: {
  icon: React.ElementType;
  bg?: string;
  size?: number;
}) {
  return (
    <div
      className="inline-flex items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: "var(--radius-md)",
        border: "2px solid var(--foreground)",
        background: bg,
        boxShadow: "4px 4px 0px 0px var(--foreground)",
        flexShrink: 0,
      }}
    >
      <Icon size={size * 0.5} strokeWidth={2.5} color="var(--foreground)" />
    </div>
  );
}

/* ─────────────────── helper: code block ─────────────────── */
function CodeBlock({ code, title, language = "javascript" }: { code: string; title?: string; language?: string }) {
  const html = highlightCode(code, language);
  return (
    <div
      className="animate-slide"
      style={{
        background: "#1a1b2e",
        border: "2px solid var(--foreground)",
        borderRadius: "var(--radius-md)",
        boxShadow: "6px 6px 0px 0px var(--foreground)",
        overflow: "hidden",
      }}
    >
      {title && (
        <div
          className="flex items-center gap-2 px-4 py-2"
          style={{
            borderBottom: "2px solid var(--foreground)",
            background: "var(--accent)",
          }}
        >
          <Code2 size={14} strokeWidth={2.5} color="var(--foreground)" />
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--foreground)",
            }}
          >
            {title}
          </span>
        </div>
      )}
      <pre
        className={`overflow-x-auto p-4 language-${language}`}
        style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: "0.82rem",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}

/* ─────────────────── helper: tag pill ─────────────────── */
function Tag({
  children,
  color = "var(--accent)",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span
      className="inline-flex items-center"
      style={{
        padding: "2px 10px",
        borderRadius: "var(--radius-full)",
        border: "2px solid var(--foreground)",
        background: color,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        fontSize: "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: "var(--foreground)",
        boxShadow: "3px 3px 0px 0px var(--foreground)",
      }}
    >
      {children}
    </span>
  );
}

/* ═══════════════════════ INTERACTIVE RAF LAB ═══════════════════════ */
function RAFDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(false);
  const [fps, setFps] = useState(0);
  const [frameCount, setFrameCount] = useState(0);
  const rafRef = useRef<number>(0);
  const fpsRef = useRef({ frames: 0, lastTime: performance.now() });
  const ballRef = useRef({ x: 50, y: 50, vx: 3, vy: 2 });

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const ball = ballRef.current;

    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.x <= 12 || ball.x >= w - 12) ball.vx *= -1;
    if (ball.y <= 12 || ball.y >= h - 12) ball.vy *= -1;

    ctx.clearRect(0, 0, w, h);

    // grid dots
    ctx.fillStyle = "#E2E8F0";
    for (let gx = 0; gx < w; gx += 24) {
      for (let gy = 0; gy < h; gy += 24) {
        ctx.beginPath();
        ctx.arc(gx, gy, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // trail
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(139,92,246,0.15)";
    ctx.fill();

    // ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#8B5CF6";
    ctx.strokeStyle = "#1E293B";
    ctx.lineWidth = 2.5;
    ctx.fill();
    ctx.stroke();

    // fps
    const fpsData = fpsRef.current;
    fpsData.frames++;
    const now = performance.now();
    if (now - fpsData.lastTime >= 500) {
      setFps(Math.round((fpsData.frames * 1000) / (now - fpsData.lastTime)));
      fpsData.frames = 0;
      fpsData.lastTime = now;
    }
    setFrameCount((c) => c + 1);

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const toggle = () => {
    if (running) {
      cancelAnimationFrame(rafRef.current);
      setRunning(false);
    } else {
      setRunning(true);
      rafRef.current = requestAnimationFrame(animate);
    }
  };

  const reset = () => {
    cancelAnimationFrame(rafRef.current);
    setRunning(false);
    setFrameCount(0);
    setFps(0);
    ballRef.current = { x: 50, y: 50, vx: 3, vy: 2 };
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className="animate-pop"
      style={{
        background: "var(--card)",
        border: "3px solid var(--foreground)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "8px 8px 0px 0px var(--accent)",
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "2px solid var(--foreground)" }}
      >
        <div className="flex items-center gap-2">
          <CircleDot size={18} strokeWidth={2.5} />
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            requestAnimationFrame 实验场
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={toggle}
            className="cursor-pointer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              border: "2px solid var(--foreground)",
              background: running ? "var(--secondary)" : "var(--quaternary)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {running ? (
              <Pause size={12} strokeWidth={2.5} />
            ) : (
              <Play size={12} strokeWidth={2.5} />
            )}
            {running ? "暂停" : "启动"}
          </button>
          <button
            onClick={reset}
            className="cursor-pointer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "var(--radius-full)",
              border: "2px solid var(--foreground)",
              background: "var(--tertiary)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
            }}
          >
            <RotateCcw size={13} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <canvas
          ref={canvasRef}
          width={560}
          height={200}
          className="w-full"
          style={{
            borderRadius: "var(--radius-md)",
            border: "2px solid var(--border)",
            background: "var(--background)",
            display: "block",
          }}
        />
        <div className="flex gap-3 mt-3 flex-wrap">
          <div
            className="flex items-center gap-2"
            style={{
              padding: "6px 12px",
              background: "var(--background)",
              borderRadius: "var(--radius-sm)",
              border: "2px solid var(--border)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.78rem",
            }}
          >
            <Activity size={14} strokeWidth={2.5} color="var(--accent)" />
            FPS: <span style={{ color: "var(--accent)" }}>{fps}</span>
          </div>
          <div
            className="flex items-center gap-2"
            style={{
              padding: "6px 12px",
              background: "var(--background)",
              borderRadius: "var(--radius-sm)",
              border: "2px solid var(--border)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.78rem",
            }}
          >
            <Layers size={14} strokeWidth={2.5} color="var(--secondary)" />
            帧数: <span style={{ color: "var(--secondary)" }}>{frameCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ INTERACTIVE RIC LAB ═══════════════════════ */
function RICDemo() {
  type Task = {
    id: number;
    name: string;
    priority: "high" | "low";
    status: "pending" | "running" | "done";
    timeLeft: number;
    deadline?: number;
  };

  type Action =
    | { type: "ADD_TASK"; task: Task }
    | { type: "RUN_NEXT" }
    | { type: "TICK" }
    | { type: "RESET" };

  const initialState: { tasks: Task[]; log: string[]; busy: boolean } = {
    tasks: [],
    log: ["▸ 系统就绪，等待任务入队…"],
    busy: false,
  };

  let taskCounter = 0;

  function reducer(
    state: typeof initialState,
    action: Action
  ): typeof initialState {
    switch (action.type) {
      case "ADD_TASK": {
        const newTasks = [...state.tasks, action.task];
        const newLog = [
          ...state.log,
          `✦ 任务「${action.task.name}」已入队 [${action.task.priority}]`,
        ];
        return { ...state, tasks: newTasks, log: newLog.slice(-8) };
      }
      case "RUN_NEXT": {
        const pending = state.tasks.filter((t) => t.status === "pending");
        if (pending.length === 0)
          return {
            ...state,
            log: [...state.log, "✓ 所有任务已完成！"].slice(-8),
            busy: false,
          };

        const next = pending[0];
        const updated = state.tasks.map((t) =>
          t.id === next.id ? { ...t, status: "running" as const } : t
        );
        const newLog = [
          ...state.log,
          `⚡ 执行「${next.name}」— 使用 ${next.timeLeft}ms 空闲时间`,
        ];
        return { ...state, tasks: updated, log: newLog.slice(-8), busy: true };
      }
      case "TICK": {
        const running = state.tasks.find((t) => t.status === "running");
        if (!running) return state;

        const remaining = running.timeLeft - 16;
        if (remaining <= 0) {
          const updated = state.tasks.map((t) =>
            t.id === running.id
              ? { ...t, status: "done" as const, timeLeft: 0 }
              : t
          );
          const newLog = [
            ...state.log,
            `✓ 「${running.name}」执行完毕`,
          ];
          return {
            ...state,
            tasks: updated,
            log: newLog.slice(-8),
            busy: false,
          };
        }

        return {
          ...state,
          tasks: state.tasks.map((t) =>
            t.id === running.id ? { ...t, timeLeft: remaining } : t
          ),
        };
      }
      case "RESET":
        return initialState;
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const addRandomTask = () => {
    taskCounter++;
    const names = [
      "分析离屏 DOM",
      "预加载图片资源",
      "计算虚拟滚动",
      "合并样式表",
      "发送埋点数据",
      "预渲染隐藏面板",
    ];
    const task: Task = {
      id: taskCounter,
      name: names[Math.floor(Math.random() * names.length)] + ` #${taskCounter}`,
      priority: Math.random() > 0.5 ? "high" : "low",
      status: "pending",
      timeLeft: Math.floor(Math.random() * 80) + 20,
      deadline: Math.random() > 0.5 ? Math.floor(Math.random() * 100) + 50 : undefined,
    };
    dispatch({ type: "ADD_TASK", task });
  };

  const startProcessing = () => {
    dispatch({ type: "RUN_NEXT" });
    intervalRef.current = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 80);
  };

  const resetAll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    dispatch({ type: "RESET" });
    taskCounter = 0;
  };

  useEffect(() => {
    const running = state.tasks.find((t) => t.status === "running");
    if (running && intervalRef.current) return;
    if (!running && state.busy && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      dispatch({ type: "RUN_NEXT" });
    }
  }, [state.tasks, state.busy]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      className="animate-pop"
      style={{
        background: "var(--card)",
        border: "3px solid var(--foreground)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "8px 8px 0px 0px var(--quaternary)",
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "2px solid var(--foreground)" }}
      >
        <div className="flex items-center gap-2">
          <Cpu size={18} strokeWidth={2.5} />
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            requestIdleCallback 实验场
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={addRandomTask}
            className="cursor-pointer"
            style={{
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              border: "2px solid var(--foreground)",
              background: "var(--tertiary)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            + 添加任务
          </button>
          <button
            onClick={startProcessing}
            className="cursor-pointer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              border: "2px solid var(--foreground)",
              background: "var(--quaternary)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            <Play size={11} strokeWidth={2.5} /> 处理
          </button>
          <button
            onClick={resetAll}
            className="cursor-pointer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "var(--radius-full)",
              border: "2px solid var(--foreground)",
              background: "var(--secondary)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
            }}
          >
            <RotateCcw size={13} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="p-4" style={{ minHeight: 240 }}>
        {/* task queue */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
          {state.tasks.length === 0 && (
            <div
              className="col-span-full text-center py-6"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "var(--border)",
                fontWeight: 600,
                fontSize: "0.85rem",
              }}
            >
              点击「添加任务」模拟 requestIdleCallback 任务队列 ✦
            </div>
          )}
          {state.tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-2"
              style={{
                padding: "8px 12px",
                borderRadius: "var(--radius-sm)",
                border: "2px solid var(--foreground)",
                background:
                  task.status === "done"
                    ? "var(--quaternary)"
                    : task.status === "running"
                    ? "var(--tertiary)"
                    : "var(--background)",
                transition: "background 0.3s",
              }}
            >
              {task.status === "done" ? (
                <CheckCircle2 size={14} strokeWidth={2.5} />
              ) : task.status === "running" ? (
                <Zap size={14} strokeWidth={2.5} className="animate-pulse" />
              ) : (
                <Clock size={14} strokeWidth={2.5} color="var(--border)" />
              )}
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.72rem",
                  flex: 1,
                  opacity: task.status === "done" ? 0.6 : 1,
                  textDecoration:
                    task.status === "done" ? "line-through" : "none",
                }}
              >
                {task.name}
              </span>
              <Tag color={task.priority === "high" ? "var(--tertiary)" : "var(--border)"}>
                {task.priority}
              </Tag>
            </div>
          ))}
        </div>

        {/* log */}
        <div
          style={{
            background: "#1a1b2e",
            borderRadius: "var(--radius-sm)",
            border: "2px solid var(--foreground)",
            padding: "10px 14px",
            maxHeight: 130,
            overflowY: "auto",
          }}
        >
          {state.log.map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                lineHeight: 1.8,
                color:
                  line.startsWith("✓")
                    ? "var(--quaternary)"
                    : line.startsWith("⚡")
                    ? "var(--tertiary)"
                    : "#94a3b8",
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ BROWSER EVENT LOOP DIAGRAM ═══════════════════════ */
function EventLoopDiagram() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "宏任务队列", desc: "setTimeout / setInterval / I/O 回调", color: "var(--accent)" },
    { label: "渲染帧", desc: "样式计算 → 布局 → 绘制", color: "var(--secondary)" },
    { label: "requestAnimationFrame", desc: "在渲染前执行，与浏览器刷新率同步", color: "var(--tertiary)" },
    { label: "requestIdleCallback", desc: "在帧末尾的空闲期执行", color: "var(--quaternary)" },
  ];

  return (
    <div
      className="animate-pop"
      style={{
        background: "var(--card)",
        border: "3px solid var(--foreground)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "8px 8px 0px 0px var(--tertiary)",
        padding: 24,
      }}
    >
      <div className="flex items-center gap-2 mb-5">
        <IconBadge icon={Workflow} bg="var(--tertiary)" size={36} />
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: "1.1rem",
          }}
        >
          浏览器一帧中的执行顺序
        </span>
      </div>

      <div className="flex flex-col gap-0">
        {steps.map((s, i) => (
          <div key={i} className="flex items-stretch">
            {/* left column: vertical line + dot */}
            <div className="flex flex-col items-center" style={{ width: 40 }}>
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border: "3px solid var(--foreground)",
                  background: i <= step ? s.color : "var(--background)",
                  transition: "background 0.4s",
                  flexShrink: 0,
                  cursor: "pointer",
                }}
                onClick={() => setStep(i)}
              />
              {i < steps.length - 1 && (
                <div
                  style={{
                    width: 3,
                    flex: 1,
                    background:
                      i < step
                        ? "var(--foreground)"
                        : "var(--border)",
                    borderRadius: 2,
                    transition: "background 0.4s",
                  }}
                />
              )}
            </div>

            {/* right column: content */}
            <div
              className="flex-1 pb-5 cursor-pointer"
              onClick={() => setStep(i)}
              style={{ paddingLeft: 12 }}
            >
              <div
                className="flex items-center gap-2 mb-1"
                style={{
                  opacity: i <= step ? 1 : 0.4,
                  transition: "opacity 0.4s",
                }}
              >
                <Tag color={s.color}>{`Step ${i + 1}`}</Tag>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                  }}
                >
                  {s.label}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "var(--foreground)",
                  opacity: i <= step ? 0.75 : 0.3,
                  margin: 0,
                  transition: "opacity 0.4s",
                }}
              >
                {s.desc}
              </p>
              {i === step && (
                <div
                  className="mt-2"
                  style={{
                    padding: "6px 10px",
                    borderRadius: "var(--radius-sm)",
                    background: s.color + "22",
                    border: `2px solid ${s.color}`,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {i === 0 && "每轮事件循环的起点，执行最早排队的宏任务。"}
                  {i === 1 && "浏览器计算样式、布局、分层、光栅化。若无变化则跳过。"}
                  {i === 2 && "⭐ 关键位置！回调在浏览器重绘之前、样式计算之后被调用，确保动画流畅。"}
                  {i === 3 && "⭐ 仅在帧有剩余时间（通常 < 16.6ms - 已用时间）时才被调用。"}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */
export default function RAFvsRICPage() {
  return (
    <div
      className="bg-dot-grid"
      style={{
        minHeight: "100vh",
        paddingBottom: "4rem",
      }}
    >
      <div className="container" style={{ paddingTop: "2.5rem" }}>
        {/* ───────────────── HERO ───────────────── */}
        <header className="relative mb-12" style={{ minHeight: 280 }}>
          {/* decorative blobs */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              top: -40,
              right: -60,
              width: 260,
              height: 260,
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              background: "var(--tertiary)",
              opacity: 0.18,
              zIndex: 0,
              border: "2px solid var(--foreground)",
            }}
          />
          <div
            className="hidden lg:block"
            style={{
              position: "absolute",
              bottom: -20,
              left: 40,
              width: 140,
              height: 140,
              borderRadius: "40% 60% 70% 30% / 40% 60% 30% 70%",
              background: "var(--secondary)",
              opacity: 0.15,
              zIndex: 0,
              border: "2px solid var(--foreground)",
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4 animate-pop">
              <Tag color="var(--accent)">浏览器 API</Tag>
              <Tag color="var(--tertiary)">性能优化</Tag>
              <Tag color="var(--quaternary)">动画</Tag>
            </div>

            <h1
              className="animate-pop"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3.6rem)",
                lineHeight: 1.1,
                color: "var(--foreground)",
                marginBottom: 16,
              }}
            >
              <span style={{ color: "var(--accent)" }}>requestAnimationFrame</span>
              <br />
              <span className="text-2xl md:text-3xl" style={{ color: "var(--foreground)", opacity: 0.5 }}>
                vs
              </span>
              <br />
              <span style={{ color: "var(--quaternary)" }}>requestIdleCallback</span>
            </h1>

            <p
              className="animate-slide max-w-2xl"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "var(--foreground)",
                opacity: 0.7,
                animationDelay: "0.1s",
              }}
            >
              两个鲜为人知却极其强大的浏览器调度 API。一个让动画丝滑如油，
              一个让后台任务不阻塞用户交互。理解它们，你就掌握了浏览器渲染管线的精髓。
            </p>

            {/* quick stats */}
            <div
              className="flex flex-wrap gap-3 mt-6 animate-slide"
              style={{ animationDelay: "0.2s" }}
            >
              {[
                { icon: Monitor, label: "刷新率同步", value: "16.6ms / 帧" },
                { icon: Gauge, label: "空闲调度阈值", value: "~50ms" },
                { icon: Target, label: "核心目标", value: "60fps 丝滑体验" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3"
                  style={{
                    padding: "10px 16px",
                    background: "var(--card)",
                    borderRadius: "var(--radius-md)",
                    border: "2px solid var(--foreground)",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  <s.icon size={20} strokeWidth={2.5} color="var(--accent)" />
                  <div>
                    <div
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "var(--foreground)",
                        opacity: 0.5,
                      }}
                    >
                      {s.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: "0.95rem",
                      }}
                    >
                      {s.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ───────────────── WHY NOT setTIMEOUT ───────────────── */}
        <section className="mb-12 animate-slide" style={{ animationDelay: "0.15s" }}>
          <div
            className="flex items-start gap-4 p-5"
            style={{
              background: "var(--secondary)",
              border: "3px solid var(--foreground)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "8px 8px 0px 0px var(--foreground)",
            }}
          >
            <IconBadge icon={Lightbulb} bg="var(--tertiary)" size={44} />
            <div>
              <h3
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  marginBottom: 8,
                }}
              >
                为什么不用 setTimeout(fn, 0) 做动画？
              </h3>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.88rem",
                  lineHeight: 1.7,
                  opacity: 0.85,
                }}
              >
                <code
                  style={{
                    background: "rgba(0,0,0,0.1)",
                    padding: "2px 6px",
                    borderRadius: 4,
                    fontWeight: 700,
                  }}
                >
                  setTimeout
                </code>{" "}
                的最小延迟为 <strong>4ms</strong>（嵌套时甚至 10ms+），且无法与浏览器的刷新周期同步。
                你的回调可能在帧的中间被触发，导致上一帧还没绘制就被覆盖 → <strong>画面撕裂</strong>。
                <code
                  style={{
                    background: "rgba(0,0,0,0.1)",
                    padding: "2px 6px",
                    borderRadius: 4,
                    fontWeight: 700,
                  }}
                >
                  requestAnimationFrame
                </code>{" "}
                保证回调在<strong>每帧渲染前</strong>精确执行一次，与显示器刷新率完美同步。
              </p>
            </div>
          </div>
        </section>

        {/* ───────────────── rAF DEEP DIVE ───────────────── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <IconBadge icon={Zap} bg="var(--accent)" size={44} />
            <div>
              <h2
                className="animate-pop"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  color: "var(--accent)",
                }}
              >
                requestAnimationFrame
              </h2>
              <Tag color="var(--accent)">rAF</Tag>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* features card */}
            <div
              className="animate-slide topic-card"
              style={{
                padding: 24,
                animationDelay: "0.1s",
                background: "var(--card)",
                border: "2px solid var(--foreground)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "6px 6px 0px 0px var(--foreground)",
              }}
            >
              <h3
                className="flex items-center gap-2 mb-4"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                }}
              >
                <Sparkles size={18} strokeWidth={2.5} color="var(--accent)" />
                核心特性
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "与浏览器刷新率同步（通常 60fps = 16.6ms/帧）",
                  "页面不可见时自动暂停，节省 CPU 和电量",
                  "返回一个唯一的 ID，可用于 cancelAnimationFrame()",
                  "回调接收高精度时间戳 DOMHighResTimeStamp",
                  "保证每帧最多执行一次，避免冗余计算",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 mb-3"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      strokeWidth={2.5}
                      color="var(--accent)"
                      style={{ marginTop: 3, flexShrink: 0 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* API card */}
            <div
              className="animate-slide topic-card"
              style={{
                padding: 24,
                animationDelay: "0.15s",
                background: "var(--card)",
                border: "2px solid var(--foreground)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "6px 6px 0px 0px var(--accent)",
              }}
            >
              <h3
                className="flex items-center gap-2 mb-4"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                }}
              >
                <Code2 size={18} strokeWidth={2.5} color="var(--secondary)" />
                基本 API
              </h3>
              <CodeBlock
                title="基本用法"
                code={`// 请求动画帧
const id = requestAnimationFrame(callback);

// callback 在每帧渲染前调用
function callback(timestamp) {
  // timestamp: DOMHighResTimeStamp
  // 通常是 performance.now() 的同义词
  
  // 执行动画计算...
  updatePositions(timestamp);
  
  // 递归调用以维持动画循环
  requestAnimationFrame(callback);
}

// 取消动画帧
cancelAnimationFrame(id);`}
              />
            </div>
          </div>

          {/* use cases */}
          <div
            className="animate-slide grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            style={{ animationDelay: "0.2s" }}
          >
            {[
              {
                icon: MousePointerClick,
                title: "平滑动画",
                desc: "CSS 无法实现的复杂 JS 动画、canvas 绑定、物理模拟",
                color: "var(--accent)",
              },
              {
                icon: Activity,
                title: "滚动监听",
                desc: "配合 scroll 事件做节流，实现视差、懒加载等效果",
                color: "var(--secondary)",
              },
              {
                icon: Timer,
                title: "帧率监控",
                desc: "通过计算两次 rAF 回调的时间差来测量实际 FPS",
                color: "var(--tertiary)",
              },
            ].map((uc, i) => (
              <div
                key={i}
                className="topic-card"
                style={{
                  padding: 20,
                  background: "var(--card)",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: `5px 5px 0px 0px ${uc.color}`,
                }}
              >
                <div
                  className="inline-flex items-center justify-center mb-3"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-md)",
                    border: "2px solid var(--foreground)",
                    background: uc.color,
                  }}
                >
                  <uc.icon size={20} strokeWidth={2.5} />
                </div>
                <h4
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    marginBottom: 6,
                  }}
                >
                  {uc.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.8rem",
                    lineHeight: 1.6,
                    opacity: 0.7,
                    margin: 0,
                  }}
                >
                  {uc.desc}
                </p>
              </div>
            ))}
          </div>

          {/* rAF demo */}
          <RAFDemo />

          {/* advanced pattern */}
          <div className="mt-8">
            <CodeBlock
              title="高级模式：带 deltaTime 的动画循环"
              code={`let lastTime = 0;

function gameLoop(currentTime) {
  const deltaTime = currentTime - lastTime; // ms since last frame
  lastTime = currentTime;

  // 用 deltaTime 做帧无关的运动计算
  // 这样即使帧率波动，运动速度也一致
  player.x += player.speed * (deltaTime / 1000);
  player.y += player.gravity * (deltaTime / 1000);

  render(ctx);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);`}
            />
          </div>
        </section>

        {/* ───────────────── DIVIDER ───────────────── */}
        <div className="flex items-center gap-4 my-10">
          <div
            style={{
              flex: 1,
              height: 3,
              background:
                "repeating-linear-gradient(90deg, var(--foreground) 0, var(--foreground) 8px, transparent 8px, transparent 14px)",
            }}
          />
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "var(--radius-full)",
              border: "3px solid var(--foreground)",
              background: "var(--tertiary)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "0.8rem",
            }}
          >
            VS
          </div>
          <div
            style={{
              flex: 1,
              height: 3,
              background:
                "repeating-linear-gradient(90deg, var(--foreground) 0, var(--foreground) 8px, transparent 8px, transparent 14px)",
            }}
          />
        </div>

        {/* ───────────────── rIC DEEP DIVE ───────────────── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <IconBadge icon={Cpu} bg="var(--quaternary)" size={44} />
            <div>
              <h2
                className="animate-pop"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  color: "var(--quaternary)",
                }}
              >
                requestIdleCallback
              </h2>
              <Tag color="var(--quaternary)">rIC</Tag>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* features */}
            <div
              className="animate-slide topic-card"
              style={{
                padding: 24,
                animationDelay: "0.1s",
                background: "var(--card)",
                border: "2px solid var(--foreground)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "6px 6px 0px 0px var(--foreground)",
              }}
            >
              <h3
                className="flex items-center gap-2 mb-4"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                }}
              >
                <Sparkles size={18} strokeWidth={2.5} color="var(--quaternary)" />
                核心特性
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "仅在浏览器空闲时执行，绝不阻塞用户输入和渲染",
                  "回调接收 IdleDeadline 对象，含 timeRemaining() 方法",
                  "timeRemaining() 返回本帧剩余空闲时间（通常 ≤ 50ms）",
                  "支持 timeout 选项：设置最大等待时间，到期后强制执行",
                  "适合低优先级任务：分析、预加载、数据上报等",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 mb-3"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      strokeWidth={2.5}
                      color="var(--quaternary)"
                      style={{ marginTop: 3, flexShrink: 0 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* API */}
            <div
              className="animate-slide topic-card"
              style={{
                padding: 24,
                animationDelay: "0.15s",
                background: "var(--card)",
                border: "2px solid var(--foreground)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "6px 6px 0px 0px var(--quaternary)",
              }}
            >
              <h3
                className="flex items-center gap-2 mb-4"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                }}
              >
                <Code2 size={18} strokeWidth={2.5} color="var(--secondary)" />
                基本 API
              </h3>
              <CodeBlock
                title="基本用法"
                code={`// 请求空闲回调
const id = requestIdleCallback(callback, {
  timeout: 2000  // 最多等 2 秒，之后强制执行
});

function callback(deadline) {
  // deadline.timeRemaining() → 本帧剩余空闲 ms
  // deadline.didTimeout   → 是否因 timeout 触发
  
  while (deadline.timeRemaining() > 0 && tasks.length) {
    // 每次循环检查剩余时间，执行一个任务
    processTask(tasks.shift());
  }
  
  // 还有剩余任务？再次请求空闲回调
  if (tasks.length) {
    requestIdleCallback(callback);
  }
}

// 取消
cancelIdleCallback(id);`}
              />
            </div>
          </div>

          {/* use cases */}
          <div
            className="animate-slide grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            style={{ animationDelay: "0.2s" }}
          >
            {[
              {
                icon: Layers,
                title: "大数据渲染",
                desc: "将长列表分批渲染，每帧只处理一批，避免页面卡顿",
                color: "var(--quaternary)",
              },
              {
                icon: Box,
                title: "资源预加载",
                desc: "在空闲时预加载图片、字体或下一页的数据",
                color: "var(--accent)",
              },
              {
                icon: Cpu,
                title: "数据同步",
                desc: "埋点发送、本地存储同步、日志清理等后台操作",
                color: "var(--tertiary)",
              },
            ].map((uc, i) => (
              <div
                key={i}
                className="topic-card"
                style={{
                  padding: 20,
                  background: "var(--card)",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: `5px 5px 0px 0px ${uc.color}`,
                }}
              >
                <div
                  className="inline-flex items-center justify-center mb-3"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-md)",
                    border: "2px solid var(--foreground)",
                    background: uc.color,
                  }}
                >
                  <uc.icon size={20} strokeWidth={2.5} />
                </div>
                <h4
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    marginBottom: 6,
                  }}
                >
                  {uc.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.8rem",
                    lineHeight: 1.6,
                    opacity: 0.7,
                    margin: 0,
                  }}
                >
                  {uc.desc}
                </p>
              </div>
            ))}
          </div>

          {/* rIC demo */}
          <RICDemo />

          {/* polyfill note */}
          <div
            className="mt-6 flex items-start gap-3"
            style={{
              padding: "16px 20px",
              background: "var(--tertiary)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-md)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <Info size={20} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.83rem", lineHeight: 1.7 }}>
              <strong>兼容性注意：</strong>
              <code
                style={{
                  background: "rgba(0,0,0,0.08)",
                  padding: "2px 6px",
                  borderRadius: 4,
                  fontWeight: 700,
                }}
              >
                requestIdleCallback
              </code>{" "}
              目前在 Safari 中<strong>不受支持</strong>。常用 polyfill 方案是用{" "}
              <code
                style={{
                  background: "rgba(0,0,0,0.08)",
                  padding: "2px 6px",
                  borderRadius: 4,
                  fontWeight: 700,
                }}
              >
                setTimeout
              </code>{" "}
              模拟，或使用 React 的{" "}
              <code
                style={{
                  background: "rgba(0,0,0,0.08)",
                  padding: "2px 6px",
                  borderRadius: 4,
                  fontWeight: 700,
                }}
              >
                MessageChannel
              </code>{" "}
              方案（即 React Scheduler 的核心原理）。
            </div>
          </div>
        </section>

        {/* ───────────────── EVENT LOOP DIAGRAM ───────────────── */}
        <section className="mb-12">
          <EventLoopDiagram />
        </section>

        {/* ───────────────── COMPARISON TABLE ───────────────── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <IconBadge icon={Target} bg="var(--secondary)" size={44} />
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
              }}
            >
              对比一览
            </h2>
          </div>

          <div
            className="animate-pop overflow-x-auto"
            style={{
              border: "3px solid var(--foreground)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "8px 8px 0px 0px var(--foreground)",
              background: "var(--card)",
            }}
          >
            <table
              className="w-full"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.85rem",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  {["维度", "requestAnimationFrame", "requestIdleCallback"].map(
                    (h, i) => (
                      <th
                        key={i}
                        className="px-5 py-3 text-left"
                        style={{
                          borderBottom: "3px solid var(--foreground)",
                          background: i === 0 ? "var(--foreground)" : i === 1 ? "var(--accent)" : "var(--quaternary)",
                          color: i === 0 ? "var(--background)" : "var(--foreground)",
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 800,
                          fontSize: "0.85rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {[
                  ["调用时机", "每帧渲染前（同步刷新率）", "帧末尾空闲期（不保证何时）"],
                  ["频率", "≈ 60次/秒（依刷新率）", "不确定，可能几秒才触发一次"],
                  ["优先级", "高 — 影响视觉流畅度", "低 — 可被无限延后"],
                  ["典型用途", "动画、Canvas 绘制、滚动", "预加载、分析、数据同步"],
                  ["时间控制", "无内置超时机制", "支持 timeout 选项"],
                  ["可见性", "页面不可见时暂停", "页面不可见时也可能执行"],
                  ["取消方式", "cancelAnimationFrame(id)", "cancelIdleCallback(id)"],
                  ["兼容性", "✅ 所有主流浏览器", "⚠️ 不支持 Safari"],
                  ["React 中的使用", "useEffect 中绑定动画", "内部 Scheduler 基于类似原理"],
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      background: i % 2 === 0 ? "var(--background)" : "var(--card)",
                    }}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="px-5 py-3"
                        style={{
                          borderBottom: "1px solid var(--border)",
                          fontWeight: j === 0 ? 700 : 500,
                          fontFamily:
                            j === 0
                              ? "'Outfit', sans-serif"
                              : "'Plus Jakarta Sans', sans-serif",
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
        </section>

        {/* ───────────────── BEST PRACTICES ───────────────── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <IconBadge icon={Lightbulb} bg="var(--tertiary)" size={44} />
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
              }}
            >
              最佳实践 & 避坑指南
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                emoji: "✅",
                title: "rAF 中使用 deltaTime",
                desc: "不要假设每帧间隔固定为 16.6ms。用回调的时间戳计算 deltaTime，确保动画在不同刷新率设备上一致。",
                color: "var(--accent)",
              },
              {
                emoji: "✅",
                title: "rIC 中检查 timeRemaining",
                desc: "永远在循环中检查 deadline.timeRemaining()。单个任务太重时应拆分，让出主线程给用户交互。",
                color: "var(--quaternary)",
              },
              {
                emoji: "✅",
                title: "组件卸载时取消",
                desc: "在 React 的 useEffect cleanup 中调用 cancelAnimationFrame / cancelIdleCallback，避免内存泄漏。",
                color: "var(--secondary)",
              },
              {
                emoji: "❌",
                title: "不要在 rAF 中做重计算",
                desc: "rAF 回调直接决定帧率。把密集计算（如物理模拟）放到 Web Worker 中，rAF 只负责更新渲染。",
                color: "var(--tertiary)",
              },
              {
                emoji: "❌",
                title: "不要用 rIC 处理用户交互",
                desc: "rIC 可能延迟数秒甚至不执行。需要及时响应的任务（点击、输入）绝不能依赖它。",
                color: "var(--secondary)",
              },
              {
                emoji: "💡",
                title: "组合使用：rAF + rIC",
                desc: "动画逻辑用 rAF 渲染，同时用 rIC 在空闲期预计算下一帧所需的数据，实现流水线并行。",
                color: "var(--accent)",
              },
            ].map((bp, i) => (
              <div
                key={i}
                className="animate-slide topic-card flex items-start gap-4"
                style={{
                  padding: 20,
                  animationDelay: `${i * 0.05}s`,
                  background: "var(--card)",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: `5px 5px 0px 0px ${bp.color}`,
                }}
              >
                <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>
                  {bp.emoji}
                </span>
                <div>
                  <h4
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: "0.95rem",
                      marginBottom: 4,
                    }}
                  >
                    {bp.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "0.82rem",
                      lineHeight: 1.6,
                      opacity: 0.7,
                      margin: 0,
                    }}
                  >
                    {bp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────── COMBINED PATTERN ───────────────── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <IconBadge icon={Workflow} bg="var(--accent)" size={44} />
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
              }}
            >
              组合模式：流水线调度
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <CodeBlock
                title="rAF + rIC 流水线"
                code={`// 🎯 核心思路：
// rAF 负责渲染当前帧
// rIC 在空闲期预计算下一帧数据

let currentData = null;
let pendingData = null;

// ① rIC：空闲时预计算
function precompute(deadline) {
  while (deadline.timeRemaining() > 0 
         && rawData.length) {
    const item = rawData.shift();
    pendingData = transform(item); // 重计算
  }
  
  // 还有数据？继续排队
  if (rawData.length) {
    requestIdleCallback(precompute);
  }
}

// ② rAF：每帧只做轻量渲染
function render(time) {
  // 如果预计算好了，切换数据
  if (pendingData) {
    currentData = pendingData;
    pendingData = null;
  }
  
  if (currentData) {
    draw(currentData); // 快速渲染
  }
  
  requestAnimationFrame(render);
}

// 启动
requestIdleCallback(precompute);
requestAnimationFrame(render);`}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div
                className="animate-slide topic-card"
                style={{
                  padding: 20,
                  background: "var(--accent)",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "5px 5px 0px 0px var(--foreground)",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: "1rem",
                    marginBottom: 8,
                  }}
                >
                  🧠 为什么这个模式强大？
                </h4>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.85rem",
                    lineHeight: 1.7,
                    opacity: 0.85,
                  }}
                >
                  想象你在看一部电影。rAF 是放映机——保证每秒播放 24 帧（或 60 帧）。
                  rIC 是后台的胶片准备员——在放映机不需要新胶片时，提前裁剪和准备好下一卷。
                  这样放映机永远不会等待，观众看到的画面永远流畅。
                </p>
              </div>

              <div
                className="animate-slide topic-card"
                style={{
                  padding: 20,
                  background: "var(--card)",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "5px 5px 0px 0px var(--quaternary)",
                  animationDelay: "0.1s",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: "1rem",
                    marginBottom: 8,
                    color: "var(--quaternary)",
                  }}
                >
                  📦 谁在用这种模式？
                </h4>
                <ul
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.85rem",
                    lineHeight: 1.8,
                    margin: 0,
                    paddingLeft: 18,
                  }}
                >
                  <li>
                    <strong>React Scheduler</strong> — 用 MessageChannel
                    模拟类似 rIC 的调度
                  </li>
                  <li>
                    <strong>Google Maps</strong> — 空闲期加载远处瓦片
                  </li>
                  <li>
                    <strong>Figma</strong> — Canvas 渲染引擎的帧调度
                  </li>
                  <li>
                    <strong>Virtualized Lists</strong> —
                    空闲时预渲染即将进入视口的行
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────── SUMMARY FOOTER ───────────────── */}
        <footer
          className="animate-pop"
          style={{
            padding: 32,
            background: "var(--foreground)",
            border: "3px solid var(--foreground)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "8px 8px 0px 0px var(--accent)",
            color: "var(--background)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={24} strokeWidth={2.5} color="var(--tertiary)" />
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "1.4rem",
                color: "var(--tertiary)",
              }}
            >
              一句话总结
            </h3>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.8,
            }}
          >
            <div
              style={{
                padding: 20,
                borderRadius: "var(--radius-md)",
                border: "2px solid var(--accent)",
                background: "rgba(139,92,246,0.1)",
              }}
            >
              <strong style={{ color: "var(--accent)" }}>requestAnimationFrame</strong>
              <br />
              &ldquo;在每一帧<strong>渲染之前</strong>，给我一个执行机会。&rdquo;
              <br />
              <span style={{ opacity: 0.6 }}>
                → 动画、绘制、一切与<strong>视觉</strong>相关的事。
              </span>
            </div>
            <div
              style={{
                padding: 20,
                borderRadius: "var(--radius-md)",
                border: "2px solid var(--quaternary)",
                background: "rgba(52,211,153,0.1)",
              }}
            >
              <strong style={{ color: "var(--quaternary)" }}>requestIdleCallback</strong>
              <br />
              &ldquo;在每一帧<strong>有空闲时</strong>，帮我做点杂活。&rdquo;
              <br />
              <span style={{ opacity: 0.6 }}>
                → 预加载、分析、一切<strong>不紧急</strong>的事。
              </span>
            </div>
          </div>
          <p
            className="mt-4"
            style={{ opacity: 0.4, fontSize: "0.75rem", textAlign: "center" }}
          >
            掌握了这两个 API，你就拥有了对浏览器主线程的精细调度能力 ✦
          </p>
        </footer>
      </div>
    </div>
  );
}