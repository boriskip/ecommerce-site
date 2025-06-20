export default function FlashProductCard({ product }) {
  return (
        <div className="relative group bg-white border rounded-lg p-4 hover:shadow-md transition-all">
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
        -{product.discount}%
      </div>

<div className="absolute top-2 right-2 flex gap-2">
  <button className="p-1 bg-white rounded-full shadow hover:bg-gray-100">❤️</button>
  <button className="p-1 bg-white rounded-full shadow hover:bg-gray-100">👁</button>
</div>

      <img src={`/flash-sales/${product.image}`} alt={product.title} className="w-full h-50 object-cover mb-4" />

      <h3 className="text-sm font-semibold">{product.title}</h3>
      <div className="text-red-500 font-bold">${product.price}</div>
      <div className="text-gray-500 text-sm line-through">${product.oldPrice}</div>



      <div className="flex items-center text-xs mt-2 text-yellow-500">
  {'★'.repeat(Math.floor(product.rating))}
  {'☆'.repeat(5 - Math.floor(product.rating))}
  <span className="text-gray-600 ml-1">({product.reviews})</span>
</div>

      <div className="absolute bottom-0 left-0 w-full bg-black text-white text-sm text-center py-2 opacity-0 group-hover:opacity-100 transition duration-300">
        Add To Cart
      </div>
    </div>
  );
}
