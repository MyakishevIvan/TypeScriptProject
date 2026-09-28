import {Product} from "./Models";
import {Repository} from "./Repository";

export class ProductRepository implements Repository<Product> {
    private products: Product[] = [];

    add(product: Product): void {
        this.products.push(product);
    }

    get(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
    }

    getAll(): Product[] {
        return this.products;
    }


}