import {FakeApi} from "./FakeApi";
import {OrderService} from "./OrderService";
import {Order} from "./Models";
import {ApiClient} from "./ApiClient";

const client = new ApiClient()
const api = new FakeApi(client);
const orderService = new OrderService(api);


async function main() {
    const start = Date.now();
    const order: Order = await orderService.createOrder(1, [1, 2]);
    console.log(`Time: ${Date.now() - start} ms`);

    console.log(order);
}


main();

