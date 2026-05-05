// app/knowledge/rn-hot-update/page.tsx
"use client";

import React from "react";
import {
  Flame,
  Package,
  Layers,
  GitBranch,
  Zap,
  Shield,
  Clock,
  Server,
  Smartphone,
  Cloud,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  FileCode2,
  Download,
  RefreshCw,
  Target,
  Rocket,
  Eye,
  Users,
  Gauge,
  BarChart3,
  Code2,
  Workflow,
  CircleDot,
  ChevronsRight,
  Bug,
  Cpu,
  HardDrive,
  Activity,
} from "lucide-react";

export default function RNHotUpdatePage() {
  return (
    <div className="bg-dot-grid min-h-screen">
      {/* ========== HERO SECTION ========== */}
      <section className="container relative overflow-hidden py-12 lg:py-16">
        {/* Decorative Blob */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] opacity-20 pointer-events-none"
          style={{
            background: "var(--tertiary)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-[300px] h-[300px] opacity-15 pointer-events-none"
          style={{
            background: "var(--secondary)",
            borderRadius: "40% 60% 70% 30% / 30% 70% 40% 60%",
          }}
        />

        <div className="container relative z-10">
          {/* Label Badge */}
          <div className="animate-pop inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
            style={{
              border: "2px solid var(--foreground)",
              background: "var(--tertiary)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontSize: "0.85rem",
            }}
          >
            <Flame size={16} strokeWidth={2.5} />
            移动工程 · 深度解析
          </div>

          {/* Main Title */}
          <h1
            className="animate-pop text-4xl md:text-6xl lg:text-7xl leading-tight mb-6"
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              color: "var(--foreground)",
              animationDelay: "0.1s",
            }}
          >
            React Native{" "}
            <span style={{ color: "var(--accent)" }}>热更新</span>
            <br />
            <span style={{ color: "var(--secondary)" }}>架构设计</span> 全剖析
          </h1>

          <p
            className="animate-slide max-w-2xl text-lg md:text-xl leading-relaxed mb-10"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              color: "var(--foreground)",
              opacity: 0.75,
              animationDelay: "0.2s",
            }}
          >
            从 JSBundle 构建流水线到灰度发布策略，再到线上秒级热修复机制——
            一次完整的技术解构，带你掌握 RN 热更的每一个核心环节。
          </p>

          {/* Stats Row */}
          <div className="animate-slide flex flex-wrap gap-4" style={{ animationDelay: "0.3s" }}>
            {[
              { icon: <Clock size={18} strokeWidth={2.5} />, label: "修复耗时", value: "< 30s" },
              { icon: <Users size={18} strokeWidth={2.5} />, label: "覆盖用户", value: "亿级" },
              { icon: <Zap size={18} strokeWidth={2.5} />, label: "无需审核", value: "秒级生效" },
              { icon: <Shield size={18} strokeWidth={2.5} />, label: "回滚能力", value: "即时回退" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-3"
                style={{
                  background: "var(--card)",
                  border: "2px solid var(--foreground)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-full"
                  style={{
                    background: i % 2 === 0 ? "var(--accent)" : "var(--secondary)",
                    color: "white",
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <div
                    className="text-xs uppercase tracking-wider"
                    style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, opacity: 0.5 }}
                  >
                    {stat.label}
                  </div>
                  <div
                    className="text-lg"
                    style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
                  >
                    {stat.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ARCHITECTURE OVERVIEW ========== */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <SectionHeader
            icon={<Workflow size={20} strokeWidth={2.5} />}
            label="架构全景"
            title="热更新三阶段生命周期"
            color="var(--accent)"
            delay="0s"
          />

          {/* Three Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: <Package size={28} strokeWidth={2.5} />,
                title: "JSBundle 构建",
                desc: "将 JS 源码编译、分包、压缩为可分发的 Bundle 包，是热更新的基石。",
                color: "var(--accent)",
                bgColor: "#EDE9FE",
                phase: "Phase 1",
                details: ["Metro 打包器", "Code Splitting", "Source Map 生成", "Hermes 字节码编译"],
              },
              {
                icon: <GitBranch size={28} strokeWidth={2.5} />,
                title: "灰度发布策略",
                desc: "分批次、可控地将新 Bundle 推送给用户，降低全量发布的风险。",
                color: "var(--secondary)",
                bgColor: "#FCE7F3",
                phase: "Phase 2",
                details: ["白名单 / 比例放量", "AB Test 分组", "异常监控熔断", "版本回退机制"],
              },
              {
                icon: <Zap size={28} strokeWidth={2.5} />,
                title: "秒级热修复",
                desc: "在不发版的前提下，将修复后的 Bundle 极速下发到用户设备。",
                color: "var(--quaternary)",
                bgColor: "#D1FAE5",
                phase: "Phase 3",
                details: ["差异增量更新 (Diff)", "双 Bundle 预加载", "静默下载替换", "崩溃自动回滚"],
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="animate-slide topic-card p-6 flex flex-col relative overflow-hidden"
                style={{ animationDelay: `${0.1 + i * 0.12}s` }}
              >
                {/* Phase Badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    background: pillar.bgColor,
                    border: `2px solid ${pillar.color}`,
                    color: pillar.color,
                  }}
                >
                  {pillar.phase}
                </div>

                {/* Icon */}
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-xl mb-4"
                  style={{
                    background: pillar.bgColor,
                    border: `2px solid var(--foreground)`,
                    color: pillar.color,
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  {pillar.icon}
                </div>

                <h3
                  className="text-xl mb-2"
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4 flex-1"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.7 }}
                >
                  {pillar.desc}
                </p>

                {/* Detail List */}
                <div className="space-y-2">
                  {pillar.details.map((d, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2 text-sm"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      <CircleDot size={12} strokeWidth={2.5} style={{ color: pillar.color }} />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>

                {/* Decorative Corner */}
                <div
                  className="absolute -bottom-2 -right-2 w-20 h-20 opacity-10 pointer-events-none"
                  style={{
                    background: pillar.color,
                    borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FLOW DIAGRAM - UPDATE PIPELINE ========== */}
      <section className="pb-12 lg:pb-16">
        <div className="container">
          <SectionHeader
            icon={<Activity size={20} strokeWidth={2.5} />}
            label="流水线全景"
            title="热更新完整链路"
            color="var(--tertiary)"
            delay="0s"
          />

          <div
            className="animate-slide mt-12 p-6 md:p-10 rounded-2xl overflow-x-auto"
            style={{
              background: "var(--card)",
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--foreground)",
              animationDelay: "0.1s",
            }}
          >
            {/* Pipeline Steps */}
            <div className="flex flex-col md:flex-row items-stretch gap-4 min-w-[700px]">
              {[
                { icon: <FileCode2 size={22} strokeWidth={2.5} />, title: "源码变更", sub: "Git Push / MR Merge", color: "var(--accent)", bg: "#EDE9FE" },
                { icon: <Terminal size={22} strokeWidth={2.5} />, title: "CI 构建", sub: "Metro / Hermes 编译", color: "var(--foreground)", bg: "#F1F5F9" },
                { icon: <HardDrive size={22} strokeWidth={2.5} />, title: "Bundle 产物", sub: "JSBundle + Sourcemap", color: "var(--secondary)", bg: "#FCE7F3" },
                { icon: <Cloud size={22} strokeWidth={2.5} />, title: "CDN 分发", sub: "全球节点同步", color: "var(--accent)", bg: "#EDE9FE" },
                { icon: <Target size={22} strokeWidth={2.5} />, title: "灰度推送", sub: "分批 / 分群下发", color: "var(--tertiary)", bg: "#FEF3C7" },
                { icon: <Smartphone size={22} strokeWidth={2.5} />, title: "客户端拉取", sub: "Diff Patch 应用", color: "var(--quaternary)", bg: "#D1FAE5" },
                { icon: <CheckCircle2 size={22} strokeWidth={2.5} />, title: "更新完成", sub: "新 Bundle 生效", color: "var(--quaternary)", bg: "#D1FAE5" },
              ].map((step, i) => (
                <React.Fragment key={i}>
                  <div className="flex-1 flex flex-col items-center text-center">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-3"
                      style={{
                        background: step.bg,
                        border: "2px solid var(--foreground)",
                        color: step.color,
                        boxShadow: "3px 3px 0px 0px var(--foreground)",
                      }}
                    >
                      {step.icon}
                    </div>
                    <div
                      className="text-sm font-bold mb-1"
                      style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}
                    >
                      {step.title}
                    </div>
                    <div
                      className="text-xs"
                      style={{
                        fontFamily: "Plus Jakarta Sans, sans-serif",
                        opacity: 0.55,
                      }}
                    >
                      {step.sub}
                    </div>
                  </div>
                  {i < 6 && (
                    <div className="hidden md:flex items-center justify-center">
                      <ChevronsRight size={24} strokeWidth={2.5} style={{ opacity: 0.25 }} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* ========== 热更原理：为什么 JS 能热更 ========== */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        {/* Decorative Blob */}
        <div
          className="absolute top-1/2 -left-40 w-[400px] h-[400px] -translate-y-1/2 opacity-10 pointer-events-none"
          style={{
            background: "var(--accent)",
            borderRadius: "40% 60% 70% 30% / 30% 70% 40% 60%",
          }}
        />

        <div className="container relative z-10">
          <SectionHeader
            icon={<Cpu size={20} strokeWidth={2.5} />}
            label="底层原理"
            title="热更新为什么能生效？"
            color="var(--accent)"
            delay="0s"
          />

          {/* ========== 核心原理：RN 架构三层模型 ========== */}
          <div
            className="animate-slide mt-12 p-6 lg:p-10 rounded-2xl"
            style={{
              background: "var(--card)",
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--accent)",
              animationDelay: "0.1s",
            }}
          >
            <h3
              className="text-xl mb-3 flex items-center gap-3"
              style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
            >
              <Layers size={22} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
              React Native 运行时架构 —— 一切的前提
            </h3>
            <p
              className="text-sm leading-relaxed mb-8 max-w-3xl"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.6 }}
            >
              理解热更新的第一步，是理解 RN 将代码分成了<strong>两个世界</strong>。
              正是这种分离，赋予了 JS 层「可独立替换」的能力。
            </p>

            {/* Three-Layer Architecture Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {/* JS Layer */}
              <div
                className="p-5 rounded-xl text-center relative overflow-hidden"
                style={{
                  background: "#EDE9FE",
                  border: "3px solid var(--accent)",
                  boxShadow: "6px 6px 0px 0px var(--accent)",
                }}
              >
                <div
                  className="absolute -top-3 -right-3 w-16 h-16 opacity-15 pointer-events-none"
                  style={{
                    background: "var(--accent)",
                    borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                  }}
                />
                <div
                  className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 relative z-10"
                  style={{
                    background: "var(--accent)",
                    color: "white",
                    border: "2px solid var(--foreground)",
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                  }}
                >
                  <FileCode2 size={24} strokeWidth={2.5} />
                </div>
                <div
                  className="text-lg mb-1 relative z-10"
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
                >
                  JS 层 (可热更)
                </div>
                <div
                  className="text-xs uppercase tracking-wider mb-3 relative z-10"
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "var(--accent)" }}
                >
                  JavaScript Thread
                </div>
                <div
                  className="text-sm leading-relaxed text-left space-y-2 relative z-10"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.7 }}
                >
                  <div className="flex items-start gap-2">
                    <CircleDot size={10} strokeWidth={2.5} className="mt-1.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                    <span>React 组件树 & UI 逻辑</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CircleDot size={10} strokeWidth={2.5} className="mt-1.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                    <span>业务状态管理 (Redux / Zustand)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CircleDot size={10} strokeWidth={2.5} className="mt-1.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                    <span>网络请求、数据处理</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CircleDot size={10} strokeWidth={2.5} className="mt-1.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                    <span>由 JS 引擎 (JSC/Hermes) 执行</span>
                  </div>
                </div>
              </div>

              {/* Bridge Layer */}
              <div
                className="p-5 rounded-xl text-center relative overflow-hidden"
                style={{
                  background: "#FEF3C7",
                  border: "3px solid var(--tertiary)",
                  boxShadow: "6px 6px 0px 0px var(--tertiary)",
                }}
              >
                <div
                  className="absolute -bottom-3 -left-3 w-16 h-16 opacity-15 pointer-events-none"
                  style={{
                    background: "var(--tertiary)",
                    borderRadius: "40% 60% 70% 30% / 30% 70% 40% 60%",
                  }}
                />
                <div
                  className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 relative z-10"
                  style={{
                    background: "var(--tertiary)",
                    color: "white",
                    border: "2px solid var(--foreground)",
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                  }}
                >
                  <ArrowRight size={24} strokeWidth={2.5} />
                </div>
                <div
                  className="text-lg mb-1 relative z-10"
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
                >
                  Bridge / JSI (桥接层)
                </div>
                <div
                  className="text-xs uppercase tracking-wider mb-3 relative z-10"
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#D97706" }}
                >
                  Communication Layer
                </div>
                <div
                  className="text-sm leading-relaxed text-left space-y-2 relative z-10"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.7 }}
                >
                  <div className="flex items-start gap-2">
                    <CircleDot size={10} strokeWidth={2.5} className="mt-1.5 flex-shrink-0" style={{ color: "#D97706" }} />
                    <span>JSON 序列化异步通信 (旧架构)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CircleDot size={10} strokeWidth={2.5} className="mt-1.5 flex-shrink-0" style={{ color: "#D97706" }} />
                    <span>JSI 同步 C++ 绑定 (新架构)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CircleDot size={10} strokeWidth={2.5} className="mt-1.5 flex-shrink-0" style={{ color: "#D97706" }} />
                    <span>JS ↔ Native 双向调用通道</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CircleDot size={10} strokeWidth={2.5} className="mt-1.5 flex-shrink-0" style={{ color: "#D97706" }} />
                    <span>Shadow Tree 同步 (Fabric)</span>
                  </div>
                </div>
              </div>

              {/* Native Layer */}
              <div
                className="p-5 rounded-xl text-center relative overflow-hidden"
                style={{
                  background: "#FCE7F3",
                  border: "3px solid var(--secondary)",
                  boxShadow: "6px 6px 0px 0px var(--secondary)",
                }}
              >
                <div
                  className="absolute -top-3 -left-3 w-16 h-16 opacity-15 pointer-events-none"
                  style={{
                    background: "var(--secondary)",
                    borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                  }}
                />
                <div
                  className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 relative z-10"
                  style={{
                    background: "var(--secondary)",
                    color: "white",
                    border: "2px solid var(--foreground)",
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                  }}
                >
                  <Smartphone size={24} strokeWidth={2.5} />
                </div>
                <div
                  className="text-lg mb-1 relative z-10"
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
                >
                  Native 层 (不可热更)
                </div>
                <div
                  className="text-xs uppercase tracking-wider mb-3 relative z-10"
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#DB2777" }}
                >
                  Native Thread
                </div>
                <div
                  className="text-sm leading-relaxed text-left space-y-2 relative z-10"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.7 }}
                >
                  <div className="flex items-start gap-2">
                    <CircleDot size={10} strokeWidth={2.5} className="mt-1.5 flex-shrink-0" style={{ color: "var(--secondary)" }} />
                    <span>原生 UI 渲染 (UIView / Android.View)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CircleDot size={10} strokeWidth={2.5} className="mt-1.5 flex-shrink-0" style={{ color: "var(--secondary)" }} />
                    <span>系统 API (相机 / GPS / 蓝牙)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CircleDot size={10} strokeWidth={2.5} className="mt-1.5 flex-shrink-0" style={{ color: "var(--secondary)" }} />
                    <span>编译为机器码，随 App 安装包分发</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CircleDot size={10} strokeWidth={2.5} className="mt-1.5 flex-shrink-0" style={{ color: "var(--secondary)" }} />
                    <span>修改必须走应用商店发版流程</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Insight Callout */}
            <div
              className="flex items-start gap-4 p-5 rounded-xl"
              style={{
                background: "var(--tertiary)",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--foreground)", color: "var(--tertiary)" }}
              >
                <Zap size={20} strokeWidth={2.5} />
              </div>
              <div>
                <div
                  className="text-sm font-bold mb-1"
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
                >
                  关键认知
                </div>
                <div
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.8 }}
                >
                  RN 的 JS 代码并非编译进安装包的机器码，而是作为<strong>运行时被 JS 引擎解释执行</strong>的脚本。
                  这意味着只要替换掉这份脚本文件（JSBundle），下次引擎加载时就会执行新逻辑——
                  这就是热更新的<strong>本质</strong>。
                </div>
              </div>
            </div>
          </div>

          {/* ========== Bundle 加载生命周期 ========== */}
          <div
            className="animate-slide mt-8 p-6 lg:p-10 rounded-2xl"
            style={{
              background: "var(--card)",
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--tertiary)",
              animationDelay: "0.2s",
            }}
          >
            <h3
              className="text-xl mb-3 flex items-center gap-3"
              style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
            >
              <RefreshCw size={22} strokeWidth={2.5} style={{ color: "var(--tertiary)" }} />
              App 启动时 Bundle 加载的完整生命周期
            </h3>
            <p
              className="text-sm leading-relaxed mb-8 max-w-3xl"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.6 }}
            >
              每次 App 冷启动，Native 端的加载器都会执行一套固定流程来决定加载哪个 Bundle。
              热更新的「替换」就发生在启动前的准备阶段。
            </p>

            {/* Lifecycle Steps */}
            <div className="space-y-0">
              {[
                {
                  phase: "① App 启动",
                  title: "Native 进程创建，执行 Application 初始化",
                  detail: "iOS: AppDelegate → didFinishLaunchingWithOptions\nAndroid: Application.onCreate()",
                  color: "var(--secondary)",
                  bg: "#FCE7F3",
                  icon: <Smartphone size={18} strokeWidth={2.5} />,
                  code: null,
                },
                {
                  phase: "② 检查热更版本",
                  title: "加载器读取本地存储的热更 Manifest，比对当前 Bundle 版本",
                  detail: "从 AsyncStorage / NSUserDefaults / 文件系统中读取热更记录，与 App 内置 Bundle 版本做比较。",
                  color: "var(--accent)",
                  bg: "#EDE9FE",
                  icon: <Eye size={18} strokeWidth={2.5} />,
                  code: null,
                },
                {
                  phase: "③ 版本决策",
                  title: "选择最终要加载的 Bundle 路径",
                  detail: "若存在已下载且校验通过的热更 Bundle → 加载热更版本；否则 → 降级到 App 内置 Bundle。",
                  color: "var(--tertiary)",
                  bg: "#FEF3C7",
                  icon: <GitBranch size={18} strokeWidth={2.5} />,
                  code: `// 伪代码：Bundle 路径决策
const hotBundle = await getPendingBundle();
if (hotBundle && await verifyIntegrity(hotBundle)) {
  bundlePath = hotBundle.path;       // → 加载热更版本
} else {
  bundlePath = BUILTIN_BUNDLE_PATH;  // → 降级到内置版本
}`,
                },
                {
                  phase: "④ JS 引擎加载",
                  title: "Hermes / JSC 引擎加载并执行 Bundle 文件",
                  detail: "引擎从文件系统读取 Bundle → 解析 → 编译（Hermes 为 AOT 字节码）→ 执行入口函数 index.js",
                  color: "var(--quaternary)",
                  bg: "#D1FAE5",
                  icon: <Cpu size={18} strokeWidth={2.5} />,
                  code: `// Hermes AOT: 已预编译为 .hbc 字节码
// 启动时直接加载字节码，省去 parse + compile 阶段
HermesRuntime::loadBytecode(bundlePath);

// JS 侧入口开始执行
AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', { rootTag });`,
                },
                {
                  phase: "⑤ UI 渲染",
                  title: "JS 构建 Virtual DOM → 通过 Bridge/JSI → Native 渲染真实视图",
                  detail: "React 组件 render → Shadow Tree 计算布局 → Native 端创建真实 View → 屏幕显示。",
                  color: "var(--accent)",
                  bg: "#EDE9FE",
                  icon: <Eye size={18} strokeWidth={2.5} />,
                  code: null,
                },
                {
                  phase: "⑥ 后台检查更新",
                  title: "App 运行期间，静默拉取服务端最新版本信息",
                  detail: "比较本地版本号与服务端版本号，若有新版本则后台下载 Patch，下次冷启动时自动替换。",
                  color: "var(--tertiary)",
                  bg: "#FEF3C7",
                  icon: <Cloud size={18} strokeWidth={2.5} />,
                  code: null,
                },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 md:gap-6 items-start">
                  {/* Timeline dot + line */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center z-10"
                      style={{
                        background: step.color,
                        color: "white",
                        border: "2px solid var(--foreground)",
                        boxShadow: "3px 3px 0px 0px var(--foreground)",
                      }}
                    >
                      {step.icon}
                    </div>
                    {i < 5 && (
                      <div
                        className="w-0 flex-1 min-h-[40px]"
                        style={{ borderLeft: "3px dashed var(--border)" }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1 pb-6">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.03em",
                          background: step.bg,
                          border: `2px solid ${step.color}50`,
                          color: step.color,
                        }}
                      >
                        {step.phase}
                      </span>
                    </div>
                    <div
                      className="text-base font-bold mb-1"
                      style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}
                    >
                      {step.title}
                    </div>
                    <p
                      className="text-sm leading-relaxed whitespace-pre-line"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.6 }}
                    >
                      {step.detail}
                    </p>

                    {/* Code block (if present) */}
                    {step.code && (
                      <div
                        className="mt-3 rounded-lg overflow-hidden"
                        style={{
                          border: "2px solid var(--foreground)",
                          boxShadow: "3px 3px 0px 0px var(--foreground)",
                        }}
                      >
                        <div
                          className="px-4 py-2 flex items-center gap-2"
                          style={{ background: "var(--foreground)" }}
                        >
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ background: "var(--secondary)" }} />
                            <div className="w-2 h-2 rounded-full" style={{ background: "var(--tertiary)" }} />
                            <div className="w-2 h-2 rounded-full" style={{ background: "var(--quaternary)" }} />
                          </div>
                        </div>
                        <pre
                          className="p-4 text-xs leading-relaxed overflow-x-auto"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            background: "#1E293B",
                            color: "#E2E8F0",
                            margin: 0,
                          }}
                        >
                          <code className="language-javascript">{step.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========== 热替换的「魔法」详解 ========== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* How Replacement Works */}
            <div
              className="animate-slide topic-card p-6 lg:p-8"
              style={{
                animationDelay: "0.25s",
                boxShadow: "8px 8px 0px 0px var(--quaternary)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{
                    background: "var(--quaternary)",
                    color: "white",
                    border: "2px solid var(--foreground)",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  <Flame size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h3
                    className="text-lg"
                    style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
                  >
                    热替换的「魔法」原理
                  </h3>
                  <div
                    className="text-xs uppercase tracking-wider"
                    style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, opacity: 0.45 }}
                  >
                    为什么替换文件就等于更新了功能？
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                {[
                  {
                    title: "脚本语言的运行时特性",
                    desc: "JS 是解释型语言，代码不编译进二进制。App 运行时，JS 引擎从磁盘读取 Bundle 文件并执行。只要在下次执行前替换文件，引擎就读到新代码。",
                    color: "var(--accent)",
                    num: "01",
                  },
                  {
                    title: "Bundle = 一份自描述脚本",
                    desc: "Metro 打包器将所有 JS 模块、依赖、资源引用打包成一个文件。这个文件包含了完整的 UI 描述和业务逻辑，是一个完整的「App 皮肤」。",
                    color: "var(--secondary)",
                    num: "02",
                  },
                  {
                    title: "Native 壳 + JS 核 = 分离架构",
                    desc: "Native 层只提供渲染容器和系统能力桥接，不包含业务逻辑。所以只要 JS 层的 Bridge 接口不变，替换 Bundle 不影响 Native 层的稳定性。",
                    color: "var(--tertiary)",
                    num: "03",
                  },
                  {
                    title: "冷启动 = 天然的切换时机",
                    desc: "JS 引擎在 App 冷启动时初始化。此时是加载新 Bundle 的最佳时机——无状态残留、无内存碎片，确保新代码从零开始干净执行。",
                    color: "var(--quaternary)",
                    num: "04",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm"
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 800,
                        background: item.color,
                        color: "white",
                        border: "2px solid var(--foreground)",
                        boxShadow: "3px 3px 0px 0px var(--foreground)",
                      }}
                    >
                      {item.num}
                    </div>
                    <div>
                      <div
                        className="text-sm font-bold mb-1"
                        style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}
                      >
                        {item.title}
                      </div>
                      <div
                        className="text-sm leading-relaxed"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.6 }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What CAN vs CANNOT be hot-updated */}
            <div className="space-y-6">
              {/* Can Hot Update */}
              <div
                className="animate-slide topic-card p-6"
                style={{
                  animationDelay: "0.3s",
                  boxShadow: "6px 6px 0px 0px var(--quaternary)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 size={20} strokeWidth={2.5} style={{ color: "var(--quaternary)" }} />
                  <h3
                    className="text-base"
                    style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, color: "var(--quaternary)" }}
                  >
                    可以热更的部分
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "UI 布局与样式",
                    "业务逻辑 & 事件处理",
                    "页面路由跳转",
                    "API 调用与数据处理",
                    "文本内容 & 国际化",
                    "动画参数 (Animated)",
                    "React 组件树结构",
                    "状态管理逻辑",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                      style={{
                        fontFamily: "Plus Jakarta Sans, sans-serif",
                        background: "#ECFDF5",
                        border: "1.5px solid var(--quaternary)30",
                      }}
                    >
                      <CheckCircle2 size={12} strokeWidth={2.5} style={{ color: "var(--quaternary)" }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cannot Hot Update */}
              <div
                className="animate-slide topic-card p-6"
                style={{
                  animationDelay: "0.35s",
                  boxShadow: "6px 6px 0px 0px var(--secondary)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle size={20} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
                  <h3
                    className="text-base"
                    style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, color: "var(--secondary)" }}
                  >
                    无法热更的部分 (需要发版)
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { text: "新增 / 修改 Native Module (原生桥接模块)", reason: "编译进二进制，需重新打包" },
                    { text: "变更第三方 Native SDK 版本", reason: "CocoaPods / Gradle 依赖" },
                    { text: "修改 App 权限声明 (Info.plist / AndroidManifest)", reason: "随安装包分发" },
                    { text: "更新 React Native 框架本身的大版本", reason: "Bridge / JSI 协议可能不兼容" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 px-3 py-2 rounded-lg text-xs"
                      style={{
                        fontFamily: "Plus Jakarta Sans, sans-serif",
                        background: "#FEF2F2",
                        border: "1.5px solid #FCA5A5",
                      }}
                    >
                      <AlertTriangle size={12} strokeWidth={2.5} className="mt-0.5 flex-shrink-0" style={{ color: "var(--secondary)" }} />
                      <div>
                        <span className="font-semibold">{item.text}</span>
                        <span style={{ opacity: 0.5 }}> — {item.reason}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ========== 旧架构 vs 新架构 (Fabric / JSI) ========== */}
          <div
            className="animate-slide mt-8 p-6 lg:p-10 rounded-2xl"
            style={{
              background: "var(--card)",
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--secondary)",
              animationDelay: "0.3s",
            }}
          >
            <h3
              className="text-xl mb-3 flex items-center gap-3"
              style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
            >
              <ArrowRight size={22} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
              旧架构 (Bridge) vs 新架构 (JSI/Fabric) 对热更的影响
            </h3>
            <p
              className="text-sm leading-relaxed mb-8 max-w-3xl"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.6 }}
            >
              RN 新架构用 JSI (JavaScript Interface) 替代了异步 JSON Bridge，
              这对热更新机制产生了深远影响。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Old Architecture */}
              <div
                className="p-5 rounded-xl"
                style={{
                  background: "#F1F5F9",
                  border: "2px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 800,
                      background: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  >
                    V1
                  </div>
                  <span
                    className="text-base font-bold"
                    style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
                  >
                    旧架构 (Bridge)
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "通信方式", value: "JSON 序列化 → 异步消息队列", icon: <ArrowRight size={14} strokeWidth={2.5} /> },
                    { label: "线程模型", value: "JS Thread / Shadow Thread / UI Thread 三线程", icon: <Cpu size={14} strokeWidth={2.5} /> },
                    { label: "热更影响", value: "Bridge 协议稳定，热更兼容性好", icon: <CheckCircle2 size={14} strokeWidth={2.5} style={{ color: "var(--quaternary)" }} /> },
                    { label: "性能瓶颈", value: "序列化开销大，列表滚动易卡顿", icon: <AlertTriangle size={14} strokeWidth={2.5} style={{ color: "var(--tertiary)" }} /> },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0" style={{ color: "var(--foreground)", opacity: 0.4 }}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, opacity: 0.5 }}>
                          {item.label}
                        </div>
                        <div className="text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* New Architecture */}
              <div
                className="p-5 rounded-xl relative overflow-hidden"
                style={{
                  background: "#EDE9FE",
                  border: "2px solid var(--accent)",
                  boxShadow: "4px 4px 0px 0px var(--accent)",
                }}
              >
                <div
                  className="absolute -top-3 -right-3 w-20 h-20 opacity-10 pointer-events-none"
                  style={{
                    background: "var(--accent)",
                    borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                  }}
                />
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 800,
                      background: "var(--accent)",
                      color: "white",
                    }}
                  >
                    V2
                  </div>
                  <span
                    className="text-base font-bold"
                    style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
                  >
                    新架构 (JSI / Fabric)
                  </span>
                </div>
                <div className="space-y-3 relative z-10">
                  {[
                    { label: "通信方式", value: "JSI 直接调用 C++ Host Objects，同步无序列化", icon: <ArrowRight size={14} strokeWidth={2.5} /> },
                    { label: "线程模型", value: "Fabric 渲染器合并 Shadow / UI 线程", icon: <Cpu size={14} strokeWidth={2.5} /> },
                    { label: "热更影响", value: "TurboModule 懒加载，需关注接口兼容性", icon: <AlertTriangle size={14} strokeWidth={2.5} style={{ color: "var(--tertiary)" }} /> },
                    { label: "性能提升", value: "启动速度 ↑，滚动帧率 ↑，内存 ↓", icon: <CheckCircle2 size={14} strokeWidth={2.5} style={{ color: "var(--quaternary)" }} /> },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent)", opacity: 0.7 }}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, opacity: 0.5 }}>
                          {item.label}
                        </div>
                        <div className="text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* New Architecture Note */}
            <div
              className="mt-6 flex items-start gap-4 p-4 rounded-xl"
              style={{
                background: "#FEF3C7",
                border: "2px solid var(--tertiary)",
              }}
            >
              <AlertTriangle size={20} strokeWidth={2.5} className="flex-shrink-0 mt-0.5" style={{ color: "#D97706" }} />
              <div
                className="text-sm leading-relaxed"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.75 }}
              >
                <strong style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>
                  新架构下的热更注意事项：
                </strong>
                TurboModule 采用懒加载机制，Native Module 的初始化时机与旧架构不同。
                热更 Bundle 中如果调用了新的 TurboModule 接口，需要确保宿主 App 的 Native 层已支持该接口，
                否则会触发 <code
                  className="px-1.5 py-0.5 rounded text-xs"
                  style={{ background: "#1E293B", color: "#FBBF24", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  TurboModuleRegistry.get()
                </code>{" "}
                返回 null 的兼容性问题。建议在热更 Manifest 中声明 TurboModule 兼容版本号。
              </div>
            </div>
          </div>

          {/* ========== 一句话总结 ========== */}
          <div
            className="animate-pop mt-8 p-6 rounded-xl text-center"
            style={{
              background: "var(--accent)",
              color: "white",
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--foreground)",
              animationDelay: "0.35s",
            }}
          >
            <div
              className="text-xl md:text-2xl leading-relaxed"
              style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
            >
              热更新的本质 ={" "}
              <span style={{ color: "var(--tertiary)" }}>「解释型语言的运行时文件替换」</span>
              <br />
              <span className="text-base md:text-lg" style={{ fontWeight: 500, opacity: 0.85 }}>
                趁引擎还没读到新文件之前，把旧文件换掉 → 引擎读到新逻辑 → 新 UI 呈现
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PHASE 1: JSBundle 构建 ========== */}
      <section className="pb-12 lg:pb-16">
        <div className="container">
          <SectionHeader
            icon={<Package size={20} strokeWidth={2.5} />}
            label="Phase 1"
            title="JSBundle 构建深度拆解"
            color="var(--accent)"
            delay="0s"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
            {/* Left: Metro Bundler */}
            <div
              className="animate-slide topic-card p-6 lg:p-8"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{
                    background: "var(--accent)",
                    color: "white",
                    border: "2px solid var(--foreground)",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  <Cpu size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h3
                    className="text-lg"
                    style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
                  >
                    Metro Bundler 构建流程
                  </h3>
                  <div
                    className="text-xs uppercase tracking-wider"
                    style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, opacity: 0.45 }}
                  >
                    核心打包引擎
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    title: "入口解析 (Entry Resolution)",
                    desc: "以 index.js 为入口，解析 import/require 依赖图，构建模块依赖树。",
                    color: "var(--accent)",
                  },
                  {
                    step: "02",
                    title: "转换 (Transformation)",
                    desc: "通过 Babel 转译 JSX/Flow/TS，支持自定义 Plugin 和 Preset。",
                    color: "var(--secondary)",
                  },
                  {
                    step: "03",
                    title: "序列化 (Serialization)",
                    desc: "将模块图序列化为 JS Bundle 文本。支持分包 (Splitting) 按需加载。",
                    color: "var(--tertiary)",
                  },
                  {
                    step: "04",
                    title: "Hermes 字节码编译",
                    desc: "AOT 将 JS → Hermes Bytecode，启动速度提升 40-60%，内存占用降低。",
                    color: "var(--quaternary)",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 rounded-xl"
                    style={{
                      background: `${item.color}10`,
                      border: `2px solid ${item.color}30`,
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm"
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 800,
                        background: item.color,
                        color: "white",
                      }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <div
                        className="text-sm font-bold mb-1"
                        style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}
                      >
                        {item.title}
                      </div>
                      <div
                        className="text-sm leading-relaxed"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.65 }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Bundle 产物结构 + 代码示例 */}
            <div className="space-y-6">
              {/* Bundle Structure */}
              <div
                className="animate-slide topic-card p-6"
                style={{ animationDelay: "0.2s" }}
              >
                <h3
                  className="text-lg mb-4 flex items-center gap-2"
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
                >
                  <Layers size={20} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
                  Bundle 产物结构
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "main.jsbundle", desc: "主 Bundle 文件", size: "~800KB", icon: <FileCode2 size={16} strokeWidth={2.5} /> },
                    { name: "main.jsbundle.map", desc: "Source Map", size: "~2MB", icon: <Bug size={16} strokeWidth={2.5} /> },
                    { name: "assets/", desc: "图片/字体资源", size: "可变", icon: <HardDrive size={16} strokeWidth={2.5} /> },
                    { name: "manifest.json", desc: "版本元信息", size: "~1KB", icon: <Server size={16} strokeWidth={2.5} /> },
                  ].map((file, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg"
                      style={{
                        background: "var(--background)",
                        border: "2px solid var(--border)",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span style={{ color: "var(--accent)" }}>{file.icon}</span>
                        <span
                          className="text-xs font-bold truncate"
                          style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}
                        >
                          {file.name}
                        </span>
                      </div>
                      <div
                        className="text-xs"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.5 }}
                      >
                        {file.desc} · {file.size}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Block: metro.config.js */}
              <div
                className="animate-slide topic-card overflow-hidden"
                style={{ animationDelay: "0.3s" }}
              >
                <div
                  className="px-5 py-3 flex items-center gap-2"
                  style={{
                    background: "var(--foreground)",
                    borderBottom: "2px solid var(--foreground)",
                  }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: "var(--secondary)" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "var(--tertiary)" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "var(--quaternary)" }} />
                  </div>
                  <span
                    className="text-xs ml-2"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#94A3B8" }}
                  >
                    metro.config.js
                  </span>
                </div>
                <pre
                  className="p-5 text-sm leading-relaxed overflow-x-auto"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    background: "#1E293B",
                    color: "#E2E8F0",
                    margin: 0,
                  }}
                >
                  <code className="language-javascript">{`const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig();
  return {
    ...config,
    transformer: {
      ...config.transformer,
      // 启用 Hermes 字节码输出
      hermesCommand: './node_modules/.bin/hermesc',
      enableHermes: true,
    },
    serializer: {
      ...config.serializer,
      // 自定义分包逻辑
      customSerializer: require('./scripts/bundleSplit'),
    },
  };
})();`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Diff Update Comparison */}
          <div
            className="animate-slide mt-8 p-6 lg:p-8 rounded-2xl"
            style={{
              background: "var(--card)",
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--tertiary)",
              animationDelay: "0.25s",
            }}
          >
            <h3
              className="text-lg mb-6 flex items-center gap-2"
              style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
            >
              <RefreshCw size={20} strokeWidth={2.5} style={{ color: "var(--tertiary)" }} />
              全量更新 vs 增量 Diff 更新
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Update */}
              <div
                className="p-5 rounded-xl"
                style={{ background: "#FEF2F2", border: "2px solid #EF4444" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={18} strokeWidth={2.5} style={{ color: "#EF4444" }} />
                  <span
                    className="text-sm font-bold"
                    style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#EF4444" }}
                  >
                    全量更新
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    "下载完整 JSBundle (~800KB+)",
                    "网络开销大，弱网下超时风险高",
                    "实现简单，兼容性好",
                    "适合首次安装或大版本升级",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      <span className="mt-1">✗</span>
                      <span style={{ opacity: 0.75 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diff Update */}
              <div
                className="p-5 rounded-xl"
                style={{ background: "#ECFDF5", border: "2px solid var(--quaternary)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={18} strokeWidth={2.5} style={{ color: "var(--quaternary)" }} />
                  <span
                    className="text-sm font-bold"
                    style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "var(--quaternary)" }}
                  >
                    增量 Diff 更新 (推荐)
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    "仅传输差异 Patch (~10-50KB)",
                    "基于 bsdiff/bspatch 或自研算法",
                    "端上合并 Patch → 新 Bundle",
                    "节省 90%+ 带宽，弱网友好",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      <span className="mt-1">✓</span>
                      <span style={{ opacity: 0.75 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PHASE 2: 灰度发布策略 ========== */}
      <section className="pb-12 lg:pb-16">
        <div className="container">
          <SectionHeader
            icon={<GitBranch size={20} strokeWidth={2.5} />}
            label="Phase 2"
            title="灰度发布策略设计"
            color="var(--secondary)"
            delay="0s"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
            {/* Strategy Cards */}
            {[
              {
                icon: <Users size={24} strokeWidth={2.5} />,
                title: "白名单发布",
                desc: "指定内部用户或设备 ID 先行更新，用于功能验证和内部测试。",
                color: "var(--accent)",
                bgColor: "#EDE9FE",
                tags: ["设备 ID 白名单", "员工账号", "测试设备"],
              },
              {
                icon: <BarChart3 size={24} strokeWidth={2.5} />,
                title: "比例放量",
                desc: "按百分比逐步放量（1% → 5% → 20% → 50% → 100%），结合监控指标决策。",
                color: "var(--secondary)",
                bgColor: "#FCE7F3",
                tags: ["随机哈希分流", "渐进放量", "自动扩量"],
              },
              {
                icon: <Target size={24} strokeWidth={2.5} />,
                title: "多维度定向",
                desc: "按 App 版本、系统版本、地域、设备型号等维度精准定向发布。",
                color: "var(--tertiary)",
                bgColor: "#FEF3C7",
                tags: ["版本条件", "地域定向", "AB 分组"],
              },
            ].map((strategy, i) => (
              <div
                key={i}
                className="animate-slide topic-card p-6 relative overflow-hidden"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: strategy.bgColor,
                    border: "2px solid var(--foreground)",
                    color: strategy.color,
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  {strategy.icon}
                </div>
                <h3
                  className="text-lg mb-2"
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
                >
                  {strategy.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.65 }}
                >
                  {strategy.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {strategy.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 600,
                        background: strategy.bgColor,
                        border: `1.5px solid ${strategy.color}40`,
                        color: strategy.color,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Grayscale Rollout Timeline */}
          <div
            className="animate-slide mt-8 p-6 lg:p-8 rounded-2xl"
            style={{
              background: "var(--card)",
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--secondary)",
              animationDelay: "0.2s",
            }}
          >
            <h3
              className="text-lg mb-8 flex items-center gap-2"
              style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
            >
              <Gauge size={20} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
              灰度发布时间线 (典型流程)
            </h3>

            <div className="relative">
              {/* Vertical timeline line */}
              <div
                className="absolute left-6 top-0 bottom-0 hidden md:block"
                style={{ borderLeft: "3px dashed var(--border)" }}
              />

              <div className="space-y-6">
                {[
                  { time: "T + 0h", title: "内部验证", desc: "白名单用户 (≤ 100 人)，核心功能冒烟测试", status: "success", color: "var(--quaternary)" },
                  { time: "T + 2h", title: "1% 放量", desc: "监控崩溃率 (Crash Rate < 0.1%)、接口异常率", status: "success", color: "var(--quaternary)" },
                  { time: "T + 6h", title: "10% → 30%", desc: "逐步扩量，关注用户反馈、性能指标 (FPS/TTI)", status: "warning", color: "var(--tertiary)" },
                  { time: "T + 24h", title: "50% → 100%", desc: "全量发布，持续监控 48 小时", status: "success", color: "var(--accent)" },
                  { time: "异常时", title: "立即回滚", desc: "任一指标超阈值 → 自动/手动回滚至上一稳定版本", status: "error", color: "var(--secondary)" },
                ].map((event, i) => (
                  <div key={i} className="flex gap-4 md:gap-6 items-start">
                    {/* Timeline dot */}
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative z-10"
                      style={{
                        background: event.color,
                        border: "2px solid var(--foreground)",
                        boxShadow: "3px 3px 0px 0px var(--foreground)",
                        color: "white",
                      }}
                    >
                      {event.status === "success" ? (
                        <CheckCircle2 size={18} strokeWidth={2.5} />
                      ) : event.status === "warning" ? (
                        <AlertTriangle size={18} strokeWidth={2.5} />
                      ) : (
                        <RefreshCw size={18} strokeWidth={2.5} />
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <span
                          className="px-2.5 py-0.5 rounded-md text-xs"
                          style={{
                            fontFamily: "Outfit, sans-serif",
                            fontWeight: 700,
                            background: `${event.color}20`,
                            color: event.color,
                          }}
                        >
                          {event.time}
                        </span>
                        <span
                          className="font-bold"
                          style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}
                        >
                          {event.title}
                        </span>
                      </div>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                          opacity: 0.6,
                        }}
                      >
                        {event.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Auto-rollback Code Block */}
          <div
            className="animate-slide mt-8 topic-card overflow-hidden"
            style={{ animationDelay: "0.3s" }}
          >
            <div
              className="px-5 py-3 flex items-center gap-2"
              style={{
                background: "var(--foreground)",
                borderBottom: "2px solid var(--foreground)",
              }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: "var(--secondary)" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "var(--tertiary)" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "var(--quaternary)" }} />
              </div>
              <span
                className="text-xs ml-2"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#94A3B8" }}
              >
                rollback-guard.js — 客户端自动回滚逻辑
              </span>
            </div>
            <pre
              className="p-5 text-sm leading-relaxed overflow-x-auto"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: "#1E293B",
                color: "#E2E8F0",
                margin: 0,
              }}
            >
              <code className="language-javascript">{`class HotUpdateGuard {
  constructor(options) {
    this.maxCrashCount = options.maxCrashCount ?? 3;
    this.rollbackVersion = options.rollbackVersion;
    this.monitoringWindow = options.windowMs ?? 60_000; // 1 min
  }

  async onBundleLoaded(bundleVersion) {
    // 启动崩溃监控窗口
    const crashCount = await this.startMonitoring(this.monitoringWindow);
    
    if (crashCount >= this.maxCrashCount) {
      console.warn(\`[HotUpdate] Crash threshold exceeded (\${crashCount}), rolling back...\`);
      await this.rollback(this.rollbackVersion);
      // 强制重新加载上一稳定版本
      NativeModules.DevSettings.reload();
    }
  }

  async rollback(targetVersion) {
    // 1. 标记当前版本为 broken
    await this.markBundleBroken(currentVersion);
    // 2. 激活上一版本 Bundle
    await this.activateBundle(targetVersion);
    // 3. 上报回滚事件
    this.reportRollback(currentVersion, targetVersion);
  }
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ========== PHASE 3: 秒级热修复 ========== */}
      <section className="pb-12 lg:pb-16">
        <div className="container">
          <SectionHeader
            icon={<Zap size={20} strokeWidth={2.5} />}
            label="Phase 3"
            title="线上秒级热修复机制"
            color="var(--quaternary)"
            delay="0s"
          />

          {/* Hot Fix Architecture Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {[
              {
                step: "1",
                icon: <AlertTriangle size={20} strokeWidth={2.5} />,
                title: "线上问题发现",
                desc: "Crash 监控 / 用户反馈 / 性能告警触发",
                color: "var(--secondary)",
                bg: "#FCE7F3",
              },
              {
                step: "2",
                icon: <Code2 size={20} strokeWidth={2.5} />,
                title: "修复提交构建",
                desc: "修复代码 → CI 自动构建新 Bundle",
                color: "var(--accent)",
                bg: "#EDE9FE",
              },
              {
                step: "3",
                icon: <Rocket size={20} strokeWidth={2.5} />,
                title: "紧急灰度推送",
                desc: "跳过常规流程，快速灰度验证后推送",
                color: "var(--tertiary)",
                bg: "#FEF3C7",
              },
              {
                step: "4",
                icon: <Download size={20} strokeWidth={2.5} />,
                title: "静默下载生效",
                desc: "客户端静默下载 Patch，下次启动生效",
                color: "var(--quaternary)",
                bg: "#D1FAE5",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="animate-slide topic-card p-5 text-center relative"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <div
                  className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 800,
                    background: step.color,
                    color: "white",
                    border: "2px solid var(--foreground)",
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                  }}
                >
                  {step.step}
                </div>
                <div
                  className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: step.bg,
                    border: "2px solid var(--foreground)",
                    color: step.color,
                  }}
                >
                  {step.icon}
                </div>
                <div
                  className="text-sm font-bold mb-1"
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}
                >
                  {step.title}
                </div>
                <div
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.55 }}
                >
                  {step.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Client-side Dual Bundle Strategy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Double Bundle */}
            <div
              className="animate-slide topic-card p-6"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: "var(--quaternary)",
                    color: "white",
                    border: "2px solid var(--foreground)",
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                  }}
                >
                  <Layers size={18} strokeWidth={2.5} />
                </div>
                <h3
                  className="text-lg"
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
                >
                  双 Bundle 预加载策略
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "当前 Bundle (Active)",
                    desc: "正在运行的 JSBundle，标记为 Active 状态",
                    color: "var(--quaternary)",
                    icon: <CheckCircle2 size={14} strokeWidth={2.5} />,
                  },
                  {
                    name: "待切换 Bundle (Standby)",
                    desc: "预下载到本地，等待下次启动时热替换",
                    color: "var(--tertiary)",
                    icon: <Download size={14} strokeWidth={2.5} />,
                  },
                  {
                    name: "回滚 Bundle (Rollback)",
                    desc: "保留上一个稳定版本，异常时立即切换",
                    color: "var(--secondary)",
                    icon: <RefreshCw size={14} strokeWidth={2.5} />,
                  },
                ].map((bundle, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{
                      background: `${bundle.color}10`,
                      border: `2px solid ${bundle.color}25`,
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: bundle.color, color: "white" }}
                    >
                      {bundle.icon}
                    </div>
                    <div>
                      <div
                        className="text-sm font-bold"
                        style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}
                      >
                        {bundle.name}
                      </div>
                      <div
                        className="text-xs"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.55 }}
                      >
                        {bundle.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Load & Switch Code */}
            <div
              className="animate-slide topic-card overflow-hidden"
              style={{ animationDelay: "0.3s" }}
            >
              <div
                className="px-5 py-3 flex items-center gap-2"
                style={{
                  background: "var(--foreground)",
                  borderBottom: "2px solid var(--foreground)",
                }}
              >
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: "var(--secondary)" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "var(--tertiary)" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "var(--quaternary)" }} />
                </div>
                <span
                  className="text-xs ml-2"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#94A3B8" }}
                >
                  bundle-loader.ts — 双 Bundle 切换核心
                </span>
              </div>
              <pre
                className="p-5 text-sm leading-relaxed overflow-x-auto"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  background: "#1E293B",
                  color: "#E2E8F0",
                  margin: 0,
                }}
              >
                <code className="language-typescript">{`async function loadBundle(version: string) {
  const bundlePath = \`\${RNFS.DocumentDirectoryPath}/bundles/\${version}\`;
  
  // 1. 检查本地是否已有该版本
  const exists = await RNFS.exists(bundlePath);
  if (!exists) {
    // 从 CDN 下载 Diff Patch
    const patch = await downloadPatch(currentVersion, version);
    // 合并生成新 Bundle
    await bspatch(currentBundlePath, bundlePath, patch);
  }

  // 2. 校验 Bundle 完整性
  const hash = await computeSHA256(bundlePath);
  if (hash !== expectedHash) {
    throw new Error('Bundle integrity check failed');
  }

  // 3. 标记为 Standby，等待下次启动切换
  await AsyncStorage.setItem(
    'pending_bundle', 
    JSON.stringify({ version, path: bundlePath })
  );
}`}</code>
              </pre>
            </div>
          </div>

          {/* Performance Metrics */}
          <div
            className="animate-slide mt-8 p-6 lg:p-8 rounded-2xl"
            style={{
              background: "var(--card)",
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--quaternary)",
              animationDelay: "0.35s",
            }}
          >
            <h3
              className="text-lg mb-6 flex items-center gap-2"
              style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
            >
              <Eye size={20} strokeWidth={2.5} style={{ color: "var(--quaternary)" }} />
              热更新关键监控指标
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "下载成功率", target: "≥ 99.5%", color: "var(--quaternary)", icon: <Download size={18} strokeWidth={2.5} /> },
                { label: "Patch 应用成功率", target: "≥ 99.8%", color: "var(--accent)", icon: <CheckCircle2 size={18} strokeWidth={2.5} /> },
                { label: "热更后崩溃率", target: "< 0.1%", color: "var(--secondary)", icon: <Bug size={18} strokeWidth={2.5} /> },
                { label: "平均下载耗时", target: "< 3s", color: "var(--tertiary)", icon: <Clock size={18} strokeWidth={2.5} /> },
              ].map((metric, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl text-center"
                  style={{
                    background: `${metric.color}10`,
                    border: `2px solid ${metric.color}30`,
                  }}
                >
                  <div className="flex justify-center mb-2" style={{ color: metric.color }}>
                    {metric.icon}
                  </div>
                  <div
                    className="text-2xl mb-1"
                    style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, color: metric.color }}
                  >
                    {metric.target}
                  </div>
                  <div
                    className="text-xs"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif", opacity: 0.5 }}
                  >
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== COMPARISON TABLE: Major Frameworks ========== */}
      <section className="pb-12 lg:pb-16">
        <div className="container">
          <SectionHeader
            icon={<Layers size={20} strokeWidth={2.5} />}
            title="主流 RN 热更新方案对比"
            label="方案选型"
            color="var(--accent)"
            delay="0s"
          />

          <div
            className="animate-slide mt-12 overflow-x-auto"
            style={{ animationDelay: "0.1s" }}
          >
            <div
              className="min-w-[700px] rounded-2xl overflow-hidden"
              style={{
                border: "3px solid var(--foreground)",
                boxShadow: "8px 8px 0px 0px var(--accent)",
              }}
            >
              <table className="w-full" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                <thead>
                  <tr style={{ background: "var(--foreground)", color: "white" }}>
                    {["方案", "Diff 更新", "增量大小", "回滚机制", "Hermes 支持", "开源"].map((h, i) => (
                      <th
                        key={i}
                        className="px-4 py-4 text-left text-sm"
                        style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "CodePush (MS)",
                      diff: true, size: "~20KB", rollback: "自动", hermes: "✓", open: "✓",
                      color: "var(--accent)",
                    },
                    {
                      name: "AppCenter",
                      diff: true, size: "~30KB", rollback: "自动", hermes: "✓", open: "✗",
                      color: "var(--secondary)",
                    },
                    {
                      name: "Pushy (国内)",
                      diff: true, size: "~15KB", rollback: "自动", hermes: "✓", open: "✓",
                      color: "var(--tertiary)",
                    },
                    {
                      name: "自研方案",
                      diff: "可选", size: "可控", rollback: "自定义", hermes: "✓", open: "✗",
                      color: "var(--quaternary)",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        background: i % 2 === 0 ? "var(--card)" : "var(--background)",
                        borderTop: "2px solid var(--border)",
                      }}
                    >
                      <td className="px-4 py-4">
                        <span
                          className="font-bold"
                          style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: row.color }}
                        >
                          {row.name}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm">{row.diff === true ? "✓" : row.diff}</td>
                      <td className="px-4 py-4 text-sm font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
                        {row.size}
                      </td>
                      <td className="px-4 py-4 text-sm">{row.rollback}</td>
                      <td className="px-4 py-4 text-sm">{row.hermes}</td>
                      <td className="px-4 py-4 text-sm">{row.open}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BEST PRACTICES / KEY TAKEAWAYS ========== */}
      <section className="pb-12 lg:pb-16">
        <div className="container">
          <SectionHeader
            icon={<Shield size={20} strokeWidth={2.5} />}
            title="最佳实践 & 避坑指南"
            label="经验沉淀"
            color="var(--tertiary)"
            delay="0s"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {/* Best Practices */}
            <div
              className="animate-slide topic-card p-6"
              style={{
                animationDelay: "0.1s",
                boxShadow: "8px 8px 0px 0px var(--quaternary)",
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle2 size={20} strokeWidth={2.5} style={{ color: "var(--quaternary)" }} />
                <h3
                  className="text-lg"
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, color: "var(--quaternary)" }}
                >
                  推荐实践
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  "始终开启 Hermes 字节码编译，提升启动性能 40%+",
                  "使用 Diff 更新减少 90% 下载体量",
                  "维护至少 3 个版本的回滚栈",
                  "热更后自动注入 Crash 监控守护线程",
                  "Bundle 产物必须附带完整性校验 (SHA256)",
                  "灰度期间设置自动熔断阈值 (Crash Rate < 0.1%)",
                  "使用 Sourcemap 还原线上 JS 堆栈",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "var(--quaternary)", color: "white" }}
                    >
                      <CheckCircle2 size={12} strokeWidth={2.5} />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pitfalls */}
            <div
              className="animate-slide topic-card p-6"
              style={{
                animationDelay: "0.2s",
                boxShadow: "8px 8px 0px 0px var(--secondary)",
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle size={20} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
                <h3
                  className="text-lg"
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, color: "var(--secondary)" }}
                >
                  常见陷阱
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  "热更修改了 Native 依赖却期望纯 JS Patch 生效",
                  "未做 Bundle 完整性校验，被中间人攻击篡改",
                  "全量更新未考虑弱网场景，导致用户长时间白屏",
                  "灰度阶段缺乏自动化监控，依赖人工巡查",
                  "忽略 Source Map 管理，线上崩溃无法定位",
                  "频繁热更导致版本碎片化严重",
                  "未在 Manifest 中声明 Bundle 与 Native 最低兼容版本",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "var(--secondary)", color: "white" }}
                    >
                      <AlertTriangle size={12} strokeWidth={2.5} />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER CTA ========== */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div
            className="animate-pop text-center p-10 lg:p-16 rounded-2xl relative overflow-hidden"
            style={{
              background: "var(--foreground)",
              color: "white",
              border: "3px solid var(--foreground)",
              boxShadow: "12px 12px 0px 0px var(--accent)",
            }}
          >
            {/* Decorative Blobs */}
            <div
              className="absolute -top-16 -right-16 w-48 h-48 opacity-10 pointer-events-none"
              style={{
                background: "var(--accent)",
                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              }}
            />
            <div
              className="absolute -bottom-12 -left-12 w-36 h-36 opacity-10 pointer-events-none"
              style={{
                background: "var(--tertiary)",
                borderRadius: "40% 60% 70% 30% / 30% 70% 40% 60%",
              }}
            />

            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm"
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  background: "var(--accent)",
                  color: "white",
                }}
              >
                <Flame size={14} strokeWidth={2.5} />
                总结
              </div>

              <h2
                className="text-3xl md:text-4xl mb-4"
                style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}
              >
                热更新的核心是{" "}
                <span style={{ color: "var(--tertiary)" }}>安全 × 速度 × 可观测</span>
              </h2>
              <p
                className="max-w-2xl mx-auto text-base leading-relaxed mb-8"
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  opacity: 0.65,
                }}
              >
                一套成熟的热更新方案，不仅需要高效的构建和分发能力，
                更需要完善的灰度策略和自动回滚机制来保障线上稳定性。
                把每一次热更都当作一次「可控的发版」来对待。
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                {[
                  { label: "构建", icon: <Package size={16} strokeWidth={2.5} />, color: "var(--accent)" },
                  { label: "灰度", icon: <GitBranch size={16} strokeWidth={2.5} />, color: "var(--tertiary)" },
                  { label: "修复", icon: <Zap size={16} strokeWidth={2.5} />, color: "var(--quaternary)" },
                  { label: "监控", icon: <Eye size={16} strokeWidth={2.5} />, color: "var(--secondary)" },
                  { label: "回滚", icon: <Shield size={16} strokeWidth={2.5} />, color: "white" },
                ].map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 600,
                      border: `2px solid ${tag.color}`,
                      color: tag.color === "white" ? "white" : tag.color,
                    }}
                  >
                    {tag.icon}
                    {tag.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ========== Reusable Section Header Component ========== */
function SectionHeader({
  icon,
  label,
  title,
  color,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  color: string;
  delay: string;
}) {
  return (
    <div className="animate-pop" style={{ animationDelay: delay }}>
      <div
        className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full"
        style={{
          fontFamily: "Outfit, sans-serif",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontSize: "0.8rem",
          background: `${color}18`,
          border: `2px solid ${color}40`,
          color: color,
        }}
      >
        {icon}
        {label}
      </div>
      <h2
        className="text-3xl md:text-4xl"
        style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, color: "var(--foreground)" }}
      >
        {title}
      </h2>
    </div>
  );
}