import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ChefHat,
  Bike,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ShopButton from "@/components/ui/ShopButton";

interface OrderStep {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: React.ElementType;
  completed: boolean;
  active: boolean;
}

const OrderTracking = () => {
  // Mock order data - in real app this would come from backend
  const [order] = useState({
    id: "ORD-2024-78543",
    placedAt: "2:45 PM",
    estimatedDelivery: "3:15 PM",
    deliveryAddress: "123 Main Street, Apt 4B, Mumbai 400001",
    deliveryPartner: {
      name: "Rahul S.",
      phone: "+91 98765 43210",
      rating: 4.8,
    },
    items: [
      { name: "Fresh Organic Bananas", qty: 2, price: 90 },
      { name: "Amul Taza Toned Fresh Milk", qty: 1, price: 68 },
      { name: "Britannia Whole Wheat Bread", qty: 1, price: 45 },
    ],
    subtotal: 203,
    deliveryFee: 0,
    total: 203,
  });

  const [steps] = useState<OrderStep[]>([
    {
      id: 1,
      title: "Order Confirmed",
      description: "Your order has been received",
      time: "2:45 PM",
      icon: CheckCircle2,
      completed: true,
      active: false,
    },
    {
      id: 2,
      title: "Preparing Order",
      description: "Store is packing your items",
      time: "2:48 PM",
      icon: ChefHat,
      completed: true,
      active: false,
    },
    {
      id: 3,
      title: "Out for Delivery",
      description: "Your order is on its way",
      time: "2:55 PM",
      icon: Bike,
      completed: false,
      active: true,
    },
    {
      id: 4,
      title: "Delivered",
      description: "Enjoy your order!",
      time: "Est. 3:15 PM",
      icon: Package,
      completed: false,
      active: false,
    },
  ]);

  const currentStep = steps.find((s) => s.active) || steps[steps.length - 1];
  const progress = ((steps.filter((s) => s.completed).length) / steps.length) * 100;

  return (
    <MainLayout>
      <div className="min-h-[80vh] bg-muted/30 py-8">
        <div className="container-main max-w-3xl">
          {/* Header */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Track Order
                </h1>
                <p className="text-muted-foreground mt-1">
                  Order #{order.id}
                </p>
              </div>
              <ShopButton variant="outline" size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </ShopButton>
            </div>
          </div>

          {/* ETA Card */}
          <div className="bg-primary rounded-2xl p-6 mb-6 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">
                  Estimated Arrival
                </p>
                <p className="text-3xl md:text-4xl font-bold mt-1">
                  {order.estimatedDelivery}
                </p>
                <p className="text-primary-foreground/80 text-sm mt-2">
                  Arriving in ~20 minutes
                </p>
              </div>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <currentStep.icon className="w-10 h-10 md:w-12 md:h-12" />
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-foreground rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-card rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="font-semibold text-foreground mb-6">Order Status</h2>
            <div className="space-y-0">
              {steps.map((step, index) => (
                <div key={step.id} className="relative flex gap-4">
                  {/* Timeline line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute left-5 top-10 w-0.5 h-full -ml-px ${
                        step.completed ? "bg-success" : "bg-border"
                      }`}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed
                        ? "bg-success text-success-foreground"
                        : step.active
                        ? "bg-primary text-primary-foreground animate-pulse"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`font-medium ${
                          step.completed || step.active
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <span
                        className={`text-sm ${
                          step.completed || step.active
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {step.description}
                    </p>
                    {step.active && (
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        In Progress
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Partner */}
          <div className="bg-card rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="font-semibold text-foreground mb-4">
              Delivery Partner
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                  <Bike className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {order.deliveryPartner.name}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span className="text-warning">★</span>
                    <span>{order.deliveryPartner.rating} rating</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShopButton variant="outline" size="icon" className="rounded-full">
                  <Phone className="w-4 h-4" />
                </ShopButton>
                <ShopButton variant="outline" size="icon" className="rounded-full">
                  <MessageCircle className="w-4 h-4" />
                </ShopButton>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-card rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="font-semibold text-foreground mb-4">
              Delivery Address
            </h2>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Home</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {order.deliveryAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-foreground mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {item.name} × {item.qty}
                  </span>
                  <span className="text-foreground font-medium">
                    ₹{item.price}
                  </span>
                </div>
              ))}
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">₹{order.subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="text-success font-medium">FREE</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-foreground text-lg">
                    ₹{order.total}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Need help with your order?{" "}
              <button className="text-primary font-medium hover:underline">
                Contact Support
              </button>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderTracking;
