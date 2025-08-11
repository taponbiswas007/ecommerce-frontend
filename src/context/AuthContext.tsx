"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import api from "@/lib/api";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    }
  }, []);

  async function fetchUser(authToken: string) {
    try {
      const res = await api.get("/user", {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setUser(res.data);
    } catch {
      setUser(null);
    }
  }

  async function login(email: string, password: string) {
    const res = await api.post("/login", { email, password });
    localStorage.setItem("token", res.data.access_token);
    setToken(res.data.access_token);
    setUser(res.data.user);
  }

  async function logout() {
    if (token) {
      await api.post("/logout", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
