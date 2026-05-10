export type KeyType = "admin" | "vip" | "normal";

export interface KeyInfo {
  type: KeyType;
  expiry: string | null;
  daysLeft: number | null;
  label: string;
}

const ADMIN_KEY = "KEYNGUYENLONGIOSVIP20012026";

const PREDEFINED_KEYS: Record<string, { type: KeyType; expiry: string | null }> = {
  [ADMIN_KEY]: { type: "admin", expiry: null },
  "VIP-SPERNEW-2028": { type: "vip", expiry: "2028-12-21" },
  "VIP-FREE-2026": { type: "vip", expiry: "2026-06-30" },
  "VIP-TRIAL-30": { type: "vip", expiry: "2026-06-10" },
  "NORMAL-SPERNEW-001": { type: "normal", expiry: "2026-12-31" },
  "NORMAL-SPERNEW-002": { type: "normal", expiry: "2026-09-01" },
  "FREE-TRIAL-7": { type: "normal", expiry: "2026-05-17" },
};

export function validateKey(input: string): KeyInfo | null {
  const trimmed = input.trim().toUpperCase();
  const found = PREDEFINED_KEYS[trimmed] ?? PREDEFINED_KEYS[input.trim()];

  if (!found) return null;

  if (found.expiry === null) {
    return { type: found.type, expiry: null, daysLeft: null, label: "Vĩnh viễn" };
  }

  const expDate = new Date(found.expiry);
  const now = new Date();
  const diff = Math.ceil((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diff < 0) return null;

  return {
    type: found.type,
    expiry: found.expiry,
    daysLeft: diff,
    label: `Còn ${diff} ngày (hết hạn ${found.expiry})`,
  };
}

export const SESSION_KEY = "spernew_session";

export function saveSession(key: string, info: KeyInfo) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ key, info }));
}

export function loadSession(): { key: string; info: KeyInfo } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
