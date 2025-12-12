"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useVerifyEmailOtp, useResendEmailOtp } from "@/src/hooks/useBusinessAuth";

export default function VerifyOtpPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";

  const [otp, setOtp] = useState("");
  const verifyMutation = useVerifyEmailOtp();
  const resendMutation = useResendEmailOtp();

  const handleVerify = () => {
    if (!otp) return toast.error("Please enter your 6-digit OTP");

    verifyMutation.mutate(
      { email, otp },
      {
        onSuccess: () => {
          toast.success("Email verified! You can now log in.");
          router.push("/"); 
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Invalid OTP. Try again.");
        },
      }
    );
  };

  const handleResend = () => {
    resendMutation.mutate(
      { email },
      {
        onSuccess: () => toast.success("OTP resent successfully!"),
        onError: (err: any) =>
          toast.error(err?.response?.data?.message || "Failed to resend OTP"),
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Side - Hero Section */}
        <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-8 lg:p-12 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48"></div>

          <div className="relative z-10">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Verify Email
            </h1>
            <p className="text-lg text-white/90 mb-12">
              Enter the 6-digit OTP sent to your email to complete your signup.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center bg-gray-100 text-black">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">Email Verification</h2>
            <p className="mb-4 text-gray-700">
              Enter the OTP sent to <span className="font-semibold">{email}</span>
            </p>

            <input
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
            />

            <div className="flex gap-2">
              <button
                onClick={handleVerify}
                disabled={verifyMutation.isPending}
                className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30"
              >
                {verifyMutation.isPending ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                onClick={handleResend}
                disabled={resendMutation.isPending}
                className="flex-1 bg-gray-300 text-black py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                {resendMutation.isPending ? "Sending..." : "Resend OTP"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
