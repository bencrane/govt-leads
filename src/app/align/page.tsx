"use client";

import { Crosshair, MapPin, Users, DollarSign, TrendingUp, Briefcase, Building2, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AlignPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Minimal header */}
      <div className="border-b border-zinc-800/50 bg-zinc-950/80">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crosshair className="h-4 w-4 text-indigo-400" />
            <span className="text-sm font-medium text-zinc-400">StaffingEdge</span>
          </div>
          <span className="text-xs text-zinc-600">April 2026</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-zinc-100 mb-3">
            Industrial Manufacturing — Connection Criteria
          </h1>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
            Initial criteria spec for the types of companies we&apos;d connect you with.
            This is a starting point — we&apos;ll refine on our call based on what
            you actually place and where.
          </p>
        </div>

        {/* What we're tracking */}
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            What We&apos;re Watching
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            We monitor companies in industrial manufacturing that are showing growth
            signals — federal contract wins, headcount increases, facility expansions,
            and job posting surges. When a company lights up across multiple signals,
            they typically need labor faster than their internal recruiting can deliver.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Companies tracked in this sector", value: "4,200+", icon: Building2 },
              { label: "Active job postings monitored", value: "312K", icon: Briefcase },
              { label: "Sector growth (MoM)", value: "+23%", icon: TrendingUp },
              { label: "Avg contract wins per month", value: "140+", icon: DollarSign },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-zinc-900/60 border border-zinc-800/40 px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="h-3 w-3 text-zinc-600" />
                  <span className="text-[11px] text-zinc-600">{stat.label}</span>
                </div>
                <span className="text-lg font-semibold font-mono text-zinc-200">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800/50 my-10" />

        {/* Company Criteria */}
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Recommended Company Criteria
          </h2>
          <p className="text-sm text-zinc-500 mb-5">
            Companies matching this profile are the ones we&apos;d route to you. We can
            tighten or loosen any of these on the call.
          </p>

          <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/40 overflow-hidden">
            {[
              { label: "Federal Contract Size", value: "$2M – $50M", note: "Recent awards within last 90 days" },
              { label: "Employee Count", value: "150 – 2,000", note: "Large enough to have staffing needs, small enough to not have in-house recruiting depth" },
              { label: "Estimated Revenue", value: "$20M – $300M", note: "Mid-market manufacturers with real production volume" },
              { label: "Growth Signal", value: "Headcount up >15% YoY or active contract win", note: "At least one expansion indicator in the last 60 days" },
              { label: "Geography", value: "TBD — based on where you place", note: "We'll define this on the call" },
            ].map((row, i) => (
              <div
                key={row.label}
                className={cn(
                  "grid grid-cols-[180px_1fr] gap-6 px-5 py-4",
                  i > 0 && "border-t border-zinc-800/30"
                )}
              >
                <div className="text-sm font-medium text-zinc-300">{row.label}</div>
                <div>
                  <div className="text-sm font-mono text-zinc-100">{row.value}</div>
                  <div className="text-xs text-zinc-600 mt-0.5">{row.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Contacts */}
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Who You&apos;d Be Introduced To
          </h2>
          <p className="text-sm text-zinc-500 mb-5">
            These are the titles we typically see making staffing decisions at
            companies in this profile. We&apos;d confirm the right contact before
            making any intro.
          </p>

          <div className="grid grid-cols-2 gap-2">
            {[
              { title: "VP of Operations", context: "Owns headcount decisions for production" },
              { title: "Plant Manager", context: "Closest to the staffing gap day-to-day" },
              { title: "HR Director", context: "Manages vendor relationships and onboarding" },
              { title: "Procurement / Contracts Lead", context: "Handles staffing vendor agreements on federal work" },
            ].map((contact) => (
              <div key={contact.title} className="rounded-lg bg-zinc-900/60 border border-zinc-800/40 px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <UserCheck className="h-3 w-3 text-zinc-600" />
                  <span className="text-sm font-medium text-zinc-200">{contact.title}</span>
                </div>
                <span className="text-xs text-zinc-600">{contact.context}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Role Types */}
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Typical Roles These Companies Need Filled
          </h2>

          <div className="flex flex-wrap gap-2">
            {[
              "CNC Machinist",
              "Structural Welder",
              "MIG/TIG Welder",
              "Quality Inspector",
              "Machine Operator",
              "Maintenance Technician",
              "Tool & Die Maker",
              "Fabrication Lead",
              "Production Supervisor",
              "Safety Engineer",
            ].map((role) => (
              <span
                key={role}
                className="text-sm px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800/40 text-zinc-300"
              >
                {role}
              </span>
            ))}
          </div>
          <p className="text-xs text-zinc-600 mt-3">
            If you specialize in specific roles within this list, we&apos;d narrow to those.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800/50 my-10" />

        {/* Other Verticals */}
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Other Industries
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            This spec covers industrial manufacturing since that&apos;s the context
            we connected on. If you serve other verticals — construction, healthcare,
            logistics, defense — we can build separate criteria for each. Bring those
            to the call and we&apos;ll map them out.
          </p>
        </div>

        {/* The Call */}
        <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/40 px-6 py-5">
          <h2 className="text-sm font-medium text-zinc-200 mb-2">
            On the call
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            We&apos;ll walk through this together, adjust anything that doesn&apos;t
            match what you actually place, and lock in the spec. 15 minutes.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-zinc-800/30 text-xs text-zinc-700">
          StaffingEdge · Connection Criteria · Industrial Manufacturing
        </div>
      </div>
    </div>
  );
}
