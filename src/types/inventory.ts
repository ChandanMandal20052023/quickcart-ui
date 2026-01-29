// Types for AI-powered inventory management features

export interface ExpiryProduct {
  id: string;
  productId: string;
  name: string;
  category: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  costPrice: number;
  sellingPrice: number;
  riskLevel: 'high' | 'medium' | 'safe';
  daysUntilExpiry: number;
  suggestedAction?: 'discount' | 'bundle' | 'flash_sale' | 'donate';
  suggestedDiscount?: number;
}

export interface ReorderPrediction {
  id: string;
  productId: string;
  name: string;
  category: string;
  currentStock: number;
  averageDailySales: number;
  daysUntilDepletion: number;
  reorderPoint: number;
  recommendedQuantity: number;
  status: 'reorder_now' | 'low_stock' | 'safe';
  confidence: number; // 0-100
  factors: string[];
  supplierId?: string;
  supplierName?: string;
  lastOrderDate?: string;
}

export interface DemandFactor {
  type: 'weekday' | 'festival' | 'season' | 'weather' | 'trend';
  name: string;
  impact: 'increase' | 'decrease';
  percentage: number;
}

export interface SmartShoppingItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  unit: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'occasional';
  lastPurchased?: string;
  nextPredicted?: string;
  confidence: number;
  isInCart: boolean;
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastVisit: string;
  preferredCategories: string[];
  smartList: SmartShoppingItem[];
  suggestions: ProductSuggestion[];
}

export interface ProductSuggestion {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  reason: string;
  confidence: number;
}

export interface InventoryAlert {
  id: string;
  type: 'expiry' | 'low_stock' | 'reorder' | 'anomaly';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  productId?: string;
  productName?: string;
  actionRequired: boolean;
  createdAt: string;
  isRead: boolean;
}

export interface DashboardStats {
  totalProducts: number;
  lowStockCount: number;
  expiringCount: number;
  reorderNeeded: number;
  potentialLoss: number;
  savingsFromAI: number;
}
