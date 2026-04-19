"use client";

import { MarketInsight } from "./MarketInsight";
import { SignalCard } from "./SignalCard";
import { signals, companies } from "@/data";
import type { Company } from "@/types";

interface SignalsViewProps {
  onCompanyClick: (company: Company) => void;
}

export function SignalsView({ onCompanyClick }: SignalsViewProps) {
  const sortedSignals = [...signals].sort((a, b) => a.daysAgo - b.daysAgo);

  return (
    <div>
      <MarketInsight />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
          Recent Signals
        </h2>
        <span className="text-xs text-zinc-600 font-mono">
          {signals.length} signals tracked
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sortedSignals.map((signal) => (
          <SignalCard
            key={signal.id}
            signal={signal}
            onClick={() => {
              const company = companies.find((c) => c.id === signal.companyId);
              if (company) onCompanyClick(company);
            }}
          />
        ))}
      </div>
    </div>
  );
}
