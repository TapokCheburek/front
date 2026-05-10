import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export function Header() {
    const location = useLocation();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="w-full bg-[#f3f4f6]">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link to="/" className="text-2xl font-normal text-black tracking-wide uppercase">
                    ЛАМПОЧКИ ТУТ
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-lg font-normal text-black">
                    {location.pathname !== '/' && (
                        <Link to="/" className="hover:opacity-70 transition-opacity">Каталог</Link>
                    )}
                    <Link to="/constructor" className="hover:opacity-70 transition-opacity">Конструктор лампочек</Link>
                    <Link to="/preorder" className="hover:opacity-70 transition-opacity">Оформить предзаказ</Link>
                </nav>

                <div className="flex items-center">
                    <Link to="/cart" className="text-black hover:opacity-70 transition-opacity relative">
                        <ShoppingCart className="w-8 h-8" strokeWidth={1.5} />
                        {totalItems > 0 && (
                            <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {totalItems}
                            </div>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
