// app/rendering-strategies/page.tsx
"use client";

import { useState } from "react";
import {
  Monitor,
  Server,
  FileText,
  RefreshCw,
  Zap,
  Clock,
  Globe,
  Database,
  ArrowRight,
  Check,
  X,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Code2,
  Gauge,
  Search,
  Layers,
  Users,
  TrendingUp,
  Workflow,
  Cpu,
  HardDrive,
  Timer,
  Eye,
} from "lucide-react";

/* ──────────────────────────── 类型定义 ──────────────────────────── */

interface StrategyCard {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  color: string;
  colorVar: string;
  shadowVar: string;
  icon: React.ReactNode;
  brief: string;
  when: string;
  examples: string[];
  pros: string[];
  cons: string[];
  code: string;
  flow: { step: string; desc: string }[];
}

/* ──────────────────────────── 数据 ──────────────────────────── */

const strategies: StrategyCard[] = [
  {
    id: "csr",
    label: "Client-Side Rendering",
    title: "CSR",
    subtitle: "客户端渲染",
    color: "bg-purple-100",
    colorVar: "var(--accent)",
    shadowVar: "8px 8px 0px 0px var(--accent)",
    icon: <Monitor strokeWidth={2.5} className="w-6 h-6" />,
    brief:
      "所有渲染工作在浏览器端完成。服务器只返回一个空的 HTML 框架和 JavaScript Bundle，由浏览器下载、解析并执行 JS 后生成完整的 DOM。",
    when: "适合对 SEO 要求不高、交互极其复杂的管理后台 / SPA 应用",
    examples: ["后台管理系统", "在线文档编辑器", "Figma 类工具"],
    pros: ["前后端彻底分离", "交互响应极快（后续导航）", "服务器压力极小", "部署简单（静态托管即可）"],
    cons: ["首屏白屏时间长", "SEO 极差", "JS 未加载完页面不可用", "低端设备性能开销大"],
    code: `// CSR 典型代码 — React SPA
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 浏览器端发起请求
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <Loading />;

  return <Dashboard data={data} />;
}`,
    flow: [
      { step: "1. 浏览器请求", desc: "用户访问 URL" },
      { step: "2. 返回 HTML 骨架", desc: "仅含 <div id='root'> 和 <script>" },
      { step: "3. 下载 JS Bundle", desc: "可能数百 KB 至数 MB" },
      { step: "4. 执行 JavaScript", desc: "React 初始化渲染" },
      { step: "5. 发起 API 请求", desc: "获取动态数据" },
      { step: "6. 渲染完整页面", desc: "用户终于看到内容" },
    ],
  },
  {
    id: "ssr",
    label: "Server-Side Rendering",
    title: "SSR",
    subtitle: "服务端渲染",
    color: "bg-pink-100",
    colorVar: "var(--secondary)",
    shadowVar: "8px 8px 0px 0px var(--secondary)",
    icon: <Server strokeWidth={2.5} className="w-6 h-6" />,
    brief:
      "每次用户请求时，服务器在 Node.js 环境中实时执行 React 组件、获取数据、生成完整 HTML 字符串返回给浏览器，随后浏览器执行 Hydration 使其可交互。",
    when: "适合需要强 SEO + 内容频繁变化的页面，如电商商品详情、新闻文章",
    examples: ["电商产品页", "新闻详情页", "用户个人主页"],
    pros: ["SEO 非常友好", "首屏渲染极快", "动态数据实时反映", "社交分享有完整预览"],
    cons: ["每次请求都要计算，服务器压力大", "TTFB 受服务器性能影响", "需要 Node.js 服务器环境", "Hydration 阶段仍需加载 JS"],
    code: `// Next.js SSR — 每次请求执行
// page.tsx (App Router)
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // 每次请求都在服务端执行
  const product = await fetch(
    \`https://api.store.com/products/\${params.id}\`,
    { cache: 'no-store' } // 不缓存，实时获取
  ).then(res => res.json());

  return (
    <article>
      <h1>{product.name}</h1>
      <p>¥{product.price}</p>
    </article>
  );
}`,
    flow: [
      { step: "1. 浏览器请求", desc: "用户访问 /product/42" },
      { step: "2. 服务端执行", desc: "运行 React + fetch 数据" },
      { step: "3. 生成完整 HTML", desc: "含数据的完整文档" },
      { step: "4. 返回浏览器", desc: "立即可看到内容" },
      { step: "5. 加载 JS Bundle", desc: "下载客户端代码" },
      { step: "6. Hydration", desc: "事件绑定，页面可交互" },
    ],
  },
  {
    id: "ssg",
    label: "Static Site Generation",
    title: "SSG",
    subtitle: "静态站点生成",
    color: "bg-yellow-100",
    colorVar: "var(--tertiary)",
    shadowVar: "8px 8px 0px 0px var(--tertiary)",
    icon: <FileText strokeWidth={2.5} className="w-6 h-6" />,
    brief:
      "在 构建时 (Build Time) 预渲染所有页面为纯静态 HTML 文件。部署到 CDN 后，用户请求直接获取预生成的 HTML，无需任何服务端计算。",
    when: "适合内容不经常变动的页面，如博客、文档站、营销着陆页",
    examples: ["技术博客", "官方文档站", "公司官网", "营销着陆页"],
    pros: ["访问速度极快（CDN 边缘节点）", "SEO 完美", "服务器零压力", "安全性高（无服务器代码）", "可离线访问"],
    cons: ["构建时间随页面数增长", "内容更新需重新构建部署", "不适合高度动态内容", "大量页面时构建极慢"],
    code: `// Next.js SSG — 构建时生成
// page.tsx
export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  return <Article post={post} />;
}

// 生成静态路由
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}`,
    flow: [
      { step: "1. 构建阶段", desc: "next build 执行" },
      { step: "2. 预取数据", desc: "fetch 所有页面所需数据" },
      { step: "3. 渲染 HTML", desc: "生成每个页面的 .html" },
      { step: "4. 部署 CDN", desc: "上传到边缘节点" },
      { step: "5. 用户请求", desc: "直接从 CDN 获取" },
      { step: "6. 瞬间加载", desc: "毫秒级首屏展现" },
    ],
  },
  {
    id: "isr",
    label: "Incremental Static Regeneration",
    title: "ISR",
    subtitle: "增量静态再生",
    color: "bg-emerald-100",
    colorVar: "var(--quaternary)",
    shadowVar: "8px 8px 0px 0px var(--quaternary)",
    icon: <RefreshCw strokeWidth={2.5} className="w-6 h-6" />,
    brief:
      "SSG 的进化版本。在静态生成的基础上，通过设置 `revalidate` 时间窗口，让页面在指定秒数后**自动在后台重新生成**。兼具静态站点的速度和动态内容的新鲜度。",
    when: "适合内容会变化但实时性要求不极端的场景，如电商首页、排行榜、新闻列表",
    examples: ["电商首页", "热搜排行榜", "新闻列表页", "产品目录"],
    pros: ["兼具 SSG 速度和动态数据", "无需全量重新构建", "后台更新对用户透明", "按需再生，资源高效利用"],
    cons: ["首次再生时可能展示旧数据", "需要 Node.js 运行时", "再生期间有短暂时差", "逻辑理解相对复杂"],
    code: `// Next.js ISR — 带 revalidation
// page.tsx
export default async function HomePage() {
  // 每 60 秒重新验证一次
  const products = await fetch(
    'https://api.store.com/featured',
    { next: { revalidate: 60 } }
  ).then(res => res.json());

  return (
    <section>
      <h1>热门推荐</h1>
      <ProductGrid products={products} />
    </section>
  );
}

// 按需再生 (On-Demand Revalidation)
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const { path } = await request.json();
  revalidatePath(path);
  return Response.json({ revalidated: true });
}`,
    flow: [
      { step: "1. 首次构建", desc: "像 SSG 一样生成静态页" },
      { step: "2. 用户请求", desc: "直接返回缓存的 HTML" },
      { step: "3. 过期检测", desc: "超过 revalidate 秒数" },
      { step: "4. 返回旧页面", desc: "用户先看到上一版本" },
      { step: "5. 后台再生", desc: "服务端悄悄重新渲染" },
      { step: "6. 替换缓存", desc: "下次请求获得最新版本" },
    ],
  },
];

