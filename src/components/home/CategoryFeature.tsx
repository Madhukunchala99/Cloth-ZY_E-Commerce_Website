import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const CategoryFeature = () => {
  const categories = [
    {
      id: 1,
      name: "Men's Collection",
      description: "Sophisticated styles for the modern gentleman",
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
      link: "/shop/men"
    },
    {
      id: 2,
      name: "Women's Collection",
      description: "Effortless elegance for every occasion",
      image: "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg",
      link: "/shop/women"
    },
    {
      id: 3,
      name: "Accessories",
      description: "Complete your look with our premium accessories",
      image: "https://images.pexels.com/photos/1374910/pexels-photo-1374910.jpeg",
      link: "/shop/accessories"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collections crafted for every style and occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map(category => (
            <div key={category.id} className="group relative overflow-hidden rounded-lg">
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
              
              {/* Image */}
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-96 object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="mb-4 opacity-90">{category.description}</p>
                <Button 
                  as={Link} 
                  to={category.link}
                  variant="primary"
                  className="self-start"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFeature;