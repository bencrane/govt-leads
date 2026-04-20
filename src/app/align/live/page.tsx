"use client";

import { useState, useEffect } from "react";
import {
  Crosshair,
  X,
  Plus,
  Heart,
  Wrench,
  HardHat,
  Truck,
  Shield,
  Cpu,
  Anchor,
  Zap,
  UserCheck,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const industryData = [
  {
    id: "manufacturing", label: "Manufacturing", icon: Wrench,
    roles: ["CNC Machinist", "Structural Welder", "MIG/TIG Welder", "Quality Inspector", "Machine Operator", "Maintenance Technician", "Tool & Die Maker", "Fabrication Lead", "Production Supervisor", "Safety Engineer"],
  },
  {
    id: "construction", label: "Construction", icon: HardHat,
    roles: ["Heavy Equipment Operator", "Carpenter", "Electrician", "Plumber", "HVAC Technician", "Site Supervisor", "Project Engineer", "Concrete Finisher", "Iron Worker", "Crane Operator"],
  },
  {
    id: "healthcare", label: "Healthcare", icon: Heart,
    roles: ["Registered Nurse", "CNA", "Medical Technician", "Physician Assistant", "Lab Technician", "Physical Therapist", "Medical Coder", "Pharmacist", "Surgical Tech", "Radiology Tech"],
  },
  {
    id: "defense", label: "Defense & Aerospace", icon: Shield,
    roles: ["Systems Engineer", "Cleared IT Specialist", "Aerospace Machinist", "Program Manager", "Avionics Technician", "Security Specialist", "NDT Inspector", "Assembly Technician", "Mechanical Engineer", "Test Engineer"],
  },
  {
    id: "technology", label: "Technology", icon: Cpu,
    roles: ["Software Engineer", "DevOps Engineer", "Cloud Architect", "Data Engineer", "Cybersecurity Analyst", "QA Engineer", "Product Manager", "Network Engineer", "SOC Analyst", "Systems Administrator"],
  },
  {
    id: "logistics", label: "Logistics & Transport", icon: Truck,
    roles: ["CDL Driver", "Warehouse Associate", "Forklift Operator", "Dispatcher", "Supply Chain Analyst", "Fleet Mechanic", "Inventory Specialist", "Dock Worker", "Route Planner", "Freight Coordinator"],
  },
  {
    id: "maritime", label: "Maritime", icon: Anchor,
    roles: ["Shipfitter", "Marine Welder", "Pipe Fitter", "Marine Electrician", "Marine Engineer", "Deck Officer", "Maintenance Technician", "Blaster/Painter", "Rigger", "Hull Technician"],
  },
  {
    id: "energy", label: "Energy", icon: Zap,
    roles: ["Electrical Lineman", "Solar Installer", "Wind Turbine Technician", "Pipeline Welder", "Power Plant Operator", "Instrumentation Tech", "Field Engineer", "Safety Coordinator", "Environmental Tech", "Drilling Operator"],
  },
];

const defaultContacts = [
  { title: "VP of Operations", context: "Owns headcount decisions for production" },
  { title: "Plant Manager", context: "Closest to the staffing gap day-to-day" },
  { title: "HR Director", context: "Manages vendor relationships and onboarding" },
  { title: "Procurement Lead", context: "Handles staffing vendor agreements" },
];

export default function AlignLivePage() {
  const [preparedFor, setPreparedFor] = useState("");

  // Step 1: Company criteria
  const [employeeMin, setEmployeeMin] = useState("150");
  const [employeeMax, setEmployeeMax] = useState("2,000");
  const [revenueMin, setRevenueMin] = useState("$20M");
  const [revenueMax, setRevenueMax] = useState("$300M");
  const [geography, setGeography] = useState("");
  const [growthSignal, setGrowthSignal] = useState("Headcount up >15% YoY");

  // Step 2: Contract filters
  const [contractMin, setContractMin] = useState("$2M");
  const [contractMax, setContractMax] = useState("$50M");
  const [contractWindow, setContractWindow] = useState("90");
  const [agencies, setAgencies] = useState("DoD, VA, GSA, DHS");
  const [naics, setNaics] = useState("");

  // Step 3: Industries (hardball)
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  // Step 4: Roles (hardball)
  const [roles, setRoles] = useState<string[]>([]);
  const [removedRoles, setRemovedRoles] = useState<string[]>([]);
  const [newRole, setNewRole] = useState("");

  // Step 5: Delivery capability (hardball continues)
  const [timeToFill, setTimeToFill] = useState("");
  const [placementType, setPlacementType] = useState("");
  const [geoReach, setGeoReach] = useState("");

  // Step 6: Contacts
  const [contacts, setContacts] = useState(defaultContacts);

  // Step 7: Team
  const [teamSize, setTeamSize] = useState("");
  const [pointPerson, setPointPerson] = useState("");
  const [responseTime, setResponseTime] = useState("48 hours");

  const [notes, setNotes] = useState("");

  useEffect(() => {
    const industryRoles = selectedIndustries.flatMap((id) => {
      const ind = industryData.find((d) => d.id === id);
      return ind ? ind.roles : [];
    });
    const unique = [...new Set(industryRoles)].filter((r) => !removedRoles.includes(r));
    setRoles(unique);
  }, [selectedIndustries, removedRoles]);

  const toggleIndustry = (id: string) => {
    setSelectedIndustries((prev) => {
      if (prev.includes(id)) {
        const ind = industryData.find((d) => d.id === id);
        if (ind) setRemovedRoles((r) => r.filter((role) => !ind.roles.includes(role)));
        return prev.filter((i) => i !== id);
      }
      return [...prev, id];
    });
  };

  const removeRole = (role: string) => setRemovedRoles((prev) => [...prev, role]);

  const addRole = () => {
    if (newRole.trim() && !roles.includes(newRole.trim())) {
      setRoles((prev) => [...prev, newRole.trim()]);
      setRemovedRoles((prev) => prev.filter((r) => r !== newRole.trim()));
      setNewRole("");
    }
  };

  const updateContact = (i: number, field: "title" | "context", val: string) => {
    setContacts((prev) => prev.map((c, idx) => (idx === i ? { ...c, [field]: val } : c)));
  };

  const rolesByIndustry = selectedIndustries.map((id) => {
    const ind = industryData.find((d) => d.id === id)!;
    return { industry: ind, roles: ind.roles.filter((r) => roles.includes(r)) };
  });

  const allIndustryRoles = industryData.flatMap((d) => d.roles);
  const customRoles = roles.filter((r) => !allIndustryRoles.includes(r));

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
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
          <h1 className="text-2xl font-semibold text-zinc-100 mb-2">Connection Criteria</h1>
          <p className="text-sm text-zinc-500 leading-relaxed mb-4">
            We use this to filter the companies we&apos;re tracking and only
            route introductions that are actually relevant. Everything here
            can be adjusted after we start.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-600">For:</span>
            <input
              type="text" value={preparedFor} onChange={(e) => setPreparedFor(e.target.value)}
              placeholder="Name / Company"
              className="bg-transparent text-sm text-zinc-300 placeholder:text-zinc-700 border-b border-zinc-800 hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none transition-colors max-w-xs pb-0.5"
            />
          </div>
        </div>

        {/* ── STEP 1: Company Criteria (collaborative, easy) ── */}
        <div className="mb-10">
          <div className="flex items-baseline gap-3 mb-1">
            <h2 className="text-sm font-medium text-zinc-200">Company Criteria</h2>
          </div>
          <p className="text-xs text-zinc-600 mb-5">
            What kind of companies are your sweet spot?
          </p>

          <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/40 overflow-hidden">
            {[
              { label: "Employee Count", content: (
                <div className="flex items-center gap-2">
                  <input value={employeeMin} onChange={(e) => setEmployeeMin(e.target.value)} className="bg-transparent font-mono text-sm text-zinc-100 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-20 pb-0.5" />
                  <span className="text-zinc-600">to</span>
                  <input value={employeeMax} onChange={(e) => setEmployeeMax(e.target.value)} className="bg-transparent font-mono text-sm text-zinc-100 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-20 pb-0.5" />
                </div>
              )},
              { label: "Revenue Range", content: (
                <div className="flex items-center gap-2">
                  <input value={revenueMin} onChange={(e) => setRevenueMin(e.target.value)} className="bg-transparent font-mono text-sm text-zinc-100 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-20 pb-0.5" />
                  <span className="text-zinc-600">to</span>
                  <input value={revenueMax} onChange={(e) => setRevenueMax(e.target.value)} className="bg-transparent font-mono text-sm text-zinc-100 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-20 pb-0.5" />
                </div>
              )},
              { label: "Geography", content: (
                <input value={geography} onChange={(e) => setGeography(e.target.value)} placeholder="Regions, states, metros you cover" className="bg-transparent text-sm text-zinc-100 placeholder:text-zinc-700 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-full pb-0.5" />
              )},
              { label: "Growth Signal", content: (
                <input value={growthSignal} onChange={(e) => setGrowthSignal(e.target.value)} className="bg-transparent text-sm text-zinc-100 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-full pb-0.5" />
              )},
            ].map((row, i) => (
              <div key={row.label} className={cn("grid grid-cols-[160px_1fr] gap-4 px-5 py-4", i > 0 && "border-t border-zinc-800/30")}>
                <span className="text-sm text-zinc-400">{row.label}</span>
                {row.content}
              </div>
            ))}
          </div>
        </div>

        {/* ── STEP 2: Contract Filters (you're the expert) ── */}
        <div className="mb-10">
          <h2 className="text-sm font-medium text-zinc-200 mb-1">Government Contract Filters</h2>
          <p className="text-xs text-zinc-600 mb-5">
            When a company wins a federal contract, they need labor. These
            control which wins trigger a connection.
          </p>

          <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/40 overflow-hidden">
            {[
              { label: "Contract Size", content: (
                <div className="flex items-center gap-2">
                  <input value={contractMin} onChange={(e) => setContractMin(e.target.value)} className="bg-transparent font-mono text-sm text-zinc-100 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-20 pb-0.5" />
                  <span className="text-zinc-600">to</span>
                  <input value={contractMax} onChange={(e) => setContractMax(e.target.value)} className="bg-transparent font-mono text-sm text-zinc-100 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-20 pb-0.5" />
                </div>
              )},
              { label: "Lookback", content: (
                <div className="flex items-center gap-2">
                  <input value={contractWindow} onChange={(e) => setContractWindow(e.target.value)} className="bg-transparent font-mono text-sm text-zinc-100 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-16 pb-0.5" />
                  <span className="text-sm text-zinc-600">days</span>
                </div>
              )},
              { label: "Agencies", content: (
                <input value={agencies} onChange={(e) => setAgencies(e.target.value)} className="bg-transparent text-sm text-zinc-100 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-full pb-0.5" />
              )},
              { label: "NAICS Codes", content: (
                <input value={naics} onChange={(e) => setNaics(e.target.value)} placeholder="Optional — e.g. 332, 336, 541" className="bg-transparent text-sm text-zinc-100 placeholder:text-zinc-700 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-full pb-0.5" />
              )},
            ].map((row, i) => (
              <div key={row.label} className={cn("grid grid-cols-[160px_1fr] gap-4 px-5 py-4", i > 0 && "border-t border-zinc-800/30")}>
                <span className="text-sm text-zinc-400">{row.label}</span>
                {row.content}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-800/50 my-10" />

        {/* ── STEP 3: Industries (hardball starts) ── */}
        <div className="mb-10">
          <h2 className="text-sm font-medium text-zinc-200 mb-1">
            Industries You Have Experience Staffing
          </h2>
          <p className="text-xs text-zinc-600 mb-4">
            Where do you have a track record and active bench right now?
            We only route to verticals you can actually deliver in.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {industryData.map((ind) => {
              const selected = selectedIndustries.includes(ind.id);
              return (
                <button
                  key={ind.id} onClick={() => toggleIndustry(ind.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-all text-left",
                    selected
                      ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
                      : "bg-zinc-900/40 border-zinc-800/40 text-zinc-500 hover:border-zinc-700 hover:text-zinc-400"
                  )}
                >
                  <ind.icon className="h-3.5 w-3.5 shrink-0" />
                  {ind.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── STEP 4: Roles (hardball continues) ── */}
        {selectedIndustries.length > 0 && (
          <div className="mb-10">
            <h2 className="text-sm font-medium text-zinc-200 mb-1">
              Roles You Can Fill Right Now
            </h2>
            <p className="text-xs text-zinc-600 mb-4">
              Not aspirational — what you have active supply for today.
              Remove anything you can&apos;t deliver on within two weeks.
            </p>

            {rolesByIndustry.map(({ industry, roles: indRoles }) => (
              <div key={industry.id} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <industry.icon className="h-3 w-3 text-zinc-600" />
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{industry.label}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {indRoles.map((role) => (
                    <span key={role} className="group text-sm px-2.5 py-1 rounded-lg bg-zinc-900/60 border border-zinc-800/40 text-zinc-300 flex items-center gap-1.5">
                      {role}
                      <button onClick={() => removeRole(role)} className="text-zinc-700 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {indRoles.length === 0 && <span className="text-xs text-zinc-700 italic">All removed</span>}
                </div>
              </div>
            ))}

            {customRoles.length > 0 && (
              <div className="mb-4">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 block">Custom</span>
                <div className="flex flex-wrap gap-1.5">
                  {customRoles.map((role) => (
                    <span key={role} className="group text-sm px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex items-center gap-1.5">
                      {role}
                      <button onClick={() => setRoles((prev) => prev.filter((r) => r !== role))} className="text-indigo-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mt-3">
              <input
                type="text" value={newRole} onChange={(e) => setNewRole(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addRole()}
                placeholder="Add a role..."
                className="bg-transparent text-sm text-zinc-400 placeholder:text-zinc-700 border-b border-zinc-800 focus:border-indigo-500/50 focus:outline-none transition-colors w-48 pb-0.5"
              />
              {newRole && <button onClick={addRole} className="text-indigo-400 hover:text-indigo-300"><Plus className="h-4 w-4" /></button>}
            </div>
          </div>
        )}

        {/* ── STEP 5: Delivery Capability (hardball continues) ── */}
        {selectedIndustries.length > 0 && (
          <div className="mb-10">
            <h2 className="text-sm font-medium text-zinc-200 mb-1">
              Delivery Capability
            </h2>
            <p className="text-xs text-zinc-600 mb-5">
              The companies we introduce you to are actively growing and
              expect a partner who can move. We need to make sure any
              intro we make is one you can follow through on.
            </p>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/40 overflow-hidden">
              <div className="grid grid-cols-[180px_1fr] gap-4 px-5 py-4">
                <span className="text-sm text-zinc-400">Time to fill</span>
                <input
                  value={timeToFill} onChange={(e) => setTimeToFill(e.target.value)}
                  placeholder="How quickly can you get someone started?"
                  className="bg-transparent text-sm text-zinc-100 placeholder:text-zinc-700 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-full pb-0.5"
                />
              </div>
              <div className="grid grid-cols-[180px_1fr] gap-4 px-5 py-4 border-t border-zinc-800/30">
                <span className="text-sm text-zinc-400">Placement type</span>
                <input
                  value={placementType} onChange={(e) => setPlacementType(e.target.value)}
                  placeholder="Contract, contract-to-hire, direct, or mix?"
                  className="bg-transparent text-sm text-zinc-100 placeholder:text-zinc-700 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-full pb-0.5"
                />
              </div>
              <div className="grid grid-cols-[180px_1fr] gap-4 px-5 py-4 border-t border-zinc-800/30">
                <span className="text-sm text-zinc-400">Geographic reach</span>
                <input
                  value={geoReach} onChange={(e) => setGeoReach(e.target.value)}
                  placeholder="Can you deploy outside your metro?"
                  className="bg-transparent text-sm text-zinc-100 placeholder:text-zinc-700 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-full pb-0.5"
                />
              </div>
            </div>
          </div>
        )}

        {selectedIndustries.length > 0 && <div className="border-t border-zinc-800/50 my-10" />}

        {/* ── STEP 6: Contact Titles (back to collaborative) ── */}
        {selectedIndustries.length > 0 && (
          <div className="mb-10">
            <h2 className="text-sm font-medium text-zinc-200 mb-1">
              Contact Titles
            </h2>
            <p className="text-xs text-zinc-600 mb-4">
              We confirm the right person before making any intro. These are the
              titles we typically see making staffing decisions — adjust if needed.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {contacts.map((contact, i) => (
                <div key={i} className="rounded-lg bg-zinc-900/60 border border-zinc-800/40 px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <UserCheck className="h-3 w-3 text-zinc-600 shrink-0" />
                    <input
                      value={contact.title} onChange={(e) => updateContact(i, "title", e.target.value)}
                      className="bg-transparent text-sm font-medium text-zinc-200 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-full pb-0.5"
                    />
                  </div>
                  <input
                    value={contact.context} onChange={(e) => updateContact(i, "context", e.target.value)}
                    className="bg-transparent text-xs text-zinc-600 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-full ml-5 pb-0.5"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 7: Your Team (wind-down, logistics) ── */}
        {selectedIndustries.length > 0 && (
          <div className="mb-10">
            <h2 className="text-sm font-medium text-zinc-200 mb-1">Your Team</h2>
            <p className="text-xs text-zinc-600 mb-5">
              Who&apos;s on the other end when we make an intro?
            </p>

            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/40 overflow-hidden">
              <div className="grid grid-cols-[180px_1fr] gap-4 px-5 py-4">
                <span className="text-sm text-zinc-400">Point person</span>
                <input
                  value={pointPerson} onChange={(e) => setPointPerson(e.target.value)}
                  placeholder="Who's taking these meetings?"
                  className="bg-transparent text-sm text-zinc-100 placeholder:text-zinc-700 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-full pb-0.5"
                />
              </div>
              <div className="grid grid-cols-[180px_1fr] gap-4 px-5 py-4 border-t border-zinc-800/30">
                <span className="text-sm text-zinc-400">Team size</span>
                <div className="flex items-center gap-2">
                  <input
                    value={teamSize} onChange={(e) => setTeamSize(e.target.value)}
                    placeholder="e.g. 3"
                    className="bg-transparent font-mono text-sm text-zinc-100 placeholder:text-zinc-700 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-16 pb-0.5"
                  />
                  <span className="text-xs text-zinc-600">people who can take intro meetings</span>
                </div>
              </div>
              <div className="grid grid-cols-[180px_1fr] gap-4 px-5 py-4 border-t border-zinc-800/30">
                <span className="text-sm text-zinc-400">Response time</span>
                <input
                  value={responseTime} onChange={(e) => setResponseTime(e.target.value)}
                  className="bg-transparent text-sm text-zinc-100 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500/50 focus:outline-none w-full pb-0.5"
                />
              </div>
            </div>
          </div>
        )}

        {/* Job postings — light mention */}
        {selectedIndustries.length > 0 && (
          <>
            <div className="border-t border-zinc-800/50 my-10" />
            <div className="mb-10">
              <p className="text-sm text-zinc-500 leading-relaxed">
                In addition to government contract wins, we monitor active job postings
                across major boards. Companies posting heavily for the roles you place
                are flagged as an additional signal — even without a contract win.
              </p>
            </div>
          </>
        )}

        {/* Notes */}
        <div className="mb-10">
          <h2 className="text-sm font-medium text-zinc-200 mb-3">Notes</h2>
          <textarea
            value={notes} onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything else..."
            rows={4}
            className="w-full bg-zinc-900/40 border border-zinc-800/40 rounded-lg px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-700 focus:border-indigo-500/30 focus:outline-none transition-colors resize-none"
          />
        </div>

        <div className="pt-6 border-t border-zinc-800/30 text-xs text-zinc-700">
          StaffingEdge · Connection Criteria
        </div>
      </div>
    </div>
  );
}
