import apiClient from "@/src/lib/apiClient";

export interface Category {
  id: string;
  name: string;
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  nextPage: number | null;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await apiClient.get("/categories");
  return res.data; 
}

export async function fetchSubcategories(
  categoryId: string, 
  page = 1, 
  limit = 10
): Promise<PaginatedResponse<Subcategory>> {
  const res = await apiClient.get(`/categories/${categoryId}/subcategories`, {
    params: { page, limit },
  });
  return res.data;
}