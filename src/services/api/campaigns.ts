import apiClient from "@/src/lib/apiClient";

export interface PublicCampaign {
  id: string;
  name: string;
  bannerUrl?: string;
  uniqueCode: string;
}

export async function fetchPublicCampaigns(): Promise<PublicCampaign[]> {
  const res = await apiClient.get("/campaigns/all/public");
  return res.data.data;
}
