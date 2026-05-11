"use client";

import type { TabId } from "@/types";
import { cn } from "@/lib/utils";
import { useMarket } from "@/context/MarketContext";
import {
  BarChart3,
  Award,
  Crosshair,
  Radio,
  LayoutList,
  DollarSign,
  TrendingUp,
  GitPullRequest,
  Target,
  Search,
  Command,
  Sparkles,
} from "lucide-react";

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onCommandOpen: () => void;
  onConsoleOpen: () => void;
}

const tabIcons: Record<TabId, React.ElementType> = {
  market: BarChart3,
  contracts: Award,
  "gc-demo": Crosshair,
  signals: Radio,
  lists: LayoutList,
  salary: DollarSign,
  trends: TrendingUp,
  pipeline: GitPullRequest,
  priority: Target,
};

export function TabBar({ activeTab, onTabChange, onCommandOpen, onConsoleOpen }: TabBarProps) {
  const { market } = useMarket();

  return (
    <div className="sticky top-14 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="flex items-center px-5 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-1">
          {market.tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tabIcons[tab.id];
            const displayLabel = tab.mystery
              ? tab.label.charAt(0).toLowerCase() + tab.label.slice(1)
              : tab.label;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative",
                  isActive
                    ? "text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {displayLabel}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-indigo-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onCommandOpen}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600 transition-all text-sm"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-xs">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 ml-1 px-1.5 py-0.5 rounded bg-zinc-700/50 text-[10px] font-mono text-zinc-500">
              <Command className="h-2.5 w-2.5" />J
            </kbd>
          </button>

          <button
            onClick={onConsoleOpen}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/15 hover:border-indigo-500/50 transition-all text-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-xs font-medium">Ask Bullseye</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 ml-1 px-1.5 py-0.5 rounded bg-indigo-500/20 text-[10px] font-mono text-indigo-300">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );
}
