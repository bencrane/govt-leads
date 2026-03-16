import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import type { LeadRecord } from "@/data/dummyData";
import type { SortState, SortField } from "@/types";
import { formatCurrency, formatDate, classNames } from "@/lib/utils";

interface ResultsTableProps {
  data: LeadRecord[];
  sortState: SortState;
  onSort: (field: SortField) => void;
  onRowClick: (record: LeadRecord) => void;
  selectedId: string | null;
}

export function ResultsTable({ 
  data, 
  sortState, 
  onSort, 
  onRowClick,
  selectedId 
}: ResultsTableProps) {
  
  const renderSortIcon = (field: SortField) => {
    if (sortState.field !== field) {
      return <ChevronsUpDown className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />;
    }
    return sortState.direction === "asc" 
      ? <ChevronUp className="h-4 w-4 text-blue-600" />
      : <ChevronDown className="h-4 w-4 text-blue-600" />;
  };

  const SortableHeader = ({ field, label, align = "left" }: { field: SortField, label: string, align?: "left" | "right" }) => (
    <th 
      scope="col" 
      className={classNames(
        "px-4 py-3.5 text-xs font-semibold text-slate-900 cursor-pointer group hover:bg-slate-50 transition-colors select-none",
        align === "right" ? "text-right" : "text-left"
      )}
      onClick={() => onSort(field)}
    >
      <div className={classNames(
        "flex items-center gap-1",
        align === "right" ? "justify-end" : "justify-start"
      )}>
        {label}
        {renderSortIcon(field)}
      </div>
    </th>
  );

  if (data.length === 0) {
    return (
      <div className="table-container flex flex-col items-center justify-center p-12 text-center h-64">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 mb-4">
          <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="mt-2 text-sm font-semibold text-slate-900">No leads found</h3>
        <p className="mt-1 text-sm text-slate-500">We couldn&apos;t find anything matching your current filters.</p>
      </div>
    );
  }

  return (
    <div className="table-container overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-white border-b border-slate-200 shadow-sm">
          <tr>
            <SortableHeader field="company_name" label="Company" />
            <SortableHeader field="state" label="Location" />
            <SortableHeader field="poc_name" label="Contact" />
            <SortableHeader field="award_amount" label="Award Size" align="right" />
            <SortableHeader field="awarding_agency" label="Agency" />
            <SortableHeader field="naics_description" label="NAICS" />
            <SortableHeader field="action_date" label="Action Date" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {data.map((record) => (
            <tr 
              key={record.id}
              onClick={() => onRowClick(record)}
              className={classNames(
                "cursor-pointer transition-colors hover:bg-slate-50",
                selectedId === record.id ? "bg-blue-50/50 hover:bg-blue-50/80" : ""
              )}
            >
              <td className="whitespace-nowrap px-4 py-4 sm:pl-6">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900 group-hover:text-blue-600 truncate max-w-[200px]">
                    {record.company_name}
                  </span>
                  {record.is_first_time_awardee && (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mt-1 self-start">
                      First-Time Awardee
                    </span>
                  )}
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                {record.city}, {record.state}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm">
                <div className="text-slate-900">{record.poc_name}</div>
                <div className="text-slate-500 text-xs">{record.poc_title}</div>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 text-right">
                {formatCurrency(record.award_amount)}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500 truncate max-w-[150px]">
                {record.awarding_agency}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500 truncate max-w-[200px]" title={record.naics_description}>
                {record.naics_code}
                <span className="block text-xs text-slate-400 truncate">{record.naics_description}</span>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                {formatDate(record.action_date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
