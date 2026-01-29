import { useState } from "react";
import { TrendingUp, TrendingDown, Package, Truck, Filter, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import ShopButton from "@/components/ui/ShopButton";
import { mockReorderPredictions } from "@/data/mockInventoryData";
import { ReorderPrediction } from "@/types/inventory";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const AutoReorder = () => {
  const [filter, setFilter] = useState<'all' | 'reorder_now' | 'low_stock' | 'safe'>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredPredictions = filter === 'all'
    ? mockReorderPredictions
    : mockReorderPredictions.filter(p => p.status === filter);

  const reorderNowCount = mockReorderPredictions.filter(p => p.status === 'reorder_now').length;
  const lowStockCount = mockReorderPredictions.filter(p => p.status === 'low_stock').length;
  const avgConfidence = Math.round(
    mockReorderPredictions.reduce((sum, p) => sum + p.confidence, 0) / mockReorderPredictions.length
  );

  const toggleSelect = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handlePlaceOrder = () => {
    const count = selectedItems.length || filteredPredictions.filter(p => p.status === 'reorder_now').length;
    toast.success(`Order placed for ${count} products`, {
      description: 'Suppliers will be notified automatically'
    });
    setSelectedItems([]);
  };

  const getStatusBadge = (status: ReorderPrediction['status']) => {
    const styles = {
      reorder_now: 'bg-destructive/20 text-destructive border-destructive/30',
      low_stock: 'bg-warning/20 text-warning border-warning/30',
      safe: 'bg-success/20 text-success border-success/30',
    };
    const labels = { reorder_now: 'Reorder Now', low_stock: 'Low Stock', safe: 'Safe' };
    const icons = { 
      reorder_now: <AlertCircle className="w-3 h-3" />, 
      low_stock: <Clock className="w-3 h-3" />,
      safe: <CheckCircle2 className="w-3 h-3" />
    };

    return (
      <span className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border",
        styles[status]
      )}>
        {icons[status]}
        {labels[status]}
      </span>
    );
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 75) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <AdminLayout
      title="Auto Reorder & Prediction"
      subtitle="AI-powered stock forecasting and reorder recommendations"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Reorder Now"
          value={reorderNowCount}
          icon={AlertCircle}
          variant="danger"
          subtitle="Urgent action needed"
        />
        <StatCard
          title="Low Stock"
          value={lowStockCount}
          icon={TrendingDown}
          variant="warning"
          subtitle="Monitor closely"
        />
        <StatCard
          title="AI Confidence"
          value={`${avgConfidence}%`}
          icon={TrendingUp}
          variant="success"
          subtitle="Prediction accuracy"
        />
        <StatCard
          title="Total Products"
          value={mockReorderPredictions.length}
          icon={Package}
          subtitle="Being monitored"
        />
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {(['all', 'reorder_now', 'low_stock', 'safe'] as const).map((f) => (
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
              {f === 'reorder_now' ? 'Reorder Now' : f === 'low_stock' ? 'Low Stock' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {(selectedItems.length > 0 || reorderNowCount > 0) && (
            <ShopButton onClick={handlePlaceOrder}>
              <Truck className="w-4 h-4 mr-2" />
              Place Order ({selectedItems.length || reorderNowCount})
            </ShopButton>
          )}
        </div>
      </div>

      {/* Predictions Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    checked={selectedItems.length === filteredPredictions.length && filteredPredictions.length > 0}
                    onChange={() => {
                      if (selectedItems.length === filteredPredictions.length) {
                        setSelectedItems([]);
                      } else {
                        setSelectedItems(filteredPredictions.map(p => p.id));
                      }
                    }}
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Product</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Current Stock</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Daily Sales</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Days Left</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Recommended Qty</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Confidence</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Supplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPredictions.map((prediction) => (
                <tr key={prediction.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-border"
                      checked={selectedItems.includes(prediction.id)}
                      onChange={() => toggleSelect(prediction.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground text-sm">{prediction.name}</p>
                    <p className="text-xs text-muted-foreground">{prediction.category}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "text-sm font-medium",
                      prediction.currentStock <= prediction.reorderPoint ? "text-destructive" : "text-foreground"
                    )}>
                      {prediction.currentStock}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      (min: {prediction.reorderPoint})
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    ~{prediction.averageDailySales}/day
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "text-sm font-medium",
                      prediction.daysUntilDepletion <= 2 ? "text-destructive" :
                      prediction.daysUntilDepletion <= 5 ? "text-warning" : "text-foreground"
                    )}>
                      {prediction.daysUntilDepletion.toFixed(1)} days
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(prediction.status)}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-primary">
                    {prediction.recommendedQuantity} units
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            prediction.confidence >= 90 ? "bg-success" :
                            prediction.confidence >= 75 ? "bg-warning" : "bg-muted-foreground"
                          )}
                          style={{ width: `${prediction.confidence}%` }}
                        />
                      </div>
                      <span className={cn("text-sm font-medium", getConfidenceColor(prediction.confidence))}>
                        {prediction.confidence}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-foreground">{prediction.supplierName}</p>
                    {prediction.lastOrderDate && (
                      <p className="text-xs text-muted-foreground">
                        Last: {new Date(prediction.lastOrderDate).toLocaleDateString('en-IN')}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPredictions.length === 0 && (
          <div className="py-12 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No products match this filter</p>
          </div>
        )}
      </div>

      {/* Demand Factors */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-4">📈 Demand Factors Detected</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-2">
                <span className="text-lg">📅</span>
                <div>
                  <p className="text-sm font-medium text-foreground">Weekend Approaching</p>
                  <p className="text-xs text-muted-foreground">Higher footfall expected</p>
                </div>
              </div>
              <span className="text-sm font-medium text-success">+25% demand</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌡️</span>
                <div>
                  <p className="text-sm font-medium text-foreground">Temperature Rising</p>
                  <p className="text-xs text-muted-foreground">Cold drinks demand increase</p>
                </div>
              </div>
              <span className="text-sm font-medium text-warning">+40% beverages</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎉</span>
                <div>
                  <p className="text-sm font-medium text-foreground">Local Festival Next Week</p>
                  <p className="text-xs text-muted-foreground">Sweets & snacks demand spike</p>
                </div>
              </div>
              <span className="text-sm font-medium text-primary">+60% expected</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <h3 className="font-semibold text-foreground mb-4">💡 AI Recommendations</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Order <strong>bananas and milk today</strong> to avoid stockout this weekend</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Increase <strong>cold drinks order by 40%</strong> for the next 2 weeks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Consider stocking <strong>festival-specific items</strong> (sweets, namkeen) by next Monday</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Tomato prices expected to <strong>rise 15%</strong> - consider bulk order now</span>
            </li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AutoReorder;
