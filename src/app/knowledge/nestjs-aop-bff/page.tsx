"use client";

import { useState, useEffect, useRef } from "react";
import {
  Layers,
  Shield,
  Zap,
  Filter,
  GitBranch,
  Server,
  Monitor,
  Smartphone,
  Globe,
  ArrowRight,
  ChevronRight,
  Code2,
  Terminal,
  Play,
  RotateCcw,
  Box,
  Network,
  Lock,
  Eye,
  FileCode,
  Braces,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Timer,
  Cpu,
  Database,
  LayoutGrid,
  Workflow,
  Binary,
} from "lucide-react";

/* ──────────────────────────────────────────────
   辅助组件
   ────────────────────────────────────────────── */

function GeometricBadge({
  icon: Icon,
  color = "accent",
  size = "md",
}: {
  icon: React.ElementType;
  color?: "accent" | "secondary" | "tertiary" | "quaternary";
  size?: "sm" | "md" | "lg";
}) {
  const colorMap = {
    accent: "bg-[var(--accent)] text-white",
    secondary: "bg-[var(--secondary)] text-white",
    tertiary: "bg-[var(--tertiary)] text-[var(--foreground)]",
    quaternary: "bg-[var(--quaternary)] text-white",
  };
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-14 h-14",
  };
  const iconSizeMap = { sm: 14, md: 18, lg: 24 };

  return (
    <div
      className={`${sizeMap[size]} ${colorMap[color]} flex items-center justify-center rounded-[var(--radius-md)] border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] transition-transform duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--foreground)]`}
    >
      <Icon size={iconSizeMap[size]} strokeWidth={2.5} />
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <span className="inline-block rounded-full border-2 border-[var(--foreground)] bg-[var(--tertiary)] px-4 py-1 font-['Outfit',sans-serif] text-xs font-bold uppercase tracking-widest text-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)]">
      {text}
    </span>
  );
}

