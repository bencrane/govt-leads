"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion"; // AnimatePresence still used for drawer
import {
  Crosshair,
  Target,
  ChevronDown,
  Check,
  ArrowLeft,
  Lock,
  X,
  FolderOpen,
  CornerDownRight,
  Sparkles,
  MapPin,
  Users,
  TrendingUp,
  Globe2,
} from "lucide-react";
import { MarketProvider, useMarket } from "@/context/MarketContext";
import type {
  Company,
  ComposeFilterGroup,
  ComposeFilterOption,
  LockedSpec,
} from "@/types";
import { cn } from "@/lib/utils";

const SPECS_STORAGE_KEY = "bullseye:locked-specs";

// ─────────────────────────────────────────────────────────────────
// Selectivity math + entity matching
// ─────────────────────────────────────────────────────────────────

function computeEstimatedCount(
  selected: Record<string, string[]>,
  filters: ComposeFilterGroup[],
  basePopulation: number
): number {
  let count = basePopulation;
  for (const group of filters) {
    const sel = selected[group.id] || [];
    if (sel.length === 0) continue;
    const groupSelectivity = group.options
      .filter((o) => sel.includes(o.id))
      .reduce((sum, o) => sum + o.selectivity, 0);
    count = count * Math.min(groupSelectivity, 1);
  }
  return Math.round(count);
}

