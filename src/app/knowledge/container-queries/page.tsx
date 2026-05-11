"use client";

import { useState, useEffect, useCallback } from "react";
import { highlightCode } from "@/lib/prism-highlight";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Layers,
  Box,
  Zap,
  BookOpen,
  ChevronRight,
  Code2,
  Eye,
  Info,
  Monitor,
  Layout,
  ArrowRight,
  MousePointerClick,
  Columns,
  Scaling,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   Code Examples & Constants
   ═══════════════════════════════════════════════════════════════ */

const DEMO_CSS = `
.cq-demo-wrapper {
  container-type: inline-size;
  container-name: card-demo;
  transition: width 0.45s cubic-bezier(0.34,1.56,0.64,1);
  border: 3px dashed #CBD5E1;
  border-radius: 24px;
  padding: 4px;
  min-width: 200px;
  background: repeating-linear-gradient(45deg,transparent,transparent 6px,rgba(139,92,246,.03) 6px,rgba(139,92,246,.03) 12px);
}
.cq-demo-card{
  display:flex;flex-direction:column;gap:1rem;padding:1.25rem;
  border:3px solid #1E293B;border-radius:20px;background:#fff;
  box-shadow:8px 8px 0 0 #1E293B;
}
.cq-demo-img{
  width:100%;height:120px;border-radius:14px;border:2px solid #1E293B;
  background:linear-gradient(135deg,#8B5CF6 0%,#F472B6 50%,#FBBF24 100%);
  display:flex;align-items:center;justify-content:center;
  color:#fff;font-weight:800;font-size:2rem;font-family:'Outfit',sans-serif;
  flex-shrink:0;overflow:hidden;
}
.cq-demo-body{display:flex;flex-direction:column;gap:.35rem}
.cq-demo-title{
  font-size:1.05rem;font-weight:800;color:#1E293B;font-family:'Outfit',sans-serif;line-height:1.25;
}
.cq-demo-desc{
  font-size:.78rem;color:#64748B;line-height:1.55;font-family:'Plus Jakarta Sans',sans-serif;
}
.cq-demo-meta{display:none;gap:.4rem;align-items:center;flex-wrap:wrap;margin-top:.2rem}
.cq-demo-tag{
  padding:.2rem .5rem;border:2px solid #1E293B;border-radius:8px;
  font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;
  font-family:'Plus Jakarta Sans',sans-serif;
}
.cq-demo-actions{display:flex;flex-direction:column;gap:.4rem;margin-top:.6rem}
.cq-demo-btn{
  padding:.45rem .9rem;border:2px solid #1E293B;border-radius:10px;
  font-weight:700;font-size:.72rem;cursor:pointer;
  font-family:'Plus Jakarta Sans',sans-serif;text-align:center;
  transition:all .15s;
}
.cq-demo-btn:hover{transform:translate(-2px,-2px);box-shadow:4px 4px 0 0 #1E293B}
.cq-demo-btn-p{background:#8B5CF6;color:#fff}
.cq-demo-btn-s{background:#fff;color:#1E293B}

@container card-demo (min-width:350px){
  .cq-demo-card{flex-direction:row;align-items:flex-start;gap:1.15rem}
  .cq-demo-img{width:96px;min-width:96px;height:96px;border-radius:16px}
  .cq-demo-body{flex:1;min-width:0}
  .cq-demo-actions{flex-direction:row;gap:.5rem;margin-top:.5rem}
}
@container card-demo (min-width:550px){
  .cq-demo-card{padding:1.75rem;gap:1.5rem}
  .cq-demo-img{width:155px;min-width:155px;height:155px;border-radius:20px}
  .cq-demo-title{font-size:1.35rem}
  .cq-demo-desc{font-size:.85rem}
  .cq-demo-meta{display:flex}
  .cq-demo-actions{gap:.65rem;margin-top:.85rem}
}`;

const codeBasic = `/* ❶ 定义容器上下文 (Containment Context) */
.card-wrapper {
  container-type: inline-size;
  /* 告诉浏览器：这个元素的子元素将查询
     它的「内联尺寸」(通常=宽度) */
}

/* ❷ 查询容器，而非视口！ */
@container (min-width: 400px) {
  .card {
    flex-direction: row;  /* ← 容器 ≥ 400px 时横排 */
  }
}

@container (min-width: 700px) {
  .card {
    padding: 2rem;        /* ← 容器 ≥ 700px 时更宽松 */
    gap: 2rem;
  }
}`;

const codeNamed = `/* sidebar 和 main 各自成为独立的容器 */
.sidebar {
  container-type: inline-size;
  container-name: sidebar;       /* ← 命名容器 */
}

.main-content {
  container-type: inline-size;
  container-name: main;          /* ← 另一个命名容器 */
}

/* 精确查询某一个容器 */
@container sidebar (min-width: 300px) {
  .nav-item {
    flex-direction: row;         /* ← 仅 sidebar ≥ 300px 生效 */
    gap: 0.75rem;
  }
}

@container main (min-width: 600px) {
  .article-grid {
    grid-template-columns: 1fr 1fr; /* ← 仅 main ≥ 600px 生效 */
  }
}`;

const codeUnits = `/* Container Query Units —— 容器查询单位 */
.hero-title {
  /* cqi = container inline size 的 1%
     让字体随容器平滑缩放 */
  font-size: clamp(1.5rem, 5cqi, 4rem);
}

.card-grid {
  /* 每个子项至少占容器宽度的 28% */
  grid-template-columns:
    repeat(auto-fill, minmax(28cqi, 1fr));
}

.card-avatar {
  /* 头像始终是容器宽度的 12%，但不小 40px */
  width: clamp(40px, 12cqi, 120px);
  height: clamp(40px, 12cqi, 120px);
}`;

const codeCard = `// ResponsiveCard.tsx —— 真正可复用的自适应组件
interface Product {
  image: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
}

export function ResponsiveCard({ product }: { product: Product }) {
  return (
    // ↓ 这一行让此 div 成为容器上下文
    <div style={{ containerType: "inline-size" }}>
      <article className="card">
        <img src={product.image} className="card-img" />
        <div className="card-body">
          <h3 className="card-title">{product.name}</h3>
          <p className="card-desc">{product.description}</p>
          <div className="card-meta">
            <span className="tag">\${product.price}</span>
            <span className="tag">★ {product.rating}</span>
            <span className="tag">{product.category}</span>
          </div>
          <div className="card-actions">
            <button className="btn-primary">Add to Cart</button>
            <button className="btn-ghost">Save</button>
          </div>
        </div>
      </article>
    </div>
  );
}`;

const codeCardCSS = `/* ResponsiveCard.css —— 无需任何 JS 断点逻辑 */
.card {
  display: flex;
  flex-direction: column;     /* 默认：纵向堆叠 */
  gap: 1rem;
}

/* ── 容器 ≥ 350px → 横向布局 ── */
@container (min-width: 350px) {
  .card {
    flex-direction: row;
    align-items: flex-start;
  }
  .card-img {
    width: 96px;
    height: 96px;
    border-radius: 16px;
  }
}

/* ── 容器 ≥ 550px → 宽松横向 + 元信息 ── */
@container (min-width: 550px) {
  .card       { padding: 1.75rem; gap: 1.5rem }
  .card-img   { width: 160px; height: 160px }
  .card-title { font-size: 1.5rem }
  .card-meta  { display: flex }   /* 默认 hidden */
}`;

