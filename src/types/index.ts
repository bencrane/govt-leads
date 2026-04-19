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

export type TabId = "signals" | "lists" | "trends" | "market-intel" | "watchlists";
