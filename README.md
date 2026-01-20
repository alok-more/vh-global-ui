# VHN Global Trader E-Commerce Website

A modern, fully-featured e-commerce website for VHN Global Trader aquascaping products with complete API integration.

## Features

### Frontend
- **Modern React Application** with TypeScript and Tailwind CSS
- **Responsive Design** optimized for all devices
- **Product Catalog** with advanced filtering and search
- **Category Management** with main and sub-categories
- **Product Details** with image galleries and specifications
- **Shopping Cart** functionality (UI ready)
- **Professional Design** with aquascaping theme

### API Integration
- **Complete REST API** integration using React Query
- **Product Management** - CRUD operations for products
- **Category Management** - Main and sub-category handling
- **Image Upload** - Primary and additional product images
- **Pagination** - Efficient data loading with pagination
- **Error Handling** - Comprehensive error states and retry mechanisms

## API Endpoints Integrated

### Product Main Categories
- `GET /api/v1/products/main-category` - Get all main categories
- `POST /api/v1/products/main-category` - Create main category
- `GET /api/v1/products/main-category/{id}` - Get main category by ID
- `PUT /api/v1/products/main-category/{id}` - Update main category
- `DELETE /api/v1/products/main-category/{id}` - Delete main category

### Product Sub Categories
- `POST /api/v1/products/sub-category-all` - Get all sub-categories (paginated)
- `POST /api/v1/products/sub-category-by-main-category` - Get sub-categories by main category
- `POST /api/v1/products/sub-category` - Create sub-category
- `GET /api/v1/products/sub-category/{id}` - Get sub-category by ID
- `DELETE /api/v1/products/sub-category/{id}` - Delete sub-category

### Products
- `POST /api/v1/products/all` - Get all products (paginated)
- `POST /api/v1/products/by-sub-category` - Get products by sub-category
- `POST /api/v1/products` - Create new product
- `GET /api/v1/products/{productId}` - Get product by ID
- `DELETE /api/v1/products/{productId}` - Delete product

### Image Management
- `POST /api/v1/products/upload-image/{productId}` - Upload primary image
- `POST /api/v1/products/upload` - Upload additional image
- `POST /api/v1/products/upload-multiple` - Upload multiple images
- `GET /api/v1/products/get-image/{imageName}` - Serve product image
- `DELETE /api/v1/products/product-additional-info/{id}` - Delete additional image

## Getting Started

### Prerequisites
- Node.js 18+ 
- Backend API server running on `http://localhost:8080`

### Installation
```bash
npm install
npm run dev
```

### API Configuration
The application expects the backend API to be running on `http://localhost:8080`. 
Update the `API_BASE_URL` in `src/services/api.ts` if your API runs on a different port.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header with categories
│   ├── Footer.tsx      # Site footer
│   ├── ProductCard.tsx # Product display card
│   ├── ProductModal.tsx # Product quick view modal
│   ├── LoadingSpinner.tsx # Loading indicator
│   └── ErrorMessage.tsx # Error display component
├── pages/              # Page components
│   ├── Home.tsx        # Homepage with featured products
│   ├── Products.tsx    # Product catalog with filtering
│   ├── ProductDetail.tsx # Individual product page
│   ├── Company.tsx     # Company information
│   └── Contact.tsx     # Contact page
├── hooks/              # Custom React hooks
│   └── useProducts.ts  # Product-related API hooks
├── services/           # API service layer
│   └── api.ts          # API client and endpoints
├── types/              # TypeScript type definitions
│   └── api.ts          # API response/request types
├── context/            # React context providers
│   └── QueryProvider.tsx # React Query provider
└── utils/              # Utility functions
    └── constants.ts    # Application constants
```

## Key Technologies

- **React 18** with TypeScript
- **React Router** for navigation
- **React Query** for API state management
- **Axios** for HTTP requests
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for development and building

## API Integration Features

- **Type Safety** - Full TypeScript integration with API schemas
- **Caching** - Intelligent caching with React Query
- **Error Handling** - Comprehensive error states and retry logic
- **Loading States** - Smooth loading indicators throughout
- **Pagination** - Efficient data loading with pagination support
- **Image Handling** - Seamless integration with image upload/serving endpoints

## Development Notes

- The application handles both local images (via API) and external URLs
- All API calls include proper error handling and loading states
- The design follows VHN Global Trader's aquascaping theme with nature-inspired colors
- Responsive design ensures optimal viewing on all devices
- Component architecture follows React best practices with proper separation of concerns