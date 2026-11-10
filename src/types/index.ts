/**
 * Core Domain Interfaces for Paikari Bazar Marketplace
 * Aligned with plan.md specifications and mock REST API schema
 */

export interface TickerRate {
  id: string;
  name: string;
  nameBn?: string;
  location: string;
  locationBn?: string;
  price: number;
  unit: string;
  currency: string;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  order: number;
  active: boolean;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  iconName: string;
  image?: string;
  parentId?: string | null;
  order: number;
  active: boolean;
  productCount: number;
}

export interface Seller {
  id: string;
  businessName: string;
  businessNameBn: string;
  ownerName: string;
  phone: string;
  whatsapp: string;
  email?: string;
  location: string;
  locationBn: string;
  district: string;
  fullAddress: string;
  logo: string;
  coverImage?: string;
  isNidVerified: boolean;
  isApproved: boolean;
  isTrusted: boolean;
  isFeatured: boolean;
  rating: number;
  reviewsCount: number;
  bio: string;
  bioBn: string;
  categories: string[];
  joinedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  documents?: {
    nidFront?: string;
    nidBack?: string;
    tradeLicense?: string;
  };
}

export interface Product {
  id: string;
  title: string;
  titleBn: string;
  sellerId: string;
  sellerName: string;
  sellerVerified: boolean;
  sellerTrusted?: boolean;
  sellerWhatsapp: string;
  categoryId: string;
  categorySlug: string;
  price: number;
  unit: string;
  currency: string;
  minimumOrderQuantity: string;
  availableQuantity: string;
  location: string;
  locationBn: string;
  images: string[];
  description: string;
  descriptionBn: string;
  status: 'pending' | 'active' | 'rejected' | 'sold';
  isFeatured: boolean;
  createdAt: string;
  tags?: string[];
  specifications?: Record<string, string>;
}

export interface BuyLead {
  id: string;
  title: string;
  titleBn: string;
  buyerName: string;
  buyerPhone: string;
  location: string;
  quantity: string;
  budget?: string;
  status: 'pending' | 'approved' | 'closed';
  createdAt: string;
}

export interface Inquiry {
  id: string;
  type: 'whatsapp_click' | 'callback' | 'message';
  productId?: string;
  productTitle?: string;
  sellerId: string;
  buyerName: string;
  buyerPhone: string;
  message?: string;
  status: 'pending' | 'handled';
  createdAt: string;
}