/* ────────────────────── 对比矩阵数据 ────────────────────── */

const comparisonMatrix = [
  { dimension: "首屏速度", icon: <Zap strokeWidth={2.5} className="w-4 h-4" />, csr: "慢", ssr: "快", ssg: "极快", isr: "极快" },
  { dimension: "SEO 友好度", icon: <Search strokeWidth={2.5} className="w-4 h-4" />, csr: "差", ssr: "好", ssg: "极好", isr: "极好" },
  { dimension: "数据实时性", icon: <Clock strokeWidth={2.5} className="w-4 h-4" />, csr: "实时", ssr: "实时", ssg: "构建时", isr: "近实时" },
  { dimension: "服务器压力", icon: <Cpu strokeWidth={2.5} className="w-4 h-4" />, csr: "无", ssr: "大", ssg: "无", isr: "小" },
  { dimension: "构建速度", icon: <Timer strokeWidth={2.5} className="w-4 h-4" />, csr: "快", ssr: "—", ssg: "慢", isr: "渐进" },
  { dimension: "缓存能力", icon: <HardDrive strokeWidth={2.5} className="w-4 h-4" />, csr: "浏览器", ssr: "较难", ssg: "CDN", isr: "CDN+" },
  { dimension: "交互复杂度", icon: <Layers strokeWidth={2.5} className="w-4 h-4" />, csr: "极好", ssr: "好", ssg: "好", isr: "好" },
  { dimension: "适用规模", icon: <Users strokeWidth={2.5} className="w-4 h-4" />, csr: "中小型", ssr: "中型", ssg: "大型", isr: "大型" },
];

