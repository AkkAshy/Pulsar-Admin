import type { RootState } from "@/app/providers/StoreProvider/store";

export const getAppointmentsStats = (state: RootState) =>
  state.appointmentsStats;
