// src/router/Router.tsx
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazyImportMap } from "../utils/lazyImportMap";
import AppLayout from "../layouts/AppLayout";
import { LoginPage } from "../components/LoginPage";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import { AuthGuard } from "../auth/AuthGuard";
import { usePermittedRoutes } from "../config/permittedRoutes"

const Router: React.FC = () => {
  const routes = usePermittedRoutes();
  console.log("routes",routes)
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
              // Handle routes with children
              if (route.children) {
  const ParentComponent = lazyImportMap[route.elementPath];
  return (
    <React.Fragment key={route.path}>
      {/* keep parent as nested container */}
      <Route path={route.path} element={<ParentComponent />}>
        <Route index element={<ParentComponent />} />
        {route.children
          .filter(child => !child.path.startsWith("/"))
          .map(child => {
            const ChildComponent = lazyImportMap[child.elementPath];
            return <Route key={child.path} path={child.path} element={<ChildComponent />} />;
          })}
      </Route>

      {/* also register absolute child paths at the top level so '/organization/teams' works if child.path is absolute */}
      {route.children
        .filter(child => child.path.startsWith("/"))
        .map(child => {
          const ChildComponent = lazyImportMap[child.elementPath];
          return <Route key={child.path} path={child.path} element={<ChildComponent />} />;
        })}
    </React.Fragment>
  );
}

              // Handle regular routes
              if (!route.elementPath) return null;
              const Component = lazyImportMap[route.elementPath];
              if (!Component) {
                console.warn("Missing lazyImportMap entry for", route.elementPath);
                return null;
              }

              // Handle regular routes
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
