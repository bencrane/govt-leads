"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/Header";
import { TabBar } from "@/components/TabBar";
import { MarketView } from "@/components/MarketView";
import { ContractWinnersView } from "@/components/ContractWinnersView";
import { GCDemoView } from "@/components/GCDemoView";
import { SignalsView } from "@/components/SignalsView";
import { ListsView } from "@/components/ListsView";
import { PipelineView } from "@/components/PipelineView";
import { CompanyDossier } from "@/components/CompanyDossier";
import { CommandPalette } from "@/components/CommandPalette";
import type { Company, TabId } from "@/types";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("market");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [anonymized, setAnonymized] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    if (tab !== "lists") setSelectedListId(null);
  };

  const handleListSelect = (listId: string) => {
    setSelectedListId(listId);
  };

  return (
    <div className="min-h-screen bg-[#09090b]">
      <Header
        anonymized={anonymized}
        onToggleAnonymize={() => setAnonymized((prev) => !prev)}
      />
      <TabBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCommandOpen={() => setCommandOpen(true)}
      />

      <main className="max-w-[1400px] mx-auto px-5 py-6">
        {activeTab === "market" && <MarketView />}

        {activeTab === "contracts" && (
          <ContractWinnersView onCompanyClick={setSelectedCompany} />
        )}

        {activeTab === "gc-demo" && (
          <GCDemoView onCompanyClick={setSelectedCompany} />
        )}

        {activeTab === "signals" && (
          <SignalsView onCompanyClick={setSelectedCompany} />
        )}

        {activeTab === "lists" && (
          <ListsView
            onCompanyClick={setSelectedCompany}
            selectedListId={selectedListId}
          />
        )}

        {activeTab === "pipeline" && (
          <PipelineView anonymized={anonymized} />
        )}

        {(activeTab === "salary" ||
          activeTab === "trends" ||
          activeTab === "priority") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20"
          >
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    className="h-4 rounded bg-zinc-800/60 animate-pulse"
                    style={{ width: `${60 + Math.random() * 30}%` }}
                  />
                </div>
              ))}
              <div className="h-40 rounded-xl bg-zinc-900/40 border border-zinc-800/30 animate-pulse mt-8" />
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-24 rounded-lg bg-zinc-900/40 border border-zinc-800/30 animate-pulse"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {selectedCompany && (
          <CompanyDossier
            company={selectedCompany}
            onClose={() => setSelectedCompany(null)}
          />
        )}
      </AnimatePresence>

      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onCompanySelect={(company) => setSelectedCompany(company)}
        onListSelect={handleListSelect}
        onTabChange={handleTabChange}
      />
    </div>
  );
}
