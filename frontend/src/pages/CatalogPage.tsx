import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { fetchProducts } from '../store/productsSlice';
import { AppDispatch, RootState } from '../store';

export function CatalogPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, status, error } = useSelector((state: RootState) => state.products);
  
  const [searchQuery, setSearchQuery] = useState('');

  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minPower: '',
    maxPower: '',
    lampType: '',
    baseType: '',
    inStock: false,
  });

  const [initialOptions, setInitialOptions] = useState<{lampTypes: string[], baseTypes: string[]}>({
    lampTypes: [],
    baseTypes: [],
  });
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts(undefined)).then((result) => {
        if (fetchProducts.fulfilled.match(result)) {
           const prods = result.payload;
           const lamps = Array.from(new Set<string>(prods.map((p: any) => p.type).filter(Boolean)));
           const bases = Array.from(new Set<string>(prods.map((p: any) => p.socket).filter(Boolean)));
           setInitialOptions({ lampTypes: lamps, baseTypes: bases });
        }
      });
    }
  }, [status, dispatch]);

  const handleApplyFilter = () => {
    dispatch(fetchProducts(filters));
  };

  const filteredProducts = products.filter(p => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

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
                <input 
                  type="number" 
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                  className="w-20 bg-white rounded-md px-2 py-1 outline-none max-w-full text-black" 
                />
                <span className="text-lg">До</span>
                <input 
                  type="number" 
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  className="w-20 bg-white rounded-md px-2 py-1 outline-none text-black" 
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-normal mb-3 text-black">Мощность</h3>
              <div className="flex items-center gap-4">
                <span className="text-lg">От</span>
                <input 
                  type="number" 
                  value={filters.minPower}
                  onChange={(e) => setFilters({...filters, minPower: e.target.value})}
                  className="w-20 bg-white rounded-md px-2 py-1 outline-none max-w-full text-black" 
                />
                <span className="text-lg">До</span>
                <input 
                  type="number" 
                  value={filters.maxPower}
                  onChange={(e) => setFilters({...filters, maxPower: e.target.value})}
                  className="w-20 bg-white rounded-md px-2 py-1 outline-none text-black" 
                />
              </div>
            </div>

            <div className="mb-6">
               <select 
                value={filters.lampType}
                onChange={(e) => setFilters({...filters, lampType: e.target.value})}
                className="w-full bg-white rounded-3xl px-4 py-2 text-lg outline-none appearance-none cursor-pointer text-black"
               >
                  <option>Тип лампочки</option>
                  {initialOptions.lampTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
               </select>
            </div>

            <div className="mb-6">
               <select 
                value={filters.baseType}
                onChange={(e) => setFilters({...filters, baseType: e.target.value})}
                className="w-full bg-white rounded-3xl px-4 py-2 text-lg outline-none appearance-none cursor-pointer text-black"
               >
                  <option>Тип цоколя</option>
                  {initialOptions.baseTypes.map(base => (
                    <option key={base} value={base}>{base}</option>
                  ))}
               </select>
            </div>

            <div className="mb-8 flex items-center justify-between">
              <span className="text-lg text-black">Есть в наличии</span>
              <input 
                type="checkbox" 
                checked={filters.inStock}
                onChange={(e) => setFilters({...filters, inStock: e.target.checked})}
                className="w-6 h-6 border-0 rounded bg-white accent-white cursor-pointer" 
              />
            </div>

            <button 
              onClick={handleApplyFilter}
              className="bg-blue-500 hover:bg-blue-600 text-black py-3 px-8 rounded-lg text-lg uppercase font-normal transition-colors"
            >
              ПРИМЕНИТЬ
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 bg-[#f3f4f6] rounded-2xl p-6">
          {status === 'loading' && <div className="text-center text-xl pt-10">Загрузка товаров...</div>}
          {status === 'failed' && <div className="text-center text-xl text-red-500 pt-10">Ошибка: {error}</div>}
          {status === 'succeeded' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
              {filteredProducts.length === 0 && <div className="col-span-full text-center text-gray-500 text-xl pt-10">Товары не найдены</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