const ratingColors: Record<string, string> = {
  极快: "text-emerald-700 bg-emerald-50 border-emerald-300",
  快: "text-emerald-600 bg-emerald-50 border-emerald-200",
  慢: "text-red-600 bg-red-50 border-red-200",
  极好: "text-emerald-700 bg-emerald-50 border-emerald-300",
  好: "text-blue-600 bg-blue-50 border-blue-200",
  差: "text-red-600 bg-red-50 border-red-200",
  实时: "text-emerald-700 bg-emerald-50 border-emerald-300",
  构建时: "text-amber-600 bg-amber-50 border-amber-200",
  近实时: "text-blue-600 bg-blue-50 border-blue-200",
  无: "text-emerald-700 bg-emerald-50 border-emerald-300",
  小: "text-blue-600 bg-blue-50 border-blue-200",
  大: "text-red-600 bg-red-50 border-red-200",
  "—": "text-gray-400 bg-gray-50 border-gray-200",
  渐进: "text-blue-600 bg-blue-50 border-blue-200",
  较难: "text-amber-600 bg-amber-50 border-amber-200",
  CDN: "text-emerald-700 bg-emerald-50 border-emerald-300",
  "CDN+": "text-emerald-700 bg-emerald-50 border-emerald-300",
  浏览器: "text-blue-600 bg-blue-50 border-blue-200",
  极大型: "text-emerald-700 bg-emerald-50 border-emerald-300",
  大型: "text-emerald-700 bg-emerald-50 border-emerald-300",
  中型: "text-blue-600 bg-blue-50 border-blue-200",
  中小型: "text-amber-600 bg-amber-50 border-amber-200",
};

/* ────────────────────── 子组件 ────────────────────── */

function GeoBadge({
  children,
  color,
  size = "md",
}: {
  children: React.ReactNode;
  color: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };
  return (
    <div
      className={`${sizeMap[size]} ${color} rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center`}
      style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
    >
      {children}
    </div>
  );
}

