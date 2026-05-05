// app/knowledge/javascript-event-loop/page.tsx

import Link from "next/link";
import {
  ArrowLeft,
  RotateCcw,
  Layers,
  Globe,
  ListOrdered,
  Zap,
  Timer,
  Code2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  BrainCircuit,
  Workflow,
  Boxes,
  CircleDot,
  ChevronRight,
} from "lucide-react";

export default function EventLoopPage() {
  /* ── 事件循环执行步骤数据 ── */
  const loopSteps = [
    {
      icon: <Layers size={22} strokeWidth={2.5} />,
      title: "执行调用栈",
      desc: "同步代码直接推入 Call Stack，按后进先出（LIFO）顺序执行。",
      color: "var(--accent)",
      bg: "var(--accent)",
    },
    {
      icon: <Globe size={22} strokeWidth={2.5} />,
      title: "处理 Web API",
      desc: "遇到 setTimeout / fetch / DOM 事件等，交由浏览器 Web API 线程异步处理。",
      color: "var(--secondary)",
      bg: "var(--secondary)",
    },
    {
      icon: <Zap size={22} strokeWidth={2.5} />,
      title: "清空微任务队列",
      desc: "调用栈每清空一次，立即清空所有 Microtask（Promise.then / MutationObserver）。",
      color: "var(--quaternary)",
      bg: "var(--quaternary)",
    },
    {
      icon: <Timer size={22} strokeWidth={2.5} />,
      title: "取出一个宏任务",
      desc: "从 Macrotask 队列取出一个任务推入调用栈，然后回到步骤 1。",
      color: "var(--tertiary)",
      bg: "var(--tertiary)",
    },
  ];

  /* ── 宏任务 vs 微任务对比数据 ── */
  const macroTasks = [
    "setTimeout / setInterval",
    "setImmediate (Node.js)",
    "I/O 操作",
    "UI 渲染 (requestAnimationFrame)",
    "MessageChannel",
    "requestAnimationFrame",
  ];

  const microTasks = [
    "Promise.then / catch / finally",
    "async/await (await 之后的代码)",
    "MutationObserver",
    "queueMicrotask()",
    "process.nextTick (Node.js)",
  ];

  /* ── 经典输出题 ── */
  const codeExamples = [
    {
      title: "经典面试题 #1：基础宏微任务",
      code: `console.log('1 - 同步');

setTimeout(() => {
  console.log('2 - 宏任务');
}, 0);

Promise.resolve().then(() => {
  console.log('3 - 微任务');
});

console.log('4 - 同步');`,
      output: ["1 - 同步", "4 - 同步", "3 - 微任务", "2 - 宏任务"],
      explanation:
        "同步代码 1、4 先执行 → 调用栈清空 → 清空微任务队列（3）→ 取出宏任务（2）。",
      difficulty: "基础",
    },
    {
      title: "经典面试题 #2：微任务优先级",
      code: `Promise.resolve()
  .then(() => console.log('微任务1'))
  .then(() => console.log('微任务2'));

Promise.resolve()
  .then(() => console.log('微任务3'));

console.log('同步');`,
      output: ["同步", "微任务1", "微任务3", "微任务2"],
      explanation:
        "两个 Promise 各自的 .then 链是独立注册的。微任务队列中：微任务1 → 微任务3 → 微任务2（因为微任务2 依赖微任务1 完成后才入队）。",
      difficulty: "进阶",
    },
    {
      title: "经典面试题 #3：async/await 的本质",
      code: `async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');
async1();
new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});
console.log('script end');`,
      output: [
        "script start",
        "async1 start",
        "async2",
        "promise1",
        "script end",
        "async1 end",
        "promise2",
      ],
      explanation:
        "await async2() 后面的代码相当于放入微任务队列。执行完同步代码后，先执行 async1 end（微任务1），再执行 promise2（微任务2）。",
      difficulty: "高级",
    },
    {
      title: "经典面试题 #4：宏任务嵌套微任务",
      code: `console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => console.log('3'));
}, 0);

setTimeout(() => {
  console.log('4');
}, 0);

Promise.resolve().then(() => console.log('5'));

console.log('6');`,
      output: ["1", "6", "5", "2", "3", "4"],
      explanation:
        "同步 1,6 → 微任务 5 → 第一个宏任务(2) → 产生的微任务(3) → 第二个宏任务(4)。注意：每执行完一个宏任务都要清空全部微任务。",
      difficulty: "进阶",
    },
  ];

  return (
    <main className="bg-dot-grid min-h-screen pb-24">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="container mt-12 animate-pop">
        <div className="relative">
          {/* 装饰 Blob */}
          <div
            className="absolute -top-16 -right-16 w-48 h-48 opacity-20 pointer-events-none"
            style={{
              background: "var(--accent)",
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-32 h-32 opacity-15 pointer-events-none"
            style={{
              background: "var(--secondary)",
              borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
            }}
          />

          {/* 标签 */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-widest"
              style={{
                background: "var(--accent)",
                color: "white",
                border: "2px solid var(--foreground)",
                borderRadius: "var(--radius-full)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <CircleDot size={12} strokeWidth={2.5} />
              JavaScript 核心
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-widest"
              style={{
                background: "var(--tertiary)",
                color: "var(--foreground)",
                border: "2px solid var(--foreground)",
                borderRadius: "var(--radius-full)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <BrainCircuit size={12} strokeWidth={2.5} />
              面试高频
            </span>
          </div>

          {/* 主标题 */}
          <h1
            className="font-outfit font-extrabold leading-tight mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--foreground)" }}
          >
            详解 JavaScript{" "}
            <span style={{ color: "var(--accent)" }}>事件循环</span>
          </h1>

          <p
            className="font-body max-w-3xl text-lg leading-relaxed"
            style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}
          >
            事件循环（Event Loop）是 JavaScript 实现异步的核心机制。由于 JS 是单线程语言，
            它通过事件循环在「调用栈」「Web API」「任务队列」之间协调工作，
            让非阻塞的异步编程成为可能。
          </p>
        </div>
      </section>

      {/* ═══════════════ 核心概念：为什么需要事件循环 ═══════════════ */}
      <section className="container mt-16 animate-slide">
        <div
          className="topic-card p-6 md:p-8"
          style={{
            borderLeft: "5px solid var(--accent)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="shrink-0 w-12 h-12 flex items-center justify-center"
              style={{
                background: "var(--accent)",
                color: "white",
                border: "2px solid var(--foreground)",
                borderRadius: "var(--radius-md)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <AlertTriangle size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h2
                className="font-outfit font-extrabold text-xl md:text-2xl mb-3"
                style={{ color: "var(--foreground)" }}
              >
                为什么需要事件循环？
              </h2>
              <div
                className="font-body text-base leading-relaxed space-y-3"
                style={{ color: "color-mix(in srgb, var(--foreground) 75%, transparent)" }}
              >
                <p>
                  JavaScript 引擎（如 V8）是<strong className="font-bold" style={{ color: "var(--foreground)" }}>单线程</strong>的，
                  同一时刻只能执行一段代码。如果所有操作都是同步的，一个网络请求就可能阻塞整个页面。
                </p>
                <p>
                  事件循环的出现，就是为了解决这个矛盾：让耗时操作（网络请求、定时器、用户交互）
                  <strong className="font-bold" style={{ color: "var(--accent)" }}>委托给浏览器的其他线程</strong>
                  处理，主线程继续执行后续代码，等异步操作完成后再回调处理结果。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 核心架构图 ═══════════════ */}
      <section className="container mt-16 animate-slide" style={{ animationDelay: "0.1s" }}>
        <h2
          className="font-outfit font-extrabold text-2xl md:text-3xl mb-8"
          style={{ color: "var(--foreground)" }}
        >
          <span
            className="inline-block px-3 py-1 mr-3 text-sm uppercase tracking-widest font-bold"
            style={{
              background: "var(--tertiary)",
              color: "var(--foreground)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
              transform: "rotate(-2deg)",
            }}
          >
            架构
          </span>
          事件循环全景图
        </h2>

        {/* 可视化架构 */}
        <div
          className="topic-card p-6 md:p-10"
          style={{
            background: "var(--card)",
          }}
        >
          {/* 四大组件 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 调用栈 */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: "color-mix(in srgb, var(--accent) 8%, white)",
                border: "2px solid var(--foreground)",
                boxShadow: "6px 6px 0px 0px var(--accent)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-lg"
                  style={{
                    background: "var(--accent)",
                    color: "white",
                    border: "2px solid var(--foreground)",
                  }}
                >
                  <Layers size={18} strokeWidth={2.5} />
                </div>
                <h3 className="font-outfit font-bold text-lg" style={{ color: "var(--accent)" }}>
                  调用栈 Call Stack
                </h3>
              </div>
              <p className="font-body text-sm leading-relaxed" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}>
                记录函数执行上下文的栈结构，遵循 <strong>LIFO（后进先出）</strong> 原则。
                每调用一个函数就压栈，执行完毕就弹栈。栈空时，事件循环开始检查任务队列。
              </p>
              <div
                className="mt-4 flex flex-col items-center gap-1.5"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {["main()", "fetchData()", "parseJSON()"].map((item, i) => (
                  <div
                    key={i}
                    className="w-full max-w-[200px] text-center py-2 px-4 text-xs font-bold"
                    style={{
                      background: i === 0 ? "var(--accent)" : i === 1 ? "#a78bfa" : "#c4b5fd",
                      color: "white",
                      border: "2px solid var(--foreground)",
                      borderRadius: "var(--radius-sm)",
                      opacity: 1 - i * 0.15,
                      transform: `translateX(${i * 4}px)`,
                    }}
                  >
                    {item} {i === 2 && "← 栈顶"}
                  </div>
                ))}
              </div>
            </div>

            {/* Web APIs */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: "color-mix(in srgb, var(--secondary) 8%, white)",
                border: "2px solid var(--foreground)",
                boxShadow: "6px 6px 0px 0px var(--secondary)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-lg"
                  style={{
                    background: "var(--secondary)",
                    color: "white",
                    border: "2px solid var(--foreground)",
                  }}
                >
                  <Globe size={18} strokeWidth={2.5} />
                </div>
                <h3 className="font-outfit font-bold text-lg" style={{ color: "var(--secondary)" }}>
                  Web APIs（宿主环境）
                </h3>
              </div>
              <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}>
                浏览器（或 Node.js）提供的多线程异步接口，包括：
              </p>
              <div className="flex flex-wrap gap-2">
                {["setTimeout", "fetch", "DOM 事件", "XMLHttpRequest", "addEventListener", "IntersectionObserver"].map(
                  (api) => (
                    <span
                      key={api}
                      className="px-2.5 py-1 text-xs font-bold"
                      style={{
                        background: "white",
                        color: "var(--foreground)",
                        border: "2px solid var(--foreground)",
                        borderRadius: "var(--radius-full)",
                      }}
                    >
                      {api}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* 宏任务队列 */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: "color-mix(in srgb, var(--tertiary) 8%, white)",
                border: "2px solid var(--foreground)",
                boxShadow: "6px 6px 0px 0px var(--tertiary)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-lg"
                  style={{
                    background: "var(--tertiary)",
                    color: "var(--foreground)",
                    border: "2px solid var(--foreground)",
                  }}
                >
                  <Timer size={18} strokeWidth={2.5} />
                </div>
                <h3 className="font-outfit font-bold text-lg" style={{ color: "var(--foreground)" }}>
                  宏任务队列 Macrotask
                </h3>
              </div>
              <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}>
                也叫 Task Queue，每轮事件循环只取 <strong>一个</strong> 宏任务执行。
              </p>
              <div className="space-y-1.5">
                {macroTasks.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold"
                    style={{
                      background: "white",
                      border: "1.5px solid var(--border)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    <ChevronRight size={12} strokeWidth={3} style={{ color: "var(--tertiary)" }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* 微任务队列 */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: "color-mix(in srgb, var(--quaternary) 8%, white)",
                border: "2px solid var(--foreground)",
                boxShadow: "6px 6px 0px 0px var(--quaternary)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-lg"
                  style={{
                    background: "var(--quaternary)",
                    color: "white",
                    border: "2px solid var(--foreground)",
                  }}
                >
                  <Zap size={18} strokeWidth={2.5} />
                </div>
                <h3 className="font-outfit font-bold text-lg" style={{ color: "var(--quaternary)" }}>
                  微任务队列 Microtask
                </h3>
              </div>
              <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}>
                优先级高于宏任务，每轮事件循环会 <strong>清空所有</strong> 微任务。
              </p>
              <div className="space-y-1.5">
                {microTasks.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold"
                    style={{
                      background: "white",
                      border: "1.5px solid var(--border)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    <Zap size={10} strokeWidth={3} style={{ color: "var(--quaternary)" }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 流程箭头示意 */}
          <div className="mt-8 p-5 rounded-xl" style={{ background: "var(--background)", border: "2px dashed var(--border)" }}>
            <p className="font-outfit font-bold text-center text-sm uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              ⚡ 一轮事件循环的完整流程
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 text-xs font-bold font-outfit">
              {loopSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl min-w-[140px] text-center"
                    style={{
                      background: `color-mix(in srgb, ${step.bg} 12%, white)`,
                      border: "2px solid var(--foreground)",
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                    }}
                  >
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-full"
                      style={{
                        background: step.bg,
                        color: step.bg === "var(--tertiary)" ? "var(--foreground)" : "white",
                        border: "2px solid var(--foreground)",
                      }}
                    >
                      {step.icon}
                    </div>
                    <span style={{ color: "var(--foreground)" }}>{step.title}</span>
                  </div>
                  {i < loopSteps.length - 1 && (
                    <span
                      className="hidden md:block text-xl font-bold px-1"
                      style={{ color: "var(--foreground)" }}
                    >
                      →
                    </span>
                  )}
                  {i < loopSteps.length - 1 && (
                    <span
                      className="block md:hidden text-xl font-bold py-1"
                      style={{ color: "var(--foreground)" }}
                    >
                      ↓
                    </span>
                  )}
                </div>
              ))}
              <span className="hidden md:block text-xl font-bold px-1" style={{ color: "var(--accent)" }}>
                ↩
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 事件循环详细执行步骤 ═══════════════ */}
      <section className="container mt-16 animate-slide" style={{ animationDelay: "0.15s" }}>
        <h2
          className="font-outfit font-extrabold text-2xl md:text-3xl mb-8"
          style={{ color: "var(--foreground)" }}
        >
          <span
            className="inline-block px-3 py-1 mr-3 text-sm uppercase tracking-widest font-bold"
            style={{
              background: "var(--quaternary)",
              color: "var(--foreground)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
              transform: "rotate(1deg)",
            }}
          >
            详解
          </span>
          事件循环的执行步骤
        </h2>

        <div className="relative">
          {/* 时间轴连接线 */}
          <div
            className="hidden md:block absolute left-[28px] top-0 bottom-0"
            style={{ borderLeft: "3px dashed var(--border)" }}
          />

          <div className="space-y-6">
            {loopSteps.map((step, i) => (
              <div key={i} className="relative flex gap-5 animate-slide" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                {/* 步骤编号 */}
                <div
                  className="relative z-10 shrink-0 w-14 h-14 flex items-center justify-center font-outfit font-extrabold text-xl"
                  style={{
                    background: step.bg,
                    color: step.bg === "var(--tertiary)" ? "var(--foreground)" : "white",
                    border: "3px solid var(--foreground)",
                    borderRadius: "var(--radius-full)",
                    boxShadow: `4px 4px 0px 0px var(--foreground)`,
                  }}
                >
                  {i + 1}
                </div>

                {/* 内容卡片 */}
                <div
                  className="topic-card flex-1 p-5"
                  style={{
                    borderLeft: `4px solid ${step.color}`,
                  }}
                >
                  <h3 className="font-outfit font-bold text-lg mb-2 flex items-center gap-2" style={{ color: step.color }}>
                    {step.icon}
                    {step.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 宏任务 vs 微任务 对比 ═══════════════ */}
      <section className="container mt-16 animate-slide" style={{ animationDelay: "0.2s" }}>
        <h2
          className="font-outfit font-extrabold text-2xl md:text-3xl mb-8"
          style={{ color: "var(--foreground)" }}
        >
          <span
            className="inline-block px-3 py-1 mr-3 text-sm uppercase tracking-widest font-bold"
            style={{
              background: "var(--secondary)",
              color: "white",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
              transform: "rotate(-1deg)",
            }}
          >
            对比
          </span>
          宏任务 vs 微任务
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 宏任务 */}
          <div
            className="topic-card p-6"
            style={{
              borderTop: "5px solid var(--tertiary)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 flex items-center justify-center rounded-xl"
                style={{
                  background: "var(--tertiary)",
                  color: "var(--foreground)",
                  border: "2px solid var(--foreground)",
                  boxShadow: "3px 3px 0px 0px var(--foreground)",
                }}
              >
                <Timer size={20} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-outfit font-bold text-lg" style={{ color: "var(--tertiary)" }}>
                  Macrotask（宏任务）
                </h3>
                <p className="text-xs font-body" style={{ color: "color-mix(in srgb, var(--foreground) 50%, transparent)" }}>
                  每次事件循环取一个
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {macroTasks.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-body font-medium"
                  style={{
                    background: i % 2 === 0 ? "color-mix(in srgb, var(--tertiary) 6%, white)" : "white",
                    border: "1.5px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <span
                    className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0"
                    style={{
                      background: "var(--tertiary)",
                      color: "var(--foreground)",
                      border: "1.5px solid var(--foreground)",
                    }}
                  >
                    {i + 1}
                  </span>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* 微任务 */}
          <div
            className="topic-card p-6"
            style={{
              borderTop: "5px solid var(--quaternary)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 flex items-center justify-center rounded-xl"
                style={{
                  background: "var(--quaternary)",
                  color: "white",
                  border: "2px solid var(--foreground)",
                  boxShadow: "3px 3px 0px 0px var(--foreground)",
                }}
              >
                <Zap size={20} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-outfit font-bold text-lg" style={{ color: "var(--quaternary)" }}>
                  Microtask（微任务）
                </h3>
                <p className="text-xs font-body" style={{ color: "color-mix(in srgb, var(--foreground) 50%, transparent)" }}>
                  每轮清空全部微任务
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {microTasks.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-body font-medium"
                  style={{
                    background: i % 2 === 0 ? "color-mix(in srgb, var(--quaternary) 6%, white)" : "white",
                    border: "1.5px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <span
                    className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0"
                    style={{
                      background: "var(--quaternary)",
                      color: "white",
                      border: "1.5px solid var(--foreground)",
                    }}
                  >
                    {i + 1}
                  </span>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 优先级说明 */}
        <div
          className="mt-6 topic-card p-5 flex items-start gap-4"
          style={{
            borderLeft: "5px solid var(--secondary)",
          }}
        >
          <div
            className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full"
            style={{
              background: "var(--secondary)",
              color: "white",
              border: "2px solid var(--foreground)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
            }}
          >
            <AlertTriangle size={18} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="font-outfit font-bold mb-1" style={{ color: "var(--secondary)" }}>
              关键优先级规则
            </h4>
            <p className="font-body text-sm leading-relaxed" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}>
              微任务的执行优先级 <strong className="font-bold" style={{ color: "var(--foreground)" }}>远高于</strong> 宏任务。
              事件循环在每次执行完一个宏任务（或同步代码）后，会优先清空整个微任务队列，
              只有微任务队列为空时才会取出下一个宏任务。这意味着如果微任务不断产生新的微任务，
              宏任务将被<strong className="font-bold" style={{ color: "var(--secondary)" }}>无限期推迟</strong>。
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ 经典代码输出题 ═══════════════ */}
      <section className="container mt-16 animate-slide" style={{ animationDelay: "0.25s" }}>
        <h2
          className="font-outfit font-extrabold text-2xl md:text-3xl mb-8"
          style={{ color: "var(--foreground)" }}
        >
          <span
            className="inline-block px-3 py-1 mr-3 text-sm uppercase tracking-widest font-bold"
            style={{
              background: "var(--accent)",
              color: "white",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
              transform: "rotate(-1deg)",
            }}
          >
            练习
          </span>
          经典输出题详解
        </h2>

        <div className="space-y-8">
          {codeExamples.map((ex, idx) => {
            const difficultyColor =
              ex.difficulty === "基础"
                ? "var(--quaternary)"
                : ex.difficulty === "进阶"
                  ? "var(--tertiary)"
                  : "var(--secondary)";

            return (
              <div key={idx} className="animate-slide" style={{ animationDelay: `${0.3 + idx * 0.1}s` }}>
                <div className="topic-card overflow-hidden">
                  {/* 题目标题 */}
                  <div
                    className="px-6 py-4 flex flex-wrap items-center justify-between gap-3"
                    style={{
                      borderBottom: "2px solid var(--foreground)",
                      background: "color-mix(in srgb, var(--accent) 4%, white)",
                    }}
                  >
                    <h3 className="font-outfit font-bold text-lg flex items-center gap-2">
                      <Code2 size={20} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
                      {ex.title}
                    </h3>
                    <span
                      className="px-3 py-1 text-xs font-bold uppercase tracking-wider"
                      style={{
                        background: difficultyColor,
                        color: difficultyColor === "var(--tertiary)" ? "var(--foreground)" : "white",
                        border: "2px solid var(--foreground)",
                        borderRadius: "var(--radius-full)",
                        boxShadow: "3px 3px 0px 0px var(--foreground)",
                      }}
                    >
                      {ex.difficulty}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* 代码区 */}
                    <div
                      className="p-5"
                      style={{
                        borderRight: "2px solid var(--border)",
                        background: "#1E293B",
                      }}
                    >
                      <p
                        className="font-outfit font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-1.5"
                        style={{ color: "#94a3b8" }}
                      >
                        <Code2 size={12} strokeWidth={2.5} />
                        代码
                      </p>
                      <pre
                        className="font-mono text-sm leading-relaxed overflow-x-auto"
                        style={{ color: "#e2e8f0" }}
                      >
                        <code>{ex.code}</code>
                      </pre>
                    </div>

                    {/* 输出与解析区 */}
                    <div className="p-5">
                      <p
                        className="font-outfit font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-1.5"
                        style={{ color: "var(--quaternary)" }}
                      >
                        <CheckCircle2 size={12} strokeWidth={2.5} />
                        输出结果
                      </p>
                      <div
                        className="p-4 rounded-xl mb-4 space-y-1.5"
                        style={{
                          background: "color-mix(in srgb, var(--quaternary) 6%, white)",
                          border: "2px solid var(--quaternary)",
                        }}
                      >
                        {ex.output.map((line, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 font-mono text-sm"
                            style={{ color: "var(--foreground)" }}
                          >
                            <span
                              className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold"
                              style={{
                                background: "var(--quaternary)",
                                color: "white",
                              }}
                            >
                              {i + 1}
                            </span>
                            <span
                              className="px-2 py-0.5 rounded"
                              style={{
                                background: "white",
                                border: "1px solid var(--border)",
                              }}
                            >
                              {line}
                            </span>
                          </div>
                        ))}
                      </div>

                      <p
                        className="font-outfit font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5"
                        style={{ color: "var(--accent)" }}
                      >
                        <BrainCircuit size={12} strokeWidth={2.5} />
                        解析
                      </p>
                      <p
                        className="font-body text-sm leading-relaxed"
                        style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}
                      >
                        {ex.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ async/await 深度解析 ═══════════════ */}
      <section className="container mt-16 animate-slide" style={{ animationDelay: "0.3s" }}>
        <h2
          className="font-outfit font-extrabold text-2xl md:text-3xl mb-8"
          style={{ color: "var(--foreground)" }}
        >
          <span
            className="inline-block px-3 py-1 mr-3 text-sm uppercase tracking-widest font-bold"
            style={{
              background: "var(--secondary)",
              color: "white",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
              transform: "rotate(1deg)",
            }}
          >
            深入
          </span>
          async/await 与事件循环
        </h2>

        <div className="topic-card p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 解释 */}
            <div>
              <h3 className="font-outfit font-bold text-xl mb-4 flex items-center gap-2" style={{ color: "var(--accent)" }}>
                <Workflow size={22} strokeWidth={2.5} />
                await 的本质
              </h3>
              <div className="font-body text-sm leading-relaxed space-y-4" style={{ color: "color-mix(in srgb, var(--foreground) 75%, transparent)" }}>
                <p>
                  <code className="px-1.5 py-0.5 text-xs font-mono font-bold" style={{ background: "color-mix(in srgb, var(--accent) 10%, white)", border: "1.5px solid var(--border)", borderRadius: "var(--radius-sm)" }}>async/await</code>{" "}
                  只是 Promise 的语法糖。理解它的关键在于：
                </p>
                <div className="space-y-3">
                  {[
                    {
                      label: "1. async 函数执行到 await 时",
                      text: "会暂停执行，将 await 后面的代码包装成微任务",
                      color: "var(--accent)",
                    },
                    {
                      label: "2. await 等待的 Promise 解决后",
                      text: "将后续代码推入微任务队列，而非立即执行",
                      color: "var(--secondary)",
                    },
                    {
                      label: "3. await 让出控制权",
                      text: "类似于 yield，让事件循环继续处理其他任务",
                      color: "var(--quaternary)",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div
                        className="shrink-0 mt-1 w-2 h-2 rounded-full"
                        style={{ background: item.color }}
                      />
                      <div>
                        <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>
                          {item.label}
                        </span>
                        <p className="text-sm mt-0.5">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 等价转换 */}
            <div>
              <h3 className="font-outfit font-bold text-xl mb-4 flex items-center gap-2" style={{ color: "var(--secondary)" }}>
                <RotateCcw size={22} strokeWidth={2.5} />
                等价转换
              </h3>
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "2px solid var(--foreground)", boxShadow: "6px 6px 0px 0px var(--foreground)" }}
              >
                <div
                  className="px-4 py-2 text-xs font-bold font-outfit uppercase tracking-widest"
                  style={{ background: "var(--secondary)", color: "white", borderBottom: "2px solid var(--foreground)" }}
                >
                  async/await → Promise 链
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="p-4" style={{ background: "#1E293B", borderRight: "2px solid var(--foreground)" }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#94a3b8" }}>
                      await 写法
                    </p>
                    <pre className="font-mono text-xs leading-relaxed" style={{ color: "#e2e8f0" }}>
{`async function fn() {
  const a = await fetch('/api');
  const b = await a.json();
  return b;
}`}
                    </pre>
                  </div>
                  <div className="p-4" style={{ background: "#1E293B" }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#94a3b8" }}>
                      Promise 写法
                    </p>
                    <pre className="font-mono text-xs leading-relaxed" style={{ color: "#e2e8f0" }}>
{`function fn() {
  return fetch('/api')
    .then(a => a.json())
    .then(b => b);
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div
                className="mt-4 p-4 rounded-xl"
                style={{
                  background: "color-mix(in srgb, var(--quaternary) 8%, white)",
                  border: "2px solid var(--quaternary)",
                }}
              >
                <p className="font-body text-sm flex items-start gap-2" style={{ color: "var(--foreground)" }}>
                  <CheckCircle2 size={16} strokeWidth={2.5} className="shrink-0 mt-0.5" style={{ color: "var(--quaternary)" }} />
                  <span>
                    <strong>性能提示：</strong>如果两个 await 操作之间没有依赖关系，
                    应使用 <code className="px-1 text-xs font-mono" style={{ background: "white", border: "1px solid var(--border)", borderRadius: "3px" }}>Promise.all()</code> 并行执行，避免不必要的串行等待。
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 浏览器 vs Node.js 差异 ═══════════════ */}
      <section className="container mt-16 animate-slide" style={{ animationDelay: "0.35s" }}>
        <h2
          className="font-outfit font-extrabold text-2xl md:text-3xl mb-8"
          style={{ color: "var(--foreground)" }}
        >
          <span
            className="inline-block px-3 py-1 mr-3 text-sm uppercase tracking-widest font-bold"
            style={{
              background: "var(--tertiary)",
              color: "var(--foreground)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
              transform: "rotate(-2deg)",
            }}
          >
            拓展
          </span>
          浏览器 vs Node.js 差异
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 浏览器 */}
          <div
            className="topic-card p-6"
            style={{
              borderTop: "4px solid var(--accent)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 flex items-center justify-center rounded-xl"
                style={{
                  background: "var(--accent)",
                  color: "white",
                  border: "2px solid var(--foreground)",
                  boxShadow: "3px 3px 0px 0px var(--foreground)",
                }}
              >
                <Globe size={18} strokeWidth={2.5} />
              </div>
              <h3 className="font-outfit font-bold text-lg" style={{ color: "var(--accent)" }}>
                浏览器环境
              </h3>
            </div>
            <div className="font-body text-sm leading-relaxed space-y-2" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}>
              {[
                "宏任务：setTimeout、setInterval、I/O、UI渲染",
                "微任务：Promise.then、MutationObserver",
                "requestAnimationFrame 在渲染前执行",
                "每轮宏任务后可能触发 UI 渲染",
                "有明确的渲染时机（16.6ms 帧）",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={14} strokeWidth={2.5} className="shrink-0 mt-1" style={{ color: "var(--accent)" }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Node.js */}
          <div
            className="topic-card p-6"
            style={{
              borderTop: "4px solid var(--quaternary)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 flex items-center justify-center rounded-xl"
                style={{
                  background: "var(--quaternary)",
                  color: "white",
                  border: "2px solid var(--foreground)",
                  boxShadow: "3px 3px 0px 0px var(--foreground)",
                }}
              >
                <Boxes size={18} strokeWidth={2.5} />
              </div>
              <h3 className="font-outfit font-bold text-lg" style={{ color: "var(--quaternary)" }}>
                Node.js 环境
              </h3>
            </div>
            <div className="font-body text-sm leading-relaxed space-y-2" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }}>
              {[
                "基于 libuv 实现事件循环",
                "process.nextTick 优先级高于其他微任务",
                "有 6 个阶段（timers → poll → check 等）",
                "setImmediate 在 check 阶段执行",
                "无 UI 渲染，无 requestAnimationFrame",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={14} strokeWidth={2.5} className="shrink-0 mt-1" style={{ color: "var(--quaternary)" }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Node.js 六阶段图 */}
        <div
          className="mt-6 topic-card p-6"
          style={{ borderTop: "4px solid var(--tertiary)" }}
        >
          <h3 className="font-outfit font-bold text-lg mb-4 flex items-center gap-2" style={{ color: "var(--tertiary)" }}>
            <Workflow size={20} strokeWidth={2.5} />
            Node.js 事件循环六阶段
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2">
            {[
              { name: "timers", desc: "setTimeout/Interval 回调", bg: "var(--tertiary)" },
              { name: "pending", desc: "系统级回调", bg: "var(--secondary)" },
              { name: "idle/prepare", desc: "内部使用", bg: "var(--border)" },
              { name: "poll", desc: "I/O 回调", bg: "var(--accent)" },
              { name: "check", desc: "setImmediate", bg: "var(--quaternary)" },
              { name: "close", desc: "关闭回调", bg: "var(--foreground)" },
            ].map((phase, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="px-3 py-2 text-center rounded-lg min-w-[100px]"
                  style={{
                    background: phase.bg,
                    color: phase.bg === "var(--border)" || phase.bg === "var(--tertiary)" ? "var(--foreground)" : "white",
                    border: "2px solid var(--foreground)",
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                  }}
                >
                  <p className="font-outfit font-bold text-xs">{phase.name}</p>
                  <p className="text-[10px] opacity-80">{phase.desc}</p>
                </div>
                {i < 5 && (
                  <span className="font-bold text-sm hidden md:block" style={{ color: "var(--foreground)" }}>
                    →
                  </span>
                )}
              </div>
            ))}
            <span className="font-bold text-sm hidden md:block" style={{ color: "var(--accent)" }}>↩</span>
          </div>
        </div>
      </section>

      {/* ═══════════════ 常见陷阱 ═══════════════ */}
      <section className="container mt-16 animate-slide" style={{ animationDelay: "0.4s" }}>
        <h2
          className="font-outfit font-extrabold text-2xl md:text-3xl mb-8"
          style={{ color: "var(--foreground)" }}
        >
          <span
            className="inline-block px-3 py-1 mr-3 text-sm uppercase tracking-widest font-bold"
            style={{
              background: "var(--secondary)",
              color: "white",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
              transform: "rotate(1deg)",
            }}
          >
            避坑
          </span>
          常见陷阱与最佳实践
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <XCircle size={22} strokeWidth={2.5} />,
              title: "setTimeout(fn, 0) ≠ 立即执行",
              desc: "setTimeout 的最小延迟约为 4ms（HTML5 规范）。即使设置 0ms，回调也会被放入宏任务队列，等同步代码和微任务全部执行完毕后才执行。",
              color: "var(--secondary)",
              type: "陷阱",
            },
            {
              icon: <XCircle size={22} strokeWidth={2.5} />,
              title: "微任务可能造成页面卡顿",
              desc: "如果微任务中不断产生新的微任务（如递归 Promise.resolve().then()），宏任务和 UI 渲染将永远得不到执行机会，导致页面冻结。",
              color: "var(--tertiary)",
              type: "陷阱",
            },
            {
              icon: <CheckCircle2 size={22} strokeWidth={2.5} />,
              title: "合理使用 requestAnimationFrame",
              desc: "DOM 动画操作应放在 rAF 回调中，它在浏览器下一次渲染前执行，保证动画流畅。注意 rAF 是宏任务还是渲染步骤因浏览器实现而异。",
              color: "var(--quaternary)",
              type: "最佳实践",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="topic-card p-5 animate-slide"
              style={{
                animationDelay: `${0.45 + i * 0.1}s`,
                borderTop: `4px solid ${item.color}`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div style={{ color: item.color }}>{item.icon}</div>
                <span
                  className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                  style={{
                    background: item.color,
                    color: item.color === "var(--tertiary)" ? "var(--foreground)" : "white",
                    borderRadius: "var(--radius-full)",
                  }}
                >
                  {item.type}
                </span>
              </div>
              <h4 className="font-outfit font-bold text-base mb-2" style={{ color: "var(--foreground)" }}>
                {item.title}
              </h4>
              <p className="font-body text-sm leading-relaxed" style={{ color: "color-mix(in srgb, var(--foreground) 65%, transparent)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 总结 ═══════════════ */}
      <section className="container mt-16 animate-slide" style={{ animationDelay: "0.5s" }}>
        <div
          className="topic-card p-6 md:p-8 relative overflow-hidden"
          style={{
            border: "3px solid var(--foreground)",
            boxShadow: "8px 8px 0px 0px var(--accent)",
          }}
        >
          {/* 装饰 Blob */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 opacity-10 pointer-events-none"
            style={{
              background: "var(--accent)",
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            }}
          />

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl"
                style={{
                  background: "var(--accent)",
                  color: "white",
                  border: "2px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                <BrainCircuit size={24} strokeWidth={2.5} />
              </div>
              <h2 className="font-outfit font-extrabold text-2xl" style={{ color: "var(--accent)" }}>
                总结：核心记忆要点
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { num: "1", text: "JS 是单线程的，事件循环是实现异步的核心机制", color: "var(--accent)" },
                { num: "2", text: "执行顺序：同步代码 → 微任务 → 宏任务（每次一个）", color: "var(--quaternary)" },
                { num: "3", text: "微任务优先级高于宏任务，每轮事件循环会清空全部微任务", color: "var(--secondary)" },
                { num: "4", text: "await 后面的代码等价于 Promise.then 的回调（微任务）", color: "var(--tertiary)" },
                { num: "5", text: "每执行完一个宏任务，都要检查并清空微任务队列", color: "var(--accent)" },
                { num: "6", text: "Node.js 的事件循环比浏览器更复杂，有 6 个阶段", color: "var(--quaternary)" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 rounded-xl"
                  style={{
                    background: "white",
                    border: "2px solid var(--border)",
                  }}
                >
                  <div
                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-outfit font-extrabold text-sm"
                    style={{
                      background: item.color,
                      color: item.color === "var(--tertiary)" ? "var(--foreground)" : "white",
                      border: "2px solid var(--foreground)",
                    }}
                  >
                    {item.num}
                  </div>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}