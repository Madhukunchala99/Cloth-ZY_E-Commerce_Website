import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

// Slide data
const slides = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg',
    title: 'Summer Collection 2025',
    subtitle: 'Discover fresh styles for the season',
    cta: {
      text: 'Shop Now',
      link: '/shop?category=summer'
    },
    position: 'left'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    title: 'New Arrivals',
    subtitle: 'Be the first to wear our latest designs',
    cta: {
      text: 'Explore',
      link: '/shop?new=true'
    },
    position: 'center'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1019790/pexels-photo-1019790.jpeg',
    title: 'Premium Collection',
    subtitle: 'Luxurious fabrics with timeless appeal',
    cta: {
      text: 'Discover',
      link: '/shop?category=premium'
    },
    position: 'right'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const getTextPosition = (position: string) => {
    switch (position) {
      case 'left':
        return 'justify-start text-left';
      case 'right':
        return 'justify-end text-right';
      default:
        return 'justify-center text-center';
    }
  };

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/40"
              aria-hidden="true"
            ></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover object-center"
            />
            <div className={`absolute inset-0 flex items-center ${getTextPosition(slide.position)} p-8 md:p-16`}>
              <div className="max-w-xl">
                <h2 
                  className={`text-4xl md:text-6xl font-bold text-white mb-4 transform transition-transform duration-700 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  {slide.title}
                </h2>
                <p 
                  className={`text-xl md:text-2xl text-white mb-8 transform transition-transform duration-700 delay-200 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  {slide.subtitle}
                </p>
                <Button 
                  as={Link} 
                  to={slide.cta.link}
                  size="lg"
                  className={`transform transition-all duration-700 delay-400 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  {slide.cta.text}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 text-white transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 text-white transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;