"use client";

import {
  MapPin,
  Filter,
} from "lucide-react";
import type { Company, Signal } from "@/types";
import { formatCurrency, cn } from "@/lib/utils";
import { useMarket } from "@/context/MarketContext";
import { getIcon } from "@/lib/icons";

interface GCDemoViewProps {
  onCompanyClick: (company: Company) => void;
}

interface CompanyCardProps {
  company: Company;
  signals: Signal[];
  onClick: () => void;
  isCurrency: boolean;
}

function CompanyCard({ company, signals, onClick, isCurrency }: CompanyCardProps) {
  const companyEvents = signals.filter((s) => s.companyId === company.id);
  const eventValueTotal = companyEvents.reduce((sum, s) => sum + (s.value || 0), 0);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4 hover:bg-zinc-800/80 hover:border-zinc-700/60 transition-all"
    >
      <h3 className="text-[14px] font-semibold text-zinc-100 mb-1">
        {company.name}
      </h3>
      <div className="flex items-center gap-2 text-[11px] text-zinc-500 mb-3">
        <span className="flex items-center gap-1">
          <MapPin className="h-2.5 w-2.5" />
          {company.city}, {company.state}
        </span>
        <span>·</span>
        <span>{company.headcount.toLocaleString()} PU</span>
        <span>·</span>
        <span className={cn("font-mono", company.headcountGrowth >= 20 ? "text-emerald-400" : "text-zinc-500")}>
          +{company.headcountGrowth}%
        </span>
      </div>

      {companyEvents.length > 0 && (
        <div className="rounded-lg bg-zinc-950/50 border border-zinc-800/30 px-3 py-2.5 mb-3">
          {companyEvents.map((c) => (
            <div key={c.id} className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center gap-1.5 text-zinc-400 min-w-0">
                <span className="truncate">{c.headline}</span>
              </div>
              {c.value !== undefined && (
                <span className="font-mono font-semibold text-emerald-400 shrink-0 ml-2">
                  {isCurrency ? formatCurrency(c.value) : `${c.value} ${c.metric || ""}`.trim()}
                </span>
              )}
            </div>
          ))}
          {companyEvents.length > 1 && isCurrency && (
            <div className="flex items-center justify-between text-xs pt-1 mt-1 border-t border-zinc-800/40">
              <span className="text-zinc-600">total</span>
              <span className="font-mono font-semibold text-emerald-400">{formatCurrency(eventValueTotal)}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-1.5 flex-wrap">
        {company.jobPostings.slice(0, 3).map((posting) => (
          <span
            key={posting.title}
            className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20"
          >
            {posting.title}{posting.count > 1 ? ` (${posting.count})` : ""}
          </span>
        ))}
        {company.jobPostings.length > 3 && (
          <span className="text-[10px] text-zinc-600">
            +{company.jobPostings.length - 3}
          </span>
        )}
      </div>
    </div>
  );
}

export function GCDemoView({ onCompanyClick }: GCDemoViewProps) {
  const { market, persona } = useMarket();
  const { signals, companies, vocab } = market;
  const filterTypes = vocab.demoTabFilterTypes || vocab.contractsTabFilterTypes;
  const isCurrency = vocab.contractsTabValueFormat === "currency";

  // Persona can override demo title, subtitle, pills, and section grouping
  const demoTitle = persona.demoTitleOverride ?? vocab.demoTabTitle;
  const demoSubtitle = persona.demoSubtitleOverride ?? vocab.demoTabSubtitle;
  const demoPills = persona.demoPillsOverride ?? vocab.demoTabPills;
  const demoSections = persona.demoSectionsOverride ?? vocab.demoTabSections;

  // Filter signals to the demo's signal types
  const eventSignals = [...signals]
    .filter((s) => filterTypes.includes(s.type))
    .sort((a, b) => a.daysAgo - b.daysAgo);

  const eventCompanyIds = [...new Set(eventSignals.map((s) => s.companyId))];
  const eventCompanies = eventCompanyIds
    .map((id) => companies.find((c) => c.id === id))
    .filter(Boolean) as Company[];

  const totalValue = eventSignals.reduce((sum, s) => sum + (s.value || 0), 0);
  const avgValue = eventSignals.length > 0 ? totalValue / eventSignals.length : 0;
  const totalOpenRoles = eventCompanies.reduce(
    (sum, c) => sum + c.jobPostings.reduce((s, p) => s + p.count, 0),
    0
  );

  const formatStat = (n: number) =>
    isCurrency ? formatCurrency(n) : `${Math.round(n).toLocaleString()} ${vocab.contractsTabValueUnit || ""}`.trim();

  return (
    <div>
      {/* Query Header */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 mb-6">
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-xs text-indigo-400 font-medium uppercase tracking-wider">
              {vocab.demoTabFilterEyebrow}
            </span>
          </div>

          <h1 className="text-xl font-semibold text-zinc-100 mb-3">
            {demoTitle}
          </h1>

          <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
            {demoSubtitle}
          </p>
        </div>

        <div className="px-6 pb-5 pt-2 flex items-center gap-2 flex-wrap">
          {demoPills.map((pill) => (
            <span
              key={pill}
              className="text-[11px] px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Inline Stats */}
        <div className="grid grid-cols-4 border-t border-zinc-800/60">
          <div className="px-6 py-4 border-r border-zinc-800/40">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">
              {vocab.demoTabStats.total}
            </div>
            <div className="text-xl font-bold font-mono text-emerald-400">
              {formatStat(totalValue)}
            </div>
          </div>
          <div className="px-6 py-4 border-r border-zinc-800/40">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">
              {vocab.demoTabStats.avg}
            </div>
            <div className="text-xl font-bold font-mono text-zinc-100">
              {formatStat(avgValue)}
            </div>
          </div>
          <div className="px-6 py-4 border-r border-zinc-800/40">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">
              {vocab.demoTabStats.entities}
            </div>
            <div className="text-xl font-bold font-mono text-zinc-100">
              {eventCompanies.length}
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">
              {vocab.demoTabStats.activity}
            </div>
            <div className="text-xl font-bold font-mono text-zinc-100">
              {totalOpenRoles}
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      {demoSections.map((section) => {
        let sectionCompanies: Company[];
        if (section.companyIds && section.companyIds.length > 0) {
          // Explicit-ID match (FMCSA cohort sections)
          sectionCompanies = section.companyIds
            .map((id) => companies.find((c) => c.id === id))
            .filter(Boolean) as Company[];
        } else {
          // Sector match (govt sections)
          const match = section.sectorMatch || [];
          sectionCompanies = eventCompanies.filter((c) => match.includes(c.sector));
        }

        if (sectionCompanies.length === 0) return null;
        const Icon = getIcon(section.icon);

        return (
          <div key={section.id} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Icon className={cn("h-4 w-4", section.color)} />
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                {section.label}
              </h2>
              <span className="text-[11px] text-zinc-600 ml-2">{section.subtext}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {sectionCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  signals={eventSignals}
                  onClick={() => onCompanyClick(company)}
                  isCurrency={isCurrency}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
