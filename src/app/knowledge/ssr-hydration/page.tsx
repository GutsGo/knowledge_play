"use client";

import { useState, useEffect, useCallback } from "react";
import { highlightCode } from "@/lib/prism-highlight";
import {
  Globe,
  Zap,
  Clock,
  Server,
  RefreshCw,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Layers,
  Timer,
  Database,
  Code2,
  BookOpen,
  Lightbulb,
  Shield,
  MonitorSmartphone,
  Gauge,
  RotateCcw,
  Users,
  MousePointerClick,
  Search,
  Package,
  Eye,
  Sparkles,
  CircleDot,
  Play,
  Pause,
  HardDrive,
  FileCode,
  TrendingUp,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   Code Block Component (Prism.js 高亮)
   ───────────────────────────────────────────────────────── */
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
      <pre className="p-5 overflow-x-auto text-sm leading-relaxed">
        <code
          className={`font-['JetBrains_Mono',monospace] text-[#E2E8F0] language-${language}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   流程图组件
   ───────────────────────────────────────────────────────── */
function FlowStep({
  icon: Icon,
  label,
  color,
  timing,
}: {
  icon: React.ElementType;
  label: string;
  color: string;
  timing?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
      <div
        className="w-11 h-11 rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center shadow-[3px_3px_0px_0px_var(--foreground)]"
        style={{ backgroundColor: color }}
      >
        <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
      </div>
      <span className="text-[11px] font-bold text-[var(--foreground)] text-center leading-tight max-w-[80px]">
        {label}
      </span>
      {timing && (
        <span className="text-[10px] font-['JetBrains_Mono',monospace] text-[var(--foreground)]/50 bg-[var(--border)] px-1.5 py-0.5 rounded-full whitespace-nowrap">
          {timing}
        </span>
      )}
    </div>
  );
}

function FlowArrow({ color }: { color?: string }) {
  return (
    <ArrowRight
      className="w-4 h-4 flex-shrink-0 mx-0.5"
      style={{ color: color || "var(--foreground)", opacity: 0.35 }}
      strokeWidth={2.5}
    />
  );
}

/* ─────────────────────────────────────────────────────────
   性能指标条组件
   ───────────────────────────────────────────────────────── */
function MetricBar({
  value,
  max,
  color,
  label,
}: {
  value: number;
  max: number;
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-[var(--foreground)] w-10 text-right font-['Plus_Jakarta_Sans']">
        {label}
      </span>
      <div className="flex-1 h-3 rounded-full bg-[var(--border)] overflow-hidden border border-[var(--foreground)]/10">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[11px] font-['JetBrains_Mono',monospace] text-[var(--foreground)]/60 w-12">
        {value <= max * 0.2 ? "⚡" : value <= max * 0.5 ? "✅" : "🐢"}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   代码示例常量
   ───────────────────────────────────────────────────────── */
const csrCode = `// app/dashboard/page.tsx
"use client"; // ← 标记为客户端组件，JS 在浏览器端执行

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⚠️ 页面初始加载时，用户看到的是空白/骨架屏
    // JS 下载+执行完毕后才开始请求数据
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(data => {
        setData(data);    // ← 拿到数据后才渲染内容
        setLoading(false);
      });
  }, []);

  if (loading) return <DashboardSkeleton />;
  return <StatsGrid data={data} />;
}`;

const ssrCode = `// app/products/[id]/page.tsx
// 不需要 "use client" — 默认是服务端组件 (Server Component)

