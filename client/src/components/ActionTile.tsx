/*
 * ENOSX XAI Assistant — ActionTile Component
 * Interactive widgets for system commands, toggles, and live data
 * Beautiful rounded cards with glassmorphism
 */

import { motion } from "framer-motion";
import { Zap, Volume2, Cpu, Wifi, Lightbulb, ToggleRight } from "lucide-react";
import { ReactNode } from "react";

export type ActionTileType = "toggle" | "metric" | "action" | "status";

interface ActionTileProps {
  type: ActionTileType;
  title: string;
  value?: string | number;
  icon?: ReactNode;
  isActive?: boolean;
  onToggle?: () => void;
  metric?: {
    current: number;
    max: number;
    unit: string;
    color?: string;
  };
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function ActionTile({
  type,
  title,
  value,
  icon,
  isActive = false,
  onToggle,
  metric,
  action,
}: ActionTileProps) {
  const baseStyle = {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "16px",
    color: "#f0f0f0",
  };

  const activeStyle = isActive
    ? {
        background: "rgba(220,20,60,0.12)",
        border: "1px solid rgba(220,20,60,0.3)",
        boxShadow: "0 0 16px rgba(220,20,60,0.2)",
      }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="w-full"
      style={{ ...baseStyle, ...activeStyle }}
    >
      {type === "toggle" && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon || <ToggleRight size={18} style={{ color: "#dc143c" }} />}
            <span className="text-sm font-medium">{title}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggle}
            className="w-10 h-6 rounded-full transition-all"
            style={{
              background: isActive
                ? "rgba(220,20,60,0.8)"
                : "rgba(255,255,255,0.1)",
              border: `1px solid ${isActive ? "rgba(220,20,60,0.6)" : "rgba(255,255,255,0.15)"}`,
            }}
          >
            <motion.div
              layout
              className="w-5 h-5 rounded-full bg-white"
              style={{
                marginLeft: isActive ? "18px" : "2px",
              }}
            />
          </motion.button>
        </div>
      )}

      {type === "metric" && metric && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {icon || <Cpu size={16} style={{ color: "#dc143c" }} />}
              <span className="text-sm font-medium">{title}</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>
              {metric.current} / {metric.max} {metric.unit}
            </span>
          </div>
          <div
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(metric.current / metric.max) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: metric.color || "rgba(220,20,60,0.7)",
                boxShadow: `0 0 12px ${metric.color || "rgba(220,20,60,0.5)"}`,
              }}
            />
          </div>
        </div>
      )}

      {type === "action" && action && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon || <Zap size={16} style={{ color: "#dc143c" }} />}
            <span className="text-sm font-medium">{title}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
            style={{
              background: "rgba(220,20,60,0.2)",
              border: "1px solid rgba(220,20,60,0.4)",
              color: "#ff8080",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(220,20,60,0.35)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(220,20,60,0.2)";
            }}
          >
            {action.label}
          </motion.button>
        </div>
      )}

      {type === "status" && (
        <div className="flex items-center gap-3">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: isActive ? "#22c55e" : "#f59e0b",
              boxShadow: `0 0 8px ${isActive ? "rgba(34,197,94,0.6)" : "rgba(245,158,11,0.6)"}`,
              animation: !isActive ? "pulse 1.5s ease-in-out infinite" : "none",
            }}
          />
          <div>
            <div className="text-sm font-medium">{title}</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>
              {value || (isActive ? "Active" : "Inactive")}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
