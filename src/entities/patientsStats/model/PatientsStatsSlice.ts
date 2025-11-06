import { createSlice } from "@reduxjs/toolkit";
import type { PatientsStatsState } from "./types";
import getPatientsStatsThunk from "./thunks/getPatientsStatsThunk";

const initialState: PatientsStatsState = {
  data: {
    total_patients: 0,
    new_patients_today: 0,
    new_patients_this_week: 0,
    new_patients_this_month: 0,
  },
  loading: false,
  error: null,
};

const PatientsStatsSlice = createSlice({
  name: "patientsStats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPatientsStatsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPatientsStatsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPatientsStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default PatientsStatsSlice.reducer;
