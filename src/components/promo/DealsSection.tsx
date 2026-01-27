import { Link } from "react-router-dom";
import { ArrowRight, Timer, Sparkles } from "lucide-react";
import DealCard from "./DealCard";
import { products } from "@/data/products";

// Get deals (products with discounts) and add countdown timers
const getDealsWithTimers = () => {
  const now = new Date();
  const dealProducts = products.filter((p) => p.discount && p.discount > 0).slice(0, 4);

  return dealProducts.map((product, index) => ({
    ...product,
    // Stagger end times: 2h, 4h, 6h, 8h from now
    targetDate: new Date(now.getTime() + (index + 1) * 2 * 60 * 60 * 1000),
    isHot: index === 0,
  }));
};

const DealsSection = () => {
  const deals = getDealsWithTimers();

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
      <div className="container-main">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Timer className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="section-title flex items-center gap-2">
                Flash Deals
                <Sparkles className="w-5 h-5 text-warning" />
              </h2>
              <p className="text-muted-foreground text-sm">
                Grab these deals before they're gone!
              </p>
            </div>
          </div>
          <Link
            to="/products"
            className="text-primary font-semibold hover:underline flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {deals.map((deal) => (
            <DealCard
              key={deal.id}
              id={deal.id}
              name={deal.name}
              price={deal.price}
              originalPrice={deal.originalPrice!}
              image={deal.image}
              unit={deal.unit}
              discount={deal.discount!}
              targetDate={deal.targetDate}
              isHot={deal.isHot}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
