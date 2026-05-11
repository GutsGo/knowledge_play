import { highlightCode } from "@/lib/prism-highlight";
import {
  Zap,
  Package,
  Layers,
  SplitSquareHorizontal,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  BarChart3,
  Gauge,
  Route,
  ArrowRight,
  Download,
  Eye,
  FileCode2,
  Settings,
  Rocket,
  Lightbulb,
  Timer,
  HardDrive,
  RefreshCw,
} from "lucide-react";

// ─── CodeBlock 组件 ────────────────────────────────────
function CodeBlock({
  code,
  language = "typescript",
  title,
}: {
  code: string;
  language?: string;
  title?: string;
}) {
  const html = highlightCode(code, language);
  return (
    <div className="border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_var(--foreground)] bg-[#1E293B]">
      {title && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0F172A] border-b-2 border-[var(--foreground)]">
          <span className="w-3 h-3 rounded-full bg-[#F472B6] border border-[var(--foreground)]" />
          <span className="w-3 h-3 rounded-full bg-[#FBBF24] border border-[var(--foreground)]" />
          <span className="w-3 h-3 rounded-full bg-[#34D399] border border-[var(--foreground)]" />
          <span className="ml-2 text-[#94A3B8] text-xs font-['Plus_Jakarta_Sans'] font-semibold">
            {title}
          </span>
          <span className="ml-auto px-2 py-0.5 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
            {language}
          </span>
        </div>
      )}
      <pre
        className={`p-5 overflow-x-auto text-sm leading-relaxed language-${language}`}
      >
        <code
          className={`font-['JetBrains_Mono',monospace] text-[#E2E8F0] language-${language}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  );
}

// ─── 几何装饰组件 ──────────────────────────────────────
function GeometricBadge({
  children,
  color = "accent",
  size = "md",
}: {
  children: React.ReactNode;
  color?: "accent" | "secondary" | "tertiary" | "quaternary";
  size?: "sm" | "md" | "lg";
}) {
  const colorMap = {
    accent: "bg-[var(--accent)]",
    secondary: "bg-[var(--secondary)]",
    tertiary: "bg-[var(--tertiary)]",
    quaternary: "bg-[var(--quaternary)]",
  };
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };
  return (
    <div
      className={`${sizeMap[size]} ${colorMap[color]} rounded-xl border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] flex items-center justify-center text-white`}
    >
      {children}
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--foreground)] text-white rounded-full text-xs font-['Plus_Jakarta_Sans'] font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_var(--accent)] border-2 border-[var(--foreground)]">
      <span className="w-2 h-2 rounded-full bg-[var(--tertiary)]" />
      {text}
    </div>
  );
}

// ─── 主页面 ─────────────────────────────────────────────
export default function CodeSplittingPage() {
  // ── 交互式实验场状态 (纯展示版本，客户端交互需加 "use client") ──
  // 这里用静态展示来演示概念

  const wholeBundleCode = `// ❌ 全量打包 — 用户访问首页却加载了全部页面的代码
import './pages/dashboard'     // 首页用不到
import './pages/analytics'     // 首页用不到
import './pages/settings'      // 首页用不到
import { heavyChart } from './lib/chart-engine'  // 180KB
import { markdownParser } from './lib/markdown'   // 95KB
import { pdfExporter } from './lib/pdf'           // 120KB

// 首页实际只需要：
export function HomePage() {
  return <h1>Welcome!</h1>  // 仅 2KB 的组件
}`;

  const splitBundleCode = `// ✅ 代码拆分 — 按需加载，首屏只加载必要代码
// main.js — 首屏核心 (仅 45KB gzipped)
export function HomePage() {
  return <h1>Welcome!</h1>
}

// 用户点击"报表"时才加载
export async function openDashboard() {
  const { Dashboard } = await import('./pages/dashboard')   // ← 懒加载
  const { heavyChart } = await import('./lib/chart-engine')  // ← 按需
  return <Dashboard chart={heavyChart} />
}

// 用户进入设置页时才加载
export async function openSettings() {
  const { Settings } = await import('./pages/settings')      // ← 路由级拆分
  return <Settings />
}`;

  const dynamicImportInternals = `// 引擎层面：动态 import() 被编译器如何处理

// 1️⃣ 编译阶段 — Webpack 识别到 import() 表达式
const module = await import('./heavy-module')

// 2️⃣ Webpack 将其转换为运行时调用 (简化版)
const module = __webpack_require__.e(/* import() */ "heavy-module-chunk")
  .then(__webpack_require__.bind(null, './heavy-module'))

// 3️⃣ __webpack_require__.e 的核心逻辑
function ensure(chunkId) {
  return installedChunks[chunkId] = new Promise((resolve, reject) => {
    // 动态创建 <script> 标签
    var script = document.createElement('script');
    script.src = __webpack_require__.p + chunkId + ".chunk.js";
    // 注册回调，chunk 加载完毕后 resolve
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}`;

  const webpackSplitCode = `// webpack.config.js — Webpack 分包策略
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',               // 对同步 + 异步模块都生效
      maxSize: 244000,              // 单 chunk 不超过 244KB
      cacheGroups: {
        // 🔹 策略一：提取 node_modules 为 vendor chunk
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          chunks: 'all',
          enforce: true,            // 即使很小也要拆
        },
        // 🔹 策略二：提取公共模块为 common chunk
        common: {
          minChunks: 2,             // 被 2+ 个 chunk 引用时提取
          priority: 5,
          reuseExistingChunk: true,
        },
        // 🔹 策略三：特定大库单独拆包
        chart: {
          test: /[\\/]node_modules[\\/](chart\\.js|d3)/,
          name: 'chart-vendor',
          priority: 20,             // 优先级高于 vendor
          chunks: 'all',
        },
      },
    },
  },
};`;

  const viteSplitCode = `// vite.config.ts — Vite 分包策略 (基于 Rollup)
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 🔹 手动分包映射 — 精确控制每个 chunk
        manualChunks: {
          // React 生态 → 单独 vendor chunk
          'vendor-react': [
            'react',
            'react-dom',
            'react-router-dom',
          ],
          // 图表库 → 独立 chunk（按需加载时不会拖慢首屏）
          'vendor-charts': [
            'chart.js',
            'react-chartjs-2',
          ],
          // 工具库 → 公共 chunk
          'vendor-utils': [
            'lodash-es',
            'date-fns',
          ],
        },
        // 🔹 也可以用函数式手动分包（更灵活）
        // manualChunks(id) {
        //   if (id.includes('node_modules/react')) return 'vendor-react';
        //   if (id.includes('node_modules/chart')) return 'vendor-charts';
        //   if (id.includes('node_modules')) return 'vendor-other';
        // },
      },
    },
    // Vite 默认 chunk 大小警告阈值 (500KB)
    chunkSizeWarningLimit: 500,
  },
});`;

  const routeSplitNextCode = `// app/dashboard/page.tsx — Next.js App Router 路由级代码拆分
