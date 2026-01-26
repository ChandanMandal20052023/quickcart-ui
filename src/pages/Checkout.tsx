import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, Wallet, Building2, Check } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ShopButton from "@/components/ui/ShopButton";
import ShopInput from "@/components/ui/ShopInput";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("cod");
  
  // Static order summary for UI
  const orderSummary = {
    items: 3,
    subtotal: 213,
    deliveryFee: 0,
    total: 213,
  };

  const paymentMethods = [
    { id: "cod", name: "Cash on Delivery", icon: Wallet, description: "Pay when you receive" },
    { id: "upi", name: "UPI Payment", icon: Building2, description: "Google Pay, PhonePe, Paytm" },
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard, RuPay" },
  ];

  return (
    <MainLayout>
      <div className="container-main py-6 md:py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/cart"
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  Delivery Address
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <ShopInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  required
                />
                <ShopInput
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter phone number"
                  required
                />
                <div className="sm:col-span-2">
                  <ShopInput
                    label="Street Address"
                    placeholder="House no., Building name, Street"
                    required
                  />
                </div>
                <ShopInput
                  label="Landmark"
                  placeholder="Nearby landmark (optional)"
                />
                <ShopInput
                  label="Pincode"
                  type="text"
                  placeholder="Enter pincode"
                  required
                />
                <ShopInput
                  label="City"
                  placeholder="Enter city"
                  required
                />
                <ShopInput
                  label="State"
                  placeholder="Enter state"
                  required
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      selectedPayment === method.id
                        ? "border-primary bg-secondary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedPayment === method.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <method.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-foreground">{method.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {method.description}
                      </p>
                    </div>
                    {selectedPayment === method.id && (
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-card rounded-xl border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 pb-4 border-b border-border">
                <div className="flex justify-between text-foreground">
                  <span>Items ({orderSummary.items})</span>
                  <span>₹{orderSummary.subtotal}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Delivery Fee</span>
                  <span className="text-success">FREE</span>
                </div>
              </div>

              <div className="flex justify-between py-4 text-lg font-bold text-foreground">
                <span>Total</span>
                <span>₹{orderSummary.total}</span>
              </div>

              <ShopButton variant="success" size="lg" fullWidth>
                Place Order
              </ShopButton>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By placing this order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;