"use client";

import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/api/auth";
import { saveAuth } from "../useAuthState";

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      saveAuth(data.token, data.user);
    },
  });
}
