"use client";

import { MarketInsight } from "./MarketInsight";
import { SignalCard } from "./SignalCard";
import { formatCurrency } from "@/lib/utils";
import type { Company } from "@/types";
import { FileCheck2, DollarSign, Building2 } from "lucide-react";
import { useMarket } from "@/context/MarketContext";

interface ContractWinnersViewProps {
  onCompanyClick: (company: Company) => void;
}

export function ContractWinnersView({ onCompanyClick }: ContractWinnersViewProps) {
  const { market } = useMarket();
  const { signals, companies, vocab } = market;
  const filterTypes = vocab.contractsTabFilterTypes;

  const contractSignals = [...signals]
    .filter((s) => filterTypes.includes(s.type))
    .sort((a, b) => a.daysAgo - b.daysAgo);

  const totalValue = contractSignals.reduce((sum, s) => sum + (s.value || 0), 0);
  const uniqueWinners = new Set(contractSignals.map((s) => s.companyId)).size;

  const formatTotal = (n: number) =>
    vocab.contractsTabValueFormat === "currency"
      ? formatCurrency(n)
      : `${n.toLocaleString()} ${vocab.contractsTabValueUnit || ""}`.trim();

  return (
    <div>
      <MarketInsight />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">{vocab.contractsTabStats.total}</span>
          </div>
          <div className="text-xl font-bold font-mono text-emerald-400">{formatTotal(totalValue)}</div>
          <div className="text-[11px] text-zinc-600 mt-1">{vocab.contractsTabStats.totalSub}</div>
        </div>
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileCheck2 className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">{vocab.contractsTabStats.count}</span>
          </div>
          <div className="text-xl font-bold font-mono text-zinc-100">{contractSignals.length}</div>
          <div className="text-[11px] text-zinc-600 mt-1">{vocab.contractsTabStats.countSub}</div>
        </div>
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">{vocab.contractsTabStats.winners}</span>
          </div>
          <div className="text-xl font-bold font-mono text-zinc-100">{uniqueWinners}</div>
          <div className="text-[11px] text-zinc-600 mt-1">{vocab.contractsTabStats.winnersSub}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
          {vocab.contractsTabHeading}
        </h2>
        <span className="text-xs text-zinc-600 font-mono">
          {contractSignals.length} {vocab.contractsTabCounterLabel}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {contractSignals.map((signal) => (
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
