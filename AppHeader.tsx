import type { KeyInfo } from "@/lib/keys";

interface AppHeaderProps {
  keyInfo?: KeyInfo;
}

export default function AppHeader({ keyInfo }: AppHeaderProps) {
  const isAdmin = keyInfo?.type === "admin";
  const isVip = keyInfo?.type === "vip";
  const plan = isAdmin ? "ADMIN" : isVip ? "VIP" : "FREE";
  const planColor = isAdmin ? "#ff00aa" : isVip ? "#ffa500" : "#00ffff";
  const planBorder = isAdmin ? "rgba(255,0,170,0.4)" : isVip ? "rgba(255,165,0,0.4)" : "rgba(0,255,255,0.3)";

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00e5ff, #0097a7)" }}>
          <span className="text-xs font-black text-[#0a0f1e]">S</span>
        </div>
        <span className="text-lg font-black tracking-widest neon-cyan" style={{ fontFamily: "monospace", letterSpacing: "0.15em" }}>
          SPERNEW
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span
          className="px-3 py-1 rounded-full text-xs font-bold border"
          style={{ background: `${planColor}15`, borderColor: planBorder, color: planColor }}
        >
          {plan}
        </span>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: "0 0 6px #00ff88" }} />
          <span className="text-xs text-green-400 font-semibold">ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
