import { useState } from "react";
import { AlertTriangle, Filter, Download, Tag, Percent, Package, Clock } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import ShopButton from "@/components/ui/ShopButton";
import { mockExpiryProducts } from "@/data/mockInventoryData";
import { ExpiryProduct } from "@/types/inventory";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ExpiryDetection = () => {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'safe'>('all');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const filteredProducts = filter === 'all' 
    ? mockExpiryProducts 
    : mockExpiryProducts.filter(p => p.riskLevel === filter);

  const highRiskCount = mockExpiryProducts.filter(p => p.riskLevel === 'high').length;
  const mediumRiskCount = mockExpiryProducts.filter(p => p.riskLevel === 'medium').length;
  const potentialLoss = mockExpiryProducts
    .filter(p => p.riskLevel === 'high' || p.riskLevel === 'medium')
    .reduce((sum, p) => sum + (p.costPrice * p.quantity), 0);

  const toggleSelect = (id: string) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action: string) => {
    toast.success(`${action} applied to ${selectedProducts.length} products`);
    setSelectedProducts([]);
  };

  const getActionLabel = (action?: string) => {
    switch (action) {
      case 'flash_sale': return '⚡ Flash Sale';
      case 'discount': return '🏷️ Discount';
      case 'bundle': return '📦 Bundle';
      case 'donate': return '🤝 Donate';
      default: return 'No action';
    }
  };

  const getRiskBadge = (risk: ExpiryProduct['riskLevel']) => {
    const styles = {
      high: 'bg-destructive/20 text-destructive border-destructive/30',
      medium: 'bg-warning/20 text-warning border-warning/30',
      safe: 'bg-success/20 text-success border-success/30',
    };
    const labels = { high: 'High Risk', medium: 'Medium', safe: 'Safe' };
    
    return (
      <span className={cn("px-2 py-1 rounded-full text-xs font-medium border", styles[risk])}>
        {labels[risk]}
      </span>
    );
  };

  return (
    <AdminLayout 
      title="Expiry Detection" 
      subtitle="Monitor expiring products and prevent losses"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="High Risk Items"
          value={highRiskCount}
          icon={AlertTriangle}
          variant="danger"
          subtitle="Expiring within 7 days"
        />
        <StatCard
          title="Medium Risk Items"
          value={mediumRiskCount}
          icon={Clock}
          variant="warning"
          subtitle="Expiring within 14 days"
        />
        <StatCard
          title="Potential Loss"
          value={`₹${potentialLoss.toLocaleString()}`}
          icon={Package}
          variant="danger"
          subtitle="If no action taken"
        />
        <StatCard
          title="Safe Items"
          value={mockExpiryProducts.filter(p => p.riskLevel === 'safe').length}
          icon={Tag}
          variant="success"
          subtitle="No immediate risk"
        />
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {(['all', 'high', 'medium', 'safe'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                filter === f 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {selectedProducts.length > 0 && (
            <>
              <span className="text-sm text-muted-foreground">
                {selectedProducts.length} selected
              </span>
              <ShopButton 
                size="sm" 
                variant="outline"
                onClick={() => handleBulkAction('Flash Sale')}
              >
                ⚡ Flash Sale
              </ShopButton>
              <ShopButton 
                size="sm" 
                variant="outline"
                onClick={() => handleBulkAction('Discount')}
              >
                <Percent className="w-4 h-4 mr-1" /> Discount
              </ShopButton>
            </>
          )}
          <ShopButton variant="ghost" size="sm">
            <Download className="w-4 h-4 mr-1" /> Export
          </ShopButton>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input 
                    type="checkbox"
                    className="rounded border-border"
                    checked={selectedProducts.length === filteredProducts.length}
                    onChange={() => {
                      if (selectedProducts.length === filteredProducts.length) {
                        setSelectedProducts([]);
                      } else {
                        setSelectedProducts(filteredProducts.map(p => p.id));
                      }
                    }}
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Product</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Batch</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Expiry</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Qty</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">At Risk</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Risk Level</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">AI Suggestion</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <input 
                      type="checkbox"
                      className="rounded border-border"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {product.batchNumber}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-foreground">
                      {new Date(product.expiryDate).toLocaleDateString('en-IN')}
                    </p>
                    <p className={cn(
                      "text-xs font-medium",
                      product.daysUntilExpiry <= 3 ? "text-destructive" : 
                      product.daysUntilExpiry <= 7 ? "text-warning" : "text-muted-foreground"
                    )}>
                      {product.daysUntilExpiry} days left
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {product.quantity}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-destructive">
                    ₹{(product.costPrice * product.quantity).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {getRiskBadge(product.riskLevel)}
                  </td>
                  <td className="px-4 py-3">
                    {product.suggestedAction && (
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{getActionLabel(product.suggestedAction)}</span>
                        {product.suggestedDiscount && (
                          <span className="text-xs text-muted-foreground">
                            ({product.suggestedDiscount}% off)
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <ShopButton 
                      size="sm"
                      onClick={() => toast.success(`Action applied to ${product.name}`)}
                    >
                      Apply
                    </ShopButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No products match this filter</p>
          </div>
        )}
      </div>

      {/* AI Insights */}
      <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
        <h3 className="font-semibold text-foreground mb-2">💡 AI Insights</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• <strong>Milk products</strong> sell 40% faster with 20% discount when bundled with bread</li>
          <li>• <strong>Flash sales</strong> between 5-7 PM have 3x higher conversion rate</li>
          <li>• Suggest <strong>WhatsApp alert</strong> to nearby customers for expiring dairy items</li>
        </ul>
      </div>
    </AdminLayout>
  );
};

export default ExpiryDetection;
