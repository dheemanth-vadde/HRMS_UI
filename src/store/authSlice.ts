import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

export type User = {
  id: string;
  name: string;
  email: string;
};

export type UserRole = 'employee' | 'manager' | 'hr' | 'superadmin' | null;

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  userRole: UserRole;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  userRole: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string; role: UserRole }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userRole = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.userRole = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserRole = (state: RootState) => state.auth.userRole;

export default authSlice.reducer;