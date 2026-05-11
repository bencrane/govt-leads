"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { MarketDataset, MarketId, PersonaDef } from "@/types";
import { markets, marketList, DEFAULT_MARKET } from "@/data/markets";

const MARKET_STORAGE_KEY = "bullseye:active-market";
const PERSONA_STORAGE_PREFIX = "bullseye:active-persona:";

interface MarketContextValue {
  market: MarketDataset;
  marketId: MarketId;
  setMarketId: (id: MarketId) => void;
  availableMarkets: MarketDataset[];
  persona: PersonaDef;
  personaId: string;
  setPersonaId: (id: string) => void;
}

const MarketContext = createContext<MarketContextValue | null>(null);

function isMarketId(value: string): value is MarketId {
  return value === "government" || value === "fmcsa" || value === "sba" || value === "franchise";
}

function readStoredPersonaId(marketId: MarketId, market: MarketDataset): string {
  if (typeof window === "undefined") return market.personas[0].id;
  const stored = window.localStorage.getItem(`${PERSONA_STORAGE_PREFIX}${marketId}`);
  if (stored && market.personas.some((p) => p.id === stored)) {
    return stored;
  }
  return market.personas[0].id;
}

export function MarketProvider({ children }: { children: ReactNode }) {
  const [marketId, setMarketIdState] = useState<MarketId>(DEFAULT_MARKET);
  const [personaId, setPersonaIdState] = useState<string>(markets[DEFAULT_MARKET].personas[0].id);

  // Hydrate persisted market + persona on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedMarket = window.localStorage.getItem(MARKET_STORAGE_KEY);
    const initialMarketId: MarketId = storedMarket && isMarketId(storedMarket) ? storedMarket : DEFAULT_MARKET;
    setMarketIdState(initialMarketId);
    setPersonaIdState(readStoredPersonaId(initialMarketId, markets[initialMarketId]));
  }, []);

  const setMarketId = (id: MarketId) => {
    setMarketIdState(id);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(MARKET_STORAGE_KEY, id);
    }
    // When switching markets, restore the saved persona for that market (or default to its first persona)
    setPersonaIdState(readStoredPersonaId(id, markets[id]));
  };

  const setPersonaId = (id: string) => {
    setPersonaIdState(id);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(`${PERSONA_STORAGE_PREFIX}${marketId}`, id);
    }
  };

  const market = markets[marketId];
  const persona = market.personas.find((p) => p.id === personaId) || market.personas[0];

  const value: MarketContextValue = {
    market,
    marketId,
    setMarketId,
    availableMarkets: marketList,
    persona,
    personaId: persona.id,
    setPersonaId,
  };

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}

export function useMarket(): MarketContextValue {
  const ctx = useContext(MarketContext);
  if (!ctx) {
    throw new Error("useMarket must be used within MarketProvider");
  }
  return ctx;
}
