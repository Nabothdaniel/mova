import apiClient from "@/src/lib/apiClient";

export async function registerParticipant(payload: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  campaignId: string;
}) {
  const res = await apiClient.post("/participant/signup", payload);
  return res.data;
}
