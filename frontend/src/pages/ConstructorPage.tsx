import { useState } from 'react';

export function ConstructorPage() {
  const [quantity, setQuantity] = useState(50);
  const pricePerUnit = 150;
  
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl pt-4">
      <h1 className="text-3xl text-black mb-4">Конструктор лампочек:</h1>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Form Box */}
        <div className="bg-[#e5e7eb] rounded-3xl p-8 flex-1 w-full flex flex-col gap-5">
          <input 
            type="text" 
            placeholder="Введите телефон" 
            className="w-full bg-white rounded-xl px-6 h-14 text-xl outline-none shadow-sm placeholder-gray-500"
          />
          <input 
            type="text" 
            placeholder="Введите имя / наименование компании" 
            className="w-full bg-white rounded-xl px-6 h-14 text-xl outline-none shadow-sm placeholder-gray-500"
          />
          
          {[
            'Выберите тип лампочки',
            'Выберите тип цоколя',
            'Выберите мощность',
            'Выберите температуру света'
          ].map((placeholder, idx) => (
             <div key={idx} className="relative w-full h-14">
               <select className="w-full h-full bg-white rounded-xl px-6 text-xl outline-none shadow-sm appearance-none cursor-pointer text-gray-500">
                  <option value="">{placeholder}</option>
                  <option value="1">Опция 1</option>
                  <option value="2">Опция 2</option>
               </select>
               <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L9 9L17 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
               </div>
             </div>
          ))}
        </div>

        {/* Right Summary Box */}
        <div className="flex flex-col gap-6 w-full md:w-[450px]">
          <div className="bg-[#e5e7eb] rounded-3xl p-8 flex flex-col h-full min-h-[360px]">
            <div className="flex items-center justify-between mb-auto text-2xl text-black">
              <span>Количество</span>
              <input 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-28 bg-white rounded-xl px-4 h-12 text-center text-2xl outline-none shadow-sm"
              />
            </div>
            
            <div className="flex flex-col gap-6 mt-16 text-2xl text-black">
              <div className="flex items-center justify-between">
                <span>Цена за штуку</span>
                <span>{pricePerUnit}р</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Стоимость партии</span>
                <span>{quantity * pricePerUnit}р</span>
              </div>
            </div>
          </div>
          
          <button className="bg-blue-500 hover:bg-blue-600 text-black py-4 rounded-full text-xl self-end px-12 transition-colors shadow-sm w-full sm:w-auto">
            Оформить предзаказ
          </button>
        </div>
      </div>
    </div>
  );
}
