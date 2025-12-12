"use client";

import { useState, useEffect } from "react";

export function saveAuth(token: string, user: any) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function useAuthState() {
  const [user, setUser] = useState<any>(() => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    const fn = () => {
      const raw = localStorage.getItem("user");
      setUser(raw ? JSON.parse(raw) : null);
    };
    window.addEventListener("storage", fn);
    return () => window.removeEventListener("storage", fn);
  }, []);

  return { user };
}
