import { Heart, Eye, Star, StarOff } from "lucide-react";
import useCart from '../../../hooks/useCart';
import toast from 'react-hot-toast';
import axiosPrivate from '../../../api/axiosPrivate';


export default function FlashProductCard({ product, flashSaleId }) {
  const { fetchCart } = useCart();


  if (!product || typeof product !== 'object') {
    return null;
  }
  const {
    title = 'Нет названия',
    price = 0,
    oldPrice = '',
    image = '',
    discount = 0,
    rating = 0,
    reviews = 0,
  } = product;

  const handleAddToCart = async () => {
    try {
      // Можно добавить flash_sale_id, если хотите отличать такие товары
      await axiosPrivate.post('/api/cart', {
        product_id: product.id,
        quantity: 1,
        price: product.price, // цена со скидкой!
        flash_sale_id: flashSaleId, // если нужно
      });
      fetchCart(); // обновить корзину
      toast.success('Товар добавлен в корзину!');
    } catch (e) {
      console.error(e.response?.data || e);
      toast.error('Ошибка при добавлении в корзину');
    }
  };

  return (
    <div className="relative group bg-white border rounded-lg p-4 hover:shadow-md transition-all">
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
        -{discount}%
      </div>

      {/* Icons */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
        <button className="bg-white p-1 rounded-full border">
          <Heart size={16} />
        </button>
        <button className="bg-white p-1 rounded-full border">
          <Eye size={16} />
        </button>
      </div>

      <div className="relative">
        {image ? (
          <img
            src={`/${product.image}`}
            alt={title}
            className="w-full h-50 object-cover mb-4"
          />
        ) : (
          <div className="w-full h-50 bg-gray-100 flex items-center justify-center mb-4 text-gray-400">Нет изображения</div>
        )}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 w-full bg-black text-white text-sm text-center py-2 opacity-0 group-hover:opacity-100 transition duration-300"
        >
          Add To Cart
        </button>
      </div>
      <h3 className="text-sm font-semibold h-10 overflow-hidden leading-tight line-clamp-2">{title}</h3>
      <div className="text-red-500 font-bold">${price}</div>
      {oldPrice && <div className="text-gray-500 text-sm line-through">${oldPrice}</div>}

      <div className="flex items-center text-xs mt-2 text-yellow-500">
        {[...Array(5)].map((_, i) =>
          i < Math.floor(rating) ? (
            <Star key={i} size={14} className="fill-yellow-500 stroke-yellow-500" />
          ) : (
            <StarOff key={i} size={14} className="stroke-yellow-500" />
          )
        )}
        <span className="text-gray-600 ml-1">({reviews})</span>
      </div>
    </div>
  );
}