function FlowStep({
  step,
  desc,
  index,
  color,
}: {
  step: string;
  desc: string;
  index: number;
  color: string;
}) {
  return (
    <div className="flex items-start gap-3 animate-slide" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full ${color} border-2 border-[var(--foreground)] flex items-center justify-center font-bold text-sm text-[var(--foreground)]`}
          style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
        >
          {index + 1}
        </div>
        {index < 5 && (
          <div className="w-0.5 h-8 bg-[var(--border)] my-1" />
        )}
      </div>
      <div className="pt-1.5">
        <p
          className="font-bold text-sm text-[var(--foreground)]"
          style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
        >
          {step}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function CodeBlock({ code, color }: { code: string; color: string }) {
  return (
    <div
      className="border-2 border-[var(--foreground)] rounded-xl overflow-hidden"
      style={{ boxShadow: "6px 6px 0px 0px var(--foreground)" }}
    >
      <div
        className={`${color} px-4 py-2 border-b-2 border-[var(--foreground)] flex items-center gap-2`}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full border-2 border-[var(--foreground)] bg-red-400" />
          <div className="w-3 h-3 rounded-full border-2 border-[var(--foreground)] bg-yellow-400" />
          <div className="w-3 h-3 rounded-full border-2 border-[var(--foreground)] bg-green-400" />
        </div>
        <span
          className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider"
          style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
        >
          code
        </span>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed bg-[#1E293B] text-gray-200">
        <code className="language-typescript">{code}</code>
      </pre>
    </div>
  );
}

function StrategyDetailCard({ strategy }: { strategy: StrategyCard }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="topic-card p-0 overflow-hidden animate-pop"
      style={{ animationDelay: "0.2s" }}
    >
      {/* 彩色头部 */}
      <div className={`${strategy.color} p-6 border-b-2 border-[var(--foreground)]`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <GeoBadge color={strategy.color} size="lg">
              {strategy.icon}
            </GeoBadge>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest text-gray-600"
                style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
              >
                {strategy.label}
              </p>
              <h2
                className="text-4xl md:text-5xl font-extrabold text-[var(--foreground)] mt-1"
                style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
              >
                {strategy.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{strategy.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* 描述 */}
        <p className="text-base leading-relaxed text-[var(--foreground)]">
          {strategy.brief}
        </p>

        {/* 适用场景标签 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb strokeWidth={2.5} className="w-4 h-4 text-[var(--tertiary)]" />
            <span
              className="text-xs font-bold uppercase tracking-widest text-gray-500"
              style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
            >
              最佳适用场景
            </span>
          </div>
          <div
            className="bg-gray-50 rounded-xl border-2 border-[var(--border)] p-4"
            style={{ boxShadow: "4px 4px 0px 0px var(--border)" }}
          >
            <p className="text-sm text-gray-700 mb-3">{strategy.when}</p>
            <div className="flex flex-wrap gap-2">
              {strategy.examples.map((ex) => (
                <span
                  key={ex}
                  className={`${strategy.color} text-xs font-bold px-3 py-1.5 rounded-full border-2 border-[var(--foreground)] text-[var(--foreground)]`}
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 执行流程 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Workflow strokeWidth={2.5} className="w-4 h-4" style={{ color: strategy.colorVar }} />
            <span
              className="text-xs font-bold uppercase tracking-widest text-gray-500"
              style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
            >
              执行流程
            </span>
          </div>
          <div className="ml-2">
            {strategy.flow.map((f, i) => (
              <FlowStep
                key={i}
                step={f.step}
                desc={f.desc}
                index={i}
                color={strategy.color}
              />
            ))}
          </div>
        </div>

        {/* 优缺点 */}
        <div className="grid md:grid-cols-2 gap-4">
          <div
            className="bg-emerald-50 rounded-xl border-2 border-[var(--foreground)] p-5"
            style={{ boxShadow: "4px 4px 0px 0px var(--quaternary)" }}
          >
            <h4
              className="font-bold text-sm uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-2"
              style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
            >
              <Check strokeWidth={2.5} className="w-4 h-4" />
              优势
            </h4>
            <ul className="space-y-2">
              {strategy.pros.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">
                    <Check strokeWidth={2.5} className="w-3.5 h-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="bg-red-50 rounded-xl border-2 border-[var(--foreground)] p-5"
            style={{ boxShadow: "4px 4px 0px 0px #f87171" }}
          >
            <h4
              className="font-bold text-sm uppercase tracking-wider text-red-800 mb-3 flex items-center gap-2"
              style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
            >
              <AlertTriangle strokeWidth={2.5} className="w-4 h-4" />
              劣势
            </h4>
            <ul className="space-y-2">
              {strategy.cons.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">
                    <X strokeWidth={2.5} className="w-3.5 h-3.5" />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 代码示例 — 可折叠 */}
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Code2 strokeWidth={2.5} className="w-4 h-4 text-[var(--accent)]" />
            <span
              className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-[var(--accent)] transition-colors"
              style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
            >
              代码示例
            </span>
            {expanded ? (
              <ChevronUp strokeWidth={2.5} className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown strokeWidth={2.5} className="w-4 h-4 text-gray-400" />
            )}
          </button>
          {expanded && (
            <div className="mt-4 animate-pop">
              <CodeBlock code={strategy.code} color={strategy.color} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────── 主页面组件 ────────────────────── */

export default function RenderingStrategiesPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="bg-dot-grid min-h-screen">
      {/* ════════════ HERO 区域 ════════════ */}
      <section className="container relative overflow-hidden">
        {/* 装饰性 Blob */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 bg-[var(--tertiary)] opacity-20 rounded-full blur-3xl"
          style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-60 h-60 bg-[var(--accent)] opacity-15 rounded-full blur-3xl"
          style={{ borderRadius: "30% 70% 50% 50% / 50% 60% 40% 50%" }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-40 h-40 bg-[var(--secondary)] opacity-10 rounded-full blur-2xl"
          style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
        />

        <div className="container relative z-10 pt-16 pb-20 md:pt-24 md:pb-28">
          {/* 标签 */}
          <div className="animate-pop flex items-center gap-3 mb-6">
            <GeoBadge color="bg-[var(--accent)] bg-purple-100" size="sm">
              <Gauge strokeWidth={2.5} className="w-4 h-4 text-[var(--accent)]" />
            </GeoBadge>
            <span
              className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]"
              style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
            >
              Web 渲染策略 · 深度解析
            </span>
          </div>

          {/* 主标题 */}
          <h1
            className="animate-pop text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-[var(--foreground)] leading-none mb-6"
            style={{
              fontFamily: "var(--font-heading, Outfit, sans-serif)",
              animationDelay: "0.1s",
            }}
          >
            CSR · SSR
            <br />
            <span className="relative inline-block">
              SSG
              <span
                className="absolute -bottom-2 left-0 w-full h-3 bg-[var(--tertiary)] opacity-40 -z-10"
                style={{ borderRadius: "4px" }}
              />
            </span>
            {" · "}
            <span className="relative inline-block">
              ISR
              <span
                className="absolute -bottom-2 left-0 w-full h-3 bg-[var(--quaternary)] opacity-40 -z-10"
                style={{ borderRadius: "4px" }}
              />
            </span>
          </h1>

          <p
            className="animate-pop max-w-2xl text-base md:text-lg text-gray-600 leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            现代 Web 框架提供了多种页面渲染策略。理解它们的原理、权衡与适用场景，
            是每一位前端工程师的核心能力。本文将用<span className="font-bold text-[var(--foreground)]">清晰的图解</span>和
            <span className="font-bold text-[var(--foreground)]">真实的代码</span>帮你彻底掌握四大渲染方案。
          </p>

          {/* 概览胶囊 */}
          <div
            className="animate-pop flex flex-wrap gap-3 mt-8"
            style={{ animationDelay: "0.3s" }}
          >
            {strategies.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`${s.color} border-2 border-[var(--foreground)] rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-bold text-[var(--foreground)] hover:scale-105 transition-transform`}
                style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
              >
                {s.icon}
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ 核心概念解释 ════════════ */}
      <section className="container pt-16 md:pt-24 pb-16 md:pb-24">
        <div
          className="topic-card animate-pop"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <GeoBadge color="bg-[var(--accent)] bg-purple-100" size="md">
              <Eye strokeWidth={2.5} className="w-5 h-5 text-[var(--accent)]" />
            </GeoBadge>
            <h2
              className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)]"
              style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
            >
              为什么渲染策略很重要？
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp strokeWidth={2.5} className="w-5 h-5" />,
                color: "bg-purple-100",
                title: "性能体验",
                desc: "首屏加载时间直接影响用户留存率。每慢 100ms，转化率下降 7%。",
              },
              {
                icon: <Search strokeWidth={2.5} className="w-5 h-5" />,
                color: "bg-yellow-100",
                title: "搜索引擎优化",
                desc: "爬虫能否读取你的页面内容，取决于 HTML 是否在首次响应中包含完整数据。",
              },
              {
                icon: <Globe strokeWidth={2.5} className="w-5 h-5" />,
                color: "bg-pink-100",
                title: "基础设施成本",
                desc: "不同的渲染策略对服务器、CDN、构建工具的要求截然不同，直接影响运营成本。",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`${item.color} rounded-xl border-2 border-[var(--foreground)] p-5 animate-slide`}
                style={{
                  boxShadow: "6px 6px 0px 0px var(--foreground)",
                  animationDelay: `${i * 100 + 200}ms`,
                }}
              >
                <GeoBadge color={item.color} size="sm">
                  {item.icon}
                </GeoBadge>
                <h3
                  className="font-bold text-lg text-[var(--foreground)] mt-3 mb-2"
                  style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ Bento 概览卡片 ════════════ */}
      <section className="container pb-16 md:pb-24">
        <div className="flex items-center gap-3 mb-8">
          <GeoBadge color="bg-yellow-100" size="md">
            <Layers strokeWidth={2.5} className="w-5 h-5 text-[var(--tertiary)]" />
          </GeoBadge>
          <h2
            className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
          >
            四大渲染策略一览
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {strategies.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="topic-card p-5 animate-pop group cursor-pointer flex flex-col"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* 图标 + 标签 */}
              <div className="flex items-center justify-between mb-4">
                <GeoBadge color={s.color} size="md">
                  {s.icon}
                </GeoBadge>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest text-gray-400"
                  style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
                >
                  {s.id}
                </span>
              </div>

              <h3
                className="text-2xl font-extrabold text-[var(--foreground)]"
                style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
              >
                {s.title}
              </h3>
              <p
                className="text-xs font-bold text-gray-500 mb-3"
                style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
              >
                {s.subtitle}
              </p>

              <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">
                {s.brief.slice(0, 80)}...
              </p>

              <div className="mt-4 flex items-center gap-1 text-[var(--accent)] text-sm font-bold group-hover:gap-2 transition-all">
                深入了解
                <ArrowRight strokeWidth={2.5} className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ════════════ 详细解析区域 ════════════ */}
      <section className="container pb-16 md:pb-24">
        <div className="flex items-center gap-3 mb-8">
          <GeoBadge color="bg-pink-100" size="md">
            <Code2 strokeWidth={2.5} className="w-5 h-5 text-[var(--secondary)]" />
          </GeoBadge>
          <h2
            className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
          >
            深度解析
          </h2>
        </div>

        {/* Tab 导航 */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-full text-sm font-bold border-2 border-[var(--foreground)] transition-all ${
              activeTab === "all"
                ? "bg-[var(--foreground)] text-white"
                : "bg-white text-[var(--foreground)] hover:bg-gray-100"
            }`}
            style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
          >
            全部显示
          </button>
          {strategies.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold border-2 border-[var(--foreground)] transition-all flex items-center gap-2 ${
                activeTab === s.id
                  ? `${s.color} text-[var(--foreground)]`
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
              style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
            >
              {s.icon}
              {s.title}
            </button>
          ))}
        </div>

        {/* 卡片列表 */}
        <div className="space-y-8">
          {strategies
            .filter((s) => activeTab === "all" || activeTab === s.id)
            .map((s) => (
              <div key={s.id} id={s.id}>
                <StrategyDetailCard strategy={s} />
              </div>
            ))}
        </div>
      </section>

      {/* ════════════ 对比矩阵 ════════════ */}
      <section className="container pb-16 md:pb-24">
        <div className="flex items-center gap-3 mb-8">
          <GeoBadge color="bg-emerald-100" size="md">
            <Database strokeWidth={2.5} className="w-5 h-5 text-[var(--quaternary)]" />
          </GeoBadge>
          <h2
            className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
          >
            全维度对比矩阵
          </h2>
        </div>

        {/* 桌面端表格 */}
        <div
          className="hidden md:block topic-card overflow-hidden animate-pop"
          style={{ boxShadow: "8px 8px 0px 0px var(--foreground)" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--foreground)] text-white">
                <th
                  className="text-left px-6 py-4 font-bold uppercase tracking-wider text-xs"
                  style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
                >
                  评估维度
                </th>
                {strategies.map((s) => (
                  <th
                    key={s.id}
                    className="text-center px-4 py-4"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xl">{s.title}</span>
                      <span className="text-[10px] opacity-60 uppercase tracking-widest">
                        {s.subtitle}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonMatrix.map((row, i) => (
                <tr
                  key={row.dimension}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-[var(--border)] last:border-b-0 hover:bg-yellow-50 transition-colors`}
                >
                  <td className="px-6 py-4 font-medium text-[var(--foreground)] flex items-center gap-2">
                    <span className="text-gray-400">{row.icon}</span>
                    {row.dimension}
                  </td>
                  {(["csr", "ssr", "ssg", "isr"] as const).map((key) => (
                    <td key={key} className="px-4 py-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold border-2 ${
                          ratingColors[row[key]] || "text-gray-500 bg-gray-50 border-gray-200"
                        }`}
                      >
                        {row[key]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 移动端卡片形式 */}
        <div className="md:hidden space-y-4">
          {comparisonMatrix.map((row, i) => (
            <div
              key={row.dimension}
              className="topic-card p-4 animate-slide"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-2 mb-3">
                {row.icon}
                <span className="font-bold text-sm text-[var(--foreground)]">
                  {row.dimension}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {strategies.map((s) => (
                  <div
                    key={s.id}
                    className={`${s.color} rounded-lg border-2 border-[var(--border)] px-3 py-2 text-center`}
                  >
                    <p className="text-[10px] font-bold uppercase text-gray-500 mb-1">
                      {s.title}
                    </p>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold border-2 ${
                        ratingColors[
                          row[s.id as keyof typeof row] as string
                        ] || ""
                      }`}
                    >
                      {row[s.id as keyof typeof row] as string}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ 决策指南 ════════════ */}
      <section className="container pb-16 md:pb-24">
        <div className="flex items-center gap-3 mb-8">
          <GeoBadge color="bg-yellow-100" size="md">
            <Lightbulb strokeWidth={2.5} className="w-5 h-5 text-[var(--tertiary)]" />
          </GeoBadge>
          <h2
            className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
          >
            如何选择？决策指南
          </h2>
        </div>

        {/* 决策流程图 */}
        <div
          className="topic-card p-6 md:p-10 animate-pop"
          style={{ boxShadow: "8px 8px 0px 0px var(--foreground)" }}
        >
          <div className="space-y-6">
            {[
              {
                question: "你的页面需要被搜索引擎收录吗？",
                yes: {
                  next: "数据变化频率有多高？",
                  followUp: [
                    {
                      label: "几乎不变（博客、文档）",
                      answer: "SSG",
                      color: "bg-yellow-100",
                      icon: <FileText strokeWidth={2.5} className="w-4 h-4" />,
                    },
                    {
                      label: "偶尔变化（每小时/每天）",
                      answer: "ISR",
                      color: "bg-emerald-100",
                      icon: <RefreshCw strokeWidth={2.5} className="w-4 h-4" />,
                    },
                    {
                      label: "实时变化（每次请求不同）",
                      answer: "SSR",
                      color: "bg-pink-100",
                      icon: <Server strokeWidth={2.5} className="w-4 h-4" />,
                    },
                  ],
                },
                no: {
                  answer: "CSR",
                  color: "bg-purple-100",
                  icon: <Monitor strokeWidth={2.5} className="w-4 h-4" />,
                  reason: "如管理后台、内部工具，SEO 不重要，追求极致交互体验",
                },
              },
            ].map((decision, i) => (
              <div key={i} className="space-y-4">
                {/* 问题节点 */}
                <div
                  className="bg-[var(--accent)] bg-purple-100 border-2 border-[var(--foreground)] rounded-2xl p-5 text-center"
                  style={{ boxShadow: "6px 6px 0px 0px var(--foreground)" }}
                >
                  <p
                    className="text-lg md:text-xl font-extrabold text-[var(--foreground)]"
                    style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
                  >
                    {decision.question}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* 否 → CSR */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-[var(--foreground)] flex items-center justify-center">
                        <X strokeWidth={2.5} className="w-4 h-4 text-red-500" />
                      </div>
                      <span className="font-bold text-sm text-gray-600">不需要 SEO</span>
                    </div>
                    <div
                      className={`${decision.no.color} border-2 border-[var(--foreground)] rounded-xl p-5`}
                      style={{ boxShadow: "6px 6px 0px 0px var(--foreground)" }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <GeoBadge color={decision.no.color} size="sm">
                          {decision.no.icon}
                        </GeoBadge>
                        <span
                          className="text-3xl font-extrabold text-[var(--foreground)]"
                          style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
                        >
                          → {decision.no.answer}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {decision.no.reason}
                      </p>
                    </div>
                  </div>

                  {/* 是 → 进一步选择 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-[var(--foreground)] flex items-center justify-center">
                        <Check strokeWidth={2.5} className="w-4 h-4 text-emerald-500" />
                      </div>
                      <span className="font-bold text-sm text-gray-600">
                        需要 SEO
                      </span>
                    </div>

                    <div
                      className="bg-blue-50 border-2 border-[var(--foreground)] rounded-xl p-5"
                      style={{ boxShadow: "6px 6px 0px 0px var(--foreground)" }}
                    >
                      <p
                        className="font-bold text-sm text-[var(--foreground)] mb-4"
                        style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
                      >
                        {decision.yes.next}
                      </p>
                      <div className="space-y-3">
                        {decision.yes.followUp.map((f) => (
                          <div
                            key={f.answer}
                            className={`${f.color} border-2 border-[var(--foreground)] rounded-lg px-4 py-3 flex items-center justify-between`}
                            style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
                          >
                            <div>
                              <span className="text-sm font-medium text-gray-700">
                                {f.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {f.icon}
                              <span
                                className="text-lg font-extrabold text-[var(--foreground)]"
                                style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
                              >
                                {f.answer}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ 关键洞察 & 总结 ════════════ */}
      <section className="container pb-16 md:pb-24">
        <div className="flex items-center gap-3 mb-8">
          <GeoBadge color="bg-purple-100" size="md">
            <TrendingUp strokeWidth={2.5} className="w-5 h-5 text-[var(--accent)]" />
          </GeoBadge>
          <h2
            className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
          >
            关键洞察
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              num: "01",
              color: "bg-purple-100",
              shadow: "8px 8px 0px 0px var(--accent)",
              title: "不是非此即彼",
              desc: "在同一个 Next.js 应用中，你可以对不同路由使用不同的渲染策略。产品列表用 ISR，用户中心用 CSR，博客用 SSG。",
            },
            {
              num: "02",
              color: "bg-pink-100",
              shadow: "8px 8px 0px 0px var(--secondary)",
              title: "RSC 是新范式",
              desc: "React Server Components 进一步模糊了 SSR 和 SSG 的边界。组件级别的渲染策略配置，让你在组件粒度上做出选择。",
            },
            {
              num: "03",
              color: "bg-yellow-100",
              shadow: "8px 8px 0px 0px var(--tertiary)",
              title: "测量驱动决策",
              desc: "不要凭直觉选择。使用 Lighthouse、Core Web Vitals 真实数据来验证你的渲染策略是否达到了预期效果。",
            },
            {
              num: "04",
              color: "bg-emerald-100",
              shadow: "8px 8px 0px 0px var(--quaternary)",
              title: "流式渲染崛起",
              desc: "Next.js App Router 的 Streaming SSR 和 Suspense 边界，让 SSR 也能实现渐进式内容呈现，大幅改善 TTFB 和感知性能。",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`${item.color} topic-card animate-slide p-6`}
              style={{
                boxShadow: item.shadow,
                animationDelay: `${i * 100}ms`,
              }}
            >
              <span
                className="text-5xl font-extrabold text-[var(--foreground)] opacity-10"
                style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
              >
                {item.num}
              </span>
              <h3
                className="text-xl font-extrabold text-[var(--foreground)] -mt-5 mb-3"
                style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
              >
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ 速查公式 ════════════ */}
      <section className="container pb-20 md:pb-28">
        <div
          className="topic-card p-6 md:p-10 text-center animate-pop"
          style={{ boxShadow: "8px 8px 0px 0px var(--foreground)" }}
        >
          <GeoBadge color="bg-[var(--tertiary)] bg-yellow-100" size="lg">
            <Gauge strokeWidth={2.5} className="w-7 h-7 text-[var(--tertiary)]" />
          </GeoBadge>
          <h2
            className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)] mt-4 mb-6"
            style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
          >
            一句话速记
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { title: "CSR", motto: "浏览器干活", color: "bg-purple-100", icon: <Monitor strokeWidth={2.5} className="w-5 h-5" /> },
              { title: "SSR", motto: "服务器实时算", color: "bg-pink-100", icon: <Server strokeWidth={2.5} className="w-5 h-5" /> },
              { title: "SSG", motto: "提前做好放 CDN", color: "bg-yellow-100", icon: <FileText strokeWidth={2.5} className="w-5 h-5" /> },
              { title: "ISR", motto: "先用缓存 后台更新", color: "bg-emerald-100", icon: <RefreshCw strokeWidth={2.5} className="w-5 h-5" /> },
            ].map((item) => (
              <div
                key={item.title}
                className={`${item.color} rounded-xl border-2 border-[var(--foreground)] p-4`}
                style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  {item.icon}
                  <span
                    className="text-xl font-extrabold text-[var(--foreground)]"
                    style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
                  >
                    {item.title}
                  </span>
                </div>
                <p className="text-sm text-gray-700 font-medium">
                  {item.motto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}