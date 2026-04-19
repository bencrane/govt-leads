"use client";

import type { TabId } from "@/types";
import { cn } from "@/lib/utils";
import {
  Radio,
  LayoutList,
  TrendingUp,
  Globe,
  Eye,
} from "lucide-react";

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "signals", label: "Signals", icon: Radio },
  { id: "lists", label: "Lists", icon: LayoutList },
  { id: "trends", label: "Trends", icon: TrendingUp },
  { id: "market-intel", label: "Market Intel", icon: Globe },
  { id: "watchlists", label: "Watchlists", icon: Eye },
];

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="sticky top-14 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="flex items-center gap-1 px-5 max-w-[1400px] mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
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
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-indigo-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