async function getProduct(id: string) {
  const res = await fetch(
    \`https://api.store.com/products/\${id}\`,
    { cache: "no-store" } // ← 关键：禁止缓存，每次请求都获取最新数据
  );
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  // ✅ 服务端完成 HTML 渲染 → 浏览器收到即可见
  return (
    <article>
      <h1>{product.name}</h1>
      <p className="text-2xl font-bold">¥{product.price}</p>
      <p>{product.description}</p>
    </article>
  );
}`;

const ssgCode = `// app/blog/[slug]/page.tsx
async function getPost(slug: string) {
  const res = await fetch(
    \`https://cms.example.com/posts/\${slug}\`,
    { cache: "force-cache" } // ← 构建时缓存，后续复用静态文件
  );
  return res.json();
}

// ⚡ next build 时预生成所有路由的静态 HTML
export async function generateStaticParams() {
  const posts = await fetch("https://cms.example.com/posts")
    .then(r => r.json());
  return posts.map((post: { slug: string }) => ({
    slug: post.slug, // ← 每个 slug 生成一个 .html 文件
  }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.publishedAt}</time>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}`;

const isrCode = `// app/products/page.tsx
async function getProducts() {
  const res = await fetch("https://api.store.com/products", {
    next: { revalidate: 60 }, // ← 60 秒后过期
  });
  // ↑ 过期后首个请求仍返回旧页面 (stale-while-revalidate)
  //   同时后台触发重新生成
  //   后续请求就能拿到最新页面
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  const generatedAt = new Date().toLocaleTimeString("zh-CN");

  return (
    <div>
      <p className="text-xs text-gray-400">
        ⏱️ 页面生成时间: {generatedAt}
      </p>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p: { id: string; name: string }) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}`;

const streamingCode = `// app/dashboard/page.tsx
import { Suspense } from "react";

// 快速数据源（~50ms）
async function UserHeader() {
  const user = await fetch("/api/user", {
    cache: "no-store",
  }).then(r => r.json());
  return <header>👋 欢迎, {user.name}</header>;
}

// 慢速数据源（~2000ms）
async function AnalyticsChart() {
  const data = await fetch("/api/analytics", {
    cache: "no-store",
  }).then(r => r.json());
  return <Chart data={data} />;
}

export default function Dashboard() {
  return (
    <div>
      {/* ✅ 先渲染，用户立刻看到 */}
      <UserHeader />

      {/* 慢速部分用 Suspense 包裹，不阻塞上面的渲染 */}
      <Suspense fallback={<ChartSkeleton />}>
        <AnalyticsChart />
      </Suspense>
      {/* ↑ 浏览器收到 UserHeader 的 HTML 后立即显示
         AnalyticsChart 加载完成后以流式追加到页面 */}
    </div>
  );
}`;

const parallelCode = `// ❌ 反模式：串行请求 — 总耗时 300+200+150 = 650ms
async function getPageData_Slow() {
  const user  = await fetchUser();   // 300ms ← 等完才继续
  const posts = await fetchPosts();  // 200ms
  const ads   = await fetchAds();    // 150ms
  return { user, posts, ads };
}

// ✅ 正确：并行请求 — 总耗时 = max(300,200,150) = 300ms
async function getPageData_Fast() {
  const [user, posts, ads] = await Promise.all([
    fetchUser(),   // ← 三个请求同时发出
    fetchPosts(),
    fetchAds(),
  ]);
  return { user, posts, ads };
}`;

/* ─────────────────────────────────────────────────────────
   策略数据
   ───────────────────────────────────────────────────────── */
type StrategyId = "csr" | "ssr" | "ssg" | "isr";

interface Strategy {
  id: StrategyId;
  name: string;
  fullName: string;
  color: string;
  colorLight: string;
  icon: React.ElementType;
  analogy: string;
  steps: { icon: React.ElementType; label: string; timing?: string }[];
  ttfb: number;
  fcp: number;
  tti: number;
  seo: number;
  freshness: number;
  useCase: string;
  code: string;
  codeTitle: string;
  pros: string[];
  cons: string[];
}

const STRATEGIES: Record<StrategyId, Strategy> = {
  csr: {
    id: "csr",
    name: "CSR",
    fullName: "Client-Side Rendering",
    color: "#8B5CF6",
    colorLight: "#EDE9FE",
    icon: MonitorSmartphone,
    analogy: "给你食材和菜谱，自己动手在餐桌上做",
    steps: [
      { icon: FileCode, label: "返回空 HTML 壳" },
      { icon: Package, label: "下载 JS Bundle", timing: "~1MB" },
      { icon: Code2, label: "执行 JavaScript" },
      { icon: Database, label: "请求 API 数据" },
      { icon: MonitorSmartphone, label: "客户端渲染内容" },
    ],
    ttfb: 50,
    fcp: 1500,
    tti: 2500,
    seo: 10,
    freshness: 100,
    useCase: "管理后台、用户仪表盘、交互密集型应用",
    code: csrCode,
    codeTitle: "dashboard/page.tsx — CSR",
    pros: [
      "丰富的客户端交互体验",
      "页面切换无需整页刷新 (SPA)",
      "服务器压力极小，可纯静态托管",
    ],
    cons: [
      "首屏白屏 1~3 秒（JS 下载+执行）",
      "SEO 几乎为零（爬虫拿到空壳）",
      "JS 禁用时页面完全不可用",
    ],
  },
  ssr: {
    id: "ssr",
    name: "SSR",
    fullName: "Server-Side Rendering",
    color: "#F472B6",
    colorLight: "#FCE7F3",
    icon: Server,
    analogy: "你点单后厨房现做，等一会儿上热菜",
    steps: [
      { icon: Globe, label: "浏览器发起请求" },
      { icon: Server, label: "服务器接收" },
      { icon: Database, label: "服务端请求 API", timing: "200~500ms" },
      { icon: Code2, label: "服务端渲染 HTML" },
      { icon: Globe, label: "返回完整 HTML" },
      { icon: Zap, label: "客户端 Hydrate" },
    ],
    ttfb: 400,
    fcp: 500,
    tti: 900,
    seo: 95,
    freshness: 100,
    useCase: "电商商品页、搜索结果页、个性化内容页",
    code: ssrCode,
    codeTitle: "products/[id]/page.tsx — SSR",
    pros: [
      "首屏即完整 HTML，SEO 友好",
      "数据实时，每次请求都是最新",
      "支持 Streaming SSR 渐进式渲染",
    ],
    cons: [
      "TTFB 受服务器响应速度影响",
      "每次请求都要服务端计算，服务器压力大",
      "需要 Node.js 服务器，不能纯 CDN 部署",
    ],
  },
  ssg: {
    id: "ssg",
    name: "SSG",
    fullName: "Static Site Generation",
    color: "#34D399",
    colorLight: "#D1FAE5",
    icon: HardDrive,
    analogy: "餐厅早上预做好热门菜品，来了直接端上桌",
    steps: [
      { icon: Clock, label: "构建时 (Build)", timing: "next build" },
      { icon: Database, label: "请求所有数据" },
      { icon: FileCode, label: "生成静态 HTML 文件" },
      { icon: HardDrive, label: "部署到 CDN" },
      { icon: Globe, label: "用户请求 → CDN 直接返回", timing: "~50ms" },
    ],
    ttfb: 30,
    fcp: 120,
    tti: 350,
    seo: 95,
    freshness: 10,
    useCase: "博客、文档站、营销页面、任何不常更新的内容",
    code: ssgCode,
    codeTitle: "blog/[slug]/page.tsx — SSG",
    pros: [
      "极致速度：TTFB < 50ms，CDN 边缘命中",
      "零服务器开销，可无限扩展",
      "天然安全，无服务器运行时漏洞",
    ],
    cons: [
      "内容在构建时冻结，更新需重新部署",
      "大量页面时构建时间长（1000页 ≈ 5~10分钟）",
      "不适合个性化/实时数据场景",
    ],
  },
  isr: {
    id: "isr",
    name: "ISR",
    fullName: "Incremental Static Regeneration",
    color: "#FBBF24",
    colorLight: "#FEF3C7",
    icon: RefreshCw,
    analogy: "自动补货的自助餐——定期更新菜品，不会断供",
    steps: [
      { icon: Globe, label: "首次请求" },
      { icon: HardDrive, label: "CDN 返回缓存页", timing: "~30ms" },
      { icon: Timer, label: "检查：是否超过 revalidate?" },
      { icon: RefreshCw, label: "后台静默重新生成", timing: "用户无感" },
      { icon: HardDrive, label: "新页面替换旧缓存" },
    ],
    ttfb: 30,
    fcp: 120,
    tti: 350,
    seo: 95,
    freshness: 75,
    useCase: "电商产品列表、新闻首页、排行榜",
    code: isrCode,
    codeTitle: "products/page.tsx — ISR",
    pros: [
      "兼具 SSG 的速度 + 数据新鲜度",
      "按需重新生成，无需全量重建",
      "Stale-While-Revalidate 策略：过期仍可用",
    ],
    cons: [
      "revalidate 期间用户可能看到旧数据",
      "首次请求（冷启动）仍需等待生成",
      "分布式部署时缓存一致性需注意",
    ],
  },
};

/* ─────────────────────────────────────────────────────────
   ISR 交互式实验场组件
   ───────────────────────────────────────────────────────── */
function ISRPlayground() {
  const [revalidate, setRevalidate] = useState(15);
  const [remaining, setRemaining] = useState(15);
  const [status, setStatus] = useState<"fresh" | "stale" | "regenerating">(
    "fresh",
  );
  const [isRunning, setIsRunning] = useState(true);
  const [visits, setVisits] = useState<
    { id: number; source: string; time: string }[]
  >([]);
  const [visitId, setVisitId] = useState(0);

  useEffect(() => {
    if (!isRunning || status === "regenerating") return;
    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setStatus("stale");
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, status]);

  const handleRevalidateChange = useCallback(
    (val: number) => {
      setRevalidate(val);
      if (status === "fresh") {
        setRemaining(val);
        setIsRunning(true);
      }
    },
    [status],
  );

  const handleVisit = useCallback(() => {
    const now = new Date().toLocaleTimeString("zh-CN");
    setVisitId((id) => id + 1);
    if (status === "stale") {
      setStatus("regenerating");
      setVisits((v) => [
        {
          id: visitId + 1,
          source: "旧缓存 (stale) + 后台重新生成中",
          time: now,
        },
        ...v.slice(0, 4),
      ]);
      setTimeout(() => {
        setStatus("fresh");
        setRemaining(revalidate);
        setIsRunning(true);
      }, 2000);
    } else if (status === "regenerating") {
      setVisits((v) => [
        { id: visitId + 1, source: "旧缓存 (后台仍在生成)", time: now },
        ...v.slice(0, 4),
      ]);
    } else {
      setVisits((v) => [
        { id: visitId + 1, source: "CDN 缓存命中 ✨", time: now },
        ...v.slice(0, 4),
      ]);
    }
  }, [status, revalidate, visitId]);

  const handleReset = useCallback(() => {
    setStatus("fresh");
    setRemaining(revalidate);
    setIsRunning(true);
    setVisits([]);
    setVisitId(0);
  }, [revalidate]);

  const pct = (remaining / revalidate) * 100;
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="border-2 border-[var(--foreground)] rounded-3xl bg-[var(--card)] shadow-[8px_8px_0px_0px_var(--tertiary)] overflow-hidden">
      {/* 标题栏 */}
      <div className="flex items-center gap-3 px-6 py-4 bg-[#FEF3C7] border-b-2 border-[var(--foreground)]">
        <div className="w-8 h-8 rounded-lg bg-[var(--tertiary)] border-2 border-[var(--foreground)] flex items-center justify-center">
          <RefreshCw className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="font-['Outfit',sans-serif] font-bold text-[var(--foreground)] text-lg">
            ISR 实验场
          </h3>
          <p className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans']">
            拖动滑块设置 revalidate 周期，观察页面缓存行为
          </p>
        </div>
      </div>

      <div className="p-6 grid md:grid-cols-[1fr_auto_1fr] gap-6 items-start">
        {/* 左侧：控制面板 + 圆环计时器 */}
        <div className="flex flex-col items-center gap-5">
          {/* Revalidate 滑块 */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans']">
                revalidate
              </span>
              <span className="font-['JetBrains_Mono',monospace] text-sm font-bold text-[var(--tertiary)] bg-[var(--tertiary)]/10 px-2 py-0.5 rounded-full border border-[var(--tertiary)]/30">
                {revalidate}s
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              value={revalidate}
              onChange={(e) => handleRevalidateChange(parseInt(e.target.value))}
              className="w-full h-2 rounded-full appearance-none bg-[var(--border)] cursor-pointer accent-[var(--tertiary)]"
            />
          </div>

          {/* 圆环计时器 */}
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="var(--border)"
                strokeWidth="6"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={
                  status === "fresh"
                    ? "#34D399"
                    : status === "stale"
                      ? "#EF4444"
                      : "#FBBF24"
                }
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-['JetBrains_Mono',monospace] text-2xl font-bold text-[var(--foreground)]">
                {remaining}
              </span>
              <span className="text-[10px] text-[var(--foreground)]/50 font-bold">
                秒
              </span>
            </div>
          </div>

          {/* 状态指示 */}
          <div
            className={`px-4 py-2 rounded-xl border-2 border-[var(--foreground)] font-bold text-sm font-['Plus_Jakarta_Sans'] shadow-[3px_3px_0px_0px_var(--foreground)] ${
              status === "fresh"
                ? "bg-[#D1FAE5] text-[#065F46]"
                : status === "stale"
                  ? "bg-[#FEE2E2] text-[#991B1B]"
                  : "bg-[#FEF3C7] text-[#92400E]"
            }`}
          >
            {status === "fresh" && "✅ 页面新鲜 — 缓存有效"}
            {status === "stale" && "⚠️ 已过期 — 下次访问触发重新生成"}
            {status === "regenerating" && "🔄 后台重新生成中..."}
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3 w-full">
            <button
              onClick={handleVisit}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--foreground)] text-white rounded-xl border-2 border-[var(--foreground)] font-bold text-sm shadow-[4px_4px_0px_0px_var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
            >
              <MousePointerClick className="w-4 h-4" strokeWidth={2.5} />
              访问页面
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-3 bg-[var(--card)] text-[var(--foreground)] rounded-xl border-2 border-[var(--foreground)] font-bold text-sm shadow-[4px_4px_0px_0px_var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="hidden md:block w-px h-full bg-[var(--border)]" />

        {/* 右侧：访问日志 */}
        <div>
          <h4 className="font-['Outfit',sans-serif] font-bold text-[var(--foreground)] mb-3 flex items-center gap-2">
            <Eye className="w-4 h-4" strokeWidth={2.5} />
            访问日志
          </h4>
          {visits.length === 0 ? (
            <div className="text-center py-10 text-[var(--foreground)]/30">
              <Users className="w-8 h-8 mx-auto mb-2" strokeWidth={2} />
              <p className="text-sm font-['Plus_Jakarta_Sans']">
                点击「访问页面」模拟用户请求
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[280px] overflow-y-auto">
              {visits.map((v) => (
                <div
                  key={v.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[var(--background)] border border-[var(--border)]"
                >
                  <span className="w-6 h-6 rounded-full bg-[var(--foreground)] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {v.id}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--foreground)] font-['Plus_Jakarta_Sans']">
                      {v.source}
                    </p>
                    <p className="text-[11px] text-[var(--foreground)]/40 font-['JetBrains_Mono',monospace]">
                      {v.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 底部提示 */}
          <div className="mt-4 p-3 rounded-xl bg-[var(--tertiary)]/5 border border-[var(--tertiary)]/20">
            <p className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] leading-relaxed">
              <strong>💡 观察要点：</strong>当倒计时归零后访问页面，ISR
              会先返回旧缓存（用户无感知），同时后台重新生成。新页面会在下次请求时生效——这就是
              <strong>Stale-While-Revalidate</strong> 策略。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   主页面组件
   ───────────────────────────────────────────────────────── */
export default function RenderingStrategiesPage() {
  const [activeTab, setActiveTab] = useState<StrategyId>("ssr");
  const strategy = STRATEGIES[activeTab];

  return (
    <div className="bg-dot-grid min-h-screen">
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative overflow-hidden">
        {/* 装饰 Blob */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 opacity-10 pointer-events-none"
          style={{
            backgroundColor: "var(--accent)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 opacity-10 pointer-events-none"
          style={{
            backgroundColor: "var(--secondary)",
            borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
          }}
        />

        <div className="container py-20 md:py-28 relative z-10">
          {/* 标签 */}
          <div className="animate-pop inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[var(--accent)]/10 border-2 border-[var(--accent)] rounded-full shadow-[4px_4px_0px_0px_var(--accent)]">
            <Layers
              className="w-4 h-4 text-[var(--accent)]"
              strokeWidth={2.5}
            />
            <span className="text-sm font-bold text-[var(--accent)] font-['Plus_Jakarta_Sans'] uppercase tracking-wider">
              渲染策略
            </span>
          </div>

          {/* 主标题 */}
          <h1 className="animate-pop font-['Outfit',sans-serif] text-4xl md:text-6xl lg:text-7xl font-extrabold text-[var(--foreground)] leading-[1.1] mb-6">
            CSR · SSR · SSG · ISR
            <br />
            <span className="text-[var(--accent)]">四大渲染策略全解</span>
          </h1>

          {/* 副标题 — 直觉锚点 (L1) */}
          <p className="animate-slide max-w-2xl text-lg md:text-xl text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] leading-relaxed mb-10">
            选择渲染策略就像选择餐厅的出餐方式：是现做、预做、还是自助？
            不同场景需要不同的策略，理解它们的差异是构建高性能 Web 应用的基石。
          </p>

          {/* 四策略速览卡片 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide">
            {(Object.values(STRATEGIES) as Strategy[]).map((s) => (
              <div
                key={s.id}
                className="topic-card p-4 rounded-2xl cursor-pointer transition-transform"
                onClick={() => setActiveTab(s.id)}
                style={{
                  borderColor: activeTab === s.id ? s.color : "var(--border)",
                  borderWidth: activeTab === s.id ? "3px" : "2px",
                  backgroundColor:
                    activeTab === s.id ? s.colorLight : "var(--card)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center mb-3 shadow-[3px_3px_0px_0px_var(--foreground)]"
                  style={{ backgroundColor: s.color }}
                >
                  <s.icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="font-['Outfit',sans-serif] font-extrabold text-[var(--foreground)] text-lg">
                  {s.name}
                </h3>
                <p className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans'] mt-0.5">
                  {s.fullName}
                </p>
                <p className="text-sm text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] mt-2 leading-snug">
                  {s.analogy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ L2: 为什么需要？ ═══════════════════ */}
      <section className="container py-16 md:py-24">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--secondary)] border-2 border-[var(--foreground)] flex items-center justify-center shadow-[3px_3px_0px_0px_var(--foreground)]">
            <BookOpen className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xs font-bold text-[var(--secondary)] uppercase tracking-widest font-['Plus_Jakarta_Sans']">
            L2 · 为什么需要？
          </span>
        </div>
        <h2 className="font-['Outfit',sans-serif] text-3xl md:text-4xl font-extrabold text-[var(--foreground)] mb-4">
          从「纯静态」到「智能混合」的演进之路
        </h2>
        <p className="max-w-2xl text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-10 leading-relaxed">
          Web 渲染不是一道单选题。每种策略都是在
          <strong>速度、新鲜度、SEO、交互性</strong>
          之间做权衡。理解痛点，才能选对方案。
        </p>

        {/* 时间线 */}
        <div className="relative pl-8 md:pl-12 space-y-8">
          {/* 连接线 */}
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-0.5 bg-[var(--border)]" />

          {[
            {
              era: "1990s — 静态时代",
              title: "纯 HTML 文件",
              desc: "每个页面都是提前写好的 .html 文件，速度极快但无法动态更新。每次改内容都需要手动上传文件。",
              color: "var(--quaternary)",
              icon: FileCode,
            },
            {
              era: "2000s — 服务端时代",
              title: "PHP/JSP 服务端渲染",
              desc: "服务器收到请求后执行代码、查数据库、拼 HTML。每次请求都重复整个过程——100 个并发就要算 100 次。",
              color: "var(--secondary)",
              icon: Server,
            },
            {
              era: "2010s — 客户端革命",
              title: "SPA / CSR 大行其道",
              desc: "React/Vue 兴起，浏览器接管一切。交互丝滑了，但首屏白屏 3 秒、SEO 全军覆没。Lighthouse SEO 评分经常 0/100。",
              color: "var(--accent)",
              icon: MonitorSmartphone,
            },
            {
              era: "2020s — 混合渲染",
              title: "SSG / ISR / Streaming SSR",
              desc: "Next.js 等框架将选择权交给开发者：同一应用中可以混合使用多种策略，按页面粒度选择最优方案。",
              color: "var(--tertiary)",
              icon: Sparkles,
            },
          ].map((item, i) => (
            <div key={i} className="relative flex gap-4 md:gap-6 animate-slide">
              {/* 时间线节点 */}
              <div
                className="absolute -left-5 md:-left-7 w-5 h-5 rounded-full border-2 border-[var(--foreground)] z-10"
                style={{ backgroundColor: item.color }}
              />
              {/* 卡片 */}
              <div className="topic-card ml-4 md:ml-6 p-5 rounded-2xl flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <item.icon
                    className="w-5 h-5"
                    style={{ color: item.color }}
                    strokeWidth={2.5}
                  />
                  <span className="text-xs font-bold text-[var(--foreground)]/50 uppercase tracking-wider font-['Plus_Jakarta_Sans']">
                    {item.era}
                  </span>
                </div>
                <h3 className="font-['Outfit',sans-serif] font-bold text-[var(--foreground)] text-xl mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 痛点总结 */}
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {[
            {
              icon: Clock,
              title: "速度痛点",
              desc: "CSR 白屏 3 秒 = 53% 用户流失（Google 数据）",
              color: "var(--accent)",
            },
            {
              icon: Search,
              title: "SEO 痛点",
              desc: "CSR 页面的搜索引擎可见内容为零字节",
              color: "var(--secondary)",
            },
            {
              icon: Gauge,
              title: "成本痛点",
              desc: "SSR 每请求都需服务端计算，10K QPS = 巨额账单",
              color: "var(--tertiary)",
            },
          ].map((pain, i) => (
            <div
              key={i}
              className="topic-card p-5 rounded-2xl border-l-4"
              style={{ borderLeftColor: pain.color }}
            >
              <pain.icon
                className="w-6 h-6 mb-3"
                style={{ color: pain.color }}
                strokeWidth={2.5}
              />
              <h4 className="font-['Outfit',sans-serif] font-bold text-[var(--foreground)] mb-1">
                {pain.title}
              </h4>
              <p className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans']">
                {pain.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ L3: 核心原理 — 交互式策略探索器 ═══════════════════ */}
      <section className="container py-16 md:py-24">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)] border-2 border-[var(--foreground)] flex items-center justify-center shadow-[3px_3px_0px_0px_var(--foreground)]">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest font-['Plus_Jakarta_Sans']">
            L3 · 核心原理
          </span>
        </div>
        <h2 className="font-['Outfit',sans-serif] text-3xl md:text-4xl font-extrabold text-[var(--foreground)] mb-4">
          选择一种策略，观察它的运作方式
        </h2>
        <p className="max-w-2xl text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-10 leading-relaxed">
          点击下方标签切换不同渲染策略，观察数据流、性能指标和对应代码的差异。
        </p>

        {/* 策略标签栏 */}
        <div className="flex flex-wrap gap-3 mb-8">
          {(Object.values(STRATEGIES) as Strategy[]).map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-[var(--foreground)] font-bold text-sm font-['Outfit',sans-serif] transition-all ${
                activeTab === s.id
                  ? "text-white shadow-[4px_4px_0px_0px_var(--foreground)] translate-x-0 translate-y-0"
                  : "text-[var(--foreground)] bg-[var(--card)] shadow-[4px_4px_0px_0px_var(--border)] hover:shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px]"
              }`}
              style={
                activeTab === s.id ? { backgroundColor: s.color } : undefined
              }
            >
              <s.icon className="w-4 h-4" strokeWidth={2.5} />
              {s.name}
              <span className="text-[10px] opacity-70 hidden sm:inline">
                {s.fullName}
              </span>
            </button>
          ))}
        </div>

        {/* 策略详情面板 */}
        <div
          key={activeTab}
          className="animate-pop border-2 border-[var(--foreground)] rounded-3xl bg-[var(--card)] overflow-hidden shadow-[8px_8px_0px_0px_var(--foreground)]"
        >
          {/* 面板头部 */}
          <div
            className="px-6 py-5 border-b-2 border-[var(--foreground)] flex flex-col md:flex-row md:items-center gap-4"
            style={{ backgroundColor: strategy.colorLight }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl border-2 border-[var(--foreground)] flex items-center justify-center shadow-[4px_4px_0px_0px_var(--foreground)]"
                style={{ backgroundColor: strategy.color }}
              >
                <strategy.icon
                  className="w-7 h-7 text-white"
                  strokeWidth={2.5}
                />
              </div>
              <div>
                <h3 className="font-['Outfit',sans-serif] font-extrabold text-2xl text-[var(--foreground)]">
                  {strategy.fullName}
                </h3>
                <p className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                  <span className="text-lg">🍽️</span>
                  {strategy.analogy}
                </p>
              </div>
            </div>
            <div className="md:ml-auto px-4 py-2 rounded-xl bg-white/60 border border-[var(--foreground)]/10">
              <span className="text-xs font-bold text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
                适用场景
              </span>
              <p className="text-sm font-semibold text-[var(--foreground)] font-['Plus_Jakarta_Sans']">
                {strategy.useCase}
              </p>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* 流程图 */}
            <div>
              <h4 className="font-['Outfit',sans-serif] font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                数据流
              </h4>
              <div className="overflow-x-auto pb-2">
                <div className="flex items-center gap-0 min-w-max px-2">
                  {strategy.steps.map((step, i) => (
                    <div key={i} className="flex items-center">
                      <FlowStep
                        icon={step.icon}
                        label={step.label}
                        color={strategy.color}
                        timing={step.timing}
                      />
                      {i < strategy.steps.length - 1 && (
                        <FlowArrow color={strategy.color} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 性能指标 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-['Outfit',sans-serif] font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <Gauge className="w-4 h-4" strokeWidth={2.5} />
                  性能指标
                </h4>
                <div className="space-y-3">
                  <MetricBar
                    value={strategy.ttfb}
                    max={500}
                    color={strategy.color}
                    label="TTFB"
                  />
                  <MetricBar
                    value={strategy.fcp}
                    max={2000}
                    color={strategy.color}
                    label="FCP"
                  />
                  <MetricBar
                    value={strategy.tti}
                    max={3000}
                    color={strategy.color}
                    label="TTI"
                  />
                </div>
                <div className="flex gap-4 mt-3 text-[10px] text-[var(--foreground)]/40 font-['Plus_Jakarta_Sans']">
                  <span>TTFB = 首字节时间</span>
                  <span>FCP = 首次内容绘制</span>
                  <span>TTI = 可交互时间</span>
                </div>
              </div>

              <div>
                <h4 className="font-['Outfit',sans-serif] font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4" strokeWidth={2.5} />
                  关键评分
                </h4>
                <div className="space-y-3">
                  <MetricBar
                    value={strategy.seo}
                    max={100}
                    color={strategy.color}
                    label="SEO"
                  />
                  <MetricBar
                    value={strategy.freshness}
                    max={100}
                    color={strategy.color}
                    label="新鲜度"
                  />
                </div>
                {/* 优缺点 */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-[var(--quaternary)] uppercase tracking-wider font-['Plus_Jakarta_Sans']">
                      ✅ 优势
                    </span>
                    {strategy.pros.map((p, i) => (
                      <p
                        key={i}
                        className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] flex items-start gap-1"
                      >
                        <CheckCircle2
                          className="w-3 h-3 text-[var(--quaternary)] mt-0.5 flex-shrink-0"
                          strokeWidth={2.5}
                        />
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-[var(--secondary)] uppercase tracking-wider font-['Plus_Jakarta_Sans']">
                      ⚠️ 劣势
                    </span>
                    {strategy.cons.map((c, i) => (
                      <p
                        key={i}
                        className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] flex items-start gap-1"
                      >
                        <AlertTriangle
                          className="w-3 h-3 text-[var(--secondary)] mt-0.5 flex-shrink-0"
                          strokeWidth={2.5}
                        />
                        {c}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 代码示例 */}
            <div>
              <h4 className="font-['Outfit',sans-serif] font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4" strokeWidth={2.5} />
                Next.js 实现
              </h4>
              <CodeBlock
                code={strategy.code}
                language="typescript"
                title={strategy.codeTitle}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ L3 交互实验场: ISR Playground ═══════════════════ */}
      <section className="container py-16 md:py-24">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--tertiary)] border-2 border-[var(--foreground)] flex items-center justify-center shadow-[3px_3px_0px_0px_var(--foreground)]">
            <MousePointerClick
              className="w-4 h-4 text-white"
              strokeWidth={2.5}
            />
          </div>
          <span className="text-xs font-bold text-[var(--tertiary)] uppercase tracking-widest font-['Plus_Jakarta_Sans']">
            交互实验场
          </span>
        </div>
        <h2 className="font-['Outfit',sans-serif] text-3xl md:text-4xl font-extrabold text-[var(--foreground)] mb-4">
          亲手体验 ISR 的缓存与重新生成
        </h2>
        <p className="max-w-2xl text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-10 leading-relaxed">
          调整{" "}
          <code className="font-['JetBrains_Mono',monospace] text-sm bg-[var(--tertiary)]/10 px-1.5 py-0.5 rounded border border-[var(--tertiary)]/30 text-[var(--tertiary)]">
            revalidate
          </code>{" "}
          参数，观察缓存过期和后台重新生成的全过程。
        </p>

        <ISRPlayground />
      </section>

      {/* ═══════════════════ L4: 代码实战 ═══════════════════ */}
      <section className="container py-16 md:py-24">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--quaternary)] border-2 border-[var(--foreground)] flex items-center justify-center shadow-[3px_3px_0px_0px_var(--foreground)]">
            <Code2 className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xs font-bold text-[var(--quaternary)] uppercase tracking-widest font-['Plus_Jakarta_Sans']">
            L4 · 代码实战
          </span>
        </div>
        <h2 className="font-['Outfit',sans-serif] text-3xl md:text-4xl font-extrabold text-[var(--foreground)] mb-4">
          进阶模式：Streaming & 并行请求
        </h2>
        <p className="max-w-2xl text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-10 leading-relaxed">
          掌握基础策略后，这两个模式能让你的 SSR 性能再上一个台阶。
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Streaming SSR */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--secondary)] border-2 border-[var(--foreground)] flex items-center justify-center shadow-[3px_3px_0px_0px_var(--foreground)]">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-['Outfit',sans-serif] font-bold text-[var(--foreground)] text-xl">
                  Streaming SSR
                </h3>
                <p className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
                  用 Suspense 实现渐进式渲染
                </p>
              </div>
            </div>
            <div className="topic-card p-4 rounded-2xl space-y-2">
              <p className="text-sm text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] leading-relaxed">
                <strong>核心思路：</strong>将慢速数据源用{" "}
                <code className="font-['JetBrains_Mono',monospace] text-xs bg-[var(--secondary)]/10 px-1 rounded text-[var(--secondary)]">
                  {"<Suspense>"}
                </code>{" "}
                包裹。快速部分（如用户头像）先发送到浏览器，慢速部分（如分析图表）完成后再流式追加。
              </p>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="p-3 rounded-xl bg-[#FEE2E2] border border-red-200">
                  <p className="text-xs font-bold text-red-600 font-['Plus_Jakarta_Sans'] mb-1">
                    ❌ 无 Streaming
                  </p>
                  <p className="text-xs text-red-500/70 font-['JetBrains_Mono',monospace]">
                    TTFB = 50 + 2000 = 2050ms
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#D1FAE5] border border-green-200">
                  <p className="text-xs font-bold text-green-700 font-['Plus_Jakarta_Sans'] mb-1">
                    ✅ 有 Streaming
                  </p>
                  <p className="text-xs text-green-600/70 font-['JetBrains_Mono',monospace]">
                    TTFB = 50ms（图表后到）
                  </p>
                </div>
              </div>
            </div>
            <CodeBlock
              code={streamingCode}
              language="tsx"
              title="dashboard/page.tsx — Streaming SSR"
            />
          </div>

          {/* Parallel Fetching */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)] border-2 border-[var(--foreground)] flex items-center justify-center shadow-[3px_3px_0px_0px_var(--foreground)]">
                <Layers className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-['Outfit',sans-serif] font-bold text-[var(--foreground)] text-xl">
                  并行数据获取
                </h3>
                <p className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
                  用 Promise.all 消灭串行等待
                </p>
              </div>
            </div>
            <div className="topic-card p-4 rounded-2xl space-y-2">
              <p className="text-sm text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] leading-relaxed">
                <strong>核心问题：</strong>在服务端组件中写多个{" "}
                <code className="font-['JetBrains_Mono',monospace] text-xs bg-[var(--accent)]/10 px-1 rounded text-[var(--accent)]">
                  await fetch()
                </code>{" "}
                时，如果顺序执行（串行），总耗时是所有请求之和。改为并行后，总耗时
                = 最慢请求的时间。
              </p>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="p-3 rounded-xl bg-[#FEE2E2] border border-red-200">
                  <p className="text-xs font-bold text-red-600 font-['Plus_Jakarta_Sans'] mb-1">
                    ❌ 串行
                  </p>
                  <p className="text-xs text-red-500/70 font-['JetBrains_Mono',monospace]">
                    300 + 200 + 150 = 650ms
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#D1FAE5] border border-green-200">
                  <p className="text-xs font-bold text-green-700 font-['Plus_Jakarta_Sans'] mb-1">
                    ✅ 并行
                  </p>
                  <p className="text-xs text-green-600/70 font-['JetBrains_Mono',monospace]">
                    max(300,200,150) = 300ms
                  </p>
                </div>
              </div>
            </div>
            <CodeBlock
              code={parallelCode}
              language="typescript"
              title="串行 vs 并行数据获取"
            />
          </div>
        </div>

        {/* Next.js Fetch API 速查 */}
        <div className="mt-10 topic-card p-6 rounded-2xl">
          <h3 className="font-['Outfit',sans-serif] font-bold text-[var(--foreground)] text-xl mb-4 flex items-center gap-2">
            <FileCode
              className="w-5 h-5 text-[var(--accent)]"
              strokeWidth={2.5}
            />
            Next.js App Router — Fetch 选项速查
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "SSR",
                option: 'cache: "no-store"',
                desc: "每次请求都获取最新数据",
                color: "var(--secondary)",
              },
              {
                label: "SSG",
                option: 'cache: "force-cache"',
                desc: "构建时缓存，后续复用",
                color: "var(--quaternary)",
              },
              {
                label: "ISR",
                option: "next: { revalidate: 60 }",
                desc: "60 秒后过期，后台重新生成",
                color: "var(--tertiary)",
              },
              {
                label: "CSR",
                option: '"use client" + useEffect',
                desc: "浏览器端发起请求",
                color: "var(--accent)",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)]"
                style={{
                  backgroundColor: `color-mix(in srgb, ${item.color} 8%, white)`,
                }}
              >
                <span
                  className="inline-block px-2 py-0.5 rounded-md text-white text-xs font-bold mb-2 border border-white/20"
                  style={{ backgroundColor: item.color }}
                >
                  {item.label}
                </span>
                <pre className="bg-[var(--foreground)] text-[var(--background)] text-xs p-2 rounded-lg font-['JetBrains_Mono',monospace] mb-2 overflow-x-auto">
                  {item.option}
                </pre>
                <p className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans']">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ L5: 工程全景 ═══════════════════ */}
      <section className="container py-16 md:py-24">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--foreground)] border-2 border-[var(--foreground)] flex items-center justify-center shadow-[3px_3px_0px_0px_var(--foreground)]">
            <Shield className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xs font-bold text-[var(--foreground)] uppercase tracking-widest font-['Plus_Jakarta_Sans']">
            L5 · 工程全景
          </span>
        </div>
        <h2 className="font-['Outfit',sans-serif] text-3xl md:text-4xl font-extrabold text-[var(--foreground)] mb-4">
          决策框架与生产级考量
        </h2>
        <p className="max-w-2xl text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-10 leading-relaxed">
          掌握「什么时候用什么」比「怎么用」更重要。
        </p>

        {/* ── 决策树 ── */}
        <div className="topic-card p-6 md:p-8 rounded-3xl mb-10">
          <h3 className="font-['Outfit',sans-serif] font-bold text-[var(--foreground)] text-xl mb-6 flex items-center gap-2">
            <Lightbulb
              className="w-5 h-5 text-[var(--tertiary)]"
              strokeWidth={2.5}
            />
            渲染策略决策树
          </h3>
          <div className="space-y-4 font-['Plus_Jakarta_Sans'] text-sm">
            {/* Q1 */}
            <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]">
              <p className="font-bold text-[var(--foreground)] mb-3">
                🔍 你的页面需要被搜索引擎收录吗？
              </p>
              <div className="grid md:grid-cols-2 gap-3 ml-4">
                {/* Yes */}
                <div className="p-3 rounded-lg bg-[#D1FAE5] border border-green-200">
                  <p className="font-bold text-green-700 mb-2">✅ 需要 SEO</p>
                  <p className="text-[var(--foreground)]/70 mb-2">
                    数据多久更新一次？
                  </p>
                  <div className="space-y-2 ml-3">
                    <div className="flex items-start gap-2">
                      <span className="text-xs">⚡</span>
                      <span>
                        <strong>实时 / 每次请求最新</strong> →{" "}
                        <span className="px-2 py-0.5 rounded-md bg-[var(--secondary)] text-white text-xs font-bold">
                          SSR
                        </span>
                        <span className="text-[var(--foreground)]/50 text-xs">
                          {" "}
                          + Streaming
                        </span>
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs">🕐</span>
                      <span>
                        <strong>分钟/小时间隔</strong> →{" "}
                        <span className="px-2 py-0.5 rounded-md bg-[var(--tertiary)] text-[var(--foreground)] text-xs font-bold">
                          ISR
                        </span>
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs">📄</span>
                      <span>
                        <strong>很少 / 从不更新</strong> →{" "}
                        <span className="px-2 py-0.5 rounded-md bg-[var(--quaternary)] text-white text-xs font-bold">
                          SSG
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                {/* No */}
                <div className="p-3 rounded-lg bg-[#EDE9FE] border border-purple-200">
                  <p className="font-bold text-purple-700 mb-2">
                    ❌ 不需要 SEO
                  </p>
                  <p className="text-[var(--foreground)]/70 mb-2">
                    页面交互需求如何？
                  </p>
                  <div className="space-y-2 ml-3">
                    <div className="flex items-start gap-2">
                      <span className="text-xs">🎯</span>
                      <span>
                        <strong>交互密集</strong>（仪表盘、编辑器）→{" "}
                        <span className="px-2 py-0.5 rounded-md bg-[var(--accent)] text-white text-xs font-bold">
                          CSR
                        </span>
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs">📊</span>
                      <span>
                        <strong>需要最新数据</strong>（实时面板）→{" "}
                        <span className="px-2 py-0.5 rounded-md bg-[var(--secondary)] text-white text-xs font-bold">
                          SSR
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-[var(--foreground)]/40 italic">
              💡 同一应用中可以混合使用多种策略。例如：首页用 ISR、商品详情用
              SSR、用户后台用 CSR。
            </p>
          </div>
        </div>

        {/* ── 性能对比表 ── */}
        <div className="topic-card rounded-3xl overflow-hidden mb-10">
          <div className="px-6 py-4 bg-[var(--foreground)] text-white">
            <h3 className="font-['Outfit',sans-serif] font-bold text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" strokeWidth={2.5} />
              性能与特性对比矩阵
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-['Plus_Jakarta_Sans']">
              <thead>
                <tr className="border-b-2 border-[var(--foreground)]">
                  <th className="p-4 text-left font-bold text-[var(--foreground)]">
                    指标
                  </th>
                  {(Object.values(STRATEGIES) as Strategy[]).map((s) => (
                    <th
                      key={s.id}
                      className="p-4 text-center font-bold"
                      style={{ color: s.color }}
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <s.icon className="w-4 h-4" strokeWidth={2.5} />
                        {s.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    metric: "TTFB",
                    values: ["~50ms ⚡", "200~500ms", "~30ms ⚡", "~30ms ⚡"],
                  },
                  {
                    metric: "FCP",
                    values: ["1~3s 🐢", "300~800ms", "100~300ms", "100~300ms"],
                  },
                  {
                    metric: "TTI",
                    values: ["2~5s 🐢", "500~1000ms", "200~500ms", "200~500ms"],
                  },
                  {
                    metric: "SEO",
                    values: ["❌ 差", "✅ 优秀", "✅ 优秀", "✅ 优秀"],
                  },
                  {
                    metric: "数据新鲜度",
                    values: ["✅ 实时", "✅ 实时", "❌ 构建时", "✅ 可配置"],
                  },
                  {
                    metric: "服务器成本",
                    values: ["✅ 低", "❌ 高", "✅ 零", "✅ 极低"],
                  },
                  {
                    metric: "Hydration",
                    values: ["完整客户端", "需要", "需要", "需要"],
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[var(--border)] hover:bg-[var(--background)] transition-colors"
                  >
                    <td className="p-4 font-bold text-[var(--foreground)]">
                      {row.metric}
                    </td>
                    {row.values.map((v, j) => (
                      <td
                        key={j}
                        className="p-4 text-center text-[var(--foreground)]/70 text-xs"
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Anti-Patterns ── */}
        <h3 className="font-['Outfit',sans-serif] font-bold text-[var(--foreground)] text-xl mb-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" strokeWidth={2.5} />
          常见陷阱与反模式
        </h3>
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {[
            {
              icon: XCircle,
              title: "🚫 内容页用 CSR",
              wrong:
                '博客、电商产品页使用 CSR（"use client" + useEffect 请求）',
              why: "搜索引擎爬虫拿到空 HTML，Lighthouse SEO 0分。首屏白屏 3 秒 = 53% 用户流失。",
              right:
                "博客用 SSG（generateStaticParams），产品页用 SSR（cache: 'no-store'）或 ISR。",
              color: "#EF4444",
            },
            {
              icon: XCircle,
              title: "🚫 静态页用 SSR",
              wrong: '"关于我们"、"服务条款"等几乎不变的页面使用 SSR',
              why: "每个请求都要服务端计算，浪费资源。10000 QPS 的 SSR 成本是 SSG 的 100 倍以上。",
              right: "纯静态页面使用 SSG，Next.js 中默认行为就是 SSG。",
              color: "#F97316",
            },
            {
              icon: XCircle,
              title: "🚫 ISR 时间设太短",
              wrong: "新闻网站设置 revalidate: 1（1秒）",
              why: "revalidate 过短 ≈ SSR，失去了 ISR 的缓存优势。且分布式场景下可能导致频繁重建。",
              right:
                "根据内容更新频率设置：新闻用 60~300s，产品列表用 600~3600s。",
              color: "#F59E0B",
            },
            {
              icon: XCircle,
              title: "🚫 SSR 中串行请求",
              wrong: "在 Server Component 中顺序 await 多个 fetch",
              why: "3 个 300ms 的请求串行 = 900ms TTFB。用户在白屏中等待。",
              right:
                "使用 Promise.all() 并行，或用 Suspense 流式渲染。总耗时降至 300ms。",
              color: "#8B5CF6",
            },
          ].map((ap, i) => (
            <div
              key={i}
              className="topic-card p-5 rounded-2xl border-l-4"
              style={{ borderLeftColor: ap.color }}
            >
              <h4 className="font-['Outfit',sans-serif] font-bold text-[var(--foreground)] mb-3">
                {ap.title}
              </h4>
              <div className="space-y-3 text-sm font-['Plus_Jakarta_Sans']">
                <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                    ❌ 错误做法
                  </span>
                  <p className="text-[var(--foreground)]/70 mt-1">{ap.wrong}</p>
                </div>
                <p className="text-xs text-[var(--foreground)]/50">
                  <strong>为什么错：</strong>
                  {ap.why}
                </p>
                <div className="p-3 rounded-xl bg-green-50 border border-green-200">
                  <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
                    ✅ 正确做法
                  </span>
                  <p className="text-[var(--foreground)]/70 mt-1">{ap.right}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ Cheat Sheet ═══════════════════ */}
      <section className="container py-16 md:py-24">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--secondary)] border-2 border-[var(--foreground)] flex items-center justify-center shadow-[3px_3px_0px_0px_var(--foreground)]">
            <FileCode className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xs font-bold text-[var(--secondary)] uppercase tracking-widest font-['Plus_Jakarta_Sans']">
            速查清单
          </span>
        </div>
        <h2 className="font-['Outfit',sans-serif] text-3xl md:text-4xl font-extrabold text-[var(--foreground)] mb-8">
          渲染策略 Cheat Sheet
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "cache: 'no-store'",
              subtitle: "强制 SSR",
              desc: "每次请求获取最新数据，不做任何缓存",
              code: 'fetch(url, { cache: "no-store" })',
              color: "var(--secondary)",
            },
            {
              title: "cache: 'force-cache'",
              subtitle: "强制 SSG",
              desc: "构建时缓存结果，后续复用",
              code: 'fetch(url, { cache: "force-cache" })',
              color: "var(--quaternary)",
            },
            {
              title: "next: { revalidate }",
              subtitle: "ISR",
              desc: "指定秒数后过期，下次访问触发后台重新生成",
              code: "fetch(url, { next: { revalidate: 60 } })",
              color: "var(--tertiary)",
            },
            {
              title: '"use client"',
              subtitle: "标记 CSR",
              desc: "组件在浏览器端渲染和执行",
              code: '// 文件顶部添加\n"use client";',
              color: "var(--accent)",
            },
            {
              title: "generateStaticParams",
              subtitle: "SSG 路由预生成",
              desc: "构建时生成所有动态路由的静态页面",
              code: "export async function generateStaticParams() {...}",
              color: "var(--quaternary)",
            },
            {
              title: "<Suspense>",
              subtitle: "Streaming SSR",
              desc: "将慢速部分异步流式渲染，不阻塞快速部分",
              code: "<Suspense fallback={<Skeleton />}>\n  <SlowComponent />\n</Suspense>",
              color: "var(--secondary)",
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`topic-card rounded-2xl overflow-hidden ${
                i === 0 ? "col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div
                className="px-4 py-3 border-b-2 border-[var(--foreground)]"
                style={{
                  backgroundColor: `color-mix(in srgb, ${card.color} 15%, white)`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono',monospace] text-sm font-bold text-[var(--foreground)]">
                    {card.title}
                  </span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white uppercase tracking-wider"
                    style={{ backgroundColor: card.color }}
                  >
                    {card.subtitle}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] leading-relaxed">
                  {card.desc}
                </p>
                <pre className="p-3 bg-[#1E293B] rounded-xl text-xs text-[#E2E8F0] font-['JetBrains_Mono',monospace] overflow-x-auto border border-[var(--foreground)]/20">
                  <code
                    dangerouslySetInnerHTML={{
                      __html: highlightCode(card.code, "typescript"),
                    }}
                  />
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* 终极总结 */}
        <div className="mt-10 p-6 md:p-8 rounded-3xl bg-[var(--foreground)] text-white border-2 border-[var(--foreground)] shadow-[8px_8px_0px_0px_var(--accent)]">
          <h3 className="font-['Outfit',sans-serif] font-bold text-2xl mb-4 flex items-center gap-3">
            <Sparkles
              className="w-6 h-6 text-[var(--tertiary)]"
              strokeWidth={2.5}
            />
            一句话记住四种策略
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: "CSR",
                emoji: "🧑‍🍳",
                summary: "浏览器自己做菜——慢但灵活",
                color: "#8B5CF6",
              },
              {
                name: "SSR",
                emoji: "👨‍🍳",
                summary: "服务器现做——快但费厨师",
                color: "#F472B6",
              },
              {
                name: "SSG",
                emoji: "🍱",
                summary: "提前做好放冰箱——极速但可能不新鲜",
                color: "#34D399",
              },
              {
                name: "ISR",
                emoji: "🔄🍱",
                summary: "自动补货的冰箱——极速且保持新鲜",
                color: "#FBBF24",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm"
              >
                <span className="text-2xl">{s.emoji}</span>
                <h4
                  className="font-['Outfit',sans-serif] font-bold text-lg mt-2"
                  style={{ color: s.color }}
                >
                  {s.name}
                </h4>
                <p className="text-sm text-white/70 font-['Plus_Jakarta_Sans'] mt-1 leading-relaxed">
                  {s.summary}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/50 font-['Plus_Jakarta_Sans']">
            🎯 现代 Web
            开发的黄金法则：没有银弹。同一应用中混合使用多种策略，按页面粒度选择最优方案。
          </p>
        </div>
      </section>
    </div>
  );
}
