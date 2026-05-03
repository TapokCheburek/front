import { useState } from 'react';
import { mockProducts } from '../data/mock';
import { ProductCard } from '../components/ProductCard/ProductCard';

export function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col gap-6">
      {/* Search Bar */}
      <div className="w-full flex">
        <div className="flex-1 bg-[#e5e7eb] rounded-xl flex items-center py-3 px-6">
          <input
            type="text"
            placeholder="ПОИСК"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent w-full outline-none text-lg text-black placeholder:text-gray-600 uppercase"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-[300px] flex-shrink-0">
          <div className="bg-[#e5e7eb] rounded-2xl p-6">
            <h2 className="text-xl font-normal mb-6 text-black">Фильтры</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-normal mb-3 text-black">Цена</h3>
              <div className="flex items-center gap-4">
                <span className="text-lg">От</span>
                <input type="number" className="w-20 bg-white rounded-md px-2 py-1 outline-none max-w-full" />
                <span className="text-lg">До</span>
                <input type="number" className="w-20 bg-white rounded-md px-2 py-1 outline-none" />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-normal mb-3 text-black">Мощность</h3>
              <div className="flex items-center gap-4">
                <span className="text-lg">От</span>
                <input type="number" className="w-20 bg-white rounded-md px-2 py-1 outline-none max-w-full" />
                <span className="text-lg">До</span>
                <input type="number" className="w-20 bg-white rounded-md px-2 py-1 outline-none" />
              </div>
            </div>

            <div className="mb-6">
               <select className="w-full bg-white rounded-3xl px-4 py-2 text-lg outline-none appearance-none cursor-pointer">
                  <option>Тип лампочки</option>
               </select>
            </div>

            <div className="mb-6">
               <select className="w-full bg-white rounded-3xl px-4 py-2 text-lg outline-none appearance-none cursor-pointer">
                  <option>Тип цоколя</option>
               </select>
            </div>

            <div className="mb-8 flex items-center justify-between">
              <span className="text-lg text-black">Есть в наличии</span>
              <input type="checkbox" className="w-6 h-6 border-0 rounded bg-white accent-white cursor-pointer" />
            </div>

            <button className="bg-blue-500 hover:bg-blue-600 text-black py-3 px-8 rounded-lg text-lg uppercase font-normal transition-colors">
              ПРИМЕНИТЬ
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 bg-[#f3f4f6] rounded-2xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
