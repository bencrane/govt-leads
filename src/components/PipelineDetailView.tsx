"use client";

import {
  ArrowLeft,
  MapPin,
  Handshake,
  CalendarDays,
  Briefcase,
} from "lucide-react";
import type { PipelineEntry } from "@/types";
import { cn } from "@/lib/utils";
import { useMarket } from "@/context/MarketContext";
import { getIcon } from "@/lib/icons";

interface PipelineDetailViewProps {
  entry: PipelineEntry;
  onBack: () => void;
}

export function PipelineDetailView({ entry, onBack }: PipelineDetailViewProps) {
  const { market } = useMarket();
  const detail = market.pipelineDetails[entry.id];

  const statusColors: Record<string, string> = {
    placed: "text-emerald-400", matched: "text-blue-400", intro_made: "text-violet-400",
    exploring: "text-amber-400", opted_in: "text-cyan-400",
  };
  const statusLabels: Record<string, string> = {
    placed: "Placed", matched: "Matched", intro_made: "Intro Made",
    exploring: "Exploring", opted_in: "Opted In",
  };

  if (!detail) {
    // Graceful fallback for entries without detail (e.g. exploring/matched FMCSA entries)
    return (
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-5 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Pipeline
        </button>
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-5 mb-6">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-xl font-semibold text-zinc-100">{entry.companyDescription}</h1>
            <span className={cn("text-sm font-semibold", statusColors[entry.status])}>
              {statusLabels[entry.status]}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-500 mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {entry.region}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 text-xs border border-zinc-700/50">
              {entry.sector}
            </span>
          </div>
          <div className="text-sm text-zinc-400 mb-4">
            <span className="text-zinc-600">Signal:</span> {entry.signal}
          </div>
          <div className="text-sm text-zinc-400">
            <span className="text-zinc-600">Partner:</span> {entry.partnerType}
          </div>
          {entry.outcome && (
            <div className="text-sm text-zinc-400 mt-2">
              <span className="text-zinc-600">Outcome:</span> {entry.outcome}
            </div>
          )}
        </div>
        <div className="rounded-xl bg-zinc-900/40 border border-zinc-800/30 p-5 text-sm text-zinc-500">
          Detailed timeline not yet recorded for this entry.
        </div>
      </div>
    );
  }

  const filledCount = detail.placements.reduce((sum, p) => sum + p.count, 0);
  const openCount = detail.placements.filter((p) => p.status === "open").length;

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-5 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Pipeline
      </button>

      {/* Header */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 mb-6">
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-xl font-semibold text-zinc-100">
              {entry.companyDescription}
            </h1>
            <span className={cn("text-sm font-semibold", statusColors[entry.status])}>
              {statusLabels[entry.status]}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-500 mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {entry.region}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 text-xs border border-zinc-700/50">
              {entry.sector}
            </span>
          </div>
          <div className="text-sm text-zinc-400">
            <span className="text-zinc-600">Signal:</span> {entry.signal}
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-4 border-t border-zinc-800/60">
          <div className="px-5 py-3 border-r border-zinc-800/40">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider">Roles Needed</div>
            <div className="text-lg font-bold font-mono text-zinc-100">{entry.roles?.split(", ").length || 0}</div>
          </div>
          <div className="px-5 py-3 border-r border-zinc-800/40">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider">Filled</div>
            <div className={cn("text-lg font-bold font-mono", filledCount > 0 ? "text-emerald-400" : "text-zinc-500")}>{filledCount}</div>
          </div>
          <div className="px-5 py-3 border-r border-zinc-800/40">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider">Open</div>
            <div className="text-lg font-bold font-mono text-zinc-100">{openCount}</div>
          </div>
          <div className="px-5 py-3">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider">Timeline Steps</div>
            <div className="text-lg font-bold font-mono text-zinc-100">{detail.timeline.length}</div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-5 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <CalendarDays className="h-4 w-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
            Timeline
          </h2>
        </div>
        <div className="space-y-0">
          {detail.timeline.map((event, i) => {
            const Icon = getIcon(event.iconKey);
            return (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-7 w-7 rounded-full flex items-center justify-center bg-zinc-950 border border-zinc-800">
                    <Icon className={cn("h-3.5 w-3.5", event.colorClass)} />
                  </div>
                  {i < detail.timeline.length - 1 && (
                    <div className="w-px flex-1 min-h-[20px] bg-zinc-800/60" />
                  )}
                </div>
                <div className="pb-4 pt-0.5 flex-1">
                  <div className="flex items-center gap-3 mb-0.5">
                    <span className="text-sm font-medium text-zinc-200">{event.title}</span>
                    <span className="text-[11px] text-zinc-600 font-mono">{event.date}</span>
                  </div>
                  <p className="text-xs text-zinc-500">{event.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom row: Partner + Placements + Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Handshake className="h-4 w-4 text-indigo-400" />
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Partner Match
            </h3>
          </div>
          <div className="space-y-2.5 text-sm">
            {[
              ["Type", detail.partner.type],
              ["Focus", detail.partner.specialization],
              ["Region", detail.partner.region],
              ["Status", detail.partner.relationship],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-[10px] text-zinc-600 uppercase tracking-wider">{label}</div>
                <div className="text-zinc-300">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="h-4 w-4 text-indigo-400" />
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Placements
            </h3>
          </div>
          <div className="space-y-2">
            {detail.placements.map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-zinc-400 truncate mr-2">{p.role}</span>
                <div className="flex items-center gap-2 shrink-0">
                  {p.count > 0 && (
                    <span className="text-xs font-mono font-medium text-emerald-400">{p.count}</span>
                  )}
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded border",
                    p.status === "filled" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                    p.status === "in_progress" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                    "bg-zinc-800 text-zinc-500 border-zinc-700/50"
                  )}>
                    {p.status === "filled" ? "Filled" : p.status === "in_progress" ? "Active" : "Open"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            Notes
          </h3>
          <div className="space-y-2.5">
            {detail.notes.map((note, i) => (
              <p key={i} className="text-xs text-zinc-500 leading-relaxed pl-3 border-l-2 border-zinc-800">
                {note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
