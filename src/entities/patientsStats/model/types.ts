export interface PatientsStats {
  total_patients: number;
  new_patients_today: number;
  new_patients_this_week: number;
  new_patients_this_month: number;
}

export interface PatientsStatsState {
  data: PatientsStats;
  loading: boolean;
  error: null | string;
}
