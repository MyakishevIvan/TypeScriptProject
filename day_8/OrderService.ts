import {FakeApi} from "./FakeApi";
import {Order, OrderItem, Product, User} from "./Models";

export class OrderService {

    constructor(private readonly fakeApi: FakeApi) {
    }


    async createOrder(userId: number, productIds: number[]): Promise<Order> {
        const user = await this.fakeApi.getUser(userId);
        if (!user) {
            throw new Error("User not found");
        }
        let orders: OrderItem[] = [];
        for (const productId of productIds) {
            const product = await this.fakeApi.getProduct(productId);
            if (!product) {
                throw new Error("Product not found");
            }
            const order: OrderItem = {productId: product.id, quantity: 1}
            orders.push(order);
        }
        const result = await this.fakeApi.createOrder(userId, orders);
        if (this.isOrder(result)) {
            return result;
        }
        throw new Error("Invalid order received from API");
    }

    isOrder(value: unknown): value is Order {
        return (
            typeof value === "object" &&
            value !== null &&
            "id" in value &&
            typeof value.id === "number" &&
            "products" in value &&
            Array.isArray(value.products)
            //специально не дореализовал
        );
    }
}