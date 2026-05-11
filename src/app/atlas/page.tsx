"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Crosshair,
  ArrowLeft,
  MapPin,
  ChevronDown,
  Check,
  Target,
  Users,
  TrendingUp,
  Building2,
} from "lucide-react";
import { MarketProvider, useMarket } from "@/context/MarketContext";
import { getCoords } from "@/lib/geo";
import type { Company } from "@/types";
import { cn } from "@/lib/utils";

// Static CSS placeholder sphere — renders synchronously so the globe outline is on the page
// from frame zero. The real WebGL canvas mounts on top once the dynamic chunk + first frame paint.
function PlaceholderSphere() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div
        className="rounded-full"
        style={{
          width: "82%",
          height: "82%",
          background:
            "radial-gradient(circle at 36% 28%, rgba(31,38,75,0.55) 0%, rgba(14,18,32,0.85) 55%, rgba(8,11,20,0.95) 90%)",
          boxShadow:
            "inset 0 0 60px rgba(99,102,241,0.06), 0 0 30px rgba(99,102,241,0.08)",
        }}
      />
    </div>
  );
}

const AtlasScene = dynamic(() => import("./AtlasScene"), {
  ssr: false,
  loading: () => <PlaceholderSphere />,
});

// ─────────────────────────────────────────────────────────────────
// Market + persona pills (same as compose/globe)
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
// Atlas content
// ─────────────────────────────────────────────────────────────────

function AtlasContent() {
  const { market, marketId } = useMarket();
  const { companies, vocab } = market;

  const [selected, setSelected] = useState<Company | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [globeSize, setGlobeSize] = useState({ width: 640, height: 640 });

  // Reset selection when market changes
  useEffect(() => {
    setSelected(null);
    setHoveredId(null);
  }, [marketId]);

  // Size the globe responsively
  useEffect(() => {
    function recompute() {
      const targetSize = Math.min(window.innerWidth * 0.55, window.innerHeight - 200, 720);
      setGlobeSize({ width: targetSize, height: targetSize });
    }
    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, []);

  const entitiesWithCoords = useMemo(
    () => companies.filter((c) => getCoords(c.city, c.state)),
    [companies]
  );
  const uniqueCities = useMemo(() => {
    const set = new Set<string>();
    entitiesWithCoords.forEach((c) => set.add(`${c.city}, ${c.state}`));
    return set.size;
  }, [entitiesWithCoords]);
  const uniqueStates = useMemo(() => {
    const set = new Set<string>();
    entitiesWithCoords.forEach((c) => set.add(c.state));
    return set.size;
  }, [entitiesWithCoords]);

  const hoveredCompany = useMemo(
    () => (hoveredId ? companies.find((c) => c.id === hoveredId) : null),
    [hoveredId, companies]
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900">
        <div className="flex h-14 items-center px-6 max-w-[1400px] mx-auto w-full">
          <Link href="/" className="flex items-center gap-2.5 group">
            <ArrowLeft className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
            <Crosshair className="h-5 w-5 text-indigo-400" />
            <span className="text-[15px] font-semibold tracking-tight text-zinc-100">Bullseye</span>
            <span className="text-zinc-700">/</span>
            <span className="text-[13px] text-zinc-400">Atlas</span>
          </Link>

          <div className="ml-4">
            <MarketPill />
          </div>

          <div className="ml-auto flex items-center gap-3 text-[11px] text-zinc-600 font-mono">
            <span>{entitiesWithCoords.length.toLocaleString()} entities</span>
            <span className="text-zinc-800">·</span>
            <span>{uniqueCities} cities</span>
            <span className="text-zinc-800">·</span>
            <span>{uniqueStates} states</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-10">
        <div className="mb-10">
          <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 font-medium mb-2">
            {market.label} · Entity Network
          </div>
          <h1 className="text-2xl font-medium text-zinc-100 tracking-tight">
            {vocab.entityNounPlural}, plotted.
          </h1>
          <p className="text-sm text-zinc-500 mt-1 max-w-xl">
            {entitiesWithCoords.length.toLocaleString()} {vocab.entityNounPlural.toLowerCase()} across {uniqueCities} cities in {uniqueStates} states. Drag to explore; click any point to inspect the underlying record.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
          {/* Globe column */}
          <div className="flex items-center justify-center">
            <div
              style={{ width: globeSize.width, height: globeSize.height }}
              className="relative"
            >
              <AtlasScene
                companies={companies}
                selectedId={selected?.id || null}
                onSelect={setSelected}
                onHover={setHoveredId}
                width={globeSize.width}
                height={globeSize.height}
              />

              {/* Subtle hover label, floats in bottom-center of canvas */}
              {hoveredCompany && !selected && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-md bg-zinc-900/90 border border-zinc-800 backdrop-blur-sm text-[11px] text-zinc-300 pointer-events-none">
                  {hoveredCompany.name}
                  <span className="text-zinc-600 mx-1.5">·</span>
                  <span className="text-zinc-500">{hoveredCompany.city}, {hoveredCompany.state}</span>
                </div>
              )}
            </div>
          </div>

          {/* Info column */}
          <aside className="lg:sticky lg:top-24">
            {selected ? (
              <SelectedCard
                company={selected}
                vocab={vocab}
                onClear={() => setSelected(null)}
              />
            ) : (
              <EmptyCard vocab={vocab} entityCount={entitiesWithCoords.length} />
            )}

            {/* Distribution by state — calm secondary panel */}
            <DistributionPanel companies={entitiesWithCoords} />
          </aside>
        </div>
      </main>
    </div>
  );
}

