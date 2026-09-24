import {CartItem} from "./CartItem";
import {Product} from "./Product";

class ShoppingCart {
    private cartItems: CartItem[] = [];

    addProduct(product: Product, quantity: number) {
        if (quantity <= 0) {
            throw new Error("Quantity must be a positive integer");
        }
        if (quantity > product.stock) {
            throw new Error("Quantity must be less than stock value");
        }
        try {
            const existedItem = this.findProductById(product.id);
            existedItem.quantity += quantity
        } catch (err) {
            this.cartItems.push({product, quantity});
        }
    }

    removeProduct(productId: number) {
        this.findProductById(productId);
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    }

    updateQuantity(productId: number, quantity: number) {
        const cartItem = this.findProductById(productId);
        if (quantity <= 0) {
            throw new Error("Quantity must be a positive integer");
        }
        if (quantity > cartItem.product.stock) {
            throw new Error("Quantity must be less than stock value");
        }
        cartItem.quantity = quantity
    }

    findProductById(productId: number): CartItem {
        const existedItem = this.cartItems.find(item => item.product.id == productId);
        if (!existedItem) {
            throw new Error("Item does not exist with id " + productId);
        }
        return existedItem
    }

    getTotalPrice():number {
        return this.cartItems.reduce((total, item) =>
            total + (item.quantity * item.product.price), 0);
    }

    getProductNames(): string[] {
        return this.cartItems.map(result=> result.product.name);
    }
}