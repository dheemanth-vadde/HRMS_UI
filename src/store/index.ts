// src/store/index.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
 
// ===== Global Reducers =====
import userInfoReducer from "./userInfoSlice";
import roleAccessReducer from "./roleAccessSlice";
import uiReducer from "./uiSlice";
import authReducer from "./authSlice";
 
// ===== Recruitment Reducers =====
import userReducer from "../store/userSlice";
import jobReducer from "../store/jobSlice";
import resumeReducer from "../store/resumestore"; // batch uploader slice
 
// 1️⃣ Combine all reducers
const rootReducer = combineReducers({
  // global state
  userInfo: userInfoReducer,
  roleAccess: roleAccessReducer,
  auth: authReducer,
  ui: uiReducer,
 
  // recruitment modules
  user: userReducer,
  job: jobReducer,
  resume: resumeReducer, // keep in-memory files, not persisted
});
 
// 2️⃣ Persist config (skip resume to avoid storing File objects)
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["resume"],
};
 
// 3️⃣ Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
 
// 4️⃣ Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false, // ignore File, Date, etc.
    }),
  devTools: process.env.NODE_ENV !== "production",
});
 
// 5️⃣ Persistor for redux-persist
export const persistor = persistStore(store);
 
// 6️⃣ Types (if using TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
 
export default store;