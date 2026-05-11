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

export type SignalType =
  | "contract_win"
  | "hiring_surge"
  | "expansion"
  | "funding"
  | "new_authority"
  | "fleet_expansion"
  | "mcs150_update"
  | "hazmat_endorsement"
  | "recent_crash"
  | "inspection_clean"
  | "loan_origination"
  | "loan_paid_off"
  | "multi_unit_expansion";

export interface Signal {
  id: string;
  companyId: string;
  companyName: string;
  companyLocation: string;
  type: SignalType;
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

export interface TimeSeriesPoint {
  month: string;
  [seriesKey: string]: string | number;
}

export interface ChartSeries {
  key: string;
  label: string;
  color: string;
}

export interface MarketSector {
  id: string;
  name: string;
  activePostings: number;
  monthOverMonthGrowth: number;
  companiesHiring: number;
  iconKey?: string;
  colorKey?: string;
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

export interface PipelineTimelineEvent {
  date: string;
  iconKey: string;
  colorClass: string;
  title: string;
  detail: string;
}

export interface PipelinePartner {
  type: string;
  specialization: string;
  region: string;
  relationship: string;
}

export interface PipelinePlacementRow {
  role: string;
  count: number;
  status: "filled" | "in_progress" | "open";
}

export interface PipelineEntryDetail {
  timeline: PipelineTimelineEvent[];
  partner: PipelinePartner;
  placements: PipelinePlacementRow[];
  notes: string[];
}

export type TabId = "market" | "contracts" | "gc-demo" | "signals" | "lists" | "salary" | "trends" | "pipeline" | "priority";

export type MarketId = "government" | "fmcsa" | "sba" | "franchise";

export interface MarketStat {
  label: string;
  value: string;
  sub: string;
  icon: string;
  color: string;
}

export interface MarketVocab {
  // pill selector
  pillLabel: string;

  // entity terminology
  entityNoun: string;
  entityNounPlural: string;

  // size metric (maps to Company.headcount)
  sizeLabel: string;
  sizeUnit: string;
  growthLabel: string;

  // sector / class
  sectorLabel: string;

  // activity items (maps to Company.jobPostings)
  activityHeader: string;
  activityCountLabel: string;

  // market stats strip
  marketStats: MarketStat[];

  // contract velocity chart (was "Contract Velocity by Sector")
  contractChartTitle: string;
  contractChartSub: string;
  contractChartYPrefix: string;
  contractChartYSuffix: string;
  contractChartTooltipUnit: string;

  // hiring activity chart
  hiringChartTitle: string;
  hiringChartSub: string;
  hiringChartYSuffix: string;
  hiringChartTooltipUnit: string;

  // hot sectors section
  hotSectorsTitle: string;
  hotSectorsActiveLabel: string;
  hotSectorsCountSuffix: string;

  // top entities table
  topEntitiesTitle: string;
  topEntitiesHeaders: { entity: string; sector: string; topRole: string; openRoles: string; growth: string };

  // contracts/authorities tab
  contractsTabHeading: string;
  contractsTabCounterLabel: string;
  contractsTabStats: { total: string; totalSub: string; count: string; countSub: string; winners: string; winnersSub: string };
  contractsTabFilterTypes: SignalType[];
  contractsTabValueFormat: "currency" | "count";
  contractsTabValueUnit?: string;
  demoTabFilterTypes?: SignalType[];

  // demo tab
  demoTabFilterEyebrow: string;
  demoTabTitle: string;
  demoTabSubtitle: string;
  demoTabPills: string[];
  demoTabStats: { total: string; avg: string; entities: string; activity: string };
  demoTabSections: {
    id: string;
    label: string;
    subtext: string;
    sectorMatch?: string[];
    companyIds?: string[];
    icon: string;
    color: string;
  }[];

  // signals tab
  signalsTabHeading: string;
  signalsTabCounterLabel: string;

  // lists tab
  listsTabHeading: string;
  listsTabCounterLabel: string;
  listsItemEntityLabel: string;

