"use client";

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  registerBusiness,
  onboardingBusiness,
  verifyEmailOtp,
  resendEmailOtp,
} from "@/src/services/api/auth";

// ---------------------------
// Types
// ---------------------------
type RegisterBusinessPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  referralCode?: string;
};

type OnboardingBusinessPayload = {
  businessId: string;
  phone: string;
  address: string;
  sectorId: string;
  categoryId: string;
  subCategoryId: string;
  website?: string;
  socialMedia?: Record<string, string>;
  referralCapacity?: string;
};

type VerifyOtpPayload = {
  email: string;
  otp: string;
};

type ResendOtpPayload = {
  email: string;
};

// ---------------------------
// Hooks
// ---------------------------

// 1️⃣ Business Signup
export function useRegisterBusiness(): UseMutationResult<any, any, RegisterBusinessPayload> {
  return useMutation({
    mutationFn: registerBusiness,
  });
}

// 2️⃣ Business Onboarding
export function useOnboardingBusiness(): UseMutationResult<any, any, OnboardingBusinessPayload> {
  return useMutation({
    mutationFn: onboardingBusiness,
  });
}

// 3️⃣ Verify Email OTP
export function useVerifyEmailOtp(): UseMutationResult<any, any, VerifyOtpPayload> {
  return useMutation({
    mutationFn: verifyEmailOtp,
  });
}

// 4️⃣ Resend Email OTP
export function useResendEmailOtp(): UseMutationResult<any, any, ResendOtpPayload> {
  return useMutation({
    mutationFn: resendEmailOtp,
  });
}
