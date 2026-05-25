import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { trackOrder } from '../store/ordersSlice';
import { fetchProducts } from '../store/productsSlice';
import { AppDispatch, RootState } from '../store';

export function TrackOrderPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const [orderId, setOrderId] = useState(initialId);
  const [hasSearched, setHasSearched] = useState(false);
  const { currentOrder: order, status, error } = useSelector((state: RootState) => state.orders);
  const { items: products, status: productsStatus } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts(undefined));
    }
  }, [productsStatus, dispatch]);

  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    }
  }, [initialId]);

  const handleSearch = (id: string = orderId) => {
    if (!id) return;
    setHasSearched(true);
    dispatch(trackOrder(id));
  };

  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : productId;
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pt-4">
      {/* Search Bar */}
      <div className="flex gap-4 mb-4">
        <input 
          type="text" 
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Введите номер заказа"
          className="bg-[#e5e7eb] rounded-xl px-6 py-3 text-xl w-[320px] outline-none"
        />
        <button 
          onClick={() => handleSearch()}
          disabled={status === 'loading'}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-black px-12 py-3 rounded-full text-xl transition-colors shadow-sm"
        >
          {status === 'loading' ? 'Поиск...' : 'Поиск'}
        </button>
      </div>

      {hasSearched && status === 'loading' && <div className="text-xl">Ищем заказ...</div>}
      {hasSearched && status === 'failed' && <div className="text-xl text-red-500">Ошибка: {error}</div>}
      
      {hasSearched && status === 'succeeded' && order && (
        <div className="bg-[#e5e7eb] rounded-2xl p-8 md:p-10 flex flex-col gap-6 w-full max-w-3xl">
          <h2 className="text-3xl text-black">Заказ {order.order_number}</h2>
          
          <div className="flex gap-16 text-2xl text-black">
            <span>Статус</span>
            <span>{order.state || order.order_state}</span>
          </div>
          
          <div>
            <h3 className="text-2xl text-black mb-4">Лампочки в заказе:</h3>
            <div className="text-2xl text-black flex flex-col gap-2">
              {order.items?.map((item: any) => (
                <div key={item.id}>{getProductName(item.product_id)} - {item.quantity} шт</div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl text-black mb-4">Комментарий к заказу:</h3>
            <div className="bg-white rounded-2xl p-6 text-2xl text-black shadow-sm min-h-[120px]">
              Заказ принят. Если есть вопросы звоните:<br />
              +7(912)666-66-66
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
