import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

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
    const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
    },
  })

  return (
    <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden">
      {slides.map((slide, index) => (
        <div key={index} className="keen-slider__slide relative w-full h-[300px] md:h-[400px]">
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
  );
}
