import { useQuery } from "@tanstack/react-query";
import { 
  fetchCategories, 
  fetchSubcategories, 
  Category, 
  Subcategory,
  PaginatedResponse 
} from "@/src/services/api/categories";

// Fetch all categories
export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetchCategories();
      console.log("Fetched categories:", res); 
      return res;
    },
    staleTime: 1000 * 60 * 5,
  });
}

// Fetch subcategories - returns just the data array
export function useSubcategories(categoryId: string | undefined, page = 1, limit = 10) {
  return useQuery<Subcategory[], Error>({
    queryKey: ["subcategories", categoryId, page, limit],
    queryFn: async () => {
      if (!categoryId) return [];
      const res = await fetchSubcategories(categoryId, page, limit);
      console.log(`Fetched subcategories for ${categoryId}:`, res);
      // Extract the data array from the paginated response
      return res.data;
    },
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
  });
}