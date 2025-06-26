import { useState } from 'react';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import FlashTimer from './FlashTimer';
import FlashProductCard from './FlashProductCard';
import { ArrowLeft, ArrowRight } from "lucide-react";


export default function FlashSalesSection() {
const [currentSlide, setCurrentSlide] = useState(0);
const [loaded, setLoaded] = useState(false);

const [sliderRef, slider] = useKeenSlider({
  slides: {
    perView: 2,
    spacing: 16,
  },
  breakpoints: {
    "(min-width: 768px)": {
      slides: { perView: 3, spacing: 24 },
    },
    "(min-width: 1024px)": {
      slides: { perView: 5, spacing: 24 },
    },
  },
  slideChanged(s) {
    setCurrentSlide(s.track.details.rel);
  },
  created(s) {
    setLoaded(true);
  },
});

  const products = [
    {
      id: 1,
      title: 'HAVIT HV-G92 Gamepad',
      price: 120,
      oldPrice: 160,
      image: 'havit1.png',
      discount: 40,
      rating: 4.5,
      reviews: 88,
    },
    {
      id: 2,
      title: 'AK-900 Wired Keybord',
      price: 960,
      oldPrice: 1160,
      image: 'ak-9001.png',
      discount: 35,
      rating: 4.5,
      reviews: 75,
    },
     {
      id: 3,
      title: 'IPS LCD Gaming Monitor',
      price: 370,
      oldPrice: 400,
      image: 'ips-lcd1.png',
      discount: 30,
      rating: 4.5,
      reviews: 99,
    },
          {
      id: 4,
      title: 'S-Sieries Comfort Chair',
      price: 375,
      oldPrice: 400,
      image: 'chair1.png',
      discount: 30,
      rating: 4.5,
      reviews: 99,
    },
        {
      id: 5,
      title: 'HAVIT HV-G92 Gamepad',
      price: 120,
      oldPrice: 160,
      image: 'havit1.png',
      discount: 40,
      rating: 4.5,
      reviews: 88,
    },
    {
      id: 6,
      title: 'AK-900 Wired Keybord',
      price: 960,
      oldPrice: 1160,
      image: 'ak-9001.png',
      discount: 35,
      rating: 4.5,
      reviews: 75,
    },
     {
      id: 7,
      title: 'IPS LCD Gaming Monitor',
      price: 370,
      oldPrice: 400,
      image: 'ips-lcd1.png',
      discount: 30,
      rating: 4.5,
      reviews: 99,
    },
          {
      id: 8,
      title: 'S-Sieries Comfort Chair',
      price: 375,
      oldPrice: 400,
      image: 'chair1.png',
      discount: 30,
      rating: 4.5,
      reviews: 99,
    }
  ];

  return (
    <section className="py-10 bg-white border-t">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Заголовок и таймер */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <p className="text-red-500 font-semibold text-sm">Today’s</p>
            <h2 className="text-2xl font-bold">Flash Sales</h2>
          </div>

         {/* Таймер */}
  <div className="sm:ml-auto sm:mr-auto">
    <FlashTimer />
  </div>

  {loaded && slider && (
  <div className="hidden md:flex gap-2">
    {currentSlide > 0 && (
      <button
        onClick={() => slider.current?.prev()}
        className="w-8 h-8 rounded-full flex items-center justify-center text-black bg-gray-200 hover:bg-gray-300"
      >
        <ArrowLeft size={18} />
      </button>
    )}
    {currentSlide <
      slider.current.track.details.slides.length -
        slider.current.options.slides.perView && (
      <button
        onClick={() => slider.current?.next()}
        className="w-8 h-8 rounded-full flex items-center justify-center text-black bg-gray-200 hover:bg-gray-300"
      >
        <ArrowRight size={18} />
      </button>
    )}
  </div>
)}

        </div>

        {/* slider */}
    <div ref={sliderRef} className="keen-slider">
          {products.map((product) => (
            <div key={product.id} className="keen-slider__slide">
              <FlashProductCard product={product} />
            </div>
          ))}
        </div>

{loaded && slider && (
  <div className="flex justify-center gap-4 mt-4 md:hidden">
    {currentSlide > 0 && (
      <button
        onClick={() => slider.current?.prev()}
        className="w-10 h-10 rounded-full flex items-center justify-center text-black bg-gray-200 hover:bg-gray-300"
      >
        <ArrowLeft size={20} />
      </button>
    )}
    {currentSlide <
      slider.current.track.details.slides.length -
        slider.current.options.slides.perView && (
      <button
        onClick={() => slider.current?.next()}
        className="w-10 h-10 rounded-full flex items-center justify-center text-black bg-gray-200 hover:bg-gray-300"
      >
        <ArrowRight size={20} />
      </button>
    )}
  </div>
)}

        {/* Кнопка */}
        <div className="text-center mt-8">
          <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
            View All Products
          </button>
        </div>
      </div>
      <hr className="mt-10 border-gray-300" />
      
    </section>
  );
}
