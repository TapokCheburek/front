import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addToCart } from '../store/cartSlice';
import { fetchProductById } from '../store/productsSlice';
import { Product } from '../types';

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(1);
  
  const { currentProduct: product, currentProductStatus: status } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  if (status === 'loading') {
    return <div className="text-center py-24 text-xl">Загрузка...</div>;
  }

  if (status === 'failed' || !product) {
    return (
      <div className="text-center py-24">
        <h1 className="text-3xl font-normal mb-4">Товар не найден</h1>
        <button onClick={() => navigate('/')} className="text-blue-500 font-medium">Вернуться в каталог</button>
      </div>
    );
  }

  const inStock = product.quantity > 0;
  const rating = product.rating || 5.0;

  const handleAddToCart = () => {
    if (inStock) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        stock: product.quantity,
      }));
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      <button 
        onClick={() => navigate('/')}
        className="self-start px-8 py-2 bg-[#e5e7eb] rounded-full text-black hover:bg-gray-300 transition-colors"
      >
        Назад
      </button>
      
      <div className="bg-[#e5e7eb] rounded-3xl p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Placeholder */}
          <div className="w-full md:w-1/3 aspect-square bg-[#d1d5db] rounded-lg">
          </div>
          
          {/* Product Details */}
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-normal text-black">{product.name}</h1>
              <div className="flex items-center gap-2">
                <span className="text-2xl md:text-3xl font-normal">{rating.toString().replace('.', ',')}</span>
                <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 text-xl mb-auto">
              <div className="text-gray-600">Цена</div>
              <div className="text-black">{product.price} р</div>
              
              <div className="text-gray-600">Тип лампочки</div>
              <div className="text-black">{product.type}</div>
              
              <div className="text-gray-600">Тип цоколя</div>
              <div className="text-black">{product.socket}</div>
              
              <div className="text-gray-600">Мощность</div>
              <div className="text-black">{product.power} Вт</div>
              
              <div className="text-gray-600">Температура света</div>
              <div className="text-black">{product.color_temperature} K</div>
            </div>
            
            <div className="flex items-center gap-6 mt-8 flex-wrap">
              <div className="flex items-center gap-4">
                <span className="text-lg">Количество</span>
                <div className="relative">
                  <select 
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="appearance-none bg-white py-2 pl-6 pr-10 rounded-full text-xl outline-none"
                  >
                    {[1,2,3,4,5,6,10,20,50].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L7 7L13 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`px-12 py-3 rounded-xl text-xl flex-1 max-w-[280px] transition-colors text-black ${inStock ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 opacity-80 cursor-not-allowed'}`}
               >
                В корзину
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-6">
        {product.description && (
          <div>
            <h2 className="text-xl mb-4 ml-2 text-black">Описание</h2>
            <div className="bg-[#e5e7eb] rounded-2xl p-6">
              <div className="bg-white p-4 rounded-xl text-black leading-relaxed">
                {product.description}
              </div>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl mb-4 ml-2 text-black">Отзывы</h2>
          <div className="ml-2 text-gray-600">
            Пока нет отзывов
          </div>
        </div>
      </div>

    </div>
  );
}
