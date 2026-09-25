import {InMemoryRepository} from "./InMemoryRepository";
import {Product} from "./Product";
import {getProperty, updateProperty} from "./GenericUtils";
import {UserRole} from "../day_1/UserRole";

const productRepository = new InMemoryRepository<Product>;
productRepository.add({id: 1, name: "str", price: 123})
// console.log(productRepository.getAll())
// console.log(getProperty({id: 1, name: "str", price: 123}, "name"))
type UserRoleMap = Record<UserRole, number>;

console.log(updateProperty({id: 1, name: "str", price: 123}, "name", "text"))
