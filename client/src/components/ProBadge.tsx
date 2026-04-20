/*
 * ENOSX XAI Assistant — ProBadge Component
 * Premium visual identity with gold-to-orange gradient glow
 * Indicates Pro/Premium tier users
 */

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ProBadgeProps {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function ProBadge({ size = "md", showLabel = true }: ProBadgeProps) {
  const sizeMap = {
    sm: { badge: "h-5 px-2", text: "text-xs", icon: 10 },
    md: { badge: "h-6 px-2.5", text: "text-sm", icon: 12 },
    lg: { badge: "h-8 px-3", text: "text-base", icon: 14 },
  };

  const config = sizeMap[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`${config.badge} rounded-full flex items-center gap-1.5 relative overflow-hidden`}
      style={{
        background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 140, 0, 0.1))",
        border: "1px solid rgba(255, 215, 0, 0.3)",
        boxShadow:
          "0 0 16px rgba(255, 215, 0, 0.3), inset 0 0 8px rgba(255, 215, 0, 0.1)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Shimmer animation */}
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
          width: "100%",
        }}
      />

      {/* Content */}
      <div className="relative flex items-center gap-1.5">
        <Sparkles size={config.icon} style={{ color: "#FFD700" }} />
        {showLabel && (
          <span
            className={`${config.text} font-bold`}
            style={{
              background: "linear-gradient(135deg, #FFD700, #FF8C00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.05em",
            }}
          >
            PRO
          </span>
        )}
      </div>
    </motion.div>
  );
}
