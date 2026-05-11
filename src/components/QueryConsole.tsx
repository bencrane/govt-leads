"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Search, CornerDownLeft } from "lucide-react";
import { useMarket } from "@/context/MarketContext";
import type { QueryConsoleExample } from "@/types";

interface QueryConsoleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (example: QueryConsoleExample, raw: string) => void;
}

function matchQuery(
  input: string,
  examples: QueryConsoleExample[]
): QueryConsoleExample {
  const lower = ` ${input.toLowerCase()} `;
  for (const ex of examples) {
    if (ex.matchKeywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      return ex;
    }
  }
  return examples[0];
}

export function QueryConsole({ open, onOpenChange, onSubmit }: QueryConsoleProps) {
  const { market } = useMarket();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setInput("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  const handleSubmit = (raw: string) => {
    const matched = matchQuery(raw, market.queryConsoleExamples);
    onSubmit(matched, raw);
    onOpenChange(false);
  };

  const placeholder = `Show me all ${market.vocab.entityNounPlural.toLowerCase()} with...`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[70]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => onOpenChange(false)}
        />
        <div className="fixed top-[18%] left-1/2 -translate-x-1/2 w-full max-w-[760px] px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18 }}
            className="bg-zinc-900 border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-3 border-b border-zinc-800/80 flex items-center justify-between bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-transparent">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span className="text-[11px] text-indigo-300 uppercase tracking-wider font-medium">
                  Ask Bullseye · {market.label}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-zinc-800 text-zinc-500 border border-zinc-700/60">
                  esc
                </kbd>
              </div>
            </div>

            <div className="px-6 py-5">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && input.trim().length > 0) {
                    handleSubmit(input);
                  }
                }}
                placeholder={placeholder}
                className="w-full bg-transparent text-zinc-100 placeholder:text-zinc-600 outline-none text-[22px] leading-tight font-light"
              />
            </div>

            <div className="px-6 py-4 border-t border-zinc-800/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-zinc-600 uppercase tracking-wider font-medium">
                  Recent queries
                </span>
                <span className="text-[10px] text-zinc-700">
                  Enter to run · click an example below
                </span>
              </div>
              <div className="space-y-1">
                {market.queryConsoleExamples.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => handleSubmit(ex.trigger)}
                    className="group flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-200 transition-colors text-left"
                  >
                    <Search className="h-3.5 w-3.5 text-zinc-600 group-hover:text-indigo-400 shrink-0 transition-colors" />
                    <span className="text-sm flex-1 truncate">{ex.trigger}</span>
                    <span className="text-[11px] text-zinc-600 font-mono shrink-0">
                      {ex.totalCount.toLocaleString()} {market.vocab.listsItemEntityLabel}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-zinc-700 group-hover:text-indigo-400 shrink-0 opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 py-3 border-t border-zinc-800/80 bg-zinc-950/40 flex items-center justify-between text-[10px] text-zinc-600">
              <span>Searches across {market.companies.length.toLocaleString()}+ {market.vocab.entityNounPlural.toLowerCase()} · {market.signalLists.length} cohorts</span>
              <div className="flex items-center gap-1.5">
                <span>Run</span>
                <CornerDownLeft className="h-3 w-3" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
