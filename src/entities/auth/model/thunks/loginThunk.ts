import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../api/authAPI";
import type { LoginRequest, AuthResponse } from "../types";

const loginThunk = createAsyncThunk<AuthResponse, LoginRequest>(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await login(data);
      return response;
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        (error as Error).message ||
        "Ошибка входа";
      return rejectWithValue(message);
    }
  }
);

export default loginThunk;