const codeStyleQuery = `/* Style Queries (实验性) —— 查询 CSS 自定义属性 */
.theme-wrapper {
  --theme: light;
}
.theme-wrapper.dark {
  --theme: dark;
}

/* 根据父容器的 CSS 变量切换样式 */
@container style(--theme: dark) {
  .card {
    background: #1a1a1a;
    color: #f8fafc;
    border-color: #334155;
  }
}

@container style(--theme: high-contrast) {
  .card {
    border-width: 3px;
    font-weight: 700;
  }
}`;

const codeAntiMQ = `/* ❌ Anti-pattern: 用 @media 控制组件内部布局 */
@media (min-width: 768px) {
  .product-card {
    flex-direction: row;  /* 依赖视口宽度 */
  }
}

/* ✅ Correct: 用 @container 让组件自适应 */
.product-card-wrapper {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .product-card {
    flex-direction: row;  /* 依赖容器宽度 */
  }
}`;

const codeAntiSize = `/* ❌ Anti-pattern: container-type: size 没给显式高度 */
.grid-item {
  container-type: size;
  /* 高度 auto → cqb 单位 = 0 → 布局崩溃 */
}

/* ✅ Correct: inline-size 或给定显式高度 */
.grid-item {
  container-type: inline-size;  /* 只查宽度，安全 */
  /* 或 */
  container-type: size;
  height: 300px;                /* 显式高度 */
}`;

const codeShorthand = `/* 完整写法 */
.element {
  container-type: inline-size;
  container-name: sidebar;
}

/* 等价简写 */
.element {
  container: inline-size / sidebar;
  /*         ↑ type     ↑ name */
}`;

const codeCompTSX = `// ✅ 完全自适应的组件 —— 放到任何容器中都能正常工作
// Sidebar (300px) → 紧凑单列
// Grid column (400px) → 图文横排
// Full-width (800px) → 宽松布局 + 元信息
<ResponsiveCard product={headphones} />`;

/* ═══════════════════════════════════════════════════════════════
   CodeBlock Component
   ═══════════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════════
   Interactive Playground —— 实时容器查询实验场
   ═══════════════════════════════════════════════════════════════ */

const PRESETS = [
  { px: 200, label: "200", icon: "📱" },
  { px: 350, label: "350", icon: "📓" },
  { px: 550, label: "550", icon: "🖥️" },
  { px: 750, label: "Full", icon: "🪟" },
] as const;

