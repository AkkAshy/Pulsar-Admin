import { createAsyncThunk } from "@reduxjs/toolkit";
import { type PatientsStats } from "../types";
import { GetPatientsStats } from "../../api/patientsStatsAPI";

const getPatientsStatsThunk = createAsyncThunk<PatientsStats>(
  "patientsStats/getStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetPatientsStats();
      return response;
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || "Failed to fetch patients stats"
      );
    }
  }
);

export default getPatientsStatsThunk;
