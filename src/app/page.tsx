'use client';

import Link from 'next/link';
import { BookOpen, Code2, Layers, Cpu, Network, Lock, Zap, Package, Braces, Activity, Server, Database, Terminal, Smartphone, Component, GitBranch, Aperture, Hexagon } from 'lucide-react';

export default function Home() {
  const coreTopics = [
    {
      id: 'v8',
      title: 'V8 引擎垃圾回收机制',
      desc: '深入理解新生代与老生代，Scavenge 与 Mark-Sweep 算法机制，掌控内存泄漏。',
      icon: <Cpu size={24} />,
      color: 'var(--accent)',
      shadowColor: 'var(--foreground)'
    },
    {
      id: 'react-rendering',
      title: 'React 渲染原理',
      desc: '从 Fiber 架构到 Concurrent Mode，解析 React 如何调度与更新组件树。',
      icon: <Layers size={24} />,
      color: 'var(--secondary)',
      shadowColor: 'var(--secondary)'
    },
    {
      id: 'browser-rendering',
      title: '浏览器渲染流水线',
      desc: 'DOM树构建、样式计算、布局、绘制、合成，全链路性能优化指南。',
      icon: <BookOpen size={24} />,
      color: 'var(--tertiary)',
      shadowColor: 'var(--tertiary)'
    },
    {
      id: 'js-event-loop',
      title: 'JavaScript 事件循环',
      desc: '宏任务与微任务的爱恨情仇，Node.js 与浏览器环境下的机制差异。',
      icon: <Code2 size={24} />,
      color: 'var(--quaternary)',
      shadowColor: 'var(--foreground)'
    },
    {
      id: 'build-tools',
      title: '构建工具底层原理',
      desc: '剖析 Webpack 与 Vite 核心机制，Loader/Plugin 开发与 AST 抽象语法树。',
      icon: <Package size={24} />,
      color: 'var(--accent)',
      shadowColor: 'var(--accent)'
    },
    {
      id: 'micro-frontend',
      title: '微前端架构设计',
      desc: '从 qiankun 到 Module Federation，探索沙箱隔离与跨应用通信的实现方案。',
      icon: <Network size={24} />,
      color: 'var(--secondary)',
      shadowColor: 'var(--foreground)'
    },
    {
      id: 'performance-opt',
      title: '现代前端性能体系',
      desc: '深入 Core Web Vitals、网络与渲染优化，打造极致用户体验的黄金法则。',
      icon: <Zap size={24} />,
      color: 'var(--tertiary)',
      shadowColor: 'var(--foreground)'
    },
    {
      id: 'network-security',
      title: '网络协议与安全防御',
      desc: 'HTTP/2/3 核心特性演进，深度解析 XSS、CSRF 攻击原理与 CSP 策略。',
      icon: <Lock size={24} />,
      color: 'var(--quaternary)',
      shadowColor: 'var(--quaternary)'
    },
    {
      id: 'ts-advanced',
      title: 'TS 高级类型编程',
      desc: '掌握泛型、条件类型、映射类型，玩转“类型体操”，构建健壮的类型系统。',
      icon: <Braces size={24} />,
      color: 'var(--accent)',
      shadowColor: 'var(--foreground)'
    },
    {
      id: 'frontend-monitoring',
      title: '前端基建与监控体系',
      desc: '错误捕获、性能指标上报与用户行为埋点，从零设计前端监控 SDK。',
      icon: <Activity size={24} />,
      color: 'var(--secondary)',
      shadowColor: 'var(--secondary)'
    },
    {
      id: 'vue-reactivity',
      title: 'Vue3 响应式与编译优化',
      desc: 'Proxy 代理机制、依赖收集原理，以及 Block Tree 与 PatchFlag 的极致编译时优化。',
      icon: <Hexagon size={24} />,
      color: 'var(--accent)',
      shadowColor: 'var(--foreground)'
    },
    {
      id: 'ssr-hydration',
      title: 'SSR 同构渲染与 Hydration',
      desc: '深入 Next.js/Nuxt.js 服务端渲染模型，解析 Hydration 水合过程的原理与性能陷阱。',
      icon: <Server size={24} />,
      color: 'var(--secondary)',
      shadowColor: 'var(--secondary)'
    },
    {
      id: 'state-management',
      title: '复杂状态管理与数据流',
      desc: 'Redux / Zustand 架构对比，不可变数据结构（Immutable）与复杂时序状态的控制方案。',
      icon: <Database size={24} />,
      color: 'var(--tertiary)',
      shadowColor: 'var(--tertiary)'
    },
    {
      id: 'nodejs-core',
      title: 'Node.js 底层与异步 I/O',
      desc: '剖析 Libuv 线程池、Stream 流式处理与 Buffer 内存管理，攻克大文件与高并发场景。',
      icon: <Terminal size={24} />,
      color: 'var(--quaternary)',
      shadowColor: 'var(--foreground)'
    },
    {
      id: 'cross-platform',
      title: '跨端引擎与 JSBridge',
      desc: 'React Native / Flutter 渲染管线差异，WebView 与 Native 层的双向通信底层机制。',
      icon: <Smartphone size={24} />,
      color: 'var(--accent)',
      shadowColor: 'var(--accent)'
    },
    {
      id: 'component-library',
      title: '企业级组件库设计',
      desc: 'Headless UI 理念、A11y 无障碍访问、样式沙箱与按需加载的系统性设计原则。',
      icon: <Component size={24} />,
      color: 'var(--secondary)',
      shadowColor: 'var(--foreground)'
    },
    {
      id: 'frontend-architecture',
      title: '前端架构与设计模式',
      desc: 'DDD（领域驱动设计）在前端的应用，整洁架构（Clean Architecture）落地与代码解耦。',
      icon: <GitBranch size={24} />,
      color: 'var(--tertiary)',
      shadowColor: 'var(--foreground)'
    },
    {
      id: 'webassembly-graphics',
      title: 'Wasm 与图形渲染',
      desc: 'WebAssembly 性能突破口，Canvas/WebGL 处理几十万条海量数据渲染的技术内幕。',
      icon: <Aperture size={24} />,
      color: 'var(--quaternary)',
      shadowColor: 'var(--quaternary)'
    }
  ];

  const projectTopics = [
    {
      id: 'ast-babel-plugin',
      title: 'Babel AST 与编译层定制',
      desc: '利用 AST 语法树定制编译插件，实现类 Tailwind 样式转换与代码重构，深入工程化底层。',
      icon: <Code2 size={24} />,
      color: 'var(--accent)',
      shadowColor: 'var(--foreground)'
    },
    {
      id: 'micro-frontend-sandbox',
      title: '微前端沙箱与按需加载',
      desc: '深入 single-spa 底层机制，手写 CSS 样式隔离插件，结合 import-maps 优化资源加载。',
      icon: <Layers size={24} />,
      color: 'var(--secondary)',
      shadowColor: 'var(--secondary)'
    },
    {
      id: 'canvas-render-engine',
      title: 'Canvas 渲染管线与图形引擎',
      desc: '基于 ZRender 封装数据驱动的 Canvas 图形库，解决海量节点与复杂交互场景的性能瓶颈。',
      icon: <Aperture size={24} />,
      color: 'var(--tertiary)',
      shadowColor: 'var(--tertiary)'
    },
    {
      id: 'low-code-engine',
      title: '低代码动态表单引擎',
      desc: '基于 Schema 数据驱动设计，实现可视化拖拽的动态表单渲染与复杂校验逻辑流转。',
      icon: <Component size={24} />,
      color: 'var(--quaternary)',
      shadowColor: 'var(--foreground)'
    },
    {
      id: 'nestjs-aop-bff',
      title: 'NestJS AOP 与企业级 BFF',
      desc: '运用装饰器与 AOP 编程范式，设计高度解耦的接口鉴权、日志监控与统一拦截系统。',
      icon: <Server size={24} />,
      color: 'var(--accent)',
      shadowColor: 'var(--accent)'
    },
    {
      id: 'devtools-infra',
      title: '自研 DevTools 与工程监控',
      desc: '突破移动端抓包难点，自研按页面维度采集网络与日志的工具，落地前端研发效能平台。',
      icon: <Terminal size={24} />,
      color: 'var(--secondary)',
      shadowColor: 'var(--foreground)'
    },
    {
      id: 'rn-hot-update',
      title: '跨端热更新与容灾底座',
      desc: '剖析 RN 热更架构设计，涵盖 JSBundle 构建、灰度发布策略与线上秒级热修复机制。',
      icon: <Smartphone size={24} />,
      color: 'var(--tertiary)',
      shadowColor: 'var(--foreground)'
    }
  ];

  const renderGrid = (items: any[]) => (
    <div className="grid grid-cols-3 md:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-2 gap-y-10 md:gap-8 md:gap-y-[60px]">
      {items.map((topic, index) => (
        <Link href={`/knowledge/${topic.id}`} key={topic.id} className="animate-slide topic-card-link block" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
          <div className="topic-card relative cursor-pointer h-full bg-[var(--card)] border-2 border-[var(--foreground)] rounded-xl md:rounded-[var(--radius-lg)] p-2 md:p-8 shadow-[4px_4px_0px_0px_var(--shadow-color)] md:shadow-[8px_8px_0px_0px_var(--shadow-color)] hover:-translate-y-1 transition-transform"
               style={{ '--shadow-color': topic.shadowColor } as React.CSSProperties}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:-top-[28px] md:left-[28px] w-10 h-10 md:w-14 md:h-14 rounded-md border-2 border-[var(--foreground)] flex items-center justify-center shadow-[2px_2px_0px_var(--foreground)] md:shadow-[4px_4px_0px_var(--foreground)]"
                 style={{
                   background: topic.color,
                   color: 'var(--foreground)'
                 }}>
              <div className="scale-[0.7] md:scale-100 flex items-center justify-center">
                {topic.icon}
              </div>
            </div>
            <h2 className="font-bold text-[0.75rem] sm:text-[0.85rem] md:text-[1.4rem] mb-1 md:mb-3 mt-5 md:mt-4 leading-tight text-center md:text-left" style={{ fontFamily: 'Outfit, sans-serif' }}>
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
    <div className="bg-dot-grid" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="container" style={{ padding: '80px 24px' }}>
        <header style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="animate-pop" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            background: 'var(--tertiary)',
            border: '2px solid var(--foreground)',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            fontSize: '0.9rem',
            boxShadow: '3px 3px 0px var(--foreground)',
            marginBottom: '24px'
          }}>
            🚀 持续进化中
          </div>
          <h1 className="animate-slide" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px' }}>
            前端核心 <span style={{ color: 'var(--accent)' }}>知识库</span>
          </h1>
          <p className="animate-slide" style={{ fontSize: '1.15rem', color: 'var(--muted-foreground)', maxWidth: '600px', margin: '0 auto', animationDelay: '0.1s' }}>
            这里收录了那些难啃但又必须掌握的前端底层原理与进阶知识。打破碎片化，构建系统知识图谱。
          </p>
        </header>

        <h2 className="animate-slide" style={{ fontSize: '2rem', marginBottom: '52px', fontWeight: 700 }}>
          📚 基础与进阶核心知识
        </h2>
        {renderGrid(coreTopics)}

        <h2 className="animate-slide" style={{ fontSize: '2rem', marginBottom: '52px', marginTop: '80px', fontWeight: 700 }}>
          💼 核心项目实战沉淀
        </h2>
        {renderGrid(projectTopics)}
      </div>
    </div>
  );
}
