import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';


interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  userRole: string | null;
  refreshToken: string | null;
  rolePermissions: Record<string, any>; // <-- add this;
  roleId: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
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
        username: string;
        token: string;
        refreshToken: string;
        role: string;
        rolePermissions: Record<string, any>;
        roleId:string
      }>
    ) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
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
    //  state.token = null;
     // state.refreshToken = null;
      state.userRole = null;
    },
     // ✅ Add this
    setPermissions: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.rolePermissions = action.payload;
    },
  },
});

export const { loginSuccess, logout, updateTokens,setPermissions } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
// export const selectUser = (state: RootState) => state.auth.user;
// export const selectUserRole = (state: RootState) => state.auth.userRole;
// export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectRolePermissions = (state: RootState) => state.auth.rolePermissions;
export default authSlice.reducer;