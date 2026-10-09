import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductGrid = ({ products, loading = false }: ProductGridProps) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [showSkeleton, setShowSkeleton] = useState(loading);

  useEffect(() => {
    if (loading) {
      setShowSkeleton(true);
      setVisibleProducts([]);
    } else {
      // Simulate progressive loading for better UX
      const timeout = setTimeout(() => {
        setShowSkeleton(false);
        setVisibleProducts(products);
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [products, loading]);

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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {showSkeleton
        ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
        : visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          
      {!showSkeleton && visibleProducts.length === 0 && (
        <div className="col-span-full py-12 text-center">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;