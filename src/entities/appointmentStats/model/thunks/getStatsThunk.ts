import { createAsyncThunk } from "@reduxjs/toolkit";
import { type AppointmentStats } from "../types";
import { GetAppointmentStats } from "../../api/appointmentsStatsAPI";

const getStatsThunk = createAsyncThunk<AppointmentStats>(
  "appointmentsStats/getStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetAppointmentStats();
      return response;
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || "Ошибка При загрузке статистики приемов"
      );
    }
  }
);

export default getStatsThunk;
