import HeroSection from '../components/sections/hero/HeroSection';
import FlashSalesSection from '../components/sections/flash-sales/FlashSalesSection';
import CategorySliderSection from '../components/sections/categories/CategorySliderSection';
import BestSellingProducts from '../components/sections/best-selling/BestSellingProducts';
import ExploreProductsSection from '../components/sections/products/ExploreProductsSection';
import NewArrivalSection from '../components/sections/new-arrivals/NewArrivalSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FlashSalesSection />
      <CategorySliderSection />
      <BestSellingProducts />
      <ExploreProductsSection />
      <NewArrivalSection />
    </>
  );
}