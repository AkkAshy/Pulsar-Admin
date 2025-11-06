export interface AppointmentStats {
  total_appointments: number;
  completed_appointments: number;
  pending_appointments: number;
  completion_rate: number;
}

export interface AppointmentsStatsState {
  data: AppointmentStats;
  loading: boolean;
  error: null | string;
}
