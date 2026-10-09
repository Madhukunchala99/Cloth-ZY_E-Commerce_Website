import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice } from '../../lib/utils';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import Button from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      product,
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0].name
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-md bg-gray-200">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.isNewArrival && (
              <span className="inline-flex items-center rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-gray-900">
                New
              </span>
            )}
            {product.isOnSale && (
              <span className="inline-flex items-center rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
                Sale
              </span>
            )}
          </div>
          
          {/* Hover Actions */}
          <div 
            className={`absolute inset-x-0 bottom-0 bg-white/90 p-3 flex justify-between items-center transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
            }`}
          >
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="flex items-center gap-1"
            >
              <ShoppingBag size={16} />
              Add to Cart
            </Button>
            
            <button
              onClick={handleWishlistToggle}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart 
                size={18} 
                className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"} 
              />
            </button>
          </div>
        </Link>
      </div>
      
      <div className="mt-3">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
          <div className="mt-1 flex items-center">
            {product.originalPrice ? (
              <>
                <span className="text-sm font-medium text-gray-900">{formatPrice(product.price)}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
              </>
            ) : (
              <span className="text-sm font-medium text-gray-900">{formatPrice(product.price)}</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;