// Types for AI-powered inventory management features

// Loose product types for barcode generation
export interface LooseProduct {
  id: string;
  name: string;
  nameHindi?: string;
  category: 'grains' | 'pulses' | 'spices' | 'vegetables' | 'dry-fruits' | 'flours';
  pricePerKg: number;
  image: string;
  unit: 'kg' | 'g' | '100g';
  minWeight: number; // in grams
  maxWeight: number; // in grams
  inStock: boolean;
  stockQuantity: number; // in kg
}

export interface GeneratedBarcode {
  id: string;
  barcodeNumber: string;
  productId: string;
  productName: string;
  category: string;
  shopId: string;
  weight: number; // in grams
  pricePerKg: number;
  totalPrice: number;
  batchReference: string;
  generatedAt: string;
  expiryDate?: string;
  isPrinted: boolean;
  isSold: boolean;
}

export interface BarcodeSession {
  id: string;
  date: string;
  totalBarcodes: number;
  totalValue: number;
  barcodes: GeneratedBarcode[];
}

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

// Fraud & Anomaly Detection types
export interface FraudAlert {
  id: string;
  type: 'unusual_discount' | 'inventory_shrinkage' | 'void_abuse' | 'refund_anomaly' | 'price_manipulation' | 'time_anomaly';
  severity: 'critical' | 'high' | 'medium' | 'low';
  riskScore: number; // 0-100
  title: string;
  description: string;
  affectedItems: string[];
  detectedAt: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
  assignedTo?: string;
  potentialLoss: number;
  resolution?: string;
}

export interface InventoryMismatch {
  id: string;
  productId: string;
  productName: string;
  category: string;
  systemQuantity: number;
  physicalQuantity: number;
  variance: number;
  variancePercentage: number;
  lastAuditDate: string;
  lastSaleDate: string;
  potentialCause: string;
  severity: 'high' | 'medium' | 'low';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: 'login' | 'logout' | 'price_override' | 'discount_applied' | 'void_transaction' | 'refund_processed' | 'inventory_adjustment' | 'end_of_day';
  userId: string;
  userName: string;
  details: string;
  ipAddress: string;
  riskFlag: boolean;
  relatedAlertId?: string;
}
