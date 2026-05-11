"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Briefcase, MapPin } from "lucide-react";
import { SectorDetailView } from "./SectorDetailView";
import type { MarketSector } from "@/types";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";
import { getColor } from "@/lib/colors";
import { useMarket } from "@/context/MarketContext";

function formatK(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

export function MarketView() {
  const { market } = useMarket();
  const { vocab, hiringChartData, hiringChartSeries, marketSectors, topHiringCompanies } = market;
  const [selectedSector, setSelectedSector] = useState<MarketSector | null>(null);

  if (selectedSector) {
    const detail = market.sectorDetails[selectedSector.name];
    const tokens = getColor(selectedSector.colorKey);
    if (detail) {
      return (
        <SectorDetailView
          sector={selectedSector}
          detail={detail}
          color={tokens}
          onBack={() => setSelectedSector(null)}
        />
      );
    }
  }

  return (
    <div>
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {vocab.marketStats.map((stat) => {
          const Icon = getIcon(stat.icon);
          return (
            <div
              key={stat.label}
              className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className={cn("h-4 w-4", stat.color)} />
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                  {stat.label}
                </span>
              </div>
              <div className="text-2xl font-bold font-mono text-zinc-100">
                {stat.value}
              </div>
              <div className="text-[11px] text-zinc-600 mt-1">{stat.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Hiring / Activity Chart */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-indigo-400" />
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                {vocab.hiringChartTitle}
              </h2>
            </div>
            <p className="text-zinc-500 text-sm">{vocab.hiringChartSub}</p>
          </div>
          <div className="flex items-center gap-4 text-xs flex-wrap">
            {hiringChartSeries.map((s) => (
              <div key={s.key} className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-zinc-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hiringChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                {hiringChartSeries.map((s) => (
                  <linearGradient key={s.key} id={`gradHiring-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={s.color} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" stroke="#3f3f46" tick={{ fill: "#71717a", fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis stroke="#3f3f46" tick={{ fill: "#71717a", fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}${vocab.hiringChartYSuffix}`} />
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "8px", fontSize: "12px", color: "#d4d4d8" }}
                formatter={(value, name) => {
                  const v = typeof value === "number" ? value : Number(value);
                  const key = String(name);
                  const series = hiringChartSeries.find((s) => s.key === key);
                  return [`${v}${vocab.hiringChartYSuffix} ${vocab.hiringChartTooltipUnit}`, series?.label || key];
                }}
                labelStyle={{ color: "#a1a1aa", marginBottom: "4px" }}
              />
              {hiringChartSeries.map((s, i) => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  stroke={s.color}
                  strokeWidth={i === 0 ? 2 : 1.5}
                  fill={`url(#gradHiring-${s.key})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hot Sectors */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
          {vocab.hotSectorsTitle}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {marketSectors.map((sector) => {
            const Icon = getIcon(sector.iconKey || "Briefcase");
            const tokens = getColor(sector.colorKey);
            return (
              <div
                key={sector.id}
                onClick={() => setSelectedSector(sector)}
                className="cursor-pointer rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4 hover:bg-zinc-800/80 hover:border-zinc-700/60 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={cn("p-1.5 rounded-md border", tokens.bg, tokens.border)}>
                    <Icon className={cn("h-3.5 w-3.5", tokens.text)} />
                  </div>
                  <span className="text-sm font-medium text-zinc-200">{sector.name}</span>
                </div>
                <div className="text-xl font-bold font-mono text-zinc-100 mb-1">
                  {formatK(sector.activePostings)}
                </div>
                <div className="text-[11px] text-zinc-600 mb-3">{vocab.hotSectorsActiveLabel}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className={cn("font-mono font-medium", sector.monthOverMonthGrowth >= 15 ? "text-emerald-400" : "text-zinc-400")}>
                    +{sector.monthOverMonthGrowth}% MoM
                  </span>
                  <span className="text-zinc-600">
                    {formatK(sector.companiesHiring)} {vocab.hotSectorsCountSuffix}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Entities */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
          {vocab.topEntitiesTitle}
        </h2>
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 overflow-hidden">
          <div className="grid grid-cols-[1fr_120px_180px_90px_80px] gap-4 px-4 py-3 border-b border-zinc-800/60 text-[11px] text-zinc-600 uppercase tracking-wider font-medium">
            <span>{vocab.topEntitiesHeaders.entity}</span>
            <span>{vocab.topEntitiesHeaders.sector}</span>
            <span>{vocab.topEntitiesHeaders.topRole}</span>
            <span className="text-right">{vocab.topEntitiesHeaders.openRoles}</span>
            <span className="text-right">{vocab.topEntitiesHeaders.growth}</span>
          </div>
          {topHiringCompanies.map((company) => (
            <div
              key={company.id}
              className="grid grid-cols-[1fr_120px_180px_90px_80px] gap-4 px-4 py-3 border-b border-zinc-800/30 hover:bg-zinc-800/40 transition-colors"
            >
              <div>
                <span className="text-sm font-medium text-zinc-200">{company.name}</span>
                <div className="flex items-center gap-1 text-[11px] text-zinc-600 mt-0.5">
                  <MapPin className="h-2.5 w-2.5" />
                  {company.location}
                </div>
              </div>
              <span className="text-xs text-zinc-500 self-center truncate">{company.sector}</span>
              <span className="text-xs text-zinc-400 self-center truncate">{company.topRole}</span>
              <span className="text-sm font-mono font-semibold text-blue-400 text-right self-center">
                {company.openRoles.toLocaleString()}
              </span>
              <span className={cn(
                "text-sm font-mono font-medium text-right self-center",
                company.headcountGrowth >= 20 ? "text-emerald-400" : "text-zinc-400"
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
