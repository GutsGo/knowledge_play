// app/topics/flutter-vs-react-native/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Layers,
  Zap,
  Palette,
  Cpu,
  Smartphone,
  Globe,
  Code2,
  Package,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Minus,
  ChevronRight,
  Box,
  Paintbrush,
  Timer,
  GitBranch,
  Star,
  Rocket,
  Shield,
  Gauge,
  Smartphone as Phone,
  Monitor,
  AppWindow,
  Heart,
  Lightbulb,
  BookOpen,
  Target,
  Flame,
  Sparkles,
  CircuitBoard,
  Workflow,
  BarChart3,
  MessageSquare,
  Puzzle,
  Settings2,
} from "lucide-react";

/* ─────────────────────────────────────────────
   常量数据
   ───────────────────────────────────────────── */
const COMPARISON_DATA = [
  {
    category: "渲染引擎",
    icon: <Cpu strokeWidth={2.5} size={22} />,
    flutter: "Skia / Impeller 自绘引擎",
    rn: "原生平台 View (桥接通信)",
    flutterAdvantage: true,
    rnAdvantage: false,
  },
  {
    category: "开发语言",
    icon: <Code2 strokeWidth={2.5} size={22} />,
    flutter: "Dart（Google 出品）",
    rn: "JavaScript / TypeScript",
    flutterAdvantage: null,
    rnAdvantage: null,
  },
  {
    category: "UI 一致性",
    icon: <Paintbrush strokeWidth={2.5} size={22} />,
    flutter: "⭐⭐⭐⭐⭐ 跨平台像素一致",
    rn: "⭐⭐⭐ 依赖平台原生组件",
    flutterAdvantage: true,
    rnAdvantage: false,
  },
  {
    category: "热重载",
    icon: <Zap strokeWidth={2.5} size={22} />,
    flutter: "Hot Reload / Hot Restart",
    rn: "Fast Refresh (HMR)",
    flutterAdvantage: null,
    rnAdvantage: null,
  },
  {
    category: "性能",
    icon: <Gauge strokeWidth={2.5} size={22} />,
    flutter: "AOT 编译，接近原生",
    rn: "JIT → Bridge → 原生渲染",
    flutterAdvantage: true,
    rnAdvantage: false,
  },
  {
    category: "生态 & 社区",
    icon: <Users strokeWidth={2.5} size={22} />,
    flutter: "pub.dev 快速增长中",
    rn: "npm 生态极其庞大",
    flutterAdvantage: false,
    rnAdvantage: true,
  },
  {
    category: "学习曲线",
    icon: <BookOpen strokeWidth={2.5} size={22} />,
    flutter: "需学 Dart + Widget 体系",
    rn: "前端工程师几乎零成本",
    flutterAdvantage: false,
    rnAdvantage: true,
  },
  {
    category: "Web & 桌面支持",
    icon: <Globe strokeWidth={2.5} size={22} />,
    flutter: "官方 Web / Win / macOS / Linux",
    rn: "社区方案 (react-native-web 等)",
    flutterAdvantage: true,
    rnAdvantage: false,
  },
  {
    category: "大厂背书",
    icon: <Shield strokeWidth={2.5} size={22} />,
    flutter: "Google",
    rn: "Meta (Facebook)",
    flutterAdvantage: null,
    rnAdvantage: null,
  },
];

const ARCHITECTURE_FLUTTER = [
  {
    layer: "Dart App",
    desc: "开发者编写的业务逻辑和 UI 代码",
    color: "var(--accent)",
    icon: <Code2 strokeWidth={2.5} size={20} />,
  },
  {
    layer: "Flutter Framework",
    desc: "Widget、Material/Cupertino、动画、手势",
    color: "var(--secondary)",
    icon: <Layers strokeWidth={2.5} size={20} />,
  },
  {
    layer: "Flutter Engine (C++)",
    desc: "Skia/Impeller 渲染、Dart VM、平台通道",
    color: "var(--tertiary)",
    icon: <Cpu strokeWidth={2.5} size={20} />,
  },
  {
    layer: "Embedder (平台壳)",
    desc: "Android/iOS/Windows/macOS/Linux/Web",
    color: "var(--quaternary)",
    icon: <Smartphone strokeWidth={2.5} size={20} />,
  },
];

const ARCHITECTURE_RN = [
  {
    layer: "JS Bundle",
    desc: "React 组件 + 业务逻辑 + JS 线程",
    color: "var(--accent)",
    icon: <Code2 strokeWidth={2.5} size={20} />,
  },
  {
    layer: "React Native 框架",
    desc: "核心组件映射、虚拟 DOM Diff",
    color: "var(--secondary)",
    icon: <Layers strokeWidth={2.5} size={20} />,
  },
  {
    layer: "JSI / Bridge / Fabric",
    desc: "JS ↔ Native 通信层 (新架构 JSI)",
    color: "var(--tertiary)",
    icon: <CircuitBoard strokeWidth={2.5} size={20} />,
  },
  {
    layer: "原生平台 UI",
    desc: "UIKit / Android View / 自定义组件",
    color: "var(--quaternary)",
    icon: <Smartphone strokeWidth={2.5} size={20} />,
  },
];