  // pipeline tab
  pipelinePlacedLabel: string;
  pipelinePlacedSub: string;
  pipelineActiveLabel: string;
  pipelineActiveSub: string;
  pipelineConnectionsLabel: string;
  pipelineConnectionsSub: string;

  // sector detail view
  sectorDetailBackLabel: string;
  sectorDetailTrendHeader: string;
  sectorDetailTrendUnit: string;
  sectorDetailRolesHeader: string;
  sectorDetailRegionsHeader: string;
  sectorDetailCompaniesHeader: string;
  sectorOverviewMetricLabel: string;
  sectorOverviewTertiaryLabel: string;

  // dossier
  dossierStats: { headcount: string; growth: string; revenue: string; openRoles: string };
  dossierActivityHeader: string;
  dossierSignalsHeader: string;
  dossierDetailsHeader: string;
}

export interface TabConfig {
  id: TabId;
  label: string;
  mystery?: boolean;
}

export interface PersonaDemoSection {
  id: string;
  label: string;
  subtext: string;
  sectorMatch?: string[];
  companyIds?: string[];
  icon: string;
  color: string;
}

export interface PersonaDef {
  id: string;
  label: string;
  blurb: string;
  cohortPriorityIds: string[];
  demoSubtitleOverride?: string;
  demoTitleOverride?: string;
  demoPillsOverride?: string[];
  demoSectionsOverride?: PersonaDemoSection[];
}

export interface QueryConsoleExample {
  id: string;
  trigger: string;            // the example query text shown to the user
  matchKeywords: string[];    // substrings to match against free-form input
  label: string;              // heading for the result view
  subtext?: string;           // optional secondary copy under the heading
  companyIds: string[];       // entities to surface in the result
  totalCount: number;         // total cohort population (so "12 shown of 3,500 total" feels real)
}

// Audience composition — live filter builder for sales-call audience-spec lock-in

export interface ComposeFilterOption {
  id: string;
  label: string;
  hint?: string;
  selectivity: number;        // 0-1, fraction of basePopulation this option selects
  matchCompanyIds: string[];  // which sample-dataset entities this option matches
}

export interface ComposeFilterGroup {
  id: string;
  label: string;
  type: "multi" | "single";   // multi = OR within group (chip multi-select); single = exclusive chip selection
  helpText?: string;
  options: ComposeFilterOption[];
}

export interface ComposeConfig {
  basePopulation: number;
  basePopulationLabel: string;  // e.g., "active MC-authorized carriers"
  filters: ComposeFilterGroup[];
  exampleNames: string[];       // suggested audience names for the lock-in bar
}

export interface LockedSpec {
  id: string;                        // local-unique id (timestamp-based)
  marketId: MarketId;
  marketLabel: string;
  personaId: string;
  personaLabel: string;
  name: string;
  filterSnapshot: Record<string, string[]>;  // groupId → selected optionIds
  filterLabels: { groupLabel: string; optionLabels: string[] }[];
  estimatedCount: number;
  matchingCompanyIds: string[];      // top-N preview matches at lock-in time
  basePopulationLabel: string;
  createdAt: string;                 // ISO timestamp
}

export interface MarketDataset {
  id: MarketId;
  label: string;
  shortLabel: string;
  vocab: MarketVocab;

  companies: Company[];
  signals: Signal[];
  signalLists: SignalList[];

  contractChartData: TimeSeriesPoint[];
  contractChartSeries: ChartSeries[];

  hiringChartData: TimeSeriesPoint[];
  hiringChartSeries: ChartSeries[];

  marketSectors: MarketSector[];
  topHiringCompanies: TopHiringCompany[];
  sectorDetails: Record<string, SectorDetail>;
  pipelineEntries: PipelineEntry[];
  pipelineDetails: Record<string, PipelineEntryDetail>;

  tabs: TabConfig[];
  personas: PersonaDef[];
  queryConsoleExamples: QueryConsoleExample[];
  composeConfig: ComposeConfig;
}
