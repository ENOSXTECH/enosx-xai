/*
 * ENOSX XAI Assistant — CommandBar Component
 * Design: Floating pill-shaped command bar
 * - Glass texture background with backdrop-filter blur
 * - Breathing red neon outer glow when focused
 * - Voice input button with radial pulse animation
 * - Waveform visualization during voice recording
 */

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mic,
  MicOff,
  Square,
  Loader2,
  Paperclip,
  Globe,
} from "lucide-react";
import { VoiceState } from "@/lib/types";

interface CommandBarProps {
  onSend: (text: string) => void;
  isLoading: boolean;
  voiceState: VoiceState;
  transcript: string;
  isVoiceSupported: boolean;
  onStartVoice: () => void;
  onStopVoice: () => void;
  onStopSpeaking: () => void;
  disabled?: boolean;
}

const WAVEFORM_BARS = 12;

export default function CommandBar({
  onSend,
  isLoading,
  voiceState,
  transcript,
  isVoiceSupported,
  onStartVoice,
  onStopVoice,
  onStopSpeaking,
  disabled,
}: CommandBarProps) {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [waveHeights, setWaveHeights] = useState<number[]>(
    Array(WAVEFORM_BARS).fill(0.3)
  );

  // Show transcript in input when voice is active
  useEffect(() => {
    if (transcript && voiceState === "listening") {
      setInput(transcript);
    }
  }, [transcript, voiceState]);

  // Animate waveform when listening
  useEffect(() => {
    if (voiceState !== "listening") {
      setWaveHeights(Array(WAVEFORM_BARS).fill(0.3));
      return;
    }
    const interval = setInterval(() => {
      setWaveHeights(
        Array(WAVEFORM_BARS)
          .fill(0)
          .map(() => 0.2 + Math.random() * 0.8)
      );
    }, 120);
    return () => clearInterval(interval);
  }, [voiceState]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollH = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollH, 160)}px`;
    }
  }, [input]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    onSend(text);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceClick = () => {
    if (voiceState === "speaking") {
      onStopSpeaking();
    } else if (voiceState === "listening") {
      onStopVoice();
    } else {
      onStartVoice();
    }
  };

  const canSend = input.trim().length > 0 && !isLoading && voiceState !== "listening";
  const isVoiceActive = voiceState === "listening" || voiceState === "speaking";

  return (
    <div className="relative px-4 pb-4 pt-2 flex-shrink-0">
      {/* Gradient fade above command bar */}
      <div
        className="absolute top-0 left-0 right-0 h-8 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(10,10,10,0.8))",
        }}
      />

      {/* Voice transcript preview */}
      <AnimatePresence>
        {voiceState === "listening" && transcript && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mb-2 px-4 py-2 rounded-xl text-sm"
            style={{
              background: "rgba(220,20,60,0.08)",
              border: "1px solid rgba(220,20,60,0.2)",
              color: "rgba(255,255,255,0.6)",
              fontStyle: "italic",
            }}
          >
            <span style={{ color: "rgba(220,20,60,0.7)" }}>●</span>{" "}
            {transcript}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main command bar */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        animate={
          focused
            ? {
                boxShadow: [
                  "0 0 0 0 rgba(220,20,60,0), 0 0 20px rgba(220,20,60,0.2), 0 8px 32px rgba(0,0,0,0.6)",
                  "0 0 0 3px rgba(220,20,60,0.15), 0 0 30px rgba(220,20,60,0.4), 0 0 60px rgba(220,20,60,0.2), 0 8px 32px rgba(0,0,0,0.6)",
                  "0 0 0 0 rgba(220,20,60,0), 0 0 20px rgba(220,20,60,0.2), 0 8px 32px rgba(0,0,0,0.6)",
                ],
              }
            : {
                boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
              }
        }
        transition={
          focused
            ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
        style={{
          background: "rgba(20, 12, 12, 0.85)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: focused
            ? "1px solid rgba(220,20,60,0.4)"
            : "1px solid rgba(255,255,255,0.10)",
        }}
      >
        {/* Waveform (voice listening) */}
        <AnimatePresence>
          {voiceState === "listening" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 40 }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-center gap-0.5 px-4"
              style={{ borderBottom: "1px solid rgba(220,20,60,0.15)" }}
            >
              {waveHeights.map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: h }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                  className="w-1 rounded-full origin-center"
                  style={{
                    height: 20,
                    background: `rgba(220, 20, 60, ${0.4 + h * 0.5})`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end gap-2 px-4 py-3">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={
              voiceState === "listening"
                ? "Listening..."
                : voiceState === "speaking"
                ? "Speaking..."
                : "Ask ENOSX XAI anything..."
            }
            disabled={disabled || voiceState === "listening"}
            rows={1}
            className="flex-1 resize-none bg-transparent outline-none text-sm leading-relaxed"
            style={{
              color: "#f0f0f0",
              caretColor: "#dc143c",
              fontFamily: "'Inter', 'Segoe UI Variable', sans-serif",
              letterSpacing: "0.01em",
              maxHeight: 160,
              minHeight: 24,
            }}
          />

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 flex-shrink-0 pb-0.5">
            {/* Voice button */}
            {isVoiceSupported && (
              <div className="relative">
                {/* Pulse ring when active */}
                {isVoiceActive && (
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "rgba(220,20,60,0.3)",
                      animation: "pulse-ring 1.2s ease-out infinite",
                    }}
                  />
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleVoiceClick}
                  className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={
                    isVoiceActive
                      ? {
                          background: "rgba(220,20,60,0.25)",
                          border: "1px solid rgba(220,20,60,0.5)",
                          boxShadow: "0 0 12px rgba(220,20,60,0.4)",
                          color: "#dc143c",
                        }
                      : {
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          color: "rgba(255,255,255,0.5)",
                        }
                  }
                >
                  {voiceState === "speaking" ? (
                    <Square size={14} />
                  ) : voiceState === "listening" ? (
                    <MicOff size={14} />
                  ) : (
                    <Mic size={14} />
                  )}
                </motion.button>
              </div>
            )}

            {/* Send button */}
            <motion.button
              whileHover={canSend ? { scale: 1.05 } : {}}
              whileTap={canSend ? { scale: 0.92 } : {}}
              onClick={handleSend}
              disabled={!canSend}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={
                canSend
                  ? {
                      background:
                        "linear-gradient(135deg, #dc143c 0%, #8b0000 100%)",
                      border: "1px solid rgba(220,20,60,0.4)",
                      boxShadow: "0 0 16px rgba(220,20,60,0.4)",
                      color: "#fff",
                    }
                  : {
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.2)",
                    }
              }
            >
              {isLoading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Send size={14} />
              )}
            </motion.button>
          </div>
        </div>

        {/* Bottom hint */}
        <div
          className="flex items-center justify-between px-4 pb-2"
          style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px", letterSpacing: "0.04em" }}
        >
          <span>Press Enter to send · Shift+Enter for new line</span>
          <span style={{ color: "rgba(220,20,60,0.4)" }}>GROQ · llama-3.3-70b</span>
        </div>
      </motion.div>
    </div>
  );
}