// Next.js 14+ 自动对每个路由进行代码拆分 ✅

// 📦 此文件及依赖 → 自动成为独立 chunk
// 用户未访问 /dashboard 时，此代码不会被加载

import { AnalyticsChart } from './analytics-chart';
import { RecentOrders } from './recent-orders';

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* 组件内再拆分重量级子组件 */}
      <AnalyticsChart />   {/* ← 这个组件自身也是独立 chunk */}
      <RecentOrders />
    </div>
  );
}`;

  const routeSplitComponentCode = `// app/dashboard/analytics-chart.tsx
'use client';  // ← Client Component 自动成为可拆分边界

import dynamic from 'next/dynamic';

// 🚀 进一步拆分：Chart.js 整体延迟加载
const Chart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,       // 加载占位符
  ssr: false,                              // 禁止 SSR（纯客户端库）
});

// 💡 对比：如果用普通 import，Chart.js (250KB) 会在首屏加载
// import { Chart } from './HeavyChart'  // ❌ 增大初始 bundle

export function AnalyticsChart() {
  return (
    <div className="p-6 border-2 border-[var(--foreground)] rounded-2xl">
      <h2>流量趋势</h2>
      <Chart data={useAnalyticsData()} />
    </div>
  );
}`;

  const preloadCode = `// 🔮 预加载策略 — 在用户"快要"需要时提前加载

// 方案一：Hover 预加载（最常用）
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();

  const handleMouseEnter = () => {
    // 鼠标悬停时预加载目标路由的 chunk
    router.prefetch(href);  // ← Next.js 内置
  };

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      className="hover:underline"
    >
      {children}
    </a>
  );
}

// 方案二：基于视口的预加载
function useViewportPreload(href: string) {
  const ref = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          router.prefetch(href);  // ← 元素进入视口时预加载
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }     // 提前 200px 开始加载
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [href, router]);

  return ref;
}

// 方案三：空闲时预加载（非关键路由）
function useIdlePreload(href: string) {
  const router = useRouter();
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => router.prefetch(href));  // ← 浏览器空闲时
    } else {
      setTimeout(() => router.prefetch(href), 2000);     // 降级方案
    }
  }, [href, router]);
}`;

  const webpackVsViteCompareCode = `// 📊 编译产物对比 — 同一项目，两种打包器

// Webpack 产物结构 (production)
dist/
├── main.4f2a8b1c.js          (89KB gzipped)   ← 入口 chunk
├── vendors.e5d7c3b2.js       (142KB gzipped)  ← node_modules
├── charts.7a9f1e4d.chunk.js  (67KB gzipped)   ← 按需加载的图表
├── dashboard.a1b2c3d4.chunk.js (23KB gzipped) ← 路由 chunk
└── 883.chunk.js               (12KB gzipped)   ← Webpack 自动命名

// Vite 产物结构 (production)
dist/
├── assets/main-bK4x2d.js         (82KB gzipped)  ← 入口 chunk
├── assets/vendor-react-P3x1.js   (45KB gzipped)  ← React 独立
├── assets/vendor-charts-mN7k.js  (64KB gzipped)  ← 图表独立
├── assets/dashboard-Qr8w.js     (21KB gzipped)  ← 路由 chunk
└── assets/vendor-utils-fL2p.js   (18KB gzipped)  ← 工具库

