"use client";

import { useState, useMemo } from "react";
import { Download, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/Header";
import { StatsBar } from "@/components/StatsBar";
import { FilterPanel } from "@/components/FilterPanel";
import { ResultsTable } from "@/components/ResultsTable";
import { DetailPanel } from "@/components/DetailPanel";
import { DUMMY_DATA, type LeadRecord } from "@/data/dummyData";
import { FilterState, SortState, SortField } from "@/types";
import { isWithinInterval, parseISO } from "date-fns";
import { exportToCSV } from "@/lib/export";

const INITIAL_FILTERS: FilterState = {
  searchTerm: "",
  state: "",
  naicsPrefix: "",
  dateFrom: "",
  dateTo: "",
  minAwardAmount: "",
  businessSize: "",
  firstTimeOnly: false,
};

export default function Home() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortState, setSortState] = useState<SortState>({ field: "action_date", direction: "desc" });
  const [selectedRecord, setSelectedRecord] = useState<LeadRecord | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter Logic
  const filteredData = useMemo(() => {
    return DUMMY_DATA.filter((record) => {
      // 1. Text Search (Company Name)
      if (
        filters.searchTerm &&
        !record.company_name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }

      // 2. State Dropdown
      if (filters.state && record.state !== filters.state) {
        return false;
      }

      // 3. NAICS Prefix
      if (
        filters.naicsPrefix &&
        !record.naics_code.startsWith(filters.naicsPrefix)
      ) {
        return false;
      }

      // 4. Action Date Range
      if (filters.dateFrom || filters.dateTo) {
        try {
          const actionDate = parseISO(record.action_date);
          const from = filters.dateFrom ? parseISO(filters.dateFrom) : new Date("1900-01-01");
          // If no "to" date, we use far future.
          // Note: Add logic to safely handle 'late' timestamps.
          const to = filters.dateTo 
            ? new Date(parseISO(filters.dateTo).setHours(23, 59, 59, 999)) 
            : new Date("2100-01-01");

          if (!isWithinInterval(actionDate, { start: from, end: to })) {
            return false;
          }
        } catch {
          // Date parse failure, fallback true to be safe
        }
      }

      // 5. Min Award Amount
      if (
        filters.minAwardAmount !== "" &&
        record.award_amount < Number(filters.minAwardAmount)
      ) {
        return false;
      }

      // 6. Business Size
      if (
        filters.businessSize &&
        record.business_size !== filters.businessSize
      ) {
        return false;
      }

      // 7. First-Time Awardees Only
      if (filters.firstTimeOnly && !record.is_first_time_awardee) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Sort Logic
  const sortedAndFilteredData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortState.field];
      const bVal = b[sortState.field];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortState.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortState.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      if (typeof aVal === "boolean" && typeof bVal === "boolean") {
        // Evaluate true > false
        if (aVal === bVal) return 0;
        if (sortState.direction === "asc") return aVal ? 1 : -1;
        return aVal ? -1 : 1;
      }

      return 0;
    });
  }, [filteredData, sortState]);

  const handleSort = (field: SortField) => {
    setSortState((prev) => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleExport = () => {
    exportToCSV(sortedAndFilteredData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Utility Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">
              Contract Intelligence
            </h1>
            <button 
              className="md:hidden flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-md hover:bg-slate-200 transition-colors"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row h-full relative">
          
          {/* Filter Sidebar */}
          <div className={`
            absolute md:relative z-20 md:z-auto
            ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            transition-transform duration-300 ease-in-out
            h-full overflow-y-auto border-r border-slate-200 bg-white
            w-[280px] p-4 md:px-6 md:py-6
          `}>
            <FilterPanel 
              filters={filters} 
              setFilters={setFilters} 
              onClear={() => setFilters(INITIAL_FILTERS)} 
            />
          </div>

          {/* Desktop Filter Backdrop override */}
          {isMobileFilterOpen && (
            <div 
              className="fixed inset-0 bg-slate-900/50 z-10 md:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            />
          )}

          {/* Data Feed */}
          <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
            <div className="p-4 md:p-6 flex-1 overflow-y-auto w-full">
              <StatsBar data={filteredData} />
              
              <ResultsTable 
                data={sortedAndFilteredData}
                sortState={sortState}
                onSort={handleSort}
                onRowClick={setSelectedRecord}
                selectedId={selectedRecord?.id || null}
              />
            </div>

            {/* Backdrop for DetailPanel */}
            {selectedRecord && (
              <div 
                className="absolute inset-0 bg-slate-900/10 z-30 transition-opacity backdrop-blur-[1px]" 
                aria-hidden="true" 
                onClick={() => setSelectedRecord(null)}
              />
            )}
            
            <DetailPanel 
              record={selectedRecord} 
              onClose={() => setSelectedRecord(null)} 
            />
          </div>
          
        </div>
      </main>
    </div>
  );
}
