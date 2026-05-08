"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Zap,
  Layers,
  ArrowRight,
  Globe,
  Lock,
  Server,
  Monitor,
  RefreshCw,
  Binary,
  Shuffle,
  Archive,
  ChevronDown,
  ChevronRight,
  Wifi,
  Shield,
  Clock,
  Gauge,
  Network,
  Package,
  ArrowDown,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Workflow,
  SplitSquareHorizontal,
  Cpu,
  Radio,
  Signal,
  Eye,
  MousePointerClick,
  Lightbulb,
  Rocket,
  Star,
  TrendingUp,
} from "lucide-react";

// ============================================================
// 数据定义
// ============================================================

const httpVersions = [
  {
    version: "HTTP/0.9",
    year: "1991",
    color: "var(--border)",
    features: ["仅支持 GET", "纯文本响应", "无 Header"],
  },
  {
    version: "HTTP/1.0",
    year: "1996",
    color: "var(--tertiary)",
    features: ["引入状态码", "支持 Header", "每次请求一个连接"],
  },
  {
    version: "HTTP/1.1",
    year: "1997",
    color: "var(--secondary)",
    features: ["持久连接", "管线化（有队头阻塞）", "分块传输"],
  },
  {
    version: "HTTP/2.0",
    year: "2015",
    color: "var(--accent)",
    features: ["二进制分帧", "多路复用", "头部压缩", "服务器推送"],
  },
  {
    version: "HTTP/3.0",
    year: "2022",
    color: "var(--quaternary)",
    features: ["基于 QUIC/UDP", "0-RTT 建连", "独立流", "内置加密"],
  },
];

const h2Features = [
  {
    icon: Binary,
    title: "二进制分帧层",
    color: "var(--accent)",
    bgColor: "#EDE9FE",
    desc: "HTTP/2 将所有传输的数据分割为更小的消息和帧（Frame），并采用二进制格式编码。这使得解析更高效、更紧凑。",
    detail:
      "每个帧包含 9 字节的帧头：长度(3B) + 类型(1B) + 标志(1B) + 流标识符(4B)。常见的帧类型包括 DATA、HEADERS、SETTINGS、WINDOW_UPDATE 等。",
  },
  {
    icon: Shuffle,
    title: "多路复用 (Multiplexing)",
    color: "var(--secondary)",
    bgColor: "#FCE7F3",
    desc: "同一个 TCP 连接上可以并行发送多个请求和响应，互不干扰。彻底解决了 HTTP/1.1 的队头阻塞问题。",
    detail:
      "每个请求/响应对被分配一个唯一的 Stream ID。多个 Stream 共享同一个 TCP 连接，按帧交错发送。接收端根据 Stream ID 重新组装。",
  },
  {
    icon: Archive,
    title: "头部压缩 (HPACK)",
    color: "var(--tertiary)",
    bgColor: "#FEF3C7",
    desc: "使用 HPACK 算法压缩 HTTP 头部。维护一个头部字段表，避免重复传输相同的头部信息。",
    detail:
      "HPACK 使用静态表（61个预定义常用头部）和动态表（连接级别），结合霍夫曼编码实现高效压缩。可减少 80%~90% 的头部大小。",
  },
  {
    icon: Server,
    title: "服务器推送 (Server Push)",
    color: "var(--quaternary)",
    bgColor: "#D1FAE5",
    desc: "服务器可以在客户端请求之前，主动将资源推送到客户端缓存中，减少往返延迟。",
    detail:
      "服务器通过 PUSH_PROMISE 帧通知客户端即将推送的资源。客户端可以通过 RST_STREAM 帧拒绝不需要的推送。注意：Chrome 已于 2022 年移除了 Server Push 支持。",
  },
  {
    icon: TrendingUp,
    title: "流优先级 (Stream Priority)",
    color: "var(--accent)",
    bgColor: "#EDE9FE",
    desc: "客户端可以为每个流分配权重和依赖关系，让服务器优先传输关键资源。",
    detail:
      "使用依赖树 + 权重(1-256) 的方式。例如 CSS 可以依赖于 HTML，JS 依赖于 CSS，形成资源加载优先级链。",
  },
  {
    icon: Signal,
    title: "流量控制 (Flow Control)",
    color: "var(--secondary)",
    bgColor: "#FCE7F3",
    desc: "基于窗口的流量控制机制，防止接收端被淹没。每个流和连接都有独立的流量控制窗口。",
    detail:
      "接收端通过 WINDOW_UPDATE 帧告知发送端可用的缓冲区大小。初始窗口大小为 65,535 字节，可动态调整。",
  },
];

