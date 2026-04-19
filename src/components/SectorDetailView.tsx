"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft, MapPin, TrendingUp, Users, Briefcase } from "lucide-react";
import type { MarketSector, SectorDetail } from "@/types";
import { cn } from "@/lib/utils";

interface SectorDetailViewProps {
  sector: MarketSector;
  detail: SectorDetail;
  color: { text: string; stroke: string; fill: string };
  onBack: () => void;
}

function formatK(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export function SectorDetailView({ sector, detail, color, onBack }: SectorDetailViewProps) {
  const maxRoleCount = Math.max(...detail.roles.map((r) => r.count));

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-5 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Market
      </button>

      {/* Header */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-5 mb-6">
        <h1 className="text-xl font-semibold text-zinc-100 mb-1">{sector.name}</h1>
        <div className="flex items-center gap-6 mt-3">
          <div>
            <span className="text-2xl font-bold font-mono text-zinc-100">{formatK(sector.activePostings)}</span>
            <span className="text-xs text-zinc-500 ml-2">active postings</span>
          </div>
          <div>
            <span className={cn("text-lg font-bold font-mono", sector.monthOverMonthGrowth >= 25 ? "text-emerald-400" : "text-zinc-200")}>
              +{sector.monthOverMonthGrowth}%
            </span>
            <span className="text-xs text-zinc-500 ml-2">MoM growth</span>
          </div>
          <div>
            <span className="text-lg font-bold font-mono text-zinc-200">{formatK(sector.companiesHiring)}</span>
            <span className="text-xs text-zinc-500 ml-2">companies hiring</span>
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
            Posting Volume — 12 Month Trend
          </h2>
        </div>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={detail.trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradSector" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color.stroke} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={color.stroke} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" stroke="#3f3f46" tick={{ fill: "#71717a", fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis stroke="#3f3f46" tick={{ fill: "#71717a", fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}K`} />
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "8px", fontSize: "12px", color: "#d4d4d8" }}
                formatter={(value: number) => [`${value}K postings`, sector.name]}
                labelStyle={{ color: "#a1a1aa", marginBottom: "4px" }}
              />
              <Area type="monotone" dataKey="postings" stroke={color.stroke} strokeWidth={2} fill="url(#gradSector)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two-column: Roles + Regions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Roles in Demand */}
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-4 w-4 text-indigo-400" />
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
              Roles in Demand
            </h2>
          </div>
          <div className="space-y-3">
            {detail.roles.map((role) => (
              <div key={role.title}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-zinc-200">{role.title}</span>
                  <div className="flex items-center gap-3">
                    <span className={cn("text-xs font-mono font-medium", role.growth >= 25 ? "text-emerald-400" : "text-zinc-500")}>
                      +{role.growth}%
                    </span>
                    <span className="text-sm font-mono font-medium text-zinc-300 w-16 text-right">
                      {formatK(role.count)}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(role.count / maxRoleCount) * 100}%`,
                      backgroundColor: color.stroke,
                      opacity: 0.6,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Regions */}
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-indigo-400" />
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
              Top Regions
            </h2>
          </div>
          <div className="space-y-2.5">
            {detail.regions.map((region, i) => (
              <div
                key={region.name}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-zinc-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-zinc-600 w-5">{i + 1}</span>
                  <span className="text-sm text-zinc-200">{region.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={cn("text-xs font-mono font-medium", region.growth >= 25 ? "text-emerald-400" : "text-zinc-500")}>
                    +{region.growth}%
                  </span>
                  <span className="text-sm font-mono font-medium text-zinc-300 w-16 text-right">
                    {formatK(region.postings)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Companies Hiring */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-4 w-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
            Top Companies Hiring
          </h2>
        </div>
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 overflow-hidden">
          <div className="grid grid-cols-[1fr_140px_80px_80px] gap-4 px-4 py-3 border-b border-zinc-800/60 text-[11px] text-zinc-600 uppercase tracking-wider font-medium">
            <span>Company</span>
            <span>Top Role</span>
            <span className="text-right">Open Roles</span>
            <span className="text-right">Growth</span>
          </div>
          {detail.companies.map((company, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_140px_80px_80px] gap-4 px-4 py-3 border-b border-zinc-800/30 hover:bg-zinc-800/40 transition-colors"
            >
              <div>
                <span className="text-sm font-medium text-zinc-200">{company.name}</span>
                <div className="flex items-center gap-1 text-[11px] text-zinc-600 mt-0.5">
                  <MapPin className="h-2.5 w-2.5" />
                  {company.location}
                </div>
              </div>
              <span className="text-xs text-zinc-400 self-center">{company.topRole}</span>
              <span className="text-sm font-mono font-semibold text-blue-400 text-right self-center">
                {company.openRoles.toLocaleString()}
              </span>
              <span className={cn(
                "text-sm font-mono font-medium text-right self-center",
                company.headcountGrowth >= 25 ? "text-emerald-400" : "text-zinc-400"
              )}>
                +{company.headcountGrowth}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
