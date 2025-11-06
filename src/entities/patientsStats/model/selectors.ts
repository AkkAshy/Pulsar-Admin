import type { RootState } from "@/app/providers/StoreProvider/store";

export const getPatientsStats = (state: RootState) => state.patientsStats;
