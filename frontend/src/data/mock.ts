export interface Review {
  author: string;
  date: string;
  rating: number;
  text: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  priceOpt?: number;
  image: string;
  type: string;
  baseType: string;
  power: string;
  colorTemp: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Самая крутая лампочка 1',
    price: 174,
    priceOpt: 101,
    image: '',
    type: 'Энергосберегающая',
    baseType: 'E27',
    power: '12 Вт',
    colorTemp: '4000 K',
    stock: 100,
    rating: 5.0,
    reviewsCount: 100,
    reviews: [
      {
        author: 'Покупатель 1',
        date: '10.04.2026',
        rating: 5,
        text: 'Самые лучшие лампочки! Всем рекомендую'
      },
      {
        author: 'Рога и копыта',
        date: '16.03.2026',
        rating: 4,
        text: 'Лампы хорошего качества, светят ярко и равномерно. При оптовой закупке цена приятная, но упаковка могла бы быть чуть крепче'
      }
    ]
  },
  {
    id: '2',
    name: 'Лампочка 2',
    price: 101,
    image: '',
    type: 'Светодиодная',
    baseType: 'E14',
    power: '7 Вт',
    colorTemp: '3000 K',
    stock: 50,
    rating: 4.0,
    reviewsCount: 50,
    reviews: []
  },
  {
    id: '3',
    name: 'Лампочка 3',
    price: 300,
    image: '',
    type: 'Умная лампа',
    baseType: 'E27',
    power: '10 Вт',
    colorTemp: 'RGB',
    stock: 0,
    rating: 4.8,
    reviewsCount: 12,
    reviews: []
  },
  {
    id: '4',
    name: 'Лампочка 4',
    price: 150,
    image: '',
    type: 'Светодиодная',
    baseType: 'GU10',
    power: '5 Вт',
    colorTemp: '4000 K',
    stock: 100,
    rating: 5.0,
    reviewsCount: 20,
    reviews: []
  },
  {
    id: '5',
    name: 'Лампочка 5',
    price: 200,
    image: '',
    type: 'Филаментная',
    baseType: 'E27',
    power: '6 Вт',
    colorTemp: '2700 K',
    stock: 66,
    rating: 4.7,
    reviewsCount: 8,
    reviews: []
  },
  {
    id: '6',
    name: 'Лампочка 6',
    price: 120,
    image: '',
    type: 'Галогенная',
    baseType: 'G9',
    power: '35 Вт',
    colorTemp: '3000 K',
    stock: 0,
    rating: 4.9,
    reviewsCount: 3,
    reviews: []
  }
];
