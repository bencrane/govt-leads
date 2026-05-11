export interface ColorTokens {
  text: string;
  bg: string;
  border: string;
  stroke: string;
}

export const colorRegistry: Record<string, ColorTokens> = {
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", stroke: "#10b981" },
  blue: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", stroke: "#3b82f6" },
  violet: { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", stroke: "#8b5cf6" },
  amber: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", stroke: "#f59e0b" },
  cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", stroke: "#06b6d4" },
  red: { text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", stroke: "#ef4444" },
  indigo: { text: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", stroke: "#6366f1" },
};

export function getColor(key?: string): ColorTokens {
  return colorRegistry[key || "blue"] || colorRegistry.blue;
}
