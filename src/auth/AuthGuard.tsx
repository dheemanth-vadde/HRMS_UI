import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectIsAuthenticated } from "../store/authSlice";

type Props = { children: React.ReactElement };

/**
 * Auth guard that uses Redux auth state to protect routes
 * Redirects unauthenticated users to /login
 */
export const AuthGuard: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    // Redirect to login while preserving the attempted URL
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
