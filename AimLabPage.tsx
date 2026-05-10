import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import type { KeyInfo } from "@/lib/keys";

interface AimLabPageProps {
  setToast: (msg: string | null) => void;
  keyInfo?: KeyInfo;
}

type AimVersion = "v1" | "v2" | "v3" | "v4";
type SmoothType = "Chắc tay" | "Cân bằng" | "Siêu mượt";
type SensProfile = "Cân bằng" | "Sniper" | "Rush" | "Pro";
type FingerLayout = "2 Ngón" | "3 Ngón" | "4 Ngón";

const lockVersions: Record<AimVersion, { label: string; sub: string; radius: string; speed: string; priority: string }> = {
  v1: { label: "v1", sub: "Nhẹ", radius: "30px", speed: "Chậm", priority: "Ngực" },
  v2: { label: "v2", sub: "Vừa", radius: "45px", speed: "Bình thường", priority: "Ngực" },
  v3: { label: "v3", sub: "Mạnh", radius: "55px", speed: "Nhanh", priority: "Đầu" },
  v4: { label: "v4", sub: "MAX", radius: "55px", speed: "Nhanh", priority: "Đầu (MAX)" },
};

export default function AimLabPage({ setToast, keyInfo }: AimLabPageProps) {
  const isVipOrAdmin = keyInfo?.type === "vip" || keyInfo?.type === "admin";

  const [aimVersion, setAimVersion] = useState<AimVersion>("v4");
  const [smoothValue, setSmoothValue] = useState(60);
  const [smoothType, setSmoothType] = useState<SmoothType>("Cân bằng");
  const [aimAssist, setAimAssist] = useState(true);
  const [assistRange, setAssistRange] = useState("Thấp");
  const [assistPriority, setAssistPriority] = useState("Ngực");
  const [assistActivate, setAssistActivate] = useState("ADS");
  const [aimHold, setAimHold] = useState(true);
  const [holdStrength, setHoldStrength] = useState(70);
  const [gyroscope, setGyroscope] = useState(false);
  const [latency] = useState(12);
  const [multiTouch, setMultiTouch] = useState(true);
  const [filterTouch, setFilterTouch] = useState(true);
  const [boostTouch, setBoostTouch] = useState(false);
  const [sensProfile, setSensProfile] = useState<SensProfile>("Cân bằng");
  const [totalSens, setTotalSens] = useState(100);
  const [adsSens, setAdsSens] = useState(80);
  const [fingerLayout, setFingerLayout] = useState<FingerLayout>("4 Ngón");

  const aimScore = aimVersion === "v4" ? 71 : aimVersion === "v3" ? 58 : aimVersion === "v2" ? 45 : 32;

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button onClick={() => onChange(!value)} className="relative flex-shrink-0" style={{ width: 48, height: 26 }}>
      <div className="w-full h-full rounded-full transition-all" style={{
        background: value ? "linear-gradient(90deg, #00b8d4, #00e5ff)" : "rgba(255,255,255,0.1)",
        border: `1px solid ${value ? "#00e5ff" : "rgba(255,255,255,0.15)"}`,
        boxShadow: value ? "0 0 10px #00e5ff66" : "none",
      }} />
      <div className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow" style={{ left: value ? "calc(100% - 18px)" : "3px" }} />
    </button>
  );

  const SegButton = ({ options, value, onChange }: { options: string[]; value: string; onChange: (v: any) => void }) => (
    <div className="flex gap-1">
      {options.map(opt => (
        <button key={opt} onClick={() => onChange(opt)}
          className="flex-1 py-1 px-2 rounded text-xs font-bold transition-all"
          style={{
            background: value === opt ? "rgba(0,255,255,0.15)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${value === opt ? "rgba(0,255,255,0.5)" : "rgba(255,255,255,0.08)"}`,
            color: value === opt ? "#00ffff" : "#888",
          }}>{opt}</button>
      ))}
    </div>
  );

  const handleLockedFeature = () => {
    setToast("Tính năng này yêu cầu VIP hoặc ADMIN key!");
  };

  return (
    <div className="px-3 pb-4">
      <AppHeader keyInfo={keyInfo} />

      <div className="mx-1 mb-4">
        <div className="text-2xl font-black tracking-widest neon-cyan" style={{ fontFamily: "monospace" }}>AIM LAB</div>
        <div className="text-xs text-gray-500">Hỗ trợ kéo tâm Free Fire</div>
      </div>

      {/* Current Config Banner */}
      <div className="mx-1 mb-4 card-dark-pink p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border-2 flex items-center justify-center" style={{ borderColor: "#ff00aa", background: "rgba(255,0,170,0.1)" }}>
            <span className="text-xl text-pink-400">+</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: "0 0 6px #00ff88" }} />
              <span className="text-xs text-green-400 font-bold">OPTIMIZED</span>
            </div>
            <div className="font-black text-white">AimLock {aimVersion.toUpperCase()} — {lockVersions[aimVersion].sub}</div>
            <div className="text-xs text-gray-400">AIM SCORE <span className="text-pink-400 font-bold ml-1">{aimScore}</span></div>
          </div>
        </div>
        <button onClick={() => setToast(`AimLock ${aimVersion.toUpperCase()} đã áp dụng! Score: ${aimScore}`)}
          className="btn-pink px-4 py-2 rounded-lg text-sm font-black tracking-wider">APPLY</button>
      </div>

      {/* Aim Lock */}
      <div className="mx-1 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span>🔒</span>
          <span className="font-bold text-gray-300">Aim Lock — Khoá tâm</span>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {(["v1","v2","v3","v4"] as AimVersion[]).map(v => (
            <button key={v} onClick={() => setAimVersion(v)}
              className="p-3 rounded-xl transition-all text-center"
              style={{
                background: aimVersion === v ? "rgba(0,255,255,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${aimVersion === v ? "rgba(0,255,255,0.6)" : "rgba(255,255,255,0.08)"}`,
                boxShadow: aimVersion === v ? "0 0 12px rgba(0,255,255,0.3)" : "none",
              }}>
              <div className="font-black text-base" style={{ color: aimVersion === v ? "#00ffff" : "#fff" }}>{lockVersions[v].label}</div>
              <div className="text-[10px]" style={{ color: aimVersion === v ? "#00ffff" : "#666" }}>{lockVersions[v].sub}</div>
            </button>
          ))}
        </div>
        <div className="card-dark p-3 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Vị khóa (Lock radius)</span><span className="text-cyan-400 font-bold">{lockVersions[aimVersion].radius}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Độ bắm (Track speed)</span><span className="text-cyan-400 font-bold">{lockVersions[aimVersion].speed}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Ưu tiên (Priority)</span><span className="text-cyan-400 font-bold">{lockVersions[aimVersion].priority}</span></div>
        </div>
      </div>

      {/* Smooth Aim */}
      <div className="mx-1 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span>🍃</span>
          <span className="font-bold text-gray-300">Nhẹ tâm — Smooth Aim</span>
        </div>
        <div className="card-dark p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">Cứng</span>
            <span className="text-lg font-black text-cyan-400">{smoothValue}%</span>
            <span className="text-xs text-gray-500">Mượt</span>
          </div>
          <div className="relative mb-3">
            <div className="h-2 rounded-full" style={{ background: "linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcb77, #4ecdc4, #00b4d8)" }} />
            <div className="absolute top-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-cyan-400 cursor-pointer"
              style={{ left: `${smoothValue}%`, transform: `translateX(-50%) translateY(-50%)`, boxShadow: "0 0 8px #00ffff" }} />
            <input type="range" min={0} max={100} value={smoothValue} onChange={e => setSmoothValue(+e.target.value)}
              className="absolute inset-0 w-full opacity-0 cursor-pointer" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["Chắc tay","Cân bằng","Siêu mượt"] as SmoothType[]).map(t => (
              <button key={t} onClick={() => { setSmoothType(t); setSmoothValue(t === "Chắc tay" ? 20 : t === "Cân bằng" ? 60 : 90); }}
                className="py-2 rounded-lg text-xs font-bold transition-all"
                style={{
                  background: smoothType === t ? "rgba(0,255,255,0.15)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${smoothType === t ? "rgba(0,255,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                  color: smoothType === t ? "#00ffff" : "#888",
                }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Aim Assist */}
      <div className="mx-1 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span>🍃</span>
            <span className="font-bold text-gray-300">Aim Assist — Hỗ trợ ngắm</span>
          </div>
          {!isVipOrAdmin && <span className="text-[10px] text-orange-400 font-bold border border-orange-400/30 px-2 py-0.5 rounded-full">VIP</span>}
        </div>
        <div className={`card-dark p-4 space-y-3 ${!isVipOrAdmin ? "opacity-60" : ""}`} onClick={!isVipOrAdmin ? handleLockedFeature : undefined}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-white">Aim Assist</div>
              <div className="text-xs text-gray-500">Hỗ trợ kéo tâm tự nhiên khi ngắm</div>
            </div>
            <Toggle value={aimAssist} onChange={isVipOrAdmin ? setAimAssist : () => handleLockedFeature()} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Phạm vi hỗ trợ</span>
            <SegButton options={["Thấp","Trung","Cao"]} value={assistRange} onChange={isVipOrAdmin ? setAssistRange : () => handleLockedFeature()} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Ưu tiên mục tiêu</span>
            <SegButton options={["Đầu","Ngực","Auto"]} value={assistPriority} onChange={isVipOrAdmin ? setAssistPriority : () => handleLockedFeature()} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Kích hoạt khi</span>
            <SegButton options={["ADS","Luôn","Scope"]} value={assistActivate} onChange={isVipOrAdmin ? setAssistActivate : () => handleLockedFeature()} />
          </div>
        </div>
      </div>

      {/* Aim Hold */}
      <div className="mx-1 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span>🍃</span>
          <span className="font-bold text-gray-300">Aim Hold — Giữ tâm</span>
        </div>
        <div className="card-dark p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-white">Aim Hold Mode</div>
              <div className="text-xs text-gray-500">Giữ tâm ổn định khi bắn liên tục</div>
            </div>
            <Toggle value={aimHold} onChange={setAimHold} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Độ giữ (Hold strength)</span>
            <span className="text-cyan-400 font-bold">{holdStrength}</span>
          </div>
          <div className="relative">
            <div className="h-2 rounded-full" style={{ background: "rgba(0,255,255,0.1)" }}>
              <div className="h-full rounded-full" style={{ width: `${holdStrength}%`, background: "linear-gradient(90deg, #00b8d4, #00e5ff)" }} />
            </div>
            <div className="absolute top-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-cyan-400 cursor-pointer"
              style={{ left: `${holdStrength}%`, transform: `translateX(-50%) translateY(-50%)`, boxShadow: "0 0 8px #00ffff" }} />
            <input type="range" min={0} max={100} value={holdStrength} onChange={e => setHoldStrength(+e.target.value)}
              className="absolute inset-0 w-full opacity-0 cursor-pointer" />
          </div>
          <SegButton options={["Nắn giữ","Bắt Tắt","Tự động"]} value="Nắn giữ" onChange={() => {}} />
        </div>
      </div>

      {/* Sensitivity */}
      <div className="mx-1 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span>≡</span>
          <span className="font-bold text-gray-300">Nhạy — Sensitivity Tuning</span>
        </div>
        <div className="card-dark p-4 space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {(["Cân bằng","Sniper","Rush","Pro"] as SensProfile[]).map(p => (
              <button key={p} onClick={() => setSensProfile(p)}
                className="p-2 rounded-xl text-center transition-all"
                style={{
                  background: sensProfile === p ? "rgba(0,255,255,0.15)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${sensProfile === p ? "rgba(0,255,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                }}>
                <div className="text-lg mb-1">{p === "Cân bằng" ? "⚖️" : p === "Sniper" ? "🎯" : p === "Rush" ? "⚡" : "👑"}</div>
                <div className="text-[10px] font-bold" style={{ color: sensProfile === p ? "#00ffff" : "#fff" }}>{p}</div>
              </button>
            ))}
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1"><span className="text-gray-400">Tổng quát</span><span className="text-cyan-400 font-bold">{totalSens}</span></div>
            <div className="relative h-2 rounded-full" style={{ background: "rgba(0,255,255,0.1)" }}>
              <div className="h-full rounded-full" style={{ width: `${Math.min(totalSens, 200) / 2}%`, background: "linear-gradient(90deg, #00b8d4, #00e5ff)" }} />
              <input type="range" min={0} max={200} value={totalSens} onChange={e => setTotalSens(+e.target.value)}
                className="absolute inset-0 w-full opacity-0 cursor-pointer" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1"><span className="text-gray-400">ADS</span><span className="text-cyan-400 font-bold">{adsSens}</span></div>
            <div className="relative h-2 rounded-full" style={{ background: "rgba(0,255,255,0.1)" }}>
              <div className="h-full rounded-full" style={{ width: `${Math.min(adsSens, 200) / 2}%`, background: "linear-gradient(90deg, #00b8d4, #00e5ff)" }} />
              <input type="range" min={0} max={200} value={adsSens} onChange={e => setAdsSens(+e.target.value)}
                className="absolute inset-0 w-full opacity-0 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Gyroscope */}
      <div className="mx-1 mb-4">
        <div className="flex items-center gap-2 mb-3"><span>🔄</span><span className="font-bold text-gray-300">Gyroscope — Con quay hồi chuyển</span></div>
        <div className="card-dark p-4 flex items-center justify-between">
          <div>
            <div className="font-bold text-white">Bật Gyroscope Aim</div>
            <div className="text-xs text-gray-500">Nghiêng máy để kéo tâm</div>
          </div>
          <Toggle value={gyroscope} onChange={setGyroscope} />
        </div>
      </div>

      {/* Touch Latency */}
      <div className="mx-1 mb-4">
        <div className="flex items-center gap-2 mb-3"><span>⚡</span><span className="font-bold text-gray-300">Touch Latency — Giảm lag chạm</span></div>
        <div className="card-dark p-4 space-y-3">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 64 64" className="w-16 h-16">
                <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(0,255,136,0.15)" strokeWidth="6" />
                <circle cx="32" cy="32" r="26" fill="none" stroke="#00ff88" strokeWidth="6"
                  strokeDasharray={163} strokeDashoffset={163 * 0.15} strokeLinecap="round"
                  style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-black text-green-400">{latency}ms</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="font-bold text-white">Touch Latency</div>
              <div className="text-xs text-green-400 font-semibold">TỐT — Good</div>
              <button className="mt-2 btn-cyan px-3 py-1.5 rounded-lg text-xs font-black">⚡ TỐI ƯU NGAY</button>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: "Multi-touch nhanh", value: multiTouch, onChange: setMultiTouch },
              { label: "Lọc chạm nhám", value: filterTouch, onChange: setFilterTouch },
              { label: "Tăng tốc điểm chạm", value: boostTouch, onChange: setBoostTouch },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-gray-300">{item.label}</span>
                <Toggle value={item.value} onChange={item.onChange} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Layout Ngón Tay */}
      <div className="mx-1 mb-4">
        <div className="flex items-center gap-2 mb-3"><span>🤚</span><span className="font-bold text-gray-300">Layout Ngón Tay</span></div>
        <div className="grid grid-cols-3 gap-2">
          {(["2 Ngón","3 Ngón","4 Ngón"] as FingerLayout[]).map(layout => (
            <button key={layout} onClick={() => setFingerLayout(layout)}
              className="p-3 rounded-xl text-center transition-all"
              style={{
                background: fingerLayout === layout ? "rgba(0,255,255,0.1)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${fingerLayout === layout ? "rgba(0,255,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                boxShadow: fingerLayout === layout ? "0 0 12px rgba(0,255,255,0.2)" : "none",
              }}>
              <div className="flex justify-center gap-0.5 mb-2">
                {Array.from({ length: parseInt(layout) }).map((_, i) => (
                  <div key={i} className="rounded-full" style={{
                    width: 6, height: i % 2 === 0 ? 20 : 28,
                    background: fingerLayout === layout ? "#00ffff" : "#ff00aa",
                    boxShadow: fingerLayout === layout ? "0 0 6px #00ffff" : "0 0 4px #ff00aa",
                  }} />
                ))}
              </div>
              <div className="text-xs font-bold" style={{ color: fingerLayout === layout ? "#00ffff" : "#fff" }}>{layout}</div>
              <div className="text-[9px] text-gray-500">{layout === "2 Ngón" ? "Người mới" : layout === "3 Ngón" ? "Phổ biến" : "Pro aim"}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-1 toast-bar text-center text-xs">💀 Head Lock Lv5 — 97%</div>
    </div>
  );
}
