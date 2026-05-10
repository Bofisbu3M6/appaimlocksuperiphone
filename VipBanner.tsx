import type { KeyInfo } from "@/lib/keys";

interface VipBannerProps {
  keyInfo?: KeyInfo;
}

export default function VipBanner({ keyInfo }: VipBannerProps) {
  const isAdmin = keyInfo?.type === "admin";
  const isVip = keyInfo?.type === "vip";

  const bgStyle = isAdmin
    ? { background: "linear-gradient(90deg, #1a0020, #2d0040, #1a0020)", borderBottom: "1px solid rgba(255,0,170,0.3)" }
    : isVip
    ? { background: "linear-gradient(90deg, #1a0a00, #2a1500, #1a0a00)", borderBottom: "1px solid rgba(255,165,0,0.3)" }
    : { background: "linear-gradient(90deg, #06101f, #0a1a30, #06101f)", borderBottom: "1px solid rgba(0,255,255,0.15)" };

  return (
    <div className="flex items-center justify-between px-4 py-2 text-xs sticky top-0 z-40" style={bgStyle}>
      <div className="flex items-center gap-2">
        {isAdmin ? (
          <>
            <span>🛡️</span>
            <span className="font-bold tracking-wider" style={{ color: "#ff00aa" }}>ADMIN ACTIVE</span>
            <span className="text-gray-500">|</span>
            <span style={{ color: "#ff88dd" }}>Toàn quyền truy cập</span>
          </>
        ) : isVip ? (
          <>
            <span>👑</span>
            <span className="text-orange-400 font-bold tracking-wider">VIP ACTIVE</span>
            <span className="text-gray-500">|</span>
            <span className="text-orange-300">
              Hết hạn: {keyInfo?.expiry ?? "Vĩnh viễn"}
            </span>
          </>
        ) : (
          <>
            <span>🔑</span>
            <span className="text-cyan-500 font-bold tracking-wider">NORMAL</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400">
              Còn {keyInfo?.daysLeft ?? "?"} ngày
            </span>
          </>
        )}
      </div>
      <span
        className="text-[9px] font-black px-2 py-0.5 rounded-full"
        style={
          isAdmin
            ? { background: "rgba(255,0,170,0.15)", color: "#ff00aa", border: "1px solid rgba(255,0,170,0.3)" }
            : isVip
            ? { background: "rgba(255,165,0,0.15)", color: "#ffa500", border: "1px solid rgba(255,165,0,0.3)" }
            : { background: "rgba(0,255,255,0.08)", color: "#00ffff", border: "1px solid rgba(0,255,255,0.2)" }
        }
      >
        {isAdmin ? "ADMIN" : isVip ? "VIP" : "FREE"}
      </span>
    </div>
  );
}
