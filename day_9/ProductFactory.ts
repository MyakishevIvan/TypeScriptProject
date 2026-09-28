import {Product} from "./Models";

export class ProductFactory {
    private id: number = 0

    create(): Product {
        return {
            id: this.id++,
            name: "Name" + this.id,
            price: this.id * 1000
        }
    }
}