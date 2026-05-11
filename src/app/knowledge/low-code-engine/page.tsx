"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { highlightCode } from "@/lib/prism-highlight";
import {
  FileJson2,
  GripVertical,
  Eye,
  ShieldCheck,
  Workflow,
  Braces,
  Layers,
  MousePointerClick,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  AlertCircle,
  Code2,
  Boxes,
  GitBranch,
  Zap,
  RefreshCw,
  Type,
  Hash,
  List,
  ToggleLeft,
  Calendar,
  Upload,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Target,
  Lightbulb,
  TrendingUp,
  History,
  Users,
  Clock,
  Bug,
  Wrench,
  Sparkles,
  BarChart3,
  DollarSign,
  Gauge,
  FileCode2,
  Settings,
  Puzzle,
  Rocket,
  MessageSquare,
  Building2,
  ShoppingCart,
  HeartPulse,
  GraduationCap,
  ChevronDown,
  Star,
  Flame,
  Cpu,
  Database,
  Paintbrush,
  TestTube,
  Shield,
  GitCompare,
  Waypoints,
} from "lucide-react";

// ─── 类型定义 ───────────────────────────────────────────────────────────────
interface SchemaField {
  key: string;
  type: string;
  label: string;
  required: boolean;
  icon: React.ReactNode;
  color: string;
  rules: string[];
}

interface DragItem {
  id: string;
  type: string;
  label: string;
  icon: React.ReactNode;
}

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

// ─── 常量数据 ───────────────────────────────────────────────────────────────

const PAIN_POINTS = [
  {
    title: "重复劳动",
    subtitle: "Repeated Labor",
    desc: "每个业务表单都从零编写 UI + 校验 + 提交逻辑，大量相似代码无法复用",
    icon: <Copy size={24} strokeWidth={2.5} />,
    color: "var(--secondary)",
    stat: "70%",
    statLabel: "表单代码相似度",
  },
  {
    title: "变更成本高",
    subtitle: "High Change Cost",
    desc: "需求变更需要前后端同步修改、重新测试、重新部署，响应周期长达数天",
    icon: <Clock size={24} strokeWidth={2.5} />,
    color: "var(--tertiary)",
    stat: "3-5天",
    statLabel: "平均变更周期",
  },
  {
    title: "协作壁垒",
    subtitle: "Collaboration Gap",
    desc: "产品/运营无法直接参与表单配置，必须通过开发排期，形成瓶颈",
    icon: <Users size={24} strokeWidth={2.5} />,
    color: "var(--accent)",
    stat: "85%",
    statLabel: "需求方等待时间",
  },
  {
    title: "校验碎片化",
    subtitle: "Fragmented Validation",
    desc: "校验逻辑散落在各组件内部，前后端不一致，边界情况易遗漏",
    icon: <Bug size={24} strokeWidth={2.5} />,
    color: "var(--quaternary)",
    stat: "40%",
    statLabel: "Bug 来自表单校验",
  },
];

const MOTIVATIONS = [
  {
    category: "效率提升",
    icon: <Gauge size={22} strokeWidth={2.5} />,
    color: "var(--accent)",
    items: [
      "新表单从「周级」交付降至「小时级」配置",
      "一套 Schema 同时驱动 PC / Mobile / 小程序",
      "校验规则声明式定义，自动前后端同步",
    ],
  },
  {
    category: "质量保障",
    icon: <Shield size={22} strokeWidth={2.5} />,
    color: "var(--quaternary)",
    items: [
      "单一数据源 (Schema) 消除前后端不一致",
      "内置类型安全与边界校验",
      "组件级单元测试覆盖率 > 95%",
    ],
  },
  {
    category: "业务赋能",
    icon: <Sparkles size={22} strokeWidth={2.5} />,
    color: "var(--tertiary)",
    items: [
      "非技术人员可通过可视化搭建表单",
      "实时预览 + 即时发布，零代码上线",
      "A/B 测试不同表单方案成为可能",
    ],
  },
];

const EVOLUTION_TIMELINE: TimelineItem[] = [
  {
    year: "Phase 1",
    title: "硬编码时代",
    desc: "每个表单手写 HTML + JS，校验逻辑与 UI 耦合，维护噩梦",
    icon: <FileCode2 size={18} strokeWidth={2.5} />,
    color: "var(--foreground)",
  },
  {
    year: "Phase 2",
    title: "组件化封装",
    desc: "Form.Item + Rules 抽象，校验与 UI 分离，但仍需手写布局",
    icon: <Puzzle size={18} strokeWidth={2.5} />,
    color: "var(--secondary)",
  },
  {
    year: "Phase 3",
    title: "Schema 驱动",
    desc: "JSON 配置描述表单结构，渲染引擎自动解析，实现配置化",
    icon: <FileJson2 size={18} strokeWidth={2.5} />,
    color: "var(--accent)",
  },
  {
    year: "Phase 4",
    title: "可视化搭建",
    desc: "拖拽编排 + 实时预览，非技术人员可自主配置表单",
    icon: <Paintbrush size={18} strokeWidth={2.5} />,
    color: "var(--tertiary)",
  },
  {
    year: "Phase 5",
    title: "智能化演进",
    desc: "AI 辅助生成 Schema，智能推荐校验规则，自动优化布局",
    icon: <Cpu size={18} strokeWidth={2.5} />,
    color: "var(--quaternary)",
  },
];

const USE_CASES = [
  {
    domain: "企业中台",
    icon: <Building2 size={20} strokeWidth={2.5} />,
    color: "var(--accent)",
    cases: [
      "CRM 客户信息录入",
      "ERP 单据配置",
      "OA 审批流程表单",
      "HR 入职信息采集",
    ],
  },
  {
    domain: "电商平台",
    icon: <ShoppingCart size={20} strokeWidth={2.5} />,
    color: "var(--secondary)",
    cases: ["商品属性配置", "订单筛选条件", "营销活动规则", "商家入驻申请"],
  },
  {
    domain: "医疗健康",
    icon: <HeartPulse size={20} strokeWidth={2.5} />,
    color: "var(--quaternary)",
    cases: ["电子病历模板", "检验报告录入", "患者信息采集", "药品不良反应上报"],
  },
  {
    domain: "教育培训",
    icon: <GraduationCap size={20} strokeWidth={2.5} />,
    color: "var(--tertiary)",
    cases: ["在线考试问卷", "学员信息登记", "课程评价表", "教师考核表"],
  },
];

const SCHEMA_FIELDS: SchemaField[] = [
  {
    key: "username",
    type: "string",
    label: "用户名",
    required: true,
    icon: <Type size={20} strokeWidth={2.5} />,
    color: "var(--accent)",
    rules: ["必填", "2-20字符", "不可含特殊符号"],
  },
  {
    key: "age",
    type: "number",
    label: "年龄",
    required: false,
    icon: <Hash size={20} strokeWidth={2.5} />,
    color: "var(--secondary)",
    rules: ["数值范围 0-150", "整数"],
  },
  {
    key: "role",
    type: "enum",
    label: "角色",
    required: true,
    icon: <List size={20} strokeWidth={2.5} />,
    color: "var(--tertiary)",
    rules: ["必选", "枚举校验"],
  },
  {
    key: "isActive",
    type: "boolean",
    label: "启用状态",
    required: false,
    icon: <ToggleLeft size={20} strokeWidth={2.5} />,
    color: "var(--quaternary)",
    rules: ["布尔类型"],
  },
];

