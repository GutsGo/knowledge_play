"use client";

import React from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import {
  ArrowLeft,
  Box,
  Shield,
  Layers,
  Share2,
  Globe,
  Monitor,
  Code2,
  Package,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Blocks,
  FileCode2,
  ChevronRight,
  Sparkles,
  Eye,
  Lock,
  Puzzle,
  Workflow,
  Network,
  Cpu,
  Server,
  Clock,
  Copy,
  Lightbulb,
  Rocket,
  Target,
  Triangle,
  Layout,
  Type,
  GitCompare,
  Database,
  Frame,
  Palette,
} from "lucide-react";

/* ──────────────────────────────────────────────
   数据定义
   ────────────────────────────────────────────── */

const sandboxMethods = [
  {
    id: "iframe",
    title: "iframe 沙盒",
    icon: Frame,
    color: "var(--accent)",
    bgColor: "bg-purple-50",
    principle:
      "利用浏览器原生 iframe 标签实现完全隔离。每个子应用运行在独立的浏览上下文中，拥有独立的 window、document 和全局作用域。",
    mechanism: [
      "主应用创建 iframe 元素，指向子应用 URL",
      "子应用在 iframe 内部独立运行，拥有完整的 JS/CSS 环境",
      "通过 postMessage / CustomEvent 进行跨 iframe 通信",
      "可监听 iframe load 事件感知子应用生命周期",
    ],
    pros: [
      "隔离性最强，CSS/JS 完全独立",
      "无需任何 JS 沙箱改造",
      "天然支持多实例并行运行",
      "子应用可使用任意前端框架",
    ],
    cons: [
      "URL 状态无法自动同步（路由割裂）",
      "弹窗/遮罩层无法突破 iframe 边界",
      "DOM 不共享，通信成本高",
      "性能开销较大，每次加载完整文档",
      "SEO 不友好",
    ],
    code: `// 主应用创建 iframe
const iframe = document.createElement('iframe');
iframe.src = 'https://sub-app.example.com';
iframe.style.cssText = 'width:100%;height:100%;border:none;';
container.appendChild(iframe);

// 通信
iframe.contentWindow.postMessage(
  { type: 'INIT', data: { user, token } },
  'https://sub-app.example.com'
);

window.addEventListener('message', (e) => {
  if (e.origin === 'https://sub-app.example.com') {
    console.log('收到子应用消息:', e.data);
  }
});`,
    useCase: "对隔离要求极高的场景，如接入第三方不可信应用",
    isolationLevel: 5,
  },
  {
    id: "snapshot",
    title: "快照沙盒 (Snapshot Sandbox)",
    icon: Copy,
    color: "var(--secondary)",
    bgColor: "bg-pink-50",
    principle:
      "在子应用激活时恢复全局状态快照，在卸载时保存当前状态快照。通过 diff 比较实现状态的保存与恢复。",
    mechanism: [
      "激活时：遍历快照中的属性，还原到 window 上",
      "运行时：子应用对 window 的修改直接生效",
      "卸载时：遍历 window 属性，与激活前快照做 diff",
      "将 diff（变更部分）保存为新的快照",
    ],
    pros: [
      "兼容性极好，支持 IE 等旧浏览器",
      "实现相对简单，易于理解",
      "子应用无感知，无需改造",
    ],
    cons: [
      "同一时刻只能运行一个子应用",
      "快照/恢复性能损耗随 window 属性增多而增大",
      "无法处理 window 上的 getter/setter",
      "可能存在状态残留",
    ],
    code: `class SnapshotSandbox {
  constructor() {
    this.snapshot = {};
    this.modifyPropsMap = {};
  }
  // 激活：恢复快照
  active() {
    // 恢复上次保存的状态
    for (const key in this.snapshot) {
      window[key] = this.snapshot[key];
    }
  }
  // 卸载：保存快照
  inactive() {
    // 记录当前 window 状态
    for (const key in window) {
      if (window[key] !== this.snapshot[key]) {
        this.modifyPropsMap[key] = window[key];
        // 还原为激活前的状态
        window[key] = this.snapshot[key];
      }
    }
    // 合并修改到快照
    this.snapshot = { ...this.snapshot, ...this.modifyPropsMap };
  }
}`,
    useCase: "需要兼容老旧浏览器，且子应用不需要同时运行的场景",
    isolationLevel: 3,
  },
  {
    id: "proxy",
    title: "代理沙盒 (Proxy Sandbox)",
    icon: Shield,
    color: "var(--tertiary)",
    bgColor: "bg-yellow-50",
    principle:
      "使用 ES6 Proxy 创建 fakeWindow 代理对象。子应用的所有全局变量读写操作都映射到各自的 fakeWindow 上，互不干扰。",
    mechanism: [
      "为每个子应用创建独立的 fakeWindow 对象",
      "使用 Proxy 拦截 window 的 get/set 操作",
      "set 操作只修改 fakeWindow，不影响真实 window",
      "get 操作优先从 fakeWindow 取值，再 fallback 到 window",
    ],
    pros: [
      "支持多实例同时运行（多代理并存）",
      "不修改真实 window，无副作用",
      "可精确记录子应用的全局变量修改",
      "支持白名单机制，可配置可逃逸的变量",
    ],
    cons: [
      "不支持 IE 浏览器（Proxy 是 ES6 特性）",
      "部分 DOM API 在 Proxy 下可能行为异常",
      "with 语句配合 Proxy 有一定性能开销",
      "无法完全拦截所有 window 属性（如 window.window）",
    ],
    code: `class ProxySandbox {
  constructor(name) {
    this.name = name;
    this.fakeWindow = {};
    // 记录所有被 set 过的属性
    this.updatedValueSet = new Set();

    this.proxy = new Proxy(window, {
      get: (target, key) => {
        // 优先从 fakeWindow 取值
        if (key in this.fakeWindow) {
          return this.fakeWindow[key];
        }
        const val = target[key];
        // 绑定正确的 this 指向
        return typeof val === 'function'
          ? val.bind(target) : val;
      },
      set: (_, key, value) => {
        this.fakeWindow[key] = value;
        this.updatedValueSet.add(key);
        return true;
      },
      has: (_, key) => {
        return key in this.fakeWindow || key in window;
      },
    });
  }
}`,
    useCase: "qiankun 默认方案，需要多子应用并行运行的主流场景",
    isolationLevel: 4,
  },
  {
    id: "vm",
    title: "VM 沙盒 (V8 Sandbox)",
    icon: Cpu,
    color: "var(--quaternary)",
    bgColor: "bg-emerald-50",
    principle:
      "利用浏览器端的 JavaScript 解析/执行能力，将子应用代码包裹在自定义的执行上下文中。通过 new Function 或自定义模块加载器实现。",
    mechanism: [
      "将子应用 JS 代码作为字符串获取",
      "构造自定义的执行上下文（with 语句 + Proxy）",
      "使用 new Function 或 eval 在受限环境中执行代码",
      "通过 Proxy 拦截所有自由变量的访问",
    ],
    pros: [
      "隔离粒度最细，可控制到变量级别",
      "可实现模块级别的沙箱隔离",
      "支持精确的依赖注入",
      "体积小，启动速度快",
    ],
    cons: [
      "with + new Function 存在 CSP 安全策略限制",
      "调试困难，源码映射复杂",
      "部分浏览器 API 调用可能失效",
      "动态执行代码的性能开销",
    ],
    code: "// micro-app 的沙箱实现思路\nfunction createVmSandbox(code, context) {\n  // 使用 with 语句将 context 作为作用域链\n  const fn = new Function(\n    'window', 'self', 'globalThis',\n    `with(window) {\n      try { ${code} }\n      catch(e) { console.error(e); }\n    }`\n  );\n\n  // Proxy 包装 context\n  const proxy = new Proxy(context, {\n    has: () => true,  // 所有变量都从 context 查找\n    get: (target, key) => target[key] ?? window[key],\n    set: (target, key, value) => {\n      target[key] = value;\n      return true;\n    }\n  });\n\n  fn(proxy, proxy, proxy);\n}",
    useCase: "micro-app 默认方案，需要极致轻量和精细隔离的场景",
    isolationLevel: 4,
  },
];

