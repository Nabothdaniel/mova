import { useQuery } from "@tanstack/react-query";
import { fetchPublicCampaigns } from "@/src/services/api/campaigns";

export function usePublicCampaigns() {
  return useQuery({
    queryKey: ["publicCampaigns"],
    queryFn: fetchPublicCampaigns,
  });
}