const TIMELINE = [
  {
    year: "2015",
    event: "React Native 开源",
    detail: "Facebook 发布 RN，引爆跨端开发热潮",
    side: "rn" as const,
  },
  {
    year: "2017",
    event: "React Native 大规模落地",
    detail: "Airbnb、Uber 等纷纷采用 RN 方案",
    side: "rn" as const,
  },
  {
    year: "2018",
    event: "Flutter Beta 发布",
    detail: "Google I/O 发布 Flutter Beta，引入 Dart 语言",
    side: "flutter" as const,
  },
  {
    year: "2019",
    event: "Flutter 1.0 正式版",
    detail: "首个稳定版本，Dart 2 完善类型系统",
    side: "flutter" as const,
  },
  {
    year: "2020",
    event: "RN 新架构提案",
    detail: "Fabric 渲染器 + JSI + TurboModules 提案",
    side: "rn" as const,
  },
  {
    year: "2021",
    event: "Flutter 2.0 多平台",
    detail: "宣布 Web、Windows、macOS、Linux 稳定支持",
    side: "flutter" as const,
  },
  {
    year: "2022",
    event: "RN 新架构正式启用",
    detail: "Fabric + JSI 在 Meta 内部全面落地",
    side: "rn" as const,
  },
  {
    year: "2023",
    event: "Flutter 3.x + Impeller",
    detail: "Impeller 默认渲染引擎，性能大幅提升",
    side: "flutter" as const,
  },
  {
    year: "2024",
    event: "两者持续迭代",
    detail: "Flutter 强化 Web/嵌入式，RN 完善新架构生态",
    side: "both" as const,
  },
];

const PERFORMANCE_BARS = [
  { label: "启动速度", flutter: 88, rn: 72 },
  { label: "帧率 (FPS)", flutter: 92, rn: 78 },
  { label: "内存占用", flutter: 75, rn: 80 },
  { label: "包体积", flutter: 65, rn: 78 },
  { label: "动画流畅度", flutter: 95, rn: 80 },
  { label: "复杂列表", flutter: 90, rn: 70 },
];

const ECOSYSTEM_ITEMS = {
  flutter: [
    { name: "状态管理", items: ["Riverpod", "Bloc", "GetX", "Provider"] },
    { name: "路由导航", items: ["go_router", "auto_route", "Navigator 2.0"] },
    { name: "网络请求", items: ["Dio", "http", "retrofit.dart"] },
    { name: "本地存储", items: ["Hive", "Isar", "sqflite", "SharedPrefs"] },
    { name: "UI 组件库", items: ["Flutter UI kit", "GetX widgets", "Material 3"] },
  ],
  rn: [
    { name: "状态管理", items: ["Redux Toolkit", "Zustand", "MobX", "Jotai"] },
    { name: "路由导航", items: ["React Navigation", "Expo Router"] },
    { name: "网络请求", items: ["Axios", "TanStack Query", "RTK Query"] },
    { name: "本地存储", items: ["MMKV", "AsyncStorage", "WatermelonDB"] },
    { name: "UI 组件库", items: ["NativeBase", "Tamagui", "React Native Paper"] },
  ],
};

const COMPANIES_USING = {
  flutter: ["Google", "Alibaba", "BMW", "eBay", "Nubank", "ByteDance"],
  rn: ["Meta", "Microsoft", "Shopify", "Discord", "Pinterest", "Coinbase"],
};

const DECISION_FACTORS = [
  {
    question: "你的团队主力技术栈是？",
    optionA: { label: "Dart / 移动原生", result: "flutter" },
    optionB: { label: "JavaScript / React", result: "rn" },
  },
  {
    question: "UI 一致性优先级？",
    optionA: { label: "像素级一致", result: "flutter" },
    optionB: { label: "遵循平台设计", result: "rn" },
  },
  {
    question: "需要覆盖的平台？",
    optionA: { label: "移动 + Web + 桌面", result: "flutter" },
    optionB: { label: "主要是 iOS + Android", result: "rn" },
  },
  {
    question: "对原生能力的依赖程度？",
    optionA: { label: "中等，可自绘UI", result: "flutter" },
    optionB: { label: "重度依赖原生模块", result: "rn" },
  },
];

/* ─────────────────────────────────────────────
   主组件
   ───────────────────────────────────────────── */
