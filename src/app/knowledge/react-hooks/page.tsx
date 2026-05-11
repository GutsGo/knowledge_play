"use client";

import React, { useMemo, useState } from "react";
import {
  Activity,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock3,
  Code2,
  GitBranch,
  Layers3,
  Lightbulb,
  MousePointerClick,
  RefreshCcw,
  Repeat2,
  Sparkles,
  Split,
  TimerReset,
  TriangleAlert,
  Workflow,
  Zap,
} from "lucide-react";

const iconProps = {
  strokeWidth: 2.5,
  className: "h-5 w-5",
};

const motivations = [
  {
    icon: Split,
    title: "复用状态逻辑",
    desc: "Hooks 让状态逻辑可以从组件中抽离成自定义 Hook，而不再依赖 Render Props 或 HOC 的嵌套结构。",
    color: "var(--accent)",
  },
  {
    icon: Boxes,
    title: "降低组件复杂度",
    desc: "一个组件里相关逻辑可以按功能聚合，而不是被 class 生命周期拆散在不同方法里。",
    color: "var(--secondary)",
  },
  {
    icon: BrainCircuit,
    title: "贴近函数式 UI 心智",
    desc: "组件本质是 props 与 state 到 UI 的映射。Hooks 让函数组件也拥有状态、副作用与缓存能力。",
    color: "var(--tertiary)",
  },
];

const hookTypes = [
  {
    name: "useState",
    role: "保存一次渲染中的状态快照",
    icon: CircleDot,
    color: "var(--quaternary)",
  },
  {
    name: "useEffect",
    role: "在提交 DOM 后同步外部世界",
    icon: Zap,
    color: "var(--secondary)",
  },
  {
    name: "useMemo",
    role: "缓存计算结果，减少重复计算",
    icon: TimerReset,
    color: "var(--tertiary)",
  },
  {
    name: "useRef",
    role: "跨渲染保存可变引用，不触发刷新",
    icon: Layers3,
    color: "var(--accent)",
  },
];

const timeline = [
  {
    title: "Render 阶段",
    desc: "React 调用函数组件。Hooks 按调用顺序读取自己的状态槽位，得到当前渲染快照。",
    tag: "Pure calculation",
  },
  {
    title: "Reconcile 阶段",
    desc: "React 比较新旧虚拟树，计算需要更新的最小变更集合。",
    tag: "Diff",
  },
  {
    title: "Commit 阶段",
    desc: "React 把变更提交到真实 DOM。此时 UI 才真正更新到屏幕上。",
    tag: "DOM update",
  },
  {
    title: "Effect 阶段",
    desc: "浏览器绘制后，React 执行 useEffect，用于订阅、请求、日志、手动 DOM 交互等副作用。",
    tag: "Side effects",
  },
];

