import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

/**
 * ProtectedRoute — wraps routes that require authentication.
 * Redirects to /login if no valid token exists.
 */
function ProtectedRoute({ children }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
