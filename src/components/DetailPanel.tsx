import { X, ExternalLink, Building, MapPin, Calendar, Briefcase, Phone, User as UserIcon, Tag, CheckCircle2 } from "lucide-react";
import type { LeadRecord } from "@/data/dummyData";
import { formatCurrency, formatDate } from "@/lib/utils";

interface DetailPanelProps {
  record: LeadRecord | null;
  onClose: () => void;
}

export function DetailPanel({ record, onClose }: DetailPanelProps) {
  if (!record) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl border-l border-slate-200 transform transition-transform duration-300 ease-in-out z-40 flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-start justify-between p-6 border-b border-slate-200 bg-slate-50">
        <div className="pr-8">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold text-slate-900 leading-tight">
              {record.company_name}
            </h2>
            {record.is_first_time_awardee && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                <CheckCircle2 className="h-3 w-3" /> New
              </span>
            )}
          </div>
          <div className="flex items-center text-sm text-slate-500 gap-2">
            <MapPin className="h-4 w-4" />
            <span>{record.city}, {record.state}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* Award Highlight */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-900 mb-1">Award Value</p>
          <p className="text-3xl font-bold text-blue-700">{formatCurrency(record.award_amount)}</p>
          <div className="mt-3 flex items-center justify-between text-sm text-blue-800 border-t border-blue-200 pt-3">
            <span>{record.awarding_agency}</span>
            <span className="font-semibold">{formatDate(record.action_date)}</span>
          </div>
        </div>

        {/* Contact Info */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
            <UserIcon className="h-4 w-4" /> Point of Contact
          </h3>
          <div className="bg-white border text-sm border-slate-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-3 border-b border-slate-200">
              <div className="col-span-1 bg-slate-50 p-3 font-medium text-slate-600">Name</div>
              <div className="col-span-2 p-3 text-slate-900 font-semibold">{record.poc_name}</div>
            </div>
            <div className="grid grid-cols-3 border-b border-slate-200">
              <div className="col-span-1 bg-slate-50 p-3 font-medium text-slate-600">Title</div>
              <div className="col-span-2 p-3 text-slate-900">{record.poc_title}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="col-span-1 bg-slate-50 p-3 font-medium text-slate-600 text-sm">Phone</div>
              <div className="col-span-2 p-3 text-blue-600 flex items-center gap-2">
                <Phone className="h-3 w-3" /> {record.poc_phone}
              </div>
            </div>
          </div>
        </section>

        {/* Company Background */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
            <Building className="h-4 w-4" /> Company Details
          </h3>
          <div className="bg-white border text-sm border-slate-200 rounded-lg p-4 space-y-4">
            <div>
              <p className="text-slate-500 text-xs mb-1">Physical Address</p>
              <p className="text-slate-900">{record.physical_address}</p>
              <p className="text-slate-900">{record.city}, {record.state} {record.zip_code}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-slate-500 text-xs mb-1">Business Size</p>
                <p className="text-slate-900 font-medium capitalize flex items-center gap-1">
                  <Briefcase className="h-3 w-3 text-slate-400" />
                  {record.business_size.toLowerCase()}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-1">CAGE Code</p>
                <p className="text-slate-900 font-mono">{record.cage_code}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-slate-500 text-xs mb-1">Registration Date</p>
              <p className="text-slate-900 flex items-center gap-1">
                <Calendar className="h-3 w-3 text-slate-400" />
                {formatDate(record.registration_date)}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a 
                href={record.entity_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
              >
                Visit Website <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </section>

        {/* Contract Data */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
            <Tag className="h-4 w-4" /> Award Information
          </h3>
          <div className="bg-white border text-sm border-slate-200 rounded-lg p-4 space-y-4">
            <div>
              <p className="text-slate-500 text-xs mb-1">NAICS Code & Description</p>
              <p className="text-slate-900 font-semibold">{record.naics_code}</p>
              <p className="text-slate-600 mt-1">{record.naics_description}</p>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <p className="text-slate-500 text-xs mb-1">Total Federal Awards</p>
              <p className="text-slate-900 text-lg font-semibold">{record.total_awards_count}</p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a 
                href={record.usaspending_permalink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center gap-2 p-2 rounded-md bg-blue-50 transition-colors hover:bg-blue-100"
              >
                View on USASpending.gov <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