const cssIsolationMethods = [
  {
    id: "shadow-dom",
    title: "Shadow DOM",
    icon: Eye,
    color: "var(--accent)",
    strength: "最强",
    strengthColor: "text-purple-600 bg-purple-100",
    description:
      "利用浏览器原生的 Shadow DOM 能力，将子应用的 DOM 和样式完全封装在 Shadow Root 内部，外部样式无法侵入，内部样式也不会泄漏。",
    details: [
      "attachShadow({ mode: 'open' }) 创建影子根节点",
      "外部 CSS 选择器无法选中 Shadow 内部元素",
      "内部 <style> 标签仅作用于 Shadow 范围",
      "可通过 CSS Custom Properties (--var) 向内传递变量",
    ],
    pros: ["浏览器原生隔离，最彻底", "无命名冲突风险", "无需额外工具链"],
    cons: [
      "弹窗/下拉菜单可能逃逸出 Shadow 边界",
      "第三方 UI 库可能不兼容",
      "调试工具支持有限",
      "focus/tabindex 等可访问性可能受影响",
    ],
    example: `// micro-app 默认使用 Shadow DOM
class MicroApp extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    // 子应用 HTML 被注入到 Shadow 内部
    shadow.innerHTML = '<div id="app-root"></div>';
    // 子应用的样式也被注入到 Shadow 内部
    // 外部样式完全不影响子应用
  }
}`,
  },
  {
    id: "scoped-css",
    title: "Scoped CSS（动态作用域）",
    icon: Lock,
    color: "var(--secondary)",
    strength: "强",
    strengthColor: "text-pink-600 bg-pink-100",
    description:
      "在运行时动态为子应用的所有样式规则添加唯一的作用域前缀（如 [data-app-id='vue-app']），使样式仅匹配对应子应用的 DOM 节点。",
    details: [
      "劫持 HTMLStyleElement.prototype 和 CSSStyleSheet",
      "解析 CSS 规则，为选择器添加属性选择器限定",
      "为子应用根节点添加唯一的 data-app-id 属性",
      "处理 @media、@keyframes 等特殊规则",
    ],
    pros: [
      "子应用无感知，无需改造",
      "不依赖 Shadow DOM，兼容性好",
      "支持大部分 CSS 语法",
      "运行时自动处理动态插入的样式",
    ],
    cons: [
      "正则解析 CSS 可能遗漏边界情况",
      "运行时性能损耗（样式越多越慢）",
      "无法处理 JS 动态创建的 style",
      "对 @import 和 CSS Variables 处理不完美",
    ],
    example: `// qiankun scopedCSS 实现思路
function scopedCSS(styleElement, appName) {
  // 劫持 sheet.cssRules
  const sheet = styleElement.sheet;
  const rules = sheet.cssRules;

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (rule instanceof CSSStyleRule) {
      // 为选择器添加作用域限定
      // .btn → .btn[data-name="sub-app"]
      const selector = rule.selectorText;
      rule.selectorText = addScope(selector, appName);
    }
  }
}

function addScope(selector, appName) {
  return selector.split(',').map(s =>
    '[data-name="' + appName + '"] ' + s.trim()
  ).join(', ');
}`,
  },
  {
    id: "css-modules",
    title: "CSS Modules / CSS-in-JS",
    icon: Type,
    color: "var(--tertiary)",
    strength: "中强",
    strengthColor: "text-yellow-600 bg-yellow-100",
    description:
      "在编译阶段通过 CSS Modules 的哈希命名或 CSS-in-JS 的运行时唯一类名生成，确保每个子应用的样式类名唯一，从根源上避免冲突。",
    details: [
      "CSS Modules: 编译时为类名添加哈希后缀（.btn → .btn_a3x2f）",
      "CSS-in-JS: 运行时生成唯一类名，注入 <style> 标签",
      "styled-components / emotion 等方案自动添加唯一前缀",
      "需要子应用在开发时采用对应方案",
    ],
    pros: [
      "类名冲突概率趋近于零",
      "成熟的生态系统和工具链支持",
      "支持动态样式和主题切换",
      "CSS Modules 零运行时开销",
    ],
    cons: [
      "需要子应用主动改造，接入成本高",
      "全局样式（reset/normalize）仍需额外处理",
      "CSS-in-JS 有运行时性能开销",
      "服务端渲染场景配置复杂",
    ],
    example: "// CSS Modules 示例\n// Button.module.css\n.btn { background: var(--primary); }\n.btn_active { background: var(--active); }\n\n// Button.jsx - 编译后类名自动唯一化\nimport styles from './Button.module.css';\n// 渲染为: <button class=\"btn_x8k2a btn_active_f3j9p\">Click</button>\n<button className={`${styles.btn} ${isActive && styles.btn_active}`}>\n\n// styled-components 示例\nconst StyledBtn = styled.button`\n  background: ${p => p.primary ? '#8B5CF6' : '#fff'};\n  // 自动添加唯一哈希类名\n`;",
  },
  {
    id: "bem-naming",
    title: "BEM 命名约定",
    icon: Layout,
    color: "var(--quaternary)",
    strength: "弱",
    strengthColor: "text-emerald-600 bg-emerald-100",
    description:
      "通过严格的命名规范（Block__Element--Modifier），为每个子应用的所有 CSS 类名添加应用前缀，人为避免命名冲突。",
    details: [
      "每个子应用使用唯一的 Block 前缀（如 app-vue-、app-react-）",
      "类名格式: {app}-{block}__{element}--{modifier}",
      "需要 ESLint/stylelint 规则强制约束",
      "可以配合 PostCSS 插件自动添加前缀",
    ],
    pros: [
      "零技术门槛，无需额外工具",
      "所有框架/构建工具均兼容",
      "易于理解和实施",
      "命名自带语义化",
    ],
    cons: [
      "依赖开发者自觉性，易出错",
      "全局样式（如 body/html）仍可能冲突",
      "类名冗长，编写和维护成本高",
      "无法防止第三方库样式冲突",
    ],
    example: `/* 每个子应用使用唯一前缀 */
/* 子应用 A */
.app-cart__header--active { color: #8B5CF6; }
.app-cart__item--selected { border: 2px solid #8B5CF6; }

/* 子应用 B */
.app-order__header--active { color: #F472B6; }
.app-order__item--selected { border: 2px solid #F472B6; }

/* PostCSS 自动添加前缀 */
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-prefix-selector': {
      prefix: '.app-cart',
      transform(_, selector) {
        return '.app-cart ' + selector;
      }
    }
  }
};`,
  },
];

