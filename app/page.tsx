"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/auth/useLogin";

export default function LoginPage() {
  const router = useRouter();
  const login = useLogin();
  const [form, setForm] = useState({ email: "", password: "" });

  function handleSubmit(e: any) {
    e.preventDefault();
    login.mutate(form, {
      onSuccess: () => router.push("/"),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <button type="submit">{login.isPending ? "Signing in..." : "Login"}</button>
    </form>
  );
}
