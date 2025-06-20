export default function PromoBanner() {
  return (
  <div className="relative rounded-lg overflow-hidden w-full h-[300px] md:h-[400px]">
      {/* Картинка на заднем фоне */}
      <img
        src="/hero/iphone.png"
        alt="iPhone"
        className="w-full h-full object-cover"
      />

      {/* Текст поверх */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-10 text-white bg-black/40">
        <p className="text-sm text-gray-200">iPhone 14 Series</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-[400px]">
          Up to 10% off Voucher
        </h2>
        <a
          href="#"
          className="inline-block mt-4 text-sm font-semibold border-b border-white hover:text-gray-300"
        >
          Shop Now →
        </a>
      </div>

      {/* Индикаторы (внизу по центру) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
    <span
      key={i}
      className={`w-2 h-2 rounded-full transition ${
        i === 2
          ? 'bg-red-500 shadow-[0_0_0_2px_#d1d5db]' // red point с серой "обводкой"
          : 'bg-gray-400'
      }`}
    ></span>
        ))}
      </div>
    </div>
  );
}