const dependencyMethods = [
  {
    id: "externals",
    title: "Webpack Externals + Import Maps",
    icon: Package,
    color: "var(--accent)",
    description:
      "主应用通过 script 标签全局加载公共依赖（React、Vue 等），子应用通过 Webpack Externals 配置排除这些依赖，运行时从全局获取。",
    steps: [
      "主应用在 HTML 中通过 <script> 引入公共依赖",
      "主应用配置 Import Maps 映射模块名到全局变量",
      "子应用配置 Webpack Externals 排除公共依赖",
      "子应用 import 语句在运行时解析为全局变量访问",
    ],
    pros: [
      "实现简单，广泛使用",
      "显著减少重复加载的资源体积",
      "所有构建工具均支持",
    ],
    cons: [
      "需要主/子应用约定相同的依赖版本",
      "版本升级需要所有应用同步更新",
      "全局变量管理容易混乱",
      "Import Maps 浏览器兼容性有限（需 polyfill）",
    ],
    code: `<!-- 主应用 HTML -->
<script type="importmap">
{
  "imports": {
    "react": "https://cdn.example.com/react@18.2.0/umd/react.min.js",
    "react-dom": "https://cdn.example.com/react-dom@18.2.0/umd/react-dom.min.js",
    "vue": "https://cdn.example.com/vue@3.3.0/dist/vue.global.prod.js"
  }
}
</script>

// 子应用 webpack.config.js
module.exports = {
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    vue: 'Vue'
  }
};

// 子应用代码正常 import，运行时使用全局变量
import React from 'react'; // → window.React`,
  },
  {
    id: "module-federation",
    title: "Module Federation（模块联邦）",
    icon: Network,
    color: "var(--secondary)",
    description:
      "Webpack 5 原生支持的模块共享方案。应用可作为远程模块暴露组件/工具，其他应用按需异步加载，实现真正的运行时模块共享。",
    steps: [
      "各应用在 webpack 配置中声明 exposes（暴露的模块）和 remotes（远程模块）",
      "构建后生成 remoteEntry.js 入口文件",
      "消费方通过 import() 动态加载远程模块",
      "shared 配置控制共享依赖的版本策略和加载方式",
    ],
    pros: [
      "真正的运行时模块共享，无需预编译",
      "支持独立部署，版本自动协商",
      "可按需加载，性能优秀",
      "共享依赖自动单例化",
    ],
    cons: [
      "强依赖 Webpack 5（Vite 需要插件）",
      "共享依赖版本管理复杂",
      "运行时加载增加首屏延迟",
      "调试和错误追踪困难",
      "TypeScript 类型共享需额外配置",
    ],
    code: `// App1（远程应用）- webpack.config.js
new ModuleFederationPlugin({
  name: 'app1',
  filename: 'remoteEntry.js',
  exposes: {
    './Button': './src/components/Button',
    './utils': './src/utils/index',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
  },
});

// App2（消费应用）- webpack.config.js
new ModuleFederationPlugin({
  name: 'app2',
  remotes: {
    app1: 'app1@http://localhost:3001/remoteEntry.js',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});

// App2 中使用远程组件
const RemoteButton = React.lazy(
  () => import('app1/Button')
);`,
  },
  {
    id: "systemjs",
    title: "SystemJS + UMD",
    icon: Database,
    color: "var(--tertiary)",
    description:
      "SystemJS 作为通用模块加载器，可在浏览器中加载 UMD/AMD/System 模块格式。主应用使用 SystemJS 加载子应用，子应用输出为 UMD 格式实现依赖共享。",
    steps: [
      "子应用构建为 UMD 或 System 格式",
      "主应用使用 SystemJS.load() 加载子应用入口",
      "共享依赖通过 SystemJS import map 声明",
      "子应用的 import 语句由 SystemJS 在运行时解析",
    ],
    pros: [
      "浏览器兼容性极好（支持 IE）",
      "支持多种模块格式（UMD/AMD/ESM/System）",
      "运行时动态加载",
      "qiankun 内部使用的方案",
    ],
    cons: [
      "需要额外引入 SystemJS 运行时（~15KB gzip）",
      "模块格式转换增加加载延迟",
      "调试体验差，错误堆栈复杂",
      "ESM 原生支持已成主流，SystemJS 逐渐边缘化",
    ],
    code: `<script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.min.js"></script>
<script>
  System.import('https://sub-app.example.com/main.js')
    .then(appModule => {
      appModule.bootstrap(document.getElementById('app'));
    });
</script>

// 子应用 webpack 配置 output.libraryTarget
module.exports = {
  output: {
    libraryTarget: 'system', // 或 'umd'
    filename: 'main.js',
  },
};

// 通过 importmap 共享依赖
<script type="systemjs-importmap">
{
  "imports": {
    "react": "https://cdn.example.com/react.production.min.js",
    "react-dom": "https://cdn.example.com/react-dom.production.min.js"
  }
}
</script>`,
  },
];

const frameworkComparison = [
  {
    name: "qiankun",
    icon: Blocks,
    color: "var(--accent)",
    sandbox: "Proxy / Snapshot",
    cssIsolation: "Scoped CSS",
    depSharing: "externals + SystemJS",
    pros: "生态成熟、社区活跃、文档完善",
    cons: "沙箱不够彻底、CSS 隔离有边界问题",
    stars: "15k+",
    status: "稳定",
  },
  {
    name: "micro-app",
    icon: Box,
    color: "var(--secondary)",
    sandbox: "VM Sandbox (iframe 降级)",
    cssIsolation: "Shadow DOM / Scoped CSS",
    depSharing: "预加载 + externals",
    pros: "类 Web Component 接入、零改造、轻量",
    cons: "沙箱偶有边界 case、社区较小",
    stars: "5.5k+",
    status: "活跃",
  },
  {
    name: "wujie（无界）",
    icon: Globe,
    color: "var(--tertiary)",
    sandbox: "iframe + Proxy 混合",
    cssIsolation: "Shadow DOM + CSS Scope",
    depSharing: "iframe 通信 + 预加载",
    pros: "iframe 隔离但无 URL 割裂问题、组件化接入",
    cons: "较新、生态待完善",
    stars: "3.5k+",
    status: "活跃",
  },
  {
    name: "Module Federation",
    icon: Network,
    color: "var(--quaternary)",
    sandbox: "无（应用自行隔离）",
    cssIsolation: "需自行处理",
    depSharing: "内置 shared 机制",
    pros: "Webpack 5 原生、运行时共享、独立部署",
    cons: "不提供沙箱和路由、强绑定 Webpack",
    stars: "内置",
    status: "标准",
  },
];

/* ──────────────────────────────────────────────
   主组件
   ────────────────────────────────────────────── */

