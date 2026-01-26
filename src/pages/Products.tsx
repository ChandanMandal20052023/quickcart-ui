import { useState } from "react";
import { Filter, Grid3X3, List } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard from "@/components/product/ProductCard";
import ShopButton from "@/components/ui/ShopButton";
import { products, categories } from "@/data/products";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <MainLayout>
      <div className="container-main py-6 md:py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            All Products
          </h1>
          <p className="text-muted-foreground">
            Browse our wide selection of fresh groceries and essentials
          </p>
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
                <p className="text-muted-foreground text-lg mb-4">
                  No products found in this category
                </p>
                <ShopButton
                  variant="secondary"
                  onClick={() => setSelectedCategory("all")}
                >
                  View All Products
                </ShopButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Products;