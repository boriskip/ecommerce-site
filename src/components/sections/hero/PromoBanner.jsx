import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/hero/iphone1.png",
    title: "iPhone 14 Series",
    subtitle: "Up to 10% off Voucher",
  },
  {
    image: "/hero/iphone2.png",
    title: "Samsung Galaxy Ultra",
    subtitle: "New arrival discounts",
  },
  {
    image: "/hero/iphone3.png",
    title: "OnePlus Nord 3",
    subtitle: "Flash deal this week",
  },
]

export default function PromoBanner() {
   const [currentSlide, setCurrentSlide] = useState(0);
   const [loaded, setLoaded] = useState(false);

    const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
    },
      slideChanged(s) {
      setCurrentSlide(s.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  });

  return (
    <div className="relative rounded-lg overflow-hidden">
    <div ref={sliderRef} className="keen-slider h-[300px] md:h-[400px]">
      {slides.map((slide, index) => (
        <div key={index} className="keen-slider__slide relative w-full ">
          {/* Картинка на заднем фоне */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Текст поверх */}
          <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-10 text-white bg-black/40">
            <p className="text-sm text-gray-200">{slide.title}</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-[400px]">
              {slide.subtitle}
            </h2>
            <a
              href="#"
              className="inline-block mt-4 text-sm font-semibold border-b border-white hover:text-gray-300"
            >
              Shop Now →
            </a>
          </div>
        </div>
      ))}
    </div>

    {/* Стрелки */}
      {loaded && slider && (
        <>
          <button
            onClick={() => slider.current?.prev()}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 text-gray-700 p-2 rounded-full shadow hover:bg-white/50 z-10 backdrop-blur"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => slider.current?.next()}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 text-gray-700 p-2 rounded-full shadow hover:bg-white/50 z-10 backdrop-blur"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

            {/* Индикаторы */}
      {loaded && slider && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => slider.current?.moveToIdx(i)}
              className={`w-2 h-2 rounded-full transition ${
                i === currentSlide
                  ? "bg-red-500 shadow-[0_0_0_2px_#d1d5db]"
                  : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

    </div>
  );
}
