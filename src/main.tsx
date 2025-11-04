// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
// Recruitment CSS is loaded dynamically when navigating into the recruitment
// module. Previously `JobPosting.css` was imported globally here which caused
// bootstrap/recruitment styles to be present even outside the recruitment
// area. We'll load recruitment styles only when needed.
 
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);