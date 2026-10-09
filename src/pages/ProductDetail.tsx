import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Star, Heart, Minus, Plus, Check, Package, RefreshCw, Truck } from 'lucide-react';
import { getProductById } from '../data/products';
import { Product } from '../types';
import Button from '../components/ui/Button';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { formatPrice } from '../lib/utils';
import ProductGrid from '../components/product/ProductGrid';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    if (!id) return;

    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const productData = getProductById(parseInt(id));
      
      if (productData) {
        setProduct(productData);
        setSelectedSize(productData.sizes[0]);
        setSelectedColor(productData.colors[0].name);
        
        // Get related products (products from same category)
        const related = getProductById(parseInt(id)) || [];
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }, 600);
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-16 container mx-auto px-4">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-w-3 aspect-h-4 bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-2/3"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mt-8"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-12 bg-gray-200 rounded w-full mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-16 container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you are looking for does not exist or has been removed.</p>
        <Button as={Link} to="/shop">Continue Shopping</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor
    });
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // Calculate discount percentage if product is on sale
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <>
      <Helmet>
        <title>{product.name} | Elegance</title>
        <meta name="description" content={product.description.substring(0, 160)} />
      </Helmet>

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="mb-6 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-900">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/shop" className="text-gray-500 hover:text-gray-900">Shop</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/shop/${product.category}`} className="text-gray-500 hover:text-gray-900 capitalize">
              {product.category}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-w-3 aspect-h-4 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-yellow-500' : 'ring-1 ring-gray-200'
                    }`}
                  >
                    <img 
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-500 mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={18} 
                      className={star <= (product.rating || 4) ? 'fill-yellow-500' : ''} 
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">
                  {product.reviews?.length || 0} Reviews
                </span>
              </div>

              <div className="mb-6">
                {product.originalPrice ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900 mr-2">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-lg text-gray-500 line-through mr-2">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">
                      {discountPercentage}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-8">
                {product.description}
              </p>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm border rounded-md transition-colors ${
                        selectedSize === size
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        selectedColor === color.name
                          ? 'border-gray-900'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Select ${color.name} color`}
                    >
                      {selectedColor === color.name && (
                        <Check className={`text-${color.name.toLowerCase() === 'white' ? 'black' : 'white'}`} size={16} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex w-36 h-12 border border-gray-300 rounded-md">
                  <button
                    onClick={decreaseQuantity}
                    className="w-12 flex items-center justify-center text-gray-600 hover:text-gray-900"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="flex-1 flex items-center justify-center font-medium">
                    {quantity}
                  </div>
                  <button
                    onClick={increaseQuantity}
                    className="w-12 flex items-center justify-center text-gray-600 hover:text-gray-900"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1"
                >
                  Add to Cart
                </Button>
                
                <Button
                  onClick={handleToggleWishlist}
                  variant="outline"
                  size="lg"
                  aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  className="w-12 p-0 flex items-center justify-center"
                >
                  <Heart 
                    size={20} 
                    className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""} 
                  />
                </Button>
              </div>

              {/* Stock Status */}
              <div className="mb-8">
                <div className="flex items-center text-sm">
                  <span className="mr-2 w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="font-medium">
                    {product.stock > 10 
                      ? 'In Stock' 
                      : product.stock > 0 
                        ? `Only ${product.stock} left in stock` 
                        : 'Out of Stock'
                    }
                  </span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                <div className="flex items-center">
                  <Truck size={20} className="mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-gray-500">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <RefreshCw size={20} className="mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">30 Days Return</p>
                    <p className="text-xs text-gray-500">Easy returns policy</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Package size={20} className="mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Secure Packaging</p>
                    <p className="text-xs text-gray-500">Safe delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mb-16">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8" aria-label="Tabs">
                <button className="border-b-2 border-yellow-500 py-4 px-1 text-sm font-medium text-yellow-600">
                  Description
                </button>
                <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Reviews
                </button>
                <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Size Guide
                </button>
              </nav>
            </div>
            <div className="py-6">
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <p>This premium product is designed with quality and style in mind. Made from carefully selected materials to ensure comfort and durability. Perfect for both casual and formal occasions.</p>
                <h3>Features</h3>
                <ul>
                  <li>Premium quality materials</li>
                  <li>Comfortable fit</li>
                  <li>Durable construction</li>
                  <li>Easy care instructions</li>
                  <li>Versatile style for multiple occasions</li>
                </ul>
                <h3>Care Instructions</h3>
                <p>Machine wash cold with similar colors. Do not bleach. Tumble dry low. Warm iron if needed.</p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <ProductGrid products={relatedProducts.length ? relatedProducts : []} loading={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;