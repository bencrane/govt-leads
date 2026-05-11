"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import {
  Crosshair,
  ArrowLeft,
  X,
  MapPin,
  Users,
  TrendingUp,
  ChevronDown,
  Check,
  Target,
  Sparkles,
  Globe2,
} from "lucide-react";
import { MarketProvider, useMarket } from "@/context/MarketContext";
import { getCoords } from "@/lib/geo";
import type { Company } from "@/types";
import { cn } from "@/lib/utils";

// Dynamically import the R3F scene with SSR disabled —
// react-three-fiber uses React's internal reconciler which doesn't run on the server.
const GlobeScene = dynamic(() => import("./GlobeScene"), {
  ssr: false,
  // Solid-dark loading state so the canvas appearing isn't a visible flash
  loading: () => <div className="h-full w-full bg-[#040714]" />,
});

// ─────────────────────────────────────────────────────────────────
// Info panel — slides in from right when an entity is selected
// ─────────────────────────────────────────────────────────────────

function InfoPanel({
  company,
  onClose,
}: {
  company: Company | null;
  onClose: () => void;
}) {
  const { market } = useMarket();
  const { vocab, signals } = market;

  return (
    <AnimatePresence>
      {company && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          className="fixed top-14 right-0 bottom-0 w-[420px] bg-zinc-950/95 backdrop-blur-xl border-l border-zinc-800/60 z-30 flex flex-col"
        >
          <div className="flex items-start justify-between p-5 border-b border-zinc-800/60">
            <div className="min-w-0 pr-4">
              <div className="flex items-center gap-1.5 text-[10px] text-indigo-300 uppercase tracking-wider font-medium mb-1.5">
                <Sparkles className="h-3 w-3" />
                <span>Selected entity · {market.label}</span>
              </div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-1 truncate">{company.name}</h2>
              <div className="flex items-center gap-2 text-xs text-zinc-500 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {company.city}, {company.state}
                </span>
                <span className="text-zinc-700">·</span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
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

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-4 gap-px bg-zinc-800/40 border-b border-zinc-800/60">
              {[
                { label: vocab.dossierStats.headcount, value: company.headcount.toLocaleString(), icon: Users },
                { label: vocab.dossierStats.growth, value: `+${company.headcountGrowth}%`, icon: TrendingUp, highlight: company.headcountGrowth >= 20 },
                { label: vocab.dossierStats.revenue, value: company.revenueEstimate, icon: Globe2 },
                { label: vocab.dossierStats.openRoles, value: company.jobPostings.reduce((s, p) => s + p.count, 0).toString(), icon: Sparkles },
              ].map((stat) => (
                <div key={stat.label} className="bg-zinc-950/80 p-3 text-center">
                  <stat.icon className="h-3 w-3 text-zinc-600 mx-auto mb-1" />
                  <div className={cn("text-sm font-mono font-semibold truncate", stat.highlight ? "text-emerald-400" : "text-zinc-100")}>
                    {stat.value}
                  </div>
                  <div className="text-[9px] text-zinc-600 uppercase tracking-wider mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {(() => {
              const companySignals = signals.filter((s) => s.companyId === company.id);
              if (companySignals.length === 0) return null;
              return (
                <div className="p-5 border-b border-zinc-800/60">
                  <h3 className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 mb-3">
                    {vocab.dossierSignalsHeader}
                  </h3>
                  <div className="space-y-2">
                    {companySignals.map((s) => (
                      <div key={s.id} className="text-xs text-zinc-300 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/40">
                        <div className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                          <div className="min-w-0">
                            <div className="text-zinc-200">{s.headline}</div>
                            {s.value !== undefined && (
                              <div className="text-[10px] text-zinc-500 mt-0.5 font-mono">
                                {s.value.toLocaleString()} {s.metric}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            <div className="p-5">
              <h3 className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 mb-3">
                {vocab.dossierActivityHeader}
              </h3>
              <div className="space-y-1">
                {company.jobPostings.map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 px-2 rounded text-xs hover:bg-zinc-900/60">
                    <div className="min-w-0">
                      <span className="text-zinc-200 truncate">{p.title}</span>
                      <span className="text-zinc-600 ml-2 text-[10px]">{p.location}</span>
                    </div>
                    <span className="text-[11px] font-mono font-medium text-indigo-400 shrink-0">{p.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────
// Market + persona selector pill (same pattern as compose page)
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
      if (marketOpen && marketRef.current && !marketRef.current.contains(e.target as Node)) setMarketOpen(false);
      if (personaOpen && personaRef.current && !personaRef.current.contains(e.target as Node)) setPersonaOpen(false);
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
            marketOpen ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-zinc-900/60 border-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80"
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
                    active ? "bg-indigo-500/10 text-indigo-300" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
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
            personaOpen ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-zinc-900/60 border-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80"
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
                    active ? "bg-indigo-500/10 text-indigo-300" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
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
// Main globe shell
// ─────────────────────────────────────────────────────────────────

function GlobeContent() {
  const { market, marketId } = useMarket();
  const { companies, vocab } = market;

  const [selected, setSelected] = useState<Company | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusCoords, setFocusCoords] = useState<[number, number] | null>(null);

  useEffect(() => {
    setSelected(null);
    setFocusCoords(null);
    setHoveredId(null);
  }, [marketId]);

  const handleSelect = (company: Company) => {
    setSelected(company);
    const coords = getCoords(company.city, company.state);
    if (coords) {
      setFocusCoords([coords[0], coords[1]]);
    }
  };

  const hoveredCompany = useMemo(
    () => (hoveredId ? companies.find((c) => c.id === hoveredId) : null),
    [hoveredId, companies]
  );

  const entityCount = useMemo(
    () => companies.filter((c) => getCoords(c.city, c.state)).length,
    [companies]
  );

  return (
    <div className="h-screen w-screen bg-[#040714] text-zinc-100 overflow-hidden relative">
      <header className="sticky top-0 z-40 w-full bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="flex h-14 items-center px-5 max-w-[1800px] mx-auto">
          <Link href="/" className="flex items-center gap-2.5 group">
            <ArrowLeft className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
            <Crosshair className="h-5 w-5 text-indigo-400" />
            <span className="text-[15px] font-semibold tracking-tight text-zinc-100">Bullseye</span>
            <span className="text-zinc-700">/</span>
            <span className="text-[13px] text-zinc-400">Globe</span>
          </Link>

          <div className="ml-4">
            <MarketPill />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="text-[11px] text-zinc-500 font-mono">
              <span className="text-indigo-300">{entityCount}</span> entities geolocated
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">Live</span>
            </div>
          </div>
        </div>
      </header>

      <div className="absolute inset-0 top-14">
        <GlobeScene
          companies={companies}
          selectedId={selected?.id || null}
          onHover={setHoveredId}
          onSelect={handleSelect}
          focusCoords={focusCoords}
        />
      </div>

      <div className="absolute top-[80px] left-5 z-20 pointer-events-none">
        <div className="rounded-xl bg-zinc-950/70 backdrop-blur-xl border border-zinc-800/60 px-4 py-3 max-w-[320px]">
          <div className="flex items-center gap-2 mb-1.5">
            <Globe2 className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-[10px] uppercase tracking-wider font-medium text-zinc-400">
              {market.label} · Entity Network
            </span>
          </div>
          {hoveredCompany ? (
            <div>
              <div className="text-sm font-semibold text-zinc-100 truncate">{hoveredCompany.name}</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">
                {hoveredCompany.city}, {hoveredCompany.state} · {hoveredCompany.sector}
              </div>
            </div>
          ) : (
            <div className="text-[11px] text-zinc-500">
              {entityCount} {vocab.entityNounPlural.toLowerCase()} plotted across the continental US
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-5 left-5 z-20 pointer-events-none">
        <div className="rounded-lg bg-zinc-950/60 backdrop-blur-xl border border-zinc-800/40 px-3 py-2 flex items-center gap-3 text-[10px] text-zinc-500">
          <span>drag to rotate</span>
          <span className="text-zinc-700">·</span>
          <span>scroll to zoom</span>
          <span className="text-zinc-700">·</span>
          <span>click any dot to inspect</span>
        </div>
      </div>

      <InfoPanel
        company={selected}
        onClose={() => {
          setSelected(null);
          setFocusCoords(null);
        }}
      />
    </div>
  );
}

export default function GlobePage() {
  return (
    <MarketProvider>
      <GlobeContent />
    </MarketProvider>
  );
}
