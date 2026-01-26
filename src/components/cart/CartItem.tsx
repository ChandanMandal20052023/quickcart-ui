import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  unit: string;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

const CartItem = ({
  id,
  name,
  price,
  image,
  quantity,
  unit,
  onQuantityChange,
  onRemove,
}: CartItemProps) => {
  const handleIncrease = () => {
    onQuantityChange?.(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange?.(id, quantity - 1);
    }
  };

  const handleRemove = () => {
    onRemove?.(id);
  };

  return (
    <div className="flex gap-4 p-4 bg-card rounded-xl border border-border">
      {/* Image */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-1">
          {name}
        </h3>
        <p className="text-muted-foreground text-xs mb-2">{unit}</p>
        <p className="font-bold text-foreground">₹{price * quantity}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={handleRemove}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 bg-secondary rounded-lg">
          <button
            onClick={handleDecrease}
            className="p-2 rounded-l-lg hover:bg-primary/10 transition-colors"
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4 text-primary" />
          </button>
          <span className="w-8 text-center font-semibold text-foreground">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="p-2 rounded-r-lg hover:bg-primary/10 transition-colors"
          >
            <Plus className="w-4 h-4 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;