function EmptyCard({
  vocab,
  entityCount,
}: {
  vocab: { entityNounPlural: string };
  entityCount: number;
}) {
  return (
    <div className="rounded-lg border border-zinc-900 bg-zinc-900/30 px-5 py-6">
      <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 font-medium mb-2">
        Selection
      </div>
      <p className="text-sm text-zinc-400 leading-relaxed">
        Click any point on the globe to inspect that {vocab.entityNounPlural.slice(0, -1).toLowerCase()}.
      </p>
      <div className="mt-4 pt-4 border-t border-zinc-900 text-[11px] text-zinc-600">
        {entityCount.toLocaleString()} total plotted
      </div>
    </div>
  );
}

function SelectedCard({
  company,
  vocab,
  onClear,
}: {
  company: Company;
  vocab: any;
  onClear: () => void;
}) {
  return (
    <div className="rounded-lg border border-zinc-900 bg-zinc-900/30">
      <div className="px-5 py-4 border-b border-zinc-900 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 font-medium">Selected</span>
        <button
          onClick={onClear}
          className="text-[10px] uppercase tracking-wider text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          clear
        </button>
      </div>
      <div className="px-5 py-5">
        <h3 className="text-base font-medium text-zinc-100 mb-1 leading-snug">{company.name}</h3>
        <div className="flex items-center gap-2 text-[11px] text-zinc-500 mb-4">
          <MapPin className="h-3 w-3" />
          <span>{company.city}, {company.state}</span>
        </div>

        <div className="space-y-2 text-sm">
          <Row label={vocab.sectorLabel} value={company.sector} />
          <Row
            label={vocab.sizeLabel}
            value={`${company.headcount.toLocaleString()} ${vocab.sizeUnit}`}
          />
          <Row
            label={vocab.growthLabel}
            value={`+${company.headcountGrowth}%`}
            highlight={company.headcountGrowth >= 20}
          />
          <Row label="Revenue" value={company.revenueEstimate} />
        </div>

        {company.jobPostings.length > 0 && (
          <div className="mt-5 pt-5 border-t border-zinc-900">
            <div className="text-[10px] uppercase tracking-wider text-zinc-600 mb-2">
              {vocab.dossierActivityHeader}
            </div>
            <div className="space-y-1.5">
              {company.jobPostings.slice(0, 4).map((p, i) => (
                <div key={i} className="text-[11px] text-zinc-400 leading-snug">
                  <span className="text-zinc-300">{p.title}</span>
                  <span className="text-zinc-600 mx-1.5">·</span>
                  <span className="text-zinc-500">{p.location}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[11px] text-zinc-500 uppercase tracking-wider">{label}</span>
      <span className={cn("text-sm font-mono text-right truncate", highlight ? "text-emerald-300" : "text-zinc-200")}>
        {value}
      </span>
    </div>
  );
}

function DistributionPanel({ companies }: { companies: Company[] }) {
  const byState = useMemo(() => {
    const map = new Map<string, number>();
    companies.forEach((c) => {
      map.set(c.state, (map.get(c.state) || 0) + 1);
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [companies]);

  if (byState.length === 0) return null;
  const max = byState[0][1];

  return (
    <div className="mt-6 rounded-lg border border-zinc-900 bg-zinc-900/30 px-5 py-5">
      <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 font-medium mb-4">
        Top States
      </div>
      <div className="space-y-2">
        {byState.map(([state, count]) => (
          <div key={state} className="flex items-center gap-3">
            <span className="text-[11px] text-zinc-500 font-mono w-6 shrink-0">{state}</span>
            <div className="flex-1 h-[3px] rounded-full bg-zinc-800/80 overflow-hidden">
              <div
                className="h-full bg-indigo-500/50 rounded-full"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-zinc-400 font-mono w-6 text-right shrink-0">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AtlasPage() {
  return (
    <MarketProvider>
      <AtlasContent />
    </MarketProvider>
  );
}
