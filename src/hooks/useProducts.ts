import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi, productMainCategoryApi, productSubCategoryApi } from '../services/api';
import { PaginatedDataRequest } from '../types/api';

// Product Main Categories
export const useMainCategories = () => {
  return useQuery({
    queryKey: ['mainCategories'],
    queryFn: () => productMainCategoryApi.getAll(),
  });
};

export const useMainCategory = (id: string) => {
  return useQuery({
    queryKey: ['mainCategory', id],
    queryFn: () => productMainCategoryApi.getById(id),
    enabled: !!id,
  });
};

// Product Sub Categories
export const useSubCategories = (params: PaginatedDataRequest = {}) => {
  return useQuery({
    queryKey: ['subCategories', params],
    queryFn: () => productSubCategoryApi.getAll(params),
  });
};

export const useSubCategoriesByMainCategory = (mainCategoryId: string, params: PaginatedDataRequest = {}) => {
  return useQuery({
    queryKey: ['subCategories', 'mainCategory', mainCategoryId, params],
    queryFn: () => productSubCategoryApi.getByMainCategory(mainCategoryId, params),
    enabled: !!mainCategoryId,
  });
};

export const useSubCategory = (id: string) => {
  return useQuery({
    queryKey: ['subCategory', id],
    queryFn: () => productSubCategoryApi.getById(id),
    enabled: !!id,
  });
};

// Products
export const useProducts = (params: PaginatedDataRequest = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productApi.getAll(params),
  });
};

export const useProductsBySubCategory = (subCategoryId: string, params: PaginatedDataRequest = {}) => {
  return useQuery({
    queryKey: ['products', 'subCategory', subCategoryId, params],
    queryFn: () => productApi.getBySubCategory(subCategoryId, params),
    enabled: !!subCategoryId,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(id),
    enabled: !!id,
  });
};

// Mutations
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUploadProductImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, file }: { productId: string; file: File }) =>
      productApi.uploadImage(productId, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['product', variables.productId] });
    },
  });
};