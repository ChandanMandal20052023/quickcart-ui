export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  unit: string;
  category: string;
  description: string;
  deliveryTime: string;
  discount?: number;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
}

export const categories: Category[] = [
  {
    id: "fruits-vegetables",
    name: "Fruits & Vegetables",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&h=200&fit=crop",
    itemCount: 120,
  },
  {
    id: "dairy-bakery",
    name: "Dairy & Bakery",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200&h=200&fit=crop",
    itemCount: 85,
  },
  {
    id: "snacks",
    name: "Snacks & Munchies",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200&h=200&fit=crop",
    itemCount: 95,
  },
  {
    id: "beverages",
    name: "Cold Drinks & Juices",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=200&h=200&fit=crop",
    itemCount: 60,
  },
  {
    id: "instant-food",
    name: "Instant & Frozen",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200&h=200&fit=crop",
    itemCount: 75,
  },
  {
    id: "personal-care",
    name: "Personal Care",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop",
    itemCount: 110,
  },
  {
    id: "cleaning",
    name: "Cleaning Essentials",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&h=200&fit=crop",
    itemCount: 45,
  },
  {
    id: "baby-care",
    name: "Baby Care",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200&h=200&fit=crop",
    itemCount: 55,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Fresh Organic Bananas",
    price: 45,
    originalPrice: 55,
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop",
    unit: "1 dozen",
    category: "fruits-vegetables",
    description: "Farm-fresh organic bananas, naturally ripened and packed with nutrients. Perfect for breakfast smoothies or as a healthy snack.",
    deliveryTime: "10 mins",
    discount: 18,
    inStock: true,
  },
  {
    id: "2",
    name: "Amul Taza Toned Fresh Milk",
    price: 68,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop",
    unit: "1 litre",
    category: "dairy-bakery",
    description: "Fresh toned milk from Amul, pasteurized and packed for freshness. Rich in calcium and protein.",
    deliveryTime: "8 mins",
    inStock: true,
  },
  {
    id: "3",
    name: "Britannia Whole Wheat Bread",
    price: 45,
    originalPrice: 50,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
    unit: "400g",
    category: "dairy-bakery",
    description: "Soft and fresh whole wheat bread, perfect for sandwiches and toast. Made with 100% whole wheat flour.",
    deliveryTime: "10 mins",
    discount: 10,
    inStock: true,
  },
  {
    id: "4",
    name: "Lays Classic Salted Chips",
    price: 20,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop",
    unit: "52g",
    category: "snacks",
    description: "Crispy and delicious classic salted potato chips. The perfect snack for any occasion.",
    deliveryTime: "8 mins",
    inStock: true,
  },
  {
    id: "5",
    name: "Red Tomatoes",
    price: 35,
    originalPrice: 42,
    image: "https://images.unsplash.com/photo-1546470427-f5d9c4c65619?w=400&h=400&fit=crop",
    unit: "500g",
    category: "fruits-vegetables",
    description: "Fresh, ripe red tomatoes perfect for salads, curries, and sauces. Locally sourced from verified farmers.",
    deliveryTime: "10 mins",
    discount: 17,
    inStock: true,
  },
  {
    id: "6",
    name: "Coca-Cola Original",
    price: 40,
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=400&fit=crop",
    unit: "750ml",
    category: "beverages",
    description: "The classic refreshing taste of Coca-Cola. Serve chilled for the best experience.",
    deliveryTime: "8 mins",
    inStock: true,
  },
  {
    id: "7",
    name: "Maggi 2-Minute Noodles",
    price: 14,
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=400&fit=crop",
    unit: "70g",
    category: "instant-food",
    description: "India's favorite instant noodles. Ready in just 2 minutes with the signature Maggi taste.",
    deliveryTime: "8 mins",
    inStock: true,
  },
  {
    id: "8",
    name: "Dove Beauty Bar Soap",
    price: 55,
    originalPrice: 65,
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&h=400&fit=crop",
    unit: "100g",
    category: "personal-care",
    description: "Gentle cleansing bar with 1/4 moisturizing cream. Leaves skin soft and smooth.",
    deliveryTime: "10 mins",
    discount: 15,
    inStock: true,
  },
  {
    id: "9",
    name: "Fresh Green Apples",
    price: 180,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=400&fit=crop",
    unit: "1 kg",
    category: "fruits-vegetables",
    description: "Crisp and juicy green apples, imported and hand-picked for quality. Rich in fiber and vitamins.",
    deliveryTime: "10 mins",
    discount: 18,
    inStock: true,
  },
  {
    id: "10",
    name: "Mother Dairy Curd",
    price: 42,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
    unit: "400g",
    category: "dairy-bakery",
    description: "Fresh, creamy curd made from pasteurized milk. Perfect for meals and refreshing drinks.",
    deliveryTime: "8 mins",
    inStock: true,
  },
  {
    id: "11",
    name: "Surf Excel Easy Wash",
    price: 125,
    originalPrice: 145,
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop",
    unit: "1 kg",
    category: "cleaning",
    description: "Powerful detergent that removes tough stains in one wash. Safe for all colored clothes.",
    deliveryTime: "10 mins",
    discount: 14,
    inStock: true,
  },
  {
    id: "12",
    name: "Pampers Baby Dry Diapers",
    price: 499,
    originalPrice: 599,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop",
    unit: "Pack of 50",
    category: "baby-care",
    description: "Up to 12 hours of overnight dryness. Soft and gentle on baby's skin.",
    deliveryTime: "10 mins",
    discount: 17,
    inStock: true,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((product) => product.category === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 8);
};