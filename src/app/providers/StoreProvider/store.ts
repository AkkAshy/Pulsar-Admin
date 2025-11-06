import { configureStore } from "@reduxjs/toolkit";
import AppointmentsSliceReducer from "@/entities/appointmentStats/model/AppointmentsStatsSlice";
import AuthSliceReducer from "@/entities/auth/model/AuthSlice";
import PatientsStatsSliceReducer from "@/entities/patientsStats/model/PatientsStatsSlice";

export const store = configureStore({
  reducer: {
    appointmentsStats: AppointmentsSliceReducer,
    auth: AuthSliceReducer,
    patientsStats: PatientsStatsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
