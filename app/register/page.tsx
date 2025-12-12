"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/auth/useRegister";

export default function RegisterPage() {
  const router = useRouter();
  const register = useRegister();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  function handleSubmit(e: any) {
    e.preventDefault();
    register.mutate(form, {
      onSuccess: () => {
        router.push(`/verify-otp?email=${form.email}`);
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" name="name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" name="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" name="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <button type="submit" disabled={register.isPending}>
        {register.isPending ? "Loading..." : "Register"}
      </button>
    </form>
  );
}
