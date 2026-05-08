// app/javascript-scope/page.tsx
'use client';

import { useState, useRef } from 'react';
import {
  CircleDot,
  Layers,
  Search,
  ArrowDown,
  ChevronRight,
  Eye,
  Box,
  Network,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Code2,
  Sparkles,
  RotateCcw,
  Play,
  Target,
  GitBranch,
  Zap,
} from 'lucide-react';

// ============================================
// 代码示例数据
// ============================================
const scopeChainDemo = [
  {
    id: 1,
    name: '全局作用域',
    color: 'var(--accent)',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-400',
    variables: ['window', 'globalVar: "我是全局变量"'],
    icon: Globe,
  },
  {
    id: 2,
    name: '外层函数作用域',
    color: 'var(--secondary)',
    bgColor: 'bg-pink-100',
    borderColor: 'border-pink-400',
    variables: ['outerVar: "我是外层变量"'],
    icon: Box,
  },
  {
    id: 3,
    name: '内层函数作用域',
    color: 'var(--tertiary)',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-400',
    variables: ['innerVar: "我是内层变量"'],
    icon: Target,
  },
];

const quizQuestions = [
  {
    id: 1,
    question: '以下代码输出什么？',
    code: `var x = 10;
function foo() {
  console.log(x);
  var x = 20;
  console.log(x);
}
foo();`,
    options: ['10, 20', 'undefined, 20', '10, 10', 'ReferenceError'],
    correct: 1,
    explanation:
      'var 声明存在变量提升（hoisting），在函数内部，var x 被提升到函数顶部，但赋值不会提升。所以第一个 console.log(x) 输出 undefined，第二个输出 20。',
  },
  {
    id: 2,
    question: '这段代码的输出是？',
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    options: ['0, 1, 2', '3, 3, 3', 'undefined, undefined, undefined', '0, 0, 0'],
    correct: 1,
    explanation:
      'var 声明的变量 i 没有块级作用域，三个回调函数共享同一个 i。当回调执行时，循环已经结束，i 的值为 3。',
  },
  {
    id: 3,
    question: '用 let 改写后输出什么？',
    code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    options: ['0, 1, 2', '3, 3, 3', 'undefined, undefined, undefined', '0, 0, 0'],
    correct: 0,
    explanation:
      'let 有块级作用域，每次循环都会创建一个新的 i 变量，回调函数闭包捕获的是各自循环迭代中的 i。',
  },
];

