import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ShopInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const ShopInput = forwardRef<HTMLInputElement, ShopInputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "input-field",
              icon && "pl-12",
              error && "border-destructive focus:ring-destructive",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

ShopInput.displayName = "ShopInput";

export default ShopInput;