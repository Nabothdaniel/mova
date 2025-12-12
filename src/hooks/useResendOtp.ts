"use client";

import { useMutation } from "@tanstack/react-query";
import { resendUserOtp } from "@/services/api/auth";

export function useResendOtp() {
  return useMutation({
    mutationFn: resendUserOtp,
  });
}
