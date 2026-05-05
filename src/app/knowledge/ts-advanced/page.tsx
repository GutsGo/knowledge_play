// app/topics/typescript-advanced-types/page.tsx
import type { Metadata } from "next";
import {
  Braces,
  ArrowLeft,
  Layers,
  GitBranch,
  Repeat,
  Wand2,
  ShieldCheck,
  Zap,
  BookOpen,
  Code2,
  Puzzle,
  Sparkles,
  ChevronRight,
  Target,
  ArrowRight,
  Lightbulb,
  Binary,
} from "lucide-react";
import Link from "next/link";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";

export const metadata: Metadata = {
  title: "TypeScript 高级类型编程 | 类型体操训练场",
  description: "掌握泛型、条件类型、映射类型等高级特性，玩转类型体操，构建健壮的类型系统",
};

/* ───────────────────────────────────────────────
   小型可复用组件
   ─────────────────────────────────────────────── */

function GeometricBadge({
  color,
  icon: Icon,
  size = "md",
}: {
  color: "accent" | "secondary" | "tertiary" | "quaternary";
  icon: React.ElementType;
  size?: "sm" | "md" | "lg";
}) {
  const sizeMap = { sm: "w-10 h-10", md: "w-14 h-14", lg: "w-20 h-20" };
  const iconSizeMap = { sm: 18, md: 22, lg: 32 };
  const bgMap = {
    accent: "bg-[var(--accent)]",
    secondary: "bg-[var(--secondary)]",
    tertiary: "bg-[var(--tertiary)]",
    quaternary: "bg-[var(--quaternary)]",
  };
  const shadowMap = {
    accent: "var(--accent)",
    secondary: "var(--secondary)",
    tertiary: "var(--tertiary)",
    quaternary: "var(--quaternary)",
  };

  return (
    <div
      className={`${sizeMap[size]} ${bgMap[color]} flex items-center justify-center rounded-[var(--radius-md)] border-2 border-[var(--foreground)]`}
      style={{ boxShadow: `4px 4px 0px 0px ${shadowMap[color]}` }}
    >
      <Icon size={iconSizeMap[size]} strokeWidth={2.5} className="text-white" />
    </div>
  );
}

function CodeBlock({ code, title }: { code: string; title?: string }) {
  const html = Prism.highlight(code.trim(), Prism.languages.typescript, "typescript");
  return (
    <div
      className="rounded-[var(--radius-md)] border-2 border-[var(--foreground)] overflow-hidden"
      style={{ boxShadow: "8px 8px 0px 0px var(--foreground)", backgroundColor: "#1E1E2E" }}
    >
      {title && (
        <div className="flex items-center gap-2 px-4 py-2.5 border-b-2 border-[var(--foreground)] bg-[var(--accent)]">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[var(--secondary)] border border-[var(--foreground)]" />
            <span className="w-3 h-3 rounded-full bg-[var(--tertiary)] border border-[var(--foreground)]" />
            <span className="w-3 h-3 rounded-full bg-[var(--quaternary)] border border-[var(--foreground)]" />
          </div>
          <span className="text-white font-bold text-sm font-['Outfit'] tracking-wide uppercase">
            {title}
          </span>
        </div>
      )}
      <pre className="p-5 overflow-x-auto text-[13px] leading-relaxed language-typescript" style={{ backgroundColor: "transparent" }}>
        <code 
          className="font-mono language-typescript" 
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  );
}


function SectionHeading({
  label,
  title,
  color = "accent",
}: {
  label: string;
  title: string;
  color?: "accent" | "secondary" | "tertiary" | "quaternary";
}) {
  const colorMap = {
    accent: "text-[var(--accent)]",
    secondary: "text-[var(--secondary)]",
    tertiary: "text-[var(--tertiary)]",
    quaternary: "text-[var(--quaternary)]",
  };
  const bgMap = {
    accent: "bg-[var(--accent)]",
    secondary: "bg-[var(--secondary)]",
    tertiary: "bg-[var(--tertiary)]",
    quaternary: "bg-[var(--quaternary)]",
  };

  return (
    <div className="mb-10 animate-pop">
      <span
        className={`inline-block ${bgMap[color]} text-white font-bold text-xs uppercase tracking-[0.15em] px-4 py-1.5 rounded-full border-2 border-[var(--foreground)] mb-4 font-['Outfit']`}
        style={{ boxShadow: "3px 3px 0px 0px var(--foreground)" }}
      >
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--foreground)] font-['Outfit'] leading-tight">
        {title}
      </h2>
    </div>
  );
}

/* 类型难点标签 */
function DifficultyChip({ level }: { level: "基础" | "进阶" | "地狱" }) {
  const cfg = {
    基础: {
      bg: "bg-[var(--quaternary)]",
      shadow: "var(--quaternary)",
    },
    进阶: {
      bg: "bg-[var(--tertiary)]",
      shadow: "var(--tertiary)",
    },
    地狱: {
      bg: "bg-[var(--secondary)]",
      shadow: "var(--secondary)",
    },
  };
  const c = cfg[level];
  return (
    <span
      className={`${c.bg} text-[var(--foreground)] font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border-2 border-[var(--foreground)] font-['Outfit']`}
      style={{ boxShadow: `3px 3px 0px 0px ${c.shadow}` }}
    >
      {level}
    </span>
  );
}