export default function MicroFrontendDetailPage() {
  const sectionAnimationStyle = (delay: number): React.CSSProperties => ({
    animation: `slideUp 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms both`,
  });

  return (
    <div className="bg-dot-grid min-h-screen pb-24">
      {/* ───── 全局动画定义 ───── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pop {
          0% { opacity: 0; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      ` }} />

      {/* ═══════════════════════════════════════════
          HERO 区域
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden pb-16 md:pt-12 md:pb-24">
        {/* 装饰性 Blob */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 md:w-96 md:h-96 opacity-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, var(--secondary), var(--accent))",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 -left-16 w-48 h-48 md:w-64 md:h-64 opacity-15 pointer-events-none"
          style={{
            background: "var(--tertiary)",
            borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
            animation: "float 10s ease-in-out infinite 2s",
          }}
        />

        <div className="container relative z-10">
          {/* 主标题区域 */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex-1">
              {/* 标签 */}
              <div
                className="animate-pop inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                           border-2 border-[var(--foreground)] bg-[var(--accent)] text-white
                           font-bold text-xs uppercase tracking-wider mb-5"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  boxShadow: "3px 3px 0px 0px var(--foreground)",
                  animation: "pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
                }}
              >
                <Puzzle size={14} strokeWidth={2.5} />
                架构模式
              </div>

              {/* 大标题 */}
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4"
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  color: "var(--foreground)",
                  animation: "pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both",
                }}
              >
                微前端架构
                <br />
                <span
                  className="relative inline-block"
                  style={{ color: "var(--accent)" }}
                >
                  深度解析
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 8C60 2 140 2 298 8"
                      stroke="var(--secondary)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* 副标题 */}
              <p
                className="text-lg md:text-xl text-[var(--foreground)] opacity-70 max-w-2xl leading-relaxed"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  animation:
                    "slideUp 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.35s both",
                }}
              >
                从 JS 沙箱原理到 CSS 隔离策略，从依赖共享方案到技术选型决策 ——
                全面拆解微前端的核心隔离机制与工程化实践。
              </p>
            </div>

            {/* Hero 右侧装饰卡片 */}
            <div
              className="hidden lg:block"
              style={{
                animation:
                  "pop 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.5s both",
              }}
            >
              <div
                className="bg-white border-2 border-[var(--foreground)] rounded-2xl p-6 w-72"
                style={{
                  boxShadow: "8px 8px 0px 0px var(--accent)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl border-2 border-[var(--foreground)]
                               bg-[var(--accent)] flex items-center justify-center"
                  >
                    <Blocks size={20} strokeWidth={2.5} className="text-white" />
                  </div>
                  <div>
                    <div
                      className="font-bold text-sm"
                      style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                      核心知识点
                    </div>
                    <div className="text-xs opacity-60">2024 版</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {["JS 沙箱机制", "CSS 隔离策略", "依赖共享方案", "框架选型对比"].map(
                    (item, i) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-sm"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                      >
                        <div
                          className="w-6 h-6 rounded-md border-2 border-[var(--foreground)] flex items-center justify-center text-xs font-bold"
                          style={{
                            background:
                              i % 2 === 0 ? "var(--tertiary)" : "var(--secondary)",
                            color: "var(--foreground)",
                          }}
                        >
                          {i + 1}
                        </div>
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 快速标签 */}
          <div
            className="flex flex-wrap gap-3 mt-8"
            style={{
              animation:
                "slideUp 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.5s both",
            }}
          >
            {[
              { label: "沙盒隔离", bg: "var(--accent)", icon: Shield },
              { label: "CSS 隔离", bg: "var(--secondary)", icon: Palette },
              { label: "依赖共享", bg: "var(--tertiary)", icon: Share2 },
              { label: "技术选型", bg: "var(--quaternary)", icon: GitCompare },
            ].map(({ label, bg, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full
                           border-2 border-[var(--foreground)] text-sm font-semibold"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  background: bg,
                  color: "white",
                  boxShadow: "3px 3px 0px 0px var(--foreground)",
                }}
              >
                <Icon size={14} strokeWidth={2.5} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          概览卡片 - 微前端三大核心问题
          ═══════════════════════════════════════════ */}
      <section className="container !mt-10 !mb-20">
        <div
          className="text-center mb-12"
          style={sectionAnimationStyle(300)}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                       border-2 border-[var(--foreground)] bg-[var(--tertiary)]
                       font-bold text-xs uppercase tracking-wider mb-4"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              boxShadow: "3px 3px 0px 0px var(--foreground)",
            }}
          >
            <Target size={14} strokeWidth={2.5} />
            核心挑战
          </div>
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}
          >
            微前端要解决的三大问题
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: "JS 沙箱隔离",
              desc: "多个子应用共享同一个全局 window，如何防止全局变量污染和冲突？",
              color: "var(--accent)",
              delay: 400,
            },
            {
              icon: Palette,
              title: "CSS 样式隔离",
              desc: "不同子应用的 CSS 选择器可能重名，如何保证样式互不干扰？",
              color: "var(--secondary)",
              delay: 500,
            },
            {
              icon: Share2,
              title: "公共依赖共享",
              desc: "每个子应用都打包 React/Vue 会导致资源浪费，如何高效共享？",
              color: "var(--tertiary)",
              delay: 600,
            },
          ].map(({ icon: Icon, title, desc, color, delay }) => (
            <div
              key={title}
              className="topic-card bg-white border-2 border-[var(--foreground)]
                         rounded-2xl p-6 relative overflow-hidden"
              style={{
                boxShadow: "6px 6px 0px 0px var(--foreground)",
                ...sectionAnimationStyle(delay),
              }}
            >
              {/* 角标装饰 */}
              <div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-15"
                style={{ background: color }}
              />
              <div
                className="w-14 h-14 rounded-2xl border-2 border-[var(--foreground)]
                           flex items-center justify-center mb-4"
                style={{ background: color }}
              >
                <Icon size={28} strokeWidth={2.5} className="text-white" />
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: '"Outfit", sans-serif', color: "var(--foreground)" }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed opacity-70"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 1: JS 沙盒方案
          ═══════════════════════════════════════════ */}
      <section className="container !mb-20">
        {/* Section 标题 */}
        <div className="mb-12" style={sectionAnimationStyle(200)}>
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-2xl border-2 border-[var(--foreground)]
                         bg-[var(--accent)] flex items-center justify-center"
              style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
            >
              <Shield size={24} strokeWidth={2.5} className="text-white" />
            </div>
            <div>
              <div
                className="text-xs font-bold uppercase tracking-widest opacity-50"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Part 01
              </div>
              <h2
                className="text-3xl md:text-4xl font-extrabold"
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  color: "var(--foreground)",
                }}
              >
                JS 沙箱方案
              </h2>
            </div>
          </div>
          <p
            className="text-base opacity-70 max-w-2xl ml-16"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            沙箱（Sandbox）是微前端的核心能力，它为每个子应用创建一个隔离的 JavaScript
            执行环境，防止子应用修改全局对象导致其他应用出错。
          </p>
        </div>

        {/* 沙箱方案时间线 */}
        <div className="relative">
          {/* 垂直连接线 */}
          <div
            className="absolute left-6 top-0 bottom-0 hidden md:block"
            style={{
              borderLeft: "3px dashed var(--border)",
              marginLeft: "1px",
            }}
          />

          <div className="space-y-10">
            {sandboxMethods.map((method, idx) => (
              <div
                key={method.id}
                className="relative md:pl-20"
                style={sectionAnimationStyle(300 + idx * 120)}
              >
                {/* 时间线圆点 */}
                <div
                  className="hidden md:flex absolute left-0 top-6 w-[52px] h-[52px]
                             rounded-full border-3 items-center justify-center z-10"
                  style={{
                    background: method.color,
                    borderColor: "var(--foreground)",
                    borderWidth: "3px",
                    boxShadow: "3px 3px 0px 0px var(--foreground)",
                  }}
                >
                  <method.icon size={22} strokeWidth={2.5} className="text-white" />
                </div>

                {/* 卡片 */}
                <div
                  className="topic-card bg-white border-2 border-[var(--foreground)]
                             rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: "8px 8px 0px 0px var(--foreground)",
                  }}
                >
                  {/* 卡片头部 */}
                  <div
                    className="px-6 py-4 flex flex-wrap items-center gap-3 border-b-2 border-[var(--foreground)]"
                    style={{ background: `${method.color}15` }}
                  >
                    <div
                      className="md:hidden w-10 h-10 rounded-xl border-2 border-[var(--foreground)]
                                 flex items-center justify-center"
                      style={{ background: method.color }}
                    >
                      <method.icon size={18} strokeWidth={2.5} className="text-white" />
                    </div>
                    <h3
                      className="text-xl md:text-2xl font-extrabold flex-1"
                      style={{
                        fontFamily: '"Outfit", sans-serif',
                        color: "var(--foreground)",
                      }}
                    >
                      {method.title}
                    </h3>
                    {/* 隔离等级 */}
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-xs font-bold opacity-60"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                      >
                        隔离强度
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className="w-3 h-3 rounded-sm border border-[var(--foreground)]"
                            style={{
                              background:
                                level <= method.isolationLevel
                                  ? method.color
                                  : "transparent",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* 原理 */}
                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={16} strokeWidth={2.5} style={{ color: method.color }} />
                        <span
                          className="text-xs font-bold uppercase tracking-wider opacity-60"
                          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                        >
                          核心原理
                        </span>
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                      >
                        {method.principle}
                      </p>
                    </div>

                    {/* 实现机制 */}
                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Workflow size={16} strokeWidth={2.5} style={{ color: method.color }} />
                        <span
                          className="text-xs font-bold uppercase tracking-wider opacity-60"
                          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                        >
                          实现机制
                        </span>
                      </div>
                      <div className="space-y-2">
                        {method.mechanism.map((step, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 text-sm"
                            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                          >
                            <div
                              className="flex-shrink-0 w-6 h-6 rounded-md border-2 border-[var(--foreground)]
                                         flex items-center justify-center text-xs font-bold mt-0.5"
                              style={{ background: method.color, color: "white" }}
                            >
                              {i + 1}
                            </div>
                            <span className="opacity-80">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 优缺点 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                      {/* 优点 */}
                      <div
                        className="rounded-xl border-2 border-[var(--foreground)] p-4"
                        style={{ background: "rgba(52,211,153,0.08)" }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2
                            size={16}
                            strokeWidth={2.5}
                            className="text-emerald-500"
                          />
                          <span
                            className="text-xs font-bold uppercase tracking-wider text-emerald-600"
                            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                          >
                            优势
                          </span>
                        </div>
                        <ul className="space-y-1.5">
                          {method.pros.map((p, i) => (
                            <li
                              key={i}
                              className="text-sm flex items-start gap-2"
                              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                            >
                              <span className="text-emerald-500 mt-0.5 flex-shrink-0">
                                +
                              </span>
                              <span className="opacity-80">{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* 缺点 */}
                      <div
                        className="rounded-xl border-2 border-[var(--foreground)] p-4"
                        style={{ background: "rgba(251,191,36,0.08)" }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle
                            size={16}
                            strokeWidth={2.5}
                            className="text-amber-500"
                          />
                          <span
                            className="text-xs font-bold uppercase tracking-wider text-amber-600"
                            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                          >
                            劣势
                          </span>
                        </div>
                        <ul className="space-y-1.5">
                          {method.cons.map((c, i) => (
                            <li
                              key={i}
                              className="text-sm flex items-start gap-2"
                              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                            >
                              <span className="text-amber-500 mt-0.5 flex-shrink-0">
                                !
                              </span>
                              <span className="opacity-80">{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* 代码示例 */}
                    <details className="group">
                      <summary
                        className="flex items-center gap-2 cursor-pointer select-none
                                   text-sm font-bold py-2"
                        style={{
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          color: method.color,
                        }}
                      >
                        <ChevronRight
                          size={16}
                          strokeWidth={2.5}
                          className="transition-transform group-open:rotate-90"
                        />
                        查看代码示例
                      </summary>
                      <div
                        className="mt-3 rounded-xl border-2 border-[var(--foreground)]
                                   overflow-hidden text-xs"
                        style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
                      >
                        <div
                          className="px-4 py-2 flex items-center gap-2 border-b-2 border-[var(--foreground)]"
                          style={{
                            background: "var(--foreground)",
                            color: "var(--background)",
                          }}
                        >
                          <Code2 size={14} strokeWidth={2.5} />
                          <span
                            className="font-bold"
                            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                          >
                            Implementation
                          </span>
                        </div>
                        <pre
                          className="p-4 overflow-x-auto leading-relaxed"
                          style={{
                            background: "#1a1a2e",
                            color: "#e2e8f0",
                            fontFamily: '"Fira Code", "Cascadia Code", monospace',
                            fontSize: "12px",
                          }}
                        >
                          <code className="language-javascript" dangerouslySetInnerHTML={{ __html: Prism.highlight(method.code, Prism.languages.javascript, 'javascript') }} />
                        </pre>
                      </div>
                    </details>

                    {/* 适用场景 */}
                    <div
                      className="mt-4 flex items-start gap-2 p-3 rounded-lg"
                      style={{
                        background: `${method.color}10`,
                        border: `1px dashed ${method.color}`,
                      }}
                    >
                      <Rocket
                        size={16}
                        strokeWidth={2.5}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: method.color }}
                      />
                      <span
                        className="text-sm"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                      >
                        <strong>适用场景：</strong>
                        {method.useCase}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 沙箱方案对比速查表 */}
        <div
          className="mt-12 topic-card bg-white border-2 border-[var(--foreground)]
                     rounded-2xl overflow-hidden"
          style={{
            boxShadow: "8px 8px 0px 0px var(--accent)",
            ...sectionAnimationStyle(800),
          }}
        >
          <div
            className="px-6 py-4 border-b-2 border-[var(--foreground)] flex items-center gap-3"
            style={{ background: "var(--accent)" }}
          >
            <GitCompare size={20} strokeWidth={2.5} className="text-white" />
            <h3
              className="text-lg font-bold text-white"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              沙箱方案对比速查表
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              <thead>
                <tr className="border-b-2 border-[var(--foreground)]" style={{ background: "var(--background)" }}>
                  <th className="px-4 py-3 text-left font-bold">方案</th>
                  <th className="px-4 py-3 text-center font-bold">隔离强度</th>
                  <th className="px-4 py-3 text-center font-bold">多实例</th>
                  <th className="px-4 py-3 text-center font-bold">IE 兼容</th>
                  <th className="px-4 py-3 text-center font-bold">性能</th>
                  <th className="px-4 py-3 text-left font-bold">代表框架</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "iframe", level: "★★★★★", multi: "✅", ie: "✅", perf: "⚠️ 较差", fw: "无界(wujie)" },
                  { name: "快照沙盒", level: "★★★☆☆", multi: "❌", ie: "✅", perf: "⚡ 良好", fw: "qiankun legacy" },
                  { name: "代理沙盒", level: "★★★★☆", multi: "✅", ie: "❌", perf: "⚡ 良好", fw: "qiankun proxy" },
                  { name: "VM 沙盒", level: "★★★★☆", multi: "✅", ie: "❌", perf: "⚡ 良好", fw: "micro-app" },
                ].map((row) => (
                  <tr key={row.name} className="border-b border-[var(--border)] hover:bg-purple-50/30 transition-colors">
                    <td className="px-4 py-3 font-bold">{row.name}</td>
                    <td className="px-4 py-3 text-center">{row.level}</td>
                    <td className="px-4 py-3 text-center text-lg">{row.multi}</td>
                    <td className="px-4 py-3 text-center text-lg">{row.ie}</td>
                    <td className="px-4 py-3 text-center">{row.perf}</td>
                    <td className="px-4 py-3 opacity-70">{row.fw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: CSS 隔离方案
          ═══════════════════════════════════════════ */}
      <section className="container !mb-20">
        {/* Section 标题 */}
        <div className="mb-12" style={sectionAnimationStyle(200)}>
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-2xl border-2 border-[var(--foreground)]
                         bg-[var(--secondary)] flex items-center justify-center"
              style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
            >
              <Palette size={24} strokeWidth={2.5} className="text-white" />
            </div>
            <div>
              <div
                className="text-xs font-bold uppercase tracking-widest opacity-50"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Part 02
              </div>
              <h2
                className="text-3xl md:text-4xl font-extrabold"
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  color: "var(--foreground)",
                }}
              >
                CSS 隔离方案
              </h2>
            </div>
          </div>
          <p
            className="text-base opacity-70 max-w-2xl ml-16"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            样式冲突是微前端最常遇到的问题之一。以下方案按隔离强度从高到低排列，各有其适用场景。
          </p>
        </div>

        {/* CSS 方案网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cssIsolationMethods.map((method, idx) => (
            <div
              key={method.id}
              className="topic-card bg-white border-2 border-[var(--foreground)]
                         rounded-2xl overflow-hidden flex flex-col"
              style={{
                boxShadow: "6px 6px 0px 0px var(--foreground)",
                ...sectionAnimationStyle(350 + idx * 100),
              }}
            >
              {/* 头部 */}
              <div
                className="px-5 py-4 flex items-center gap-3 border-b-2 border-[var(--foreground)]"
                style={{ background: `${method.color}12` }}
              >
                <div
                  className="w-10 h-10 rounded-xl border-2 border-[var(--foreground)]
                             flex items-center justify-center"
                  style={{ background: method.color }}
                >
                  <method.icon size={18} strokeWidth={2.5} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-lg font-bold"
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      color: "var(--foreground)",
                    }}
                  >
                    {method.title}
                  </h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border-2 border-[var(--foreground)] ${method.strengthColor}`}
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  {method.strength}
                </span>
              </div>

              {/* 内容 */}
              <div className="p-5 flex-1 flex flex-col">
                <p
                  className="text-sm leading-relaxed mb-4 opacity-80"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  {method.description}
                </p>

                {/* 技术细节 */}
                <div className="mb-4">
                  <div
                    className="text-xs font-bold uppercase tracking-wider opacity-50 mb-2"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    实现细节
                  </div>
                  <div className="space-y-1.5">
                    {method.details.map((d, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                      >
                        <ChevronRight
                          size={12}
                          strokeWidth={3}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: method.color }}
                        />
                        <span className="opacity-75">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 优缺点迷你 */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <div
                      className="text-xs font-bold text-emerald-600 mb-1"
                      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                      ✓ 优势
                    </div>
                    {method.pros.map((p, i) => (
                      <div
                        key={i}
                        className="text-xs opacity-70 flex items-start gap-1 mb-0.5"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                      >
                        <span className="text-emerald-400 flex-shrink-0">+</span>
                        {p}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div
                      className="text-xs font-bold text-amber-600 mb-1"
                      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                      ✗ 劣势
                    </div>
                    {method.cons.map((c, i) => (
                      <div
                        key={i}
                        className="text-xs opacity-70 flex items-start gap-1 mb-0.5"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                      >
                        <span className="text-amber-400 flex-shrink-0">-</span>
                        {c}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 代码示例 */}
                <details className="mt-auto group">
                  <summary
                    className="flex items-center gap-2 cursor-pointer select-none
                               text-xs font-bold py-1"
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      color: method.color,
                    }}
                  >
                    <ChevronRight
                      size={14}
                      strokeWidth={2.5}
                      className="transition-transform group-open:rotate-90"
                    />
                    代码示例
                  </summary>
                  <div
                    className="mt-2 rounded-lg overflow-hidden text-xs"
                    style={{
                      border: "2px solid var(--foreground)",
                      boxShadow: "3px 3px 0px 0px var(--foreground)",
                    }}
                  >
                    <pre
                      className="p-3 overflow-x-auto leading-relaxed"
                      style={{
                        background: "#1a1a2e",
                        color: "#e2e8f0",
                        fontFamily: '"Fira Code", monospace',
                        fontSize: "11px",
                      }}
                    >
                      <code className="language-javascript" dangerouslySetInnerHTML={{ __html: Prism.highlight(method.example, Prism.languages.javascript, 'javascript') }} />
                    </pre>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>

        {/* CSS 隔离最佳实践提示 */}
        <div
          className="mt-8 rounded-2xl border-2 border-[var(--foreground)] p-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(244,114,182,0.08), rgba(139,92,246,0.08))",
            boxShadow: "6px 6px 0px 0px var(--secondary)",
            ...sectionAnimationStyle(800),
          }}
        >
          <div
            className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10"
            style={{ background: "var(--secondary)" }}
          />
          <div className="relative z-10 flex items-start gap-4">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-2xl border-2 border-[var(--foreground)]
                         bg-[var(--secondary)] flex items-center justify-center"
              style={{ boxShadow: "3px 3px 0px 0px var(--foreground)" }}
            >
              <Sparkles size={22} strokeWidth={2.5} className="text-white" />
            </div>
            <div>
              <h4
                className="text-lg font-bold mb-2"
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  color: "var(--foreground)",
                }}
              >
                💡 实践建议：组合使用
              </h4>
              <p
                className="text-sm leading-relaxed opacity-80 mb-3"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                在实际项目中，通常组合使用多种 CSS 隔离方案。推荐策略：
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { level: "高安全", desc: "Shadow DOM + Scoped CSS", tag: "推荐" },
                  { level: "高兼容", desc: "Scoped CSS + BEM 前缀", tag: "传统" },
                  { level: "零改造", desc: "框架内置自动处理", tag: "便捷" },
                ].map(({ level, desc, tag }) => (
                  <div
                    key={level}
                    className="bg-white rounded-xl border-2 border-[var(--foreground)]
                               p-3 text-center"
                    style={{ boxShadow: "3px 3px 0px 0px var(--foreground)" }}
                  >
                    <div
                      className="text-xs font-bold text-white rounded-full px-2 py-0.5
                                 inline-block mb-1"
                      style={{ background: "var(--secondary)" }}
                    >
                      {tag}
                    </div>
                    <div
                      className="text-sm font-bold"
                      style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                      {level}
                    </div>
                    <div
                      className="text-xs opacity-60 mt-1"
                      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                      {desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: 依赖共享方案
          ═══════════════════════════════════════════ */}
      <section className="container !mb-20">
        {/* Section 标题 */}
        <div className="mb-12" style={sectionAnimationStyle(200)}>
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-2xl border-2 border-[var(--foreground)]
                         bg-[var(--tertiary)] flex items-center justify-center"
              style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
            >
              <Share2 size={24} strokeWidth={2.5} className="text-white" />
            </div>
            <div>
              <div
                className="text-xs font-bold uppercase tracking-widest opacity-50"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Part 03
              </div>
              <h2
                className="text-3xl md:text-4xl font-extrabold"
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  color: "var(--foreground)",
                }}
              >
                依赖共享方案
              </h2>
            </div>
          </div>
          <p
            className="text-base opacity-70 max-w-2xl ml-16"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            如果每个子应用都独立打包 React、Vue 等基础库，将导致巨大的资源浪费和性能问题。
            依赖共享是微前端工程化的核心优化手段。
          </p>
        </div>

        {/* 方案对比图示 */}
        <div
          className="mb-10 topic-card bg-white border-2 border-[var(--foreground)]
                     rounded-2xl p-6"
          style={{
            boxShadow: "6px 6px 0px 0px var(--tertiary)",
            ...sectionAnimationStyle(350),
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Eye size={16} strokeWidth={2.5} style={{ color: "var(--tertiary)" }} />
            <span
              className="text-xs font-bold uppercase tracking-wider opacity-60"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              共享 vs 不共享
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 不共享 */}
            <div className="text-center">
              <div
                className="inline-block rounded-xl border-2 border-red-400 p-4
                           bg-red-50 mb-2"
              >
                <div className="flex gap-2 justify-center">
                  {["App A", "App B", "App C"].map((app, i) => (
                    <div
                      key={app}
                      className="w-20 h-14 rounded-lg border-2 border-[var(--foreground)]
                                 flex flex-col items-center justify-center bg-white"
                    >
                      <div
                        className="text-[9px] font-bold"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                      >
                        {app}
                      </div>
                      <div
                        className="text-[8px] text-red-500 font-bold mt-0.5"
                        style={{ fontFamily: '"Fira Code", monospace' }}
                      >
                        React × 3
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="text-sm font-bold text-red-500"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                ❌ 不共享：重复加载，浪费带宽
              </div>
              <div
                className="text-xs opacity-50 mt-1"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                总计加载 3 份 React（~300KB × 3）
              </div>
            </div>

            {/* 共享 */}
            <div className="text-center">
              <div
                className="inline-block rounded-xl border-2 border-emerald-400 p-4
                           bg-emerald-50 mb-2"
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-32 h-8 rounded-lg border-2 border-[var(--foreground)]
                               flex items-center justify-center bg-emerald-200
                               text-xs font-bold"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    React (共享层) × 1
                  </div>
                  <div className="flex gap-2">
                    {["App A", "App B", "App C"].map((app) => (
                      <div
                        key={app}
                        className="w-16 h-10 rounded-lg border-2 border-[var(--foreground)]
                                   flex items-center justify-center bg-white text-[9px] font-bold"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                      >
                        {app}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="text-sm font-bold text-emerald-500"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                ✅ 共享：按需复用，节省资源
              </div>
              <div
                className="text-xs opacity-50 mt-1"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                总计仅加载 1 份 React（~100KB × 1）
              </div>
            </div>
          </div>
        </div>

        {/* 三种方案详细卡片 */}
        <div className="space-y-6">
          {dependencyMethods.map((method, idx) => (
            <div
              key={method.id}
              className="topic-card bg-white border-2 border-[var(--foreground)]
                         rounded-2xl overflow-hidden"
              style={{
                boxShadow: "6px 6px 0px 0px var(--foreground)",
                ...sectionAnimationStyle(400 + idx * 120),
              }}
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-2xl border-2 border-[var(--foreground)]
                               flex items-center justify-center"
                    style={{
                      background: method.color,
                      boxShadow: "3px 3px 0px 0px var(--foreground)",
                    }}
                  >
                    <method.icon size={24} strokeWidth={2.5} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{
                        fontFamily: '"Outfit", sans-serif',
                        color: "var(--foreground)",
                      }}
                    >
                      {method.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed opacity-75"
                      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                      {method.description}
                    </p>
                  </div>
                </div>

                {/* 实施步骤 */}
                <div className="mb-5">
                  <div
                    className="text-xs font-bold uppercase tracking-wider opacity-50 mb-3"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    实施步骤
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {method.steps.map((step, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg
                                   border-2 border-[var(--foreground)] text-xs bg-white"
                        style={{
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          boxShadow: "2px 2px 0px 0px var(--foreground)",
                        }}
                      >
                        <span
                          className="w-5 h-5 rounded-md flex items-center justify-center
                                     text-white font-bold text-[10px] flex-shrink-0"
                          style={{ background: method.color }}
                        >
                          {i + 1}
                        </span>
                        <span className="opacity-80">{step}</span>
                        {i < method.steps.length - 1 && (
                          <ChevronRight
                            size={12}
                            className="opacity-30 flex-shrink-0"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 优缺点 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div className="space-y-1">
                    {method.pros.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                      >
                        <CheckCircle2 size={14} strokeWidth={2.5} className="text-emerald-500 flex-shrink-0" />
                        <span className="opacity-80">{p}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {method.cons.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                      >
                        <XCircle size={14} strokeWidth={2.5} className="text-amber-500 flex-shrink-0" />
                        <span className="opacity-80">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 代码 */}
                <details className="group">
                  <summary
                    className="flex items-center gap-2 cursor-pointer select-none
                               text-sm font-bold py-2"
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      color: method.color,
                    }}
                  >
                    <ChevronRight
                      size={16}
                      strokeWidth={2.5}
                      className="transition-transform group-open:rotate-90"
                    />
                    查看代码示例
                  </summary>
                  <div
                    className="mt-3 rounded-xl overflow-hidden text-xs"
                    style={{
                      border: "2px solid var(--foreground)",
                      boxShadow: "4px 4px 0px 0px var(--foreground)",
                    }}
                  >
                    <div
                      className="px-4 py-2 flex items-center gap-2 border-b-2 border-[var(--foreground)]"
                      style={{
                        background: "var(--foreground)",
                        color: "var(--background)",
                      }}
                    >
                      <Code2 size={14} strokeWidth={2.5} />
                      <span
                        className="font-bold"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                      >
                        Configuration
                      </span>
                    </div>
                    <pre
                      className="p-4 overflow-x-auto leading-relaxed"
                      style={{
                        background: "#1a1a2e",
                        color: "#e2e8f0",
                        fontFamily: '"Fira Code", monospace',
                        fontSize: "12px",
                      }}
                    >
                      <code className="language-javascript" dangerouslySetInnerHTML={{ __html: Prism.highlight(method.code, Prism.languages.javascript, 'javascript') }} />
                    </pre>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: 主流框架对比
          ═══════════════════════════════════════════ */}
      <section className="container !mb-20">
        {/* Section 标题 */}
        <div className="mb-12" style={sectionAnimationStyle(200)}>
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-2xl border-2 border-[var(--foreground)]
                         bg-[var(--quaternary)] flex items-center justify-center"
              style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
            >
              <GitCompare size={24} strokeWidth={2.5} className="text-white" />
            </div>
            <div>
              <div
                className="text-xs font-bold uppercase tracking-widest opacity-50"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Part 04
              </div>
              <h2
                className="text-3xl md:text-4xl font-extrabold"
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  color: "var(--foreground)",
                }}
              >
                主流框架对比
              </h2>
            </div>
          </div>
          <p
            className="text-base opacity-70 max-w-2xl ml-16"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            了解了底层原理，让我们看看市面上主流的微前端框架是如何将这些方案组合使用的。
          </p>
        </div>

        {/* 框架卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {frameworkComparison.map((fw, idx) => (
            <div
              key={fw.name}
              className="topic-card bg-white border-2 border-[var(--foreground)]
                         rounded-2xl overflow-hidden"
              style={{
                boxShadow: "6px 6px 0px 0px var(--foreground)",
                ...sectionAnimationStyle(350 + idx * 100),
              }}
            >
              {/* 头部 */}
              <div
                className="px-5 py-4 flex items-center gap-3 border-b-2 border-[var(--foreground)]"
                style={{ background: `${fw.color}12` }}
              >
                <div
                  className="w-10 h-10 rounded-xl border-2 border-[var(--foreground)]
                             flex items-center justify-center"
                  style={{ background: fw.color }}
                >
                  <fw.icon size={20} strokeWidth={2.5} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-lg font-bold"
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      color: "var(--foreground)",
                    }}
                  >
                    {fw.name}
                  </h3>
                </div>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full border-2 border-[var(--foreground)]"
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    background: fw.status === "稳定" ? "var(--quaternary)" : fw.status === "标准" ? "var(--accent)" : "var(--tertiary)",
                    color: "white",
                  }}
                >
                  {fw.status}
                </span>
              </div>

              {/* 详情 */}
              <div className="p-5">
                <div className="space-y-3 mb-4">
                  {[
                    { label: "沙箱方案", value: fw.sandbox, icon: Shield },
                    { label: "CSS 隔离", value: fw.cssIsolation, icon: Palette },
                    { label: "依赖共享", value: fw.depSharing, icon: Share2 },
                  ].map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="flex-shrink-0 w-7 h-7 rounded-lg border-2 border-[var(--foreground)]
                                   flex items-center justify-center"
                        style={{ background: "var(--background)" }}
                      >
                        <Icon size={13} strokeWidth={2.5} style={{ color: fw.color }} />
                      </div>
                      <div>
                        <div
                          className="text-[10px] font-bold uppercase tracking-wider opacity-50"
                          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                        >
                          {label}
                        </div>
                        <div
                          className="text-sm font-semibold"
                          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                        >
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 优缺点 */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="rounded-lg border-2 border-[var(--foreground)] p-2.5"
                    style={{ background: "rgba(52,211,153,0.06)" }}
                  >
                    <div
                      className="text-[10px] font-bold text-emerald-600 mb-1 flex items-center gap-1"
                      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                      <CheckCircle2 size={10} strokeWidth={2.5} />
                      优势
                    </div>
                    <p
                      className="text-xs opacity-70 leading-relaxed"
                      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                      {fw.pros}
                    </p>
                  </div>
                  <div
                    className="rounded-lg border-2 border-[var(--foreground)] p-2.5"
                    style={{ background: "rgba(251,191,36,0.06)" }}
                  >
                    <div
                      className="text-[10px] font-bold text-amber-600 mb-1 flex items-center gap-1"
                      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                      <AlertTriangle size={10} strokeWidth={2.5} />
                      劣势
                    </div>
                    <p
                      className="text-xs opacity-70 leading-relaxed"
                      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                      {fw.cons}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5: 技术选型决策指南
          ═══════════════════════════════════════════ */}
      <section className="container mb-16">
        <div
          className="topic-card bg-white border-2 border-[var(--foreground)]
                     rounded-2xl overflow-hidden"
          style={{
            boxShadow: "8px 8px 0px 0px var(--quaternary)",
            ...sectionAnimationStyle(300),
          }}
        >
          <div
            className="px-6 py-4 border-b-2 border-[var(--foreground)] flex items-center gap-3"
            style={{ background: "var(--quaternary)" }}
          >
            <Lightbulb size={22} strokeWidth={2.5} className="text-white" />
            <h3
              className="text-xl font-bold text-white"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              🎯 技术选型决策指南
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  question: "需要接入第三方不可信应用？",
                  answer: "iframe / wujie",
                  reason: "iframe 天然隔离最强，适合不可信来源",
                  color: "var(--accent)",
                },
                {
                  question: "需要多子应用同时运行？",
                  answer: "qiankun Proxy / micro-app",
                  reason: "Proxy 沙盒支持多实例并行",
                  color: "var(--secondary)",
                },
                {
                  question: "需要兼容 IE 浏览器？",
                  answer: "qiankun Snapshot / iframe",
                  reason: "快照沙盒不依赖 Proxy 等 ES6 特性",
                  color: "var(--tertiary)",
                },
                {
                  question: "追求极致轻量零改造？",
                  answer: "micro-app",
                  reason: "类 Web Component 接入，子应用几乎无需改造",
                  color: "var(--quaternary)",
                },
                {
                  question: "需要运行时模块共享？",
                  answer: "Module Federation",
                  reason: "Webpack 5 原生支持，真正的运行时共享",
                  color: "var(--accent)",
                },
                {
                  question: "新项目技术栈统一？",
                  answer: "pnpm monorepo",
                  reason: "如果不需要技术栈隔离，monorepo 可能更简单",
                  color: "var(--secondary)",
                },
              ].map(({ question, answer, reason, color }, i) => (
                <div
                  key={i}
                  className="rounded-xl border-2 border-[var(--foreground)] p-4
                             relative overflow-hidden"
                  style={{
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  <div
                    className="absolute -top-3 -right-3 w-12 h-12 rounded-full opacity-10"
                    style={{ background: color }}
                  />
                  <div
                    className="text-xs font-bold opacity-60 mb-2 leading-snug"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    {question}
                  </div>
                  <div
                    className="text-base font-extrabold mb-1.5"
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      color: color,
                    }}
                  >
                    → {answer}
                  </div>
                  <div
                    className="text-xs opacity-60 leading-relaxed"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    {reason}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          底部总结
          ═══════════════════════════════════════════ */}
      <section className="container">
        <div
          className="rounded-2xl border-2 border-[var(--foreground)] p-8 text-center
                     relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--accent), var(--secondary))",
            boxShadow: "8px 8px 0px 0px var(--foreground)",
            ...sectionAnimationStyle(400),
          }}
        >
          {/* 装饰 */}
          <div
            className="absolute top-4 left-4 w-16 h-16 rounded-full border-2
                       border-white/20 opacity-30"
          />
          <div
            className="absolute bottom-4 right-4 w-24 h-24 rounded-full border-2
                       border-white/20 opacity-20"
            style={{
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            }}
          />

          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div
                className="w-16 h-16 rounded-2xl border-3 border-white/30
                           flex items-center justify-center bg-white/10 backdrop-blur-sm"
              >
                <Sparkles size={32} strokeWidth={2.5} className="text-white" />
              </div>
            </div>
            <h3
              className="text-2xl md:text-3xl font-extrabold text-white mb-3"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              核心要点回顾
            </h3>
            <p
              className="text-sm text-white/80 max-w-2xl mx-auto leading-relaxed mb-6"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              微前端的核心价值在于<span className="font-bold text-white">技术栈无关的独立部署能力</span>。
              沙箱隔离保证运行时安全，CSS 隔离保证视觉独立，依赖共享优化加载性能。
              没有银弹方案，根据团队实际情况选择合适的组合才是关键。
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "沙箱：按隔离需求选择", color: "var(--tertiary)" },
                { label: "CSS：推荐 Shadow DOM + Scoped", color: "var(--secondary)" },
                { label: "依赖：Module Federation 最灵活", color: "var(--accent)" },
              ].map(({ label, color }) => (
                <span
                  key={label}
                  className="inline-block px-4 py-2 rounded-full border-2
                             border-white/30 text-sm font-bold text-white"
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    background: `${color}66`,
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}