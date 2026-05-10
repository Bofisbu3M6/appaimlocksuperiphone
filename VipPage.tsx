import AppHeader from "@/components/AppHeader";
import type { KeyInfo } from "@/lib/keys";

interface VipPageProps {
  keyInfo?: KeyInfo;
}

const vipFeatures = [
  "FPS Stabilizer Pro — Ổn định FPS cực cao",
  "Network Booster MAX — Giảm ping tối đa",
  "Turbo Mode — Tăng tốc toàn hệ thống",
  "Screen Optimizer — Tối ưu màn hình gaming",
  "AI Auto Boost — Tự động tối ưu theo game",
  "Priority Support — Hỗ trợ ưu tiên 24/7",
  "Unlock All AIM LAB Settings",
  "Admin Panel Access (Admin only)",
];

export default function VipPage({ keyInfo }: VipPageProps) {
  const isVip = keyInfo?.type === "vip";
  const isAdmin = keyInfo?.type === "admin";
  const isPaid = isVip || isAdmin;

  return (
    <div className="px-3 pb-4">
      <AppHeader keyInfo={keyInfo} />

      <div className="mx-1 mb-4">
        <div className="text-2xl font-black tracking-widest text-white mb-1" style={{ fontFamily: "monospace" }}>VIP</div>
        <div className="text-xs text-gray-500">Nâng cấp để mở khóa đầy đủ</div>
      </div>

      {/* Current Plan */}
      <div className="mx-1 mb-4 card-dark p-4 flex items-center justify-between"
        style={isPaid ? { borderColor: isAdmin ? "rgba(255,0,170,0.4)" : "rgba(255,165,0,0.4)" } : {}}>
        <div>
          <div className="text-xs text-gray-500 mb-1">GÓI HIỆN TẠI</div>
          <div className="text-xl font-black" style={{ color: isAdmin ? "#ff00aa" : isVip ? "#ffa500" : "#00ffff" }}>
            {isAdmin ? "ADMIN" : isVip ? "VIP" : "FREE"}
          </div>
          {isPaid ? (
            <div className="text-xs text-green-400 font-semibold">
              ✓ {isAdmin ? "Toàn quyền truy cập" : `Hết hạn: ${keyInfo?.expiry ?? "Vĩnh viễn"}`}
            </div>
          ) : (
            <div className="text-xs text-gray-500">Giới hạn tính năng</div>
          )}
        </div>
        <div className="text-4xl">{isAdmin ? "🛡️" : isVip ? "👑" : "🔓"}</div>
      </div>

      {/* Already VIP/Admin message */}
      {isPaid && (
        <div className="mx-1 mb-4 p-4 rounded-xl text-center"
          style={{ background: isAdmin ? "rgba(255,0,170,0.08)" : "rgba(255,165,0,0.08)", border: `1px solid ${isAdmin ? "rgba(255,0,170,0.3)" : "rgba(255,165,0,0.3)"}` }}>
          <div className="text-2xl mb-2">{isAdmin ? "🛡️" : "👑"}</div>
          <div className="font-black text-lg" style={{ color: isAdmin ? "#ff00aa" : "#ffa500" }}>
            {isAdmin ? "ADMIN ACCESS" : "VIP ACTIVE"}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {isAdmin ? "Bạn có toàn quyền truy cập tất cả tính năng." : `Key của bạn còn ${keyInfo?.daysLeft} ngày sử dụng.`}
          </div>
        </div>
      )}

      {/* VIP Plans - only show for non-VIP */}
      {!isPaid && (
        <div className="mx-1 space-y-3 mb-6">
          <div className="p-4 rounded-xl" style={{ background: "linear-gradient(135deg, rgba(255,165,0,0.1), rgba(255,100,0,0.05))", border: "1px solid rgba(255,165,0,0.3)" }}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-black text-orange-400 tracking-wider">VIP 1 THÁNG</div>
                <div className="text-xs text-gray-400">Đầy đủ tính năng</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-orange-400">50K</div>
                <div className="text-xs text-gray-500">VNĐ/tháng</div>
              </div>
            </div>
            <button className="w-full py-2.5 rounded-lg font-bold text-sm tracking-wider"
              style={{ background: "linear-gradient(90deg, #ff8c00, #ff6600)", color: "white", boxShadow: "0 0 15px rgba(255,140,0,0.4)" }}>
              NÂNG CẤP NGAY
            </button>
          </div>

          <div className="p-4 rounded-xl relative"
            style={{ background: "linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,150,200,0.05))", border: "2px solid rgba(0,255,255,0.4)", boxShadow: "0 0 20px rgba(0,255,255,0.15)" }}>
            <div className="absolute -top-2 right-4 bg-cyan-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full">GIÁ TRỊ NHẤT</div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-black text-cyan-400 tracking-wider">VIP 3 THÁNG</div>
                <div className="text-xs text-gray-400">Tiết kiệm 30%</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-cyan-400">120K</div>
                <div className="text-xs text-gray-500">VNĐ/3 tháng</div>
              </div>
            </div>
            <button className="btn-cyan w-full py-2.5 rounded-lg font-bold text-sm tracking-wider">NÂNG CẤP NGAY</button>
          </div>

          <div className="p-4 rounded-xl"
            style={{ background: "linear-gradient(135deg, rgba(255,0,170,0.1), rgba(150,0,100,0.05))", border: "1px solid rgba(255,0,170,0.3)" }}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-black neon-pink tracking-wider">VIP VĨNH VIỄN</div>
                <div className="text-xs text-gray-400">Một lần dùng mãi</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black" style={{ color: "#ff00aa" }}>500K</div>
                <div className="text-xs text-gray-500">VNĐ — lifetime</div>
              </div>
            </div>
            <button className="btn-pink w-full py-2.5 rounded-lg font-bold text-sm tracking-wider">MUA NGAY</button>
          </div>
        </div>
      )}

      {/* VIP Features List */}
      <div className="mx-1">
        <div className="text-[10px] text-gray-500 font-semibold tracking-widest mb-3">QUYỀN LỢI VIP</div>
        <div className="space-y-2">
          {vipFeatures.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="font-bold" style={{ color: isPaid ? "#00ff88" : "#00ffff" }}>✓</span>
              <span className={isPaid ? "text-gray-200" : "text-gray-400"}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