function InteractivePlayground() {
  const [width, setWidth] = useState(500);
  const [activeCode, setActiveCode] = useState<
    "compact" | "medium" | "spacious"
  >("medium");

  useEffect(() => {
    if (width < 300) setActiveCode("compact");
    else if (width < 480) setActiveCode("medium");
    else setActiveCode("spacious");
  }, [width]);

  const compactCode = `.cq-card {
  flex-direction: column;     /* 纵向堆叠 */
  gap: 1rem;
  padding: 1.25rem;
}
.card-img {
  width: 100%;                /* 图片满宽 */
  height: 120px;
}
.card-meta  { display: none } /* 隐藏元信息 */
.card-actions { flex-direction: column }`;

  const mediumCode = `@container card-demo (min-width: 350px) {
  .cq-card {
    flex-direction: row;      /* ← 切换为横排 */
    align-items: flex-start;
  }
  .card-img {
    width: 96px; min-width: 96px;
    height: 96px; border-radius: 16px;
  }
  .card-meta  { display: none }
  .card-actions { flex-direction: row }
}`;

  const spaciousCode = `@container card-demo (min-width: 550px) {
  .cq-card   { padding: 1.75rem; gap: 1.5rem }
  .card-img  { width: 155px; min-width: 155px }
  .card-title { font-size: 1.35rem }
  .card-meta  { display: flex }  /* ← 显示标签 */
  .card-actions { gap: .65rem; margin-top: .85rem }
}`;

  const codeMap = {
    compact: compactCode,
    medium: mediumCode,
    spacious: spaciousCode,
  };
  const labelMap = {
    compact: "紧凑 · Compact",
    medium: "中等 · Medium",
    spacious: "宽松 · Spacious",
  };
  const colorMap = {
    compact: "var(--secondary)",
    medium: "var(--accent)",
    spacious: "var(--quaternary)",
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 border-2 border-[var(--foreground)] rounded-xl bg-[var(--secondary)] shadow-[4px_4px_0px_0px_var(--foreground)]">
            <MousePointerClick
              size={20}
              strokeWidth={2.5}
              className="text-white"
            />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
            Interactive Lab
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--foreground)] font-['Outfit'] mb-4">
          动手试试 👇
        </h2>
        <p className="text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-10 max-w-xl text-lg">
          拖动滑块改变容器宽度，观察下方卡片如何
          <strong className="text-[var(--accent)]">自动切换布局</strong>——
          <br className="hidden md:block" />
          全程零 JavaScript 断点逻辑，纯 CSS Container Queries 驱动。
        </p>

        <style dangerouslySetInnerHTML={{ __html: DEMO_CSS }} />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Demo */}
          <div>
            {/* Preset Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {PRESETS.map((p) => (
                <button
                  key={p.px}
                  onClick={() => setWidth(p.px)}
                  className={`flex items-center gap-1.5 px-4 py-2 border-2 border-[var(--foreground)] rounded-xl font-['Plus_Jakarta_Sans'] font-bold text-sm transition-all
                    ${
                      width === p.px
                        ? "bg-[var(--accent)] text-white shadow-[4px_4px_0px_0px_var(--foreground)] -translate-y-0.5"
                        : "bg-[var(--card)] text-[var(--foreground)] shadow-[3px_3px_0px_0px_var(--foreground)] hover:-translate-y-0.5"
                    }`}
                >
                  <span>{p.icon}</span>
                  <span>{p.label}px</span>
                </button>
              ))}
            </div>

            {/* Width Slider */}
            <div className="mb-5">
              <input
                type="range"
                min={200}
                max={750}
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--secondary) 0%, var(--accent) ${((width - 200) / 550) * 100}%, var(--border) ${((width - 200) / 550) * 100}%, var(--border) 100%)`,
                }}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs font-bold text-[var(--foreground)]/40 font-['JetBrains_Mono']">
                  200px
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{ background: colorMap[activeCode] }}
                  />
                  <span className="text-sm font-bold font-['JetBrains_Mono'] text-[var(--foreground)]">
                    {width}px
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full border-2 border-[var(--foreground)] text-[10px] font-bold uppercase tracking-wider font-['Plus_Jakarta_Sans']"
                    style={{ color: colorMap[activeCode] }}
                  >
                    {labelMap[activeCode]}
                  </span>
                </div>
                <span className="text-xs font-bold text-[var(--foreground)]/40 font-['JetBrains_Mono']">
                  750px
                </span>
              </div>
            </div>

            {/* Demo Container */}
            <div
              className="cq-demo-wrapper"
              style={{ width: `${width}px`, maxWidth: "100%" }}
            >
              <div className="cq-demo-card">
                <div className="cq-demo-img">
                  <span>🎧</span>
                </div>
                <div className="cq-demo-body">
                  <h3 className="cq-demo-title">Midnight Purple Headphones</h3>
                  <p className="cq-demo-desc">
                    Premium wireless headphones with 40h battery life, ANC, and
                    spatial audio support.
                  </p>
                  <div className="cq-demo-meta">
                    <span
                      className="cq-demo-tag"
                      style={{ background: "var(--accent)/10" }}
                    >
                      $299
                    </span>
                    <span
                      className="cq-demo-tag"
                      style={{ background: "var(--tertiary)/10" }}
                    >
                      ★ 4.8
                    </span>
                    <span
                      className="cq-demo-tag"
                      style={{ background: "var(--quaternary)/10" }}
                    >
                      Audio
                    </span>
                  </div>
                  <div className="cq-demo-actions">
                    <button className="cq-demo-btn cq-demo-btn-p">
                      Add to Cart
                    </button>
                    <button className="cq-demo-btn cq-demo-btn-s">Save</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Breakpoint explanation */}
            <div className="mt-4 p-4 border-2 border-[var(--foreground)] rounded-2xl bg-[var(--card)] shadow-[4px_4px_0px_0px_var(--foreground)]">
              <div className="flex items-start gap-2">
                <Info
                  size={16}
                  strokeWidth={2.5}
                  className="text-[var(--accent)] mt-0.5 flex-shrink-0"
                />
                <p className="text-sm text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] leading-relaxed">
                  上方卡片使用了两个{" "}
                  <code className="font-['JetBrains_Mono'] text-[var(--accent)] text-xs">
                    @container
                  </code>{" "}
                  断点：
                  <strong>350px</strong>（图文横排）和 <strong>550px</strong>
                  （显示元信息标签 + 更大图片）。 这些断点由
                  <strong>容器宽度</strong>决定，与你的屏幕大小无关。
                </p>
              </div>
            </div>
          </div>

          {/* Right: Active CSS */}
          <div className="animate-slide">
            <CodeBlock
              code={codeMap[activeCode]}
              language="css"
              title={`Active Rules → ${labelMap[activeCode]}`}
            />
            <div className="mt-4 p-4 border-2 border-[var(--foreground)] rounded-2xl bg-[var(--tertiary)]/10 shadow-[4px_4px_0px_0px_var(--foreground)]">
              <div className="flex items-start gap-2">
                <Lightbulb
                  size={16}
                  strokeWidth={2.5}
                  className="text-[var(--tertiary)] mt-0.5 flex-shrink-0"
                />
                <p className="text-sm text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] leading-relaxed">
                  注意看：左右两侧是<strong>同步</strong>的。改变宽度时，卡片的
                  CSS 自动切换，<strong>没有任何 JavaScript</strong>{" "}
                  参与断点判断——这才是容器查询的真正力量。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Page Component
   ═══════════════════════════════════════════════════════════════ */

export default function ContainerQueriesPage() {
  return (
    <div className="bg-dot-grid min-h-screen">
      {/* ───────────────────────────────────────────
          HERO — L1: 直觉锚点
          ─────────────────────────────────────────── */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden container">
        {/* Decorative Blobs */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 opacity-[.12] pointer-events-none"
          style={{
            background: "var(--tertiary)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-56 h-56 opacity-[.08] pointer-events-none"
          style={{
            background: "var(--secondary)",
            borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 w-32 h-32 opacity-[.06] pointer-events-none"
          style={{
            background: "var(--accent)",
            borderRadius: "50% 50% 30% 70% / 40% 60% 40% 60%",
          }}
        />

        <div className="container relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border-2 border-[var(--foreground)] rounded-full bg-[var(--card)] shadow-[4px_4px_0px_0px_var(--foreground)] animate-pop">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] font-['Plus_Jakarta_Sans']">
              CSS Containment Level 3
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[var(--foreground)] font-['Outfit'] mb-6 animate-pop leading-[0.95]"
            style={{ animationDelay: "0.08s" }}
          >
            Container
            <br />
            <span className="text-[var(--accent)]">Queries</span>
          </h1>

          {/* Subtitle / L1 Metaphor */}
          <p
            className="text-lg md:text-xl text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] max-w-2xl mb-10 animate-slide leading-relaxed"
            style={{ animationDelay: "0.16s" }}
          >
            <strong className="text-[var(--foreground)]">
              组件级响应式设计
            </strong>
            ——让组件不再 &ldquo;看窗外&rdquo;（视口宽度）， 而是
            &ldquo;照镜子&rdquo;（父容器宽度）来决定自己的布局。 这是从{" "}
            <code className="px-1.5 py-0.5 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-md text-[var(--accent)] text-sm font-['JetBrains_Mono']">
              @media
            </code>{" "}
            到{" "}
            <code className="px-1.5 py-0.5 bg-[var(--secondary)]/10 border border-[var(--secondary)]/30 rounded-md text-[var(--secondary)] text-sm font-['JetBrains_Mono']">
              @container
            </code>{" "}
            的范式转变。
          </p>

          {/* L1 Mini Visual: MQ vs CQ */}
          <div
            className="flex flex-col md:flex-row gap-4 max-w-2xl animate-slide"
            style={{ animationDelay: "0.24s" }}
          >
            <div className="flex-1 p-5 border-2 border-[var(--foreground)] rounded-2xl bg-[var(--card)] shadow-[4px_4px_0px_0px_var(--border)]">
              <div className="flex items-center gap-2 mb-3">
                <Monitor
                  size={18}
                  strokeWidth={2.5}
                  className="text-[var(--foreground)]/50"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/40 font-['Plus_Jakarta_Sans']">
                  传统 @media
                </span>
              </div>
              <p className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] leading-relaxed">
                组件只能看到
                <strong className="text-[var(--foreground)]">浏览器视口</strong>
                宽度。 同一个 Card 放在 sidebar 300px 和 main 900px
                里，表现完全一样。
              </p>
            </div>

            <div className="flex items-center justify-center">
              <ArrowRight
                size={28}
                strokeWidth={2.5}
                className="text-[var(--accent)] rotate-90 md:rotate-0"
              />
            </div>

            <div className="flex-1 p-5 border-2 border-[var(--foreground)] rounded-2xl bg-[var(--accent)]/[.05] shadow-[4px_4px_0px_0px_var(--accent)]">
              <div className="flex items-center gap-2 mb-3">
                <Box
                  size={18}
                  strokeWidth={2.5}
                  className="text-[var(--accent)]"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] font-['Plus_Jakarta_Sans']">
                  新范式 @container
                </span>
              </div>
              <p className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] leading-relaxed">
                组件看到的是
                <strong className="text-[var(--accent)]">自己的容器</strong>
                宽度。 放在 300px sidebar → 紧凑布局；放在 900px main →
                宽松布局。真正的 &ldquo;write once, adapt anywhere&rdquo;。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────
          L2: 为什么需要 —— 痛点
          ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 border-2 border-[var(--foreground)] rounded-xl bg-[var(--tertiary)] shadow-[4px_4px_0px_0px_var(--foreground)]">
              <AlertTriangle
                size={20}
                strokeWidth={2.5}
                className="text-[var(--foreground)]"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
              Why We Need It
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--foreground)] font-['Outfit'] mb-4">
            @media 的三宗罪
          </h2>
          <p className="text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-12 max-w-xl text-lg">
            Media Query
            为页面而生，却被迫用在组件上。结果是：脆弱、不可复用、反直觉。
          </p>

          {/* Pain Point Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: <Eye size={22} strokeWidth={2.5} />,
                color: "var(--secondary)",
                title: "组件看不见容器",
                desc: "Media Query 只能看到视口。一个 Sidebar 300px 里的 Card 和 Main 900px 里的 Card，因为视口相同，表现一模一样。",
                stat: "100%",
                statLabel: "的组件响应依赖视口",
              },
              {
                icon: <Layers size={22} strokeWidth={2.5} />,
                color: "var(--accent)",
                title: "断点靠猜",
                desc: "页面级断点（768px/1024px/1280px）是设计师拍脑袋的产物。一个 Card 可能在 400px 时就需要横排，但 @media 只能在 768px 才能触发。",
                stat: "3-5",
                statLabel: "个全局断点打天下",
              },
              {
                icon: <Layout size={22} strokeWidth={2.5} />,
                color: "var(--tertiary)",
                title: "复用性 = 0",
                desc: "同一个组件放在 Grid 列、Sidebar、Modal 中，布局宽度从 200px 到 800px 都有。用 @media？你得给每种容器写一套覆盖样式。",
                stat: "N × M",
                statLabel: "种媒体查询 × 容器组合",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="topic-card p-6 animate-slide"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-[var(--foreground)] mb-4"
                  style={{
                    background: card.color,
                    boxShadow: `4px 4px 0px 0px var(--foreground)`,
                  }}
                >
                  <span className="text-white">{card.icon}</span>
                </div>
                <h3 className="text-lg font-bold font-['Outfit'] text-[var(--foreground)] mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] leading-relaxed mb-4">
                  {card.desc}
                </p>
                <div className="p-3 border-2 border-dashed border-[var(--foreground)]/20 rounded-xl bg-[var(--background)]">
                  <span
                    className="text-2xl font-extrabold font-['Outfit']"
                    style={{ color: card.color }}
                  >
                    {card.stat}
                  </span>
                  <span className="block text-xs text-[var(--foreground)]/40 font-['Plus_Jakarta_Sans'] mt-0.5">
                    {card.statLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Comparison */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Before: Media Query */}
            <div className="p-6 border-2 border-[var(--foreground)] rounded-2xl bg-[var(--card)] shadow-[8px_8px_0px_0px_var(--border)]">
              <div className="flex items-center gap-2 mb-5">
                <XCircle
                  size={18}
                  strokeWidth={2.5}
                  className="text-[var(--secondary)]"
                />
                <span className="text-sm font-bold font-['Plus_Jakarta_Sans'] text-[var(--foreground)]">
                  ❌ Media Query
                </span>
              </div>
              {/* Simulated layout */}
              <div className="border-2 border-[var(--foreground)]/20 rounded-xl p-3 bg-[var(--background)]">
                <div className="text-[10px] font-bold text-[var(--foreground)]/30 mb-2 font-['JetBrains_Mono'] uppercase tracking-wider">
                  viewport: 1200px
                </div>
                <div className="flex gap-2">
                  <div className="w-24 shrink-0">
                    <div className="h-4 bg-[var(--foreground)]/10 rounded mb-1" />
                    <div className="h-4 bg-[var(--foreground)]/10 rounded mb-1" />
                    <div className="h-4 bg-[var(--foreground)]/10 rounded" />
                  </div>
                  <div className="flex-1 flex gap-2">
                    {/* Both cards look the same */}
                    {[1, 2].map((n) => (
                      <div
                        key={n}
                        className="flex-1 border-2 border-[var(--secondary)]/40 rounded-lg p-2 bg-white"
                      >
                        <div className="flex gap-1.5">
                          <div className="w-8 h-8 rounded bg-[var(--secondary)]/20" />
                          <div className="flex-1">
                            <div className="h-2 w-full bg-[var(--foreground)]/15 rounded mb-1" />
                            <div className="h-2 w-3/4 bg-[var(--foreground)]/10 rounded" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-[var(--foreground)]/40 font-['Plus_Jakarta_Sans']">
                ← 两个 Card 布局完全相同，即使 sidebar 只有 300px
              </p>
            </div>

            {/* After: Container Query */}
            <div className="p-6 border-2 border-[var(--foreground)] rounded-2xl bg-[var(--card)] shadow-[8px_8px_0px_0px_var(--quaternary)]">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle2
                  size={18}
                  strokeWidth={2.5}
                  className="text-[var(--quaternary)]"
                />
                <span className="text-sm font-bold font-['Plus_Jakarta_Sans'] text-[var(--foreground)]">
                  ✅ Container Query
                </span>
              </div>
              <div className="border-2 border-[var(--foreground)]/20 rounded-xl p-3 bg-[var(--background)]">
                <div className="text-[10px] font-bold text-[var(--foreground)]/30 mb-2 font-['JetBrains_Mono'] uppercase tracking-wider">
                  每个容器独立查询
                </div>
                <div className="flex gap-2">
                  <div className="w-24 shrink-0">
                    <div className="h-4 bg-[var(--foreground)]/10 rounded mb-1" />
                    <div className="h-4 bg-[var(--foreground)]/10 rounded mb-1" />
                    <div className="h-4 bg-[var(--foreground)]/10 rounded" />
                  </div>
                  <div className="flex-1 flex gap-2">
                    {/* Sidebar card: compact */}
                    <div className="w-24 border-2 border-[var(--quaternary)] rounded-lg p-1.5 bg-white">
                      <div className="w-full h-6 rounded bg-[var(--quaternary)]/20 mb-1" />
                      <div className="h-1.5 w-full bg-[var(--foreground)]/15 rounded mb-0.5" />
                      <div className="h-1.5 w-2/3 bg-[var(--foreground)]/10 rounded" />
                    </div>
                    {/* Main card: spacious */}
                    <div className="flex-1 border-2 border-[var(--quaternary)] rounded-lg p-2 bg-white">
                      <div className="flex gap-1.5">
                        <div className="w-10 h-10 rounded bg-[var(--quaternary)]/20" />
                        <div className="flex-1">
                          <div className="h-2 w-full bg-[var(--foreground)]/15 rounded mb-1" />
                          <div className="h-2 w-3/4 bg-[var(--foreground)]/10 rounded mb-1" />
                          <div className="flex gap-1">
                            <div className="h-3 w-8 rounded bg-[var(--quaternary)]/15" />
                            <div className="h-3 w-8 rounded bg-[var(--quaternary)]/15" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-[var(--foreground)]/40 font-['Plus_Jakarta_Sans']">
                ← Sidebar Card 紧凑，Main Card 宽松，各自适应自己的容器
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────
          L3: 核心原理
          ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 border-2 border-[var(--foreground)] rounded-xl bg-[var(--accent)] shadow-[4px_4px_0px_0px_var(--foreground)]">
              <Zap size={20} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
              How It Works
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--foreground)] font-['Outfit'] mb-4">
            核心原理：两步走
          </h2>
          <p className="text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-12 max-w-xl text-lg">
            Container Queries 的核心只有两个概念：
            <strong className="text-[var(--foreground)]">
              建立容器
            </strong> +{" "}
            <strong className="text-[var(--foreground)]">查询容器</strong>。
          </p>

          {/* Two-step flow */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Step 1 */}
            <div className="topic-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-full border-3 border-[var(--foreground)] bg-[var(--accent)] text-white font-extrabold font-['Outfit'] text-lg shadow-[4px_4px_0px_0px_var(--foreground)]">
                  1
                </div>
                <h3 className="text-xl font-extrabold font-['Outfit'] text-[var(--foreground)]">
                  建立容器上下文
                </h3>
              </div>
              <p className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-5 leading-relaxed">
                在父元素上设置{" "}
                <code className="font-['JetBrains_Mono'] text-[var(--accent)] text-xs">
                  container-type
                </code>
                ，告诉浏览器：&ldquo;这个元素的尺寸将成为子元素响应式查询的基准。&rdquo;
              </p>

              {/* container-type values */}
              <div className="space-y-3">
                {[
                  {
                    value: "inline-size",
                    desc: "查询内联轴（通常是宽度）",
                    badge: "推荐",
                    badgeColor: "var(--quaternary)",
                  },
                  {
                    value: "size",
                    desc: "查询两个轴（宽度+高度）",
                    badge: "少见",
                    badgeColor: "var(--tertiary)",
                  },
                  {
                    value: "normal",
                    desc: "不建立容器上下文",
                    badge: "默认",
                    badgeColor: "var(--border)",
                  },
                ].map((item) => (
                  <div
                    key={item.value}
                    className="flex items-center gap-3 p-3 border-2 border-[var(--foreground)]/10 rounded-xl bg-[var(--background)]"
                  >
                    <code className="font-['JetBrains_Mono'] text-[var(--accent)] text-xs bg-[var(--accent)]/10 px-2 py-1 rounded-lg border border-[var(--accent)]/20 shrink-0">
                      {item.value}
                    </code>
                    <span className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] flex-1">
                      {item.desc}
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border-2 border-[var(--foreground)]/20"
                      style={{ color: item.badgeColor }}
                    >
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="topic-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-full border-3 border-[var(--foreground)] bg-[var(--secondary)] text-white font-extrabold font-['Outfit'] text-lg shadow-[4px_4px_0px_0px_var(--foreground)]">
                  2
                </div>
                <h3 className="text-xl font-extrabold font-['Outfit'] text-[var(--foreground)]">
                  查询容器尺寸
                </h3>
              </div>
              <p className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-5 leading-relaxed">
                在子元素（或其后代）上使用{" "}
                <code className="font-['JetBrains_Mono'] text-[var(--secondary)] text-xs">
                  @container
                </code>{" "}
                规则，基于容器宽度来应用样式。
              </p>

              <CodeBlock code={codeBasic} language="css" title="两步走示例" />
            </div>
          </div>

          {/* Named Containers */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 border-2 border-[var(--foreground)] rounded-xl bg-[var(--quaternary)] shadow-[4px_4px_0px_0px_var(--foreground)]">
                <Columns size={18} strokeWidth={2.5} className="text-white" />
              </div>
              <h3 className="text-xl font-extrabold font-['Outfit'] text-[var(--foreground)]">
                命名容器：精确控制查询目标
              </h3>
            </div>
            <p className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-6 max-w-xl leading-relaxed">
              当页面有多个嵌套容器时，可以通过{" "}
              <code className="font-['JetBrains_Mono'] text-[var(--accent)] text-xs">
                container-name
              </code>{" "}
              为容器命名，确保查询到正确的容器。这避免了
              &ldquo;查到了错误的祖先&rdquo; 的问题。
            </p>
            <CodeBlock
              code={codeNamed}
              language="css"
              title="Named Containers"
            />
          </div>

          {/* Container Query Units */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 border-2 border-[var(--foreground)] rounded-xl bg-[var(--tertiary)] shadow-[4px_4px_0px_0px_var(--foreground)]">
                <Scaling
                  size={18}
                  strokeWidth={2.5}
                  className="text-[var(--foreground)]"
                />
              </div>
              <h3 className="text-xl font-extrabold font-['Outfit'] text-[var(--foreground)]">
                容器查询单位：像 vw，但基于容器
              </h3>
            </div>

            {/* Unit cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                {
                  unit: "cqi",
                  name: "Container Query Inline",
                  desc: "容器内联尺寸的 1%",
                },
                {
                  unit: "cqb",
                  name: "Container Query Block",
                  desc: "容器块级尺寸的 1%",
                },
                {
                  unit: "cqmin",
                  name: "Container Query Min",
                  desc: "cqi 和 cqb 中较小者的 1%",
                },
                {
                  unit: "cqmax",
                  name: "Container Query Max",
                  desc: "cqi 和 cqb 中较大者的 1%",
                },
              ].map((u) => (
                <div
                  key={u.unit}
                  className="p-4 border-2 border-[var(--foreground)] rounded-2xl bg-[var(--card)] shadow-[4px_4px_0px_0px_var(--foreground)] text-center"
                >
                  <code className="text-2xl font-extrabold font-['JetBrains_Mono'] text-[var(--accent)]">
                    {u.unit}
                  </code>
                  <p className="text-xs text-[var(--foreground)]/40 font-['JetBrains_Mono'] mt-1 mb-2">
                    {u.name}
                  </p>
                  <p className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans']">
                    {u.desc}
                  </p>
                </div>
              ))}
            </div>

            <CodeBlock
              code={codeUnits}
              language="css"
              title="Container Query Units 实用示例"
            />
          </div>

          {/* Shorthand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 border-2 border-[var(--foreground)] rounded-xl bg-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)]">
                <Code2 size={18} strokeWidth={2.5} className="text-white" />
              </div>
              <h3 className="text-xl font-extrabold font-['Outfit'] text-[var(--foreground)]">
                简写属性
              </h3>
            </div>
            <CodeBlock
              code={codeShorthand}
              language="css"
              title="container shorthand"
            />
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────
          INTERACTIVE PLAYGROUND
          ─────────────────────────────────────────── */}
      <InteractivePlayground />

      {/* ───────────────────────────────────────────
          L4: 代码实战
          ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 border-2 border-[var(--foreground)] rounded-xl bg-[var(--quaternary)] shadow-[4px_4px_0px_0px_var(--foreground)]">
              <BookOpen size={20} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
              Production Code
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--foreground)] font-['Outfit'] mb-4">
            实战：自适应产品卡片
          </h2>
          <p className="text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-12 max-w-xl text-lg">
            一个真正 &ldquo;到处能用&rdquo; 的产品卡片组件。放到 Grid
            列里、Sidebar 里、Modal 里，它自动适配。
          </p>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* TSX Code */}
            <div>
              <CodeBlock
                code={codeCard}
                language="tsx"
                title="ResponsiveCard.tsx"
              />
            </div>
            {/* CSS Code */}
            <div>
              <CodeBlock
                code={codeCardCSS}
                language="css"
                title="ResponsiveCard.css"
              />
            </div>
          </div>

          {/* Composition Example */}
          <div className="p-6 border-2 border-[var(--foreground)] rounded-2xl bg-[var(--card)] shadow-[8px_8px_0px_0px_var(--foreground)]">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb
                size={18}
                strokeWidth={2.5}
                className="text-[var(--tertiary)]"
              />
              <span className="text-sm font-bold font-['Plus_Jakarta_Sans'] text-[var(--foreground)]">
                组件组合示例
              </span>
            </div>
            <p className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-4 leading-relaxed">
              同一个{" "}
              <code className="font-['JetBrains_Mono'] text-[var(--accent)] text-xs">
                {"<ResponsiveCard />"}
              </code>{" "}
              组件，在三种不同容器宽度下的行为：
            </p>
            <CodeBlock code={codeCompTSX} language="tsx" title="组合使用" />

            {/* Three visual cards showing different layouts */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {[
                {
                  width: "Sidebar · 280px",
                  layout: "纵向堆叠",
                  detail: "图片满宽，隐藏元信息",
                  bg: "var(--secondary)",
                },
                {
                  width: "Grid · 400px",
                  layout: "图文横排",
                  detail: "小正方形图片，显示按钮",
                  bg: "var(--accent)",
                },
                {
                  width: "Full · 700px",
                  layout: "宽松布局",
                  detail: "大图片 + 元信息标签",
                  bg: "var(--quaternary)",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 border-2 border-[var(--foreground)] rounded-xl bg-[var(--background)]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-3 h-3 rounded-full border-2 border-[var(--foreground)]"
                      style={{ background: item.bg }}
                    />
                    <span className="text-xs font-bold font-['JetBrains_Mono'] text-[var(--foreground)]/60">
                      {item.width}
                    </span>
                  </div>
                  <p className="text-sm font-bold font-['Outfit'] text-[var(--foreground)]">
                    {item.layout}
                  </p>
                  <p className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans'] mt-1">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Style Queries */}
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 border-2 border-[var(--foreground)] rounded-xl bg-[var(--accent)] shadow-[4px_4px_0px_0px_var(--foreground)]">
                <Zap size={18} strokeWidth={2.5} className="text-white" />
              </div>
              <h3 className="text-xl font-extrabold font-['Outfit'] text-[var(--foreground)]">
                进阶：Style Queries（实验性 🧪）
              </h3>
            </div>
            <div className="p-5 border-2 border-dashed border-[var(--tertiary)] rounded-2xl bg-[var(--tertiary)]/5 mb-6">
              <div className="flex items-start gap-2">
                <AlertTriangle
                  size={16}
                  strokeWidth={2.5}
                  className="text-[var(--tertiary)] mt-0.5 shrink-0"
                />
                <p className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] leading-relaxed">
                  <strong className="text-[var(--foreground)]">
                    Style Queries
                  </strong>
                  （
                  <code className="font-['JetBrains_Mono'] text-xs">
                    @container style()
                  </code>
                  ） 截至 2024 年底仅在 <strong>Chrome 111+</strong>{" "}
                  中可用（flag: Experimental Web Platform Features）。 Firefox
                  和 Safari 尚未支持。请勿在生产环境中使用。
                </p>
              </div>
            </div>
            <CodeBlock
              code={codeStyleQuery}
              language="css"
              title="Style Queries (Experimental)"
            />
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────
          L5: 工程全景
          ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 border-2 border-[var(--foreground)] rounded-xl bg-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)]">
              <Layers size={20} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
              Engineering Notes
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--foreground)] font-['Outfit'] mb-4">
            工程考量
          </h2>
          <p className="text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-12 max-w-xl text-lg">
            每个新技术都有坑。这些是 Container Queries 在生产环境中的关键考量。
          </p>

          {/* Browser Support */}
          <div className="mb-12">
            <h3 className="text-xl font-extrabold font-['Outfit'] text-[var(--foreground)] mb-6 flex items-center gap-2">
              <Monitor
                size={20}
                strokeWidth={2.5}
                className="text-[var(--accent)]"
              />
              浏览器兼容性
            </h3>
            <div className="border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_var(--foreground)]">
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--foreground)]">
                    {["Browser", "Version", "Date", "Status"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-white font-['Plus_Jakarta_Sans']"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      browser: "Chrome",
                      version: "105+",
                      date: "Aug 2022",
                      status: "✅ Full",
                      bg: "var(--quaternary)",
                    },
                    {
                      browser: "Edge",
                      version: "105+",
                      date: "Sep 2022",
                      status: "✅ Full",
                      bg: "var(--quaternary)",
                    },
                    {
                      browser: "Firefox",
                      version: "110+",
                      date: "Feb 2023",
                      status: "✅ Full",
                      bg: "var(--quaternary)",
                    },
                    {
                      browser: "Safari",
                      version: "16+",
                      date: "Sep 2022",
                      status: "✅ Full",
                      bg: "var(--quaternary)",
                    },
                    {
                      browser: "Samsung Internet",
                      version: "20+",
                      date: "Mar 2023",
                      status: "✅ Full",
                      bg: "var(--quaternary)",
                    },
                    {
                      browser: "Opera",
                      version: "91+",
                      date: "Oct 2022",
                      status: "✅ Full",
                      bg: "var(--quaternary)",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={`border-t-2 border-[var(--foreground)]/10 ${i % 2 === 0 ? "bg-[var(--card)]" : "bg-[var(--background)]"}`}
                    >
                      <td className="px-5 py-3 text-sm font-bold font-['Plus_Jakarta_Sans'] text-[var(--foreground)]">
                        {row.browser}
                      </td>
                      <td className="px-5 py-3 text-sm font-['JetBrains_Mono'] text-[var(--accent)]">
                        {row.version}
                      </td>
                      <td className="px-5 py-3 text-sm text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
                        {row.date}
                      </td>
                      <td className="px-5 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border-2 border-[var(--quaternary)] text-[var(--quaternary)]">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-[var(--foreground)]/40 font-['Plus_Jakarta_Sans']">
              数据来源：caniuse.com · 截至 2024 年底，全球浏览器覆盖率已达{" "}
              <strong className="text-[var(--quaternary)]">93%+</strong>
            </p>
          </div>

          {/* Performance Note */}
          <div className="p-6 border-2 border-[var(--foreground)] rounded-2xl bg-[var(--quaternary)]/5 shadow-[8px_8px_0px_0px_var(--quaternary)] mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Zap
                size={18}
                strokeWidth={2.5}
                className="text-[var(--quaternary)]"
              />
              <span className="text-sm font-bold font-['Plus_Jakarta_Sans'] text-[var(--foreground)]">
                性能正面影响
              </span>
            </div>
            <p className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] leading-relaxed mb-4">
              Container Queries 建立在{" "}
              <strong className="text-[var(--foreground)]">
                CSS Containment
              </strong>{" "}
              之上。 设置{" "}
              <code className="font-['JetBrains_Mono'] text-[var(--accent)] text-xs">
                container-type: inline-size
              </code>{" "}
              等同于隐式设置了{" "}
              <code className="font-['JetBrains_Mono'] text-[var(--accent)] text-xs">
                contain: inline-size
              </code>
              ， 这让浏览器可以：
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  metric: "Layout Isolation",
                  desc: "容器内布局变化不会触发外部重排（Reflow）",
                  num: "~60%",
                  numDesc: "减少重排范围",
                },
                {
                  metric: "Paint Containment",
                  desc: "浏览器可以独立光栅化容器区域",
                  num: "~30%",
                  numDesc: "减少绘制面积",
                },
                {
                  metric: "Skip Off-screen",
                  desc: "不可见容器可以跳过子元素的样式计算",
                  num: "~40%",
                  numDesc: "节省计算开销",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 border-2 border-[var(--foreground)]/10 rounded-xl bg-[var(--card)]"
                >
                  <span className="text-2xl font-extrabold font-['Outfit'] text-[var(--quaternary)]">
                    {item.num}
                  </span>
                  <span className="block text-[10px] text-[var(--foreground)]/40 font-['Plus_Jakarta_Sans'] mb-2">
                    {item.numDesc}
                  </span>
                  <p className="text-xs font-bold font-['Plus_Jakarta_Sans'] text-[var(--foreground)] mb-1">
                    {item.metric}
                  </p>
                  <p className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Anti-patterns */}
          <h3 className="text-xl font-extrabold font-['Outfit'] text-[var(--foreground)] mb-6 flex items-center gap-2">
            <AlertTriangle
              size={20}
              strokeWidth={2.5}
              className="text-[var(--secondary)]"
            />
            常见陷阱 & Anti-Patterns
          </h3>

          <div className="space-y-6">
            {/* Anti-pattern 1 */}
            <div className="border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_var(--secondary)]">
              <div className="px-6 py-4 bg-[var(--secondary)]/10 border-b-2 border-[var(--foreground)] flex items-center gap-3">
                <XCircle
                  size={18}
                  strokeWidth={2.5}
                  className="text-[var(--secondary)]"
                />
                <span className="text-sm font-bold font-['Plus_Jakarta_Sans'] text-[var(--foreground)]">
                  Anti-Pattern #1：用 @container 替代 @media 做页面级布局
                </span>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border-2 border-[var(--secondary)]/30 rounded-xl bg-[var(--secondary)]/5">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle
                        size={14}
                        strokeWidth={2.5}
                        className="text-[var(--secondary)]"
                      />
                      <span className="text-xs font-bold text-[var(--secondary)] uppercase tracking-wider font-['Plus_Jakarta_Sans']">
                        错误
                      </span>
                    </div>
                    <pre className="text-xs font-['JetBrains_Mono'] text-[var(--foreground)]/60 leading-relaxed overflow-x-auto">
                      <code>{`/* ❌ 不要用 @container 控制页面骨架 */
