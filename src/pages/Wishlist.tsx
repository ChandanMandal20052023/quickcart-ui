import { Link } from "react-router-dom";
import { Heart, ArrowLeft, Trash2, ShoppingCart } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ShopButton from "@/components/ui/ShopButton";
import ProductCard from "@/components/product/ProductCard";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/data/products";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <MainLayout>
      <div className="container-main py-6 md:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/products"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                My Wishlist
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {wishlistProducts.length} item{wishlistProducts.length !== 1 ? "s" : ""} saved
              </p>
            </div>
          </div>
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  unit={product.unit}
                  deliveryTime={product.deliveryTime}
                  discount={product.discount}
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 z-10 p-2 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start adding products you love by clicking the heart icon on any product.
            </p>
            <Link to="/products">
              <ShopButton>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Browse Products
              </ShopButton>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Wishlist;
