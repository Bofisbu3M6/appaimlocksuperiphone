import { useState, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import type { KeyInfo } from "@/lib/keys";

interface StatsPageProps {
  setToast: (msg: string | null) => void;
  keyInfo?: KeyInfo;
}

export default function StatsPage({ setToast, keyInfo }: StatsPageProps) {
  const [stats, setStats] = useState([
    { label: "FPS Counter", value: 59, unit: "", min: 58, max: 72, avg: 65, color: "#00ff88" },
    { label: "CPU Usage", value: 44, unit: "%", min: 33, max: 51, avg: 44, color: "#ffff00" },
    { label: "RAM Usage", value: 60, unit: "%", min: 53, max: 68, avg: 58, color: "#00e5ff" },
    { label: "Temperature", value: 51, unit: "°", min: 47, max: 57, avg: 52, color: "#ff4444" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => ({
        ...stat,
        value: Math.round(Math.max(stat.min, Math.min(stat.max, stat.value + (Math.random() - 0.5) * 4))),
      })));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-3 pb-4">
      <AppHeader keyInfo={keyInfo} />

      <div className="mx-1 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-black tracking-widest text-white" style={{ fontFamily: "monospace" }}>LIVE STATS</div>
            <div className="text-xs text-gray-500">Thống kê thời gian thực</div>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,255,255,0.1)", border: "2px solid rgba(0,255,255,0.2)" }}>
            <div className="w-3 h-3 rounded-full" style={{ background: "#00ffff", boxShadow: "0 0 8px #00ffff" }} />
          </div>
        </div>
      </div>

      <div className="space-y-3 mx-1">
        {stats.map((stat, i) => {
          const pct = (stat.value - stat.min) / (stat.max - stat.min);
          const segments = 18;
          const filled = Math.round(pct * segments);
          return (
            <div key={i} className="card-dark p-4" style={{ borderColor: `${stat.color}22` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-300">{stat.label}</span>
                <span className="text-2xl font-black" style={{ color: stat.color, textShadow: `0 0 10px ${stat.color}66` }}>
                  {stat.value}{stat.unit}
                </span>
              </div>
              <div className="flex gap-0.5 h-3 mb-2">
                {Array.from({ length: segments }).map((_, j) => (
                  <div key={j} className="flex-1 rounded-sm transition-all"
                    style={{ background: j < filled ? stat.color : "rgba(255,255,255,0.06)", boxShadow: j < filled ? `0 0 4px ${stat.color}66` : "none" }} />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-gray-600">
                <span>Min: {stat.min}{stat.unit}</span>
                <span>Avg: {stat.avg}{stat.unit}</span>
                <span>Max: {stat.max}{stat.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-1 mt-3 toast-bar text-center text-xs">🔬 Deep Analytics enabled</div>
    </div>
  );
}
