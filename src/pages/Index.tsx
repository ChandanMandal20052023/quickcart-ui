import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Clock, Truck } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ShopButton from "@/components/ui/ShopButton";
import ProductCard from "@/components/product/ProductCard";
import CategoryCard from "@/components/product/CategoryCard";
import { categories, getFeaturedProducts } from "@/data/products";

const Index = () => {
  const featuredProducts = getFeaturedProducts();

  const features = [
    {
      icon: Clock,
      title: "10-Minute Delivery",
      description: "Get your essentials delivered in minutes, not hours",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Fresh products from verified local stores you trust",
    },
    {
      icon: Truck,
      title: "Free Delivery",
      description: "No delivery charges on orders above ₹199",
    },
    {
      icon: Zap,
      title: "Best Prices",
      description: "Same prices as your neighborhood stores",
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary via-background to-secondary/50 py-12 md:py-20">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Zap className="w-4 h-4" />
                <span>Groceries in 10 minutes</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Your Local Store,
                <span className="text-primary block">Now Online</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Shop from your trusted neighborhood stores and get everything delivered to your doorstep in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/products">
                  <ShopButton size="lg" className="gap-2">
                    Start Shopping
                    <ArrowRight className="w-5 h-5" />
                  </ShopButton>
                </Link>
                <ShopButton variant="outline" size="lg">
                  Learn More
                </ShopButton>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square max-w-lg mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                <img
                  src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=600&fit=crop"
                  alt="Fresh groceries"
                  className="w-full h-full object-cover rounded-2xl shadow-elevated"
                />
              </div>
              {/* Floating badges */}
              <div className="absolute top-4 right-4 md:top-8 md:right-0 bg-card px-4 py-3 rounded-xl shadow-elevated animate-fade-in">
                <p className="text-sm font-semibold text-success">✓ 5000+ Products</p>
              </div>
              <div className="absolute bottom-8 left-0 md:bottom-12 md:-left-4 bg-card px-4 py-3 rounded-xl shadow-elevated animate-fade-in">
                <p className="text-sm font-semibold text-primary">⚡ 10 min delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">Shop by Category</h2>
            <Link
              to="/products"
              className="text-primary font-semibold hover:underline flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                image={category.image}
                itemCount={category.itemCount}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">Featured Products</h2>
            <Link
              to="/products"
              className="text-primary font-semibold hover:underline flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
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
        </div>
      </section>

      {/* Why shopUP Section */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Why Choose shopUP?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We bring together the convenience of online shopping with the trust of your local neighborhood stores.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-elevated transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary">
        <div className="container-main text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Shop Smarter?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Download the shopUP app and get ₹100 off on your first order. Experience the fastest grocery delivery in your city.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ShopButton variant="secondary" size="lg" className="gap-2">
              Download App
              <ArrowRight className="w-5 h-5" />
            </ShopButton>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;