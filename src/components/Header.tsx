"use client";

import { Crosshair, EyeOff, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  anonymized: boolean;
  onToggleAnonymize: () => void;
}

export function Header({ anonymized, onToggleAnonymize }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="flex h-14 items-center px-5 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2.5">
          <Crosshair className="h-5 w-5 text-indigo-400" />
          <span className="text-[15px] font-semibold tracking-tight text-zinc-100">
            Bullseye
          </span>
        </div>

        <div className="ml-auto flex items-center gap-3">
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