const DRAG_COMPONENTS: DragItem[] = [
  {
    id: "input",
    type: "Input",
    label: "输入框",
    icon: <Type size={18} strokeWidth={2.5} />,
  },
  {
    id: "number",
    type: "Number",
    label: "数字框",
    icon: <Hash size={18} strokeWidth={2.5} />,
  },
  {
    id: "select",
    type: "Select",
    label: "下拉选择",
    icon: <List size={18} strokeWidth={2.5} />,
  },
  {
    id: "switch",
    type: "Switch",
    label: "开关",
    icon: <ToggleLeft size={18} strokeWidth={2.5} />,
  },
  {
    id: "date",
    type: "DatePicker",
    label: "日期选择",
    icon: <Calendar size={18} strokeWidth={2.5} />,
  },
  {
    id: "upload",
    type: "Upload",
    label: "文件上传",
    icon: <Upload size={18} strokeWidth={2.5} />,
  },
];

const VALIDATION_PIPELINE = [
  {
    stage: 1,
    name: "类型校验",
    desc: "Schema type 字段匹配",
    icon: <Braces size={22} strokeWidth={2.5} />,
    color: "var(--accent)",
  },
  {
    stage: 2,
    name: "必填校验",
    desc: "required 字段约束",
    icon: <AlertCircle size={22} strokeWidth={2.5} />,
    color: "var(--secondary)",
  },
  {
    stage: 3,
    name: "规则校验",
    desc: "pattern / min / max",
    icon: <ShieldCheck size={22} strokeWidth={2.5} />,
    color: "var(--tertiary)",
  },
  {
    stage: 4,
    name: "联动校验",
    desc: "跨字段依赖校验",
    icon: <GitBranch size={22} strokeWidth={2.5} />,
    color: "var(--quaternary)",
  },
];

const COMPARISON_DATA = [
  {
    aspect: "开发效率",
    traditional: "低",
    lowcode: "极高",
    score_trad: 2,
    score_lc: 9,
  },
  {
    aspect: "变更响应",
    traditional: "慢 (天级)",
    lowcode: "快 (分钟级)",
    score_trad: 3,
    score_lc: 9,
  },
  {
    aspect: "技术门槛",
    traditional: "高",
    lowcode: "低",
    score_trad: 2,
    score_lc: 8,
  },
  {
    aspect: "校验一致性",
    traditional: "易遗漏",
    lowcode: "Schema 单一源",
    score_trad: 4,
    score_lc: 9,
  },
  {
    aspect: "可维护性",
    traditional: "差",
    lowcode: "优",
    score_trad: 3,
    score_lc: 9,
  },
  {
    aspect: "灵活度",
    traditional: "极高",
    lowcode: "较高",
    score_trad: 10,
    score_lc: 7,
  },
];

const TECH_STACK = [
  {
    layer: "协议层",
    techs: ["JSON Schema", "JSON Form", "Formily Schema"],
    icon: <Database size={18} strokeWidth={2.5} />,
    color: "var(--accent)",
  },
  {
    layer: "引擎层",
    techs: ["Formily", "FormRender", "Arco Form", "ProForm"],
    icon: <Cpu size={18} strokeWidth={2.5} />,
    color: "var(--secondary)",
  },
  {
    layer: "UI 层",
    techs: ["Ant Design", "Arco Design", "Semi Design", "Element Plus"],
    icon: <Paintbrush size={18} strokeWidth={2.5} />,
    color: "var(--tertiary)",
  },
  {
    layer: "可视化层",
    techs: ["DnD Kit", "React DnD", "SortableJS", "X6 画布"],
    icon: <GripVertical size={18} strokeWidth={2.5} />,
    color: "var(--quaternary)",
  },
];

// ─── 子组件 ─────────────────────────────────────────────────────────────────

function GeoBadge({
  children,
  color,
  size = "md",
}: {
  children: React.ReactNode;
  color: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeMap = { sm: "w-9 h-9", md: "w-12 h-12", lg: "w-16 h-16" };
  return (
    <div
      className={`${sizeMap[size]} flex items-center justify-center rounded-[var(--radius-md)] border-2 border-[var(--foreground)]`}
      style={{
        backgroundColor: color,
        boxShadow: "4px 4px 0px 0px var(--foreground)",
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[var(--radius-full)] border-2 border-[var(--foreground)] bg-[var(--card)] font-bold text-xs uppercase tracking-widest"
      style={{
        boxShadow: "4px 4px 0px 0px var(--foreground)",
        fontFamily: '"Outfit", sans-serif',
      }}
    >
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: "var(--accent)" }}
      />
      {text}
    </div>
  );
}

function SchemaFieldCard({
  field,
  index,
  isHighlighted,
}: {
  field: SchemaField;
  index: number;
  isHighlighted: boolean;
}) {
  return (
    <div
      className={`topic-card p-5 rounded-[var(--radius-md)] animate-slide transition-all duration-300 ${isHighlighted ? "ring-3 ring-[var(--accent)] scale-[1.03]" : ""}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        <GeoBadge color={field.color} size="md">
          {field.icon}
        </GeoBadge>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <code className="text-sm font-mono font-bold px-2 py-0.5 rounded-md bg-[var(--foreground)] text-white">
              {field.key}
            </code>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--foreground)]/70">
              {field.type}
            </span>
            {field.required && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--secondary)] text-white border-2 border-[var(--foreground)]">
                必填
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-[var(--foreground)] mb-2">
            {field.label}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {field.rules.map((rule, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded-full border border-dashed"
                style={{
                  borderColor: field.color,
                  color: field.color,
                  fontWeight: 600,
                }}
              >
                {rule}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DraggableComponent({
  item,
  onDragStart,
  isDragging,
}: {
  item: DragItem;
  onDragStart: (item: DragItem) => void;
  isDragging: boolean;
}) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(item)}
      className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--card)] cursor-grab active:cursor-grabbing transition-all duration-200 hover:rotate-[-1deg] hover:scale-105 ${isDragging ? "opacity-50 scale-95" : ""}`}
      style={{
        boxShadow: isDragging ? "none" : "4px 4px 0px 0px var(--foreground)",
      }}
    >
      <GripVertical
        size={16}
        className="text-[var(--foreground)]/40"
        strokeWidth={2.5}
      />
      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)]">
        {item.icon}
      </div>
      <span className="text-sm font-bold text-[var(--foreground)]">
        {item.label}
      </span>
    </div>
  );
}

function CanvasFormItem({
  item,
  index,
  onRemove,
}: {
  item: DragItem;
  index: number;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="animate-pop flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] border-2 border-dashed border-[var(--accent)] bg-[var(--accent)]/5 group">
      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[var(--accent)] text-white text-xs font-bold">
        {index + 1}
      </div>
      <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)]">
        {item.icon}
      </div>
      <span className="text-sm font-semibold text-[var(--foreground)] flex-1">
        {item.label}
      </span>
      <button
        onClick={() => onRemove(index)}
        className="w-6 h-6 flex items-center justify-center rounded-full bg-[var(--secondary)]/10 text-[var(--secondary)] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--secondary)]/20"
      >
        ×
      </button>
    </div>
  );
}

function ValidationNode({
  step,
  isActive,
  isComplete,
  index,
}: {
  step: (typeof VALIDATION_PIPELINE)[0];
  isActive: boolean;
  isComplete: boolean;
  index: number;
}) {
  return (
    <div
      className="flex flex-col items-center animate-slide"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div
        className={`relative w-20 h-20 flex items-center justify-center rounded-[var(--radius-md)] border-3 transition-all duration-500 ${isComplete ? "border-[var(--quaternary)] bg-[var(--quaternary)]/10" : isActive ? "border-[var(--accent)] bg-[var(--accent)]/10 animate-pulse" : "border-[var(--border)] bg-[var(--card)]"}`}
        style={{
          boxShadow:
            isActive || isComplete
              ? "6px 6px 0px 0px var(--foreground)"
              : "none",
          borderWidth: isActive ? "3px" : "2px",
        }}
      >
        {step.icon}
        {isComplete && (
          <div className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-[var(--quaternary)] border-2 border-[var(--foreground)] text-white">
            <CheckCircle2 size={14} strokeWidth={2.5} />
          </div>
        )}
      </div>
      <p className="mt-3 text-sm font-bold text-[var(--foreground)]">
        {step.name}
      </p>
      <p className="text-xs text-[var(--foreground)]/60 max-w-[100px] text-center mt-1">
        {step.desc}
      </p>
    </div>
  );
}

