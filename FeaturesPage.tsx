import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import type { KeyInfo } from "@/lib/keys";

interface Feature {
  icon: string;
  name: string;
  desc: string;
  tag?: string;
  enabled: boolean;
  requiresVip?: boolean;
}

interface FeaturesPageProps {
  setToast: (msg: string | null) => void;
  keyInfo?: KeyInfo;
}

const initialFeatures: Feature[] = [
  { icon: "⚡", name: "FPS Stabilizer", desc: "Ổn định FPS trong game", tag: "PRO", enabled: true },
  { icon: "🗑️", name: "RAM Cleaner", desc: "Dọn dẹp bộ nhớ tự động", enabled: true },
  { icon: "❄️", name: "Heat Controller", desc: "Kiểm soát nhiệt độ thiết bị", enabled: false },
  { icon: "📶", name: "Ping Optimizer", desc: "Tối ưu hóa kết nối mạng", enabled: true },
  { icon: "🌐", name: "Network Booster", desc: "Tăng tốc độ kết nối", tag: "VIP", enabled: true, requiresVip: true },
  { icon: "🔋", name: "Battery Saver", desc: "Tiết kiệm pin khi chơi game", enabled: false },
  { icon: "📱", name: "Screen Optimizer", desc: "Tối ưu màn hình cho game", tag: "VIP", enabled: false, requiresVip: true },
  { icon: "🎮", name: "Game Mode", desc: "Chế độ chơi game tối ưu", enabled: true },
  { icon: "🔊", name: "Audio Enhancer", desc: "Cải thiện âm thanh game", enabled: false },
  { icon: "💾", name: "Storage Cleaner", desc: "Xóa file rác tự động", enabled: true },
  { icon: "🛡️", name: "Anti-Lag Shield", desc: "Chống lag thời gian thực", tag: "PRO", enabled: true },
  { icon: "🔥", name: "Turbo Mode", desc: "Chế độ turbo cực mạnh", tag: "VIP", enabled: false, requiresVip: true },
];

export default function FeaturesPage({ setToast, keyInfo }: FeaturesPageProps) {
  const [features, setFeatures] = useState(initialFeatures);
  const isVipOrAdmin = keyInfo?.type === "vip" || keyInfo?.type === "admin";

  const toggleFeature = (index: number) => {
    const f = features[index];
    if (f.requiresVip && !isVipOrAdmin) {
      setToast("Tính năng VIP — Nâng cấp để sử dụng!");
      return;
    }
    const updated = [...features];
    updated[index] = { ...f, enabled: !f.enabled };
    setFeatures(updated);
    setToast(updated[index].enabled ? `${f.name} đã bật!` : `${f.name} đã tắt`);
  };

  return (
    <div className="px-3 pb-4">
      <AppHeader keyInfo={keyInfo} />
      <div className="mx-1 mb-4">
        <div className="text-2xl font-black tracking-widest text-white mb-1" style={{ fontFamily: "monospace" }}>FEATURES</div>
        <div className="text-xs text-gray-500">Quản lý tính năng tối ưu hóa</div>
      </div>

      <div className="space-y-2 mx-1">
        {features.map((feature, i) => {
          const locked = feature.requiresVip && !isVipOrAdmin;
          return (
            <div key={i} className="card-dark p-3 flex items-center gap-3"
              style={feature.enabled && !locked ? { borderColor: "rgba(0,255,255,0.25)" } : {}}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: feature.enabled && !locked ? "rgba(0,255,255,0.15)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${feature.enabled && !locked ? "rgba(0,255,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                }}>
                <span className="text-lg">{feature.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white truncate">{feature.name}</span>
                  {feature.tag && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded"
                      style={{
                        background: feature.tag === "VIP" ? "rgba(255,165,0,0.15)" : "rgba(0,255,136,0.15)",
                        color: feature.tag === "VIP" ? "#ffa500" : "#00ff88",
                        border: `1px solid ${feature.tag === "VIP" ? "rgba(255,165,0,0.3)" : "rgba(0,255,136,0.3)"}`,
                      }}>
                      {feature.tag}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 truncate">{feature.desc}</div>
              </div>
              <button onClick={() => toggleFeature(i)} className="relative flex-shrink-0" style={{ width: 44, height: 24 }}>
                <div className="w-full h-full rounded-full transition-all"
                  style={{
                    background: feature.enabled && !locked ? "linear-gradient(90deg, #00b8d4, #00e5ff)" : "rgba(255,255,255,0.1)",
                    border: `1px solid ${feature.enabled && !locked ? "#00e5ff" : "rgba(255,255,255,0.15)"}`,
                    boxShadow: feature.enabled && !locked ? "0 0 8px #00e5ff66" : "none",
                  }} />
                <div className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow"
                  style={{ left: feature.enabled && !locked ? "calc(100% - 18px)" : "2px" }} />
                {locked && <div className="absolute inset-0 flex items-center justify-center text-xs">🔒</div>}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mx-1 mt-3 toast-bar text-center text-xs">
        🌐 Network optimized — ping reduced
      </div>
    </div>
  );
}
