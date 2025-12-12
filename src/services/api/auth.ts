import apiClient from "@/src/lib/apiClient";

export async function registerBusiness(payload: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  referralCode?: string;
}) {
  const res = await apiClient.post("/business/signup", payload);
  return res.data;
}


export interface LoginPayload {
  email: string; 
  password: string;
}

export interface LoginResponse {
  user: {
    name: string;
    role: "Admin" | "Business" | "Staff" | "Participant";
    isOnboarded: boolean;
  };
  access_token: string;
  refresh_token: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await apiClient.post("/auth/login", payload);
  return res.data;
}


export async function onboardingBusiness(payload: {
  businessId: string; 
  phone: string;
  address: string;
  sectorId: string;
  categoryId: string;
  subCategoryId: string;
  website?: string;
  socialMedia?: Record<string, string>;
  referralCapacity?: string;
}) {
  const res = await apiClient.post("/business/onboarding", payload);
  return res.data;
}

// Step 3: Verify email OTP
export async function verifyEmailOtp(payload: { email: string; otp: string }) {
  const res = await apiClient.post("/auth/verify-email", payload);
  return res.data;
}

export async function resendEmailOtp(payload: { email: string }) {
  const res = await apiClient.post("/auth/resend-otp", payload);
  return res.data;
}
