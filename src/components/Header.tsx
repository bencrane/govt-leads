"use client";

import { Crosshair, Command, Search } from "lucide-react";

interface HeaderProps {
  onCommandOpen: () => void;
}

export function Header({ onCommandOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="flex h-14 items-center px-5 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2.5">
          <Crosshair className="h-5 w-5 text-indigo-400" />
          <span className="text-[15px] font-semibold tracking-tight text-zinc-100">
            Bullseye
          </span>
          <div className="ml-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">
              Live
            </span>
          </div>
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
    </header>
  );
}
