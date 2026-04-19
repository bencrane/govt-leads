"use client";

import { motion } from "framer-motion";
import {
  X,
  MapPin,
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
  Briefcase,
  FileCheck2,
} from "lucide-react";
import type { Company } from "@/types";
import { signals } from "@/data";
import { formatCurrency, timeAgo, cn } from "@/lib/utils";

interface CompanyDossierProps {
  company: Company;
  onClose: () => void;
}

const signalTypeColor: Record<string, string> = {
  contract_win: "text-emerald-400",
  hiring_surge: "text-blue-400",
  expansion: "text-amber-400",
  funding: "text-violet-400",
};

export function CompanyDossier({ company, onClose }: CompanyDossierProps) {
  const companySignals = signals.filter((s) => s.companyId === company.id);
  const totalJobPostings = company.jobPostings.reduce(
    (sum, p) => sum + p.count,
    0
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-zinc-950 border-l border-zinc-800/60 z-50 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-zinc-800/60">
          <div className="pr-4">
            <h2 className="text-lg font-semibold text-zinc-100 mb-1">
              {company.name}
            </h2>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <MapPin className="h-3.5 w-3.5" />
              <span>
                {company.city}, {company.state}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 text-xs border border-zinc-700/50">
                {company.sector}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Key Stats */}
          <div className="grid grid-cols-4 gap-px bg-zinc-800/40 border-b border-zinc-800/60">
            {[
              {
                label: "Headcount",
                value: company.headcount.toLocaleString(),
                icon: Users,
              },
              {
                label: "YoY Growth",
                value: `+${company.headcountGrowth}%`,
                icon: TrendingUp,
                highlight: company.headcountGrowth >= 20,
              },
              {
                label: "Revenue",
                value: company.revenueEstimate,
                icon: DollarSign,
              },
              {
                label: "Open Roles",
                value: totalJobPostings.toString(),
                icon: Briefcase,
              },
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-950 p-4 text-center">
                <stat.icon className="h-3.5 w-3.5 text-zinc-600 mx-auto mb-1.5" />
                <div
                  className={cn(
                    "text-base font-semibold font-mono",
                    stat.highlight ? "text-emerald-400" : "text-zinc-100"
                  )}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] text-zinc-600 uppercase tracking-wider mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Signals */}
          {companySignals.length > 0 && (
            <div className="p-5 border-b border-zinc-800/60">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                Recent Signals
              </h3>
              <div className="space-y-2.5">
                {companySignals.map((signal) => (
                  <div
                    key={signal.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/40"
                  >
                    <FileCheck2
                      className={cn(
                        "h-4 w-4 mt-0.5 shrink-0",
                        signalTypeColor[signal.type]
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-zinc-200">{signal.headline}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {signal.value && (
                          <span
                            className={cn(
                              "text-xs font-mono font-medium",
                              signalTypeColor[signal.type]
                            )}
                          >
                            {signal.metric === "open roles"
                              ? `${signal.value} roles`
                              : formatCurrency(signal.value)}
                          </span>
                        )}
                        <span className="text-[11px] text-zinc-600">
                          {timeAgo(signal.daysAgo)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Job Postings */}
          <div className="p-5 border-b border-zinc-800/60">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Active Job Postings
            </h3>
            <div className="space-y-1.5">
              {company.jobPostings.map((posting, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-zinc-900/60 transition-colors"
                >
                  <div>
                    <span className="text-sm text-zinc-200">
                      {posting.title}
                    </span>
                    <span className="text-xs text-zinc-600 ml-2">
                      {posting.location}
                    </span>
                  </div>
                  <span className="text-sm font-mono font-medium text-blue-400">
                    {posting.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Company Info */}
          <div className="p-5">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Company Details
            </h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Founded</span>
                <span className="text-zinc-300 font-mono">
                  {company.yearFounded}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Sector</span>
                <span className="text-zinc-300">{company.sector}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Revenue Estimate</span>
                <span className="text-zinc-300 font-mono">
                  {company.revenueEstimate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Headquarters</span>
                <span className="text-zinc-300">
                  {company.city}, {company.state}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