const h3Features = [
  {
    icon: Radio,
    title: "基于 QUIC 协议",
    color: "var(--quaternary)",
    bgColor: "#D1FAE5",
    desc: "HTTP/3 不再使用 TCP，而是基于 QUIC（Quick UDP Internet Connections）协议，构建在 UDP 之上。",
    detail:
      "QUIC 在用户空间实现，不依赖操作系统内核更新。将传输层和加密层合并，实现了更灵活的协议演进。",
  },
  {
    icon: Zap,
    title: "0-RTT / 1-RTT 建连",
    color: "var(--tertiary)",
    bgColor: "#FEF3C7",
    desc: "首次连接仅需 1-RTT（TCP+TLS 需要 2~3 RTT），再次连接可实现 0-RTT，极大减少延迟。",
    detail:
      "QUIC 将传输握手和加密握手合并。客户端首次连接时缓存服务器配置，后续连接可直接发送加密数据（0-RTT）。",
  },
  {
    icon: Shield,
    title: "内置 TLS 1.3 加密",
    color: "var(--accent)",
    bgColor: "#EDE9FE",
    desc: "加密是 QUIC 的内置特性，所有 HTTP/3 连接默认加密。不再有明文 HTTP 的可能性。",
    detail:
      "QUIC 强制使用 TLS 1.3，比 TLS 1.2 更安全且更快。连接建立和加密握手同步完成，无需额外 RTT。",
  },
  {
    icon: Layers,
    title: "独立流消除队头阻塞",
    color: "var(--secondary)",
    bgColor: "#FCE7F3",
    desc: "每个流都是独立的。某个流的丢包只会影响该流，不会阻塞其他流的传输。这是对 HTTP/2 最关键的改进。",
    detail:
      "HTTP/2 虽然解决了 HTTP 层的队头阻塞，但 TCP 层的队头阻塞仍然存在。QUIC 在传输层实现了真正的独立流，彻底解决此问题。",
  },
  {
    icon: Wifi,
    title: "连接迁移 (Connection Migration)",
    color: "var(--quaternary)",
    bgColor: "#D1FAE5",
    desc: "使用 Connection ID 而非 IP+端口标识连接。切换 WiFi/4G 时连接不断开，无需重新握手。",
    detail:
      "TCP 使用四元组（源IP、源端口、目标IP、目标端口）标识连接。QUIC 使用 Connection ID，网络切换时连接可以无缝迁移。",
  },
  {
    icon: Package,
    title: "改进的拥塞控制",
    color: "var(--tertiary)",
    bgColor: "#FEF3C7",
    desc: "QUIC 实现了可插拔的拥塞控制算法，并在用户空间实现，支持更快速的迭代和优化。",
    detail:
      "默认使用类似 TCP Cubic 的算法，但可轻松替换为 BBR 等更先进的算法。支持更精细的丢包检测（基于包号而非序列号）。",
  },
];

const comparisonData = [
  { aspect: "传输层协议", h2: "TCP", h3: "QUIC (UDP)", winner: "h3" },
  {
    aspect: "握手延迟",
    h2: "TCP + TLS = 2~3 RTT",
    h3: "首次 1-RTT，再次 0-RTT",
    winner: "h3",
  },
  {
    aspect: "队头阻塞",
    h2: "TCP 层仍存在",
    h3: "完全消除",
    winner: "h3",
  },
  { aspect: "多路复用", h2: "✅ 支持", h3: "✅ 支持（更优）", winner: "h3" },
  { aspect: "头部压缩", h2: "HPACK (TCP)", h3: "QPACK (UDP)", winner: "draw" },
  { aspect: "加密", h2: "可选 (TLS)", h3: "强制内置 (TLS 1.3)", winner: "h3" },
  { aspect: "连接迁移", h2: "❌ 不支持", h3: "✅ 支持", winner: "h3" },
  {
    aspect: "服务器推送",
    h2: "✅ 支持（已弃用）",
    h3: "⚠️ 规范支持，实践减少",
    winner: "draw",
  },
  {
    aspect: "浏览器支持",
    h2: "所有主流浏览器",
    h3: "Chrome/Edge/Firefox/Safari",
    winner: "h2",
  },
  {
    aspect: "部署复杂度",
    h2: "较低",
    h3: "较高（需 UDP 支持）",
    winner: "h2",
  },
];

// ============================================================
// 子组件
// ============================================================