function FlowArrow({ active }: { active: boolean }) {
  return (
    <div className="flex items-center self-start mt-8">
      <div
        className={`w-12 h-0.5 transition-colors duration-500 ${active ? "bg-[var(--accent)]" : "bg-[var(--border)]"}`}
      />
      <ChevronRight
        size={16}
        className={`-ml-1 transition-colors duration-500 ${active ? "text-[var(--accent)]" : "text-[var(--border)]"}`}
        strokeWidth={2.5}
      />
    </div>
  );
}

function FormPreview({ canvasItems }: { canvasItems: DragItem[] }) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
    setSubmitted(false);
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    canvasItems.forEach((item) => {
      if (!formData[item.id]?.trim())
        newErrors[item.id] = `${item.label} 为必填项`;
    });
    setErrors(newErrors);
    setSubmitted(true);
  };

  if (canvasItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-[var(--foreground)]/40 py-12">
        <Boxes size={40} strokeWidth={2} />
        <p className="mt-3 text-sm font-semibold">拖入组件以预览表单</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {canvasItems.map((item, idx) => {
        const hasError = !!errors[item.id];
        const hasValue = !!formData[item.id]?.trim();
        const borderClass = hasError
          ? "border-[var(--secondary)] bg-[var(--secondary)]/5"
          : hasValue
            ? "border-[var(--quaternary)] bg-[var(--quaternary)]/5"
            : "border-[var(--border)] bg-white";
        return (
          <div
            key={`${item.id}-${idx}`}
            className="animate-slide"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <label className="block text-sm font-bold text-[var(--foreground)] mb-1.5">
              {item.label}
              <span className="text-[var(--secondary)] ml-1">*</span>
            </label>
            {item.type === "Switch" ? (
              <button
                onClick={() =>
                  handleChange(
                    item.id,
                    formData[item.id] === "on" ? "off" : "on",
                  )
                }
                className={`w-full px-4 py-3 rounded-[var(--radius-md)] border-2 text-sm font-semibold transition-all ${formData[item.id] === "on" ? "border-[var(--quaternary)] bg-[var(--quaternary)]/10 text-[var(--quaternary)]" : "border-[var(--border)] bg-white text-[var(--foreground)]/50"}`}
              >
                {formData[item.id] === "on" ? "✓ 已启用" : "未启用"}
              </button>
            ) : item.type === "Select" ? (
              <select
                value={formData[item.id] || ""}
                onChange={(e) => handleChange(item.id, e.target.value)}
                className={`w-full px-4 py-3 rounded-[var(--radius-md)] border-2 text-sm font-semibold transition-all outline-none ${borderClass}`}
              >
                <option value="">请选择...</option>
                <option value="option1">选项 A</option>
                <option value="option2">选项 B</option>
                <option value="option3">选项 C</option>
              </select>
            ) : (
              <input
                type={
                  item.type === "Number"
                    ? "number"
                    : item.type === "DatePicker"
                      ? "date"
                      : "text"
                }
                value={formData[item.id] || ""}
                onChange={(e) => handleChange(item.id, e.target.value)}
                placeholder={`请输入${item.label}...`}
                className={`w-full px-4 py-3 rounded-[var(--radius-md)] border-2 text-sm font-semibold transition-all outline-none ${borderClass}`}
              />
            )}
            {hasError && (
              <p className="mt-1.5 text-xs font-semibold text-[var(--secondary)] flex items-center gap-1">
                <AlertCircle size={12} strokeWidth={2.5} />
                {errors[item.id]}
              </p>
            )}
          </div>
        );
      })}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleSubmit}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--accent)] text-white font-bold text-sm transition-all hover:translate-y-[-2px]"
          style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
        >
          <Zap size={16} strokeWidth={2.5} />
          提交校验
        </button>
        <button
          onClick={() => {
            setFormData({});
            setErrors({});
            setSubmitted(false);
          }}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--card)] text-[var(--foreground)] font-bold text-sm transition-all hover:translate-y-[-2px]"
          style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
        >
          <RotateCcw size={16} strokeWidth={2.5} />
        </button>
      </div>
      {submitted && Object.keys(errors).length === 0 && (
        <div
          className="animate-pop flex items-center gap-2 px-4 py-3 rounded-[var(--radius-md)] border-2 border-[var(--quaternary)] bg-[var(--quaternary)]/10"
          style={{ boxShadow: "4px 4px 0px 0px var(--quaternary)" }}
        >
          <CheckCircle2
            size={18}
            className="text-[var(--quaternary)]"
            strokeWidth={2.5}
          />
          <span className="text-sm font-bold text-[var(--quaternary)]">
            校验全部通过！表单数据合法 ✨
          </span>
        </div>
      )}
    </div>
  );
}

