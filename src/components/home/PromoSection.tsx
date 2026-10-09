import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const PromoSection = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Summer Sale</h2>
            <p className="text-xl text-gray-300 mb-6">
              Enjoy up to 50% off on selected items. Limited time offer.
            </p>
            <p className="mb-8 text-gray-400">
              Discover amazing deals on our premium collection. Refresh your wardrobe with the latest styles at unbeatable prices.
            </p>
            <Button 
              as={Link} 
              to="/shop?sale=true"
              variant="primary"
              size="lg"
            >
              Shop the Sale
            </Button>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg" 
              alt="Summer Sale Promotion"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute top-4 right-4 bg-yellow-500 text-gray-900 font-bold text-xl md:text-2xl p-4 rounded-full flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rotate-12">
              <span>50% OFF</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;