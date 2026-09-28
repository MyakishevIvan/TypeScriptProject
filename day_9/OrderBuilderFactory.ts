import {OrderBuilder} from "./OrderBuilder";

export class OrderBuilderFactory {
    private orderId: number = 0

    create(): OrderBuilder {
        this.orderId++
        return new OrderBuilder(this.orderId)
    }
}