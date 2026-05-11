"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Shield,
  Key,
  Lock,
  Unlock,
  Globe,
  Fingerprint,
  Cookie,
  FileKey,
  Users,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Zap,
  Clock,
  Server,
  Database,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  ChevronRight,
  Sparkles,
  Layers,
  GitBranch,
  Timer,
  ShieldCheck,
  ShieldAlert,
  Settings,
  BookOpen,
  Lightbulb,
  Code2,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { highlightCode } from "@/lib/prism-highlight";

/* ──────────── CodeBlock 组件 ──────────── */
function CodeBlock({
  code,
  language = "typescript",
  title,
  showLineNumbers = false,
}: {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}) {
  const html = highlightCode(code, language);
  const lineCount = code.split("\n").length;

  return (
    <div className="border-2 border-[var(--foreground)] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_var(--foreground)] bg-[#1E293B] group">
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
      <div className="relative flex">
        {showLineNumbers && (
          <div className="flex flex-col py-5 px-3 bg-[#0F172A] border-r border-[#334155] select-none">
            {Array.from({ length: lineCount }, (_, i) => (
              <span
                key={i}
                className="text-xs text-[#475569] leading-relaxed text-right min-w-[1.5rem]"
              >
                {i + 1}
              </span>
            ))}
          </div>
        )}
        <pre
          className={`p-5 overflow-x-auto text-sm leading-relaxed language-${language} flex-1`}
        >
          <code
            className={`font-['JetBrains_Mono',monospace] text-[#E2E8F0] language-${language}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </pre>
      </div>
    </div>
  );
}

/* ──────────── 几何徽章组件 ──────────── */
function IconBadge({
  icon: Icon,
  color = "accent",
  size = "md",
}: {
  icon: LucideIcon;
  color?: "accent" | "secondary" | "tertiary" | "quaternary";
  size?: "sm" | "md" | "lg";
}) {
  const colorMap = {
    accent: "bg-[var(--accent)] text-white",
    secondary: "bg-[var(--secondary)] text-white",
    tertiary: "bg-[var(--tertiary)] text-[var(--foreground)]",
    quaternary: "bg-[var(--quaternary)] text-[var(--foreground)]",
  };
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };
  const iconSizeMap = { sm: 16, md: 22, lg: 28 };

  return (
    <div
      className={`${sizeMap[size]} ${colorMap[color]} rounded-xl border-2 border-[var(--foreground)] shadow-[3px_3px_0px_0px_var(--foreground)] flex items-center justify-center flex-shrink-0`}
    >
      <Icon size={iconSizeMap[size]} strokeWidth={2.5} />
    </div>
  );
}

/* ──────────── 警告卡片 ──────────── */
function WarningCard({
  title,
  children,
  type = "warning",
}: {
  title: string;
  children: React.ReactNode;
  type?: "warning" | "danger" | "info" | "success";
}) {
  const config = {
    warning: {
      bg: "bg-[var(--tertiary)]/10",
      border: "border-[var(--tertiary)]",
      icon: AlertTriangle,
      iconColor: "text-[var(--tertiary)]",
    },
    danger: {
      bg: "bg-[var(--secondary)]/10",
      border: "border-[var(--secondary)]",
      icon: XCircle,
      iconColor: "text-[var(--secondary)]",
    },
    info: {
      bg: "bg-[var(--accent)]/10",
      border: "border-[var(--accent)]",
      icon: Info,
      iconColor: "text-[var(--accent)]",
    },
    success: {
      bg: "bg-[var(--quaternary)]/10",
      border: "border-[var(--quaternary)]",
      icon: CheckCircle2,
      iconColor: "text-[var(--quaternary)]",
    },
  };
  const c = config[type];
  const IconComp = c.icon;

  return (
    <div
      className={`${c.bg} ${c.border} border-2 rounded-2xl p-5 shadow-[4px_4px_0px_0px_var(--foreground)]`}
    >
      <div className="flex items-center gap-3 mb-2">
        <IconComp size={20} strokeWidth={2.5} className={c.iconColor} />
        <span className="font-['Outfit'] font-bold text-[var(--foreground)]">
          {title}
        </span>
      </div>
      <div className="text-sm text-[var(--foreground)]/80 leading-relaxed font-['Plus_Jakarta_Sans']">
        {children}
      </div>
    </div>
  );
}

/* ──────────── 交互式JWT解析器 ──────────── */
function JWTPlayground() {
  const [tokenParts, setTokenParts] = useState({
    header: `{ "alg": "HS256", "typ": "JWT" }`,
    payload: `{
  "sub": "1234567890",
  "name": "张三",
  "role": "admin",
  "iat": 1719312000,
  "exp": 1719398400
}`,
    secret: "your-256-bit-secret",
  });

  const headerB64 = useMemo(() => {
    try {
      return btoa(tokenParts.header).replace(/=/g, "");
    } catch {
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
    }
  }, [tokenParts.header]);

  const payloadB64 = useMemo(() => {
    try {
      return btoa(tokenParts.payload).replace(/=/g, "");
    } catch {
      return "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IuW8oOS4iSIsInJvbGUiOiJhZG1pbiJ9";
    }
  }, [tokenParts.payload]);

  const signatureB64 = useMemo(() => {
    return btoa(`HMACSHA256(${headerB64}.${payloadB64}, ${tokenParts.secret})`)
      .replace(/=/g, "")
      .substring(0, 43);
  }, [headerB64, payloadB64, tokenParts.secret]);

  const fullToken = `${headerB64}.${payloadB64}.${signatureB64}`;

  const [highlightPart, setHighlightPart] = useState<
    "header" | "payload" | "signature" | null
  >(null);

  const getHighlightColor = (part: string) => {
    if (highlightPart !== part) return "border-[var(--border)]";
    switch (part) {
      case "header":
        return "border-[var(--accent)] shadow-[0_0_0_2px_var(--accent)]";
      case "payload":
        return "border-[var(--secondary)] shadow-[0_0_0_2px_var(--secondary)]";
      case "signature":
        return "border-[var(--quaternary)] shadow-[0_0_0_2px_var(--quaternary)]";
    }
  };

  const expTime = useMemo(() => {
    try {
      const parsed = JSON.parse(tokenParts.payload);
      if (parsed.exp) {
        return new Date(parsed.exp * 1000).toLocaleString("zh-CN");
      }
    } catch {}
    return null;
  }, [tokenParts.payload]);

  return (
    <div className="space-y-6">
      {/* Token 可视化 */}
      <div className="bg-[#0F172A] rounded-2xl border-2 border-[var(--foreground)] shadow-[6px_6px_0px_0px_var(--foreground)] overflow-hidden">
        <div className="px-4 py-3 border-b-2 border-[var(--foreground)] flex items-center gap-2">
          <FileKey
            size={18}
            className="text-[var(--accent)]"
            strokeWidth={2.5}
          />
          <span className="text-[#94A3B8] text-sm font-semibold font-['Plus_Jakarta_Sans']">
            JWT Token 结构解析
          </span>
          <span className="ml-auto text-[10px] px-2 py-0.5 bg-[var(--accent)] text-white rounded-full font-bold">
            LIVE
          </span>
        </div>

        <div className="p-4">
          {/* Token 展示 */}
          <div
            className="font-['JetBrains_Mono'] text-xs leading-relaxed break-all p-4 rounded-xl bg-[#1E293B] border border-[#334155]"
            style={{ wordBreak: "break-all" }}
          >
            <span
              className={`bg-[var(--accent)]/20 px-1 rounded cursor-pointer transition-all ${
                highlightPart === "header" ? "bg-[var(--accent)]/40" : ""
              }`}
              onMouseEnter={() => setHighlightPart("header")}
              onMouseLeave={() => setHighlightPart(null)}
            >
              {headerB64}
            </span>
            <span className="text-[var(--secondary)] mx-0.5">.</span>
            <span
              className={`bg-[var(--secondary)]/20 px-1 rounded cursor-pointer transition-all ${
                highlightPart === "payload" ? "bg-[var(--secondary)]/40" : ""
              }`}
              onMouseEnter={() => setHighlightPart("payload")}
              onMouseLeave={() => setHighlightPart(null)}
            >
              {payloadB64}
            </span>
            <span className="text-[var(--quaternary)] mx-0.5">.</span>
            <span
              className={`bg-[var(--quaternary)]/20 px-1 rounded cursor-pointer transition-all ${
                highlightPart === "signature" ? "bg-[var(--quaternary)]/40" : ""
              }`}
              onMouseEnter={() => setHighlightPart("signature")}
              onMouseLeave={() => setHighlightPart(null)}
            >
              {signatureB64}
            </span>
          </div>

          {/* 图例 */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onMouseEnter={() => setHighlightPart("header")}
              onMouseLeave={() => setHighlightPart(null)}
            >
              <div className="w-4 h-4 rounded bg-[var(--accent)] border border-white/20" />
              <span className="text-xs text-[#94A3B8] group-hover:text-white transition-colors">
                Header（头部）
              </span>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onMouseEnter={() => setHighlightPart("payload")}
              onMouseLeave={() => setHighlightPart(null)}
            >
              <div className="w-4 h-4 rounded bg-[var(--secondary)] border border-white/20" />
              <span className="text-xs text-[#94A3B8] group-hover:text-white transition-colors">
                Payload（载荷）
              </span>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onMouseEnter={() => setHighlightPart("signature")}
              onMouseLeave={() => setHighlightPart(null)}
            >
              <div className="w-4 h-4 rounded bg-[var(--quaternary)] border border-white/20" />
              <span className="text-xs text-[#94A3B8] group-hover:text-white transition-colors">
                Signature（签名）
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 编辑区域 */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Header 编辑 */}
        <div
          className={`rounded-xl border-2 p-4 transition-all ${getHighlightColor(
            "header",
          )} bg-[var(--accent)]/5`}
        >
          <label className="flex items-center gap-2 text-sm font-bold font-['Outfit'] text-[var(--accent)] mb-3">
            <div className="w-3 h-3 rounded bg-[var(--accent)]" />
            Header
          </label>
          <textarea
            value={tokenParts.header}
            onChange={(e) =>
              setTokenParts((p) => ({ ...p, header: e.target.value }))
            }
            className="w-full h-20 bg-white border-2 border-[var(--foreground)] rounded-lg p-3 font-['JetBrains_Mono'] text-xs resize-none focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        {/* Payload 编辑 */}
        <div
          className={`rounded-xl border-2 p-4 transition-all ${getHighlightColor(
            "payload",
          )} bg-[var(--secondary)]/5`}
        >
          <label className="flex items-center gap-2 text-sm font-bold font-['Outfit'] text-[var(--secondary)] mb-3">
            <div className="w-3 h-3 rounded bg-[var(--secondary)]" />
            Payload
          </label>
          <textarea
            value={tokenParts.payload}
            onChange={(e) =>
              setTokenParts((p) => ({ ...p, payload: e.target.value }))
            }
            className="w-full h-20 bg-white border-2 border-[var(--foreground)] rounded-lg p-3 font-['JetBrains_Mono'] text-xs resize-none focus:outline-none focus:border-[var(--secondary)]"
          />
        </div>
      </div>

      {/* Secret & 信息 */}
      <div className="grid md:grid-cols-2 gap-4">
        <div
          className={`rounded-xl border-2 p-4 transition-all ${getHighlightColor(
            "signature",
          )} bg-[var(--quaternary)]/5`}
        >
          <label className="flex items-center gap-2 text-sm font-bold font-['Outfit'] text-[var(--quaternary)] mb-3">
            <Key size={14} strokeWidth={2.5} />
            Secret（密钥）
          </label>
          <input
            type="text"
            value={tokenParts.secret}
            onChange={(e) =>
              setTokenParts((p) => ({ ...p, secret: e.target.value }))
            }
            className="w-full bg-white border-2 border-[var(--foreground)] rounded-lg p-3 font-['JetBrains_Mono'] text-xs focus:outline-none focus:border-[var(--quaternary)]"
          />
        </div>

        <div className="rounded-xl border-2 border-[var(--border)] p-4 bg-white/50">
          <div className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] space-y-1">
            <div className="flex justify-between">
              <span>算法：</span>
              <span className="font-bold text-[var(--foreground)]">HS256</span>
            </div>
            <div className="flex justify-between">
              <span>过期时间：</span>
              <span className="font-bold text-[var(--foreground)]">
                {expTime || "未设置"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Token 长度：</span>
              <span className="font-bold text-[var(--foreground)]">
                {fullToken.length} 字符
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────── 鉴权流程动画 ──────────── */
function AuthFlowDiagram({ type }: { type: "session" | "jwt" | "oauth" }) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const flows = {
    session: [
      { label: "用户登录", icon: Users, desc: "发送用户名密码到服务器" },
      { label: "创建Session", icon: Database, desc: "服务器存储会话信息" },
      { label: "返回Cookie", icon: Cookie, desc: "Set-Cookie: session_id=xxx" },
      { label: "携带请求", icon: ArrowRight, desc: "浏览器自动附带Cookie" },
      {
        label: "验证Session",
        icon: ShieldCheck,
        desc: "服务器查询Session存储",
      },
      { label: "返回资源", icon: CheckCircle2, desc: "验证通过，返回数据" },
    ],
    jwt: [
      { label: "用户登录", icon: Users, desc: "发送凭证到服务器" },
      { label: "生成JWT", icon: FileKey, desc: "签名Header+Payload" },
      { label: "返回Token", icon: ArrowRight, desc: "客户端存储Token" },
      { label: "携带请求", icon: Globe, desc: "Authorization: Bearer xxx" },
      { label: "验证签名", icon: ShieldCheck, desc: "无需查库，本地验签" },
      { label: "返回资源", icon: CheckCircle2, desc: "签名有效，返回数据" },
    ],
    oauth: [
      { label: "点击授权", icon: Users, desc: "用户选择第三方登录" },
      { label: "跳转授权页", icon: Globe, desc: "重定向到授权服务器" },
      { label: "用户同意", icon: CheckCircle2, desc: "授权应用访问资源" },
      { label: "返回Code", icon: ArrowRight, desc: "重定向回应用，带code" },
      { label: "换取Token", icon: Key, desc: "用code换取access_token" },
      { label: "访问API", icon: ShieldCheck, desc: "携带token请求资源" },
    ],
  };

  const currentFlow = flows[type];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= currentFlow.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, [isPlaying, currentFlow.length]);

  return (
    <div className="bg-white rounded-2xl border-2 border-[var(--foreground)] shadow-[6px_6px_0px_0px_var(--foreground)] p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Workflow
            size={20}
            strokeWidth={2.5}
            className="text-[var(--accent)]"
          />
          <span className="font-['Outfit'] font-bold text-lg">
            {type === "session"
              ? "Session 认证流程"
              : type === "jwt"
                ? "JWT 认证流程"
                : "OAuth 2.0 授权码流程"}
          </span>
        </div>
        <button
          onClick={() => {
            setStep(0);
            setIsPlaying(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-full text-sm font-bold border-2 border-[var(--foreground)] shadow-[3px_3px_0px_0px_var(--foreground)] hover:shadow-[1px_1px_0px_0px_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          <RefreshCw size={14} strokeWidth={2.5} />
          播放流程
        </button>
      </div>

      <div className="space-y-3">
        {currentFlow.map((item, i) => {
          const IconComp = item.icon;
          const isActive = i <= step;
          const isCurrent = i === step;

          return (
            <div
              key={i}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-500 ${
                isActive
                  ? "border-[var(--accent)] bg-[var(--accent)]/5"
                  : "border-[var(--border)] bg-gray-50 opacity-50"
              } ${isCurrent ? "scale-[1.02] shadow-[4px_4px_0px_0px_var(--accent)]" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  isActive
                    ? "bg-[var(--accent)] border-[var(--foreground)] text-white"
                    : "bg-white border-[var(--border)] text-gray-400"
                }`}
              >
                {isActive && i < step ? (
                  <CheckCircle2 size={18} strokeWidth={2.5} />
                ) : (
                  <span className="text-sm font-bold">{i + 1}</span>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <IconComp
                    size={16}
                    strokeWidth={2.5}
                    className={
                      isActive ? "text-[var(--accent)]" : "text-gray-400"
                    }
                  />
                  <span
                    className={`font-['Outfit'] font-bold text-sm ${
                      isActive ? "text-[var(--foreground)]" : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <p
                  className={`text-xs mt-1 font-['Plus_Jakarta_Sans'] ${
                    isActive ? "text-[var(--foreground)]/70" : "text-gray-400"
                  }`}
                >
                  {item.desc}
                </p>
              </div>

              {isCurrent && (
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────── 对比表格组件 ──────────── */
function ComparisonTable() {
  const data = [
    {
      feature: "存储位置",
      session: "服务端（内存/Redis）",
      jwt: "客户端（localStorage/Cookie）",
    },
    {
      feature: "服务端状态",
      session: "✅ 有状态",
      jwt: "❌ 无状态",
    },
    {
      feature: "扩展性",
      session: "需共享Session存储",
      jwt: "天然支持分布式",
    },
    {
      feature: "性能",
      session: "每次请求查询存储",
      jwt: "本地验签，无需查库",
    },
    {
      feature: "安全性",
      session: "Cookie自动防护CSRF",
      jwt: "需手动防护XSS/CSRF",
    },
    {
      feature: "Token大小",
      session: "~20字节（session_id）",
      jwt: "~200-800字节",
    },
    {
      feature: "即时失效",
      session: "✅ 删除Session即可",
      jwt: "❌ 需等待过期或黑名单",
    },
    {
      feature: "跨域支持",
      session: "需配置CORS+Credentials",
      jwt: "天然支持",
    },
    {
      feature: "移动端适配",
      session: "Cookie限制",
      jwt: "Header传递，无限制",
    },
    {
      feature: "适用场景",
      session: "传统Web应用、高安全要求",
      jwt: "SPA、移动端、微服务",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        <div className="grid grid-cols-3 gap-0">
          {/* Header */}
          <div className="p-4 bg-[var(--foreground)] text-white font-['Outfit'] font-bold text-sm rounded-tl-xl">
            特性
          </div>
          <div className="p-4 bg-[var(--accent)] text-white font-['Outfit'] font-bold text-sm">
            Session
          </div>
          <div className="p-4 bg-[var(--secondary)] text-white font-['Outfit'] font-bold text-sm rounded-tr-xl">
            JWT
          </div>

          {/* Rows */}
          {data.map((row, i) => (
            <>
              <div
                key={`f-${i}`}
                className={`p-4 text-sm font-bold font-['Plus_Jakarta_Sans'] border-b border-r border-[var(--border)] ${
                  i % 2 === 0 ? "bg-[var(--card)]" : "bg-gray-50"
                }`}
              >
                {row.feature}
              </div>
              <div
                key={`s-${i}`}
                className={`p-4 text-sm font-['Plus_Jakarta_Sans'] border-b border-r border-[var(--border)] ${
                  i % 2 === 0 ? "bg-[var(--card)]" : "bg-gray-50"
                } ${i === data.length - 1 ? "rounded-bl-xl" : ""}`}
              >
                {row.session}
              </div>
              <div
                key={`j-${i}`}
                className={`p-4 text-sm font-['Plus_Jakarta_Sans'] border-b border-[var(--border)] ${
                  i % 2 === 0 ? "bg-[var(--card)]" : "bg-gray-50"
                } ${i === data.length - 1 ? "rounded-br-xl" : ""}`}
              >
                {row.jwt}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────── 主页面组件 ──────────── */
export default function AuthSystemPage() {
  const [activeTab, setActiveTab] = useState<"session" | "jwt" | "oauth">(
    "jwt",
  );

  return (
    <div className="min-h-screen bg-dot-grid">
      {/* ════════════ Hero 区域 ════════════ */}
      <section className="relative pt-20 pb-16 overflow-hidden container">
        {/* 装饰元素 */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-20 w-48 h-48 bg-[var(--secondary)]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--tertiary)]/5 rounded-full blur-3xl" />

        <div className="container relative z-10">
          {/* 标签 */}
          <div className="animate-pop inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-full text-sm font-bold border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] mb-8">
            <Shield size={16} strokeWidth={2.5} />
            前端架构核心
          </div>

          {/* 主标题 */}
          <h1
            className="animate-pop font-['Outfit'] text-5xl md:text-7xl font-extrabold text-[var(--foreground)] leading-[1.1] mb-6"
            style={{ animationDelay: "0.1s" }}
          >
            前端鉴权体系
            <span className="block text-[var(--accent)]">深度解析</span>
          </h1>

          {/* 副标题 - L1 直觉锚点 */}
          <div
            className="animate-pop max-w-3xl"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="text-xl md:text-2xl text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] leading-relaxed mb-8">
              <strong className="text-[var(--foreground)]">
                鉴权（Authentication）
              </strong>
              就像酒店的入住系统：你出示身份证（凭证），前台验证身份（鉴权），给你房卡（Token），之后你用房卡进出房间（访问资源）。
            </p>
          </div>

          {/* 核心概念卡片 */}
          <div
            className="animate-slide grid md:grid-cols-4 gap-4"
            style={{ animationDelay: "0.3s" }}
          >
            {[
              {
                icon: Lock,
                label: "Session",
                desc: "服务端记住你是谁",
                color: "accent" as const,
              },
              {
                icon: FileKey,
                label: "JWT",
                desc: "自证身份的通行证",
                color: "secondary" as const,
              },
              {
                icon: Globe,
                label: "OAuth 2.0",
                desc: "借别人的钥匙开门",
                color: "tertiary" as const,
              },
              {
                icon: Layers,
                label: "SSO",
                desc: "一把钥匙开所有门",
                color: "quaternary" as const,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="animate-slide topic-card bg-white p-6 rounded-2xl border-2 border-[var(--foreground)] shadow-[6px_6px_0px_0px_var(--foreground)] hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all cursor-default"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <IconBadge icon={item.icon} color={item.color} size="md" />
                <h3 className="font-['Outfit'] font-bold text-lg mt-4 mb-1">
                  {item.label}
                </h3>
                <p className="text-sm text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans']">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ L2: 为什么需要鉴权 ════════════ */}
      <section className="py-20">
        <div className="container">
          <div
            className="animate-slide flex items-center gap-3 mb-2"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="w-8 h-8 bg-[var(--secondary)] rounded-lg border-2 border-[var(--foreground)] flex items-center justify-center">
              <Lightbulb size={16} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider text-[var(--secondary)] font-['Outfit']">
              为什么需要鉴权
            </span>
          </div>
          <h2
            className="animate-slide font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[var(--foreground)] mb-12"
            style={{ animationDelay: "0.15s" }}
          >
            没有鉴权，互联网将是一片混乱
          </h2>

          {/* 痛点卡片 */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: XCircle,
                title: "身份冒充",
                desc: "任何人可以伪装成任何用户，发送任意请求。没有鉴权，任何人都能以你的名义转账、发消息、修改数据。",
                stat: "100%",
                statLabel: "无鉴权应用存在此风险",
                color: "secondary" as const,
              },
              {
                icon: AlertTriangle,
                title: "数据泄露",
                desc: "敏感数据（订单、个人信息、财务数据）对所有人可见。2023年全球数据泄露平均损失达445万美元。",
                stat: "$4.45M",
                statLabel: "2023平均数据泄露损失",
                color: "tertiary" as const,
              },
              {
                icon: Shield,
                title: "权限混乱",
                desc: "普通用户可以访问管理员功能，删除数据、修改配置。没有授权机制，所有用户权限相同。",
                stat: "68%",
                statLabel: "内部威胁导致的安全事件",
                color: "accent" as const,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="animate-slide topic-card bg-white rounded-2xl border-2 border-[var(--foreground)] shadow-[6px_6px_0px_0px_var(--foreground)] overflow-hidden"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <div
                  className="h-2"
                  style={{ backgroundColor: `var(--${item.color})` }}
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <item.icon
                      size={24}
                      strokeWidth={2.5}
                      style={{ color: `var(--${item.color})` }}
                    />
                    <h3 className="font-['Outfit'] font-bold text-lg">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: `color-mix(in srgb, var(--${item.color}) 10%, transparent)`,
                      borderColor: `color-mix(in srgb, var(--${item.color}) 30%, transparent)`,
                      borderWidth: 1,
                      borderStyle: "solid",
                    }}
                  >
                    <div
                      className="text-3xl font-['Outfit'] font-extrabold"
                      style={{ color: `var(--${item.color})` }}
                    >
                      {item.stat}
                    </div>
                    <div className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
                      {item.statLabel}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 认证 vs 授权 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="animate-slide bg-[var(--accent)]/5 rounded-2xl border-2 border-[var(--accent)] p-6 shadow-[4px_4px_0px_0px_var(--accent)]"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Fingerprint
                  size={28}
                  strokeWidth={2.5}
                  className="text-[var(--accent)]"
                />
                <div>
                  <h3 className="font-['Outfit'] font-bold text-xl text-[var(--accent)]">
                    认证 Authentication
                  </h3>
                  <p className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
                    你是谁？→ 验证身份
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-[var(--accent)] mt-0.5 flex-shrink-0"
                  />
                  <span>用户名 + 密码验证</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-[var(--accent)] mt-0.5 flex-shrink-0"
                  />
                  <span>手机验证码</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-[var(--accent)] mt-0.5 flex-shrink-0"
                  />
                  <span>生物识别（指纹、人脸）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-[var(--accent)] mt-0.5 flex-shrink-0"
                  />
                  <span>第三方 OAuth 登录</span>
                </li>
              </ul>
            </div>

            <div
              className="animate-slide bg-[var(--quaternary)]/5 rounded-2xl border-2 border-[var(--quaternary)] p-6 shadow-[4px_4px_0px_0px_var(--quaternary)]"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Key
                  size={28}
                  strokeWidth={2.5}
                  className="text-[var(--quaternary)]"
                />
                <div>
                  <h3 className="font-['Outfit'] font-bold text-xl text-[var(--quaternary)]">
                    授权 Authorization
                  </h3>
                  <p className="text-xs text-[var(--foreground)]/50 font-['Plus_Jakarta_Sans']">
                    你能做什么？→ 分配权限
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-[var(--quaternary)] mt-0.5 flex-shrink-0"
                  />
                  <span>角色权限控制（RBAC）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-[var(--quaternary)] mt-0.5 flex-shrink-0"
                  />
                  <span>资源级别访问控制</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-[var(--quaternary)] mt-0.5 flex-shrink-0"
                  />
                  <span>API 权限范围（Scope）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-[var(--quaternary)] mt-0.5 flex-shrink-0"
                  />
                  <span>数据行级权限</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ L3: 核心原理详解 ════════════ */}
      <section className="py-20 bg-[var(--foreground)]/[0.02]">
        <div className="container">
          <div className="animate-slide flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-lg border-2 border-[var(--foreground)] flex items-center justify-center">
              <Code2 size={16} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider text-[var(--accent)] font-['Outfit']">
              核心原理
            </span>
          </div>
          <h2 className="animate-slide font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[var(--foreground)] mb-4">
            四大鉴权方案深度拆解
          </h2>
          <p className="animate-slide text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-12 max-w-2xl">
            从传统的 Session 到现代的 JWT，从第三方授权 OAuth 2.0 到企业级
            SSO，理解每种方案的本质差异。
          </p>

          {/* Tab 切换 */}
          <div className="animate-slide flex flex-wrap gap-3 mb-8">
            {[
              {
                key: "session" as const,
                label: "Session 认证",
                icon: Database,
              },
              { key: "jwt" as const, label: "JWT 认证", icon: FileKey },
              { key: "oauth" as const, label: "OAuth 2.0", icon: Globe },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-['Outfit'] font-bold text-sm transition-all ${
                  activeTab === tab.key
                    ? "bg-[var(--accent)] text-white border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)]"
                    : "bg-white text-[var(--foreground)] border-[var(--border)] hover:border-[var(--foreground)] shadow-[2px_2px_0px_0px_var(--border)]"
                }`}
              >
                <tab.icon size={18} strokeWidth={2.5} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Session 详解 */}
          {activeTab === "session" && (
            <div className="space-y-8">
              <AuthFlowDiagram type="session" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-['Outfit'] font-bold text-xl flex items-center gap-2">
                    <Server
                      size={20}
                      strokeWidth={2.5}
                      className="text-[var(--accent)]"
                    />
                    Session 工作原理
                  </h3>
                  <div className="bg-white rounded-2xl border-2 border-[var(--foreground)] p-6 shadow-[4px_4px_0px_0px_var(--foreground)]">
                    <div className="space-y-4 text-sm font-['Plus_Jakarta_Sans'] text-[var(--foreground)]/80">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[var(--accent)] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          1
                        </div>
                        <div>
                          <strong>客户端发送登录请求</strong>：用户名和密码通过
                          HTTPS 发送到服务器
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[var(--accent)] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          2
                        </div>
                        <div>
                          <strong>服务端创建 Session</strong>
                          ：验证凭证后，在内存/Redis 中存储用户信息，生成唯一的{" "}
                          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                            session_id
                          </code>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[var(--accent)] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          3
                        </div>
                        <div>
                          <strong>Set-Cookie 返回</strong>：服务端通过{" "}
                          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                            Set-Cookie
                          </code>{" "}
                          头将 session_id 写入浏览器
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[var(--accent)] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          4
                        </div>
                        <div>
                          <strong>自动携带 Cookie</strong>
                          ：后续请求浏览器自动附带 Cookie，服务端通过 session_id
                          查询用户状态
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-['Outfit'] font-bold text-xl flex items-center gap-2">
                    <Settings
                      size={20}
                      strokeWidth={2.5}
                      className="text-[var(--secondary)]"
                    />
                    Express Session 配置
                  </h3>
                  <CodeBlock
                    title="server.ts"
                    language="typescript"
                    showLineNumbers
                    code={`import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

const app = express();
const redisClient = createClient({
  url: 'redis://localhost:6379'
});

// Redis 作为 Session 存储（支持分布式）
const store = new RedisStore({ client: redisClient });

app.use(session({
  store,                              // ← 使用 Redis 替代内存
  secret: 'your-session-secret',      // ← 签名密钥
  name: 'sid',                        // ← Cookie 名称（避免默认的 connect.sid）
  resave: false,                      // ← 避免无修改时重新保存
  saveUninitialized: false,           // ← 不保存未初始化的 session
  cookie: {
    httpOnly: true,                   // ← JS 无法读取，防 XSS
    secure: true,                     // ← 仅 HTTPS 传输
    sameSite: 'lax',                  // ← CSRF 防护
    maxAge: 24 * 60 * 60 * 1000,     // ← 24小时过期
    domain: '.example.com',          // ← 共享域名
  }
}));

// 登录接口
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await verifyUser(username, password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // 写入 session
  req.session.userId = user.id;       // ← 存储用户ID
  req.session.role = user.role;       // ← 存储用户角色
  
  res.json({ message: 'Login successful' });
});

// 鉴权中间件
function requireAuth(req, res, next) {
  if (!req.session.userId) {          // ← 检查 session
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// 获取当前用户
app.get('/api/me', requireAuth, (req, res) => {
  res.json({ userId: req.session.userId });
});

// 登出
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {      // ← 销毁 session
    res.clearCookie('sid');
    res.json({ message: 'Logged out' });
  });
});`}
                  />
                </div>
              </div>

              <WarningCard title="Session 集群陷阱" type="warning">
                <p className="mb-2">
                  <strong>问题</strong>：默认的{" "}
                  <code className="bg-gray-100 px-1 rounded">MemoryStore</code>{" "}
                  无法跨进程共享。 当你用 PM2 启动 4
                  个进程或部署多个容器时，用户的请求可能被路由到没有其 Session
                  的进程。
                </p>
                <p>
                  <strong>解决方案</strong>：使用 <strong>Redis</strong> 或{" "}
                  <strong>Memcached</strong> 作为集中式 Session 存储。 在
                  Next.js 中，推荐使用{" "}
                  <code className="bg-gray-100 px-1 rounded">iron-session</code>{" "}
                  库，它将 Session 加密存储在 Cookie 中，无需服务端存储。
                </p>
              </WarningCard>
            </div>
          )}

          {/* JWT 详解 */}
          {activeTab === "jwt" && (
            <div className="space-y-8">
              <AuthFlowDiagram type="jwt" />

              {/* JWT 交互式解析器 */}
              <div>
                <h3 className="font-['Outfit'] font-bold text-xl flex items-center gap-2 mb-6">
                  <Sparkles
                    size={20}
                    strokeWidth={2.5}
                    className="text-[var(--tertiary)]"
                  />
                  JWT 交互式解析器
                  <span className="text-xs bg-[var(--tertiary)] text-[var(--foreground)] px-2 py-0.5 rounded-full font-bold">
                    动手试试
                  </span>
                </h3>
                <JWTPlayground />
              </div>

              {/* JWT 结构详解 */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[var(--accent)]/5 rounded-2xl border-2 border-[var(--accent)] p-6 shadow-[4px_4px_0px_0px_var(--accent)]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 bg-[var(--accent)] rounded" />
                    <h4 className="font-['Outfit'] font-bold">
                      Header（头部）
                    </h4>
                  </div>
                  <p className="text-sm text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] mb-4">
                    声明 Token 的类型和签名算法。固定为 JWT，常用 HS256 或
                    RS256。
                  </p>
                  <CodeBlock
                    code={`{
  "alg": "HS256",  // ← 签名算法
  "typ": "JWT"     // ← Token 类型
}`}
                    language="json"
                  />
                </div>

                <div className="bg-[var(--secondary)]/5 rounded-2xl border-2 border-[var(--secondary)] p-6 shadow-[4px_4px_0px_0px_var(--secondary)]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 bg-[var(--secondary)] rounded" />
                    <h4 className="font-['Outfit'] font-bold">
                      Payload（载荷）
                    </h4>
                  </div>
                  <p className="text-sm text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] mb-4">
                    存放用户信息和声明。注意：
                    <strong>仅 Base64 编码，未加密</strong>，切勿存放敏感数据！
                  </p>
                  <CodeBlock
                    code={`{
  "sub": "user-123",    // ← 用户ID（Subject）
  "name": "张三",       // ← 用户名
  "role": "admin",     // ← 角色
  "iat": 1719312000,   // ← 签发时间
  "exp": 1719398400    // ← 过期时间
}`}
                    language="json"
                  />
                </div>

                <div className="bg-[var(--quaternary)]/5 rounded-2xl border-2 border-[var(--quaternary)] p-6 shadow-[4px_4px_0px_0px_var(--quaternary)]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 bg-[var(--quaternary)] rounded" />
                    <h4 className="font-['Outfit'] font-bold">
                      Signature（签名）
                    </h4>
                  </div>
                  <p className="text-sm text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] mb-4">
                    使用密钥对 Header 和 Payload 进行签名。用于
                    <strong>验证数据完整性</strong>，防篡改。
                  </p>
                  <CodeBlock
                    code={`HMACSHA256(
  base64UrlEncode(header) +
  "." +
  base64UrlEncode(payload),
  secret  // ← 只有服务端知道
)`}
                    language="javascript"
                  />
                </div>
              </div>

              {/* JWT 代码实现 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-['Outfit'] font-bold text-xl flex items-center gap-2 mb-4">
                    <Server
                      size={20}
                      strokeWidth={2.5}
                      className="text-[var(--accent)]"
                    />
                    服务端：生成与验证 JWT
                  </h3>
                  <CodeBlock
                    title="auth/jwt.ts"
                    language="typescript"
                    showLineNumbers
                    code={`import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;     // ← 256位随机密钥
const ACCESS_EXPIRES = '15m';              // ← 短期访问令牌
const REFRESH_EXPIRES = '7d';              // ← 长期刷新令牌

interface TokenPayload {
  sub: string;   // 用户ID
  role: string;  // 用户角色
}

// 生成 Token 对
export function generateTokens(user: TokenPayload) {
  const accessToken = jwt.sign(
    {
      sub: user.sub,
      role: user.role,
      type: 'access'
    },
    SECRET,
    { expiresIn: ACCESS_EXPIRES }         // ← 15分钟过期
  );

  const refreshToken = jwt.sign(
    {
      sub: user.sub,
      type: 'refresh'
    },
    SECRET,
    { expiresIn: REFRESH_EXPIRES }        // ← 7天过期
  );

  return { accessToken, refreshToken };   // ← 返回双 Token
}

// 验证 Token
export function verifyToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, SECRET) as any;
    
    if (decoded.type !== 'access') {      // ← 检查 Token 类型
      throw new Error('Invalid token type');
    }
    
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');   // ← Token 已过期
    }
    throw new Error('Invalid token');     // ← Token 无效
  }
}`}
                  />
                </div>

                <div>
                  <h3 className="font-['Outfit'] font-bold text-xl flex items-center gap-2 mb-4">
                    <Globe
                      size={20}
                      strokeWidth={2.5}
                      className="text-[var(--secondary)]"
                    />
                    客户端：存储与自动刷新
                  </h3>
                  <CodeBlock
                    title="lib/auth-client.ts"
                    language="typescript"
                    showLineNumbers
                    code={`const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Token 存储策略
const tokenStorage = {
  // Access Token 存内存（最安全，防 XSS）
  _accessToken: null as string | null,
  
  getAccessToken() {
    return this._accessToken;
  },
  
  setAccessToken(token: string) {
    this._accessToken = token;
  },
  
  // Refresh Token 存 httpOnly Cookie（服务端设置）
  // 或 localStorage（次优选择）
};

// 带自动刷新的请求封装
export async function fetchWithAuth(
  url: string, 
  options: RequestInit = {}
) {
  let token = tokenStorage.getAccessToken();
  
  const response = await fetch(\`\${API_URL}\${url}\`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: \`Bearer \${token}\`,  // ← 携带 Token
    },
  });
  
  // Token 过期，尝试刷新
  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    
    if (newToken) {
      tokenStorage.setAccessToken(newToken);
      
      // 用新 Token 重试请求
      return fetch(\`\${API_URL}\${url}\`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: \`Bearer \${newToken}\`,
        },
      });
    }
  }
  
  return response;
}

// 刷新 Access Token
async function refreshAccessToken(): Promise<string | null> {
  const response = await fetch(\`\${API_URL}/auth/refresh\`, {
    method: 'POST',
    credentials: 'include',             // ← 携带 Cookie（refresh token）
  });
  
  if (response.ok) {
    const { accessToken } = await response.json();
    return accessToken;
  }
  
  // 刷新失败，跳转登录
  window.location.href = '/login';
  return null;
}`}
                  />
                </div>
              </div>

              <WarningCard title="JWT 安全陷阱" type="danger">
                <ul className="space-y-2 list-none">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] font-bold">
                      🚫
                    </span>
                    <span>
                      <strong>永远不要在 Payload 存密码或敏感信息</strong>：JWT
                      仅是 Base64 编码，任何人可以解码查看内容
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] font-bold">
                      🚫
                    </span>
                    <span>
                      <strong>
                        不要用{" "}
                        <code className="bg-gray-100 px-1 rounded">none</code>{" "}
                        算法
                      </strong>
                      ：某些库允许{" "}
                      <code className="bg-gray-100 px-1 rounded">
                        {"{ alg: 'none' }"}
                      </code>{" "}
                      跳过验证，务必在服务端白名单允许的算法
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] font-bold">
                      🚫
                    </span>
                    <span>
                      <strong>Access Token 生命周期要短</strong>：推荐 15-30
                      分钟，配合 Refresh Token 实现无感刷新
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] font-bold">
                      🚫
                    </span>
                    <span>
                      <strong>不要存 localStorage（高安全场景）</strong>：易受
                      XSS 攻击，推荐存内存变量 + Refresh Token 存 httpOnly
                      Cookie
                    </span>
                  </li>
                </ul>
              </WarningCard>
            </div>
          )}

          {/* OAuth 2.0 详解 */}
          {activeTab === "oauth" && (
            <div className="space-y-8">
              <AuthFlowDiagram type="oauth" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-['Outfit'] font-bold text-xl flex items-center gap-2">
                    <Globe
                      size={20}
                      strokeWidth={2.5}
                      className="text-[var(--accent)]"
                    />
                    OAuth 2.0 核心概念
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Resource Owner",
                        desc: "资源所有者（用户本人）",
                        icon: Users,
                      },
                      {
                        label: "Client",
                        desc: "第三方应用（你的网站/App）",
                        icon: Code2,
                      },
                      {
                        label: "Authorization Server",
                        desc: "授权服务器（如 GitHub、Google）",
                        icon: Server,
                      },
                      {
                        label: "Resource Server",
                        desc: "资源服务器（存储用户数据的API）",
                        icon: Database,
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 bg-white rounded-xl border-2 border-[var(--border)] hover:border-[var(--foreground)] transition-all"
                      >
                        <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-lg border-2 border-[var(--accent)] flex items-center justify-center flex-shrink-0">
                          <item.icon
                            size={18}
                            strokeWidth={2.5}
                            className="text-[var(--accent)]"
                          />
                        </div>
                        <div>
                          <div className="font-['Outfit'] font-bold text-sm">
                            {item.label}
                          </div>
                          <div className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans']">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-['Outfit'] font-bold text-xl flex items-center gap-2 mb-4">
                    <Key
                      size={20}
                      strokeWidth={2.5}
                      className="text-[var(--tertiary)]"
                    />
                    NextAuth.js 集成示例
                  </h3>
                  <CodeBlock
                    title="app/api/auth/[...nextauth]/route.ts"
                    language="typescript"
                    showLineNumbers
                    code={`import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    // GitHub OAuth 2.0
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: 'read:user user:email',  // ← 请求的权限范围
        },
      },
    }),
    
    // Google OAuth 2.0
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    
    // 账号密码（作为备选）
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(
          \`\${process.env.API_URL}/auth/login\`,
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' }
          }
        );
        const user = await res.json();
        
        if (res.ok && user) {
          return user;                    // ← 返回用户对象
        }
        return null;
      }
    }),
  ],
  
  callbacks: {
    // 自定义 JWT 内容
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;  // ← 添加自定义字段
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    
    // 自定义 session 内容
    async session({ session, token }) {
      (session.user as any).id = token.id;
      (session.user as any).role = token.role;
      return session;
    },
  },
  
  pages: {
    signIn: '/login',                     // ← 自定义登录页
    error: '/auth/error',                 // ← 错误页面
  },
  
  session: {
    strategy: 'jwt',                      // ← 使用 JWT 策略
    maxAge: 30 * 24 * 60 * 60,           // ← 30天过期
  },
});

export { handler as GET, handler as POST };`}
                  />
                </div>
              </div>

              {/* OAuth 授权类型 */}
              <div>
                <h3 className="font-['Outfit'] font-bold text-xl flex items-center gap-2 mb-6">
                  <GitBranch
                    size={20}
                    strokeWidth={2.5}
                    className="text-[var(--accent)]"
                  />
                  OAuth 2.0 授权类型对比
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "授权码模式（Authorization Code）",
                      desc: "最安全的模式，适用于有后端的 Web 应用。先获取授权码，再用码换 Token。",
                      security: "高",
                      useCase: "传统 Web 应用、企业应用",
                      color: "quaternary" as const,
                    },
                    {
                      name: "授权码 + PKCE",
                      desc: "授权码模式的安全增强版，适用于无法安全存储密钥的公开客户端（SPA、移动端）。",
                      security: "高",
                      useCase: "SPA、移动端、桌面应用",
                      color: "accent" as const,
                    },
                    {
                      name: "客户端凭证模式（Client Credentials）",
                      desc: "机器对机器通信，无用户参与。适用于后端服务间调用 API。",
                      security: "中",
                      useCase: "微服务间通信、后台任务",
                      color: "tertiary" as const,
                    },
                    {
                      name: "隐式模式（Implicit）⚠️ 已废弃",
                      desc: "直接返回 Token 给前端，无授权码中间步骤。安全性低，已被 PKCE 模式取代。",
                      security: "低",
                      useCase: "不推荐使用",
                      color: "secondary" as const,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl border-2"
                      style={{
                        borderColor: `var(--${item.color})`,
                        backgroundColor: `color-mix(in srgb, var(--${item.color}) 5%, transparent)`,
                        boxShadow: `4px 4px 0px 0px var(--${item.color})`,
                      }}
                    >
                      <h4 className="font-['Outfit'] font-bold text-sm mb-2">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[var(--foreground)]/70 font-['Plus_Jakarta_Sans'] mb-3">
                        {item.desc}
                      </p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="px-2 py-1 bg-[var(--foreground)]/10 rounded-full font-bold">
                          安全性: {item.security}
                        </span>
                        <span className="text-[var(--foreground)]/50">
                          {item.useCase}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ════════════ Session vs JWT 对比 ════════════ */}
      <section className="py-20">
        <div className="container">
          <div className="animate-slide flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[var(--tertiary)] rounded-lg border-2 border-[var(--foreground)] flex items-center justify-center">
              <Timer
                size={16}
                strokeWidth={2.5}
                className="text-[var(--foreground)]"
              />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider text-[var(--tertiary)] font-['Outfit']">
              方案对比
            </span>
          </div>
          <h2 className="animate-slide font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[var(--foreground)] mb-12">
            Session vs JWT 全维度对比
          </h2>

          <div className="animate-slide bg-white rounded-2xl border-2 border-[var(--foreground)] shadow-[8px_8px_0px_0px_var(--foreground)] overflow-hidden">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* ════════════ L4: 前端实现最佳实践 ════════════ */}
      <section className="py-20 bg-[var(--foreground)]/[0.02]">
        <div className="container">
          <div className="animate-slide flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[var(--quaternary)] rounded-lg border-2 border-[var(--foreground)] flex items-center justify-center">
              <Zap size={16} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider text-[var(--quaternary)] font-['Outfit']">
              代码实战
            </span>
          </div>
          <h2 className="animate-slide font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[var(--foreground)] mb-4">
            Next.js 全栈鉴权实现
          </h2>
          <p className="animate-slide text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-12 max-w-2xl">
            从登录页到受保护路由，从中间件到 API 鉴权，一套完整的生产级实现。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* 登录页 */}
            <div>
              <h3 className="font-['Outfit'] font-bold text-xl flex items-center gap-2 mb-4">
                <Lock
                  size={20}
                  strokeWidth={2.5}
                  className="text-[var(--accent)]"
                />
                登录页面组件
              </h3>
              <CodeBlock
                title="app/login/page.tsx"
                language="tsx"
                showLineNumbers
                code={`'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 账号密码登录
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,                  // ← 不自动跳转
    });

    if (result?.error) {
      setError('邮箱或密码错误');         // ← 显示错误
      setIsLoading(false);
    } else {
      router.push('/dashboard');         // ← 跳转到仪表盘
      router.refresh();                  // ← 刷新服务端组件
    }
  }

  // 第三方登录
  async function handleOAuthLogin(provider: string) {
    setIsLoading(true);
    await signIn(provider, { 
      callbackUrl: '/dashboard'          // ← 登录成功后跳转
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl 
                      border-2 border-[var(--foreground)] 
                      shadow-[8px_8px_0px_0px_var(--foreground)]">
        <h1 className="text-3xl font-['Outfit'] font-extrabold mb-8">
          登录
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-2 border-red-300 
                          rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}

        {/* 第三方登录按钮 */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleOAuthLogin('github')}
            disabled={isLoading}
            className="w-full py-3 bg-[var(--foreground)] text-white 
                       rounded-xl font-bold border-2 border-[var(--foreground)]
                       shadow-[4px_4px_0px_0px_var(--border)]
                       hover:shadow-[2px_2px_0px_0px_var(--border)]
                       hover:translate-x-[2px] hover:translate-y-[2px]
                       transition-all flex items-center justify-center gap-2"
          >
            <GitHubIcon /> 使用 GitHub 登录
          </button>
          
          <button
            onClick={() => handleOAuthLogin('google')}
            disabled={isLoading}
            className="w-full py-3 bg-white text-[var(--foreground)] 
                       rounded-xl font-bold border-2 border-[var(--foreground)]
                       shadow-[4px_4px_0px_0px_var(--foreground)]
                       hover:shadow-[2px_2px_0px_0px_var(--foreground)]
                       hover:translate-x-[2px] hover:translate-y-[2px]
                       transition-all flex items-center justify-center gap-2"
          >
            <GoogleIcon /> 使用 Google 登录
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-[var(--border)]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-[var(--foreground)]/50">
              或使用邮箱登录
            </span>
          </div>
        </div>

        {/* 邮箱密码表单 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">邮箱</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 border-2 border-[var(--foreground)] 
                         rounded-xl focus:outline-none focus:border-[var(--accent)]
                         shadow-[2px_2px_0px_0px_var(--border)]"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">密码</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 border-2 border-[var(--foreground)] 
                         rounded-xl focus:outline-none focus:border-[var(--accent)]
                         shadow-[2px_2px_0px_0px_var(--border)]"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[var(--accent)] text-white 
                       rounded-xl font-bold border-2 border-[var(--foreground)]
                       shadow-[4px_4px_0px_0px_var(--foreground)]
                       hover:shadow-[2px_2px_0px_0px_var(--foreground)]
                       hover:translate-x-[2px] hover:translate-y-[2px]
                       transition-all"
          >
            {isLoading ? '登录中...' : '登录'}
          </button>
        </form>
      </div>
    </div>
  );
}`}
              />
            </div>

            {/* Auth Hook */}
            <div>
              <h3 className="font-['Outfit'] font-bold text-xl flex items-center gap-2 mb-4">
                <Fingerprint
                  size={20}
                  strokeWidth={2.5}
                  className="text-[var(--secondary)]"
                />
                自定义鉴权 Hook
              </h3>
              <CodeBlock
                title="hooks/useAuth.ts"
                language="typescript"
                showLineNumbers
                code={`'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'moderator';
  image?: string;
}

export function useAuth(options?: {
  required?: boolean;              // ← 是否强制要求登录
  redirectTo?: string;             // ← 未登录时跳转地址
  allowedRoles?: string[];         // ← 允许的角色
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  const user = session?.user as AuthUser | undefined;

  // 检查角色权限
  const hasRequiredRole = options?.allowedRoles
    ? options.allowedRoles.includes(user?.role ?? '')
    : true;

  // 未登录时重定向
  useEffect(() => {
    if (isLoading) return;
    
    if (options?.required && !isAuthenticated) {
      router.push(options.redirectTo ?? '/login');
    }
    
    if (isAuthenticated && !hasRequiredRole) {
      router.push('/unauthorized');        // ← 无权限页面
    }
  }, [isLoading, isAuthenticated, hasRequiredRole]);

  // 登出
  const logout = async () => {
    await signOut({ 
      redirect: true, 
      callbackUrl: '/login' 
    });
  };

  // 获取当前用户ID（用于 SWR/React Query 的 key）
  const userId = user?.id;

  return {
    user,                                // ← 用户信息
    isLoading,                           // ← 加载状态
    isAuthenticated,                     // ← 是否已登录
    hasRequiredRole,                     // ← 是否有权限
    logout,                              // ← 登出函数
    userId,                              // ← 用户ID
  };
}

// 使用示例
function DashboardPage() {
  const { user, isLoading, logout } = useAuth({
    required: true,                      // ← 强制登录
    redirectTo: '/login',
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// 管理员页面
function AdminPage() {
  const { user, hasRequiredRole } = useAuth({
    required: true,
    allowedRoles: ['admin'],             // ← 只允许管理员
  });

  if (!hasRequiredRole) {
    return <AccessDenied />;
  }

  return <AdminPanel />;
}`}
              />
            </div>
          </div>

          {/* Next.js 中间件鉴权 */}
          <div className="mt-8">
            <h3 className="font-['Outfit'] font-bold text-xl flex items-center gap-2 mb-4">
              <Shield
                size={20}
                strokeWidth={2.5}
                className="text-[var(--quaternary)]"
              />
              Next.js 中间件路由保护
            </h3>
            <CodeBlock
              title="middleware.ts"
              language="typescript"
              showLineNumbers
              code={`import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// 需要登录的路由
const protectedRoutes = ['/dashboard', '/profile', '/settings'];

// 需要管理员权限的路由
const adminRoutes = ['/admin'];

// 公开路由（已登录用户不应访问）
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 获取 JWT Token（无需触发完整的 session 流程）
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const isAdmin = token?.role === 'admin';

  // 检查是否为受保护路由
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // 检查是否为管理员路由
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // 检查是否为认证路由（登录/注册）
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // 未登录用户访问受保护路由 → 重定向到登录页
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);  // ← 记录来源页
    return NextResponse.redirect(loginUrl);
  }

  // 非管理员访问管理员路由 → 重定向到无权限页
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // 已登录用户访问登录页 → 重定向到仪表盘
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 添加安全头
  const response = NextResponse.next();
  
  response.headers.set(
    'X-Frame-Options', 'DENY'
  );
  response.headers.set(
    'X-Content-Type-Options', 'nosniff'
  );
  response.headers.set(
    'Referrer-Policy', 'origin-when-cross-origin'
  );
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};`}
            />
          </div>
        </div>
      </section>

      {/* ════════════ L5: 工程全景 ════════════ */}
      <section className="py-20">
        <div className="container">
          <div className="animate-slide flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-lg border-2 border-[var(--foreground)] flex items-center justify-center">
              <BookOpen size={16} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider text-[var(--accent)] font-['Outfit']">
              工程全景
            </span>
          </div>
          <h2 className="animate-slide font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[var(--foreground)] mb-12">
            生产级安全防护清单
          </h2>

          {/* 安全防护 Bento Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {/* XSS 防护 */}
            <div className="md:col-span-2 bg-white rounded-2xl border-2 border-[var(--foreground)] shadow-[6px_6px_0px_0px_var(--foreground)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconBadge icon={ShieldAlert} color="secondary" />
                <div>
                  <h3 className="font-['Outfit'] font-bold text-lg">
                    XSS 防护
                  </h3>
                  <p className="text-xs text-[var(--foreground)]/50">
                    跨站脚本攻击
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm font-['Plus_Jakarta_Sans']">
                <div className="flex items-start gap-2">
                  <span className="text-[var(--secondary)]">•</span>
                  <span>
                    Token <strong>不要存 localStorage</strong>，改用内存变量 +
                    httpOnly Cookie
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--secondary)]">•</span>
                  <span>
                    使用{" "}
                    <code className="bg-gray-100 px-1 rounded">DOMPurify</code>{" "}
                    过滤用户输入的 HTML
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--secondary)]">•</span>
                  <span>
                    设置{" "}
                    <code className="bg-gray-100 px-1 rounded">
                      Content-Security-Policy
                    </code>{" "}
                    响应头
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--secondary)]">•</span>
                  <span>
                    Cookie 设置{" "}
                    <code className="bg-gray-100 px-1 rounded">
                      httpOnly: true
                    </code>
                  </span>
                </div>
              </div>
            </div>

            {/* CSRF 防护 */}
            <div className="md:col-span-2 bg-white rounded-2xl border-2 border-[var(--foreground)] shadow-[6px_6px_0px_0px_var(--foreground)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconBadge icon={Shield} color="tertiary" />
                <div>
                  <h3 className="font-['Outfit'] font-bold text-lg">
                    CSRF 防护
                  </h3>
                  <p className="text-xs text-[var(--foreground)]/50">
                    跨站请求伪造
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm font-['Plus_Jakarta_Sans']">
                <div className="flex items-start gap-2">
                  <span className="text-[var(--tertiary)]">•</span>
                  <span>
                    Cookie 设置{" "}
                    <code className="bg-gray-100 px-1 rounded">
                      sameSite: 'lax'
                    </code>{" "}
                    或{" "}
                    <code className="bg-gray-100 px-1 rounded">'strict'</code>
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--tertiary)]">•</span>
                  <span>
                    关键操作使用 <strong>CSRF Token</strong> 验证
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--tertiary)]">•</span>
                  <span>
                    JWT 方案天然免疫 CSRF（Token 存内存/手动添加 Header）
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--tertiary)]">•</span>
                  <span>
                    验证{" "}
                    <code className="bg-gray-100 px-1 rounded">Origin</code> 和{" "}
                    <code className="bg-gray-100 px-1 rounded">Referer</code> 头
                  </span>
                </div>
              </div>
            </div>

            {/* Token 刷新策略 */}
            <div className="md:col-span-2 bg-[var(--accent)]/5 rounded-2xl border-2 border-[var(--accent)] shadow-[6px_6px_0px_0px_var(--accent)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconBadge icon={RefreshCw} color="accent" />
                <div>
                  <h3 className="font-['Outfit'] font-bold text-lg">
                    Token 无感刷新
                  </h3>
                  <p className="text-xs text-[var(--foreground)]/50">
                    双 Token 架构
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm font-['Plus_Jakarta_Sans']">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-3 border border-[var(--border)]">
                    <div className="text-xs text-[var(--foreground)]/50 mb-1">
                      Access Token
                    </div>
                    <div className="font-bold text-[var(--accent)]">
                      15-30 分钟
                    </div>
                    <div className="text-xs text-[var(--foreground)]/50">
                      存内存，每次请求携带
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-[var(--border)]">
                    <div className="text-xs text-[var(--foreground)]/50 mb-1">
                      Refresh Token
                    </div>
                    <div className="font-bold text-[var(--quaternary)]">
                      7-30 天
                    </div>
                    <div className="text-xs text-[var(--foreground)]/50">
                      存 httpOnly Cookie
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[var(--foreground)]/60 mt-2">
                  Access Token 过期时，自动用 Refresh Token 获取新的 Access
                  Token，用户无感知。
                </p>
              </div>
            </div>

            {/* HTTPS */}
            <div className="bg-[var(--quaternary)]/10 rounded-2xl border-2 border-[var(--quaternary)] shadow-[4px_4px_0px_0px_var(--quaternary)] p-6">
              <IconBadge icon={Lock} color="quaternary" size="sm" />
              <h4 className="font-['Outfit'] font-bold mt-3 mb-2">
                强制 HTTPS
              </h4>
              <p className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans']">
                所有认证接口必须使用 HTTPS，防止中间人攻击截获 Token。
              </p>
            </div>

            {/* 密钥管理 */}
            <div className="bg-[var(--tertiary)]/10 rounded-2xl border-2 border-[var(--tertiary)] shadow-[4px_4px_0px_0px_var(--tertiary)] p-6">
              <IconBadge icon={Key} color="tertiary" size="sm" />
              <h4 className="font-['Outfit'] font-bold mt-3 mb-2">密钥管理</h4>
              <p className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans']">
                JWT Secret 至少 256 位，使用环境变量存储，定期轮换。推荐使用
                RS256 非对称加密。
              </p>
            </div>

            {/* 速率限制 */}
            <div className="bg-white rounded-2xl border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] p-6">
              <IconBadge icon={Zap} color="accent" size="sm" />
              <h4 className="font-['Outfit'] font-bold mt-3 mb-2">登录限流</h4>
              <p className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans']">
                限制登录尝试次数（如 5次/15分钟），防止暴力破解。使用 Redis
                记录尝试次数。
              </p>
            </div>

            {/* 日志审计 */}
            <div className="bg-white rounded-2xl border-2 border-[var(--foreground)] shadow-[4px_4px_0px_0px_var(--foreground)] p-6">
              <IconBadge icon={Eye} color="secondary" size="sm" />
              <h4 className="font-['Outfit'] font-bold mt-3 mb-2">审计日志</h4>
              <p className="text-xs text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans']">
                记录所有认证事件：登录、登出、Token
                刷新、权限变更。便于安全审计和异常检测。
              </p>
            </div>
          </div>

          {/* Cookie 安全配置 */}
          <div>
            <h3 className="font-['Outfit'] font-bold text-xl flex items-center gap-2 mb-6">
              <Cookie
                size={20}
                strokeWidth={2.5}
                className="text-[var(--accent)]"
              />
              Cookie 安全配置速查
            </h3>
            <CodeBlock
              title="cookie-security.ts"
              language="typescript"
              showLineNumbers
              code={`// 生产环境 Cookie 完整配置
const secureCookieOptions = {
  name: '__Host-auth-token',       // ← 使用 __Host- 前缀（最严格）
  value: token,
  httpOnly: true,                  // ← JS 无法读取，防 XSS
  secure: true,                    // ← 仅 HTTPS 传输
  sameSite: 'lax',                 // ← 防 CSRF（strict 最严格）
  maxAge: 60 * 60 * 24 * 7,       // ← 7天过期
  path: '/',                       // ← 全站有效
  // domain: '.example.com',       // ← __Host- 前缀不能设置 domain
};

// __Host- 前缀的规则（浏览器强制执行）：
// 1. 必须设置 secure: true
// 2. 必须设置 path: '/'
// 3. 不能设置 domain
// 4. 这些规则由浏览器强制执行，非 JS 可绕过

// __Secure- 前缀（较宽松）：
// 1. 必须设置 secure: true
// 2. 可以设置 domain

// 设置 Cookie
response.cookies.set(secureCookieOptions);

// 读取 Cookie（服务端）
const token = request.cookies.get('__Host-auth-token')?.value;

// 删除 Cookie
response.cookies.delete('__Host-auth-token');`}
            />
          </div>
        </div>
      </section>

      {/* ════════════ SSO 单点登录 ════════════ */}
      <section className="py-20 bg-[var(--foreground)]/[0.02]">
        <div className="container">
          <div className="animate-slide flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-lg border-2 border-[var(--foreground)] flex items-center justify-center">
              <Layers size={16} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider text-[var(--accent)] font-['Outfit']">
              企业级方案
            </span>
          </div>
          <h2 className="animate-slide font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[var(--foreground)] mb-4">
            SSO 单点登录
          </h2>
          <p className="animate-slide text-[var(--foreground)]/60 font-['Plus_Jakarta_Sans'] mb-12 max-w-2xl">
            一次登录，处处通行。企业内部多个系统共享身份认证的终极方案。
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* SSO 流程图 */}
            <div className="bg-white rounded-2xl border-2 border-[var(--foreground)] shadow-[8px_8px_0px_0px_var(--foreground)] p-6">
              <h3 className="font-['Outfit'] font-bold text-lg mb-6 flex items-center gap-2">
                <Workflow
                  size={20}
                  strokeWidth={2.5}
                  className="text-[var(--accent)]"
                />
                SSO 认证流程
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    label: "用户访问应用 A",
                    desc: "app-a.example.com",
                  },
                  {
                    step: "2",
                    label: "未登录，重定向到 SSO",
                    desc: "sso.example.com?callback=app-a",
                  },
                  {
                    step: "3",
                    label: "用户在 SSO 登录",
                    desc: "统一认证中心验证身份",
                  },
                  {
                    step: "4",
                    label: "SSO 返回票据（Ticket）",
                    desc: "redirect: app-a?ticket=xxx",
                  },
                  {
                    step: "5",
                    label: "应用 A 后端验证票据",
                    desc: "调用 SSO API 验证 ticket",
                  },
                  {
                    step: "6",
                    label: "用户访问应用 B",
                    desc: "app-b.example.com",
                  },
                  {
                    step: "7",
                    label: "SSO Cookie 已存在",
                    desc: "自动登录，无需再次输入密码",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[var(--accent)] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-['Outfit'] font-bold text-sm">
                        {item.label}
                      </div>
                      <div className="text-xs text-[var(--foreground)]/50 font-['JetBrains_Mono']">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SSO 实现代码 */}
            <div>
              <h3 className="font-['Outfit'] font-bold text-lg mb-4 flex items-center gap-2">
                <Code2
                  size={20}
                  strokeWidth={2.5}
                  className="text-[var(--secondary)]"
                />
                SSO 客户端集成
              </h3>
              <CodeBlock
                title="lib/sso-client.ts"
                language="typescript"
                showLineNumbers
                code={`const SSO_URL = process.env.NEXT_PUBLIC_SSO_URL;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;

// SSO 客户端 SDK
export const sso = {
  // 1. 跳转到 SSO 登录页
  login(callbackUrl?: string) {
    const redirectUri = encodeURIComponent(
      callbackUrl ?? window.location.href
    );
    
    window.location.href = 
      \`\${SSO_URL}/authorize?\` +
      \`client_id=\${APP_ID}&\` +
      \`redirect_uri=\${redirectUri}&\` +
      \`response_type=code&\` +
      \`scope=openid profile email\`;
  },

  // 2. 处理 SSO 回调（在回调页使用）
  async handleCallback(code: string) {
    const response = await fetch(\`\${SSO_URL}/token\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code,                            // ← 授权码
        client_id: APP_ID,
        client_secret: process.env.SSO_CLIENT_SECRET,
        redirect_uri: \`\${window.location.origin}/callback\`,
      }),
    });

    const { access_token, id_token } = await response.json();
    
    // access_token: 用于访问 API
    // id_token: 包含用户身份信息（JWT 格式）
    
    return { access_token, id_token };
  },

  // 3. 检查 SSO 登录状态
  async checkSession(): Promise<boolean> {
    try {
      const response = await fetch(\`\${SSO_URL}/session/check\`, {
        credentials: 'include',          // ← 携带 SSO Cookie
      });
      const { active } = await response.json();
      return active;
    } catch {
      return false;
    }
  },

  // 4. SSO 登出（登出所有应用）
  logout() {
    window.location.href = 
      \`\${SSO_URL}/logout?\` +
      \`client_id=\${APP_ID}&\` +
      \`post_logout_redirect_uri=\` +
      encodeURIComponent(window.location.origin);
  },
};

// 回调页组件
export default async function SSOCallbackPage({
  searchParams,
}: {
  searchParams: { code?: string; error?: string };
}) {
  if (searchParams.error) {
    return <div>登录失败: {searchParams.error}</div>;
  }

  if (searchParams.code) {
    const tokens = await sso.handleCallback(searchParams.code);
    // 存储 token 并跳转...
    redirect('/dashboard');
  }

  return <div>处理中...</div>;
}`}
              />
            </div>
          </div>

          {/* SSO 方案对比 */}
          <div className="mt-8">
            <h3 className="font-['Outfit'] font-bold text-xl mb-6">
              SSO 实现方案对比
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  name: "CAS",
                  fullName: "Central Authentication Service",
                  desc: "耶鲁大学开发的开源 SSO 协议，基于票据验证。广泛用于教育和政府机构。",
                  pros: ["成熟稳定", "开源免费", "社区活跃"],
                  cons: ["配置复杂", "仅支持 Web"],
                },
                {
                  name: "SAML 2.0",
                  fullName: "Security Assertion Markup Language",
                  desc: "基于 XML 的企业级 SSO 标准。支持细粒度权限断言，适合大型企业。",
                  pros: ["企业级标准", "细粒度权限", "跨域支持"],
                  cons: ["XML 繁重", "移动端支持差"],
                },
                {
                  name: "OIDC",
                  fullName: "OpenID Connect",
                  desc: "基于 OAuth 2.0 的现代身份认证层。使用 JWT，是当前最流行的 SSO 方案。",
                  pros: ["现代标准", "JWT 轻量", "移动端友好"],
                  cons: ["需要 HTTPS", "实现细节多"],
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border-2 border-[var(--foreground)] shadow-[6px_6px_0px_0px_var(--foreground)] p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-3 py-1 bg-[var(--accent)] text-white rounded-full text-xs font-bold">
                      {item.name}
                    </div>
                  </div>
                  <p className="text-xs text-[var(--foreground)]/50 mb-3 font-['Plus_Jakarta_Sans']">
                    {item.fullName}
                  </p>
                  <p className="text-sm text-[var(--foreground)]/80 font-['Plus_Jakarta_Sans'] mb-4">
                    {item.desc}
                  </p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-bold text-[var(--quaternary)]">
                        优点：
                      </span>
                      <span className="text-xs text-[var(--foreground)]/60">
                        {item.pros.join("、")}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[var(--secondary)]">
                        缺点：
                      </span>
                      <span className="text-xs text-[var(--foreground)]/60">
                        {item.cons.join("、")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 速查清单 ════════════ */}
      <section className="py-20">
        <div className="container">
          <div className="animate-slide flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[var(--tertiary)] rounded-lg border-2 border-[var(--foreground)] flex items-center justify-center">
              <Sparkles
                size={16}
                strokeWidth={2.5}
                className="text-[var(--foreground)]"
              />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider text-[var(--tertiary)] font-['Outfit']">
              速查清单
            </span>
          </div>
          <h2 className="animate-slide font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[var(--foreground)] mb-12">
            鉴权方案选型速查表
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Session 速查 */}
            <div className="bg-white rounded-2xl border-2 border-[var(--foreground)] shadow-[6px_6px_0px_0px_var(--foreground)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconBadge icon={Database} color="accent" size="sm" />
                <h3 className="font-['Outfit'] font-bold">Session 方案</h3>
              </div>
              <div className="space-y-3 text-sm font-['Plus_Jakarta_Sans']">
                <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--foreground)]/60">存储</span>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    Redis
                  </code>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--foreground)]/60">传输</span>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    httpOnly Cookie
                  </code>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--foreground)]/60">过期</span>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    滑动 30min
                  </code>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--foreground)]/60">CSRF</span>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    Cookie 自带
                  </code>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[var(--foreground)]/60">XSS</span>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    httpOnly 防护
                  </code>
                </div>
              </div>
              <div className="mt-4 px-3 py-2 bg-[var(--accent)]/10 rounded-xl text-xs text-[var(--accent)] font-bold">
                ✅ 适用：传统 Web、高安全、即时失效场景
              </div>
            </div>

            {/* JWT 速查 */}
            <div className="bg-white rounded-2xl border-2 border-[var(--foreground)] shadow-[6px_6px_0px_0px_var(--foreground)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconBadge icon={FileKey} color="secondary" size="sm" />
                <h3 className="font-['Outfit'] font-bold">JWT 方案</h3>
              </div>
              <div className="space-y-3 text-sm font-['Plus_Jakarta_Sans']">
                <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--foreground)]/60">Access</span>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    内存变量
                  </code>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--foreground)]/60">Refresh</span>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    httpOnly Cookie
                  </code>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--foreground)]/60">
                    Access 过期
                  </span>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    15 分钟
                  </code>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--foreground)]/60">签名算法</span>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    RS256
                  </code>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[var(--foreground)]/60">传输</span>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    Authorization Header
                  </code>
                </div>
              </div>
              <div className="mt-4 px-3 py-2 bg-[var(--secondary)]/10 rounded-xl text-xs text-[var(--secondary)] font-bold">
                ✅ 适用：SPA、移动端、微服务、跨域场景
              </div>
            </div>

            {/* OAuth 速查 */}
            <div className="bg-white rounded-2xl border-2 border-[var(--foreground)] shadow-[6px_6px_0px_0px_var(--foreground)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconBadge icon={Globe} color="quaternary" size="sm" />
                <h3 className="font-['Outfit'] font-bold">OAuth 2.0 方案</h3>
              </div>
              <div className="space-y-3 text-sm font-['Plus_Jakarta_Sans']">
                <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--foreground)]/60">流程</span>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    Auth Code + PKCE
                  </code>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--foreground)]/60">存储</span>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    按应用类型
                  </code>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--foreground)]/60">
                    Token 类型
                  </span>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    Bearer
                  </code>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--foreground)]/60">Scope</span>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    最小权限原则
                  </code>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[var(--foreground)]/60">库推荐</span>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    NextAuth.js
                  </code>
                </div>
              </div>
              <div className="mt-4 px-3 py-2 bg-[var(--quaternary)]/10 rounded-xl text-xs text-[var(--quaternary)] font-bold">
                ✅ 适用：第三方登录、开放平台、企业集成
              </div>
            </div>
          </div>

          {/* 最终选型建议 */}
          <div className="mt-12 bg-[var(--foreground)] text-white rounded-2xl border-2 border-[var(--foreground)] shadow-[8px_8px_0px_0px_var(--accent)] p-8">
            <h3 className="font-['Outfit'] font-bold text-2xl mb-6 flex items-center gap-3">
              <Lightbulb size={24} className="text-[var(--tertiary)]" />
              选型决策树
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm font-['Plus_Jakarta_Sans']">
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-xl">
                  <div className="font-bold text-[var(--tertiary)] mb-2">
                    🏢 企业内部系统
                  </div>
                  <p className="text-white/70">
                    多个内部系统需要统一登录 → <strong>SSO (OIDC)</strong>
                    <br />
                    使用 Keycloak / Auth0 / 自建 SSO 服务
                  </p>
                </div>
                <div className="p-4 bg-white/10 rounded-xl">
                  <div className="font-bold text-[var(--quaternary)] mb-2">
                    📱 移动端 / SPA
                  </div>
                  <p className="text-white/70">
                    单页应用或移动端 → <strong>JWT + Refresh Token</strong>
                    <br />
                    Access Token 存内存，Refresh Token 存 httpOnly Cookie
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-xl">
                  <div className="font-bold text-[var(--accent)] mb-2">
                    🌐 传统 Web 应用
                  </div>
                  <p className="text-white/70">
                    服务端渲染、高安全要求 → <strong>Session + Cookie</strong>
                    <br />
                    使用 Redis 存储，天然 CSRF 防护
                  </p>
                </div>
                <div className="p-4 bg-white/10 rounded-xl">
                  <div className="font-bold text-[var(--secondary)] mb-2">
                    🔗 第三方登录
                  </div>
                  <p className="text-white/70">
                    接入 GitHub/Google/微信登录 → <strong>OAuth 2.0</strong>
                    <br />
                    推荐使用 NextAuth.js / Lucia Auth 简化集成
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
