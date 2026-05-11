"use client";

import Link from "next/link";
import {
  BookOpen,
  Code2,
  Layers,
  Cpu,
  Network,
  Lock,
  Zap,
  Package,
  Braces,
  Activity,
  Server,
  Database,
  Terminal,
  Smartphone,
  Component,
  GitBranch,
  Aperture,
  Hexagon,
  Globe,
  Timer,
  Link2,
  RefreshCcw,
  Cloud,
  FileCode,
  Navigation,
  Radio,
  Users,
  Wifi,
  Eye,
  Play,
  FolderTree,
  Rocket,
  BarChart3,
  Split,
  Paintbrush,
  Maximize,
  Key,
  ShieldAlert,
  Sparkles,
  Gpu,
} from "lucide-react";

export default function Home() {
  const coreTopics = [
    {
      id: "v8",
      title: "V8 引擎垃圾回收机制",
      desc: "深入理解新生代与老生代，Scavenge 与 Mark-Sweep 算法机制，掌控内存泄漏。",
      icon: <Cpu size={24} />,
      color: "var(--accent)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "react-rendering",
      title: "React 渲染原理",
      desc: "从 Fiber 架构到 Concurrent Mode，解析 React 如何调度与更新组件树。",
      icon: <Layers size={24} />,
      color: "var(--secondary)",
      shadowColor: "var(--secondary)",
    },
    {
      id: "browser-rendering",
      title: "浏览器渲染流水线",
      desc: "DOM树构建、样式计算、布局、绘制、合成，全链路性能优化指南。",
      icon: <BookOpen size={24} />,
      color: "var(--tertiary)",
      shadowColor: "var(--tertiary)",
    },
    {
      id: "js-implicit-conversion",
      title: "JavaScript隐式转换",
      desc: "深入理解 JavaScript 的隐式转换机制，掌握类型转换的底层原理。",
      icon: <Activity size={24} />,
      color: "var(--secondary)",
      shadowColor: "var(--secondary)",
    },
    {
      id: "js-event-loop",
      title: "JavaScript 事件循环",
      desc: "宏任务与微任务的爱恨情仇，Node.js 与浏览器环境下的机制差异。",
      icon: <Code2 size={24} />,
      color: "var(--quaternary)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "build-tools",
      title: "Vite 核心机制",
      desc: "剖析 Webpack 与 Vite 核心机制，Loader/Plugin 开发与 AST 抽象语法树。",
      icon: <Package size={24} />,
      color: "var(--accent)",
      shadowColor: "var(--accent)",
    },
    {
      id: "micro-frontend",
      title: "微前端架构设计",
      desc: "从 qiankun 到 Module Federation，探索沙箱隔离与跨应用通信的实现方案。",
      icon: <Network size={24} />,
      color: "var(--secondary)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "performance-opt",
      title: "现代前端性能体系",
      desc: "深入 Core Web Vitals、网络与渲染优化，打造极致用户体验的黄金法则。",
      icon: <Zap size={24} />,
      color: "var(--tertiary)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "network-security",
      title: "网络协议与安全防御",
      desc: "HTTP/2/3 核心特性演进，深度解析 XSS、CSRF 攻击原理与 CSP 策略。",
      icon: <Lock size={24} />,
      color: "var(--quaternary)",
      shadowColor: "var(--quaternary)",
    },
    {
      id: "ts-advanced",
      title: "TS 高级类型编程",
      desc: "掌握泛型、条件类型、映射类型，玩转“类型体操”，构建健壮的类型系统。",
      icon: <Braces size={24} />,
      color: "var(--accent)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "frontend-monitoring",
      title: "前端基建与监控体系",
      desc: "错误捕获、性能指标上报与用户行为埋点，从零设计前端监控 SDK。",
      icon: <Activity size={24} />,
      color: "var(--secondary)",
      shadowColor: "var(--secondary)",
    },
    {
      id: "vue-reactivity",
      title: "Vue3 响应式与编译优化",
      desc: "Proxy 代理机制、依赖收集原理，以及 Block Tree 与 PatchFlag 的极致编译时优化。",
      icon: <Hexagon size={24} />,
      color: "var(--accent)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "ssr-hydration",
      title: "SSR 同构渲染与 Hydration",
      desc: "深入 Next.js/Nuxt.js 服务端渲染模型，解析 Hydration 水合过程的原理与性能陷阱。",
      icon: <Server size={24} />,
      color: "var(--secondary)",
      shadowColor: "var(--secondary)",
    },
    {
      id: "state-management",
      title: "复杂状态管理与数据流",
      desc: "Redux / Zustand 架构对比，不可变数据结构（Immutable）与复杂时序状态的控制方案。",
      icon: <Database size={24} />,
      color: "var(--tertiary)",
      shadowColor: "var(--tertiary)",
    },
    {
      id: "nodejs-core",
      title: "Node.js 底层与异步 I/O",
      desc: "剖析 Libuv 线程池、Stream 流式处理与 Buffer 内存管理，攻克大文件与高并发场景。",
      icon: <Terminal size={24} />,
      color: "var(--quaternary)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "cross-platform",
      title: "跨端引擎与 JSBridge",
      desc: "React Native / Flutter 渲染管线差异，WebView 与 Native 层的双向通信底层机制。",
      icon: <Smartphone size={24} />,
      color: "var(--accent)",
      shadowColor: "var(--accent)",
    },
    {
      id: "component-library",
      title: "企业级组件库设计",
      desc: "Headless UI 理念、A11y 无障碍访问、样式沙箱与按需加载的系统性设计原则。",
      icon: <Component size={24} />,
      color: "var(--secondary)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "frontend-architecture",
      title: "前端架构与设计模式",
      desc: "DDD（领域驱动设计）在前端的应用，整洁架构（Clean Architecture）落地与代码解耦。",
      icon: <GitBranch size={24} />,
      color: "var(--tertiary)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "webassembly-graphics",
      title: "Wasm 与图形渲染",
      desc: "WebAssembly 性能突破口，Canvas/WebGL 处理几十万条海量数据渲染的技术内幕。",
      icon: <Aperture size={24} />,
      color: "var(--quaternary)",
      shadowColor: "var(--quaternary)",
    },
    {
      id: "https-tls",
      title: "HTTPS TLS 握手",
      desc: "深度解析对称加密与非对称加密、TLS 1.2/1.3 握手全流程及数字证书验证机制。",
      icon: <Lock size={24} />,
      color: "var(--accent)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "react-native-new-arch",
      title: "React Native 新架构",
      desc: "深度剖析 Fabric 渲染引擎、TurboModules 与 JSI 底层通信机制。",
      icon: <Smartphone size={24} />,
      color: "var(--secondary)",
      shadowColor: "var(--secondary)",
    },
    {
      id: "css-grid",
      title: "CSS Grid 布局",
      desc: "彻底掌握二维布局神器，从基本语法到网格区域、隐式网格与自适应响应式布局实战。",
      icon: <Component size={24} />,
      color: "var(--tertiary)",
      shadowColor: "var(--tertiary)",
    },
    {
      id: "css-flex",
      title: "CSS Flex 布局",
      desc: "一维布局利器，深度解析弹性容器属性、弹性项目缩放原理及常见居中方案。",
      icon: <Layers size={24} />,
      color: "var(--quaternary)",
      shadowColor: "var(--quaternary)",
    },
    {
      id: "esm-commonjs",
      title: "ESM 与 CommonJS",
      desc: "深度对比两种模块规范：加载机制、循环引用处理、Tree Shaking 支持及 Node.js 中的混合使用。",
      icon: <Package size={24} />,
      color: "var(--accent)",
      shadowColor: "var(--accent)",
    },
    {
      id: "raf-ric",
      title: "rAF 与 rIC",
      desc: "掌握浏览器性能优化双剑客：requestAnimationFrame 保证动画丝滑，requestIdleCallback 拆分长任务避免掉帧。",
      icon: <Zap size={24} />,
      color: "var(--tertiary)",
      shadowColor: "var(--tertiary)",
    },
    {
      id: "scope-chain",
      title: "作用域与作用域链",
      desc: "掌握词法作用域、执行上下文、变量提升与闭包的底层机制，彻底理解标识符查找规则。",
      icon: <Hexagon size={24} />,
      color: "var(--quaternary)",
      shadowColor: "var(--quaternary)",
    },
    {
      id: "http-versions",
      title: "HTTP 2.0 & 3.0",
      desc: "从多路复用到 QUIC 协议：深度解析现代网络协议的进化之路，攻克队头阻塞与连接延迟。",
      icon: <Globe size={24} />,
      color: "var(--accent)",
      shadowColor: "var(--accent)",
    },
    {
      id: "promise-async",
      title: "Promise/async-await 原理",
      desc: "微任务调度机制、手写 Promise A+ 规范、错误边界与异步流程控制的底层实现。",
      icon: <Timer size={24} />,
      color: "var(--secondary)",
      shadowColor: "var(--secondary)",
    },
    {
      id: "proxy-reflect",
      title: "Proxy 与 Reflect",
      desc: "Vue3 响应式基石、元编程能力、Proxy vs Object.defineProperty 深度对比。",
      icon: <Link2 size={24} />,
      color: "var(--tertiary)",
      shadowColor: "var(--tertiary)",
    },
    {
      id: "weak-reference",
      title: "WeakMap/WeakSet 与内存",
      desc: "弱引用机制、与 GC 联动原理、实际应用场景与内存泄漏排查。",
      icon: <Activity size={24} />,
      color: "var(--quaternary)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "iterator-generator",
      title: "迭代器与生成器",
      desc: "Symbol.iterator 协议、async generator 异步迭代、惰性求值与数据流处理。",
      icon: <RefreshCcw size={24} />,
      color: "var(--accent)",
      shadowColor: "var(--accent)",
    },
    {
      id: "react-server-components",
      title: "React Server Components",
      desc: "RSC 原理与流式 SSR，零客户端 JS 的服务端组件模型，与 SSR Hydration 的本质区别。",
      icon: <Cloud size={24} />,
      color: "var(--secondary)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "vue3-compile",
      title: "Vue3 编译优化",
      desc: "PatchFlag、Block Tree、静态提升与手写编译产物对比，理解编译时如何赋能运行时。",
      icon: <FileCode size={24} />,
      color: "var(--tertiary)",
      shadowColor: "var(--tertiary)",
    },
    {
      id: "nextjs-app-router",
      title: "Next.js App Router 原理",
      desc: "路由分组、流式渲染、Server Actions 机制与 React Server Components 的深度整合。",
      icon: <Navigation size={24} />,
      color: "var(--quaternary)",
      shadowColor: "var(--quaternary)",
    },
    {
      id: "signals-reactivity",
      title: "Signals 响应式",
      desc: "Solid/Preact Signals vs React Hooks vs Vue Reactivity，横跨三大框架的响应式设计对比。",
      icon: <Radio size={24} />,
      color: "var(--accent)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "web-worker",
      title: "Web Worker 与并行计算",
      desc: "Worker 通信模型、SharedArrayBuffer 共享内存、OffscreenCanvas 离屏渲染与多线程架构。",
      icon: <Users size={24} />,
      color: "var(--secondary)",
      shadowColor: "var(--secondary)",
    },
    {
      id: "service-worker-pwa",
      title: "Service Worker 与 PWA",
      desc: "离线缓存策略、Background Sync 后台同步、推送通知与渐进式 Web 应用的完整架构。",
      icon: <Wifi size={24} />,
      color: "var(--tertiary)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "intersection-observer",
      title: "Intersection Observer",
      desc: "懒加载实现原理、曝光打点方案、无限滚动与视口交叉检测的工程化实践。",
      icon: <Eye size={24} />,
      color: "var(--quaternary)",
      shadowColor: "var(--quaternary)",
    },
    {
      id: "web-animations-api",
      title: "Web Animations API",
      desc: "原生动画引擎、与 CSS/JS 动画对比、FLIP 动画技巧与高性能交互动效实现。",
      icon: <Play size={24} />,
      color: "var(--accent)",
      shadowColor: "var(--accent)",
    },
    {
      id: "monorepo",
      title: "Monorepo 架构",
      desc: "pnpm workspace / Turborepo / Nx 选型对比，依赖隔离、任务编排与发布流程。",
      icon: <FolderTree size={24} />,
      color: "var(--secondary)",
      shadowColor: "var(--secondary)",
    },
    {
      id: "frontend-cicd",
      title: "前端 CI/CD",
      desc: "GitHub Actions 自动化、质量门禁、自动发布与版本管理的工程化最佳实践。",
      icon: <Rocket size={24} />,
      color: "var(--tertiary)",
      shadowColor: "var(--tertiary)",
    },
    {
      id: "tracking-sdk",
      title: "前端埋点与监控 SDK",
      desc: "数据采集模型、上报策略与批量机制、错误还原与用户行为回放的技术方案。",
      icon: <BarChart3 size={24} />,
      color: "var(--quaternary)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "code-splitting",
      title: "Code Splitting 原理",
      desc: "动态 import 机制、Webpack vs Vite 分包策略、预加载与路由级代码拆分实战。",
      icon: <Split size={24} />,
      color: "var(--accent)",
      shadowColor: "var(--accent)",
    },
    {
      id: "css-houdini",
      title: "CSS Houdini",
      desc: "Paint Worklet 自定义绘制、自定义属性动画、浏览器渲染管线的底层扩展能力。",
      icon: <Paintbrush size={24} />,
      color: "var(--secondary)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "container-queries",
      title: "Container Queries",
      desc: "组件级响应式设计、与传统 Media Query 的范式转变，构建真正可复用的自适应组件。",
      icon: <Maximize size={24} />,
      color: "var(--tertiary)",
      shadowColor: "var(--tertiary)",
    },
    {
      id: "frontend-auth",
      title: "前端鉴权体系",
      desc: "JWT / Session / OAuth2.0 / SSO 单点登录，完整的前端认证授权架构设计。",
      icon: <Key size={24} />,
      color: "var(--quaternary)",
      shadowColor: "var(--quaternary)",
    },
    {
      id: "csp-xss-defense",
      title: "CSP 与 XSS 防御",
      desc: "内容安全策略配置、Trusted Types、DOMPurify 与前端安全攻防实战。",
      icon: <ShieldAlert size={24} />,
      color: "var(--accent)",
      shadowColor: "var(--accent)",
    },
    {
      id: "ai-frontend",
      title: "AI + 前端",
      desc: "WebLLM 浏览器内推理、LLM 集成架构、AI 驱动的前端开发新范式。",
      icon: <Sparkles size={24} />,
      color: "var(--secondary)",
      shadowColor: "var(--secondary)",
    },
    {
      id: "webgpu",
      title: "WebGPU",
      desc: "替代 WebGL 的下一代图形 API，通用 GPU 计算与 WebAssembly 图形协同。",
      icon: <Gpu size={24} />,
      color: "var(--tertiary)",
      shadowColor: "var(--foreground)",
    },
  ];

  const projectTopics = [
    {
      id: "ast-babel-plugin",
      title: "Babel AST 与编译层定制",
      desc: "利用 AST 语法树定制编译插件，实现类 Tailwind 样式转换与代码重构，深入工程化底层。",
      icon: <Code2 size={24} />,
      color: "var(--accent)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "micro-frontend-sandbox",
      title: "微前端沙箱与按需加载",
      desc: "深入 single-spa 底层机制，手写 CSS 样式隔离插件，结合 import-maps 优化资源加载。",
      icon: <Layers size={24} />,
      color: "var(--secondary)",
      shadowColor: "var(--secondary)",
    },
    {
      id: "canvas-render-engine",
      title: "Canvas 渲染管线与图形引擎",
      desc: "基于 ZRender 封装数据驱动的 Canvas 图形库，解决海量节点与复杂交互场景的性能瓶颈。",
      icon: <Aperture size={24} />,
      color: "var(--tertiary)",
      shadowColor: "var(--tertiary)",
    },
    {
      id: "low-code-engine",
      title: "低代码动态表单引擎",
      desc: "基于 Schema 数据驱动设计，实现可视化拖拽的动态表单渲染与复杂校验逻辑流转。",
      icon: <Component size={24} />,
      color: "var(--quaternary)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "nestjs-aop-bff",
      title: "NestJS AOP 与企业级 BFF",
      desc: "运用装饰器与 AOP 编程范式，设计高度解耦的接口鉴权、日志监控与统一拦截系统。",
      icon: <Server size={24} />,
      color: "var(--accent)",
      shadowColor: "var(--accent)",
    },
    {
      id: "devtools-infra",
      title: "自研 DevTools 与工程监控",
      desc: "突破移动端抓包难点，自研按页面维度采集网络与日志的工具，落地前端研发效能平台。",
      icon: <Terminal size={24} />,
      color: "var(--secondary)",
      shadowColor: "var(--foreground)",
    },
    {
      id: "rn-hot-update",
      title: "跨端热更新与容灾底座",
      desc: "剖析 RN 热更架构设计，涵盖 JSBundle 构建、灰度发布策略与线上秒级热修复机制。",
      icon: <Smartphone size={24} />,
      color: "var(--tertiary)",
      shadowColor: "var(--foreground)",
    },
  ];

  const renderGrid = (items: any[]) => (
    <div className="grid grid-cols-3 md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:grid-cols-4 gap-2 gap-y-10 md:gap-8 md:gap-y-[60px]">
      {items.map((topic, index) => (
        <Link
          href={`/knowledge/${topic.id}`}
          key={topic.id}
          className="topic-card-link block"
        >
          <div
            className="topic-card relative cursor-pointer h-full bg-[var(--card)] border-2 border-[var(--foreground)] rounded-xl md:rounded-[var(--radius-lg)] p-2 md:p-6 shadow-[4px_4px_0px_0px_var(--shadow-color)] md:shadow-[8px_8px_0px_0px_var(--shadow-color)] hover:-translate-y-1 transition-transform"
            style={
              { "--shadow-color": topic.shadowColor } as React.CSSProperties
            }
          >
            <div
              className="absolute -top-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:-top-[28px] md:left-[28px] w-10 h-10 md:w-14 md:h-14 rounded-md border-2 border-[var(--foreground)] flex items-center justify-center shadow-[2px_2px_0px_var(--foreground)] md:shadow-[4px_4px_0px_var(--foreground)]"
              style={{
                background: topic.color,
                color: "var(--foreground)",
              }}
            >
              <div className="scale-[0.7] md:scale-100 flex items-center justify-center">
                {topic.icon}
              </div>
            </div>
            <h2
              className="font-bold text-[0.75rem] sm:text-[0.85rem] md:text-[1.4rem] mb-1 md:mb-3 mt-5 md:mt-4 leading-tight text-center md:text-left"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {topic.title}
            </h2>
            <p className="text-[var(--muted-foreground)] text-[0.95rem] leading-[1.6] hidden md:block">
              {topic.desc}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="bg-dot-grid min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <header className="text-center mb-10 md:mb-20">
          <div className="animate-pop inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2 bg-[var(--tertiary)] border-2 border-[var(--foreground)] rounded-full font-bold text-sm md:text-[0.9rem] mb-6 shadow-[3px_3px_0px_var(--foreground)]">
            🚀 持续进化中
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-[clamp(2.5rem,5vw,4rem)] my-5 font-bold">
            前端核心 <span style={{ color: "var(--accent)" }}>知识库</span>
          </h1>
          <p className="text-sm md:text-[1.15rem] text-[var(--muted-foreground)] max-w-[600px] mx-auto px-2 md:px-0">
            这里收录了那些难啃但又必须掌握的前端底层原理与进阶知识。打破碎片化，构建系统知识图谱。
          </p>
        </header>

        <h2 className="text-xl md:text-[2rem] mb-6 md:mb-[52px] font-bold">
          📚 基础与进阶核心知识
        </h2>
        {renderGrid(coreTopics)}

        <h2 className="text-xl md:text-[2rem] mb-6 md:mb-[52px] mt-12 md:mt-[80px] font-bold">
          💼 核心项目实战沉淀
        </h2>
        {renderGrid(projectTopics)}
      </div>
    </div>
  );
}