// Globe 图标组件（自定义）
function Globe({ size = 24, strokeWidth = 2.5, className = '' }) {
  return (
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

export default function JavaScriptScopePage() {
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [highlightedScope, setHighlightedScope] = useState<number | null>(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleQuizAnswer = (questionId: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
    setShowExplanation((prev) => ({ ...prev, [questionId]: true }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowExplanation({});
  };

  // 作用域链动画控制
  const startScopeAnimation = () => {
    setIsAnimating(true);
    setAnimationStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnimationStep(step);
      if (step >= 4) {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnimating(false);
          setAnimationStep(0);
        }, 2000);
      }
    }, 800);
  };

  return (
    <div className="bg-dot-grid min-h-screen">
      {/* ==================== Hero 区域 ==================== */}
      <section className="container py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧：标题 */}
          <div className="animate-pop">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-foreground bg-tertiary font-bold text-sm uppercase tracking-wider mb-6">
              <Layers size={16} strokeWidth={2.5} />
              JavaScript 核心机制
            </div>

            <h1
              className="font-['Outfit'] text-5xl md:text-7xl font-extrabold text-foreground leading-[1.1] mb-6"
              style={{ lineHeight: '1.1' }}
            >
              作用域
              <span className="text-accent"> & </span>
              <br />
              <span className="relative inline-block">
                作用域链
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <path
                    d="M2 8 C50 2, 100 12, 150 6 S250 2, 298 8"
                    stroke="var(--secondary)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-gray-600 font-['Plus_Jakarta_Sans'] leading-relaxed mb-8">
              理解作用域是掌握 JavaScript 的关键一步。它决定了变量的可访问性、
              生命周期，以及代码的执行逻辑。让我们一起深入探索这个核心概念。
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#interactive"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-bold rounded-lg border-2 border-foreground shadow-[4px_4px_0px_0px_var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <Play size={18} strokeWidth={2.5} />
                开始探索
              </a>
              <a
                href="#quiz"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-foreground font-bold rounded-lg border-2 border-foreground shadow-[4px_4px_0px_0px_var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <Sparkles size={18} strokeWidth={2.5} />
                挑战测验
              </a>
            </div>
          </div>

          {/* 右侧：概念图 */}
          <div className="relative animate-slide" style={{ animationDelay: '0.2s' }}>
            {/* 装饰性几何背景 */}
            <div
              className="absolute -top-8 -right-8 w-32 h-32 bg-tertiary rounded-full border-2 border-foreground opacity-50"
              style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
            />
            <div
              className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary rounded-full border-2 border-foreground opacity-40"
              style={{ borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%' }}
            />

            {/* 作用域嵌套图 */}
            <div className="relative z-10 p-2">
              {/* 全局作用域 */}
              <div className="p-6 md:p-8 rounded-2xl border-3 border-foreground bg-purple-50 shadow-[8px_8px_0px_0px_var(--accent)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent text-white flex items-center justify-center border-2 border-foreground">
                    <Globe size={20} strokeWidth={2.5} />
                  </div>
                  <span className="font-bold text-accent uppercase tracking-wide text-sm">
                    全局作用域
                  </span>
                </div>
                <div className="pl-4 border-l-2 border-accent/30 space-y-1 mb-4">
                  <code className="text-sm font-mono text-gray-600">var globalVar = "全局";</code>
                  <code className="text-sm font-mono text-gray-600">function outer() {'{...}'}</code>
                </div>

                {/* 函数作用域 */}
                <div className="ml-4 p-5 rounded-xl border-2 border-foreground bg-pink-50 shadow-[6px_6px_0px_0px_var(--secondary)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary text-white flex items-center justify-center border-2 border-foreground">
                      <Box size={16} strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-secondary uppercase tracking-wide text-sm">
                      outer() 作用域
                    </span>
                  </div>
                  <div className="pl-4 border-l-2 border-secondary/30 space-y-1 mb-3">
                    <code className="text-sm font-mono text-gray-600">
                      var outerVar = "外层";
                    </code>
                    <code className="text-sm font-mono text-gray-600">
                      function inner() {'{...}'}
                    </code>
                  </div>

                  {/* 块级作用域 */}
                  <div className="ml-4 p-4 rounded-lg border-2 border-foreground bg-yellow-50 shadow-[4px_4px_0px_0px_var(--tertiary)]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-md bg-tertiary text-foreground flex items-center justify-center border-2 border-foreground">
                        <Target size={14} strokeWidth={2.5} />
                      </div>
                      <span className="font-bold text-amber-600 uppercase tracking-wide text-xs">
                        inner() 作用域
                      </span>
                    </div>
                    <code className="text-xs font-mono text-gray-600 block">
                      let innerVar = "内层";
                    </code>
                  </div>
                </div>
              </div>

              {/* 图例 */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                {[
                  { color: 'bg-accent', label: '全局' },
                  { color: 'bg-secondary', label: '函数' },
                  { color: 'bg-tertiary', label: '块级' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-sm ${item.color} border border-foreground`} />
                    <span className="text-xs font-bold text-gray-500 uppercase">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 三种作用域详解 ==================== */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-foreground bg-secondary text-white font-bold text-sm uppercase tracking-wider mb-4">
            <Layers size={16} strokeWidth={2.5} />
            核心概念
          </div>
          <h2 className="font-['Outfit'] text-4xl md:text-5xl font-extrabold text-foreground">
            三种作用域类型
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* 全局作用域 */}
          <div
            className="topic-card p-6 md:p-8 animate-slide"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-100 text-accent flex items-center justify-center border-2 border-foreground mb-6 shadow-[4px_4px_0px_0px_var(--accent)]">
              <Globe size={32} strokeWidth={2.5} />
            </div>

            <div className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              Global Scope
            </div>

            <h3 className="font-['Outfit'] text-2xl font-bold text-foreground mb-3">全局作用域</h3>

            <p className="text-gray-600 font-['Plus_Jakarta_Sans'] mb-4 leading-relaxed">
              在代码最外层声明的变量拥有全局作用域。它们可以在代码的任何位置被访问。
            </p>

            <div className="bg-gray-900 rounded-xl p-4 border-2 border-foreground overflow-x-auto">
              <pre className="text-sm">
                <code>
                  <span className="text-purple-400">var</span>{' '}
                  <span className="text-yellow-300">name</span>{' '}
                  <span className="text-white">=</span>{' '}
                  <span className="text-green-400">"全局变量"</span>
                  {'\n'}
                  <span className="text-gray-500">// 在任何地方都能访问</span>
                  {'\n'}
                  <span className="text-purple-400">console</span>
                  <span className="text-white">.</span>
                  <span className="text-blue-400">log</span>
                  <span className="text-white">(</span>
                  <span className="text-yellow-300">name</span>
                  <span className="text-white">)</span>
                  {' '}
                  <span className="text-gray-500">// ✅</span>
                </code>
              </pre>
            </div>

            <div className="mt-4 p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-accent flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600">
                  <strong>注意：</strong>过多的全局变量会导致命名污染，应尽量避免。
                </p>
              </div>
            </div>
          </div>

          {/* 函数作用域 */}
          <div
            className="topic-card p-6 md:p-8 animate-slide"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="w-16 h-16 rounded-2xl bg-pink-100 text-secondary flex items-center justify-center border-2 border-foreground mb-6 shadow-[4px_4px_0px_0px_var(--secondary)]">
              <Box size={32} strokeWidth={2.5} />
            </div>

            <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              Function Scope
            </div>

            <h3 className="font-['Outfit'] text-2xl font-bold text-foreground mb-3">函数作用域</h3>

            <p className="text-gray-600 font-['Plus_Jakarta_Sans'] mb-4 leading-relaxed">
              在函数内部声明的变量只能在该函数内部访问，函数外部无法直接访问。
            </p>

            <div className="bg-gray-900 rounded-xl p-4 border-2 border-foreground overflow-x-auto">
              <pre className="text-sm">
                <code>
                  <span className="text-purple-400">function</span>{' '}
                  <span className="text-blue-400">foo</span>
                  <span className="text-white">() {'{'}</span>
                  {'\n'}
                  {'  '}
                  <span className="text-purple-400">var</span>{' '}
                  <span className="text-yellow-300">secret</span>{' '}
                  <span className="text-white">=</span>{' '}
                  <span className="text-green-400">"私有的"</span>
                  {'\n'}
                  <span className="text-white">{'}'}</span>
                  {'\n'}
                  <span className="text-purple-400">console</span>
                  <span className="text-white">.</span>
                  <span className="text-blue-400">log</span>
                  <span className="text-white">(</span>
                  <span className="text-yellow-300">secret</span>
                  <span className="text-white">)</span>{' '}
                  <span className="text-red-400">// ❌ Error</span>
                </code>
              </pre>
            </div>

            <div className="mt-4 p-3 bg-pink-50 rounded-lg border-2 border-pink-200">
              <div className="flex items-start gap-2">
                <Lightbulb size={16} className="text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600">
                  <strong>特性：</strong>var 声明的变量具有函数作用域，会进行变量提升。
                </p>
              </div>
            </div>
          </div>

          {/* 块级作用域 */}
          <div
            className="topic-card p-6 md:p-8 animate-slide"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="w-16 h-16 rounded-2xl bg-yellow-100 text-amber-600 flex items-center justify-center border-2 border-foreground mb-6 shadow-[4px_4px_0px_0px_var(--tertiary)]">
              <Target size={32} strokeWidth={2.5} />
            </div>

            <div className="inline-block px-3 py-1 bg-tertiary/10 text-amber-600 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              Block Scope
            </div>

            <h3 className="font-['Outfit'] text-2xl font-bold text-foreground mb-3">块级作用域</h3>

            <p className="text-gray-600 font-['Plus_Jakarta_Sans'] mb-4 leading-relaxed">
              ES6 引入的 let 和 const 具有块级作用域，只在最近的花括号内有效。
            </p>

            <div className="bg-gray-900 rounded-xl p-4 border-2 border-foreground overflow-x-auto">
              <pre className="text-sm">
                <code>
                  <span className="text-purple-400">if</span>{' '}
                  <span className="text-white">(</span>
                  <span className="text-purple-400">true</span>
                  <span className="text-white">) {'{'}</span>
                  {'\n'}
                  {'  '}
                  <span className="text-purple-400">let</span>{' '}
                  <span className="text-yellow-300">x</span>{' '}
                  <span className="text-white">=</span>{' '}
                  <span className="text-orange-400">10</span>
                  {'\n'}
                  {'  '}
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-yellow-300">PI</span>{' '}
                  <span className="text-white">=</span>{' '}
                  <span className="text-orange-400">3.14</span>
                  {'\n'}
                  <span className="text-white">{'}'}</span>
                  {'\n'}
                  <span className="text-purple-400">console</span>
                  <span className="text-white">.</span>
                  <span className="text-blue-400">log</span>
                  <span className="text-white">(</span>
                  <span className="text-yellow-300">x</span>
                  <span className="text-white">)</span>{' '}
                  <span className="text-red-400">// ❌ Error</span>
                </code>
              </pre>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <div className="flex items-start gap-2">
                <Zap size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600">
                  <strong>优势：</strong>不存在变量提升的暂时性死区，更安全可控。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 作用域链交互演示 ==================== */}
      <section id="interactive" className="container py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-foreground bg-quaternary text-white font-bold text-sm uppercase tracking-wider mb-4">
            <Network size={16} strokeWidth={2.5} />
            交互演示
          </div>
          <h2 className="font-['Outfit'] text-4xl md:text-5xl font-extrabold text-foreground">
            作用域链如何查找变量
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            当访问一个变量时，JavaScript 引擎会从当前作用域开始，逐级向外层查找，
            直到找到该变量或到达全局作用域。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* 左侧：代码 */}
          <div className="animate-slide" style={{ animationDelay: '0.1s' }}>
            <div className="topic-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Code2 size={20} strokeWidth={2.5} className="text-accent" />
                  <span className="font-bold text-foreground">示例代码</span>
                </div>
                <button
                  onClick={startScopeAnimation}
                  disabled={isAnimating}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-bold rounded-lg border-2 border-foreground shadow-[4px_4px_0px_0px_var(--foreground)] hover:shadow-[2px_2px_0px_0px_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play size={14} strokeWidth={2.5} />
                  {isAnimating ? '执行中...' : '执行查找'}
                </button>
              </div>

              <div className="bg-gray-900 rounded-xl p-5 border-2 border-foreground overflow-x-auto">
                <pre className="text-sm leading-7">
                  <code>
                    <span
                      className={`transition-colors duration-300 ${animationStep >= 1 ? 'text-purple-400 font-bold' : 'text-gray-500'}`}
                    >
                      <span className="text-gray-600">{'// ① '}</span>
                      全局作用域
                    </span>
                    {'\n'}
                    <span className="text-purple-400">var</span>{' '}
                    <span
                      className={`transition-colors duration-300 ${animationStep === 1 ? 'text-yellow-300 bg-yellow-300/20 px-1 rounded' : 'text-yellow-300'}`}
                    >
                      globalVar
                    </span>{' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-green-400">"全局"</span>
                    {'\n\n'}
                    <span
                      className={`transition-colors duration-300 ${animationStep >= 2 ? 'text-pink-400 font-bold' : 'text-gray-500'}`}
                    >
                      <span className="text-gray-600">{'// ② '}</span>
                      outer 函数作用域
                    </span>
                    {'\n'}
                    <span className="text-purple-400">function</span>{' '}
                    <span className="text-blue-400">outer</span>
                    <span className="text-white">() {'{'}</span>
                    {'\n'}
                    {'  '}
                    <span className="text-purple-400">var</span>{' '}
                    <span
                      className={`transition-colors duration-300 ${animationStep === 2 ? 'text-yellow-300 bg-yellow-300/20 px-1 rounded' : 'text-yellow-300'}`}
                    >
                      outerVar
                    </span>{' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-green-400">"外层"</span>
                    {'\n\n'}
                    {'  '}
                    <span
                      className={`transition-colors duration-300 ${animationStep >= 3 ? 'text-amber-400 font-bold' : 'text-gray-500'}`}
                    >
                      <span className="text-gray-600">{'// ③ '}</span>
                      inner 函数作用域
                    </span>
                    {'\n'}
                    {'  '}
                    <span className="text-purple-400">function</span>{' '}
                    <span className="text-blue-400">inner</span>
                    <span className="text-white">() {'{'}</span>
                    {'\n'}
                    {'    '}
                    <span className="text-purple-400">let</span>{' '}
                    <span className="text-yellow-300">innerVar</span>{' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-green-400">"内层"</span>
                    {'\n'}
                    {'    '}
                    <span className="text-gray-500">// ④ 查找变量</span>
                    {'\n'}
                    {'    '}
                    <span className="text-purple-400">console</span>
                    <span className="text-white">.</span>
                    <span className="text-blue-400">log</span>
                    <span className="text-white">(</span>
                    <span
                      className={`transition-colors duration-300 ${animationStep >= 4 ? 'text-red-400 underline decoration-wavy' : ''}`}
                    >
                      globalVar
                    </span>
                    <span className="text-white">)</span>
                    {'\n'}
                    {'  '}
                    <span className="text-white">{'}'}</span>
                    {'\n'}
                    {'  '}
                    <span className="text-blue-400">inner</span>
                    <span className="text-white">()</span>
                    {'\n'}
                    <span className="text-white">{'}'}</span>
                    {'\n'}
                    <span className="text-blue-400">outer</span>
                    <span className="text-white">()</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* 右侧：作用域链可视化 */}
          <div className="animate-slide" style={{ animationDelay: '0.2s' }}>
            <div className="topic-card p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Search size={20} strokeWidth={2.5} className="text-accent" />
                <span className="font-bold text-foreground">查找过程</span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: 'inner 作用域',
                    desc: '查找 globalVar → 未找到',
                    color: 'var(--tertiary)',
                    bgColor: 'bg-yellow-50',
                    icon: <Target size={18} strokeWidth={2.5} />,
                    status: animationStep >= 1 ? 'searching' : 'idle',
                  },
                  {
                    step: 2,
                    title: 'outer 作用域',
                    desc: '查找 globalVar → 未找到',
                    color: 'var(--secondary)',
                    bgColor: 'bg-pink-50',
                    icon: <Box size={18} strokeWidth={2.5} />,
                    status: animationStep >= 2 ? 'searching' : animationStep === 1 ? 'next' : 'idle',
                  },
                  {
                    step: 3,
                    title: '全局作用域',
                    desc: '查找 globalVar → ✅ 找到！',
                    color: 'var(--accent)',
                    bgColor: 'bg-purple-50',
                    icon: <Globe size={18} strokeWidth={2.5} />,
                    status: animationStep >= 3 ? 'found' : animationStep === 2 ? 'next' : 'idle',
                  },
                ].map((scope, index) => (
                  <div key={scope.step} className="relative">
                    <div
                      className={`p-4 rounded-xl border-2 border-foreground transition-all duration-500 ${
                        scope.status === 'found'
                          ? 'shadow-[6px_6px_0px_0px_var(--quaternary)] scale-[1.02]'
                          : scope.status === 'searching'
                            ? 'shadow-[6px_6px_0px_0px_var(--foreground)] scale-[1.01]'
                            : scope.status === 'next'
                              ? 'shadow-[4px_4px_0px_0px_var(--border)] opacity-70'
                              : 'shadow-[4px_4px_0px_0px_var(--border)] opacity-50'
                      } ${scope.bgColor}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 border-foreground transition-all duration-300 ${
                            scope.status === 'found'
                              ? 'bg-quaternary text-white'
                              : scope.status === 'searching'
                                ? 'bg-foreground text-white animate-pulse'
                                : 'bg-white text-foreground'
                          }`}
                        >
                          {scope.status === 'found' ? (
                            <CheckCircle2 size={18} strokeWidth={2.5} />
                          ) : (
                            scope.icon
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground text-sm">
                              第 {scope.step} 站
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="font-bold text-sm" style={{ color: scope.color }}>
                              {scope.title}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{scope.desc}</p>
                        </div>
                        {scope.status === 'searching' && (
                          <div className="w-4 h-4 rounded-full border-2 border-foreground border-t-transparent animate-spin" />
                        )}
                      </div>
                    </div>

                    {/* 连接箭头 */}
                    {index < 2 && (
                      <div className="flex justify-center my-2">
                        <div
                          className={`transition-all duration-300 ${
                            animationStep >= scope.step + 1
                              ? 'text-foreground'
                              : 'text-gray-300'
                          }`}
                        >
                          <ArrowDown size={20} strokeWidth={2.5} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 结果提示 */}
              <div
                className={`mt-6 p-4 rounded-xl border-2 border-foreground transition-all duration-500 ${
                  animationStep >= 4
                    ? 'bg-quaternary/10 shadow-[4px_4px_0px_0px_var(--quaternary)] opacity-100'
                    : 'bg-gray-50 opacity-30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-quaternary text-white flex items-center justify-center border-2 border-foreground">
                    <CheckCircle2 size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">查找完成！</p>
                    <p className="text-xs text-gray-500">
                      在全局作用域中找到了 globalVar，返回值 "全局"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 作用域链规则总结 ==================== */}
      <section className="container py-16">
        <div className="topic-card p-8 md:p-12 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-foreground bg-accent text-white font-bold text-sm uppercase tracking-wider mb-4">
              <GitBranch size={16} strokeWidth={2.5} />
              核心规则
            </div>
            <h2 className="font-['Outfit'] text-3xl md:text-4xl font-extrabold text-foreground">
              作用域链的查找规则
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Eye size={24} strokeWidth={2.5} />,
                title: '由内向外',
                description:
                  '变量查找从当前作用域开始，逐级向上层作用域查找，直到全局作用域。',
                color: 'var(--accent)',
                bgColor: 'bg-purple-100',
              },
              {
                icon: <Layers size={24} strokeWidth={2.5} />,
                title: '就近原则',
                description:
                  '如果同名变量在多个作用域中存在，使用离当前作用域最近的那个。',
                color: 'var(--secondary)',
                bgColor: 'bg-pink-100',
              },
              {
                icon: <AlertTriangle size={24} strokeWidth={2.5} />,
                title: '报错机制',
                description:
                  '如果一直查找到全局作用域都没有找到，会抛出 ReferenceError。',
                color: 'var(--tertiary)',
                bgColor: 'bg-yellow-100',
              },
            ].map((rule, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border-2 border-foreground bg-white shadow-[6px_6px_0px_0px_var(--foreground)] hover:shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all animate-slide"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-14 h-14 rounded-xl ${rule.bgColor} flex items-center justify-center border-2 border-foreground mb-4`}
                  style={{ color: rule.color }}
                >
                  {rule.icon}
                </div>
                <h4 className="font-['Outfit'] text-xl font-bold text-foreground mb-2">
                  {rule.title}
                </h4>
                <p className="text-sm text-gray-600 font-['Plus_Jakarta_Sans'] leading-relaxed">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 闭包与作用域 ==================== */}
      <section className="container py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="animate-slide" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-foreground bg-quaternary text-white font-bold text-sm uppercase tracking-wider mb-6">
              <Sparkles size={16} strokeWidth={2.5} />
              进阶知识
            </div>

            <h2 className="font-['Outfit'] text-3xl md:text-4xl font-extrabold text-foreground mb-6">
              闭包：作用域的
              <br />
              <span className="text-accent">延续与记忆</span>
            </h2>

            <div className="space-y-4 font-['Plus_Jakarta_Sans'] text-gray-600 leading-relaxed">
              <p>
                <strong className="text-foreground">闭包（Closure）</strong>
                是 JavaScript 最强大的特性之一。当一个函数能够记住并访问它的词法作用域，
                即使函数在该作用域之外执行，就产生了闭包。
              </p>
              <p>
                闭包的本质是：内部函数持有对外部函数变量的引用，
                使得这些变量不会被垃圾回收机制清除。
              </p>
            </div>

            <div className="mt-6 p-4 bg-white rounded-xl border-2 border-foreground shadow-[6px_6px_0px_0px_var(--quaternary)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-quaternary text-white flex items-center justify-center border-2 border-foreground">
                  <Lightbulb size={16} strokeWidth={2.5} />
                </div>
                <span className="font-bold text-foreground text-sm">实际应用场景</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-quaternary flex-shrink-0" />
                  数据封装与私有变量
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-quaternary flex-shrink-0" />
                  函数柯里化（Currying）
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-quaternary flex-shrink-0" />
                  模块模式（Module Pattern）
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-quaternary flex-shrink-0" />
                  事件处理与回调函数
                </li>
              </ul>
            </div>
          </div>

          {/* 闭包代码示例 */}
          <div className="animate-slide" style={{ animationDelay: '0.2s' }}>
            <div className="topic-card p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Code2 size={20} strokeWidth={2.5} className="text-accent" />
                <span className="font-bold text-foreground">闭包示例</span>
              </div>

              <div className="bg-gray-900 rounded-xl p-5 border-2 border-foreground overflow-x-auto">
                <pre className="text-sm leading-7">
                  <code>
                    <span className="text-purple-400">function</span>{' '}
                    <span className="text-blue-400">createCounter</span>
                    <span className="text-white">() {'{'}</span>
                    {'\n'}
                    {'  '}
                    <span className="text-purple-400">let</span>{' '}
                    <span className="text-yellow-300">count</span>{' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-orange-400">0</span>
                    {' '}
                    <span className="text-gray-500">// 私有变量</span>
                    {'\n\n'}
                    {'  '}
                    <span className="text-purple-400">return</span>{' '}
                    <span className="text-white">{'{'}</span>
                    {'\n'}
                    {'    '}
                    <span className="text-green-400">increment</span>
                    <span className="text-white">() {'{'}</span>
                    {'\n'}
                    {'      '}
                    <span className="text-purple-400">return</span>{' '}
                    <span className="text-white">++</span>
                    <span className="text-yellow-300">count</span>
                    {'\n'}
                    {'    '}
                    <span className="text-white">{'}'},</span>
                    {'\n'}
                    {'    '}
                    <span className="text-green-400">getCount</span>
                    <span className="text-white">() {'{'}</span>
                    {'\n'}
                    {'      '}
                    <span className="text-purple-400">return</span>{' '}
                    <span className="text-yellow-300">count</span>
                    {'\n'}
                    {'    '}
                    <span className="text-white">{'}'}</span>
                    {'\n'}
                    {'  '}
                    <span className="text-white">{'}'}</span>
                    {'\n'}
                    <span className="text-white">{'}'}</span>
                    {'\n\n'}
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-yellow-300">counter</span>{' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-blue-400">createCounter</span>
                    <span className="text-white">()</span>
                    {'\n'}
                    <span className="text-yellow-300">counter</span>
                    <span className="text-white">.</span>
                    <span className="text-blue-400">increment</span>
                    <span className="text-white">()</span>{' '}
                    <span className="text-gray-500">// 1</span>
                    {'\n'}
                    <span className="text-yellow-300">counter</span>
                    <span className="text-white">.</span>
                    <span className="text-blue-400">increment</span>
                    <span className="text-white">()</span>{' '}
                    <span className="text-gray-500">// 2</span>
                    {'\n'}
                    <span className="text-yellow-300">counter</span>
                    <span className="text-white">.</span>
                    <span className="text-blue-400">getCount</span>
                    <span className="text-white">()</span>{' '}
                    <span className="text-gray-500">// 2</span>
                    {'\n'}
                    <span className="text-gray-500">// count 无法从外部直接访问</span>
                    {'\n'}
                    <span className="text-gray-500">// console.log(count) ❌</span>
                  </code>
                </pre>
              </div>

              {/* 闭包图解 */}
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-purple-50 border-2 border-purple-200">
                  <div className="text-xs font-bold text-accent mb-1">外部函数</div>
                  <div className="text-[10px] text-gray-500">创建作用域</div>
                </div>
                <div className="flex items-center justify-center">
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
                <div className="p-3 rounded-lg bg-pink-50 border-2 border-pink-200">
                  <div className="text-xs font-bold text-secondary mb-1">内部函数</div>
                  <div className="text-[10px] text-gray-500">持有引用</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 互动测验 ==================== */}
      <section id="quiz" className="container py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-foreground bg-secondary text-white font-bold text-sm uppercase tracking-wider mb-4">
            <Sparkles size={16} strokeWidth={2.5} />
            知识检验
          </div>
          <h2 className="font-['Outfit'] text-4xl md:text-5xl font-extrabold text-foreground">
            挑战你的理解
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            通过这些经典面试题，测试你对作用域和作用域链的掌握程度。
          </p>
          <button
            onClick={resetQuiz}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-500 hover:text-foreground transition-colors"
          >
            <RotateCcw size={14} strokeWidth={2.5} />
            重置测验
          </button>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {quizQuestions.map((q, index) => {
            const selected = selectedAnswers[q.id];
            const isCorrect = selected === q.correct;
            const showResult = showExplanation[q.id];

            return (
              <div
                key={q.id}
                className="topic-card p-6 md:p-8 animate-slide"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* 问题头部 */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center border-2 border-foreground font-bold flex-shrink-0">
                    {q.id}
                  </div>
                  <div>
                    <h4 className="font-['Outfit'] text-lg font-bold text-foreground">
                      {q.question}
                    </h4>
                  </div>
                </div>

                {/* 代码块 */}
                <div className="bg-gray-900 rounded-xl p-4 border-2 border-foreground mb-6 overflow-x-auto">
                  <pre className="text-sm">
                    <code className="text-gray-300">{q.code}</code>
                  </pre>
                </div>

                {/* 选项 */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {q.options.map((option, optIndex) => {
                    const isSelected = selected === optIndex;
                    const isOptionCorrect = optIndex === q.correct;

                    let optionStyle = 'bg-white border-2 border-foreground hover:bg-gray-50';
                    if (showResult) {
                      if (isOptionCorrect) {
                        optionStyle = 'bg-quaternary/10 border-2 border-quaternary shadow-[4px_4px_0px_0px_var(--quaternary)]';
                      } else if (isSelected && !isOptionCorrect) {
                        optionStyle = 'bg-red-50 border-2 border-red-400';
                      } else {
                        optionStyle = 'bg-gray-50 border-2 border-gray-200 opacity-50';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-accent/10 border-2 border-accent shadow-[4px_4px_0px_0px_var(--accent)]';
                    }

                    return (
                      <button
                        key={optIndex}
                        onClick={() => !showResult && handleQuizAnswer(q.id, optIndex)}
                        disabled={showResult}
                        className={`p-3 rounded-xl text-left font-mono text-sm transition-all ${optionStyle} ${
                          !showResult ? 'cursor-pointer' : 'cursor-default'
                        }`}
                      >
                        <span className="font-sans font-bold text-gray-400 mr-2">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* 解释 */}
                {showResult && (
                  <div
                    className={`p-4 rounded-xl border-2 ${
                      isCorrect
                        ? 'bg-quaternary/10 border-quaternary'
                        : 'bg-secondary/10 border-secondary'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {isCorrect ? (
                        <CheckCircle2 size={18} strokeWidth={2.5} className="text-quaternary" />
                      ) : (
                        <AlertTriangle size={18} strokeWidth={2.5} className="text-secondary" />
                      )}
                      <span className="font-bold text-sm">
                        {isCorrect ? '回答正确！🎉' : '回答错误，再想想看！'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== 总结卡片 ==================== */}
      <section className="container py-16 pb-24">
        <div className="topic-card p-8 md:p-12 bg-gradient-to-r from-accent to-secondary text-white border-2 border-foreground shadow-[12px_12px_0px_0px_var(--foreground)]">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6 border-2 border-white/30">
              <Sparkles size={32} strokeWidth={2.5} />
            </div>

            <h2 className="font-['Outfit'] text-3xl md:text-4xl font-extrabold mb-6">
              核心要点回顾
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  emoji: '🎯',
                  title: '三种作用域',
                  desc: '全局、函数、块级',
                },
                {
                  emoji: '🔗',
                  title: '作用域链',
                  desc: '由内向外逐级查找',
                },
                {
                  emoji: '🔒',
                  title: '闭包机制',
                  desc: '记住并访问词法环境',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/10 border-2 border-white/20 backdrop-blur-sm"
                >
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-white/70">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-white/80 font-['Plus_Jakarta_Sans'] leading-relaxed">
              理解作用域和作用域链是编写高质量 JavaScript 代码的基础。
              掌握这些概念，你就能更好地理解变量的行为、避免常见陷阱，并编写出更加优雅和可维护的代码。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}