/*
 * ENOSX XAI Assistant — Sidebar Component
 * Design: Floating Acrylic Panel, 24px radius, Crimson Pulse active states
 * Glass surface: rgba(255,255,255,0.04) + backdrop-filter blur(20px)
 * Active items: soft red inner-glow + crimson left border
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Settings,
  Sparkles,
  Clock,
} from "lucide-react";
import { Conversation } from "@/lib/types";
import ProBadge from "./ProBadge";

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  collapsed: boolean;
  onToggle: () => void;
  isPro?: boolean;
}

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663581012760/3KsVJNzTNHX32FLQf9aZCC/enosx-logo-glow-cPEZvmMfhMoVbzpQVGQ3Ck.webp";

export default function Sidebar({
  conversations,
  activeId,
  onSelect,
  onNew,
  onDelete,
  collapsed,
  onToggle,
  isPro = false,
}: SidebarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const groupedConversations = conversations.reduce(
    (acc, conv) => {
      const now = new Date();
      const diff = now.getTime() - conv.updatedAt.getTime();
      const hours = diff / (1000 * 60 * 60);
      if (hours < 24) {
        acc.today.push(conv);
      } else if (hours < 168) {
        acc.week.push(conv);
      } else {
        acc.older.push(conv);
      }
      return acc;
    },
    { today: [] as Conversation[], week: [] as Conversation[], older: [] as Conversation[] }
  );

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative flex flex-col h-full flex-shrink-0"
      style={{
        background: "rgba(12, 8, 8, 0.85)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "0 0 0 0",
        overflow: "hidden",
      }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663581012760/3KsVJNzTNHX32FLQf9aZCC/enosx-sidebar-texture-jiJsTXX696sKUHEw36Dx5Z.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay",
        }}
      />

      {/* Header */}
      <div
        className="relative flex items-center gap-3 px-4 py-5 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="relative flex-shrink-0">
          <div className="shimmer w-8 h-8 rounded-lg overflow-hidden">
            <img
              src={LOGO_URL}
              alt="ENOSX"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
            style={{
              background: "#22c55e",
              borderColor: "#0a0a0a",
              boxShadow: "0 0 6px rgba(34,197,94,0.6)",
            }}
          />
        </div>

        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 min-w-0"
            >
              <div className="flex items-center gap-2">
                <div
                  className="font-bold text-sm tracking-tight"
                  style={{ color: "#f0f0f0", letterSpacing: "-0.02em" }}
                >
                  ENOSX XAI
                </div>
                {isPro && <ProBadge size="sm" showLabel={true} />}
              </div>
              <div
                className="text-xs"
                style={{ color: "rgba(0, 242, 255, 0.6)", letterSpacing: "0.06em" }}
              >
                ASSISTANT
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={onToggle}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md transition-all duration-200"
          style={{ color: "rgba(255,255,255,0.4)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(220,20,60,0.8)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
          }
        >
          {collapsed ? (
            <ChevronRight size={14} />
          ) : (
            <ChevronLeft size={14} />
          )}
        </button>
      </div>

      {/* New Chat Button */}
      <div className="relative px-3 py-3 flex-shrink-0">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNew}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, rgba(220,20,60,0.2) 0%, rgba(139,0,0,0.15) 100%)",
            border: "1px solid rgba(220,20,60,0.3)",
            color: "#f0f0f0",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "linear-gradient(135deg, rgba(220,20,60,0.3) 0%, rgba(139,0,0,0.25) 100%)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 16px rgba(220,20,60,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "linear-gradient(135deg, rgba(220,20,60,0.2) 0%, rgba(139,0,0,0.15) 100%)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          <Plus size={15} className="flex-shrink-0" style={{ color: "#dc143c" }} />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium truncate"
                style={{ letterSpacing: "-0.01em" }}
              >
                New Chat
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Conversations List */}
      <div className="relative flex-1 overflow-y-auto px-2 pb-4" style={{ minHeight: 0 }}>
        {conversations.length === 0 ? (
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-10 px-4 text-center"
              >
                <Sparkles size={24} style={{ color: "rgba(220,20,60,0.4)" }} className="mb-3" />
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Start a new conversation
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <>
            {groupedConversations.today.length > 0 && (
              <ConversationGroup
                label="Today"
                conversations={groupedConversations.today}
                activeId={activeId}
                hoveredId={hoveredId}
                collapsed={collapsed}
                onSelect={onSelect}
                onDelete={onDelete}
                onHover={setHoveredId}
              />
            )}
            {groupedConversations.week.length > 0 && (
              <ConversationGroup
                label="This Week"
                conversations={groupedConversations.week}
                activeId={activeId}
                hoveredId={hoveredId}
                collapsed={collapsed}
                onSelect={onSelect}
                onDelete={onDelete}
                onHover={setHoveredId}
              />
            )}
            {groupedConversations.older.length > 0 && (
              <ConversationGroup
                label="Older"
                conversations={groupedConversations.older}
                activeId={activeId}
                hoveredId={hoveredId}
                collapsed={collapsed}
                onSelect={onSelect}
                onDelete={onDelete}
                onHover={setHoveredId}
              />
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div
        className="relative px-3 py-3 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <button
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200"
          style={{ color: "rgba(255,255,255,0.4)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.05)";
            (e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.8)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.4)";
          }}
        >
          <Settings size={15} className="flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs font-medium"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}

interface ConversationGroupProps {
  label: string;
  conversations: Conversation[];
  activeId: string | null;
  hoveredId: string | null;
  collapsed: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onHover: (id: string | null) => void;
}

function ConversationGroup({
  label,
  conversations,
  activeId,
  hoveredId,
  collapsed,
  onSelect,
  onDelete,
  onHover,
}: ConversationGroupProps) {
  return (
    <div className="mb-2">
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 px-2 py-1.5 mb-1"
          >
            <Clock size={10} style={{ color: "rgba(255,255,255,0.25)" }} />
            <span
              className="text-xs font-medium uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", fontSize: "10px" }}
            >
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {conversations.map((conv) => {
        const isActive = conv.id === activeId;
        const isHovered = conv.id === hoveredId;

        return (
          <motion.div
            key={conv.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="relative group flex items-center rounded-xl mb-0.5 overflow-hidden"
            style={{
              background: isActive
                ? "rgba(220,20,60,0.12)"
                : isHovered
                ? "rgba(255,255,255,0.04)"
                : "transparent",
              borderLeft: isActive ? "2px solid rgba(220,20,60,0.7)" : "2px solid transparent",
              boxShadow: isActive
                ? "inset 0 0 20px rgba(220,20,60,0.06)"
                : "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={() => onHover(conv.id)}
            onMouseLeave={() => onHover(null)}
          >
            <button
              onClick={() => onSelect(conv.id)}
              className="flex-1 flex items-center gap-2.5 px-3 py-2.5 min-w-0 text-left"
            >
              <MessageSquare
                size={14}
                className="flex-shrink-0"
                style={{ color: isActive ? "#dc143c" : "rgba(255,255,255,0.35)" }}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs truncate"
                    style={{
                      color: isActive ? "#f0f0f0" : "rgba(255,255,255,0.6)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {conv.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {!collapsed && isHovered && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(conv.id);
                  }}
                  className="flex-shrink-0 p-1.5 mr-1 rounded-lg transition-colors duration-150"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(220,20,60,0.8)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.3)")
                  }
                >
                  <Trash2 size={12} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
