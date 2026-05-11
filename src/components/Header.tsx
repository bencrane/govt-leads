"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Crosshair, EyeOff, Eye, ChevronDown, Check, Target, Wand2, Globe2, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMarket } from "@/context/MarketContext";

interface HeaderProps {
  anonymized: boolean;
  onToggleAnonymize: () => void;
}

export function Header({ anonymized, onToggleAnonymize }: HeaderProps) {
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
    <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="flex h-14 items-center px-5 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2.5">
          <Crosshair className="h-5 w-5 text-indigo-400" />
          <span className="text-[15px] font-semibold tracking-tight text-zinc-100">
            Bullseye
          </span>
        </div>

        {/* Market pill */}
        <div ref={marketRef} className="relative ml-3">
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
            <div className="absolute left-0 top-full mt-1 w-56 rounded-lg bg-zinc-900 border border-zinc-700/60 shadow-2xl overflow-hidden py-1">
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
                    <div className="flex flex-col">
                      <span className="font-medium">{m.label}</span>
                      <span className="text-[10px] text-zinc-600 mt-0.5">
                        {m.companies.length} {m.vocab.entityNounPlural.toLowerCase()} ·{" "}
                        {m.signalLists.length} {m.vocab.listsItemEntityLabel === "carriers" ? "cohorts" : m.vocab.listsItemEntityLabel === "borrowers" ? "cohorts" : m.vocab.listsItemEntityLabel === "operators" ? "cohorts" : "lists"}
                      </span>
                    </div>
                    {active && <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Persona pill */}
        <div ref={personaRef} className="relative ml-2">
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
            <div className="absolute left-0 top-full mt-1 w-72 rounded-lg bg-zinc-900 border border-zinc-700/60 shadow-2xl overflow-hidden py-1">
              <div className="px-3 py-2 border-b border-zinc-800">
                <span className="text-[10px] text-zinc-600 uppercase tracking-wider font-medium">Demand-side lens</span>
              </div>
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
                      <span className="text-[10px] text-zinc-600 mt-0.5 leading-snug">
                        {p.blurb}
                      </span>
                    </div>
                    {active && <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/atlas"
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600 transition-all"
            title="Open atlas view"
          >
            <Map className="h-4 w-4" />
          </Link>

          <Link
            href="/globe"
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-zinc-400 hover:text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all"
            title="Open globe view"
          >
            <Globe2 className="h-4 w-4" />
          </Link>

          <Link
            href="/compose"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-300 hover:bg-violet-500/15 hover:border-violet-500/50 transition-all text-xs font-medium"
          >
            <Wand2 className="h-3.5 w-3.5" />
            Compose Audience
          </Link>

          <button
            onClick={onToggleAnonymize}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all",
              anonymized
                ? "bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/15"
                : "bg-zinc-800/60 border-zinc-700/50 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800"
            )}
          >
            {anonymized ? (
              <EyeOff className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
            {anonymized ? "Anonymized" : "Anonymize"}
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
  );
}
