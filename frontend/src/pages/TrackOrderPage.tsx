import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function TrackOrderPage() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const [orderId, setOrderId] = useState(initialId);
  const [searchQuery, setSearchQuery] = useState(initialId);

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
          onClick={() => setSearchQuery(orderId)}
          className="bg-blue-500 hover:bg-blue-600 text-black px-12 py-3 rounded-full text-xl transition-colors shadow-sm"
        >
          Поиск
        </button>
      </div>

      {searchQuery && (
        <div className="bg-[#e5e7eb] rounded-2xl p-8 md:p-10 flex flex-col gap-6 w-full max-w-3xl">
          <h2 className="text-3xl text-black">Заказ {searchQuery}</h2>
          
          <div className="flex gap-16 text-2xl text-black">
            <span>Статус</span>
            <span>Принят</span>
          </div>
          
          <div>
            <h3 className="text-2xl text-black mb-4">Лампочки в заказе:</h3>
            <div className="text-2xl text-black flex flex-col gap-2">
              <div>Самая крутая лампочка 1 - 5 шт</div>
              <div>Самая крутая лампочка 2 - 10 шт</div>
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
