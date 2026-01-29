import { useState } from "react";
import { Users, Search, TrendingUp, ShoppingBag, Calendar, Sparkles } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import { mockCustomerProfile, mockSmartShoppingList } from "@/data/mockInventoryData";
import { cn } from "@/lib/utils";

const CustomerInsights = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock multiple customers for the list view
  const mockCustomers = [
    mockCustomerProfile,
    {
      ...mockCustomerProfile,
      id: 'cust-002',
      name: 'Priya Patel',
      phone: '+91 87654 32109',
      totalOrders: 32,
      totalSpent: 8750,
      lastVisit: '2026-01-27',
    },
    {
      ...mockCustomerProfile,
      id: 'cust-003',
      name: 'Amit Kumar',
      phone: '+91 76543 21098',
      totalOrders: 58,
      totalSpent: 15200,
      lastVisit: '2026-01-28',
    },
  ];

  const [selectedCustomer, setSelectedCustomer] = useState(mockCustomerProfile);

  const getFrequencyBadge = (frequency: string) => {
    const styles = {
      daily: 'bg-success/20 text-success',
      weekly: 'bg-primary/20 text-primary',
      monthly: 'bg-warning/20 text-warning',
      occasional: 'bg-muted text-muted-foreground',
    };
    return (
      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", styles[frequency as keyof typeof styles])}>
        {frequency}
      </span>
    );
  };

  return (
    <AdminLayout
      title="Customer Insights"
      subtitle="AI-powered customer behavior analysis and smart shopping lists"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Active Customers"
          value={156}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Repeat Rate"
          value="68%"
          icon={TrendingUp}
          variant="success"
          subtitle="Last 30 days"
        />
        <StatCard
          title="Avg. Order Value"
          value="₹245"
          icon={ShoppingBag}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Smart Lists Generated"
          value={89}
          icon={Sparkles}
          variant="success"
          subtitle="This week"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-1 bg-card rounded-xl border border-border p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border-0 text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div className="space-y-2">
            {mockCustomers.map((customer) => (
              <button
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={cn(
                  "w-full p-3 rounded-lg text-left transition-colors",
                  selectedCustomer.id === customer.id
                    ? "bg-primary/10 border border-primary/30"
                    : "hover:bg-muted border border-transparent"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-medium">
                      {customer.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">
                      {customer.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {customer.totalOrders} orders • ₹{customer.totalSpent.toLocaleString()}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Customer Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Header */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-2xl font-bold">
                    {selectedCustomer.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selectedCustomer.name}</h2>
                  <p className="text-muted-foreground">{selectedCustomer.phone}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Last visit</p>
                <p className="font-medium text-foreground">
                  {new Date(selectedCustomer.lastVisit).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground">Total Orders</p>
                <p className="text-lg font-bold text-foreground">{selectedCustomer.totalOrders}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground">Total Spent</p>
                <p className="text-lg font-bold text-foreground">₹{selectedCustomer.totalSpent.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground">Avg. Order</p>
                <p className="text-lg font-bold text-foreground">
                  ₹{Math.round(selectedCustomer.totalSpent / selectedCustomer.totalOrders)}
                </p>
              </div>
            </div>
          </div>

          {/* Smart Shopping List */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">AI Smart Shopping List</h3>
              </div>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                Auto-generated
              </span>
            </div>

            <div className="space-y-3">
              {mockSmartShoppingList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground text-sm truncate">{item.name}</p>
                      {getFrequencyBadge(item.frequency)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ₹{item.price} • {item.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>Next: {item.nextPredicted ? new Date(item.nextPredicted).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Soon'}</span>
                    </div>
                    <p className="text-xs text-success font-medium mt-1">
                      {item.confidence}% likely
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">You Might Also Like</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {selectedCustomer.suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border"
                >
                  <img
                    src={suggestion.image}
                    alt={suggestion.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{suggestion.name}</p>
                    <p className="text-xs text-primary">{suggestion.reason}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">₹{suggestion.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CustomerInsights;
