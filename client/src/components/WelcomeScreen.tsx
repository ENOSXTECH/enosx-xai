/*
 * ENOSX XAI Assistant — WelcomeScreen Component
 * Design: Centered hero with animated logo, suggestion chips, and mesh background
 */

import { motion } from "framer-motion";
import { Sparkles, Code2, Globe, Brain, Lightbulb, Zap } from "lucide-react";

const BG_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663581012760/3KsVJNzTNHX32FLQf9aZCC/enosx-bg-mesh-dMF6AjTJ234cK4z3d5pivU.webp";
const LOGO_URL =
  "/manus-storage/ChatGPTImageApr20,2026,01_59_15PM_d79fe8eb.png";

const SUGGESTIONS = [
  { icon: Code2, text: "Write a React component with TypeScript", color: "#dc143c" },
  { icon: Brain, text: "Explain quantum computing simply", color: "#9b59b6" },
  { icon: Globe, text: "Summarize the latest AI trends", color: "#3498db" },
  { icon: Lightbulb, text: "Help me brainstorm a startup idea", color: "#f39c12" },
  { icon: Zap, text: "Optimize this Python function", color: "#2ecc71" },
  { icon: Sparkles, text: "Create a creative short story", color: "#e74c3c" },
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
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8 w-48 h-24 flex items-center justify-center"
          style={{
            filter: "drop-shadow(0 0 20px rgba(220, 20, 60, 0.3))",
          }}
        >
          <img
            src={LOGO_URL}
            alt="ENOSX XAI"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <h1
            className="text-4xl font-bold mb-2"
            style={{
              color: "#f0f0f0",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            ENOSX{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #dc143c, #ff6b6b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              XAI
            </span>
          </h1>
          <p
            className="text-sm mb-1"
            style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em" }}
          >
            ULTRA-INTELLIGENT AI ASSISTANT
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-base mb-10 max-w-md"
          style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}
        >
          Powered by Groq's ultra-fast inference. Ask anything — code, analysis,
          creative writing, or just a conversation.
        </motion.p>

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

        {/* Founder credit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-6 text-center text-xs"
          style={{
            color: "rgba(220,20,60,0.6)",
            letterSpacing: "0.04em",
          }}
        >
          Built by{" "}
          <span style={{ color: "rgba(220,20,60,0.9)", fontWeight: 600 }}>
            Enosh
          </span>
          {" "}at Enosx Technologies
        </motion.div>

        {/* Powered by badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 flex items-center gap-2"
          style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", letterSpacing: "0.06em" }}
        >
          <Zap size={10} style={{ color: "rgba(220,20,60,0.5)" }} />
          <span>POWERED BY GROQ · LLAMA 3.3 70B · ULTRA-FAST INFERENCE</span>
        </motion.div>
      </div>
    </div>
  );
}
