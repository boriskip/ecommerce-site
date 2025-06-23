import { useState } from 'react';
import TopBar from './components/layout/TopBar';
import Header from './components/layout/Header';
import HeroSection from './components/sections/hero/HeroSection';
import FlashSalesSection from './components/sections/flash-sales/FlashSalesSection';
import CategorySliderSection from './components/sections/categories/CategorySliderSection'; 
import BestSellingProducts from './components/sections/best-selling/BestSellingProducts';
import ExploreProductsSection from './components/sections/products/ExploreProductsSection';
import NewArrivalSection from './components/sections/new-arrivals/NewArrivalSection';
import Footer from './components/layout/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
<>
      <TopBar />
      <Header />
      <main className="p-4">
      <HeroSection />
      <FlashSalesSection />
      <CategorySliderSection />
      <BestSellingProducts />
      <ExploreProductsSection />
      <NewArrivalSection />
      </main>
      <Footer />
    </>
  );
}

export default App
