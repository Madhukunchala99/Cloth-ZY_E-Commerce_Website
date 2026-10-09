import { Helmet } from 'react-helmet';
import Hero from '../components/home/Hero';
import FeaturedCollection from '../components/home/FeaturedCollection';
import CategoryFeature from '../components/home/CategoryFeature';
import NewArrivals from '../components/home/NewArrivals';
import PromoSection from '../components/home/PromoSection';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Elegance | Premium Fashion Clothing</title>
        <meta name="description" content="Discover premium fashion clothing at Elegance. Shop the latest trends in men's and women's apparel." />
      </Helmet>

      <Hero />
      <CategoryFeature />
      <NewArrivals />
      <FeaturedCollection />
      <PromoSection />
    </>
  );
};

export default Home;