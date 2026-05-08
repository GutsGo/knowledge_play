"use client";

import { useState, useEffect } from "react";
import {
  Layers,
  Boxes,
  ArrowRight,
  ArrowDown,
  Circle,
  Square,
  Triangle,
  GitBranch,
  FolderTree,
  Code2,
  Zap,
  Shield,
  Puzzle,
  RefreshCw,
  FileCode,
  Package,
  Database,
  Globe,
  MousePointerClick,
  ChevronRight,
  Sparkles,
  Workflow,
  Network,
} from "lucide-react";

export default function DDDCleanArchitecturePage() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [showDeps, setShowDeps] = useState(false);
  const [animateFlow, setAnimateFlow] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<string>("entity");

  useEffect(() => {
    const timer = setTimeout(() => setShowDeps(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const layers = [
    {
      id: "domain",
      name: "Domain",
      label: "领域层",
      color: "var(--accent)",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-400",
      icon: <Boxes size={24} />,
      desc: "核心业务逻辑，不依赖任何外部框架",
    },
    {
      id: "application",
      name: "Application",
      label: "应用层",
      color: "var(--secondary)",
      bgColor: "bg-pink-100",
      borderColor: "border-pink-400",
      icon: <Workflow size={24} />,
      desc: "用例编排，协调领域对象完成业务流程",
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      label: "基础设施层",
      color: "var(--tertiary)",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-400",
      icon: <Package size={24} />,
      desc: "框架适配、API 调用、状态管理实现",
    },
    {
      id: "presentation",
      name: "Presentation",
      label: "表现层",
      color: "var(--quaternary)",
      bgColor: "bg-emerald-100",
      borderColor: "border-emerald-400",
      icon: <Globe size={24} />,
      desc: "React 组件、Hooks、UI 状态",
    },
  ];

  const dddPatterns = [
    {
      id: "entity",
      name: "Entity",
      icon: <Square size={20} />,
      color: "var(--accent)",
      bg: "bg-purple-50",
      desc: "具有唯一标识的业务对象，身份标识贯穿生命周期",
      code: `class Order {
  constructor(
    private readonly id: OrderId,
    private items: OrderItem[],
    private status: OrderStatus
  ) {}

  // 业务逻辑封装在实体内部
  addItem(item: OrderItem): void {
    if (this.status !== 'draft') {
      throw new Error('只能修改草稿订单');
    }
    this.items.push(item);
  }

  get total(): Money {
    return this.items.reduce(
      (sum, item) => sum.add(item.subtotal),
      Money.ZERO
    );
  }
}`,
    },
    {
      id: "vo",
      name: "Value Object",
      icon: <Circle size={20} />,
      color: "var(--secondary)",
      bg: "bg-pink-50",
      desc: "不可变的值对象，通过属性值判断相等性",
      code: `class Money {
  constructor(
    readonly amount: number,
    readonly currency: Currency
  ) {
    if (amount < 0) throw new Error('金额不能为负');
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(
      this.amount + other.amount,
      this.currency
    );
  }

  equals(other: Money): boolean {
    return this.amount === other.amount
      && this.currency === other.currency;
  }
}`,
    },
    {
      id: "aggregate",
      name: "Aggregate",
      icon: <Boxes size={20} />,
      color: "var(--tertiary)",
      bg: "bg-yellow-50",
      desc: "聚合根，保证业务规则一致性的一致性边界",
      code: `class ShoppingCart {
  // 聚合根管理内部实体
  private items: CartItem[] = [];
  
  addItem(product: Product, qty: number) {
    const existing = this.findItem(product.id);
    if (existing) {
      existing.increaseQuantity(qty);
    } else {
      this.items.push(
        new CartItem(product, qty)
      );
    }
    this.ensureStockAvailability();
  }

  // 聚合根保护不变量
  private ensureStockAvailability() {
    for (const item of this.items) {
      if (!item.isAvailable()) {
        throw new InsufficientStockError();
      }
    }
  }
}`,
    },
    {
      id: "repo",
      name: "Repository",
      icon: <Database size={20} />,
      color: "var(--quaternary)",
      bg: "bg-emerald-50",
      desc: "仓储模式，隔离持久化细节的抽象接口",
      code: `// 领程层定义接口
interface OrderRepository {
  findById(id: OrderId): Promise<Order>;
  save(order: Order): Promise<void>;
  findByCustomer(cid: CustomerId): Promise<Order[]>;
}

// 基础设施层实现
class ApiOrderRepository implements OrderRepository {
  constructor(private api: HttpClient) {}

  async findById(id: OrderId): Promise<Order> {
    const dto = await this.api.get(
      \`/orders/\${id.value}\`
    );
    return OrderMapper.toDomain(dto);
  }

  async save(order: Order): Promise<void> {
    const dto = OrderMapper.toPersistence(order);
    await this.api.put(\`/orders/\${order.id}\`, dto);
  }
}`,
    },
  ];

  const benefits = [
    {
      icon: <Shield size={24} />,
      title: "框架无关",
      desc: "核心业务逻辑独立于 React/Vue，可自由迁移",
      color: "var(--accent)",
    },
    {
      icon: <TestTube size={24} />,
      title: "可测试性",
      desc: "纯函数式的领域逻辑，单元测试覆盖率极高",
      color: "var(--secondary)",
    },
    {
      icon: <Puzzle size={24} />,
      title: "可维护性",
      desc: "职责清晰分离，修改一处不影响其他层次",
      color: "var(--tertiary)",
    },
    {
      icon: <Users size={24} />,
      title: "团队协作",
      desc: "前后端共享领域模型语言，沟通更高效",
      color: "var(--quaternary)",
    },
  ];

  return (
    <div className="min-h-screen bg-dot-grid" style={{ background: "var(--background)" }}>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden container">
        {/* 装饰性几何元素 */}
        <div
          className="absolute top-10 left-10 w-32 h-32 md:w-48 md:h-48 opacity-20 animate-float"
          style={{
            background: "var(--accent)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-24 h-24 md:w-36 md:h-36 opacity-15 animate-float"
          style={{
            background: "var(--tertiary)",
            borderRadius: "40% 60% 70% 30% / 30% 70% 40% 60%",
            animationDelay: "1s",
          }}
        />

        <div className="container relative z-10">
          {/* 标签 */}
          <div className="flex flex-wrap gap-3 mb-8 animate-pop">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider border-2"
              style={{
                borderColor: "var(--foreground)",
                background: "var(--accent)",
                color: "white",
                borderRadius: "var(--radius-full)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <Layers size={16} strokeWidth={2.5} />
              架构设计
            </span>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider border-2"
              style={{
                borderColor: "var(--foreground)",
                background: "var(--card)",
                borderRadius: "var(--radius-full)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <Code2 size={16} strokeWidth={2.5} />
              前端工程化
            </span>
          </div>

          {/* 主标题 */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-slide"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span style={{ color: "var(--accent)" }}>DDD</span>{" "}
            <span style={{ color: "var(--foreground)" }}>&</span>{" "}
            <span style={{ color: "var(--quaternary)" }}>整洁架构</span>
            <br />
            <span
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
              style={{ color: "var(--foreground)", opacity: 0.7 }}
            >
              在前端的落地实践
            </span>
          </h1>

          {/* 副标题 */}
          <p
            className="text-lg md:text-xl max-w-3xl mb-10 animate-slide"
            style={{
              color: "var(--foreground)",
              opacity: 0.8,
              animationDelay: "0.2s",
              fontFamily: "var(--font-body)",
            }}
          >
            领域驱动设计不只是后端专属！让我们探索如何将 DDD 核心思想与 Clean Architecture 结合，
            构建真正<strong>可维护、可测试、框架无关</strong>的前端应用。
          </p>

          {/* 核心概念速览 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: <Boxes size={28} />, label: "领域模型", color: "var(--accent)" },
              { icon: <Layers size={28} />, label: "分层架构", color: "var(--secondary)" },
              { icon: <ArrowRight size={28} />, label: "依赖反转", color: "var(--tertiary)" },
              { icon: <Shield size={28} />, label: "边界隔离", color: "var(--quaternary)" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 p-5 border-2 transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: "var(--foreground)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--card)",
                  boxShadow: "6px 6px 0px 0px " + item.color,
                }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full border-2"
                  style={{
                    borderColor: "var(--foreground)",
                    background: item.color,
                    color: "white",
                  }}
                >
                  {item.icon}
                </div>
                <span className="text-sm font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 为什么要用 DDD? ==================== */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest border-2 mb-4"
              style={{
                borderColor: "var(--foreground)",
                borderRadius: "var(--radius-full)",
                background: "var(--tertiary)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              Why DDD?
            </span>
            <h2
              className="text-3xl md:text-5xl font-extrabold"
              style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
            >
              前端为什么需要{" "}
              <span style={{ color: "var(--accent)" }}>领域驱动</span>？
            </h2>
          </div>

          {/* 痛点 vs 解决方案 */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* 痛点 */}
            <div
              className="p-8 border-2 animate-slide"
              style={{
                borderColor: "var(--foreground)",
                borderRadius: "var(--radius-lg)",
                background: "#FFF0F0",
                boxShadow: "8px 8px 0px 0px var(--secondary)",
              }}
            >
              <h3
                className="text-xl font-bold mb-6 flex items-center gap-3"
                style={{ color: "var(--secondary)", fontFamily: "var(--font-heading)" }}
              >
                <span
                  className="w-10 h-10 flex items-center justify-center rounded-full border-2"
                  style={{ borderColor: "var(--foreground)", background: "var(--secondary)", color: "white" }}
                >
                  ✕
                </span>
                前端常见痛点
              </h3>
              <ul className="space-y-4">
                {[
                  "业务逻辑散落在组件、Hooks、Redux 各处",
                  "一个需求改动，牵一发动全身",
                  "代码无法复用，换框架就要重写",
                  "难以编写有效的单元测试",
                  "前后端概念不一致，沟通成本高",
                ].map((pain, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold mt-0.5"
                      style={{ background: "var(--secondary)", color: "white" }}
                    >
                      !
                    </span>
                    <span style={{ fontFamily: "var(--font-body)" }}>{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 解决方案 */}
            <div
              className="p-8 border-2 animate-slide"
              style={{
                borderColor: "var(--foreground)",
                borderRadius: "var(--radius-lg)",
                background: "#F0FFF4",
                boxShadow: "8px 8px 0px 0px var(--quaternary)",
                animationDelay: "0.2s",
              }}
            >
              <h3
                className="text-xl font-bold mb-6 flex items-center gap-3"
                style={{ color: "var(--quaternary)", fontFamily: "var(--font-heading)" }}
              >
                <span
                  className="w-10 h-10 flex items-center justify-center rounded-full border-2"
                  style={{ borderColor: "var(--foreground)", background: "var(--quaternary)", color: "white" }}
                >
                  ✓
                </span>
                DDD 带来的改变
              </h3>
              <ul className="space-y-4">
                {[
                  "业务逻辑集中在领域层，职责单一",
                  "修改局限在特定层次，影响范围可控",
                  "核心逻辑与框架解耦，迁移无痛",
                  "纯函数式的领域对象，测试友好",
                  "统一语言 (Ubiquitous Language) 消除隔阂",
                ].map((solution, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold mt-0.5"
                      style={{ background: "var(--quaternary)", color: "white" }}
                    >
                      ✓
                    </span>
                    <span style={{ fontFamily: "var(--font-body)" }}>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 收益卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="group p-6 border-2 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-none cursor-default animate-slide"
                style={{
                  borderColor: "var(--foreground)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--card)",
                  boxShadow: "6px 6px 0px 0px var(--foreground)",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-2xl border-2 transition-transform duration-300 group-hover:rotate-6"
                  style={{
                    borderColor: "var(--foreground)",
                    background: b.color,
                    color: "white",
                  }}
                >
                  {b.icon}
                </div>
                <h4
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
                >
                  {b.title}
                </h4>
                <p className="text-sm" style={{ color: "var(--foreground)", opacity: 0.7, fontFamily: "var(--font-body)" }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 整洁架构可视化 ==================== */}
      <section className="pb-16 relative overflow-hidden">
        {/* 背景装饰 */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 opacity-10"
          style={{
            background: "var(--accent)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />

        <div className="container">
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest border-2 mb-4"
              style={{
                borderColor: "var(--foreground)",
                borderRadius: "var(--radius-full)",
                background: "var(--accent)",
                color: "white",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              Clean Architecture
            </span>
            <h2
              className="text-3xl md:text-5xl font-extrabold mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
            >
              整洁架构的{" "}
              <span style={{ color: "var(--accent)" }}>同心圆</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--foreground)", opacity: 0.7 }}>
              依赖方向始终<strong>向内</strong>，外层依赖内层，内层对外层一无所知
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 同心圆可视化 */}
            <div className="relative flex items-center justify-center py-10">
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                {/* 外层 - 表现层 */}
                <div
                  className="absolute inset-0 border-3 cursor-pointer transition-all duration-300"
                  style={{
                    borderColor: "var(--quaternary)",
                    borderRadius: "var(--radius-full)",
                    background: activeLayer === "presentation" ? "rgba(52,211,153,0.2)" : "rgba(52,211,153,0.08)",
                    transform: activeLayer === "presentation" ? "scale(1.05)" : "scale(1)",
                  }}
                  onMouseEnter={() => setActiveLayer("presentation")}
                  onMouseLeave={() => setActiveLayer(null)}
                >
                  <span
                    className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-bold uppercase px-3 py-1 rounded-full border-2"
                    style={{
                      borderColor: "var(--foreground)",
                      background: "var(--quaternary)",
                      color: "white",
                    }}
                  >
                    Presentation
                  </span>
                </div>

                {/* 基础设施层 */}
                <div
                  className="absolute border-3 cursor-pointer transition-all duration-300"
                  style={{
                    inset: "40px",
                    borderColor: "var(--tertiary)",
                    borderRadius: "var(--radius-full)",
                    background: activeLayer === "infrastructure" ? "rgba(251,191,36,0.25)" : "rgba(251,191,36,0.1)",
                    transform: activeLayer === "infrastructure" ? "scale(1.05)" : "scale(1)",
                  }}
                  onMouseEnter={() => setActiveLayer("infrastructure")}
                  onMouseLeave={() => setActiveLayer(null)}
                >
                  <span
                    className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-bold uppercase px-3 py-1 rounded-full border-2 whitespace-nowrap"
                    style={{
                      borderColor: "var(--foreground)",
                      background: "var(--tertiary)",
                      color: "var(--foreground)",
                    }}
                  >
                    Infrastructure
                  </span>
                </div>

                {/* 应用层 */}
                <div
                  className="absolute border-3 cursor-pointer transition-all duration-300"
                  style={{
                    inset: "80px",
                    borderColor: "var(--secondary)",
                    borderRadius: "var(--radius-full)",
                    background: activeLayer === "application" ? "rgba(244,114,182,0.25)" : "rgba(244,114,182,0.1)",
                    transform: activeLayer === "application" ? "scale(1.05)" : "scale(1)",
                  }}
                  onMouseEnter={() => setActiveLayer("application")}
                  onMouseLeave={() => setActiveLayer(null)}
                >
                  <span
                    className="absolute top-3 left-1/2 -translate-x-1/2 text-xs font-bold uppercase px-3 py-1 rounded-full border-2"
                    style={{
                      borderColor: "var(--foreground)",
                      background: "var(--secondary)",
                      color: "white",
                    }}
                  >
                    Application
                  </span>
                </div>

                {/* 领域层 - 核心 */}
                <div
                  className="absolute border-3 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center"
                  style={{
                    inset: "120px",
                    borderColor: "var(--accent)",
                    borderRadius: "var(--radius-full)",
                    background: activeLayer === "domain" ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.15)",
                    transform: activeLayer === "domain" ? "scale(1.1)" : "scale(1)",
                  }}
                  onMouseEnter={() => setActiveLayer("domain")}
                  onMouseLeave={() => setActiveLayer(null)}
                >
                  <Boxes size={28} style={{ color: "var(--accent)" }} strokeWidth={2.5} />
                  <span className="text-xs font-bold uppercase mt-1" style={{ color: "var(--accent)" }}>
                    Domain
                  </span>
                </div>

                {/* 依赖方向箭头 */}
                {showDeps && (
                  <>
                    <div
                      className="absolute top-1/2 -right-8 -translate-y-1/2 animate-slide"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <div className="flex items-center gap-1 rotate-90">
                        <ArrowRight size={20} style={{ color: "var(--accent)" }} />
                        <span className="text-xs font-bold" style={{ color: "var(--accent)" }}>
                          依赖向内
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 层次说明 */}
            <div className="space-y-4">
              {layers.map((layer, i) => (
                <div
                  key={layer.id}
                  className="p-5 border-2 transition-all duration-300 cursor-pointer animate-slide"
                  style={{
                    borderColor: activeLayer === layer.id ? layer.color : "var(--border)",
                    borderRadius: "var(--radius-md)",
                    background: activeLayer === layer.id ? "var(--card)" : "transparent",
                    boxShadow: activeLayer === layer.id ? `6px 6px 0px 0px ${layer.color}` : "none",
                    animationDelay: `${i * 0.15}s`,
                  }}
                  onMouseEnter={() => setActiveLayer(layer.id)}
                  onMouseLeave={() => setActiveLayer(null)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl border-2"
                      style={{
                        borderColor: "var(--foreground)",
                        background: layer.color,
                        color: layer.id === "infrastructure" ? "var(--foreground)" : "white",
                      }}
                    >
                      {layer.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold uppercase tracking-wide" style={{ color: layer.color }}>
                          {layer.name}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full border"
                          style={{
                            borderColor: "var(--border)",
                            color: "var(--foreground)",
                            opacity: 0.6,
                          }}
                        >
                          {layer.label}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: "var(--foreground)", opacity: 0.7, fontFamily: "var(--font-body)" }}>
                        {layer.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* 依赖规则提示 */}
              <div
                className="p-4 border-2 border-dashed text-center animate-slide"
                style={{
                  borderColor: "var(--accent)",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(139,92,246,0.05)",
                  animationDelay: "0.6s",
                }}
              >
                <p className="text-sm font-bold" style={{ color: "var(--accent)", fontFamily: "var(--font-heading)" }}>
                  <ArrowDown size={16} className="inline mr-2" />
                  依赖方向：Presentation → Infrastructure → Application → Domain
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--foreground)", opacity: 0.6 }}>
                  Domain 层不依赖任何外部层！
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== DDD 核心模式 ==================== */}
      <section className="pb-16" style={{ background: "var(--card)" }}>
        <div className="container">
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest border-2 mb-4"
              style={{
                borderColor: "var(--foreground)",
                borderRadius: "var(--radius-full)",
                background: "var(--secondary)",
                color: "white",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              DDD Patterns
            </span>
            <h2
              className="text-3xl md:text-5xl font-extrabold mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
            >
              DDD 核心{" "}
              <span style={{ color: "var(--secondary)" }}>构建块</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--foreground)", opacity: 0.7 }}>
              点击下方模式查看详细说明和代码示例
            </p>
          </div>

          {/* 模式选择器 */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {dddPatterns.map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => setSelectedPattern(pattern.id)}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold border-2 transition-all duration-200"
                style={{
                  borderColor: "var(--foreground)",
                  borderRadius: "var(--radius-full)",
                  background: selectedPattern === pattern.id ? pattern.color : "var(--card)",
                  color: selectedPattern === pattern.id ? (pattern.id === "vo" || pattern.id === "aggregate" ? "var(--foreground)" : "white") : "var(--foreground)",
                  boxShadow: selectedPattern === pattern.id ? `4px 4px 0px 0px var(--foreground)` : "none",
                  transform: selectedPattern === pattern.id ? "translate(-2px, -2px)" : "none",
                }}
              >
                {pattern.icon}
                {pattern.name}
              </button>
            ))}
          </div>

          {/* 选中模式的详情 */}
          {dddPatterns.map((pattern) => (
            selectedPattern === pattern.id && (
              <div
                key={pattern.id}
                className="grid md:grid-cols-2 gap-8 animate-pop"
              >
                {/* 说明 */}
                <div
                  className="p-8 border-2"
                  style={{
                    borderColor: "var(--foreground)",
                    borderRadius: "var(--radius-lg)",
                    background: pattern.bg,
                    boxShadow: `8px 8px 0px 0px ${pattern.color}`,
                  }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-16 h-16 flex items-center justify-center rounded-2xl border-2"
                      style={{
                        borderColor: "var(--foreground)",
                        background: pattern.color,
                        color: pattern.id === "vo" || pattern.id === "aggregate" ? "var(--foreground)" : "white",
                      }}
                    >
                      <span className="scale-150">{pattern.icon}</span>
                    </div>
                    <div>
                      <h3
                        className="text-2xl font-extrabold"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
                      >
                        {pattern.name}
                      </h3>
                    </div>
                  </div>
                  <p
                    className="text-lg leading-relaxed mb-6"
                    style={{ fontFamily: "var(--font-body)", color: "var(--foreground)" }}
                  >
                    {pattern.desc}
                  </p>
                  <div
                    className="p-4 border-2 border-dashed"
                    style={{
                      borderColor: pattern.color,
                      borderRadius: "var(--radius-md)",
                      background: "rgba(255,255,255,0.5)",
                    }}
                  >
                    <p className="text-sm" style={{ color: "var(--foreground)", opacity: 0.8, fontFamily: "var(--font-body)" }}>
                      <Sparkles size={14} className="inline mr-2" style={{ color: pattern.color }} />
                      {pattern.id === "entity" && "关键特征：有唯一 ID，可变状态，封装业务规则"}
                      {pattern.id === "vo" && "关键特征：无唯一 ID，不可变，通过值比较相等"}
                      {pattern.id === "aggregate" && "关键特征：一致性边界，通过聚合根操作内部对象"}
                      {pattern.id === "repo" && "关键特征：接口在领域层定义，实现在基础设施层"}
                    </p>
                  </div>
                </div>

                {/* 代码示例 */}
                <div
                  className="border-2 overflow-hidden"
                  style={{
                    borderColor: "var(--foreground)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: `8px 8px 0px 0px ${pattern.color}`,
                  }}
                >
                  <div
                    className="flex items-center gap-2 px-5 py-3 border-b-2"
                    style={{
                      borderColor: "var(--foreground)",
                      background: "var(--foreground)",
                    }}
                  >
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: "var(--secondary)" }} />
                      <div className="w-3 h-3 rounded-full" style={{ background: "var(--tertiary)" }} />
                      <div className="w-3 h-3 rounded-full" style={{ background: "var(--quaternary)" }} />
                    </div>
                    <span className="text-xs font-mono ml-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {pattern.name.toLowerCase()}.ts
                    </span>
                  </div>
                  <pre
                    className="p-5 overflow-x-auto text-sm leading-relaxed"
                    style={{
                      background: "#1E293B",
                      color: "#E2E8F0",
                      fontFamily: "monospace",
                      maxHeight: "400px",
                    }}
                  >
                    <code>{pattern.code}</code>
                  </pre>
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* ==================== 前端项目结构 ==================== */}
      <section className="pb-16">
        <div className="container">
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest border-2 mb-4"
              style={{
                borderColor: "var(--foreground)",
                borderRadius: "var(--radius-full)",
                background: "var(--tertiary)",
                color: "var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              Project Structure
            </span>
            <h2
              className="text-3xl md:text-5xl font-extrabold mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
            >
              推荐的{" "}
              <span style={{ color: "var(--tertiary)" }}>目录结构</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 目录树 */}
            <div
              className="border-2 overflow-hidden"
              style={{
                borderColor: "var(--foreground)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "8px 8px 0px 0px var(--foreground)",
              }}
            >
              <div
                className="flex items-center gap-2 px-5 py-3 border-b-2"
                style={{ borderColor: "var(--foreground)", background: "var(--quaternary)" }}
              >
                <FolderTree size={18} strokeWidth={2.5} />
                <span className="font-bold text-sm">src/</span>
              </div>
              <div className="p-5 font-mono text-sm" style={{ background: "var(--card)" }}>
                <div className="space-y-1">
                  {[
                    { depth: 0, name: "src/", icon: <FolderTree size={14} />, color: "var(--accent)" },
                    { depth: 1, name: "domain/", icon: <Boxes size={14} />, color: "var(--accent)", badge: "核心" },
                    { depth: 2, name: "entities/", icon: <Square size={12} />, color: "var(--accent)" },
                    { depth: 2, name: "value-objects/", icon: <Circle size={12} />, color: "var(--accent)" },
                    { depth: 2, name: "aggregates/", icon: <Package size={12} />, color: "var(--accent)" },
                    { depth: 2, name: "repositories/", icon: <Database size={12} />, color: "var(--accent)" },
                    { depth: 2, name: "services/", icon: <Zap size={12} />, color: "var(--accent)" },
                    { depth: 2, name: "events/", icon: <GitBranch size={12} />, color: "var(--accent)" },
                    { depth: 1, name: "application/", icon: <Workflow size={14} />, color: "var(--secondary)", badge: "用例" },
                    { depth: 2, name: "use-cases/", icon: <Zap size={12} />, color: "var(--secondary)" },
                    { depth: 2, name: "dto/", icon: <FileCode size={12} />, color: "var(--secondary)" },
                    { depth: 2, name: "interfaces/", icon: <Network size={12} />, color: "var(--secondary)" },
                    { depth: 1, name: "infrastructure/", icon: <Package size={14} />, color: "var(--tertiary)", badge: "适配" },
                    { depth: 2, name: "api/", icon: <Globe size={12} />, color: "var(--tertiary)" },
                    { depth: 2, name: "repositories/", icon: <Database size={12} />, color: "var(--tertiary)" },
                    { depth: 2, name: "mappers/", icon: <RefreshCw size={12} />, color: "var(--tertiary)" },
                    { depth: 1, name: "presentation/", icon: <Globe size={14} />, color: "var(--quaternary)", badge: "UI" },
                    { depth: 2, name: "components/", icon: <Square size={12} />, color: "var(--quaternary)" },
                    { depth: 2, name: "hooks/", icon: <Zap size={12} />, color: "var(--quaternary)" },
                    { depth: 2, name: "pages/", icon: <FileCode size={12} />, color: "var(--quaternary)" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 py-1.5 px-2 rounded transition-colors hover:bg-gray-50"
                      style={{ paddingLeft: `${item.depth * 20 + 8}px` }}
                    >
                      {item.depth > 0 && (
                        <span style={{ color: "var(--border)" }}>├─</span>
                      )}
                      <span style={{ color: item.color }}>{item.icon}</span>
                      <span className="font-bold" style={{ color: "var(--foreground)" }}>{item.name}</span>
                      {item.badge && (
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full font-bold border"
                          style={{
                            borderColor: item.color,
                            color: item.color,
                            background: `${item.color}15`,
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 说明卡片 */}
            <div className="space-y-4">
              {[
                {
                  title: "domain/",
                  color: "var(--accent)",
                  desc: "纯业务逻辑，零框架依赖。Entity、Value Object、领域服务都在这里。这是整个应用的心脏。",
                  rule: "禁止 import React/Redux/Axios 等任何外部库",
                },
                {
                  title: "application/",
                  color: "var(--secondary)",
                  desc: "用例编排层，协调领域对象完成特定业务流程。每个 Use Case 通常对应一个用户操作。",
                  rule: "只能 import domain 层",
                },
                {
                  title: "infrastructure/",
                  color: "var(--tertiary)",
                  desc: "实现领域层定义的接口（如 Repository），处理 API 调用、数据映射、第三方集成。",
                  rule: "实现 domain 层接口，可使用任何库",
                },
                {
                  title: "presentation/",
                  color: "var(--quaternary)",
                  desc: "React 组件、Hooks、页面路由。组件通过调用 Use Case 与业务逻辑交互。",
                  rule: "不直接操作领域对象，通过 DTO 通信",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 border-2 transition-all duration-300 hover:-translate-x-1 animate-slide"
                  style={{
                    borderColor: "var(--foreground)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--card)",
                    boxShadow: `6px 6px 0px 0px ${item.color}`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FolderTree size={18} style={{ color: item.color }} strokeWidth={2.5} />
                    <span className="font-bold text-lg" style={{ fontFamily: "var(--font-heading)", color: item.color }}>
                      {item.title}
                    </span>
                  </div>
                  <p className="text-sm mb-3" style={{ fontFamily: "var(--font-body)", color: "var(--foreground)", opacity: 0.8 }}>
                    {item.desc}
                  </p>
                  <div
                    className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border-dashed border"
                    style={{ borderColor: item.color, color: item.color }}
                  >
                    <Shield size={12} />
                    {item.rule}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 交互式实验场：依赖方向 ==================== */}
      <section className="pb-16" style={{ background: "var(--card)" }}>
        <div className="container">
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest border-2 mb-4"
              style={{
                borderColor: "var(--foreground)",
                borderRadius: "var(--radius-full)",
                background: "var(--quaternary)",
                color: "white",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <MousePointerClick size={14} className="inline mr-2" />
              Interactive
            </span>
            <h2
              className="text-3xl md:text-5xl font-extrabold mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
            >
              交互实验场：{" "}
              <span style={{ color: "var(--quaternary)" }}>数据流向</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--foreground)", opacity: 0.7 }}>
              点击按钮观察一个用户操作如何在各层之间流转
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* 流程可视化 */}
            <div className="relative">
              {/* 连接线 */}
              <div
                className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block"
                style={{
                  background: `repeating-linear-gradient(
                    to bottom,
                    var(--border) 0px,
                    var(--border) 8px,
                    transparent 8px,
                    transparent 16px
                  )`,
                }}
              />

              {/* 流程步骤 */}
              <div className="space-y-8 relative">
                {[
                  {
                    step: 1,
                    layer: "Presentation",
                    color: "var(--quaternary)",
                    action: "用户点击「添加商品」按钮",
                    code: "const addToCart = useAddToCartUseCase();",
                    detail: "组件调用自定义 Hook，Hook 内部实例化 Use Case",
                  },
                  {
                    step: 2,
                    layer: "Application",
                    color: "var(--secondary)",
                    action: "AddToCartUseCase.execute()",
                    code: "await this.cartRepo.findById(cartId);",
                    detail: "Use Case 编排业务流程：获取购物车 → 添加商品 → 保存",
                  },
                  {
                    step: 3,
                    layer: "Domain",
                    color: "var(--accent)",
                    action: "ShoppingCart.addItem()",
                    code: "cart.addItem(product, quantity);",
                    detail: "聚合根执行业务规则校验，维护一致性约束",
                  },
                  {
                    step: 4,
                    layer: "Infrastructure",
                    color: "var(--tertiary)",
                    action: "ApiCartRepository.save()",
                    code: "await api.put('/carts/${id}', dto);",
                    detail: "Repository 实现调用 API，DTO Mapper 转换数据格式",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} animate-slide`}
                    style={{ animationDelay: `${i * 0.15}s` }}
                  >
                    {/* 内容卡片 */}
                    <div
                      className="flex-1 p-6 border-2 transition-all duration-300 hover:-translate-y-1"
                      style={{
                        borderColor: "var(--foreground)",
                        borderRadius: "var(--radius-md)",
                        background: "var(--background)",
                        boxShadow: `6px 6px 0px 0px ${item.color}`,
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold border-2"
                          style={{
                            borderColor: "var(--foreground)",
                            background: item.color,
                            color: item.layer === "infrastructure" ? "var(--foreground)" : "white",
                          }}
                        >
                          {item.step}
                        </span>
                        <span className="text-sm font-bold uppercase tracking-wide" style={{ color: item.color }}>
                          {item.layer}
                        </span>
                      </div>
                      <h4 className="font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                        {item.action}
                      </h4>
                      <code
                        className="inline-block px-3 py-1 rounded text-sm mb-2"
                        style={{
                          background: "var(--foreground)",
                          color: "#E2E8F0",
                          fontFamily: "monospace",
                        }}
                      >
                        {item.code}
                      </code>
                      <p className="text-sm" style={{ color: "var(--foreground)", opacity: 0.7, fontFamily: "var(--font-body)" }}>
                        {item.detail}
                      </p>
                    </div>

                    {/* 步骤指示器（移动端可见） */}
                    <div className="hidden md:flex flex-col items-center gap-2 flex-shrink-0">
                      <div
                        className="w-12 h-12 flex items-center justify-center rounded-xl border-2"
                        style={{
                          borderColor: "var(--foreground)",
                          background: item.color,
                          color: item.layer === "infrastructure" ? "var(--foreground)" : "white",
                        }}
                      >
                        <ArrowDown size={20} strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* 占位 */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>

            {/* 关键洞察 */}
            <div
              className="mt-12 p-6 border-2 text-center animate-pop"
              style={{
                borderColor: "var(--foreground)",
                borderRadius: "var(--radius-lg)",
                background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(244,114,182,0.1))",
                boxShadow: "8px 8px 0px 0px var(--accent)",
              }}
            >
              <Sparkles size={28} className="mx-auto mb-3" style={{ color: "var(--accent)" }} />
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                核心洞察
              </h3>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--foreground)", opacity: 0.8 }}>
                注意依赖方向：<strong>组件 → Use Case → Domain ← Repository(接口)</strong>。
                <br />
                Domain 层完全不知道 HTTP、React、Redux 的存在！这就是依赖反转的力量。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 实战代码示例 ==================== */}
      <section className="pb-16">
        <div className="container">
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest border-2 mb-4"
              style={{
                borderColor: "var(--foreground)",
                borderRadius: "var(--radius-full)",
                background: "var(--accent)",
                color: "white",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              Code Example
            </span>
            <h2
              className="text-3xl md:text-5xl font-extrabold mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
            >
              完整的{" "}
              <span style={{ color: "var(--accent)" }}>用例示例</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Use Case */}
            <div
              className="border-2 overflow-hidden"
              style={{
                borderColor: "var(--foreground)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "8px 8px 0px 0px var(--secondary)",
              }}
            >
              <div
                className="flex items-center gap-2 px-5 py-3 border-b-2"
                style={{ borderColor: "var(--foreground)", background: "var(--secondary)" }}
              >
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: "#FF6B6B" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#FFE66D" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#4ECB71" }} />
                </div>
                <span className="text-xs font-mono ml-2 text-white">add-to-cart.use-case.ts</span>
              </div>
              <pre
                className="p-5 overflow-x-auto text-xs leading-relaxed"
                style={{
                  background: "#1E293B",
                  color: "#E2E8F0",
                  fontFamily: "monospace",
                  maxHeight: "380px",
                }}
              >
                <code>{`// application/use-cases/
export class AddToCartUseCase {
  constructor(
    private cartRepo: CartRepository,
    private productRepo: ProductRepository,
    private eventBus: EventBus
  ) {}

  async execute(
    input: AddToCartInput
  ): Promise<AddToCartOutput> {
    // 1. 获取聚合根
    const cart = await this.cartRepo
      .findById(input.cartId);

    // 2. 获取商品信息
    const product = await this.productRepo
      .findById(input.productId);

    // 3. 调用领域逻辑
    cart.addItem(product, input.quantity);

    // 4. 持久化
    await this.cartRepo.save(cart);

    // 5. 发布领域事件
    await this.eventBus.publish(
      new ItemAddedToCartEvent(cart.id, product)
    );

    return {
      cartId: cart.id,
      totalItems: cart.itemCount,
      totalPrice: cart.total
    };
  }
}`}</code>
              </pre>
            </div>

            {/* React Hook */}
            <div
              className="border-2 overflow-hidden"
              style={{
                borderColor: "var(--foreground)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "8px 8px 0px 0px var(--quaternary)",
              }}
            >
              <div
                className="flex items-center gap-2 px-5 py-3 border-b-2"
                style={{ borderColor: "var(--foreground)", background: "var(--quaternary)" }}
              >
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: "#FF6B6B" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#FFE66D" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#4ECB71" }} />
                </div>
                <span className="text-xs font-mono ml-2 text-white">useAddToCart.ts</span>
              </div>
              <pre
                className="p-5 overflow-x-auto text-xs leading-relaxed"
                style={{
                  background: "#1E293B",
                  color: "#E2E8F0",
                  fontFamily: "monospace",
                  maxHeight: "380px",
                }}
              >
                <code>{`// presentation/hooks/
import { useState } from 'react';
import { AddToCartUseCase } from '@/application';
import { useCartRepository } from '../providers';

export function useAddToCart() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const cartRepo = useCartRepository();

  const addToCart = async (
    productId: string,
    quantity: number
  ) => {
    setLoading(true);
    setError(undefined);

    try {
      const useCase = new AddToCartUseCase(
        cartRepo,
        productRepo,
        eventBus
      );

      const result = await useCase.execute({
        cartId: getCurrentCartId(),
        productId,
        quantity
      });

      // 更新 UI 状态
      showNotification('已添加到购物车');
      return result;

    } catch (err) {
      setError(err as Error);
      showErrorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading, error };
}`}</code>
              </pre>
            </div>

            {/* React Component */}
            <div
              className="border-2 overflow-hidden"
              style={{
                borderColor: "var(--foreground)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "8px 8px 0px 0px var(--tertiary)",
              }}
            >
              <div
                className="flex items-center gap-2 px-5 py-3 border-b-2"
                style={{ borderColor: "var(--foreground)", background: "var(--tertiary)" }}
              >
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: "#FF6B6B" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#FFE66D" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#4ECB71" }} />
                </div>
                <span className="text-xs font-mono ml-2 text-[#1E293B]">ProductCard.tsx</span>
              </div>
              <pre
                className="p-5 overflow-x-auto text-xs leading-relaxed"
                style={{
                  background: "#1E293B",
                  color: "#E2E8F0",
                  fontFamily: "monospace",
                  maxHeight: "380px",
                }}
              >
                <code>{`// presentation/components/
'use client';

import { useAddToCart } from '../hooks';

interface Props {
  product: ProductDTO;
}

export function ProductCard({ product }: Props) {
  const { addToCart, loading } = useAddToCart();

  const handleClick = () => {
    addToCart(product.id, 1);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt="" />
      <h3>{product.name}</h3>
      <p className="price">
        ¥{product.price}
      </p>
      <button
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? '添加中...' : '加入购物车'}
      </button>
    </div>
  );
}

// 组件只关心 UI 和用户交互
// 业务逻辑完全委托给 Use Case`}</code>
              </pre>
            </div>
          </div>

          {/* 流程总结 */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-12">
            {[
              { name: "Component", color: "var(--tertiary)", icon: <Square size={16} /> },
              { name: "Hook", color: "var(--quaternary)", icon: <Zap size={16} /> },
              { name: "Use Case", color: "var(--secondary)", icon: <Workflow size={16} /> },
              { name: "Domain", color: "var(--accent)", icon: <Boxes size={16} /> },
              { name: "Repository", color: "var(--tertiary)", icon: <Database size={16} /> },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="flex items-center gap-2 px-4 py-2 border-2 font-bold text-sm"
                  style={{
                    borderColor: "var(--foreground)",
                    borderRadius: "var(--radius-full)",
                    background: item.color,
                    color: item.name === "Repository" || item.name === "Component" ? "var(--foreground)" : "white",
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  {item.icon}
                  {item.name}
                </div>
                {i < 4 && <ArrowRight size={20} style={{ color: "var(--foreground)", opacity: 0.4 }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 总结 CTA ==================== */}
      <section className="pb-16">
        <div className="container">
          <div
            className="relative p-10 md:p-16 border-2 text-center overflow-hidden"
            style={{
              borderColor: "var(--foreground)",
              borderRadius: "var(--radius-lg)",
              background: "linear-gradient(135deg, var(--accent), var(--secondary))",
              boxShadow: "12px 12px 0px 0px var(--foreground)",
            }}
          >
            {/* 装饰 */}
            <div
              className="absolute -top-10 -right-10 w-40 h-40 opacity-20"
              style={{
                background: "white",
                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              }}
            />
            <div
              className="absolute -bottom-10 -left-10 w-32 h-32 opacity-15"
              style={{
                background: "white",
                borderRadius: "40% 60% 70% 30% / 30% 70% 40% 60%",
              }}
            />

            <div className="relative z-10">
              <Sparkles size={40} className="mx-auto mb-6 text-white" />
              <h2
                className="text-3xl md:text-5xl font-extrabold text-white mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                开始你的 DDD 之旅
              </h2>
              <p
                className="text-lg text-white/90 max-w-2xl mx-auto mb-10"
                style={{ fontFamily: "var(--font-body)" }}
              >
                DDD 不是银弹，但对于复杂业务场景，它是让你的前端代码保持长期可维护性的最佳实践之一。
                从一个小模块开始，逐步应用这些原则。
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { label: "从领域模型开始", icon: <Boxes size={18} /> },
                  { label: "定义清晰边界", icon: <Shield size={18} /> },
                  { label: "持续重构", icon: <RefreshCw size={18} /> },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 text-sm font-bold"
                    style={{
                      borderColor: "white",
                      borderRadius: "var(--radius-full)",
                      background: "rgba(255,255,255,0.2)",
                      color: "white",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer 间距 */}
      <div className="pb-20" />
    </div>
  );
}

// 辅助组件占位
function TestTube({ size, ...props }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2" />
      <path d="M8.5 2h7" />
      <path d="M14.5 16h-5" />
    </svg>
  );
}

function Users({ size, ...props }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}