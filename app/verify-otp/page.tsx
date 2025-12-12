"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useVerifyOtp } from "@/hooks/auth/useVerifyOtp";
import { useResendOtp } from "@/hooks/auth/useResendOtp";

export default function VerifyOtpPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";

  const verifyOtp = useVerifyOtp();
  const resendOtp = useResendOtp();

  const [code, setCode] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    verifyOtp.mutate({ email, code }, { onSuccess: () => router.push("/") });
  }

  function handleResend() {
    resendOtp.mutate({ email });
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>OTP sent to {email}</p>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        maxLength={6}
        placeholder="Enter 6-digit code"
      />

      <button type="submit">{verifyOtp.isPending ? "Verifying..." : "Verify"}</button>

      <button type="button" onClick={handleResend} disabled={resendOtp.isPending}>
        {resendOtp.isPending ? "Sending..." : "Resend"}
      </button>
    </form>
  );
}
