import { useSearchParams, useNavigate } from 'react-router-dom';

export function OrderSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center pt-20 w-full px-4">
      <div className="bg-[#e5e7eb] rounded-3xl p-10 md:p-14 flex flex-col items-center w-full max-w-xl text-center">
        <h1 className="text-3xl text-black mb-8">Ваш заказ</h1>
        <div className="bg-white px-8 py-3 rounded-xl text-2xl text-black mb-12 w-full max-w-xs shadow-sm">
          {orderId || '11188621478'}
        </div>
        <button 
          onClick={() => navigate(`/track?id=${orderId || '11188621478'}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-xl transition-colors w-full shadow-sm"
        >
          Отследить заказ
        </button>
      </div>
    </div>
  );
}
