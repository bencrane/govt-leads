export type SortDirection = "asc" | "desc";

export interface FilterState {
  searchTerm: string;
  state: string;
  naicsPrefix: string;
  dateFrom: string;
  dateTo: string;
  minAwardAmount: number | "";
  businessSize: string;
  firstTimeOnly: boolean;
}

export type SortField = 
  | "company_name" 
  | "city" 
  | "state" 
  | "poc_name" 
  | "award_amount" 
  | "awarding_agency" 
  | "naics_description" 
  | "action_date"
  | "is_first_time_awardee";

export interface SortState {
  field: SortField;
  direction: SortDirection;
}
