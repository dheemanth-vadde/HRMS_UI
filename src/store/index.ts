import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from './userInfoSlice';
import roleAccessReducer from './roleAccessSlice';

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    roleAccess: roleAccessReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;