import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { 
  getProductsByCategory, 
  getNewArrivals, 
  getSaleProducts, 
  filterProducts, 
  searchProducts 
} from '../data/products';
import { Product } from '../types';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';
import { cn } from '../lib/utils';

const Shop = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('newest');

  // Get query parameters
  const isNewArrivals = searchParams.get('new') === 'true';
  const isOnSale = searchParams.get('sale') === 'true';
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    setLoading(true);
    let productsToDisplay: Product[] = [];

    // Simulate API call
    setTimeout(() => {
      // Handle search query
      if (searchQuery) {
        productsToDisplay = searchProducts(searchQuery);
      }
      // Handle category filter
      else if (category) {
        productsToDisplay = getProductsByCategory(category);
        setSelectedCategory(category);
      }
      // Handle new arrivals
      else if (isNewArrivals) {
        productsToDisplay = getNewArrivals();
      }
      // Handle sale items
      else if (isOnSale) {
        productsToDisplay = getSaleProducts();
      }
      // Default to all products
      else {
        productsToDisplay = filterProducts({});
      }

      // Apply client-side filters
      const filteredProducts = filterProductsByCriteria(productsToDisplay);

      // Sort products
      const sortedProducts = sortProducts(filteredProducts);

      setProducts(sortedProducts);
      setLoading(false);
    }, 600);
  }, [category, isNewArrivals, isOnSale, searchQuery, selectedCategory, priceRange, selectedSizes, selectedColors, sortOption]);

  // Filter products based on selected criteria
  const filterProductsByCriteria = (productsToFilter: Product[]): Product[] => {
    return productsToFilter.filter(product => {
      // Filter by price range
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Filter by sizes (if any selected)
      if (selectedSizes.length > 0 && !selectedSizes.some(size => product.sizes.includes(size))) {
        return false;
      }

      // Filter by colors (if any selected)
      if (selectedColors.length > 0 && !selectedColors.some(color => {
        return product.colors.some(productColor => 
          productColor.name.toLowerCase() === color.toLowerCase()
        );
      })) {
        return false;
      }

      return true;
    });
  };

  // Sort products based on selected option
  const sortProducts = (productsToSort: Product[]): Product[] => {
    switch (sortOption) {
      case 'price-asc':
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...productsToSort].sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      default:
        return productsToSort;
    }
  };

  // Toggle size selection
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  // Toggle color selection
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setPriceRange([0, 500]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortOption('newest');
  };

  // Get page title
  const getPageTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (isNewArrivals) return "New Arrivals";
    if (isOnSale) return "Sale Items";
    if (category) return `${category.charAt(0).toUpperCase() + category.slice(1)}'s Collection`;
    return "All Products";
  };

  // Available sizes for filtering
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  // Available colors for filtering
  const availableColors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Green', hex: '#008000' },
    { name: 'Yellow', hex: '#FFFF00' }
  ];

  return (
    <>
      <Helmet>
        <title>{getPageTitle()} | Elegance</title>
        <meta name="description" content={`Shop ${getPageTitle().toLowerCase()} at Elegance. Find the perfect addition to your wardrobe.`} />
      </Helmet>

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{getPageTitle()}</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear All
                  </button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-3">Price Range</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">${priceRange[0]}</span>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <span className="text-sm">${priceRange[1]}</span>
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-3">Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={cn(
                          "px-3 py-1 text-sm border rounded-md transition-colors",
                          selectedSizes.includes(size)
                            ? "bg-gray-900 text-white border-gray-900"
                            : "border-gray-300 hover:border-gray-400"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-3">Colors</h3>
                  <div className="flex flex-wrap gap-3">
                    {availableColors.map(color => (
                      <button
                        key={color.name}
                        onClick={() => toggleColor(color.name)}
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center border-2",
                          selectedColors.includes(color.name)
                            ? "border-gray-900"
                            : "border-transparent hover:border-gray-300"
                        )}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Filter by ${color.name}`}
                      >
                        {selectedColors.includes(color.name) && (
                          <span className={`text-${color.name.toLowerCase() === 'white' ? 'black' : 'white'}`}>✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h3 className="text-md font-medium mb-3">Sort By</h3>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(true)}
                    className="flex items-center gap-1"
                  >
                    <Filter size={16} /> Filters
                  </Button>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                  >
                    <option value="newest">Sort: Newest</option>
                    <option value="price-asc">Sort: Price Low to High</option>
                    <option value="price-desc">Sort: Price High to Low</option>
                  </select>
                </div>
                <span className="text-sm text-gray-500">{products.length} products</span>
              </div>

              {/* Products Grid */}
              <ProductGrid products={products} loading={loading} />

              {/* Empty State */}
              {!loading && products.length === 0 && (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Products Found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters or search terms.</p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity lg:hidden",
          showFilters ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setShowFilters(false)}
      >
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-80 max-w-full bg-white transition-transform transform",
            showFilters ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <SlidersHorizontal size={20} className="mr-2" /> Filters
              </h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Filter Content */}
            <div className="space-y-8">
              {/* Price Range */}
              <div>
                <h3 className="text-md font-medium mb-3">Price Range</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm">${priceRange[0]}</span>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-md font-medium mb-3">Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={cn(
                        "px-3 py-1 text-sm border rounded-md transition-colors",
                        selectedSizes.includes(size)
                          ? "bg-gray-900 text-white border-gray-900"
                          : "border-gray-300 hover:border-gray-400"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="text-md font-medium mb-3">Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {availableColors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center border-2",
                        selectedColors.includes(color.name)
                          ? "border-gray-900"
                          : "border-transparent hover:border-gray-300"
                      )}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Filter by ${color.name}`}
                    >
                      {selectedColors.includes(color.name) && (
                        <span className={`text-${color.name.toLowerCase() === 'white' ? 'black' : 'white'}`}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="text-md font-medium mb-3">Sort By</h3>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              <div className="pt-4 flex gap-4">
                <Button variant="outline" onClick={clearFilters} className="flex-1">
                  Clear All
                </Button>
                <Button onClick={() => setShowFilters(false)} className="flex-1">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;