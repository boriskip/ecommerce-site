import { useState } from 'react';
import TopBar from './components/layout/TopBar';
import Header from './components/layout/Header';
import HeroSection from './components/sections/hero/HeroSection';
import FlashSalesSection from './components/sections/flash-sales/FlashSalesSection';
import CategorySliderSection from './components/sections/categories/CategorySliderSection'; 
import BestSellingProducts from './components/sections/best-selling/BestSellingProducts';

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
      </main>
    </>
  );
}

export default App
