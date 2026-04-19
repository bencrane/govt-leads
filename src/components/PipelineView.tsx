"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ArrowRightLeft,
  MessageCircle,
  Clock,
  UserPlus,
  MapPin,
  Zap,
  Users,
} from "lucide-react";
import { pipelineEntries } from "@/data";
import { PipelineDetailView } from "./PipelineDetailView";
import type { PipelineEntry } from "@/types";
import { cn, timeAgo } from "@/lib/utils";

const statusConfig = {
  placed: {
    label: "Placed",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  matched: {
    label: "Matched",
    icon: ArrowRightLeft,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  intro_made: {
    label: "Intro Made",
    icon: MessageCircle,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  exploring: {
    label: "Exploring",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  opted_in: {
    label: "Opted In",
    icon: UserPlus,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
};

interface PipelineViewProps {
  anonymized: boolean;
}

export function PipelineView({ anonymized }: PipelineViewProps) {
  const [selectedEntry, setSelectedEntry] = useState<PipelineEntry | null>(null);

  if (selectedEntry) {
    return (
      <PipelineDetailView
        entry={selectedEntry}
        onBack={() => setSelectedEntry(null)}
      />
    );
  }

  const sorted = [...pipelineEntries].sort((a, b) => a.daysAgo - b.daysAgo);

  const totalPlaced = pipelineEntries
    .filter((e) => e.status === "placed")
    .reduce((sum, e) => sum + (e.placementCount || 0), 0);
  const activeConversations = pipelineEntries.filter(
    (e) => e.status !== "placed"
  ).length;
  const totalEntries = pipelineEntries.length;

  function maskRegion(region: string): string {
    if (!anonymized) return region;
    const parts = region.split(", ");
    if (parts.length === 2)
      return `${"•".repeat(parts[0].length)}, ${parts[1]}`;
    return region;
  }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">
              Total Placed
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {totalPlaced}
          </div>
          <div className="text-[11px] text-zinc-600 mt-1">
            workers connected to partners
          </div>
        </div>
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">
              Active
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-zinc-100">
            {activeConversations}
          </div>
          <div className="text-[11px] text-zinc-600 mt-1">
            conversations in progress
          </div>
        </div>
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">
              Connections
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-zinc-100">
            {totalEntries}
          </div>
          <div className="text-[11px] text-zinc-600 mt-1">this quarter</div>
        </div>
      </div>

      {/* Pipeline entries */}
      <div className="space-y-2.5">
        {sorted.map((entry) => {
          const config = statusConfig[entry.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              className="cursor-pointer rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4 hover:bg-zinc-800/80 hover:border-zinc-700/60 transition-all"
            >
              <div className="flex items-start justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border",
                      config.bg,
                      config.border
                    )}
                  >
                    <StatusIcon className={cn("h-3 w-3", config.color)} />
                    <span className={config.color}>{config.label}</span>
                  </div>
                  <span className="text-[11px] text-zinc-600 font-mono">
                    {timeAgo(entry.daysAgo)}
                  </span>
                </div>
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-zinc-700/50">
                  {entry.sector}
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-zinc-200 mb-1">
                    {entry.companyDescription}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-2">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {maskRegion(entry.region)}
                  </div>
                  <div className="text-xs text-zinc-500">
                    <span className="text-zinc-600">Signal:</span>{" "}
                    {entry.signal}
                  </div>
                </div>

                <div className="shrink-0 text-right max-w-[280px]">
                  <div className="text-sm text-zinc-300 mb-1.5">
                    {entry.outcome}
                  </div>
                  {entry.roles && (
                    <div className="text-[11px] text-zinc-600">
                      {entry.roles}
                    </div>
                  )}
                  {entry.placementCount && (
                    <div className="text-xs font-mono font-semibold text-emerald-400 mt-1">
                      {entry.placementCount} placed
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
