import { FilterState } from "@/types";
import { Search, X } from "lucide-react";

interface FilterPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onClear: () => void;
}

const STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export function FilterPanel({ filters, setFilters, onClear }: FilterPanelProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" 
        ? (e.target as HTMLInputElement).checked 
        : value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === "" ? "" : Number(value);
    
    setFilters((prev) => ({
      ...prev,
      [name]: numValue,
    }));
  };

  return (
    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm w-full md:w-64 flex-shrink-0 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-slate-800 flex items-center gap-2">
          Filters
        </h2>
        <button
          onClick={onClear}
          className="text-xs text-slate-500 hover:text-blue-600 font-medium flex items-center gap-1 transition-colors"
        >
          <X className="h-3 w-3" /> Clear
        </button>
      </div>

      <div className="space-y-4">
        {/* Company Search */}
        <div>
          <label htmlFor="searchTerm" className="enterprise-label">Company Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              name="searchTerm"
              id="searchTerm"
              value={filters.searchTerm}
              onChange={handleChange}
              className="enterprise-input pl-9"
              placeholder="Search companies..."
            />
          </div>
        </div>

        {/* State Dropdown */}
        <div>
          <label htmlFor="state" className="enterprise-label">State</label>
          <select
            id="state"
            name="state"
            value={filters.state}
            onChange={handleChange}
            className="enterprise-input bg-white"
          >
            <option value="">All States</option>
            {STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* NAICS Prefix */}
        <div>
          <label htmlFor="naicsPrefix" className="enterprise-label">NAICS Starting With</label>
          <input
            type="text"
            name="naicsPrefix"
            id="naicsPrefix"
            value={filters.naicsPrefix}
            onChange={handleChange}
            className="enterprise-input"
            placeholder="e.g. 33, 54"
          />
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <label className="enterprise-label">Action Date Range</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="date"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleChange}
                className="enterprise-input text-xs"
              />
            </div>
            <div>
              <input
                type="date"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleChange}
                className="enterprise-input text-xs"
              />
            </div>
          </div>
        </div>

        {/* Min Award Amount */}
        <div>
          <label htmlFor="minAwardAmount" className="enterprise-label">Min Award ($)</label>
          <input
            type="number"
            name="minAwardAmount"
            id="minAwardAmount"
            value={filters.minAwardAmount}
            onChange={handleNumberChange}
            className="enterprise-input"
            placeholder="0"
            min="0"
          />
        </div>

        {/* Business Size */}
        <div>
          <label htmlFor="businessSize" className="enterprise-label">Business Size</label>
          <select
            id="businessSize"
            name="businessSize"
            value={filters.businessSize}
            onChange={handleChange}
            className="enterprise-input bg-white"
          >
            <option value="">All Sizes</option>
            <option value="SMALL BUSINESS">Small Business</option>
            <option value="OTHER THAN SMALL BUSINESS">Other Than Small</option>
          </select>
        </div>

        {/* First Time Badge */}
        <div className="pt-2 border-t border-slate-100 mt-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                name="firstTimeOnly"
                checked={filters.firstTimeOnly}
                onChange={handleChange}
                className="peer sr-only"
              />
              <div className="h-5 w-5 rounded border border-slate-300 bg-white ring-offset-white transition-all peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600 peer-focus-visible:ring-offset-2"></div>
              <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">First-Time Awardees Only</span>
          </label>
        </div>
      </div>
    </div>
  );
}
