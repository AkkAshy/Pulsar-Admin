import { createAsyncThunk } from "@reduxjs/toolkit";
import { register } from "../../api/authAPI";
import type { RegisterRequest, AuthResponse } from "../types";

const registerThunk = createAsyncThunk<AuthResponse, RegisterRequest>(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await register(data);
      return response;
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        (error as Error).message ||
        "Ошибка регистрации";
      return rejectWithValue(message);
    }
  }
);

export default registerThunk;
