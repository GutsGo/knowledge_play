"use client";

import { useState } from "react";
import {
  Shield,
  Lock,
  KeyRound,
  ArrowRight,
  Check,
  Clock,
  Eye,
  Server,
  Monitor,
  ChevronDown,
  Fingerprint,
  MessageSquare,
  FileKey,
  CircleDot,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Zap,
  Ban,
  RefreshCw,
  AlertTriangle,
  Timer,
  Layers,
  GitCompare,
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   数据定义
   ═══════════════════════════════════════════════════ */

interface HandshakeStep {
  id: number;
  from: "client" | "server";
  name: string;
  summary: string;
  details: string[];
  data?: string;
  encrypted?: boolean;
  color: string;
  icon: React.ReactNode;
}

const tls12Steps: HandshakeStep[] = [
  {
    id: 1,
    from: "client",
    name: "ClientHello",
    summary: "客户端发起握手请求，将自身支持的加密参数列表发送给服务器。",
    details: [
      "协议版本：TLS 1.2",
      "客户端随机数 Client Random（32 字节，用于后续密钥生成）",
      "Session ID（用于会话恢复）",
      "密码套件列表（Cipher Suites），如 RSA、ECDHE 等",
      "压缩方法列表",
      "扩展字段：SNI（服务器名称指示）、签名算法列表等",
    ],
    data: `ClientHello:\n  Protocol Version: TLS 1.2\n  Client Random: 28 3a 5f 9b 0c 71 ...\n  Session ID: (empty)\n  Cipher Suites (46 suites):\n    TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256\n    TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384\n    TLS_RSA_WITH_AES_128_CBC_SHA        ← 静态RSA!\n    TLS_RSA_WITH_3DES_EDE_CBC_SHA       ← 不安全!\n    ...\n  Extensions:\n    server_name: example.com\n    signature_algorithms:\n      rsa_pkcs1_sha256, ecdsa_secp256r1_sha256...`,
    color: "var(--accent)",
    icon: <MessageSquare size={20} strokeWidth={2.5} />,
  },
  {
    id: 2,
    from: "server",
    name: "ServerHello",
    summary: "服务器从客户端列表中选定一组加密参数并回复。",
    details: [
      "选定的协议版本",
      "服务器随机数 Server Random（32 字节）",
      "Session ID",
      "选定的密码套件（如 TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256）",
      "选定的压缩方法",
      "扩展字段",
    ],
    data: `ServerHello:\n  Protocol Version: TLS 1.2\n  Server Random: 7c 2d 8a 1e f3 09 ...\n  Session ID: a3 f2 01 5b ...\n  Cipher Suite:\n    TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256\n  Compression: null`,
    color: "var(--secondary)",
    icon: <MessageSquare size={20} strokeWidth={2.5} />,
  },
  {
    id: 3,
    from: "server",
    name: "Certificate",
    summary: "服务器发送自己的 X.509 数字证书，客户端验证身份。",
    details: [
      "包含完整的证书链（服务器证书 + 中间 CA）",
      "证书中包含服务器的 RSA/EC 公钥",
      "由受信任的 CA（证书颁发机构）签名",
      "客户端验证：证书是否过期、是否被吊销、CA 链是否可信",
    ],
    color: "var(--secondary)",
    icon: <FileKey size={20} strokeWidth={2.5} />,
  },
  {
    id: 4,
    from: "server",
    name: "ServerKeyExchange",
    summary: "服务器发送 Diffie-Hellman 密钥交换参数（ECDHE 模式下）。",
    details: [
      "包含 ECDH 曲线类型（如 x25519、secp256r1）和公钥",
      "使用服务器私钥签名，防止中间人篡改",
      "RSA 密钥交换模式不需要此消息（但不提供前向保密）",
      "客户端使用此公钥计算 Pre-Master Secret",
    ],
    color: "var(--secondary)",
    icon: <KeyRound size={20} strokeWidth={2.5} />,
  },
  {
    id: 5,
    from: "server",
    name: "ServerHelloDone",
    summary: "服务器通知客户端：我的 Hello 消息已全部发送完毕。",
    details: [
      "空消息（仅包含消息头）",
      "表示服务器等待客户端的响应",
      "客户端收到后开始验证证书并计算密钥",
    ],
    color: "var(--secondary)",
    icon: <Check size={20} strokeWidth={2.5} />,
  },
  {
    id: 6,
    from: "client",
    name: "ClientKeyExchange",
    summary: "客户端发送密钥交换信息，双方协商出共享密钥。",
    details: [
      "ECDHE 模式：发送客户端的 DH 公钥",
      "RSA 模式：用服务器公钥加密 Pre-Master Secret 发送",
      "双方用 Pre-Master Secret + Client Random + Server Random 通过 PRF 计算 Master Secret",
      "从 Master Secret 派生对称加密密钥、MAC 密钥、IV 等",
    ],
    color: "var(--accent)",
    icon: <KeyRound size={20} strokeWidth={2.5} />,
  },
  {
    id: 7,
    from: "client",
    name: "ChangeCipherSpec",
    summary: "客户端通知服务器：从现在起，我的所有消息都用协商好的密钥加密。",
    details: [
      "协议层面的信号消息（非握手消息）",
      "表示切换到加密通信",
      "后续所有应用数据使用对称加密（如 AES-128-GCM）",
    ],
    encrypted: true,
    color: "var(--accent)",
    icon: <Lock size={20} strokeWidth={2.5} />,
  },
  {
    id: 8,
    from: "client",
    name: "Finished",
    summary: "客户端发送握手完整性验证消息（已加密），服务器验证。",
    details: [
      "包含所有之前握手消息的 PRF 哈希摘要",
      "使用刚协商的密钥加密发送",
      "服务器验证此哈希，确认握手过程未被篡改",
      "这是客户端的最后一条握手消息",
    ],
    encrypted: true,
    color: "var(--accent)",
    icon: <ShieldCheck size={20} strokeWidth={2.5} />,
  },
  {
    id: 9,
    from: "server",
    name: "ChangeCipherSpec + Finished",
    summary: "服务器也切换加密并发送完成验证消息，握手结束。",
    details: [
      "服务器发送 ChangeCipherSpec 切换到加密模式",
      "发送 Finished 消息（所有握手消息的哈希）",
      "客户端验证服务器的 Finished 消息",
      "🎉 握手完成！双方开始加密传输应用数据",
    ],
    encrypted: true,
    color: "var(--secondary)",
    icon: <ShieldCheck size={20} strokeWidth={2.5} />,
  },
];

const tls13Steps: HandshakeStep[] = [
  {
    id: 1,
    from: "client",
    name: "ClientHello",
    summary:
      "客户端一次性发送所有信息，包含密钥共享（KeyShare），大幅减少往返。",
    details: [
      "SupportedVersions 扩展：声明支持 TLS 1.3",
      "密码套件列表：仅 AEAD 算法（AES-GCM、ChaCha20-Poly1305）",
      "🔑 KeyShare 扩展：直接包含客户端的 ECDH 公钥！",
      "SignatureAlgorithms 扩展",
      "PSK 密钥交换模式（用于 0-RTT 恢复）",
      "Early Data 指示（0-RTT 场景）",
    ],
    data: `ClientHello:\n  Supported Versions: TLS 1.3\n  Cipher Suites:\n    TLS_AES_128_GCM_SHA256\n    TLS_AES_256_GCM_SHA384\n    TLS_CHACHA20_POLY1305_SHA256\n  KeyShare:\n    Named Group: x25519\n    Key Exchange: 35 80 72 d6 9a 3b ...\n  Signature Algorithms:\n    ecdsa_secp256r1_sha256\n    rsa_pss_rsae_sha256\n    ed25519\n  PSK Key Exchange Modes: psk_dhe_ke`,
    color: "var(--accent)",
    icon: <MessageSquare size={20} strokeWidth={2.5} />,
  },
  {
    id: 2,
    from: "server",
    name: "ServerHello",
    summary:
      "服务器选定参数并返回密钥共享。此时双方已能计算共享密钥。",
    details: [
      "选定密码套件（如 TLS_AES_128_GCM_SHA256）",
      "🔑 KeyShare 扩展：服务器的 ECDH 公钥",
      "双方使用 ECDHE 共享密钥 + HKDF 派生 Handshake Traffic Keys",
      "这是最后一条明文消息——从此处开始加密！",
    ],
    data: `ServerHello:\n  Cipher Suite: TLS_AES_128_GCM_SHA256\n  KeyShare:\n    Named Group: x25519\n    Key Exchange: 9a 3b c7 d2 5f 81 ...\n\n→ 双方计算 ECDHE 共享密钥\n→ HKDF-Expand-Label → Handshake Traffic Secret`,
    color: "var(--secondary)",
    icon: <MessageSquare size={20} strokeWidth={2.5} />,
  },
  {
    id: 3,
    from: "server",
    name: "🔒 加密边界 — Handshake 密钥已就绪",
    summary:
      "从此处开始，所有握手消息都使用对称加密传输，中间人无法窥探。",
    details: [
      "使用 HKDF（基于 HMAC 的密钥派生函数）派生密钥",
      "Handshake Traffic Secret → 加密密钥 + IV",
      "服务器证书、签名等敏感信息现在都在加密通道中",
      "对比 TLS 1.2：证书在明文中传输",
    ],
    color: "var(--quaternary)",
    icon: <Lock size={20} strokeWidth={2.5} />,
  },
  {
    id: 4,
    from: "server",
    name: "[加密] EncryptedExtensions",
    summary: "服务器加密发送不需要用于密钥建立的扩展信息。",
    details: [
      "ALPN 协议协商（如 h2 表示 HTTP/2）",
      "服务器名称确认",
      "证书透明度（CT）相关信息",
      "最大分片长度等参数",
    ],
    encrypted: true,
    color: "var(--secondary)",
    icon: <Eye size={20} strokeWidth={2.5} />,
  },
  {
    id: 5,
    from: "server",
    name: "[加密] Certificate",
    summary: "服务器在加密通道中发送证书，保护服务器身份隐私。",
    details: [
      "X.509 证书链",
      "🔑 与 TLS 1.2 的关键区别：证书是加密传输的！",
      "防止中间人通过 SNI 和证书内容窥探用户访问的网站",
      "包含证书请求上下文（双向认证场景）",
    ],
    encrypted: true,
    color: "var(--secondary)",
    icon: <FileKey size={20} strokeWidth={2.5} />,
  },
  {
    id: 6,
    from: "server",
    name: "[加密] CertificateVerify",
    summary: "服务器用私钥对握手转录签名，证明拥有证书对应的私钥。",
    details: [
      "对整个握手消息转录（transcript）的数字签名",
      "使用证书对应的私钥（RSA-PSS 或 ECDSA）",
      "覆盖所有握手消息的哈希，防止降级攻击",
      "TLS 1.2 中此操作分散在 ServerKeyExchange 中",
    ],
    encrypted: true,
    color: "var(--secondary)",
    icon: <Fingerprint size={20} strokeWidth={2.5} />,
  },
  {
    id: 7,
    from: "server",
    name: "[加密] Finished",
    summary: "服务器发送握手完成验证 MAC，客户端验证完整性。",
    details: [
      "使用 HKDF 派生的 Finished Key 计算 HMAC",
      "覆盖整个握手转录",
      "客户端验证后确认服务器侧握手正确",
      "ServerFlight 结束 🏁",
    ],
    encrypted: true,
    color: "var(--secondary)",
    icon: <ShieldCheck size={20} strokeWidth={2.5} />,
  },
  {
    id: 8,
    from: "client",
    name: "[加密] Finished",
    summary: "客户端发送 Finished，握手正式完成，切换到应用密钥。",
    details: [
      "客户端验证服务器的 Certificate、CertificateVerify、Finished",
      "发送客户端的 Finished 消息（HMAC）",
      "双方使用 HKDF 派生 Application Traffic Secret",
      "🎉 握手完成！仅需 1-RTT，开始加密应用数据传输",
    ],
    encrypted: true,
    color: "var(--accent)",
    icon: <ShieldCheck size={20} strokeWidth={2.5} />,
  },
];

/* ─── 对比数据 ─── */
const comparisonItems = [
  {
    title: "握手往返",
    tls12: "2-RTT",
    tls13: "1-RTT",
    icon: <Timer size={22} strokeWidth={2.5} />,
    accent: "var(--accent)",
    desc: "TLS 1.3 将 KeyShare 嵌入 ClientHello，减少一次往返。首次连接速度提升约 50%。",
    span: "md:col-span-2",
  },
  {
    title: "会话恢复",
    tls12: "1-RTT",
    tls13: "0-RTT ⚡",
    icon: <Zap size={22} strokeWidth={2.5} />,
    accent: "var(--tertiary)",
    desc: "TLS 1.3 支持 0-RTT 早期数据：恢复会话时可在第一条消息就发送应用数据。",
    span: "md:col-span-1",
  },
  {
    title: "前向保密",
    tls12: "可选",
    tls13: "强制 ✅",
    icon: <RefreshCw size={22} strokeWidth={2.5} />,
    accent: "var(--quaternary)",
    desc: "TLS 1.3 移除静态 RSA 密钥交换，强制使用临时 DH（ECDHE），确保前向保密。",
    span: "md:col-span-1",
  },
  {
    title: "证书隐私",
    tls12: "明文传输",
    tls13: "加密传输 🔒",
    icon: <Eye size={22} strokeWidth={2.5} />,
    accent: "var(--secondary)",
    desc: "TLS 1.3 中服务器证书在加密通道传输，中间人无法窥探用户访问的网站。",
    span: "md:col-span-1",
  },
  {
    title: "密码套件",
    tls12: "300+ 个",
    tls13: "仅 5 个",
    icon: <Shield size={22} strokeWidth={2.5} />,
    accent: "var(--accent)",
    desc: "TLS 1.3 仅保留 AEAD 算法组合，大幅简化配置，减少人为错误。",
    span: "md:col-span-1",
  },
  {
    title: "密钥派生",
    tls12: "PRF",
    tls13: "HKDF",
    icon: <KeyRound size={22} strokeWidth={2.5} />,
    accent: "var(--secondary)",
    desc: "TLS 1.3 使用 HKDF（基于 HMAC 的密钥派生函数），更安全、更灵活。",
    span: "md:col-span-1",
  },
];

const removedItems = [
  { name: "RSA 静态密钥交换", reason: "不提供前向保密" },
  { name: "静态 DH 密钥交换", reason: "不提供前向保密" },
  { name: "RC4 流密码", reason: "存在已知弱点" },
  { name: "3DES (CBC 模式)", reason: "Sweet32 攻击" },
  { name: "CBC 模式密码套件", reason: "Padding Oracle 攻击" },
  { name: "SHA-1 / MD5 签名", reason: "碰撞攻击已可行" },
  { name: "压缩 (DEFLATE)", reason: "CRIME 攻击" },
  { name: "协商重协商 (Renegotiation)", reason: "复杂且易出错" },
  { name: "DSA 证书", reason: "不再推荐使用" },
  { name: "自定义 DH 群组", reason: "仅允许标准命名曲线" },
];

/* ═══════════════════════════════════════════════════
   组件
   ═══════════════════════════════════════════════════ */

export default function TLSHandshakePage() {
  const [activeTab, setActiveTab] = useState<"1.2" | "1.3">("1.3");
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (id: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const currentSteps = activeTab === "1.2" ? tls12Steps : tls13Steps;

  return (
    <div className="bg-dot-grid min-h-screen pb-24">
      {/* ═══════════ HERO ═══════════ */}
      <section className="container pt-20 pb-16 relative overflow-hidden">
        {/* 装饰性几何色块 */}
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-[0.12]"
          style={{ background: "var(--accent)", filter: "blur(100px)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-[0.1]"
          style={{ background: "var(--secondary)", filter: "blur(80px)" }}
        />
        <div
          className="absolute top-10 right-[30%] w-24 h-24 rounded-full opacity-[0.08]"
          style={{ background: "var(--tertiary)", filter: "blur(40px)" }}
        />

        <div className="animate-pop relative z-10">
          {/* 标签 */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 mb-8"
            style={{ borderColor: "var(--foreground)", background: "var(--tertiary)" }}
          >
            <Shield size={16} strokeWidth={2.5} />
            <span
              className="font-bold text-sm uppercase tracking-wider"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              网络安全 · 深度解析
            </span>
          </div>

          {/* 标题 */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] mb-6"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--foreground)" }}
          >
            HTTPS{" "}
            <span className="relative inline-block">
              <span style={{ color: "var(--accent)" }}>TLS</span>
              {/* 标题装饰线 */}
              <span
                className="absolute -bottom-2 left-0 w-full h-3 rounded-full"
                style={{ background: "var(--tertiary)", opacity: 0.4 }}
              />
            </span>{" "}
            <br className="hidden md:block" />
            握手过程深度解析
          </h1>

          {/* 副标题 */}
          <p
            className="text-lg md:text-2xl max-w-3xl leading-relaxed"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              color: "var(--foreground)",
              opacity: 0.65,
            }}
          >
            从 TLS 1.2 的两次往返到 TLS 1.3 的一次往返 —— 理解现代 Web
            安全基石的演进之路
          </p>

          {/* 版本标签 */}
          <div className="flex flex-wrap gap-3 mt-8">
            {["TLS 1.0 ❌", "TLS 1.1 ❌", "TLS 1.2 ✅", "TLS 1.3 ✅ 推荐"].map(
              (v, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-lg border-2 text-sm font-bold"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    borderColor: "var(--foreground)",
                    background:
                      i === 3 ? "var(--quaternary)" : i >= 2 ? "var(--card)" : "var(--border)",
                    color: i < 2 ? "var(--foreground)" : i === 3 ? "white" : "var(--foreground)",
                  }}
                >
                  {v}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ TLS 三大支柱 ═══════════ */}
      <section className="container mt-20 mb-20">
        <div className="animate-slide" style={{ animationDelay: "0.15s" }}>
          {/* 小节标题 */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-lg border-2 flex items-center justify-center"
              style={{ borderColor: "var(--foreground)", background: "var(--accent)" }}
            >
              <Sparkles size={20} strokeWidth={2.5} className="text-white" />
            </div>
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              TLS 的三大安全保证
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Lock size={24} strokeWidth={2.5} />,
                title: "机密性 (Confidentiality)",
                desc: "通过对称加密算法（如 AES-GCM）保护传输数据，第三方无法解密读取。",
                color: "var(--accent)",
                bg: "#8b5cf620",
              },
              {
                icon: <Fingerprint size={24} strokeWidth={2.5} />,
                title: "身份认证 (Authentication)",
                desc: "通过 X.509 数字证书和 CA 信任链验证服务器身份，防止中间人冒充。",
                color: "var(--secondary)",
                bg: "#f472b620",
              },
              {
                icon: <ShieldCheck size={24} strokeWidth={2.5} />,
                title: "完整性 (Integrity)",
                desc: "通过 MAC / AEAD 认证标签确保数据未被篡改，任何修改都会被检测到。",
                color: "var(--quaternary)",
                bg: "#34d39920",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="topic-card p-6 rounded-2xl animate-slide"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <div
                  className="w-14 h-14 rounded-xl border-2 flex items-center justify-center mb-4"
                  style={{
                    borderColor: "var(--foreground)",
                    background: item.bg,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    opacity: 0.7,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 握手流程可视化（核心交互区）═══════════ */}
      <section className="container mb-20">
        {/* 标题 + Tab 切换 */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg border-2 flex items-center justify-center"
              style={{
                borderColor: "var(--foreground)",
                background: "var(--secondary)",
              }}
            >
              <GitCompare size={20} strokeWidth={2.5} className="text-white" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              握手流程
            </h2>
          </div>

          {/* Tab 切换器 */}
          <div
            className="flex border-2 rounded-full overflow-hidden"
            style={{ borderColor: "var(--foreground)", boxShadow: "4px 4px 0px 0px var(--foreground)" }}
          >
            {(["1.2", "1.3"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setExpandedSteps(new Set());
                }}
                className="px-6 py-3 font-bold text-base transition-all duration-200"
                style={{
                  fontFamily: "Outfit, sans-serif",
                  background: activeTab === tab ? "var(--accent)" : "var(--card)",
                  color: activeTab === tab ? "white" : "var(--foreground)",
                }}
              >
                TLS {tab}
              </button>
            ))}
          </div>
        </div>

        {/* RTT 标识 */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2"
            style={{
              borderColor: "var(--foreground)",
              background:
                activeTab === "1.2" ? "var(--tertiary)" : "var(--quaternary)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <Clock size={20} strokeWidth={2.5} />
            <span
              className="font-bold text-base"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {activeTab === "1.2"
                ? "2-RTT（两次网络往返）"
                : "1-RTT（一次网络往返）"}
            </span>
            {activeTab === "1.3" && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full border-2 bg-white"
                    style={{ borderColor: "var(--foreground)" }}>
                更快
              </span>
            )}
          </div>
        </div>

        {/* 通信参与者标头 */}
        <div className="max-w-4xl mx-auto mb-6 hidden md:grid grid-cols-2 gap-8 px-4">
          <div className="flex items-center justify-end gap-2">
            <span className="font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
              客户端
            </span>
            <div
              className="w-10 h-10 rounded-xl border-2 flex items-center justify-center"
              style={{ borderColor: "var(--foreground)", background: "#8b5cf620" }}
            >
              <Monitor size={20} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-xl border-2 flex items-center justify-center"
              style={{ borderColor: "var(--foreground)", background: "#f472b620" }}
            >
              <Server size={20} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
            </div>
            <span className="font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
              服务器
            </span>
          </div>
        </div>

        {/* 时间线 */}
        <div className="relative max-w-4xl mx-auto">
          {/* 中轴线 */}
          <div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 rounded-full"
            style={{ background: "var(--border)" }}
          />

          {currentSteps.map((step, index) => {
            const isExpanded = expandedSteps.has(step.id);
            const isClient = step.from === "client";

            return (
              <div
                key={`${activeTab}-${step.id}`}
                className="relative mb-8 animate-slide"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                {/* 节点圆圈 */}
                <div
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full border-[3px] flex items-center justify-center font-extrabold text-base transition-all duration-300"
                  style={{
                    borderColor: "var(--foreground)",
                    background: step.color,
                    color: "white",
                    fontFamily: "Outfit, sans-serif",
                    boxShadow: `0 0 0 4px ${step.color}25`,
                  }}
                >
                  {step.id}
                </div>

                {/* 卡片 */}
                <div
                  className={`ml-20 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                    index % 2 === 0
                      ? "md:mr-auto md:pr-4"
                      : "md:ml-auto md:pl-4"
                  }`}
                >
                  <div
                    className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: "var(--card)",
                      border: `2px solid ${
                        step.encrypted ? "var(--quaternary)" : "var(--foreground)"
                      }`,
                      boxShadow: `6px 6px 0px 0px ${
                        step.encrypted ? "var(--quaternary)" : "var(--foreground)"
                      }`,
                    }}
                    onClick={() => toggleStep(step.id)}
                  >
                    {/* 卡头 */}
                    <div className="p-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* 图标容器 */}
                        <div
                          className="w-10 h-10 shrink-0 rounded-lg border-2 flex items-center justify-center"
                          style={{
                            borderColor: "var(--foreground)",
                            background: `${step.color}18`,
                            color: step.color,
                          }}
                        >
                          {step.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4
                              className="font-bold text-base leading-tight"
                              style={{ fontFamily: "Outfit, sans-serif" }}
                            >
                              {step.name}
                            </h4>
                            {step.encrypted && (
                              <span
                                className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full border-2 shrink-0"
                                style={{
                                  borderColor: "var(--quaternary)",
                                  color: "var(--quaternary)",
                                }}
                              >
                                <Lock size={9} strokeWidth={3} />
                                加密
                              </span>
                            )}
                          </div>
                          <div
                            className="flex items-center gap-1 text-xs mt-1 flex-wrap"
                            style={{ opacity: 0.55 }}
                          >
                            {isClient ? (
                              <Monitor size={12} strokeWidth={2.5} />
                            ) : (
                              <Server size={12} strokeWidth={2.5} />
                            )}
                            <span>{isClient ? "客户端" : "服务器"}</span>
                            <ArrowRight
                              size={12}
                              strokeWidth={2.5}
                              style={{
                                transform: isClient
                                  ? "none"
                                  : "rotate(180deg)",
                              }}
                            />
                            <span>{isClient ? "服务器" : "客户端"}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronDown
                        size={18}
                        strokeWidth={2.5}
                        className="shrink-0 transition-transform duration-200"
                        style={{
                          transform: isExpanded
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          opacity: 0.5,
                        }}
                      />
                    </div>

                    {/* 可展开详情 */}
                    {isExpanded && (
                      <div
                        className="px-4 pb-4 border-t-2"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <p
                          className="mt-4 mb-3 text-sm font-medium leading-relaxed"
                          style={{
                            fontFamily: "Plus Jakarta Sans, sans-serif",
                          }}
                        >
                          {step.summary}
                        </p>

                        <ul className="space-y-2 mb-4">
                          {step.details.map((detail, di) => (
                            <li
                              key={di}
                              className="flex items-start gap-2 text-sm"
                              style={{
                                fontFamily:
                                  "Plus Jakarta Sans, sans-serif",
                              }}
                            >
                              <CircleDot
                                size={14}
                                strokeWidth={2.5}
                                className="mt-0.5 shrink-0"
                                style={{ color: step.color }}
                              />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>

                        {step.data && (
                          <pre
                            className="p-4 rounded-xl text-xs overflow-x-auto leading-relaxed border-2"
                            style={{
                              borderColor: "var(--foreground)",
                              background: "#1a1b26",
                              color: "#a9b1d6",
                              fontFamily:
                                "'Fira Code', 'JetBrains Mono', monospace",
                            }}
                          >
                            <code className="language-plaintext">
                              {step.data}
                            </code>
                          </pre>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* 方向指示箭头（桌面端，轴线旁） */}
                <div
                  className="hidden md:flex absolute top-[22px] -translate-y-1/2 items-center"
                  style={{
                    left:
                      index % 2 === 0
                        ? "calc(50% + 1.5rem)"
                        : "auto",
                    right:
                      index % 2 !== 0
                        ? "calc(50% + 1.5rem)"
                        : "auto",
                  }}
                >
                  <ArrowRight
                    size={20}
                    strokeWidth={2.5}
                    style={{
                      color: step.color,
                      transform:
                        index % 2 !== 0
                          ? "rotate(180deg)"
                          : "none",
                    }}
                  />
                </div>
              </div>
            );
          })}

          {/* 完成指示 */}
          <div className="flex justify-center relative z-10">
            <div
              className="px-6 py-3 rounded-full border-[3px] font-bold flex items-center gap-2 animate-pop"
              style={{
                borderColor: "var(--foreground)",
                background: "var(--quaternary)",
                color: "white",
                fontFamily: "Outfit, sans-serif",
                boxShadow: "6px 6px 0px 0px var(--foreground)",
              }}
            >
              <Lock size={18} strokeWidth={2.5} />
              加密数据传输开始
              <Sparkles size={18} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ RTT 对比示意 ═══════════ */}
      <section className="container mb-20">
        <div
          className="topic-card rounded-2xl p-6 md:p-10"
          style={{ borderColor: "var(--foreground)" }}
        >
          <h3
            className="text-2xl md:text-3xl font-extrabold mb-8 text-center"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            RTT 对比示意
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* TLS 1.2 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-sm font-bold border-2"
                  style={{
                    borderColor: "var(--foreground)",
                    background: "var(--tertiary)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  TLS 1.2
                </span>
                <span className="font-bold" style={{ fontFamily: "Outfit, sans-serif", opacity: 0.6 }}>
                  2-RTT
                </span>
              </div>
              <div className="space-y-3">
                {/* RTT 1 */}
                <div
                  className="rounded-xl border-2 p-4"
                  style={{ borderColor: "var(--foreground)", background: "#8b5cf610" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Timer size={16} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
                    <span className="text-sm font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
                      RTT 1 — 协商阶段
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs flex-wrap" style={{ opacity: 0.7 }}>
                    <span className="px-2 py-1 rounded border-2" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                      ClientHello →
                    </span>
                    <span className="px-2 py-1 rounded border-2" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                      ← ServerHello
                    </span>
                    <span className="px-2 py-1 rounded border-2" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                      ← Certificate
                    </span>
                    <span className="px-2 py-1 rounded border-2" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                      ← ServerKeyExchange
                    </span>
                    <span className="px-2 py-1 rounded border-2" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                      ← ServerHelloDone
                    </span>
                  </div>
                </div>
                {/* RTT 2 */}
                <div
                  className="rounded-xl border-2 p-4"
                  style={{ borderColor: "var(--foreground)", background: "#f472b610" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Timer size={16} strokeWidth={2.5} style={{ color: "var(--secondary)" }} />
                    <span className="text-sm font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
                      RTT 2 — 密钥交换 + 完成
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs flex-wrap" style={{ opacity: 0.7 }}>
                    <span className="px-2 py-1 rounded border-2" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                      ClientKeyExchange →
                    </span>
                    <span className="px-2 py-1 rounded border-2" style={{ borderColor: "var(--quaternary)", background: "#34d39915" }}>
                      ChangeCipherSpec →
                    </span>
                    <span className="px-2 py-1 rounded border-2" style={{ borderColor: "var(--quaternary)", background: "#34d39915" }}>
                      Finished →
                    </span>
                    <span className="px-2 py-1 rounded border-2" style={{ borderColor: "var(--quaternary)", background: "#34d39915" }}>
                      ← Finished
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TLS 1.3 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-sm font-bold border-2"
                  style={{
                    borderColor: "var(--foreground)",
                    background: "var(--quaternary)",
                    color: "white",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  TLS 1.3
                </span>
                <span className="font-bold" style={{ fontFamily: "Outfit, sans-serif", opacity: 0.6 }}>
                  1-RTT
                </span>
              </div>
              <div className="space-y-3">
                {/* RTT 1 */}
                <div
                  className="rounded-xl border-2 p-4"
                  style={{ borderColor: "var(--foreground)", background: "#34d39910" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={16} strokeWidth={2.5} style={{ color: "var(--quaternary)" }} />
                    <span className="text-sm font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
                      RTT 1 — 一次搞定！
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs flex-wrap" style={{ opacity: 0.7 }}>
                    <span className="px-2 py-1 rounded border-2" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                      ClientHello + KeyShare →
                    </span>
                    <span className="px-2 py-1 rounded border-2" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                      ← ServerHello + KeyShare
                    </span>
                    <span className="px-2 py-1 rounded border-2" style={{ borderColor: "var(--quaternary)", background: "#34d39915" }}>
                      ← {`{`}EncryptedExtensions + Cert + Verify + Finished{`}`}
                    </span>
                    <span className="px-2 py-1 rounded border-2" style={{ borderColor: "var(--quaternary)", background: "#34d39915" }}>
                      Finished →
                    </span>
                  </div>
                </div>

                {/* 0-RTT */}
                <div
                  className="rounded-xl border-2 border-dashed p-4"
                  style={{ borderColor: "var(--tertiary)", background: "#fbbf2410" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={16} strokeWidth={2.5} style={{ color: "var(--tertiary)" }} />
                    <span className="text-sm font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
                      0-RTT 恢复（可选）
                    </span>
                    <span
                      className="px-2 py-0.5 text-[10px] font-bold rounded-full border-2"
                      style={{ borderColor: "var(--tertiary)", color: "var(--tertiary)" }}
                    >
                      有重放风险
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs flex-wrap" style={{ opacity: 0.7 }}>
                    <span className="px-2 py-1 rounded border-2" style={{ borderColor: "var(--quaternary)", background: "#34d39915" }}>
                      ClientHello + EarlyData →
                    </span>
                    <span className="px-2 py-1 rounded border-2" style={{ borderColor: "var(--quaternary)", background: "#34d39915" }}>
                      ← ServerHello + Finished
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 对比 Bento Grid ═══════════ */}
      <section className="container mb-20">
        <div className="flex items-center gap-3 mb-10">
          <div
            className="w-10 h-10 rounded-lg border-2 flex items-center justify-center"
            style={{
              borderColor: "var(--foreground)",
              background: "var(--tertiary)",
            }}
          >
            <Layers size={20} strokeWidth={2.5} />
          </div>
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            TLS 1.2 vs{" "}
            <span style={{ color: "var(--accent)" }}>TLS 1.3</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {comparisonItems.map((item, i) => (
            <div
              key={i}
              className={`topic-card rounded-2xl p-6 animate-slide ${item.span}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 shrink-0 rounded-lg border-2 flex items-center justify-center"
                  style={{
                    borderColor: "var(--foreground)",
                    background: `${item.accent}18`,
                    color: item.accent,
                  }}
                >
                  {item.icon}
                </div>
                <h4
                  className="font-bold text-base"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {item.title}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div
                  className="rounded-xl border-2 p-3 text-center"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--background)",
                  }}
                >
                  <div
                    className="text-[10px] font-bold uppercase tracking-wider mb-1"
                    style={{ opacity: 0.5, fontFamily: "Outfit, sans-serif" }}
                  >
                    TLS 1.2
                  </div>
                  <div
                    className="font-extrabold text-lg"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {item.tls12}
                  </div>
                </div>
                <div
                  className="rounded-xl border-2 p-3 text-center"
                  style={{
                    borderColor: "var(--foreground)",
                    background: `${item.accent}15`,
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                  }}
                >
                  <div
                    className="text-[10px] font-bold uppercase tracking-wider mb-1"
                    style={{ opacity: 0.5, fontFamily: "Outfit, sans-serif" }}
                  >
                    TLS 1.3
                  </div>
                  <div
                    className="font-extrabold text-lg"
                    style={{ fontFamily: "Outfit, sans-serif", color: item.accent }}
                  >
                    {item.tls13}
                  </div>
                </div>
              </div>

              <p
                className="text-sm leading-relaxed"
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  opacity: 0.6,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ TLS 1.3 移除的特性 ═══════════ */}
      <section className="container mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-lg border-2 flex items-center justify-center"
            style={{
              borderColor: "var(--foreground)",
              background: "var(--secondary)",
            }}
          >
            <Ban size={20} strokeWidth={2.5} className="text-white" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            TLS 1.3{" "}
            <span style={{ color: "var(--secondary)" }}>移除了什么？</span>
          </h2>
        </div>
        <p
          className="text-base mb-8 max-w-2xl"
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            opacity: 0.6,
          }}
        >
          TLS 1.3 大刀阔斧地移除了所有已知不安全的算法和协商机制，只保留经过充分验证的方案。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {removedItems.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border-2 p-4 flex items-start gap-3 animate-slide"
              style={{
                animationDelay: `${i * 0.05}s`,
                borderColor: "var(--foreground)",
                background: "var(--card)",
                boxShadow: "4px 4px 0px 0px var(--border)",
              }}
            >
              <div
                className="w-8 h-8 shrink-0 rounded-lg border-2 flex items-center justify-center"
                style={{
                  borderColor: "var(--foreground)",
                  background: "#ef444415",
                  color: "#ef4444",
                }}
              >
                <Ban size={16} strokeWidth={2.5} />
              </div>
              <div>
                <h5
                  className="font-bold text-sm mb-0.5"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {item.name}
                </h5>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    opacity: 0.55,
                  }}
                >
                  {item.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ TLS 1.3 密码套件列表 ═══════════ */}
      <section className="container mb-20">
        <div
          className="topic-card rounded-2xl p-6 md:p-8"
          style={{ borderColor: "var(--foreground)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-lg border-2 flex items-center justify-center"
              style={{
                borderColor: "var(--foreground)",
                background: "var(--accent)",
              }}
            >
              <Shield size={20} strokeWidth={2.5} className="text-white" />
            </div>
            <div>
              <h3
                className="text-xl md:text-2xl font-extrabold"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                TLS 1.3 仅有的 5 个密码套件
              </h3>
              <p
                className="text-sm"
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  opacity: 0.5,
                }}
              >
                全部采用 AEAD 认证加密模式，密钥交换由独立扩展处理
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                name: "TLS_AES_128_GCM_SHA256",
                tag: "最常用",
                tagColor: "var(--quaternary)",
              },
              {
                name: "TLS_AES_256_GCM_SHA384",
                tag: "高安全",
                tagColor: "var(--accent)",
              },
              {
                name: "TLS_CHACHA20_POLY1305_SHA256",
                tag: "移动端首选",
                tagColor: "var(--tertiary)",
              },
              {
                name: "TLS_AES_128_CCM_SHA256",
                tag: "IoT 友好",
                tagColor: "var(--secondary)",
              },
              {
                name: "TLS_AES_128_CCM_8_SHA256",
                tag: "8字节标签",
                tagColor: "var(--secondary)",
              },
            ].map((suite, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 rounded-xl border-2 px-4 py-3"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--background)",
                }}
              >
                <span
                  className="text-sm font-mono font-bold flex-1"
                  style={{ color: "var(--foreground)" }}
                >
                  {suite.name}
                </span>
                <span
                  className="shrink-0 px-3 py-1 text-xs font-bold rounded-full border-2"
                  style={{
                    borderColor: "var(--foreground)",
                    background: `${suite.tagColor}20`,
                    color: suite.tagColor,
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  {suite.tag}
                </span>
              </div>
            ))}
          </div>

          <div
            className="mt-6 rounded-xl border-2 border-dashed p-4 flex items-start gap-3"
            style={{ borderColor: "var(--tertiary)", background: "#fbbf2410" }}
          >
            <AlertTriangle
              size={20}
              strokeWidth={2.5}
              className="shrink-0 mt-0.5"
              style={{ color: "var(--tertiary)" }}
            />
            <p
              className="text-sm"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                color: "var(--foreground)",
              }}
            >
              <strong>注意：</strong>TLS 1.3 的密码套件格式与 TLS 1.2
              不同。TLS 1.3 套件仅指定 AEAD 算法和哈希函数，密钥交换算法由
              KeyShare 扩展独立协商，认证算法由 SignatureAlgorithms
              扩展独立协商。这种解耦设计使协议更加灵活和安全。
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ 核心流程代码示例 ═══════════ */}
      <section className="container mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-10 h-10 rounded-lg border-2 flex items-center justify-center"
            style={{
              borderColor: "var(--foreground)",
              background: "var(--quaternary)",
            }}
          >
            <KeyRound size={20} strokeWidth={2.5} className="text-white" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            密钥计算过程
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TLS 1.2 密钥计算 */}
          <div
            className="topic-card rounded-2xl overflow-hidden"
            style={{ borderColor: "var(--foreground)" }}
          >
            <div
              className="px-5 py-3 border-b-2 font-bold flex items-center gap-2"
              style={{
                borderColor: "var(--foreground)",
                background: "var(--tertiary)",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              <Timer size={18} strokeWidth={2.5} />
              TLS 1.2 — PRF 密钥派生
            </div>
            <pre
              className="p-5 text-xs overflow-x-auto leading-relaxed"
              style={{
                background: "#1a1b26",
                color: "#a9b1d6",
                fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
              }}
            >
              <code className="language-plaintext">{`# TLS 1.2 密钥派生流程

Pre_Master_Secret:
  RSA模式: RSA_Decrypt(ClientKeyExchange)
  ECDHE:   ECDH(私钥, 对方公钥)

Master_Secret = PRF(
  Pre_Master_Secret,
  "master secret",
  Client_Random + Server_Random   # 拼接
)  # 输出 48 字节

Key_Block = PRF(
  Master_Secret,
  "key expansion",
  Server_Random + Client_Random   # 注意顺序反转!
)

# 从 Key_Block 中按顺序提取:
├── client_write_MAC_key  (20字节, SHA-1)
├── server_write_MAC_key  (20字节)
├── client_write_key      (16字节, AES-128)
├── server_write_key      (16字节)
├── client_write_IV       (4字节)
└── server_write_IV       (4字节)`}</code>
            </pre>
          </div>

          {/* TLS 1.3 密钥计算 */}
          <div
            className="topic-card rounded-2xl overflow-hidden"
            style={{ borderColor: "var(--foreground)" }}
          >
            <div
              className="px-5 py-3 border-b-2 font-bold flex items-center gap-2"
              style={{
                borderColor: "var(--foreground)",
                background: "var(--quaternary)",
                color: "white",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              <Zap size={18} strokeWidth={2.5} />
              TLS 1.3 — HKDF 密钥派生
            </div>
            <pre
              className="p-5 text-xs overflow-x-auto leading-relaxed"
              style={{
                background: "#1a1b26",
                color: "#a9b1d6",
                fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
              }}
            >
              <code className="language-plaintext">{`# TLS 1.3 密钥派生流程 (HKDF)

Shared_Secret = ECDHE(私钥, 对方公钥)

# ┌─── HKDF-Extract ───────────────────┐
# │ Input : salt=0, IKM=Shared_Secret  │
# │ Output: Early Secret               │
# └─────────────────────────────────────┘
          │
          ├──→ Binder Key (PSK 场景)
          │
          ▼
# HKDF-Extract("", Derive-Secret(Early, "derived"))
#   → Handshake Secret

Handshake_Secret = HKDF-Extract(
  salt = HKDF-Expand(Early, "derived", ""),
  IKM  = Shared_Secret
)

# 派生 Handshake Traffic Keys:
client_handshake_key = HKDF-Expand(
  Derive-Secret(Handshake_Secret,
    "c hs traffic", Transcript_Hash),
  "key", 16)
server_handshake_key = ...

# 握手完成后:
master_secret = HKDF-Extract(
  salt = Handshake_Secret,
  IKM  = 0)
# → 派生 Application Traffic Keys`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ═══════════ 总结卡片 ═══════════ */}
      <section className="container">
        <div
          className="rounded-3xl border-[3px] p-8 md:p-12 relative overflow-hidden"
          style={{
            borderColor: "var(--foreground)",
            background: "linear-gradient(135deg, #8b5cf610 0%, #f472b610 50%, #34d39910 100%)",
            boxShadow: "10px 10px 0px 0px var(--foreground)",
          }}
        >
          {/* 装饰 */}
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-10"
            style={{ background: "var(--accent)" }}
          />
          <div
            className="absolute -bottom-8 -left-8 w-32 h-32 opacity-8"
            style={{
              background: "var(--tertiary)",
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl border-[3px] flex items-center justify-center"
                style={{
                  borderColor: "var(--foreground)",
                  background: "var(--accent)",
                }}
              >
                <Sparkles size={24} strokeWidth={2.5} className="text-white" />
              </div>
              <h2
                className="text-3xl md:text-4xl font-extrabold"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                核心要点总结
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  num: "01",
                  text: "TLS 1.3 将 KeyShare 前置到 ClientHello，握手仅需 1-RTT，速度提升约 50%",
                },
                {
                  num: "02",
                  text: "TLS 1.3 强制使用临时 DH 密钥交换（ECDHE），所有连接都具备前向保密",
                },
                {
                  num: "03",
                  text: "TLS 1.3 在 ServerHello 之后立即加密，证书等敏感信息不再明文传输",
                },
                {
                  num: "04",
                  text: "TLS 1.3 大幅简化密码套件（仅 5 个 AEAD 组合），消除配置错误风险",
                },
                {
                  num: "05",
                  text: "0-RTT 恢复虽快但有重放攻击风险，应仅用于幂等请求",
                },
                {
                  num: "06",
                  text: "生产环境应禁用 TLS 1.0/1.1，优先使用 TLS 1.3，兼容性需求可保留 TLS 1.2",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl border-2 p-4 bg-white/60 backdrop-blur-sm"
                  style={{ borderColor: "var(--foreground)" }}
                >
                  <span
                    className="text-2xl font-extrabold shrink-0 leading-none"
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "var(--accent)",
                      opacity: 0.4,
                    }}
                  >
                    {item.num}
                  </span>
                  <p
                    className="text-sm leading-relaxed font-medium"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}