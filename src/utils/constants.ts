export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL,
  ENDPOINTS: {
    PRODUCTS: '/api/v1/products',
    MAIN_CATEGORIES: '/api/v1/products/main-category',
    SUB_CATEGORIES: '/api/v1/products/sub-category',
    UPLOAD_IMAGE: '/api/v1/products/upload-image',
    UPLOAD_ADDITIONAL: '/api/v1/products/upload', 
    GET_IMAGE: '/api/v1/products/get-image'
  }
};

export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 12,
  INITIAL_PAGE: 0
};

export const CURRENCY_CONFIG = {
  LOCALE: 'de-DE',
  CURRENCY: 'EUR'
};