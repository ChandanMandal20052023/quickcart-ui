import { Package, AlertTriangle, TrendingDown, IndianRupee, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import AlertCard from "@/components/admin/AlertCard";
import { mockDashboardStats, mockAlerts, mockExpiryProducts, mockReorderPredictions } from "@/data/mockInventoryData";
import ShopButton from "@/components/ui/ShopButton";

const AdminDashboard = () => {
  const criticalAlerts = mockAlerts.filter(a => a.severity === 'critical');
  const expiringHigh = mockExpiryProducts.filter(p => p.riskLevel === 'high');
  const reorderNow = mockReorderPredictions.filter(p => p.status === 'reorder_now');

  return (
    <AdminLayout 
      title="Dashboard" 
      subtitle="AI-powered inventory overview"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Products"
          value={mockDashboardStats.totalProducts}
          icon={Package}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Low Stock Items"
          value={mockDashboardStats.lowStockCount}
          icon={TrendingDown}
          variant="warning"
          subtitle="Need attention"
        />
        <StatCard
          title="Expiring Soon"
          value={mockDashboardStats.expiringCount}
          icon={AlertTriangle}
          variant="danger"
          subtitle="Within 7 days"
        />
        <StatCard
          title="AI Savings This Month"
          value={`₹${mockDashboardStats.savingsFromAI.toLocaleString()}`}
          icon={Sparkles}
          variant="success"
          subtitle="From smart decisions"
        />
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              🚨 Critical Alerts
            </h2>
            <Link to="/admin/alerts" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {criticalAlerts.slice(0, 3).map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Expiry Risk Panel */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
              <h3 className="font-semibold text-foreground">Expiry Risk</h3>
            </div>
            <Link to="/admin/expiry">
              <ShopButton variant="ghost" size="sm">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </ShopButton>
            </Link>
          </div>
          
          {expiringHigh.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">
              ✅ No critical expiry risks
            </p>
          ) : (
            <div className="space-y-3">
              {expiringHigh.slice(0, 3).map((product) => (
                <div 
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.quantity} units • Expires in {product.daysUntilExpiry} days
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-destructive/20 text-destructive">
                      -{product.suggestedDiscount}% suggested
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reorder Panel */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-warning" />
              </div>
              <h3 className="font-semibold text-foreground">Reorder Now</h3>
            </div>
            <Link to="/admin/reorder">
              <ShopButton variant="ghost" size="sm">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </ShopButton>
            </Link>
          </div>
          
          {reorderNow.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">
              ✅ All stock levels healthy
            </p>
          ) : (
            <div className="space-y-3">
              {reorderNow.map((product) => (
                <div 
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/20"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.currentStock} left • ~{product.daysUntilDepletion.toFixed(1)} days remaining
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      Order {product.recommendedQuantity}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.confidence}% confident
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Potential Loss Prevention */}
      <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Potential Loss Prevention</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              AI detected ₹{mockDashboardStats.potentialLoss.toLocaleString()} at risk from expiring products
            </p>
          </div>
          <Link to="/admin/expiry">
            <ShopButton>
              Take Action <ArrowRight className="w-4 h-4 ml-2" />
            </ShopButton>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
