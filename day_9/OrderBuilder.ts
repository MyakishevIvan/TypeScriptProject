import {Order, OrderItem, Product, User} from "./Models";


export class OrderBuilder {

    private user?: User
    private items: OrderItem[] = [];

    constructor(private orderId: number) {
    }

    setUser(user: User): OrderBuilder {
        this.user = user;
        return this;
    }

    addProducts(products: Product[]): OrderBuilder {
        for (const item of products) {
            this.addProduct(item);
        }
        return this;
    }

    addProduct(product: Product): void {
        const find = this.items.find(x => x.productId === product.id);
        if (find) {
            find.quantity++
            return
        }

        this.items.push({
            productId: product.id,
            quantity: 1,
            price: product.price,
        });
    }

    built(): Order {
        if (!this.user) {
            throw new Error("User not§ exists");
        }
        if (!this.items) {
            throw new Error("No items supplied");
        }
        return {
            id: this.orderId,
            userId: this.user?.id,
            items: this.items,
            total: this.items.reduce((sum, item) => sum + item.price, 0)
        };
    }
}