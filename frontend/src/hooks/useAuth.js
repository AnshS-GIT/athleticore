import { useState } from 'react';
import authService from '../services/authService';

/**
 * Custom hook for authentication state and actions.
 */
export function useAuth() {
  const [user, setUser] = useState(authService.getUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.login({ email, password });
      authService.saveAuth( result.data);
      setUser(result.data.user);
      return result;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ name, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.signup({ name, email, password });
      authService.saveAuth(result.data);
      setUser(result.data.user);
      return result;
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return { user, loading, error, login, signup, logout, isAuthenticated: !!user };
}
