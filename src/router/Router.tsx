// src/router/Router.tsx
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "../config/routes";
import { lazyImportMap } from "../utils/lazyImportMap";
import AppLayout from "../layouts/AppLayout";
import { LoginPage } from "../components/LoginPage";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import { AuthGuard } from "../auth/AuthGuard";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPlaceholder />}>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />

          <Route
            path="/"
            element={
              <AuthGuard>
                <AppLayout />
              </AuthGuard>
            }
          >
            {routes.map((route) => {
              // Simple direct route handling
              if (!route.elementPath) return null;
              const Component = lazyImportMap[route.elementPath];
              if (!Component) {
                console.warn("Missing lazyImportMap entry for", route.elementPath);
                return null;
              }
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<Component />}
                />
              );
            })}
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<div style={{ padding: 24 }}>Page not found</div>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
