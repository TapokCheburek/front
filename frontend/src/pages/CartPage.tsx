import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { createOrder } from '../store/ordersSlice';
import { AppDispatch, RootState } from '../store';

export function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderStatus = useSelector((state: RootState) => state.orders.status);
  
  const [deliveryType, setDeliveryType] = useState('самовывоз');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleOrder = async () => {
    if (cartItems.length > 0) {
      const orderData = {
        phone_number: phone || 'unknown',
        user_name: name || 'unknown',
        delivery_type: deliveryType,
        address: deliveryType === 'Доставка' ? address : 'Самовывоз',
        comment: '',
        order_state: 'created',
        state: 'Новый',
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        }))
      };

      try {
        const result = await dispatch(createOrder(orderData)).unwrap();
        dispatch(clearCart());
        navigate(`/order-success?id=${result.order_number}`);
      } catch (e) {
        console.error('Failed to create order', e);
        alert('Failed to create order. See console for details.');
      }
    }
  };

  const handleQuantityIncrease = (id: string, currentQuanity: number) => {
    dispatch(updateQuantity({ id, quantity: currentQuanity + 1 }));
  }
  
  const handleQuantityDecrease = (id: string, currentQuanity: number) => {
    dispatch(updateQuantity({ id, quantity: currentQuanity - 1 }));
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center py-24">
        <h1 className="text-3xl font-normal mb-8 text-black">Корзина пуста</h1>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-black px-8 py-3 rounded-lg text-lg transition-colors"
        >
          Вернуться в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Cart Items */}
      {cartItems.map(item => (
        <div key={item.id} className="bg-[#e5e7eb] rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-xl md:text-2xl text-black">{item.name}</div>
          <div className="flex items-center gap-4">
            <button className="text-xl text-gray-600 mr-2 hover:text-black" onClick={() => handleQuantityDecrease(item.id, item.quantity)}>-</button>
            <div className="bg-white rounded-lg px-4 py-2 text-xl text-black shadow-sm min-w-[100px] text-center font-normal flex justify-center items-center">
              <span>{item.quantity} шт</span>
            </div>
            <button className="text-xl text-gray-600 ml-2 hover:text-black" onClick={() => handleQuantityIncrease(item.id, item.quantity)}>+</button>
            <div className="bg-white rounded-lg px-6 py-2 text-xl text-black shadow-sm min-w-[120px] text-center font-normal">
              {item.price * item.quantity} р
            </div>
            <button 
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-black hover:text-red-500 ml-2"
            >
              <Trash2 className="w-8 h-8" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      ))}

      <div className="h-px bg-gray-300 w-full my-4"></div>

      {/* Order Form */}
      <div className="bg-[#e5e7eb] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12">
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-lg p-3 relative shadow-sm h-[52px]">
            <select 
              value={deliveryType}
              onChange={(e) => setDeliveryType(e.target.value)}
              className="w-full h-full bg-transparent outline-none text-lg appearance-none cursor-pointer absolute inset-0 px-4"
            >
               <option value="самовывоз">Пункт самовывоза</option>
               <option value="Доставка">Доставка</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
          </div>
          <input 
            type="text" 
            placeholder="Введите телефон" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-white rounded-lg px-4 h-[52px] text-lg outline-none shadow-sm placeholder-gray-500"
          />
          <input 
            type="text" 
            placeholder="Введите имя" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white rounded-lg px-4 h-[52px] text-lg outline-none shadow-sm placeholder-gray-500"
          />
        </div>
        <div className="flex-1">
          <input 
            type="text" 
            placeholder="Москва, ул. Какая-то, д. N" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-white rounded-lg px-4 h-[52px] text-lg outline-none shadow-sm placeholder-gray-500"
          />
        </div>
      </div>

      {/* Checkout Section */}
      <div className="bg-[#e5e7eb] rounded-2xl p-6 md:p-8 flex items-center justify-between mt-2">
        <div className="text-xl md:text-2xl text-black">К оплате</div>
        <div className="text-xl md:text-2xl text-black">{totalPrice} р</div>
      </div>

      <button 
        disabled={orderStatus === 'loading'}
        onClick={handleOrder}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-black py-4 rounded-lg text-xl uppercase transition-colors shadow-sm"
      >
        {orderStatus === 'loading' ? 'Оформление...' : 'ЗАКАЗАТЬ'}
      </button>
    </div>
  );
}
