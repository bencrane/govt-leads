import type { MarketDataset, MarketId } from "@/types";
import { governmentMarket } from "./government";
import { fmcsaMarket } from "./fmcsa";
import { sbaMarket } from "./sba";
import { franchiseMarket } from "./franchise";

export const markets: Record<MarketId, MarketDataset> = {
  government: governmentMarket,
  fmcsa: fmcsaMarket,
  sba: sbaMarket,
  franchise: franchiseMarket,
};

export const marketList: MarketDataset[] = [
  governmentMarket,
  fmcsaMarket,
  sbaMarket,
  franchiseMarket,
];

export const DEFAULT_MARKET: MarketId = "government";
