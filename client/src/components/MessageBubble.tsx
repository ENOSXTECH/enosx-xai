/*
 * ENOSX XAI Assistant — MessageBubble Component
 * Design: Bento Grid style cards, soft-edged, AI cards with faint red gradient
 * User messages: right-aligned, glass surface
 * AI messages: left-aligned, crimson-to-transparent gradient background
 * Markdown: prose-crimson class for styled AI responses
 */

import { motion } from "framer-motion";
import { Streamdown } from "streamdown";
import { Message } from "@/lib/types";
import { User, Volume2, VolumeX, Copy, Check } from "lucide-react";
import { useState } from "react";

const AI_AVATAR_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663581012760/3KsVJNzTNHX32FLQf9aZCC/enosx-ai-avatar-9QACGUonJdqDjRkBMmWX52.webp";

interface MessageBubbleProps {
  message: Message;
  onSpeak?: (text: string) => void;
  onStopSpeak?: () => void;
  isSpeaking?: boolean;
  index: number;
}

export default function MessageBubble({
  message,
  onSpeak,
  onStopSpeak,
  isSpeaking,
  index,
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 28,
        delay: Math.min(index * 0.02, 0.15),
      }}
      className={`flex gap-3 group ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mt-1">
        {isUser ? (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <User size={14} style={{ color: "rgba(255,255,255,0.6)" }} />
          </div>
        ) : (
          <div
            className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
            style={{
              border: "1px solid rgba(220,20,60,0.35)",
              boxShadow: "0 0 14px rgba(220,20,60,0.25)",
            }}
          >
            <img
              src={AI_AVATAR_URL}
              alt="ENOSX XAI"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Message Content */}
      <div
        className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}
        style={{ maxWidth: "78%" }}
      >
        {/* Role label + time */}
        <div
          className="flex items-center gap-1.5 px-1"
          style={{ color: "rgba(255,255,255,0.28)", fontSize: "10.5px", letterSpacing: "0.05em" }}
        >
          {!isUser && (
            <>
              <span
                className="font-semibold"
                style={{ color: "rgba(220,20,60,0.65)", letterSpacing: "0.08em" }}
              >
                ENOSX XAI
              </span>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            </>
          )}
          <span>{formatTime(message.timestamp)}</span>
        </div>

        {/* Card */}
        <div
          className="relative text-sm leading-relaxed"
          style={
            isUser
              ? {
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "#f0f0f0",
                  borderRadius: "20px 20px 6px 20px",
                  padding: "10px 14px",
                }
              : {
                  background:
                    "linear-gradient(135deg, rgba(220,20,60,0.07) 0%, rgba(255,255,255,0.03) 55%, transparent 100%)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderLeft: "1px solid rgba(220,20,60,0.22)",
                  color: "#f0f0f0",
                  borderRadius: "20px 20px 20px 6px",
                  padding: "12px 16px",
                }
          }
        >
          {/* Typing indicator */}
          {message.isStreaming && message.content === "" ? (
            <div className="flex items-center gap-1.5 py-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "rgba(220,20,60,0.7)",
                    animation: `typing-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          ) : isUser ? (
            <p style={{ margin: 0, color: "#f0f0f0", lineHeight: 1.6 }}>
              {message.content}
            </p>
          ) : (
            <div className="prose-crimson">
              <Streamdown>{message.content}</Streamdown>
            </div>
          )}

          {/* Streaming cursor */}
          {message.isStreaming && message.content !== "" && (
            <span
              className="inline-block w-0.5 h-4 ml-0.5 align-middle"
              style={{
                background: "#dc143c",
                animation: "pulse 1s ease-in-out infinite",
                borderRadius: 1,
              }}
            />
          )}
        </div>

        {/* Action buttons (show on hover) */}
        {!message.isStreaming && message.content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <ActionButton onClick={handleCopy} title={copied ? "Copied!" : "Copy"}>
              {copied ? (
                <Check size={11} style={{ color: "#22c55e" }} />
              ) : (
                <Copy size={11} />
              )}
            </ActionButton>

            {!isUser && onSpeak && (
              <ActionButton
                onClick={() =>
                  isSpeaking ? onStopSpeak?.() : onSpeak(message.content)
                }
                title={isSpeaking ? "Stop speaking" : "Read aloud"}
              >
                {isSpeaking ? (
                  <VolumeX size={11} style={{ color: "#dc143c" }} />
                ) : (
                  <Volume2 size={11} />
                )}
              </ActionButton>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function ActionButton({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-150"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        color: "rgba(255,255,255,0.35)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "rgba(220,20,60,0.12)";
        (e.currentTarget as HTMLButtonElement).style.color =
          "rgba(220,20,60,0.85)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "rgba(255,255,255,0.04)";
        (e.currentTarget as HTMLButtonElement).style.color =
          "rgba(255,255,255,0.35)";
      }}
    >
      {children}
    </button>
  );
}
