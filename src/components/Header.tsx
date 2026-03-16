import { ShieldCheck } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 font-bold text-xl tracking-wide">
          <ShieldCheck className="h-6 w-6 text-blue-400" />
          <span>Govt</span>
          <span className="text-blue-400">Leads</span>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <div className="text-xs text-slate-400 border border-slate-700 rounded-full px-3 py-1 bg-slate-800 hidden sm:flex">
            Master Data Warehouse Demo
          </div>
        </div>
      </div>
    </header>
  );
}
