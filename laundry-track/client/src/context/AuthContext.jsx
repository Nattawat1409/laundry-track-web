import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const API = 'http://localhost:3000';

axios.defaults.withCredentials = true;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/me`);
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async (email, password) => {
    const res = await axios.post(`${API}/login`, { email, password });
    setUser(res.data.user);
    return res.data.user;
  };

  const register = async (fullName, email, password) => {
    const res = await axios.post(`${API}/register`, { fullName, email, password });
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = async () => {
    try {
      await axios.post(`${API}/logout`);
    } catch {
      // ignore — destroy local state regardless
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
