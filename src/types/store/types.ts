// src/types/store.ts
import { Timestamp } from "firebase/firestore"; // Use client-side Timestamp for type def

export interface Category {
  id: string; // Document ID
  name: string;
  description?: string;
  parentCategoryId: string | null;
  ancestorIds: string[];
  path?: string;
  productCount?: number;
  createdAt?: Timestamp; // Keep Timestamp type for consistency if needed client-side
  updatedAt?: Timestamp;
  iconUrl?:string
}

export interface Product {
  productId: string; 
  name: string;
  description: string;
  price: number;
  sku?: string;
  imageUrl: string;
  stockQuantity: number;
  tags?: string[];           
  searchKeywords?: string[];
  isActive: boolean;
  isWishlisted?: boolean; 
  isInCart?: boolean;
  categoryIds: string[];
  allCategoryIds: string[];
  categoryNames?: string[]; 
  createdAt: Timestamp; 
  updatedAt: Timestamp; 
}

// Type for data sent from client to server API
export interface ProductPayload {
  productId: string; 
  name: string;
  description: string;
  price: number;
  tags?: string[];           
  searchKeywords?: string[];
  imageUrl: string;
  categoryIds: string[];
  sku?: string;
  stockQuantity?: number;
  isActive?: boolean;
}


export interface Suggestion {
  id: string;
  name: string; // Product name
  type: 'product';
  imageUrl?: string;
}