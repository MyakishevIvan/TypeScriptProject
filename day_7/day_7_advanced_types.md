# Day 7 — Advanced TypeScript Types

## Цель

Не делать ещё один CRUD/Repository, а научиться использовать TypeScript как систему вычисления типов.

Новые темы:

- Conditional Types
- Mapped Types
- Template Literal Types
- `infer`
- `Record` в практическом сценарии
- комбинация advanced types

## Part 1 — API Response Type

Создай `day_7/ApiTypes.ts`.

```ts
type Success<T> = {
    status: "success";
    data: T;
};

type Failure = {
    status: "error";
    message: string;
};

type ApiResponse<T> = Success<T> | Failure;
```

Создай:

```ts
function unwrap<T>(response: ApiResponse<T>): T | null
```

Она должна вернуть `data` для success и `null` для error.

## Part 2 — Conditional Type

Создай `day_7/ConditionalTypes.ts`.

```ts
type IsArray<T> = T extends unknown[] ? true : false;
```

Проверь:

```ts
type A = IsArray<string[]>; // true
type B = IsArray<number>;   // false
```

Затем:

```ts
type ElementType<T> = T extends (infer U)[] ? U : T;
```

Проверь:

```ts
type A = ElementType<string[]>; // string
type B = ElementType<number[]>; // number
type C = ElementType<boolean>;  // boolean
```

Главное — понять, что делает `infer`.

## Part 3 — Mapped Type

Создай `day_7/MappedTypes.ts`.

```ts
interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}

type ProductFlags = {
    [K in keyof Product]: boolean;
};
```

Создай объект такого типа.

## Part 4 — Mapped Type с изменением типов

Создай:

```ts
type Stringified<T> = {
    [K in keyof T]: string;
};
```

Для `Product` результат должен иметь те же ключи, но все значения типа `string`.

## Part 5 — Template Literal Types

Создай `day_7/Events.ts`.

```ts
type Entity = "user" | "product" | "order";
type Action = "created" | "updated" | "deleted";

type EventName = `${Entity}.${Action}`;
```

TypeScript должен разрешать только комбинации этих значений.

## Part 6 — Typed Event Handlers

Используй `EventName`:

```ts
type EventHandlers = {
    [E in EventName]?: () => void;
};
```

Создай объект с несколькими обработчиками.

Неизвестные события должны давать ошибку TypeScript.

## Part 7 — Практическая задача: Event Bus

Создай:

```ts
class EventBus {
    private handlers: EventHandlers = {};

    on<E extends EventName>(
        event: E,
        handler: () => void
    ): void {}

    emit<E extends EventName>(
        event: E
    ): void {}
}
```

`on()` сохраняет обработчик.

`emit()` запускает зарегистрированный обработчик.

Например:

```ts
bus.on("user.created", () => {
    console.log("User created");
});

bus.emit("user.created");
```

Нельзя:

```ts
bus.on("user.login", () => {});
```

## Part 8 — Typed Event Payloads

Создай:

```ts
interface EventPayloads {
    "user.created": {
        id: number;
        name: string;
    };

    "user.deleted": {
        id: number;
    };

    "product.created": {
        id: number;
        price: number;
    };
}
```

Создай функцию:

```ts
function emit<E extends keyof EventPayloads>(
    event: E,
    payload: EventPayloads[E]
): void
```

Тип `payload` должен зависеть от события.

Правильно:

```ts
emit("user.created", {
    id: 1,
    name: "Ivan"
});
```

Неправильно:

```ts
emit("user.deleted", {
    name: "Ivan"
});
```

## Part 9 — Финальная задача: Typed Event Bus

Объедини предыдущие части в:

```ts
class TypedEventBus {
    // handlers
    // on()
    // emit()
}
```

### `on`

```ts
bus.on("user.created", payload => {
    console.log(payload.id);
    console.log(payload.name);
});
```

TypeScript должен автоматически знать тип `payload`.

Для:

```ts
bus.on("user.deleted", payload => {
    console.log(payload.id);
});
```

`payload` должен иметь тип:

```ts
{
    id: number;
}
```

### `emit`

```ts
bus.emit("user.created", {
    id: 1,
    name: "Ivan"
});
```

Тип payload должен зависеть от имени события.

## Что должно быть освоено

- Conditional Types
- `infer`
- Mapped Types
- Template Literal Types
- `keyof` в advanced-сценариях
- `T[K]` в advanced-сценариях
- generic event handlers
- зависимость одного generic-типа от другого
- автоматический вывод типов callback-параметров

## Ограничения

- Не использовать `any`.
- Не использовать `@ts-ignore`.
- Не делать Repository, Manager или обычный CRUD.
- Основной упор — на типы и TypeScript inference.
