"use client";

import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/services/api/auth";

export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
  });
}
