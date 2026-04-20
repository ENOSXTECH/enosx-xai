/*
 * ENOSX XAI Assistant — WelcomeScreen Component
 * Design: Centered hero with animated logo, suggestion chips, and mesh background
 */

import { motion } from "framer-motion";
import { Sparkles, Code2, Globe, Brain, Lightbulb, Zap } from "lucide-react";

const BG_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663581012760/3KsVJNzTNHX32FLQf9aZCC/enosx-bg-mesh-dMF6AjTJ234cK4z3d5pivU.webp";
const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663581012760/3KsVJNzTNHX32FLQf9aZCC/enosx-holographic-ex-logo-a8n55PP8spZG7D4yaAmqSb.webp";

const SUGGESTIONS = [
  { icon: Code2, text: "Write a React component with TypeScript", color: "#00F2FF" },
  { icon: Brain, text: "Explain quantum computing simply", color: "#7000FF" },
  { icon: Globe, text: "Summarize the latest AI trends", color: "#00F2FF" },
  { icon: Lightbulb, text: "Help me brainstorm a startup idea", color: "#FF0080" },
  { icon: Zap, text: "Optimize this Python function", color: "#7000FF" },
  { icon: Sparkles, text: "Create a creative short story", color: "#FF0080" },
];

interface WelcomeScreenProps {
  onSuggestion: (text: string) => void;
}

export default function WelcomeScreen({ onSuggestion }: WelcomeScreenProps) {
  return (
    <div className="relative flex-1 flex flex-col items-center justify-center overflow-hidden">
      {/* Background mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${BG_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.35,
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.8) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        {/* Title - ENOSX AI only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-12"
        >
          <h1
            className="text-5xl font-bold"
            style={{
              background: "linear-gradient(135deg, #00F2FF, #7000FF, #FF0080)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            ENOSX AI
          </h1>
        </motion.div>

        {/* Suggestion chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="grid grid-cols-2 gap-2 w-full max-w-lg"
        >
          {SUGGESTIONS.map((s, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.06, duration: 0.3 }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSuggestion(s.text)}
              className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-left transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  `${s.color}40`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,255,255,0.08)";
              }}
            >
              <s.icon
                size={14}
                className="flex-shrink-0"
                style={{ color: s.color }}
              />
              <span className="text-xs leading-snug" style={{ letterSpacing: "-0.01em" }}>
                {s.text}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* ENOSX Technologies credit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-8 text-center text-xs"
          style={{
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          © 2026{" "}
          <span style={{ color: "rgba(0, 242, 255, 0.8)", fontWeight: 600 }}>
            ENOSX Technologies
          </span>
        </motion.div>
      </div>
    </div>
  );
}
