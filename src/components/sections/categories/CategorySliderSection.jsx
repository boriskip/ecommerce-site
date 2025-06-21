import { useState, useRef } from "react";
import { Camera, Smartphone, Monitor, Watch, Headphones, Gamepad2, ArrowLeft, ArrowRight } from "lucide-react";

const categories = [
  { icon: <Smartphone size={32} />, label: "Phones" },
  { icon: <Monitor size={32} />, label: "Computers" },
  { icon: <Watch size={32} />, label: "SmartWatch" },
  { icon: <Camera size={32} />, label: "Camera" },
  { icon: <Headphones size={32} />, label: "HeadPhones" },
  { icon: <Gamepad2 size={32} />, label: "Gaming" },
];

export default function CategorySliderSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <p className="text-sm text-red-500 font-medium mb-1">Categories</p>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Browse By Category</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="bg-white p-2 rounded-full border hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-white p-2 rounded-full border hover:bg-gray-100"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar pb-2 md:justify-between"
      >
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`min-w-[140px] md:w-[150px] md:h-[150px] flex flex-col items-center justify-center gap-2 p-6 rounded-xl cursor-pointer transition border ${
              i === activeIndex
                ? "bg-red-500 text-white border-red-500"
                : "hover:bg-gray-100 border-gray-200"
            }`}
          >
            {cat.icon}
            <p className="text-sm font-semibold">{cat.label}</p>
          </div>
        ))}
      </div>
      <hr className="mt-10 border-gray-300" />
    </section>
  );
}