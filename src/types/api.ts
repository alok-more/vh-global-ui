// API Response Types
export interface ApiResponse<T> {
  timestamp: string;
  success: boolean;
  message: string;
  data: T;
  status: number;
  resourceKey: string;
}

// Product Types
export interface ProductMainCategoryResponse {
  productMainCategoryId: string;
  name: string;
  shortDescription: string;
  longDescription: string;
}

export interface ProductSubCategoryResponse {
  productSubCategoryId: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  productMainCategory: ProductMainCategoryResponse;
}

export interface ProductResponse {
  productId: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  minimumQuantity: number;
  productSubCategory: ProductSubCategoryResponse;
  primaryImageUrl: string;
  additionalImageUrls: string[];
}

// Request Types
export interface ProductMainCategoryRequest {
  name: string;
  shortDescription?: string;
  longDescription?: string;
}

export interface ProductSubCategoryRequest {
  name: string;
  shortDescription?: string;
  longDescription?: string;
  productMainCategoryId: string;
}

export interface ProductRequest {
  name: string;
  shortDescription?: string;
  longDescription?: string;
  price: number;
  minimumQuantity: number;
  productSubCategoryId: string;
}

// Pagination Types
export interface PaginatedDataRequest {
  hydrateMainCategory?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDi?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  last: boolean;
}