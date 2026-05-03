import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ClientLayout } from './components/layout/ClientLayout';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { PreOrderPage } from './pages/PreOrderPage';
import { ConstructorPage } from './pages/ConstructorPage';

export default function App() {
    return (
        <CartProvider>
            <Routes>
                <Route path="/" element={<ClientLayout />}>
                    <Route index element={<CatalogPage />} />
                    <Route path="product/:id" element={<ProductPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="order-success" element={<OrderSuccessPage />} />
                    <Route path="track" element={<TrackOrderPage />} />
                    <Route path="preorder" element={<PreOrderPage />} />
                    <Route path="constructor" element={<ConstructorPage />} />
                    <Route path="*" element={
                        <div className="text-center py-24">
                            <h1 className="text-4xl font-normal mb-4 text-black">404 - Страница не найдена</h1>
                        </div>
                    } />
                </Route>
            </Routes>
        </CartProvider>
    );
}
