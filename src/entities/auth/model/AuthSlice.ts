import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./types";
import loginThunk from "./thunks/loginThunk";
import registerThunk from "./thunks/registerThunk";

const getInitialAuthState = (): AuthState => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const tokenType = localStorage.getItem("token_type");

  if (accessToken && refreshToken && tokenType) {
    // Here you might want to validate the token, but for now assume it's valid
    return {
      isAuthenticated: true,
      user: {
        full_name: localStorage.getItem("full_name") || "",
        role: localStorage.getItem("role") || "",
      },
      loading: false,
      error: null,
    };
  }

  return {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = getInitialAuthState();

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("token_type");
      localStorage.removeItem("full_name");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          full_name: action.payload.full_name,
          role: action.payload.role,
        };
        localStorage.setItem("access_token", action.payload.access_token);
        localStorage.setItem("refresh_token", action.payload.refresh_token);
        localStorage.setItem("token_type", action.payload.token_type);
        localStorage.setItem("full_name", action.payload.full_name);
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          full_name: action.payload.full_name,
          role: action.payload.role,
        };
        localStorage.setItem("access_token", action.payload.access_token);
        localStorage.setItem("refresh_token", action.payload.refresh_token);
        localStorage.setItem("token_type", action.payload.token_type);
        localStorage.setItem("full_name", action.payload.full_name);
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
