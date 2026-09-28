export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
}

export interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    userId: number;
    items: OrderItem[];
    total: number;
}