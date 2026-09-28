# Day 9 — Test Data Service: Factory + Builder + Dependency Injection

## Цель

Собрать небольшой рабочий **сервис подготовки тестовых данных для интернет-магазина**.

Сценарий:

```text
Start
  ↓
TestDataService
  ↓
UserFactory / ProductFactory / OrderBuilder
  ↓
Repositories
  ↓
готовые User / Product / Order
```

### Темы дня

- Service Layer
- Dependency Injection
- Factory Pattern
- Builder Pattern
- композиция объектов
- зависимости через интерфейсы
- разделение ответственности

Не используй `instanceof`.

---

## Структура файлов

Создай папку:

```text
day_9/
├── Models.ts
├── Repositories.ts
├── UserFactory.ts
├── ProductFactory.ts
├── OrderBuilder.ts
├── OrderBuilderFactory.ts
├── TestDataService.ts
└── Start.ts
```

---

# 1. Models.ts

Создай модели.

### User

- `id: number`
- `name: string`
- `email: string`

### Product

- `id: number`
- `name: string`
- `price: number`

### OrderItem

- `productId: number`
- `quantity: number`
- `price: number`

### Order

- `id: number`
- `userId: number`
- `items: OrderItem[]`
- `total: number`

---

# 2. Repositories.ts

Создай generic-интерфейс:

```ts
interface Repository<T>
```

Он должен описывать:

- добавление объекта;
- получение объекта по `id`;
- получение всех объектов.

Создай две реализации:

```text
UserRepository
ProductRepository
```

Они хранят данные в памяти.

`UserRepository` работает с `User`.

`ProductRepository` работает с `Product`.

Репозитории не создают объекты и не занимаются логикой заказа.

---

# 3. UserFactory.ts

Создай `UserFactory`.

Factory отвечает только за создание пользователей.

Должен быть метод `create(...)`.

Каждый созданный пользователь получает уникальный `id`.

Factory не сохраняет пользователей в repository.

---

# 4. ProductFactory.ts

Создай `ProductFactory`.

Factory отвечает только за создание товаров.

Должен быть метод `create(...)`.

Каждый созданный товар получает уникальный `id`.

Factory не сохраняет товары в repository.

---

# 5. OrderBuilder.ts

Создай `OrderBuilder`.

Builder должен позволять собрать заказ постепенно.

Минимальный сценарий:

```text
new OrderBuilder(...)
    .setUser(...)
    .addProduct(...)
    .addProduct(...)
    .build()
```

Требования:

- пользователь задаётся отдельно;
- товары добавляются по одному;
- для товара можно указать количество;
- `build()` создаёт полноценный `Order`;
- `total` рассчитывается автоматически;
- нельзя создать заказ без пользователя;
- нельзя создать заказ без товаров.

Builder не работает с repository.

---

# 6. OrderBuilderFactory.ts

Создай `OrderBuilderFactory`.

Её задача — создавать **новый экземпляр `OrderBuilder` для каждого нового заказа**.

Должен быть метод:

```text
create()
```

Он возвращает новый `OrderBuilder`.

Это нужно потому, что `OrderBuilder` хранит состояние собираемого заказа. Один и тот же экземпляр нельзя безопасно использовать для разных заказов.

Factory не создаёт `Order`, а только новый `OrderBuilder`.

---

# 7. TestDataService.ts

Создай `TestDataService`.

Это главный сервис дня.

Он получает через constructor:

- `UserFactory`
- `ProductFactory`
- `UserRepository`
- `ProductRepository`
- `OrderBuilderFactory`

Не создавай эти зависимости внутри `TestDataService`.

## createUser

Создаёт пользователя через `UserFactory`, затем сохраняет его через `UserRepository`.

Возвращает созданного пользователя.

## createProduct

Создаёт товар через `ProductFactory`, затем сохраняет его через `ProductRepository`.

Возвращает созданный товар.

## createOrder

Метод получает:

- `userId`;
- список товаров с количеством.

Например:

```ts
createOrder(
    userId,
    [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 }
    ]
)
```

Логика:

1. Найти пользователя через `UserRepository`.
2. Если пользователь не найден — выбросить ошибку.
3. Найти каждый товар через `ProductRepository`.
4. Если товар не найден — выбросить ошибку.
5. Получить новый `OrderBuilder` через `OrderBuilderFactory`.
6. Передать найденные данные в `OrderBuilder`.
7. Собрать `Order`.
8. Вернуть `Order`.

`TestDataService` не рассчитывает `total` самостоятельно.

---

# 8. Start.ts

Здесь собери весь объектный граф приложения.

Создай:

- `UserFactory`;
- `ProductFactory`;
- `UserRepository`;
- `ProductRepository`;
- `OrderBuilderFactory`;
- `TestDataService`.

Передай все эти зависимости в `TestDataService`.

Затем создай минимум:

- 2 пользователей;
- 3 товара.

После этого создай заказ для одного пользователя минимум из двух разных товаров.

Выведи:

```text
User
Products
Order
Order total
```

---

# Финальный результат

После запуска должна получиться примерно такая последовательность:

```text
Create dependencies
      ↓
Create TestDataService
      ↓
Create users
      ↓
Create products
      ↓
Create order
      ↓
Print result
```

Пример:

```text
User:
Ivan, ivan@test.com

Products:
Laptop — 1000
Mouse — 50
Keyboard — 100

Order:
User: Ivan

Items:
Laptop x2 = 2000
Mouse x1 = 50

Total: 2050
```

---

# Обязательные проверки

В `Start.ts` проверь следующие случаи.

### 1. Несуществующий пользователь

Попробуй создать заказ с `userId`, которого нет в `UserRepository`.

Ожидается ошибка.

### 2. Несуществующий товар

Создай заказ с `productId`, которого нет в `ProductRepository`.

Ожидается ошибка.

### 3. Пустой заказ

Попробуй вызвать `build()` без товаров.

Ожидается ошибка.

### 4. Заказ без пользователя

Попробуй вызвать `build()` без пользователя.

Ожидается ошибка.

---

# Ограничения

Ответственность должна быть разделена:

```text
Factory
→ создание объектов

Repository
→ хранение и получение объектов

Builder
→ пошаговая сборка Order

Service
→ координация нескольких компонентов
```

`TestDataService` не должен создавать зависимости через `new` внутри себя.

Все зависимости `TestDataService` должны приходить через constructor.

---

# Результат обучения

После задания ты должен понимать:

- зачем нужен Service Layer;
- что такое Dependency Injection;
- чем Factory отличается от обычного `new`;
- зачем нужен Builder;
- чем Builder отличается от Factory;
- как несколько компонентов объединяются в один сервис;
- зачем разделять ответственность между классами.

Главный результат дня — **рабочий `TestDataService`, который через Factory + Repository + Builder создаёт связанные тестовые данные и готовый заказ.**
