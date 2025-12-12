"use client";

import React, { createContext, useContext } from "react";
import { useAuthState } from "@/hooks/useAuthState";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthState();

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
