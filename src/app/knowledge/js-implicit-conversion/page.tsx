// app/topics/implicit-conversion/page.tsx

import Link from 'next/link'
import {
  ArrowLeft,
  Shuffle,
  Zap,
  Type,
  Binary,
  ToggleLeft,
  Code2,
  ChevronDown,
  CircleDot,
  Trophy,
  Star,
  AlertTriangle,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react'
import { highlightCode } from '@/lib/prism-highlight'

/* ═══════════════════════════════════════════════════
   Helper Components
   ═══════════════════════════════════════════════════ */

function CodeBlock({
  children,
  language = 'javascript',
  className = '',
}: {
  children: React.ReactNode
  language?: string
  className?: string
}) {
  const codeStr = typeof children === 'string' ? children : String(children)
  const html = highlightCode(codeStr, language)
  return (
    <pre
      className={`font-['Courier_New',monospace] text-[13px] md:text-sm leading-[1.8] bg-[#1E293B] p-4 md:p-5 rounded-[16px] border-2 border-[#1E293B] overflow-x-auto whitespace-pre language-${language} ${className}`}
    >
      <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  )
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-['Courier_New',monospace] text-[13px] bg-[#FBBF24]/15 px-1.5 py-0.5 rounded-md border border-[#1E293B]/10 font-semibold">
      {children}
    </code>
  )
}

function Badge({
  icon: Icon,
  label,
  color,
}: {
  icon: any
  label: string
  color: string
}) {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-[#1E293B] font-['Outfit'] font-bold text-xs uppercase tracking-widest text-[#1E293B]"
      style={{ backgroundColor: color }}
    >
      <Icon size={14} strokeWidth={2.5} />
      {label}
    </div>
  )
}

function SectionHeading({
  icon: Icon,
  label,
  title,
  color,
}: {
  icon: any
  label: string
  title: string
  color: string
}) {
  return (
    <div className="mb-10">
      <Badge icon={Icon} label={label} color={color} />
      <h2 className="font-['Outfit'] text-3xl md:text-5xl font-extrabold text-[#1E293B] mt-4 leading-tight tracking-tight">
        {title}
      </h2>
    </div>
  )
}

function StepCard({
  number,
  title,
  children,
  color,
}: {
  number: number
  title: string
  children: React.ReactNode
  color: string
}) {
  return (
    <div className="relative pl-14 md:pl-16 pb-10 last:pb-0">
      {/* Timeline connector */}
      <div className="absolute left-5 md:left-6 top-10 bottom-0 w-0 border-l-[3px] border-dashed border-[#E2E8F0]" />

      {/* Number badge */}
      <div
        className="absolute left-0 md:left-1 top-0 w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-[#1E293B] flex items-center justify-center font-['Outfit'] font-extrabold text-base md:text-lg text-[#1E293B] z-10"
        style={{ backgroundColor: color }}
      >
        {number}
      </div>

      {/* Card */}
      <div className="topic-card bg-white border-2 border-[#1E293B] rounded-[16px] shadow-[6px_6px_0px_0px_#1E293B] p-5 md:p-6">
        <h3 className="font-['Outfit'] font-extrabold text-lg md:text-xl text-[#1E293B] mb-3">
          {title}
        </h3>
        <div className="font-['Plus_Jakarta_Sans'] text-sm md:text-[15px] text-[#1E293B]/80 leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </div>
  )
}

function ExampleCard({
  title,
  code,
  result,
  explanation,
  color = '#8B5CF6',
  className = '',
}: {
  title: string
  code: React.ReactNode
  result: string
  explanation: string
  color?: string
  className?: string
}) {
  return (
    <div
      className={`topic-card bg-white border-2 border-[#1E293B] rounded-[16px] shadow-[6px_6px_0px_0px_#1E293B] overflow-hidden flex flex-col ${className}`}
    >
      {/* Header stripe */}
      <div
        className="px-4 py-2.5 border-b-2 border-[#1E293B] flex items-center gap-2"
        style={{ backgroundColor: color }}
      >
        <Code2 size={15} strokeWidth={2.5} className="text-[#1E293B]" />
        <span className="font-['Outfit'] font-bold text-[13px] text-[#1E293B] uppercase tracking-wider">
          {title}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="bg-[#F8F7F0] rounded-lg border border-[#E2E8F0] p-3 mb-3 overflow-x-auto">
          <pre className="font-['Courier_New',monospace] text-[13px] leading-[1.7] text-[#1E293B] whitespace-pre">
            {code}
          </pre>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-['Outfit'] text-[11px] font-bold uppercase tracking-widest text-[#1E293B]/40">
            结果
          </span>
          <code
            className="font-['Courier_New',monospace] text-sm font-bold px-2 py-0.5 rounded-md"
            style={{ backgroundColor: `${color}25` }}
          >
            {result}
          </code>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#1E293B]/65 leading-relaxed mt-auto">
          {explanation}
        </p>
      </div>
    </div>
  )
}

function PillarCard({
  icon: Icon,
  title,
  color,
  rules,
  className = '',
}: {
  icon: any
  title: string
  color: string
  rules: { from: string; to: string }[]
  className?: string
}) {
  return (
    <div
      className={`topic-card bg-white border-2 border-[#1E293B] rounded-[20px] shadow-[8px_8px_0px_0px_#1E293B] p-5 md:p-6 flex flex-col ${className}`}
    >
      <div
        className="w-12 h-12 rounded-[14px] border-2 border-[#1E293B] flex items-center justify-center mb-4"
        style={{ backgroundColor: color }}
      >
        <Icon size={24} strokeWidth={2.5} className="text-[#1E293B]" />
      </div>
      <h3 className="font-['Outfit'] font-extrabold text-xl text-[#1E293B] mb-4">
        {title}
      </h3>
      <div className="space-y-2.5 flex-1">
        {rules.map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-[13px] font-['Plus_Jakarta_Sans'] text-[#1E293B]/80"
          >
            <span className="font-['Courier_New',monospace] bg-[#F8F7F0] px-1.5 py-0.5 rounded border border-[#E2E8F0] text-[#1E293B] font-semibold shrink-0">
              {r.from}
            </span>
            <ChevronDown size={14} strokeWidth={2.5} className="text-[#1E293B]/30 shrink-0 rotate-[-90deg]" />
            <span className="font-['Courier_New',monospace] font-bold px-1.5 py-0.5 rounded shrink-0" style={{ backgroundColor: `${color}25` }}>
              {r.to}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FalsyBadge({ value, className = '' }: { value: string; className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center px-4 py-2 rounded-full border-2 border-[#1E293B] bg-white font-['Courier_New',monospace] text-sm font-bold text-[#1E293B] shadow-[3px_3px_0px_0px_#F472B6] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#F472B6] transition-all ${className}`}
    >
      {value}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════════ */
export default function ImplicitConversionPage() {
  return (
    <div className="bg-dot-grid min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-14">
        {/* ── Back Button ── */}
        <Link
          href="/"
          className="back-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-[#1E293B] font-['Outfit'] font-bold text-sm shadow-[4px_4px_0px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#1E293B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#1E293B] transition-all mb-12"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          返回
        </Link>

        {/* ══════════════════════════════════════════
            HERO SECTION
            ══════════════════════════════════════════ */}
        <section className="relative mb-24 md:mb-32">
          {/* Decorative Blobs */}
          <div className="absolute -top-16 -right-12 w-52 h-52 md:w-80 md:h-80 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-[#FBBF24]/25 border-2 border-[#1E293B]/60 -z-10 pointer-events-none" />
          <div className="absolute top-28 -left-20 w-36 h-36 md:w-56 md:h-56 rounded-[40%_60%_70%_30%/40%_70%_30%_60%] bg-[#F472B6]/20 border-2 border-[#1E293B]/60 -z-10 pointer-events-none" />
          <div className="absolute -bottom-6 right-16 w-20 h-20 md:w-32 md:h-32 rounded-[50%_50%_40%_60%/60%_40%_60%_40%] bg-[#8B5CF6]/15 border-2 border-[#1E293B]/60 -z-10 pointer-events-none" />

          {/* Floating geometric shapes */}
          <div className="absolute top-6 right-28 w-6 h-6 bg-[#8B5CF6] border-2 border-[#1E293B] rounded-sm rotate-12 animate-pop pointer-events-none" />
          <div className="absolute top-40 right-6 w-9 h-9 bg-[#F472B6] border-2 border-[#1E293B] rounded-full animate-pop pointer-events-none" style={{ animationDelay: '0.1s' }} />
          <div className="absolute bottom-10 left-4 w-5 h-5 bg-[#34D399] border-2 border-[#1E293B] rounded-sm -rotate-12 animate-pop pointer-events-none" style={{ animationDelay: '0.15s' }} />
          <div className="absolute top-16 left-1/2 w-4 h-4 bg-[#FBBF24] border-2 border-[#1E293B] rounded-full animate-pop pointer-events-none hidden md:block" style={{ animationDelay: '0.2s' }} />

          <div className="animate-pop">
            <Badge icon={Shuffle} label="核心概念 · Core Concept" color="#FBBF24" />
          </div>

          <h1
            className="font-['Outfit'] text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#1E293B] mt-6 mb-6 leading-[1.08] tracking-tight animate-pop"
            style={{ animationDelay: '0.08s' }}
          >
            JavaScript
            <br />
            <span className="text-[#8B5CF6] relative inline-block">
              隐式转换
              <svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8C50 2 150 2 198 8"
                  stroke="#F472B6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            深度解析
          </h1>

          <p
            className="font-['Plus_Jakarta_Sans'] text-base md:text-xl text-[#1E293B]/65 max-w-2xl leading-relaxed animate-slide"
            style={{ animationDelay: '0.18s' }}
          >
            <InlineCode>==</InlineCode> 到底做了什么？<InlineCode>+</InlineCode> 为什么有时拼接字符串？
            <br className="hidden md:block" />
            本文将彻底揭开 JavaScript 类型强制转换（Type Coercion）的神秘面纱。
          </p>

          {/* Preview Code Card */}
          <div
            className="mt-10 topic-card inline-block bg-white border-2 border-[#1E293B] rounded-[16px] shadow-[8px_8px_0px_0px_#8B5CF6] p-5 md:p-6 animate-slide"
            style={{ animationDelay: '0.28s' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#F472B6] border border-[#1E293B]" />
              <div className="w-3 h-3 rounded-full bg-[#FBBF24] border border-[#1E293B]" />
              <div className="w-3 h-3 rounded-full bg-[#34D399] border border-[#1E293B]" />
              <span className="ml-3 text-[11px] font-['Outfit'] font-bold text-[#1E293B]/40 uppercase tracking-wider">
                tricky.js
              </span>
            </div>
            <pre className="font-['Courier_New',monospace] text-[13px] md:text-sm leading-[2] text-[#1E293B]">
              <span className="text-[#8B5CF6] font-bold">{'[]'}</span> =={' '}
              <span className="text-[#F472B6] font-bold">{'![]'}</span>
              {'   '}
              <span className="text-[#34D399] font-bold">{'//'} true 🤯</span>
              {'\n'}
              <span className="text-[#8B5CF6] font-bold">{'[]'}</span> +{' '}
              <span className="text-[#8B5CF6] font-bold">{'[]'}</span>
              {'    '}
              <span className="text-[#34D399] font-bold">
                {'//'} &quot;&quot; (空字符串)
              </span>
              {'\n'}
              <span className="text-[#8B5CF6] font-bold">true</span> +{' '}
              <span className="text-[#8B5CF6] font-bold">true</span>
              {'  '}
              <span className="text-[#34D399] font-bold">{'//'} 2</span>
            </pre>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 1: FOUR CONVERSION PILLARS
            ══════════════════════════════════════════ */}
        <section className="mb-24 md:mb-32">
          <SectionHeading
            icon={Layers}
            label="基础规则"
            title="四种类型转换"
            color="#E0E7FF"
          />

          <p className="font-['Plus_Jakarta_Sans'] text-base md:text-lg text-[#1E293B]/65 max-w-3xl leading-relaxed mb-10 -mt-4">
            在进行 <InlineCode>==</InlineCode> 或 <InlineCode>+</InlineCode> 运算之前，JavaScript
            引擎会先对操作数执行类型转换。理解这四种基础转换是掌握隐式转换的关键。
          </p>

          {/* Pillar Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PillarCard
              icon={Zap}
              title="ToPrimitive"
              color="#C4B5FD"
              rules={[
                { from: 'hint: "number"', to: 'valueOf() → toString()' },
                { from: 'hint: "string"', to: 'toString() → valueOf()' },
                { from: '大多数对象', to: 'valueOf() 返回自身' },
                { from: 'Date 对象', to: 'toString() 优先' },
              ]}
            />
            <PillarCard
              icon={Binary}
              title="ToNumber"
              color="#FBCFE8"
              rules={[
                { from: 'undefined', to: 'NaN' },
                { from: 'null', to: '0' },
                { from: 'true / false', to: '1 / 0' },
                { from: '""', to: '0' },
                { from: '"123"', to: '123' },
                { from: '"abc"', to: 'NaN' },
              ]}
            />
            <PillarCard
              icon={Type}
              title="ToString"
              color="#FDE68A"
              rules={[
                { from: 'undefined', to: '"undefined"' },
                { from: 'null', to: '"null"' },
                { from: 'true / false', to: '"true"/"false"' },
                { from: '123', to: '"123"' },
                { from: 'NaN', to: '"NaN"' },
                { from: '[1,2]', to: '"1,2"' },
              ]}
            />
            <PillarCard
              icon={ToggleLeft}
              title="ToBoolean"
              color="#A7F3D0"
              className="lg:col-span-1"
              rules={[
                { from: 'false', to: 'false' },
                { from: '0, -0, 0n', to: 'false' },
                { from: '""', to: 'false' },
                { from: 'null', to: 'false' },
                { from: 'undefined', to: 'false' },
                { from: 'NaN', to: 'false' },
              ]}
            />
          </div>

          {/* Falsy Values Highlight */}
          <div className="mt-10 topic-card bg-white border-2 border-[#1E293B] rounded-[20px] shadow-[8px_8px_0px_0px_#F472B6] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-[12px] border-2 border-[#1E293B] bg-[#F472B6] flex items-center justify-center">
                <AlertTriangle size={20} strokeWidth={2.5} className="text-[#1E293B]" />
              </div>
              <div>
                <h3 className="font-['Outfit'] font-extrabold text-lg text-[#1E293B]">
                  假值军团 — Falsy Values
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#1E293B]/50">
                  只有以下 <strong>8 个</strong> 值转换为 <InlineCode>false</InlineCode>，其他一切都是{' '}
                  <InlineCode>true</InlineCode>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {['false', '0', '-0', '0n', '""', 'null', 'undefined', 'NaN'].map(
                (v, i) => (
                  <FalsyBadge key={v} value={v} className="animate-pop" />
                ),
              )}
            </div>
            <div className="mt-5 p-3 bg-[#34D399]/10 rounded-xl border-2 border-dashed border-[#34D399]/40">
              <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#1E293B]/70">
                <Sparkles size={14} strokeWidth={2.5} className="inline mr-1.5 text-[#34D399]" />
                <strong>常见陷阱：</strong>
                <InlineCode>{'"0"'}</InlineCode>、<InlineCode>{'[]'}</InlineCode>、
                <InlineCode>{'{}'}</InlineCode>、<InlineCode>function(){'{}'}</InlineCode> 都是{' '}
                <strong className="text-[#34D399]">truthy</strong>！
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 2: == ALGORITHM
            ══════════════════════════════════════════ */}
        <section className="mb-24 md:mb-32">
          <SectionHeading
            icon={Layers}
            label="Abstract Equality"
            title={'== 比较算法'}
            color="#FBCFE8"
          />

          <p className="font-['Plus_Jakarta_Sans'] text-base md:text-lg text-[#1E293B]/65 max-w-3xl leading-relaxed mb-12 -mt-4">
            <InlineCode>==</InlineCode>（宽松相等）的执行逻辑由 ECMAScript 规范定义。下面是简化后的核心步骤，按优先级排序：
          </p>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical timeline line (starts after first step) */}
            <div className="absolute left-5 md:left-6 top-14 bottom-4 w-0 border-l-[3px] border-dashed border-[#E2E8F0] pointer-events-none" />

            <StepCard number={1} title="类型相同？→ 直接用 ===" color="#C4B5FD">
              <p>
                如果两个操作数的类型相同，<InlineCode>==</InlineCode> 的行为与{' '}
                <InlineCode>===</InlineCode> 完全一致，不会进行任何转换。
              </p>
              <CodeBlock>
{`1 === 1          // true
"hi" === "hi"    // true
NaN === NaN      // false  ← NaN 不等于自身！`}
              </CodeBlock>
            </StepCard>

            <StepCard number={2} title="null 和 undefined 互相相等" color="#FDE68A">
              <p>
                这是规范中的特例：<InlineCode>null</InlineCode> 和{' '}
                <InlineCode>undefined</InlineCode> 用 <InlineCode>==</InlineCode>{' '}
                比较时返回 <InlineCode>true</InlineCode>，且不与其他任何值相等。
              </p>
              <CodeBlock>
{`null == undefined   // true
null == 0           // false
undefined == ""     // false
null == null        // true`}
              </CodeBlock>
            </StepCard>

            <StepCard number={3} title="数字 vs 字符串 → 转字符串为数字" color="#FBCFE8">
              <p>
                如果一边是数字，另一边是字符串，会将字符串通过 <InlineCode>ToNumber()</InlineCode>{' '}
                转换后再比较。
              </p>
              <CodeBlock>
{`0 == ""        // ToNumber("") → 0,   0 == 0 → true
0 == "0"       // ToNumber("0") → 0,  0 == 0 → true
1 == "1"       // ToNumber("1") → 1,  1 == 1 → true
NaN == "NaN"   // ToNumber("NaN") → NaN, NaN == NaN → false`}
              </CodeBlock>
            </StepCard>

            <StepCard number={4} title="布尔值参与？→ 先转成数字" color="#BBF7D0">
              <p>
                如果有一边是布尔值，会先将其转为数字（<InlineCode>true → 1</InlineCode>、
                <InlineCode>false → 0</InlineCode>），然后再按后续规则继续比较。
              </p>
              <CodeBlock>
{`true == 1      // true → 1,  1 == 1 → true
false == 0     // false → 0, 0 == 0 → true
true == "1"    // true → 1,  "1" → 1,  1 == 1 → true
false == ""    // false → 0, "" → 0,   0 == 0 → true
false == "0"   // false → 0, "0" → 0,  0 == 0 → true`}
              </CodeBlock>
              <div className="mt-3 p-3 bg-[#FBBF24]/10 rounded-xl border-2 border-dashed border-[#FBBF24]/40">
                <p className="text-sm">
                  <AlertTriangle size={14} strokeWidth={2.5} className="inline mr-1 text-[#FBBF24]" />
                  <strong>关键记忆：</strong>布尔值在这一步永远先变成 0 或 1，然后走数字比较路线。
                  所以 <InlineCode>{'true == "1"'}</InlineCode> 为 <InlineCode>true</InlineCode>，但{' '}
                  <InlineCode>{'true === "1"'}</InlineCode> 为 <InlineCode>false</InlineCode>。
                </p>
              </div>
            </StepCard>

            <StepCard number={5} title="对象 vs 原始值 → 对象执行 ToPrimitive" color="#DDD6FE">
              <p>
                如果一边是对象，另一边是原始值，会对对象执行{' '}
                <InlineCode>ToPrimitive()</InlineCode>（默认 hint 为{' '}
                <InlineCode>&quot;number&quot;</InlineCode>），然后继续比较。
              </p>
              <p>
                对于普通对象，<InlineCode>valueOf()</InlineCode> 返回对象自身（不是原始值），所以会继续调用{' '}
                <InlineCode>toString()</InlineCode>。
              </p>
              <CodeBlock>
{`// 数组的 toString 特殊行为
[].toString()        // ""        (空数组 → 空字符串)
[1, 2].toString()    // "1,2"     (逗号连接)
[null].toString()    // ""        (null → "")

// 普通对象
{}.toString()        // "[object Object]"`}
              </CodeBlock>
            </StepCard>

            <StepCard number={6} title="都不匹配？→ 返回 false" color="#FECACA">
              <p>
                如果经过以上所有规则都无法匹配（例如 Symbol 类型参与比较），则直接返回{' '}
                <InlineCode>false</InlineCode>。
              </p>
              <CodeBlock>
{`Symbol("a") == Symbol("a")   // false (不同 Symbol)
0 == Symbol("0")              // TypeError! (不能转为数字)`}
              </CodeBlock>
            </StepCard>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 3: WALKTHROUGH — [] == ![]
            ══════════════════════════════════════════ */}
        <section className="mb-24 md:mb-32">
          <SectionHeading
            icon={Star}
            label="完整推演"
            title={'为什么 [] == ![] 为 true？'}
            color="#FDE68A"
          />

          <div className="topic-card bg-white border-2 border-[#1E293B] rounded-[20px] shadow-[8px_8px_0px_0px_#FBBF24] p-6 md:p-8 overflow-hidden">
            {/* Step-by-step walkthrough */}
            <div className="space-y-0">
              {[
                {
                  step: '原始表达式',
                  code: '[] == ![]',
                  note: '先计算右侧 ![]',
                },
                {
                  step: '① 求值右侧',
                  code: '![]',
                  result: 'false',
                  note: '[] 是对象，truthy → 取反 → false',
                },
                {
                  step: '② 现在表达式',
                  code: '[] == false',
                  note: '规则④：布尔值参与 → 转为数字',
                },
                {
                  step: '③ 布尔转数字',
                  code: '[] == ToNumber(false)',
                  result: '[] == 0',
                  note: 'false → 0',
                },
                {
                  step: '④ 对象转原始值',
                  code: 'ToPrimitive([]) == 0',
                  note: '[].valueOf() → [] (非原始) → [].toString()',
                },
                {
                  step: '⑤ 数组 toString',
                  code: '"" == 0',
                  note: '[].toString() → ""（空字符串）',
                },
                {
                  step: '⑥ 字符串转数字',
                  code: 'ToNumber("") == 0',
                  result: '0 == 0',
                  note: '"" → 0',
                },
                {
                  step: '⑦ 最终结果',
                  code: '0 == 0',
                  result: '✅ true',
                  note: '类型相同，直接比较',
                },
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-start gap-3 md:gap-5 py-4 border-b-2 border-dashed border-[#E2E8F0] last:border-b-0 last:pb-0 first:pt-0">
                  {/* Step label */}
                  <div className="shrink-0 md:w-40">
                    <span className="font-['Outfit'] font-extrabold text-sm text-[#1E293B]">
                      {item.step}
                    </span>
                  </div>
                  {/* Code */}
                  <div className="flex-1 min-w-0">
                    <code className="font-['Courier_New',monospace] text-[13px] md:text-sm bg-[#F8F7F0] px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[#1E293B] font-bold inline-block">
                      {item.code}
                    </code>
                    {item.result && (
                      <span className="ml-3 font-['Courier_New',monospace] text-sm font-bold px-2 py-0.5 rounded-md bg-[#34D399]/20 text-[#065F46]">
                        → {item.result}
                      </span>
                    )}
                  </div>
                  {/* Note */}
                  <div className="shrink-0 md:w-64">
                    <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#1E293B]/55 leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 4: + OPERATOR
            ══════════════════════════════════════════ */}
        <section className="mb-24 md:mb-32">
          <SectionHeading
            icon={Layers}
            label="Addition Operator"
            title={'+ 运算符的双面性'}
            color="#BBF7D0"
          />

          <p className="font-['Plus_Jakarta_Sans'] text-base md:text-lg text-[#1E293B]/65 max-w-3xl leading-relaxed mb-10 -mt-4">
            <InlineCode>+</InlineCode> 是 JavaScript 中最特殊的运算符 —— 它既能做数学加法，也能做字符串拼接。
            核心规则只有一条：<strong>任一操作数是字符串就拼接，否则做加法</strong>。
          </p>

          {/* Decision Flow */}
          <div className="topic-card bg-white border-2 border-[#1E293B] rounded-[20px] shadow-[8px_8px_0px_0px_#34D399] p-6 md:p-8 mb-10">
            <h3 className="font-['Outfit'] font-extrabold text-xl text-[#1E293B] mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] border-2 border-[#1E293B] bg-[#34D399] flex items-center justify-center">
                <Layers size={20} strokeWidth={2.5} className="text-[#1E293B]" />
              </div>
              执行流程
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Step 1 */}
              <div className="bg-[#F8F7F0] rounded-[14px] border-2 border-[#E2E8F0] p-4">
                <div className="w-8 h-8 rounded-full bg-[#C4B5FD] border-2 border-[#1E293B] flex items-center justify-center font-['Outfit'] font-extrabold text-sm mb-3">
                  1
                </div>
                <p className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#1E293B] mb-1">
                  ToPrimitive 两个操作数
                </p>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#1E293B]/55">
                  对象先转原始值（valueOf → toString）
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <ChevronDown size={28} strokeWidth={2.5} className="text-[#E2E8F0] rotate-[-90deg]" />
              </div>
              {/* Step 2 */}
              <div className="bg-[#F8F7F0] rounded-[14px] border-2 border-[#E2E8F0] p-4">
                <div className="w-8 h-8 rounded-full bg-[#FDE68A] border-2 border-[#1E293B] flex items-center justify-center font-['Outfit'] font-extrabold text-sm mb-3">
                  2
                </div>
                <p className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#1E293B] mb-1">
                  有字符串吗？
                </p>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#1E293B]/55">
                  任一侧是字符串 → 字符串拼接
                  <br />
                  否则 → ToNumber 后数学相加
                </p>
              </div>
            </div>

            {/* Two Paths */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
              {/* String Path */}
              <div className="bg-[#FBBF24]/10 rounded-[16px] border-2 border-[#FBBF24]/30 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-[10px] bg-[#FBBF24] border-2 border-[#1E293B] flex items-center justify-center">
                    <Type size={16} strokeWidth={2.5} className="text-[#1E293B]" />
                  </div>
                  <span className="font-['Outfit'] font-extrabold text-base text-[#1E293B]">
                    字符串拼接路径
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { code: '1 + "2"', result: '"12"' },
                    { code: '"hi" + true', result: '"hitrue"' },
                    { code: '"a" + null', result: '"anull"' },
                    { code: '"" + []', result: '""' },
                  ].map((ex) => (
                    <div key={ex.code} className="flex items-center justify-between gap-3">
                      <code className="font-['Courier_New',monospace] text-[13px] text-[#1E293B] font-semibold">
                        {ex.code}
                      </code>
                      <span className="font-['Courier_New',monospace] text-[13px] font-bold text-[#92400E] bg-[#FBBF24]/25 px-2 py-0.5 rounded shrink-0">
                        → {ex.result}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Number Path */}
              <div className="bg-[#8B5CF6]/10 rounded-[16px] border-2 border-[#8B5CF6]/30 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-[10px] bg-[#8B5CF6] border-2 border-[#1E293B] flex items-center justify-center">
                    <Binary size={16} strokeWidth={2.5} className="text-[#1E293B]" />
                  </div>
                  <span className="font-['Outfit'] font-extrabold text-base text-[#1E293B]">
                    数学加法路径
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { code: '1 + 2', result: '3' },
                    { code: 'true + true', result: '2' },
                    { code: 'null + 1', result: '1' },
                    { code: 'false + 0', result: '0' },
                  ].map((ex) => (
                    <div key={ex.code} className="flex items-center justify-between gap-3">
                      <code className="font-['Courier_New',monospace] text-[13px] text-[#1E293B] font-semibold">
                        {ex.code}
                      </code>
                      <span className="font-['Courier_New',monospace] text-[13px] font-bold text-[#5B21B6] bg-[#8B5CF6]/20 px-2 py-0.5 rounded shrink-0">
                        → {ex.result}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Subtraction contrast */}
          <div className="topic-card bg-white border-2 border-[#1E293B] rounded-[16px] shadow-[6px_6px_0px_0px_#1E293B] p-5 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-[12px] border-2 border-[#1E293B] bg-[#F472B6] flex items-center justify-center">
                <Code2 size={20} strokeWidth={2.5} className="text-[#1E293B]" />
              </div>
              <h3 className="font-['Outfit'] font-extrabold text-lg text-[#1E293B]">
                对比：<code className="font-['Courier_New',monospace]">-</code> 运算符永远是数学运算
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { code: '"5" - 2', result: '3', reason: '字符串转数字后减' },
                { code: '"5" + 2', result: '"52"', reason: '字符串拼接' },
                { code: '"abc" - 1', result: 'NaN', reason: '"abc" → NaN' },
              ].map((ex) => (
                <div key={ex.code} className="bg-[#F8F7F0] rounded-[12px] border border-[#E2E8F0] p-4">
                  <code className="font-['Courier_New',monospace] text-sm font-bold text-[#1E293B]">
                    {ex.code}
                  </code>
                  <span className="font-['Courier_New',monospace] text-sm font-bold ml-2 px-2 py-0.5 rounded-md bg-[#F472B6]/15 text-[#9D174D]">
                    → {ex.result}
                  </span>
                  <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#1E293B]/50 mt-2">
                    {ex.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 5: CLASSIC TRAPS
            ══════════════════════════════════════════ */}
        <section className="mb-24 md:mb-32">
          <SectionHeading
            icon={AlertTriangle}
            label="经典面试题"
            title="那些令人困惑的陷阱"
            color="#FDE68A"
          />

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ExampleCard
              title="空数组的秘密"
              code={
                <>
                  <span className="text-purple-400 font-bold">[]</span> =={' '}
                  <span className="text-pink-400 font-bold">![]</span>
                </>
              }
              result="true"
              explanation='![] 先求值为 false，然后 [] == false，布尔转数字 → [] == 0，对象 ToPrimitive([]) → ""，字符串转数字 → 0 == 0 → true'
              color="#DDD6FE"
            />
            <ExampleCard
              title="空数组相加"
              code={
                <>
                  <span className="text-purple-400 font-bold">[]</span> +{' '}
                  <span className="text-purple-400 font-bold">[]</span>
                </>
              }
              result='""'
              explanation='两个数组 ToPrimitive 后都变成空字符串 ""，两边都是字符串，拼接后仍是空字符串。'
              color="#FDE68A"
              className="animate-slide"
            />
            <ExampleCard
              title="对象加数组"
              code={
                <>
                  <span className="text-purple-400 font-bold">{'{}'}</span> +{' '}
                  <span className="text-purple-400 font-bold">[]</span>
                </>
              }
              result='"[object Object]"'
              explanation='{}.toString() 为 "[object Object]"，[].toString() 为 ""，字符串拼接。注意：在某些环境下 {} 在行首会被解析为代码块！'
              color="#FBCFE8"
              className="animate-slide"
            />
            <ExampleCard
              title="香蕉"
              code={
                <>
                  <span className="text-purple-400 font-bold">&quot;b&quot;</span> +{' '}
                  <span className="text-purple-400 font-bold">&quot;a&quot;</span> + +{' '}
                  <span className="text-purple-400 font-bold">&quot;a&quot;</span> +{' '}
                  <span className="text-purple-400 font-bold">&quot;a&quot;</span>
                </>
              }
              result='"baNaNa"'
              explanation='一元 + 将 "a" 转为数字 → NaN，然后字符串拼接："" + "a" + NaN + "a" → "baNaNa"'
              color="#BBF7D0"
            />
            <ExampleCard
              title="null 的沉默"
              code={
                <>
                  <span className="text-purple-400 font-bold">null</span> +{' '}
                  <span className="text-purple-400 font-bold">1</span>
                  {'\n'}
                  <span className="text-purple-400 font-bold">null</span> +{' '}
                  <span className="text-purple-400 font-bold">0</span>
                </>
              }
              result="1 / 0"
              explanation='null 通过 ToPrimitive 仍是 null，+ 右侧不是字符串，ToNumber(null) → 0，所以 0+1=1，0+0=0。'
              color="#C4B5FD"
            />
            <ExampleCard
              title="undefined 的无"
              code={
                <>
                  <span className="text-purple-400 font-bold">undefined</span> +{' '}
                  <span className="text-purple-400 font-bold">1</span>
                  {'\n'}
                  <span className="text-purple-400 font-bold">undefined</span> =={' '}
                  <span className="text-purple-400 font-bold">null</span>
                </>
              }
              result="NaN / true"
              explanation='ToNumber(undefined) → NaN，NaN + 1 = NaN。而 undefined == null 是规范特例，直接返回 true。'
              color="#FECACA"
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 6: CHEAT SHEET
            ══════════════════════════════════════════ */}
        <section className="mb-20">
          <SectionHeading
            icon={Trophy}
            label="速查表"
            title="一图掌握核心规则"
            color="#DDD6FE"
          />

          <div className="topic-card bg-white border-2 border-[#1E293B] rounded-[20px] shadow-[8px_8px_0px_0px_#1E293B] overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 border-b-2 border-[#1E293B] bg-[#8B5CF6]">
              <div className="px-4 py-3 border-r-2 border-[#1E293B]">
                <span className="font-['Outfit'] font-extrabold text-sm text-[#1E293B] uppercase tracking-wider">
                  表达式
                </span>
              </div>
              <div className="px-4 py-3 border-r-2 border-[#1E293B]">
                <span className="font-['Outfit'] font-extrabold text-sm text-[#1E293B] uppercase tracking-wider">
                  结果
                </span>
              </div>
              <div className="px-4 py-3">
                <span className="font-['Outfit'] font-extrabold text-sm text-[#1E293B] uppercase tracking-wider">
                  关键规则
                </span>
              </div>
            </div>

            {/* Table Rows */}
            {[
              { expr: 'null == undefined', result: 'true', rule: '规范特例' },
              { expr: 'NaN == NaN', result: 'false', rule: 'NaN 不等于自身' },
              { expr: '0 == ""', result: 'true', rule: '"" → 0' },
              { expr: '0 == "0"', result: 'true', rule: '"0" → 0' },
              { expr: '"" == "0"', result: 'false', rule: '同类型，直接比' },
              { expr: 'false == "0"', result: 'true', rule: 'false→0, "0"→0' },
              { expr: 'false == null', result: 'false', rule: 'null 只和 undefined 相等' },
              { expr: '"\\t" == 0', result: 'true', rule: '空白串 → 0' },
              { expr: '[] == 0', result: 'true', rule: '[]→""→0' },
              { expr: '[1] == 1', result: 'true', rule: '[1]→"1"→1' },
              { expr: '"" == []', result: 'true', rule: '[]→""，同类型比' },
              { expr: '0 == []', result: 'true', rule: '[]→""→0' },
            ].map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8F7F0]'} ${i < 11 ? 'border-b border-[#E2E8F0]' : ''}`}
              >
                <div className="px-4 py-3 border-r border-[#E2E8F0]">
                  <code className="font-['Courier_New',monospace] text-[13px] font-bold text-[#1E293B]">
                    {row.expr}
                  </code>
                </div>
                <div className="px-4 py-3 border-r border-[#E2E8F0]">
                  <code
                    className="font-['Courier_New',monospace] text-[13px] font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor:
                        row.result === 'true'
                          ? '#34D39925'
                          : '#F472B625',
                      color:
                        row.result === 'true'
                          ? '#065F46'
                          : '#9D174D',
                    }}
                  >
                    {row.result}
                  </code>
                </div>
                <div className="px-4 py-3">
                  <span className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#1E293B]/60">
                    {row.rule}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Golden Rule */}
          <div className="mt-8 topic-card bg-white border-2 border-[#1E293B] rounded-[16px] shadow-[8px_8px_0px_0px_#34D399] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[14px] border-2 border-[#1E293B] bg-[#34D399] flex items-center justify-center shrink-0">
                <Trophy size={24} strokeWidth={2.5} className="text-[#1E293B]" />
              </div>
              <div>
                <h3 className="font-['Outfit'] font-extrabold text-xl text-[#1E293B] mb-2">
                  终极建议
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#1E293B]/70 leading-relaxed mb-4">
                  在实际开发中，<strong>始终使用 <InlineCode>===</InlineCode>（严格相等）</strong>
                  进行比较。隐式转换是 JavaScript 的历史包袱，理解它的机制是为了更好地避开陷阱，而不是利用它写出令人困惑的代码。
                </p>
                <div className="flex flex-wrap gap-2">
                  {['ESLint eqeqeq', 'TypeScript', '代码审查'].map((tip) => (
                    <span
                      key={tip}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-[#1E293B] bg-[#34D399]/15 font-['Outfit'] font-bold text-xs text-[#1E293B] uppercase tracking-wider"
                    >
                      {tip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <div className="text-center pb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-[#E2E8F0] font-['Plus_Jakarta_Sans'] text-sm text-[#1E293B]/40">
            <BookOpen size={16} strokeWidth={2.5} />
            参考规范：ECMA-262 §7.2.14 Abstract Equality Comparison
          </div>
        </div>
      </div>
    </div>
  )
}