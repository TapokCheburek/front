import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Product } from '../../types';
import { addToCart } from '../../store/cartSlice';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();
    const inStock = product.quantity > 0;
    const rating = product.rating || 5.0; // Mock rating if not present

    const handleAddToCart = () => {
        if (inStock) {
            dispatch(addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                stock: product.quantity,
            }));
        }
    };

    return (
        <div className="flex flex-col bg-[#e5e7eb] rounded-2xl p-4">
            <Link to={`/product/${product.id}`} className="aspect-square w-full rounded-lg overflow-hidden mb-4 bg-gray-300">
            </Link>

            <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-black">{rating.toFixed(1)}</span>
                    </div>
                    <Link to={`/product/${product.id}`} className="text-lg font-normal text-black hover:underline">
                        {product.name}
                    </Link>
                </div>

                <p className="text-sm text-black mb-4">
                    {inStock ? `В наличии: \u00A0 \u00A0 ${product.quantity}` : 'Нет в наличии'}
                </p>

                <div className="mt-auto">
                    <button
                        onClick={handleAddToCart}
                        disabled={!inStock}
                        className={`w-full py-2.5 rounded-lg font-normal transition-colors text-black ${inStock ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 opacity-80 cursor-not-allowed'}`}
                    >
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    );
}
