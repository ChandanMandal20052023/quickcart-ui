import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, MapPin, Loader2, Heart } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { products, Product } from "@/data/products";
import { useWishlist } from "@/contexts/WishlistContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const debouncedQuery = useDebounce(searchQuery, 300);
  const cartItemCount = 3; // Static for UI demo
  const { wishlistCount } = useWishlist();

  // Search results
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      setIsSearching(true);
      // Simulate async search (in real app this would be an API call)
      const timer = setTimeout(() => {
        const query = debouncedQuery.toLowerCase();
        const results = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
        setSearchResults(results.slice(0, 6)); // Limit to 6 results
        setIsSearching(false);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [debouncedQuery]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close search on route change
  useEffect(() => {
    setIsSearchFocused(false);
    setSearchQuery("");
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
    }
  };

  const handleProductClick = (productId: string) => {
    setIsSearchFocused(false);
    setSearchQuery("");
    navigate(`/products/${productId}`);
  };

  const handleViewAllResults = () => {
    navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    setIsSearchFocused(false);
  };

  const SearchDropdown = () => {
    if (!isSearchFocused || searchQuery.trim().length < 2) return null;

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-elevated overflow-hidden z-50">
        {isSearching ? (
          <div className="flex items-center justify-center gap-2 p-6 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Searching...</span>
          </div>
        ) : searchResults.length > 0 ? (
          <>
            <div className="p-2">
              {searchResults.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">
                      {product.name}
                    </p>
                    <p className="text-muted-foreground text-xs">{product.unit}</p>
                  </div>
                  <span className="font-semibold text-foreground">₹{product.price}</span>
                </button>
              ))}
            </div>
            <div className="border-t border-border p-3">
              <button
                onClick={handleViewAllResults}
                className="w-full text-center text-primary font-medium text-sm hover:underline"
              >
                View all results for "{searchQuery}"
              </button>
            </div>
          </>
        ) : (
          <div className="p-6 text-center text-muted-foreground">
            <p>No products found for "{searchQuery}"</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container-main">
        {/* Top bar - Location */}
        <div className="hidden md:flex items-center gap-2 py-2 text-sm text-muted-foreground border-b border-border">
          <MapPin className="w-4 h-4 text-primary" />
          <span>Deliver to:</span>
          <button className="font-medium text-foreground hover:text-primary transition-colors">
            Select your location
          </button>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between gap-4 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              shop<span className="text-primary">UP</span>
            </span>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="input-field pl-12 pr-4"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <SearchDropdown />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-lg hover:bg-muted transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-success text-success-foreground font-semibold hover:opacity-90 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Login */}
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <User className="w-5 h-5" />
              <span>Login</span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="input-field pl-12 pr-10"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
          {/* Mobile search dropdown */}
          {isSearchFocused && searchQuery.trim().length >= 2 && (
            <div className="mt-2 bg-card border border-border rounded-xl shadow-elevated overflow-hidden">
              {isSearching ? (
                <div className="flex items-center justify-center gap-2 p-4 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Searching...</span>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="p-2">
                  {searchResults.slice(0, 4).map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">
                          {product.name}
                        </p>
                      </div>
                      <span className="font-semibold text-foreground text-sm">₹{product.price}</span>
                    </button>
                  ))}
                  <button
                    onClick={handleViewAllResults}
                    className="w-full text-center text-primary font-medium text-sm py-2 hover:underline"
                  >
                    View all results
                  </button>
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container-main py-4">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive("/") ? "bg-secondary text-primary" : "hover:bg-muted"
                }`}
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive("/products") ? "bg-secondary text-primary" : "hover:bg-muted"
                }`}
              >
                Products
              </Link>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive("/login") ? "bg-secondary text-primary" : "hover:bg-muted"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive("/register") ? "bg-secondary text-primary" : "hover:bg-muted"
                }`}
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
