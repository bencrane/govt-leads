"use client";

import type { TabId } from "@/types";
import { cn } from "@/lib/utils";
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
} from "lucide-react";

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onCommandOpen: () => void;
}

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "market", label: "Market", icon: BarChart3 },
  { id: "contracts", label: "Contract Winners", icon: Award },
  { id: "gc-demo", label: "GC Demo", icon: Crosshair },
  { id: "signals", label: "Signals", icon: Radio },
  { id: "lists", label: "Lists", icon: LayoutList },
  { id: "salary", label: "Salary Stats", icon: DollarSign },
  { id: "trends", label: "Trends", icon: TrendingUp },
  { id: "pipeline", label: "Pipeline", icon: GitPullRequest },
  { id: "priority", label: "Priority", icon: Target },
];

export function TabBar({ activeTab, onTabChange, onCommandOpen }: TabBarProps) {
  return (
    <div className="sticky top-14 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="flex items-center px-5 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-1">
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

        <div className="ml-auto">
          <button
            onClick={onCommandOpen}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600 transition-all text-sm"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-xs">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 ml-1 px-1.5 py-0.5 rounded bg-zinc-700/50 text-[10px] font-mono text-zinc-500">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );
}
