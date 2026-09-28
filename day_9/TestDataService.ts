import {UserFactory} from "./UserFactory";
import {ProductFactory} from "./ProductFactory";
import {UserRepository} from "./UserRepository";
import {ProductRepository} from "./ProductRepository";
import {OrderBuilderFactory} from "./OrderBuilderFactory";
import {Order, OrderItem, Product, User} from "./Models";

export class TestDataService {
    constructor(private userFactory: UserFactory,
                private productFactory: ProductFactory,
                private userRepository: UserRepository,
                private productRepository: ProductRepository,
                private orderFactory: OrderBuilderFactory
    ) {}

    createUser():User {
        const user = this.userFactory.create();
        this.userRepository.add(user);
        return user;
    }

    createProduct(): Product {
        const product = this.productFactory.create();
        this.productRepository.add(product);
        return product;
    }

    createOrder(userId: number, productsValue: {productId: number, quantity: number}[]):Order {
        const user = this.userRepository.get(userId);
        if (!user) {
            throw new Error("User not found");
        }
        let products: Product[] = []
        for (const item of productsValue) {
            for (let i = 0; i < item.quantity; i++) {
                const newProduct = this.productRepository.get(item.productId);
                if (!newProduct) {
                    throw new Error("Product not found");
                }
                products.push(newProduct);
            }
        }
        const orderBuilder = this.orderFactory.create();
        return orderBuilder.
        addProducts(products).
        setUser(user).
        built()

    }
}