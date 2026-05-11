// app/knowledge/vue-router/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Globe,
  Hash,
  History,
  Code2,
  ArrowRight,
  Layers,
  Shield,
  Map,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Zap,
  GitBranch,
  Eye,
  BookOpen,
  Terminal,
  MousePointerClick,
  Route,
  Navigation,
  CornerDownRight,
  CircleDot,
  Link2,
  FileCode,
  Cpu,
  Binary,
} from "lucide-react";
import { highlightCode } from "@/lib/prism-highlight";

/* ──────────────────────────────────────────────
   Type Definitions
   ────────────────────────────────────────────── */

interface RouteRecord {
  path: string;
  name: string;
  component: string;
}

interface NavigationStep {
  id: number;
  label: string;
  detail: string;
  icon: React.ReactNode;
  color: string;
}

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

const NAVIGATION_STEPS: NavigationStep[] = [
  {
    id: 1,
    label: "URL 变化",
    detail: "用户点击 <router-link> 或调用 router.push()，触发 URL 变更",
    icon: <Link2 size={20} strokeWidth={2.5} />,
    color: "var(--accent)",
  },
  {
    id: 2,
    label: "路由解析",
    detail: "RouterMatcher 遍历路由表，通过 path-to-regexp 匹配组件",
    icon: <GitBranch size={20} strokeWidth={2.5} />,
    color: "var(--secondary)",
  },
  {
    id: 3,
    label: "守卫执行",
    detail: "按 beforeResolve → afterEach 顺序执行导航守卫队列",
    icon: <Shield size={20} strokeWidth={2.5} />,
    color: "var(--tertiary)",
  },
  {
    id: 4,
    label: "组件渲染",
    detail: "matched route 的 component 被渲染到 <router-view> 位置",
    icon: <Layers size={20} strokeWidth={2.5} />,
    color: "var(--quaternary)",
  },
];

const DEMO_ROUTES: RouteRecord[] = [
  { path: "/", name: "Home", component: "HomePage" },
  { path: "/about", name: "About", component: "AboutPage" },
  { path: "/user/:id", name: "User", component: "UserProfile" },
  { path: "/docs/:section", name: "Docs", component: "DocsPage" },
];

/* ──────────────────────────────────────────────
   Sub-components
   ────────────────────────────────────────────── */

// Animated background blob
function Blob({
  color,
  size,
  top,
  left,
  delay,
}: {
  color: string;
  size: number;
  top: string;
  left: string;
  delay: string;
}) {
  return (
    <div
      className="absolute rounded-full opacity-15 blur-3xl pointer-events-none"
      style={{
        background: color,
        width: size,
        height: size,
        top,
        left,
        animation: `pop-in 1.2s ${delay} cubic-bezier(0.34,1.56,0.64,1) both`,
      }}
    />
  );
}

// Code block with syntax-like styling
function CodeBlock({
  code,
  title,
  lang = "js",
}: {
  code: string;
  title?: string;
  lang?: string;
}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden animate-slide"
      style={{
        border: "2px solid var(--foreground)",
        boxShadow: "6px 6px 0px 0px var(--foreground)",
        background: "#1a1b26",
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          borderBottom: "2px solid var(--foreground)",
          background: "#24283b",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: "#f7768e", border: "1.5px solid #1a1b26" }}
            />
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: "#9ece6a", border: "1.5px solid #1a1b26" }}
            />
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: "#e0af68", border: "1.5px solid #1a1b26" }}
            />
          </div>
          {title && (
            <span
              className="ml-2 text-xs font-bold tracking-wider uppercase"
              style={{ color: "#a9b1d6", fontFamily: "var(--font-outfit)" }}
            >
              {title}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="text-xs font-bold px-3 py-1 rounded-lg transition-all"
          style={{
            color: "#a9b1d6",
            border: "1.5px solid #3b4261",
            fontFamily: "var(--font-outfit)",
          }}
        >
          {copied ? "✓ Copied" : `${lang}`}
        </button>
      </div>
      {/* Code content */}
      <pre
        className="p-4 overflow-x-auto text-sm leading-relaxed"
        style={{
          color: "#c0caf5",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        }}
      >
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code, lang) }} />
      </pre>
    </div>
  );
}

// Geometric badge for icons
function GeoBadge({
  children,
  color,
  bg,
  size = 48,
}: {
  children: React.ReactNode;
  color: string;
  bg: string;
  size?: number;
}) {
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        width: size,
        height: size,
        borderRadius: "var(--radius-md)",
        border: `2px solid var(--foreground)`,
        background: bg,
        boxShadow: `3px 3px 0px 0px var(--foreground)`,
        color,
      }}
    >
      {children}
    </div>
  );
}

