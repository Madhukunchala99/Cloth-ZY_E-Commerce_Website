import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../../data/products';
import ProductGrid from '../product/ProductGrid';
import Button from '../ui/Button';

const FeaturedCollection = () => {
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setFeaturedProducts(getFeaturedProducts());
        setLoading(false);
      }, 500);
    };

    fetchData();
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Collection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium clothing pieces that define contemporary style and elegance.
          </p>
        </div>

        <ProductGrid products={featuredProducts} loading={loading} />

        <div className="mt-12 text-center">
          <Button as={Link} to="/shop" variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;