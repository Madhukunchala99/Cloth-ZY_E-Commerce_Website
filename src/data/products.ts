import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Slim Fit Cotton Shirt",
    price: 49.99,
    description: "A classic slim-fit shirt made from premium cotton fabric with a soft feel. Perfect for formal occasions or a smart casual look. Features a regular collar and button-down front.",
    images: [
      "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg",
      "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg",
      "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg"
    ],
    category: "men",
    subcategory: "shirts",
    tags: ["cotton", "slim fit", "formal", "business"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Light Blue", hex: "#ADD8E6" },
      { name: "Black", hex: "#000000" }
    ],
    isFeatured: true,
    isNewArrival: false,
    stock: 150
  },
  {
    id: 2,
    name: "Floral Summer Dress",
    price: 79.99,
    description: "A beautiful floral pattern dress perfect for summer days. Made from lightweight fabric for comfort in warm weather. Features a v-neck design and flowing silhouette.",
    images: [
      "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg",
      "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg",
      "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg"
    ],
    category: "women",
    subcategory: "dresses",
    tags: ["floral", "summer", "casual", "v-neck"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Blue Floral", hex: "#6495ED" },
      { name: "Pink Floral", hex: "#FFB6C1" }
    ],
    isFeatured: true,
    isNewArrival: true,
    stock: 75
  },
  {
    id: 3,
    name: "Slim Fit Jeans",
    price: 59.99,
    description: "Classic slim fit jeans made from durable denim with a touch of stretch for comfort. Features a five-pocket design and zip fly with button closure.",
    images: [
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg"
    ],
    category: "men",
    subcategory: "jeans",
    tags: ["denim", "slim fit", "casual"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [
      { name: "Blue", hex: "#0000FF" },
      { name: "Black", hex: "#000000" }
    ],
    isFeatured: false,
    isNewArrival: false,
    stock: 100
  },
  {
    id: 4,
    name: "Oversized Knit Sweater",
    price: 89.99,
    originalPrice: 119.99,
    description: "A cozy oversized knit sweater perfect for chilly days. Made from a soft wool blend that's both warm and comfortable. Features a crew neck and ribbed cuffs.",
    images: [
      "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg",
      "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg",
      "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg"
    ],
    category: "women",
    subcategory: "sweaters",
    tags: ["knit", "oversized", "winter", "wool"],
    sizes: ["S/M", "L/XL"],
    colors: [
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Gray", hex: "#808080" },
      { name: "Burgundy", hex: "#800020" }
    ],
    isFeatured: false,
    isNewArrival: false,
    isOnSale: true,
    discount: 25,
    stock: 60
  },
  {
    id: 5,
    name: "Athletic Performance Tee",
    price: 34.99,
    description: "Lightweight performance t-shirt designed for workouts and sports. Features moisture-wicking fabric to keep you dry and comfortable during exercise.",
    images: [
      "https://images.pexels.com/photos/6311399/pexels-photo-6311399.jpeg",
      "https://images.pexels.com/photos/6311399/pexels-photo-6311399.jpeg",
      "https://images.pexels.com/photos/6311399/pexels-photo-6311399.jpeg"
    ],
    category: "men",
    subcategory: "activewear",
    tags: ["sports", "workout", "performance", "gym"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#000080" },
      { name: "Red", hex: "#FF0000" }
    ],
    isFeatured: false,
    isNewArrival: true,
    stock: 120
  },
  {
    id: 6,
    name: "High-Waisted Skinny Jeans",
    price: 69.99,
    description: "Flattering high-waisted skinny jeans made from stretchy denim for a comfortable fit. Features a classic five-pocket design and ankle-length cut.",
    images: [
      "https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg",
      "https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg",
      "https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg"
    ],
    category: "women",
    subcategory: "jeans",
    tags: ["denim", "skinny", "high-waisted", "casual"],
    sizes: ["24", "26", "28", "30", "32", "34"],
    colors: [
      { name: "Medium Blue", hex: "#4169E1" },
      { name: "Black", hex: "#000000" },
      { name: "Light Wash", hex: "#ADD8E6" }
    ],
    isFeatured: true,
    isNewArrival: false,
    stock: 85
  },
  {
    id: 7,
    name: "Leather Biker Jacket",
    price: 199.99,
    originalPrice: 249.99,
    description: "Classic biker jacket made from genuine leather. Features an asymmetric zip front, snap-down lapels, and zippered cuffs for an authentic look.",
    images: [
      "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg",
      "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg",
      "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg"
    ],
    category: "men",
    subcategory: "jackets",
    tags: ["leather", "biker", "outerwear", "casual"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#964B00" }
    ],
    isFeatured: true,
    isNewArrival: false,
    isOnSale: true,
    discount: 20,
    stock: 40
  },
  {
    id: 8,
    name: "Pleated Midi Skirt",
    price: 59.99,
    description: "Elegant pleated midi skirt with a flowing silhouette. Made from lightweight fabric with a comfortable elastic waistband. Perfect for both casual and semi-formal occasions.",
    images: [
      "https://images.pexels.com/photos/6069551/pexels-photo-6069551.jpeg",
      "https://images.pexels.com/photos/6069551/pexels-photo-6069551.jpeg",
      "https://images.pexels.com/photos/6069551/pexels-photo-6069551.jpeg"
    ],
    category: "women",
    subcategory: "skirts",
    tags: ["pleated", "midi", "elegant", "versatile"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Beige", hex: "#F5F5DC" },
      { name: "Navy", hex: "#000080" },
      { name: "Forest Green", hex: "#228B22" }
    ],
    isFeatured: false,
    isNewArrival: true,
    stock: 65
  }
];

export const categories: { [key: string]: string[] } = {
  men: ["shirts", "t-shirts", "jeans", "pants", "activewear", "jackets", "suits", "accessories"],
  women: ["dresses", "tops", "jeans", "pants", "skirts", "activewear", "jackets", "accessories"],
  kids: ["boys", "girls", "infants", "shoes", "accessories"]
};

// Helper function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

// Helper function to get new arrivals
export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNewArrival);
};

// Helper function to get sale products
export const getSaleProducts = (): Product[] => {
  return products.filter(product => product.isOnSale);
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

// Helper function to get products by subcategory
export const getProductsBySubcategory = (subcategory: string): Product[] => {
  return products.filter(product => product.subcategory === subcategory);
};

// Helper function to get a product by ID
export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

// Helper function to filter products
export const filterProducts = (filters: {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  onSale?: boolean;
}): Product[] => {
  return products.filter(product => {
    // Filter by category
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    // Filter by subcategory
    if (filters.subcategory && product.subcategory !== filters.subcategory) {
      return false;
    }
    
    // Filter by price range
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }
    
    // Filter by sizes
    if (filters.sizes && filters.sizes.length > 0) {
      const hasSize = filters.sizes.some(size => product.sizes.includes(size));
      if (!hasSize) return false;
    }
    
    // Filter by colors
    if (filters.colors && filters.colors.length > 0) {
      const hasColor = filters.colors.some(color => 
        product.colors.some(productColor => productColor.name.toLowerCase() === color.toLowerCase())
      );
      if (!hasColor) return false;
    }
    
    // Filter by sale status
    if (filters.onSale === true && !product.isOnSale) {
      return false;
    }
    
    return true;
  });
};

// Helper function to search products
export const searchProducts = (query: string): Product[] => {
  const lowerCaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerCaseQuery) || 
    product.description.toLowerCase().includes(lowerCaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
  );
};