"use client";

import { useMutation } from "@tanstack/react-query";
import { verifyUserOtp } from "@/services/api/auth";
import { saveAuth } from "../useAuthState";

export function useVerifyOtp() {
  return useMutation({
    mutationFn: verifyUserOtp,
    onSuccess: (data) => {
      saveAuth(data.token, data.user);
    },
  });
}
