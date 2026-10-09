import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNewArrivals } from '../../data/products';
import { Product } from '../../types';
import ProductCard from '../product/ProductCard';
import Button from '../ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NewArrivals = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = {
    sm: 2,
    md: 3,
    lg: 4
  };

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setProducts(getNewArrivals());
        setLoading(false);
      }, 600);
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Calculate if buttons should be disabled
  const isBeginning = currentIndex === 0;
  const isEnd = currentIndex >= products.length - itemsPerPage.md;

  // Skeleton loader
  const SkeletonCard = () => (
    <div className="animate-pulse">
      <div className="aspect-h-4 aspect-w-3 rounded-md bg-gray-200"></div>
      <div className="mt-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="mt-1 h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
          <Link to="/shop?new=true" className="text-yellow-500 hover:text-yellow-600 font-medium">
            View All
          </Link>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            disabled={isBeginning}
            className={`absolute -left-3 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full shadow-md p-2 text-gray-700 hover:text-gray-900 ${
              isBeginning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            disabled={isEnd}
            className={`absolute -right-3 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full shadow-md p-2 text-gray-700 hover:text-gray-900 ${
              isEnd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slider */}
          <div className="overflow-hidden py-4">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage.lg)}%)` }}
            >
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-3">
                      <SkeletonCard />
                    </div>
                  ))
                : products.map((product) => (
                    <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-3">
                      <ProductCard product={product} />
                    </div>
                  ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button as={Link} to="/shop?new=true" variant="outline">
            Browse All New Arrivals
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;