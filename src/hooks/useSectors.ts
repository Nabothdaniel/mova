// src/hooks/useSectors.ts
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/src/lib/apiClient";

export interface Sector {
  id: string;
  name: string;
  imageUrl: string | null;
}

export function fetchSectors(): Promise<Sector[]> {
  return apiClient.get("sectors").then(res => res.data);
}

export function useSectors() {
  return useQuery<Sector[], Error>({
    queryKey: ["sectors"],
    queryFn: fetchSectors,
    staleTime: 1000 * 60 * 5, 
  });
}
