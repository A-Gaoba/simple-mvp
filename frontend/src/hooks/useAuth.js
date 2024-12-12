import { useState, useEffect, useCallback } from "react";
import { login as apiLogin, register as apiRegister } from "../api/auth";

export function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = useCallback(async (email, password) => {
    const response = await apiLogin(email, password);
    setToken(response.token);
  }, []);

  const register = useCallback(async (email, password) => {
    const response = await apiRegister(email, password);
    setToken(response.token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  return { token, isAuthenticated, login, register, logout };
}
