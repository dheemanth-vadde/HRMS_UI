import { configureStore } from '@reduxjs/toolkit';
import uiReducer from "./uiSlice";
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;