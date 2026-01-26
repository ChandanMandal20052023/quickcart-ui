import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import CartItem from "@/components/cart/CartItem";
import ShopButton from "@/components/ui/ShopButton";
import { products } from "@/data/products";

interface CartItemData {
  id: string;
  productId: string;
  quantity: number;
}

const Cart = () => {
  // Static cart data for UI demo
  const [cartItems, setCartItems] = useState<CartItemData[]>([
    { id: "1", productId: "1", quantity: 2 },
    { id: "2", productId: "2", quantity: 1 },
    { id: "3", productId: "4", quantity: 3 },
  ]);

  const cartProducts = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...product, cartId: item.id, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const handleQuantityChange = (cartId: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemove = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartId));
  };

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
    0
  );
  const deliveryFee = subtotal >= 199 ? 0 : 25;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="container-main py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet. Start shopping now!
            </p>
            <Link to="/products">
              <ShopButton size="lg">Browse Products</ShopButton>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container-main py-6 md:py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/products"
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Your Cart
            </h1>
            <p className="text-muted-foreground">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartProducts.map(
              (item) =>
                item && (
                  <CartItem
                    key={item.cartId}
                    id={item.cartId}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    quantity={item.quantity}
                    unit={item.unit}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                )
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-card rounded-xl border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 pb-4 border-b border-border">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? "text-success" : ""}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ₹{199 - subtotal} more for free delivery
                  </p>
                )}
              </div>

              <div className="flex justify-between py-4 text-lg font-bold text-foreground">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <Link to="/checkout">
                <ShopButton variant="success" size="lg" fullWidth>
                  Proceed to Checkout
                </ShopButton>
              </Link>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By proceeding, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;