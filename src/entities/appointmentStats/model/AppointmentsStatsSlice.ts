import { createSlice } from "@reduxjs/toolkit";
import type { AppointmentsStatsState } from "./types";
import getStatsThunk from "./thunks/getStatsThunk";

const initialState: AppointmentsStatsState = {
  data: {
    total_appointments: 0,
    pending_appointments: 0,
    completed_appointments: 0,
    completion_rate: 0,
  },
  loading: false,
  error: null,
};

const AppointmentsSlice = createSlice({
  name: "appointmentsStats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default AppointmentsSlice.reducer;
