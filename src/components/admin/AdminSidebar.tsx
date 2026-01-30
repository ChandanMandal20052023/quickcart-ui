import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  TrendingUp, 
  ShoppingCart,
  Users,
  Bell,
  Settings,
  ChevronLeft,
  Store,
  QrCode
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const AdminSidebar = ({ isCollapsed = false, onToggle }: AdminSidebarProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/barcode', icon: QrCode, label: 'Barcode Generator' },
    { path: '/admin/expiry', icon: AlertTriangle, label: 'Expiry Detection' },
    { path: '/admin/reorder', icon: TrendingUp, label: 'Auto Reorder' },
    { path: '/admin/customers', icon: Users, label: 'Customer Insights' },
    { path: '/admin/alerts', icon: Bell, label: 'Alerts' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-full bg-card border-r border-border z-40 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!isCollapsed && (
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Store className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">ShopUP Admin</span>
          </Link>
        )}
        <button 
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronLeft className={cn(
            "w-5 h-5 transition-transform",
            isCollapsed && "rotate-180"
          )} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
              isActive(item.path, item.exact)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Back to Store */}
      <div className="absolute bottom-4 left-0 right-0 px-3">
        <Link
          to="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
            isCollapsed && "justify-center"
          )}
        >
          <ShoppingCart className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Back to Store</span>}
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