function GeometricBadge({
  children,
  color,
  size = "md",
}: {
  children: React.ReactNode;
  color: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-18 h-18",
  };
  return (
    <div
      className={`${sizeClasses[size]} rounded-xl flex items-center justify-center shrink-0`}
      style={{
        border: "2px solid var(--foreground)",
        backgroundColor: color,
        boxShadow: "3px 3px 0px 0px var(--foreground)",
      }}
    >
      {children}
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  color,
  bgColor,
  desc,
  detail,
  index,
}: {
  icon: React.ElementType;
  title: string;
  color: string;
  bgColor: string;
  desc: string;
  detail: string;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="animate-slide"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className="topic-card p-0 overflow-hidden cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
        style={{
          borderColor: "var(--foreground)",
          boxShadow: expanded
            ? `6px 6px 0px 0px ${color}`
            : "6px 6px 0px 0px var(--foreground)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Card Header */}
        <div className="p-5 flex items-start gap-4">
          <GeometricBadge color={bgColor}>
            <Icon
              size={24}
              strokeWidth={2.5}
              style={{ color: "var(--foreground)" }}
            />
          </GeometricBadge>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4
                className="text-lg font-extrabold"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {title}
              </h4>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-2"
                style={{
                  border: "2px solid var(--foreground)",
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                  backgroundColor: bgColor,
                }}
              >
                <ChevronDown size={14} strokeWidth={3} />
              </div>
            </div>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: "#475569", fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              {desc}
            </p>
          </div>
        </div>

        {/* Expanded Detail */}
        <div
          style={{
            maxHeight: expanded ? "300px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.4s ease",
          }}
        >
          <div
            className="px-5 pb-5 pt-0"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            <div
              className="p-4 rounded-xl text-sm leading-relaxed"
              style={{
                backgroundColor: bgColor,
                border: "2px solid var(--foreground)",
                color: "#334155",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={14} strokeWidth={2.5} />
                <span className="font-bold text-xs uppercase tracking-wider">
                  深入理解
                </span>
              </div>
              {detail}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProtocolDiagram({ type }: { type: "h2" | "h3" }) {
  if (type === "h2") {
    return (
      <div
        className="p-6 rounded-2xl overflow-x-auto"
        style={{
          border: "2px solid var(--foreground)",
          backgroundColor: "var(--card)",
          boxShadow: "8px 8px 0px 0px var(--accent)",
        }}
      >
        <h4
          className="text-sm font-extrabold uppercase tracking-wider mb-6 text-center"
          style={{ fontFamily: "Outfit, sans-serif", color: "var(--accent)" }}
        >
          HTTP/2 协议栈
        </h4>
        <div className="flex flex-col items-center gap-2 min-w-[320px]">
          {/* Application Layer */}
          <div
            className="w-full max-w-sm p-3 rounded-xl text-center text-sm font-bold"
            style={{
              backgroundColor: "#EDE9FE",
              border: "2px solid var(--foreground)",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            HTTP 请求/响应
          </div>
          <ArrowDown size={16} strokeWidth={3} />
          {/* Binary Framing */}
          <div
            className="w-full max-w-sm p-3 rounded-xl text-center text-sm font-bold"
            style={{
              backgroundColor: "var(--accent)",
              color: "white",
              border: "2px solid var(--foreground)",
              fontFamily: "Outfit, sans-serif",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            ⬡ 二进制分帧层 (Binary Framing)
          </div>
          <ArrowDown size={16} strokeWidth={3} />
          {/* TLS */}
          <div
            className="w-full max-w-sm p-3 rounded-xl text-center text-sm font-bold"
            style={{
              backgroundColor: "#FEF3C7",
              border: "2px solid var(--foreground)",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            🔒 TLS 加密层（可选）
          </div>
          <ArrowDown size={16} strokeWidth={3} />
          {/* TCP */}
          <div
            className="w-full max-w-sm p-3 rounded-xl text-center text-sm font-bold"
            style={{
              backgroundColor: "#FCE7F3",
              border: "2px solid var(--foreground)",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            TCP 传输层
          </div>
          <ArrowDown size={16} strokeWidth={3} />
          {/* IP */}
          <div
            className="w-full max-w-sm p-3 rounded-xl text-center text-sm font-bold opacity-70"
            style={{
              backgroundColor: "var(--border)",
              border: "2px solid var(--foreground)",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            IP 层
          </div>
        </div>
        <div
          className="mt-4 p-3 rounded-xl text-xs text-center"
          style={{
            backgroundColor: "#FEF9C3",
            border: "2px dashed var(--tertiary)",
            color: "#92400E",
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
        >
          ⚠️ TCP 层的队头阻塞依然存在 — 一个包丢失会阻塞所有流
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-6 rounded-2xl overflow-x-auto"
      style={{
        border: "2px solid var(--foreground)",
        backgroundColor: "var(--card)",
        boxShadow: "8px 8px 0px 0px var(--quaternary)",
      }}
    >
      <h4
        className="text-sm font-extrabold uppercase tracking-wider mb-6 text-center"
        style={{
          fontFamily: "Outfit, sans-serif",
          color: "var(--quaternary)",
        }}
      >
        HTTP/3 协议栈
      </h4>
      <div className="flex flex-col items-center gap-2 min-w-[320px]">
        <div
          className="w-full max-w-sm p-3 rounded-xl text-center text-sm font-bold"
          style={{
            backgroundColor: "#D1FAE5",
            border: "2px solid var(--foreground)",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          HTTP 请求/响应
        </div>
        <ArrowDown size={16} strokeWidth={3} />
        <div
          className="w-full max-w-sm p-3 rounded-xl text-center text-sm font-bold"
          style={{
            backgroundColor: "#EDE9FE",
            border: "2px solid var(--foreground)",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          QPACK 头部压缩
        </div>
        <ArrowDown size={16} strokeWidth={3} />
        <div
          className="w-full max-w-sm p-3 rounded-xl text-center text-sm font-bold relative"
          style={{
            backgroundColor: "var(--quaternary)",
            color: "white",
            border: "2px solid var(--foreground)",
            fontFamily: "Outfit, sans-serif",
            boxShadow: "4px 4px 0px 0px var(--foreground)",
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <span>⬡</span>
            <span>QUIC 协议</span>
          </div>
          <div
            className="flex justify-center gap-3 mt-2 text-xs font-bold"
            style={{ color: "white" }}
          >
            <span
              className="px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
            >
              传输
            </span>
            <span
              className="px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
            >
              TLS 1.3
            </span>
          </div>
        </div>
        <ArrowDown size={16} strokeWidth={3} />
        <div
          className="w-full max-w-sm p-3 rounded-xl text-center text-sm font-bold"
          style={{
            backgroundColor: "#FEF3C7",
            border: "2px solid var(--foreground)",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          UDP
        </div>
        <ArrowDown size={16} strokeWidth={3} />
        <div
          className="w-full max-w-sm p-3 rounded-xl text-center text-sm font-bold opacity-70"
          style={{
            backgroundColor: "var(--border)",
            border: "2px solid var(--foreground)",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          IP 层
        </div>
      </div>
      <div
        className="mt-4 p-3 rounded-xl text-xs text-center"
        style={{
          backgroundColor: "#D1FAE5",
          border: "2px dashed var(--quaternary)",
          color: "#065F46",
          fontFamily: "Plus Jakarta Sans, sans-serif",
        }}
      >
        ✅ 传输 + 加密合并 — 每个流完全独立，彻底消除队头阻塞
      </div>
    </div>
  );
}

function MultiplexingDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= 12) {
          setIsRunning(false);
          return 12;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setStep(0);
    setIsRunning(true);
  };

  const h2Streams = [
    { id: 1, label: "HTML", color: "var(--accent)" },
    { id: 2, label: "CSS", color: "var(--secondary)" },
    { id: 3, label: "JS", color: "var(--tertiary)" },
    { id: 4, label: "IMG", color: "var(--quaternary)" },
  ];

  return (
    <div
      className="p-6 rounded-2xl"
      style={{
        border: "2px solid var(--foreground)",
        backgroundColor: "var(--card)",
        boxShadow: "8px 8px 0px 0px var(--tertiary)",
      }}
    >
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h4
          className="text-base font-extrabold uppercase tracking-wider"
          style={{ fontFamily: "Outfit, sans-serif", color: "var(--foreground)" }}
        >
          <MousePointerClick
            size={16}
            strokeWidth={2.5}
            className="inline mr-2"
          />
          交互演示：多路复用
        </h4>
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="px-5 py-2 rounded-full text-sm font-bold transition-all"
          style={{
            backgroundColor: isRunning ? "var(--border)" : "var(--accent)",
            color: isRunning ? "#94A3B8" : "white",
            border: "2px solid var(--foreground)",
            boxShadow: isRunning
              ? "none"
              : "4px 4px 0px 0px var(--foreground)",
            fontFamily: "Outfit, sans-serif",
            cursor: isRunning ? "not-allowed" : "pointer",
          }}
        >
          {isRunning ? "传输中..." : step >= 12 ? "重新演示" : "▶ 开始演示"}
        </button>
      </div>

      {/* HTTP/1.1 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{
              backgroundColor: "#FEE2E2",
              border: "2px solid #EF4444",
              color: "#DC2626",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            HTTP/1.1 串行请求
          </div>
        </div>
        <div className="space-y-2">
          {h2Streams.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <span
                className="text-xs font-bold w-10 shrink-0 text-right"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {s.label}
              </span>
              <div
                className="flex-1 h-8 rounded-lg relative overflow-hidden"
                style={{ backgroundColor: "#F1F5F9", border: "1.5px solid #CBD5E1" }}
              >
                <div
                  className="absolute left-0 top-0 h-full rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: s.color,
                    width:
                      step === 0
                        ? "0%"
                        : step <= (i + 1) * 3
                        ? step > i * 3
                          ? `${Math.min(
                              ((step - i * 3) / 3) * 100,
                              100
                            )}%`
                          : "0%"
                        : "100%",
                    opacity: 0.7,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <p
          className="text-xs mt-2"
          style={{
            color: "#EF4444",
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
        >
          😫 请求必须排队等待，总耗时 = 所有请求之和
        </p>
      </div>

      {/* HTTP/2 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{
              backgroundColor: "#EDE9FE",
              border: "2px solid var(--accent)",
              color: "var(--accent)",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            HTTP/2 多路复用
          </div>
        </div>
        <div className="space-y-2">
          {h2Streams.map((s) => (
            <div key={s.id} className="flex items-center gap-2">
              <span
                className="text-xs font-bold w-10 shrink-0 text-right"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {s.label}
              </span>
              <div
                className="flex-1 h-8 rounded-lg relative overflow-hidden"
                style={{ backgroundColor: "#F1F5F9", border: "1.5px solid #CBD5E1" }}
              >
                <div
                  className="absolute left-0 top-0 h-full rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: s.color,
                    width:
                      step === 0
                        ? "0%"
                        : step <= 12
                        ? `${Math.min((step / 3) * 100, 100)}%`
                        : "100%",
                    opacity: 0.7,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <p
          className="text-xs mt-2"
          style={{
            color: "var(--quaternary)",
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
        >
          🚀 所有请求并行传输，总耗时 ≈ 单个最慢的请求
        </p>
      </div>
    </div>
  );
}

function RTTComparison() {
  return (
    <div
      className="p-6 rounded-2xl"
      style={{
        border: "2px solid var(--foreground)",
        backgroundColor: "var(--card)",
        boxShadow: "8px 8px 0px 0px var(--secondary)",
      }}
    >
      <h4
        className="text-base font-extrabold uppercase tracking-wider mb-6 text-center"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        🏎️ 连接建立延迟对比
      </h4>

      <div className="space-y-6">
        {/* TCP + TLS 1.2 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: "#FEE2E2",
                border: "2px solid #EF4444",
                color: "#DC2626",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              TCP + TLS 1.2 = 3 RTT
            </span>
          </div>
          <div className="flex gap-1">
            {["SYN", "SYN-ACK", "ACK", "ClientHello", "ServerHello", "Finished"].map(
              (msg, i) => (
                <div
                  key={i}
                  className="flex-1 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold"
                  style={{
                    backgroundColor:
                      i < 2 ? "#FEE2E2" : i < 3 ? "#FEF3C7" : "#EDE9FE",
                    border: "1.5px solid #CBD5E1",
                    fontFamily: "Outfit, sans-serif",
                    color: "#475569",
                  }}
                >
                  {msg}
                </div>
              )
            )}
          </div>
        </div>

        {/* TCP + TLS 1.3 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: "#FEF3C7",
                border: "2px solid var(--tertiary)",
                color: "#92400E",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              TCP + TLS 1.3 = 2 RTT
            </span>
          </div>
          <div className="flex gap-1">
            {["SYN", "SYN-ACK+Hello", "ACK+Finished", "Data"].map(
              (msg, i) => (
                <div
                  key={i}
                  className="flex-1 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold"
                  style={{
                    backgroundColor:
                      i < 2 ? "#FEF3C7" : i < 3 ? "#EDE9FE" : "#D1FAE5",
                    border: "1.5px solid #CBD5E1",
                    fontFamily: "Outfit, sans-serif",
                    color: "#475569",
                  }}
                >
                  {msg}
                </div>
              )
            )}
          </div>
        </div>

        {/* QUIC 1-RTT */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: "#D1FAE5",
                border: "2px solid var(--quaternary)",
                color: "#065F46",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              QUIC 首次 = 1 RTT ⚡
            </span>
          </div>
          <div className="flex gap-1">
            {["ClientHello+Transport", "ServerHello+Data", "Data"].map(
              (msg, i) => (
                <div
                  key={i}
                  className="flex-1 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold"
                  style={{
                    backgroundColor:
                      i < 1 ? "#EDE9FE" : "#D1FAE5",
                    border: "1.5px solid #CBD5E1",
                    fontFamily: "Outfit, sans-serif",
                    color: "#475569",
                  }}
                >
                  {msg}
                </div>
              )
            )}
          </div>
        </div>

        {/* QUIC 0-RTT */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: "var(--quaternary)",
                border: "2px solid var(--foreground)",
                color: "white",
                fontFamily: "Outfit, sans-serif",
                boxShadow: "3px 3px 0px 0px var(--foreground)",
              }}
            >
              QUIC 再次连接 = 0 RTT 🚀🚀
            </span>
          </div>
          <div className="flex gap-1">
            <div
              className="flex-1 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold"
              style={{
                backgroundColor: "var(--quaternary)",
                border: "1.5px solid var(--foreground)",
                fontFamily: "Outfit, sans-serif",
                color: "white",
              }}
            >
              立即发送加密数据！
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadOfLineBlockingDemo() {
  return (
    <div
      className="p-6 rounded-2xl"
      style={{
        border: "2px solid var(--foreground)",
        backgroundColor: "var(--card)",
        boxShadow: "8px 8px 0px 0px var(--tertiary)",
      }}
    >
      <h4
        className="text-base font-extrabold uppercase tracking-wider mb-6 text-center"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        🔗 队头阻塞问题图解
      </h4>

      <div className="space-y-8">
        {/* TCP HOL */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: "#FEE2E2",
                border: "2px solid #EF4444",
                color: "#DC2626",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              HTTP/2 (TCP) — 存在队头阻塞
            </div>
          </div>
          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: "#FFF7ED", border: "1.5px solid #FED7AA" }}
          >
            <div className="grid grid-cols-4 gap-2 text-center mb-2">
              {["Stream 1", "Stream 2", "Stream 3", "Stream 4"].map((s, i) => (
                <div
                  key={i}
                  className="text-[10px] font-bold py-1 rounded"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    backgroundColor:
                      i === 0 ? "#FEE2E2" : "#F1F5F9",
                    border: "1.5px solid #CBD5E1",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
            {/* Packet 1 */}
            <div className="grid grid-cols-4 gap-2 mb-1">
              {["📦 P1 ✅", "📦 P1 ✅", "📦 P1 ✅", "📦 P1 ✅"].map((p, i) => (
                <div
                  key={i}
                  className="text-[10px] py-1.5 rounded text-center font-bold"
                  style={{
                    backgroundColor: "#D1FAE5",
                    border: "1px solid #6EE7B7",
                    color: "#065F46",
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
            {/* Packet 2 - Lost! */}
            <div className="grid grid-cols-4 gap-2 mb-1">
              {["❌ 丢失!", "📦 P2", "📦 P2", "📦 P2"].map((p, i) => (
                <div
                  key={i}
                  className="text-[10px] py-1.5 rounded text-center font-bold"
                  style={{
                    backgroundColor:
                      i === 0 ? "#FEE2E2" : "#FEF9C3",
                    border:
                      i === 0
                        ? "1px solid #EF4444"
                        : "1px solid #FBBF24",
                    color: i === 0 ? "#DC2626" : "#92400E",
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
            {/* Blocked */}
            <div className="grid grid-cols-4 gap-2">
              {["⛔ 阻塞!", "⛔ 阻塞!", "⛔ 阻塞!", "⛔ 阻塞!"].map((p, i) => (
                <div
                  key={i}
                  className="text-[10px] py-1.5 rounded text-center font-bold"
                  style={{
                    backgroundColor: "#FEE2E2",
                    border: "1px solid #FCA5A5",
                    color: "#DC2626",
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
            <p
              className="text-xs mt-3 text-center"
              style={{ color: "#DC2626", fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              TCP 层一个包丢失 → 所有流等待重传 → 全部阻塞！
            </p>
          </div>
        </div>

        {/* QUIC Independent Streams */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: "#D1FAE5",
                border: "2px solid var(--quaternary)",
                color: "#065F46",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              HTTP/3 (QUIC) — 无队头阻塞 ✅
            </div>
          </div>
          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: "#F0FDF4", border: "1.5px solid #86EFAC" }}
          >
            <div className="grid grid-cols-4 gap-2 text-center mb-2">
              {["Stream 1", "Stream 2", "Stream 3", "Stream 4"].map((s, i) => (
                <div
                  key={i}
                  className="text-[10px] font-bold py-1 rounded"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    backgroundColor:
                      i === 0 ? "#FEE2E2" : "#ECFDF5",
                    border: "1.5px solid #6EE7B7",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 mb-1">
              {["📦 P1 ✅", "📦 P1 ✅", "📦 P1 ✅", "📦 P1 ✅"].map((p, i) => (
                <div
                  key={i}
                  className="text-[10px] py-1.5 rounded text-center font-bold"
                  style={{
                    backgroundColor: "#D1FAE5",
                    border: "1px solid #6EE7B7",
                    color: "#065F46",
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 mb-1">
              {["❌ 丢失!", "📦 P2 ✅", "📦 P2 ✅", "📦 P2 ✅"].map((p, i) => (
                <div
                  key={i}
                  className="text-[10px] py-1.5 rounded text-center font-bold"
                  style={{
                    backgroundColor:
                      i === 0 ? "#FEE2E2" : "#D1FAE5",
                    border:
                      i === 0
                        ? "1px solid #EF4444"
                        : "1px solid #6EE7B7",
                    color: i === 0 ? "#DC2626" : "#065F46",
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {["⛔ 仅S1阻塞", "✅ 继续", "✅ 继续", "✅ 继续"].map((p, i) => (
                <div
                  key={i}
                  className="text-[10px] py-1.5 rounded text-center font-bold"
                  style={{
                    backgroundColor:
                      i === 0 ? "#FEF3C7" : "#D1FAE5",
                    border:
                      i === 0
                        ? "1px solid #FBBF24"
                        : "1px solid #6EE7B7",
                    color: i === 0 ? "#92400E" : "#065F46",
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
            <p
              className="text-xs mt-3 text-center"
              style={{ color: "#065F46", fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              仅受影响的流阻塞重传，其他流继续正常传输！🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConnectionMigrationDemo() {
  return (
    <div
      className="p-6 rounded-2xl"
      style={{
        border: "2px solid var(--foreground)",
        backgroundColor: "var(--card)",
        boxShadow: "8px 8px 0px 0px var(--quaternary)",
      }}
    >
      <h4
        className="text-base font-extrabold uppercase tracking-wider mb-4"
        style={{ fontFamily: "Outfit, sans-serif", color: "var(--quaternary)" }}
      >
        📱 连接迁移演示
      </h4>
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* WiFi */}
        <div
          className="flex-1 w-full p-4 rounded-xl text-center"
          style={{ backgroundColor: "#DBEAFE", border: "2px solid #93C5FD" }}
        >
          <Wifi size={28} strokeWidth={2.5} className="mx-auto mb-2" style={{ color: "#2563EB" }} />
          <div className="text-sm font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
            WiFi
          </div>
          <div className="text-[10px] mt-1" style={{ color: "#64748B" }}>
            IP: 192.168.1.100
          </div>
        </div>

        {/* Arrow with phone */}
        <div className="flex flex-col items-center gap-1">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              backgroundColor: "var(--quaternary)",
              border: "2px solid var(--foreground)",
              boxShadow: "4px 4px 0px 0px var(--foreground)",
            }}
          >
            <Monitor size={24} strokeWidth={2.5} style={{ color: "white" }} />
          </div>
          <span className="text-xs font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
            切换网络
          </span>
        </div>

        {/* 4G */}
        <div
          className="flex-1 w-full p-4 rounded-xl text-center"
          style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D" }}
        >
          <Radio size={28} strokeWidth={2.5} className="mx-auto mb-2" style={{ color: "#D97706" }} />
          <div className="text-sm font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
            4G/5G
          </div>
          <div className="text-[10px] mt-1" style={{ color: "#64748B" }}>
            IP: 10.0.0.55
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: "#FEE2E2", border: "1.5px solid #FCA5A5" }}
        >
          <div className="flex items-center gap-2">
            <XCircle size={14} strokeWidth={2.5} style={{ color: "#DC2626" }} />
            <span className="text-xs font-bold" style={{ fontFamily: "Outfit, sans-serif", color: "#DC2626" }}>
              TCP: 断开重连
            </span>
          </div>
          <p className="text-[10px] mt-1" style={{ color: "#991B1B", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            四元组变化 → 连接失效 → 重新握手
          </p>
        </div>
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: "#D1FAE5", border: "1.5px solid #6EE7B7" }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} strokeWidth={2.5} style={{ color: "#059669" }} />
            <span className="text-xs font-bold" style={{ fontFamily: "Outfit, sans-serif", color: "#059669" }}>
              QUIC: 无缝迁移
            </span>
          </div>
          <p className="text-[10px] mt-1" style={{ color: "#065F46", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            Connection ID 不变 → 连接继续 → 零中断
          </p>
        </div>
      </div>
    </div>
  );
}

function ComparisonTable() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "2px solid var(--foreground)",
        boxShadow: "8px 8px 0px 0px var(--foreground)",
      }}
    >
      <div
        className="grid grid-cols-4 text-xs font-extrabold uppercase tracking-wider"
        style={{
          fontFamily: "Outfit, sans-serif",
          borderBottom: "2px solid var(--foreground)",
        }}
      >
        <div className="p-4" style={{ backgroundColor: "var(--foreground)", color: "white" }}>
          特性
        </div>
        <div className="p-4" style={{ backgroundColor: "var(--accent)", color: "white" }}>
          HTTP/2
        </div>
        <div className="p-4" style={{ backgroundColor: "var(--quaternary)", color: "white" }}>
          HTTP/3
        </div>
        <div className="p-4" style={{ backgroundColor: "var(--tertiary)", color: "var(--foreground)" }}>
          优势
        </div>
      </div>
      {comparisonData.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-4 text-xs"
          style={{
            borderBottom:
              i < comparisonData.length - 1
                ? "1.5px solid var(--border)"
                : "none",
            backgroundColor: i % 2 === 0 ? "var(--card)" : "#FAFAF5",
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
        >
          <div className="p-3 font-bold" style={{ color: "var(--foreground)" }}>
            {row.aspect}
          </div>
          <div className="p-3" style={{ color: "#475569" }}>
            {row.h2}
          </div>
          <div className="p-3" style={{ color: "#475569" }}>
            {row.h3}
          </div>
          <div className="p-3 flex items-center">
            {row.winner === "h2" && (
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{
                  backgroundColor: "#EDE9FE",
                  border: "1px solid var(--accent)",
                  color: "var(--accent)",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                HTTP/2
              </span>
            )}
            {row.winner === "h3" && (
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{
                  backgroundColor: "#D1FAE5",
                  border: "1px solid var(--quaternary)",
                  color: "#059669",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                HTTP/3
              </span>
            )}
            {row.winner === "draw" && (
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{
                  backgroundColor: "#FEF3C7",
                  border: "1px solid var(--tertiary)",
                  color: "#92400E",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                持平
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// 主页面组件
// ============================================================

export default function HttpKnowledgePage() {
  const [activeVersion, setActiveVersion] = useState(3); // HTTP/2 by default

  return (
    <div
      className="bg-dot-grid min-h-screen pb-24"
      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
    >
      {/* ========== HERO SECTION ========== */}
      <section className="container relative overflow-hidden">
        {/* Decorative Blobs */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 opacity-15 pointer-events-none"
          style={{
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            backgroundColor: "var(--accent)",
          }}
        />
        <div
          className="absolute bottom-10 -left-16 w-48 h-48 opacity-10 pointer-events-none"
          style={{
            borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
            backgroundColor: "var(--secondary)",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-32 h-32 opacity-8 pointer-events-none"
          style={{
            borderRadius: "50% 50% 40% 60% / 60% 40% 60% 40%",
            backgroundColor: "var(--tertiary)",
          }}
        />

        <div className="container pt-16 md:pt-24 pb-12">
          {/* Category Tag */}
          <div className="animate-pop mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
              style={{
                backgroundColor: "#EDE9FE",
                border: "2px solid var(--foreground)",
                boxShadow: "4px 4px 0px 0px var(--accent)",
                color: "var(--accent)",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              <Globe size={16} strokeWidth={2.5} />
              网络协议
            </span>
          </div>

          {/* Main Title */}
          <h1
            className="animate-pop text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
            style={{
              fontFamily: "Outfit, sans-serif",
              color: "var(--foreground)",
              animationDelay: "0.1s",
            }}
          >
            HTTP/2 & HTTP/3
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), var(--secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              深度解析
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-slide text-lg md:text-xl max-w-2xl leading-relaxed mb-8"
            style={{
              color: "#64748B",
              animationDelay: "0.3s",
            }}
          >
            从二进制分帧到 QUIC 协议，全面理解现代 HTTP 协议的演进、原理与革命性创新。
          </p>

          {/* Quick Stats */}
          <div
            className="animate-slide flex flex-wrap gap-3"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { label: "发布年份", value: "2015 / 2022", color: "var(--accent)" },
              { label: "核心改进", value: "多路复用 / 0-RTT", color: "var(--secondary)" },
              { label: "底层协议", value: "TCP → QUIC", color: "var(--quaternary)" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  border: "2px solid var(--foreground)",
                  backgroundColor: "var(--card)",
                  boxShadow: "3px 3px 0px 0px var(--foreground)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: stat.color }}
                />
                <span className="text-xs font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {stat.label}:
                </span>
                <span className="text-xs" style={{ color: "#64748B" }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HTTP EVOLUTION TIMELINE ========== */}
      <section className="container mt-16">
        <div className="animate-pop mb-8">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
            style={{
              backgroundColor: "#FEF3C7",
              border: "2px solid var(--foreground)",
              boxShadow: "3px 3px 0px 0px var(--tertiary)",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            <Clock size={14} strokeWidth={2.5} />
            HTTP 协议演进史
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mt-3"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            从 0.9 到 3.0 的<span style={{ color: "var(--accent)" }}> 30 年</span>进化
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line (desktop) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5"
            style={{ backgroundColor: "var(--border)" }}
          />
          <div className="space-y-6">
            {httpVersions.map((v, i) => (
              <div
                key={i}
                className={`animate-slide relative flex flex-col md:flex-row items-start gap-4 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div
                  className={`md:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                  } w-full`}
                >
                  <div
                    className="topic-card p-5"
                    style={{
                      boxShadow:
                        `3px 3px 0px 0px ${v.color}`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span
                        className="text-lg font-extrabold"
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          color: v.color,
                        }}
                      >
                        {v.version}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: "#F1F5F9",
                          border: "1.5px solid #CBD5E1",
                          fontFamily: "Outfit, sans-serif",
                          color: "#64748B",
                        }}
                      >
                        {v.year}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {v.features.map((f, j) => (
                        <span
                          key={j}
                          className="text-xs px-3 py-1 rounded-full font-semibold"
                          style={{
                            backgroundColor:
                              i >= 3 ? `${v.color}20` : "#F8FAFC",
                            border: `1.5px solid ${
                              i >= 3 ? v.color : "#CBD5E1"
                            }`,
                            color: i >= 3 ? v.color : "#64748B",
                          }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Center Dot */}
                <div className="hidden md:flex items-center justify-center w-16 shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center z-10"
                    style={{
                      backgroundColor: v.color,
                      border: "3px solid var(--foreground)",
                      boxShadow: `3px 3px 0px 0px var(--foreground)`,
                    }}
                  >
                    <span
                      className="text-xs font-extrabold"
                      style={{
                        color:
                          i >= 3 ? "white" : "var(--foreground)",
                        fontFamily: "Outfit, sans-serif",
                      }}
                    >
                      {v.version.split("/")[1]}
                    </span>
                  </div>
                </div>
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HTTP/2 DEEP DIVE ========== */}
      <section className="container mt-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start gap-8 mb-10">
          <div className="flex-1">
            <div className="animate-pop mb-4">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: "#EDE9FE",
                  border: "2px solid var(--foreground)",
                  boxShadow: "3px 3px 0px 0px var(--accent)",
                  color: "var(--accent)",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                <Layers size={14} strokeWidth={2.5} />
                深入 HTTP/2
              </span>
            </div>
            <h2
              className="animate-slide text-3xl md:text-5xl font-extrabold leading-tight"
              style={{
                fontFamily: "Outfit, sans-serif",
                animationDelay: "0.1s",
              }}
            >
              <span style={{ color: "var(--accent)" }}>二进制</span>时代
              <br />
              的性能革命
            </h2>
            <p
              className="animate-slide mt-4 text-base leading-relaxed max-w-lg"
              style={{ color: "#64748B", animationDelay: "0.2s" }}
            >
              HTTP/2 于 2015 年正式发布（RFC 7540），源自 Google 的 SPDY 协议。它通过二进制分帧、多路复用和头部压缩等技术，大幅提升了 Web 性能。
            </p>
          </div>

          {/* Protocol Stack Diagram */}
          <div className="animate-slide w-full lg:w-auto" style={{ animationDelay: "0.3s" }}>
            <ProtocolDiagram type="h2" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {h2Features.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} />
          ))}
        </div>
      </section>

      {/* ========== INTERACTIVE DEMO: MULTIPLEXING ========== */}
      <section className="container mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-slide" style={{ animationDelay: "0.1s" }}>
            <MultiplexingDemo />
          </div>
          <div className="animate-slide" style={{ animationDelay: "0.2s" }}>
            <HeadOfLineBlockingDemo />
          </div>
        </div>
      </section>

      {/* ========== HTTP/3 DEEP DIVE ========== */}
      <section className="container mt-20">
        {/* Decorative Element */}
        <div
          className="absolute left-0 right-0 h-1 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(90deg, var(--quaternary) 0, var(--quaternary) 8px, transparent 8px, transparent 16px)",
          }}
        />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row-reverse items-start gap-8 mt-20 mb-10">
          <div className="flex-1">
            <div className="animate-pop mb-4">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: "#D1FAE5",
                  border: "2px solid var(--foreground)",
                  boxShadow: "3px 3px 0px 0px var(--quaternary)",
                  color: "#059669",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                <Rocket size={14} strokeWidth={2.5} />
                深入 HTTP/3
              </span>
            </div>
            <h2
              className="animate-slide text-3xl md:text-5xl font-extrabold leading-tight"
              style={{
                fontFamily: "Outfit, sans-serif",
                animationDelay: "0.1s",
              }}
            >
              <span style={{ color: "var(--quaternary)" }}>QUIC</span> 驱动
              <br />
              的下一代协议
            </h2>
            <p
              className="animate-slide mt-4 text-base leading-relaxed max-w-lg"
              style={{ color: "#64748B", animationDelay: "0.2s" }}
            >
              HTTP/3 于 2022 年正式标准化（RFC 9114），基于 Google 开发的 QUIC 协议。它用 UDP 取代 TCP，将传输层与加密层合并，实现了更低延迟和更强的连接稳定性。
            </p>
          </div>

          {/* Protocol Stack Diagram */}
          <div className="animate-slide w-full lg:w-auto" style={{ animationDelay: "0.3s" }}>
            <ProtocolDiagram type="h3" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {h3Features.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} />
          ))}
        </div>
      </section>

      {/* ========== RTT COMPARISON & CONNECTION MIGRATION ========== */}
      <section className="container mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-slide" style={{ animationDelay: "0.1s" }}>
            <RTTComparison />
          </div>
          <div className="animate-slide" style={{ animationDelay: "0.2s" }}>
            <ConnectionMigrationDemo />
          </div>
        </div>
      </section>

      {/* ========== COMPARISON TABLE ========== */}
      <section className="container mt-20">
        <div className="mb-8">
          <span
            className="animate-pop inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{
              backgroundColor: "#FEF3C7",
              border: "2px solid var(--foreground)",
              boxShadow: "3px 3px 0px 0px var(--tertiary)",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            <SplitSquareHorizontal size={14} strokeWidth={2.5} />
            全面对比
          </span>
          <h2
            className="animate-slide text-3xl md:text-4xl font-extrabold mt-3"
            style={{ fontFamily: "Outfit, sans-serif", animationDelay: "0.1s" }}
          >
            HTTP/2 vs HTTP/3
          </h2>
        </div>

        <div className="animate-slide" style={{ animationDelay: "0.2s" }}>
          <div className="overflow-x-auto">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* ========== KEY TAKEAWAYS ========== */}
      <section className="container mt-20">
        <div className="mb-8">
          <span
            className="animate-pop inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{
              backgroundColor: "var(--accent)",
              border: "2px solid var(--foreground)",
              boxShadow: "3px 3px 0px 0px var(--foreground)",
              color: "white",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            <Star size={14} strokeWidth={2.5} />
            核心要点
          </span>
          <h2
            className="animate-slide text-3xl md:text-4xl font-extrabold mt-3"
            style={{ fontFamily: "Outfit, sans-serif", animationDelay: "0.1s" }}
          >
            一张图<span style={{ color: "var(--secondary)" }}>总结</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: "HTTP/2 的贡献",
              color: "var(--accent)",
              bg: "#EDE9FE",
              shadow: "var(--accent)",
              items: [
                "二进制分帧 → 更高效的解析",
                "多路复用 → 并行请求无阻塞",
                "HPACK 压缩 → 减少带宽消耗",
                "单一连接 → 减少 TCP 握手开销",
              ],
            },
            {
              title: "HTTP/3 的突破",
              color: "var(--quaternary)",
              bg: "#D1FAE5",
              shadow: "var(--quaternary)",
              items: [
                "QUIC/UDP → 绕过 TCP 限制",
                "0-RTT 建连 → 极致低延迟",
                "独立流 → 彻底消除队头阻塞",
                "连接迁移 → 网络切换零中断",
              ],
            },
            {
              title: "未来趋势",
              color: "var(--secondary)",
              bg: "#FCE7F3",
              shadow: "var(--secondary)",
              items: [
                "QUIC 生态持续成熟和普及",
                "CDN 厂商全面支持 HTTP/3",
                "WebTransport 基于 QUIC 构建",
                "加密成为协议的默认特性",
              ],
            },
          ].map((card, i) => (
            <div
              key={i}
              className="animate-slide"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div
                className="topic-card p-6 h-full"
                style={{
                  boxShadow: `6px 6px 0px 0px ${card.shadow}`,
                }}
              >
                <div
                  className="w-full h-1.5 rounded-full mb-5"
                  style={{ backgroundColor: card.color }}
                />
                <h3
                  className="text-lg font-extrabold mb-4"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    color: card.color,
                  }}
                >
                  {card.title}
                </h3>
                <ul className="space-y-3">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          backgroundColor: card.bg,
                          border: "1.5px solid var(--foreground)",
                        }}
                      >
                        <CheckCircle2
                          size={12}
                          strokeWidth={3}
                          style={{ color: card.color }}
                        />
                      </div>
                      <span
                        className="text-sm"
                        style={{
                          color: "#475569",
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== BOTTOM CTA / FINAL NOTE ========== */}
      <section className="container mt-20">
        <div
          className="animate-pop relative p-8 md:p-12 rounded-3xl text-center overflow-hidden"
          style={{
            border: "3px solid var(--foreground)",
            backgroundColor: "var(--foreground)",
            boxShadow: "12px 12px 0px 0px var(--accent)",
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <div
            className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full opacity-15"
            style={{ backgroundColor: "var(--secondary)" }}
          />

          <h3
            className="relative text-2xl md:text-3xl font-extrabold mb-4"
            style={{ fontFamily: "Outfit, sans-serif", color: "white" }}
          >
            协议的演进永不停歇 🚀
          </h3>
          <p
            className="relative text-base max-w-xl mx-auto leading-relaxed mb-6"
            style={{ color: "#CBD5E1" }}
          >
            从 HTTP/0.9 的单行文本到 HTTP/3 的零延迟连接，每一次升级都在突破性能的边界。
            理解这些底层原理，将帮助你构建更快速、更可靠的 Web 应用。
          </p>
          <div className="relative flex flex-wrap justify-center gap-3">
            {["掌握原理", "优化性能", "面向未来"].map((tag, i) => (
              <span
                key={i}
                className="px-5 py-2 rounded-full text-sm font-bold"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "white",
                  border: "2px solid rgba(255,255,255,0.2)",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========== INLINE STYLES FOR ANIMATIONS ========== */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          70% {
            transform: scale(1.03);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slide {
          opacity: 0;
          animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-pop {
          opacity: 0;
          animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
}