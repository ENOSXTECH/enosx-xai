/*
 * ENOSX XAI Assistant — FounderMode Component
 * "Developer Preview" toggle with experimental visual effects
 * Signature feature: Enosh's personal touch on the app
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Sparkles, Eye, EyeOff } from "lucide-react";

interface FounderModeProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function FounderMode({ isEnabled, onToggle }: FounderModeProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="space-y-4">
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onToggle(!isEnabled)}
        className="w-full flex items-center justify-between p-3 rounded-lg transition-all"
        style={{
          background: isEnabled
            ? "rgba(220,20,60,0.15)"
            : "rgba(255,255,255,0.04)",
          border: `1px solid ${
            isEnabled ? "rgba(220,20,60,0.3)" : "rgba(255,255,255,0.08)"
          }`,
          boxShadow: isEnabled
            ? "0 0 16px rgba(220,20,60,0.2)"
            : "none",
        }}
      >
        <div className="flex items-center gap-3">
          {isEnabled ? (
            <Sparkles size={16} style={{ color: "#dc143c" }} />
          ) : (
            <Zap size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
          )}
          <div className="text-left">
            <div
              className="text-sm font-medium"
              style={{
                color: isEnabled ? "#dc143c" : "#f0f0f0",
              }}
            >
              Founder's Mode
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.02em",
              }}
            >
              Developer Preview
            </div>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isEnabled ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isEnabled ? (
            <Eye size={16} style={{ color: "#dc143c" }} />
          ) : (
            <EyeOff size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
          )}
        </motion.div>
      </motion.button>

      {/* Details */}
      <AnimatePresence>
        {isEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="p-3 rounded-lg space-y-2 text-xs"
              style={{
                background: "rgba(220,20,60,0.08)",
                border: "1px solid rgba(220,20,60,0.15)",
              }}
            >
              <div style={{ color: "rgba(255,255,255,0.7)" }}>
                <strong>Experimental Features:</strong>
              </div>
              <ul
                style={{
                  color: "rgba(255,255,255,0.5)",
                  paddingLeft: "16px",
                  lineHeight: 1.6,
                }}
              >
                <li>✨ Glitch shader effects on interactions</li>
                <li>✨ Custom theme: "Crimson Neon"</li>
                <li>✨ Enhanced animations & micro-interactions</li>
                <li>✨ Real-time performance metrics</li>
                <li>✨ Debug panel with token usage</li>
              </ul>
              <div
                style={{
                  fontSize: "9px",
                  color: "rgba(220,20,60,0.6)",
                  marginTop: "8px",
                  fontStyle: "italic",
                }}
              >
                Built by Enosh • Enosx Technologies
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual Effect Preview */}
      {isEnabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative h-12 rounded-lg overflow-hidden"
          style={{
            background: "rgba(220,20,60,0.1)",
            border: "1px solid rgba(220,20,60,0.2)",
          }}
        >
          {/* Animated glitch lines */}
          <motion.div
            animate={{
              x: [0, 2, -2, 1, -1, 0],
              opacity: [0, 0.5, 0.5, 0.3, 0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(220,20,60,0.3) 50%, transparent 100%)",
              pointerEvents: "none",
            }}
          />
          <div
            className="flex items-center justify-center h-full text-xs font-medium"
            style={{
              color: "rgba(220,20,60,0.7)",
              letterSpacing: "0.08em",
              textShadow: "0 0 8px rgba(220,20,60,0.4)",
            }}
          >
            EXPERIMENTAL MODE ACTIVE
          </div>
        </motion.div>
      )}
    </div>
  );
}
