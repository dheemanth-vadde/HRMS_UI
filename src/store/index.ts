// src/store/index.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// ===== Global Reducers =====
import userInfoReducer from "./userInfoSlice";
import roleAccessReducer from "./roleAccessSlice";
import uiReducer from "./uiSlice";
import authReducer from "./authSlice";

// ===== Recruitment Reducers =====
import userReducer from "../store/userSlice";
import jobReducer from "../store/jobSlice";
import resumeReducer from "../store/resumestore"; // ⚠️ skip persisting File objects

// 1️⃣ Combine all reducers
const rootReducer = combineReducers({
  // global
  userInfo: userInfoReducer,
  roleAccess: roleAccessReducer,
  auth: authReducer,
  ui: uiReducer,

  // recruitment
  user: userReducer,
  job: jobReducer,
  resume: resumeReducer, // in-memory, not persisted
});

// 2️⃣ Persist configuration
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["resume"], // don't persist file objects
};

// 3️⃣ Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore Redux Persist actions to prevent warnings
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// 5️⃣ Create persistor
export const persistor = persistStore(store);

// 6️⃣ (Optional) TypeScript types
 export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export default store;
