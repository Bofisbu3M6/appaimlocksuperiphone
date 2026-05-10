import { useState, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import SegmentBar from "@/components/SegmentBar";
import type { KeyInfo } from "@/lib/keys";

interface HomePageProps {
  setToast: (msg: string | null) => void;
  keyInfo?: KeyInfo;
}

function CircularProgress({ value, size = 90 }: { value: number; size?: number }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(0,255,255,0.1)" strokeWidth={8} />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke="url(#homeGrad)" strokeWidth={8}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round" />
      <defs>
        <linearGradient id="homeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffff00" />
          <stop offset="100%" stopColor="#00ffff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function HomePage({ setToast, keyInfo }: HomePageProps) {
  const [fps, setFps] = useState(61);
  const [cpu, setCpu] = useState(31);
  const [ram, setRam] = useState(8);
  const [temp, setTemp] = useState(47);
  const [score, setScore] = useState(73);
  const [boosting, setBoosting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFps(prev => Math.max(45, Math.min(90, prev + (Math.random() - 0.5) * 3)));
      setCpu(prev => Math.max(15, Math.min(80, prev + (Math.random() - 0.5) * 3)));
      setRam(prev => Math.max(5, Math.min(25, prev + (Math.random() - 0.5) * 1)));
      setTemp(prev => Math.max(35, Math.min(75, prev + (Math.random() - 0.5) * 2)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleBoost = () => {
    setBoosting(true);
    setToast("Đang tối ưu hóa hệ thống...");
    setTimeout(() => {
      setFps(prev => Math.min(90, prev + 8));
      setCpu(prev => Math.max(15, prev - 10));
      setRam(prev => Math.max(5, prev - 3));
      setTemp(prev => Math.max(35, prev - 5));
      setScore(prev => Math.min(100, prev + 8));
      setBoosting(false);
      setToast("Tối ưu hóa hoàn tất! Hiệu suất tăng lên");
    }, 2000);
  };

  const fpsStatus = fps >= 60 ? "SMOOTH" : fps >= 45 ? "NORMAL" : "LAG";
  const cpuStatus = cpu <= 40 ? "NORMAL" : cpu <= 60 ? "MODERATE" : "HIGH";
  const tempStatus = temp <= 45 ? "COOL" : temp <= 55 ? "WARM" : "HOT";
  const fpsColor = fps >= 60 ? "#00ff88" : fps >= 45 ? "#ffff00" : "#ff4444";
  const cpuColor = cpu <= 40 ? "#00ff88" : cpu <= 60 ? "#ffff00" : "#ff4444";
  const tempColor = temp <= 45 ? "#00ff88" : temp <= 55 ? "#ffff00" : "#ff4444";

  return (
    <div className="px-3 pb-4">
      <AppHeader keyInfo={keyInfo} />

      <div className="card-dark glow-border mx-1 mb-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-xl font-black tracking-widest text-white" style={{ fontFamily: "monospace", letterSpacing: "0.1em" }}>SYSTEM</div>
            <div className="text-xl font-black tracking-widest neon-pink" style={{ fontFamily: "monospace", letterSpacing: "0.1em" }}>OPTIMIZER</div>
            <div className="text-xs text-gray-400 mt-1">AI-Powered · Tối ưu hóa thông minh theo thời gian thực</div>
          </div>
          <button onClick={handleBoost} className="boost-btn" disabled={boosting}>
            <span className="text-2xl" style={{ filter: "drop-shadow(0 0 8px #00ffff)" }}>⚡</span>
            <span className="text-[9px] font-black text-[#0a0f1e] tracking-wide mt-0.5">{boosting ? "..." : "BOOST"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mx-1 mb-4">
        <div className="card-dark p-3">
          <div className="text-[10px] text-gray-500 font-semibold tracking-widest mb-1">FPS</div>
          <div className="text-3xl font-black" style={{ color: fpsColor, textShadow: `0 0 10px ${fpsColor}66` }}>{Math.round(fps)}</div>
          <div className="mt-2"><SegmentBar value={fps} max={90} color={fpsColor} /></div>
          <div className="text-[10px] mt-1" style={{ color: fpsColor }}>{fpsStatus}</div>
        </div>
        <div className="card-dark p-3">
          <div className="text-[10px] text-gray-500 font-semibold tracking-widest mb-1">CPU</div>
          <div className="text-3xl font-black" style={{ color: cpuColor, textShadow: `0 0 10px ${cpuColor}66` }}>{Math.round(cpu)}<span className="text-sm">%</span></div>
          <div className="mt-2"><SegmentBar value={cpu} max={100} color={cpuColor} /></div>
          <div className="text-[10px] mt-1" style={{ color: cpuColor }}>{cpuStatus}</div>
        </div>
        <div className="card-dark p-3">
          <div className="text-[10px] text-gray-500 font-semibold tracking-widest mb-1">RAM</div>
          <div className="text-3xl font-black text-cyan-400" style={{ textShadow: "0 0 10px #00ffff66" }}>{Math.round(ram)}<span className="text-sm">%</span></div>
          <div className="mt-2"><SegmentBar value={ram} max={100} color="#00e5ff" /></div>
          <div className="text-[10px] mt-1 text-cyan-400">FREE</div>
        </div>
        <div className="card-dark p-3">
          <div className="text-[10px] text-gray-500 font-semibold tracking-widest mb-1">TEMP</div>
          <div className="text-3xl font-black" style={{ color: tempColor, textShadow: `0 0 10px ${tempColor}66` }}>{Math.round(temp)}<span className="text-sm">°</span></div>
          <div className="mt-2"><SegmentBar value={temp} max={100} color={tempColor} /></div>
          <div className="text-[10px] mt-1" style={{ color: tempColor }}>{tempStatus}</div>
        </div>
      </div>

      <div className="card-dark glow-border mx-1 mb-4 p-4">
        <div className="text-[10px] text-gray-500 font-semibold tracking-widest mb-3">PERFORMANCE SCORE</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-5xl font-black" style={{ color: "#ffff00", textShadow: "0 0 20px #ffff0066", fontFamily: "monospace" }}>{score}</div>
            <div className="text-xs text-gray-400 mt-1">{score >= 80 ? "EXCELLENT" : score >= 60 ? "GOOD" : "NEEDS BOOST"}</div>
          </div>
          <div className="relative flex items-center justify-center">
            <CircularProgress value={score} />
            <div className="absolute text-xs font-bold text-yellow-400">{score}%</div>
          </div>
        </div>
      </div>

      <div className="mx-1">
        <div className="text-[10px] text-gray-500 font-semibold tracking-widest mb-3">QUICK ACTIONS / HÀNH ĐỘNG NHANH</div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "🗑️", label: "Clear RAM", action: () => { setRam(5); setToast("RAM đã được dọn sạch!"); } },
            { icon: "❄️", label: "Cool Down", action: () => { setTemp(prev => Math.max(35, prev - 8)); setToast("Làm mát hệ thống thành công!"); } },
            { icon: "⚡", label: "FPS Boost", action: () => { setFps(prev => Math.min(90, prev + 10)); setToast("FPS đã được tăng cường!"); } },
            { icon: "📶", label: "Net Fix", action: () => setToast("Mạng đã được tối ưu hóa!") },
          ].map((item) => (
            <button key={item.label} onClick={item.action}
              className="card-dark p-3 flex flex-col items-center gap-1 hover:border-cyan-400/40 transition-all active:scale-95">
              <span className="text-xl">{item.icon}</span>
              <span className="text-[9px] text-gray-400 text-center leading-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
