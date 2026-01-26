import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Clock, Shield, Truck, Heart } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ShopButton from "@/components/ui/ShopButton";
import ProductCard from "@/components/product/ProductCard";
import { getProductById, products } from "@/data/products";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id || "");
  const relatedProducts = products.filter((p) => p.id !== id).slice(0, 4);

  if (!product) {
    return (
      <MainLayout>
        <div className="container-main py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Link to="/products">
            <ShopButton>Browse Products</ShopButton>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <MainLayout>
      <div className="container-main py-6 md:py-10">
        {/* Breadcrumb */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Discount badge */}
            {product.discount && product.discount > 0 && (
              <span className="inline-block px-3 py-1 rounded-lg bg-success text-success-foreground text-sm font-bold">
                {product.discount}% OFF
              </span>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {product.name}
            </h1>

            <p className="text-muted-foreground">{product.unit}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {/* Delivery info */}
            <div className="flex items-center gap-6 py-4 border-y border-border">
              <div className="flex items-center gap-2 text-success">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{product.deliveryTime} delivery</span>
              </div>
              {product.inStock ? (
                <span className="text-success font-medium">✓ In Stock</span>
              ) : (
                <span className="text-destructive font-medium">Out of Stock</span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium text-foreground">Quantity:</span>
              <div className="flex items-center gap-3 bg-secondary rounded-xl p-1">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2.5 rounded-lg hover:bg-primary/10 transition-colors disabled:opacity-50"
                >
                  <Minus className="w-5 h-5 text-primary" />
                </button>
                <span className="w-12 text-center font-bold text-foreground text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2.5 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <Plus className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <ShopButton
                variant="success"
                size="lg"
                className="flex-1"
                disabled={!product.inStock}
              >
                Add to Cart - ₹{product.price * quantity}
              </ShopButton>
              <button className="p-4 rounded-xl border-2 border-border hover:border-primary hover:text-primary transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">Quality Assured</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">Free Delivery ₹199+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section>
          <h2 className="section-title mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                unit={product.unit}
                deliveryTime={product.deliveryTime}
                discount={product.discount}
              />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ProductDetails;