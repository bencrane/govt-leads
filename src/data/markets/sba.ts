import type {
  MarketDataset,
  Company,
  Signal,
  SignalList,
  TimeSeriesPoint,
  ChartSeries,
  MarketSector,
  TopHiringCompany,
  SectorDetail,
  PipelineEntry,
  PipelineEntryDetail,
} from "@/types";

// ─────────────────────────────────────────────────────────────────
// SBA Borrowers — 20 entities mapped to SBA loan record shapes
// `headcount` = jobs_supported (from SBA loan record)
// `yearFounded` = origination_year (loan grant year)
// `sector` = NAICS industry name
// `revenueEstimate` = loan_amount range (or "$Xk / Y(a)" string)
// `jobPostings` = loan activity events (originated, paid off, refinanced, expansion)
// ─────────────────────────────────────────────────────────────────

const companies: Company[] = [
  {
    id: "sba-01",
    name: "Sunrise Diner LLC",
    city: "Phoenix", state: "AZ",
    sector: "Restaurants",
    headcount: 14, headcountGrowth: 12,
    yearFounded: 2024,
    revenueEstimate: "$385K · 7(a)",
    jobPostings: [
      { title: "7(a) loan originated — $385K", location: "Live Oak Bank · 2024-09", count: 385 },
      { title: "Annual SBA Form 1502 filed", location: "On-time payment record", count: 12 },
    ],
  },
  {
    id: "sba-02",
    name: "Midwest Auto Service Inc",
    city: "Cleveland", state: "OH",
    sector: "Auto Repair",
    headcount: 22, headcountGrowth: 8,
    yearFounded: 2023,
    revenueEstimate: "$475K · 7(a)",
    jobPostings: [
      { title: "7(a) loan originated — $475K", location: "Huntington Bank · 2023-04", count: 475 },
      { title: "Annual SBA Form 1502 filed", location: "On-time payment record", count: 18 },
    ],
  },
  {
    id: "sba-03",
    name: "Riverside Family Dentistry PLLC",
    city: "Charleston", state: "SC",
    sector: "Healthcare",
    headcount: 18, headcountGrowth: 22,
    yearFounded: 2024,
    revenueEstimate: "$720K · 7(a)",
    jobPostings: [
      { title: "7(a) loan originated — $720K", location: "Newtek Small Business · 2024-06", count: 720 },
      { title: "Facility expansion — equipment", location: "Charleston, SC", count: 1 },
    ],
  },
  {
    id: "sba-04",
    name: "Ironworks Fitness Gym LLC",
    city: "Austin", state: "TX",
    sector: "Fitness",
    headcount: 9, headcountGrowth: 5,
    yearFounded: 2025,
    revenueEstimate: "$245K · 7(a) Express",
    jobPostings: [
      { title: "7(a) Express loan originated — $245K", location: "Frost Bank · 2025-02", count: 245 },
    ],
  },
  {
    id: "sba-05",
    name: "Patel Hospitality LLC dba Subway #4892",
    city: "Newark", state: "NJ",
    sector: "QSR / Franchise",
    headcount: 11, headcountGrowth: 0,
    yearFounded: 2022,
    revenueEstimate: "$185K · 7(a)",
    jobPostings: [
      { title: "7(a) loan originated — $185K", location: "Customers Bank · 2022-08", count: 185 },
      { title: "Franchise: SUBWAY", location: "Unit #4892, single-unit operator", count: 1 },
      { title: "Annual SBA Form 1502 filed", location: "On-time payment record", count: 36 },
    ],
  },
  {
    id: "sba-06",
    name: "Coastal Pediatric Group LLC",
    city: "Tampa", state: "FL",
    sector: "Healthcare",
    headcount: 24, headcountGrowth: 18,
    yearFounded: 2024,
    revenueEstimate: "$1.2M · 504",
    jobPostings: [
      { title: "504 loan originated — $1.2M", location: "Florida First CDC · 2024-11", count: 1200 },
      { title: "Real estate acquisition", location: "Medical office building, Tampa", count: 1 },
    ],
  },
  {
    id: "sba-07",
    name: "Mountain View Brewery LLC",
    city: "Asheville", state: "NC",
    sector: "Restaurants",
    headcount: 18, headcountGrowth: 24,
    yearFounded: 2024,
    revenueEstimate: "$620K · 7(a)",
    jobPostings: [
      { title: "7(a) loan originated — $620K", location: "First Citizens Bank · 2024-08", count: 620 },
      { title: "Equipment installation milestone", location: "Asheville taproom build-out", count: 1 },
    ],
  },
  {
    id: "sba-08",
    name: "Three Sisters Bakery Co",
    city: "Madison", state: "WI",
    sector: "Restaurants",
    headcount: 7, headcountGrowth: 14,
    yearFounded: 2025,
    revenueEstimate: "$145K · 7(a) Express",
    jobPostings: [
      { title: "7(a) Express loan originated — $145K", location: "Old National Bank · 2025-03", count: 145 },
    ],
  },
  {
    id: "sba-09",
    name: "Apex CrossFit Holdings LLC",
    city: "Denver", state: "CO",
    sector: "Fitness / Franchise",
    headcount: 12, headcountGrowth: 10,
    yearFounded: 2023,
    revenueEstimate: "$385K · 7(a)",
    jobPostings: [
      { title: "7(a) loan originated — $385K", location: "ApplePie Capital · 2023-07", count: 385 },
      { title: "Franchise: CROSSFIT", location: "Single-unit operator, Denver", count: 1 },
    ],
  },
  {
    id: "sba-10",
    name: "Continental Auto Body Inc",
    city: "Detroit", state: "MI",
    sector: "Auto Repair",
    headcount: 19, headcountGrowth: 8,
    yearFounded: 2022,
    revenueEstimate: "$580K · 504",
    jobPostings: [
      { title: "504 loan originated — $580K", location: "Michigan Certified Development · 2022-11", count: 580 },
      { title: "Loan paid in full", location: "2025-12 · 36-month accelerated", count: 1 },
    ],
  },
  {
    id: "sba-11",
    name: "Suncoast Storage Solutions LLC",
    city: "Sarasota", state: "FL",
    sector: "Storage / CRE",
    headcount: 8, headcountGrowth: 28,
    yearFounded: 2024,
    revenueEstimate: "$1.85M · 504",
    jobPostings: [
      { title: "504 loan originated — $1.85M", location: "Florida First CDC · 2024-04", count: 1850 },
      { title: "Real estate acquisition", location: "Self-storage facility, Sarasota", count: 1 },
    ],
  },
  {
    id: "sba-12",
    name: "Heartland Veterinary Services PC",
    city: "Omaha", state: "NE",
    sector: "Healthcare",
    headcount: 16, headcountGrowth: 12,
    yearFounded: 2023,
    revenueEstimate: "$480K · 7(a)",
    jobPostings: [
      { title: "7(a) loan originated — $480K", location: "Pinnacle Bank · 2023-09", count: 480 },
      { title: "Annual SBA Form 1502 filed", location: "On-time payment record", count: 24 },
    ],
  },
  {
    id: "sba-13",
    name: "Sharma Hotels LLC dba Comfort Inn",
    city: "Plano", state: "TX",
    sector: "Hotels / Franchise",
    headcount: 32, headcountGrowth: 6,
    yearFounded: 2023,
    revenueEstimate: "$4.2M · 504",
    jobPostings: [
      { title: "504 loan originated — $4.2M", location: "Texas Certified Development · 2023-06", count: 4200 },
      { title: "Franchise: CHOICE HOTELS", location: "Comfort Inn flag, single-unit operator", count: 1 },
      { title: "Real estate acquisition", location: "70-room property, Plano TX", count: 1 },
    ],
  },
  {
    id: "sba-14",
    name: "Bridgepoint Manufacturing LLC",
    city: "Pittsburgh", state: "PA",
    sector: "Manufacturing",
    headcount: 28, headcountGrowth: 15,
    yearFounded: 2024,
    revenueEstimate: "$720K · 7(a)",
    jobPostings: [
      { title: "7(a) loan originated — $720K", location: "PNC Bank · 2024-10", count: 720 },
      { title: "Equipment financing milestone", location: "CNC machining line", count: 1 },
    ],
  },
  {
    id: "sba-15",
    name: "Lone Star Pawnbrokers Inc",
    city: "Houston", state: "TX",
    sector: "Personal Services",
    headcount: 6, headcountGrowth: 4,
    yearFounded: 2025,
    revenueEstimate: "$185K · 7(a) Express",
    jobPostings: [
      { title: "7(a) Express loan originated — $185K", location: "Cadence Bank · 2025-01", count: 185 },
    ],
  },
  {
    id: "sba-16",
    name: "Pacific Yoga Studios LLC",
    city: "Portland", state: "OR",
    sector: "Fitness / Franchise",
    headcount: 10, headcountGrowth: 14,
    yearFounded: 2024,
    revenueEstimate: "$245K · 7(a)",
    jobPostings: [
      { title: "7(a) loan originated — $245K", location: "Umpqua Bank · 2024-05", count: 245 },
      { title: "Franchise: CORE POWER YOGA", location: "Single-unit operator, Portland", count: 1 },
    ],
  },
  {
    id: "sba-17",
    name: "Reyes Auto Glass Service LLC",
    city: "San Antonio", state: "TX",
    sector: "Auto Repair",
    headcount: 5, headcountGrowth: 8,
    yearFounded: 2025,
    revenueEstimate: "$145K · 7(a) Express",
    jobPostings: [
      { title: "7(a) Express loan originated — $145K", location: "Frost Bank · 2025-02", count: 145 },
    ],
  },
  {
    id: "sba-18",
    name: "New England Daycare Partners LLC",
    city: "Manchester", state: "NH",
    sector: "Personal Services",
    headcount: 22, headcountGrowth: 18,
    yearFounded: 2023,
    revenueEstimate: "$385K · 7(a)",
    jobPostings: [
      { title: "7(a) loan originated — $385K", location: "Citizens Bank · 2023-11", count: 385 },
      { title: "New location opened", location: "Manchester satellite facility", count: 1 },
    ],
  },
  {
    id: "sba-19",
    name: "Mountain West Logistics LLC",
    city: "Salt Lake City", state: "UT",
    sector: "Logistics",
    headcount: 16, headcountGrowth: 22,
    yearFounded: 2024,
    revenueEstimate: "$580K · 7(a)",
    jobPostings: [
      { title: "7(a) loan originated — $580K", location: "Zions Bank · 2024-07", count: 580 },
      { title: "Fleet expansion via SBA proceeds", location: "+6 power units", count: 6 },
    ],
  },
  {
    id: "sba-20",
    name: "Bayou Brewhouse & Grill LLC",
    city: "Baton Rouge", state: "LA",
    sector: "Restaurants",
    headcount: 24, headcountGrowth: 20,
    yearFounded: 2024,
    revenueEstimate: "$720K · 7(a)",
    jobPostings: [
      { title: "7(a) loan originated — $720K", location: "First Horizon Bank · 2024-12", count: 720 },
      { title: "Full restaurant build-out completed", location: "Baton Rouge, LA", count: 1 },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// Signals — SBA-flavor loan events
// ─────────────────────────────────────────────────────────────────

const signals: Signal[] = [
  { id: "s-sba-01", companyId: "sba-01", companyName: "Sunrise Diner LLC", companyLocation: "Phoenix, AZ", type: "loan_origination", headline: "7(a) loan originated — $385K", detail: "Live Oak Bank funded $385K 7(a) for restaurant build-out + working capital.", value: 385, metric: "K loan size", daysAgo: 2, timestamp: "2026-04-17", sector: "Restaurants" },
  { id: "s-sba-02", companyId: "sba-03", companyName: "Riverside Family Dentistry PLLC", companyLocation: "Charleston, SC", type: "loan_origination", headline: "7(a) loan originated — $720K", detail: "Newtek funded $720K 7(a) for practice acquisition + equipment.", value: 720, metric: "K loan size", daysAgo: 1, timestamp: "2026-04-18", sector: "Healthcare" },
  { id: "s-sba-03", companyId: "sba-03", companyName: "Riverside Family Dentistry PLLC", companyLocation: "Charleston, SC", type: "expansion", headline: "Facility expansion underway", detail: "Adding 2 operatory rooms; equipment delivery scheduled Q3.", daysAgo: 4, timestamp: "2026-04-15", sector: "Healthcare" },
  { id: "s-sba-04", companyId: "sba-06", companyName: "Coastal Pediatric Group LLC", companyLocation: "Tampa, FL", type: "loan_origination", headline: "504 loan originated — $1.2M", detail: "Florida First CDC funded $1.2M 504 for medical office real estate.", value: 1200, metric: "K loan size", daysAgo: 3, timestamp: "2026-04-16", sector: "Healthcare" },
  { id: "s-sba-05", companyId: "sba-07", companyName: "Mountain View Brewery LLC", companyLocation: "Asheville, NC", type: "loan_origination", headline: "7(a) loan originated — $620K", detail: "First Citizens funded $620K 7(a) for taproom build-out + equipment.", value: 620, metric: "K loan size", daysAgo: 2, timestamp: "2026-04-17", sector: "Restaurants" },
  { id: "s-sba-06", companyId: "sba-10", companyName: "Continental Auto Body Inc", companyLocation: "Detroit, MI", type: "loan_paid_off", headline: "504 loan paid in full — 36-month accelerated", detail: "Detroit auto body shop retired $580K 504 loan ahead of 10-year schedule.", value: 580, metric: "K retired", daysAgo: 5, timestamp: "2026-04-14", sector: "Auto Repair" },
  { id: "s-sba-07", companyId: "sba-11", companyName: "Suncoast Storage Solutions LLC", companyLocation: "Sarasota, FL", type: "loan_origination", headline: "504 loan originated — $1.85M", detail: "Florida First CDC funded $1.85M 504 for self-storage facility acquisition.", value: 1850, metric: "K loan size", daysAgo: 1, timestamp: "2026-04-18", sector: "Storage / CRE" },
  { id: "s-sba-08", companyId: "sba-12", companyName: "Heartland Veterinary Services PC", companyLocation: "Omaha, NE", type: "loan_origination", headline: "7(a) loan originated — $480K", detail: "Pinnacle Bank funded $480K 7(a) for vet practice acquisition.", value: 480, metric: "K loan size", daysAgo: 4, timestamp: "2026-04-15", sector: "Healthcare" },
  { id: "s-sba-09", companyId: "sba-13", companyName: "Sharma Hotels LLC dba Comfort Inn", companyLocation: "Plano, TX", type: "loan_origination", headline: "504 loan originated — $4.2M", detail: "Texas Certified Development funded $4.2M 504 for 70-room Comfort Inn acquisition.", value: 4200, metric: "K loan size", daysAgo: 3, timestamp: "2026-04-16", sector: "Hotels / Franchise" },
  { id: "s-sba-10", companyId: "sba-14", companyName: "Bridgepoint Manufacturing LLC", companyLocation: "Pittsburgh, PA", type: "loan_origination", headline: "7(a) loan originated — $720K", detail: "PNC Bank funded $720K 7(a) for CNC machining line + working capital.", value: 720, metric: "K loan size", daysAgo: 2, timestamp: "2026-04-17", sector: "Manufacturing" },
  { id: "s-sba-11", companyId: "sba-18", companyName: "New England Daycare Partners LLC", companyLocation: "Manchester, NH", type: "expansion", headline: "New location opened in Manchester", detail: "Second daycare location with SBA-funded build-out; +18 children capacity.", daysAgo: 4, timestamp: "2026-04-15", sector: "Personal Services" },
  { id: "s-sba-12", companyId: "sba-19", companyName: "Mountain West Logistics LLC", companyLocation: "Salt Lake City, UT", type: "loan_origination", headline: "7(a) loan originated — $580K", detail: "Zions Bank funded $580K 7(a) for fleet expansion (+6 PU).", value: 580, metric: "K loan size", daysAgo: 1, timestamp: "2026-04-18", sector: "Logistics" },
  { id: "s-sba-13", companyId: "sba-20", companyName: "Bayou Brewhouse & Grill LLC", companyLocation: "Baton Rouge, LA", type: "loan_origination", headline: "7(a) loan originated — $720K", detail: "First Horizon funded $720K 7(a) for restaurant build-out + opening capital.", value: 720, metric: "K loan size", daysAgo: 2, timestamp: "2026-04-17", sector: "Restaurants" },
  { id: "s-sba-14", companyId: "sba-04", companyName: "Ironworks Fitness Gym LLC", companyLocation: "Austin, TX", type: "loan_origination", headline: "7(a) Express loan originated — $245K", detail: "Frost Bank funded $245K Express loan for fitness studio working capital.", value: 245, metric: "K loan size", daysAgo: 5, timestamp: "2026-04-14", sector: "Fitness" },
  { id: "s-sba-15", companyId: "sba-08", companyName: "Three Sisters Bakery Co", companyLocation: "Madison, WI", type: "loan_origination", headline: "7(a) Express loan originated — $145K", detail: "Old National funded $145K Express for bakery commercial kitchen build.", value: 145, metric: "K loan size", daysAgo: 3, timestamp: "2026-04-16", sector: "Restaurants" },
  { id: "s-sba-16", companyId: "sba-15", companyName: "Lone Star Pawnbrokers Inc", companyLocation: "Houston, TX", type: "loan_origination", headline: "7(a) Express loan originated — $185K", detail: "Cadence Bank funded $185K Express for inventory + working capital.", value: 185, metric: "K loan size", daysAgo: 6, timestamp: "2026-04-13", sector: "Personal Services" },
  { id: "s-sba-17", companyId: "sba-17", companyName: "Reyes Auto Glass Service LLC", companyLocation: "San Antonio, TX", type: "loan_origination", headline: "7(a) Express loan originated — $145K", detail: "Frost Bank funded $145K Express for mobile glass service van + equipment.", value: 145, metric: "K loan size", daysAgo: 4, timestamp: "2026-04-15", sector: "Auto Repair" },
  { id: "s-sba-18", companyId: "sba-05", companyName: "Patel Hospitality LLC dba Subway #4892", companyLocation: "Newark, NJ", type: "loan_paid_off", headline: "7(a) loan paid in full", detail: "Subway franchisee retired $185K 7(a) ahead of schedule.", value: 185, metric: "K retired", daysAgo: 7, timestamp: "2026-04-12", sector: "QSR / Franchise" },
  { id: "s-sba-19", companyId: "sba-02", companyName: "Midwest Auto Service Inc", companyLocation: "Cleveland, OH", type: "loan_origination", headline: "7(a) loan originated — $475K", detail: "Huntington Bank funded $475K 7(a) for shop expansion + equipment.", value: 475, metric: "K loan size", daysAgo: 8, timestamp: "2026-04-11", sector: "Auto Repair" },
  { id: "s-sba-20", companyId: "sba-09", companyName: "Apex CrossFit Holdings LLC", companyLocation: "Denver, CO", type: "loan_origination", headline: "7(a) loan originated — $385K", detail: "ApplePie Capital funded $385K 7(a) for CrossFit franchise build-out.", value: 385, metric: "K loan size", daysAgo: 5, timestamp: "2026-04-14", sector: "Fitness / Franchise" },
  { id: "s-sba-21", companyId: "sba-16", companyName: "Pacific Yoga Studios LLC", companyLocation: "Portland, OR", type: "loan_origination", headline: "7(a) loan originated — $245K", detail: "Umpqua Bank funded $245K 7(a) for CorePower Yoga build-out.", value: 245, metric: "K loan size", daysAgo: 6, timestamp: "2026-04-13", sector: "Fitness / Franchise" },
  { id: "s-sba-22", companyId: "sba-01", companyName: "Sunrise Diner LLC", companyLocation: "Phoenix, AZ", type: "expansion", headline: "Second location lease signed", detail: "Phoenix diner adding north-Phoenix satellite; SBA refi conversation in flight.", daysAgo: 1, timestamp: "2026-04-18", sector: "Restaurants" },
  { id: "s-sba-23", companyId: "sba-06", companyName: "Coastal Pediatric Group LLC", companyLocation: "Tampa, FL", type: "expansion", headline: "Practice expansion — third pediatrician hired", detail: "Coastal Pediatric onboarding third physician; capacity expansion to support 504-funded facility.", daysAgo: 6, timestamp: "2026-04-13", sector: "Healthcare" },
  { id: "s-sba-24", companyId: "sba-07", companyName: "Mountain View Brewery LLC", companyLocation: "Asheville, NC", type: "expansion", headline: "Distribution expansion to TN/SC markets", detail: "Asheville brewery announcing distribution beyond NC; canning line ordered.", daysAgo: 5, timestamp: "2026-04-14", sector: "Restaurants" },
];

// ─────────────────────────────────────────────────────────────────
// Cohort lists — lender-facing demand-side cohorts
// ─────────────────────────────────────────────────────────────────

const signalLists: SignalList[] = [
  {
    id: "list-len-a",
    name: "LEN-A — Recent 7(a) Originations (Active Pipeline)",
    description: "Borrowers funded via 7(a) in the last 12 months. Prime for cross-sell of deposit / treasury / credit card products. National + community lender appetite.",
    companyCount: 48200,
    signalStrength: 92,
    lastUpdated: "2026-04-18",
    sector: "Lender Origination",
    region: "National",
    tags: ["lender-a", "7a", "recent-origination", "cross-sell"],
    companyIds: ["sba-01", "sba-02", "sba-03", "sba-07", "sba-09", "sba-12", "sba-14", "sba-16", "sba-19", "sba-20"],
  },
  {
    id: "list-len-b",
    name: "LEN-B — Paid-in-Full Repeat Candidates",
    description: "Borrowers who paid off prior SBA loan AND show new growth signals (new location, expansion, equipment). Prime for follow-on loan origination.",
    companyCount: 8400,
    signalStrength: 96,
    lastUpdated: "2026-04-18",
    sector: "Lender Refi",
    region: "National",
    tags: ["lender-b", "paid-in-full", "repeat", "follow-on"],
    companyIds: ["sba-05", "sba-10"],
  },
  {
    id: "list-len-c",
    name: "LEN-C — Multi-Location / Expansion Borrowers",
    description: "Borrowers with new-location signals + established loan history. Strong candidates for expansion-loan or larger facility upsize.",
    companyCount: 6200,
    signalStrength: 90,
    lastUpdated: "2026-04-17",
    sector: "Lender Expansion",
    region: "National",
    tags: ["lender-c", "expansion", "multi-location", "upsize"],
    companyIds: ["sba-01", "sba-03", "sba-06", "sba-07", "sba-18"],
  },
  {
    id: "list-len-d",
    name: "LEN-D — 504 CRE Specialty Borrowers",
    description: "Borrowers active in the 504 program (CDC-backed, owner-occupied commercial real estate). CDC-specific pipeline.",
    companyCount: 4800,
    signalStrength: 88,
    lastUpdated: "2026-04-18",
    sector: "Lender 504",
    region: "National",
    tags: ["lender-d", "504", "cre", "cdc"],
    companyIds: ["sba-06", "sba-10", "sba-11", "sba-13"],
  },
  {
    id: "list-len-e",
    name: "LEN-E — Sub-$150K Express Pipeline",
    description: "7(a) Express borrowers (loans ≤$500K, simplified underwriting). High velocity, low-touch lender appetite.",
    companyCount: 22400,
    signalStrength: 81,
    lastUpdated: "2026-04-18",
    sector: "Lender Express",
    region: "National",
    tags: ["lender-e", "express", "small-loan", "simplified"],
    companyIds: ["sba-04", "sba-08", "sba-15", "sba-17"],
  },
  {
    id: "list-len-f",
    name: "LEN-F — Franchise Specialty Borrowers",
    description: "SBA borrowers with active franchise affiliation (QSR, fitness, hospitality, services). Crossover with the Franchise market — routes to franchise-specialty lenders.",
    companyCount: 12600,
    signalStrength: 93,
    lastUpdated: "2026-04-18",
    sector: "Lender Franchise",
    region: "National",
    tags: ["lender-f", "franchise", "specialty", "cross-market"],
    companyIds: ["sba-05", "sba-09", "sba-13", "sba-16"],
  },
];

// ─────────────────────────────────────────────────────────────────
// Charts — 12 months
// Contract velocity = monthly origination $ by program
// Hiring chart = active loan portfolio $ (in $B)
// ─────────────────────────────────────────────────────────────────

const contractChartData: TimeSeriesPoint[] = [
  { month: "May '25", program_7a: 2.4, program_504: 0.92, express: 0.68, microloan: 0.04 },
  { month: "Jun '25", program_7a: 2.5, program_504: 0.95, express: 0.71, microloan: 0.04 },
  { month: "Jul '25", program_7a: 2.6, program_504: 1.02, express: 0.74, microloan: 0.05 },
  { month: "Aug '25", program_7a: 2.7, program_504: 1.05, express: 0.76, microloan: 0.05 },
  { month: "Sep '25", program_7a: 2.8, program_504: 1.08, express: 0.78, microloan: 0.05 },
  { month: "Oct '25", program_7a: 2.9, program_504: 1.12, express: 0.81, microloan: 0.05 },
  { month: "Nov '25", program_7a: 2.95, program_504: 1.15, express: 0.83, microloan: 0.06 },
  { month: "Dec '25", program_7a: 2.8, program_504: 1.10, express: 0.79, microloan: 0.05 },
  { month: "Jan '26", program_7a: 3.1, program_504: 1.18, express: 0.86, microloan: 0.06 },
  { month: "Feb '26", program_7a: 3.2, program_504: 1.22, express: 0.88, microloan: 0.06 },
  { month: "Mar '26", program_7a: 3.3, program_504: 1.25, express: 0.91, microloan: 0.06 },
  { month: "Apr '26", program_7a: 3.4, program_504: 1.28, express: 0.93, microloan: 0.07 },
];

const contractChartSeries: ChartSeries[] = [
  { key: "program_7a", label: "7(a) Standard", color: "#3b82f6" },
  { key: "program_504", label: "504 CDC", color: "#10b981" },
  { key: "express", label: "7(a) Express", color: "#f59e0b" },
  { key: "microloan", label: "Microloan", color: "#8b5cf6" },
];

const hiringChartData: TimeSeriesPoint[] = [
  { month: "May '25", restaurants: 12.2, healthcare: 8.4, retail: 9.6, services: 7.8 },
  { month: "Jun '25", restaurants: 12.4, healthcare: 8.5, retail: 9.7, services: 7.9 },
  { month: "Jul '25", restaurants: 12.6, healthcare: 8.7, retail: 9.8, services: 8.0 },
  { month: "Aug '25", restaurants: 12.8, healthcare: 8.9, retail: 9.9, services: 8.1 },
  { month: "Sep '25", restaurants: 13.0, healthcare: 9.0, retail: 10.0, services: 8.3 },
  { month: "Oct '25", restaurants: 13.2, healthcare: 9.2, retail: 10.1, services: 8.4 },
  { month: "Nov '25", restaurants: 13.3, healthcare: 9.3, retail: 10.2, services: 8.5 },
  { month: "Dec '25", restaurants: 13.4, healthcare: 9.4, retail: 10.2, services: 8.5 },
  { month: "Jan '26", restaurants: 13.6, healthcare: 9.5, retail: 10.3, services: 8.6 },
  { month: "Feb '26", restaurants: 13.8, healthcare: 9.7, retail: 10.4, services: 8.7 },
  { month: "Mar '26", restaurants: 14.0, healthcare: 9.8, retail: 10.5, services: 8.8 },
  { month: "Apr '26", restaurants: 14.2, healthcare: 9.9, retail: 10.6, services: 8.9 },
];

const hiringChartSeries: ChartSeries[] = [
  { key: "restaurants", label: "Restaurants", color: "#f59e0b" },
  { key: "healthcare", label: "Healthcare", color: "#10b981" },
  { key: "retail", label: "Retail", color: "#3b82f6" },
  { key: "services", label: "Personal Services", color: "#8b5cf6" },
];

// ─────────────────────────────────────────────────────────────────
// Market sectors — industry rollup by SBA loan portfolio
// ─────────────────────────────────────────────────────────────────

const marketSectors: MarketSector[] = [
  { id: "ms-rst", name: "Restaurants", activePostings: 142000, monthOverMonthGrowth: 8, companiesHiring: 4800, iconKey: "Briefcase", colorKey: "amber" },
  { id: "ms-hc", name: "Healthcare", activePostings: 98000, monthOverMonthGrowth: 14, companiesHiring: 3200, iconKey: "Heart", colorKey: "emerald" },
  { id: "ms-ret", name: "Retail", activePostings: 106000, monthOverMonthGrowth: 6, companiesHiring: 3600, iconKey: "Building2", colorKey: "blue" },
  { id: "ms-svc", name: "Personal Services", activePostings: 89000, monthOverMonthGrowth: 12, companiesHiring: 2900, iconKey: "Users", colorKey: "violet" },
  { id: "ms-auto", name: "Auto Repair", activePostings: 42000, monthOverMonthGrowth: 9, companiesHiring: 1400, iconKey: "Wrench", colorKey: "cyan" },
  { id: "ms-hot", name: "Hotels", activePostings: 28000, monthOverMonthGrowth: 5, companiesHiring: 920, iconKey: "Building2", colorKey: "red" },
];

const topHiringCompanies: TopHiringCompany[] = [
  { id: "th-sba-1", name: "Sharma Hotels LLC dba Comfort Inn", sector: "Hotels / Franchise", location: "Plano, TX", openRoles: 4200, headcountGrowth: 6, topRole: "504 — $4.2M" },
  { id: "th-sba-2", name: "Suncoast Storage Solutions LLC", sector: "Storage / CRE", location: "Sarasota, FL", openRoles: 1850, headcountGrowth: 28, topRole: "504 — $1.85M" },
  { id: "th-sba-3", name: "Coastal Pediatric Group LLC", sector: "Healthcare", location: "Tampa, FL", openRoles: 1200, headcountGrowth: 18, topRole: "504 — $1.2M" },
  { id: "th-sba-4", name: "Riverside Family Dentistry PLLC", sector: "Healthcare", location: "Charleston, SC", openRoles: 720, headcountGrowth: 22, topRole: "7(a) — $720K" },
  { id: "th-sba-5", name: "Bridgepoint Manufacturing LLC", sector: "Manufacturing", location: "Pittsburgh, PA", openRoles: 720, headcountGrowth: 15, topRole: "7(a) — $720K" },
  { id: "th-sba-6", name: "Bayou Brewhouse & Grill LLC", sector: "Restaurants", location: "Baton Rouge, LA", openRoles: 720, headcountGrowth: 20, topRole: "7(a) — $720K" },
  { id: "th-sba-7", name: "Mountain View Brewery LLC", sector: "Restaurants", location: "Asheville, NC", openRoles: 620, headcountGrowth: 24, topRole: "7(a) — $620K" },
  { id: "th-sba-8", name: "Continental Auto Body Inc", sector: "Auto Repair", location: "Detroit, MI", openRoles: 580, headcountGrowth: 8, topRole: "504 — $580K (paid)" },
  { id: "th-sba-9", name: "Mountain West Logistics LLC", sector: "Logistics", location: "Salt Lake City, UT", openRoles: 580, headcountGrowth: 22, topRole: "7(a) — $580K" },
  { id: "th-sba-10", name: "Heartland Veterinary Services PC", sector: "Healthcare", location: "Omaha, NE", openRoles: 480, headcountGrowth: 12, topRole: "7(a) — $480K" },
];

const sectorDetails: Record<string, SectorDetail> = {
  Restaurants: {
    roles: [
      { title: "Full-Service Restaurants", count: 58000, growth: 8 },
      { title: "Limited-Service / QSR", count: 42000, growth: 6 },
      { title: "Breweries / Distilleries", count: 8400, growth: 22 },
      { title: "Catering", count: 6200, growth: 10 },
      { title: "Cafes / Coffee", count: 12400, growth: 12 },
      { title: "Food Trucks", count: 4800, growth: 18 },
    ],
    regions: [
      { name: "Texas", postings: 22000, growth: 12 },
      { name: "Florida", postings: 18000, growth: 10 },
      { name: "California", postings: 16000, growth: 6 },
      { name: "New York", postings: 12000, growth: 5 },
      { name: "Georgia", postings: 10000, growth: 14 },
      { name: "North Carolina", postings: 8500, growth: 16 },
    ],
    companies: [
      { name: "Sunrise Diner LLC", location: "Phoenix, AZ", openRoles: 385, headcountGrowth: 12, topRole: "7(a) — $385K" },
      { name: "Mountain View Brewery LLC", location: "Asheville, NC", openRoles: 620, headcountGrowth: 24, topRole: "7(a) — $620K" },
      { name: "Three Sisters Bakery Co", location: "Madison, WI", openRoles: 145, headcountGrowth: 14, topRole: "Express — $145K" },
      { name: "Bayou Brewhouse & Grill LLC", location: "Baton Rouge, LA", openRoles: 720, headcountGrowth: 20, topRole: "7(a) — $720K" },
      { name: "Carolina BBQ Holdings Inc", location: "Charlotte, NC", openRoles: 480, headcountGrowth: 18, topRole: "7(a) — $480K" },
      { name: "Pacific Northwest Coffee Co", location: "Seattle, WA", openRoles: 320, headcountGrowth: 16, topRole: "7(a) — $320K" },
    ],
    trendData: [
      { month: "May '25", postings: 122 }, { month: "Jun '25", postings: 124 }, { month: "Jul '25", postings: 126 },
      { month: "Aug '25", postings: 128 }, { month: "Sep '25", postings: 130 }, { month: "Oct '25", postings: 132 },
      { month: "Nov '25", postings: 133 }, { month: "Dec '25", postings: 134 }, { month: "Jan '26", postings: 136 },
      { month: "Feb '26", postings: 138 }, { month: "Mar '26", postings: 140 }, { month: "Apr '26", postings: 142 },
    ],
  },
  Healthcare: {
    roles: [
      { title: "Medical & Dental Practices", count: 38000, growth: 18 },
      { title: "Veterinary", count: 12400, growth: 14 },
      { title: "Outpatient Clinics", count: 22000, growth: 16 },
      { title: "Physical Therapy", count: 8200, growth: 22 },
      { title: "Pediatric Specialty", count: 6800, growth: 20 },
      { title: "Home Health", count: 10600, growth: 12 },
    ],
    regions: [
      { name: "Florida", postings: 18000, growth: 22 },
      { name: "Texas", postings: 15000, growth: 18 },
      { name: "California", postings: 12000, growth: 14 },
      { name: "North Carolina", postings: 10000, growth: 24 },
      { name: "Georgia", postings: 8500, growth: 16 },
      { name: "South Carolina", postings: 6800, growth: 28 },
    ],
    companies: [
      { name: "Coastal Pediatric Group LLC", location: "Tampa, FL", openRoles: 1200, headcountGrowth: 18, topRole: "504 — $1.2M" },
      { name: "Riverside Family Dentistry PLLC", location: "Charleston, SC", openRoles: 720, headcountGrowth: 22, topRole: "7(a) — $720K" },
      { name: "Heartland Veterinary Services PC", location: "Omaha, NE", openRoles: 480, headcountGrowth: 12, topRole: "7(a) — $480K" },
      { name: "Mountain West Physical Therapy LLC", location: "Boise, ID", openRoles: 380, headcountGrowth: 18, topRole: "7(a) — $380K" },
      { name: "Gulf Coast Family Dental Inc", location: "New Orleans, LA", openRoles: 580, headcountGrowth: 14, topRole: "7(a) — $580K" },
      { name: "Sunbelt Outpatient Surgery LLC", location: "Charlotte, NC", openRoles: 920, headcountGrowth: 24, topRole: "504 — $920K" },
    ],
    trendData: [
      { month: "May '25", postings: 84 }, { month: "Jun '25", postings: 85 }, { month: "Jul '25", postings: 87 },
      { month: "Aug '25", postings: 89 }, { month: "Sep '25", postings: 90 }, { month: "Oct '25", postings: 92 },
      { month: "Nov '25", postings: 93 }, { month: "Dec '25", postings: 94 }, { month: "Jan '26", postings: 95 },
      { month: "Feb '26", postings: 97 }, { month: "Mar '26", postings: 98 }, { month: "Apr '26", postings: 98 },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────
// Pipeline — borrower × lender routings
// ─────────────────────────────────────────────────────────────────

const pipelineEntries: PipelineEntry[] = [
  { id: "ps-01", status: "placed", companyDescription: "Restaurant 7(a) borrower (Phoenix)", region: "Phoenix, AZ", sector: "Restaurants", signal: "7(a) origination + recent second-location signal", partnerType: "Community lender (cross-sell)", outcome: "5 borrowers placed on treasury / depository; 3 cross-sold credit card", daysAgo: 4, roles: "LEN-A — Recent 7(a) Originations", placementCount: 5 },
  { id: "ps-02", status: "placed", companyDescription: "Pediatric medical practice (504 borrower)", region: "Tampa, FL", sector: "Healthcare", signal: "Recent $1.2M 504 origination", partnerType: "504 CDC specialty lender (LEN-D)", outcome: "Follow-on facility expansion loan in underwriting; 8 cohort placements", daysAgo: 6, roles: "LEN-D — 504 CRE Specialty", placementCount: 8 },
  { id: "ps-03", status: "intro_made", companyDescription: "Subway franchisee paid-in-full", region: "Newark, NJ", sector: "QSR / Franchise", signal: "Paid in full + recent franchise unit-expansion conversation", partnerType: "Franchise specialty lender (LEN-F)", outcome: "Intro made — ApplePie Capital evaluating", daysAgo: 2, roles: "LEN-B + LEN-F (overlap)" },
  { id: "ps-04", status: "exploring", companyDescription: "Auto-body 504 borrower paid in full", region: "Detroit, MI", sector: "Auto Repair", signal: "Loan paid in full + new equipment expansion signal", partnerType: "Equipment financing lender", outcome: "Evaluating equipment financing follow-on", daysAgo: 8, roles: "LEN-B — Paid-in-Full Repeat" },
  { id: "ps-05", status: "matched", companyDescription: "Manufacturing 7(a) borrower", region: "Pittsburgh, PA", sector: "Manufacturing", signal: "$720K 7(a) + CNC equipment installation milestone", partnerType: "Equipment financing lender", outcome: "Partner identified — quote pending", daysAgo: 3, roles: "LEN-A — Recent 7(a) Originations" },
  { id: "ps-06", status: "placed", companyDescription: "Multi-location daycare operator", region: "Manchester, NH", sector: "Personal Services", signal: "New satellite location + 12-month payment record", partnerType: "Community lender (expansion)", outcome: "3 expansion loans placed; long-tail pipeline", daysAgo: 10, roles: "LEN-C — Multi-Location", placementCount: 3 },
  { id: "ps-07", status: "intro_made", companyDescription: "Comfort Inn 504 hotel borrower", region: "Plano, TX", sector: "Hotels / Franchise", signal: "$4.2M 504 funded for hotel acquisition", partnerType: "Hospitality lender (LEN-D + LEN-F)", outcome: "Intro made — hotel-specialty lender reviewing", daysAgo: 5, roles: "LEN-D + LEN-F" },
  { id: "ps-08", status: "placed", companyDescription: "Veterinary practice 7(a)", region: "Omaha, NE", sector: "Healthcare", signal: "$480K 7(a) + recent practice acquisition", partnerType: "Healthcare-specialty community lender", outcome: "6 vet practices placed on depository + equipment lines", daysAgo: 14, roles: "LEN-A — Recent 7(a) Originations", placementCount: 6 },
  { id: "ps-09", status: "exploring", companyDescription: "Brewery 7(a) borrower", region: "Asheville, NC", sector: "Restaurants", signal: "$620K 7(a) + distribution expansion signal", partnerType: "Community lender (expansion)", outcome: "Evaluating expansion loan terms", daysAgo: 5, roles: "LEN-A + LEN-C overlap" },
  { id: "ps-10", status: "placed", companyDescription: "Self-storage 504 borrower", region: "Sarasota, FL", sector: "Storage / CRE", signal: "$1.85M 504 funded; second-facility conversation", partnerType: "504 CDC specialty lender", outcome: "4 CRE-borrower cohort placements; LEN-D book grew 18%", daysAgo: 12, roles: "LEN-D — 504 CRE Specialty", placementCount: 4 },
  { id: "ps-11", status: "matched", companyDescription: "Fitness studio 7(a) borrower", region: "Austin, TX", sector: "Fitness", signal: "Recent Express loan; cohort fit for fitness-specialty lender", partnerType: "Fitness/wellness specialty lender", outcome: "Partner identified — onboarding scheduled", daysAgo: 4, roles: "LEN-E — Express Pipeline" },
  { id: "ps-12", status: "opted_in", companyDescription: "Mountain West Logistics 7(a)", region: "Salt Lake City, UT", sector: "Logistics", signal: "Fleet expansion via SBA proceeds (+6 PU)", partnerType: "Pending — equipment financing", outcome: "Carrier opted in — matching with equipment lender", daysAgo: 1, roles: "LEN-A — Recent 7(a) Originations" },
];

const pipelineDetails: Record<string, PipelineEntryDetail> = {
  "ps-02": {
    timeline: [
      { date: "Mar 15", iconKey: "Zap", colorClass: "text-amber-400", title: "Signal detected", detail: "Coastal Pediatric Group LLC funded $1.2M 504 with Florida First CDC." },
      { date: "Mar 17", iconKey: "Crosshair", colorClass: "text-indigo-400", title: "Borrower profiled", detail: "Tampa pediatric clinic, 24 jobs supported, +18% growth. Owner-occupied CRE." },
      { date: "Mar 19", iconKey: "Radio", colorClass: "text-blue-400", title: "Cohort matched", detail: "Falls under LEN-D (504 CRE) + LEN-A (recent origination). Cross-sell candidate." },
      { date: "Mar 22", iconKey: "Users", colorClass: "text-cyan-400", title: "Borrower opted in", detail: "Open to depository + treasury banking conversations." },
      { date: "Mar 24", iconKey: "GitPullRequest", colorClass: "text-blue-400", title: "Partner matched", detail: "504 CDC specialty lender with FL pediatric book." },
      { date: "Mar 25", iconKey: "Award", colorClass: "text-violet-400", title: "Intro made", detail: "Both sides connected; CDC reviewing cohort for facility expansion loans." },
      { date: "Apr 2", iconKey: "FileCheck2", colorClass: "text-emerald-400", title: "Cohort placements", detail: "8 cohort borrowers placed; follow-on facility expansion loan in underwriting." },
    ],
    partner: { type: "504 CDC specialty lender", specialization: "Healthcare / dental CRE 504 loans", region: "FL / GA / SC", relationship: "Active since Q4 2025" },
    placements: [
      { role: "Depository / Treasury Services", count: 6, status: "filled" },
      { role: "Equipment Financing Bundle", count: 4, status: "filled" },
      { role: "Facility Expansion Follow-On (7(a))", count: 1, status: "in_progress" },
    ],
    notes: ["LEN-D book grew 24% in Q1 from this cohort", "Asked about adjacent veterinary 504 borrowers"],
  },
  "ps-08": {
    timeline: [
      { date: "Apr 1", iconKey: "Zap", colorClass: "text-amber-400", title: "Signal detected", detail: "Heartland Veterinary Services PC funded $480K 7(a) with Pinnacle Bank." },
      { date: "Apr 2", iconKey: "Crosshair", colorClass: "text-indigo-400", title: "Borrower profiled", detail: "Omaha vet practice acquisition; +12% growth, 16 jobs supported." },
      { date: "Apr 3", iconKey: "Radio", colorClass: "text-blue-400", title: "Cohort matched", detail: "LEN-A (recent 7(a)) — healthcare-specialty lender appetite." },
      { date: "Apr 5", iconKey: "Users", colorClass: "text-cyan-400", title: "Borrower opted in", detail: "Open to depository + equipment financing." },
      { date: "Apr 6", iconKey: "GitPullRequest", colorClass: "text-blue-400", title: "Partner matched", detail: "Healthcare-specialty community lender with vet book in Midwest." },
      { date: "Apr 7", iconKey: "Award", colorClass: "text-violet-400", title: "Intro made", detail: "Clean handoff. Partner already had 30+ vet practices in cohort." },
      { date: "Apr 9", iconKey: "FileCheck2", colorClass: "text-emerald-400", title: "Placements ramp", detail: "6 vet practices placed across depository + equipment lines." },
    ],
    partner: { type: "Healthcare-specialty community lender", specialization: "Veterinary / dental / outpatient SBA depository + equipment", region: "Midwest", relationship: "Active since Q4 2025" },
    placements: [
      { role: "Depository / Treasury Services", count: 4, status: "filled" },
      { role: "Equipment Lines (vet imaging)", count: 2, status: "filled" },
      { role: "Workers Comp / Practice Insurance", count: 0, status: "in_progress" },
    ],
    notes: ["Vet cohort retention at 12 months: 91%", "Partner asked about FL + TX vet pipeline expansion"],
  },
};

// ─────────────────────────────────────────────────────────────────
// MarketDataset export
// ─────────────────────────────────────────────────────────────────

export const sbaMarket: MarketDataset = {
  id: "sba",
  label: "SBA Market",
  shortLabel: "SBA",

  companies,
  signals,
  signalLists,

  contractChartData,
  contractChartSeries,
  hiringChartData,
  hiringChartSeries,

  marketSectors,
  topHiringCompanies,
  sectorDetails,
  pipelineEntries,
  pipelineDetails,

  tabs: [
    { id: "market", label: "Market" },
    { id: "contracts", label: "Recent Originations" },
    { id: "gc-demo", label: "Lender Demo" },
    { id: "signals", label: "Signals" },
    { id: "lists", label: "Lists" },
    { id: "salary", label: "Charge-Off Trends", mystery: true },
    { id: "trends", label: "Trends", mystery: true },
    { id: "pipeline", label: "Pipeline" },
    { id: "priority", label: "Priority", mystery: true },
  ],

  composeConfig: {
    basePopulation: 847_000,
    basePopulationLabel: "SBA borrowers tracked",
    exampleNames: [
      "Recent 7(a) — Cross-Sell Pipeline",
      "504 CRE — Healthcare Practice",
      "Franchise Specialty — QSR",
      "Paid-in-Full Repeat — Follow-On",
      "Express Sub-$150K — Velocity Book",
    ],
    filters: [
      {
        id: "loan-program",
        label: "Loan Program",
        type: "multi",
        helpText: "Which SBA program funded the loan",
        options: [
          { id: "7a-standard", label: "7(a) Standard", selectivity: 0.52, matchCompanyIds: ["sba-01", "sba-02", "sba-03", "sba-05", "sba-07", "sba-09", "sba-12", "sba-14", "sba-16", "sba-18", "sba-19", "sba-20"] },
          { id: "7a-express", label: "7(a) Express", hint: "≤ $500K", selectivity: 0.22, matchCompanyIds: ["sba-04", "sba-08", "sba-15", "sba-17"] },
          { id: "504-cdc", label: "504 CDC", hint: "CRE-backed", selectivity: 0.18, matchCompanyIds: ["sba-06", "sba-10", "sba-11", "sba-13"] },
          { id: "microloan", label: "Microloan", hint: "≤ $50K", selectivity: 0.08, matchCompanyIds: [] },
        ],
      },
      {
        id: "loan-size",
        label: "Loan Size",
        type: "multi",
        options: [
          { id: "size-sub-150k", label: "< $150K", selectivity: 0.32, matchCompanyIds: ["sba-04", "sba-08", "sba-15", "sba-17"] },
          { id: "size-150-500k", label: "$150K – $500K", selectivity: 0.28, matchCompanyIds: ["sba-01", "sba-05", "sba-09", "sba-16", "sba-18"] },
          { id: "size-500k-1m", label: "$500K – $1M", selectivity: 0.18, matchCompanyIds: ["sba-02", "sba-03", "sba-07", "sba-10", "sba-12", "sba-14", "sba-19", "sba-20"] },
          { id: "size-1-2m", label: "$1M – $2M", selectivity: 0.12, matchCompanyIds: ["sba-06", "sba-11"] },
          { id: "size-2m-plus", label: "$2M+", hint: "504 territory", selectivity: 0.10, matchCompanyIds: ["sba-13"] },
        ],
      },
      {
        id: "industry",
        label: "Industry",
        type: "multi",
        helpText: "NAICS sector",
        options: [
          { id: "ind-restaurants", label: "Restaurants", selectivity: 0.17, matchCompanyIds: ["sba-01", "sba-07", "sba-08", "sba-20"] },
          { id: "ind-healthcare", label: "Healthcare", selectivity: 0.12, matchCompanyIds: ["sba-03", "sba-06", "sba-12"] },
          { id: "ind-auto", label: "Auto Repair", selectivity: 0.06, matchCompanyIds: ["sba-02", "sba-10", "sba-17"] },
          { id: "ind-fitness", label: "Fitness", selectivity: 0.05, matchCompanyIds: ["sba-04", "sba-09", "sba-16"] },
          { id: "ind-hotels", label: "Hotels", selectivity: 0.04, matchCompanyIds: ["sba-13"] },
          { id: "ind-storage-cre", label: "Storage / CRE", selectivity: 0.04, matchCompanyIds: ["sba-11"] },
          { id: "ind-manufacturing", label: "Manufacturing", selectivity: 0.07, matchCompanyIds: ["sba-14"] },
          { id: "ind-personal-services", label: "Personal Services", selectivity: 0.13, matchCompanyIds: ["sba-15", "sba-18"] },
          { id: "ind-logistics", label: "Logistics", selectivity: 0.05, matchCompanyIds: ["sba-19"] },
        ],
      },
      {
        id: "loan-age",
        label: "Loan Age",
        type: "multi",
        helpText: "Months since origination",
        options: [
          { id: "age-0-6mo", label: "< 6 months", hint: "Cross-sell window", selectivity: 0.18, matchCompanyIds: ["sba-04", "sba-08", "sba-15", "sba-17"] },
          { id: "age-6-12mo", label: "6–12 months", selectivity: 0.22, matchCompanyIds: ["sba-01", "sba-03", "sba-06", "sba-07", "sba-11", "sba-14", "sba-16", "sba-18", "sba-19", "sba-20"] },
          { id: "age-1-3yr", label: "1–3 years", selectivity: 0.34, matchCompanyIds: ["sba-02", "sba-05", "sba-09", "sba-10", "sba-12", "sba-13"] },
          { id: "age-3-plus", label: "3+ years", hint: "Refi-ready", selectivity: 0.26, matchCompanyIds: [] },
        ],
      },
      {
        id: "franchise",
        label: "Franchise Affiliation",
        type: "single",
        helpText: "Whether borrower operates a franchised concept",
        options: [
          { id: "is-franchise", label: "Franchise-Affiliated", hint: "Subway / CrossFit / Comfort Inn / etc.", selectivity: 0.18, matchCompanyIds: ["sba-05", "sba-09", "sba-13", "sba-16"] },
          { id: "is-independent", label: "Independent Operator", selectivity: 0.82, matchCompanyIds: ["sba-01", "sba-02", "sba-03", "sba-04", "sba-06", "sba-07", "sba-08", "sba-10", "sba-11", "sba-12", "sba-14", "sba-15", "sba-17", "sba-18", "sba-19", "sba-20"] },
        ],
      },
    ],
  },

  queryConsoleExamples: [
    {
      id: "healthcare-recent",
      trigger: "Show me all healthcare borrowers with recent loans",
      matchKeywords: ["healthcare", "medical", "dental", "vet", "doctor", "clinic", "practice"],
      label: "Healthcare Borrowers — Recent SBA Originations",
      subtext: "Medical / dental / veterinary practice borrowers funded in last 12 months",
      companyIds: ["sba-03", "sba-06", "sba-12"],
      totalCount: 4200,
    },
    {
      id: "504-cre",
      trigger: "Show me all 504 CRE borrowers",
      matchKeywords: ["504", "cre", "real estate", "owner-occupied", "owner occupied", "cdc"],
      label: "504 CRE Borrowers — CDC-Backed CRE",
      subtext: "Owner-occupied commercial real estate borrowers across healthcare / hotels / storage",
      companyIds: ["sba-06", "sba-10", "sba-11", "sba-13"],
      totalCount: 4800,
    },
    {
      id: "pif-repeat",
      trigger: "Show me all paid-in-full repeat candidates",
      matchKeywords: ["paid in full", "paid-in-full", "pif", "paid off", "repeat", "follow-on", "refi"],
      label: "Paid-in-Full Repeat Loan Candidates",
      subtext: "Borrowers who retired prior loan + show new growth signals — prime for follow-on origination",
      companyIds: ["sba-05", "sba-10"],
      totalCount: 8400,
    },
    {
      id: "restaurant-7a",
      trigger: "Show me all restaurant 7(a) borrowers over $500K",
      matchKeywords: ["restaurant", "brewery", "food", "diner", "qsr", "cafe", "bar"],
      label: "Restaurant 7(a) Borrowers — $500K+",
      subtext: "Recent restaurant + brewery originations above $500K — capex-heavy build-out segment",
      companyIds: ["sba-07", "sba-20"],
      totalCount: 1840,
    },
  ],

  personas: [
    {
      id: "national-7a",
      label: "National 7(a) Bank",
      blurb: "Active 7(a) origination pipeline + multi-location expansion candidates. Cross-sell appetite: deposit, treasury, credit card, follow-on.",
      cohortPriorityIds: ["list-len-a", "list-len-c", "list-len-b"],
      demoTitleOverride: "National 7(a) Lender Cohorts — Active Pipeline + Cross-Sell",
      demoSubtitleOverride: "SBA borrowers segmented for national 7(a) lender appetite: recent originations (cross-sell pipeline), multi-location expansion candidates (follow-on facility loans), paid-in-full repeat candidates (refi + new-money opportunities).",
      demoPillsOverride: ["Recent 7(a)", "Multi-Location", "Paid-in-Full Repeat", "Cross-Sell", "Treasury"],
      demoSectionsOverride: [
        { id: "len-a", label: "LEN-A — Recent 7(a) Originations", subtext: "Funded in last 12 months. Cross-sell appetite. 48,200 borrowers.", companyIds: ["sba-01", "sba-02", "sba-03", "sba-07", "sba-09", "sba-12", "sba-14"], icon: "Banknote", color: "text-emerald-400" },
        { id: "len-c", label: "LEN-C — Multi-Location Expansion", subtext: "Borrowers with new-location signals + loan history. Expansion-loan candidates. 6,200 borrowers.", companyIds: ["sba-01", "sba-03", "sba-06", "sba-07", "sba-18"], icon: "Building2", color: "text-blue-400" },
        { id: "len-b", label: "LEN-B — Paid-in-Full Repeat", subtext: "Retired prior loan + growth signals. Follow-on origination candidates. 8,400 borrowers.", companyIds: ["sba-05", "sba-10"], icon: "Award", color: "text-violet-400" },
      ],
    },
    {
      id: "504-cdc",
      label: "504 CDC",
      blurb: "504-program borrowers (CDC-backed, owner-occupied CRE). CDC-specific origination + CRE-collateralized refinance pipeline.",
      cohortPriorityIds: ["list-len-d", "list-len-c"],
      demoTitleOverride: "504 CDC Cohorts — CRE-Collateralized Borrowers",
      demoSubtitleOverride: "SBA 504 borrowers — owner-occupied commercial real estate, CDC-backed structure. Healthcare practice + hotel + storage facility + medical office segments dominate. Pipeline for CDC-specific origination + cross-pricing.",
      demoPillsOverride: ["504 Program", "CRE", "CDC-Backed", "Owner-Occupied", "Real Estate", "Sub-$5.5M"],
      demoSectionsOverride: [
        { id: "len-d-hc", label: "Healthcare CRE (504)", subtext: "Medical / dental / vet practices on owner-occupied CRE. 504-program signature segment.", companyIds: ["sba-06"], icon: "Heart", color: "text-emerald-400" },
        { id: "len-d-hot", label: "Hospitality CRE (504)", subtext: "Hotel-flag operators on owner-occupied CRE. 70-300 room properties.", companyIds: ["sba-13"], icon: "Building2", color: "text-blue-400" },
        { id: "len-d-auto", label: "Auto / Storage CRE (504)", subtext: "Auto body, self-storage, light industrial owner-occupied CRE.", companyIds: ["sba-10", "sba-11"], icon: "Wrench", color: "text-amber-400" },
      ],
    },
    {
      id: "express",
      label: "Express Lender",
      blurb: "Sub-$500K 7(a) Express borrowers. High velocity, simplified underwriting, low-touch lender appetite.",
      cohortPriorityIds: ["list-len-e", "list-len-a"],
      demoTitleOverride: "Express Lender Cohorts — Sub-$150K Velocity Pipeline",
      demoSubtitleOverride: "7(a) Express borrowers — loans up to $500K with simplified underwriting. Pizza shops, fitness studios, daycares, auto-glass services, small bakeries. High volume per lender; low individual loan size; cross-sell mostly via depository.",
      demoPillsOverride: ["Express Program", "Sub-$500K", "Simplified UW", "High Velocity", "Small Loan Band"],
      demoSectionsOverride: [
        { id: "len-e-rst", label: "Express — Restaurants & Food Service", subtext: "Sub-$500K Express loans for small restaurants, bakeries, food service operations.", companyIds: ["sba-04", "sba-08", "sba-15"], icon: "Briefcase", color: "text-amber-400" },
        { id: "len-e-svc", label: "Express — Personal Services", subtext: "Sub-$500K Express loans for fitness studios, daycares, auto-glass, small services.", companyIds: ["sba-04", "sba-17"], icon: "Users", color: "text-violet-400" },
      ],
    },
    {
      id: "franchise-specialty",
      label: "Franchise Specialty",
      blurb: "SBA borrowers with active franchise affiliation. Cross-market with the Franchise market — routes to franchise-specialty lenders (ApplePie, BoeFly, Direct Capital).",
      cohortPriorityIds: ["list-len-f", "list-len-b"],
      demoTitleOverride: "Franchise Specialty Cohorts — SBA Borrowers with Franchise Affiliation",
      demoSubtitleOverride: "SBA borrowers with active franchise affiliation — QSR (Subway, McDonald's, Burger King), fitness (CrossFit, CorePower Yoga, Anytime Fitness), hospitality (Choice Hotels, Hilton, Marriott). Routes to franchise-specialty lenders.",
      demoPillsOverride: ["Franchise", "QSR", "Hospitality", "Fitness", "Specialty Lender", "Cross-Market"],
      demoSectionsOverride: [
        { id: "len-f-qsr", label: "Franchise — QSR / Fast Food", subtext: "SBA-funded QSR franchisees: Subway, McDonald's, BK, Chick-fil-A. Franchise-specialty lender appetite.", companyIds: ["sba-05"], icon: "Briefcase", color: "text-amber-400" },
        { id: "len-f-fit", label: "Franchise — Fitness", subtext: "SBA-funded fitness franchisees: CrossFit, CorePower Yoga, Anytime Fitness.", companyIds: ["sba-09", "sba-16"], icon: "Heart", color: "text-emerald-400" },
        { id: "len-f-hot", label: "Franchise — Hospitality / Hotels", subtext: "SBA 504-funded hotel franchisees: Choice, Hilton, Marriott, IHG flags.", companyIds: ["sba-13"], icon: "Building2", color: "text-blue-400" },
      ],
    },
  ],

  vocab: {
    pillLabel: "SBA Market",

    entityNoun: "Borrower",
    entityNounPlural: "Borrowers",

    sizeLabel: "Jobs Supported",
    sizeUnit: "jobs",
    growthLabel: "Headcount Growth",

    sectorLabel: "Industry",

    activityHeader: "Loan Activity",
    activityCountLabel: "events",

    marketStats: [
      { label: "Active SBA Borrowers", value: "847K", sub: "with 7(a) / 504 / Express loans live", icon: "Banknote", color: "text-blue-400" },
      { label: "Borrowers Tracked", value: "1.2M", sub: "monthly SBA 1502 + new originations refresh", icon: "Building2", color: "text-indigo-400" },
      { label: "New Originations", value: "5,840", sub: "funded this month", icon: "Zap", color: "text-amber-400" },
      { label: "Avg Loan Size", value: "$385K", sub: "across active portfolio", icon: "TrendingUp", color: "text-emerald-400" },
    ],

    contractChartTitle: "Origination Velocity by Loan Program",
    contractChartSub: "SBA loan origination volume (in $B) — trailing 12 months",
    contractChartYPrefix: "$",
    contractChartYSuffix: "B",
    contractChartTooltipUnit: "B",

    hiringChartTitle: "Active Portfolio by Industry",
    hiringChartSub: "Active SBA loan principal outstanding (in $B) by industry — trailing 12 months",
    hiringChartYSuffix: "B",
    hiringChartTooltipUnit: "outstanding ($B)",

    hotSectorsTitle: "Industry Mix",
    hotSectorsActiveLabel: "active loans",
    hotSectorsCountSuffix: "originated this month",

    topEntitiesTitle: "Top Recent Originations by Loan Size",
    topEntitiesHeaders: {
      entity: "Borrower",
      sector: "Industry",
      topRole: "Loan Program",
      openRoles: "Size ($K)",
      growth: "Growth",
    },

    contractsTabHeading: "Recent SBA Loan Originations",
    contractsTabCounterLabel: "originations tracked",
    contractsTabStats: {
      total: "Total Funded", totalSub: "in originations this period ($K)",
      count: "Originations", countSub: "loans funded this period",
      winners: "Borrowers", winnersSub: "unique new entrants",
    },
    contractsTabFilterTypes: ["loan_origination"],
    contractsTabValueFormat: "count",
    contractsTabValueUnit: "K",
    demoTabFilterTypes: ["loan_origination", "loan_paid_off", "expansion"],

    demoTabFilterEyebrow: "Cohort View",
    demoTabTitle: "Lender Cohorts — SBA Borrowers Routed by Demand-Side Appetite",
    demoTabSubtitle: "SBA borrowers segmented by the structural traits that predict lender fit: loan program, loan size band, time since origination, repayment history, industry, and growth signals. Each cohort routes to a distinct lender persona — national 7(a) banks, 504 CDCs, Express lenders, franchise-specialty, healthcare-specialty.",
    demoTabPills: ["Recent 7(a)", "Paid-in-Full Repeat", "Multi-Location", "504 CRE", "Sub-$150K Express", "Franchise"],
    demoTabStats: { total: "Combined Capital ($K)", avg: "Avg Loan ($K)", entities: "Borrowers Shown", activity: "Recent Events" },
    demoTabSections: [
      { id: "len-a", label: "LEN-A — Recent 7(a) Originations", subtext: "Funded in last 12 months. Cross-sell appetite. 48,200 borrowers.", companyIds: ["sba-01", "sba-02", "sba-03", "sba-07", "sba-09", "sba-12", "sba-14"], icon: "Banknote", color: "text-emerald-400" },
      { id: "len-b", label: "LEN-B — Paid-in-Full Repeat Candidates", subtext: "Retired prior loan + new growth signals. 8,400 borrowers.", companyIds: ["sba-05", "sba-10"], icon: "Award", color: "text-blue-400" },
      { id: "len-d", label: "LEN-D — 504 CRE Specialty", subtext: "504 program borrowers, CRE-collateralized. 4,800 borrowers.", companyIds: ["sba-06", "sba-10", "sba-11", "sba-13"], icon: "Building2", color: "text-violet-400" },
    ],

    signalsTabHeading: "Recent Loan Signals",
    signalsTabCounterLabel: "signals tracked",

    listsTabHeading: "Lender Cohorts",
    listsTabCounterLabel: "active cohorts",
    listsItemEntityLabel: "borrowers",

    pipelinePlacedLabel: "Total Routed",
    pipelinePlacedSub: "borrowers placed with lenders",
    pipelineActiveLabel: "Active",
    pipelineActiveSub: "intros in progress",
    pipelineConnectionsLabel: "Routings",
    pipelineConnectionsSub: "this quarter",

    sectorDetailBackLabel: "Back to Market",
    sectorDetailTrendHeader: "Active Loan Portfolio — 12 Month Trend",
    sectorDetailTrendUnit: "active loans",
    sectorDetailRolesHeader: "Subindustry Mix",
    sectorDetailRegionsHeader: "Top States",
    sectorDetailCompaniesHeader: "Top Borrowers by Loan Size",
    sectorOverviewMetricLabel: "active loans",
    sectorOverviewTertiaryLabel: "originated this month",

    dossierStats: { headcount: "Jobs Supported", growth: "Headcount Growth", revenue: "Loan Size / Program", openRoles: "Loan Events" },
    dossierActivityHeader: "Loan Activity Timeline",
    dossierSignalsHeader: "Recent Signals",
    dossierDetailsHeader: "Borrower Details",
  },
};
