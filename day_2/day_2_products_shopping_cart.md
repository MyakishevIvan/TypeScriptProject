# Day 2 — Products & Shopping Cart

## Цель

Сделать систему товаров и корзину интернет-магазина.

Все перечисленные в конце темы должны использоваться в решении.

---

## 1. `Product`

Создай `Product` со следующими полями:

- `id: number`
- `name: string`
- `price: number`
- `category: ProductCategory`
- `stock: number`
- `description?: string`
- `readonly createdAt: Date`

`createdAt` устанавливается только в constructor и после создания товара изменяться не должен.

---

## 2. `ProductCategory`

Создай `enum`:

```text
enum ProductCategory {
    Electronics,
    Clothing,
    Food
}
```

---

## 3. `ProductManager`

Создай класс с приватным массивом товаров.

### `addProduct(product: Product): void`

- `id` должен быть уникальным;
- если товар с таким `id` уже есть — ошибка;
- товар добавляется только после проверки.

### `removeProduct(id: number): void`

- если товара нет — ошибка;
- если есть — удалить.

### `findProduct(id: number): Product`

- использовать `find`;
- если товар не найден — ошибка.

### `getProductsByCategory(category: ProductCategory): Product[]`

- использовать `filter`.

### `getTotalStock(): number`

- вернуть общее количество товаров на складе;
- использовать `reduce`.

---

## 4. `ShoppingCart`

Создай класс `ShoppingCart`.

Создай интерфейс:

```text
interface CartItem {
    product: Product;
    quantity: number;
}
```

Массив `CartItem[]` должен быть приватным.

---

## 5. Добавление товара в корзину

```text
addProduct(product: Product, quantity: number): void
```

- `quantity` должна быть больше `0`;
- нельзя добавить больше товара, чем есть в `stock`;
- если товар уже есть в корзине — увеличить его `quantity`;
- если товара нет — добавить новый `CartItem`;
- нельзя изменить `product.stock` при добавлении.

---

## 6. Удаление товара

```text
removeProduct(productId: number): void
```

- если товара нет в корзине — ошибка;
- если есть — полностью удалить его;
- использовать `filter`.

---

## 7. Изменение количества

```text
updateQuantity(productId: number, quantity: number): void
```

- товар должен существовать в корзине;
- `quantity > 0`;
- `quantity` не может быть больше `product.stock`;
- если `quantity` невалидна — ошибка;
- существующий `CartItem` должен быть изменён.

---

## 8. Стоимость корзины

```text
getTotalPrice(): number
```

- стоимость = `price × quantity`;
- использовать `reduce`.

---

## 9. Получение названий

```text
getProductNames(): string[]
```

- вернуть названия всех товаров в корзине;
- использовать `map`.

---

## 10. `readonly`

В `Product` должно быть:

```text
readonly createdAt: Date;
```

После создания товара попытка изменить `createdAt` должна приводить к ошибке TypeScript.

---

## 11. `static`

В `Product` добавь:

```text
static totalProducts: number
```

- при создании каждого `Product` увеличивать счётчик;
- удаление товара из `ProductManager` не должно уменьшать счётчик;
- счётчик принадлежит классу, а не отдельному объекту.

---

## 12. Optional chaining и `??`

Добавь:

```text
getProductDescription(productId: number): string
```

- если товар найден — вернуть его `description`;
- если `description` отсутствует — вернуть `"No description"`;
- внутри метода обязательно использовать `?.` и `??`.

---

# Темы Day 2

В решении должны реально использоваться:

- `readonly`
- `static`
- `enum`
- union types
- `map`
- `filter`
- `find`
- `reduce`
- `?.`
- `??`
- классы
- интерфейсы
- композиция (`CartItem` содержит `Product`)

## Правило проверки

Проверка выполняется строго по условиям этого задания. Дополнительных требований, которых нет в ТЗ, добавляться не будет.
