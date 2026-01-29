import { AlertTriangle, TrendingDown, Package, Shield } from "lucide-react";
import { InventoryAlert } from "@/types/inventory";
import { cn } from "@/lib/utils";
import ShopButton from "@/components/ui/ShopButton";

interface AlertCardProps {
  alert: InventoryAlert;
  onAction?: () => void;
  onDismiss?: () => void;
}

const AlertCard = ({ alert, onAction, onDismiss }: AlertCardProps) => {
  const getIcon = () => {
    switch (alert.type) {
      case 'expiry': return AlertTriangle;
      case 'low_stock': return TrendingDown;
      case 'reorder': return Package;
      case 'anomaly': return Shield;
      default: return AlertTriangle;
    }
  };

  const severityStyles = {
    critical: {
      bg: 'bg-destructive/10',
      border: 'border-destructive/30',
      icon: 'text-destructive',
    },
    warning: {
      bg: 'bg-warning/10',
      border: 'border-warning/30',
      icon: 'text-warning',
    },
    info: {
      bg: 'bg-primary/10',
      border: 'border-primary/30',
      icon: 'text-primary',
    },
  };

  const Icon = getIcon();
  const styles = severityStyles[alert.severity];

  return (
    <div className={cn(
      "p-4 rounded-xl border",
      styles.bg,
      styles.border,
      !alert.isRead && "ring-2 ring-offset-2 ring-offset-background ring-primary/20"
    )}>
      <div className="flex items-start gap-3">
        <div className={cn("mt-0.5", styles.icon)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-foreground text-sm">{alert.title}</h4>
            {!alert.isRead && (
              <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                New
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
          
          {alert.actionRequired && (
            <div className="flex items-center gap-2 mt-3">
              <ShopButton size="sm" onClick={onAction}>
                Take Action
              </ShopButton>
              <button 
                onClick={onDismiss}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {new Date(alert.createdAt).toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};

export default AlertCard;
