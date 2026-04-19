export interface Company {
  id: string;
  name: string;
  city: string;
  state: string;
  sector: string;
  headcount: number;
  headcountGrowth: number;
  yearFounded: number;
  revenueEstimate: string;
  jobPostings: JobPosting[];
}

export interface JobPosting {
  title: string;
  location: string;
  count: number;
}

export interface Signal {
  id: string;
  companyId: string;
  companyName: string;
  companyLocation: string;
  type: "contract_win" | "hiring_surge" | "expansion" | "funding";
  headline: string;
  detail: string;
  value?: number;
  metric?: string;
  daysAgo: number;
  timestamp: string;
  sector: string;
}

export interface SignalList {
  id: string;
  name: string;
  description: string;
  companyCount: number;
  signalStrength: number;
  lastUpdated: string;
  sector: string;
  region: string;
  tags: string[];
  companyIds: string[];
}

export interface ChartDataPoint {
  month: string;
  defense: number;
  healthcare: number;
  construction: number;
  technology: number;
}

export interface HiringChartDataPoint {
  month: string;
  healthcare: number;
  manufacturing: number;
  technology: number;
  construction: number;
}

export interface MarketSector {
  id: string;
  name: string;
  activePostings: number;
  monthOverMonthGrowth: number;
  companiesHiring: number;
}

export interface TopHiringCompany {
  id: string;
  name: string;
  sector: string;
  location: string;
  openRoles: number;
  headcountGrowth: number;
  topRole: string;
}

export interface SectorDetail {
  roles: { title: string; count: number; growth: number }[];
  regions: { name: string; postings: number; growth: number }[];
  companies: { name: string; location: string; openRoles: number; headcountGrowth: number; topRole: string }[];
  trendData: { month: string; postings: number }[];
}

export interface PipelineEntry {
  id: string;
  status: "matched" | "intro_made" | "exploring" | "placed" | "opted_in";
  companyDescription: string;
  region: string;
  sector: string;
  signal: string;
  partnerType: string;
  outcome?: string;
  daysAgo: number;
  roles?: string;
  placementCount?: number;
}

export type TabId = "market" | "contracts" | "gc-demo" | "signals" | "lists" | "salary" | "trends" | "pipeline" | "priority";