// 模拟 Copy 图标
function Copy({
  size,
  strokeWidth,
  className,
}: {
  size: number;
  strokeWidth: number;
  className?: string;
}) {
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

// ─── 主页面组件 ─────────────────────────────────────────────────────────────
export default function LowCodeFormPage() {
  const [highlightedField, setHighlightedField] = useState<number | null>(null);
  const [draggingItem, setDraggingItem] = useState<DragItem | null>(null);
  const [canvasItems, setCanvasItems] = useState<DragItem[]>([]);
  const [validationStep, setValidationStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(2);

  const handleDragStart = useCallback(
    (item: DragItem) => setDraggingItem(item),
    [],
  );
  const handleDrop = useCallback(() => {
    if (draggingItem) {
      setCanvasItems((prev) => [...prev, { ...draggingItem }]);
      setDraggingItem(null);
    }
  }, [draggingItem]);
  const handleRemoveItem = useCallback(
    (index: number) =>
      setCanvasItems((prev) => prev.filter((_, i) => i !== index)),
    [],
  );

  const startValidationAnimation = useCallback(() => {
    setIsAnimating(true);
    setValidationStep(-1);
    let step = 0;
    const interval = setInterval(() => {
      setValidationStep(step);
      step++;
      if (step > VALIDATION_PIPELINE.length) {
        clearInterval(interval);
        setTimeout(() => setIsAnimating(false), 1500);
      }
    }, 800);
  }, []);

  const generatedSchema = useMemo(
    () =>
      canvasItems.map((item, idx) => ({
        key: item.id,
        type: item.type,
        label: item.label,
        required: true,
        order: idx,
      })),
    [canvasItems],
  );

  return (
    <main
      className="bg-dot-grid min-h-screen pb-24"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* ════════════════════════════════════════════════════════════
          HERO 区域 — 引入主题，建立视觉基调
      ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden container py-20 md:py-28">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 opacity-20 -z-10"
          style={{
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            backgroundColor: "var(--tertiary)",
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 opacity-15 -z-10"
          style={{
            borderRadius: "40% 60% 70% 30% / 30% 70% 40% 60%",
            backgroundColor: "var(--accent)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 -z-10"
          style={{
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            backgroundColor: "var(--secondary)",
          }}
        />

        <div className="container mx-auto px-6">
          <div className="animate-pop">
            <SectionLabel text="Frontend Architecture" />
          </div>

          <h1
            className="mt-6 text-4xl md:text-6xl lg:text-7xl font-extrabold text-[var(--foreground)] leading-tight animate-slide"
            style={{
              fontFamily: '"Outfit", sans-serif',
              animationDelay: "100ms",
            }}
          >
            低代码
            <br />
            <span
              className="inline-block px-3 py-1 rounded-[var(--radius-md)] text-white"
              style={{
                backgroundColor: "var(--accent)",
                boxShadow: "8px 8px 0px 0px var(--foreground)",
              }}
            >
              动态表单
            </span>
          </h1>

          <p
            className="mt-6 max-w-2xl text-lg md:text-xl text-[var(--foreground)]/70 font-medium leading-relaxed animate-slide"
            style={{ animationDelay: "200ms" }}
          >
            基于{" "}
            <strong className="text-[var(--accent)]">Schema 数据驱动</strong>
            设计，实现可视化拖拽的动态表单渲染与
            <strong className="text-[var(--secondary)]">
              复杂校验逻辑流转
            </strong>
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {[
              {
                label: "Schema 驱动",
                icon: <FileJson2 size={22} strokeWidth={2.5} />,
                color: "var(--accent)",
              },
              {
                label: "拖拽编排",
                icon: <GripVertical size={22} strokeWidth={2.5} />,
                color: "var(--secondary)",
              },
              {
                label: "动态渲染",
                icon: <Eye size={22} strokeWidth={2.5} />,
                color: "var(--tertiary)",
              },
              {
                label: "校验流转",
                icon: <ShieldCheck size={22} strokeWidth={2.5} />,
                color: "var(--quaternary)",
              },
            ].map((item, idx) => (
              <div
                key={item.label}
                className="animate-slide flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--card)]"
                style={{
                  boxShadow: "4px 4px 0px 0px var(--foreground)",
                  animationDelay: `${300 + idx * 100}ms`,
                }}
              >
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-lg"
                  style={{ backgroundColor: item.color, color: "white" }}
                >
                  {item.icon}
                </div>
                <span className="text-sm font-bold text-[var(--foreground)]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          背景与痛点 — 为什么需要低代码动态表单
      ════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 mt-8">
        <div className="animate-slide" style={{ animationDelay: "100ms" }}>
          <SectionLabel text="Background & Pain Points" />
        </div>

        <h2
          className="mt-5 text-3xl md:text-4xl font-extrabold text-[var(--foreground)] animate-slide"
          style={{
            fontFamily: '"Outfit", sans-serif',
            animationDelay: "200ms",
          }}
        >
          <Target
            size={32}
            className="inline-block mr-3 text-[var(--secondary)]"
            strokeWidth={2.5}
          />
          痛点分析：传统表单开发的困境
        </h2>

        <p
          className="mt-4 max-w-3xl text-[var(--foreground)]/60 font-medium leading-relaxed animate-slide"
          style={{ animationDelay: "250ms" }}
        >
          在企业级应用中，表单是最核心的数据采集载体。一个中型 ERP 系统往往包含{" "}
          <strong className="text-[var(--accent)]">200+ 表单页面</strong>，
          传统开发模式面临效率、质量、协作的三重困境。
        </p>

        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          {PAIN_POINTS.map((point, idx) => (
            <div
              key={point.title}
              className="topic-card p-6 rounded-[var(--radius-lg)] animate-slide"
              style={{
                boxShadow: `8px 8px 0px 0px ${point.color}`,
                animationDelay: `${300 + idx * 100}ms`,
              }}
            >
              <div className="flex items-start gap-4">
                <GeoBadge color={point.color}>{point.icon}</GeoBadge>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className="text-lg font-bold text-[var(--foreground)]"
                      style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                      {point.title}
                    </h3>
                    <span className="text-xs font-semibold text-[var(--foreground)]/40">
                      {point.subtitle}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--foreground)]/60 font-medium leading-relaxed">
                    {point.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span
                      className="text-3xl font-extrabold"
                      style={{
                        fontFamily: '"Outfit", sans-serif',
                        color: point.color,
                      }}
                    >
                      {point.stat}
                    </span>
                    <span className="text-xs font-semibold text-[var(--foreground)]/50 leading-tight">
                      {point.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 问题总结 */}
        <div
          className="mt-8 p-6 rounded-[var(--radius-lg)] border-2 border-[var(--foreground)] bg-[var(--foreground)] text-white animate-slide"
          style={{
            boxShadow: "8px 8px 0px 0px var(--secondary)",
            animationDelay: "700ms",
          }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--secondary)] border-2 border-white/20 flex-shrink-0">
              <Flame size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                核心矛盾
              </h3>
              <p className="text-white/70 font-medium leading-relaxed">
                表单的本质是「
                <strong className="text-[var(--tertiary)]">数据结构</strong>
                」与「
                <strong className="text-[var(--tertiary)]">UI 表现</strong>
                」的映射。
                传统开发将两者硬编码耦合，导致每新增一个表单就意味着重复的 UI
                编写、校验逻辑、提交处理。
                当业务快速迭代时，表单开发成为整个系统的
                <strong className="text-[var(--secondary)]">最大瓶颈</strong>。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          动机与价值 — 解决什么问题，带来什么价值
      ════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 mt-20">
        <div className="animate-slide" style={{ animationDelay: "100ms" }}>
          <SectionLabel text="Motivation & Value" />
        </div>

        <h2
          className="mt-5 text-3xl md:text-4xl font-extrabold text-[var(--foreground)] animate-slide"
          style={{
            fontFamily: '"Outfit", sans-serif',
            animationDelay: "200ms",
          }}
        >
          <Lightbulb
            size={32}
            className="inline-block mr-3 text-[var(--tertiary)]"
            strokeWidth={2.5}
          />
          设计动机：从「写表单」到「描述表单」
        </h2>

        <p
          className="mt-4 max-w-3xl text-[var(--foreground)]/60 font-medium leading-relaxed animate-slide"
          style={{ animationDelay: "250ms" }}
        >
          低代码动态表单的核心思想是
          <strong className="text-[var(--accent)]">声明式范式转换</strong>——
          开发者不再手写每个表单项的渲染代码，而是用一份结构化的 JSON Schema 来
          <strong className="text-[var(--secondary)]">描述</strong>
          表单「是什么」， 由渲染引擎自动完成「怎么做」。
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {MOTIVATIONS.map((motivation, idx) => (
            <div
              key={motivation.category}
              className="topic-card p-6 rounded-[var(--radius-lg)] animate-slide"
              style={{
                boxShadow: `8px 8px 0px 0px ${motivation.color}`,
                animationDelay: `${300 + idx * 100}ms`,
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <GeoBadge color={motivation.color}>{motivation.icon}</GeoBadge>
                <h3
                  className="text-lg font-bold text-[var(--foreground)]"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  {motivation.category}
                </h3>
              </div>
              <ul className="space-y-3">
                {motivation.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div
                      className="mt-1 w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full border-2"
                      style={{
                        borderColor: motivation.color,
                        color: motivation.color,
                      }}
                    >
                      <CheckCircle2 size={12} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm text-[var(--foreground)]/80 font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 范式转换示意 */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div
            className="p-6 rounded-[var(--radius-lg)] border-2 border-[var(--foreground)] bg-[var(--foreground)] text-white animate-slide"
            style={{
              boxShadow: "8px 8px 0px 0px var(--secondary)",
              animationDelay: "600ms",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--secondary)]/30 text-[var(--secondary)]">
                <Wrench size={18} strokeWidth={2.5} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white/60">
                命令式 (Imperative)
              </h4>
            </div>
            <pre className="text-xs font-mono text-white/70 leading-relaxed overflow-x-auto">
              <code className="language-jsx" dangerouslySetInnerHTML={{ __html: highlightCode(`// ❌ 传统方式：手写每一个表单项
function UserForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!name) errs.name = '必填';
    if (name.length > 20) errs.name = '太长';
    if (isNaN(age)) errs.age = '需为数字';
    if (age < 0 || age > 150) errs.age = '范围';
    // ... 每个字段逐一编写
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  return (
    <form>
      <input value={name} onChange={...} />
      {errors.name && <span>{errors.name}</span>}
      <input value={age} onChange={...} />
      {errors.age && <span>{errors.age}</span>}
    </form>
  );
}`, "jsx") }} />
            </pre>
          </div>

          <div
            className="p-6 rounded-[var(--radius-lg)] border-2 border-[var(--foreground)] bg-[var(--card)] animate-slide"
            style={{
              boxShadow: "8px 8px 0px 0px var(--quaternary)",
              animationDelay: "700ms",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--quaternary)]/20 text-[var(--quaternary)]">
                <Sparkles size={18} strokeWidth={2.5} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground)]/60">
                声明式 (Declarative)
              </h4>
            </div>
            <pre className="text-xs font-mono text-[var(--foreground)]/80 leading-relaxed overflow-x-auto">
              <code className="language-jsx" dangerouslySetInnerHTML={{ __html: highlightCode(`// ✅ Schema 驱动：描述而非编写
const schema = {
  fields: [
    {
      key: 'name',
      type: 'string',
      label: '用户名',
      required: true,
      rules: [
        { max: 20, message: '不超过20字符' }
      ]
    },
    {
      key: 'age',
      type: 'number',
      label: '年龄',
      rules: [
        { range: [0, 150] }
      ]
    }
  ]
};

// 一行渲染，自动校验
<SchemaForm schema={schema} />`, "jsx") }} />
            </pre>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          演进历程 — 从硬编码到智能化
      ════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 mt-20">
        <div className="animate-slide" style={{ animationDelay: "100ms" }}>
          <SectionLabel text="Evolution Timeline" />
        </div>

        <h2
          className="mt-5 text-3xl md:text-4xl font-extrabold text-[var(--foreground)] animate-slide"
          style={{
            fontFamily: '"Outfit", sans-serif',
            animationDelay: "200ms",
          }}
        >
          <History
            size={32}
            className="inline-block mr-3 text-[var(--accent)]"
            strokeWidth={2.5}
          />
          演进历程：五阶段进化之路
        </h2>

        <p
          className="mt-4 max-w-3xl text-[var(--foreground)]/60 font-medium leading-relaxed animate-slide"
          style={{ animationDelay: "250ms" }}
        >
          表单开发范式的演进，本质上是
          <strong className="text-[var(--accent)]">抽象层级不断提升</strong>
          的过程—— 从直接操作 DOM，到组件封装，再到数据描述，最终走向智能生成。
        </p>

        {/* 时间轴 */}
        <div className="mt-10 relative">
          {/* 垂直连接线 */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--border)] -translate-x-1/2 hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {EVOLUTION_TIMELINE.map((item, idx) => (
              <div
                key={item.year}
                className={`relative md:flex items-center gap-8 animate-slide ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                style={{ animationDelay: `${300 + idx * 120}ms` }}
                onMouseEnter={() => setActiveTimelineIdx(idx)}
              >
                {/* 内容卡片 */}
                <div
                  className={`flex-1 ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                >
                  <div
                    className={`topic-card inline-block p-5 rounded-[var(--radius-md)] transition-all duration-300 ${activeTimelineIdx === idx ? "scale-[1.03]" : ""}`}
                    style={{
                      boxShadow:
                        activeTimelineIdx === idx
                          ? `6px 6px 0px 0px ${item.color}`
                          : "4px 4px 0px 0px var(--border)",
                    }}
                  >
                    <div
                      className={`flex items-center gap-3 mb-2 ${idx % 2 === 0 ? "md:justify-end" : ""}`}
                    >
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${item.color}15`,
                          color: item.color,
                        }}
                      >
                        {item.year}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-bold text-[var(--foreground)]"
                      style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--foreground)]/60 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* 中心节点 */}
                <div
                  className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-3 flex-shrink-0 z-10 transition-all duration-300"
                  style={{
                    backgroundColor:
                      activeTimelineIdx >= idx ? item.color : "var(--card)",
                    borderColor:
                      activeTimelineIdx >= idx
                        ? "var(--foreground)"
                        : "var(--border)",
                    color:
                      activeTimelineIdx >= idx
                        ? "white"
                        : "var(--foreground)/40",
                    boxShadow:
                      activeTimelineIdx >= idx
                        ? "4px 4px 0px 0px var(--foreground)"
                        : "none",
                    borderWidth: activeTimelineIdx === idx ? "3px" : "2px",
                  }}
                >
                  {item.icon}
                </div>

                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* 当前阶段高亮 */}
        <div
          className="mt-10 p-6 rounded-[var(--radius-lg)] border-2 border-[var(--foreground)] animate-slide"
          style={{
            boxShadow: "8px 8px 0px 0px var(--quaternary)",
            animationDelay: "900ms",
            background:
              "linear-gradient(135deg, var(--card) 0%, var(--quaternary) 5% 100%)",
          }}
        >
          <div className="flex items-start gap-4">
            <GeoBadge color="var(--quaternary)" size="lg">
              <Rocket size={28} strokeWidth={2.5} />
            </GeoBadge>
            <div>
              <h3
                className="text-xl font-bold text-[var(--foreground)]"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                当前主流：Phase 3-4 融合阶段
              </h3>
              <p className="mt-2 text-[var(--foreground)]/60 font-medium leading-relaxed">
                Schema 驱动 + 可视化搭建是当前业界主流方案。Formily
                (蚂蚁)、FormRender (阿里)、ProForm (Ant Design Pro)
                等框架已广泛落地。 Phase 5 的 AI 辅助生成正在探索中，如通过 LLM
                自动生成 Schema、智能推荐校验规则等。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          对比分析 — 传统 vs 低代码
      ════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 mt-20">
        <div className="animate-slide" style={{ animationDelay: "100ms" }}>
          <SectionLabel text="Comparison" />
        </div>

        <h2
          className="mt-5 text-3xl md:text-4xl font-extrabold text-[var(--foreground)] animate-slide"
          style={{
            fontFamily: '"Outfit", sans-serif',
            animationDelay: "200ms",
          }}
        >
          <GitCompare
            size={32}
            className="inline-block mr-3 text-[var(--tertiary)]"
            strokeWidth={2.5}
          />
          对比分析：传统开发 vs 低代码表单
        </h2>

        <div className="mt-8 overflow-x-auto">
          <div
            className="min-w-[600px] rounded-[var(--radius-lg)] border-2 border-[var(--foreground)] overflow-hidden animate-slide"
            style={{
              boxShadow: "8px 8px 0px 0px var(--tertiary)",
              animationDelay: "300ms",
            }}
          >
            {/* 表头 */}
            <div className="grid grid-cols-[200px_1fr_1fr] bg-[var(--foreground)] text-white">
              <div
                className="px-5 py-3 font-bold text-sm border-r border-white/10"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                维度
              </div>
              <div className="px-5 py-3 font-bold text-sm border-r border-white/10 flex items-center gap-2">
                <Wrench size={14} strokeWidth={2.5} />
                传统开发
              </div>
              <div className="px-5 py-3 font-bold text-sm flex items-center gap-2">
                <Sparkles size={14} strokeWidth={2.5} />
                低代码表单
              </div>
            </div>
            {/* 行 */}
            {COMPARISON_DATA.map((row, idx) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-[200px_1fr_1fr] ${idx % 2 === 0 ? "bg-[var(--card)]" : "bg-[var(--card)]/50"} border-t border-[var(--border)]`}
              >
                <div
                  className="px-5 py-4 font-bold text-sm text-[var(--foreground)] border-r border-[var(--border)]"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  {row.aspect}
                </div>
                <div className="px-5 py-4 border-r border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[var(--foreground)]/70">
                      {row.traditional}
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-[var(--border)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--secondary)] transition-all duration-1000"
                        style={{ width: `${row.score_trad * 10}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[var(--foreground)]">
                      {row.lowcode}
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-[var(--border)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--quaternary)] transition-all duration-1000"
                        style={{ width: `${row.score_lc * 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 结论 */}
        <div
          className="mt-6 flex flex-wrap gap-3 animate-slide"
          style={{ animationDelay: "500ms" }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[var(--quaternary)] bg-[var(--quaternary)]/10">
            <TrendingUp
              size={16}
              className="text-[var(--quaternary)]"
              strokeWidth={2.5}
            />
            <span className="text-sm font-bold text-[var(--quaternary)]">
              效率提升 5-10x
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[var(--accent)] bg-[var(--accent)]/10">
            <Shield
              size={16}
              className="text-[var(--accent)]"
              strokeWidth={2.5}
            />
            <span className="text-sm font-bold text-[var(--accent)]">
              质量更可控
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[var(--tertiary)] bg-[var(--tertiary)]/10">
            <Star
              size={16}
              className="text-[var(--tertiary)]"
              strokeWidth={2.5}
            />
            <span className="text-sm font-bold text-[var(--tertiary)]">
              灵活度适度让步
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          应用场景 — 哪些领域在用
      ════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 mt-20">
        <div className="animate-slide" style={{ animationDelay: "100ms" }}>
          <SectionLabel text="Use Cases" />
        </div>

        <h2
          className="mt-5 text-3xl md:text-4xl font-extrabold text-[var(--foreground)] animate-slide"
          style={{
            fontFamily: '"Outfit", sans-serif',
            animationDelay: "200ms",
          }}
        >
          <BarChart3
            size={32}
            className="inline-block mr-3 text-[var(--secondary)]"
            strokeWidth={2.5}
          />
          应用场景：谁在使用？
        </h2>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {USE_CASES.map((useCase, idx) => (
            <div
              key={useCase.domain}
              className="topic-card rounded-[var(--radius-lg)] overflow-hidden animate-slide"
              style={{
                boxShadow: `8px 8px 0px 0px ${useCase.color}`,
                animationDelay: `${300 + idx * 100}ms`,
              }}
            >
              <div className="h-2" style={{ backgroundColor: useCase.color }} />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-[var(--radius-md)] border-2 border-[var(--foreground)]"
                    style={{
                      backgroundColor: `${useCase.color}15`,
                      color: useCase.color,
                    }}
                  >
                    {useCase.icon}
                  </div>
                  <h3
                    className="text-base font-bold text-[var(--foreground)]"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                  >
                    {useCase.domain}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {useCase.cases.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-[var(--foreground)]/70 font-medium"
                    >
                      <ChevronRight
                        size={14}
                        style={{ color: useCase.color }}
                        strokeWidth={2.5}
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          技术栈全景 — 生态图谱
      ════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 mt-20">
        <div className="animate-slide" style={{ animationDelay: "100ms" }}>
          <SectionLabel text="Tech Stack Landscape" />
        </div>

        <h2
          className="mt-5 text-3xl md:text-4xl font-extrabold text-[var(--foreground)] animate-slide"
          style={{
            fontFamily: '"Outfit", sans-serif',
            animationDelay: "200ms",
          }}
        >
          <Waypoints
            size={32}
            className="inline-block mr-3 text-[var(--quaternary)]"
            strokeWidth={2.5}
          />
          技术栈全景
        </h2>

        <div className="mt-8 space-y-4">
          {TECH_STACK.map((layer, idx) => (
            <div
              key={layer.layer}
              className="topic-card p-5 rounded-[var(--radius-md)] animate-slide"
              style={{
                boxShadow: `6px 6px 0px 0px ${layer.color}`,
                animationDelay: `${300 + idx * 100}ms`,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 sm:w-40 flex-shrink-0">
                  <GeoBadge color={layer.color} size="sm">
                    {layer.icon}
                  </GeoBadge>
                  <span
                    className="text-sm font-bold text-[var(--foreground)]"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                  >
                    {layer.layer}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {layer.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--card)] text-sm font-semibold text-[var(--foreground)] transition-all hover:rotate-[-1deg] hover:scale-105"
                      style={{ boxShadow: "3px 3px 0px 0px var(--foreground)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          Schema 结构解析
      ════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 mt-20">
        <div className="animate-slide" style={{ animationDelay: "100ms" }}>
          <SectionLabel text="Schema Structure" />
        </div>

        <h2
          className="mt-5 text-3xl md:text-4xl font-extrabold text-[var(--foreground)] animate-slide"
          style={{
            fontFamily: '"Outfit", sans-serif',
            animationDelay: "200ms",
          }}
        >
          JSON Schema 核心结构
        </h2>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div
            className="rounded-[var(--radius-lg)] border-2 border-[var(--foreground)] bg-[var(--foreground)] overflow-hidden animate-slide"
            style={{
              boxShadow: "8px 8px 0px 0px var(--accent)",
              animationDelay: "300ms",
            }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[var(--secondary)]" />
                <div className="w-3 h-3 rounded-full bg-[var(--tertiary)]" />
                <div className="w-3 h-3 rounded-full bg-[var(--quaternary)]" />
              </div>
              <span className="ml-2 text-xs font-mono text-white/50 font-semibold">
                form-schema.json
              </span>
            </div>
            <pre className="p-5 text-sm font-mono text-white/90 overflow-x-auto leading-relaxed">
              <code className="language-json" dangerouslySetInnerHTML={{ __html: highlightCode(`{
  "formId": "user-registration",
  "version": "1.0.0",
  "fields": [
    {
      "key": "username",
      "type": "string",
      "label": "用户名",
      "required": true,
      "rules": [
        { "type": "pattern", "value": "^[a-zA-Z]+$" },
        { "type": "range", "min": 2, "max": 20 }
      ]
    },
    {
      "key": "email",
      "type": "string",
      "label": "邮箱",
      "required": true,
      "rules": [
        { "type": "email" },
        {
          "type": "async",
          "validator": "checkDuplicate"
        }
      ]
    }
  ],
  "layout": { "columns": 2, "gap": 16 },
  "submit": { "api": "/api/form/submit" }
}`, "json") }} />
            </pre>
          </div>

          <div className="space-y-4">
            {SCHEMA_FIELDS.map((field, idx) => (
              <div
                key={field.key}
                onMouseEnter={() => setHighlightedField(idx)}
                onMouseLeave={() => setHighlightedField(null)}
              >
                <SchemaFieldCard
                  field={field}
                  index={idx}
                  isHighlighted={highlightedField === idx}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 数据流示意 */}
        <div
          className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4 animate-slide"
          style={{ animationDelay: "400ms" }}
        >
          {[
            {
              icon: <FileJson2 size={20} strokeWidth={2.5} />,
              label: "JSON Schema",
              color: "var(--accent)",
            },
            {
              icon: <Code2 size={20} strokeWidth={2.5} />,
              label: "解析引擎",
              color: "var(--tertiary)",
            },
            {
              icon: <Layers size={20} strokeWidth={2.5} />,
              label: "组件映射",
              color: "var(--secondary)",
            },
            {
              icon: <Eye size={20} strokeWidth={2.5} />,
              label: "渲染输出",
              color: "var(--quaternary)",
            },
          ].map((step, idx, arr) => (
            <React.Fragment key={step.label}>
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--card)]"
                style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
              >
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: step.color }}
                >
                  {step.icon}
                </div>
                <span className="text-sm font-bold text-[var(--foreground)]">
                  {step.label}
                </span>
              </div>
              {idx < arr.length - 1 && (
                <ArrowRight
                  size={20}
                  className="text-[var(--foreground)]/30 hidden md:block"
                  strokeWidth={2.5}
                />
              )}
              {idx < arr.length - 1 && (
                <ArrowDown
                  size={20}
                  className="text-[var(--foreground)]/30 md:hidden"
                  strokeWidth={2.5}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          拖拽交互实验场
      ════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 mt-20">
        <div className="animate-slide" style={{ animationDelay: "100ms" }}>
          <SectionLabel text="Interactive Lab" />
        </div>

        <h2
          className="mt-5 text-3xl md:text-4xl font-extrabold text-[var(--foreground)] animate-slide"
          style={{
            fontFamily: '"Outfit", sans-serif',
            animationDelay: "200ms",
          }}
        >
          🎮 拖拽编排实验场
        </h2>
        <p
          className="mt-3 text-[var(--foreground)]/60 font-medium max-w-xl animate-slide"
          style={{ animationDelay: "250ms" }}
        >
          从左侧拖拽组件到中间画布，右侧实时预览表单渲染与校验效果
        </p>

        <div className="mt-8 grid lg:grid-cols-[240px_1fr_1fr] gap-6">
          {/* 组件面板 */}
          <div
            className="rounded-[var(--radius-lg)] border-2 border-[var(--foreground)] bg-[var(--card)] p-5 animate-slide"
            style={{
              boxShadow: "8px 8px 0px 0px var(--foreground)",
              animationDelay: "300ms",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <GeoBadge color="var(--accent)" size="sm">
                <Boxes size={16} strokeWidth={2.5} />
              </GeoBadge>
              <span className="text-sm font-bold text-[var(--foreground)]">
                组件库
              </span>
            </div>
            <div className="space-y-3">
              {DRAG_COMPONENTS.map((comp) => (
                <DraggableComponent
                  key={comp.id}
                  item={comp}
                  onDragStart={handleDragStart}
                  isDragging={draggingItem?.id === comp.id}
                />
              ))}
            </div>
          </div>

          {/* 画布区域 */}
          <div
            className="rounded-[var(--radius-lg)] border-2 border-[var(--foreground)] bg-[var(--card)] p-5 animate-slide min-h-[400px]"
            style={{
              boxShadow: "8px 8px 0px 0px var(--secondary)",
              animationDelay: "400ms",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GeoBadge color="var(--secondary)" size="sm">
                  <Layers size={16} strokeWidth={2.5} />
                </GeoBadge>
                <span className="text-sm font-bold text-[var(--foreground)]">
                  画布
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[var(--foreground)] text-white">
                  {canvasItems.length} 项
                </span>
              </div>
              {canvasItems.length > 0 && (
                <button
                  onClick={() => setCanvasItems([])}
                  className="text-xs font-bold text-[var(--secondary)] hover:underline"
                >
                  清空
                </button>
              )}
            </div>
            <div
              className={`min-h-[300px] rounded-[var(--radius-md)] border-2 border-dashed transition-colors p-3 space-y-3 ${draggingItem ? "border-[var(--accent)] bg-[var(--accent)]/5" : "border-[var(--border)]"}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {canvasItems.length === 0 && !draggingItem && (
                <div className="flex flex-col items-center justify-center h-72 text-[var(--foreground)]/30">
                  <MousePointerClick size={40} strokeWidth={2} />
                  <p className="mt-3 text-sm font-semibold">
                    将左侧组件拖拽到此处
                  </p>
                </div>
              )}
              {canvasItems.map((item, idx) => (
                <CanvasFormItem
                  key={`${item.id}-${idx}`}
                  item={item}
                  index={idx}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
          </div>

          {/* 预览区域 */}
          <div
            className="rounded-[var(--radius-lg)] border-2 border-[var(--foreground)] bg-[var(--card)] p-5 animate-slide"
            style={{
              boxShadow: "8px 8px 0px 0px var(--quaternary)",
              animationDelay: "500ms",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GeoBadge color="var(--quaternary)" size="sm">
                  <Eye size={16} strokeWidth={2.5} />
                </GeoBadge>
                <span className="text-sm font-bold text-[var(--foreground)]">
                  实时预览
                </span>
              </div>
              <button
                onClick={() => setShowCode(!showCode)}
                className="text-xs font-bold text-[var(--accent)] hover:underline flex items-center gap-1"
              >
                <Code2 size={12} strokeWidth={2.5} />
                {showCode ? "表单" : "Schema"}
              </button>
            </div>
            {showCode ? (
              <div className="rounded-[var(--radius-md)] bg-[var(--foreground)] p-4 text-xs font-mono text-white/80 overflow-auto max-h-[380px]">
                <pre className="language-json"><code className="language-json" dangerouslySetInnerHTML={{ __html: highlightCode(JSON.stringify(generatedSchema, null, 2), "json") }} /></pre>
              </div>
            ) : (
              <FormPreview canvasItems={canvasItems} />
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          校验逻辑流转
      ════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 mt-20">
        <div className="animate-slide" style={{ animationDelay: "100ms" }}>
          <SectionLabel text="Validation Pipeline" />
        </div>

        <div className="mt-5 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-[var(--foreground)] animate-slide"
              style={{
                fontFamily: '"Outfit", sans-serif',
                animationDelay: "200ms",
              }}
            >
              校验逻辑流水线
            </h2>
            <p
              className="mt-3 text-[var(--foreground)]/60 font-medium animate-slide"
              style={{ animationDelay: "250ms" }}
            >
              每个表单字段需经过 4 阶段严格校验，确保数据合法性
            </p>
          </div>
          <button
            onClick={startValidationAnimation}
            disabled={isAnimating}
            className="flex items-center gap-2 px-5 py-3 rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--accent)] text-white font-bold text-sm transition-all hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed animate-slide"
            style={{
              boxShadow: "4px 4px 0px 0px var(--foreground)",
              animationDelay: "300ms",
            }}
          >
            {isAnimating ? (
              <>
                <Pause size={16} strokeWidth={2.5} />
                校验中...
              </>
            ) : (
              <>
                <Play size={16} strokeWidth={2.5} />
                演示校验流程
              </>
            )}
          </button>
        </div>

        <div
          className="mt-10 p-8 rounded-[var(--radius-lg)] border-2 border-[var(--foreground)] bg-[var(--card)] overflow-x-auto animate-slide"
          style={{
            boxShadow: "8px 8px 0px 0px var(--tertiary)",
            animationDelay: "400ms",
          }}
        >
          <div className="flex items-start justify-center gap-2 min-w-max">
            <div className="flex flex-col items-center">
              <div
                className="w-20 h-20 flex items-center justify-center rounded-[var(--radius-md)] border-2 border-[var(--foreground)] bg-[var(--tertiary)]/20"
                style={{ boxShadow: "4px 4px 0px 0px var(--foreground)" }}
              >
                <Upload size={22} strokeWidth={2.5} />
              </div>
              <p className="mt-3 text-sm font-bold text-[var(--foreground)]">
                用户输入
              </p>
            </div>
            <FlowArrow active={validationStep >= 0} />
            {VALIDATION_PIPELINE.map((step, idx) => (
              <React.Fragment key={step.stage}>
                <ValidationNode
                  step={step}
                  isActive={validationStep === idx}
                  isComplete={validationStep > idx}
                  index={idx}
                />
                {idx < VALIDATION_PIPELINE.length - 1 && (
                  <FlowArrow active={validationStep > idx} />
                )}
              </React.Fragment>
            ))}
            <FlowArrow active={validationStep >= VALIDATION_PIPELINE.length} />
            <div className="flex flex-col items-center">
              <div
                className={`w-20 h-20 flex items-center justify-center rounded-[var(--radius-md)] border-3 transition-all duration-500 ${validationStep >= VALIDATION_PIPELINE.length ? "border-[var(--quaternary)] bg-[var(--quaternary)]" : "border-[var(--border)] bg-[var(--card)]"}`}
                style={{
                  boxShadow:
                    validationStep >= VALIDATION_PIPELINE.length
                      ? "6px 6px 0px 0px var(--foreground)"
                      : "none",
                }}
              >
                <CheckCircle2
                  size={28}
                  className={
                    validationStep >= VALIDATION_PIPELINE.length
                      ? "text-white"
                      : "text-[var(--border)]"
                  }
                  strokeWidth={2.5}
                />
              </div>
              <p className="mt-3 text-sm font-bold text-[var(--foreground)]">
                校验完成
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div
            className="topic-card p-6 rounded-[var(--radius-lg)] animate-slide"
            style={{
              boxShadow: "8px 8px 0px 0px var(--accent)",
              animationDelay: "500ms",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <GeoBadge color="var(--accent)">
                <Zap size={22} strokeWidth={2.5} />
              </GeoBadge>
              <div>
                <h3
                  className="text-lg font-bold text-[var(--foreground)]"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  同步校验链
                </h3>
                <p className="text-xs text-[var(--foreground)]/50 font-semibold">
                  Synchronous Validation Chain
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { rule: "type: string", desc: "基础类型检查" },
                { rule: "required: true", desc: "非空校验" },
                { rule: "min / max", desc: "长度与范围约束" },
                { rule: "pattern", desc: "正则表达式匹配" },
                { rule: "enum", desc: "枚举值白名单" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] bg-[var(--accent)]/5 border border-[var(--accent)]/20"
                >
                  <code className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[var(--accent)] text-white whitespace-nowrap">
                    {item.rule}
                  </code>
                  <span className="text-sm text-[var(--foreground)]/70 font-medium">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="topic-card p-6 rounded-[var(--radius-lg)] animate-slide"
            style={{
              boxShadow: "8px 8px 0px 0px var(--secondary)",
              animationDelay: "600ms",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <GeoBadge color="var(--secondary)">
                <RefreshCw size={22} strokeWidth={2.5} />
              </GeoBadge>
              <div>
                <h3
                  className="text-lg font-bold text-[var(--foreground)]"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  异步校验网
                </h3>
                <p className="text-xs text-[var(--foreground)]/50 font-semibold">
                  Async Validation Network
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { rule: "unique", desc: "后端唯一性校验 (用户名/邮箱)" },
                { rule: "exists", desc: "关联数据存在性验证" },
                { rule: "custom", desc: "自定义业务规则函数" },
                { rule: "cross-field", desc: "跨字段依赖校验" },
                { rule: "debounce", desc: "防抖请求优化" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] bg-[var(--secondary)]/5 border border-[var(--secondary)]/20"
                >
                  <code className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[var(--secondary)] text-white whitespace-nowrap">
                    {item.rule}
                  </code>
                  <span className="text-sm text-[var(--foreground)]/70 font-medium">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          渲染引擎架构
      ════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 mt-20">
        <div className="animate-slide" style={{ animationDelay: "100ms" }}>
          <SectionLabel text="Render Engine" />
        </div>

        <h2
          className="mt-5 text-3xl md:text-4xl font-extrabold text-[var(--foreground)] animate-slide"
          style={{
            fontFamily: '"Outfit", sans-serif',
            animationDelay: "200ms",
          }}
        >
          表单渲染引擎架构
        </h2>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "组件注册表",
              subtitle: "Component Registry",
              icon: <Boxes size={24} strokeWidth={2.5} />,
              color: "var(--accent)",
              shadow: "var(--accent)",
              items: [
                "组件类型 → React 组件映射",
                "支持自定义组件扩展",
                "属性面板与预览同步",
                "按需懒加载组件",
              ],
            },
            {
              title: "布局引擎",
              subtitle: "Layout Engine",
              icon: <Layers size={24} strokeWidth={2.5} />,
              color: "var(--tertiary)",
              shadow: "var(--tertiary)",
              items: [
                "栅格系统 (12/24 列)",
                "响应式断点配置",
                "嵌套布局支持",
                "Flex / Grid 混合布局",
              ],
            },
            {
              title: "状态管理",
              subtitle: "State Manager",
              icon: <GitBranch size={24} strokeWidth={2.5} />,
              color: "var(--quaternary)",
              shadow: "var(--quaternary)",
              items: [
                "集中式表单 Store",
                "字段级订阅与更新",
                "联动计算与派生",
                "Undo / Redo 历史栈",
              ],
            },
          ].map((section, idx) => (
            <div
              key={section.title}
              className="topic-card p-6 rounded-[var(--radius-lg)] animate-slide"
              style={{
                boxShadow: `8px 8px 0px 0px ${section.shadow}`,
                animationDelay: `${300 + idx * 100}ms`,
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <GeoBadge color={section.color} size="md">
                  {section.icon}
                </GeoBadge>
                <div>
                  <h3
                    className="text-lg font-bold text-[var(--foreground)]"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                  >
                    {section.title}
                  </h3>
                  <p className="text-xs text-[var(--foreground)]/50 font-semibold">
                    {section.subtitle}
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div
                      className="mt-1 w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full border-2"
                      style={{
                        borderColor: section.color,
                        color: section.color,
                      }}
                    >
                      <CheckCircle2 size={12} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm text-[var(--foreground)]/80 font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          核心设计决策
      ════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 mt-20">
        <div className="animate-slide" style={{ animationDelay: "100ms" }}>
          <SectionLabel text="Key Takeaways" />
        </div>

        <h2
          className="mt-5 text-3xl md:text-4xl font-extrabold text-[var(--foreground)] animate-slide"
          style={{
            fontFamily: '"Outfit", sans-serif',
            animationDelay: "200ms",
          }}
        >
          核心设计决策
        </h2>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              num: "01",
              title: "声明式 Schema",
              desc: "用 JSON 描述「是什么」而非「怎么做」，解耦配置与渲染逻辑",
              color: "var(--accent)",
              icon: <FileJson2 size={28} strokeWidth={2.5} />,
            },
            {
              num: "02",
              title: "策略模式校验",
              desc: "每种校验规则独立策略类，支持组合、优先级、短路优化",
              color: "var(--secondary)",
              icon: <ShieldCheck size={28} strokeWidth={2.5} />,
            },
            {
              num: "03",
              title: "依赖追踪联动",
              desc: "字段间通过依赖图实现精准联动，避免全量重渲染",
              color: "var(--tertiary)",
              icon: <Workflow size={28} strokeWidth={2.5} />,
            },
            {
              num: "04",
              title: "插件化扩展",
              desc: "校验器、渲染器、布局器均可通过插件注册扩展",
              color: "var(--quaternary)",
              icon: <Boxes size={28} strokeWidth={2.5} />,
            },
          ].map((item, idx) => (
            <div
              key={item.num}
              className="group topic-card rounded-[var(--radius-lg)] overflow-hidden animate-slide"
              style={{
                boxShadow: `8px 8px 0px 0px ${item.color}`,
                animationDelay: `${300 + idx * 100}ms`,
              }}
            >
              <div className="h-2" style={{ backgroundColor: item.color }} />
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-4xl font-extrabold opacity-20"
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      color: item.color,
                    }}
                  >
                    {item.num}
                  </span>
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-[var(--radius-md)] border-2 border-[var(--foreground)]"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </div>
                </div>
                <h3
                  className="text-lg font-bold text-[var(--foreground)] mb-2"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--foreground)]/60 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          底部签名
      ════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 mt-20">
        <div
          className="p-8 md:p-12 rounded-[var(--radius-lg)] border-2 border-[var(--foreground)] bg-[var(--foreground)] text-white text-center animate-slide"
          style={{
            boxShadow: "8px 8px 0px 0px var(--accent)",
            animationDelay: "200ms",
          }}
        >
          <p
            className="text-2xl md:text-4xl font-extrabold mb-4"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            Schema 即真理，配置即代码 ✨
          </p>
          <p className="text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
            低代码表单的核心价值在于将复杂的表单开发范式收敛到一份结构化的 JSON
            Schema 中， 让非技术人员也能通过可视化编排完成业务表单搭建。
            从痛点出发，以 Schema
            为基石，用引擎驱动渲染，让校验逻辑有序流转——这就是现代表单工程的完整图景。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-[var(--accent)]/30 text-white/80 border border-white/20">
              Schema-Driven
            </span>
            <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-[var(--secondary)]/30 text-white/80 border border-white/20">
              Drag & Drop
            </span>
            <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-[var(--tertiary)]/30 text-white/80 border border-white/20">
              Validation Pipeline
            </span>
            <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-[var(--quaternary)]/30 text-white/80 border border-white/20">
              Type-Safe
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
