interface SegmentBarProps {
  value: number;
  max?: number;
  segments?: number;
  color?: string;
  dimColor?: string;
}

export default function SegmentBar({
  value,
  max = 100,
  segments = 20,
  color = "#00ff88",
  dimColor = "rgba(255,255,255,0.08)",
}: SegmentBarProps) {
  const filled = Math.round((value / max) * segments);
  return (
    <div className="flex gap-0.5 h-2">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all"
          style={{
            background: i < filled ? color : dimColor,
            boxShadow: i < filled ? `0 0 4px ${color}66` : "none",
          }}
        />
      ))}
    </div>
  );
}
