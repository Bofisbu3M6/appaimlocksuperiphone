import AppHeader from "@/components/AppHeader";
import { useState } from "react";
import type { KeyInfo } from "@/lib/keys";

interface AdminPageProps {
  onLogout?: () => void;
  keyInfo?: KeyInfo;
}

const mockKeys = [
  { key: "VIP-SPERNEW-2028", type: "VIP", device: "iPhone 14 Pro", expiry: "2028-12-21", active: true },
  { key: "VIP-FREE-2026", type: "VIP", device: "Samsung S23", expiry: "2026-06-30", active: true },
  { key: "NORMAL-SPERNEW-001", type: "NORMAL", device: "Xiaomi 13", expiry: "2026-12-31", active: true },
  { key: "FREE-TRIAL-7", type: "NORMAL", device: "OPPO Reno", expiry: "2026-05-17", active: false },
];

export default function AdminPage({ onLogout, keyInfo }: AdminPageProps) {
  const [vipKey, setVipKey] = useState("");
  const [newKeyType, setNewKeyType] = useState<"vip" | "normal">("vip");
  const [newKeyDays, setNewKeyDays] = useState("30");
  const [generatedKey, setGeneratedKey] = useState("");
  const [toast, setToast] = useState("");

  const adminInfo: KeyInfo = keyInfo ?? { type: "admin", expiry: null, daysLeft: null, label: "Admin" };

  const generateKey = () => {
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    const prefix = newKeyType === "vip" ? "VIP" : "NORMAL";
    const key = `${prefix}-SPERNEW-${rand}`;
    setGeneratedKey(key);
    setToast(`Key đã tạo: ${key} (${newKeyDays} ngày)`);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="px-3 pb-4">
      <AppHeader keyInfo={adminInfo} />

      {/* Admin badge */}
      <div className="mx-1 mb-4 p-3 rounded-xl flex items-center gap-3"
        style={{ background: "rgba(255,0,170,0.08)", border: "1px solid rgba(255,0,170,0.3)" }}>
        <span className="text-2xl">🛡️</span>
        <div>
          <div className="font-black" style={{ color: "#ff00aa" }}>ADMIN PANEL</div>
          <div className="text-xs text-gray-500">KEY: KEYNGUYENLONGIOSVIP20012026</div>
        </div>
      </div>

      {toast && (
        <div className="mx-1 mb-3 p-3 rounded-xl text-xs font-bold text-green-400 text-center"
          style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)" }}>
          ✅ {toast}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mx-1 mb-4">
        {[
          { label: "Users", value: "1,247", icon: "👥", color: "#00ffff" },
          { label: "VIP", value: "312", icon: "👑", color: "#ffa500" },
          { label: "Online", value: "89", icon: "🟢", color: "#00ff88" },
        ].map(stat => (
          <div key={stat.label} className="card-dark p-3 text-center">
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className="text-xl font-black" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[10px] text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Generate Key */}
      <div className="mx-1 mb-4">
        <div className="text-[10px] text-gray-500 font-semibold tracking-widest mb-3">TẠO KEY MỚI</div>
        <div className="card-dark p-4 space-y-3">
          <div className="flex gap-2">
            {(["vip","normal"] as const).map(t => (
              <button key={t} onClick={() => setNewKeyType(t)}
                className="flex-1 py-2 rounded-lg text-xs font-black transition-all"
                style={{
                  background: newKeyType === t ? (t === "vip" ? "rgba(255,165,0,0.2)" : "rgba(0,255,255,0.15)") : "rgba(255,255,255,0.04)",
                  border: `1px solid ${newKeyType === t ? (t === "vip" ? "rgba(255,165,0,0.5)" : "rgba(0,255,255,0.5)") : "rgba(255,255,255,0.08)"}`,
                  color: newKeyType === t ? (t === "vip" ? "#ffa500" : "#00ffff") : "#666",
                }}>
                {t === "vip" ? "👑 VIP" : "🔑 NORMAL"}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-xs text-gray-400 whitespace-nowrap">Số ngày:</span>
            <input type="number" value={newKeyDays} onChange={e => setNewKeyDays(e.target.value)} min="1" max="3650"
              className="flex-1 bg-black/30 border border-cyan-900 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-500" />
          </div>
          <button onClick={generateKey}
            className="w-full py-2.5 rounded-lg font-black text-sm tracking-wider"
            style={{ background: "linear-gradient(135deg, #ff00aa, #cc0088)", color: "white", boxShadow: "0 0 15px rgba(255,0,170,0.3)" }}>
            🛡️ TẠO KEY
          </button>
          {generatedKey && (
            <div className="p-3 rounded-lg text-center"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px dashed rgba(0,255,255,0.3)" }}>
              <div className="text-xs text-gray-500 mb-1">Key vừa tạo:</div>
              <div className="font-black text-cyan-400 tracking-wider text-sm">{generatedKey}</div>
            </div>
          )}
        </div>
      </div>

      {/* Activate Key */}
      <div className="mx-1 mb-4">
        <div className="text-[10px] text-gray-500 font-semibold tracking-widest mb-3">KÍCH HOẠT KEY THỦ CÔNG</div>
        <div className="card-dark p-4">
          <div className="flex gap-2">
            <input value={vipKey} onChange={e => setVipKey(e.target.value)}
              placeholder="Nhập key để kích hoạt..."
              className="flex-1 bg-black/30 border border-cyan-900 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-500" />
            <button onClick={() => { if (vipKey) { setToast(`Key ${vipKey} đã kích hoạt!`); setVipKey(""); } }}
              className="btn-cyan px-4 py-2 rounded-lg text-xs font-black">KÍCH HOẠT</button>
          </div>
        </div>
      </div>

      {/* Key List */}
      <div className="mx-1 mb-4">
        <div className="text-[10px] text-gray-500 font-semibold tracking-widest mb-3">DANH SÁCH KEY ({mockKeys.length})</div>
        <div className="space-y-2">
          {mockKeys.map((item, i) => (
            <div key={i} className="card-dark p-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black" style={{ color: item.type === "VIP" ? "#ffa500" : "#00ffff" }}>{item.type}</span>
                  <span className="text-sm font-bold text-white">{item.key}</span>
                </div>
                <div className="text-xs text-gray-500">{item.device}</div>
                <div className="text-xs text-orange-400">Hết hạn: {item.expiry}</div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: item.active ? "#00ff88" : "#ff4444", boxShadow: item.active ? "0 0 6px #00ff88" : "none" }} />
                <span className="text-xs" style={{ color: item.active ? "#00ff88" : "#ff4444" }}>{item.active ? "ON" : "OFF"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="mx-1">
        <button onClick={onLogout}
          className="w-full p-3 rounded-xl font-bold text-sm text-red-400 transition-all"
          style={{ background: "rgba(255,68,68,0.08)", border: "1px solid rgba(255,68,68,0.2)" }}>
          🚪 Đăng xuất / Đổi Key
        </button>
      </div>
    </div>
  );
}
