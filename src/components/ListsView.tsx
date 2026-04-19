"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  TrendingUp,
  MapPin,
  Users,
  Calendar,
} from "lucide-react";
import { signalLists, companies, signals } from "@/data";
import type { Company, SignalList } from "@/types";
import { cn } from "@/lib/utils";

interface ListsViewProps {
  onCompanyClick: (company: Company) => void;
  selectedListId?: string | null;
}

export function ListsView({ onCompanyClick, selectedListId }: ListsViewProps) {
  const [activeList, setActiveList] = useState<SignalList | null>(
    selectedListId
      ? signalLists.find((l) => l.id === selectedListId) || null
      : null
  );

  if (activeList) {
    const listCompanies = companies.filter((c) =>
      activeList.companyIds.includes(c.id)
    );
    const listSignals = signals.filter((s) =>
      activeList.companyIds.includes(s.companyId)
    );

    return (
      <div>
        <button
          onClick={() => setActiveList(null)}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Lists
        </button>

        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-5 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-1">
                {activeList.name}
              </h2>
              <p className="text-sm text-zinc-500">{activeList.description}</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20">
              <span className="text-xs font-semibold text-indigo-400 font-mono">
                {activeList.signalStrength}
              </span>
              <span className="text-[10px] text-indigo-400/70">strength</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-zinc-500">
            <span>{activeList.companyCount} companies</span>
            <span>{activeList.region}</span>
            <span>{activeList.sector}</span>
            <span>{listSignals.length} active signals</span>
          </div>
        </div>

        <div className="space-y-3">
          {listCompanies.map((company, i) => {
            const companySignals = listSignals.filter(
              (s) => s.companyId === company.id
            );
            return (
              <div
                key={company.id}
                onClick={() => onCompanyClick(company)}
                className="cursor-pointer rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4 hover:bg-zinc-800/80 hover:border-zinc-700/60 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-[15px] font-semibold text-zinc-100">
                      {company.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
                      <MapPin className="h-3 w-3" />
                      {company.city}, {company.state}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1 text-zinc-500">
                      <Users className="h-3 w-3" />
                      {company.headcount.toLocaleString()}
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-1 font-mono font-medium",
                        company.headcountGrowth >= 20
                          ? "text-emerald-400"
                          : "text-zinc-400"
                      )}
                    >
                      <TrendingUp className="h-3 w-3" />+
                      {company.headcountGrowth}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {companySignals.map((s) => (
                    <span
                      key={s.id}
                      className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50"
                    >
                      {s.headline}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
          Pre-Built Lists
        </h2>
        <span className="text-xs text-zinc-600 font-mono">
          {signalLists.length} active lists
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {signalLists.map((list, i) => (
          <div
            key={list.id}
            onClick={() => setActiveList(list)}
            className="group cursor-pointer rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-5 hover:bg-zinc-800/80 hover:border-zinc-700/60 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[15px] font-semibold text-zinc-100 group-hover:text-white transition-colors">
                {list.name}
              </h3>
              <div
                className={cn(
                  "flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono font-semibold",
                  list.signalStrength >= 90
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : list.signalStrength >= 80
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    : "bg-zinc-800 text-zinc-400 border border-zinc-700/50"
                )}
              >
                {list.signalStrength}
              </div>
            </div>

            <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
              {list.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {list.companyCount} companies
                </span>
                <span>{list.region}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-zinc-600">
                <Calendar className="h-3 w-3" />
                Updated {list.lastUpdated}
              </div>
            </div>

            <div className="flex items-center gap-1.5 mt-3 flex-wrap">
              {list.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-500 border border-zinc-700/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