body {
  container-type: inline-size;
}

@container (min-width: 1024px) {
  .page-layout {
    grid-template-columns: 250px 1fr;
  }
}`}</code>
                    </pre>
                  </div>
                  <div className="p-4 border-2 border-[var(--quaternary)]/30 rounded-xl bg-[var(--quaternary)]/5">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2
                        size={14}
                        strokeWidth={2.5}
                        className="text-[var(--quaternary)]"
                      />
                      <span className="text-xs font-bold text-[var(--quaternary)] uppercase tracking-wider font-['Plus_Jakarta_Sans']">
                        正确
                      </span>
                    </div>
                    <pre className="text-xs font-['JetBrains_Mono'] text-[var(--foreground)]/60 leading-relaxed overflow-x-auto">
                      <code>{`/* ✅ 页面骨架用 @media */
@media (min-width: 1024px) {
  .page-layout {
    grid-template-columns: 250px 1fr;
  }
}

/* ✅ 组件用 @container */
@container sidebar (min-width: 280px) {
  .sidebar-nav { flex-direction: row }
}`}</code>
                    </pre>
                  </div>
                </div>
                <p className="mt-4 text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans'] leading-relaxed">
                  <strong className="text-[var(--foreground)]">
                    黄金法则：
                  </strong>
                  @media 管页面骨架（viewport），@container
                  管组件内容（component）。 两者不是替代关系，而是互补关系。
                </p>
              </div>
            </div>

            {/* Anti-pattern 2 */}
            <div className="border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_var(--tertiary)]">
              <div className="px-6 py-4 bg-[var(--tertiary)]/10 border-b-2 border-[var(--foreground)] flex items-center gap-3">
                <XCircle
                  size={18}
                  strokeWidth={2.5}
                  className="text-[var(--tertiary)]"
                />
                <span className="text-sm font-bold font-['Plus_Jakarta_Sans'] text-[var(--foreground)]">
                  Anti-Pattern #2：container-type: size 没给显式高度
                </span>
              </div>
              <div className="p-6">
                <CodeBlock
                  code={codeAntiSize}
                  language="css"
                  title="size vs inline-size"
                />
                <p className="mt-4 text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans'] leading-relaxed">
                  <strong className="text-[var(--foreground)]">记住：</strong>
                  <code className="font-['JetBrains_Mono'] text-[var(--accent)] text-xs">
                    container-type: size
                  </code>{" "}
                  要求元素有显式的宽高。 如果高度是{" "}
                  <code className="font-['JetBrains_Mono'] text-xs">auto</code>
                  ，<code className="font-['JetBrains_Mono'] text-xs">cqb</code>{" "}
                  单位会等于 0。 99% 的情况用{" "}
                  <code className="font-['JetBrains_Mono'] text-[var(--accent)] text-xs">
                    inline-size
                  </code>{" "}
                  就够了。
                </p>
              </div>
            </div>

            {/* Anti-pattern 3 */}
            <div className="border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_var(--accent)]">
              <div className="px-6 py-4 bg-[var(--accent)]/10 border-b-2 border-[var(--foreground)] flex items-center gap-3">
                <XCircle
                  size={18}
                  strokeWidth={2.5}
                  className="text-[var(--accent)]"
                />
                <span className="text-sm font-bold font-['Plus_Jakarta_Sans'] text-[var(--foreground)]">
                  Anti-Pattern #3：过度嵌套容器上下文
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-2 mb-4">
                  <AlertTriangle
                    size={14}
                    strokeWidth={2.5}
                    className="text-[var(--tertiary)] mt-0.5 shrink-0"
                  />
                  <p className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] leading-relaxed">
                    每个容器上下文都有渲染开销。嵌套 5-6
                    层容器上下文会导致布局计算成本翻倍。
                    <strong className="text-[var(--foreground)]">
                      {" "}
                      实际经验：组件库中 2-3 层足够
                    </strong>
                    （Layout → Section → Component）。
                  </p>
                </div>
                <div className="p-4 border-2 border-[var(--foreground)]/10 rounded-xl bg-[var(--background)]">
                  <p className="text-xs font-bold font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/40 mb-2 uppercase tracking-wider">
                    推荐的容器层级
                  </p>
                  <div className="flex flex-col gap-1 font-['JetBrains_Mono'] text-xs text-[var(--foreground)]/60">
                    <span>
                      <span className="text-[var(--accent)]">L1</span> Page
                      Layout → <code>container-type: inline-size</code>
                    </span>
                    <span className="pl-4">
                      ├─ <span className="text-[var(--secondary)]">L2</span>{" "}
                      Section/Sidebar → <code>container-type: inline-size</code>
                    </span>
                    <span className="pl-4">
                      │ └─ <span className="text-[var(--quaternary)]">L3</span>{" "}
                      Component (Card, Nav) →{" "}
                      <code>container-type: inline-size</code>
                    </span>
                    <span className="pl-4">
                      └─ <span className="text-[var(--quaternary)]">L3</span>{" "}
                      Component (Card, Nav) →{" "}
                      <code>container-type: inline-size</code>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────
          CHEAT SHEET
          ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 border-2 border-[var(--foreground)] rounded-xl bg-[var(--tertiary)] shadow-[4px_4px_0px_0px_var(--foreground)]">
              <BookOpen
                size={20}
                strokeWidth={2.5}
                className="text-[var(--foreground)]"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
              Cheat Sheet
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--foreground)] font-['Outfit'] mb-10">
            速查手册 📋
          </h2>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-3 gap-5">
            {/* Card 1: container-type */}
            <div className="topic-card p-6 md:col-span-1">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-[var(--foreground)] bg-[var(--accent)] mb-4 shadow-[3px_3px_0px_0px_var(--foreground)]">
                <Box size={18} strokeWidth={2.5} className="text-white" />
              </div>
              <h4 className="font-bold font-['Outfit'] text-[var(--foreground)] mb-1">
                container-type
              </h4>
              <p className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans'] mb-3">
                定义容器查询的轴
              </p>
              <div className="space-y-1.5">
                {["inline-size", "size", "normal"].map((v) => (
                  <div key={v} className="flex items-center gap-2">
                    <code className="font-['JetBrains_Mono'] text-[var(--accent)] text-xs bg-[var(--accent)]/10 px-1.5 py-0.5 rounded">
                      {v}
                    </code>
                    <span className="text-xs text-[var(--foreground)]/40 font-['Plus_Jakarta_Sans']">
                      {v === "inline-size"
                        ? "仅内联轴（推荐）"
                        : v === "size"
                          ? "两个轴"
                          : "不创建上下文"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: container-name */}
            <div className="topic-card p-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-[var(--foreground)] bg-[var(--secondary)] mb-4 shadow-[3px_3px_0px_0px_var(--foreground)]">
                <Layout size={18} strokeWidth={2.5} className="text-white" />
              </div>
              <h4 className="font-bold font-['Outfit'] text-[var(--foreground)] mb-1">
                container-name
              </h4>
              <p className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans'] mb-3">
                命名容器，精确查询
              </p>
              <code className="block font-['JetBrains_Mono'] text-[var(--foreground)]/70 text-xs bg-[var(--background)] p-2 rounded-lg border border-[var(--foreground)]/10">
                container-name: sidebar;
              </code>
              <p className="text-xs text-[var(--foreground)]/40 font-['Plus_Jakarta_Sans'] mt-2">
                禁止用 &ldquo;none&rdquo; 以外的 CSS 关键字
              </p>
            </div>

            {/* Card 3: @container */}
            <div className="topic-card p-6 md:col-span-1">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-[var(--foreground)] bg-[var(--quaternary)] mb-4 shadow-[3px_3px_0px_0px_var(--foreground)]">
                <Code2 size={18} strokeWidth={2.5} className="text-white" />
              </div>
              <h4 className="font-bold font-['Outfit'] text-[var(--foreground)] mb-1">
                @container
              </h4>
              <p className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans'] mb-3">
                查询容器条件
              </p>
              <div className="font-['JetBrains_Mono'] text-xs text-[var(--foreground)]/70 bg-[var(--background)] p-2 rounded-lg border border-[var(--foreground)]/10 space-y-1">
                <div>
                  <span className="text-[var(--secondary)]">@container</span>{" "}
                  (min-width: 400px) {"{ }"}
                </div>
                <div>
                  <span className="text-[var(--secondary)]">@container</span>{" "}
                  name (min-inline-size: 300px) {"{ }"}
                </div>
                <div>
                  <span className="text-[var(--secondary)]">@container</span>{" "}
                  name (width {"<"} 600px) {"{ }"}
                </div>
              </div>
            </div>

            {/* Card 4: Units */}
            <div className="topic-card p-6 md:col-span-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-[var(--foreground)] bg-[var(--tertiary)] mb-4 shadow-[3px_3px_0px_0px_var(--foreground)]">
                <Scaling
                  size={18}
                  strokeWidth={2.5}
                  className="text-[var(--foreground)]"
                />
              </div>
              <h4 className="font-bold font-['Outfit'] text-[var(--foreground)] mb-1">
                Container Query Units
              </h4>
              <p className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans'] mb-3">
                容器相对单位，替代 vw/vh
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { u: "cqi", d: "容器 inline 尺寸的 1%" },
                  { u: "cqb", d: "容器 block 尺寸的 1%" },
                  { u: "cqmin", d: "cqi/cqb 中较小者的 1%" },
                  { u: "cqmax", d: "cqi/cqb 中较大者的 1%" },
                ].map((item) => (
                  <div
                    key={item.u}
                    className="flex items-center gap-2 p-2 bg-[var(--background)] rounded-lg border border-[var(--foreground)]/10"
                  >
                    <code className="font-['JetBrains_Mono'] text-[var(--accent)] text-sm font-bold shrink-0">
                      {item.u}
                    </code>
                    <span className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
                      {item.d}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 5: Shorthand */}
            <div className="topic-card p-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-[var(--foreground)] bg-[var(--foreground)] mb-4 shadow-[3px_3px_0px_0px_var(--foreground)]">
                <Zap size={18} strokeWidth={2.5} className="text-white" />
              </div>
              <h4 className="font-bold font-['Outfit'] text-[var(--foreground)] mb-1">
                Shorthand
              </h4>
              <p className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans'] mb-3">
                一行搞定
              </p>
              <code className="block font-['JetBrains_Mono'] text-[var(--accent)] text-xs bg-[var(--background)] p-2 rounded-lg border border-[var(--foreground)]/10">
                container: inline-size / name;
              </code>
              <p className="text-xs text-[var(--foreground)]/40 font-['Plus_Jakarta_Sans'] mt-2">
                type / name
              </p>
            </div>

            {/* Card 6: Decision Guide */}
            <div className="topic-card p-6 md:col-span-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-[var(--foreground)] bg-[var(--accent)] mb-4 shadow-[3px_3px_0px_0px_var(--foreground)]">
                <ChevronRight
                  size={18}
                  strokeWidth={2.5}
                  className="text-white"
                />
              </div>
              <h4 className="font-bold font-['Outfit'] text-[var(--foreground)] mb-3">
                什么时候用 @media，什么时候用 @container？
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-[var(--accent)]/30 rounded-xl bg-[var(--accent)]/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor
                      size={14}
                      strokeWidth={2.5}
                      className="text-[var(--accent)]"
                    />
                    <span className="text-sm font-bold font-['Plus_Jakarta_Sans'] text-[var(--accent)]">
                      @media（视口）
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans']">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2
                        size={12}
                        strokeWidth={2.5}
                        className="text-[var(--quaternary)] mt-0.5 shrink-0"
                      />{" "}
                      页面整体骨架布局
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2
                        size={12}
                        strokeWidth={2.5}
                        className="text-[var(--quaternary)] mt-0.5 shrink-0"
                      />{" "}
                      显示/隐藏整块区域（如 sidebar）
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2
                        size={12}
                        strokeWidth={2.5}
                        className="text-[var(--quaternary)] mt-0.5 shrink-0"
                      />{" "}
                      全局排版调整（如 base font-size）
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2
                        size={12}
                        strokeWidth={2.5}
                        className="text-[var(--quaternary)] mt-0.5 shrink-0"
                      />{" "}
                      打印样式（@media print）
                    </li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-[var(--secondary)]/30 rounded-xl bg-[var(--secondary)]/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Box
                      size={14}
                      strokeWidth={2.5}
                      className="text-[var(--secondary)]"
                    />
                    <span className="text-sm font-bold font-['Plus_Jakarta_Sans'] text-[var(--secondary)]">
                      @container（容器）
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans']">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2
                        size={12}
                        strokeWidth={2.5}
                        className="text-[var(--quaternary)] mt-0.5 shrink-0"
                      />{" "}
                      组件内部布局切换（Card、Nav、Widget）
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2
                        size={12}
                        strokeWidth={2.5}
                        className="text-[var(--quaternary)] mt-0.5 shrink-0"
                      />{" "}
                      可复用的 UI 组件库
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2
                        size={12}
                        strokeWidth={2.5}
                        className="text-[var(--quaternary)] mt-0.5 shrink-0"
                      />{" "}
                      Grid 项自适应（列数变化时卡片重排）
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2
                        size={12}
                        strokeWidth={2.5}
                        className="text-[var(--quaternary)] mt-0.5 shrink-0"
                      />{" "}
                      字体大小随容器平滑缩放
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────
          FOOTER / SUMMARY
          ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-8 border-3 border-[var(--foreground)] rounded-[2rem] bg-[var(--accent)] shadow-[8px_8px_0px_0px_var(--foreground)] animate-pop">
              <Box size={36} strokeWidth={2.5} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-['Outfit'] text-[var(--foreground)] mb-6">
              核心记忆点
            </h2>
            <div className="space-y-4 text-left">
              {[
                {
                  emoji: "🪞",
                  text: "Container Queries 让组件看容器，而非视口",
                },
                {
                  emoji: "🧩",
                  text: "两步走：container-type → @container (condition)",
                },
                { emoji: "🎯", text: "命名容器 (container-name) 精确查询目标" },
                { emoji: "📏", text: "cqi/cqb 单位让字体/尺寸随容器平滑缩放" },
                {
                  emoji: "⚡",
                  text: "内置 Containment 优化，性能比 Media Query 更好",
                },
                { emoji: "🤝", text: "与 @media 互补，不是替代" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 border-2 border-[var(--foreground)] rounded-2xl bg-[var(--card)] shadow-[4px_4px_0px_0px_var(--foreground)]"
                >
                  <span className="text-2xl shrink-0">{item.emoji}</span>
                  <span className="text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)] font-medium">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 border-2 border-[var(--foreground)] rounded-2xl bg-[var(--accent)] shadow-[8px_8px_0px_0px_var(--foreground)]">
              <p className="text-white font-['Plus_Jakarta_Sans'] text-sm leading-relaxed">
                <strong className="text-lg font-['Outfit']">一句话总结</strong>
                <br />
                <span className="opacity-90">
                  Container Queries 把响应式设计的粒度从 <strong>页面</strong>{" "}
                  细化到了 <strong>组件</strong>。 组件从此可以 &ldquo;write
                  once, adapt anywhere&rdquo;——这才是组件化的终极形态。
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom padding */}
      <div className="pb-12" />
    </div>
  );
}
