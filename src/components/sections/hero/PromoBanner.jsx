export default function PromoBanner() {
  return (
<div className="w-3/4 bg-black text-white rounded-lg overflow-hidden flex items-center relative px-10 py-8">
<div className="flex-1 space-y-4">
  <p className="text-sm text-gray-300">iPhone 14 Series</p>
  <h2 className="text-4xl font-bold leading-tight">Up to 10% off Voucher</h2>
  <a href="#" className="inline-block mt-4 text-sm font-semibold border-white hover:text-gray-300">
     Shop Now →
  </a>
</div>

<img 
src="../../../imeges/iphone.png"
alt="Iphone"
className="w-1/2 object-contain"
/>

<div className="absolute bottom-4 left-10 flex-grow-2">
  {[0, 1, 2, 3, 4,].map((i) => (
    <span key={i} className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-red-500' : 'bg-gray-400'}`}></span>
  ))}
</div>

</div>
  );
}