function CodeBlock({
  code,
  language = "typescript",
  title,
}: {
  code: string;
  language?: string;
  title?: string;
}) {
  return (
    <div className="animate-slide overflow-hidden rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[#1a1b26] shadow-[6px_6px_0px_0px_var(--foreground)]">
      {title && (
        <div className="flex items-center gap-2 border-b-2 border-[var(--foreground)] bg-[var(--foreground)] px-4 py-2">
          <Braces size={14} strokeWidth={2.5} className="text-[var(--accent)]" />
          <span className="font-['Outfit',sans-serif] text-xs font-bold tracking-wider text-[var(--border)]">
            {title}
          </span>
          <span className="ml-auto rounded-full bg-[var(--accent)]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
            {language}
          </span>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-['JetBrains_Mono',monospace] text-[#c0caf5]">{code}</code>
      </pre>
    </div>
  );
}

/* ──────────────────────────────────────────────
   主页面
   ────────────────────────────────────────────── */

export default function NestJsAopBffPage() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [activeBffTab, setActiveBffTab] = useState<"mono" | "multi" | "gateway">("mono");
  const [interceptorDemoStep, setInterceptorDemoStep] = useState(0);
  const [guardResult, setGuardResult] = useState<"idle" | "pass" | "deny">("idle");
  const [pipelineOrder, setPipelineOrder] = useState<string[]>([]);
  const [selectedDecorator, setSelectedDecorator] = useState<string | null>(null);
  const [flowStep, setFlowStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playRef = useRef<NodeJS.Timeout | null>(null);

  // 自动播放请求流程
  useEffect(() => {
    if (isPlaying) {
      playRef.current = setInterval(() => {
        setFlowStep((prev) => {
          if (prev >= 7) {
            setIsPlaying(false);
            return 7;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => {
      if (playRef.current) clearInterval(playRef.current);
    };
  }, [isPlaying]);

  const aopLayers = [
    {
      name: "Middleware",
      icon: Layers,
      color: "bg-[var(--accent)]",
      desc: "最早执行，作用于所有请求。类似 Express 中间件。",
      detail: "在路由处理之前执行，可访问 req/res 对象。适合日志记录、CORS、body-parser 等全局横切关注点。",
      position: 1,
    },
    {
      name: "Guard",
      icon: Shield,
      color: "bg-[var(--quaternary)]",
      desc: "授权守卫，决定请求是否可以被处理。",
      detail: "实现 CanActivate 接口，基于角色/权限/token 决定是否放行。返回 true/false，支持装饰器元数据驱动。",
      position: 2,
    },
    {
      name: "Interceptor",
      icon: Zap,
      color: "bg-[var(--tertiary)]",
      desc: "拦截器，在方法执行前后添加额外逻辑。",
      detail: "可转换响应数据、异常映射、缓存、超时处理、日志记录。支持 RxJS 操作符处理流式数据。最强大的 AOP 层。",
      position: 3,
    },
    {
      name: "Pipe",
      icon: Filter,
      color: "bg-[var(--secondary)]",
      desc: "管道，用于输入数据转换和验证。",
      detail: "在参数到达控制器之前进行验证和转换。内置 ValidationPipe、ParseIntPipe 等。配合 class-validator 实现声明式校验。",
      position: 4,
    },
    {
      name: "Controller",
      icon: Code2,
      color: "bg-[var(--foreground)]",
      desc: "核心业务处理层，接收已处理的请求。",
      detail: "经过前四层处理后的“干净”数据才到达 Controller。Controller 应该尽量精简，只做路由分发。",
      position: 5,
    },
    {
      name: "Exception Filter",
      icon: Filter,
      color: "bg-red-500",
      desc: "异常过滤器，统一捕获和格式化异常。",
      detail: "捕获所有未处理的异常，转换为统一的错误响应格式。支持不同异常类型的差异化处理。",
      position: 6,
    },
  ];

  const bffStrategies = {
    mono: {
      title: "单体 BFF",
      desc: "一个 BFF 服务聚合所有微服务，适合小型项目",
      pros: ["部署简单", "开发成本低", "统一管理"],
      cons: ["单点故障", "团队协作冲突", "技术栈单一"],
      icon: Box,
    },
    multi: {
      title: "多端 BFF",
      desc: "为 Web/iOS/Android 各建一个 BFF，完全解耦",
      pros: ["端级定制", "独立部署", "团队自治"],
      cons: ["代码重复", "维护成本高", "一致性难保证"],
      icon: Monitor,
    },
    gateway: {
      title: "API Gateway + BFF",
      desc: "Gateway 做路由/限流，BFF 做数据聚合编排",
      pros: ["关注点分离", "灵活扩展", "渐进式迁移"],
      cons: ["架构复杂", "延迟增加", "调试困难"],
      icon: Network,
    },
  };

  const requestFlow = [
    { label: "客户端请求", icon: Smartphone, color: "var(--accent)" },
    { label: "API Gateway", icon: Globe, color: "var(--foreground)" },
    { label: "BFF 层 (路由/聚合)", icon: Server, color: "var(--secondary)" },
    { label: "Guard (鉴权)", icon: Shield, color: "var(--quaternary)" },
    { label: "Interceptor (前置)", icon: Zap, color: "var(--tertiary)" },
    { label: "Pipe (校验转换)", icon: Filter, color: "var(--secondary)" },
    { label: "Controller → Service", icon: Code2, color: "var(--accent)" },
    { label: "响应返回客户端", icon: CheckCircle2, color: "var(--quaternary)" },
  ];

  const decorators = [
    {
      name: "@SetMetadata()",
      desc: "为路由处理器附加自定义元数据键值对",
      code: `@SetMetadata('roles', ['admin'])
@Get('dashboard')
getDashboard() {}`,
      useCase: "配合 Reflector 在 Guard 中读取角色信息",
    },
    {
      name: "@UseGuards()",
      desc: "绑定一个或多个守卫到控制器/方法",
      code: `@UseGuards(AuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {}`,
      useCase: "声明式授权，替代每个方法手动检查",
    },
    {
      name: "@UseInterceptors()",
      desc: "绑定拦截器，可作用于单个方法或整个控制器",
      code: `@UseInterceptors(CacheInterceptor, TimeoutInterceptor)
@Get('products')
findAll() {
  return this.productService.findAll();
}`,
      useCase: "响应缓存、超时控制、数据转换",
    },
    {
      name: "@UsePipes()",
      desc: "绑定验证管道，确保输入数据类型正确",
      code: `@Post()
@UsePipes(new ValidationPipe({ whitelist: true }))
create(@Body() dto: CreateOrderDto) {
  return this.orderService.create(dto);
}`,
      useCase: "自动 DTO 验证和类型转换",
    },
    {
      name: "自定义装饰器",
      desc: "创建参数级装饰器，抽取通用逻辑",
      code: `// 创建当前用户装饰器
export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);

// 使用
@Get('profile')
getProfile(@CurrentUser('id') userId: string) {
  return this.userService.findById(userId);
}`,
      useCase: "优雅地从请求中提取参数，保持 Controller 简洁",
    },
  ];

  // 管道排序游戏
  const pipeItems = [
    { id: "parse", label: "ParseIntPipe", order: 1 },
    { id: "validation", label: "ValidationPipe", order: 2 },
    { id: "transform", label: "TransformPipe", order: 3 },
  ];

  const addPipe = (id: string) => {
    if (!pipelineOrder.includes(id)) {
      setPipelineOrder([...pipelineOrder, id]);
    }
  };

  const resetPipeline = () => setPipelineOrder([]);

  const isPipelineCorrect =
    pipelineOrder.length === 3 &&
    pipelineOrder[0] === "validation" &&
    pipelineOrder[1] === "parse" &&
    pipelineOrder[2] === "transform";

  return (
    <div className="bg-dot-grid min-h-screen pb-32">
      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden border-b-2 border-[var(--foreground)]">
        {/* 装饰性 Blob */}
        <div
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--accent)]/10 blur-3xl"
          style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
        />
        <div
          className="absolute -left-20 bottom-0 h-64 w-64 bg-[var(--secondary)]/10 blur-2xl"
          style={{ borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%" }}
        />

        <div className="container relative z-10 py-20 md:py-28">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
            {/* 左侧大图标 */}
            <div className="animate-pop flex-shrink-0">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-[var(--radius-lg)] border-3 border-[var(--foreground)] bg-[var(--accent)] shadow-[8px_8px_0px_0px_var(--foreground)] md:h-36 md:w-36">
                  <Layers size={56} strokeWidth={2.5} className="text-white" />
                </div>
                {/* 小装饰圆 */}
                <div className="absolute -right-3 -top-3 h-6 w-6 rounded-full border-2 border-[var(--foreground)] bg-[var(--tertiary)] shadow-[2px_2px_0px_0px_var(--foreground)]" />
                <div className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full border-2 border-[var(--foreground)] bg-[var(--secondary)] shadow-[2px_2px_0px_0px_var(--foreground)]" />
              </div>
            </div>

            {/* 右侧文字 */}
            <div className="flex-1">
              <div className="mb-4 flex flex-wrap gap-2">
                <SectionLabel text="NestJS" />
                <SectionLabel text="AOP" />
                <SectionLabel text="BFF" />
              </div>

              <h1 className="animate-pop font-['Outfit',sans-serif] text-4xl font-extrabold leading-tight text-[var(--foreground)] md:text-6xl">
                NestJS AOP
                <br />
                <span className="text-[var(--accent)]">&</span>{" "}
                <span className="relative inline-block">
                  企业级 BFF
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 8 C50 2, 100 12, 150 6 S250 2, 298 8"
                      stroke="var(--secondary)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="animate-slide mt-6 max-w-2xl text-lg leading-relaxed text-[var(--foreground)]/70 md:text-xl">
                深入理解 NestJS 的<span className="font-bold text-[var(--accent)]">面向切面编程</span>五层生命周期，以及如何利用
                BFF 模式构建<span className="font-bold text-[var(--secondary)]">面向前端的后端聚合层</span>，
                打造企业级微服务网关。
              </p>

              {/* 快速数据 */}
              <div className="animate-slide mt-8 flex flex-wrap gap-4" style={{ animationDelay: "0.2s" }}>
                {[
                  { num: "6", label: "AOP 核心层", bg: "bg-[var(--accent)]" },
                  { num: "5", label: "生命周期钩子", bg: "bg-[var(--secondary)]" },
                  { num: "3", label: "BFF 架构模式", bg: "bg-[var(--tertiary)]" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--card)] px-4 py-2 shadow-[4px_4px_0px_0px_var(--foreground)]"
                  >
                    <span
                      className={`${stat.bg} flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--foreground)] font-['Outfit',sans-serif] text-sm font-extrabold text-white`}
                    >
                      {stat.num}
                    </span>
                    <span className="font-['Outfit',sans-serif] text-sm font-bold">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ AOP 生命周期层级图 ═══════ */}
      <section className="container py-20">
        <div className="mb-12 text-center">
          <SectionLabel text="Core Concept" />
          <h2 className="mt-4 font-['Outfit',sans-serif] text-3xl font-extrabold text-[var(--foreground)] md:text-4xl">
            请求的「洋葱模型」生命周期
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--foreground)]/60">
            点击每一层查看详细说明。每个请求都会经过这六层处理，像洋葱一样一层层剥开。
          </p>
        </div>

        {/* 洋葱层级可视化 */}
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {aopLayers.map((layer, i) => (
              <button
                key={layer.name}
                onClick={() => setActiveLayer(activeLayer === i ? null : i)}
                className={`animate-slide group relative overflow-hidden rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--card)] p-5 text-left shadow-[6px_6px_0px_0px_var(--foreground)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_var(--foreground)] ${
                  activeLayer === i
                    ? "ring-3 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--background)]"
                    : ""
                }`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* 层级序号 */}
                <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--foreground)] bg-[var(--tertiary)] font-['Outfit',sans-serif] text-lg font-extrabold text-[var(--foreground)] shadow-[3px_3px_0px_0px_var(--foreground)]">
                  {layer.position}
                </div>

                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={`${layer.color} flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border-2 border-[var(--foreground)] text-white shadow-[3px_3px_0px_0px_var(--foreground)]`}
                  >
                    <layer.icon size={20} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-['Outfit',sans-serif] text-lg font-bold">{layer.name}</h3>
                </div>

                <p className="text-sm text-[var(--foreground)]/70">{layer.desc}</p>

                {/* 展开详情 */}
                <div
                  className={`mt-3 overflow-hidden transition-all duration-300 ${
                    activeLayer === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="rounded-[var(--radius-sm)] border-2 border-dashed border-[var(--accent)]/30 bg-[var(--accent)]/5 p-3 text-sm text-[var(--foreground)]/80">
                    <strong className="text-[var(--accent)]">详解：</strong>
                    {layer.detail}
                  </div>
                </div>

                {/* 连接箭头指示 */}
                {i < aopLayers.length - 1 && (
                  <div className="absolute -bottom-1 left-1/2 hidden -translate-x-1/2 text-[var(--border)] lg:block">
                    <ChevronRight size={16} className="rotate-90" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 完整洋葱模型图示 */}
        <div className="animate-slide mx-auto mt-16 max-w-2xl" style={{ animationDelay: "0.3s" }}>
          <div className="rounded-[var(--radius-lg)] border-2 border-[var(--foreground)] bg-[var(--card)] p-6 shadow-[8px_8px_0px_0px_var(--foreground)]">
            <h3 className="mb-6 text-center font-['Outfit',sans-serif] text-lg font-bold">
              🧅 洋葱模型执行顺序
            </h3>
            <div className="space-y-1">
              {[
                { label: "→ Middleware", bg: "bg-[var(--accent)]/10", border: "border-[var(--accent)]", text: "text-[var(--accent)]" },
                { label: "  → Guard", bg: "bg-[var(--quaternary)]/10", border: "border-[var(--quaternary)]", text: "text-[var(--quaternary)]" },
                { label: "    → Interceptor (前置)", bg: "bg-[var(--tertiary)]/10", border: "border-[var(--tertiary)]", text: "text-[var(--tertiary)]" },
                { label: "      → Pipe", bg: "bg-[var(--secondary)]/10", border: "border-[var(--secondary)]", text: "text-[var(--secondary)]" },
                { label: "        → Controller Handler ◆ 核心", bg: "bg-[var(--foreground)]/10", border: "border-[var(--foreground)]", text: "text-[var(--foreground)] font-extrabold" },
                { label: "      ← Interceptor (后置)", bg: "bg-[var(--tertiary)]/10", border: "border-[var(--tertiary)]", text: "text-[var(--tertiary)]" },
                { label: "    ← Exception Filter", bg: "bg-red-500/10", border: "border-red-500", text: "text-red-500" },
                { label: "  ← 响应发出", bg: "bg-[var(--quaternary)]/10", border: "border-[var(--quaternary)]", text: "text-[var(--quaternary)]" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`${item.bg} rounded-[var(--radius-sm)] border ${item.border} px-4 py-2 font-['JetBrains_Mono',monospace] text-sm ${item.text}`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 交互式实验：Guard 守卫实验 ═══════ */}
      <section className="container py-16">
        <div className="mb-10 text-center">
          <SectionLabel text="Interactive Lab" />
          <h2 className="mt-4 font-['Outfit',sans-serif] text-3xl font-extrabold text-[var(--foreground)]">
            🛡️ Guard 守卫实验室
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[var(--foreground)]/60">
            模拟不同的请求身份，体验 Guard 如何拦截或放行请求。
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
          {/* 左侧：Guard 代码 */}
          <CodeBlock
            title="roles.guard.ts"
            code={`@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector
      .getAllAndOverride<string[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);

    if (!requiredRoles) return true;

    const { user } = context
      .switchToHttp().getRequest();

    return requiredRoles.some(
      (role) => user?.roles?.includes(role)
    );
  }
}`}
          />

          {/* 右侧：交互模拟 */}
          <div className="rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--card)] p-6 shadow-[6px_6px_0px_0px_var(--foreground)]">
            <h3 className="mb-4 font-['Outfit',sans-serif] text-lg font-bold">模拟请求身份</h3>

            <div className="mb-4 space-y-2">
              {[
                { role: "admin", label: "Admin 用户", emoji: "👑" },
                { role: "editor", label: "Editor 用户", emoji: "✏️" },
                { role: "guest", label: "Guest 访客", emoji: "👻" },
              ].map((u) => (
                <button
                  key={u.role}
                  onClick={() => {
                    setGuardResult(u.role === "admin" || u.role === "editor" ? "pass" : "deny");
                  }}
                  className="flex w-full items-center gap-3 rounded-[var(--radius-sm)] border-2 border-[var(--foreground)] bg-[var(--background)] px-4 py-2.5 text-left font-bold transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  <span className="text-xl">{u.emoji}</span>
                  <span className="font-['Outfit',sans-serif] text-sm">{u.label}</span>
                  <span className="ml-auto rounded-full bg-[var(--foreground)]/10 px-2 py-0.5 font-['JetBrains_Mono',monospace] text-xs">
                    {u.role}
                  </span>
                </button>
              ))}
            </div>

            {/* 结果展示 */}
            <div
              className={`rounded-[var(--radius-sm)] border-2 p-4 text-center transition-all duration-300 ${
                guardResult === "pass"
                  ? "border-[var(--quaternary)] bg-[var(--quaternary)]/10"
                  : guardResult === "deny"
                  ? "border-red-500 bg-red-500/10"
                  : "border-dashed border-[var(--border)] bg-[var(--background)]"
              }`}
            >
              {guardResult === "idle" && (
                <p className="text-sm text-[var(--foreground)]/40">请选择一个请求身份…</p>
              )}
              {guardResult === "pass" && (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 size={20} strokeWidth={2.5} className="text-[var(--quaternary)]" />
                  <span className="font-['Outfit',sans-serif] font-bold text-[var(--quaternary)]">
                    ✅ Guard 通过 — 请求已放行
                  </span>
                </div>
              )}
              {guardResult === "deny" && (
                <div className="flex items-center justify-center gap-2">
                  <XCircle size={20} strokeWidth={2.5} className="text-red-500" />
                  <span className="font-['Outfit',sans-serif] font-bold text-red-500">
                    🚫 403 Forbidden — 权限不足
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 装饰器大全 ═══════ */}
      <section className="container py-16">
        <div className="mb-10 text-center">
          <SectionLabel text="Decorator Playbook" />
          <h2 className="mt-4 font-['Outfit',sans-serif] text-3xl font-extrabold text-[var(--foreground)]">
            ✨ AOP 装饰器手册
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[var(--foreground)]/60">
            点击装饰器卡片查看代码示例和使用场景。
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {decorators.map((dec, i) => (
            <button
              key={dec.name}
              onClick={() => setSelectedDecorator(selectedDecorator === dec.name ? null : dec.name)}
              className={`animate-slide rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--card)] p-5 text-left shadow-[5px_5px_0px_0px_var(--foreground)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_var(--foreground)] ${
                selectedDecorator === dec.name ? "ring-2 ring-[var(--accent)]" : ""
              }`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="mb-2 flex items-center gap-2">
                <GeometricBadge icon={Braces} color="accent" size="sm" />
                <code className="font-['JetBrains_Mono',monospace] text-sm font-bold text-[var(--accent)]">
                  {dec.name}
                </code>
              </div>
              <p className="text-sm text-[var(--foreground)]/70">{dec.desc}</p>

              {selectedDecorator === dec.name && (
                <div className="mt-3 space-y-3">
                  <div className="overflow-hidden rounded-[var(--radius-sm)] border-2 border-[var(--foreground)] bg-[#1a1b26] p-3">
                    <pre className="overflow-x-auto text-xs leading-relaxed">
                      <code className="font-['JetBrains_Mono',monospace] text-[#c0caf5]">{dec.code}</code>
                    </pre>
                  </div>
                  <div className="rounded-[var(--radius-sm)] border-2 border-dashed border-[var(--tertiary)] bg-[var(--tertiary)]/10 px-3 py-2 text-xs">
                    <strong className="text-[var(--tertiary)]">应用场景：</strong>
                    <span className="text-[var(--foreground)]/70">{dec.useCase}</span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ═══════ 交互实验：Interceptor 拦截器流程 ═══════ */}
      <section className="container py-16">
        <div className="mb-10 text-center">
          <SectionLabel text="Deep Dive" />
          <h2 className="mt-4 font-['Outfit',sans-serif] text-3xl font-extrabold text-[var(--foreground)]">
            ⚡ Interceptor 拦截器深度剖析
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <div>
            <CodeBlock
              title="transform.interceptor.ts"
              language="typescript"
              code={`@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const now = Date.now();

    return next.handle().pipe(
      map(data => ({
        code: 200,
        message: 'success',
        data,
        timestamp: Date.now(),
        duration: \`\${Date.now() - now}ms\`,
      })),
    );
  }
}`}
            />
            <div className="mt-4">
              <CodeBlock
                title="logging.interceptor.ts"
                language="typescript"
                code={`@Injectable()
export class LoggingInterceptor
  implements NestInterceptor
{
  private readonly logger = new Logger('HTTP');

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;
    this.logger.log(\`→ \${method} \${url}\`);

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        this.logger.log(
          \`← \${method} \${url} \${res.statusCode}\`
        );
      }),
    );
  }
}`}
              />
            </div>
          </div>

          {/* 右侧：时序可视化 */}
          <div className="rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--card)] p-6 shadow-[6px_6px_0px_0px_var(--foreground)]">
            <h3 className="mb-6 font-['Outfit',sans-serif] text-lg font-bold">
              📊 执行时序图
            </h3>

            <div className="space-y-3">
              {[
                { time: "T0", action: "请求到达", detail: "Interceptor.intercept() 被调用", color: "var(--accent)", icon: ArrowRight },
                { time: "T1", action: "前置逻辑执行", detail: "日志记录、计时开始、缓存检查", color: "var(--tertiary)", icon: Eye },
                { time: "T2", action: "next.handle()", detail: "将控制权交给下一个处理层", color: "var(--foreground)", icon: ChevronRight },
                { time: "T3", action: "Controller 执行", detail: "业务逻辑处理、数据库查询", color: "var(--secondary)", icon: Code2 },
                { time: "T4", action: "响应数据流回", detail: "Observable.pipe(map/tap)", color: "var(--accent)", icon: RotateCcw },
                { time: "T5", action: "后置逻辑执行", detail: "数据转换、响应包装、日志完成", color: "var(--quaternary)", icon: CheckCircle2 },
              ].map((step, i) => (
                <div
                  key={i}
                  className="animate-slide flex items-start gap-3"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--foreground)] font-['JetBrains_Mono',monospace] text-[10px] font-bold text-white"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.time}
                    </div>
                    {i < 5 && (
                      <div className="h-6 w-0.5 bg-[var(--border)]" />
                    )}
                  </div>
                  <div className="flex-1 rounded-[var(--radius-sm)] border-2 border-[var(--foreground)]/20 bg-[var(--background)] p-3">
                    <div className="flex items-center gap-2">
                      <step.icon size={14} strokeWidth={2.5} style={{ color: step.color }} />
                      <span className="font-['Outfit',sans-serif] text-sm font-bold">{step.action}</span>
                    </div>
                    <p className="mt-1 text-xs text-[var(--foreground)]/60">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ BFF 架构模式对比 ═══════ */}
      <section className="container py-16">
        <div className="mb-10 text-center">
          <SectionLabel text="BFF Architecture" />
          <h2 className="mt-4 font-['Outfit',sans-serif] text-3xl font-extrabold text-[var(--foreground)]">
            🏗️ 企业级 BFF 架构模式
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[var(--foreground)]/60">
            三种主流 BFF 架构策略，点击切换查看详情。
          </p>
        </div>

        {/* Tab 切换 */}
        <div className="mx-auto mb-8 flex max-w-md justify-center gap-2">
          {(
            Object.entries(bffStrategies) as [
              keyof typeof bffStrategies,
              (typeof bffStrategies)[keyof typeof bffStrategies],
            ][]
          ).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setActiveBffTab(key)}
              className={`flex items-center gap-2 rounded-[var(--radius-sm)] border-2 border-[var(--foreground)] px-4 py-2 font-['Outfit',sans-serif] text-sm font-bold transition-all ${
                activeBffTab === key
                  ? "bg-[var(--accent)] text-white shadow-[4px_4px_0px_0px_var(--foreground)]"
                  : "bg-[var(--card)] text-[var(--foreground)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_var(--foreground)]"
              }`}
            >
              <val.icon size={16} strokeWidth={2.5} />
              {val.title}
            </button>
          ))}
        </div>

        {/* 当前选中的 BFF 模式详情 */}
        {(() => {
          const current = bffStrategies[activeBffTab];
          const IconComp = current.icon;
          return (
            <div className="animate-pop mx-auto max-w-4xl">
              <div className="rounded-[var(--radius-lg)] border-2 border-[var(--foreground)] bg-[var(--card)] p-8 shadow-[8px_8px_0px_0px_var(--foreground)]">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--accent)] shadow-[4px_4px_0px_0px_var(--foreground)]">
                    <IconComp size={32} strokeWidth={2.5} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Outfit',sans-serif] text-2xl font-extrabold">{current.title}</h3>
                    <p className="text-[var(--foreground)]/60">{current.desc}</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* 优点 */}
                  <div className="rounded-[var(--radius-md)] border-2 border-[var(--quaternary)] bg-[var(--quaternary)]/5 p-5">
                    <h4 className="mb-3 flex items-center gap-2 font-['Outfit',sans-serif] text-sm font-bold text-[var(--quaternary)]">
                      <CheckCircle2 size={16} strokeWidth={2.5} />
                      优势
                    </h4>
                    <ul className="space-y-2">
                      {current.pros.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-sm text-[var(--foreground)]/80">
                          <div className="h-1.5 w-1.5 rounded-full bg-[var(--quaternary)]" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 缺点 */}
                  <div className="rounded-[var(--radius-md)] border-2 border-[var(--secondary)] bg-[var(--secondary)]/5 p-5">
                    <h4 className="mb-3 flex items-center gap-2 font-['Outfit',sans-serif] text-sm font-bold text-[var(--secondary)]">
                      <AlertCircle size={16} strokeWidth={2.5} />
                      挑战
                    </h4>
                    <ul className="space-y-2">
                      {current.cons.map((c) => (
                        <li key={c} className="flex items-center gap-2 text-sm text-[var(--foreground)]/80">
                          <div className="h-1.5 w-1.5 rounded-full bg-[var(--secondary)]" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* ═══════ 交互式请求流程模拟 ═══════ */}
      <section className="container py-16">
        <div className="mb-10 text-center">
          <SectionLabel text="Request Simulation" />
          <h2 className="mt-4 font-['Outfit',sans-serif] text-3xl font-extrabold text-[var(--foreground)]">
            🔄 完整请求生命周期模拟
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[var(--foreground)]/60">
            模拟一个请求从客户端到服务端的完整 AOP 处理流程。
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {/* 控制栏 */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setFlowStep(0);
                setIsPlaying(true);
              }}
              disabled={isPlaying}
              className="flex items-center gap-2 rounded-[var(--radius-sm)] border-2 border-[var(--foreground)] bg-[var(--accent)] px-5 py-2.5 font-['Outfit',sans-serif] text-sm font-bold text-white shadow-[4px_4px_0px_0px_var(--foreground)] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_var(--foreground)] disabled:opacity-50"
            >
              <Play size={16} strokeWidth={2.5} />
              {isPlaying ? "播放中…" : "开始模拟"}
            </button>
            <button
              onClick={() => {
                setFlowStep(0);
                setIsPlaying(false);
              }}
              className="flex items-center gap-2 rounded-[var(--radius-sm)] border-2 border-[var(--foreground)] bg-[var(--card)] px-4 py-2.5 font-['Outfit',sans-serif] text-sm font-bold shadow-[4px_4px_0px_0px_var(--foreground)] transition-all hover:-translate-y-0.5"
            >
              <RotateCcw size={16} strokeWidth={2.5} />
              重置
            </button>
            <div className="rounded-full border-2 border-[var(--foreground)] bg-[var(--tertiary)] px-3 py-1 font-['JetBrains_Mono',monospace] text-xs font-bold">
              Step {flowStep}/{requestFlow.length - 1}
            </div>
          </div>

          {/* 流程步骤 */}
          <div className="space-y-2">
            {requestFlow.map((step, i) => {
              const isActive = i <= flowStep;
              const isCurrent = i === flowStep;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-4 rounded-[var(--radius-md)] border-2 px-5 py-3 transition-all duration-500 ${
                    isActive
                      ? "border-[var(--foreground)] bg-[var(--card)] shadow-[4px_4px_0px_0px_var(--foreground)]"
                      : "border-dashed border-[var(--border)] bg-[var(--background)] opacity-50"
                  } ${isCurrent ? "ring-2 ring-[var(--accent)] scale-[1.02]" : ""}`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--foreground)] transition-all ${
                      isActive ? "text-white" : "bg-[var(--border)] text-[var(--foreground)]/30"
                    }`}
                    style={{ backgroundColor: isActive ? step.color : undefined }}
                  >
                    <step.icon size={18} strokeWidth={2.5} />
                  </div>
                  <span
                    className={`font-['Outfit',sans-serif] text-sm font-bold transition-all ${
                      isActive ? "text-[var(--foreground)]" : "text-[var(--foreground)]/30"
                    }`}
                  >
                    {step.label}
                  </span>
                  {isActive && i > 0 && (
                    <span className="ml-auto font-['JetBrains_Mono',monospace] text-xs text-[var(--quaternary)]">
                      ✓ completed
                    </span>
                  )}
                  {isCurrent && i === requestFlow.length - 1 && (
                    <span className="ml-auto animate-pulse rounded-full bg-[var(--quaternary)] px-3 py-1 font-['Outfit',sans-serif] text-xs font-bold text-white">
                      🎉 完成
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ BFF 代码实战 ═══════ */}
      <section className="container py-16">
        <div className="mb-10 text-center">
          <SectionLabel text="BFF Implementation" />
          <h2 className="mt-4 font-['Outfit',sans-serif] text-3xl font-extrabold text-[var(--foreground)]">
            🧩 BFF 聚合编排实战
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <CodeBlock
              title="user-bff.controller.ts"
              language="typescript"
              code={`@Controller('bff/user')
@UseGuards(AuthGuard)
@UseInterceptors(TransformInterceptor)
export class UserBffController {
  constructor(
    private readonly userClient: ClientProxy,
    private readonly orderClient: ClientProxy,
    private readonly notifyClient: ClientProxy,
  ) {}

  // 聚合多个微服务的数据
  @Get(':id/dashboard')
  async getDashboard(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    // 并行请求多个微服务
    const [user, orders, notifications] =
      await Promise.all([
        this.userClient
          .send('user.get', { id })
          .toPromise(),
        this.orderClient
          .send('order.recent', { userId: id })
          .toPromise(),
        this.notifyClient
          .send('notification.unread', { userId: id })
          .toPromise(),
      ]);

    // BFF 层的数据编排和裁剪
    return {
      profile: {
        name: user.name,
        avatar: user.avatar,
      },
      recentOrders: orders.slice(0, 5),
      unreadCount: notifications.length,
      quickLinks: this.generateQuickLinks(user.role),
    };
  }
}`}
            />
          </div>

          <div className="space-y-4">
            <CodeBlock
              title="bff.module.ts"
              language="typescript"
              code={`@Module({
  imports: [
    // 注册微服务客户端
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'user-service',
          port: 3001,
        },
      },
      {
        name: 'ORDER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'order-service',
          port: 3002,
        },
      },
      {
        name: 'NOTIFY_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'redis',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [UserBffController],
  providers: [
    // 全局 Guard + Interceptor
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class BffModule {}`}
            />
          </div>
        </div>

        {/* 架构图 */}
        <div className="animate-slide mx-auto mt-10 max-w-4xl" style={{ animationDelay: "0.2s" }}>
          <div className="rounded-[var(--radius-lg)] border-2 border-[var(--foreground)] bg-[var(--card)] p-6 shadow-[8px_8px_0px_0px_var(--foreground)]">
            <h3 className="mb-6 text-center font-['Outfit',sans-serif] text-lg font-bold">
              📐 BFF 数据聚合架构图
            </h3>

            <div className="flex flex-col items-center gap-4">
              {/* 客户端 */}
              <div className="flex gap-4">
                {[
                  { label: "Web App", icon: Monitor, color: "var(--accent)" },
                  { label: "Mobile App", icon: Smartphone, color: "var(--secondary)" },
                  { label: "小程序", icon: Globe, color: "var(--tertiary)" },
                ].map((client) => (
                  <div
                    key={client.label}
                    className="flex items-center gap-2 rounded-[var(--radius-sm)] border-2 border-[var(--foreground)] bg-[var(--card)] px-3 py-2 shadow-[3px_3px_0px_0px_var(--foreground)]"
                  >
                    <client.icon size={16} strokeWidth={2.5} style={{ color: client.color }} />
                    <span className="font-['Outfit',sans-serif] text-xs font-bold">{client.label}</span>
                  </div>
                ))}
              </div>

              {/* 箭头 */}
              <div className="flex flex-col items-center text-[var(--border)]">
                <div className="h-6 w-0.5 bg-[var(--border)]" />
                <ChevronRight size={16} className="rotate-90" />
              </div>

              {/* API Gateway */}
              <div className="w-full max-w-sm rounded-[var(--radius-md)] border-3 border-[var(--foreground)] bg-[var(--foreground)] px-4 py-3 text-center shadow-[6px_6px_0px_0px_var(--accent)]">
                <div className="flex items-center justify-center gap-2 text-white">
                  <Globe size={18} strokeWidth={2.5} />
                  <span className="font-['Outfit',sans-serif] text-sm font-bold">API Gateway</span>
                </div>
                <p className="mt-1 text-[10px] text-white/50">路由 · 限流 · 鉴权 · 日志</p>
              </div>

              <div className="flex flex-col items-center text-[var(--border)]">
                <div className="h-6 w-0.5 bg-[var(--border)]" />
                <ChevronRight size={16} className="rotate-90" />
              </div>

              {/* BFF 层 */}
              <div className="w-full max-w-md rounded-[var(--radius-md)] border-3 border-[var(--foreground)] bg-[var(--accent)]/10 px-6 py-4 shadow-[6px_6px_0px_0px_var(--secondary)]">
                <div className="mb-2 flex items-center justify-center gap-2 text-[var(--accent)]">
                  <Server size={18} strokeWidth={2.5} />
                  <span className="font-['Outfit',sans-serif] text-sm font-extrabold">BFF 聚合层</span>
                </div>
                <div className="flex justify-center gap-2">
                  {["Guard", "Interceptor", "Pipe", "Controller"].map((l) => (
                    <span
                      key={l}
                      className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2 py-0.5 font-['JetBrains_Mono',monospace] text-[10px] font-bold text-[var(--accent)]"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center text-[var(--border)]">
                <div className="h-6 w-0.5 bg-[var(--border)]" />
                <ChevronRight size={16} className="rotate-90" />
              </div>

              {/* 微服务 */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: "用户服务", color: "var(--quaternary)", port: ":3001" },
                  { label: "订单服务", color: "var(--secondary)", port: ":3002" },
                  { label: "通知服务", color: "var(--tertiary)", port: ":3003" },
                  { label: "商品服务", color: "var(--accent)", port: ":3004" },
                ].map((svc) => (
                  <div
                    key={svc.label}
                    className="flex items-center gap-2 rounded-[var(--radius-sm)] border-2 border-[var(--foreground)] bg-[var(--card)] px-3 py-2 shadow-[3px_3px_0px_0px_var(--foreground)]"
                  >
                    <Database size={14} strokeWidth={2.5} style={{ color: svc.color }} />
                    <span className="font-['Outfit',sans-serif] text-xs font-bold">{svc.label}</span>
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[var(--foreground)]/40">
                      {svc.port}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 企业级 AOP 最佳实践 ═══════ */}
      <section className="container py-16">
        <div className="mb-10 text-center">
          <SectionLabel text="Best Practices" />
          <h2 className="mt-4 font-['Outfit',sans-serif] text-3xl font-extrabold text-[var(--foreground)]">
            🏢 企业级 AOP 最佳实践
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {[
            {
              title: "统一响应格式",
              icon: LayoutGrid,
              color: "accent",
              content: "使用 Interceptor 统一包装所有响应为 { code, message, data, timestamp } 格式。前端无需关心后端返回格式差异。",
              tag: "Interceptor",
            },
            {
              title: "全局异常过滤",
              icon: Filter,
              color: "secondary",
              content: "ExceptionFilter 捕获所有异常，区分 HttpException 与未知异常，返回统一错误结构。生产环境隐藏堆栈信息。",
              tag: "Filter",
            },
            {
              title: "声明式权限控制",
              icon: Lock,
              color: "quaternary",
              content: "自定义 @Roles() 装饰器 + RolesGuard 实现 RBAC。结合 Reflector 读取元数据，实现零侵入的权限管理。",
              tag: "Guard",
            },
            {
              title: "请求链路追踪",
              icon: Workflow,
              color: "tertiary",
              content: "在 Middleware 中生成 requestId，通过 cls-hooked 注入到请求上下文。贯穿所有 AOP 层和微服务调用链。",
              tag: "Middleware",
            },
            {
              title: "接口限流与防刷",
              icon: Timer,
              color: "accent",
              content: "@nestjs/throttler 提供声明式限流。可在 Guard 层按 IP、用户、路由粒度分别配置。配合 Redis 做分布式限流。",
              tag: "Guard",
            },
            {
              title: "缓存策略分层",
              icon: Cpu,
              color: "secondary",
              content: "Interceptor 层实现 HTTP 缓存头管理，Service 层使用 Redis 缓存热点数据。避免在 Controller 层混入缓存逻辑。",
              tag: "Interceptor",
            },
          ].map((practice, i) => {
            const colorClasses: Record<string, string> = {
              accent: "border-[var(--accent)] bg-[var(--accent)]",
              secondary: "border-[var(--secondary)] bg-[var(--secondary)]",
              tertiary: "border-[var(--tertiary)] bg-[var(--tertiary)]",
              quaternary: "border-[var(--quaternary)] bg-[var(--quaternary)]",
            };
            return (
              <div
                key={practice.title}
                className="animate-slide flex gap-4 rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--card)] p-5 shadow-[5px_5px_0px_0px_var(--foreground)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_var(--foreground)]"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[var(--radius-md)] border-2 border-[var(--foreground)] text-white shadow-[3px_3px_0px_0px_var(--foreground)] ${colorClasses[practice.color]}`}
                >
                  <practice.icon size={22} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-['Outfit',sans-serif] text-base font-bold">{practice.title}</h3>
                    <span className="rounded-full bg-[var(--foreground)]/10 px-2 py-0.5 font-['JetBrains_Mono',monospace] text-[10px] font-bold text-[var(--foreground)]/60">
                      {practice.tag}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--foreground)]/65">{practice.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════ 关键区别对比 ═══════ */}
      <section className="container py-16">
        <div className="mb-10 text-center">
          <SectionLabel text="Comparison" />
          <h2 className="mt-4 font-['Outfit',sans-serif] text-3xl font-extrabold text-[var(--foreground)]">
            ⚔️ BFF vs GraphQL vs API Gateway
          </h2>
        </div>

        <div className="mx-auto max-w-4xl overflow-x-auto">
          <div className="min-w-[600px] rounded-[var(--radius-lg)] border-2 border-[var(--foreground)] bg-[var(--card)] shadow-[8px_8px_0px_0px_var(--foreground)]">
            {/* 表头 */}
            <div className="grid grid-cols-4 gap-0 border-b-2 border-[var(--foreground)]">
              {["维度", "BFF", "GraphQL", "API Gateway"].map((h, i) => (
                <div
                  key={h}
                  className={`border-r-2 border-[var(--foreground)] px-4 py-3 font-['Outfit',sans-serif] text-sm font-bold ${
                    i === 0
                      ? "bg-[var(--foreground)] text-white"
                      : "bg-[var(--accent)]/10"
                  } ${i === 3 ? "border-r-0" : ""}`}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* 数据行 */}
            {[
              {
                dim: "核心职责",
                bff: "数据聚合裁剪",
                gql: "查询语言 + Schema",
                gw: "路由/限流/鉴权",
              },
              {
                dim: "灵活性",
                bff: "⭐⭐⭐⭐⭐",
                gql: "⭐⭐⭐⭐⭐",
                gw: "⭐⭐⭐",
              },
              {
                dim: "复杂度",
                bff: "中等",
                gql: "高",
                gw: "低",
              },
              {
                dim: "端级定制",
                bff: "✅ 天然支持",
                gql: "✅ 查询自选字段",
                gw: "❌ 统一出口",
              },
              {
                dim: "团队要求",
                bff: "全栈能力",
                gql: "Schema 设计能力",
                gw: "运维能力",
              },
              {
                dim: "最佳搭配",
                bff: "+ API Gateway",
                gql: "+ BFF 层",
                gw: "+ BFF 层",
              },
            ].map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-4 gap-0 ${
                  i < 5 ? "border-b border-[var(--border)]" : ""
                }`}
              >
                <div className="border-r-2 border-[var(--foreground)] bg-[var(--foreground)]/5 px-4 py-3 font-['Outfit',sans-serif] text-sm font-bold">
                  {row.dim}
                </div>
                <div className="border-r border-[var(--border)] px-4 py-3 text-sm text-[var(--foreground)]/80">
                  {row.bff}
                </div>
                <div className="border-r border-[var(--border)] px-4 py-3 text-sm text-[var(--foreground)]/80">
                  {row.gql}
                </div>
                <div className="px-4 py-3 text-sm text-[var(--foreground)]/80">{row.gw}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-2xl">
          <div className="rounded-[var(--radius-md)] border-2 border-dashed border-[var(--tertiary)] bg-[var(--tertiary)]/10 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-[var(--foreground)] bg-[var(--tertiary)] shadow-[2px_2px_0px_0px_var(--foreground)]">
                <Sparkles size={14} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-[var(--foreground)]">
                  企业级推荐架构
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-[var(--foreground)]/70">
                  <strong>API Gateway</strong>（Kong/Nginx）负责路由、限流、鉴权 →
                  <strong> NestJS BFF</strong>（利用 AOP 做数据聚合、裁剪、缓存）→
                  <strong> 微服务集群</strong>。三者各司其职，互不耦合。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 核心代码速查 ═══════ */}
      <section className="container py-16">
        <div className="mb-10 text-center">
          <SectionLabel text="Cheat Sheet" />
          <h2 className="mt-4 font-['Outfit',sans-serif] text-3xl font-extrabold text-[var(--foreground)]">
            📋 AOP 核心接口速查
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-3">
          {[
            {
              title: "Guard",
              interface: "CanActivate",
              method: "canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>",
              note: "返回 true 放行，false 拒绝。支持异步。",
            },
            {
              title: "Interceptor",
              interface: "NestInterceptor",
              method: "intercept(context: ExecutionContext, next: CallHandler): Observable<any>",
              note: "通过 next.handle() 获取 Observable 流，可 pipe 操作。",
            },
            {
              title: "Pipe",
              interface: "PipeTransform",
              method: "transform(value: any, metadata: ArgumentMetadata): any",
              note: "返回转换后的值。抛出异常则阻止请求。",
            },
            {
              title: "ExceptionFilter",
              interface: "ExceptionFilter",
              method: "catch(exception: unknown, host: ArgumentsHost): void",
              note: "通过 host.getResponse() 获取响应对象处理异常。",
            },
            {
              title: "Middleware",
              interface: "NestMiddleware",
              method: "use(req: Request, res: Response, next: NextFunction): void",
              note: "与 Express 中间件相同。必须调用 next()。",
            },
            {
              title: "ExecutionContext",
              interface: "ExecutionContext",
              method: "getHandler() / getClass() / getType() / switchToHttp()",
              note: "可切换到 HTTP/WS/RPC 上下文。Guard 和 Interceptor 的核心参数。",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="animate-slide rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--card)] p-5 shadow-[5px_5px_0px_0px_var(--foreground)]"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <h3 className="mb-1 font-['Outfit',sans-serif] text-base font-bold text-[var(--accent)]">
                {item.title}
              </h3>
              <code className="mb-2 inline-block rounded-full bg-[var(--accent)]/10 px-2 py-0.5 font-['JetBrains_Mono',monospace] text-[10px] font-bold text-[var(--accent)]">
                {item.interface}
              </code>
              <div className="mb-2 rounded-[var(--radius-sm)] border-2 border-[var(--foreground)]/20 bg-[#1a1b26] px-3 py-2">
                <code className="font-['JetBrains_Mono',monospace] text-[11px] leading-relaxed text-[#c0caf5]">
                  {item.method}
                </code>
              </div>
              <p className="text-xs text-[var(--foreground)]/60">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ 总结 ═══════ */}
      <section className="container py-16">
        <div className="mx-auto max-w-3xl">
          <div className="animate-pop rounded-[var(--radius-lg)] border-3 border-[var(--foreground)] bg-[var(--accent)] p-8 text-center shadow-[10px_10px_0px_0px_var(--secondary)] md:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[var(--radius-lg)] border-3 border-[var(--foreground)] bg-white shadow-[6px_6px_0px_0px_var(--foreground)]">
              <Binary size={40} strokeWidth={2.5} className="text-[var(--accent)]" />
            </div>

            <h2 className="mb-4 font-['Outfit',sans-serif] text-3xl font-extrabold text-white md:text-4xl">
              核心要义
            </h2>

            <div className="space-y-4 text-left">
              {[
                { emoji: "🧅", text: "NestJS AOP 通过洋葱模型将横切关注点（鉴权、日志、校验、缓存）从业务代码中剥离" },
                { emoji: "🏗️", text: "BFF 模式让后端为不同前端量身定制数据聚合策略，避免过度获取或数据不足" },
                { emoji: "🔧", text: "自定义装饰器 + Guard/Interceptor 组合实现声明式编程，代码即文档" },
                { emoji: "🚀", text: "API Gateway + BFF + 微服务 是企业级架构的黄金三角组合" },
              ].map((point, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-[var(--radius-md)] border-2 border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm"
                >
                  <span className="text-xl">{point.emoji}</span>
                  <span className="text-sm leading-relaxed text-white/90">{point.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}