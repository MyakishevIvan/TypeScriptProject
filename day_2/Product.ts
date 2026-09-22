import {ProductCategory} from "./ProductCategory";

export class Product {
    id: number
    name: string
    price: number
    stock: number
    description?: string
    readonly createdAt: Date
    category: ProductCategory
    static totalNumbers: number = 0

    constructor(id: number, name: string, price: number, stock: number, description: string, category: ProductCategory) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.category = category;
        this.createdAt = new Date();
        Product.totalNumbers += 1
    }
}