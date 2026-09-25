# Day 6 — Generics + Type Safety

## Цель

Научиться использовать Generics в функциях, интерфейсах, классах и методах, сохраняя строгую типизацию.

## Part 1 — Generic functions

Создай `day_6/1/GenericUtils.ts`.

### 1. `identity`

```ts
function identity<T>(value: T): T
```

Возвращает переданное значение.

Проверь на `string`, `number`, объекте и массиве.

### 2. `pair`

```ts
function pair<T, U>(first: T, second: U): [T, U]
```

Например:

```ts
pair("Ivan", 29)
```

Результат должен иметь тип `[string, number]`.

---

## Part 2 — Generic interface + class

Создай:

```ts
interface Repository<T> {
    add(item: T): void;
    getById(id: number): T | undefined;
    getAll(): T[];
    remove(id: number): boolean;
}
```

И:

```ts
class InMemoryRepository<T extends { id: number }> implements Repository<T>
```

Внутри:

```ts
private items: T[] = [];
```

Реализуй все методы.

- `add()` добавляет объект.
- `getById()` ищет по `id`.
- `getAll()` возвращает все объекты.
- `remove()` удаляет объект и возвращает `true/false`.
- Не использовать `any`.

Создай минимум два типа, например:

```ts
interface Product {
    id: number;
    name: string;
    price: number;
}

interface Order {
    id: number;
    total: number;
}
```

Используй отдельный repository для `Product` и `Order`.

---

## Part 3 — Generic constraints

Создай:

```ts
function getById<T extends { id: number }>(
    items: T[],
    id: number
): T | undefined
```

Функция должна находить объект по `id`.

Проверь её на разных типах объектов.

---

## Part 4 — `keyof` и `T[K]`

Создай:

```ts
function getProperty<T, K extends keyof T>(
    object: T,
    key: K
): T[K]
```

Примеры:

```ts
const name = getProperty(product, "name");
// string

const price = getProperty(product, "price");
// number
```

Проверь, что TypeScript не позволяет передать несуществующий ключ.

---

## Part 5 — Utility Types

Создай `day_6/5/UserTypes.ts`.

Используй существующий `User`.

### 1. `UserUpdate`

Через `Partial` сделай все поля необязательными:

```ts
type UserUpdate = Partial<User>;
```

### 2. `ReadonlyUser`

Через `Readonly` запрети изменение полей:

```ts
type ReadonlyUser = Readonly<User>;
```

Проверь ошибку при попытке изменить поле.

### 3. `UserCredentials`

Через `Pick` оставь только:

- `id`
- `email`

### 4. `UserWithoutContact`

Через `Omit` убери:

- `email`
- `phone`

### 5. `RequiredUser`

Через `Required` сделай все поля обязательными.

### 6. `UserRoleMap`

Через `Record` создай:

```ts
type UserRoleMap = Record<UserRole, number>;
```

Создай объект с количеством пользователей каждой роли.

---

## Part 6 — Generic utility для обновления

Создай:

```ts
function updateProperty<T, K extends keyof T>(
    object: T,
    key: K,
    value: T[K]
): void
```

Она должна менять указанное свойство.

Примеры:

```ts
updateProperty(user, "name", "Alex");
updateProperty(user, "isActive", false);
```

Следующее должно давать ошибку TypeScript:

```ts
updateProperty(user, "name", 123);
updateProperty(user, "isActive", "yes");
```

---

## Part 7 — Финальная задача

Создай `ProductRepository`.

Используй:

```ts
interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}
```

Используй свой `InMemoryRepository<Product>`.

Добавь generic-метод:

```ts
findByProperty<K extends keyof Product>(
    key: K,
    value: Product[K]
): Product[]
```

Он должен возвращать продукты, у которых указанное свойство равно переданному значению.

Примеры:

```ts
findByProperty("name", "iPhone");
findByProperty("price", 1000);
findByProperty("category", "phone");
```

Неправильные типы должны отлавливаться TypeScript:

```ts
findByProperty("price", "1000"); // ошибка
findByProperty("name", 123);     // ошибка
```

---

## Что должно быть освоено после Day 6

- Generics и `<T>`
- несколько generic-параметров
- generic functions
- generic interfaces
- generic classes
- generic constraints через `extends`
- `keyof`
- `T[K]`
- `K extends keyof T`
- `Partial`
- `Required`
- `Readonly`
- `Pick`
- `Omit`
- `Record`
- типобезопасное переиспользование кода

## Ограничения

- Не использовать `any`.
- Не использовать `@ts-ignore`.
- Не дублировать Repository для каждого типа.
- Основная цель — типобезопасность, а не количество кода.
