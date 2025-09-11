export interface DashboardData {
  total_construction_area?: string;
  total_approved_area?: string;
  total_contracts?: string;
  total_contracts_price?: string;
  total_checklists?: string;
  total_reports?: string;
  total_wrong_checklist_answers?: string;
  total_sent_actions?: string;
  total_sent_back_actions?: string;
  total_completed_actions?: string;
  total_not_sent_actions?: string;
}

export interface Option {
  name: string | boolean;
  placeholder: string;
}

export interface Filter {
  name: string;
  placeholder: string;
  defaultValue: string | boolean;
  options: Option[];
}
