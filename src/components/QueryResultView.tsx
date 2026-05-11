"use client";

import {
  Sparkles,
  X,
  MapPin,
  Users,
  TrendingUp,
  Building2,
} from "lucide-react";
import type { Company, QueryConsoleExample } from "@/types";
import { cn } from "@/lib/utils";
import { useMarket } from "@/context/MarketContext";

interface QueryResultViewProps {
  query: QueryConsoleExample;
  onClear: () => void;
  onCompanyClick: (company: Company) => void;
}

export function QueryResultView({ query, onClear, onCompanyClick }: QueryResultViewProps) {
  const { market, persona } = useMarket();
  const { companies, signals, vocab } = market;

  const matchedCompanies = query.companyIds
    .map((id) => companies.find((c) => c.id === id))
    .filter((c): c is Company => c !== undefined);

  return (
    <div>
      {/* Query banner */}
      <div className="rounded-xl bg-gradient-to-r from-indigo-500/10 via-violet-500/5 to-transparent border border-indigo-500/20 px-5 py-4 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <Sparkles className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] text-indigo-300/80 uppercase tracking-wider font-medium">
                  Query result · {market.label} · {persona.label}
                </span>
              </div>
              <h2 className="text-base font-semibold text-zinc-100 mb-0.5">
                {query.label}
              </h2>
              {query.subtext && (
                <p className="text-sm text-zinc-500 leading-snug">{query.subtext}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/60 border border-zinc-700/50 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors shrink-0"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        </div>

        <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500 pl-7">
          <span className="font-mono">
            <span className="text-indigo-300 font-medium">{query.totalCount.toLocaleString()}</span>{" "}
            {vocab.listsItemEntityLabel} match
          </span>
          <span className="text-zinc-700">·</span>
          <span>Showing top {matchedCompanies.length}</span>
          <span className="text-zinc-700">·</span>
          <span>You said: <span className="italic text-zinc-400">&ldquo;{query.trigger}&rdquo;</span></span>
        </div>
      </div>

      {/* Result cards */}
      {matchedCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {matchedCompanies.map((company) => {
            const companyEvents = signals.filter((s) => s.companyId === company.id);
            return (
              <div
                key={company.id}
                onClick={() => onCompanyClick(company)}
                className="cursor-pointer rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4 hover:bg-zinc-800/80 hover:border-indigo-500/30 transition-all"
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
                  <span className="flex items-center gap-0.5">
                    <Users className="h-2.5 w-2.5" />
                    {company.headcount.toLocaleString()}
                  </span>
                  <span>·</span>
                  <span
                    className={cn(
                      "font-mono",
                      company.headcountGrowth >= 20 ? "text-emerald-400" : "text-zinc-500"
                    )}
                  >
                    <TrendingUp className="inline h-2.5 w-2.5" />+{company.headcountGrowth}%
                  </span>
                </div>

                <div className="flex items-center gap-1.5 mb-3">
                  <Building2 className="h-3 w-3 text-zinc-600" />
                  <span className="text-[11px] text-zinc-500 truncate">{company.sector}</span>
                </div>

                {companyEvents.length > 0 && (
                  <div className="rounded-lg bg-zinc-950/50 border border-zinc-800/30 px-3 py-2 mb-2">
                    {companyEvents.slice(0, 2).map((e) => (
                      <div key={e.id} className="text-[11px] text-zinc-400 truncate py-0.5">
                        <span className="text-emerald-400/80 mr-1">•</span>
                        {e.headline}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1.5 flex-wrap">
                  {company.jobPostings.slice(0, 2).map((posting) => (
                    <span
                      key={posting.title}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 truncate max-w-full"
                    >
                      {posting.title}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl bg-zinc-900/40 border border-zinc-800/30 px-6 py-10 text-center text-sm text-zinc-500">
          No matching {vocab.listsItemEntityLabel} surfaced in the current sample. The full cohort has{" "}
          <span className="font-mono text-zinc-300">{query.totalCount.toLocaleString()}</span>{" "}
          {vocab.listsItemEntityLabel}.
        </div>
      )}
    </div>
  );
}
