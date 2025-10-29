import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string; // encrypted
};

export type UserRole = 'employee' | 'manager' | 'hr' | 'superadmin' | null;

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  userRole: UserRole;
  refreshToken: string | null;
  rolePermissions: Record<string, any>; // <-- add this;
  roleId: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  userRole: null,
  refreshToken: null,
  rolePermissions: {},
  roleId:null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
        refreshToken: string;
        role: UserRole;
        rolePermissions: Record<string, any>;
        roleId:string
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.userRole = action.payload.role;
      state.rolePermissions = action.payload.rolePermissions;
      state.roleId=action.payload.roleId;
    },
    updateTokens: (
      state,
      action: PayloadAction<{
        token: string;
        refreshToken: string;
      }>
    ) => {
      if (state.isAuthenticated) {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
     // state.token = null;
     // state.refreshToken = null;
      state.userRole = null;
    },
  },
});

export const { loginSuccess, logout, updateTokens } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserRole = (state: RootState) => state.auth.userRole;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectRolePermissions = (state: RootState) => state.auth.rolePermissions;
export default authSlice.reducer;