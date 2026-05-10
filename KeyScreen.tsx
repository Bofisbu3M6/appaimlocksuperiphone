import { useState } from "react";
import { validateKey, saveSession, type KeyInfo } from "@/lib/keys";

interface KeyScreenProps {
  onUnlock: (key: string, info: KeyInfo) => void;
}

export default function KeyScreen({ onUnlock }: KeyScreenProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (!input.trim()) {
      setError("Vui lòng nhập key kích hoạt");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      const info = validateKey(input.trim());
      if (!info) {
        setLoading(false);
        setError("Key không hợp lệ hoặc đã hết hạn!");
        setShake(true);
        setTimeout(() => setShake(false), 600);
        return;
      }
      saveSession(input.trim(), info);
      setLoading(false);
      onUnlock(input.trim(), info);
    }, 1200);
  };

  const typeLabel: Record<string, string> = {
    admin: "ADMIN",
    vip: "VIP",
    normal: "NORMAL",
  };
  const typeColor: Record<string, string> = {
    admin: "#ff00aa",
    vip: "#ffa500",
    normal: "#00ffff",
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "linear-gradient(180deg, #060c1a 0%, #030810 100%)" }}
    >
      {/* Logo */}
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-black"
            style={{
              background: "linear-gradient(135deg, #00e5ff, #0097a7)",
              boxShadow: "0 0 30px rgba(0, 229, 255, 0.5)",
            }}
          >
            S
          </div>
        </div>
        <div
          className="text-4xl font-black tracking-[0.2em] mb-1"
          style={{
            color: "#00ffff",
            textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff44",
            fontFamily: "monospace",
          }}
        >
          SPERNEW
        </div>
        <div className="text-xs text-gray-500 tracking-widest">SYSTEM OPTIMIZER · AI POWERED</div>
      </div>

      {/* Key Input Card */}
      <div
        className={`w-full max-w-sm rounded-2xl p-6 ${shake ? "animate-bounce" : ""}`}
        style={{
          background: "rgba(10, 20, 40, 0.9)",
          border: "1px solid rgba(0, 255, 255, 0.2)",
          boxShadow: "0 0 40px rgba(0, 255, 255, 0.08)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="text-center mb-6">
          <div className="text-base font-black text-white tracking-wider mb-1">NHẬP KEY KÍCH HOẠT</div>
          <div className="text-xs text-gray-500">Nhập key để truy cập ứng dụng</div>
        </div>

        {/* Key types legend */}
        <div className="flex gap-2 justify-center mb-5">
          {[
            { label: "NORMAL", color: "#00ffff" },
            { label: "VIP", color: "#ffa500" },
            { label: "ADMIN", color: "#ff00aa" },
          ].map(k => (
            <div
              key={k.label}
              className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black"
              style={{
                background: `${k.color}11`,
                border: `1px solid ${k.color}33`,
                color: k.color,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: k.color }} />
              {k.label}
            </div>
          ))}
        </div>

        <div className="mb-3">
          <input
            type="text"
            value={input}
            onChange={e => { setInput(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="VD: VIP-SPERNEW-2028"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="characters"
            spellCheck={false}
            className="w-full px-4 py-3.5 rounded-xl text-sm font-bold tracking-wider outline-none transition-all"
            style={{
              background: "rgba(0, 0, 0, 0.4)",
              border: `1px solid ${error ? "#ff4444" : "rgba(0, 255, 255, 0.25)"}`,
              color: "#00ffff",
              boxShadow: error ? "0 0 10px rgba(255,68,68,0.2)" : "none",
              caretColor: "#00ffff",
            }}
          />
        </div>

        {error && (
          <div className="mb-3 text-xs text-red-400 text-center font-semibold flex items-center justify-center gap-1">
            <span>⚠️</span> {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-black tracking-widest text-sm transition-all"
          style={{
            background: loading
              ? "rgba(0,229,255,0.3)"
              : "linear-gradient(135deg, #00e5ff, #00b8d4)",
            color: loading ? "#00ffff" : "#0a0f1e",
            boxShadow: loading ? "none" : "0 0 20px rgba(0, 229, 255, 0.4)",
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Đang xác thực...
            </span>
          ) : (
            "⚡ KÍCH HOẠT"
          )}
        </button>

        <div className="mt-4 text-center text-xs text-gray-600">
          Liên hệ Admin để mua key · <span className="text-cyan-700">@spernew.ios</span>
        </div>
      </div>

      {/* Decorative */}
      <div className="mt-8 text-center space-y-1">
        <div className="text-[10px] text-gray-700 tracking-widest">POWERED BY AI OPTIMIZATION ENGINE</div>
        <div className="text-[10px] text-gray-800">v4.2.1 · 2026</div>
      </div>

      {/* Corner glow effects */}
      <div className="fixed top-0 left-0 w-64 h-64 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)" }} />
      <div className="fixed bottom-0 right-0 w-64 h-64 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,0,170,0.05) 0%, transparent 70%)" }} />
    </div>
  );
}
