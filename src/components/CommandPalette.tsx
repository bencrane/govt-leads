"use client";

import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Building2, LayoutList, Radio } from "lucide-react";
import { companies, signalLists, signals } from "@/data";
import type { Company, TabId } from "@/types";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompanySelect: (company: Company) => void;
  onListSelect: (listId: string) => void;
  onTabChange: (tab: TabId) => void;
}

export function CommandPalette({
  open,
  onOpenChange,
  onCompanySelect,
  onListSelect,
  onTabChange,
}: CommandPaletteProps) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        />
        <div className="fixed top-[18%] left-1/2 -translate-x-1/2 w-full max-w-[640px] px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15 }}
            className="bg-zinc-900 border border-zinc-700/60 rounded-xl shadow-2xl overflow-hidden"
          >
            <Command className="w-full" loop>
              <div className="flex items-center border-b border-zinc-800 px-4">
                <Search className="h-4 w-4 text-zinc-500 shrink-0" />
                <Command.Input
                  placeholder="Search companies, signals, sectors..."
                  className="h-14 w-full bg-transparent text-zinc-100 placeholder:text-zinc-600 outline-none text-[15px] ml-3"
                  autoFocus
                />
              </div>
              <Command.List className="max-h-[380px] overflow-y-auto p-2">
                <Command.Empty className="py-10 text-center text-zinc-600 text-sm">
                  No results found.
                </Command.Empty>

                <Command.Group
                  heading="Companies"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-zinc-600"
                >
                  {companies.map((company) => (
                    <Command.Item
                      key={company.id}
                      value={`${company.name} ${company.sector} ${company.city} ${company.state}`}
                      onSelect={() => {
                        onCompanySelect(company);
                        onOpenChange(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-zinc-400 data-[selected=true]:bg-indigo-500/10 data-[selected=true]:text-zinc-100 transition-colors"
                    >
                      <Building2 className="h-4 w-4 text-zinc-600 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">
                          {company.name}
                        </div>
                        <div className="text-xs text-zinc-600 truncate">
                          {company.sector} &middot; {company.city},{" "}
                          {company.state}
                        </div>
                      </div>
                      <span className="ml-auto text-[11px] text-zinc-600 font-mono shrink-0">
                        {company.headcount.toLocaleString()} emp
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Lists"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-zinc-600"
                >
                  {signalLists.map((list) => (
                    <Command.Item
                      key={list.id}
                      value={`${list.name} ${list.sector} ${list.region} ${list.tags.join(" ")}`}
                      onSelect={() => {
                        onListSelect(list.id);
                        onTabChange("lists");
                        onOpenChange(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-zinc-400 data-[selected=true]:bg-indigo-500/10 data-[selected=true]:text-zinc-100 transition-colors"
                    >
                      <LayoutList className="h-4 w-4 text-zinc-600 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">
                          {list.name}
                        </div>
                        <div className="text-xs text-zinc-600 truncate">
                          {list.companyCount} companies &middot; {list.region}
                        </div>
                      </div>
                      <span className="ml-auto text-[11px] text-indigo-400 font-mono font-medium shrink-0">
                        {list.signalStrength}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Signals"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-zinc-600"
                >
                  {signals.slice(0, 8).map((signal) => (
                    <Command.Item
                      key={signal.id}
                      value={`${signal.companyName} ${signal.headline} ${signal.sector}`}
                      onSelect={() => {
                        const company = companies.find(
                          (c) => c.id === signal.companyId
                        );
                        if (company) {
                          onCompanySelect(company);
                          onOpenChange(false);
                        }
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-zinc-400 data-[selected=true]:bg-indigo-500/10 data-[selected=true]:text-zinc-100 transition-colors"
                    >
                      <Radio className="h-4 w-4 text-zinc-600 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">
                          {signal.headline}
                        </div>
                        <div className="text-xs text-zinc-600 truncate">
                          {signal.companyName} &middot; {signal.companyLocation}
                        </div>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
