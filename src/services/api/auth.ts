import apiClient from "@/lib/apiClient";

export async function registerUser(payload: { name: string; email: string; password: string }) {
  const res = await apiClient.post("/auth/register", payload);
  return res.data;
}

export async function loginUser(payload: { email: string; password: string }) {
  const res = await apiClient.post("/auth/login", payload);
  return res.data;
}

export async function verifyUserOtp(payload: { email: string; code: string }) {
  const res = await apiClient.post("/auth/verify-otp", payload);
  return res.data;
}

export async function resendUserOtp(payload: { email: string }) {
  const res = await apiClient.post("/auth/resend-otp", payload);
  return res.data;
}