export default function FlutterVsReactNativePage() {
  const [activeTab, setActiveTab] = useState<"flutter" | "rn">("flutter");
  const [animatedBars, setAnimatedBars] = useState(false);
  const [selectedDecisions, setSelectedDecisions] = useState<
    Record<number, string>
  >({});
  const perfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimatedBars(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (perfRef.current) observer.observe(perfRef.current);
    return () => observer.disconnect();
  }, []);

  const getResult = () => {
    const votes: Record<string, number> = { flutter: 0, rn: 0 };
    Object.entries(selectedDecisions).forEach(([key, value]) => {
      votes[value] = (votes[value] || 0) + 1;
    });
    return votes.flutter > votes.rn
      ? "flutter"
      : votes.rn > votes.flutter
      ? "rn"
      : null;
  };

  return (
    <div className="bg-dot-grid min-h-screen">
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative container overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        {/* 背景几何装饰 */}
        <div
          className="absolute -top-20 -left-20 w-72 h-72 md:w-96 md:h-96 opacity-15 -z-10"
          style={{
            background: "var(--tertiary)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        <div
          className="absolute top-40 -right-16 w-56 h-56 md:w-80 md:h-80 opacity-10 -z-10"
          style={{
            background: "var(--accent)",
            borderRadius: "40% 60% 70% 30% / 30% 60% 40% 70%",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-48 h-48 opacity-10 -z-10"
          style={{
            background: "var(--secondary)",
            borderRadius: "50% 50% 30% 70% / 40% 60% 40% 60%",
          }}
        />

        <div className="container mx-auto px-6">
          {/* 面包屑 */}
          <div
            className="animate-pop inline-flex items-center gap-2 px-4 py-2 mb-8"
            style={{
              background: "var(--card)",
              border: "2px solid var(--foreground)",
              borderRadius: "var(--radius-full)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <Layers strokeWidth={2.5} size={16} style={{ color: "var(--accent)" }} />
            <span
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: "var(--foreground)", fontFamily: "Outfit, sans-serif" }}
            >
              跨端方案深度对比
            </span>
          </div>

          {/* 主标题 */}
          <h1
            className="animate-pop text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
            style={{
              fontFamily: "Outfit, sans-serif",
              color: "var(--foreground)",
            }}
          >
            Flutter{" "}
            <span
              className="inline-block px-3 py-1 mx-2 text-3xl md:text-5xl lg:text-6xl"
              style={{
                color: "var(--card)",
                background: "var(--accent)",
                borderRadius: "var(--radius-md)",
                border: "3px solid var(--foreground)",
                boxShadow: "6px 6px 0px 0px var(--foreground)",
                transform: "rotate(-2deg)",
              }}
            >
              vs
            </span>{" "}
            <br className="hidden md:block" />
            React Native
          </h1>

          {/* 副标题 */}
          <p
            className="animate-slide text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
            style={{
              color: "#475569",
              fontFamily: "Plus Jakarta Sans, sans-serif",
              animationDelay: "0.15s",
            }}
          >
            2024 年跨平台移动开发领域最热门的两大框架正面交锋。从渲染引擎到生态建设，从性能表现到开发者体验——全方位深度解析，助你做出技术选型决策。
          </p>

          {/* 双 Logo 对决卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* Flutter 卡片 */}
            <div
              className="animate-slide topic-card p-6 md:p-8"
              style={{ animationDelay: "0.25s" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 flex items-center justify-center"
                  style={{
                    background: "#E0E7FF",
                    border: "2px solid var(--foreground)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "4px 4px 0px 0px var(--accent)",
                  }}
                >
                  <span className="text-2xl">🐦</span>
                </div>
                <div>
                  <h3
                    className="text-xl font-extrabold"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    Flutter
                  </h3>
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "var(--accent)" }}
                  >
                    by Google · Dart
                  </span>
                </div>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#475569", fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                基于 Dart 语言和自绘引擎 Skia/Impeller，Flutter 能在所有平台上实现像素级一致的 UI 表现。一套代码，六个平台——从移动端到桌面端再到 Web。
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Dart", "Skia", "Impeller", "Widget"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-bold"
                    style={{
                      background: "#EDE9FE",
                      border: "2px solid var(--foreground)",
                      borderRadius: "var(--radius-full)",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* React Native 卡片 */}
            <div
              className="animate-slide topic-card p-6 md:p-8"
              style={{ animationDelay: "0.35s" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 flex items-center justify-center"
                  style={{
                    background: "#DBEAFE",
                    border: "2px solid var(--foreground)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "4px 4px 0px 0px var(--quaternary)",
                  }}
                >
                  <span className="text-2xl">⚛️</span>
                </div>
                <div>
                  <h3
                    className="text-xl font-extrabold"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    React Native
                  </h3>
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "var(--quaternary)" }}
                  >
                    by Meta · JavaScript
                  </span>
                </div>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#475569", fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                利用 JavaScript 和 React 范式构建原生应用。通过 Bridge / JSI 与平台原生 UI 通信，继承了 React 生态的全部优势，是前端工程师最友好的跨端方案。
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["JavaScript", "React", "JSI", "Fabric"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-bold"
                    style={{
                      background: "#D1FAE5",
                      border: "2px solid var(--foreground)",
                      borderRadius: "var(--radius-full)",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 架构对比 (Bento Grid) ═══════════════ */}
      <section className="container mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-2">
          <CircuitBoard strokeWidth={2.5} size={28} style={{ color: "var(--accent)" }} />
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--foreground)" }}
          >
            架构深度剖析
          </h2>
        </div>
        <p
          className="text-base mb-10 max-w-xl"
          style={{ color: "#64748B", fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          理解两者架构差异是做出技术选型的关键一步
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Flutter 架构 */}
          <div className="animate-slide" style={{ animationDelay: "0.1s" }}>
            <div
              className="flex items-center gap-3 mb-6 p-4"
              style={{
                background: "linear-gradient(135deg, #EDE9FE, #DDD6FE)",
                border: "2px solid var(--foreground)",
                borderRadius: "var(--radius-md)",
                boxShadow: "6px 6px 0px 0px var(--accent)",
              }}
            >
              <span className="text-2xl">🐦</span>
              <div>
                <h3 className="text-lg font-extrabold" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Flutter 架构分层
                </h3>
                <span className="text-xs font-bold" style={{ color: "var(--accent)" }}>
                  自绘引擎 · 无桥接
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {ARCHITECTURE_FLUTTER.map((layer, i) => (
                <div
                  key={layer.layer}
                  className="animate-slide flex items-start gap-4 p-4"
                  style={{
                    animationDelay: `${0.15 + i * 0.08}s`,
                    background: "var(--card)",
                    border: "2px solid var(--foreground)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                    position: "relative",
                  }}
                >
                  {/* 左侧色彩标识 */}
                  <div
                    className="w-1.5 h-full absolute left-0 top-0 bottom-0"
                    style={{
                      background: layer.color,
                      borderRadius: "var(--radius-md) 0 0 var(--radius-md)",
                    }}
                  />
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 ml-2"
                    style={{
                      background: layer.color,
                      border: "2px solid var(--foreground)",
                      borderRadius: "var(--radius-sm)",
                      color: "white",
                    }}
                  >
                    {layer.icon}
                  </div>
                  <div>
                    <h4
                      className="text-sm font-extrabold mb-1"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {layer.layer}
                    </h4>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "#64748B", fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      {layer.desc}
                    </p>
                  </div>
                  {i < ARCHITECTURE_FLUTTER.length - 1 && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
                      <ChevronRight
                        strokeWidth={3}
                        size={16}
                        className="rotate-90"
                        style={{ color: "var(--foreground)" }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              className="mt-5 p-4 text-sm"
              style={{
                background: "#FEF3C7",
                border: "2px dashed var(--tertiary)",
                borderRadius: "var(--radius-md)",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                color: "#92400E",
              }}
            >
              <Lightbulb strokeWidth={2.5} size={16} className="inline mr-2" />
              <strong>关键优势：</strong>Flutter 不依赖平台原生 UI 组件，通过自绘引擎直接在 Canvas 上绘制每一帧，从根本上消除了平台差异。
            </div>
          </div>

          {/* React Native 架构 */}
          <div className="animate-slide" style={{ animationDelay: "0.2s" }}>
            <div
              className="flex items-center gap-3 mb-6 p-4"
              style={{
                background: "linear-gradient(135deg, #D1FAE5, #A7F3D0)",
                border: "2px solid var(--foreground)",
                borderRadius: "var(--radius-md)",
                boxShadow: "6px 6px 0px 0px var(--quaternary)",
              }}
            >
              <span className="text-2xl">⚛️</span>
              <div>
                <h3 className="text-lg font-extrabold" style={{ fontFamily: "Outfit, sans-serif" }}>
                  React Native 架构分层
                </h3>
                <span className="text-xs font-bold" style={{ color: "var(--quaternary)" }}>
                  原生桥接 · 新架构 JSI
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {ARCHITECTURE_RN.map((layer, i) => (
                <div
                  key={layer.layer}
                  className="animate-slide flex items-start gap-4 p-4"
                  style={{
                    animationDelay: `${0.25 + i * 0.08}s`,
                    background: "var(--card)",
                    border: "2px solid var(--foreground)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                    position: "relative",
                  }}
                >
                  <div
                    className="w-1.5 h-full absolute left-0 top-0 bottom-0"
                    style={{
                      background: layer.color,
                      borderRadius: "var(--radius-md) 0 0 var(--radius-md)",
                    }}
                  />
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 ml-2"
                    style={{
                      background: layer.color,
                      border: "2px solid var(--foreground)",
                      borderRadius: "var(--radius-sm)",
                      color: "white",
                    }}
                  >
                    {layer.icon}
                  </div>
                  <div>
                    <h4
                      className="text-sm font-extrabold mb-1"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {layer.layer}
                    </h4>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "#64748B", fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      {layer.desc}
                    </p>
                  </div>
                  {i < ARCHITECTURE_RN.length - 1 && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
                      <ChevronRight
                        strokeWidth={3}
                        size={16}
                        className="rotate-90"
                        style={{ color: "var(--foreground)" }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              className="mt-5 p-4 text-sm"
              style={{
                background: "#DBEAFE",
                border: "2px dashed #3B82F6",
                borderRadius: "var(--radius-md)",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                color: "#1E40AF",
              }}
            >
              <Lightbulb strokeWidth={2.5} size={16} className="inline mr-2" />
              <strong>关键变化：</strong>新架构用 JSI (JavaScript Interface) 替代了旧的异步 Bridge，实现了同步调用，大幅减少通信开销。Fabric 渲染器支持并发渲染。
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 全维度对比表 ═══════════════ */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(180deg, transparent, #F5F3FF 30%, #FDF2F8 70%, transparent)" }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 strokeWidth={2.5} size={28} style={{ color: "var(--secondary)" }} />
            <h2
              className="text-3xl md:text-4xl font-extrabold"
              style={{ fontFamily: "Outfit, sans-serif", color: "var(--foreground)" }}
            >
              全维度对决
            </h2>
          </div>
          <p
            className="text-base mb-10 max-w-xl"
            style={{ color: "#64748B", fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            每一行都是一场较量，✅ 表示该维度占优
          </p>

          <div className="max-w-5xl mx-auto">
            {/* 表头 */}
            <div
              className="grid grid-cols-4 gap-4 p-4 mb-3 items-center"
              style={{
                background: "var(--foreground)",
                borderRadius: "var(--radius-md)",
                boxShadow: "6px 6px 0px 0px var(--accent)",
              }}
            >
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "#94A3B8", fontFamily: "Outfit, sans-serif" }}
              >
                对比维度
              </span>
              <span
                className="text-sm font-extrabold text-center"
                style={{ color: "#C4B5FD", fontFamily: "Outfit, sans-serif" }}
              >
                🐦 Flutter
              </span>
              <span
                className="text-sm font-extrabold text-center"
                style={{ color: "#6EE7B7", fontFamily: "Outfit, sans-serif" }}
              >
                ⚛️ React Native
              </span>
              <span
                className="text-xs font-bold uppercase tracking-wider text-center"
                style={{ color: "#94A3B8", fontFamily: "Outfit, sans-serif" }}
              >
                优势方
              </span>
            </div>

            {/* 数据行 */}
            {COMPARISON_DATA.map((row, i) => (
              <div
                key={row.category}
                className="animate-slide grid grid-cols-4 gap-4 p-4 mb-2 items-center topic-card"
                style={{
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "#F1F5F9",
                      border: "2px solid var(--border)",
                      borderRadius: "var(--radius-sm)",
                      color: "var(--foreground)",
                    }}
                  >
                    {row.icon}
                  </div>
                  <span
                    className="text-xs font-bold"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {row.category}
                  </span>
                </div>
                <span
                  className="text-xs text-center"
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    color: "#475569",
                    fontWeight: 600,
                  }}
                >
                  {row.flutter}
                </span>
                <span
                  className="text-xs text-center"
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    color: "#475569",
                    fontWeight: 600,
                  }}
                >
                  {row.rn}
                </span>
                <div className="flex justify-center">
                  {row.flutterAdvantage === null && row.rnAdvantage === null ? (
                    <span
                      className="px-2 py-0.5 text-xs font-bold rounded-full"
                      style={{
                        background: "#F1F5F9",
                        border: "1px solid var(--border)",
                        color: "#94A3B8",
                      }}
                    >
                      平手
                    </span>
                  ) : row.flutterAdvantage ? (
                    <span
                      className="px-2 py-0.5 text-xs font-bold rounded-full"
                      style={{
                        background: "#EDE9FE",
                        border: "2px solid var(--accent)",
                        color: "var(--accent)",
                      }}
                    >
                      🐦 Flutter
                    </span>
                  ) : (
                    <span
                      className="px-2 py-0.5 text-xs font-bold rounded-full"
                      style={{
                        background: "#D1FAE5",
                        border: "2px solid var(--quaternary)",
                        color: "#059669",
                      }}
                    >
                      ⚛️ RN
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* 总结 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div
                className="p-5"
                style={{
                  background: "linear-gradient(135deg, #EDE9FE, #C4B5FD)",
                  border: "3px solid var(--foreground)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "8px 8px 0px 0px var(--accent)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star strokeWidth={2.5} size={20} style={{ color: "var(--accent)" }} />
                  <span
                    className="text-sm font-extrabold"
                    style={{ fontFamily: "Outfit, sans-serif", color: "var(--accent)" }}
                  >
                    Flutter 赢在
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#3B0764", fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  UI 一致性、渲染性能、多平台覆盖、动画流畅度。适合追求极致体验和"一次编码、处处相同"的团队。
                </p>
              </div>
              <div
                className="p-5"
                style={{
                  background: "linear-gradient(135deg, #D1FAE5, #6EE7B7)",
                  border: "3px solid var(--foreground)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "8px 8px 0px 0px var(--quaternary)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star strokeWidth={2.5} size={20} style={{ color: "#059669" }} />
                  <span
                    className="text-sm font-extrabold"
                    style={{ fontFamily: "Outfit, sans-serif", color: "#059669" }}
                  >
                    RN 赢在
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#064E3B", fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  生态成熟度、学习成本、社区资源、原生能力访问。适合已有 JS/React 技术栈且需要快速上线的团队。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 性能基准测试 ═══════════════ */}
      <section ref={perfRef} className="container mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-2">
          <Flame strokeWidth={2.5} size={28} style={{ color: "var(--tertiary)" }} />
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--foreground)" }}
          >
            性能基准测试
          </h2>
        </div>
        <p
          className="text-base mb-3 max-w-xl"
          style={{ color: "#64748B", fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          基于公开基准测试的综合评分 (满分 100)
        </p>
        <p
          className="text-xs mb-10 max-w-xl"
          style={{ color: "#94A3B8", fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          *数据来源为社区公开基准测试，实际性能因项目和设备而异
        </p>

        <div className="max-w-3xl mx-auto space-y-7">
          {PERFORMANCE_BARS.map((bar, i) => (
            <div key={bar.label} className="animate-slide" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-sm font-bold"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {bar.label}
                </span>
              </div>
              <div className="space-y-2">
                {/* Flutter */}
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-bold w-8 text-right flex-shrink-0"
                    style={{ color: "var(--accent)", fontFamily: "Outfit, sans-serif" }}
                  >
                    🐦
                  </span>
                  <div
                    className="flex-1 h-8 relative overflow-hidden"
                    style={{
                      background: "#F1F5F9",
                      border: "2px solid var(--foreground)",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    <div
                      className="h-full flex items-center justify-end pr-3 transition-all duration-1000 ease-out"
                      style={{
                        width: animatedBars ? `${bar.flutter}%` : "0%",
                        background: "linear-gradient(90deg, #C4B5FD, var(--accent))",
                        borderRadius: "var(--radius-full)",
                        transitionDelay: `${i * 0.1}s`,
                      }}
                    >
                      <span
                        className="text-xs font-extrabold text-white"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      >
                        {bar.flutter}
                      </span>
                    </div>
                  </div>
                </div>
                {/* React Native */}
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-bold w-8 text-right flex-shrink-0"
                    style={{ color: "var(--quaternary)", fontFamily: "Outfit, sans-serif" }}
                  >
                    ⚛️
                  </span>
                  <div
                    className="flex-1 h-8 relative overflow-hidden"
                    style={{
                      background: "#F1F5F9",
                      border: "2px solid var(--foreground)",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    <div
                      className="h-full flex items-center justify-end pr-3 transition-all duration-1000 ease-out"
                      style={{
                        width: animatedBars ? `${bar.rn}%` : "0%",
                        background: "linear-gradient(90deg, #6EE7B7, var(--quaternary))",
                        borderRadius: "var(--radius-full)",
                        transitionDelay: `${i * 0.1 + 0.05}s`,
                      }}
                    >
                      <span
                        className="text-xs font-extrabold text-white"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      >
                        {bar.rn}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 生态系统对比 (Tab 切换) ═══════════════ */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(180deg, transparent, #FEF3C7 20%, #FFFBEB 80%, transparent)" }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <Puzzle strokeWidth={2.5} size={28} style={{ color: "var(--tertiary)" }} />
            <h2
              className="text-3xl md:text-4xl font-extrabold"
              style={{ fontFamily: "Outfit, sans-serif", color: "var(--foreground)" }}
            >
              生态系统图谱
            </h2>
          </div>
          <p
            className="text-base mb-8 max-w-xl"
            style={{ color: "#64748B", fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            切换查看两个框架的核心库和工具链
          </p>

          {/* Tab 按钮 */}
          <div className="flex gap-3 mb-8 max-w-md">
            <button
              onClick={() => setActiveTab("flutter")}
              className="flex-1 py-3 px-4 text-sm font-extrabold transition-all"
              style={{
                fontFamily: "Outfit, sans-serif",
                background: activeTab === "flutter" ? "var(--accent)" : "var(--card)",
                color: activeTab === "flutter" ? "white" : "var(--foreground)",
                border: "2px solid var(--foreground)",
                borderRadius: "var(--radius-md)",
                boxShadow:
                  activeTab === "flutter"
                    ? "6px 6px 0px 0px var(--foreground)"
                    : "4px 4px 0px 0px var(--foreground)",
                transform: activeTab === "flutter" ? "translateY(-2px)" : "none",
              }}
            >
              🐦 Flutter 生态
            </button>
            <button
              onClick={() => setActiveTab("rn")}
              className="flex-1 py-3 px-4 text-sm font-extrabold transition-all"
              style={{
                fontFamily: "Outfit, sans-serif",
                background: activeTab === "rn" ? "var(--quaternary)" : "var(--card)",
                color: activeTab === "rn" ? "white" : "var(--foreground)",
                border: "2px solid var(--foreground)",
                borderRadius: "var(--radius-md)",
                boxShadow:
                  activeTab === "rn"
                    ? "6px 6px 0px 0px var(--foreground)"
                    : "4px 4px 0px 0px var(--foreground)",
                transform: activeTab === "rn" ? "translateY(-2px)" : "none",
              }}
            >
              ⚛️ RN 生态
            </button>
          </div>

          {/* 生态内容 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
            {(activeTab === "flutter"
              ? ECOSYSTEM_ITEMS.flutter
              : ECOSYSTEM_ITEMS.rn
            ).map((cat, i) => (
              <div
                key={cat.name}
                className="animate-pop topic-card p-5"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <h4
                  className="text-sm font-extrabold mb-3 pb-2"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    borderBottom: "2px dashed var(--border)",
                  }}
                >
                  {cat.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 text-xs font-bold"
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        background:
                          activeTab === "flutter" ? "#EDE9FE" : "#D1FAE5",
                        border: "2px solid var(--foreground)",
                        borderRadius: "var(--radius-sm)",
                        boxShadow: "2px 2px 0px 0px var(--foreground)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 使用企业 */}
          <div className="mt-12 max-w-5xl">
            <h3
              className="text-lg font-extrabold mb-5"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              🏢 谁在使用？
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(["flutter", "rn"] as const).map((fw) => (
                <div
                  key={fw}
                  className="topic-card p-5"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">{fw === "flutter" ? "🐦" : "⚛️"}</span>
                    <span
                      className="text-sm font-extrabold"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {fw === "flutter" ? "Flutter" : "React Native"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {COMPANIES_USING[fw].map((company) => (
                      <span
                        key={company}
                        className="px-3 py-1.5 text-xs font-bold"
                        style={{
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                          background: fw === "flutter" ? "#F5F3FF" : "#ECFDF5",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-full)",
                        }}
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 发展时间线 ═══════════════ */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-2">
          <GitBranch strokeWidth={2.5} size={28} style={{ color: "var(--secondary)" }} />
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--foreground)" }}
          >
            发展时间线
          </h2>
        </div>
        <p
          className="text-base mb-12 max-w-xl"
          style={{ color: "#64748B", fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          两大框架的里程碑事件回顾
        </p>

        <div className="max-w-4xl mx-auto relative">
          {/* 中轴线 */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2"
            style={{
              background: "var(--border)",
              borderLeft: "3px dashed var(--border)",
            }}
          />
          <div className="space-y-8 md:space-y-6">
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className={`animate-slide flex flex-col md:flex-row items-start md:items-center gap-4 ${
                  item.side === "rn" ? "md:flex-row-reverse" : ""
                }`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {/* 左侧 / RN 侧 */}
                <div
                  className={`flex-1 ${
                    item.side === "rn" ? "md:text-left" : "md:text-right"
                  } ${item.side === "both" ? "md:text-right" : ""}`}
                >
                  {(item.side === "flutter" || item.side === "both") && (
                    <div
                      className="inline-block p-4 topic-card text-left md:text-right"
                      style={{ maxWidth: "360px" }}
                    >
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: "var(--accent)", fontFamily: "Outfit, sans-serif" }}
                      >
                        🐦 Flutter
                      </span>
                      <h4
                        className="text-sm font-extrabold mt-1"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      >
                        {item.event}
                      </h4>
                      <p
                        className="text-xs mt-1"
                        style={{ color: "#64748B", fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        {item.detail}
                      </p>
                    </div>
                  )}
                </div>

                {/* 中间时间点 */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className="w-16 h-16 flex items-center justify-center mx-auto"
                    style={{
                      background:
                        item.side === "flutter"
                          ? "#EDE9FE"
                          : item.side === "rn"
                          ? "#D1FAE5"
                          : "#FEF3C7",
                      border: "3px solid var(--foreground)",
                      borderRadius: "var(--radius-full)",
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                    }}
                  >
                    <span
                      className="text-sm font-extrabold"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* 右侧 / Flutter 侧 */}
                <div
                  className={`flex-1 ${
                    item.side === "flutter" ? "md:text-left" : "md:text-right"
                  } ${item.side === "both" ? "md:text-left" : ""}`}
                >
                  {(item.side === "rn" || item.side === "both") && (
                    <div
                      className="inline-block p-4 topic-card text-left"
                      style={{ maxWidth: "360px" }}
                    >
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: "var(--quaternary)", fontFamily: "Outfit, sans-serif" }}
                      >
                        ⚛️ React Native
                      </span>
                      <h4
                        className="text-sm font-extrabold mt-1"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      >
                        {item.event}
                      </h4>
                      <p
                        className="text-xs mt-1"
                        style={{ color: "#64748B", fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        {item.detail}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 选型决策器 ═══════════════ */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(180deg, transparent, #FDF2F8 15%, #F5F3FF 85%, transparent)",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <Target strokeWidth={2.5} size={28} style={{ color: "var(--accent)" }} />
            <h2
              className="text-3xl md:text-4xl font-extrabold"
              style={{ fontFamily: "Outfit, sans-serif", color: "var(--foreground)" }}
            >
              交互式选型决策器
            </h2>
          </div>
          <p
            className="text-base mb-10 max-w-xl"
            style={{ color: "#64748B", fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            回答以下问题，看看哪个框架更适合你的项目
          </p>

          <div className="max-w-3xl mx-auto space-y-6">
            {DECISION_FACTORS.map((factor, i) => (
              <div
                key={i}
                className="animate-slide topic-card p-5"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h4
                  className="text-base font-extrabold mb-4"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 mr-2 text-xs"
                    style={{
                      background: "var(--accent)",
                      color: "white",
                      borderRadius: "var(--radius-full)",
                      border: "2px solid var(--foreground)",
                    }}
                  >
                    {i + 1}
                  </span>
                  {factor.question}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(["optionA", "optionB"] as const).map((opt) => {
                    const option = factor[opt];
                    const isSelected = selectedDecisions[i] === option.result;
                    return (
                      <button
                        key={opt}
                        onClick={() =>
                          setSelectedDecisions((prev) => ({
                            ...prev,
                            [i]: option.result,
                          }))
                        }
                        className="p-4 text-left transition-all text-sm"
                        style={{
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                          fontWeight: 600,
                          background: isSelected
                            ? option.result === "flutter"
                              ? "#EDE9FE"
                              : "#D1FAE5"
                            : "var(--card)",
                          border: `2px solid ${
                            isSelected ? "var(--foreground)" : "var(--border)"
                          }`,
                          borderRadius: "var(--radius-md)",
                          boxShadow: isSelected
                            ? `4px 4px 0px 0px ${
                                option.result === "flutter"
                                  ? "var(--accent)"
                                  : "var(--quaternary)"
                              }`
                            : "none",
                          transform: isSelected ? "translateY(-2px)" : "none",
                        }}
                      >
                        {option.label}
                        {isSelected && (
                          <span className="ml-2 text-xs font-bold uppercase">
                            → {option.result === "flutter" ? "🐦 Flutter" : "⚛️ RN"}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* 结果展示 */}
            {Object.keys(selectedDecisions).length === DECISION_FACTORS.length && (
              <div
                className="animate-pop p-6 text-center"
                style={{
                  background:
                    getResult() === "flutter"
                      ? "linear-gradient(135deg, #EDE9FE, #C4B5FD)"
                      : getResult() === "rn"
                      ? "linear-gradient(135deg, #D1FAE5, #6EE7B7)"
                      : "linear-gradient(135deg, #FEF3C7, #FDE68A)",
                  border: "3px solid var(--foreground)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: `8px 8px 0px 0px ${
                    getResult() === "flutter"
                      ? "var(--accent)"
                      : getResult() === "rn"
                      ? "var(--quaternary)"
                      : "var(--tertiary)"
                  }`,
                }}
              >
                <Sparkles
                  strokeWidth={2.5}
                  size={36}
                  className="mx-auto mb-3"
                  style={{ color: "var(--foreground)" }}
                />
                <h3
                  className="text-2xl font-extrabold mb-2"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {getResult() === "flutter"
                    ? "🐦 Flutter 更适合你！"
                    : getResult() === "rn"
                    ? "⚛️ React Native 更适合你！"
                    : "🤝 两者都适合你！"}
                </h3>
                <p
                  className="text-sm max-w-md mx-auto"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#475569" }}
                >
                  {getResult() === "flutter"
                    ? "根据你的需求画像，Flutter 的自绘引擎、多平台覆盖和性能优势更匹配你的项目场景。"
                    : getResult() === "rn"
                    ? "根据你的需求画像，React Native 的生态优势、低学习成本和原生能力访问更匹配你的项目场景。"
                    : "你的需求非常均衡！建议结合团队技术栈和具体业务场景做最终决策。"}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════ 代码示例对比 ═══════════════ */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-2">
          <Code2 strokeWidth={2.5} size={28} style={{ color: "var(--quaternary)" }} />
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--foreground)" }}
          >
            代码风格速览
          </h2>
        </div>
        <p
          className="text-base mb-10 max-w-xl"
          style={{ color: "#64748B", fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          同一个计数器组件，感受两种框架的编码风格差异
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
          {/* Flutter 代码 */}
          <div
            className="animate-slide overflow-hidden"
            style={{
              animationDelay: "0.1s",
              border: "3px solid var(--foreground)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "8px 8px 0px 0px var(--accent)",
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ background: "var(--accent)" }}
            >
              <span
                className="text-sm font-extrabold text-white"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                🐦 counter.dart
              </span>
              <span className="text-xs text-purple-200 font-bold">Flutter / Dart</span>
            </div>
            <pre
              className="p-5 text-xs leading-relaxed overflow-x-auto"
              style={{
                background: "#1E1B2E",
                fontFamily: "'JetBrains Mono', monospace",
                color: "#E2E8F0",
              }}
            >
              <code>{`import 'package:flutter/material.dart';

class CounterApp extends StatefulWidget {
  @override
  _CounterAppState createState() => _CounterAppState();
}

class _CounterAppState extends State<CounterApp> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Counter')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '$_count',
              style: TextStyle(
                fontSize: 48,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => setState(() => _count++),
              child: Text('Increment'),
            ),
          ],
        ),
      ),
    );
  }
}`}</code>
            </pre>
          </div>

          {/* React Native 代码 */}
          <div
            className="animate-slide overflow-hidden"
            style={{
              animationDelay: "0.2s",
              border: "3px solid var(--foreground)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "8px 8px 0px 0px var(--quaternary)",
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ background: "var(--quaternary)" }}
            >
              <span
                className="text-sm font-extrabold text-white"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                ⚛️ Counter.tsx
              </span>
              <span className="text-xs text-green-200 font-bold">React Native / TS</span>
            </div>
            <pre
              className="p-5 text-xs leading-relaxed overflow-x-auto"
              style={{
                background: "#1E1B2E",
                fontFamily: "'JetBrains Mono', monospace",
                color: "#E2E8F0",
              }}
            >
              <code>{`import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function CounterApp() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <Button
        title="Increment"
        onPress={() => setCount(c => c + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ═══════════════ 核心结论总结 ═══════════════ */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(180deg, transparent 0%, #1E1B2E 15%, #1E1B2E 85%, transparent 100%)",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div
                className="inline-flex items-center gap-2 px-5 py-2 mb-6"
                style={{
                  background: "var(--tertiary)",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-full)",
                  boxShadow: "4px 4px 0px 0px rgba(255,255,255,0.2)",
                }}
              >
                <Rocket strokeWidth={2.5} size={18} style={{ color: "var(--foreground)" }} />
                <span
                  className="text-sm font-extrabold uppercase tracking-wider"
                  style={{ fontFamily: "Outfit, sans-serif", color: "var(--foreground)" }}
                >
                  最终结论
                </span>
              </div>
              <h2
                className="text-3xl md:text-5xl font-extrabold text-white mb-4"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                没有银弹，只有最适合
              </h2>
              <p
                className="text-base max-w-2xl mx-auto"
                style={{ color: "#94A3B8", fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                技术选型的核心不是"哪个更好"，而是"哪个更适合你的场景"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 选 Flutter 的场景 */}
              <div
                className="p-6"
                style={{
                  background: "rgba(139, 92, 246, 0.15)",
                  border: "2px solid var(--accent)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{
                      background: "var(--accent)",
                      border: "2px solid white",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    <CheckCircle2 strokeWidth={2.5} size={20} style={{ color: "white" }} />
                  </div>
                  <h3
                    className="text-lg font-extrabold text-white"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    选 Flutter 如果你...
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "追求跨平台 UI 像素级一致",
                    "需要覆盖 Web + 桌面 + 移动端",
                    "团队愿意学习 Dart 语言",
                    "应用有大量自定义动画和图形",
                    "对渲染性能有极致要求",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "#E2E8F0", fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      <ChevronRight
                        strokeWidth={3}
                        size={14}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: "var(--accent)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 选 RN 的场景 */}
              <div
                className="p-6"
                style={{
                  background: "rgba(52, 211, 153, 0.15)",
                  border: "2px solid var(--quaternary)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{
                      background: "var(--quaternary)",
                      border: "2px solid white",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    <CheckCircle2 strokeWidth={2.5} size={20} style={{ color: "white" }} />
                  </div>
                  <h3
                    className="text-lg font-extrabold text-white"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    选 React Native 如果你...
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "团队有深厚的 JS/React 技术栈",
                    "需要快速 MVP 验证和上线",
                    "重度依赖原生模块 (相机/蓝牙/AR等)",
                    "希望遵循各平台原生设计规范",
                    "需要强大的第三方库生态支撑",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "#E2E8F0", fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      <ChevronRight
                        strokeWidth={3}
                        size={14}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: "var(--quaternary)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 底部金句 */}
            <div
              className="mt-10 p-6 text-center"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "2px solid rgba(255,255,255,0.1)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <p
                className="text-lg md:text-xl font-extrabold text-white leading-relaxed"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                &quot;优秀的工程师不会被工具定义，
                <br className="hidden md:block" />
                <span style={{ color: "var(--tertiary)" }}>
                  而是用最适合的工具定义产品。&quot;
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 底部推荐阅读 ═══════════════ */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen strokeWidth={2.5} size={24} style={{ color: "var(--secondary)" }} />
          <h3
            className="text-xl font-extrabold"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            延伸阅读
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          {[
            {
              title: "Flutter 官方文档",
              desc: "flutter.dev — 从入门到精通的完整指南",
              color: "var(--accent)",
              bgColor: "#EDE9FE",
            },
            {
              title: "React Native 新架构",
              desc: "reactnative.dev — JSI、Fabric、TurboModules 深度解析",
              color: "var(--quaternary)",
              bgColor: "#D1FAE5",
            },
            {
              title: "跨端方案演进史",
              desc: "从 Cordova → Weex → RN → Flutter 的技术演进脉络",
              color: "var(--secondary)",
              bgColor: "#FCE7F3",
            },
          ].map((link) => (
            <div
              key={link.title}
              className="topic-card p-5 cursor-pointer group"
            >
              <div
                className="w-10 h-10 flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                style={{
                  background: link.bgColor,
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-sm)",
                  boxShadow: "3px 3px 0px 0px var(--foreground)",
                }}
              >
                <ArrowRight strokeWidth={2.5} size={18} style={{ color: link.color }} />
              </div>
              <h4
                className="text-sm font-extrabold mb-1"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {link.title}
              </h4>
              <p
                className="text-xs"
                style={{ color: "#64748B", fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {link.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  );
}