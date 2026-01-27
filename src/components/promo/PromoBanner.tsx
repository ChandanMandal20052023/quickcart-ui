import { Link } from "react-router-dom";
import { ArrowRight, Percent, Zap } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import ShopButton from "@/components/ui/ShopButton";

interface PromoBannerProps {
  title: string;
  subtitle: string;
  discount: string;
  bgGradient: string;
  targetDate: Date;
  ctaText?: string;
  ctaLink?: string;
}

const PromoBanner = ({
  title,
  subtitle,
  discount,
  bgGradient,
  targetDate,
  ctaText = "Shop Now",
  ctaLink = "/products",
}: PromoBannerProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 md:p-8 ${bgGradient}`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium">
            <Zap className="w-4 h-4" />
            <span>Limited Time Offer</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">{title}</h3>
          <p className="text-white/80 text-sm md:text-base">{subtitle}</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
              <Percent className="w-5 h-5 text-white" />
              <span className="text-xl md:text-2xl font-bold text-white">{discount}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-white/80 text-sm mb-2 text-center">Ends in</p>
            <CountdownTimer targetDate={targetDate} className="text-white" />
          </div>
          <Link to={ctaLink}>
            <ShopButton variant="secondary" size="lg" className="gap-2 shadow-lg">
              {ctaText}
              <ArrowRight className="w-5 h-5" />
            </ShopButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
