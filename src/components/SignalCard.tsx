"use client";

import {
  FileCheck2,
  Users,
  Building2,
  Banknote,
  MapPin,
} from "lucide-react";
import type { Signal } from "@/types";
import { formatCurrency, timeAgo, cn } from "@/lib/utils";

interface SignalCardProps {
  signal: Signal;
  onClick: () => void;
}

const signalConfig = {
  contract_win: {
    icon: FileCheck2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "signal-glow-green",
    label: "Contract Win",
  },
  hiring_surge: {
    icon: Users,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "signal-glow-blue",
    label: "Hiring Surge",
  },
  expansion: {
    icon: Building2,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "signal-glow-amber",
    label: "Expansion",
  },
  funding: {
    icon: Banknote,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    glow: "signal-glow-violet",
    label: "Funding",
  },
};

export function SignalCard({ signal, onClick }: SignalCardProps) {
  const config = signalConfig[signal.type];
  const Icon = config.icon;

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4 transition-all duration-200",
        "hover:bg-zinc-800/80 hover:border-zinc-700/60",
        config.glow
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium", config.bg, config.border, "border")}>
          <Icon className={cn("h-3 w-3", config.color)} />
          <span className={config.color}>{config.label}</span>
        </div>
        <span className="text-[11px] text-zinc-500 font-mono">
          {timeAgo(signal.daysAgo)}
        </span>
      </div>

      <h3 className="text-[15px] font-semibold text-zinc-100 mb-1 group-hover:text-white transition-colors leading-snug">
        {signal.companyName}
      </h3>

      <p className="text-sm text-zinc-400 mb-3 leading-relaxed">
        {signal.headline}
      </p>

      <div className="flex items-center justify-between">
        {signal.value && (
          <span className={cn("text-sm font-semibold font-mono", config.color)}>
            {signal.metric === "open roles"
              ? `${signal.value} roles`
              : formatCurrency(signal.value)}
          </span>
        )}
        <div className="flex items-center gap-1 text-xs text-zinc-500 ml-auto">
          <MapPin className="h-3 w-3" />
          {signal.companyLocation}
        </div>
      </div>
    </div>
  );
}
