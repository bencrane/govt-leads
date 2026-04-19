"use client";

import {
  ArrowLeft,
  MapPin,
  Zap,
  Users,
  Handshake,
  Clock,
  CheckCircle2,
  ArrowRightLeft,
  MessageCircle,
  UserPlus,
  Send,
  Search,
  CalendarDays,
  Briefcase,
} from "lucide-react";
import type { PipelineEntry } from "@/types";
import { cn } from "@/lib/utils";

interface PipelineDetailViewProps {
  entry: PipelineEntry;
  onBack: () => void;
}

interface TimelineEvent {
  date: string;
  icon: React.ElementType;
  color: string;
  title: string;
  detail: string;
}

interface PartnerInfo {
  type: string;
  specialization: string;
  region: string;
  relationship: string;
}

interface PlacementDetail {
  role: string;
  count: number;
  status: "filled" | "in_progress" | "open";
}

interface EntryDetail {
  timeline: TimelineEvent[];
  partner: PartnerInfo;
  placements: PlacementDetail[];
  notes: string[];
}

const entryDetails: Record<string, EntryDetail> = {
  "p-01": {
    timeline: [
      { date: "Apr 2", icon: Zap, color: "text-amber-400", title: "Signal detected", detail: "Pinnacle Defense won $22M Army systems engineering contract" },
      { date: "Apr 3", icon: Search, color: "text-indigo-400", title: "Company profiled", detail: "890 employees, +28% growth. Estimated need: 18+ engineers." },
      { date: "Apr 5", icon: Send, color: "text-blue-400", title: "Relevance check sent", detail: "Positioned as: \"seeing demand for cleared systems engineers in Huntsville\"" },
      { date: "Apr 7", icon: UserPlus, color: "text-cyan-400", title: "Company opted in", detail: "Confirmed need for systems engineers and program managers. TS/SCI preferred." },
      { date: "Apr 8", icon: ArrowRightLeft, color: "text-blue-400", title: "Partner matched", detail: "Technical staffing firm specializing in cleared defense talent." },
      { date: "Apr 9", icon: MessageCircle, color: "text-violet-400", title: "Intro made", detail: "Clean handoff. Both sides briefed on scope and clearance requirements." },
      { date: "Apr 11", icon: CheckCircle2, color: "text-emerald-400", title: "First placements", detail: "4 systems engineers started. All TS/SCI cleared." },
      { date: "Apr 16", icon: CheckCircle2, color: "text-emerald-400", title: "Ongoing", detail: "18 total placed. Partner exploring additional program manager roles." },
    ],
    partner: { type: "Technical staffing firm", specialization: "Cleared engineering & defense talent", region: "Southeast US", relationship: "Active since Q1 2026" },
    placements: [
      { role: "Systems Engineer (TS/SCI)", count: 10, status: "filled" },
      { role: "Systems Engineer (Secret)", count: 4, status: "filled" },
      { role: "Program Manager", count: 4, status: "filled" },
      { role: "Sr. Systems Architect", count: 2, status: "in_progress" },
    ],
    notes: ["Client requested 6 more for Phase 2 in June", "Partner satisfaction: high — asked about other Huntsville ops"],
  },
  "p-02": {
    timeline: [
      { date: "Apr 8", icon: Zap, color: "text-amber-400", title: "Signal detected", detail: "Chesapeake Ship Repair awarded $31M Navy DDG overhaul contract" },
      { date: "Apr 9", icon: Search, color: "text-indigo-400", title: "Company profiled", detail: "1,800 employees, Norfolk VA. Will need 40+ skilled trades." },
      { date: "Apr 10", icon: Send, color: "text-blue-400", title: "Relevance check sent", detail: "Positioned as: \"tracking Navy overhaul activity in Hampton Roads\"" },
      { date: "Apr 12", icon: UserPlus, color: "text-cyan-400", title: "Company opted in", detail: "Struggling to fill shipfitter and marine welder roles. Need is urgent." },
      { date: "Apr 14", icon: ArrowRightLeft, color: "text-blue-400", title: "Partner matched", detail: "Skilled trades staffing partner with deep maritime experience." },
      { date: "Apr 14", icon: MessageCircle, color: "text-violet-400", title: "Intro made", detail: "Partner reviewing scope — 44 roles across 4 trade categories." },
    ],
    partner: { type: "Skilled trades staffing firm", specialization: "Maritime & shipbuilding trades", region: "Mid-Atlantic", relationship: "New partnership" },
    placements: [
      { role: "Shipfitter", count: 0, status: "open" },
      { role: "Marine Welder", count: 0, status: "open" },
      { role: "Pipe Fitter", count: 0, status: "open" },
      { role: "Marine Electrician", count: 0, status: "open" },
    ],
    notes: ["Partner has 15 qualified marine welders ready to deploy", "Company open to 6-month contract-to-hire"],
  },
  "p-03": {
    timeline: [
      { date: "Mar 28", icon: Zap, color: "text-amber-400", title: "Signal detected", detail: "Lone Star Fabrication won $6.8M DoD structural steel contract" },
      { date: "Mar 29", icon: Search, color: "text-indigo-400", title: "Company profiled", detail: "460 employees, Dallas TX. Expanding production line for DoD work." },
      { date: "Mar 31", icon: Send, color: "text-blue-400", title: "Relevance check sent", detail: "Positioned as: \"seeing structural welding demand surge in Texas\"" },
      { date: "Apr 2", icon: UserPlus, color: "text-cyan-400", title: "Company opted in", detail: "Need 17 welders and fabricators. Can't fill from local pipeline alone." },
      { date: "Apr 3", icon: ArrowRightLeft, color: "text-blue-400", title: "Partner matched", detail: "Manufacturing staffing firm with strong Texas presence." },
      { date: "Apr 4", icon: MessageCircle, color: "text-violet-400", title: "Intro made", detail: "Partner already had 8 qualified welders in DFW area." },
      { date: "Apr 7", icon: CheckCircle2, color: "text-emerald-400", title: "First placements", detail: "6 structural welders started. All AWS D1.1 certified." },
      { date: "Apr 11", icon: CheckCircle2, color: "text-emerald-400", title: "Full placement", detail: "12 welders placed. Client extending for fabrication leads." },
    ],
    partner: { type: "Manufacturing staffing firm", specialization: "Industrial trades — welding, fabrication, machining", region: "Texas & Southwest", relationship: "Active since Q4 2025" },
    placements: [
      { role: "Structural Welder (AWS D1.1)", count: 8, status: "filled" },
      { role: "Structural Welder (MIG)", count: 4, status: "filled" },
      { role: "Fabrication Lead", count: 0, status: "in_progress" },
    ],
    notes: ["Client asked about CNC machinist availability for separate program", "Partner retention rate: 92% at 30 days"],
  },
  "p-04": {
    timeline: [
      { date: "Apr 12", icon: Zap, color: "text-amber-400", title: "Signal detected", detail: "Pacific Aerospace won $15.2M Navy precision tooling contract" },
      { date: "Apr 13", icon: Search, color: "text-indigo-400", title: "Company profiled", detail: "680 employees, Seattle WA. Expanding aerospace machining capacity." },
      { date: "Apr 14", icon: Send, color: "text-blue-400", title: "Relevance check sent", detail: "Positioned as: \"tracking aerospace machining demand in Pacific NW\"" },
      { date: "Apr 16", icon: UserPlus, color: "text-cyan-400", title: "Company opted in", detail: "Need 21 aerospace machinists and NDT inspectors. AS9100 required." },
      { date: "Apr 17", icon: ArrowRightLeft, color: "text-blue-400", title: "Partner matched", detail: "Aerospace staffing partner with Boeing/defense supply chain network." },
      { date: "Apr 17", icon: MessageCircle, color: "text-violet-400", title: "Intro made", detail: "Call scheduled. Partner reviewing AS9100 and NADCAP requirements." },
    ],
    partner: { type: "Aerospace staffing firm", specialization: "Precision machining & aerospace manufacturing", region: "Pacific Northwest", relationship: "New partnership" },
    placements: [
      { role: "Aerospace Machinist (5-axis)", count: 0, status: "open" },
      { role: "Tool & Die Maker", count: 0, status: "open" },
      { role: "NDT Inspector (Level II)", count: 0, status: "open" },
    ],
    notes: ["Partner placed 40+ machinists with Boeing suppliers last year", "Company open to contract-to-hire"],
  },
  "p-05": {
    timeline: [
      { date: "Apr 6", icon: Zap, color: "text-amber-400", title: "Signal detected", detail: "Gateway Logistics opening 150K sq ft distribution hub in Memphis" },
      { date: "Apr 7", icon: Search, color: "text-indigo-400", title: "Company profiled", detail: "750 employees, +35% growth. Memphis hub needs 200+ workers." },
      { date: "Apr 9", icon: Send, color: "text-blue-400", title: "Relevance check sent", detail: "Positioned as: \"seeing logistics expansion signals in the Memphis corridor\"" },
      { date: "Apr 11", icon: UserPlus, color: "text-cyan-400", title: "Company opted in", detail: "Massive ramp needed — CDL drivers, warehouse workers, forklift operators." },
      { date: "Apr 13", icon: Clock, color: "text-amber-400", title: "Evaluating partners", detail: "Reviewing 3 warehouse staffing partners with Memphis presence." },
    ],
    partner: { type: "Warehouse & logistics staffing", specialization: "High-volume distribution center staffing", region: "Memphis corridor", relationship: "Evaluating fit" },
    placements: [
      { role: "Warehouse Associate", count: 0, status: "open" },
      { role: "CDL Driver", count: 0, status: "open" },
      { role: "Forklift Operator", count: 0, status: "open" },
    ],
    notes: ["Hub opens June 2026", "Company wants single partner for entire Memphis op", "Volume: 150 warehouse, 30 CDL, 20 forklift"],
  },
  "p-06": {
    timeline: [
      { date: "Mar 20", icon: Zap, color: "text-amber-400", title: "Signal detected", detail: "CyberShield won $8.7M DHS cybersecurity contract" },
      { date: "Mar 21", icon: Search, color: "text-indigo-400", title: "Company profiled", detail: "520 employees, Reston VA. +32% growth. Opening new SOC in Arlington." },
      { date: "Mar 23", icon: Send, color: "text-blue-400", title: "Relevance check sent", detail: "Positioned as: \"tracking cleared cybersecurity demand in NoVA\"" },
      { date: "Mar 24", icon: UserPlus, color: "text-cyan-400", title: "Company opted in", detail: "Need SOC analysts and cloud security engineers. Active clearance required." },
      { date: "Mar 25", icon: ArrowRightLeft, color: "text-blue-400", title: "Partner matched", detail: "IT staffing firm specializing in cleared cybersecurity talent." },
      { date: "Mar 26", icon: MessageCircle, color: "text-violet-400", title: "Intro made", detail: "Partner had 5 pre-cleared SOC analysts available immediately." },
      { date: "Mar 29", icon: CheckCircle2, color: "text-emerald-400", title: "First placements", detail: "3 SOC analysts started at Arlington SOC." },
      { date: "Apr 7", icon: CheckCircle2, color: "text-emerald-400", title: "Full placement", detail: "8 cleared analysts placed across Reston and Arlington." },
    ],
    partner: { type: "IT staffing firm", specialization: "Cleared cybersecurity & federal IT", region: "Northern Virginia", relationship: "Active since Q1 2026" },
    placements: [
      { role: "SOC Analyst (Secret)", count: 5, status: "filled" },
      { role: "SOC Analyst (TS/SCI)", count: 1, status: "filled" },
      { role: "Cloud Security Engineer", count: 2, status: "filled" },
      { role: "Penetration Tester", count: 0, status: "in_progress" },
    ],
    notes: ["Company expanding DHS scope — may need 10 more by Q3", "Partner asked about other NoVA cyber ops"],
  },
  "p-07": {
    timeline: [
      { date: "Apr 14", icon: Zap, color: "text-amber-400", title: "Signal detected", detail: "Titan Heavy Industries headcount up 12% YoY, 32 open trade roles posted" },
      { date: "Apr 15", icon: Search, color: "text-indigo-400", title: "Company profiled", detail: "1,200 employees, Chicago IL. Won $4.95M DoD fabrication contract." },
      { date: "Apr 16", icon: Send, color: "text-blue-400", title: "Relevance check sent", detail: "Positioned as: \"seeing industrial hiring surge in the Midwest\"" },
      { date: "Apr 18", icon: UserPlus, color: "text-cyan-400", title: "Company opted in", detail: "Confirmed: 32 open roles across welders, crane operators, safety engineers." },
      { date: "Apr 18", icon: Clock, color: "text-amber-400", title: "Matching in progress", detail: "Reviewing industrial staffing partners with Midwest presence and trade focus." },
    ],
    partner: { type: "Industrial staffing firm", specialization: "Heavy manufacturing trades", region: "Midwest", relationship: "Matching in progress" },
    placements: [
      { role: "Structural Welder", count: 0, status: "open" },
      { role: "Crane Operator", count: 0, status: "open" },
      { role: "Safety Engineer", count: 0, status: "open" },
    ],
    notes: ["Company runs 2 shifts, may need 3rd shift coverage by July", "Strong preference for local hires who can start within 2 weeks"],
  },
  "p-08": {
    timeline: [
      { date: "Mar 15", icon: Zap, color: "text-amber-400", title: "Signal detected", detail: "Wasatch Aerospace won $18.5M Air Force avionics contract" },
      { date: "Mar 16", icon: Search, color: "text-indigo-400", title: "Company profiled", detail: "950 employees, SLC UT. Expanding campus, +25% growth." },
      { date: "Mar 18", icon: Send, color: "text-blue-400", title: "Relevance check sent", detail: "Positioned as: \"tracking aerospace production ramp in Utah\"" },
      { date: "Mar 19", icon: UserPlus, color: "text-cyan-400", title: "Company opted in", detail: "Need avionics techs, assembly technicians. Campus expansion adding capacity." },
      { date: "Mar 20", icon: ArrowRightLeft, color: "text-blue-400", title: "Partner matched", detail: "Technical staffing firm with aerospace manufacturing focus." },
      { date: "Mar 21", icon: MessageCircle, color: "text-violet-400", title: "Intro made", detail: "Both sides connected. Partner toured Ogden facility." },
      { date: "Mar 25", icon: CheckCircle2, color: "text-emerald-400", title: "First placements", detail: "8 assembly technicians started at Ogden facility." },
      { date: "Apr 4", icon: CheckCircle2, color: "text-emerald-400", title: "Ongoing", detail: "22 technicians placed across SLC and Ogden. Active relationship." },
    ],
    partner: { type: "Technical staffing firm", specialization: "Aerospace production & avionics", region: "Mountain West", relationship: "Active since Q1 2026" },
    placements: [
      { role: "Assembly Technician", count: 12, status: "filled" },
      { role: "Avionics Technician", count: 6, status: "filled" },
      { role: "Mechanical Engineer", count: 4, status: "filled" },
    ],
    notes: ["Campus expansion complete Q3 — will need 15 more techs", "Partner retention: 95% at 60 days"],
  },
  "p-09": {
    timeline: [
      { date: "Apr 10", icon: Zap, color: "text-amber-400", title: "Signal detected", detail: "Desert Winds Construction won $8.9M GSA courthouse renovation" },
      { date: "Apr 11", icon: Search, color: "text-indigo-400", title: "Company profiled", detail: "580 employees, Tucson AZ. +24% growth. Active federal contractor." },
      { date: "Apr 13", icon: Send, color: "text-blue-400", title: "Relevance check sent", detail: "Positioned as: \"seeing construction activity in Southwest federal projects\"" },
      { date: "Apr 14", icon: UserPlus, color: "text-cyan-400", title: "Company opted in", detail: "Need electricians, heavy equipment operators, carpenters for courthouse project." },
      { date: "Apr 15", icon: ArrowRightLeft, color: "text-blue-400", title: "Partner matched", detail: "Construction staffing partner with Southwest federal experience." },
      { date: "Apr 15", icon: MessageCircle, color: "text-violet-400", title: "Intro made", detail: "Partner reviewing project scope and timeline." },
    ],
    partner: { type: "Construction staffing firm", specialization: "Federal construction & renovation", region: "Southwest", relationship: "New partnership" },
    placements: [
      { role: "Electrician", count: 0, status: "open" },
      { role: "Heavy Equipment Operator", count: 0, status: "open" },
      { role: "Carpenter", count: 0, status: "open" },
      { role: "Site Supervisor", count: 0, status: "open" },
    ],
    notes: ["Project timeline: 18 months starting May 2026", "Company has 2 more GSA projects in pipeline for AZ"],
  },
  "p-10": {
    timeline: [
      { date: "Mar 5", icon: Zap, color: "text-amber-400", title: "Signal detected", detail: "Apex Manufacturing won $4.2M DoD precision machining contract" },
      { date: "Mar 6", icon: Search, color: "text-indigo-400", title: "Company profiled", detail: "340 employees, Detroit MI. +18% growth. DoD vehicle modernization." },
      { date: "Mar 8", icon: Send, color: "text-blue-400", title: "Relevance check sent", detail: "Positioned as: \"tracking precision machining demand in Michigan\"" },
      { date: "Mar 10", icon: UserPlus, color: "text-cyan-400", title: "Company opted in", detail: "Need CNC machinists and quality inspectors for new DoD program." },
      { date: "Mar 11", icon: ArrowRightLeft, color: "text-blue-400", title: "Partner matched", detail: "Industrial staffing firm with deep Michigan manufacturing network." },
      { date: "Mar 12", icon: MessageCircle, color: "text-violet-400", title: "Intro made", detail: "Partner placed 200+ machinists in Detroit metro last year." },
      { date: "Mar 15", icon: CheckCircle2, color: "text-emerald-400", title: "First placements", detail: "6 CNC machinists started. All 5-axis experienced." },
      { date: "Mar 30", icon: CheckCircle2, color: "text-emerald-400", title: "Contract extended", detail: "14 machinists placed total. Client extended partnership to cover new program." },
    ],
    partner: { type: "Industrial staffing firm", specialization: "Precision manufacturing & machining", region: "Michigan & Great Lakes", relationship: "Active since Q1 2026" },
    placements: [
      { role: "CNC Machinist (5-axis)", count: 8, status: "filled" },
      { role: "CNC Machinist (3-axis)", count: 4, status: "filled" },
      { role: "Quality Inspector", count: 2, status: "filled" },
    ],
    notes: ["Client expanding to 2nd shift — will need 8 more machinists", "Partner asked about other Detroit-area manufacturing ops"],
  },
  "p-11": {
    timeline: [
      { date: "Apr 8", icon: Zap, color: "text-amber-400", title: "Signal detected", detail: "Heartland Medical won $5.5M VA medical supply contract" },
      { date: "Apr 9", icon: Search, color: "text-indigo-400", title: "Company profiled", detail: "280 employees, Omaha NE. +14% growth. VA Midwest supplier." },
      { date: "Apr 10", icon: Send, color: "text-blue-400", title: "Relevance check sent", detail: "Positioned as: \"seeing VA healthcare expansion in the Midwest\"" },
      { date: "Apr 12", icon: UserPlus, color: "text-cyan-400", title: "Company opted in", detail: "Need medical device assemblers and QC techs for contract ramp." },
      { date: "Apr 12", icon: Clock, color: "text-amber-400", title: "Evaluating partners", detail: "Reviewing healthcare staffing partners with medical device experience." },
    ],
    partner: { type: "Healthcare staffing firm", specialization: "Medical device manufacturing", region: "Midwest", relationship: "Evaluating fit" },
    placements: [
      { role: "Device Assembler", count: 0, status: "open" },
      { role: "QC Technician", count: 0, status: "open" },
    ],
    notes: ["Company needs ISO 13485 experienced workers", "Contract ramp starts May — timeline is tight"],
  },
  "p-12": {
    timeline: [
      { date: "Apr 5", icon: Zap, color: "text-amber-400", title: "Signal detected", detail: "Gulf Coast Marine won $9.1M Coast Guard maintenance contract" },
      { date: "Apr 6", icon: Search, color: "text-indigo-400", title: "Company profiled", detail: "420 employees, New Orleans LA. +20% growth. Coast Guard fleet maintenance." },
      { date: "Apr 8", icon: Send, color: "text-blue-400", title: "Relevance check sent", detail: "Positioned as: \"tracking Coast Guard maintenance activity in the Gulf\"" },
      { date: "Apr 9", icon: UserPlus, color: "text-cyan-400", title: "Company opted in", detail: "Need marine engineers and maintenance technicians for cutter fleet." },
      { date: "Apr 10", icon: ArrowRightLeft, color: "text-blue-400", title: "Partner identified", detail: "Marine trades staffing partner with Gulf region coverage." },
      { date: "Apr 10", icon: Clock, color: "text-amber-400", title: "Intro pending", detail: "Partner confirmed interest. Scheduling intro call." },
    ],
    partner: { type: "Marine trades staffing firm", specialization: "Vessel maintenance & marine trades", region: "Gulf Coast", relationship: "Intro pending" },
    placements: [
      { role: "Marine Engineer", count: 0, status: "open" },
      { role: "Maintenance Technician", count: 0, status: "open" },
      { role: "Deck Officer", count: 0, status: "open" },
    ],
    notes: ["Multi-year contract — ongoing staffing need", "Partner has existing relationship with Bollinger Shipyards"],
  },
};

