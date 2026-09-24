import {Product} from "./Product";
import {ProductCategory} from "./ProductCategory";
import {totalmem} from "node:os";

class ProductManager {
    private products: Product[] = []

    addProduct(product: Product) {
        const result = this.products.find((result) => result.id === product.id);
        if (!result) {
            this.products.push(product);
        } else {
            throw new Error("Products already exist with same id " + product.id);
        }
    }

    findProduct(id: number): Product {
        const result = this.products.find((result) => result.id === id);
        if (!result) {
            throw new Error("The product does not exist with  id " + id);
        }
        return result;
    }

    removeProduct(id: number) {
        const result = this.findProduct(id);
        this.products = this.products.filter((product) => result.id !== product.id)
    }

    getProductByCategory(category: ProductCategory) {
        return this.products.filter((product) => product.category === category);
    }

    getTotalStock(): number {
        return this.products.reduce((total, item) =>
            (total + item.stock), 0);
    }

    getProductDescription(productId: number): string {
        const result = this.products.find((result) => result.id === productId);
        return result?.description ?? "No description";
    }
}