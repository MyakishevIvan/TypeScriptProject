export interface User {
    id: number;
    userName: string;
}

export interface Product {
    id: number;
    productName: string;
    price: number;
}

export interface OrderItem {
    productId: number;
    quantity: number;
}

export interface Order {
    id: number;
    userId: number;
    items: OrderItem[];
    total: number;
}