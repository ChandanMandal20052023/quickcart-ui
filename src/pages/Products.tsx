import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Search, X } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard from "@/components/product/ProductCard";
import ShopButton from "@/components/ui/ShopButton";
import { products, categories } from "@/data/products";
import { useDebounce } from "@/hooks/useDebounce";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchParams.get("search") || "");
  
  const debouncedSearch = useDebounce(localSearch, 300);

  // Sync URL search param with local state
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== localSearch) {
      setLocalSearch(urlSearch);
    }
  }, [searchParams]);

  // Update URL when debounced search changes
  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (debouncedSearch !== currentSearch) {
      if (debouncedSearch) {
        setSearchParams({ search: debouncedSearch });
      } else {
        searchParams.delete("search");
        setSearchParams(searchParams);
      }
    }
  }, [debouncedSearch]);

  // Filter products based on category and search
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const searchTerm = debouncedSearch.toLowerCase();
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);
    
    return matchesCategory && matchesSearch;
  });

  const clearSearch = () => {
    setLocalSearch("");
    searchParams.delete("search");
    setSearchParams(searchParams);
  };

  return (
    <MainLayout>
      <div className="container-main py-6 md:py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {debouncedSearch ? `Search results for "${debouncedSearch}"` : "All Products"}
          </h1>
          <p className="text-muted-foreground">
            {debouncedSearch 
              ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`
              : "Browse our wide selection of fresh groceries and essentials"
            }
          </p>
        </div>

        {/* Search bar for Products page */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="input-field pl-12 pr-10"
            />
            {localSearch && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-colors ${
                      selectedCategory === "all"
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-colors ${
                        selectedCategory === category.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle & View Options */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg font-medium text-foreground"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
              <p className="text-muted-foreground text-sm">
                {filteredProducts.length} products found
              </p>
            </div>

            {/* Mobile Filters */}
            {isFilterOpen && (
              <div className="lg:hidden mb-6 p-4 bg-card rounded-xl border border-border animate-fade-in">
                <h3 className="font-semibold text-foreground mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setIsFilterOpen(false);
                    }}
                    className={`badge-category ${
                      selectedCategory === "all"
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setIsFilterOpen(false);
                      }}
                      className={`badge-category ${
                        selectedCategory === category.id
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
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

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-foreground text-lg font-medium mb-2">
                  No products found
                </p>
                <p className="text-muted-foreground mb-6">
                  {debouncedSearch 
                    ? `We couldn't find any products matching "${debouncedSearch}"`
                    : "No products found in this category"
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {debouncedSearch && (
                    <ShopButton variant="outline" onClick={clearSearch}>
                      Clear Search
                    </ShopButton>
                  )}
                  <ShopButton
                    variant="secondary"
                    onClick={() => {
                      setSelectedCategory("all");
                      clearSearch();
                    }}
                  >
                    View All Products
                  </ShopButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Products;
