import { useState, useEffect } from 'react';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import FlashTimer from './FlashTimer';
import FlashProductCard from './FlashProductCard';
import { ArrowLeft, ArrowRight } from "lucide-react";
import axiosPrivate from '../../../api/axiosPrivate';


export default function FlashSalesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [flashSales, setFlashSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlashSales() {
      try {
        const res = await axiosPrivate.get('/api/flash-sales');
        setFlashSales(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        setFlashSales([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFlashSales();
  }, []);

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
            {flashSales.length > 0 && flashSales[0].starts_at && flashSales[0].ends_at && (
              <FlashTimer endsAt={flashSales[0].ends_at} startsAt={flashSales[0].starts_at} />
            )}
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
                (slider?.current?.track?.details?.slides?.length ?? 0) -
                (slider?.current?.options?.slides?.perView ?? 1) && (
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
          {loading ? (
            <div className="p-8 text-center w-full">Loading...</div>
          ) : flashSales.length === 0 ? (
            <div className="p-8 text-center w-full">No flash sales now</div>
          ) : (
            Array.isArray(flashSales) ? flashSales.map((fs) => (
              <div key={fs.id} className="keen-slider__slide">
                <FlashProductCard
                  product={{
                    ...fs.product,
                    price: fs.price,         // ← цена из Flash Sale!
                    oldPrice: fs.old_price,  // ← старая цена
                    discount: fs.discount,
                    rating: fs.rating,
                    reviews: fs.reviews,
                  }}
                  flashSaleId={fs.id}
                />
              </div>
            )) : null
          )}
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
              (slider?.current?.track?.details?.slides?.length ?? 0) -
              (slider?.current?.options?.slides?.perView ?? 1) && (
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