function computeMatchingCompanies(
  selected: Record<string, string[]>,
  filters: ComposeFilterGroup[],
  companies: Company[]
): Company[] {
  let matchingIds: Set<string> | null = null;
  for (const group of filters) {
    const sel = selected[group.id] || [];
    if (sel.length === 0) continue;
    const groupSet = new Set<string>();
    for (const opt of group.options) {
      if (sel.includes(opt.id)) {
        opt.matchCompanyIds.forEach((id) => groupSet.add(id));
      }
    }
    if (matchingIds === null) {
      matchingIds = groupSet;
    } else {
      const existing: Set<string> = matchingIds;
      matchingIds = new Set(Array.from(existing).filter((id) => groupSet.has(id)));
    }
  }
  if (matchingIds === null) return companies;
  return companies.filter((c) => matchingIds!.has(c.id));
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 10_000) return `${(n / 1_000).toFixed(0)}K`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function buildFilterLabels(
  selected: Record<string, string[]>,
  filters: ComposeFilterGroup[]
): { groupLabel: string; optionLabels: string[] }[] {
  const out: { groupLabel: string; optionLabels: string[] }[] = [];
  for (const group of filters) {
    const sel = selected[group.id] || [];
    if (sel.length === 0) continue;
    const optionLabels = group.options
      .filter((o) => sel.includes(o.id))
      .map((o) => o.label);
    out.push({ groupLabel: group.label, optionLabels });
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────
// FilterChip — single chip in a multi/single group
// ─────────────────────────────────────────────────────────────────

interface FilterChipProps {
  option: ComposeFilterOption;
  active: boolean;
  onClick: () => void;
}

function FilterChip({ option, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex items-center gap-2 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-all text-left",
        active
          ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-200 shadow-[inset_0_0_0_1px_rgba(99,102,241,0.15)]"
          : "bg-zinc-900/60 border-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 hover:border-zinc-700"
      )}
    >
      <div
        className={cn(
          "h-3 w-3 rounded-sm flex items-center justify-center transition-colors shrink-0",
          active ? "bg-indigo-500" : "border border-zinc-700"
        )}
      >
        {active && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
      </div>
      <span className="flex-1">{option.label}</span>
      {option.hint && (
        <span className="text-[10px] text-zinc-600 group-hover:text-zinc-500 transition-colors hidden lg:inline">
          {option.hint}
        </span>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
// Filter sidebar
// ─────────────────────────────────────────────────────────────────

interface FilterSidebarProps {
  filters: ComposeFilterGroup[];
  selected: Record<string, string[]>;
  onToggle: (groupId: string, optionId: string, type: "multi" | "single") => void;
  onClearAll: () => void;
}

function FilterSidebar({ filters, selected, onToggle, onClearAll }: FilterSidebarProps) {
  const totalSelected = Object.values(selected).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="w-[360px] shrink-0 border-r border-zinc-800/60 bg-zinc-950/30 h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto">
      <div className="px-5 py-4 border-b border-zinc-800/60 sticky top-0 bg-zinc-950/90 backdrop-blur-xl z-10 flex items-center justify-between">
        <div>
          <h2 className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">
            Audience Filters
          </h2>
          <p className="text-[10px] text-zinc-600 mt-0.5">
            {totalSelected > 0
              ? `${totalSelected} active filter${totalSelected === 1 ? "" : "s"}`
              : "Compose with chip groups below"}
          </p>
        </div>
        {totalSelected > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded border border-zinc-800/60 hover:border-zinc-700 transition-colors"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="px-5 py-4 space-y-6">
        {filters.map((group) => (
          <div key={group.id}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-300">
                {group.label}
              </span>
              <span className="text-[10px] text-zinc-700">
                {group.type === "multi" ? "any" : "one"}
              </span>
            </div>
            {group.helpText && (
              <p className="text-[10px] text-zinc-600 mb-2 leading-relaxed">
                {group.helpText}
              </p>
            )}
            <div className="flex flex-col gap-1.5">
              {group.options.map((opt) => (
                <FilterChip
                  key={opt.id}
                  option={opt}
                  active={(selected[group.id] || []).includes(opt.id)}
                  onClick={() => onToggle(group.id, opt.id, group.type)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Preview card for a matching entity
// ─────────────────────────────────────────────────────────────────

function PreviewCard({ company, sizeLabel }: { company: Company; sizeLabel: string }) {
  return (
    <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4 hover:border-indigo-500/30 transition-all">
      <h3 className="text-sm font-semibold text-zinc-100 mb-1 line-clamp-1">
        {company.name}
      </h3>
      <div className="flex items-center gap-2 text-[11px] text-zinc-500 mb-3 flex-wrap">
        <span className="flex items-center gap-1">
          <MapPin className="h-2.5 w-2.5" />
          {company.city}, {company.state}
        </span>
        <span className="text-zinc-700">·</span>
        <span className="flex items-center gap-0.5">
          <Users className="h-2.5 w-2.5" />
          {company.headcount.toLocaleString()} {sizeLabel.toLowerCase()}
        </span>
        <span className="text-zinc-700">·</span>
        <span
          className={cn(
            "font-mono",
            company.headcountGrowth >= 20 ? "text-emerald-400" : "text-zinc-500"
          )}
        >
          <TrendingUp className="inline h-2.5 w-2.5" />+{company.headcountGrowth}%
        </span>
      </div>
      <div className="text-[11px] text-zinc-500 mb-2 truncate">{company.sector}</div>
      <div className="text-[10px] text-zinc-600 truncate">
        {company.jobPostings[0]?.title || ""}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Locked-specs drawer
// ─────────────────────────────────────────────────────────────────

function LockedSpecsDrawer({
  open,
  onClose,
  specs,
  onRemove,
}: {
  open: boolean;
  onClose: () => void;
  specs: LockedSpec[];
  onRemove: (id: string) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
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
            className="fixed inset-y-0 right-0 w-full sm:w-[520px] bg-zinc-950 border-l border-zinc-800/60 z-50 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-5 border-b border-zinc-800/60">
              <div>
                <h2 className="text-base font-semibold text-zinc-100">Locked Specs</h2>
                <p className="text-[11px] text-zinc-600 mt-0.5">
                  {specs.length} audience{specs.length === 1 ? "" : "s"} locked in this session
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {specs.length === 0 ? (
                <div className="text-sm text-zinc-500 text-center py-10">
                  No specs locked yet. Compose filters on the left, then click <span className="text-zinc-300">Lock spec</span>.
                </div>
              ) : (
                specs.map((spec) => (
                  <div
                    key={spec.id}
                    className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-zinc-100 mb-1 line-clamp-2">
                          {spec.name}
                        </div>
                        <div className="text-[11px] text-zinc-600 flex items-center gap-2">
                          <span>{spec.marketLabel}</span>
                          <span className="text-zinc-700">·</span>
                          <span>{spec.personaLabel}</span>
                          <span className="text-zinc-700">·</span>
                          <span>{new Date(spec.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemove(spec.id)}
                        className="p-1 text-zinc-600 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors shrink-0 ml-2"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl font-bold font-mono text-emerald-400">
                        {spec.estimatedCount.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-zinc-500">{spec.basePopulationLabel}</span>
                    </div>

                    <div className="space-y-1.5">
                      {spec.filterLabels.map((fl, i) => (
                        <div key={i} className="text-[11px]">
                          <span className="text-zinc-600">{fl.groupLabel}:</span>{" "}
                          <span className="text-zinc-300">{fl.optionLabels.join(", ")}</span>
                        </div>
                      ))}
                      {spec.filterLabels.length === 0 && (
                        <div className="text-[11px] text-zinc-600 italic">
                          No filters — full population
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {specs.length > 0 && (
              <div className="border-t border-zinc-800/60 p-4 bg-zinc-950/60">
                <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-2">Session totals</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-zinc-500">Specs locked</div>
                    <div className="text-zinc-100 font-mono font-semibold">{specs.length}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">Audience reach</div>
                    <div className="text-zinc-100 font-mono font-semibold">
                      {specs.reduce((sum, s) => sum + s.estimatedCount, 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────
// Market selector pill (mini-version of Header's)
// ─────────────────────────────────────────────────────────────────

function MarketPill() {
  const { market, marketId, setMarketId, availableMarkets, persona, personaId, setPersonaId } = useMarket();
  const [marketOpen, setMarketOpen] = useState(false);
  const [personaOpen, setPersonaOpen] = useState(false);
  const marketRef = useRef<HTMLDivElement>(null);
  const personaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marketOpen && !personaOpen) return;
    const onClick = (e: MouseEvent) => {
      if (marketOpen && marketRef.current && !marketRef.current.contains(e.target as Node)) {
        setMarketOpen(false);
      }
      if (personaOpen && personaRef.current && !personaRef.current.contains(e.target as Node)) {
        setPersonaOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [marketOpen, personaOpen]);

  return (
    <div className="flex items-center gap-2">
      <div ref={marketRef} className="relative">
        <button
          onClick={() => { setMarketOpen((p) => !p); setPersonaOpen(false); }}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-all",
            marketOpen
              ? "bg-zinc-800 border-zinc-700 text-zinc-200"
              : "bg-zinc-900/60 border-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80"
          )}
        >
          <span className="text-zinc-600">·</span>
          <span>{market.label}</span>
          <ChevronDown className={cn("h-3 w-3 text-zinc-500 transition-transform", marketOpen && "rotate-180")} />
        </button>
        {marketOpen && (
          <div className="absolute left-0 top-full mt-1 w-56 rounded-lg bg-zinc-900 border border-zinc-700/60 shadow-2xl overflow-hidden py-1 z-50">
            {availableMarkets.map((m) => {
              const active = m.id === marketId;
              return (
                <button
                  key={m.id}
                  onClick={() => { setMarketId(m.id); setMarketOpen(false); }}
                  className={cn(
                    "flex w-full items-center justify-between px-3 py-2 text-sm transition-colors text-left",
                    active
                      ? "bg-indigo-500/10 text-indigo-300"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                  )}
                >
                  <span className="font-medium">{m.label}</span>
                  {active && <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div ref={personaRef} className="relative">
        <button
          onClick={() => { setPersonaOpen((p) => !p); setMarketOpen(false); }}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-all",
            personaOpen
              ? "bg-zinc-800 border-zinc-700 text-zinc-200"
              : "bg-zinc-900/60 border-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80"
          )}
        >
          <Target className="h-3 w-3 text-zinc-500" />
          <span>{persona.label}</span>
          <ChevronDown className={cn("h-3 w-3 text-zinc-500 transition-transform", personaOpen && "rotate-180")} />
        </button>
        {personaOpen && (
          <div className="absolute left-0 top-full mt-1 w-72 rounded-lg bg-zinc-900 border border-zinc-700/60 shadow-2xl overflow-hidden py-1 z-50">
            {market.personas.map((p) => {
              const active = p.id === personaId;
              return (
                <button
                  key={p.id}
                  onClick={() => { setPersonaId(p.id); setPersonaOpen(false); }}
                  className={cn(
                    "flex w-full items-start justify-between px-3 py-2.5 text-sm transition-colors text-left",
                    active
                      ? "bg-indigo-500/10 text-indigo-300"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                  )}
                >
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium">{p.label}</span>
                    <span className="text-[10px] text-zinc-600 mt-0.5 leading-snug">{p.blurb}</span>
                  </div>
                  {active && <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main compose shell
// ─────────────────────────────────────────────────────────────────

function ComposeContent() {
  const { market, marketId, persona, personaId } = useMarket();
  const { composeConfig, companies, vocab } = market;

  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [audienceName, setAudienceName] = useState("");
  const [specs, setSpecs] = useState<LockedSpec[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [justLocked, setJustLocked] = useState(false);

  // Reset selection when market changes
  useEffect(() => {
    setSelected({});
    setAudienceName("");
  }, [marketId]);

  // Hydrate specs from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(SPECS_STORAGE_KEY);
    if (stored) {
      try {
        setSpecs(JSON.parse(stored));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  // Persist specs whenever they change
  const persistSpecs = (next: LockedSpec[]) => {
    setSpecs(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SPECS_STORAGE_KEY, JSON.stringify(next));
    }
  };

  const handleToggle = (groupId: string, optionId: string, type: "multi" | "single") => {
    setSelected((prev) => {
      const current = prev[groupId] || [];
      if (type === "single") {
        return current.includes(optionId)
          ? { ...prev, [groupId]: [] }
          : { ...prev, [groupId]: [optionId] };
      }
      return {
        ...prev,
        [groupId]: current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      };
    });
  };

  const handleClearAll = () => setSelected({});

  const estimatedCount = useMemo(
    () => computeEstimatedCount(selected, composeConfig.filters, composeConfig.basePopulation),
    [selected, composeConfig.filters, composeConfig.basePopulation]
  );

  const matchingCompanies = useMemo(
    () => computeMatchingCompanies(selected, composeConfig.filters, companies),
    [selected, composeConfig.filters, companies]
  );

  const filterLabels = useMemo(
    () => buildFilterLabels(selected, composeConfig.filters),
    [selected, composeConfig.filters]
  );

  const hasFilters = Object.values(selected).some((arr) => arr.length > 0);

  const currentMarketSpecs = specs.filter((s) => s.marketId === marketId);

  const handleLockIn = () => {
    if (!hasFilters) return;
    const fallbackName =
      filterLabels
        .slice(0, 2)
        .map((fl) => fl.optionLabels[0])
        .filter(Boolean)
        .join(" + ") || "Untitled audience";
    const finalName = audienceName.trim() || fallbackName;

    const newSpec: LockedSpec = {
      id: `spec-${Date.now()}`,
      marketId,
      marketLabel: market.label,
      personaId,
      personaLabel: persona.label,
      name: finalName,
      filterSnapshot: { ...selected },
      filterLabels,
      estimatedCount,
      matchingCompanyIds: matchingCompanies.slice(0, 12).map((c) => c.id),
      basePopulationLabel: composeConfig.basePopulationLabel,
      createdAt: new Date().toISOString(),
    };
    persistSpecs([newSpec, ...specs]);
    setAudienceName("");
    setJustLocked(true);
    setTimeout(() => setJustLocked(false), 1200);
  };

  const handleRemoveSpec = (id: string) => {
    persistSpecs(specs.filter((s) => s.id !== id));
  };

  const handleUseSuggestedName = (name: string) => setAudienceName(name);

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="flex h-14 items-center px-5 max-w-[1800px] mx-auto">
          <Link href="/" className="flex items-center gap-2.5 group">
            <ArrowLeft className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
            <Crosshair className="h-5 w-5 text-indigo-400" />
            <span className="text-[15px] font-semibold tracking-tight text-zinc-100">
              Bullseye
            </span>
            <span className="text-zinc-700">/</span>
            <span className="text-[13px] text-zinc-400">Compose</span>
          </Link>

          <div className="ml-4">
            <MarketPill />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/globe"
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-zinc-400 hover:text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all"
              title="Open globe view"
            >
              <Globe2 className="h-4 w-4" />
            </Link>

            <button
              onClick={() => setDrawerOpen(true)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all",
                currentMarketSpecs.length > 0
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/15"
                  : "bg-zinc-800/60 border-zinc-700/50 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800"
              )}
            >
              <FolderOpen className="h-3.5 w-3.5" />
              <span>Locked Specs</span>
              {specs.length > 0 && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-md font-mono text-[10px] font-semibold",
                    currentMarketSpecs.length > 0
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-zinc-700/50 text-zinc-400"
                  )}
                >
                  {specs.length}
                </span>
              )}
            </button>

            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">
                Live
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <FilterSidebar
          filters={composeConfig.filters}
          selected={selected}
          onToggle={handleToggle}
          onClearAll={handleClearAll}
        />

        <main className="flex-1 px-8 py-6 max-w-[1440px]">
          {/* Big count + audience summary */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.06] via-violet-500/[0.04] to-transparent rounded-2xl pointer-events-none" />
            <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/40 px-8 py-7">
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="text-[10px] uppercase tracking-wider font-medium text-indigo-300">
                      Audience composition · live
                    </span>
                  </div>

                  <motion.div
                    key={estimatedCount}
                    initial={{ opacity: 0.5, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.16 }}
                    className="flex items-baseline gap-3 flex-wrap"
                  >
                    <span className="text-6xl font-bold font-mono text-zinc-50 leading-none">
                      {formatCount(estimatedCount)}
                    </span>
                    <span className="text-sm text-zinc-500">
                      of {composeConfig.basePopulation.toLocaleString()} {composeConfig.basePopulationLabel}
                    </span>
                  </motion.div>

                  <div className="mt-4 flex items-center gap-2 flex-wrap min-h-[20px]">
                    {filterLabels.length === 0 ? (
                      <span className="text-xs text-zinc-600 italic">
                        No filters applied — showing the full {composeConfig.basePopulationLabel} population
                      </span>
                    ) : (
                      filterLabels.map((fl, i) => (
                        <div key={i} className="flex items-center gap-1 text-[11px]">
                          <span className="text-zinc-600">{fl.groupLabel}:</span>
                          <span className="text-zinc-300 px-1.5 py-0.5 rounded bg-zinc-800/60 border border-zinc-700/40">
                            {fl.optionLabels.join(" + ")}
                          </span>
                          {i < filterLabels.length - 1 && (
                            <CornerDownRight className="h-3 w-3 text-zinc-700 mx-1" />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Lock-in bar */}
              <div className="mt-6 pt-5 border-t border-zinc-800/60">
                <div className="flex items-end gap-3 flex-wrap">
                  <div className="flex-1 min-w-[280px]">
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium mb-1.5 block">
                      Audience name
                    </label>
                    <input
                      type="text"
                      value={audienceName}
                      onChange={(e) => setAudienceName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && hasFilters) {
                          handleLockIn();
                        }
                      }}
                      placeholder="Name this audience for the partner"
                      className="w-full bg-zinc-950/60 border border-zinc-800/60 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-indigo-500/40 focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    onClick={handleLockIn}
                    disabled={!hasFilters}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all",
                      hasFilters
                        ? justLocked
                          ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-200"
                          : "bg-indigo-500/20 border-indigo-500/50 text-indigo-200 hover:bg-indigo-500/30 hover:border-indigo-500/70"
                        : "bg-zinc-900/40 border-zinc-800/40 text-zinc-700 cursor-not-allowed"
                    )}
                  >
                    {justLocked ? (
                      <>
                        <Check className="h-4 w-4" />
                        Spec locked
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Lock spec ({estimatedCount.toLocaleString()})
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                  <span className="text-[10px] text-zinc-600 uppercase tracking-wider mr-1">
                    Suggestions:
                  </span>
                  {composeConfig.exampleNames.map((name) => (
                    <button
                      key={name}
                      onClick={() => handleUseSuggestedName(name)}
                      className="text-[10px] px-2 py-1 rounded-md bg-zinc-800/60 border border-zinc-700/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 hover:border-zinc-700 transition-all"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview cards */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
                Sample match preview
              </h3>
              <span className="text-[11px] text-zinc-600 font-mono">
                {matchingCompanies.length === 0
                  ? "No sample entities match yet"
                  : `${matchingCompanies.length} sample entit${matchingCompanies.length === 1 ? "y" : "ies"}`}
              </span>
            </div>

            {matchingCompanies.length === 0 ? (
              <div className="rounded-xl bg-zinc-900/30 border border-zinc-800/30 px-6 py-12 text-center">
                <p className="text-sm text-zinc-500 mb-1">
                  Combine fewer filters or relax a group
                </p>
                <p className="text-[11px] text-zinc-600">
                  The estimated cohort still exists in the broader population — the dummy sample just doesn&apos;t have any entities meeting all current filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {matchingCompanies.slice(0, 12).map((company) => (
                  <PreviewCard
                    key={company.id}
                    company={company}
                    sizeLabel={vocab.sizeLabel}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <LockedSpecsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        specs={specs}
        onRemove={handleRemoveSpec}
      />
    </div>
  );
}

export default function ComposePage() {
  return (
    <MarketProvider>
      <ComposeContent />
    </MarketProvider>
  );
}
