export interface Product {
    id: string;
    name: string;
    price: number;
    socket: string;
    power: number;
    color_temperature: number;
    type: string;
    description: string;
    quantity: number;
    rating?: number;
}
