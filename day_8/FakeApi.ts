import {User, Product, OrderItem, Order} from "./Models";
import {ApiClient} from "./ApiClient";

export class FakeApi {

    constructor(private api: ApiClient) {
    }

    products: Product[] = [
        {id: 1, productName: "product1", price: 1234},
        {id: 2, productName: "product2", price: 11}
    ]

    users: User[] = [
        {id: 1, userName: "Ivan"},
        {id: 2, userName: "Fedya"},
        {id: 3, userName: "Ira"},
    ]


    async getUser(id: number): Promise<User | undefined> {
        const result = this.users.find(user => user.id === id);
        return await this.api.get<User | undefined>(result)
    }

    async getProduct(id: number): Promise<Product | undefined> {
        const result = this.products.find(product => product.id === id);
        return await this.api.get<Product | undefined>(result)
    }

    async createOrder(userId: number, items: OrderItem[]): Promise<Order> {
        const order: Order = {
            id: 1,
            userId: userId,
            items: items,
            total: items.length
        }

        return await this.api.post<Order>(order);
    }
}