export function PreOrderPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl pt-4">
      <div className="mb-4">
        <h1 className="text-3xl text-black leading-snug">
          Не нашли нужную лампочку?<br />
          Заполните форму и мы сделаем лампочку для вас:
        </h1>
      </div>

      <div className="bg-[#e5e7eb] rounded-3xl p-8 md:p-12 flex flex-col gap-6 w-full lg:w-3/4">
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
        <textarea 
          placeholder="Описание заказа" 
          className="w-full bg-white rounded-xl px-6 py-4 min-h-[200px] text-xl outline-none shadow-sm placeholder-gray-500 resize-none"
        ></textarea>
        
        <div className="mt-2 text-black text-lg">
          Администратор позвонит в течение 15 минут
        </div>
        
        <button className="bg-blue-500 hover:bg-blue-600 text-black py-4 rounded-xl text-xl w-64 self-center mt-2 transition-colors shadow-sm">
          Отправить
        </button>
      </div>
    </div>
  );
}
