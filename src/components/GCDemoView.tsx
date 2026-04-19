"use client";

import {
  FileCheck2,
  DollarSign,
  MapPin,
  Calendar,
  Filter,
  TrendingUp,
  Users,
  Anchor,
  Factory,
  Plane,
} from "lucide-react";
import { signals, companies } from "@/data";
import type { Company } from "@/types";
import { formatCurrency, timeAgo, cn } from "@/lib/utils";

interface GCDemoViewProps {
  onCompanyClick: (company: Company) => void;
}

function CompanyCard({
  company,
  onClick,
}: {
  company: Company;
  onClick: () => void;
}) {
  const companyContracts = signals.filter(
    (s) => s.companyId === company.id && s.type === "contract_win"
  );
  const contractValue = companyContracts.reduce(
    (sum, s) => sum + (s.value || 0),
    0
  );
  const totalRoles = company.jobPostings.reduce(
    (sum, p) => sum + p.count,
    0
  );

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
        <span>{company.headcount.toLocaleString()} emp</span>
        <span>·</span>
        <span className={cn("font-mono", company.headcountGrowth >= 20 ? "text-emerald-400" : "text-zinc-500")}>
          +{company.headcountGrowth}%
        </span>
      </div>

      <div className="rounded-lg bg-zinc-950/50 border border-zinc-800/30 px-3 py-2.5 mb-3">
        {companyContracts.map((c) => (
          <div key={c.id} className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-1.5 text-zinc-400 min-w-0">
              <FileCheck2 className="h-3 w-3 text-emerald-500/60 shrink-0" />
              <span className="truncate">{c.headline}</span>
            </div>
            <span className="font-mono font-semibold text-emerald-400 shrink-0 ml-2">
              {formatCurrency(c.value || 0)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {company.jobPostings.slice(0, 3).map((posting) => (
          <span
            key={posting.title}
            className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20"
          >
            {posting.title} ({posting.count})
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
  const targetSectors = ["Manufacturing", "Aerospace", "Maritime"];
  const contractSignals = [...signals]
    .filter(
      (s) =>
        s.type === "contract_win" &&
        targetSectors.some(
          (sec) =>
            s.sector === sec ||
            companies.find((c) => c.id === s.companyId)?.sector === sec
        )
    )
    .sort((a, b) => a.daysAgo - b.daysAgo);

  const contractCompanyIds = [
    ...new Set(contractSignals.map((s) => s.companyId)),
  ];
  const allCompanies = contractCompanyIds
    .map((id) => companies.find((c) => c.id === id))
    .filter(Boolean) as Company[];

  const totalValue = contractSignals.reduce(
    (sum, s) => sum + (s.value || 0),
    0
  );
  const avgValue =
    contractSignals.length > 0 ? totalValue / contractSignals.length : 0;
  const totalOpenRoles = allCompanies.reduce(
    (sum, c) => sum + c.jobPostings.reduce((s, p) => s + p.count, 0),
    0
  );

  // Group companies by theme
  const mfgCompanies = allCompanies.filter((c) => c.sector === "Manufacturing");
  const aeroCompanies = allCompanies.filter((c) => c.sector === "Aerospace");
  const maritimeCompanies = allCompanies.filter((c) => c.sector === "Maritime");

  const targetRoles = [
    "CNC Machinist",
    "Welder",
    "Structural Welder",
    "Shipfitter",
    "Fabricator",
    "Aerospace Machinist",
  ];

  return (
    <div>
      {/* Query Header */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 mb-6">
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-xs text-indigo-400 font-medium uppercase tracking-wider">
              Filtered View
            </span>
          </div>

          <h1 className="text-xl font-semibold text-zinc-100 mb-3">
            Manufacturing & Industrial — Recent Contract Winners Hiring Skilled
            Trades
          </h1>

          <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
            Companies in manufacturing, aerospace, and maritime that won federal
            contracts in the last 60 days and are actively posting for welders,
            machinists, fabricators, and related trades
          </p>
        </div>

        <div className="px-6 pb-5 pt-2 flex items-center gap-2 flex-wrap">
          {targetRoles.map((role) => (
            <span
              key={role}
              className="text-[11px] px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
            >
              {role}
            </span>
          ))}
        </div>

        {/* Inline Stats */}
        <div className="grid grid-cols-4 border-t border-zinc-800/60">
          <div className="px-6 py-4 border-r border-zinc-800/40">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">
              Total Awarded
            </div>
            <div className="text-xl font-bold font-mono text-emerald-400">
              {formatCurrency(totalValue)}
            </div>
          </div>
          <div className="px-6 py-4 border-r border-zinc-800/40">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">
              Avg Contract
            </div>
            <div className="text-xl font-bold font-mono text-zinc-100">
              {formatCurrency(avgValue)}
            </div>
          </div>
          <div className="px-6 py-4 border-r border-zinc-800/40">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">
              Companies
            </div>
            <div className="text-xl font-bold font-mono text-zinc-100">
              {allCompanies.length}
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">
              Open Roles
            </div>
            <div className="text-xl font-bold font-mono text-zinc-100">
              {totalOpenRoles}
            </div>
          </div>
        </div>
      </div>

      {/* Section: Heavy Manufacturing & Fabrication */}
      {mfgCompanies.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Factory className="h-4 w-4 text-blue-400" />
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
              Heavy Manufacturing & Fabrication
            </h2>
            <span className="text-[11px] text-zinc-600 ml-2">
              Welders, machinists, fabricators needed
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {mfgCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onClick={() => onCompanyClick(company)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Section: Aerospace & Defense Production */}
      {aeroCompanies.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Plane className="h-4 w-4 text-violet-400" />
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
              Aerospace & Defense Production
            </h2>
            <span className="text-[11px] text-zinc-600 ml-2">
              Aerospace machinists, avionics techs, assembly
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {aeroCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onClick={() => onCompanyClick(company)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Section: Maritime & Shipbuilding */}
      {maritimeCompanies.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Anchor className="h-4 w-4 text-cyan-400" />
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
              Maritime & Shipbuilding
            </h2>
            <span className="text-[11px] text-zinc-600 ml-2">
              Shipfitters, marine welders, pipe fitters
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {maritimeCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onClick={() => onCompanyClick(company)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
