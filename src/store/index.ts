import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from './userInfoSlice';
import roleAccessReducer from './roleAccessSlice';
import uiReducer from "./uiSlice";
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    roleAccess: roleAccessReducer,
    auth: authReducer,
    ui: uiReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;