import type { RootState } from "@/app/providers/StoreProvider/store";

export const getAuthState = (state: RootState) => state.auth;
export const getIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const getAuthUser = (state: RootState) => state.auth.user;
export const getAuthLoading = (state: RootState) => state.auth.loading;
export const getAuthError = (state: RootState) => state.auth.error;