// Interactive mini-router simulator
function RouterSimulator() {
  const [mode, setMode] = useState<"hash" | "history">("hash");
  const [currentPath, setCurrentPath] = useState("/");
  const [url, setUrl] = useState("http://localhost:3000/#/");
  const [history, setHistory] = useState<string[]>(["/"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [logs, setLogs] = useState<
    { time: string; msg: string; type: string }[]
  >([]);
  const logRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((msg: string, type: string = "info") => {
    const time = new Date().toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setLogs((prev) => [...prev, { time, msg, type }]);
  }, []);

  const navigate = useCallback(
    (path: string) => {
      const basePath = "http://localhost:3000";
      const newUrl =
        mode === "hash" ? `${basePath}/#${path}` : `${basePath}${path}`;
      setUrl(newUrl);
      setCurrentPath(path);

      // Update history stack
      setHistory((prev) => {
        const newHist = prev.slice(0, historyIndex + 1);
        newHist.push(path);
        return newHist;
      });
      setHistoryIndex((prev) => prev + 1);

      // Simulate route matching
      const matched = DEMO_ROUTES.find((r) => {
        if (r.path.includes(":")) {
          const pattern = r.path.replace(/:[^/]+/g, "[^/]+");
          return new RegExp(`^${pattern}$`).test(path);
        }
        return r.path === path;
      });

      addLog(
        `📍 [${mode === "hash" ? "HashChangeEvent" : "popstate"}] URL → ${newUrl}`,
        "event",
      );
      addLog(
        `🔍 RouterMatcher: path "${path}" → matched: ${matched ? matched.name : "404"}`,
        "match",
      );
      if (matched) {
        addLog(`🛡️ beforeEach guard → 继续导航...`, "guard");
        addLog(`✅ afterEach guard → 渲染 <${matched.component} />`, "render");
      } else {
        addLog(`⚠️ 未匹配路由，触发 404`, "warn");
      }
    },
    [mode, historyIndex, addLog],
  );

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
      const basePath = "http://localhost:3000";
      setUrl(
        mode === "hash"
          ? `${basePath}/#${history[newIndex]}`
          : `${basePath}${history[newIndex]}`,
      );
      addLog(`⬅️ History.back() → ${history[newIndex]}`, "event");
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
      const basePath = "http://localhost:3000";
      setUrl(
        mode === "hash"
          ? `${basePath}/#${history[newIndex]}`
          : `${basePath}${history[newIndex]}`,
      );
      addLog(`➡️ History.forward() → ${history[newIndex]}`, "event");
    }
  };

  const reset = () => {
    setCurrentPath("/");
    setHistory(["/"]);
    setHistoryIndex(0);
    setLogs([]);
    setUrl("http://localhost:3000/#/");
  };

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const matchedRoute = DEMO_ROUTES.find((r) => {
    if (r.path.includes(":")) {
      const pattern = r.path.replace(/:[^/]+/g, "[^/]+");
      return new RegExp(`^${pattern}$`).test(currentPath);
    }
    return r.path === currentPath;
  });

  return (
    <div
      className="rounded-3xl overflow-hidden animate-pop"
      style={{
        border: "3px solid var(--foreground)",
        boxShadow: "8px 8px 0px 0px var(--accent)",
        background: "var(--card)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          borderBottom: "2px solid var(--foreground)",
          background: "var(--accent)",
          color: "white",
        }}
      >
        <div
          className="flex items-center gap-2 font-bold"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <Cpu size={18} strokeWidth={2.5} />
          路由模拟器
        </div>
        {/* Mode toggle */}
        <div
          className="flex rounded-xl overflow-hidden"
          style={{ border: "2px solid rgba(255,255,255,0.3)" }}
        >
          <button
            onClick={() => {
              setMode("hash");
              reset();
            }}
            className="px-3 py-1 text-xs font-bold transition-all"
            style={{
              background: mode === "hash" ? "white" : "transparent",
              color:
                mode === "hash" ? "var(--accent)" : "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            <Hash size={12} className="inline mr-1" strokeWidth={3} />
            Hash
          </button>
          <button
            onClick={() => {
              setMode("history");
              reset();
            }}
            className="px-3 py-1 text-xs font-bold transition-all"
            style={{
              background: mode === "history" ? "white" : "transparent",
              color:
                mode === "history" ? "var(--accent)" : "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            <History size={12} className="inline mr-1" strokeWidth={3} />
            History
          </button>
        </div>
      </div>

      {/* Browser URL bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          borderBottom: "2px solid var(--border)",
          background: "#f8fafc",
        }}
      >
        <div className="flex gap-1.5">
          <button
            onClick={goBack}
            disabled={historyIndex <= 0}
            className="p-1.5 rounded-lg transition-all disabled:opacity-30"
            style={{ border: "1.5px solid var(--border)" }}
          >
            <ArrowRight size={14} className="rotate-180" strokeWidth={2.5} />
          </button>
          <button
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 rounded-lg transition-all disabled:opacity-30"
            style={{ border: "1.5px solid var(--border)" }}
          >
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>
          <button
            onClick={reset}
            className="p-1.5 rounded-lg transition-all"
            style={{ border: "1.5px solid var(--border)" }}
          >
            <RotateCcw size={14} strokeWidth={2.5} />
          </button>
        </div>
        <div
          className="flex-1 rounded-xl px-4 py-2 text-sm font-mono truncate"
          style={{
            border: "2px solid var(--border)",
            background: "white",
            color: "var(--foreground)",
          }}
        >
          <span className="text-gray-400">http://localhost:3000</span>
          {mode === "hash" ? (
            <span style={{ color: "var(--tertiary)", fontWeight: 700 }}>
              #{currentPath}
            </span>
          ) : (
            <span style={{ color: "var(--quaternary)", fontWeight: 700 }}>
              {currentPath}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: navigation buttons + rendered component */}
        <div className="p-5" style={{ borderRight: "2px solid var(--border)" }}>
          <p
            className="text-xs font-bold mb-3 uppercase tracking-widest"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            点击导航 →
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {DEMO_ROUTES.map((route) => (
              <button
                key={route.path}
                onClick={() => navigate(route.path)}
                className="px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
                style={{
                  border: `2px solid ${currentPath === route.path ? "var(--accent)" : "var(--foreground)"}`,
                  background:
                    currentPath === route.path ? "var(--accent)" : "white",
                  color:
                    currentPath === route.path ? "white" : "var(--foreground)",
                  boxShadow:
                    currentPath === route.path
                      ? "4px 4px 0px 0px var(--secondary)"
                      : "3px 3px 0px 0px var(--foreground)",
                  fontFamily: "var(--font-outfit)",
                }}
              >
                {route.name}
                <span className="ml-1 opacity-60 text-xs">{route.path}</span>
              </button>
            ))}
          </div>

          {/* Custom path input */}
          <div className="flex gap-2 mb-5">
            <input
              type="text"
              placeholder="/user/42"
              className="flex-1 rounded-xl px-4 py-2 text-sm font-mono"
              style={{
                border: "2px solid var(--foreground)",
                outline: "none",
                fontFamily: "'JetBrains Mono', monospace",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const val = (e.target as HTMLInputElement).value;
                  if (val.startsWith("/")) navigate(val);
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector(
                  'input[placeholder="/user/42"]',
                ) as HTMLInputElement;
                if (input?.value.startsWith("/")) navigate(input.value);
              }}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{
                border: "2px solid var(--foreground)",
                background: "var(--tertiary)",
                boxShadow: "3px 3px 0px 0px var(--foreground)",
                fontFamily: "var(--font-outfit)",
              }}
            >
              Go
            </button>
          </div>

          {/* Rendered Component Area */}
          <div
            className="rounded-2xl p-5 text-center"
            style={{
              border: "2px dashed var(--border)",
              background: "#fafaf7",
              minHeight: 120,
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{
                color: "var(--border)",
                fontFamily: "var(--font-outfit)",
              }}
            >
              &lt;router-view&gt;
            </p>
            {matchedRoute ? (
              <div className="animate-pop">
                <div
                  className="inline-block px-6 py-3 rounded-2xl font-bold text-lg"
                  style={{
                    background:
                      matchedRoute.name === "Home"
                        ? "var(--accent)"
                        : matchedRoute.name === "About"
                          ? "var(--secondary)"
                          : matchedRoute.name === "User"
                            ? "var(--tertiary)"
                            : "var(--quaternary)",
                    color: "white",
                    border: "2px solid var(--foreground)",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  &lt;
                  {matchedRoute.component}
                  /&gt;
                </div>
                <p
                  className="mt-2 text-sm font-mono"
                  style={{ color: "var(--foreground)" }}
                >
                  路由名称:{" "}
                  <span
                    className="font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    {matchedRoute.name}
                  </span>
                </p>
              </div>
            ) : (
              <div className="animate-pop">
                <p
                  className="text-2xl font-bold"
                  style={{ color: "var(--secondary)" }}
                >
                  404
                </p>
                <p className="text-sm text-gray-400">未找到匹配路由</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: console logs */}
        <div className="p-5">
          <p
            className="text-xs font-bold mb-3 uppercase tracking-widest flex items-center gap-1"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            <Terminal size={14} strokeWidth={2.5} />
            路由器内部日志
          </p>
          <div
            ref={logRef}
            className="rounded-xl p-3 overflow-y-auto font-mono text-xs leading-relaxed"
            style={{
              border: "2px solid var(--foreground)",
              background: "#1a1b26",
              color: "#c0caf5",
              minHeight: 280,
              maxHeight: 320,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {logs.length === 0 ? (
              <p className="text-gray-500 italic text-center py-8">
                点击导航按钮开始模拟...
              </p>
            ) : (
              logs.map((log, i) => (
                <div
                  key={i}
                  className="py-1 border-b border-gray-800 last:border-0"
                >
                  <span className="text-gray-500">[{log.time}]</span>{" "}
                  <span
                    style={{
                      color:
                        log.type === "event"
                          ? "#7aa2f7"
                          : log.type === "match"
                            ? "#9ece6a"
                            : log.type === "guard"
                              ? "#e0af68"
                              : log.type === "warn"
                                ? "#f7768e"
                                : "#7dcfff",
                    }}
                  >
                    {log.msg}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* History stack visualization */}
          <div className="mt-4">
            <p
              className="text-xs font-bold mb-2 uppercase tracking-widest"
              style={{
                color: "var(--foreground)",
                fontFamily: "var(--font-outfit)",
              }}
            >
              History Stack
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {history.map((path, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  style={{
                    border: `2px solid ${i === historyIndex ? "var(--accent)" : "var(--border)"}`,
                    background: i === historyIndex ? "var(--accent)" : "white",
                    color: i === historyIndex ? "white" : "var(--foreground)",
                    fontFamily: "var(--font-outfit)",
                    boxShadow:
                      i === historyIndex
                        ? "3px 3px 0px 0px var(--secondary)"
                        : "none",
                  }}
                >
                  {path}
                  {i === historyIndex && (
                    <span className="ml-1 opacity-70">←</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main Page Component
   ────────────────────────────────────────────── */

export default function VueRouterDeepDive() {
  const [activeModeTab, setActiveModeTab] = useState<"hash" | "history">(
    "hash",
  );
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-section"));
            if (!isNaN(idx)) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.3 },
    );

    document.querySelectorAll("[data-section]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="bg-dot-grid min-h-screen pb-20"
      style={{ background: "var(--background)" }}
    >
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <Blob
          color="var(--accent)"
          size={400}
          top="-10%"
          left="-5%"
          delay="0s"
        />
        <Blob
          color="var(--secondary)"
          size={300}
          top="20%"
          left="70%"
          delay="0.2s"
        />
        <Blob
          color="var(--tertiary)"
          size={250}
          top="60%"
          left="10%"
          delay="0.4s"
        />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 mb-8 animate-slide"
            style={{ animationDelay: "0.1s" }}
          >
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: "var(--tertiary)",
                border: "2px solid var(--foreground)",
                fontFamily: "var(--font-outfit)",
                boxShadow: "3px 3px 0px 0px var(--foreground)",
              }}
            >
              Vue.js 生态
            </span>
            <ChevronRight size={14} strokeWidth={2.5} />
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: "var(--quaternary)",
                border: "2px solid var(--foreground)",
                fontFamily: "var(--font-outfit)",
                boxShadow: "3px 3px 0px 0px var(--foreground)",
              }}
            >
              源码解析
            </span>
          </div>

          {/* Title */}
          <h1
            className="animate-pop text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
            style={{
              fontFamily: "var(--font-outfit)",
              color: "var(--foreground)",
            }}
          >
            深入浅出
            <br />
            <span style={{ color: "var(--accent)" }}>Vue Router</span> 路由原理
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed mb-8 animate-slide"
            style={{
              animationDelay: "0.2s",
              color: "var(--foreground)",
              fontFamily: "var(--font-body)",
              opacity: 0.8,
            }}
          >
            从 <strong>Hash 模式</strong>到 <strong>History 模式</strong>
            ，结合源码与交互式示例，彻底理解前端路由的工作机制。
          </p>

          {/* Feature pills */}
          <div
            className="flex flex-wrap gap-3 animate-slide"
            style={{ animationDelay: "0.3s" }}
          >
            {[
              {
                icon: <Hash size={14} strokeWidth={2.5} />,
                text: "Hash 模式",
                bg: "var(--tertiary)",
              },
              {
                icon: <Globe size={14} strokeWidth={2.5} />,
                text: "History 模式",
                bg: "var(--quaternary)",
              },
              {
                icon: <Code2 size={14} strokeWidth={2.5} />,
                text: "源码级解析",
                bg: "var(--accent)",
              },
              {
                icon: <MousePointerClick size={14} strokeWidth={2.5} />,
                text: "交互实验",
                bg: "var(--secondary)",
              },
            ].map((pill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
                style={{
                  background: pill.bg,
                  color: "white",
                  border: "2px solid var(--foreground)",
                  boxShadow: "3px 3px 0px 0px var(--foreground)",
                  fontFamily: "var(--font-outfit)",
                }}
              >
                {pill.icon}
                {pill.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        {/* ═══════════════ SECTION NAVIGATION ═══════════════ */}
        <nav
          className="sticky top-4 z-50 rounded-2xl p-2 mb-12 animate-pop"
          style={{
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
            border: "2px solid var(--foreground)",
            boxShadow: "6px 6px 0px 0px var(--foreground)",
          }}
        >
          <div className="flex gap-1 overflow-x-auto">
            {[
              "概述",
              "Hash 模式",
              "History 模式",
              "导航流程",
              "路由匹配",
              "动手实验",
            ].map((item, i) => (
              <a
                key={i}
                href={`#section-${i}`}
                className="px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all"
                style={{
                  background:
                    activeSection === i ? "var(--accent)" : "transparent",
                  color: activeSection === i ? "white" : "var(--foreground)",
                  fontFamily: "var(--font-outfit)",
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* ═══════════════ SECTION 0: OVERVIEW ═══════════════ */}
        <section id="section-0" data-section="0" className="mb-16">
          <div
            className="rounded-3xl p-8 lg:p-10 mb-8 animate-pop"
            style={{
              border: "3px solid var(--foreground)",
              background: "var(--card)",
              boxShadow: "8px 8px 0px 0px var(--accent)",
            }}
          >
            <div className="flex items-start gap-4 mb-6">
              <GeoBadge color="white" bg="var(--accent)" size={56}>
                <BookOpen size={28} strokeWidth={2.5} />
              </GeoBadge>
              <div>
                <h2
                  className="text-2xl lg:text-3xl font-extrabold mb-2"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--foreground)",
                  }}
                >
                  什么是前端路由？
                </h2>
                <p
                  className="text-sm font-bold uppercase tracking-widest"
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  Understanding Client-Side Routing
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "单页面应用 (SPA)",
                  desc: "整个应用只有一个 HTML 页面，URL 变化时不刷新页面，而是通过 JavaScript 动态替换 DOM 内容。",
                  icon: <Globe size={24} strokeWidth={2.5} />,
                  color: "var(--accent)",
                },
                {
                  title: "URL ↔ 视图映射",
                  desc: "路由的核心职责：将 URL 路径映射到对应的组件，同时维护浏览历史的前进/后退。",
                  icon: <Route size={24} strokeWidth={2.5} />,
                  color: "var(--secondary)",
                },
                {
                  title: "无刷新导航",
                  desc: "利用 History API 或 Hash 变化来拦截浏览器默认行为，实现局部视图更新。",
                  icon: <Zap size={24} strokeWidth={2.5} />,
                  color: "var(--tertiary)",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="topic-card rounded-2xl p-5 animate-slide"
                  style={{
                    animationDelay: `${0.1 + i * 0.1}s`,
                    borderColor: card.color,
                  }}
                >
                  <GeoBadge color="white" bg={card.color} size={44}>
                    {card.icon}
                  </GeoBadge>
                  <h3
                    className="font-bold text-base mt-3 mb-2"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ opacity: 0.75 }}
                  >
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Core question callout */}
            <div
              className="mt-6 rounded-2xl p-5"
              style={{
                border: "2px dashed var(--accent)",
                background: "rgba(139,92,246,0.05)",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p
                    className="font-bold mb-1"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    核心问题
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ opacity: 0.8 }}
                  >
                    浏览器 URL
                    变化时默认会向服务器发起请求。前端路由的本质就是：
                    <strong>拦截 URL 变化事件</strong>，在不刷新页面的前提下，
                    <strong>解析 URL 并渲染对应的组件</strong>。 Vue Router
                    提供了两种策略来实现这一点：
                    <code
                      className="px-1.5 py-0.5 rounded"
                      style={{
                        background: "var(--tertiary)",
                        fontFamily: "monospace",
                        fontSize: "0.85em",
                      }}
                    >
                      Hash 模式
                    </code>{" "}
                    和{" "}
                    <code
                      className="px-1.5 py-0.5 rounded"
                      style={{
                        background: "var(--quaternary)",
                        fontFamily: "monospace",
                        fontSize: "0.85em",
                      }}
                    >
                      History 模式
                    </code>
                    。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 1: HASH MODE ═══════════════ */}
        <section id="section-1" data-section="1" className="mb-16">
          <div
            className="rounded-3xl overflow-hidden animate-pop"
            style={{
              border: "3px solid var(--foreground)",
              background: "var(--card)",
              boxShadow: "8px 8px 0px 0px var(--tertiary)",
            }}
          >
            {/* Section header */}
            <div
              className="p-8 lg:p-10"
              style={{ borderBottom: "2px solid var(--border)" }}
            >
              <div className="flex items-start gap-4 mb-6">
                <GeoBadge
                  color="var(--foreground)"
                  bg="var(--tertiary)"
                  size={56}
                >
                  <Hash size={28} strokeWidth={2.5} />
                </GeoBadge>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{
                      color: "var(--tertiary)",
                      fontFamily: "var(--font-outfit)",
                    }}
                  >
                    Mode 01
                  </p>
                  <h2
                    className="text-2xl lg:text-3xl font-extrabold"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    Hash 模式 — 原理与源码
                  </h2>
                </div>
              </div>

              <p
                className="text-base leading-relaxed mb-4"
                style={{ opacity: 0.8 }}
              >
                Hash 模式利用 URL 中的{" "}
                <code
                  className="px-1.5 py-0.5 rounded text-sm font-bold"
                  style={{
                    background: "var(--tertiary)",
                    fontFamily: "monospace",
                  }}
                >
                  #
                </code>
                （fragment identifier）来实现路由。
                <code>#</code> 后面的部分<strong>不会发送到服务器</strong>
                ，因此无需服务端配置。当 hash 变化时，浏览器触发{" "}
                <code
                  className="px-1.5 py-0.5 rounded text-sm font-bold"
                  style={{ background: "#f0f0f0", fontFamily: "monospace" }}
                >
                  hashchange
                </code>{" "}
                事件。
              </p>

              {/* URL Anatomy */}
              <div
                className="rounded-2xl p-5 mb-6"
                style={{
                  border: "2px solid var(--foreground)",
                  background: "var(--background)",
                }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--foreground)",
                  }}
                >
                  URL 结构解剖
                </p>
                <div
                  className="flex flex-wrap items-center gap-1 text-lg font-mono font-bold"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <span
                    className="px-3 py-1.5 rounded-lg"
                    style={{
                      background: "#e2e8f0",
                      color: "var(--foreground)",
                    }}
                  >
                    https://example.com
                  </span>
                  <span
                    className="px-3 py-1.5 rounded-lg"
                    style={{
                      background: "#e2e8f0",
                      color: "var(--foreground)",
                    }}
                  >
                    /app
                  </span>
                  <span
                    className="px-3 py-1.5 rounded-lg"
                    style={{
                      background: "var(--tertiary)",
                      color: "var(--foreground)",
                    }}
                  >
                    #
                  </span>
                  <span
                    className="px-3 py-1.5 rounded-lg"
                    style={{
                      background: "var(--tertiary)",
                      color: "var(--foreground)",
                    }}
                  >
                    /user/123
                  </span>
                </div>
                <div
                  className="flex flex-wrap items-center gap-1 mt-2 text-xs font-bold"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <span
                    className="px-2 opacity-40"
                    style={{ width: 130, textAlign: "center" }}
                  >
                    protocol + host
                  </span>
                  <span
                    className="px-2 opacity-40"
                    style={{ width: 60, textAlign: "center" }}
                  >
                    path
                  </span>
                  <span
                    className="px-2 font-bold"
                    style={{
                      width: 40,
                      textAlign: "center",
                      color: "var(--tertiary)",
                    }}
                  >
                    hash
                  </span>
                  <span
                    className="px-2 font-bold"
                    style={{
                      width: 130,
                      textAlign: "center",
                      color: "var(--tertiary)",
                    }}
                  >
                    ← 路由匹配部分
                  </span>
                </div>
              </div>
            </div>

            {/* Source code section */}
            <div className="p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Source: HashHistory implementation */}
                <div>
                  <h3
                    className="font-bold text-lg mb-3 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    <FileCode
                      size={20}
                      strokeWidth={2.5}
                      style={{ color: "var(--tertiary)" }}
                    />
                    源码：初始化监听
                  </h3>
                  <CodeBlock
                    title="src/history/hash.ts"
                    code={`// Vue Router 源码 - HashHistory 类
export class HashHistory extends History {
  constructor(router, base) {
    super(router, base);
    // 确保 URL 中有 hash
    ensureSlash();
  }

  setupListeners() {
    // 核心：监听 hashchange 事件
    window.addEventListener(
      'hashchange',
      () => {
        // hash 变化时获取当前 URL
        const current = this.current;
        // 解析新的 hash
        const target = getHash();
        // 如果是同一个路径则跳过
        if (isSameRoute(current, target)) return;
        // 执行路由跳转
        this.transitionTo(target, (route) => {
          // 替换 hash（不触发新的 hashchange）
          replaceHash(route.fullPath);
        });
      }
    );
  }
}`}
                  />
                </div>

                {/* Source: ensureSlash utility */}
                <div>
                  <h3
                    className="font-bold text-lg mb-3 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    <Binary
                      size={20}
                      strokeWidth={2.5}
                      style={{ color: "var(--tertiary)" }}
                    />
                    源码：ensureSlash 与 push
                  </h3>
                  <CodeBlock
                    title="src/history/hash.ts"
                    code={`// 确保 URL 以 / 开头
function ensureSlash() {
  const path = getHash();
  if (path.charAt(0) === '/') return true;
  // 替换当前 hash
  replaceHash('/' + path);
  return false;
}

// push 方法 - 导航到新路由
push(location, onComplete) {
  const { current } = this;
  // 执行路由转换
  this.transitionTo(location, (route) => {
    // 设置新 hash，触发 hashchange
    setHash(route.fullPath);
    onComplete && onComplete(route);
  });
}

// 设置 hash 值
function setHash(path) {
  window.location.hash = path;
}

// 读取当前 hash
function getHash() {
  // 取 # 后面的内容
  let href = window.location.href;
  const index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1);
}`}
                  />
                </div>
              </div>

              {/* Key takeaway cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div
                  className="topic-card rounded-2xl p-5"
                  style={{ borderColor: "var(--tertiary)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">✅</span>
                    <h4
                      className="font-bold"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      优点
                    </h4>
                  </div>
                  <ul className="text-sm space-y-1.5" style={{ opacity: 0.8 }}>
                    <li className="flex items-start gap-2">
                      <ChevronRight
                        size={14}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--quaternary)" }}
                      />
                      兼容性极好，支持 IE8+
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight
                        size={14}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--quaternary)" }}
                      />
                      无需服务端配置，hash 不发送到服务器
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight
                        size={14}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--quaternary)" }}
                      />
                      原生支持锚点定位（虽然少见）
                    </li>
                  </ul>
                </div>
                <div
                  className="topic-card rounded-2xl p-5"
                  style={{ borderColor: "var(--secondary)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">⚠️</span>
                    <h4
                      className="font-bold"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      缺点
                    </h4>
                  </div>
                  <ul className="text-sm space-y-1.5" style={{ opacity: 0.8 }}>
                    <li className="flex items-start gap-2">
                      <ChevronRight
                        size={14}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--secondary)" }}
                      />
                      URL 带有 <code>#</code> 不够美观
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight
                        size={14}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--secondary)" }}
                      />
                      可能影响 SEO（搜索引擎对 hash 处理不一致）
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight
                        size={14}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--secondary)" }}
                      />
                      部分 SSR 场景下有限制
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 2: HISTORY MODE ═══════════════ */}
        <section id="section-2" data-section="2" className="mb-16">
          <div
            className="rounded-3xl overflow-hidden animate-pop"
            style={{
              border: "3px solid var(--foreground)",
              background: "var(--card)",
              boxShadow: "8px 8px 0px 0px var(--quaternary)",
            }}
          >
            {/* Section header */}
            <div
              className="p-8 lg:p-10"
              style={{ borderBottom: "2px solid var(--border)" }}
            >
              <div className="flex items-start gap-4 mb-6">
                <GeoBadge color="white" bg="var(--quaternary)" size={56}>
                  <Globe size={28} strokeWidth={2.5} />
                </GeoBadge>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{
                      color: "var(--quaternary)",
                      fontFamily: "var(--font-outfit)",
                    }}
                  >
                    Mode 02
                  </p>
                  <h2
                    className="text-2xl lg:text-3xl font-extrabold"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    History 模式 — 原理与源码
                  </h2>
                </div>
              </div>

              <p
                className="text-base leading-relaxed mb-4"
                style={{ opacity: 0.8 }}
              >
                History 模式利用 HTML5 提供的{" "}
                <code
                  className="px-1.5 py-0.5 rounded text-sm font-bold"
                  style={{
                    background: "var(--quaternary)",
                    fontFamily: "monospace",
                  }}
                >
                  pushState
                </code>{" "}
                /{" "}
                <code
                  className="px-1.5 py-0.5 rounded text-sm font-bold"
                  style={{
                    background: "var(--quaternary)",
                    fontFamily: "monospace",
                  }}
                >
                  replaceState
                </code>{" "}
                API 操作浏览器历史记录栈， 并通过监听{" "}
                <code
                  className="px-1.5 py-0.5 rounded text-sm font-bold"
                  style={{ background: "#f0f0f0", fontFamily: "monospace" }}
                >
                  popstate
                </code>{" "}
                事件来响应浏览器的前进/后退操作。URL
                看起来像正常的服务器路径，更加美观。
              </p>

              {/* API Explainer */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    api: "history.pushState(state, title, url)",
                    desc: "向历史栈添加一条记录，不会触发 popstate 事件",
                    color: "var(--quaternary)",
                  },
                  {
                    api: "history.replaceState(state, title, url)",
                    desc: "替换当前历史记录，不新增条目",
                    color: "var(--accent)",
                  },
                  {
                    api: "window.onpopstate",
                    desc: "用户点击前进/后退按钮时触发，pushState 本身不触发",
                    color: "var(--secondary)",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4"
                    style={{
                      border: `2px solid ${item.color}`,
                      background: `${item.color}10`,
                    }}
                  >
                    <p
                      className="text-xs font-mono font-bold mb-2 truncate"
                      style={{ color: item.color }}
                    >
                      {item.api}
                    </p>
                    <p className="text-sm" style={{ opacity: 0.75 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Source code */}
            <div className="p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3
                    className="font-bold text-lg mb-3 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    <FileCode
                      size={20}
                      strokeWidth={2.5}
                      style={{ color: "var(--quaternary)" }}
                    />
                    源码：HTML5History 类
                  </h3>
                  <CodeBlock
                    title="src/history/html5.ts"
                    code={`// Vue Router 源码 - HTML5History 类
export class HTML5History extends History {
  constructor(router, base) {
    super(router, base);
    // 监听 popstate 事件
    this.setupListeners();
  }

  setupListeners() {
    // 监听浏览器前进/后退
    window.addEventListener('popstate', (e) => {
      const current = this.current;
      // 获取当前路径（去掉 base）
      const location = getLocation(this.base);
      // 防止重复触发
      if (isSameRoute(current, location)) return;
      // 执行路由跳转
      this.transitionTo(location, (route) => {
        // 修正滚动位置等
        handleScroll(router, route, current, true);
      });
    });
  }

  // push 方法
  push(location, onComplete) {
    const { current } = this;
    this.transitionTo(location, (route) => {
      // 使用 pushState 改变 URL
      pushState(cleanPath(this.base + route.fullPath));
      onComplete && onComplete(route);
    });
  }
}`}
                  />
                </div>

                <div>
                  <h3
                    className="font-bold text-lg mb-3 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    <Binary
                      size={20}
                      strokeWidth={2.5}
                      style={{ color: "var(--quaternary)" }}
                    />
                    源码：pushState 辅助函数
                  </h3>
                  <CodeBlock
                    title="src/util/push-state.ts"
                    code={`// 推入历史记录
export function pushState(url) {
  // 保存当前滚动位置
  saveScrollPosition();
  // 调用原生 API
  // 第一个参数是 state 对象
  // 可用于存储额外信息
  window.history.pushState(
    { key: getStateKey() },
    '',
    url
  );
}

// 替换当前记录
export function replaceState(url) {
  window.history.replaceState(
    { key: getStateKey() },
    '',
    url
  );
}

// 获取当前路径（不含 base）
export function getLocation(base) {
  let path = decodeURI(
    window.location.pathname
  );
  // 如果路径以 base 开头，去掉 base
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + 
    window.location.search + 
    window.location.hash;
}`}
                  />
                </div>
              </div>

              {/* Key insight */}
              <div
                className="mt-6 rounded-2xl p-6"
                style={{
                  border: "3px solid var(--foreground)",
                  background:
                    "linear-gradient(135deg, rgba(52,211,153,0.08), rgba(139,92,246,0.08))",
                  boxShadow: "6px 6px 0px 0px var(--quaternary)",
                }}
              >
                <h4
                  className="font-bold text-lg mb-3 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  🔑 关键理解：pushState vs popstate
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className="rounded-xl p-4"
                    style={{
                      border: "2px solid var(--quaternary)",
                      background: "white",
                    }}
                  >
                    <p
                      className="font-bold text-sm mb-2"
                      style={{
                        color: "var(--quaternary)",
                        fontFamily: "var(--font-outfit)",
                      }}
                    >
                      pushState() 调用时
                    </p>
                    <p className="text-sm" style={{ opacity: 0.75 }}>
                      Vue Router 主动调用 <code>pushState()</code> 改变
                      URL，然后<strong>自己</strong>执行{" "}
                      <code>transitionTo()</code> 来匹配路由和渲染组件。
                      <code>popstate</code> 事件<strong>不会</strong>被触发。
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-4"
                    style={{
                      border: "2px solid var(--secondary)",
                      background: "white",
                    }}
                  >
                    <p
                      className="font-bold text-sm mb-2"
                      style={{
                        color: "var(--secondary)",
                        fontFamily: "var(--font-outfit)",
                      }}
                    >
                      浏览器前进/后退时
                    </p>
                    <p className="text-sm" style={{ opacity: 0.75 }}>
                      用户点击浏览器按钮，<code>popstate</code> 事件
                      <strong>被触发</strong>。Vue Router 在事件回调中获取新
                      URL，执行 <code>transitionTo()</code>。
                    </p>
                  </div>
                </div>
              </div>

              {/* Pros and cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div
                  className="topic-card rounded-2xl p-5"
                  style={{ borderColor: "var(--quaternary)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">✅</span>
                    <h4
                      className="font-bold"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      优点
                    </h4>
                  </div>
                  <ul className="text-sm space-y-1.5" style={{ opacity: 0.8 }}>
                    <li className="flex items-start gap-2">
                      <ChevronRight
                        size={14}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--quaternary)" }}
                      />
                      URL 美观、语义化，像正常服务器路径
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight
                        size={14}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--quaternary)" }}
                      />
                      SEO 更友好
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight
                        size={14}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--quaternary)" }}
                      />
                      可以利用 state 传递额外数据
                    </li>
                  </ul>
                </div>
                <div
                  className="topic-card rounded-2xl p-5"
                  style={{ borderColor: "var(--secondary)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">⚠️</span>
                    <h4
                      className="font-bold"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      缺点
                    </h4>
                  </div>
                  <ul className="text-sm space-y-1.5" style={{ opacity: 0.8 }}>
                    <li className="flex items-start gap-2">
                      <ChevronRight
                        size={14}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--secondary)" }}
                      />
                      需要服务端配置 fallback 到 index.html
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight
                        size={14}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--secondary)" }}
                      />
                      不支持 IE9 及以下
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight
                        size={14}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--secondary)" }}
                      />
                      部署时需要额外的服务器端配置
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 3: NAVIGATION FLOW ═══════════════ */}
        <section id="section-3" data-section="3" className="mb-16">
          <div
            className="rounded-3xl p-8 lg:p-10 animate-pop"
            style={{
              border: "3px solid var(--foreground)",
              background: "var(--card)",
              boxShadow: "8px 8px 0px 0px var(--secondary)",
            }}
          >
            <div className="flex items-start gap-4 mb-8">
              <GeoBadge color="white" bg="var(--secondary)" size={56}>
                <Navigation size={28} strokeWidth={2.5} />
              </GeoBadge>
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{
                    color: "var(--secondary)",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  Navigation Pipeline
                </p>
                <h2
                  className="text-2xl lg:text-3xl font-extrabold"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  完整的导航解析流程
                </h2>
              </div>
            </div>

            {/* Flow diagram */}
            <div className="space-y-0">
              {NAVIGATION_STEPS.map((step, i) => (
                <div key={step.id} className="flex gap-4">
                  {/* Left timeline */}
                  <div className="flex flex-col items-center">
                    <div
                      className="flex items-center justify-center rounded-full text-white font-bold text-sm shrink-0 animate-pop"
                      style={{
                        width: 44,
                        height: 44,
                        background: step.color,
                        border: "3px solid var(--foreground)",
                        boxShadow: `3px 3px 0px 0px var(--foreground)`,
                        fontFamily: "var(--font-outfit)",
                        animationDelay: `${i * 0.15}s`,
                      }}
                    >
                      {step.id}
                    </div>
                    {i < NAVIGATION_STEPS.length - 1 && (
                      <div
                        className="w-0.5 flex-1 min-h-8"
                        style={{
                          background: `repeating-linear-gradient(to bottom, var(--foreground) 0, var(--foreground) 4px, transparent 4px, transparent 8px)`,
                        }}
                      />
                    )}
                  </div>

                  {/* Right content */}
                  <div
                    className="topic-card rounded-2xl p-5 flex-1 mb-3 animate-slide"
                    style={{
                      animationDelay: `${i * 0.15 + 0.1}s`,
                      borderColor: step.color,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="p-1.5 rounded-lg"
                        style={{
                          background: `${step.color}20`,
                          color: step.color,
                        }}
                      >
                        {step.icon}
                      </div>
                      <h4
                        className="font-bold"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {step.label}
                      </h4>
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ opacity: 0.75 }}
                    >
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Source: Navigation confirm */}
            <div className="mt-8">
              <h3
                className="font-bold text-lg mb-3 flex items-center gap-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                <Code2
                  size={20}
                  strokeWidth={2.5}
                  style={{ color: "var(--secondary)" }}
                />
                源码：resolveQueue 导航确认队列
              </h3>
              <CodeBlock
                title="src/history/base.ts → transitionTo"
                code={`// 核心跳转方法
transitionTo(location, onComplete) {
  // 1. 根据 location 匹配路由
  const route = this.router.match(location, this.current);
  
  // 2. 确认导航（执行守卫队列）
  this.confirmTransition(
    route,
    () => {
      // 导航确认后的回调
      this.updateRoute(route);
      onComplete && onComplete(route);
      // 触发 afterEach 钩子
      this.router.afterHooks.forEach(hook => hook(route, this.current));
    },
    (err) => {
      // 导航被中断或出错
      if (err && err.type === 2) return; // NavigationDuplicated
      if (err) this.router.onError(err);
    }
  );
}

// 确认导航 - 执行守卫队列
confirmTransition(route, onComplete, onAbort) {
  const queue = [].concat(
    // 解析守卫（组件级别）
    this.router.resolveHooks,
    // 激活守卫（组件级别）
    activateHooks,
    // 全局 afterEach
    this.router.afterHooks
  );
  
  // 使用 iterator 模式串行执行守卫
  const iterator = (hook, next) => {
    // 每个守卫接收 next 函数
    // 调用 next() 继续，next(false) 中断
    // next('/other') 重定向
    hook(route, current, (to) => {
      if (to === false) {
        onAbort(err);
      } else {
        next(to);
      }
    });
  };
  
  runQueue(queue, iterator, onComplete);
}`}
              />
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 4: ROUTE MATCHING ═══════════════ */}
        <section id="section-4" data-section="4" className="mb-16">
          <div
            className="rounded-3xl p-8 lg:p-10 animate-pop"
            style={{
              border: "3px solid var(--foreground)",
              background: "var(--card)",
              boxShadow: "8px 8px 0px 0px var(--accent)",
            }}
          >
            <div className="flex items-start gap-4 mb-8">
              <GeoBadge color="white" bg="var(--accent)" size={56}>
                <Map size={28} strokeWidth={2.5} />
              </GeoBadge>
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  Route Matching
                </p>
                <h2
                  className="text-2xl lg:text-3xl font-extrabold"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  路由匹配与 RouterMatcher
                </h2>
              </div>
            </div>

            <p
              className="text-base leading-relaxed mb-6"
              style={{ opacity: 0.8 }}
            >
              Vue Router 使用{" "}
              <code
                className="px-1.5 py-0.5 rounded text-sm font-bold"
                style={{
                  background: "var(--accent)",
                  color: "white",
                  fontFamily: "monospace",
                }}
              >
                path-to-regexp
              </code>{" "}
              库将路由配置中的路径字符串编译为正则表达式，
              从而实现高效的路径匹配。在 Vue Router 4.x 中，匹配逻辑被重写为{" "}
              <code
                className="px-1.5 py-0.5 rounded text-sm font-bold"
                style={{
                  background: "var(--accent)",
                  color: "white",
                  fontFamily: "monospace",
                }}
              >
                RouterMatcher
              </code>
              。
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Matching examples */}
              <div>
                <h3
                  className="font-bold text-lg mb-4 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <Eye
                    size={20}
                    strokeWidth={2.5}
                    style={{ color: "var(--accent)" }}
                  />
                  匹配示例
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      pattern: "/user/:id",
                      url: "/user/42",
                      params: '{ id: "42" }',
                      matched: true,
                    },
                    {
                      pattern: "/docs/:section+",
                      url: "/docs/a/b/c",
                      params: '{ section: ["a","b","c"] }',
                      matched: true,
                    },
                    {
                      pattern: "/files/:name(.*)",
                      url: "/files/a/b/c.txt",
                      params: '{ name: "a/b/c.txt" }',
                      matched: true,
                    },
                    {
                      pattern: "/home",
                      url: "/about",
                      params: "无",
                      matched: false,
                    },
                  ].map((ex, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-4 animate-slide"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        border: `2px solid ${ex.matched ? "var(--quaternary)" : "var(--secondary)"}`,
                        background: ex.matched
                          ? "rgba(52,211,153,0.05)"
                          : "rgba(244,114,182,0.05)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <code
                          className="text-sm font-bold font-mono px-2 py-0.5 rounded"
                          style={{
                            background: "var(--foreground)",
                            color: "white",
                          }}
                        >
                          {ex.pattern}
                        </code>
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: ex.matched
                              ? "var(--quaternary)"
                              : "var(--secondary)",
                            color: "white",
                            fontFamily: "var(--font-outfit)",
                          }}
                        >
                          {ex.matched ? "✓ MATCH" : "✗ MISS"}
                        </span>
                      </div>
                      <div
                        className="text-xs font-mono"
                        style={{ opacity: 0.6 }}
                      >
                        <p>URL: {ex.url}</p>
                        <p>params: {ex.params}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Source code */}
              <div>
                <h3
                  className="font-bold text-lg mb-4 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <FileCode
                    size={20}
                    strokeWidth={2.5}
                    style={{ color: "var(--accent)" }}
                  />
                  源码：createRouterMatcher
                </h3>
                <CodeBlock
                  title="src/matcher/index.ts"
                  code={`// Vue Router 4.x 的匹配器
export function createRouterMatcher(
  routes, 
  globalOptions
) {
  // 路由记录表
  const matchers = [];
  
  // 递归添加路由记录
  function addRoute(record, parent) {
    // 标准化路径
    const normalizedRecord = {
      ...record,
      // 拼接父路由路径
      path: normalizePath(
        parent 
          ? parent.path + '/' + record.path 
          : record.path
      ),
      // 子路由路径也需要拼接
    };
    
    // 创建 MatcherRecord
    const matcher = createRouteRecord(
      normalizedRecord, 
      parent
    );
    
    // 编译路径为正则
    // 使用 path-to-regexp
    matcher.re = pathToRegexp(
      matcher.path, 
      [], 
      { end: false }
    );
    
    matchers.push(matcher);
    
    // 递归处理嵌套路由 children
    if (record.children) {
      record.children.forEach(child => 
        addRoute(child, matcher.record)
      );
    }
  }
  
  // match 方法：遍历匹配
  function match(location, currentRoute) {
    for (const matcher of matchers) {
      const matched = location.path.match(matcher.re);
      if (matched) {
        // 提取 params
        const params = extractParams(
          matcher.record, 
          matched
        );
        return createRoute(matcher.record, {
          params,
          path: location.path,
        });
      }
    }
    // 无匹配时返回 404
    return createRoute(null, {
      path: location.path,
    });
  }
  
  // 初始化：注册所有路由
  routes.forEach(route => addRoute(route));
  
  return { addRoute, match, getRoutes };
}`}
                />
              </div>
            </div>

            {/* Nested routes explainer */}
            <div
              className="mt-6 rounded-2xl p-6"
              style={{
                border: "2px solid var(--accent)",
                background: "rgba(139,92,246,0.04)",
              }}
            >
              <h4
                className="font-bold text-base mb-3 flex items-center gap-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                🪆 嵌套路由的路径拼接
              </h4>
              <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
                <span
                  className="px-3 py-1.5 rounded-lg font-bold"
                  style={{ background: "var(--accent)", color: "white" }}
                >
                  /user
                </span>
                <span className="text-gray-400">+</span>
                <span
                  className="px-3 py-1.5 rounded-lg font-bold"
                  style={{ background: "var(--secondary)", color: "white" }}
                >
                  /profile
                </span>
                <span className="text-gray-400">+</span>
                <span
                  className="px-3 py-1.5 rounded-lg font-bold"
                  style={{
                    background: "var(--tertiary)",
                    color: "var(--foreground)",
                  }}
                >
                  /settings
                </span>
                <span className="text-gray-400 mx-2">=</span>
                <span
                  className="px-3 py-1.5 rounded-lg font-bold"
                  style={{ background: "var(--foreground)", color: "white" }}
                >
                  /user/profile/settings
                </span>
              </div>
              <p className="text-sm mt-3" style={{ opacity: 0.7 }}>
                子路由的 path 会与父路由的 path 自动拼接，生成完整的匹配路径。
                每一层嵌套都有自己的{" "}
                <code
                  className="px-1 py-0.5 rounded"
                  style={{
                    background: "#f0f0f0",
                    fontFamily: "monospace",
                    fontSize: "0.8em",
                  }}
                >
                  &lt;router-view&gt;
                </code>
                。
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 5: INTERACTIVE PLAYGROUND ═══════════════ */}
        <section id="section-5" data-section="5" className="mb-16">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <GeoBadge color="white" bg="var(--accent)" size={48}>
                <MousePointerClick size={24} strokeWidth={2.5} />
              </GeoBadge>
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  Interactive Playground
                </p>
                <h2
                  className="text-2xl lg:text-3xl font-extrabold"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  动手实验：路由模拟器
                </h2>
              </div>
            </div>
            <p className="text-base max-w-2xl" style={{ opacity: 0.7 }}>
              下方模拟器展示了 Vue Router 的核心工作流程。切换 Hash / History
              模式， 点击不同路由按钮，观察 URL 变化、路由匹配和内部日志。
            </p>
          </div>

          <RouterSimulator />

          {/* Comparison table */}
          <div
            className="mt-8 rounded-3xl overflow-hidden animate-pop"
            style={{
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--foreground)",
              background: "var(--card)",
            }}
          >
            <div
              className="px-6 py-4"
              style={{
                borderBottom: "2px solid var(--foreground)",
                background: "var(--foreground)",
              }}
            >
              <h3
                className="font-bold text-white text-lg"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                📊 Hash vs History 对比总览
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border)" }}>
                    {["特性", "Hash 模式", "History 模式"].map((h, i) => (
                      <th
                        key={i}
                        className="px-5 py-3 text-left font-bold"
                        style={{
                          fontFamily: "var(--font-outfit)",
                          background: "#fafaf7",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "URL 示例",
                      hash: "example.com/#/user/42",
                      history: "example.com/user/42",
                    },
                    {
                      feature: "核心 API",
                      hash: "hashchange 事件",
                      history: "pushState / popstate",
                    },
                    {
                      feature: "服务端配置",
                      hash: "无需配置 ✅",
                      history: "需要 fallback ⚠️",
                    },
                    {
                      feature: "浏览器兼容",
                      hash: "IE8+",
                      history: "IE10+",
                    },
                    {
                      feature: "SEO 友好",
                      hash: "较差",
                      history: "较好",
                    },
                    {
                      feature: "默认模式",
                      hash: "是（Vue Router 2.x/3.x）",
                      history: "是（Vue Router 4.x）",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="animate-slide"
                      style={{
                        animationDelay: `${i * 0.05}s`,
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <td
                        className="px-5 py-3 font-bold"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {row.feature}
                      </td>
                      <td className="px-5 py-3">{row.hash}</td>
                      <td className="px-5 py-3">{row.history}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══════════════ SUMMARY CARDS ═══════════════ */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Server config */}
            <div
              className="topic-card rounded-2xl p-6 animate-pop"
              style={{ boxShadow: "6px 6px 0px 0px var(--tertiary)" }}
            >
              <GeoBadge
                color="var(--foreground)"
                bg="var(--tertiary)"
                size={48}
              >
                <Terminal size={24} strokeWidth={2.5} />
              </GeoBadge>
              <h3
                className="font-bold text-lg mt-4 mb-3"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Nginx 配置示例（History 模式）
              </h3>
              <CodeBlock
                title="nginx.conf"
                lang="nginx"
                code={`server {
    listen 80;
    server_name example.com;
    root /var/www/dist;

    location / {
        # 关键：所有请求 fallback 到 index.html
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}`}
              />
            </div>

            {/* Vue Router 4 init */}
            <div
              className="topic-card rounded-2xl p-6 animate-pop"
              style={{
                animationDelay: "0.1s",
                boxShadow: "6px 6px 0px 0px var(--quaternary)",
              }}
            >
              <GeoBadge color="white" bg="var(--quaternary)" size={48}>
                <Code2 size={24} strokeWidth={2.5} />
              </GeoBadge>
              <h3
                className="font-bold text-lg mt-4 mb-3"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Vue Router 4 初始化代码
              </h3>
              <CodeBlock
                title="router/index.ts"
                lang="ts"
                code={`import { 
  createRouter, 
  createWebHistory,
  createWebHashHistory 
} from 'vue-router'

// History 模式（推荐）
const router = createRouter({
  history: createWebHistory('/app'),
  routes: [
    { 
      path: '/', 
      component: Home 
    },
    { 
      path: '/user/:id',
      name: 'user',
      component: () => import('./User.vue'),
      children: [
        { 
          path: 'profile', 
          component: UserProfile 
        },
        { 
          path: 'settings', 
          component: UserSettings 
        }
      ]
    }
  ]
})

// Hash 模式（兼容性场景）
// const router = createRouter({
//   history: createWebHashHistory(),
//   routes: [...]
// })

export default router`}
              />
            </div>
          </div>
        </section>

        {/* ═══════════════ FINAL TAKEAWAYS ═══════════════ */}
        <section className="mb-8">
          <div
            className="rounded-3xl p-8 lg:p-10 animate-pop"
            style={{
              border: "3px solid var(--foreground)",
              background:
                "linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%)",
              boxShadow: "8px 8px 0px 0px var(--foreground)",
              color: "white",
            }}
          >
            <h2
              className="text-2xl lg:text-3xl font-extrabold mb-6"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              🎯 核心要点总结
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Hash 模式",
                  items: [
                    "监听 hashchange 事件",
                    "利用 # 号不发送到服务器",
                    "通过 window.location.hash 读写",
                    "无需服务端配置",
                  ],
                  icon: <Hash size={20} strokeWidth={2.5} />,
                },
                {
                  title: "History 模式",
                  items: [
                    "使用 pushState / replaceState",
                    "监听 popstate 事件（仅前进/后退）",
                    "URL 看起来像真实路径",
                    "需要服务端 fallback 配置",
                  ],
                  icon: <Globe size={20} strokeWidth={2.5} />,
                },
                {
                  title: "导航守卫",
                  items: [
                    "beforeEach → beforeRouteEnter",
                    "beforeResolve → afterEach",
                    "支持异步和 next() 控制流",
                    "可用于权限验证、数据预取",
                  ],
                  icon: <Shield size={20} strokeWidth={2.5} />,
                },
                {
                  title: "路由匹配",
                  items: [
                    "path-to-regexp 编译路径正则",
                    "支持参数 :id、通配符 *、可选 ?",
                    "嵌套路由路径自动拼接",
                    "createRouterMatcher 高效匹配",
                  ],
                  icon: <Map size={20} strokeWidth={2.5} />,
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 animate-slide"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    background: "rgba(255,255,255,0.12)",
                    border: "2px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="p-2 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.2)" }}
                    >
                      {card.icon}
                    </div>
                    <h4
                      className="font-bold text-lg"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {card.title}
                    </h4>
                  </div>
                  <ul className="space-y-1.5">
                    {card.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm"
                        style={{ opacity: 0.9 }}
                      >
                        <ChevronRight
                          size={14}
                          strokeWidth={2.5}
                          className="mt-0.5 shrink-0"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              className="mt-6 rounded-xl p-4 text-center"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "2px dashed rgba(255,255,255,0.3)",
              }}
            >
              <p
                className="text-sm font-bold"
                style={{ fontFamily: "var(--font-outfit)", opacity: 0.9 }}
              >
                💡 现代项目推荐使用 <strong>History 模式</strong>（Vue Router
                4.x 默认）， 配合服务端的{" "}
                <code
                  className="px-1.5 py-0.5 rounded"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    fontFamily: "monospace",
                  }}
                >
                  try_files $uri /index.html
                </code>{" "}
                即可获得最佳体验。
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ──── Global style overrides ──── */}
      <style jsx global>{`
        @keyframes pop-in {
          0% {
            opacity: 0;
            transform: scale(0.6);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-pop {
          animation: pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .animate-slide {
          animation: slide-up 0.5s ease-out both;
        }
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .topic-card {
          background: var(--card);
          border: 2px solid var(--foreground);
          transition:
            transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.25s ease;
        }
        .topic-card:hover {
          transform: rotate(-1deg) scale(1.02);
          box-shadow: 8px 8px 0px 0px var(--foreground);
        }
        .bg-dot-grid {
          background-image: radial-gradient(
            circle,
            var(--border) 1.2px,
            transparent 1.2px
          );
          background-size: 24px 24px;
        }
        code {
          font-size: 0.85em;
          padding: 0.15em 0.35em;
          border-radius: 4px;
          background: rgba(0, 0, 0, 0.06);
        }
        :root {
          --font-outfit: "Outfit", "Inter", sans-serif;
          --font-body: "Plus Jakarta Sans", "Inter", sans-serif;
        }
        body {
          font-family: var(--font-body);
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: var(--font-outfit);
        }
      `}</style>
    </div>
  );
}
