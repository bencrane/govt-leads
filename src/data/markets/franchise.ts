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
// Franchise operators — a subset-shape of SBA borrowers
// `headcount` = units_operated (count of physical franchise locations)
// `yearFounded` = first_unit_year (year first unit opened)
// `sector` = primary franchise brand
// `revenueEstimate` = total_capital_deployed across all units
// `jobPostings` = loan history timeline (one item per SBA loan event)
// ─────────────────────────────────────────────────────────────────

const companies: Company[] = [
  // Single-unit operators (FR-1)
  {
    id: "fr-01",
    name: "Patel Hospitality LLC dba Subway #4892",
    city: "Newark", state: "NJ",
    sector: "Subway",
    headcount: 1, headcountGrowth: 0,
    yearFounded: 2022,
    revenueEstimate: "$185K · 1 unit",
    jobPostings: [
      { title: "Initial SBA 7(a) — $185K", location: "Customers Bank · 2022-08", count: 185 },
      { title: "Loan paid in full (early)", location: "2026-04 · 44-month accelerated", count: 185 },
      { title: "Unit #2 location lease signed", location: "Newark — second unit underway", count: 1 },
    ],
  },
  {
    id: "fr-02",
    name: "Apex CrossFit Holdings LLC",
    city: "Denver", state: "CO",
    sector: "CrossFit",
    headcount: 1, headcountGrowth: 0,
    yearFounded: 2023,
    revenueEstimate: "$385K · 1 unit",
    jobPostings: [
      { title: "Initial SBA 7(a) — $385K", location: "ApplePie Capital · 2023-07", count: 385 },
      { title: "Annual SBA Form 1502 — current", location: "On-time payment record · 32mo", count: 32 },
    ],
  },
  {
    id: "fr-03",
    name: "Pacific Yoga Studios LLC dba CorePower",
    city: "Portland", state: "OR",
    sector: "CorePower Yoga",
    headcount: 1, headcountGrowth: 0,
    yearFounded: 2024,
    revenueEstimate: "$245K · 1 unit",
    jobPostings: [
      { title: "Initial SBA 7(a) — $245K", location: "Umpqua Bank · 2024-05", count: 245 },
      { title: "Studio opening", location: "Portland Pearl District", count: 1 },
    ],
  },
  {
    id: "fr-04",
    name: "Trang Le Coffee LLC dba Dunkin'",
    city: "Boston", state: "MA",
    sector: "Dunkin'",
    headcount: 1, headcountGrowth: 0,
    yearFounded: 2025,
    revenueEstimate: "$320K · 1 unit",
    jobPostings: [
      { title: "Initial SBA 7(a) — $320K", location: "Citizens Bank · 2025-01", count: 320 },
      { title: "Unit #1 opening", location: "Boston / Allston market", count: 1 },
    ],
  },
  {
    id: "fr-05",
    name: "Vega Brothers Pizza LLC dba Marco's",
    city: "Tampa", state: "FL",
    sector: "Marco's Pizza",
    headcount: 1, headcountGrowth: 0,
    yearFounded: 2025,
    revenueEstimate: "$285K · 1 unit",
    jobPostings: [
      { title: "Initial SBA 7(a) — $285K", location: "BoeFly · 2025-03", count: 285 },
      { title: "Unit #1 opening", location: "Tampa / Carrollwood market", count: 1 },
    ],
  },

  // Multi-unit operators (FR-2, 2-5 units)
  {
    id: "fr-06",
    name: "Singh Restaurant Group LLC dba McDonald's",
    city: "Charlotte", state: "NC",
    sector: "McDonald's",
    headcount: 4, headcountGrowth: 33,
    yearFounded: 2019,
    revenueEstimate: "$2.8M · 4 units",
    jobPostings: [
      { title: "Initial SBA 7(a) — $620K", location: "Live Oak Bank · 2019-06 · Unit #1", count: 620 },
      { title: "Unit #2 expansion loan — $580K", location: "Live Oak Bank · 2021-09", count: 580 },
      { title: "Unit #3 expansion loan — $740K", location: "Newtek · 2023-04", count: 740 },
      { title: "Unit #4 expansion loan — $860K", location: "ApplePie Capital · 2025-02", count: 860 },
    ],
  },
  {
    id: "fr-07",
    name: "Johnson Family Brands LLC dba Chick-fil-A",
    city: "Atlanta", state: "GA",
    sector: "Chick-fil-A",
    headcount: 3, headcountGrowth: 50,
    yearFounded: 2020,
    revenueEstimate: "$1.95M · 3 units",
    jobPostings: [
      { title: "Initial SBA 7(a) — $580K", location: "First Citizens · 2020-04 · Unit #1", count: 580 },
      { title: "Unit #2 expansion loan — $620K", location: "Truist · 2022-11", count: 620 },
      { title: "Unit #3 expansion loan — $750K", location: "BoeFly · 2025-08", count: 750 },
    ],
  },
  {
    id: "fr-08",
    name: "Anytime Fitness Holdings LLC",
    city: "Phoenix", state: "AZ",
    sector: "Anytime Fitness",
    headcount: 5, headcountGrowth: 25,
    yearFounded: 2018,
    revenueEstimate: "$1.4M · 5 units",
    jobPostings: [
      { title: "Initial SBA 7(a) — $185K", location: "Chase · 2018-09 · Unit #1", count: 185 },
      { title: "Unit #2 expansion — $220K", location: "ApplePie Capital · 2020-03", count: 220 },
      { title: "Unit #3 expansion — $245K", location: "ApplePie Capital · 2022-01", count: 245 },
      { title: "Unit #4 expansion — $280K", location: "Direct Capital · 2024-04", count: 280 },
      { title: "Unit #5 expansion — $475K", location: "ReadyCap Lending · 2025-09", count: 475 },
    ],
  },
  {
    id: "fr-09",
    name: "Bayou Burger LLC dba Burger King",
    city: "Baton Rouge", state: "LA",
    sector: "Burger King",
    headcount: 4, headcountGrowth: 33,
    yearFounded: 2017,
    revenueEstimate: "$2.4M · 4 units",
    jobPostings: [
      { title: "Initial SBA 7(a) — $480K", location: "Hancock Whitney · 2017-04", count: 480 },
      { title: "Unit #2 expansion — $520K", location: "Hancock Whitney · 2020-02", count: 520 },
      { title: "Unit #3 expansion — $640K", location: "BoeFly · 2023-06", count: 640 },
      { title: "Unit #4 expansion — $720K", location: "BoeFly · 2025-11", count: 720 },
    ],
  },
  {
    id: "fr-10",
    name: "Lone Star Subs LLC dba Jersey Mike's",
    city: "Houston", state: "TX",
    sector: "Jersey Mike's",
    headcount: 3, headcountGrowth: 50,
    yearFounded: 2021,
    revenueEstimate: "$1.05M · 3 units",
    jobPostings: [
      { title: "Initial SBA 7(a) — $285K", location: "Frost Bank · 2021-08", count: 285 },
      { title: "Unit #2 expansion — $325K", location: "BoeFly · 2023-09", count: 325 },
      { title: "Unit #3 expansion — $440K", location: "ApplePie Capital · 2025-06", count: 440 },
    ],
  },
  {
    id: "fr-11",
    name: "Sharma Hotels LLC dba Comfort Inn",
    city: "Plano", state: "TX",
    sector: "Choice Hotels",
    headcount: 1, headcountGrowth: 0,
    yearFounded: 2023,
    revenueEstimate: "$4.2M · 1 unit",
    jobPostings: [
      { title: "Initial SBA 504 — $4.2M", location: "Texas CDC · 2023-06 · CRE-backed", count: 4200 },
      { title: "Property opening", location: "70-room Comfort Inn, Plano TX", count: 70 },
      { title: "Annual SBA Form 1502 — current", location: "On-time payment record · 24mo", count: 24 },
    ],
  },

  // Mega-franchisees (FR-3, 6+ units)
  {
    id: "fr-12",
    name: "BurgerKing Operators of TX LLC",
    city: "Houston", state: "TX",
    sector: "Burger King",
    headcount: 6, headcountGrowth: 20,
    yearFounded: 2014,
    revenueEstimate: "$4.8M · 6 units",
    jobPostings: [
      { title: "Initial SBA 7(a) — $620K", location: "Frost Bank · 2014-09 · Unit #1", count: 620 },
      { title: "Units #2-3 portfolio loan — $1.2M", location: "Cadence Bank · 2017-06", count: 1200 },
      { title: "Unit #4 expansion — $740K", location: "BoeFly · 2019-11", count: 740 },
      { title: "Unit #5 expansion — $820K", location: "BoeFly · 2022-04", count: 820 },
      { title: "Unit #6 expansion — $960K", location: "ApplePie Capital · 2024-08", count: 960 },
    ],
  },
  {
    id: "fr-13",
    name: "Great Clips Multi-Unit LLC",
    city: "Minneapolis", state: "MN",
    sector: "Great Clips",
    headcount: 8, headcountGrowth: 14,
    yearFounded: 2011,
    revenueEstimate: "$1.6M · 8 units",
    jobPostings: [
      { title: "Initial SBA 7(a) — $145K", location: "U.S. Bank · 2011-05 · Unit #1", count: 145 },
      { title: "Units #2-4 portfolio loan — $480K", location: "U.S. Bank · 2015-08", count: 480 },
      { title: "Units #5-6 portfolio loan — $385K", location: "BoeFly · 2019-03", count: 385 },
      { title: "Unit #7 expansion — $225K", location: "ApplePie Capital · 2022-09", count: 225 },
      { title: "Unit #8 expansion — $245K", location: "Direct Capital · 2024-06", count: 245 },
    ],
  },
  {
    id: "fr-14",
    name: "7-Eleven Holdings of OR LLC",
    city: "Portland", state: "OR",
    sector: "7-Eleven",
    headcount: 4, headcountGrowth: 33,
    yearFounded: 2016,
    revenueEstimate: "$1.85M · 4 units",
    jobPostings: [
      { title: "Initial SBA 7(a) — $385K", location: "Umpqua Bank · 2016-04", count: 385 },
      { title: "Unit #2 expansion — $440K", location: "Umpqua Bank · 2019-07", count: 440 },
      { title: "Unit #3 expansion — $480K", location: "BoeFly · 2022-02", count: 480 },
      { title: "Unit #4 expansion — $545K", location: "ApplePie Capital · 2025-01", count: 545 },
    ],
  },
  {
    id: "fr-15",
    name: "Mathnasium Group of SoCal LLC",
    city: "Los Angeles", state: "CA",
    sector: "Mathnasium",
    headcount: 7, headcountGrowth: 17,
    yearFounded: 2015,
    revenueEstimate: "$1.35M · 7 units",
    jobPostings: [
      { title: "Initial SBA 7(a) — $145K", location: "Bank of America · 2015-09", count: 145 },
      { title: "Units #2-4 portfolio loan — $385K", location: "BoeFly · 2018-11", count: 385 },
      { title: "Units #5-6 portfolio loan — $445K", location: "ApplePie Capital · 2022-08", count: 445 },
      { title: "Unit #7 expansion — $375K", location: "Direct Capital · 2024-12", count: 375 },
    ],
  },

  // Multi-brand operators (FR-4)
  {
    id: "fr-16",
    name: "Tri-State Hospitality Group LLC",
    city: "Nashville", state: "TN",
    sector: "Multi-Brand (Hilton + Marriott)",
    headcount: 4, headcountGrowth: 33,
    yearFounded: 2017,
    revenueEstimate: "$8.4M · 4 units (2 brands)",
    jobPostings: [
      { title: "Hampton Inn 504 — $2.1M", location: "Texas CDC · 2017-04 · Hilton flag", count: 2100 },
      { title: "Fairfield Inn 504 — $1.85M", location: "Tennessee CDC · 2020-09 · Marriott flag", count: 1850 },
      { title: "Hampton Inn #2 — $2.4M", location: "Texas CDC · 2023-06", count: 2400 },
      { title: "Fairfield Inn #2 — $2.05M", location: "Tennessee CDC · 2025-02", count: 2050 },
    ],
  },
  {
    id: "fr-17",
    name: "Carolina QSR Holdings LLC",
    city: "Charlotte", state: "NC",
    sector: "Multi-Brand (Wendy's + Taco Bell)",
    headcount: 5, headcountGrowth: 25,
    yearFounded: 2018,
    revenueEstimate: "$2.9M · 5 units (2 brands)",
    jobPostings: [
      { title: "Wendy's Unit #1 — $480K", location: "Truist · 2018-08", count: 480 },
      { title: "Wendy's Unit #2 — $520K", location: "Truist · 2020-11", count: 520 },
      { title: "Taco Bell Unit #1 — $620K", location: "BoeFly · 2022-04 · brand-add", count: 620 },
      { title: "Taco Bell Unit #2 — $680K", location: "BoeFly · 2024-09", count: 680 },
      { title: "Wendy's Unit #3 — $580K", location: "ApplePie Capital · 2025-12", count: 580 },
    ],
  },
  {
    id: "fr-18",
    name: "Midwest Fitness Brands LLC",
    city: "Indianapolis", state: "IN",
    sector: "Multi-Brand (Planet Fitness + Orangetheory)",
    headcount: 4, headcountGrowth: 33,
    yearFounded: 2019,
    revenueEstimate: "$1.85M · 4 units (2 brands)",
    jobPostings: [
      { title: "Planet Fitness Unit #1 — $385K", location: "Old National · 2019-06", count: 385 },
      { title: "Planet Fitness Unit #2 — $440K", location: "ApplePie Capital · 2021-09", count: 440 },
      { title: "Orangetheory Unit #1 — $520K", location: "BoeFly · 2023-04 · brand-add", count: 520 },
      { title: "Orangetheory Unit #2 — $585K", location: "Direct Capital · 2025-10", count: 585 },
    ],
  },

  // Brand-switched operators (FR-5, recent change)
  {
    id: "fr-19",
    name: "Reyes Hospitality LLC dba Hampton Inn",
    city: "Albuquerque", state: "NM",
    sector: "Hilton (switched from IHG)",
    headcount: 2, headcountGrowth: 100,
    yearFounded: 2020,
    revenueEstimate: "$3.1M · 2 units",
    jobPostings: [
      { title: "Original Holiday Inn Express 504 — $1.6M", location: "New Mexico CDC · 2020-08 · IHG flag", count: 1600 },
      { title: "Brand conversion to Hampton Inn", location: "2024-05 · Hilton flag, PIP financing", count: 1 },
      { title: "Unit #2 Hampton Inn 504 — $1.95M", location: "New Mexico CDC · 2025-09", count: 1950 },
    ],
  },
  {
    id: "fr-20",
    name: "Hassan Restaurant Group LLC",
    city: "Sacramento", state: "CA",
    sector: "KFC (switched from Pizza Hut)",
    headcount: 3, headcountGrowth: 50,
    yearFounded: 2018,
    revenueEstimate: "$1.4M · 3 units",
    jobPostings: [
      { title: "Pizza Hut Unit #1 — $385K", location: "Bank of America · 2018-04 · Yum Brands", count: 385 },
      { title: "Brand conversion to KFC", location: "2023-08 · Yum Brands cross-conversion", count: 1 },
      { title: "KFC Unit #2 — $480K", location: "BoeFly · 2024-06", count: 480 },
      { title: "KFC Unit #3 — $535K", location: "ApplePie Capital · 2025-11", count: 535 },
    ],
  },

  // New brand entrants
  {
    id: "fr-21",
    name: "Park View Pretzels LLC dba Auntie Anne's",
    city: "Phoenix", state: "AZ",
    sector: "Auntie Anne's",
    headcount: 1, headcountGrowth: 0,
    yearFounded: 2026,
    revenueEstimate: "$185K · 1 unit (new entrant)",
    jobPostings: [
      { title: "Initial SBA 7(a) Express — $185K", location: "Frost Bank · 2026-02", count: 185 },
      { title: "Unit #1 opening", location: "Phoenix mall location", count: 1 },
    ],
  },
  {
    id: "fr-22",
    name: "Coastal Smoothie LLC dba Tropical Smoothie",
    city: "Charleston", state: "SC",
    sector: "Tropical Smoothie",
    headcount: 1, headcountGrowth: 0,
    yearFounded: 2025,
    revenueEstimate: "$245K · 1 unit (new entrant)",
    jobPostings: [
      { title: "Initial SBA 7(a) — $245K", location: "First Citizens · 2025-08", count: 245 },
      { title: "Unit #1 opening", location: "Mt. Pleasant SC market", count: 1 },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// Signals — franchise-specific events
// ─────────────────────────────────────────────────────────────────

const signals: Signal[] = [
  { id: "s-fr-01", companyId: "fr-06", companyName: "Singh Restaurant Group LLC", companyLocation: "Charlotte, NC", type: "multi_unit_expansion", headline: "Unit #4 expansion loan funded — $860K", detail: "McDonald's franchisee scaling from 3 → 4 units; ApplePie Capital funded $860K.", value: 860, metric: "K loan size", daysAgo: 2, timestamp: "2026-04-17", sector: "McDonald's" },
  { id: "s-fr-02", companyId: "fr-08", companyName: "Anytime Fitness Holdings LLC", companyLocation: "Phoenix, AZ", type: "multi_unit_expansion", headline: "Unit #5 expansion loan funded — $475K", detail: "Anytime Fitness mega-franchisee scaling from 4 → 5 units; ReadyCap Lending funded $475K.", value: 475, metric: "K loan size", daysAgo: 1, timestamp: "2026-04-18", sector: "Anytime Fitness" },
  { id: "s-fr-03", companyId: "fr-12", companyName: "BurgerKing Operators of TX LLC", companyLocation: "Houston, TX", type: "multi_unit_expansion", headline: "Unit #6 expansion loan funded — $960K", detail: "BK mega-franchisee scaling from 5 → 6 units; ApplePie Capital funded $960K.", value: 960, metric: "K loan size", daysAgo: 4, timestamp: "2026-04-15", sector: "Burger King" },
  { id: "s-fr-04", companyId: "fr-07", companyName: "Johnson Family Brands LLC", companyLocation: "Atlanta, GA", type: "multi_unit_expansion", headline: "Unit #3 expansion loan funded — $750K", detail: "Chick-fil-A franchisee scaling from 2 → 3 units; BoeFly funded $750K.", value: 750, metric: "K loan size", daysAgo: 3, timestamp: "2026-04-16", sector: "Chick-fil-A" },
  { id: "s-fr-05", companyId: "fr-09", companyName: "Bayou Burger LLC", companyLocation: "Baton Rouge, LA", type: "multi_unit_expansion", headline: "Unit #4 expansion loan funded — $720K", detail: "Burger King franchisee scaling from 3 → 4 units; BoeFly funded $720K.", value: 720, metric: "K loan size", daysAgo: 2, timestamp: "2026-04-17", sector: "Burger King" },
  { id: "s-fr-06", companyId: "fr-10", companyName: "Lone Star Subs LLC", companyLocation: "Houston, TX", type: "multi_unit_expansion", headline: "Unit #3 expansion loan funded — $440K", detail: "Jersey Mike's franchisee scaling from 2 → 3 units; ApplePie Capital funded $440K.", value: 440, metric: "K loan size", daysAgo: 5, timestamp: "2026-04-14", sector: "Jersey Mike's" },
  { id: "s-fr-07", companyId: "fr-01", companyName: "Patel Hospitality LLC", companyLocation: "Newark, NJ", type: "loan_paid_off", headline: "Subway franchisee paid in full + Unit #2 in flight", detail: "Patel Hospitality retired $185K Express 44 months early; second-unit lease signed.", value: 185, metric: "K retired", daysAgo: 1, timestamp: "2026-04-18", sector: "Subway" },
  { id: "s-fr-08", companyId: "fr-15", companyName: "Mathnasium Group of SoCal LLC", companyLocation: "Los Angeles, CA", type: "multi_unit_expansion", headline: "Unit #7 expansion loan funded — $375K", detail: "Mathnasium mega-franchisee scaling from 6 → 7 units; Direct Capital funded $375K.", value: 375, metric: "K loan size", daysAgo: 4, timestamp: "2026-04-15", sector: "Mathnasium" },
  { id: "s-fr-09", companyId: "fr-14", companyName: "7-Eleven Holdings of OR LLC", companyLocation: "Portland, OR", type: "multi_unit_expansion", headline: "Unit #4 expansion loan funded — $545K", detail: "7-Eleven franchisee scaling from 3 → 4 units; ApplePie Capital funded $545K.", value: 545, metric: "K loan size", daysAgo: 6, timestamp: "2026-04-13", sector: "7-Eleven" },
  { id: "s-fr-10", companyId: "fr-13", companyName: "Great Clips Multi-Unit LLC", companyLocation: "Minneapolis, MN", type: "multi_unit_expansion", headline: "Unit #8 expansion loan funded — $245K", detail: "Great Clips mega-franchisee scaling from 7 → 8 units; Direct Capital funded $245K.", value: 245, metric: "K loan size", daysAgo: 7, timestamp: "2026-04-12", sector: "Great Clips" },
  { id: "s-fr-11", companyId: "fr-16", companyName: "Tri-State Hospitality Group LLC", companyLocation: "Nashville, TN", type: "multi_unit_expansion", headline: "Fairfield Inn Unit #2 504 funded — $2.05M", detail: "Multi-brand hotelier (Hilton + Marriott) added second Fairfield Inn; Tennessee CDC funded.", value: 2050, metric: "K loan size", daysAgo: 3, timestamp: "2026-04-16", sector: "Multi-Brand (Hilton + Marriott)" },
  { id: "s-fr-12", companyId: "fr-17", companyName: "Carolina QSR Holdings LLC", companyLocation: "Charlotte, NC", type: "multi_unit_expansion", headline: "Wendy's Unit #3 expansion — $580K", detail: "Multi-brand QSR (Wendy's + Taco Bell) added third Wendy's location.", value: 580, metric: "K loan size", daysAgo: 4, timestamp: "2026-04-15", sector: "Multi-Brand (Wendy's + Taco Bell)" },
  { id: "s-fr-13", companyId: "fr-18", companyName: "Midwest Fitness Brands LLC", companyLocation: "Indianapolis, IN", type: "multi_unit_expansion", headline: "Orangetheory Unit #2 expansion — $585K", detail: "Multi-brand fitness operator (Planet Fitness + Orangetheory) added second OTF location.", value: 585, metric: "K loan size", daysAgo: 5, timestamp: "2026-04-14", sector: "Multi-Brand (Planet Fitness + Orangetheory)" },
  { id: "s-fr-14", companyId: "fr-19", companyName: "Reyes Hospitality LLC", companyLocation: "Albuquerque, NM", type: "multi_unit_expansion", headline: "Second Hampton Inn 504 funded — $1.95M", detail: "Recently brand-switched operator (IHG → Hilton) opened second Hampton Inn property.", value: 1950, metric: "K loan size", daysAgo: 8, timestamp: "2026-04-11", sector: "Hilton (switched from IHG)" },
  { id: "s-fr-15", companyId: "fr-20", companyName: "Hassan Restaurant Group LLC", companyLocation: "Sacramento, CA", type: "multi_unit_expansion", headline: "KFC Unit #3 expansion funded — $535K", detail: "Recently brand-switched operator (Pizza Hut → KFC) added third KFC location.", value: 535, metric: "K loan size", daysAgo: 6, timestamp: "2026-04-13", sector: "KFC (switched from Pizza Hut)" },
  { id: "s-fr-16", companyId: "fr-04", companyName: "Trang Le Coffee LLC dba Dunkin'", companyLocation: "Boston, MA", type: "loan_origination", headline: "New franchisee — initial 7(a) funded $320K", detail: "First-time franchisee opening Dunkin' in Allston market.", value: 320, metric: "K loan size", daysAgo: 2, timestamp: "2026-04-17", sector: "Dunkin'" },
  { id: "s-fr-17", companyId: "fr-05", companyName: "Vega Brothers Pizza LLC", companyLocation: "Tampa, FL", type: "loan_origination", headline: "New franchisee — initial 7(a) funded $285K", detail: "Marco's Pizza first-unit franchisee in Tampa Carrollwood.", value: 285, metric: "K loan size", daysAgo: 3, timestamp: "2026-04-16", sector: "Marco's Pizza" },
  { id: "s-fr-18", companyId: "fr-21", companyName: "Park View Pretzels LLC dba Auntie Anne's", companyLocation: "Phoenix, AZ", type: "loan_origination", headline: "New franchisee — initial 7(a) Express funded $185K", detail: "First-time Auntie Anne's franchisee opening Phoenix mall location.", value: 185, metric: "K loan size", daysAgo: 1, timestamp: "2026-04-18", sector: "Auntie Anne's" },
  { id: "s-fr-19", companyId: "fr-22", companyName: "Coastal Smoothie LLC dba Tropical Smoothie", companyLocation: "Charleston, SC", type: "loan_origination", headline: "New franchisee — initial 7(a) funded $245K", detail: "First-time Tropical Smoothie franchisee in Mt. Pleasant SC.", value: 245, metric: "K loan size", daysAgo: 4, timestamp: "2026-04-15", sector: "Tropical Smoothie" },
  { id: "s-fr-20", companyId: "fr-02", companyName: "Apex CrossFit Holdings LLC", companyLocation: "Denver, CO", type: "loan_origination", headline: "Single-unit operator clean 32-month record", detail: "CrossFit franchisee with 32 months on-time 1502 record; growth signal monitored.", daysAgo: 5, timestamp: "2026-04-14", sector: "CrossFit" },
  { id: "s-fr-21", companyId: "fr-03", companyName: "Pacific Yoga Studios LLC", companyLocation: "Portland, OR", type: "loan_origination", headline: "CorePower Yoga first-year operator", detail: "Single-unit Portland studio in first year of operation.", daysAgo: 6, timestamp: "2026-04-13", sector: "CorePower Yoga" },
  { id: "s-fr-22", companyId: "fr-11", companyName: "Sharma Hotels LLC", companyLocation: "Plano, TX", type: "loan_origination", headline: "Comfort Inn 504 — single property, 24mo current", detail: "Choice Hotels franchisee with $4.2M 504 on 70-room property.", daysAgo: 8, timestamp: "2026-04-11", sector: "Choice Hotels" },
];

// ─────────────────────────────────────────────────────────────────
// Cohort lists — franchise-lender-facing demand-side cohorts
// ─────────────────────────────────────────────────────────────────

const signalLists: SignalList[] = [
  {
    id: "list-fr-1",
    name: "FR-1 — Single-Unit First-Year Operators",
    description: "First-year franchisees with PU=1, recent SBA Express or 7(a). Highest-density cohort; growth-ready candidates for unit #2 financing within 18-24 months.",
    companyCount: 18400,
    signalStrength: 87,
    lastUpdated: "2026-04-18",
    sector: "Franchise",
    region: "National",
    tags: ["franchise-fr1", "first-year", "single-unit", "growth-pipeline"],
    companyIds: ["fr-01", "fr-02", "fr-03", "fr-04", "fr-05", "fr-21", "fr-22"],
  },
  {
    id: "list-fr-2",
    name: "FR-2 — Multi-Unit Operators (2-5 Units)",
    description: "Established franchisees with proven 2-5 unit operating track record. Default franchise-lender book; predictable expansion underwriting profile.",
    companyCount: 8200,
    signalStrength: 93,
    lastUpdated: "2026-04-18",
    sector: "Franchise",
    region: "National",
    tags: ["franchise-fr2", "multi-unit", "2-5-units", "default-book"],
    companyIds: ["fr-06", "fr-07", "fr-09", "fr-10", "fr-08", "fr-14", "fr-19"],
  },
  {
    id: "list-fr-3",
    name: "FR-3 — Mega-Franchisees (6+ Units)",
    description: "Mega-franchisees operating 6 or more units. Larger loan sizes, portfolio-level financing, regional consolidator profile.",
    companyCount: 1840,
    signalStrength: 96,
    lastUpdated: "2026-04-18",
    sector: "Franchise",
    region: "National",
    tags: ["franchise-fr3", "mega-franchisee", "6-plus", "portfolio"],
    companyIds: ["fr-12", "fr-13", "fr-15"],
  },
  {
    id: "list-fr-4",
    name: "FR-4 — Multi-Brand Operators",
    description: "Franchisees operating across 2+ brands. Often cross-portfolio refinance candidates; sophisticated operators with treasury / banking depth.",
    companyCount: 3100,
    signalStrength: 91,
    lastUpdated: "2026-04-17",
    sector: "Franchise",
    region: "National",
    tags: ["franchise-fr4", "multi-brand", "treasury", "portfolio-refi"],
    companyIds: ["fr-16", "fr-17", "fr-18"],
  },
  {
    id: "list-fr-5",
    name: "FR-5 — Brand-Switched Operators (Last 24 Months)",
    description: "Franchisees that recently switched brands (within the same parent or cross-parent). Capex-heavy moment; PIP financing or follow-on opportunity.",
    companyCount: 1240,
    signalStrength: 89,
    lastUpdated: "2026-04-18",
    sector: "Franchise",
    region: "National",
    tags: ["franchise-fr5", "brand-switch", "pip-financing", "recent"],
    companyIds: ["fr-19", "fr-20"],
  },
  {
    id: "list-fr-6",
    name: "FR-6 — Hotel / Hospitality Franchisees",
    description: "Hotel-flag franchisees (Hilton, Marriott, IHG, Choice, Hyatt, etc.). 504-program-heavy; CDC + hospitality-specialty lender appetite.",
    companyCount: 4800,
    signalStrength: 94,
    lastUpdated: "2026-04-18",
    sector: "Franchise",
    region: "National",
    tags: ["franchise-fr6", "hospitality", "504", "cdc"],
    companyIds: ["fr-11", "fr-16", "fr-19"],
  },
];

// ─────────────────────────────────────────────────────────────────
// Charts — 12 months
// Contract = monthly franchise-unit expansion loans by brand category
// Hiring = active franchise operators by brand category
// ─────────────────────────────────────────────────────────────────

const contractChartData: TimeSeriesPoint[] = [
  { month: "May '25", qsr: 1.85, fitness: 0.42, hospitality: 1.18, services: 0.65 },
  { month: "Jun '25", qsr: 1.92, fitness: 0.45, hospitality: 1.22, services: 0.68 },
  { month: "Jul '25", qsr: 2.01, fitness: 0.48, hospitality: 1.28, services: 0.71 },
  { month: "Aug '25", qsr: 2.08, fitness: 0.51, hospitality: 1.34, services: 0.74 },
  { month: "Sep '25", qsr: 2.14, fitness: 0.54, hospitality: 1.41, services: 0.77 },
  { month: "Oct '25", qsr: 2.22, fitness: 0.57, hospitality: 1.48, services: 0.80 },
  { month: "Nov '25", qsr: 2.28, fitness: 0.60, hospitality: 1.54, services: 0.83 },
  { month: "Dec '25", qsr: 2.18, fitness: 0.57, hospitality: 1.48, services: 0.80 },
  { month: "Jan '26", qsr: 2.36, fitness: 0.63, hospitality: 1.61, services: 0.87 },
  { month: "Feb '26", qsr: 2.45, fitness: 0.66, hospitality: 1.68, services: 0.91 },
  { month: "Mar '26", qsr: 2.54, fitness: 0.69, hospitality: 1.75, services: 0.94 },
  { month: "Apr '26", qsr: 2.62, fitness: 0.72, hospitality: 1.82, services: 0.98 },
];

const contractChartSeries: ChartSeries[] = [
  { key: "qsr", label: "QSR / Fast Food", color: "#f59e0b" },
  { key: "hospitality", label: "Hospitality / Hotels", color: "#3b82f6" },
  { key: "fitness", label: "Fitness", color: "#10b981" },
  { key: "services", label: "Personal Services", color: "#8b5cf6" },
];

const hiringChartData: TimeSeriesPoint[] = [
  { month: "May '25", qsr: 98, fitness: 22, hospitality: 38, services: 42 },
  { month: "Jun '25", qsr: 99, fitness: 23, hospitality: 39, services: 43 },
  { month: "Jul '25", qsr: 100, fitness: 24, hospitality: 40, services: 44 },
  { month: "Aug '25", qsr: 102, fitness: 24, hospitality: 41, services: 45 },
  { month: "Sep '25", qsr: 103, fitness: 25, hospitality: 42, services: 46 },
  { month: "Oct '25", qsr: 105, fitness: 26, hospitality: 43, services: 47 },
  { month: "Nov '25", qsr: 106, fitness: 27, hospitality: 44, services: 48 },
  { month: "Dec '25", qsr: 107, fitness: 27, hospitality: 44, services: 48 },
  { month: "Jan '26", qsr: 109, fitness: 28, hospitality: 45, services: 49 },
  { month: "Feb '26", qsr: 111, fitness: 29, hospitality: 46, services: 50 },
  { month: "Mar '26", qsr: 113, fitness: 30, hospitality: 47, services: 51 },
  { month: "Apr '26", qsr: 115, fitness: 31, hospitality: 48, services: 52 },
];

const hiringChartSeries: ChartSeries[] = [
  { key: "qsr", label: "QSR / Fast Food", color: "#f59e0b" },
  { key: "hospitality", label: "Hospitality / Hotels", color: "#3b82f6" },
  { key: "fitness", label: "Fitness", color: "#10b981" },
  { key: "services", label: "Personal Services", color: "#8b5cf6" },
];

// ─────────────────────────────────────────────────────────────────
// Market sectors — top franchise brand categories
// ─────────────────────────────────────────────────────────────────

const marketSectors: MarketSector[] = [
  { id: "ms-qsr", name: "QSR / Fast Food", activePostings: 115000, monthOverMonthGrowth: 8, companiesHiring: 2620, iconKey: "Briefcase", colorKey: "amber" },
  { id: "ms-hot", name: "Hospitality / Hotels", activePostings: 48000, monthOverMonthGrowth: 14, companiesHiring: 1820, iconKey: "Building2", colorKey: "blue" },
  { id: "ms-fit", name: "Fitness", activePostings: 31000, monthOverMonthGrowth: 18, companiesHiring: 720, iconKey: "Heart", colorKey: "emerald" },
  { id: "ms-prs", name: "Personal Services", activePostings: 52000, monthOverMonthGrowth: 9, companiesHiring: 980, iconKey: "Users", colorKey: "violet" },
  { id: "ms-csm", name: "Convenience / Gas", activePostings: 22000, monthOverMonthGrowth: 5, companiesHiring: 420, iconKey: "Building2", colorKey: "cyan" },
  { id: "ms-edu", name: "Tutoring / Education", activePostings: 8400, monthOverMonthGrowth: 22, companiesHiring: 245, iconKey: "Cpu", colorKey: "red" },
];

const topHiringCompanies: TopHiringCompany[] = [
  { id: "th-fr-1", name: "Tri-State Hospitality Group LLC", sector: "Multi-Brand (Hilton + Marriott)", location: "Nashville, TN", openRoles: 4, headcountGrowth: 33, topRole: "Fairfield Inn #2 — $2.05M" },
  { id: "th-fr-2", name: "Sharma Hotels LLC dba Comfort Inn", sector: "Choice Hotels", location: "Plano, TX", openRoles: 1, headcountGrowth: 0, topRole: "504 — $4.2M (24mo current)" },
  { id: "th-fr-3", name: "Reyes Hospitality LLC dba Hampton Inn", sector: "Hilton (switched from IHG)", location: "Albuquerque, NM", openRoles: 2, headcountGrowth: 100, topRole: "Hampton Inn #2 — $1.95M" },
  { id: "th-fr-4", name: "BurgerKing Operators of TX LLC", sector: "Burger King", location: "Houston, TX", openRoles: 6, headcountGrowth: 20, topRole: "Unit #6 — $960K" },
  { id: "th-fr-5", name: "Singh Restaurant Group LLC", sector: "McDonald's", location: "Charlotte, NC", openRoles: 4, headcountGrowth: 33, topRole: "Unit #4 — $860K" },
  { id: "th-fr-6", name: "Johnson Family Brands LLC", sector: "Chick-fil-A", location: "Atlanta, GA", openRoles: 3, headcountGrowth: 50, topRole: "Unit #3 — $750K" },
  { id: "th-fr-7", name: "Bayou Burger LLC", sector: "Burger King", location: "Baton Rouge, LA", openRoles: 4, headcountGrowth: 33, topRole: "Unit #4 — $720K" },
  { id: "th-fr-8", name: "Carolina QSR Holdings LLC", sector: "Multi-Brand (Wendy's + Taco Bell)", location: "Charlotte, NC", openRoles: 5, headcountGrowth: 25, topRole: "Wendy's #3 — $580K" },
  { id: "th-fr-9", name: "Midwest Fitness Brands LLC", sector: "Multi-Brand (Planet Fitness + OTF)", location: "Indianapolis, IN", openRoles: 4, headcountGrowth: 33, topRole: "OTF #2 — $585K" },
  { id: "th-fr-10", name: "7-Eleven Holdings of OR LLC", sector: "7-Eleven", location: "Portland, OR", openRoles: 4, headcountGrowth: 33, topRole: "Unit #4 — $545K" },
];

const sectorDetails: Record<string, SectorDetail> = {
  "QSR / Fast Food": {
    roles: [
      { title: "McDonald's", count: 14200, growth: 8 },
      { title: "Subway", count: 24800, growth: 4 },
      { title: "Burger King", count: 7400, growth: 10 },
      { title: "Chick-fil-A", count: 2800, growth: 18 },
      { title: "Wendy's", count: 6200, growth: 9 },
      { title: "Taco Bell", count: 7100, growth: 12 },
      { title: "Domino's / Pizza Hut", count: 12400, growth: 6 },
      { title: "Jersey Mike's / Sub QSR", count: 8200, growth: 22 },
    ],
    regions: [
      { name: "Texas", postings: 14000, growth: 10 },
      { name: "Florida", postings: 12000, growth: 8 },
      { name: "California", postings: 10000, growth: 6 },
      { name: "Georgia", postings: 8500, growth: 12 },
      { name: "North Carolina", postings: 7800, growth: 14 },
      { name: "Ohio", postings: 6400, growth: 7 },
    ],
    companies: [
      { name: "Singh Restaurant Group LLC", location: "Charlotte, NC", openRoles: 4, headcountGrowth: 33, topRole: "McDonald's" },
      { name: "BurgerKing Operators of TX LLC", location: "Houston, TX", openRoles: 6, headcountGrowth: 20, topRole: "Burger King" },
      { name: "Johnson Family Brands LLC", location: "Atlanta, GA", openRoles: 3, headcountGrowth: 50, topRole: "Chick-fil-A" },
      { name: "Bayou Burger LLC", location: "Baton Rouge, LA", openRoles: 4, headcountGrowth: 33, topRole: "Burger King" },
      { name: "Lone Star Subs LLC", location: "Houston, TX", openRoles: 3, headcountGrowth: 50, topRole: "Jersey Mike's" },
      { name: "Patel Hospitality LLC", location: "Newark, NJ", openRoles: 1, headcountGrowth: 0, topRole: "Subway" },
    ],
    trendData: [
      { month: "May '25", postings: 98 }, { month: "Jun '25", postings: 99 }, { month: "Jul '25", postings: 100 },
      { month: "Aug '25", postings: 102 }, { month: "Sep '25", postings: 103 }, { month: "Oct '25", postings: 105 },
      { month: "Nov '25", postings: 106 }, { month: "Dec '25", postings: 107 }, { month: "Jan '26", postings: 109 },
      { month: "Feb '26", postings: 111 }, { month: "Mar '26", postings: 113 }, { month: "Apr '26", postings: 115 },
    ],
  },
  "Hospitality / Hotels": {
    roles: [
      { title: "Hilton (Hampton, Garden Inn)", count: 8200, growth: 14 },
      { title: "Marriott (Fairfield, SpringHill)", count: 7400, growth: 16 },
      { title: "IHG (Holiday Inn, Candlewood)", count: 6100, growth: 8 },
      { title: "Choice (Comfort, Quality)", count: 9400, growth: 12 },
      { title: "Wyndham (Days Inn, Super 8)", count: 8800, growth: 6 },
      { title: "Best Western", count: 4200, growth: 5 },
      { title: "Hyatt (Place, Studios)", count: 1840, growth: 22 },
    ],
    regions: [
      { name: "Texas", postings: 7800, growth: 16 },
      { name: "Florida", postings: 6200, growth: 14 },
      { name: "California", postings: 4800, growth: 8 },
      { name: "Tennessee", postings: 3400, growth: 18 },
      { name: "New Mexico", postings: 2400, growth: 22 },
      { name: "Georgia", postings: 3100, growth: 12 },
    ],
    companies: [
      { name: "Sharma Hotels LLC dba Comfort Inn", location: "Plano, TX", openRoles: 1, headcountGrowth: 0, topRole: "Choice Hotels — Comfort Inn" },
      { name: "Tri-State Hospitality Group LLC", location: "Nashville, TN", openRoles: 4, headcountGrowth: 33, topRole: "Multi-brand: Hilton + Marriott" },
      { name: "Reyes Hospitality LLC", location: "Albuquerque, NM", openRoles: 2, headcountGrowth: 100, topRole: "Hilton (switched from IHG)" },
      { name: "Coastal Hospitality of FL LLC", location: "Tampa, FL", openRoles: 3, headcountGrowth: 50, topRole: "IHG — Holiday Inn Express" },
      { name: "Mountain West Lodging LLC", location: "Denver, CO", openRoles: 2, headcountGrowth: 100, topRole: "Choice — Sleep Inn" },
      { name: "Atlantic Hotel Operators LLC", location: "Savannah, GA", openRoles: 3, headcountGrowth: 50, topRole: "Marriott — SpringHill Suites" },
    ],
    trendData: [
      { month: "May '25", postings: 38 }, { month: "Jun '25", postings: 39 }, { month: "Jul '25", postings: 40 },
      { month: "Aug '25", postings: 41 }, { month: "Sep '25", postings: 42 }, { month: "Oct '25", postings: 43 },
      { month: "Nov '25", postings: 44 }, { month: "Dec '25", postings: 44 }, { month: "Jan '26", postings: 45 },
      { month: "Feb '26", postings: 46 }, { month: "Mar '26", postings: 47 }, { month: "Apr '26", postings: 48 },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────
// Pipeline — franchisee × franchise-lender routings
// ─────────────────────────────────────────────────────────────────

const pipelineEntries: PipelineEntry[] = [
  { id: "pfr-01", status: "placed", companyDescription: "McDonald's 4-unit operator", region: "Charlotte, NC", sector: "McDonald's", signal: "Unit #4 expansion funded; growth trajectory clean", partnerType: "Franchise specialty lender (ApplePie)", outcome: "4 mega-franchisee placements; Q3 follow-on conversations open", daysAgo: 5, roles: "FR-2 + FR-3 overlap", placementCount: 4 },
  { id: "pfr-02", status: "intro_made", companyDescription: "Chick-fil-A multi-unit operator", region: "Atlanta, GA", sector: "Chick-fil-A", signal: "Unit #3 expansion + brand premium franchisee profile", partnerType: "Franchise specialty lender (BoeFly)", outcome: "Intro made — premium franchisee book", daysAgo: 3, roles: "FR-2 — Multi-Unit" },
  { id: "pfr-03", status: "placed", companyDescription: "Anytime Fitness 5-unit operator", region: "Phoenix, AZ", sector: "Anytime Fitness", signal: "Unit #5 expansion + fitness-vertical depth", partnerType: "Fitness-specialty lender (ApplePie)", outcome: "6 fitness-franchisee placements; follow-on at unit #6", daysAgo: 8, roles: "FR-2 + FR-1 follow-on", placementCount: 6 },
  { id: "pfr-04", status: "matched", companyDescription: "Mega-BK operator 6-units", region: "Houston, TX", sector: "Burger King", signal: "Unit #6 funded; portfolio refinance candidate", partnerType: "Portfolio refi lender (Direct Capital)", outcome: "Partner matched — portfolio refinance quote pending", daysAgo: 4, roles: "FR-3 — Mega-Franchisee" },
  { id: "pfr-05", status: "placed", companyDescription: "Comfort Inn 504 hotelier", region: "Plano, TX", sector: "Choice Hotels", signal: "$4.2M 504; 70-room property; 24mo on-time record", partnerType: "Hotel-specialty CDC + hospitality lender", outcome: "8 hotel-franchisee placements via 504 channel", daysAgo: 12, roles: "FR-6 — Hospitality", placementCount: 8 },
  { id: "pfr-06", status: "exploring", companyDescription: "Multi-brand hotelier 4 units", region: "Nashville, TN", sector: "Multi-Brand (Hilton + Marriott)", signal: "Second Fairfield 504 funded; cross-brand portfolio mature", partnerType: "Multi-brand portfolio lender", outcome: "Evaluating treasury + portfolio refi", daysAgo: 3, roles: "FR-4 + FR-6 overlap" },
  { id: "pfr-07", status: "placed", companyDescription: "Subway single-unit paid-in-full", region: "Newark, NJ", sector: "Subway", signal: "Loan paid in full + Unit #2 lease signed", partnerType: "Franchise specialty lender (BoeFly)", outcome: "5 paid-in-full repeat franchisees onboarded for unit #2 financing", daysAgo: 1, roles: "FR-1 graduating to FR-2", placementCount: 5 },
  { id: "pfr-08", status: "intro_made", companyDescription: "7-Eleven 4-unit operator", region: "Portland, OR", sector: "7-Eleven", signal: "Unit #4 funded; convenience-segment lender appetite strong", partnerType: "Convenience-specialty lender", outcome: "Intro made — c-store specialty book", daysAgo: 6, roles: "FR-2 — Multi-Unit" },
  { id: "pfr-09", status: "placed", companyDescription: "Great Clips 8-unit operator", region: "Minneapolis, MN", sector: "Great Clips", signal: "Unit #8 funded; mega-services-franchisee", partnerType: "Personal-services specialty lender", outcome: "3 mega-services placements; ongoing pipeline", daysAgo: 7, roles: "FR-3 — Mega-Franchisee", placementCount: 3 },
  { id: "pfr-10", status: "matched", companyDescription: "Mathnasium 7-unit operator", region: "Los Angeles, CA", sector: "Mathnasium", signal: "Unit #7 funded; education-vertical scale", partnerType: "Education-vertical lender", outcome: "Partner matched — tutoring-segment specialty book", daysAgo: 4, roles: "FR-3 — Mega-Franchisee" },
  { id: "pfr-11", status: "intro_made", companyDescription: "Brand-switched Hampton Inn", region: "Albuquerque, NM", sector: "Hilton (switched from IHG)", signal: "Brand conversion + second-unit 504 funded", partnerType: "PIP / brand-conversion specialty lender", outcome: "Intro made — Hilton flag PIP financing book", daysAgo: 8, roles: "FR-5 — Brand-Switched" },
  { id: "pfr-12", status: "placed", companyDescription: "Multi-brand QSR 5 units", region: "Charlotte, NC", sector: "Multi-Brand (Wendy's + Taco Bell)", signal: "Multi-brand portfolio + Wendy's #3 funded", partnerType: "Multi-brand QSR portfolio lender", outcome: "4 multi-brand operator placements; treasury cross-sell active", daysAgo: 5, roles: "FR-4 — Multi-Brand", placementCount: 4 },
];

const pipelineDetails: Record<string, PipelineEntryDetail> = {
  "pfr-01": {
    timeline: [
      { date: "Apr 1", iconKey: "Zap", colorClass: "text-amber-400", title: "Signal detected", detail: "Singh Restaurant Group LLC funded $860K for McDonald's Unit #4 via ApplePie Capital." },
      { date: "Apr 2", iconKey: "Crosshair", colorClass: "text-indigo-400", title: "Operator profiled", detail: "Charlotte mega-franchisee. 4 units, +33% growth, 7-year track record with McDonald's." },
      { date: "Apr 3", iconKey: "Radio", colorClass: "text-blue-400", title: "Cohort matched", detail: "FR-2 (multi-unit) graduating to FR-3 (mega-franchisee) — high-value cohort." },
      { date: "Apr 5", iconKey: "Users", colorClass: "text-cyan-400", title: "Operator opted in", detail: "Active interest in portfolio refinance + treasury services for multi-unit operation." },
      { date: "Apr 6", iconKey: "GitPullRequest", colorClass: "text-blue-400", title: "Partner matched", detail: "Franchise specialty lender with McDonald's flag focus + treasury banking depth." },
      { date: "Apr 7", iconKey: "Award", colorClass: "text-violet-400", title: "Intro made", detail: "Clean handoff. Lender already had 200+ McDonald's franchisees in book." },
      { date: "Apr 9", iconKey: "FileCheck2", colorClass: "text-emerald-400", title: "Cohort placements", detail: "4 mega-franchisee placements; Q3 follow-on (Unit #5) conversations open." },
    ],
    partner: { type: "Franchise specialty lender — ApplePie Capital", specialization: "Multi-unit franchise expansion, QSR-heavy, treasury depth", region: "National", relationship: "Active since Q4 2024" },
    placements: [
      { role: "Expansion Loan (Unit #5 indicative)", count: 0, status: "in_progress" },
      { role: "Treasury / Depository Services", count: 4, status: "filled" },
      { role: "Portfolio Refinance (cross-unit)", count: 2, status: "filled" },
    ],
    notes: ["McDonald's mega-franchisee cohort grew 22% in Q1", "Asked about Chick-fil-A multi-unit cross-pricing"],
  },
  "pfr-05": {
    timeline: [
      { date: "Mar 10", iconKey: "Zap", colorClass: "text-amber-400", title: "Signal detected", detail: "Sharma Hotels LLC funded $4.2M 504 for 70-room Comfort Inn acquisition." },
      { date: "Mar 12", iconKey: "Crosshair", colorClass: "text-indigo-400", title: "Operator profiled", detail: "Plano TX hotelier; first Choice Hotels flag; 24-month on-time payment track." },
      { date: "Mar 14", iconKey: "Radio", colorClass: "text-blue-400", title: "Cohort matched", detail: "FR-6 (hospitality) — CDC + hospitality-specialty lender appetite." },
      { date: "Mar 16", iconKey: "Users", colorClass: "text-cyan-400", title: "Operator opted in", detail: "Open to PIP financing + cross-flag growth (second Choice property exploration)." },
      { date: "Mar 18", iconKey: "GitPullRequest", colorClass: "text-blue-400", title: "Partner matched", detail: "Hotel-specialty CDC + hospitality lender combo." },
      { date: "Mar 20", iconKey: "Award", colorClass: "text-violet-400", title: "Intro made", detail: "Clean handoff; lender team had Texas hotelier book." },
      { date: "Apr 3", iconKey: "FileCheck2", colorClass: "text-emerald-400", title: "Cohort scales", detail: "8 hotel-franchisee placements via 504 channel; portfolio-mode underwriting active." },
    ],
    partner: { type: "Hotel-specialty CDC + hospitality lender combo", specialization: "504-program hotel acquisitions, Hilton/Marriott/Choice flags", region: "TX / TN / GA / FL", relationship: "Active since Q4 2025" },
    placements: [
      { role: "504 Origination (this borrower)", count: 1, status: "filled" },
      { role: "Hospitality-flag Cohort Placements", count: 8, status: "filled" },
      { role: "PIP / Brand-Conversion Follow-On", count: 0, status: "in_progress" },
    ],
    notes: ["Hotel-flag 504 cohort grew 28% in Q1", "Asked about Hampton Inn-flag cross-pricing for Reyes Hospitality"],
  },
};

// ─────────────────────────────────────────────────────────────────
// MarketDataset export
// ─────────────────────────────────────────────────────────────────

export const franchiseMarket: MarketDataset = {
  id: "franchise",
  label: "Franchise Market",
  shortLabel: "Franchise",

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
    { id: "contracts", label: "Recent Unit Expansions" },
    { id: "gc-demo", label: "Operator Demo" },
    { id: "signals", label: "Signals" },
    { id: "lists", label: "Lists" },
    { id: "salary", label: "Royalty Trends", mystery: true },
    { id: "trends", label: "Trends", mystery: true },
    { id: "pipeline", label: "Pipeline" },
    { id: "priority", label: "Priority", mystery: true },
  ],

  composeConfig: {
    basePopulation: 124_000,
    basePopulationLabel: "active franchise operators",
    exampleNames: [
      "QSR Multi-Unit Growth Pipeline",
      "Hotel 504 — Multi-Brand Operators",
      "Mega-Franchisee Portfolio Refi",
      "Single-Unit First-Year Growth",
      "Brand-Switched PIP Candidates",
    ],
    filters: [
      {
        id: "brand-category",
        label: "Brand Category",
        type: "multi",
        helpText: "High-level franchise category",
        options: [
          { id: "cat-qsr", label: "QSR / Fast Food", selectivity: 0.42, matchCompanyIds: ["fr-01", "fr-04", "fr-05", "fr-06", "fr-07", "fr-09", "fr-10", "fr-12", "fr-17", "fr-20", "fr-21", "fr-22"] },
          { id: "cat-hospitality", label: "Hospitality / Hotels", selectivity: 0.18, matchCompanyIds: ["fr-11", "fr-16", "fr-19"] },
          { id: "cat-fitness", label: "Fitness", selectivity: 0.12, matchCompanyIds: ["fr-02", "fr-03", "fr-08", "fr-18"] },
          { id: "cat-personal-services", label: "Personal Services", selectivity: 0.16, matchCompanyIds: ["fr-13"] },
          { id: "cat-convenience", label: "Convenience / Gas", selectivity: 0.08, matchCompanyIds: ["fr-14"] },
          { id: "cat-education", label: "Tutoring / Education", selectivity: 0.04, matchCompanyIds: ["fr-15"] },
        ],
      },
      {
        id: "unit-count",
        label: "Units Operated",
        type: "multi",
        helpText: "Number of physical franchise locations",
        options: [
          { id: "units-1", label: "Single Unit", hint: "First-year + scaling candidates", selectivity: 0.48, matchCompanyIds: ["fr-01", "fr-02", "fr-03", "fr-04", "fr-05", "fr-11", "fr-21", "fr-22"] },
          { id: "units-2-5", label: "2–5 Units", hint: "Default multi-unit book", selectivity: 0.34, matchCompanyIds: ["fr-06", "fr-07", "fr-08", "fr-09", "fr-10", "fr-14", "fr-16", "fr-17", "fr-18", "fr-19", "fr-20"] },
          { id: "units-6-10", label: "6–10 Units", hint: "Portfolio-mode mega cohort", selectivity: 0.12, matchCompanyIds: ["fr-12", "fr-15"] },
          { id: "units-10-plus", label: "10+ Units", hint: "Regional consolidator", selectivity: 0.06, matchCompanyIds: ["fr-13"] },
        ],
      },
      {
        id: "specific-brand",
        label: "Specific Brand",
        type: "multi",
        helpText: "Optional brand filter (overrides category)",
        options: [
          { id: "brand-mcdonalds", label: "McDonald's", selectivity: 0.012, matchCompanyIds: ["fr-06"] },
          { id: "brand-bk", label: "Burger King", selectivity: 0.008, matchCompanyIds: ["fr-09", "fr-12"] },
          { id: "brand-cfa", label: "Chick-fil-A", selectivity: 0.003, matchCompanyIds: ["fr-07"] },
          { id: "brand-subway", label: "Subway", selectivity: 0.022, matchCompanyIds: ["fr-01"] },
          { id: "brand-anytime-fitness", label: "Anytime Fitness", selectivity: 0.004, matchCompanyIds: ["fr-08"] },
          { id: "brand-choice", label: "Choice Hotels", selectivity: 0.008, matchCompanyIds: ["fr-11"] },
          { id: "brand-hilton", label: "Hilton (Hampton / GI)", selectivity: 0.006, matchCompanyIds: ["fr-19"] },
          { id: "brand-marriott", label: "Marriott (Fairfield / SH)", selectivity: 0.006, matchCompanyIds: ["fr-16"] },
          { id: "brand-7eleven", label: "7-Eleven", selectivity: 0.009, matchCompanyIds: ["fr-14"] },
          { id: "brand-great-clips", label: "Great Clips", selectivity: 0.005, matchCompanyIds: ["fr-13"] },
        ],
      },
      {
        id: "last-expansion",
        label: "Last Unit Expansion",
        type: "multi",
        helpText: "Time since most recent unit-expansion loan",
        options: [
          { id: "exp-last-12mo", label: "Last 12 months", hint: "Active growth signal", selectivity: 0.22, matchCompanyIds: ["fr-06", "fr-07", "fr-08", "fr-09", "fr-10", "fr-12", "fr-13", "fr-14", "fr-15", "fr-16", "fr-17", "fr-18", "fr-19", "fr-20"] },
          { id: "exp-1-3yr", label: "1–3 years ago", selectivity: 0.28, matchCompanyIds: [] },
          { id: "exp-3-plus", label: "3+ years ago", selectivity: 0.18, matchCompanyIds: [] },
          { id: "exp-never", label: "Single Unit — Never Expanded", hint: "Growth candidates for unit #2", selectivity: 0.32, matchCompanyIds: ["fr-01", "fr-02", "fr-03", "fr-04", "fr-05", "fr-11", "fr-21", "fr-22"] },
        ],
      },
      {
        id: "brand-trajectory",
        label: "Brand Trajectory",
        type: "single",
        helpText: "Whether operator recently switched brands",
        options: [
          { id: "switched", label: "Brand-Switched", hint: "Within last 24 months — PIP financing window", selectivity: 0.04, matchCompanyIds: ["fr-19", "fr-20"] },
          { id: "single-flag", label: "Single-Flag Operator", selectivity: 0.78, matchCompanyIds: ["fr-01", "fr-02", "fr-03", "fr-04", "fr-05", "fr-06", "fr-07", "fr-08", "fr-09", "fr-10", "fr-11", "fr-12", "fr-13", "fr-14", "fr-15", "fr-21", "fr-22"] },
          { id: "multi-brand", label: "Multi-Brand Operator", hint: "Operates 2+ brands", selectivity: 0.18, matchCompanyIds: ["fr-16", "fr-17", "fr-18"] },
        ],
      },
    ],
  },

  queryConsoleExamples: [
    {
      id: "qsr-multi-unit",
      trigger: "Show me all QSR operators with recent unit expansion",
      matchKeywords: ["qsr", "fast food", "mcdonald", "burger", "subway", "chick-fil-a", "wendy", "taco bell", "unit expansion"],
      label: "QSR Multi-Unit Operators — Recent Expansion",
      subtext: "QSR franchisees with recent unit #N expansion loans across major brands",
      companyIds: ["fr-06", "fr-07", "fr-09", "fr-10", "fr-12", "fr-17"],
      totalCount: 5400,
    },
    {
      id: "multi-brand",
      trigger: "Show me all multi-brand operators",
      matchKeywords: ["multi-brand", "multi brand", "multibrand", "multi-flag", "two brand", "cross-brand"],
      label: "Multi-Brand Franchise Operators",
      subtext: "Operators running 2+ brands — sophisticated, treasury-deep, cross-portfolio refi candidates",
      companyIds: ["fr-16", "fr-17", "fr-18"],
      totalCount: 3100,
    },
    {
      id: "mega",
      trigger: "Show me all mega-franchisees with 6+ units",
      matchKeywords: ["mega", "6+", "6 or more", "large operator", "portfolio operator", "consolidator"],
      label: "Mega-Franchisees (6+ Units)",
      subtext: "Portfolio-mode operators — larger loan sizes + regional consolidator profile",
      companyIds: ["fr-12", "fr-13", "fr-15"],
      totalCount: 1840,
    },
    {
      id: "hotel-504",
      trigger: "Show me all hotel franchisees with 504 loans",
      matchKeywords: ["hotel", "hospitality", "hilton", "marriott", "choice", "ihg", "hyatt", "504"],
      label: "Hotel Franchisees — 504-Backed",
      subtext: "Hotel-flag operators (Hilton / Marriott / Choice / IHG) on 504 program — CDC + hospitality-specialty lender appetite",
      companyIds: ["fr-11", "fr-16", "fr-19"],
      totalCount: 4800,
    },
  ],

  personas: [
    {
      id: "franchise-specialty",
      label: "Franchise Specialty Lender",
      blurb: "Single-unit + multi-unit franchise operators. Default franchise-specialty lender book (ApplePie, BoeFly, Direct Capital, ReadyCap).",
      cohortPriorityIds: ["list-fr-1", "list-fr-2", "list-fr-3"],
      demoTitleOverride: "Franchise Specialty Cohorts — Single → Multi-Unit Growth Pipeline",
      demoSubtitleOverride: "Franchise operators segmented for franchise-specialty lender appetite: first-year single-unit growth candidates, established multi-unit default book, mega-franchisee portfolio-mode operators. Cross-brand spread (QSR + fitness + services).",
      demoPillsOverride: ["Single-Unit Growth", "Multi-Unit Default", "Mega 6+", "Brand Cross-Spread", "Specialty UW"],
      demoSectionsOverride: [
        { id: "fr-1", label: "FR-1 — Single-Unit First-Year Operators", subtext: "First-year franchisees. Growth-ready candidates for unit #2 financing within 18-24 months. 18,400 operators.", companyIds: ["fr-01", "fr-02", "fr-03", "fr-04", "fr-05", "fr-21", "fr-22"], icon: "Zap", color: "text-amber-400" },
        { id: "fr-2", label: "FR-2 — Multi-Unit Operators (2-5 Units)", subtext: "Established 2-5 unit operators. Default franchise-lender book. 8,200 operators.", companyIds: ["fr-06", "fr-07", "fr-09", "fr-10", "fr-08", "fr-14"], icon: "Award", color: "text-blue-400" },
        { id: "fr-3", label: "FR-3 — Mega-Franchisees (6+ Units)", subtext: "Portfolio-mode mega-operators. Larger loan sizes; regional consolidator profile. 1,840 operators.", companyIds: ["fr-12", "fr-13", "fr-15"], icon: "Crosshair", color: "text-emerald-400" },
      ],
    },
    {
      id: "multi-brand-portfolio",
      label: "Multi-Brand Portfolio Lender",
      blurb: "Sophisticated multi-brand + portfolio-mode operators. Treasury-deep, cross-portfolio refinance candidates.",
      cohortPriorityIds: ["list-fr-4", "list-fr-3"],
      demoTitleOverride: "Multi-Brand Portfolio Cohorts — Sophisticated Multi-Brand + Mega-Operators",
      demoSubtitleOverride: "Franchise operators with 2+ brands or 6+ units. Portfolio-level financing, treasury banking, cross-portfolio refinance. The most sophisticated segment of franchise operators — typically backed by family-office or PE capital.",
      demoPillsOverride: ["Multi-Brand", "Mega 6+", "Portfolio Refi", "Treasury", "Cross-Brand Portfolio"],
      demoSectionsOverride: [
        { id: "fr-4", label: "FR-4 — Multi-Brand Operators", subtext: "Operators across 2+ brands. Sophisticated; treasury-deep. 3,100 operators.", companyIds: ["fr-16", "fr-17", "fr-18"], icon: "GitPullRequest", color: "text-violet-400" },
        { id: "fr-3-mega", label: "FR-3 — Mega-Franchisees (6+ Units)", subtext: "Portfolio-mode operators in single brand. Mega cohort. 1,840 operators.", companyIds: ["fr-12", "fr-13", "fr-15"], icon: "Crosshair", color: "text-emerald-400" },
      ],
    },
    {
      id: "hospitality-cdc",
      label: "Hospitality CDC",
      blurb: "Hotel-flag franchisees. 504-program-heavy; CDC + hospitality-specialty lender appetite.",
      cohortPriorityIds: ["list-fr-6"],
      demoTitleOverride: "Hospitality Cohorts — Hotel-Flag Franchisees (504 + CDC)",
      demoSubtitleOverride: "Hotel-flag franchisees operating Hilton (Hampton, Garden Inn), Marriott (Fairfield, SpringHill), Choice (Comfort, Quality), IHG, Hyatt properties. 504-program-heavy; CDC + hospitality-specialty lender appetite. Multi-brand hotel operators command premium underwriting.",
      demoPillsOverride: ["Hilton Flag", "Marriott Flag", "Choice Flag", "IHG Flag", "504-Backed", "Multi-Brand Hotelier"],
      demoSectionsOverride: [
        { id: "fr-6-single", label: "Single-Flag Hospitality", subtext: "Hotel franchisees operating one flag (Choice, Hilton, Marriott, IHG).", companyIds: ["fr-11", "fr-19"], icon: "Building2", color: "text-blue-400" },
        { id: "fr-6-multi", label: "Multi-Brand Hospitality", subtext: "Hoteliers operating across multiple flags (Hilton + Marriott, etc.). Portfolio-mode underwriting.", companyIds: ["fr-16"], icon: "GitPullRequest", color: "text-violet-400" },
      ],
    },
    {
      id: "brand-conversion",
      label: "Brand-Conversion Specialty",
      blurb: "Recently brand-switched operators. Capex-heavy moment — PIP financing or follow-on opportunity within 12 months of brand switch.",
      cohortPriorityIds: ["list-fr-5", "list-fr-6"],
      demoTitleOverride: "Brand-Conversion Cohorts — Recent Brand Switchers",
      demoSubtitleOverride: "Franchisees that recently switched brands within the same parent (Yum Brands cross-flag) or cross-parent (IHG → Hilton, Burger King → KFC). Capex-heavy moment — PIP (property improvement plan) financing + follow-on origination opportunity within the 12-month conversion window.",
      demoPillsOverride: ["Brand Switch", "PIP Financing", "Recent Conversion", "Hotel PIP", "Cross-Parent"],
      demoSectionsOverride: [
        { id: "fr-5-hotel", label: "Hotel Brand-Switchers", subtext: "Hotel-flag conversions (IHG → Hilton, etc.). PIP financing typically $1M-$3M per property.", companyIds: ["fr-19"], icon: "Building2", color: "text-blue-400" },
        { id: "fr-5-qsr", label: "QSR Brand-Switchers", subtext: "QSR brand conversions (Pizza Hut → KFC within Yum, BK → Wendy's cross-parent). Build-out capex $300K-$800K.", companyIds: ["fr-20"], icon: "Briefcase", color: "text-amber-400" },
      ],
    },
  ],

  vocab: {
    pillLabel: "Franchise Market",

    entityNoun: "Franchisee",
    entityNounPlural: "Franchisees",

    sizeLabel: "Units Operated",
    sizeUnit: "units",
    growthLabel: "Unit Growth",

    sectorLabel: "Brand",

    activityHeader: "Loan History Timeline",
    activityCountLabel: "loan events",

    marketStats: [
      { label: "Active Franchisees", value: "124K", sub: "operating across 800+ franchise brands", icon: "Award", color: "text-blue-400" },
      { label: "Franchisees Tracked", value: "847K", sub: "SBA loan history + unit count + brand affiliation", icon: "Building2", color: "text-indigo-400" },
      { label: "Unit Expansions", value: "1,840", sub: "new units financed this month", icon: "Zap", color: "text-amber-400" },
      { label: "Avg Total Capital", value: "$1.4M", sub: "deployed per multi-unit operator", icon: "TrendingUp", color: "text-emerald-400" },
    ],

    contractChartTitle: "Unit Expansion Financing by Brand Category",
    contractChartSub: "SBA-funded franchise unit expansion volume (in $B) — trailing 12 months",
    contractChartYPrefix: "$",
    contractChartYSuffix: "B",
    contractChartTooltipUnit: "B",

    hiringChartTitle: "Active Franchisees by Brand Category",
    hiringChartSub: "Active franchisee operators (in thousands) — trailing 12 months",
    hiringChartYSuffix: "K",
    hiringChartTooltipUnit: "active operators (K)",

    hotSectorsTitle: "Brand Categories",
    hotSectorsActiveLabel: "active franchisees",
    hotSectorsCountSuffix: "new units this month",

    topEntitiesTitle: "Top Franchisees by Recent Unit Expansion",
    topEntitiesHeaders: {
      entity: "Operator",
      sector: "Brand",
      topRole: "Recent Loan Event",
      openRoles: "Units",
      growth: "Unit Δ",
    },

    contractsTabHeading: "Recent Franchise Unit Expansions",
    contractsTabCounterLabel: "expansions tracked",
    contractsTabStats: {
      total: "Total Capital", totalSub: "deployed across unit expansions ($K)",
      count: "Expansion Loans", countSub: "funded this period",
      winners: "Franchisees", winnersSub: "unique operators expanding",
    },
    contractsTabFilterTypes: ["multi_unit_expansion", "loan_origination"],
    contractsTabValueFormat: "count",
    contractsTabValueUnit: "K",
    demoTabFilterTypes: ["multi_unit_expansion", "loan_origination", "loan_paid_off"],

    demoTabFilterEyebrow: "Cohort View",
    demoTabTitle: "Franchise Operator Cohorts — Routed by Lender Persona",
    demoTabSubtitle: "Franchisees segmented by unit count, brand portfolio, and operating trajectory. Each cohort routes to a distinct franchise-lender persona — single-unit growth-stage, multi-unit default book, mega-franchisee portfolio-mode, multi-brand sophisticated operators, brand-switched PIP-financing candidates, hospitality 504 specialists.",
    demoTabPills: ["Single-Unit Growth", "Multi-Unit Default", "Mega 6+", "Multi-Brand", "Brand-Switched", "Hotel/504"],
    demoTabStats: { total: "Combined Capital ($K)", avg: "Avg Loan ($K)", entities: "Operators Shown", activity: "Recent Events" },
    demoTabSections: [
      { id: "fr-2", label: "FR-2 — Multi-Unit Operators (2-5 Units)", subtext: "Established 2-5 unit operators. Default franchise-lender book. 8,200 operators.", companyIds: ["fr-06", "fr-07", "fr-09", "fr-10", "fr-08", "fr-14"], icon: "Award", color: "text-blue-400" },
      { id: "fr-3", label: "FR-3 — Mega-Franchisees (6+ Units)", subtext: "Portfolio-mode operators. Mega cohort, larger loan sizes. 1,840 operators.", companyIds: ["fr-12", "fr-13", "fr-15"], icon: "Crosshair", color: "text-emerald-400" },
      { id: "fr-4", label: "FR-4 — Multi-Brand Operators", subtext: "Operators across 2+ brands. Sophisticated, treasury-deep. 3,100 operators.", companyIds: ["fr-16", "fr-17", "fr-18"], icon: "GitPullRequest", color: "text-violet-400" },
    ],

    signalsTabHeading: "Recent Franchise Signals",
    signalsTabCounterLabel: "signals tracked",

    listsTabHeading: "Operator Cohorts",
    listsTabCounterLabel: "active cohorts",
    listsItemEntityLabel: "operators",

    pipelinePlacedLabel: "Total Routed",
    pipelinePlacedSub: "franchisees placed with lenders",
    pipelineActiveLabel: "Active",
    pipelineActiveSub: "intros in progress",
    pipelineConnectionsLabel: "Routings",
    pipelineConnectionsSub: "this quarter",

    sectorDetailBackLabel: "Back to Market",
    sectorDetailTrendHeader: "Active Franchisees — 12 Month Trend",
    sectorDetailTrendUnit: "active operators",
    sectorDetailRolesHeader: "Brand Mix",
    sectorDetailRegionsHeader: "Top States",
    sectorDetailCompaniesHeader: "Top Operators by Unit Activity",
    sectorOverviewMetricLabel: "active franchisees",
    sectorOverviewTertiaryLabel: "new units this month",

    dossierStats: { headcount: "Units Operated", growth: "Unit Growth", revenue: "Total Capital", openRoles: "Loan Events" },
    dossierActivityHeader: "SBA Loan History",
    dossierSignalsHeader: "Recent Signals",
    dossierDetailsHeader: "Operator Details",
  },
};
