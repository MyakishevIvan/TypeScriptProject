import {UserFactory} from "./UserFactory";
import {OrderBuilder} from "./OrderBuilder";
import {ProductFactory} from "./ProductFactory";
import {UserRepository} from "./UserRepository";
import {ProductRepository} from "./ProductRepository";
import {OrderBuilderFactory} from "./OrderBuilderFactory";
import {TestDataService} from "./TestDataService";
import {User} from "./Models";
import {Product} from "./Models";


const userFactory = new UserFactory();
const productFactory = new ProductFactory();
const userRepository = new UserRepository();
const productRepository = new ProductRepository();
const orderBuilderFactory = new OrderBuilderFactory();
const testDataService = new TestDataService(
    userFactory,
    productFactory,
    userRepository,
    productRepository,
    orderBuilderFactory
);

const user1:User  = testDataService.createUser();
const user2:User  = testDataService.createUser()

const product1:Product = testDataService.createProduct();
const product2:Product = testDataService.createProduct();
const product3:Product = testDataService.createProduct();

const order = testDataService.createOrder(
    1,
    [
        { productId: 2, quantity: 2 },
        { productId: 2, quantity: 3 }
    ]
);

console.log(order);