export function PipelineDetailView({ entry, onBack }: PipelineDetailViewProps) {
  const detail = entryDetails[entry.id]!;

  const statusColors: Record<string, string> = {
    placed: "text-emerald-400", matched: "text-blue-400", intro_made: "text-violet-400",
    exploring: "text-amber-400", opted_in: "text-cyan-400",
  };
  const statusLabels: Record<string, string> = {
    placed: "Placed", matched: "Matched", intro_made: "Intro Made",
    exploring: "Exploring", opted_in: "Opted In",
  };

  const filledCount = detail.placements.reduce((sum, p) => sum + p.count, 0);
  const openCount = detail.placements.filter((p) => p.status === "open").length;

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-5 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Pipeline
      </button>

      {/* Header */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 mb-6">
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-xl font-semibold text-zinc-100">
              {entry.companyDescription}
            </h1>
            <span className={cn("text-sm font-semibold", statusColors[entry.status])}>
              {statusLabels[entry.status]}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-500 mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {entry.region}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 text-xs border border-zinc-700/50">
              {entry.sector}
            </span>
          </div>
          <div className="text-sm text-zinc-400">
            <span className="text-zinc-600">Signal:</span> {entry.signal}
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-4 border-t border-zinc-800/60">
          <div className="px-5 py-3 border-r border-zinc-800/40">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider">Roles Needed</div>
            <div className="text-lg font-bold font-mono text-zinc-100">{entry.roles?.split(", ").length || 0}</div>
          </div>
          <div className="px-5 py-3 border-r border-zinc-800/40">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider">Placed</div>
            <div className={cn("text-lg font-bold font-mono", filledCount > 0 ? "text-emerald-400" : "text-zinc-500")}>{filledCount}</div>
          </div>
          <div className="px-5 py-3 border-r border-zinc-800/40">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider">Open</div>
            <div className="text-lg font-bold font-mono text-zinc-100">{openCount}</div>
          </div>
          <div className="px-5 py-3">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider">Timeline Steps</div>
            <div className="text-lg font-bold font-mono text-zinc-100">{detail.timeline.length}</div>
          </div>
        </div>
      </div>

      {/* Timeline — full width */}
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-5 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <CalendarDays className="h-4 w-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
            Timeline
          </h2>
        </div>
        <div className="space-y-0">
          {detail.timeline.map((event, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-7 w-7 rounded-full flex items-center justify-center bg-zinc-950 border border-zinc-800">
                  <event.icon className={cn("h-3.5 w-3.5", event.color)} />
                </div>
                {i < detail.timeline.length - 1 && (
                  <div className="w-px flex-1 min-h-[20px] bg-zinc-800/60" />
                )}
              </div>
              <div className="pb-4 pt-0.5 flex-1">
                <div className="flex items-center gap-3 mb-0.5">
                  <span className="text-sm font-medium text-zinc-200">{event.title}</span>
                  <span className="text-[11px] text-zinc-600 font-mono">{event.date}</span>
                </div>
                <p className="text-xs text-zinc-500">{event.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row: Partner + Placements + Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Partner */}
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Handshake className="h-4 w-4 text-indigo-400" />
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Partner Match
            </h3>
          </div>
          <div className="space-y-2.5 text-sm">
            {[
              ["Type", detail.partner.type],
              ["Focus", detail.partner.specialization],
              ["Region", detail.partner.region],
              ["Status", detail.partner.relationship],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-[10px] text-zinc-600 uppercase tracking-wider">{label}</div>
                <div className="text-zinc-300">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Placements */}
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="h-4 w-4 text-indigo-400" />
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Placements
            </h3>
          </div>
          <div className="space-y-2">
            {detail.placements.map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-zinc-400 truncate mr-2">{p.role}</span>
                <div className="flex items-center gap-2 shrink-0">
                  {p.count > 0 && (
                    <span className="text-xs font-mono font-medium text-emerald-400">{p.count}</span>
                  )}
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded border",
                    p.status === "filled" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                    p.status === "in_progress" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                    "bg-zinc-800 text-zinc-500 border-zinc-700/50"
                  )}>
                    {p.status === "filled" ? "Filled" : p.status === "in_progress" ? "Active" : "Open"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-4">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            Notes
          </h3>
          <div className="space-y-2.5">
            {detail.notes.map((note, i) => (
              <p key={i} className="text-xs text-zinc-500 leading-relaxed pl-3 border-l-2 border-zinc-800">
                {note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
