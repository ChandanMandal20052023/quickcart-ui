import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "@/contexts/WishlistContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import Wishlist from "./pages/Wishlist";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import SmartList from "./pages/SmartList";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ExpiryDetection from "./pages/admin/ExpiryDetection";
import AutoReorder from "./pages/admin/AutoReorder";
import CustomerInsights from "./pages/admin/CustomerInsights";
import BarcodeGenerator from "./pages/admin/BarcodeGenerator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WishlistProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/smart-list" element={<SmartList />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/barcode" element={<BarcodeGenerator />} />
            <Route path="/admin/expiry" element={<ExpiryDetection />} />
            <Route path="/admin/reorder" element={<AutoReorder />} />
            <Route path="/admin/customers" element={<CustomerInsights />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </WishlistProvider>
  </QueryClientProvider>
);

export default App;