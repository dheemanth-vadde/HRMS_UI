// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./App";
import "./index.css";
// Load recruitment/job-posting specific styles globally so they're available
// on first navigation. This ensures the JobPosting page styles are applied
// even when the component is code-split or lazy-loaded.
import "./components/recruitment/css/JobPosting.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);