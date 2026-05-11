"use client";

import { useState } from "react";
import { highlightCode } from "@/lib/prism-highlight";
import {
  Layers,
  GitBranch,
  Zap,
  Package,
  FolderTree,
  Rocket,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Copy,
  Gauge,
  Clock,
  Cpu,
  Download,
  ChevronRight,
  Terminal,
  Boxes,
  Shuffle,
  BookOpen,
  Lightbulb,
  Target,
  Scale,
} from "lucide-react";

/* ──────────────────── Code Block Component ──────────────────── */
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

/* ──────────────────── Section Header ──────────────────── */
function SectionHeader({
  icon: Icon,
  label,
  title,
  color,
}: {
  icon: React.ElementType;
  label: string;
  title: string;
  color: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl border-2 border-[var(--foreground)] flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <Icon
            size={20}
            strokeWidth={2.5}
            className="text-[var(--foreground)]"
          />
        </div>
        <span
          className="font-['Outfit'] font-bold text-xs uppercase tracking-[0.15em] px-3 py-1 rounded-full border-2 border-[var(--foreground)]"
          style={{ backgroundColor: color + "33" }}
        >
          {label}
        </span>
      </div>
      <h2 className="font-['Outfit'] font-extrabold text-3xl md:text-4xl text-[var(--foreground)]">
        {title}
      </h2>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function MonorepoPage() {
  const [selectedTool, setSelectedTool] = useState<"pnpm" | "turborepo" | "nx">(
    "pnpm",
  );
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const [parallelism, setParallelism] = useState(3);
  const [packageCount, setPackageCount] = useState(5);

  /* ── Turborepo pipeline code ── */
  const turboPipelineCode = `{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],    // ← 先构建所有依赖包
      "outputs": ["dist/**"]      // ← 缓存这些产物
    },
    "test": {
      "dependsOn": ["build"],     // ← 本包构建完才能测
      "outputs": []
    },
    "lint": {
      "outputs": []               // ← lint 无产物，纯副作用
    },
    "dev": {
      "cache": false,             // ← 开发服务不缓存
      "persistent": true
    },
    "deploy": {
      "dependsOn": ["build", "test"],
      "outputs": [],
      "cache": false              // ← 部署不缓存！
    }
  }
}`;

  /* ── Nx project.json code ── */
  const nxProjectCode = `// apps/web/project.json
{
  "name": "web",
  "targets": {
    "build": {
      "executor": "@nx/webpack:webpack",
      "options": {
        "outputPath": "dist/apps/web",
        "main": "apps/web/src/main.ts",
        "tsConfig": "apps/web/tsconfig.app.json"
      },
      "dependsOn": ["^build"]     // ← 依赖图拓扑排序
    },
    "test": {
      "executor": "@nx/jest:jest",
      "options": {
        "jestConfig": "apps/web/jest.config.ts",
        "passWithNoTests": true
      }
    },
    "lint": {
      "executor": "@nx/eslint:lint",
      "options": {
        "lintFilePatterns": ["apps/web/**/*.{ts,tsx}"]
      }
    }
  }
}`;

  /* ── pnpm workspace code ── */
  const pnpmWorkspaceCode = `# pnpm-workspace.yaml  —— Monorepo 的地基文件
packages:
  - "packages/*"     # 共享库：ui / utils / config
  - "apps/*"         # 应用：web / admin / api
  - "plugins/*"      # 插件（可选）`;

  const pnpmPackageJsonCode = `{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "dev": "pnpm -r --parallel run dev",     // ← -r 递归所有包
    "build": "pnpm -r run build",
    "lint": "pnpm -r run lint",
    "test": "pnpm -r run test",
    "clean": "pnpm -r run clean"
  }
}`;

  /* ── Dependency isolation code ── */
  const isolationBadCode = `// ❌ npm / yarn classic 的扁平化 node_modules
//
// node_modules/
// ├── react@17.0.2          ← 顶层只有 1 个版本
// ├── lodash@4.17.21
// └── some-lib/
//     └── node_modules/
//         └── lodash@3.10.1  ← 不同版本可能被提升到顶层
//
// 问题：幽灵依赖 (Phantom Dependencies)
// 你的代码可以直接 import "lodash"，即使你没有声明依赖它！`;

  const isolationGoodCode = `// ✅ pnpm 的严格 node_modules 结构
//
// node_modules/
// ├── .pnpm/                 ← 全局内容寻址存储
// │   ├── react@18.2.0/
// │   │   └── node_modules/
// │   │       └── react/     ← 硬链接到 store
// │   └── lodash@4.17.21/
// ├── .modules.yaml
// └── react → .pnpm/react@18.2.0/node_modules/react  ← 符号链接
//
// 你的代码只能 import 你在 package.json 中声明的依赖
// 未声明的 import 会直接报错 —— 彻底消灭幽灵依赖`;

  /* ── Caching & Task Orchestration ── */
  const turboCacheCode = `# Turborepo 缓存实战
# 第一次构建：全部执行，~120 秒
$ pnpm turbo run build
┌──── web#build → dist/**
│    cache miss, executing...          48.2s
├──── admin#build → dist/**
│    cache miss, executing...          35.1s
├──── shared-ui#build → dist/**
│    cache miss, executing...          12.4s
├──── utils#build → dist/**
│    cache miss, executing...           3.8s
│
│    Tasks:      4 successful, 4 total
│    Cached:     0/4
│    Duration:   99.5s  (↑ 并行执行，串行需 ~120s)

# 修改 utils 后第二次构建：只重建受影响的包！
$ pnpm turbo run build
┌──── shared-ui#build → dist/**
│    cache miss (dependency changed),   12.4s  ← 依赖了 utils
├──── web#build → dist/**
│    cache miss (dependency changed),   48.2s  ← 间接依赖
├──── admin#build → dist/**
│    cache miss (dependency changed),   35.1s
├──── utils#build → dist/**
│    cache miss (source changed),        3.8s  ← 源码变了
│
│    Tasks:      4 successful, 4 total
│    Cached:     0/4      ← 全部缓存失效
│    Duration:   42.3s    ← 并行后显著缩短

# 未修改任何文件的第三次构建：
$ pnpm turbo run build
│    Tasks:      4 successful, 4 total
│    Cached:     4/4      ← 全部命中缓存！
│    Duration:   1.2s     ← 🚀 从 120s 到 1.2s`;

  /* ── Remote cache code ── */
  const remoteCacheCode = `// turbo.json 远程缓存配置
{
  "$schema": "https://turbo.build/schema.json",
  "remoteCache": {
    "signature": true        // ← 开启签名验证，防止缓存投毒
  }
}

// Vercel 零配置远程缓存
$ npx turbo login
$ npx turbo link
# 现在所有 CI 机器共享同一个缓存 —— 团队 20 人不再重复构建`;

  /* ── Publishing code ── */
  const changesetCode = `# 使用 changesets 管理发布流程

# 1. 添加变更记录
$ pnpm changeset
? Which packages would you like to include?
  ◉ @myorg/shared-ui   (minor)
  ◯ @myorg/utils        (patch)
  ◉ @myorg/web          (major)
? Provide a summary: 添加 Button 组件的 size 属性

# 生成 .changeset/silly-cats-dance.md
# ---
# '@myorg/shared-ui': minor
# '@myorg/web': major
# ---
# 添加 Button 组件的 size 属性

# 2. 版本升级（自动更新依赖关系）
$ pnpm changeset version
# shared-ui: 1.2.0 → 1.3.0
# web:       2.0.0 → 3.0.0   ← 因为 major
# utils:     不变               ← 未选中

# 3. 发布
$ pnpm changeset publish
# npm notice: @myorg/shared-ui@1.3.0
# npm notice: @myorg/web@3.0.0`;

  /* ── Nx affected code ── */
  const nxAffectedCode = `# Nx 的杀手锏：affected 命令
# 只测试受当前分支改动影响的包
$ nx affected --target=test --base=main --head=HEAD

# Nx 自动分析 git diff，构建依赖图：
# packages/utils/src/math.ts 改了
#   → packages/utils (direct)
#   → packages/shared-ui (depends on utils)
#   → apps/web (depends on shared-ui)
#   → apps/admin (depends on shared-ui)
#
# 未受影响的包完全跳过 —— 在 50+ 包的仓库中节省 70%+ CI 时间

# 分析依赖图（生成可视化 HTML）
$ nx graph
# 浏览器打开交互式依赖关系图，支持按路径过滤`;

  /* ── Workspace protocol code ── */
  const workspaceProtocolCode = `{
  "name": "@myorg/web",
  "dependencies": {
    "@myorg/shared-ui": "workspace:*",    // ← 始终链接本地最新
    "@myorg/utils": "workspace:^1.0.0",   // ← 发布时转为 ^1.0.0
    "react": "^18.2.0"
  }
}
// pnpm 自动处理：
// 开发时 → 符号链接到 packages/shared-ui
// 发布时 → "workspace:*" 被替换为实际版本号`;

  /* ── Interactive Playground ── */
  const getPlaygroundConfig = () => {
    const configs = {
      pnpm: {
        title: "pnpm workspace",
        description: "底层基础设施，零开销依赖管理",
        pros: [
          "原生 workspace 支持",
          "严格依赖隔离",
          "磁盘占用降低 50-70%",
          "零学习曲线",
        ],
        cons: ["无任务编排", "无缓存机制", "需要自建脚本"],
        setup: `# 1. 安装 pnpm
$ npm install -g pnpm@9

# 2. 根目录创建 workspace 配置
$ cat > pnpm-workspace.yaml << EOF
packages:
  - "packages/*"
  - "apps/*"
EOF

# 3. 安装依赖
$ pnpm install    # 自动链接所有 workspace 包

# 4. 跨包命令
$ pnpm --filter @myorg/web add @myorg/utils   # 安装本地依赖
$ pnpm --filter @myorg/shared-ui run build     # 只在指定包执行
$ pnpm -r run build                            # 递归执行所有包`,
      },
      turborepo: {
        title: "Turborepo",
        description: "基于 pnpm 的高速任务编排引擎",
        pros: [
          "配置极简 (JSON)",
          "本地 + 远程缓存",
          "并行任务调度",
          "零运行时开销",
        ],
        cons: [
          "企业功能靠 Vercel",
          "插件生态较薄",
          "Monorepo-specific Lint 需自建",
        ],
        setup: `# 1. 在 pnpm workspace 基础上添加 turbo
$ pnpm add -Dw turbo

# 2. 创建 turbo.json
$ cat > turbo.json << 'EOF'
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "test":  { "dependsOn": ["build"] },
    "lint":  {},
    "dev":   { "cache": false, "persistent": true }
  }
}
EOF

# 3. 替换 package.json scripts
$ pnpm turbo run build     # 智能缓存 + 并行
$ pnpm turbo run build --filter=web  # 只构建 web 及其依赖`,
      },
      nx: {
        title: "Nx",
        description: "全功能 Monorepo 平台 + 可扩展插件系统",
        pros: [
          "affected 命令（精准 CI）",
          "丰富的插件生态",
          "项目生成器 (Generator)",
          "交互式依赖图",
        ],
        cons: ["学习曲线陡峭", "引入运行时依赖", "配置复杂度高"],
        setup: `# 1. 初始化 Nx（交互式向导）
$ npx create-nx-workspace my-monorepo --preset=ts

# 2. 添加应用插件
$ nx add @nx/react
$ nx g @nx/react:app web --directory=apps/web

# 3. 添加库
$ nx g @nx/js:lib shared-ui --directory=packages/shared-ui

# 4. 运行任务
$ nx run-many -t build              # 全部构建
$ nx affected -t test --base=main   # 只测试受影响的包
$ nx graph                          # 可视化依赖图`,
      },
    };
    return configs[selectedTool];
  };

  const config = getPlaygroundConfig();

  /* ── Scenario recommendation code ── */
  const scenarioCode = `# 🏗️ 推荐组合：pnpm + Turborepo（覆盖率 ~85% 场景）

# 这是目前社区最主流的搭配：
# • pnpm 负责依赖管理 + workspace 协议
# • Turborepo 负责任务编排 + 远程缓存
# • changesets 负责版本管理 + 发布
#
# 学习成本：~2 小时 | 维护成本：极低
# 适用团队：3-50 人 | 包数量：5-100 个

$ pnpm create turbo@latest   # 一行命令搞定脚手架`;

  return (
    <div className="bg-dot-grid min-h-screen">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden container pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Background Blobs */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 opacity-20 -z-10"
          style={{
            background: "var(--accent)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 opacity-15 -z-10"
          style={{
            background: "var(--tertiary)",
            borderRadius: "40% 60% 70% 30% / 30% 70% 40% 60%",
          }}
        />

        <div className="container mx-auto px-6">
          <div className="animate-pop">
            {/* Breadcrumb Tag */}
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold font-['Plus_Jakarta_Sans'] uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 border-2 border-[var(--accent)] rounded-full">
                <Boxes size={14} strokeWidth={2.5} />
                工程架构
              </span>
              <ChevronRight size={14} className="text-[var(--border)]" />
              <span className="text-xs font-semibold text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
                Monorepo 选型与实战
              </span>
            </div>

            {/* Title */}
            <h1 className="font-['Outfit'] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--foreground)] leading-[1.08] mb-6 max-w-4xl">
              Monorepo 架构
              <br />
              <span className="text-[var(--accent)]">全链路深度解析</span>
            </h1>

            {/* L1 Intuitive Anchor */}
            <div className="max-w-3xl">
              <p className="text-lg md:text-xl text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] leading-relaxed mb-8">
                <strong className="text-[var(--foreground)]">
                  想象一个大型购物中心
                </strong>{" "}
                ——
                每家店铺（包）独立经营，但共享同一栋建筑（仓库）、同一套消防系统（CI/CD）
                和同一个导航地图（依赖图）。这，就是 Monorepo。
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-3">
              {[
                {
                  label: "磁盘节省 50-70%",
                  icon: Gauge,
                  color: "var(--quaternary)",
                },
                { label: "CI 时间减半", icon: Clock, color: "var(--tertiary)" },
                { label: "原子提交", icon: GitBranch, color: "var(--accent)" },
                {
                  label: "依赖零漂移",
                  icon: Package,
                  color: "var(--secondary)",
                },
              ].map((stat) => (
                <span
                  key={stat.label}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold font-['Plus_Jakarta_Sans'] border-2 border-[var(--foreground)] rounded-xl shadow-[4px_4px_0px_0px_var(--foreground)] bg-white"
                >
                  <stat.icon
                    size={16}
                    strokeWidth={2.5}
                    style={{ color: stat.color }}
                  />
                  {stat.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ L2: WHY MONOREPO ═══════════ */}
      <section className="container mx-auto px-6 pb-20">
        <div className="animate-slide">
          <SectionHeader
            icon={Target}
            label="L2 · 痛点与动机"
            title="为什么你需要 Monorepo？"
            color="var(--secondary)"
          />

          {/* Before / After Comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Multi-repo Pain */}
            <div className="topic-card p-6 rounded-2xl bg-white border-2 border-[var(--foreground)] shadow-[6px_6px_0px_0px_#F472B6]">
              <div className="flex items-center gap-2 mb-4">
                <XCircle size={22} strokeWidth={2.5} className="text-red-500" />
                <span className="font-['Outfit'] font-bold text-lg">
                  Multi-Repo 之痛
                </span>
              </div>
              <ul className="space-y-3 text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/80">
                {[
                  "跨仓库改一个类型定义，需要 4 个 PR + 4 次 npm publish",
                  "react 版本不一致导致运行时幽灵 bug，排查耗时 2-4 小时",
                  "每个仓库独立 CI 配置，维护 15+ 个 .github/workflows",
                  "共享代码要么 copy-paste，要么发布 200 行的 npm 包",
                  "新人 onboarding 需要 clone 8 个仓库，配好全部 link",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-red-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Monorepo Solution */}
            <div className="topic-card p-6 rounded-2xl bg-white border-2 border-[var(--foreground)] shadow-[6px_6px_0px_0px_var(--quaternary)]">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2
                  size={22}
                  strokeWidth={2.5}
                  className="text-[var(--quaternary)]"
                />
                <span className="font-['Outfit'] font-bold text-lg">
                  Monorepo 之利
                </span>
              </div>
              <ul className="space-y-3 text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/80">
                {[
                  "改类型定义？一次提交，所有包立即同步，CI 自动回归",
                  "依赖版本统一管理，pnpm 严格隔离消除幽灵依赖",
                  "一套 CI 配置 + Turborepo 智能缓存，只跑受影响的包",
                  "共享代码直接 import，修改即生效，零发布开销",
                  "git clone 一次，pnpm install 全部搞定，10 分钟 onboarding",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[var(--quaternary)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Evolution Timeline */}
          <div className="topic-card p-6 md:p-8 rounded-2xl bg-white border-2 border-[var(--foreground)]">
            <h3 className="font-['Outfit'] font-bold text-xl mb-6 flex items-center gap-2">
              <Clock
                size={20}
                strokeWidth={2.5}
                className="text-[var(--accent)]"
              />
              Monorepo 工具演化史
            </h3>
            <div className="relative pl-8 border-l-[3px] border-dashed border-[var(--border)] space-y-8">
              {[
                {
                  year: "2014",
                  title: "Bolt (早期尝试)",
                  desc: "提出 workspace 概念，但性能差，已停止维护",
                  color: "var(--border)",
                },
                {
                  year: "2017",
                  title: "Yarn Workspaces",
                  desc: "首个主流方案，但扁平化 node_modules 导致幽灵依赖",
                  color: "var(--tertiary)",
                },
                {
                  year: "2020",
                  title: "pnpm v5",
                  desc: "内容寻址存储 + 严格隔离，磁盘占用降低 50-70%，成为新标准",
                  color: "var(--quaternary)",
                },
                {
                  year: "2021",
                  title: "Turborepo 开源",
                  desc: "Vercel 收购后开源，引入增量构建 + 远程缓存，配置极简",
                  color: "var(--accent)",
                },
                {
                  year: "2022",
                  title: "Nx 15+",
                  desc: "添加 Crystal 自动推断、Module Federation 支持，向全平台演进",
                  color: "var(--secondary)",
                },
                {
                  year: "2024",
                  title: "当前格局",
                  desc: "pnpm + Turborepo 成为主流搭配，Nx 占据企业级市场",
                  color: "var(--foreground)",
                },
              ].map((item, i) => (
                <div key={i} className="relative flex items-start gap-4">
                  <div
                    className="absolute -left-[calc(2rem+7px)] w-3.5 h-3.5 rounded-full border-2 border-[var(--foreground)] bg-white"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <span className="font-['JetBrains_Mono'] text-xs font-bold text-[var(--accent)]">
                      {item.year}
                    </span>
                    <h4 className="font-['Outfit'] font-bold text-base mt-0.5">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ L3: CORE PRINCIPLES ═══════════ */}
      <section className="container mx-auto px-6 pb-20">
        <SectionHeader
          icon={Layers}
          label="L3 · 核心原理"
          title="三大支柱：隔离、编排、缓存"
          color="var(--accent)"
        />

        {/* ─── 3.1 Dependency Isolation ─── */}
        <div className="mb-12">
          <h3 className="font-['Outfit'] font-bold text-2xl mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border-2 border-[var(--foreground)] bg-[var(--tertiary)] flex items-center justify-center text-sm font-bold">
              1
            </div>
            依赖隔离 (Dependency Isolation)
          </h3>

          <div className="topic-card p-6 md:p-8 rounded-2xl bg-white border-2 border-[var(--foreground)] mb-6">
            <p className="font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/80 mb-6 leading-relaxed">
              npm/yarn classic 采用
              <strong className="text-[var(--foreground)]">
                扁平化提升 (hoisting)
              </strong>
              策略 —— 将所有依赖提升到根{" "}
              <code className="font-['JetBrains_Mono'] text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded text-sm">
                node_modules
              </code>
              。 这导致了两个严重问题：
              <strong className="text-[var(--foreground)]">
                幽灵依赖 (Phantom Dependencies)
              </strong>{" "}
              —— 你可以 import 未声明的包；
              <strong className="text-[var(--foreground)]">
                依赖地狱 (Dependency Hell)
              </strong>{" "}
              —— 同一个包只能存在一个版本。
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <CodeBlock
                code={isolationBadCode}
                language="bash"
                title="❌ 传统扁平化结构"
              />
              <CodeBlock
                code={isolationGoodCode}
                language="bash"
                title="✅ pnpm 严格隔离结构"
              />
            </div>
          </div>

          {/* Workspace Protocol */}
          <div className="topic-card p-6 md:p-8 rounded-2xl bg-white border-2 border-[var(--foreground)]">
            <h4 className="font-['Outfit'] font-bold text-lg mb-3 flex items-center gap-2">
              <Link
                size={18}
                strokeWidth={2.5}
                className="text-[var(--quaternary)]"
              />
              workspace: 协议 —— 本地与发布的无缝切换
            </h4>
            <p className="font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70 text-sm mb-4 leading-relaxed">
              pnpm 提供{" "}
              <code className="font-['JetBrains_Mono'] text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded text-xs">
                workspace:*
              </code>{" "}
              协议，
              开发时符号链接到本地包，发布时自动替换为实际版本号。这意味着你永远不需要手动管理内部依赖版本。
            </p>
            <CodeBlock
              code={workspaceProtocolCode}
              language="json"
              title="packages/web/package.json"
            />
          </div>
        </div>

        {/* ─── 3.2 Task Orchestration ─── */}
        <div className="mb-12">
          <h3 className="font-['Outfit'] font-bold text-2xl mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border-2 border-[var(--foreground)] bg-[var(--accent)] flex items-center justify-center text-sm font-bold text-white">
              2
            </div>
            任务编排 (Task Orchestration)
          </h3>

          {/* Visual DAG */}
          <div className="topic-card p-6 md:p-8 rounded-2xl bg-white border-2 border-[var(--foreground)] mb-6">
            <h4 className="font-['Outfit'] font-bold text-lg mb-4">
              依赖图 (DAG) —— 任务调度的基石
            </h4>
            <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/70 mb-6 leading-relaxed">
              Turborepo 和 Nx 都基于
              <strong className="text-[var(--foreground)]">
                有向无环图 (DAG)
              </strong>{" "}
              进行任务调度。 当你写{" "}
              <code className="font-['JetBrains_Mono'] text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded text-xs">
                {'"dependsOn": ["^build"]'}
              </code>{" "}
              时，
              <code className="font-['JetBrains_Mono'] text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded text-xs">
                ^
              </code>{" "}
              前缀表示 "先完成所有上游依赖包的 build，再执行当前包的 build"。
            </p>

            {/* ASCII-style dependency graph */}
            <div className="bg-[#0F172A] border-2 border-[var(--foreground)] rounded-xl p-6 font-['JetBrains_Mono'] text-sm text-[#E2E8F0] overflow-x-auto">
              <pre className="leading-loose">{`
  ┌─────────┐     ┌─────────┐
  │  utils   │     │  config  │      ← 第一层：基础包（并行构建）
  └────┬─────┘     └────┬─────┘
       │                │
       ▼                ▼
  ┌────────────────────────┐
  │      shared-ui          │       ← 第二层：依赖 utils + config
  └───────────┬────────────┘
              │
      ┌───────┴───────┐
      ▼               ▼
 ┌─────────┐    ┌──────────┐
 │   web    │    │  admin   │       ← 第三层：应用层（并行构建）
 └─────────┘    └──────────┘

  无缓存串行: ~180s     有缓存并行: ~45s     全命中缓存: ~2s
              `}</pre>
            </div>
          </div>

          {/* Turborepo pipeline */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <CodeBlock
                code={turboPipelineCode}
                language="json"
                title="turbo.json — Turborepo 任务定义"
              />
            </div>
            <div>
              <CodeBlock
                code={nxProjectCode}
                language="json"
                title="project.json — Nx 任务定义"
              />
            </div>
          </div>

          {/* Comparison Table */}
          <div className="topic-card p-6 rounded-2xl bg-white border-2 border-[var(--foreground)] overflow-x-auto">
            <h4 className="font-['Outfit'] font-bold text-lg mb-4">
              任务编排对比
            </h4>
            <table className="w-full text-sm font-['Plus_Jakarta_Sans'] border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--foreground)]">
                  <th className="text-left py-3 pr-4 font-bold">特性</th>
                  <th className="text-left py-3 px-4 font-bold">
                    pnpm (纯脚本)
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-[var(--accent)]">
                    Turborepo
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-[var(--secondary)]">
                    Nx
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "拓扑排序",
                    "❌ 需手动 --sort",
                    "✅ 自动 (DAG)",
                    "✅ 自动 (DAG)",
                  ],
                  [
                    "并行执行",
                    "⚠️ --parallel (无依赖感知)",
                    "✅ 自动按依赖图并行",
                    "✅ 自动 + 可配 concurrency",
                  ],
                  [
                    "本地缓存",
                    "❌ 无",
                    "✅ 文件指纹 → 本地缓存",
                    "✅ 文件指纹 → 本地缓存",
                  ],
                  [
                    "远程缓存",
                    "❌ 无",
                    "✅ Vercel / 自建",
                    "✅ Nx Cloud (免费 300 CI 小时/月)",
                  ],
                  [
                    "任务依赖",
                    "❌ 手动排序",
                    "✅ dependsOn 语法",
                    "✅ dependsOn + inputs 配置",
                  ],
                  [
                    "增量执行",
                    "❌ 全量",
                    "✅ 缓存命中跳过",
                    "✅ affected 命令 (Git diff)",
                  ],
                  [
                    "配置复杂度",
                    "低 (package.json)",
                    "低 (turbo.json)",
                    "中-高 (project.json + nx.json)",
                  ],
                  ["学习成本", "~30 分钟", "~2 小时", "~1-2 天"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[var(--border)]">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`py-3 pr-4 ${j === 0 ? "font-bold" : ""} ${j > 0 ? "px-4" : ""}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── 3.3 Caching Deep Dive ─── */}
        <div>
          <h3 className="font-['Outfit'] font-bold text-2xl mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border-2 border-[var(--foreground)] bg-[var(--quaternary)] flex items-center justify-center text-sm font-bold">
              3
            </div>
            构建缓存 (Build Cache) —— 从 120 秒到 2 秒
          </h3>

          <div className="topic-card p-6 md:p-8 rounded-2xl bg-white border-2 border-[var(--foreground)] mb-6">
            <p className="font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/80 mb-6 leading-relaxed">
              Turborepo 的缓存机制基于
              <strong className="text-[var(--foreground)]">
                内容哈希 (Content Hash)
              </strong>
              。 它对以下内容计算 SHA-256 哈希：包内源码文件 + 依赖锁定文件 +
              任务配置 + 环境变量。 只要哈希不变，直接恢复上次构建的产物 ——
              连代码都不用执行。
            </p>

            <CodeBlock
              code={turboCacheCode}
              language="bash"
              title="turbo run build — 缓存行为演示"
            />
          </div>

          {/* Remote Cache */}
          <div className="topic-card p-6 md:p-8 rounded-2xl bg-white border-2 border-[var(--foreground)]">
            <h4 className="font-['Outfit'] font-bold text-lg mb-3 flex items-center gap-2">
              <Download
                size={18}
                strokeWidth={2.5}
                className="text-[var(--accent)]"
              />
              远程缓存 —— 团队级别的构建加速
            </h4>
            <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/70 mb-4 leading-relaxed">
              本地缓存只能加速你自己的机器。
              <strong className="text-[var(--foreground)]">
                远程缓存
              </strong>{" "}
              让整个团队共享构建产物 —— 当同事 A 在 CI 上构建了 web 包，同事 B
              本地构建时直接下载缓存结果，耗时从 48 秒降至 0.3 秒。 对于 20
              人团队，远程缓存平均可以节省{" "}
              <strong className="text-[var(--foreground)]">
                60-80% 的 CI 计算时间
              </strong>
              。
            </p>
            <CodeBlock
              code={remoteCacheCode}
              language="bash"
              title="远程缓存配置"
            />
          </div>
        </div>
      </section>

      {/* ═══════════ L3.5: INTERACTIVE PLAYGROUND ═══════════ */}
      <section className="container mx-auto px-6 pb-20">
        <SectionHeader
          icon={Shuffle}
          label="L3.5 · 交互实验场"
          title="三工具选型对比实验室"
          color="var(--tertiary)"
        />

        <div className="topic-card rounded-2xl bg-white border-2 border-[var(--foreground)] shadow-[8px_8px_0px_0px_var(--foreground)] overflow-hidden">
          {/* Tool Selector */}
          <div className="flex border-b-2 border-[var(--foreground)]">
            {(["pnpm", "turborepo", "nx"] as const).map((tool) => (
              <button
                key={tool}
                onClick={() => setSelectedTool(tool)}
                className={`flex-1 py-4 px-6 font-['Outfit'] font-bold text-base sm:text-lg transition-all border-r-2 border-[var(--foreground)] last:border-r-0 ${
                  selectedTool === tool
                    ? "bg-[var(--accent)] text-white"
                    : "bg-white text-[var(--foreground)] hover:bg-[var(--accent)]/5"
                }`}
              >
                {tool === "pnpm" && "📦 pnpm workspace"}
                {tool === "turborepo" && "⚡ Turborepo"}
                {tool === "nx" && "🔷 Nx"}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl border-2 border-[var(--foreground)] bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                {selectedTool === "pnpm" && (
                  <Package
                    size={28}
                    strokeWidth={2.5}
                    className="text-[var(--accent)]"
                  />
                )}
                {selectedTool === "turborepo" && (
                  <Zap
                    size={28}
                    strokeWidth={2.5}
                    className="text-[var(--tertiary)]"
                  />
                )}
                {selectedTool === "nx" && (
                  <Boxes
                    size={28}
                    strokeWidth={2.5}
                    className="text-[var(--secondary)]"
                  />
                )}
              </div>
              <div>
                <h3 className="font-['Outfit'] font-bold text-2xl">
                  {config.title}
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-sm text-[var(--foreground)]/60 mt-1">
                  {config.description}
                </p>
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-[var(--quaternary)]/10 border-2 border-[var(--quaternary)]/30">
                <h5 className="font-['Outfit'] font-bold text-sm mb-2 text-[var(--quaternary)]">
                  ✅ 优势
                </h5>
                <ul className="space-y-1.5">
                  {config.pros.map((p, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm font-['Plus_Jakarta_Sans']"
                    >
                      <CheckCircle2
                        size={14}
                        strokeWidth={2.5}
                        className="text-[var(--quaternary)] shrink-0"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-[var(--secondary)]/10 border-2 border-[var(--secondary)]/30">
                <h5 className="font-['Outfit'] font-bold text-sm mb-2 text-[var(--secondary)]">
                  ⚠️ 局限
                </h5>
                <ul className="space-y-1.5">
                  {config.cons.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm font-['Plus_Jakarta_Sans']"
                    >
                      <AlertTriangle
                        size={14}
                        strokeWidth={2.5}
                        className="text-[var(--secondary)] shrink-0"
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Setup Code */}
            <CodeBlock
              code={config.setup}
              language="bash"
              title={`${config.title} 快速上手`}
            />
          </div>
        </div>
      </section>

      {/* ═══════════ L4: CODE PRACTICE ═══════════ */}
      <section className="container mx-auto px-6 pb-20">
        <SectionHeader
          icon={Terminal}
          label="L4 · 代码实战"
          title="从零搭建 Monorepo"
          color="var(--quaternary)"
        />

        {/* pnpm workspace setup */}
        <div className="mb-8">
          <h3 className="font-['Outfit'] font-bold text-2xl mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border-2 border-[var(--foreground)] bg-[var(--tertiary)] flex items-center justify-center text-sm font-bold">
              1
            </div>
            pnpm workspace 初始化
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <CodeBlock
              code={pnpmWorkspaceCode}
              language="yaml"
              title="pnpm-workspace.yaml"
            />
            <CodeBlock
              code={pnpmPackageJsonCode}
              language="json"
              title="package.json (root)"
            />
          </div>
        </div>

        {/* Turborepo config */}
        <div className="mb-8">
          <h3 className="font-['Outfit'] font-bold text-2xl mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border-2 border-[var(--foreground)] bg-[var(--accent)] flex items-center justify-center text-sm font-bold text-white">
              2
            </div>
            Turborepo 任务配置详解
          </h3>

          <div className="topic-card p-6 md:p-8 rounded-2xl bg-white border-2 border-[var(--foreground)] mb-6">
            <CodeBlock
              code={turboPipelineCode}
              language="json"
              title="turbo.json — 完整任务配置"
            />
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[var(--accent)]/5 border-2 border-[var(--accent)]/20">
                <h5 className="font-['Outfit'] font-bold text-sm mb-2">
                  🔑 关键概念
                </h5>
                <ul className="space-y-2 text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70">
                  <li>
                    <code className="font-['JetBrains_Mono'] text-[var(--accent)] bg-[var(--accent)]/10 px-1 rounded text-xs">
                      ^build
                    </code>{" "}
                    — 先构建所有上游依赖
                  </li>
                  <li>
                    <code className="font-['JetBrains_Mono'] text-[var(--accent)] bg-[var(--accent)]/10 px-1 rounded text-xs">
                      outputs
                    </code>{" "}
                    — 声明哪些产物需要缓存
                  </li>
                  <li>
                    <code className="font-['JetBrains_Mono'] text-[var(--accent)] bg-[var(--accent)]/10 px-1 rounded text-xs">
                      cache: false
                    </code>{" "}
                    — 禁用缓存（dev / deploy）
                  </li>
                  <li>
                    <code className="font-['JetBrains_Mono'] text-[var(--accent)] bg-[var(--accent)]/10 px-1 rounded text-xs">
                      persistent: true
                    </code>{" "}
                    — 长驻进程标记
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-[var(--tertiary)]/10 border-2 border-[var(--tertiary)]/30">
                <h5 className="font-['Outfit'] font-bold text-sm mb-2">
                  ⚠️ 常见陷阱
                </h5>
                <ul className="space-y-2 text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/70">
                  <li>❌ 忘记声明 outputs → 缓存永远 miss</li>
                  <li>❌ 在 dev 任务上开缓存 → 内存泄漏</li>
                  <li>❌ deploy 不设 cache: false → 跳过部署</li>
                  <li>❌ 环境变量未在 turbo.json 声明 → 缓存投毒</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Nx affected */}
        <div className="mb-8">
          <h3 className="font-['Outfit'] font-bold text-2xl mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border-2 border-[var(--foreground)] bg-[var(--secondary)] flex items-center justify-center text-sm font-bold text-white">
              3
            </div>
            Nx 的杀手锏：affected 命令
          </h3>

          <div className="topic-card p-6 md:p-8 rounded-2xl bg-white border-2 border-[var(--foreground)]">
            <p className="font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/80 mb-4 leading-relaxed">
              Turborepo 的缓存跳过的是"没变的包"，但仍然会
              <strong className="text-[var(--foreground)]">检查</strong>所有包。
              Nx 的{" "}
              <code className="font-['JetBrains_Mono'] text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded text-sm">
                affected
              </code>{" "}
              命令更进一步 —— 它通过 Git diff 分析
              <strong className="text-[var(--foreground)]">
                哪些包被影响了
              </strong>
              ，然后只执行这些包及其下游依赖。 在 50+ 包的仓库中，这可以将 CI
              测试范围从 "全部" 缩小到 "3 个"。
            </p>
            <CodeBlock
              code={nxAffectedCode}
              language="bash"
              title="Nx affected — 精准 CI 实战"
            />
          </div>
        </div>

        {/* Publishing workflow */}
        <div>
          <h3 className="font-['Outfit'] font-bold text-2xl mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border-2 border-[var(--foreground)] bg-[var(--quaternary)] flex items-center justify-center text-sm font-bold">
              4
            </div>
            版本管理与发布 (Changesets)
          </h3>

          <div className="topic-card p-6 md:p-8 rounded-2xl bg-white border-2 border-[var(--foreground)] mb-6">
            <p className="font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/80 mb-6 leading-relaxed">
              Monorepo 中最大的挑战之一是
              <strong className="text-[var(--foreground)]">版本管理</strong>：当
              shared-ui 发布 minor 版本时， 依赖它的 web 包是否也需要 bump？
              <strong className="text-[var(--foreground)]">
                Changesets
              </strong>{" "}
              是目前最成熟的解决方案 —— 它让每个 PR
              附带一个人类可读的变更记录，release 时自动计算版本、生成
              changelog、发布 npm。
            </p>

            <CodeBlock
              code={changesetCode}
              language="bash"
              title="changesets 发布流程"
            />
          </div>

          {/* Release Pipeline Diagram */}
          <div className="topic-card p-6 md:p-8 rounded-2xl bg-white border-2 border-[var(--foreground)]">
            <h4 className="font-['Outfit'] font-bold text-lg mb-4">
              完整发布流程图
            </h4>
            <div className="bg-[#0F172A] border-2 border-[var(--foreground)] rounded-xl p-6 font-['JetBrains_Mono'] text-xs sm:text-sm text-[#E2E8F0] overflow-x-auto">
              <pre className="leading-loose">{`
  ┌──────────┐   ┌───────────────┐   ┌──────────────┐   ┌────────────────┐
  │  PR #42  │──▶│ changeset add │──▶│ review + CI  │──▶│ merge to main  │
  │ 修改代码  │   │ 记录变更意图    │   │ turbo build  │   │                │
  └──────────┘   └───────────────┘   │ turbo test   │   └───────┬────────┘
                                     └──────────────┘           │
                                                                ▼
                       ┌────────────────────────────────────────────────┐
                       │  GitHub Action: "Release" Workflow             │
                       │                                                │
                       │  1. pnpm changeset version  ← 自动 bump 版本   │
                       │  2. git commit -am "Version Packages"          │
                       │  3. pnpm turbo run build     ← 用缓存极速构建   │
                       │  4. pnpm changeset publish   ← 发布到 npm      │
                       │  5. 创建 GitHub Release + Tag                   │
                       └────────────────────────────────────────────────┘
              `}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ L5: ENGINEERING LANDSCAPE ═══════════ */}
      <section className="container mx-auto px-6 pb-20">
        <SectionHeader
          icon={Scale}
          label="L5 · 工程全景"
          title="选型决策、陷阱与最佳实践"
          color="var(--foreground)"
        />

        {/* Decision Matrix */}
        <div className="topic-card p-6 md:p-8 rounded-2xl bg-white border-2 border-[var(--foreground)] mb-8">
          <h3 className="font-['Outfit'] font-bold text-xl mb-6 flex items-center gap-2">
            <Lightbulb
              size={20}
              strokeWidth={2.5}
              className="text-[var(--tertiary)]"
            />
            选型决策矩阵
          </h3>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {/* pnpm only */}
            <div className="p-5 rounded-xl border-2 border-[var(--foreground)] bg-[var(--quaternary)]/5">
              <h4 className="font-['Outfit'] font-bold text-base mb-2">
                📦 pnpm workspace 单独使用
              </h4>
              <div className="text-sm font-['Plus_Jakarta_Sans'] space-y-2 text-[var(--foreground)]/70">
                <p>
                  <strong>适用场景：</strong>2-5 个包的小型 monorepo
                </p>
                <p>
                  <strong>团队规模：</strong>1-3 人
                </p>
                <p>
                  <strong>包数量：</strong>≤ 10
                </p>
                <p className="text-[var(--foreground)]/50 text-xs mt-2">
                  ✅ 零额外依赖
                  <br />
                  ⚠️ 需要自己写构建脚本
                </p>
              </div>
            </div>

            {/* pnpm + turbo */}
            <div className="p-5 rounded-xl border-2 border-[var(--accent)] bg-[var(--accent)]/5 shadow-[4px_4px_0px_0px_var(--accent)]">
              <div className="inline-block px-2 py-0.5 mb-2 text-[10px] font-bold uppercase tracking-wider text-white bg-[var(--accent)] rounded-full">
                推荐
              </div>
              <h4 className="font-['Outfit'] font-bold text-base mb-2">
                ⚡ pnpm + Turborepo
              </h4>
              <div className="text-sm font-['Plus_Jakarta_Sans'] space-y-2 text-[var(--foreground)]/70">
                <p>
                  <strong>适用场景：</strong>中小型全栈 monorepo
                </p>
                <p>
                  <strong>团队规模：</strong>3-30 人
                </p>
                <p>
                  <strong>包数量：</strong>5-100
                </p>
                <p className="text-[var(--foreground)]/50 text-xs mt-2">
                  ✅ 社区最主流
                  <br />✅ 学习成本极低
                </p>
              </div>
            </div>

            {/* Nx */}
            <div className="p-5 rounded-xl border-2 border-[var(--foreground)] bg-[var(--secondary)]/5">
              <h4 className="font-['Outfit'] font-bold text-base mb-2">
                🔷 Nx (全套)
              </h4>
              <div className="text-sm font-['Plus_Jakarta_Sans'] space-y-2 text-[var(--foreground)]/70">
                <p>
                  <strong>适用场景：</strong>企业级大型平台
                </p>
                <p>
                  <strong>团队规模：</strong>20-500+ 人
                </p>
                <p>
                  <strong>包数量：</strong>50-1000+
                </p>
                <p className="text-[var(--foreground)]/50 text-xs mt-2">
                  ✅ affected 精准 CI
                  <br />✅ 插件生态丰富
                </p>
              </div>
            </div>
          </div>

          <CodeBlock
            code={scenarioCode}
            language="bash"
            title="推荐组合快速开始"
          />
        </div>

        {/* Anti-Patterns */}
        <div className="mb-8">
          <h3 className="font-['Outfit'] font-bold text-xl mb-6 flex items-center gap-2">
            <AlertTriangle
              size={20}
              strokeWidth={2.5}
              className="text-red-500"
            />
            常见陷阱与反模式
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "🚫 陷阱 #1：随意 hoisting 依赖",
                wrong: `// 根目录 package.json
{
  "dependencies": {
    "react": "^18.2.0"    // ← 把所有子包的依赖提到根目录
  }
}`,
                right: `// 每个包声明自己的依赖
// apps/web/package.json
{
  "dependencies": {
    "react": "^18.2.0"    // ← 显式声明在使用它的包中
  }
}

// pnpm 自动去重，不需要手动 hoisting`,
                explanation:
                  "把依赖提升到根目录会导致幽灵依赖，且破坏 pnpm 的严格隔离机制。让每个包声明自己需要的依赖，pnpm 会通过内容寻址自动去重存储。",
              },
              {
                title: "🚫 陷阱 #2：忘记配置 envVar",
                wrong: `// turbo.json — 环境变量未声明
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
      // ← 缺少 env 声明！
    }
  }
}`,
                right: `// turbo.json — 正确声明环境变量
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"],
      "env": ["NODE_ENV", "NEXT_PUBLIC_API_URL"]
      // ← 这些变量变化也会使缓存失效
    }
  }
}`,
                explanation:
                  "Turborepo 默认只监控文件内容。如果 NODE_ENV 从 'development' 变为 'production'，但源码没变，你会得到一个错误的缓存结果 —— 这叫缓存投毒 (Cache Poisoning)。",
              },
              {
                title: "🚫 陷阱 #3：循环依赖",
                wrong: `// ❌ packages/shared-ui/package.json
{ "dependencies": { "@myorg/utils": "workspace:*" } }

// ❌ packages/utils/package.json
{ "dependencies": { "@myorg/shared-ui": "workspace:*" } }
// 💥 DAG 不允许环！构建会失败或死循环`,
                right: `// ✅ 提取公共模块打破循环
// packages/core/types.ts   ← 共享类型
// packages/utils          ← 依赖 core/types
// packages/shared-ui      ← 依赖 utils + core/types

// 层级: core → utils → shared-ui → apps`,
                explanation:
                  "循环依赖会导致 DAG 算法失败。解决方法：提取共享代码到更底层的包中，保持单向依赖链。使用 nx graph 或 turbo run build --graph 可视化检查。",
              },
              {
                title: "🚫 陷阱 #4：忽略 outputs 配置",
                wrong: `// turbo.json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"]
      // ← 没有 outputs！
      // Turborepo 不知道缓存什么
      // 每次都会重新构建
    }
  }
}`,
                right: `// turbo.json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [
        "dist/**",           // ← Next.js / Vite 输出
        ".next/**",          // ← Next.js 缓存
        "build/**"           // ← 自定义输出
      ]
    }
  }
}`,
                explanation:
                  "outputs 告诉 Turborepo 哪些文件是构建产物。如果没声明，Turborepo 不会保存任何缓存 —— 你获得了并行但失去了缓存，白白浪费 80% 的加速潜力。",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="topic-card p-5 rounded-2xl bg-white border-2 border-[var(--foreground)] shadow-[6px_6px_0px_0px_#F472B6]"
              >
                <h4 className="font-['Outfit'] font-bold text-base mb-3">
                  {item.title}
                </h4>
                <div className="space-y-3">
                  <div>
                    <CodeBlock
                      code={item.wrong}
                      language="json"
                      title="❌ 错误做法"
                    />
                  </div>
                  <div>
                    <CodeBlock
                      code={item.right}
                      language="json"
                      title="✅ 正确做法"
                    />
                  </div>
                </div>
                <p className="mt-3 text-xs font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/60 leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Benchmark */}
        <div className="topic-card p-6 md:p-8 rounded-2xl bg-white border-2 border-[var(--foreground)] mb-8">
          <h3 className="font-['Outfit'] font-bold text-xl mb-6 flex items-center gap-2">
            <Gauge
              size={20}
              strokeWidth={2.5}
              className="text-[var(--accent)]"
            />
            性能基准 (实测数据参考)
          </h3>

          <div className="grid sm:grid-cols-4 gap-4 mb-6">
            {[
              {
                label: "首次构建 (无缓存)",
                value: "~120s",
                detail: "20 个包, 8 核 CPU",
                color: "var(--foreground)",
                bg: "var(--foreground)/5",
              },
              {
                label: "Turborepo 本地缓存",
                value: "~2s",
                detail: "节省 98.3%",
                color: "var(--accent)",
                bg: "var(--accent)/5",
              },
              {
                label: "Turborepo 远程缓存",
                value: "~1.5s",
                detail: "CI 同享, 跨机器",
                color: "var(--secondary)",
                bg: "var(--secondary)/5",
              },
              {
                label: "Nx affected (小改动)",
                value: "~15s",
                detail: "只构建 3 个包",
                color: "var(--quaternary)",
                bg: "var(--quaternary)/5",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border-2 border-[var(--foreground)] text-center"
                style={{
                  backgroundColor: `color-mix(in srgb, ${item.color} 5%, white)`,
                }}
              >
                <div
                  className="font-['JetBrains_Mono'] text-2xl font-bold"
                  style={{ color: item.color }}
                >
                  {item.value}
                </div>
                <div className="font-['Plus_Jakarta_Sans'] text-xs font-bold mt-1 text-[var(--foreground)]">
                  {item.label}
                </div>
                <div className="font-['Plus_Jakarta_Sans'] text-[10px] mt-1 text-[var(--foreground)]/50">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
            * 数据基于 20 个包 (5 apps + 15 libs)，Next.js + TypeScript 项目，M2
            MacBook Pro 实测。 实际性能取决于包数量、依赖深度、磁盘 I/O 和 CPU
            核心数。
          </p>
        </div>
      </section>

      {/* ═══════════ CHEAT SHEET ═══════════ */}
      <section className="container mx-auto px-6 pb-24">
        <SectionHeader
          icon={BookOpen}
          label="速查清单"
          title="Monorepo 命令速查表"
          color="var(--accent)"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              category: "📦 依赖管理",
              color: "var(--quaternary)",
              items: [
                { cmd: "pnpm add -w -D turbo", desc: "安装到根 workspace" },
                {
                  cmd: "pnpm --filter web add lodash",
                  desc: "给指定包安装依赖",
                },
                { cmd: "pnpm -r run build", desc: "递归执行所有包" },
                {
                  cmd: "pnpm --filter ./packages/* update",
                  desc: "批量更新匹配包",
                },
              ],
            },
            {
              category: "⚡ Turborepo",
              color: "var(--accent)",
              items: [
                { cmd: "turbo run build", desc: "并行 + 缓存构建" },
                {
                  cmd: "turbo run build --filter=web",
                  desc: "只构建 web 及依赖",
                },
                { cmd: "turbo run build --dry-run", desc: "预览执行计划" },
                { cmd: "turbo run build --force", desc: "强制跳过缓存" },
                {
                  cmd: "turbo prune --scope=web",
                  desc: "裁剪子集 Docker 构建",
                },
                {
                  cmd: "turbo run build --graph=graph.html",
                  desc: "导出依赖图",
                },
              ],
            },
            {
              category: "🔷 Nx",
              color: "var(--secondary)",
              items: [
                { cmd: "nx affected -t test", desc: "只测试受影响的包" },
                { cmd: "nx run-many -t build", desc: "构建全部" },
                { cmd: "nx graph", desc: "打开交互式依赖图" },
                {
                  cmd: "nx show projects --affected",
                  desc: "列出受影响的项目",
                },
                { cmd: "nx daemon", desc: "启动后台分析进程" },
              ],
            },
            {
              category: "🏷️ 版本发布",
              color: "var(--tertiary)",
              items: [
                { cmd: "pnpm changeset", desc: "创建变更记录" },
                { cmd: "pnpm changeset version", desc: "自动 bump 版本" },
                { cmd: "pnpm changeset publish", desc: "发布到 npm" },
                { cmd: "pnpm changeset status", desc: "查看待发布状态" },
              ],
            },
            {
              category: "🔍 调试诊断",
              color: "var(--foreground)",
              items: [
                { cmd: "pnpm why lodash", desc: "查看依赖链路" },
                { cmd: "pnpm ls -r --depth=0", desc: "列出所有包依赖" },
                { cmd: "turbo run build --graph", desc: "可视化任务图" },
                { cmd: "pnpm store status", desc: "检查 store 一致性" },
              ],
            },
            {
              category: "🐳 Docker 优化",
              color: "var(--accent)",
              items: [
                { cmd: "turbo prune web --docker", desc: "生成 Docker 子集" },
                {
                  cmd: "pnpm install --frozen-lockfile",
                  desc: "CI 安装 (不更新锁文件)",
                },
                { cmd: "pnpm fetch", desc: "仅下载不解压 (Docker 层缓存)" },
                {
                  cmd: "pnpm install --offline",
                  desc: "离线模式 (从 store 安装)",
                },
              ],
            },
          ].map((group, i) => (
            <div
              key={i}
              className="topic-card rounded-2xl bg-white border-2 border-[var(--foreground)] overflow-hidden"
            >
              <div
                className="px-5 py-3 border-b-2 border-[var(--foreground)] font-['Outfit'] font-bold text-sm"
                style={{ backgroundColor: group.color + "15" }}
              >
                {group.category}
              </div>
              <div className="p-4 space-y-2.5">
                {group.items.map((item, j) => (
                  <div key={j}>
                    <code className="font-['JetBrains_Mono'] text-xs text-[var(--accent)] bg-[var(--accent)]/5 px-2 py-1 rounded block break-all">
                      $ {item.cmd}
                    </code>
                    <span className="text-[11px] text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans'] ml-1">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Final Recommendation Card */}
        <div className="mt-10 topic-card p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[#6D28D9] text-white border-2 border-[var(--foreground)] shadow-[8px_8px_0px_0px_var(--foreground)]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl border-2 border-white/30 bg-white/10 flex items-center justify-center shrink-0">
              <Rocket size={24} strokeWidth={2.5} className="text-white" />
            </div>
            <div>
              <h3 className="font-['Outfit'] font-bold text-xl mb-2">
                TL;DR — 最终推荐
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-sm leading-relaxed text-white/85 mb-4">
                对于 <strong className="text-white">85% 的团队</strong>，直接上{" "}
                <strong className="text-white">
                  pnpm + Turborepo + changesets
                </strong>
                。
                这个组合覆盖了依赖管理、任务编排、构建缓存和版本发布四大核心需求，总学习成本约
                2 小时。 只有当你的仓库超过 50 个包、CI 时间超过 15
                分钟、且需要精细的增量测试时，才考虑迁移到 Nx。
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "pnpm create turbo@latest",
                  "2h 学习",
                  "零运行时开销",
                  "社区主流",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 text-xs font-bold font-['Plus_Jakarta_Sans'] bg-white/15 border border-white/20 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* placeholder so Link import doesn't error */
const Link = ({ size, strokeWidth, className }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);
