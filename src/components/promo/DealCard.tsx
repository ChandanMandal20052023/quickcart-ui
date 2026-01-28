import { Link } from "react-router-dom";
import { Clock, Plus, Flame, Heart } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import ShopButton from "@/components/ui/ShopButton";
import { useWishlist } from "@/contexts/WishlistContext";

interface DealCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  unit: string;
  discount: number;
  targetDate: Date;
  isHot?: boolean;
}

const DealCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  unit,
  discount,
  targetDate,
  isHot = false,
}: DealCardProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // UI only - no actual cart logic
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(id);
  };

  return (
    <Link to={`/products/${id}`} className="block">
      <div className="card-product group relative overflow-hidden border-2 border-primary/10 hover:border-primary/30">
        {/* Hot deal badge */}
        {isHot && (
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-bold animate-pulse">
            <Flame className="w-3 h-3" />
            <span>HOT</span>
          </div>
        )}

        {/* Discount badge */}
        <div className="absolute top-2 left-2 z-10 px-2 py-1 rounded-md bg-success text-success-foreground text-xs font-bold">
          {discount}% OFF
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-12 right-2 z-10 p-2 rounded-full transition-all ${
            isWishlisted
              ? "bg-destructive text-destructive-foreground"
              : "bg-background/80 text-muted-foreground hover:text-destructive"
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Image container */}
        <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Countdown timer */}
        <div className="mb-3 p-2 bg-muted rounded-lg">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <Clock className="w-3 h-3" />
            <span>Deal ends in</span>
          </div>
          <CountdownTimer targetDate={targetDate} className="scale-75 origin-left" />
        </div>

        {/* Product info */}
        <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-1 min-h-[2.5rem]">
          {name}
        </h3>
        <p className="text-muted-foreground text-xs mb-3">{unit}</p>

        {/* Price and CTA */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-bold text-foreground text-lg">₹{price}</span>
            <span className="text-muted-foreground text-sm line-through">
              ₹{originalPrice}
            </span>
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

export default DealCard;