/* ───────────────────────────────────────────────
   页面主体
   ─────────────────────────────────────────────── */
export default function TypeScriptAdvancedTypesPage() {
  return (
    <div className="bg-dot-grid min-h-screen pb-24">
      {/* ═══════ Hero ═══════ */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
        {/* 装饰 Blob */}
        <div
          className="absolute -top-32 -right-32 w-80 h-80 bg-[var(--accent)] opacity-[0.12] -z-10"
          style={{
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        <div
          className="absolute bottom-0 -left-20 w-64 h-64 bg-[var(--tertiary)] opacity-[0.10] -z-10"
          style={{
            borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--secondary)] opacity-[0.04] -z-10"
          style={{
            borderRadius: "30% 70% 60% 40% / 50% 40% 60% 50%",
          }}
        />

        <div className="container mx-auto">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
            {/* 左列：标题 + 摘要 */}
            <div>
              {/* 分类标签行 */}
              <div className="flex flex-wrap items-center gap-3 mb-6 animate-slide">
                <span
                  className="bg-[var(--accent)] text-white font-bold text-xs uppercase tracking-[0.12em] px-4 py-1.5 rounded-full border-2 border-[var(--foreground)] font-['Outfit']"
                  style={{ boxShadow: "4px 4px 0px 0px var(--accent)" }}
                >
                  TypeScript
                </span>
                <span
                  className="bg-[var(--secondary)] text-white font-bold text-xs uppercase tracking-[0.12em] px-4 py-1.5 rounded-full border-2 border-[var(--foreground)] font-['Outfit']"
                  style={{ boxShadow: "4px 4px 0px 0px var(--secondary)" }}
                >
                  类型系统
                </span>
                <DifficultyChip level="地狱" />
              </div>

              {/* 主标题 */}
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--foreground)] font-['Outfit'] leading-[1.1] mb-6 animate-pop"
              >
                高级类型编程
                <br />
                <span className="text-[var(--accent)]">类型体操训练场</span>
              </h1>

              {/* 描述 */}
              <p
                className="text-lg md:text-xl text-[var(--foreground)] opacity-80 leading-relaxed max-w-2xl mb-8 font-['Plus_Jakarta_Sans'] animate-slide"
                style={{ animationDelay: "0.1s" }}
              >
                泛型参数的魔法、条件类型的推理、映射类型的变换……
                <br className="hidden md:block" />
                掌握这些核心武器，你就能构建
                <strong className="text-[var(--accent)]">编译时就拒绝 Bug</strong>
                的坚不可摧的类型系统。
              </p>

              {/* 统计条 */}
              <div
                className="flex flex-wrap gap-4 animate-slide"
                style={{ animationDelay: "0.2s" }}
              >
                {[
                  { icon: BookOpen, label: "6 大核心概念", color: "bg-[var(--accent)]" },
                  { icon: Code2, label: "12+ 代码示例", color: "bg-[var(--secondary)]" },
                  { icon: Zap, label: "实战驱动", color: "bg-[var(--tertiary)]" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 bg-white border-2 border-[var(--foreground)] rounded-[var(--radius-md)] px-4 py-2.5"
                    style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
                  >
                    <div
                      className={`${item.color} w-8 h-8 flex items-center justify-center rounded-lg border-2 border-[var(--foreground)]`}
                    >
                      <item.icon size={16} strokeWidth={2.5} className="text-white" />
                    </div>
                    <span className="font-bold text-sm text-[var(--foreground)] font-['Outfit']">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 右列：概念速览卡片 */}
            <div
              className="bg-white border-2 border-[var(--foreground)] rounded-[var(--radius-lg)] p-6 animate-slide hidden lg:block"
              style={{
                boxShadow: "8px 8px 0px 0px var(--accent)",
                animationDelay: "0.15s",
              }}
            >
              <h3 className="font-extrabold text-lg text-[var(--foreground)] font-['Outfit'] mb-5 flex items-center gap-2">
                <Target size={20} strokeWidth={2.5} className="text-[var(--accent)]" />
                核心概念速览
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Braces, label: "泛型 Generics", color: "var(--accent)" },
                  { icon: GitBranch, label: "条件类型 Conditional Types", color: "var(--secondary)" },
                  { icon: Repeat, label: "映射类型 Mapped Types", color: "var(--tertiary)" },
                  { icon: Layers, label: "模板字面量类型", color: "var(--quaternary)" },
                  { icon: Wand2, label: "infer 关键字", color: "var(--accent)" },
                  { icon: Puzzle, label: "递归类型 Recursion", color: "var(--secondary)" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] border-2 border-[var(--border)] bg-[var(--background)] hover:border-[var(--foreground)] transition-colors group cursor-pointer"
                  >
                    <div
                      className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-[var(--foreground)]"
                      style={{ backgroundColor: item.color }}
                    >
                      <item.icon size={16} strokeWidth={2.5} className="text-white" />
                    </div>
                    <span className="font-bold text-sm text-[var(--foreground)] font-['Outfit'] flex-1">
                      {item.label}
                    </span>
                    <ChevronRight
                      size={16}
                      strokeWidth={2.5}
                      className="text-[var(--border)] group-hover:text-[var(--foreground)] transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 为什么需要高级类型 ═══════ */}
      <section className="container mx-auto mb-20">
        <div
          className="bg-white border-2 border-[var(--foreground)] rounded-[var(--radius-lg)] p-8 md:p-10 relative overflow-hidden animate-pop"
          style={{ boxShadow: "8px 8px 0px 0px var(--tertiary)" }}
        >
          {/* 角标装饰 */}
          <div
            className="absolute -top-6 -right-6 w-24 h-24 bg-[var(--tertiary)] rounded-full border-2 border-[var(--foreground)] opacity-30"
          />
          <div
            className="absolute -bottom-4 -left-4 w-16 h-16 bg-[var(--accent)] opacity-20"
            style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
          />

          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-6">
              <GeometricBadge color="tertiary" icon={Lightbulb} size="md" />
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)] font-['Outfit']">
                  为什么需要「类型体操」？
                </h2>
                <p className="text-[var(--foreground)] opacity-70 mt-1 font-['Plus_Jakarta_Sans']">
                  让编译器成为你最严格的代码审查员
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  title: "零运行时开销",
                  desc: "所有类型检查在编译时完成，打包产物中不包含任何类型信息，对性能零影响。",
                  icon: Zap,
                  color: "var(--accent)",
                  borderColor: "var(--accent)",
                },
                {
                  title: "API 契约",
                  desc: "精确的类型定义就是最好的文档，调用者无需翻阅源码就知道如何正确使用。",
                  icon: ShieldCheck,
                  color: "var(--quaternary)",
                  borderColor: "var(--quaternary)",
                },
                {
                  title: "重构安全网",
                  desc: "修改接口或函数签名后，编译器会标出所有受影响的调用点，避免遗漏。",
                  icon: ShieldCheck,
                  color: "var(--secondary)",
                  borderColor: "var(--secondary)",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--background)] topic-card"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-[var(--foreground)] mb-4"
                    style={{ backgroundColor: item.color }}
                  >
                    <item.icon size={22} strokeWidth={2.5} className="text-white" />
                  </div>
                  <h3 className="font-extrabold text-base text-[var(--foreground)] font-['Outfit'] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--foreground)] opacity-70 leading-relaxed font-['Plus_Jakarta_Sans']">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 1. 泛型 Generics ═══════ */}
      <section className="container mx-auto mb-20">
        <SectionHeading
          label="Part 01"
          title="泛型 — 类型系统的「函数」"
          color="accent"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 理论卡片 */}
          <div
            className="bg-white border-2 border-[var(--foreground)] rounded-[var(--radius-lg)] p-7 topic-card animate-slide"
            style={{ boxShadow: "8px 8px 0px 0px var(--foreground)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <GeometricBadge color="accent" icon={Braces} size="sm" />
              <h3 className="font-extrabold text-xl text-[var(--foreground)] font-['Outfit']">
                核心思想
              </h3>
            </div>
            <p className="text-[var(--foreground)] opacity-80 leading-relaxed mb-5 font-['Plus_Jakarta_Sans']">
              泛型允许你编写<strong>不预先绑定具体类型</strong>的代码，调用时再「注入」类型参数。
              可以把它理解为<strong>类型的函数</strong>——接收类型作为输入，输出新的类型。
            </p>

            <div className="space-y-4">
              {[
                {
                  label: "函数泛型",
                  desc: "在函数名后声明 <T>，参数和返回值都可以使用 T",
                },
                {
                  label: "接口泛型",
                  desc: "让接口的属性类型变成可配置的，如 Array<T>",
                },
                {
                  label: "类泛型",
                  desc: "类的构造函数和方法共享同一类型参数",
                },
                {
                  label: "泛型约束",
                  desc: "使用 extends 关键字限制泛型的范围",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start"
                >
                  <span
                    className="mt-1 w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full bg-[var(--accent)] text-white text-xs font-extrabold border-2 border-[var(--foreground)] font-['Outfit']"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-sm text-[var(--foreground)] font-['Outfit']">
                      {item.label}
                    </p>
                    <p className="text-sm text-[var(--foreground)] opacity-70 font-['Plus_Jakarta_Sans']">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 代码卡片 */}
          <div className="space-y-6 animate-slide" style={{ animationDelay: "0.1s" }}>
            <CodeBlock
              title="basic-generics.ts"
              code={`// 函数泛型：类型安全的 identity 函数
function identity<T>(value: T): T {
  return value;
}

// 调用时显式指定，或让 TS 自动推断
const str = identity<string>("hello");  // string
const num = identity(42);               // number 推断

// 泛型约束：T 必须拥有 length 属性
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): T {
  console.log(item.length);
  return item;
}

logLength("abc");       // ✅ string 有 length
logLength([1, 2, 3]);   // ✅ array 有 length
// logLength(123);      // ❌ number 没有 length`}
            />

            <CodeBlock
              title="generic-class.ts"
              code={`// 泛型类：类型安全的栈
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
// numberStack.push("3"); // ❌ 类型错误`}
            />
          </div>
        </div>
      </section>

      {/* ═══════ 2. 条件类型 ═══════ */}
      <section className="container mx-auto mb-20">
        <SectionHeading
          label="Part 02"
          title="条件类型 — 类型的 if-else"
          color="secondary"
        />

        <div
          className="bg-white border-2 border-[var(--foreground)] rounded-[var(--radius-lg)] p-7 md:p-9 mb-8 topic-card animate-pop"
          style={{ boxShadow: "8px 8px 0px 0px var(--secondary)" }}
        >
          <div className="flex items-start gap-4 mb-6">
            <GeometricBadge color="secondary" icon={GitBranch} size="sm" />
            <div>
              <h3 className="font-extrabold text-xl text-[var(--foreground)] font-['Outfit'] mb-2">
                语法结构
              </h3>
              <p className="text-[var(--foreground)] opacity-80 font-['Plus_Jakarta_Sans'] leading-relaxed">
                条件类型的语法形如
                <code className="mx-1 px-2 py-0.5 bg-[var(--secondary)] bg-opacity-20 rounded text-sm font-mono font-bold text-[var(--foreground)]">
                  T extends U ? X : Y
                </code>
                ，它让类型系统拥有了<strong>分支判断</strong>的能力。
                当 T 可赋值给 U 时结果为 X，否则为 Y。
              </p>
            </div>
          </div>

          {/* 流程图风格 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-6">
            <div
              className="bg-[var(--accent)] text-white font-bold text-sm px-5 py-3 rounded-[var(--radius-md)] border-2 border-[var(--foreground)] font-['Outfit']"
              style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
            >
              T extends U ?
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-[var(--quaternary)] font-['Outfit'] uppercase tracking-wider">
                ✅ true
              </span>
              <ArrowRight size={20} strokeWidth={2.5} className="text-[var(--foreground)] hidden md:block" />
            </div>
            <div
              className="bg-[var(--quaternary)] text-white font-bold text-sm px-5 py-3 rounded-[var(--radius-md)] border-2 border-[var(--foreground)] font-['Outfit']"
              style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
            >
              → X
            </div>
            <span className="text-[var(--foreground)] opacity-40 font-bold">|</span>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-[var(--secondary)] font-['Outfit'] uppercase tracking-wider">
                ❌ false
              </span>
              <ArrowRight size={20} strokeWidth={2.5} className="text-[var(--foreground)] hidden md:block" />
            </div>
            <div
              className="bg-[var(--secondary)] text-white font-bold text-sm px-5 py-3 rounded-[var(--radius-md)] border-2 border-[var(--foreground)] font-['Outfit']"
              style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
            >
              → Y
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <CodeBlock
            title="conditional-basic.ts"
            code={`// 基础条件类型
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">;  // true
type B = IsString<42>;       // false

// 分发条件类型（Distributive）
// 当 T 是联合类型时，条件类型会逐一应用
type ToArray<T> = T extends any ? T[] : never;

type C = ToArray<string | number>;
// = string[] | number[]   ← 分发结果
// 而非 (string | number)[]

// 用 never 过滤类型
type NonNullable2<T> = T extends null | undefined ? never : T;

type D = NonNullable2<string | null | undefined>;
// = string`}
          />

          <CodeBlock
            title="conditional-advanced.ts"
            code={`// infer 关键字：在条件类型中「捕获」子类型
// 提取函数返回值类型
type ReturnType2<T> = T extends (...args: any[]) => infer R
  ? R
  : never;

type R1 = ReturnType2<() => string>;       // string
type R2 = ReturnType2<(x: number) => void>; // void

// 提取 Promise 内部类型
type UnwrapPromise<T> = T extends Promise<infer U>
  ? UnwrapPromise<U>   // 递归解包
  : T;

type U1 = UnwrapPromise<Promise<Promise<number>>>;
// = number

// 提取数组元素类型
type ElementType<T> = T extends (infer E)[] ? E : never;

type E1 = ElementType<string[]>;  // string
type E2 = ElementType<[1, "a"]>;  // 1 | "a"`}
          />
        </div>
      </section>

      {/* ═══════ 3. 映射类型 ═══════ */}
      <section className="container mx-auto mb-20">
        <SectionHeading
          label="Part 03"
          title="映射类型 — 批量变换类型属性"
          color="tertiary"
        />

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8">
          {/* 理论 */}
          <div
            className="bg-white border-2 border-[var(--foreground)] rounded-[var(--radius-lg)] p-7 topic-card animate-slide"
            style={{ boxShadow: "8px 8px 0px 0px var(--tertiary)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <GeometricBadge color="tertiary" icon={Repeat} size="sm" />
              <h3 className="font-extrabold text-xl text-[var(--foreground)] font-['Outfit']">
                核心机制
              </h3>
            </div>
            <p className="text-[var(--foreground)] opacity-80 leading-relaxed mb-5 font-['Plus_Jakarta_Sans']">
              映射类型基于<strong>索引签名</strong>语法，遍历一个已有类型的所有键，
              并对每个键的值类型进行变换，从而<strong>批量生成新类型</strong>。
            </p>

            {/* 内置映射类型速查 */}
            <h4 className="font-bold text-sm text-[var(--foreground)] font-['Outfit'] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles size={14} strokeWidth={2.5} className="text-[var(--tertiary)]" />
              内置工具类型速查
            </h4>
            <div className="space-y-2">
              {[
                { type: "Partial<T>", desc: "所有属性变为可选 ?" },
                { type: "Required<T>", desc: "所有属性变为必填" },
                { type: "Readonly<T>", desc: "所有属性变为只读 readonly" },
                { type: "Pick<T, K>", desc: "从 T 中挑选部分键 K" },
                { type: "Omit<T, K>", desc: "从 T 中移除部分键 K" },
                { type: "Record<K, V>", desc: "构造键为 K、值为 V 的类型" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-lg border-2 border-[var(--border)] bg-[var(--background)]"
                >
                  <code className="text-xs font-mono font-bold text-[var(--accent)] bg-[var(--accent)] bg-opacity-10 px-2 py-1 rounded whitespace-nowrap">
                    {item.type}
                  </code>
                  <span className="text-xs text-[var(--foreground)] opacity-70 font-['Plus_Jakarta_Sans']">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 代码 */}
          <div className="space-y-6 animate-slide" style={{ animationDelay: "0.1s" }}>
            <CodeBlock
              title="mapped-basic.ts"
              code={`// 手动实现 Partial<T>
type Partial2<T> = {
  [K in keyof T]?: T[K];
};

// 手动实现 Readonly<T>
type Readonly2<T> = {
  readonly [K in keyof T]: T[K];
};

// 用 +/- 修饰符控制可选性和只读性
type Required2<T> = {
  [K in keyof T]-?: T[K];  // 移除 ?
};

type Mutable<T> = {
  -readonly [K in keyof T]: T[K]; // 移除 readonly
};

interface User {
  name: string;
  age?: number;
  readonly id: number;
}

type ReqUser = Required2<User>;
// { name: string; age: number; readonly id: number }

type MutableUser = Mutable<User>;
// { name: string; age?: number; id: number }`}
            />

            <CodeBlock
              title="mapped-advanced.ts"
              code={`// 键重映射 (as 子句) — TS 4.1+
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// {
//   getName: () => string;
//   getAge: () => number;
// }

// 过滤键：as 子句返回 never 即可排除
type RemoveByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

type OnlyStrings = RemoveByType<Person, number>;
// { name: string }  ← age 被排除`}
            />
          </div>
        </div>
      </section>

      {/* ═══════ 4. 模板字面量类型 ═══════ */}
      <section className="container mx-auto mb-20">
        <SectionHeading
          label="Part 04"
          title="模板字面量类型 — 字符串级的类型运算"
          color="quaternary"
        />

        <div
          className="bg-white border-2 border-[var(--foreground)] rounded-[var(--radius-lg)] p-7 md:p-9 mb-8 topic-card animate-pop"
          style={{ boxShadow: "8px 8px 0px 0px var(--quaternary)" }}
        >
          <div className="flex items-start gap-4 mb-4">
            <GeometricBadge color="quaternary" icon={Binary} size="sm" />
            <div>
              <h3 className="font-extrabold text-xl text-[var(--foreground)] font-['Outfit'] mb-2">
                类型也能拼字符串？
              </h3>
              <p className="text-[var(--foreground)] opacity-80 font-['Plus_Jakarta_Sans'] leading-relaxed">
                TypeScript 4.1 引入模板字面量类型，允许你像写
                <code className="mx-1 px-2 py-0.5 bg-[var(--quaternary)] bg-opacity-15 rounded text-sm font-mono font-bold">
                  template literal
                </code>
                一样在类型层面拼接字符串。结合<strong>映射类型</strong>和<strong>条件类型</strong>，威力巨大。
              </p>
            </div>
          </div>
        </div>

        <CodeBlock
          title="template-literal.ts"
          code={`// 基础拼接
type Greeting = \`Hello, \${string}!\`;
const g1: Greeting = "Hello, World!"; // ✅
// const g2: Greeting = "Hi, World!"; // ❌

// 结合联合类型 → 笛卡尔积
type Color = "red" | "green" | "blue";
type Size = "sm" | "md" | "lg";

type ColorSize = \`\${Color}-\${Size}\`;
// "red-sm" | "red-md" | "red-lg" |
// "green-sm" | ... | "blue-lg"
// 共 3×3 = 9 种组合

// 内置字符串工具类型
type Upper = Uppercase<"hello">;       // "HELLO"
type Lower = Lowercase<"HELLO">;       // "hello"
type Cap   = Capitalize<"hello">;      // "Hello"
type Uncap = Uncapitalize<"Hello">;    // "hello"

// 实战：自动推导事件处理器名称
type PropEventSource<T> = {
  [K in keyof T as \`on\${Capitalize<string & K>}Change\`]: (
    value: T[K]
  ) => void;
};

interface FormData {
  username: string;
  age: number;
}

type FormEvents = PropEventSource<FormData>;
// {
//   onUsernameChange: (value: string) => void;
//   onAgeChange: (value: number) => void;
// }`}
        />
      </section>

      {/* ═══════ 5. infer 深度剖析 ═══════ */}
      <section className="container mx-auto mb-20">
        <SectionHeading
          label="Part 05"
          title="infer 关键字 — 类型的模式匹配"
          color="accent"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          <div
            className="bg-white border-2 border-[var(--foreground)] rounded-[var(--radius-lg)] p-7 topic-card animate-slide"
            style={{ boxShadow: "8px 8px 0px 0px var(--accent)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <GeometricBadge color="accent" icon={Wand2} size="sm" />
              <h3 className="font-extrabold text-xl text-[var(--foreground)] font-['Outfit']">
                工作原理
              </h3>
            </div>
            <p className="text-[var(--foreground)] opacity-80 leading-relaxed mb-5 font-['Plus_Jakarta_Sans']">
              <code className="px-1.5 py-0.5 bg-[var(--accent)] bg-opacity-10 rounded text-sm font-mono font-bold">
                infer
              </code>{" "}
              允许你在条件类型的 <code className="font-mono text-sm">extends</code> 子句中声明一个
              <strong>待推断的类型变量</strong>。编译器会尝试将实际类型与模式匹配，并把匹配到的部分
              「绑定」到这个变量上。
            </p>

            <div className="space-y-3">
              {[
                {
                  label: "函数参数推断",
                  pattern: "T extends (...args: infer P) => any",
                  result: "P = 参数元组类型",
                },
                {
                  label: "函数返回值推断",
                  pattern: "T extends (...args: any[]) => infer R",
                  result: "R = 返回值类型",
                },
                {
                  label: "Promise 内部推断",
                  pattern: "T extends Promise<infer U>",
                  result: "U = Promise 包裹的类型",
                },
                {
                  label: "数组元素推断",
                  pattern: "T extends (infer E)[]",
                  result: "E = 数组元素类型",
                },
                {
                  label: "构造函数推断",
                  pattern: "T extends new (...args: any[]) => infer I",
                  result: "I = 实例类型",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)]"
                >
                  <p className="font-bold text-sm text-[var(--foreground)] font-['Outfit'] mb-1">
                    {item.label}
                  </p>
                  <code className="block text-xs font-mono text-[var(--accent)] mb-1">
                    {item.pattern}
                  </code>
                  <p className="text-xs text-[var(--foreground)] opacity-60 font-['Plus_Jakarta_Sans']">
                    → {item.result}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 animate-slide" style={{ animationDelay: "0.1s" }}>
            <CodeBlock
              title="infer-examples.ts"
              code={`// 提取元组第一个元素
type Head<T extends any[]> = T extends [infer H, ...any[]]
  ? H
  : never;

type H1 = Head<[string, number, boolean]>; // string

// 提取元组最后一个元素
type Last<T extends any[]> = T extends [...any[], infer L]
  ? L
  : never;

type L1 = Last<[string, number, boolean]>; // boolean

// 递归：反转元组
type Reverse<T extends any[]> = T extends [infer H, ...infer Rest]
  ? [...Reverse<Rest>, H]
  : [];

type R = Reverse<[1, 2, 3]>; // [3, 2, 1]

// 提取嵌入错误结果的类型
type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

type ExtractData<T> = T extends { success: true; data: infer D }
  ? D
  : never;

type Data = ExtractData<ApiResult<User>>;
// = User`}
            />
          </div>
        </div>
      </section>

      {/* ═══════ 6. 递归类型 ═══════ */}
      <section className="container mx-auto mb-20">
        <SectionHeading
          label="Part 06"
          title="递归类型 — 无限嵌套的类型力量"
          color="secondary"
        />

        <div
          className="bg-white border-2 border-[var(--foreground)] rounded-[var(--radius-lg)] p-7 md:p-9 mb-8 topic-card animate-pop"
          style={{ boxShadow: "8px 8px 0px 0px var(--secondary)" }}
        >
          <div className="flex items-start gap-4">
            <GeometricBadge color="secondary" icon={Puzzle} size="sm" />
            <div>
              <h3 className="font-extrabold text-xl text-[var(--foreground)] font-['Outfit'] mb-2">
                用递归解决复杂类型变换
              </h3>
              <p className="text-[var(--foreground)] opacity-80 font-['Plus_Jakarta_Sans'] leading-relaxed">
                当你需要对<strong>深层嵌套</strong>的结构（如 JSON、嵌套数组、路径字符串）做类型变换时，
                递归类型是唯一的解法。核心思路：在条件类型中<strong>引用自身</strong>，设置好终止条件即可。
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <CodeBlock
            title="deep-readonly.ts"
            code={`// 深度 Readonly
type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

interface Config {
  db: {
    host: string;
    port: number;
    options: {
      ssl: boolean;
      pool: number;
    };
  };
}

type ReadonlyConfig = DeepReadonly<Config>;
// 所有层级的属性都变为 readonly

// 深度 Partial
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;`}
          />

          <CodeBlock
            title="path-type.ts"
            code={`// 用递归生成对象路径联合类型
type Paths<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T & string]:
        | \`\${Prefix}\${K}\`
        | Paths<T[K], \`\${Prefix}\${K}.\`>;
    }[keyof T & string]
  : never;

interface State {
  user: {
    name: string;
    address: {
      city: string;
      zip: string;
    };
  };
  theme: "light" | "dark";
}

type StatePaths = Paths<State>;
// "user" | "user.name" | "user.address"
// | "user.address.city" | "user.address.zip"
// | "theme"

// 类型安全的 deep get
function deepGet<T, P extends Paths<T>>(
  obj: T,
  path: P
): /* ... 返回值类型可进一步推导 */ any {
  return path.split(".").reduce(
    (o, k) => (o as any)?.[k], obj
  );
}`}
          />
        </div>
      </section>

      {/* ═══════ 类型体操练习场 ═══════ */}
      <section className="container mx-auto mb-20">
        <SectionHeading
          label="Playground"
          title="类型体操挑战"
          color="tertiary"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "实现 ReadonlyDeep",
              desc: "递归遍历对象所有层级，让每个属性都变成 readonly。",
              difficulty: "进阶" as const,
              hint: "条件类型 + 递归 + 映射类型",
              accent: "var(--accent)",
              shadow: "var(--accent)",
            },
            {
              title: "实现 Trim<T>",
              desc: "去除字符串字面量类型首尾的空格。",
              difficulty: "进阶" as const,
              hint: "模板字面量 + 条件类型 + infer",
              accent: "var(--secondary)",
              shadow: "var(--secondary)",
            },
            {
              title: "实现 TupleToNestedObject",
              desc: "给定元组 [string, number, boolean] 和类型 V，生成 { string: { number: { boolean: V } } }。",
              difficulty: "地狱" as const,
              hint: "递归元组 + 映射类型",
              accent: "var(--tertiary)",
              shadow: "var(--tertiary)",
            },
            {
              title: "实现 RequiredKeys<T>",
              desc: "提取一个类型中所有必填（非可选）的键名组成的联合类型。",
              difficulty: "地狱" as const,
              hint: "条件类型 + 映射类型 + never 过滤",
              accent: "var(--quaternary)",
              shadow: "var(--quaternary)",
            },
            {
              title: "实现 ParseQueryString",
              desc: "将字符串 'a=1&b=2&c=3' 解析为类型 { a: '1'; b: '2'; c: '3' }。",
              difficulty: "地狱" as const,
              hint: "模板字面量 + infer + 递归",
              accent: "var(--accent)",
              shadow: "var(--accent)",
            },
            {
              title: "实现 DeepOmit<T, K>",
              desc: "在所有嵌套层级中递归地移除键 K。",
              difficulty: "进阶" as const,
              hint: "递归 + Omit + 条件类型",
              accent: "var(--secondary)",
              shadow: "var(--secondary)",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border-2 border-[var(--foreground)] rounded-[var(--radius-lg)] p-6 topic-card animate-slide flex flex-col"
              style={{
                boxShadow: `8px 8px 0px 0px ${item.shadow}`,
                animationDelay: `${i * 0.06}s`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-white font-extrabold text-lg border-2 border-[var(--foreground)] font-['Outfit']"
                  style={{ backgroundColor: item.accent }}
                >
                  {i + 1}
                </span>
                <DifficultyChip level={item.difficulty} />
              </div>
              <h3 className="font-extrabold text-base text-[var(--foreground)] font-['Outfit'] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--foreground)] opacity-70 leading-relaxed font-['Plus_Jakarta_Sans'] mb-4 flex-1">
                {item.desc}
              </p>
              <div className="flex items-center gap-2">
                <Sparkles size={14} strokeWidth={2.5} style={{ color: item.accent }} />
                <span className="text-xs font-bold text-[var(--foreground)] opacity-60 font-['Outfit']">
                  {item.hint}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ 学习路径 ═══════ */}
      <section className="container mx-auto mb-16">
        <SectionHeading
          label="Roadmap"
          title="学习路径建议"
          color="accent"
        />

        <div className="relative pl-8 md:pl-12">
          {/* 垂直时间轴线 */}
          <div
            className="absolute left-3 md:left-5 top-0 bottom-0 border-l-[3px] border-dashed border-[var(--border)]"
          />

          <div className="space-y-8">
            {[
              {
                step: "Step 1",
                title: "掌握泛型基础",
                desc: "函数泛型、接口泛型、泛型约束。理解类型参数的生命周期和推断机制。",
                color: "var(--accent)",
                icon: Braces,
              },
              {
                step: "Step 2",
                title: "理解条件类型 & infer",
                desc: "学会用 extends 做类型分支判断，用 infer 做模式匹配和类型提取。",
                color: "var(--secondary)",
                icon: GitBranch,
              },
              {
                step: "Step 3",
                title: "深入映射类型",
                desc: "理解索引签名、键重映射（as）、修饰符 +/-。能手写 Partial/Readonly/Pick/Omit。",
                color: "var(--tertiary)",
                icon: Repeat,
              },
              {
                step: "Step 4",
                title: "模板字面量 & 递归",
                desc: "掌握字符串级别的类型运算，学习用递归处理嵌套结构。",
                color: "var(--quaternary)",
                icon: Puzzle,
              },
              {
                step: "Step 5",
                title: "实战综合运用",
                desc: "在真实项目中用高级类型封装 API 客户端、表单验证器、状态管理器等。",
                color: "var(--accent)",
                icon: ShieldCheck,
              },
            ].map((item, i) => (
              <div key={i} className="relative flex gap-5 items-start animate-slide" style={{ animationDelay: `${i * 0.08}s` }}>
                {/* 时间轴节点 */}
                <div
                  className="absolute -left-8 md:-left-12 top-1 w-7 h-7 rounded-full border-2 border-[var(--foreground)] flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>

                <div
                  className="flex-1 bg-white border-2 border-[var(--foreground)] rounded-[var(--radius-md)] p-5 topic-card"
                  style={{ boxShadow: `6px 6px 0px 0px ${item.color}` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon size={18} strokeWidth={2.5} style={{ color: item.color }} />
                    <span
                      className="text-xs font-extrabold uppercase tracking-wider font-['Outfit']"
                      style={{ color: item.color }}
                    >
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-lg text-[var(--foreground)] font-['Outfit'] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--foreground)] opacity-70 leading-relaxed font-['Plus_Jakarta_Sans']">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 推荐资源 ═══════ */}
      <section className="container mx-auto mb-20">
        <div
          className="bg-white border-2 border-[var(--foreground)] rounded-[var(--radius-lg)] p-8 md:p-10 relative overflow-hidden"
          style={{ boxShadow: "8px 8px 0px 0px var(--accent)" }}
        >
          <div
            className="absolute -bottom-8 -right-8 w-40 h-40 bg-[var(--accent)] opacity-[0.07]"
            style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
          />
          <div
            className="absolute -top-6 -left-6 w-28 h-28 bg-[var(--tertiary)] opacity-[0.07]"
            style={{ borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%" }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <GeometricBadge color="accent" icon={BookOpen} size="sm" />
              <h2 className="text-2xl font-extrabold text-[var(--foreground)] font-['Outfit']">
                推荐学习资源
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "TypeScript 官方手册",
                  desc: "Advanced Types 章节是第一手权威资料",
                  tag: "官方",
                  tagColor: "bg-[var(--accent)]",
                  shadow: "var(--accent)",
                },
                {
                  title: "type-challenges",
                  desc: "GitHub 上最流行的类型体操题库，由易到难",
                  tag: "练习",
                  tagColor: "bg-[var(--quaternary)]",
                  shadow: "var(--quaternary)",
                },
                {
                  title: "Total TypeScript",
                  desc: "Matt Pocock 的付费课程，实战导向的进阶教程",
                  tag: "课程",
                  tagColor: "bg-[var(--secondary)]",
                  shadow: "var(--secondary)",
                },
                {
                  title: "深入理解 TypeScript",
                  desc: "国内社区整理的免费电子书，覆盖全面",
                  tag: "书籍",
                  tagColor: "bg-[var(--tertiary)]",
                  shadow: "var(--tertiary)",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--background)] topic-card"
                  style={{ boxShadow: `4px 4px 0px 0px ${item.shadow}` }}
                >
                  <span
                    className={`${item.tagColor} text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border-2 border-[var(--foreground)] font-['Outfit'] inline-block mb-3`}
                  >
                    {item.tag}
                  </span>
                  <h4 className="font-extrabold text-sm text-[var(--foreground)] font-['Outfit'] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[var(--foreground)] opacity-60 leading-relaxed font-['Plus_Jakarta_Sans']">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 底部 CTA ═══════ */}
      <section className="container mx-auto">
        <div
          className="bg-[var(--accent)] border-2 border-[var(--foreground)] rounded-[var(--radius-lg)] p-8 md:p-12 text-center relative overflow-hidden"
          style={{ boxShadow: "8px 8px 0px 0px var(--foreground)" }}
        >
          {/* 装饰 */}
          <div
            className="absolute top-6 left-8 w-12 h-12 border-2 border-white border-opacity-30 rounded-full"
          />
          <div
            className="absolute bottom-8 right-12 w-20 h-20 bg-[var(--secondary)] opacity-20"
            style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-8 h-8 bg-[var(--tertiary)] opacity-25 rounded-sm rotate-45"
          />

          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white font-['Outfit'] mb-3">
              准备好开始你的类型体操之旅了吗？
            </h2>
            <p className="text-white text-opacity-80 font-['Plus_Jakarta_Sans'] mb-8 max-w-lg mx-auto">
              从 type-challenges 的 Easy 题开始，循序渐进，每天刷几道，
              不久你就能驾驭任何复杂的类型场景。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/type-challenges/type-challenges"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[var(--foreground)] font-bold text-sm px-7 py-3.5 border-2 border-[var(--foreground)] rounded-full font-['Outfit'] transition-all hover:-translate-y-0.5"
                style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
              >
                <Puzzle size={18} strokeWidth={2.5} />
                前往 type-challenges
              </a>
              <Link
                href="/"
                className="back-btn inline-flex items-center gap-2 bg-white text-[var(--foreground)] font-bold text-sm px-7 py-3.5 border-2 border-[var(--foreground)] rounded-full font-['Outfit'] transition-all"
              >
                <ArrowLeft size={18} strokeWidth={2.5} />
                返回知识图谱
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}