// 🔑 关键差异：
// 1. Webpack 默认用数字 ID 命名 chunk，Vite 用语义化命名
// 2. Vite 生产构建基于 Rollup，tree-shaking 通常更彻底
// 3. Webpack 的 splitChunks.cacheGroups 更灵活，Vite 用 manualChunks`;

  const antiPatternCode = `// 🚫 Anti-Pattern 1: 动态路径导致全目录打包
// ❌ 错误 — 变量路径无法在编译时静态分析
const modules = await import(\`./modules/\${name}.js\`);
// Webpack 警告: Critical dependency: the request of a dependency is an expression
// 结果: ./modules/ 目录下所有文件都被打包

// ✅ 正确 — 使用 webpack 魔法注释限制范围
const modules = await import(
  /* webpackInclude: /\\.[jt]sx?$/ */   // 只包含 JS/TS
  /* webpackExclude: /\\.test\\./ */    // 排除测试文件
  /* webpackMode: "lazy-once" */       // 所有匹配模块打成一个 chunk
  \`./modules/\${name}.js\`
);

// 🚫 Anti-Pattern 2: 过度拆分导致瀑布请求
// ❌ 每个小组件都拆成独立 chunk
const Button = lazy(() => import('./Button'));      // 2KB
const Input = lazy(() => import('./Input'));        // 3KB
const Badge = lazy(() => import('./Badge'));         // 1.5KB
// → 用户看到 3 次 loading 状态，总请求数膨胀

// ✅ 正确 — 按功能/路由聚合拆分
const AdminPanel = lazy(() => import('./admin/AdminPanel'));
// → AdminPanel 内部包含 Button、Input、Badge，一次加载`;

  const perfComparisonCode = `// 📈 性能实测数据 — 电商首页 (200+ 组件, 47 个 npm 依赖)

// ┌─────────────────────────────────────────────────────────────┐
// │  指标                  │  无拆分    │  路由拆分   │  精细拆分  │
// ├─────────────────────────────────────────────────────────────┤
// │  初始 JS 总量 (gzip)   │  487KB    │  142KB     │  98KB      │
// │  首屏 FCP              │  3.2s     │  1.4s      │  1.2s      │
// │  首屏 LCP              │  4.8s     │  2.1s      │  1.8s      │
// │  TTI (可交互时间)       │  6.1s     │  2.8s      │  2.3s      │
// │  HTTP 请求数            │  1        │  3~5       │  8~15      │
// │  后续路由导航 (缓存)    │  0ms      │  200~400ms │  100~300ms │
// │  后续路由导航 (无缓存)  │  0ms      │  300~600ms │  200~500ms │
// └─────────────────────────────────────────────────────────────┘

// 🔑 权衡: 拆分越多 → 初始加载越小 → 但请求数增加
// 最佳实践: 路由级拆分 + 预加载 = 两全其美`;

  return (
    <div className="bg-dot-grid min-h-screen">
      {/* ═══════════ HERO 区域 (L1: 直觉锚点) ═══════════ */}
      <section className="relative overflow-hidden container">
        {/* Blob 装饰 */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[var(--tertiary)] opacity-20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] pointer-events-none"
          style={{ filter: "blur(2px)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-[var(--secondary)] opacity-15 rounded-[40%_60%_70%_30%/30%_70%_40%_60%] pointer-events-none"
          style={{ filter: "blur(2px)" }}
        />

        <div className="container py-20 md:py-28 relative z-10">
          <div className="animate-pop">
            <SectionLabel text="Performance Engineering" />
          </div>

          <h1 className="animate-pop mt-6 font-['Outfit'] text-5xl md:text-7xl font-extrabold text-[var(--foreground)] leading-[1.05] tracking-tight">
            Code Splitting
            <br />
            <span className="text-[var(--accent)]">代码拆分</span>
          </h1>

          <p className="animate-slide mt-6 text-xl md:text-2xl font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70 max-w-2xl leading-relaxed">
            不要把整本百科全书塞进一页纸 ——
            <strong className="text-[var(--foreground)]">
              只给用户当前需要的那一章
            </strong>
            。
          </p>

          {/* 直觉类比卡片 */}
          <div className="animate-slide mt-10 grid md:grid-cols-2 gap-5 max-w-3xl">
            <div className="topic-card bg-[var(--card)] p-6 rounded-2xl">
              <div className="flex items-start gap-4">
                <GeometricBadge color="secondary" size="md">
                  <Package strokeWidth={2.5} className="w-6 h-6" />
                </GeometricBadge>
                <div>
                  <h3 className="font-['Outfit'] font-bold text-lg text-[var(--foreground)]">
                    📦 没有 Code Splitting
                  </h3>
                  <p className="mt-1 text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/60 leading-relaxed">
                    去餐厅吃饭，服务员把<strong>整本菜谱</strong>
                    （包括所有季节菜单、酒水单、厨师笔记） 全部端给你 ——
                    你只想点一份炒饭，却要等 10 分钟翻完整本菜谱。
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border-2 border-red-300 text-red-700 text-xs font-bold">
                    <HardDrive className="w-3.5 h-3.5" strokeWidth={2.5} />
                    首屏 JS: 487KB gzipped
                  </div>
                </div>
              </div>
            </div>

            <div className="topic-card bg-[var(--card)] p-6 rounded-2xl">
              <div className="flex items-start gap-4">
                <GeometricBadge color="quaternary" size="md">
                  <SplitSquareHorizontal
                    strokeWidth={2.5}
                    className="w-6 h-6"
                  />
                </GeometricBadge>
                <div>
                  <h3 className="font-['Outfit'] font-bold text-lg text-[var(--foreground)]">
                    🍽️ 有 Code Splitting
                  </h3>
                  <p className="mt-1 text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/60 leading-relaxed">
                    服务员只递上<strong>一页今日推荐</strong>
                    ，你需要哪道菜就点哪道 —— 后厨接到单后现做。想看更多？下一页
                    <strong>按需翻阅</strong>。
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border-2 border-green-300 text-green-700 text-xs font-bold">
                    <Zap className="w-3.5 h-3.5" strokeWidth={2.5} />
                    首屏 JS: 98KB gzipped（↓ 80%）
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ L2: 为什么需要代码拆分 ═══════════ */}
      <section className="container py-16">
        <SectionLabel text="Why Code Splitting" />

        <h2 className="animate-pop mt-5 font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[var(--foreground)]">
          为什么你的 SPA 需要它？
        </h2>

        <div className="animate-slide mt-8 grid md:grid-cols-3 gap-5">
          {/* 痛点 1 */}
          <div className="topic-card bg-[var(--card)] p-6 rounded-2xl">
            <GeometricBadge color="secondary" size="sm">
              <Timer strokeWidth={2.5} className="w-4 h-4" />
            </GeometricBadge>
            <h3 className="mt-4 font-['Outfit'] font-bold text-[var(--foreground)]">
              白屏时间过长
            </h3>
            <p className="mt-2 text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/60 leading-relaxed">
              用户在 3G 网络下，一个 487KB 的 JS bundle 解析 + 执行需要
              <strong className="text-[var(--foreground)]"> 3.2 秒</strong>。
              Google 数据显示：加载每延迟 1 秒，转化率下降
              <strong className="text-[var(--secondary)]"> 20%</strong>。
            </p>
          </div>

          {/* 痛点 2 */}
          <div className="topic-card bg-[var(--card)] p-6 rounded-2xl">
            <GeometricBadge color="tertiary" size="sm">
              <HardDrive strokeWidth={2.5} className="w-4 h-4" />
            </GeometricBadge>
            <h3 className="mt-4 font-['Outfit'] font-bold text-[var(--foreground)]">
              带宽浪费严重
            </h3>
            <p className="mt-2 text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/60 leading-relaxed">
              统计显示，用户平均只访问一个网站的
              <strong className="text-[var(--foreground)]"> 3~4 个页面</strong>
              。 但全量打包意味着用户下载了 100% 的代码，实际只用到 ~30%。 剩余{" "}
              <strong className="text-[var(--tertiary)]">70% 是带宽浪费</strong>
              。
            </p>
          </div>

          {/* 痛点 3 */}
          <div className="topic-card bg-[var(--card)] p-6 rounded-2xl">
            <GeometricBadge color="accent" size="sm">
              <Gauge strokeWidth={2.5} className="w-4 h-4" />
            </GeometricBadge>
            <h3 className="mt-4 font-['Outfit'] font-bold text-[var(--foreground)]">
              解析成本不可忽略
            </h3>
            <p className="mt-2 text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/60 leading-relaxed">
              JS 不仅要
              <strong className="text-[var(--foreground)]">下载</strong>，还要
              <strong className="text-[var(--foreground)]">
                解析 + 编译 + 执行
              </strong>
              。 V8 引擎解析 1MB JS 约需
              <strong className="text-[var(--accent)]"> 150~300ms</strong>
              （桌面端）， 移动端可达{" "}
              <strong className="text-[var(--secondary)]">1 秒+</strong>。 拆分
              = 减少单次解析量。
            </p>
          </div>
        </div>

        {/* 性能实测对比表 */}
        <div className="animate-slide mt-10">
          <div className="topic-card bg-[var(--card)] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-[var(--foreground)] bg-[var(--foreground)]">
              <h3 className="font-['Outfit'] font-bold text-white flex items-center gap-2">
                <BarChart3 strokeWidth={2.5} className="w-5 h-5" />
                实测性能对比 — 电商首页（200+ 组件，47 个 npm 依赖）
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-['Plus_Jakarta_Sans']">
                <thead>
                  <tr className="border-b-2 border-[var(--border)]">
                    <th className="text-left px-5 py-3 font-bold text-[var(--foreground)]">
                      指标
                    </th>
                    <th className="text-center px-5 py-3 font-bold text-red-600">
                      ❌ 无拆分
                    </th>
                    <th className="text-center px-5 py-3 font-bold text-[var(--tertiary)]">
                      ⚡ 路由拆分
                    </th>
                    <th className="text-center px-5 py-3 font-bold text-[var(--quaternary)]">
                      🚀 精细拆分 + 预加载
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--foreground)]/70">
                  {[
                    ["初始 JS 总量 (gzip)", "487KB", "142KB ↓71%", "98KB ↓80%"],
                    ["首次内容绘制 (FCP)", "3.2s", "1.4s", "1.2s"],
                    ["最大内容绘制 (LCP)", "4.8s", "2.1s", "1.8s"],
                    ["可交互时间 (TTI)", "6.1s", "2.8s", "2.3s"],
                    [
                      "后续路由导航",
                      "0ms (已全加载)",
                      "200~400ms",
                      "~0ms (已预加载)",
                    ],
                  ].map(([metric, noSplit, routeSplit, fineSplit], i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-[var(--background)]" : ""}
                    >
                      <td className="px-5 py-3 font-semibold text-[var(--foreground)]">
                        {metric}
                      </td>
                      <td className="text-center px-5 py-3 text-red-500 font-mono font-semibold">
                        {noSplit}
                      </td>
                      <td className="text-center px-5 py-3 font-mono font-semibold">
                        {routeSplit}
                      </td>
                      <td className="text-center px-5 py-3 font-mono font-semibold text-[var(--quaternary)]">
                        {fineSplit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ L3: 核心原理 ═══════════ */}
      <section className="container py-16">
        <SectionLabel text="Core Mechanism" />

        <h2 className="animate-pop mt-5 font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[var(--foreground)]">
          <span className="text-[var(--accent)]">import()</span> 到底做了什么？
        </h2>

        <p className="animate-slide mt-4 text-lg font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70 max-w-3xl leading-relaxed">
          动态{" "}
          <code className="px-2 py-0.5 bg-[var(--accent)]/10 rounded-lg text-[var(--accent)] font-mono text-sm font-bold">
            import()
          </code>{" "}
          并不是魔法 —— 它是一个返回 Promise 的函数表达式，告诉打包器：
          "这个模块别打包进来，运行时我再来取。"
        </p>

        {/* 流程图 */}
        <div className="animate-slide mt-10">
          <div className="topic-card bg-[var(--card)] p-8 rounded-2xl">
            <h3 className="font-['Outfit'] font-bold text-lg text-[var(--foreground)] mb-6 flex items-center gap-2">
              <Layers
                strokeWidth={2.5}
                className="w-5 h-5 text-[var(--accent)]"
              />
              编译器处理 import() 的完整流程
            </h3>

            <div className="grid md:grid-cols-5 gap-3 items-start">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-14 h-14 mx-auto bg-[var(--accent)] rounded-xl border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] flex items-center justify-center">
                  <FileCode2 strokeWidth={2.5} className="w-7 h-7 text-white" />
                </div>
                <div className="mt-3 px-3 py-2 bg-[var(--accent)]/10 rounded-xl border-2 border-[var(--accent)]/30">
                  <p className="text-xs font-bold font-['Outfit'] text-[var(--accent)]">
                    ① 源码编写
                  </p>
                  <code className="text-[10px] font-mono text-[var(--foreground)]/60 mt-1 block">
                    await import(&apos;./Chart&apos;)
                  </code>
                </div>
              </div>

              <div className="hidden md:flex items-center justify-center pt-6">
                <ChevronRight
                  strokeWidth={2.5}
                  className="w-6 h-6 text-[var(--foreground)]/30"
                />
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-14 h-14 mx-auto bg-[var(--tertiary)] rounded-xl border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] flex items-center justify-center">
                  <Settings
                    strokeWidth={2.5}
                    className="w-7 h-7 text-[var(--foreground)]"
                  />
                </div>
                <div className="mt-3 px-3 py-2 bg-[var(--tertiary)]/10 rounded-xl border-2 border-[var(--tertiary)]/30">
                  <p className="text-xs font-bold font-['Outfit'] text-[var(--foreground)]">
                    ② 打包器分析
                  </p>
                  <code className="text-[10px] font-mono text-[var(--foreground)]/60 mt-1 block">
                    识别为拆分点(split point)
                  </code>
                </div>
              </div>

              <div className="hidden md:flex items-center justify-center pt-6">
                <ChevronRight
                  strokeWidth={2.5}
                  className="w-6 h-6 text-[var(--foreground)]/30"
                />
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-14 h-14 mx-auto bg-[var(--quaternary)] rounded-xl border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] flex items-center justify-center">
                  <Package strokeWidth={2.5} className="w-7 h-7 text-white" />
                </div>
                <div className="mt-3 px-3 py-2 bg-[var(--quaternary)]/10 rounded-xl border-2 border-[var(--quaternary)]/30">
                  <p className="text-xs font-bold font-['Outfit'] text-[var(--quaternary)]">
                    ③ 生成独立 Chunk
                  </p>
                  <code className="text-[10px] font-mono text-[var(--foreground)]/60 mt-1 block">
                    384.chunk.js (67KB)
                  </code>
                </div>
              </div>
            </div>

            {/* 运行时流程 */}
            <div className="mt-8 pt-6 border-t-2 border-dashed border-[var(--border)]">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/40 mb-4 font-['Plus_Jakarta_Sans']">
                运行时（浏览器）
              </p>
              <div className="grid md:grid-cols-4 gap-3 items-start">
                <div className="px-4 py-3 bg-[var(--background)] rounded-xl border-2 border-[var(--border)]">
                  <p className="text-xs font-bold text-[var(--foreground)] font-['Outfit']">
                    ④ 执行到 import()
                  </p>
                  <p className="text-[10px] text-[var(--foreground)]/50 mt-1 font-['Plus_Jakarta_Sans']">
                    发起 HTTP 请求加载 chunk 文件
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center pt-2">
                  <ArrowRight
                    strokeWidth={2.5}
                    className="w-5 h-5 text-[var(--foreground)]/30"
                  />
                </div>
                <div className="px-4 py-3 bg-[var(--background)] rounded-xl border-2 border-[var(--border)]">
                  <p className="text-xs font-bold text-[var(--foreground)] font-['Outfit']">
                    ⑤ Chunk 下载完成
                  </p>
                  <p className="text-[10px] text-[var(--foreground)]/50 mt-1 font-['Plus_Jakarta_Sans']">
                    Promise resolve，返回模块对象
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center pt-2">
                  <ArrowRight
                    strokeWidth={2.5}
                    className="w-5 h-5 text-[var(--foreground)]/30"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 编译器源码级解析 */}
        <div className="animate-slide mt-8">
          <CodeBlock
            code={dynamicImportInternals}
            language="javascript"
            title="打包器内部：import() 的编译产物（简化版）"
          />
        </div>
      </section>

      {/* ═══════════ L3-L4: Webpack vs Vite 对比 ═══════════ */}
      <section className="container py-16">
        <SectionLabel text="Webpack vs Vite" />

        <h2 className="animate-pop mt-5 font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[var(--foreground)]">
          两大打包器的分包策略
        </h2>

        <p className="animate-slide mt-4 text-lg font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70 max-w-3xl leading-relaxed">
          Webpack 和 Vite（生产构建基于 Rollup）的分包哲学截然不同： Webpack
          走的是
          <strong className="text-[var(--foreground)]">
            "自动拆 + 可配置"
          </strong>
          ， Vite 走的是
          <strong className="text-[var(--foreground)]">
            "语义化 + 手动控制"
          </strong>
          。
        </p>

        {/* 对比卡片 */}
        <div className="animate-slide mt-8 grid md:grid-cols-2 gap-6">
          {/* Webpack */}
          <div className="topic-card bg-[var(--card)] rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b-2 border-[var(--foreground)] bg-[var(--secondary)]">
              <h3 className="font-['Outfit'] font-bold text-[var(--foreground)] flex items-center gap-2">
                <Package strokeWidth={2.5} className="w-5 h-5" />
                Webpack — splitChunks
              </h3>
            </div>
            <div className="p-5 space-y-3 text-sm font-['Plus_Jakarta_Sans']">
              <div className="flex items-start gap-2">
                <CheckCircle2
                  className="w-4 h-4 mt-0.5 text-[var(--quaternary)] flex-shrink-0"
                  strokeWidth={2.5}
                />
                <span>
                  <strong>cacheGroups</strong>{" "}
                  精细控制：按依赖路径、模块大小、引用次数分组
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2
                  className="w-4 h-4 mt-0.5 text-[var(--quaternary)] flex-shrink-0"
                  strokeWidth={2.5}
                />
                <span>
                  <strong>chunks: &apos;all&apos;</strong>{" "}
                  同时拆分同步和异步模块
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2
                  className="w-4 h-4 mt-0.5 text-[var(--quaternary)] flex-shrink-0"
                  strokeWidth={2.5}
                />
                <span>
                  <strong>magic comments</strong> 在 import() 内联配置 chunk
                  名称和策略
                </span>
              </div>
              <div className="flex items-start gap-2">
                <XCircle
                  className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0"
                  strokeWidth={2.5}
                />
                <span>
                  配置复杂，<strong>cacheGroups</strong> 的 priority
                  字段容易踩坑
                </span>
              </div>
              <div className="flex items-start gap-2">
                <XCircle
                  className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0"
                  strokeWidth={2.5}
                />
                <span>
                  默认数字 ID 命名 chunk，调试困难（需{" "}
                  <code className="text-xs font-mono bg-gray-100 px-1 rounded">
                    namedChunks: true
                  </code>
                  ）
                </span>
              </div>
            </div>
          </div>

          {/* Vite */}
          <div className="topic-card bg-[var(--card)] rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b-2 border-[var(--foreground)] bg-[var(--tertiary)]">
              <h3 className="font-['Outfit'] font-bold text-[var(--foreground)] flex items-center gap-2">
                <Zap strokeWidth={2.5} className="w-5 h-5" />
                Vite — Rollup manualChunks
              </h3>
            </div>
            <div className="p-5 space-y-3 text-sm font-['Plus_Jakarta_Sans']">
              <div className="flex items-start gap-2">
                <CheckCircle2
                  className="w-4 h-4 mt-0.5 text-[var(--quaternary)] flex-shrink-0"
                  strokeWidth={2.5}
                />
                <span>
                  默认<strong>语义化文件名</strong>（含内容 hash），开箱即用
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2
                  className="w-4 h-4 mt-0.5 text-[var(--quaternary)] flex-shrink-0"
                  strokeWidth={2.5}
                />
                <span>
                  <strong>manualChunks</strong> 对象式 /
                  函数式两种模式，简单直接
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2
                  className="w-4 h-4 mt-0.5 text-[var(--quaternary)] flex-shrink-0"
                  strokeWidth={2.5}
                />
                <span>
                  Rollup 的 tree-shaking 更激进，产物通常
                  <strong>更小 5~15%</strong>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <XCircle
                  className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0"
                  strokeWidth={2.5}
                />
                <span>
                  没有 cacheGroups 那样的自动分组，需要
                  <strong>手动列出依赖</strong>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <XCircle
                  className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0"
                  strokeWidth={2.5}
                />
                <span>
                  manualChunks 函数模式中访问的 id 是<strong>绝对路径</strong>
                  ，需用 includes 判断
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 代码对比 */}
        <div className="animate-slide mt-8 grid md:grid-cols-2 gap-6">
          <CodeBlock
            code={webpackSplitCode}
            language="javascript"
            title="webpack.config.js"
          />
          <CodeBlock
            code={viteSplitCode}
            language="typescript"
            title="vite.config.ts"
          />
        </div>

        {/* 产物对比 */}
        <div className="animate-slide mt-8">
          <CodeBlock
            code={webpackVsViteCompareCode}
            language="bash"
            title="编译产物结构对比"
          />
        </div>
      </section>

      {/* ═══════════ L4: 路由级代码拆分实战 ═══════════ */}
      <section className="container py-16">
        <SectionLabel text="Route-Level Splitting" />

        <h2 className="animate-pop mt-5 font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[var(--foreground)]">
          Next.js 路由级拆分实战
        </h2>

        <p className="animate-slide mt-4 text-lg font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70 max-w-3xl leading-relaxed">
          Next.js 14+ App Router 已经
          <strong className="text-[var(--foreground)]">自动</strong>
          对每个路由进行代码拆分 —— 每个{" "}
          <code className="px-2 py-0.5 bg-[var(--accent)]/10 rounded-lg text-[var(--accent)] font-mono text-sm font-bold">
            page.tsx
          </code>{" "}
          及其依赖成为一个独立 chunk。 但真正的工程化还需要{" "}
          <strong>组件级懒加载</strong> + <strong>预加载策略</strong>。
        </p>

        <div className="animate-slide mt-8 space-y-6">
          <CodeBlock
            code={routeSplitNextCode}
            language="tsx"
            title="app/dashboard/page.tsx — Next.js 自动路由拆分"
          />
          <CodeBlock
            code={routeSplitComponentCode}
            language="tsx"
            title="app/dashboard/analytics-chart.tsx — 组件级动态导入"
          />
        </div>

        {/* 拆分层级示意 */}
        <div className="animate-slide mt-8">
          <div className="topic-card bg-[var(--card)] p-6 rounded-2xl">
            <h3 className="font-['Outfit'] font-bold text-lg text-[var(--foreground)] mb-4 flex items-center gap-2">
              <Layers
                strokeWidth={2.5}
                className="w-5 h-5 text-[var(--accent)]"
              />
              拆分层级金字塔
            </h3>
            <div className="flex flex-col items-center gap-3">
              {/* 顶层 */}
              <div className="w-full max-w-xs px-5 py-3 bg-[var(--accent)] text-white rounded-xl border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] text-center">
                <p className="font-['Outfit'] font-bold text-sm">
                  L3: 组件级 lazy()
                </p>
                <p className="text-[10px] opacity-80 mt-0.5 font-['Plus_Jakarta_Sans']">
                  重型子组件按需加载 → 一个页面内再拆
                </p>
              </div>
              {/* 中层 */}
              <div className="w-full max-w-md px-5 py-3 bg-[var(--tertiary)] text-[var(--foreground)] rounded-xl border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] text-center">
                <p className="font-['Outfit'] font-bold text-sm">
                  L2: 路由级拆分 (Next.js 自动)
                </p>
                <p className="text-[10px] opacity-80 mt-0.5 font-['Plus_Jakarta_Sans']">
                  每个 page.tsx → 独立 chunk → 访问时加载
                </p>
              </div>
              {/* 底层 */}
              <div className="w-full max-w-lg px-5 py-3 bg-[var(--quaternary)] text-white rounded-xl border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] text-center">
                <p className="font-['Outfit'] font-bold text-sm">
                  L1: splitChunks / manualChunks (打包器配置)
                </p>
                <p className="text-[10px] opacity-80 mt-0.5 font-['Plus_Jakarta_Sans']">
                  vendor / common / 特定库 → 全局共享 chunk
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ L4: 预加载策略 ═══════════ */}
      <section className="container py-16">
        <SectionLabel text="Preloading Strategies" />

        <h2 className="animate-pop mt-5 font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[var(--foreground)]">
          预加载 —— 让拆分的代价趋近于零
        </h2>

        <p className="animate-slide mt-4 text-lg font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70 max-w-3xl leading-relaxed">
          代码拆分的最大痛点是"冷启动" —— 用户点击后等待 chunk 下载。 预加载通过
          <strong className="text-[var(--foreground)]">提前获取</strong>
          将这个延迟从{" "}
          <span className="text-red-500 font-mono font-bold">
            300~600ms
          </span>{" "}
          降至{" "}
          <span className="text-[var(--quaternary)] font-mono font-bold">
            ~0ms
          </span>
          。
        </p>

        <div className="animate-slide mt-8">
          <CodeBlock
            code={preloadCode}
            language="tsx"
            title="三种预加载策略实战"
          />
        </div>

        {/* 预加载策略对比 */}
        <div className="animate-slide mt-8 grid md:grid-cols-3 gap-5">
          <div className="topic-card bg-[var(--card)] p-5 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <GeometricBadge color="secondary" size="sm">
                <Eye strokeWidth={2.5} className="w-4 h-4" />
              </GeometricBadge>
              <h4 className="font-['Outfit'] font-bold text-sm text-[var(--foreground)]">
                Hover 预加载
              </h4>
            </div>
            <p className="text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/60 leading-relaxed">
              用户鼠标悬停导航链接时触发。<strong>命中率 ~60%</strong>
              （用户确实会点击）， 实现最简单。配合{" "}
              <code className="font-mono text-[10px] bg-gray-100 px-1 rounded">
                onMouseEnter
              </code>{" "}
              即可。
            </p>
          </div>

          <div className="topic-card bg-[var(--card)] p-5 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <GeometricBadge color="tertiary" size="sm">
                <Download strokeWidth={2.5} className="w-4 h-4" />
              </GeometricBadge>
              <h4 className="font-['Outfit'] font-bold text-sm text-[var(--foreground)]">
                视口预加载
              </h4>
            </div>
            <p className="text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/60 leading-relaxed">
              当链接元素进入可视区域（或提前 200px）时触发。
              <strong>命中率 ~80%</strong>。 用{" "}
              <code className="font-mono text-[10px] bg-gray-100 px-1 rounded">
                IntersectionObserver
              </code>{" "}
              实现， 适合长列表中的下一页入口。
            </p>
          </div>

          <div className="topic-card bg-[var(--card)] p-5 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <GeometricBadge color="quaternary" size="sm">
                <RefreshCw strokeWidth={2.5} className="w-4 h-4" />
              </GeometricBadge>
              <h4 className="font-['Outfit'] font-bold text-sm text-[var(--foreground)]">
                空闲预加载
              </h4>
            </div>
            <p className="text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/60 leading-relaxed">
              在浏览器空闲时预加载所有高频路由。<strong>命中率 ~100%</strong>
              （全量下载）， 适合小型应用。用{" "}
              <code className="font-mono text-[10px] bg-gray-100 px-1 rounded">
                requestIdleCallback
              </code>{" "}
              实现， 不阻塞主线程。
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ 交互式实验场 ═══════════ */}
      <section className="container py-16">
        <SectionLabel text="Interactive Playground" />

        <h2 className="animate-pop mt-5 font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[var(--foreground)]">
          🧪 Bundle 拆分模拟器
        </h2>

        <div className="animate-slide mt-8">
          <div className="topic-card bg-[var(--card)] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-[var(--foreground)] bg-[var(--accent)]">
              <h3 className="font-['Outfit'] font-bold text-white flex items-center gap-2">
                <Rocket strokeWidth={2.5} className="w-5 h-5" />
                实时观察拆分策略对加载时间的影响
              </h3>
            </div>

            <div className="p-6">
              {/* 模拟：全量 vs 拆分对比 */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* 左侧: 全量打包 */}
                <div>
                  <h4 className="font-['Outfit'] font-bold text-sm text-[var(--foreground)] mb-3 flex items-center gap-2">
                    <XCircle
                      strokeWidth={2.5}
                      className="w-4 h-4 text-red-500"
                    />
                    全量打包（无 Code Splitting）
                  </h4>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/50 w-20 text-right">
                        main.js
                      </span>
                      <div className="flex-1 h-8 bg-red-100 rounded-lg border-2 border-red-300 overflow-hidden relative">
                        <div
                          className="h-full bg-red-400/60 flex items-center px-3"
                          style={{ width: "100%" }}
                        >
                          <span className="text-[10px] font-mono font-bold text-red-800">
                            487KB — 包含所有页面、图表、PDF、Markdown...
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] text-red-500 font-['Plus_Jakarta_Sans'] font-semibold mt-1 ml-24">
                      ⚠️ 首屏加载全部代码，FCP 3.2s
                    </p>
                  </div>
                </div>

                {/* 右侧: 拆分打包 */}
                <div>
                  <h4 className="font-['Outfit'] font-bold text-sm text-[var(--foreground)] mb-3 flex items-center gap-2">
                    <CheckCircle2
                      strokeWidth={2.5}
                      className="w-4 h-4 text-[var(--quaternary)]"
                    />
                    代码拆分 + 懒加载
                  </h4>

                  <div className="space-y-2">
                    {[
                      {
                        name: "main.js",
                        width: "20%",
                        size: "45KB",
                        color: "bg-[var(--quaternary)]",
                        borderColor: "border-[var(--quaternary)]",
                        bgColor: "bg-emerald-50",
                        desc: "首屏核心",
                      },
                      {
                        name: "vendor-react.js",
                        width: "28%",
                        size: "42KB",
                        color: "bg-[var(--accent)]",
                        borderColor: "border-[var(--accent)]",
                        bgColor: "bg-purple-50",
                        desc: "React 运行时",
                      },
                      {
                        name: "dashboard.chunk.js",
                        width: "15%",
                        size: "23KB",
                        color: "bg-[var(--tertiary)]",
                        borderColor: "border-[var(--tertiary)]",
                        bgColor: "bg-yellow-50",
                        desc: "路由懒加载",
                      },
                      {
                        name: "charts.chunk.js",
                        width: "42%",
                        size: "67KB",
                        color: "bg-[var(--secondary)]",
                        borderColor: "border-[var(--secondary)]",
                        bgColor: "bg-pink-50",
                        desc: "图表库按需",
                      },
                    ].map((chunk, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/50 w-24 text-right truncate">
                          {chunk.name}
                        </span>
                        <div
                          className={`flex-1 h-7 ${chunk.bgColor} rounded-lg border-2 ${chunk.borderColor} overflow-hidden`}
                        >
                          <div
                            className={`h-full ${chunk.color}/60 flex items-center px-2`}
                            style={{ width: chunk.width }}
                          >
                            <span className="text-[10px] font-mono font-bold text-[var(--foreground)]">
                              {chunk.size}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/40 w-16">
                          {chunk.desc}
                        </span>
                      </div>
                    ))}
                    <p className="text-[10px] text-[var(--quaternary)] font-['Plus_Jakarta_Sans'] font-semibold mt-1 ml-28">
                      ✅ 首屏仅加载 87KB，其余按需获取，FCP 1.2s
                    </p>
                  </div>
                </div>
              </div>

              {/* 时间线对比 */}
              <div className="mt-8 pt-6 border-t-2 border-dashed border-[var(--border)]">
                <h4 className="font-['Outfit'] font-bold text-sm text-[var(--foreground)] mb-4">
                  ⏱️ 用户点击 /dashboard 后的时间线
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* 无拆分 */}
                  <div className="relative pl-8">
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-red-200" />
                    {[
                      { time: "0ms", text: "页面已在内存中", type: "normal" },
                      { time: "0ms", text: "渲染 /dashboard", type: "normal" },
                      {
                        time: "~0ms",
                        text: "导航完成（但首屏被全量 JS 阻塞了 3.2s）",
                        type: "bad",
                      },
                    ].map((step, i) => (
                      <div key={i} className="relative mb-4 last:mb-0">
                        <div className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-red-400 border-2 border-[var(--foreground)]" />
                        <span className="text-[10px] font-mono text-red-500 font-bold">
                          {step.time}
                        </span>
                        <p className="text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/60 mt-0.5">
                          {step.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* 有拆分 + 预加载 */}
                  <div className="relative pl-8">
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-[var(--quaternary)]/40" />
                    {[
                      {
                        time: "0ms",
                        text: "用户 hover 时已预加载 chunk",
                        type: "good",
                      },
                      {
                        time: "~5ms",
                        text: "chunk 已在浏览器缓存中",
                        type: "good",
                      },
                      {
                        time: "~50ms",
                        text: "渲染 /dashboard（无额外网络请求）",
                        type: "good",
                      },
                    ].map((step, i) => (
                      <div key={i} className="relative mb-4 last:mb-0">
                        <div className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-[var(--quaternary)] border-2 border-[var(--foreground)]" />
                        <span className="text-[10px] font-mono text-[var(--quaternary)] font-bold">
                          {step.time}
                        </span>
                        <p className="text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/60 mt-0.5">
                          {step.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ L5: Anti-Patterns & 陷阱 ═══════════ */}
      <section className="container py-16">
        <SectionLabel text="Anti-Patterns & Pitfalls" />

        <h2 className="animate-pop mt-5 font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[var(--foreground)]">
          ⚠️ 常见陷阱与反模式
        </h2>

        <div className="animate-slide mt-8 space-y-6">
          <CodeBlock
            code={antiPatternCode}
            language="typescript"
            title="常见错误 → 正确做法对比"
          />

          {/* 陷阱卡片 */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="topic-card bg-red-50 border-red-200 p-5 rounded-2xl">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  strokeWidth={2.5}
                  className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <h4 className="font-['Outfit'] font-bold text-sm text-red-800">
                    陷阱：动态路径 + 变量
                  </h4>
                  <p className="text-xs font-['Plus_Jakarta_Sans'] text-red-700/70 mt-1 leading-relaxed">
                    <code className="font-mono bg-red-100 px-1 rounded text-[10px]">
                      import(`./${"{"}name{"}"}`)
                    </code>{" "}
                    中的变量路径让打包器无法静态分析，Webpack 会将整个目录打包。
                    用 <strong>webpackInclude/Exclude</strong>{" "}
                    注释限制范围，或改用
                    <strong>显式映射表</strong>。
                  </p>
                </div>
              </div>
            </div>

            <div className="topic-card bg-orange-50 border-orange-200 p-5 rounded-2xl">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  strokeWidth={2.5}
                  className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <h4 className="font-['Outfit'] font-bold text-sm text-orange-800">
                    陷阱：过度拆分的瀑布请求
                  </h4>
                  <p className="text-xs font-['Plus_Jakarta_Sans'] text-orange-700/70 mt-1 leading-relaxed">
                    拆分粒度过细（每个 2KB 组件都 lazy import）会导致： ① HTTP
                    请求数爆炸 ② 用户多次看到 loading 态 ③
                    浏览器并行限制（6个域名）导致排队。
                    <strong>经验法则：单 chunk 不低于 20KB</strong>
                    ，按功能聚合。
                  </p>
                </div>
              </div>
            </div>

            <div className="topic-card bg-yellow-50 border-yellow-200 p-5 rounded-2xl">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  strokeWidth={2.5}
                  className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <h4 className="font-['Outfit'] font-bold text-sm text-yellow-800">
                    陷阱：SSR + 动态导入的兼容
                  </h4>
                  <p className="text-xs font-['Plus_Jakarta_Sans'] text-yellow-700/70 mt-1 leading-relaxed">
                    React.lazy() 在服务端渲染时会报错 —— SSR 没有{" "}
                    <code className="font-mono bg-yellow-100 px-1 rounded text-[10px]">
                      import()
                    </code>{" "}
                    的运行时。 Next.js 的 <strong>dynamic()</strong> 已内置 SSR
                    降级， 但自定义 SSR 方案需要手动处理{" "}
                    <strong>loadable-components</strong>。
                  </p>
                </div>
              </div>
            </div>

            <div className="topic-card bg-blue-50 border-blue-200 p-5 rounded-2xl">
              <div className="flex items-start gap-3">
                <Lightbulb
                  strokeWidth={2.5}
                  className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <h4 className="font-['Outfit'] font-bold text-sm text-blue-800">
                    💡 最佳实践：Suspense + 骨架屏
                  </h4>
                  <p className="text-xs font-['Plus_Jakarta_Sans'] text-blue-700/70 mt-1 leading-relaxed">
                    永远不要让用户看到空白 —— 配合{" "}
                    <code className="font-mono bg-blue-100 px-1 rounded text-[10px]">
                      &lt;Suspense fallback={}&gt;
                    </code>
                    提供骨架屏(Skeleton)。骨架屏让感知加载时间降低
                    <strong> 30~50%</strong>（Nielsen Norman Group 研究数据）。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ L5: 速查清单 (Cheat Sheet) ═══════════ */}
      <section className="container py-16 pb-24">
        <SectionLabel text="Cheat Sheet" />

        <h2 className="animate-pop mt-5 font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[var(--foreground)]">
          📋 Code Splitting 速查清单
        </h2>

        <div className="animate-slide mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "import() 动态导入",
              desc: "运行时按需加载模块，返回 Promise",
              code: "const m = await import('./module')",
              color: "var(--accent)",
            },
            {
              title: "React.lazy()",
              desc: "React 原生的组件懒加载，配合 Suspense",
              code: "const Comp = lazy(() => import('./Comp'))",
              color: "var(--secondary)",
            },
            {
              title: "Next.js dynamic()",
              desc: "支持 SSR 降级、loading 组件、禁用 SSR",
              code: "const D = dynamic(() => import('./D'), { ssr: false })",
              color: "var(--tertiary)",
            },
            {
              title: "router.prefetch()",
              desc: "Next.js 预加载路由 chunk",
              code: "router.prefetch('/dashboard')",
              color: "var(--quaternary)",
            },
            {
              title: "Webpack splitChunks",
              desc: "cacheGroups 配置 vendor / common 拆分",
              code: "splitChunks: { chunks: 'all', cacheGroups: {...} }",
              color: "var(--secondary)",
            },
            {
              title: "Vite manualChunks",
              desc: "Rollup 手动分包，对象式或函数式",
              code: "manualChunks: { 'vendor-react': ['react'] }",
              color: "var(--tertiary)",
            },
            {
              title: "webpackMagicComment",
              desc: "在 import() 内注入打包指令",
              code: "import(/* webpackChunkName: 'chart' */ './chart')",
              color: "var(--accent)",
            },
            {
              title: "Suspense + Skeleton",
              desc: "加载态骨架屏，降低感知延迟 30~50%",
              code: "<Suspense fallback={<Skeleton />} />",
              color: "var(--quaternary)",
            },
            {
              title: "IntersectionObserver",
              desc: "视口内预加载，命中率 ~80%",
              code: "new IntersectionObserver(cb, { rootMargin: '200px' })",
              color: "var(--secondary)",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="topic-card bg-[var(--card)] rounded-2xl overflow-hidden"
            >
              <div className="h-1.5" style={{ backgroundColor: item.color }} />
              <div className="p-5">
                <h4 className="font-['Outfit'] font-bold text-sm text-[var(--foreground)]">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/55 leading-relaxed">
                  {item.desc}
                </p>
                <code
                  className="mt-3 block px-3 py-2 rounded-lg text-[10px] font-mono text-[var(--foreground)]/70 border-2 border-[var(--border)] bg-[var(--background)]"
                  style={{
                    borderColor: `color-mix(in srgb, ${item.color} 30%, var(--border))`,
                  }}
                >
                  {item.code}
                </code>
              </div>
            </div>
          ))}
        </div>

        {/* 决策流程图 */}
        <div className="animate-slide mt-10">
          <div className="topic-card bg-[var(--card)] p-6 rounded-2xl">
            <h3 className="font-['Outfit'] font-bold text-lg text-[var(--foreground)] mb-5 flex items-center gap-2">
              <Route
                strokeWidth={2.5}
                className="w-5 h-5 text-[var(--accent)]"
              />
              拆分决策流程图 — 该不该拆？
            </h3>
            <div className="space-y-3 max-w-2xl mx-auto">
              {[
                {
                  q: "这个模块 > 100KB 吗？",
                  yes: "→ 必须拆分（vendor / 大库单独 chunk）",
                  no: "",
                  color: "red",
                },
                {
                  q: "用户首屏是否需要它？",
                  yes: "→ 放入 main chunk",
                  no: "→ 路由级 / 组件级 lazy import",
                  color: "yellow",
                },
                {
                  q: "被 2+ 个页面共用？",
                  yes: "→ 提取为 shared chunk (splitChunks / manualChunks)",
                  no: "→ 放入对应路由 chunk",
                  color: "blue",
                },
                {
                  q: "用户有 60%+ 概率访问？",
                  yes: "→ 启用预加载 (prefetch / preload)",
                  no: "→ 纯懒加载即可",
                  color: "green",
                },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className={`w-8 h-8 rounded-lg border-2 border-[var(--foreground)] shadow-[3px_3px_0px_0px_var(--foreground)] flex items-center justify-center text-xs font-['Outfit'] font-extrabold text-white flex-shrink-0 ${
                      step.color === "red"
                        ? "bg-red-400"
                        : step.color === "yellow"
                          ? "bg-[var(--tertiary)] text-[var(--foreground)]"
                          : step.color === "blue"
                            ? "bg-blue-400"
                            : "bg-[var(--quaternary)]"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-['Outfit'] font-bold text-sm text-[var(--foreground)]">
                      {step.q}
                    </p>
                    <div className="mt-1 space-y-0.5 text-xs font-['Plus_Jakarta_Sans']">
                      <p className="text-[var(--quaternary)]">
                        <span className="font-bold">YES</span> {step.yes}
                      </p>
                      {step.no && (
                        <p className="text-[var(--secondary)]">
                          <span className="font-bold">NO</span> {step.no}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 关键公式 */}
        <div className="animate-slide mt-8 text-center">
          <div className="inline-block topic-card bg-[var(--foreground)] text-white px-8 py-6 rounded-2xl">
            <p className="font-['Outfit'] font-extrabold text-2xl tracking-tight">
              Code Splitting ={" "}
              <span className="text-[var(--tertiary)]">按需加载</span> +{" "}
              <span className="text-[var(--secondary)]">预加载</span> +{" "}
              <span className="text-[var(--quaternary)]">缓存策略</span>
            </p>
            <p className="mt-2 text-sm font-['Plus_Jakarta_Sans'] text-white/60">
              拆分是手段，不是目的。目标始终是：更少的初始 JS +
              更快的可交互时间。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