export default function ReactHooksKnowledgePage() {
  const [count, setCount] = useState(0);
  const [dependency, setDependency] = useState(true);

  const expensiveLabel = useMemo(() => {
    return count % 2 === 0 ? "偶数快照" : "奇数快照";
  }, [count]);

  return (
    <main
      className="bg-dot-grid min-h-screen overflow-hidden px-4 py-8 text-[var(--foreground)] md:py-12"
      style={{ backgroundColor: "var(--background)" }}
    >
      <section className="container mx-auto">
        {/* Hero */}
        <div className="relative mb-12 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div
            className="absolute -right-20 -top-16 h-56 w-56 opacity-80"
            style={{
              background: "var(--tertiary)",
              border: "3px solid var(--foreground)",
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              boxShadow: "8px 8px 0px 0px var(--secondary)",
            }}
          />
          <div
            className="absolute -left-16 top-56 hidden h-36 w-36 opacity-70 md:block"
            style={{
              background: "var(--quaternary)",
              border: "3px solid var(--foreground)",
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              boxShadow: "8px 8px 0px 0px var(--accent)",
            }}
          />

          <div className="animate-pop relative z-10">
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.05em]"
              style={{
                background: "var(--card)",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <Sparkles {...iconProps} />
              React Core Mental Model
            </div>

            <h1
              className="max-w-4xl text-5xl font-black leading-[0.95] md:text-7xl"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              React Hooks
              <span className="block" style={{ color: "var(--accent)" }}>
                设计动机与工作模式
              </span>
            </h1>

            <p
              className="mt-6 max-w-2xl text-lg font-semibold leading-8 md:text-xl"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Hooks 不是“函数组件里的 class 能力补丁”，而是一套让状态逻辑、
              副作用、复用机制与渲染模型更加一致的组件编程范式。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["状态快照", "调用顺序", "副作用隔离", "自定义 Hook"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full px-4 py-2 text-sm font-extrabold"
                    style={{
                      background: "var(--tertiary)",
                      border: "2px solid var(--foreground)",
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                    }}
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div
            className="animate-slide relative z-10 rounded-[var(--radius-lg)] p-5"
            style={{
              background: "var(--card)",
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--foreground)",
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  background: "var(--accent)",
                  border: "2px solid var(--foreground)",
                }}
              >
                <Workflow {...iconProps} className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-black uppercase tracking-wider">
                Hook Flow
              </span>
            </div>

            <div className="space-y-3">
              {["Component()", "useState()", "useEffect()", "return UI"].map(
                (step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black"
                      style={{
                        background:
                          index === 0
                            ? "var(--tertiary)"
                            : index === 1
                              ? "var(--quaternary)"
                              : index === 2
                                ? "var(--secondary)"
                                : "var(--accent)",
                        border: "2px solid var(--foreground)",
                      }}
                    >
                      {index + 1}
                    </div>
                    <div
                      className="flex-1 rounded-2xl px-4 py-3 font-extrabold"
                      style={{
                        background: "var(--background)",
                        border: "2px solid var(--foreground)",
                      }}
                    >
                      {step}
                    </div>
                  </div>
                ),
              )}
            </div>

            <div
              className="mt-5 rounded-2xl p-4 text-sm font-bold leading-6"
              style={{
                background: "var(--foreground)",
                color: "var(--background)",
              }}
            >
              关键规则：Hook 必须在组件顶层按固定顺序调用。React
              正是依靠“顺序”把每个 Hook 和内部状态槽位对应起来。
            </div>
          </div>
        </div>

        {/* Motivation Bento */}
        <section className="mb-14">
          <div className="mb-6 flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full"
              style={{
                background: "var(--secondary)",
                border: "2px solid var(--foreground)",
              }}
            >
              <Lightbulb {...iconProps} />
            </div>
            <h2
              className="text-3xl font-black md:text-4xl"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              为什么需要 Hooks？
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {motivations.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="topic-card animate-slide rounded-[var(--radius-lg)] p-6"
                  style={{
                    animationDelay: `${index * 90}ms`,
                    boxShadow: "8px 8px 0px 0px var(--foreground)",
                  }}
                >
                  <div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{
                      background: item.color,
                      border: "2px solid var(--foreground)",
                    }}
                  >
                    <Icon {...iconProps} className="h-7 w-7" />
                  </div>
                  <h3
                    className="mb-3 text-2xl font-black"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                  >
                    {item.title}
                  </h3>
                  <p className="font-semibold leading-7">{item.desc}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Class vs Hooks */}
        <section className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div
            className="rounded-[var(--radius-lg)] p-6"
            style={{
              background: "var(--foreground)",
              color: "var(--background)",
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--tertiary)",
            }}
          >
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black uppercase tracking-wider"
              style={{
                background: "var(--tertiary)",
                color: "var(--foreground)",
                border: "2px solid var(--foreground)",
              }}
            >
              <TriangleAlert {...iconProps} />
              Before Hooks
            </div>

            <h2
              className="mb-4 text-3xl font-black"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              Class 组件的问题不是“不能用”，而是心智负担更重
            </h2>

            <ul className="space-y-4 font-bold leading-7">
              <li className="flex gap-3">
                <ChevronRight
                  className="mt-1 h-5 w-5 shrink-0"
                  strokeWidth={2.5}
                />
                相关逻辑被生命周期拆开：订阅在 componentDidMount，清理在
                componentWillUnmount。
              </li>
              <li className="flex gap-3">
                <ChevronRight
                  className="mt-1 h-5 w-5 shrink-0"
                  strokeWidth={2.5}
                />
                状态逻辑复用困难：HOC 与 Render Props 容易形成嵌套地狱。
              </li>
              <li className="flex gap-3">
                <ChevronRight
                  className="mt-1 h-5 w-5 shrink-0"
                  strokeWidth={2.5}
                />
                this、绑定、实例方法让组件模型偏离“UI = f(state)”。
              </li>
            </ul>
          </div>

          <div
            className="rounded-[var(--radius-lg)] p-6"
            style={{
              background: "var(--card)",
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--accent)",
            }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  background: "var(--quaternary)",
                  border: "2px solid var(--foreground)",
                }}
              >
                <GitBranch {...iconProps} />
              </div>
              <h2
                className="text-3xl font-black"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                Hooks 的设计转换
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["生命周期", "按副作用目的组织 useEffect"],
                ["组件继承/包装", "组合自定义 Hook"],
                ["实例状态", "渲染快照中的 state"],
                ["命令式更新", "声明式数据驱动 UI"],
              ].map(([from, to]) => (
                <div
                  key={from}
                  className="rounded-2xl p-4"
                  style={{
                    background: "var(--background)",
                    border: "2px solid var(--foreground)",
                  }}
                >
                  <div className="text-sm font-black uppercase tracking-wider opacity-60">
                    {from}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-lg font-black">
                    <RefreshCcw {...iconProps} />
                    {to}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Mode Timeline */}
        <section className="mb-14">
          <div className="mb-7 flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full"
              style={{
                background: "var(--accent)",
                border: "2px solid var(--foreground)",
              }}
            >
              <Clock3 {...iconProps} className="text-white" />
            </div>
            <h2
              className="text-3xl font-black md:text-4xl"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              Hooks 的工作模式：一次渲染就是一次快照
            </h2>
          </div>

          <div
            className="relative rounded-[var(--radius-lg)] p-6 md:p-8"
            style={{
              background: "var(--card)",
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--foreground)",
            }}
          >
            <div
              className="absolute bottom-8 left-9 top-8 hidden md:block"
              style={{ borderLeft: "3px dashed var(--border)" }}
            />

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div
                  key={item.title}
                  className="relative grid gap-4 md:grid-cols-[4rem_1fr]"
                >
                  <div
                    className="z-10 flex h-14 w-14 items-center justify-center rounded-full text-xl font-black"
                    style={{
                      background:
                        index === 0
                          ? "var(--tertiary)"
                          : index === 1
                            ? "var(--secondary)"
                            : index === 2
                              ? "var(--quaternary)"
                              : "var(--accent)",
                      border: "2px solid var(--foreground)",
                    }}
                  >
                    {index + 1}
                  </div>
                  <div
                    className="rounded-2xl p-5"
                    style={{
                      background: "var(--background)",
                      border: "2px solid var(--foreground)",
                    }}
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <h3
                        className="text-2xl font-black"
                        style={{ fontFamily: '"Outfit", sans-serif' }}
                      >
                        {item.title}
                      </h3>
                      <span
                        className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider"
                        style={{
                          background: "var(--tertiary)",
                          border: "2px solid var(--foreground)",
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <p className="font-semibold leading-7">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hook Cards + Interactive Lab */}
        <section className="mb-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full"
                style={{
                  background: "var(--tertiary)",
                  border: "2px solid var(--foreground)",
                }}
              >
                <Code2 {...iconProps} />
              </div>
              <h2
                className="text-3xl font-black"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                常见 Hook 的分工
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {hookTypes.map((hook) => {
                const Icon = hook.icon;
                return (
                  <div
                    key={hook.name}
                    className="topic-card rounded-[var(--radius-md)] p-5"
                    style={{
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                    }}
                  >
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{
                        background: hook.color,
                        border: "2px solid var(--foreground)",
                      }}
                    >
                      <Icon {...iconProps} />
                    </div>
                    <h3 className="text-xl font-black">{hook.name}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6">
                      {hook.role}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="rounded-[var(--radius-lg)] p-6"
            style={{
              background: "var(--card)",
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--secondary)",
            }}
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    background: "var(--secondary)",
                    border: "2px solid var(--foreground)",
                  }}
                >
                  <MousePointerClick {...iconProps} />
                </div>
                <div>
                  <div className="text-sm font-black uppercase tracking-wider">
                    Interactive Lab
                  </div>
                  <h2
                    className="text-2xl font-black"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                  >
                    观察一次状态更新
                  </h2>
                </div>
              </div>
            </div>

            <div
              className="mb-5 rounded-3xl p-5 text-center"
              style={{
                background: "var(--background)",
                border: "2px solid var(--foreground)",
              }}
            >
              <div className="text-sm font-black uppercase tracking-wider opacity-60">
                当前 state 快照
              </div>
              <div
                className="my-3 text-7xl font-black"
                style={{
                  color: "var(--accent)",
                  fontFamily: '"Outfit", sans-serif',
                }}
              >
                {count}
              </div>
              <div
                className="inline-flex rounded-full px-4 py-2 text-sm font-black"
                style={{
                  background: dependency
                    ? "var(--quaternary)"
                    : "var(--tertiary)",
                  border: "2px solid var(--foreground)",
                }}
              >
                useMemo: {expensiveLabel}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setCount((value) => value + 1)}
                className="rounded-2xl px-5 py-4 text-base font-black transition active:translate-x-1 active:translate-y-1"
                style={{
                  background: "var(--accent)",
                  color: "white",
                  border: "2px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                setCount + 1
              </button>
              <button
                type="button"
                onClick={() => setDependency((value) => !value)}
                className="rounded-2xl px-5 py-4 text-base font-black transition active:translate-x-1 active:translate-y-1"
                style={{
                  background: "var(--tertiary)",
                  color: "var(--foreground)",
                  border: "2px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                切换外部条件
              </button>
            </div>

            <div
              className="mt-5 rounded-2xl p-4 text-sm font-bold leading-6"
              style={{
                background: "var(--foreground)",
                color: "var(--background)",
              }}
            >
              点击按钮不会“修改当前这次渲染里的 count”，而是安排下一次渲染。
              下一次组件函数重新执行，useState 读到新的状态快照。
            </div>
          </div>
        </section>

        {/* Rules */}
        <section
          className="rounded-[var(--radius-lg)] p-6 md:p-8"
          style={{
            background: "var(--card)",
            border: "3px solid var(--foreground)",
            boxShadow: "8px 8px 0px 0px var(--quaternary)",
          }}
        >
          <div className="mb-6 flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{
                background: "var(--quaternary)",
                border: "2px solid var(--foreground)",
              }}
            >
              <CheckCircle2 {...iconProps} />
            </div>
            <h2
              className="text-3xl font-black md:text-4xl"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              记住这 4 条，Hooks 就清晰了
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                title: "顺序即身份",
                desc: "React 依靠 Hook 调用顺序关联内部状态。",
              },
              {
                title: "渲染是快照",
                desc: "每次函数执行拿到的是那一次渲染的 state 与 props。",
              },
              {
                title: "Effect 是同步外部系统",
                desc: "不要把 useEffect 当作普通的数据推导工具。",
              },
              {
                title: "自定义 Hook 是逻辑单元",
                desc: "它复用的是状态逻辑，不是 UI 模板。",
              },
            ].map((rule, index) => (
              <div
                key={rule.title}
                className="rounded-2xl p-5"
                style={{
                  background:
                    index === 0
                      ? "var(--tertiary)"
                      : index === 1
                        ? "var(--secondary)"
                        : index === 2
                          ? "var(--accent)"
                          : "var(--quaternary)",
                  border: "2px solid var(--foreground)",
                }}
              >
                <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-wider">
                  <Activity {...iconProps} />
                  Rule {index + 1}
                </div>
                <h3
                  className="mb-2 text-xl font-black"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  {rule.title}
                </h3>
                <p className="text-sm font-bold leading-6">{rule.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
