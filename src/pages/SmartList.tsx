import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Sparkles, ShoppingCart, Calendar, Check, Plus, Clock, TrendingUp } from "lucide-react";
import ShopButton from "@/components/ui/ShopButton";
import { mockSmartShoppingList, mockCustomerProfile } from "@/data/mockInventoryData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SmartList = () => {
  const [items, setItems] = useState(mockSmartShoppingList.map(item => ({
    ...item,
    isInCart: false,
  })));

  const toggleCart = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, isInCart: !item.isInCart } : item
    ));
  };

  const addAllToCart = () => {
    setItems(prev => prev.map(item => ({ ...item, isInCart: true })));
    toast.success('All items added to cart!');
  };

  const itemsInCart = items.filter(i => i.isInCart).length;
  const totalValue = items.filter(i => i.isInCart).reduce((sum, i) => sum + i.price, 0);

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case 'daily': return <Clock className="w-3 h-3" />;
      case 'weekly': return <Calendar className="w-3 h-3" />;
      case 'monthly': return <TrendingUp className="w-3 h-3" />;
      default: return null;
    }
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Har din / Daily';
      case 'weekly': return 'Hafta / Weekly';
      case 'monthly': return 'Mahina / Monthly';
      default: return 'Kabhi kabhi / Occasional';
    }
  };

  return (
    <MainLayout>
      <div className="container-main py-6 md:py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Your Smart List
              </h1>
            </div>
            <p className="text-muted-foreground">
              AI याद रखता है आपकी पसंद • Items you usually buy
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Cart Value</p>
              <p className="text-xl font-bold text-foreground">₹{totalValue}</p>
            </div>
            <ShopButton 
              onClick={addAllToCart}
              disabled={itemsInCart === items.length}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add All ({items.length - itemsInCart})
            </ShopButton>
          </div>
        </div>

        {/* Greeting Card */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-5 mb-6">
          <p className="text-lg text-foreground">
            नमस्ते <span className="font-bold">{mockCustomerProfile.name}</span>! 👋
          </p>
          <p className="text-muted-foreground mt-1">
            Based on your shopping pattern, here's what you might need this week.
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "relative bg-card rounded-xl border overflow-hidden transition-all",
                item.isInCart 
                  ? "border-success ring-2 ring-success/20" 
                  : "border-border hover:border-primary/50"
              )}
            >
              {item.isInCart && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-success text-success-foreground flex items-center justify-center z-10">
                  <Check className="w-4 h-4" />
                </div>
              )}

              <div className="flex gap-4 p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-lg font-bold text-foreground">
                    ₹{item.price}
                    <span className="text-xs text-muted-foreground font-normal ml-1">
                      / {item.unit}
                    </span>
                  </p>
                  
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    {getFrequencyIcon(item.frequency)}
                    <span>{getFrequencyLabel(item.frequency)}</span>
                  </div>
                </div>
              </div>

              {/* Prediction Info */}
              <div className="px-4 py-2 bg-muted/50 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    Next: {item.nextPredicted ? new Date(item.nextPredicted).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Soon'}
                  </span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    item.confidence >= 90 ? "bg-success/20 text-success" :
                    item.confidence >= 75 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    {item.confidence}% sure
                  </span>
                </div>
                
                <button
                  onClick={() => toggleCart(item.id)}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    item.isInCart 
                      ? "bg-success/20 text-success" 
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {item.isInCart ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <ShoppingCart className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Suggestions */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">You might also like</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              Based on your taste
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockCustomerProfile.suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => toast.success(`${suggestion.name} added to cart`)}
              >
                <img
                  src={suggestion.image}
                  alt={suggestion.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{suggestion.name}</p>
                  <p className="text-xs text-primary">{suggestion.reason}</p>
                  <p className="text-sm font-bold text-foreground mt-1">₹{suggestion.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-6 p-5 rounded-xl bg-success/10 border border-success/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💬</span>
            <div>
              <p className="font-semibold text-foreground">Get reminders on WhatsApp</p>
              <p className="text-sm text-muted-foreground">
                हम आपको याद दिलाएंगे जब सामान खरीदने का समय हो
              </p>
            </div>
          </div>
          <ShopButton variant="success">
            Enable WhatsApp Alerts
          </ShopButton>
        </div>
      </div>
    </MainLayout>
  );
};

export default SmartList;
