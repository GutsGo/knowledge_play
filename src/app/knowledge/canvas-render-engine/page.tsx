// app/knowledge/canvas-rendering-pipeline/page.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Layers,
  Zap,
  Cpu,
  Eye,
  MousePointer2,
  RefreshCw,
  GitBranch,
  Box,
  Flame,
  Activity,
  ArrowRight,
  ChevronRight,
  CircleDot,
  Square,
  Triangle,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Info,
  Sparkles,
  Database,
  Monitor,
  Timer,
  TrendingUp,
  GitMerge,
  Workflow,
  Scan,
  Move,
  Target,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Pipeline Stage Data                                                */
/* ------------------------------------------------------------------ */
const PIPELINE_STAGES = [
  {
    id: "data",
    label: "DATA",
    title: "数据解析层",
    desc: "将 JSON Schema / DSL 转换为内部渲染树 (Display List)，支持增量 Diff 更新",
    icon: Database,
    color: "var(--accent)",
    bgColor: "bg-purple-100",
    details: [
      "Virtual DOM → Display List 映射",
      "增量 Diff & 批量 Patch",
      "JSON Schema 驱动声明式绑定",
    ],
  },
  {
    id: "layout",
    label: "LAYOUT",
    title: "布局计算层",
    desc: "自动计算节点位置、大小与层级关系，支持 Force / Dagre / Grid 等布局算法",
    icon: GitBranch,
    color: "var(--secondary)",
    bgColor: "bg-pink-100",
    details: [
      "力导向布局 (Force-Directed)",
      "DAG 分层布局 (Sugiyama)",
      "自定义约束求解器",
    ],
  },
  {
    id: "scene",
    label: "SCENE",
    title: "场景图管理层",
    desc: "维护树形场景图，处理裁剪、变换矩阵级联、脏区标记与剔除",
    icon: Layers,
    color: "var(--tertiary)",
    bgColor: "bg-yellow-100",
    details: [
      "空间索引 (R-Tree / BVH)",
      "视锥裁剪 (Frustum Culling)",
      "变换矩阵栈级联",
    ],
  },
  {
    id: "render",
    label: "RENDER",
    title: "Canvas 绘制层",
    desc: "分层 Canvas (Background / Main / Overlay) 并行绘制，脏区局部刷新",
    icon: Monitor,
    color: "var(--quaternary)",
    bgColor: "bg-green-100",
    details: [
      "OffscreenCanvas 离屏缓冲",
      "分层 Canvas 并行渲染",
      "脏区 (Dirty Rect) 局部重绘",
    ],
  },
  {
    id: "interaction",
    label: "EVENT",
    title: "交互事件层",
    desc: "基于拾取 (Picking) 机制的精准事件分发，支持手势识别与拖拽约束",
    icon: MousePointer2,
    color: "var(--accent)",
    bgColor: "bg-purple-100",
    details: [
      "像素级 Picking 拾取",
      "事件委托 & 冒泡机制",
      "惯性滚动 & 手势识别",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Performance Benchmark Data                                         */
/* ------------------------------------------------------------------ */
const BENCHMARKS = [
  {
    metric: "节点渲染",
    naive: 12000,
    optimized: 180,
    unit: "ms",
    label: "10 万节点全量渲染",
    icon: Box,
    color: "var(--accent)",
  },
  {
    metric: "交互响应",
    naive: 340,
    optimized: 8,
    unit: "ms",
    label: "拖拽 5000 节点帧耗时",
    icon: MousePointer2,
    color: "var(--secondary)",
  },
  {
    metric: "内存占用",
    naive: 2048,
    optimized: 320,
    unit: "MB",
    label: "百万级边的图数据",
    icon: Cpu,
    color: "var(--tertiary)",
  },
  {
    metric: "首次渲染",
    naive: 8500,
    optimized: 450,
    unit: "ms",
    label: "复杂 DAG 拓扑图",
    icon: Timer,
    color: "var(--quaternary)",
  },
];

/* ------------------------------------------------------------------ */
/*  Architecture Modules                                               */
/* ------------------------------------------------------------------ */
const ARCH_MODULES = [
  {
    name: "ShapeRegistry",
    role: "图形注册中心",
    desc: "统一管理内置 & 自定义图形类型，运行时动态扩展",
    icon: Target,
    color: "var(--accent)",
  },
  {
    name: "RenderScheduler",
    role: "渲染调度器",
    desc: "requestAnimationFrame 驱动的帧调度，合并批量更新",
    icon: RefreshCw,
    color: "var(--secondary)",
  },
  {
    name: "SpatialIndex",
    role: "空间索引引擎",
    desc: "R-Tree + BVH 双重索引，O(log n) 范围查询与碰撞检测",
    icon: Scan,
    color: "var(--tertiary)",
  },
  {
    name: "EventHandler",
    role: "事件分发引擎",
    desc: "像素拾取 + 事件委托，支持自定义手势与拖拽约束",
    icon: Zap,
    color: "var(--quaternary)",
  },
  {
    name: "LayerManager",
    role: "分层管理器",
    desc: "Background / Main / Overlay 三层 Canvas 独立刷新",
    icon: Layers,
    color: "var(--accent)",
  },
  {
    name: "TransformStack",
    role: "变换矩阵栈",
    desc: "矩阵级联、脏标记传播，最小化重计算范围",
    icon: Move,
    color: "var(--secondary)",
  },
];

/* ------------------------------------------------------------------ */
/*  Key Techniques                                                     */
/* ------------------------------------------------------------------ */
const TECHNIQUES = [
  {
    title: "对象池 (Object Pool)",
    desc: "预分配图形实例复用，避免 GC 抖动",
    code: `const pool = new ShapePool({
  initialSize: 10000,
  growthFactor: 1.5,
  shapeType: 'circle'
});

// 从池中获取 → 使用 → 归还
const node = pool.acquire();
node.setAttr({ x, y, r: 8 });
// ... render ...
pool.release(node);`,
    icon: Database,
    color: "var(--accent)",
  },
  {
    title: "增量渲染 (Incremental Render)",
    desc: "仅重绘脏区域，跳过未变化的图形",
    code: `renderer.markDirty(dirtyRect);
renderer.renderFrame = () => {
  const regions = spatialIndex
    .query(dirtyRect);
  
  ctx.save();
  ctx.beginPath();
  ctx.rect(dirtyRect);
  ctx.clip();
  
  regions.forEach(el => el.draw(ctx));
  ctx.restore();
};`,
    icon: RefreshCw,
    color: "var(--quaternary)",
  },
  {
    title: "分层 Canvas 策略",
    desc: "静态层缓存、动态层局部刷新，大幅降低绘制开销",
    code: `const layers = {
  bg:    new Canvas('#bg-canvas'),     // 静态背景
  main:  new Canvas('#main-canvas'),   // 主图形
  overlay: new Canvas('#overlay-canvas') // 选中态/工具
};

// 仅 main 层响应数据变更
// overlay 层响应 hover/select
// bg 层几乎不重绘`,
    icon: Layers,
    color: "var(--secondary)",
  },
];

/* ================================================================ */
/*  Interactive Canvas Demo Component                                */
/* ================================================================ */
function CanvasDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodeCount, setNodeCount] = useState(2000);
  const [fps, setFps] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [useSpatialOpt, setUseSpatialOpt] = useState(true);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<
    { x: number; y: number; vx: number; vy: number; r: number; color: string }[]
  >([]);
  const fpsFrames = useRef<number[]>([]);

  const COLORS = ["#8B5CF6", "#F472B6", "#FBBF24", "#34D399", "#60A5FA"];

  const initNodes = useCallback(
    (count: number, w: number, h: number) => {
      const nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          r: 3 + Math.random() * 5,
          color: COLORS[i % COLORS.length],
        });
      }
      nodesRef.current = nodes;
    },
    []
  );

  const draw = useCallback(
    (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d")!;
      const w = canvas.width;
      const h = canvas.height;
      const nodes = nodesRef.current;

      // Frame timing
      const now = performance.now();
      fpsFrames.current.push(now);
      fpsFrames.current = fpsFrames.current.filter((t) => now - t < 1000);
      setFps(fpsFrames.current.length);

      // Clear
      ctx.fillStyle = "#FFFDF5";
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = "#E2E8F0";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Spatial optimization: cull offscreen nodes
      const visible = useSpatialOpt
        ? nodes.filter(
            (n) =>
              n.x > -20 && n.x < w + 20 && n.y > -20 && n.y < h + 20
          )
        : nodes;

      // Update & draw
      visible.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
        ctx.strokeStyle = "#1E293B";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Draw connections for nearby nodes (limited)
      if (visible.length < 5000) {
        ctx.strokeStyle = "rgba(30,41,59,0.08)";
        ctx.lineWidth = 1;
        for (let i = 0; i < visible.length; i++) {
          for (let j = i + 1; j < Math.min(i + 8, visible.length); j++) {
            const dx = visible[i].x - visible[j].x;
            const dy = visible[i].y - visible[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 60) {
              ctx.beginPath();
              ctx.moveTo(visible[i].x, visible[i].y);
              ctx.lineTo(visible[j].x, visible[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Stats overlay
      ctx.fillStyle = "rgba(255,253,245,0.92)";
      ctx.strokeStyle = "#1E293B";
      ctx.lineWidth = 2;
      const bw = 220,
        bh = 70;
      roundRect(ctx, 12, 12, bw, bh, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#1E293B";
      ctx.font = "bold 13px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText(`节点: ${visible.length} / ${nodes.length}`, 24, 36);
      ctx.fillText(
        `FPS: ${fps}  |  ${useSpatialOpt ? "空间裁剪 ON" : "空间裁剪 OFF"}`,
        24,
        58
      );
    },
    [useSpatialOpt, fps]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(2, 2);
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    initNodes(nodeCount, rect.width, rect.height);

    const loop = () => {
      draw(canvas);
      if (isRunning) animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animRef.current);
  }, [nodeCount, isRunning, draw, initNodes]);

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    initNodes(nodeCount, rect.width, rect.height);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div
        className="flex flex-wrap items-center gap-3 rounded-[--radius-md] border-2 border-[var(--foreground)] bg-white p-4"
        style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
      >
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            节点数
          </label>
          <input
            type="range"
            min={500}
            max={20000}
            step={500}
            value={nodeCount}
            onChange={(e) => setNodeCount(Number(e.target.value))}
            className="accent-[var(--accent)]"
          />
          <span
            className="rounded-full border-2 border-[var(--foreground)] bg-[var(--accent)] px-3 py-0.5 text-xs font-bold text-white"
          >
            {nodeCount.toLocaleString()}
          </span>
        </div>

        <div className="h-6 w-px bg-[var(--border)]" />

        <button
          onClick={() => setIsRunning(!isRunning)}
          className="flex items-center gap-1.5 rounded-[--radius-sm] border-2 border-[var(--foreground)] bg-[var(--tertiary)] px-3 py-1.5 text-xs font-bold text-[var(--foreground)] transition-transform hover:scale-105"
          style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
        >
          {isRunning ? (
            <Pause size={14} strokeWidth={2.5} />
          ) : (
            <Play size={14} strokeWidth={2.5} />
          )}
          {isRunning ? "暂停" : "运行"}
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 rounded-[--radius-sm] border-2 border-[var(--foreground)] bg-[var(--card)] px-3 py-1.5 text-xs font-bold transition-transform hover:scale-105"
          style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
        >
          <RotateCcw size={14} strokeWidth={2.5} />
          重置
        </button>

        <div className="h-6 w-px bg-[var(--border)]" />

        <button
          onClick={() => setUseSpatialOpt(!useSpatialOpt)}
          className={`flex items-center gap-1.5 rounded-[--radius-sm] border-2 border-[var(--foreground)] px-3 py-1.5 text-xs font-bold transition-transform hover:scale-105 ${
            useSpatialOpt
              ? "bg-[var(--quaternary)] text-[var(--foreground)]"
              : "bg-[var(--border)] text-[var(--foreground)]"
          }`}
          style={{
            boxShadow: `4px 4px 0px 0px ${useSpatialOpt ? "var(--quaternary)" : "var(--border)"}`,
          }}
        >
          <Scan size={14} strokeWidth={2.5} />
          {useSpatialOpt ? "裁剪 ON" : "裁剪 OFF"}
        </button>
      </div>

      {/* Canvas */}
      <div
        className="relative overflow-hidden rounded-[--radius-lg] border-[3px] border-[var(--foreground)] bg-[var(--background)]"
        style={{ boxShadow: "8px 8px 0px 0px var(--accent)" }}
      >
        <canvas
          ref={canvasRef}
          className="block w-full"
          style={{ height: 420 }}
        />
        {/* FPS badge */}
        <div
          className="absolute right-4 top-4 flex items-center gap-2 rounded-[--radius-sm] border-2 border-[var(--foreground)] bg-white px-3 py-1.5"
          style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
        >
          <Activity size={14} strokeWidth={2.5} className="text-[var(--accent)]" />
          <span className="font-mono text-sm font-bold">{fps} FPS</span>
        </div>
      </div>
    </div>
  );
}

/* Helper: rounded rect */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ================================================================ */
/*  Main Page Component                                              */
/* ================================================================ */
export default function CanvasRenderingPipelinePage() {
  const [activeStage, setActiveStage] = useState(0);
  const [expandedTech, setExpandedTech] = useState<number | null>(0);

  return (
    <div className="bg-dot-grid min-h-screen pb-24">
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden container">
        {/* Decorative Blobs */}
        <div
          className="absolute -left-32 -top-32 h-[500px] w-[500px] opacity-20"
          style={{
            background: "var(--accent)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        <div
          className="absolute -right-20 bottom-0 h-[350px] w-[350px] opacity-15"
          style={{
            background: "var(--secondary)",
            borderRadius: "40% 60% 70% 30% / 30% 70% 30% 60%",
          }}
        />
        <div
          className="absolute right-1/4 top-10 h-[200px] w-[200px] opacity-10"
          style={{
            background: "var(--tertiary)",
            borderRadius: "50% 50% 30% 70% / 40% 60% 40% 60%",
          }}
        />

        <div className="container relative z-10 pt-20 md:pt-28">
          {/* Tag */}
          <div className="animate-pop mb-6 inline-flex items-center gap-2 rounded-[--radius-full] border-2 border-[var(--foreground)] bg-[var(--accent)] px-5 py-2" style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}>
            <Layers size={16} strokeWidth={2.5} className="text-white" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              图形引擎 · 渲染管线
            </span>
          </div>

          {/* Title */}
          <h1
            className="animate-pop font-outfit mb-6 max-w-4xl text-4xl font-[800] leading-[1.1] tracking-tight text-[var(--foreground)] md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            Canvas 渲染管线
            <br />
            <span
              className="relative inline-block"
              style={{ color: "var(--accent)" }}
            >
              与图形引擎
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M2 8 Q75 2 150 8 Q225 14 298 6"
                  stroke="var(--secondary)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-slide font-body mb-10 max-w-2xl text-lg leading-relaxed text-[var(--foreground)] opacity-80 md:text-xl"
            style={{ animationDelay: "0.2s" }}
          >
            基于 <strong>ZRender</strong> 封装数据驱动的 Canvas 图形库，解决
            <strong> 海量节点</strong>与<strong> 复杂交互</strong>场景下的性能瓶颈。从渲染管线拆解到工程化实践，深入每一层抽象。
          </p>

          {/* Stats row */}
          <div
            className="animate-slide mb-8 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4"
            style={{ animationDelay: "0.3s" }}
          >
            {[
              { value: "100K+", label: "节点支持", color: "var(--accent)" },
              { value: "< 16ms", label: "帧耗时", color: "var(--quaternary)" },
              { value: "5 层", label: "管线分层", color: "var(--tertiary)" },
              { value: "6 模块", label: "核心引擎", color: "var(--secondary)" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-[--radius-md] border-2 border-[var(--foreground)] bg-white p-4 text-center transition-transform hover:-rotate-1 hover:scale-105"
                style={{ boxShadow: `4px 4px 0px 0px ${s.color}` }}
              >
                <div
                  className="font-outfit text-2xl font-[800] md:text-3xl"
                  style={{ color: s.color }}
                >
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PIPELINE FLOW DIAGRAM                                       */}
      {/* ============================================================ */}
      <section className="container mt-20">
        <SectionHeader
          tag="管线架构"
          tagColor="var(--accent)"
          title="渲染管线 · 五层流水线"
          subtitle="数据从进入引擎到最终像素上屏，经过五个清晰解耦的处理阶段"
        />

        {/* Pipeline stages */}
        <div className="relative mt-12">
          {/* Connection line */}
          <div className="absolute left-8 top-0 hidden h-full w-0.8 md:left-12 md:block" style={{ borderLeft: "3px dashed var(--border)" }} />

          <div className="space-y-6">
            {PIPELINE_STAGES.map((stage, i) => {
              const Icon = stage.icon;
              const isActive = activeStage === i;
              return (
                <div
                  key={stage.id}
                  className="animate-slide relative cursor-pointer pl-20 md:pl-28"
                  style={{ animationDelay: `${i * 0.08}s` }}
                  onClick={() => setActiveStage(i)}
                >
                  {/* Node circle */}
                  <div
                    className="absolute left-3 top-4 flex h-10 w-10 items-center justify-center rounded-full border-[3px] transition-all md:left-7 md:h-12 md:w-12"
                    style={{
                      borderColor: isActive ? stage.color : "var(--border)",
                      background: isActive ? stage.color : "var(--card)",
                      boxShadow: isActive
                        ? `0 0 0 4px ${stage.color}33, 4px 4px 0 0 var(--foreground)`
                        : "4px 4px 0px 0px var(--foreground)",
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={2.5}
                      className={isActive ? "text-white" : "text-[var(--foreground)]"}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`topic-card rounded-[--radius-md] p-5 transition-all md:p-6 ${
                      isActive ? "ring-2" : ""
                    }`}
                    style={{
                      boxShadow: isActive
                        ? `8px 8px 0px 0px ${stage.color}`
                        : "8px 8px 0px 0px var(--foreground)",
                      ...(isActive
                        ? { ["--tw-ring-color" as string]: stage.color }
                        : {}),
                    }}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="rounded-[--radius-sm] px-3 py-1 text-xs font-bold uppercase tracking-widest"
                        style={{
                          background: stage.color,
                          color: "white",
                        }}
                      >
                        Stage {i + 1}
                      </span>
                      <span
                        className="rounded-[--radius-full] border-2 px-3 py-0.5 text-xs font-bold"
                        style={{
                          borderColor: stage.color,
                          color: stage.color,
                        }}
                      >
                        {stage.label}
                      </span>
                      <h3 className="font-outfit text-xl font-[800] text-[var(--foreground)] md:text-2xl">
                        {stage.title}
                      </h3>
                    </div>
                    <p className="font-body mt-2 text-sm leading-relaxed text-[var(--foreground)] opacity-70">
                      {stage.desc}
                    </p>

                    {/* Details (expanded) */}
                    {isActive && (
                      <div className="animate-pop mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {stage.details.map((d, di) => (
                          <div
                            key={di}
                            className="flex items-start gap-2 rounded-[--radius-sm] border-2 border-[var(--border)] bg-[var(--background)] px-3 py-2"
                          >
                            <ChevronRight
                              size={14}
                              strokeWidth={2.5}
                              style={{ color: stage.color }}
                              className="mt-0.5 shrink-0"
                            />
                            <span className="text-xs font-semibold text-[var(--foreground)]">
                              {d}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PERFORMANCE BENCHMARKS                                      */}
      {/* ============================================================ */}
      <section className="container mt-24">
        <SectionHeader
          tag="性能基准"
          tagColor="var(--tertiary)"
          title="量级碾压 · 性能对比"
          subtitle="通过管线优化，在相同硬件条件下实现数量级的性能提升"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {BENCHMARKS.map((b, i) => {
            const Icon = b.icon;
            const ratio = b.naive / b.optimized;
            return (
              <div
                key={b.metric}
                className="animate-slide group rounded-[--radius-lg] border-2 border-[var(--foreground)] bg-white p-6 transition-all hover:-rotate-1 hover:scale-[1.02]"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  boxShadow: `8px 8px 0px 0px ${b.color}`,
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-[--radius-md] border-2 border-[var(--foreground)]"
                      style={{ background: b.color }}
                    >
                      <Icon size={22} strokeWidth={2.5} className="text-white" />
                    </div>
                    <div>
                      <div className="font-outfit text-sm font-bold uppercase tracking-wider text-[var(--foreground)] opacity-50">
                        {b.metric}
                      </div>
                      <div className="font-body text-xs text-[var(--foreground)] opacity-60">
                        {b.label}
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-[--radius-full] border-2 border-[var(--foreground)] px-3 py-1 text-xs font-bold"
                    style={{ background: `${b.color}22`, color: b.color }}
                  >
                    {ratio.toFixed(0)}× 提升
                  </div>
                </div>

                {/* Bar chart */}
                <div className="mt-5 space-y-3">
                  <div>
                    <div className="mb-1 flex justify-between text-xs font-bold">
                      <span className="text-[var(--foreground)] opacity-50">
                        原始方案
                      </span>
                      <span className="font-mono text-[var(--foreground)]">
                        {b.naive.toLocaleString()} {b.unit}
                      </span>
                    </div>
                    <div
                      className="h-6 overflow-hidden rounded-[--radius-sm] border-2 border-[var(--foreground)]"
                      style={{ background: "var(--border)" }}
                    >
                      <div
                        className="h-full rounded-[--radius-sm] transition-all"
                        style={{
                          width: "100%",
                          background: "var(--foreground)",
                          opacity: 0.2,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-xs font-bold">
                      <span style={{ color: b.color }}>优化方案</span>
                      <span className="font-mono font-bold" style={{ color: b.color }}>
                        {b.optimized.toLocaleString()} {b.unit}
                      </span>
                    </div>
                    <div
                      className="h-6 overflow-hidden rounded-[--radius-sm] border-2 border-[var(--foreground)]"
                      style={{ background: `${b.color}15` }}
                    >
                      <div
                        className="animate-slide h-full rounded-[--radius-sm]"
                        style={{
                          width: `${(b.optimized / b.naive) * 100}%`,
                          background: b.color,
                          animationDelay: `${i * 0.15 + 0.3}s`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ARCHITECTURE MODULES (Bento Grid)                           */}
      {/* ============================================================ */}
      <section className="container mt-24">
        <SectionHeader
          tag="引擎架构"
          tagColor="var(--secondary)"
          title="六大核心模块"
          subtitle="模块化设计，每个组件独立可测试、可替换，通过事件总线松耦合"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ARCH_MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.name}
                className="animate-slide group relative overflow-hidden rounded-[--radius-lg] border-2 border-[var(--foreground)] bg-white p-6 transition-all hover:-rotate-1 hover:scale-[1.02]"
                style={{
                  animationDelay: `${i * 0.07}s`,
                  boxShadow: "8px 8px 0px 0px var(--foreground)",
                }}
              >
                {/* Background decoration */}
                <div
                  className="absolute -right-8 -top-8 h-24 w-24 opacity-10 transition-transform group-hover:scale-125"
                  style={{
                    background: mod.color,
                    borderRadius: "50%",
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[--radius-md] border-[3px] border-[var(--foreground)]"
                    style={{ background: mod.color }}
                  >
                    <Icon size={24} strokeWidth={2.5} className="text-white" />
                  </div>
                  <div className="font-mono mb-1 text-xs font-bold tracking-wider opacity-40">
                    {mod.name}
                  </div>
                  <h3 className="font-outfit text-lg font-[800] text-[var(--foreground)]">
                    {mod.role}
                  </h3>
                  <p className="font-body mt-2 text-sm leading-relaxed text-[var(--foreground)] opacity-60">
                    {mod.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Connection diagram hint */}
        <div
          className="animate-slide mt-8 flex items-center justify-center gap-3 rounded-[--radius-md] border-2 border-dashed border-[var(--foreground)] bg-[var(--background)] px-6 py-3"
          style={{ animationDelay: "0.5s" }}
        >
          <GitMerge size={16} strokeWidth={2.5} className="text-[var(--accent)]" />
          <span className="font-body text-sm font-semibold text-[var(--foreground)] opacity-60">
            模块间通过 <strong className="text-[var(--accent)]">EventBus</strong>{" "}
            松耦合通信，支持运行时热插拔
          </span>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  KEY TECHNIQUES (Accordion Code Blocks)                      */}
      {/* ============================================================ */}
      <section className="container mt-24">
        <SectionHeader
          tag="核心技法"
          tagColor="var(--quaternary)"
          title="引擎优化三板斧"
          subtitle="对象池、增量渲染、分层 Canvas —— 解决性能问题的三大核心策略"
        />

        <div className="mt-12 space-y-5">
          {TECHNIQUES.map((tech, i) => {
            const Icon = tech.icon;
            const isOpen = expandedTech === i;
            return (
              <div
                key={tech.title}
                className="animate-slide rounded-[--radius-lg] border-2 border-[var(--foreground)] bg-white transition-all"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  boxShadow: isOpen
                    ? `8px 8px 0px 0px ${tech.color}`
                    : "8px 8px 0px 0px var(--foreground)",
                }}
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedTech(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 p-5 text-left md:p-6"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[--radius-md] border-2 border-[var(--foreground)]"
                    style={{ background: tech.color }}
                  >
                    <Icon size={22} strokeWidth={2.5} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-outfit text-lg font-[800] text-[var(--foreground)] md:text-xl">
                      {tech.title}
                    </h3>
                    <p className="font-body mt-0.5 text-sm text-[var(--foreground)] opacity-60">
                      {tech.desc}
                    </p>
                  </div>
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[var(--foreground)] transition-transform"
                    style={{
                      background: isOpen ? tech.color : "var(--card)",
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                  >
                    <ChevronRight
                      size={16}
                      strokeWidth={2.5}
                      className={isOpen ? "text-white" : "text-[var(--foreground)]"}
                    />
                  </div>
                </button>

                {/* Code */}
                {isOpen && (
                  <div className="animate-pop border-t-2 border-[var(--border)] px-5 pb-5 pt-4 md:px-6">
                    <div
                      className="overflow-x-auto rounded-[--radius-md] border-2 border-[var(--foreground)] p-5"
                      style={{
                        background: "#1E293B",
                        boxShadow: "4px 4px 0px 0px var(--foreground)",
                      }}
                    >
                      <pre className="font-mono text-sm leading-relaxed">
                        <code className="text-green-300">{tech.code}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  INTERACTIVE PLAYGROUND                                      */}
      {/* ============================================================ */}
      <section className="container mt-24">
        <SectionHeader
          tag="交互实验场"
          tagColor="var(--accent)"
          title="实时渲染沙盒"
          subtitle="调节节点数量与空间裁剪开关，亲身体验优化前后的帧率差异"
        />

        <div className="mt-12">
          <CanvasDemo />
        </div>

        {/* Tips */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              icon: Eye,
              title: "空间裁剪",
              desc: "视锥外的节点直接跳过绘制，FPS 立竿见影",
              color: "var(--accent)",
            },
            {
              icon: Zap,
              title: "批量绘制",
              desc: "相同样式的节点合并 Path 一次 stroke/fill",
              color: "var(--tertiary)",
            },
            {
              icon: RefreshCw,
              title: "脏区重绘",
              desc: "仅重绘发生变化的矩形区域，减少像素写入",
              color: "var(--quaternary)",
            },
          ].map((tip) => {
            const TipIcon = tip.icon;
            return (
              <div
                key={tip.title}
                className="flex items-start gap-3 rounded-[--radius-md] border-2 border-[var(--foreground)] bg-[var(--background)] p-4"
                style={{ boxShadow: `4px 4px 0px 0px ${tip.color}` }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[--radius-sm] border-2 border-[var(--foreground)]"
                  style={{ background: tip.color }}
                >
                  <TipIcon size={18} strokeWidth={2.5} className="text-white" />
                </div>
                <div>
                  <h4 className="font-outfit text-sm font-bold text-[var(--foreground)]">
                    {tip.title}
                  </h4>
                  <p className="font-body mt-0.5 text-xs text-[var(--foreground)] opacity-60">
                    {tip.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DATA FLOW SUMMARY                                           */}
      {/* ============================================================ */}
      <section className="container mt-24">
        <SectionHeader
          tag="总结"
          tagColor="var(--secondary)"
          title="数据驱动 · 声明式渲染"
          subtitle="一套完整的从数据到像素的映射关系"
        />

        <div
          className="animate-slide mt-12 overflow-hidden rounded-[--radius-lg] border-[3px] border-[var(--foreground)] bg-white"
          style={{ boxShadow: "12px 12px 0px 0px var(--accent)" }}
        >
          <div className="border-b-2 border-[var(--foreground)] bg-[var(--accent)] px-6 py-3">
            <span className="font-mono text-sm font-bold text-white">
              Data → Render Pipeline Flow
            </span>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {[
                { label: "JSON Schema", bg: "var(--accent)" },
                { label: "Parser", bg: "var(--secondary)" },
                { label: "Display List", bg: "var(--tertiary)" },
                { label: "Layout", bg: "var(--quaternary)" },
                { label: "Scene Graph", bg: "var(--accent)" },
                { label: "Culling", bg: "var(--secondary)" },
                { label: "Canvas Draw", bg: "var(--tertiary)" },
                { label: "Pixels", bg: "var(--quaternary)" },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-center gap-2 md:gap-3">
                  <div
                    className="animate-pop rounded-[--radius-sm] border-2 border-[var(--foreground)] px-3 py-2 text-center"
                    style={{
                      background: step.bg,
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                      animationDelay: `${i * 0.08}s`,
                    }}
                  >
                    <span className="font-mono text-xs font-bold text-white">
                      {step.label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight
                      size={16}
                      strokeWidth={2.5}
                      className="shrink-0 text-[var(--foreground)] opacity-30"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Bottom note */}
            <div className="mt-8 flex items-start gap-3 rounded-[--radius-md] border-2 border-dashed border-[var(--tertiary)] bg-[var(--background)] p-4">
              <Info
                size={18}
                strokeWidth={2.5}
                className="mt-0.5 shrink-0 text-[var(--tertiary)]"
              />
              <div className="font-body text-sm leading-relaxed text-[var(--foreground)] opacity-70">
                <strong>核心理念：</strong>
                上层业务只需要描述 <em>"数据长什么样"</em>
                ，无需关心 <em>"怎么画"</em>。
                引擎负责将声明式数据自动映射为高效的 Canvas 绘制命令，
                并通过空间索引与脏区机制最小化每帧的计算与绘制开销。
                这就是 <strong>数据驱动 Canvas</strong> 的本质。
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER DECORATION                                           */}
      {/* ============================================================ */}
      <div className="container mt-20 flex justify-center">
        <div className="flex items-center gap-3">
          <div
            className="h-3 w-3 rounded-full border-2 border-[var(--foreground)]"
            style={{ background: "var(--accent)" }}
          />
          <div
            className="h-3 w-3 rounded-full border-2 border-[var(--foreground)]"
            style={{ background: "var(--secondary)" }}
          />
          <div
            className="h-3 w-3 rounded-full border-2 border-[var(--foreground)]"
            style={{ background: "var(--tertiary)" }}
          />
          <div
            className="h-3 w-3 rounded-full border-2 border-[var(--foreground)]"
            style={{ background: "var(--quaternary)" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ================================================================ */
/*  Section Header Component                                         */
/* ================================================================ */
function SectionHeader({
  tag,
  tagColor,
  title,
  subtitle,
}: {
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-2xl">
      <div
        className="animate-pop mb-4 inline-flex items-center gap-2 rounded-[--radius-full] border-2 border-[var(--foreground)] px-4 py-1.5"
        style={{ background: `${tagColor}22`, boxShadow: "4px 4px 0px 0px var(--foreground)" }}
      >
        <div
          className="h-2.5 w-2.5 rounded-full border-2 border-[var(--foreground)]"
          style={{ background: tagColor }}
        />
        <span
          className="font-outfit text-xs font-bold uppercase tracking-widest"
          style={{ color: tagColor }}
        >
          {tag}
        </span>
      </div>
      <h2 className="animate-pop font-outfit text-3xl font-[800] tracking-tight text-[var(--foreground)] md:text-4xl" style={{ animationDelay: "0.05s" }}>
        {title}
      </h2>
      <p className="animate-slide font-body mt-3 text-base leading-relaxed text-[var(--foreground)] opacity-60 md:text-lg" style={{ animationDelay: "0.1s" }}>
        {subtitle}
      </p>
    </div>
  );
}