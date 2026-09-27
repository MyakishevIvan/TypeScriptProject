# Day 8 — Async сервис: заказ → API → обработка результата

## Цель дня

Собрать **один работающий сценарий**:

> сервис оформляет заказ → вызывает асинхронный API → получает результат → проверяет его → возвращает результат.

Новые темы:
- `Promise<T>`
- `async/await`
- `Promise.all`
- generic-методы для async-клиента
- `unknown`
- type guard
- `try/catch`
- DTO и внутренняя модель
- последовательные и параллельные async-операции

`ApiResponse<T>` из Day 7 здесь **не повторяем**.

---

## Part 1 — Модели

Создай:

```ts
interface User {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
}

interface OrderItem {
    productId: number;
    quantity: number;
}

interface Order {
    id: number;
    userId: number;
    items: OrderItem[];
    total: number;
}
```

---

## Part 2 — Async API

Создай:

```ts
class FakeApi {
    async getUser(id: number): Promise<User> {
        // вернуть пользователя через Promise
    }

    async getProducts(): Promise<Product[]> {
        // вернуть список товаров через Promise
    }

    async createOrder(
        userId: number,
        items: OrderItem[]
    ): Promise<Order> {
        // создать заказ и вернуть его через Promise
    }
}
```

API должен быть рабочим.

Используй искусственную задержку:

```ts
await new Promise(resolve => setTimeout(resolve, 300));
```

Например, каждый запрос ждёт 300 мс перед возвратом результата.

---

## Part 3 — OrderService

Создай:

```ts
class OrderService {
    constructor(private api: FakeApi) {}

    async createOrder(
        userId: number,
        productIds: number[]
    ): Promise<Order> {
        // ...
    }
}
```

Логика:

1. Получить пользователя.
2. Получить товары.
3. Проверить, что пользователь существует.
4. Найти переданные товары.
5. Для каждого найденного товара создать `OrderItem` с `quantity: 1`.
6. Если какой-то товар не найден — выбросить ошибку.
7. Создать заказ через API.
8. Вернуть заказ.

Вызов:

```ts
const api = new FakeApi();
const orderService = new OrderService(api);

const order = await orderService.createOrder(1, [1, 2]);

console.log(order);
```

---

## Part 4 — Promise.all

Сделай получение пользователя и товаров **параллельным**.

Используй:

```ts
const [user, products] = await Promise.all([
    this.api.getUser(userId),
    this.api.getProducts()
]);
```

Добавь измерение времени:

```ts
const start = Date.now();

const order = await orderService.createOrder(1, [1, 2]);

console.log(order);
console.log(`Time: ${Date.now() - start} ms`);
```

При задержке 300 мс на каждый запрос получение пользователя и товаров должно занимать примерно 300 мс, а не 600 мс.

---

## Part 5 — Generic ApiClient

Вынеси механизм API в отдельный класс:

```ts
class ApiClient {
    async get<T>(data: T, delay: number = 300): Promise<T> {
        // подождать delay миллисекунд
        // вернуть data
    }

    async post<T>(data: T, delay: number = 300): Promise<T> {
        // то же самое
    }
}
```

Теперь `FakeApi` должен использовать `ApiClient`:

```ts
class FakeApi {
    constructor(private client: ApiClient) {}

    async getUser(id: number): Promise<User> {
        // client.get(...)
    }

    async getProducts(): Promise<Product[]> {
        // client.get(...)
    }

    async createOrder(
        userId: number,
        items: OrderItem[]
    ): Promise<Order> {
        // client.post(...)
    }
}
```

Смысл `get<T>(): Promise<T>` — один generic-метод может вернуть `User`, `Product[]`, `Order` и другие типы.

---

## Part 6 — unknown и Type Guard

Добавь:

```ts
function isOrder(value: unknown): value is Order {
    // проверить, что value действительно похож на Order
}
```

Проверить минимум:

- объект существует;
- `id` — number;
- `userId` — number;
- `items` — массив;
- `total` — number.

Используй её после получения данных:

```ts
const result: unknown = await api.createOrder(1, items);

if (!isOrder(result)) {
    throw new Error("Invalid order received from API");
}

console.log(result.total);
```

---

## Part 7 — Ошибки

Обработай ошибки через `try/catch`.

Создай:

```ts
function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    return String(error);
}
```

И используй:

```ts
try {
    const order = await orderService.createOrder(1, [1, 2]);

    console.log("Order created:", order);
} catch (error) {
    console.log(getErrorMessage(error));
}
```

---

# Финальный результат

Цепочка должна выглядеть так:

```text
main
  ↓
OrderService
  ↓
FakeApi
  ↓
ApiClient
  ↓
Promise<T>
```

При запуске программа должна:

1. Параллельно получить пользователя и товары.
2. Собрать `OrderItem[]`.
3. Создать заказ.
4. Получить `Order`.
5. Проверить результат через `isOrder`.
6. Вывести заказ и время выполнения.

Пример:

```text
Order created:
{
    id: 100,
    userId: 1,
    items: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 1 }
    ],
    total: 150
}

Time: 305 ms
```

---

# Дополнительная проверка

Проверь:

### Несуществующий пользователь

```ts
await orderService.createOrder(999, [1, 2]);
```

Должна возникнуть понятная ошибка.

### Несуществующий товар

```ts
await orderService.createOrder(1, [1, 999]);
```

Должна возникнуть понятная ошибка.

---

# Что понять после Day 8

Ты должен уметь объяснить:

- что означает `Promise<User>`;
- зачем нужен `async/await`;
- когда использовать `Promise.all`;
- зачем generic нужен в `get<T>()`;
- почему `unknown` безопаснее `any`;
- что делает type guard `value is Order`;
- зачем разделять `ApiClient`, `FakeApi` и `OrderService`;
- где находится обработка ошибок.

**Главное:** задание — рабочий асинхронный сценарий создания заказа. Type errors используются только как дополнительная проверка, а не как само задание.
