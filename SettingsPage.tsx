import AppHeader from "@/components/AppHeader";
import { useState } from "react";
import type { KeyInfo } from "@/lib/keys";

interface SettingsPageProps {
  keyInfo?: KeyInfo;
  onLogout?: () => void;
}

export default function SettingsPage({ keyInfo, onLogout }: SettingsPageProps) {
  const [notifications, setNotifications] = useState(true);
  const [autoBoost, setAutoBoost] = useState(false);
  const [language, setLanguage] = useState("Tiếng Việt");
  const [resolution, setResolution] = useState("1080p");

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

  const typeLabel = keyInfo?.type === "admin" ? "ADMIN" : keyInfo?.type === "vip" ? "VIP" : "NORMAL";
  const typeColor = keyInfo?.type === "admin" ? "#ff00aa" : keyInfo?.type === "vip" ? "#ffa500" : "#00ffff";

  return (
    <div className="px-3 pb-4">
      <AppHeader keyInfo={keyInfo} />

      <div className="mx-1 mb-4">
        <div className="text-2xl font-black tracking-widest text-white mb-1" style={{ fontFamily: "monospace" }}>SETTINGS</div>
        <div className="text-xs text-gray-500">Cấu hình ứng dụng</div>
      </div>

      {/* Account */}
      <div className="mx-1 mb-4">
        <div className="text-[10px] text-gray-500 font-semibold tracking-widest mb-3">TÀI KHOẢN</div>
        <div className="card-dark p-4 flex items-center gap-3"
          style={{ borderColor: `${typeColor}22` }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ background: `linear-gradient(135deg, ${typeColor}44, ${typeColor}11)`, border: `2px solid ${typeColor}44` }}>
            {keyInfo?.type === "admin" ? "🛡️" : keyInfo?.type === "vip" ? "👑" : "👤"}
          </div>
          <div>
            <div className="font-bold text-white">SPERNEW User</div>
            <div className="text-xs font-bold" style={{ color: typeColor }}>Gói {typeLabel}</div>
            <div className="text-xs text-gray-500 mt-0.5">
              {keyInfo?.expiry ? `Hết hạn: ${keyInfo.expiry}` : keyInfo?.type === "admin" ? "Toàn quyền · Vĩnh viễn" : `Còn ${keyInfo?.daysLeft} ngày`}
            </div>
          </div>
        </div>
      </div>

      {/* General Settings */}
      <div className="mx-1 mb-4">
        <div className="text-[10px] text-gray-500 font-semibold tracking-widest mb-3">CHUNG</div>
        <div className="card-dark divide-y" style={{ borderColor: "rgba(0,255,255,0.08)" }}>
          {[
            { label: "Thông báo", desc: "Nhận thông báo hệ thống", value: notifications, onChange: setNotifications },
            { label: "Auto Boost", desc: "Tự động tối ưu khi mở game", value: autoBoost, onChange: setAutoBoost },
          ].map(item => (
            <div key={item.label} className="p-3 flex items-center justify-between" style={{ borderColor: "rgba(0,255,255,0.08)" }}>
              <div>
                <div className="text-sm font-semibold text-white">{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
              <Toggle value={item.value} onChange={item.onChange} />
            </div>
          ))}
        </div>
      </div>

      {/* Display */}
      <div className="mx-1 mb-4">
        <div className="text-[10px] text-gray-500 font-semibold tracking-widest mb-3">HIỂN THỊ</div>
        <div className="card-dark divide-y" style={{ borderColor: "rgba(0,255,255,0.08)" }}>
          <div className="p-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Ngôn ngữ</div>
              <div className="text-xs text-gray-500">Chọn ngôn ngữ giao diện</div>
            </div>
            <select value={language} onChange={e => setLanguage(e.target.value)}
              className="bg-black/50 border border-cyan-900 rounded-lg px-2 py-1 text-xs text-cyan-400 outline-none">
              <option>Tiếng Việt</option>
              <option>English</option>
            </select>
          </div>
          <div className="p-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Độ phân giải</div>
              <div className="text-xs text-gray-500">Chất lượng hiển thị</div>
            </div>
            <select value={resolution} onChange={e => setResolution(e.target.value)}
              className="bg-black/50 border border-cyan-900 rounded-lg px-2 py-1 text-xs text-cyan-400 outline-none">
              <option>720p</option>
              <option>1080p</option>
              <option>1440p</option>
            </select>
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="mx-1 mb-4">
        <div className="text-[10px] text-gray-500 font-semibold tracking-widest mb-3">THÔNG TIN ỨNG DỤNG</div>
        <div className="card-dark p-4 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Phiên bản</span><span className="text-cyan-400 font-bold">v4.2.1</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Build</span><span className="text-gray-400">2026.05.10</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Nhà phát triển</span><span className="text-gray-400">SPERNEW Team</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Loại key</span><span className="font-bold" style={{ color: typeColor }}>{typeLabel}</span></div>
        </div>
      </div>

      {/* Logout */}
      <div className="mx-1 space-y-2">
        <button onClick={onLogout}
          className="w-full card-dark p-3 text-sm font-bold text-red-400 hover:border-red-400/30 transition-all text-left flex items-center gap-2">
          <span>🚪</span> Đăng xuất / Đổi Key
        </button>
      </div>
    </div>
  );
}
