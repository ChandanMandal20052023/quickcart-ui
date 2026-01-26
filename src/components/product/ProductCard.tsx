import { Link } from "react-router-dom";
import { Plus, Clock } from "lucide-react";
import ShopButton from "@/components/ui/ShopButton";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  unit: string;
  deliveryTime?: string;
  discount?: number;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  unit,
  deliveryTime = "10 mins",
  discount,
}: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // UI only - no actual cart logic
  };

  return (
    <Link to={`/products/${id}`} className="block">
      <div className="card-product group">
        {/* Image container */}
        <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount && discount > 0 && (
            <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-success text-success-foreground text-xs font-bold">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Delivery time */}
        <div className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
          <Clock className="w-3.5 h-3.5" />
          <span>{deliveryTime}</span>
        </div>

        {/* Product info */}
        <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-1 min-h-[2.5rem]">
          {name}
        </h3>
        <p className="text-muted-foreground text-xs mb-3">{unit}</p>

        {/* Price and CTA */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-foreground">₹{price}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-muted-foreground text-sm line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>
          <ShopButton
            variant="success"
            size="sm"
            onClick={handleAddToCart}
            className="px-3 py-1.5"
          >
            <Plus className="w-4 h-4" />
            <span className="ml-1">Add</span>
          </ShopButton>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;