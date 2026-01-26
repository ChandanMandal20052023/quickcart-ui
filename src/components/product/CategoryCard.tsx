import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  itemCount?: number;
}

const CategoryCard = ({ id, name, image, itemCount }: CategoryCardProps) => {
  return (
    <Link to={`/products?category=${id}`} className="block group">
      <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-secondary hover:bg-primary/10 transition-all duration-300">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden mb-3 bg-background shadow-soft">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h3 className="font-semibold text-foreground text-sm md:text-base">{name}</h3>
        {itemCount && (
          <p className="text-muted-foreground text-xs mt-1">{itemCount} items</p>
        )}
      </div>
    </Link>
  );
};

export default CategoryCard;