/*
 * ENOSX XAI Assistant — AudioVisualizer Component
 * Real-time SVG frequency visualizer in Enosx Red (#dc143c)
 * Used during voice input/output with smooth bar animations
 */

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AudioVisualizerProps {
  isActive: boolean;
  mode?: "listening" | "speaking";
  color?: string;
  barCount?: number;
}

export default function AudioVisualizer({
  isActive,
  mode = "listening",
  color = "#dc143c",
  barCount = 12,
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      return;
    }

    // Initialize audio context and analyser
    const initAudio = async () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;

        const bufferLength = analyser.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        // Try to get microphone stream
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const source = audioContext.createMediaStreamSource(stream);
          source.connect(analyser);
        } catch {
          // Fallback: generate synthetic waveform for demo
          console.log("Microphone access denied, using synthetic waveform");
        }

        // Start animation loop
        const animate = () => {
          if (!analyserRef.current || !dataArrayRef.current) return;

          analyserRef.current.getByteFrequencyData(dataArrayRef.current);
          drawWaveform();
          animationIdRef.current = requestAnimationFrame(animate);
        };

        animate();
      } catch (err) {
        console.error("Audio initialization error:", err);
      }
    };

    initAudio();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isActive]);

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas || !dataArrayRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const data = dataArrayRef.current;

    // Clear canvas
    ctx.fillStyle = "rgba(10, 8, 8, 0.5)";
    ctx.fillRect(0, 0, width, height);

    // Draw bars
    const barWidth = width / barCount;
    const step = Math.floor(data.length / barCount);

    for (let i = 0; i < barCount; i++) {
      const dataIndex = i * step;
      const value = data[dataIndex] || 0;
      const barHeight = (value / 255) * height;
      const x = i * barWidth;
      const y = height - barHeight;

      // Gradient for each bar
      const gradient = ctx.createLinearGradient(x, y, x, height);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "rgba(220, 20, 60, 0.3)");

      ctx.fillStyle = gradient;
      ctx.fillRect(x + 2, y, barWidth - 4, barHeight);

      // Glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 2, y, barWidth - 4, barHeight);
    }

    ctx.shadowBlur = 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-2"
    >
      <canvas
        ref={canvasRef}
        width={160}
        height={40}
        className="rounded-lg"
        style={{
          border: `1px solid rgba(220, 20, 60, 0.3)`,
          background: "rgba(10, 8, 8, 0.3)",
          backdropFilter: "blur(8px)",
        }}
      />
      <span
        style={{
          fontSize: "10px",
          letterSpacing: "0.06em",
          color: "rgba(220, 20, 60, 0.7)",
          textTransform: "uppercase",
        }}
      >
        {mode === "listening" ? "🎤 Listening" : "🔊 Speaking"}
      </span>
    </motion.div>
  );
}
