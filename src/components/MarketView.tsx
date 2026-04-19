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
import {
  Briefcase,
  Building2,
  TrendingUp,
  Zap,
  Heart,
  Wrench,
  Cpu,
  HardHat,
  Truck,
  Shield,
  MapPin,
} from "lucide-react";
import { hiringChartData, marketSectors, topHiringCompanies, sectorDetails } from "@/data";
import { SectorDetailView } from "./SectorDetailView";
import type { MarketSector } from "@/types";
import { cn } from "@/lib/utils";

const sectorIcons: Record<string, React.ElementType> = {
  Healthcare: Heart,
  Manufacturing: Wrench,
  Technology: Cpu,
  Construction: HardHat,
  "Logistics & Transport": Truck,
  "Defense & Aerospace": Shield,
};

const sectorColors: Record<string, { text: string; bg: string; border: string; stroke: string; fill: string }> = {
  Healthcare: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", stroke: "#10b981", fill: "#10b981" },
  Manufacturing: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", stroke: "#3b82f6", fill: "#3b82f6" },
  Technology: { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", stroke: "#8b5cf6", fill: "#8b5cf6" },
  Construction: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", stroke: "#f59e0b", fill: "#f59e0b" },
  "Logistics & Transport": { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", stroke: "#06b6d4", fill: "#06b6d4" },
  "Defense & Aerospace": { text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", stroke: "#ef4444", fill: "#ef4444" },
};

function formatK(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

export function MarketView() {
  const [selectedSector, setSelectedSector] = useState<MarketSector | null>(null);

  if (selectedSector) {
    const detail = sectorDetails[selectedSector.name];
    const colors = sectorColors[selectedSector.name] || sectorColors.Healthcare;
    if (detail) {
      return (
        <SectorDetailView
          sector={selectedSector}
          detail={detail}
          color={colors}
          onBack={() => setSelectedSector(null)}
        />
      );
    }
  }

  return (
    <div>
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Active Job Postings", value: "2.4M", sub: "across Indeed, LinkedIn, and 12 more", icon: Briefcase, color: "text-blue-400" },
          { label: "Companies Tracked", value: "847K", sub: "headcount & hiring monitored", icon: Building2, color: "text-indigo-400" },
          { label: "Hiring Surges", value: "12,400", sub: "detected this month", icon: Zap, color: "text-amber-400" },
          { label: "Avg Posting Growth", value: "+34%", sub: "quarter over quarter", icon: TrendingUp, color: "text-emerald-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <stat.icon className={cn("h-4 w-4", stat.color)} />
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </div>
            <div className="text-2xl font-bold font-mono text-zinc-100">
              {stat.value}
            </div>
            <div className="text-[11px] text-zinc-600 mt-1">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Hiring Activity Chart */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-indigo-400" />
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                Hiring Activity by Sector
              </h2>
            </div>
            <p className="text-zinc-500 text-sm">
              Active job postings (in thousands) — trailing 12 months
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-zinc-500">Healthcare</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-zinc-500">Manufacturing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-violet-500" />
              <span className="text-zinc-500">Technology</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-zinc-500">Construction</span>
            </div>
          </div>
        </div>

        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hiringChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradHC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradMfg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradTech" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradConst" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" stroke="#3f3f46" tick={{ fill: "#71717a", fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis stroke="#3f3f46" tick={{ fill: "#71717a", fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}K`} />
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "8px", fontSize: "12px", color: "#d4d4d8" }}
                formatter={(value: number, name: string) => [`${value}K postings`, name.charAt(0).toUpperCase() + name.slice(1)]}
                labelStyle={{ color: "#a1a1aa", marginBottom: "4px" }}
              />
              <Area type="monotone" dataKey="healthcare" stroke="#10b981" strokeWidth={2} fill="url(#gradHC)" />
              <Area type="monotone" dataKey="manufacturing" stroke="#3b82f6" strokeWidth={1.5} fill="url(#gradMfg)" />
              <Area type="monotone" dataKey="technology" stroke="#8b5cf6" strokeWidth={1.5} fill="url(#gradTech)" />
              <Area type="monotone" dataKey="construction" stroke="#f59e0b" strokeWidth={1.5} fill="url(#gradConst)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hot Sectors */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
          Hot Sectors
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {marketSectors.map((sector) => {
            const Icon = sectorIcons[sector.name] || Briefcase;
            const colors = sectorColors[sector.name] || sectorColors.Healthcare;
            return (
              <div
                key={sector.id}
                onClick={() => setSelectedSector(sector)}
                className="cursor-pointer rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4 hover:bg-zinc-800/80 hover:border-zinc-700/60 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={cn("p-1.5 rounded-md", colors.bg, colors.border, "border")}>
                    <Icon className={cn("h-3.5 w-3.5", colors.text)} />
                  </div>
                  <span className="text-sm font-medium text-zinc-200">{sector.name}</span>
                </div>
                <div className="text-xl font-bold font-mono text-zinc-100 mb-1">
                  {formatK(sector.activePostings)}
                </div>
                <div className="text-[11px] text-zinc-600 mb-3">active postings</div>
                <div className="flex items-center justify-between text-xs">
                  <span className={cn("font-mono font-medium", sector.monthOverMonthGrowth >= 25 ? "text-emerald-400" : "text-zinc-400")}>
                    +{sector.monthOverMonthGrowth}% MoM
                  </span>
                  <span className="text-zinc-600">
                    {formatK(sector.companiesHiring)} hiring
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Hiring Companies */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
          Top Companies Hiring
        </h2>
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 overflow-hidden">
          <div className="grid grid-cols-[1fr_100px_140px_80px_80px] gap-4 px-4 py-3 border-b border-zinc-800/60 text-[11px] text-zinc-600 uppercase tracking-wider font-medium">
            <span>Company</span>
            <span>Sector</span>
            <span>Top Role</span>
            <span className="text-right">Open Roles</span>
            <span className="text-right">Growth</span>
          </div>
          {topHiringCompanies.map((company) => (
            <div
              key={company.id}
              className="grid grid-cols-[1fr_100px_140px_80px_80px] gap-4 px-4 py-3 border-b border-zinc-800/30 hover:bg-zinc-800/40 transition-colors"
            >
              <div>
                <span className="text-sm font-medium text-zinc-200">{company.name}</span>
                <div className="flex items-center gap-1 text-[11px] text-zinc-600 mt-0.5">
                  <MapPin className="h-2.5 w-2.5" />
                  {company.location}
                </div>
              </div>
              <span className="text-xs text-zinc-500 self-center">{company.sector}</span>
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
