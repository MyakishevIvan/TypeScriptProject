# Playwright + TypeScript Final Project

## Цель проекта

Финальный учебный проект для закрепления TypeScript и Playwright на практике.

В рамках проекта нужно собрать небольшой UI automation framework с:

- Playwright Test;
- TypeScript;
- Page Object Model;
- custom fixtures;
- test data и моделями;
- несколькими браузерными projects;
- web-first assertions;
- trace и screenshots при падении;
- независимыми UI-тестами.

В качестве тестового приложения используется **SauceDemo**.

---

## Структура проекта

```text
playwright-project/
├── tests/
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   └── checkout.spec.ts
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── models/
│   ├── Credentials.ts
│   └── Product.ts
├── data/
│   └── users.ts
├── fixtures/
│   └── test.ts
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

## 1. Playwright config

В `playwright.config.ts` нужно:

- задать `baseURL` для SauceDemo;
- добавить projects:
  - `chromium`;
  - `firefox`;
- включить:

```ts
trace: "on-first-retry"
screenshot: "only-on-failure"
```

- настроить retries:
  - локально — `0`;
  - CI — `1`.

Для определения CI можно использовать:

```ts
process.env.CI
```

---

## 2. Models

### `Credentials`

```ts
export interface Credentials {
    username: string;
    password: string;
}
```

### `Product`

```ts
export interface Product {
    name: string;
    price: number;
}
```

Типы должны быть экспортированы и импортироваться через `import type`, если используются только как TypeScript-типы.

---

## 3. Test data

В `data/users.ts` создать:

- `standardUser`;
- `lockedUser`.

Оба объекта должны соответствовать `Credentials`.

Логины и пароль взять с учебной страницы SauceDemo.

---

## 4. `LoginPage`

Page Object должен содержать locators:

- username input;
- password input;
- login button;
- error message.

Методы:

```ts
open(): Promise<void>
```

```ts
login(credentials: Credentials): Promise<void>
```

Credentials передаются одним объектом, а не двумя отдельными строковыми параметрами.

---

## 5. `InventoryPage`

Реализовать:

```ts
getProduct(name: string): Locator
```

```ts
addProductToCart(name: string): Promise<void>
```

```ts
openCart(): Promise<void>
```

```ts
getCartBadge(): Locator
```

### Требование к локатору товара

Не использовать `nth()` для выбора конкретного товара.

Нужно найти карточку товара по его имени и выполнять действия внутри найденной карточки.

Концептуально:

```text
product cards
    ↓
filter by product name
    ↓
specific product card
    ↓
Add to cart
```

---

## 6. `CartPage`

Реализовать:

```ts
getProduct(name: string): Locator
```

```ts
checkout(): Promise<void>
```

Тест должен иметь возможность сделать:

```ts
await expect(
    cartPage.getProduct(productName)
).toBeVisible();
```

---

## 7. `CheckoutPage`

Реализовать заполнение customer information.

Рекомендуется создать отдельную модель:

```ts
interface Customer {
    firstName: string;
    lastName: string;
    postalCode: string;
}
```

и использовать:

```ts
fillCustomerInfo(customer: Customer): Promise<void>
```

Также реализовать:

```ts
continue(): Promise<void>
```

```ts
finish(): Promise<void>
```

И locator успешного завершения заказа.

---

## 8. Custom fixtures

Создать `fixtures/test.ts`.

Тип fixtures:

```ts
type AppFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
};
```

Расширить Playwright Test:

```ts
base.extend<AppFixtures>()
```

Page Objects должны создаваться fixtures и передаваться тестам.

Ожидаемый стиль теста:

```ts
test("...", async ({
    loginPage,
    inventoryPage
}) => {
    // ...
});
```

Из fixture-файла экспортировать:

```ts
test
expect
```

Тесты должны импортировать их из своего fixture-модуля, а не напрямую из `@playwright/test`.

---

# Тестовые сценарии

## 9. Login: успешная авторизация

Сценарий:

```text
Open login page
    ↓
Login as standardUser
    ↓
Verify inventory URL
```

Использовать:

```ts
await expect(page).toHaveURL(...)
```

---

## 10. Login: locked user

Сценарий:

```text
Open login page
    ↓
Login as lockedUser
    ↓
Verify error message
```

Ошибка проверяется через web-first assertion.

---

## 11. Login без password

Negative test:

```text
Open login page
    ↓
Enter username
    ↓
Do not enter password
    ↓
Click Login
    ↓
Verify error message
```

В проекте не использовать `waitForTimeout()`.

---

## 12. Inventory → Cart

Сценарий:

```text
Login
    ↓
Add selected product
    ↓
Verify cart badge = 1
    ↓
Open cart
    ↓
Verify selected product is visible
```

Название товара задается в тесте:

```ts
const productName = "...";
```

Оно не должно быть захардкожено внутри `InventoryPage`.

---

## 13. Full checkout

Использовать массив товаров:

```ts
const products = [
    "...",
    "..."
];
```

Сценарий:

```text
Login
    ↓
Add product A
    ↓
Add product B
    ↓
Verify cart badge = 2
    ↓
Open cart
    ↓
Verify both products
    ↓
Start checkout
    ↓
Fill customer information
    ↓
Continue
    ↓
Verify checkout overview
    ↓
Finish
    ↓
Verify success message
```

Для добавления товаров использовать последовательный цикл:

```ts
for (const product of products) {
    await inventoryPage.addProductToCart(product);
}
```

Не использовать `Promise.all()` для нескольких UI-действий на одной странице.

Товары в корзине также проверить через `for...of`.

---

## 14. `test.describe` и hooks

Login tests сгруппировать:

```ts
test.describe("Login", () => {
    // tests
});
```

Если все login tests начинают с открытия login page, можно использовать:

```ts
test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
});
```

---

## 15. `test.step`

В full checkout test сделать несколько крупных шагов, например:

```text
Login
Add products
Checkout
Verify order
```

Не оборачивать каждую отдельную строку в `test.step()`.

---

## 16. Assertions

В проекте потренировать минимум:

```ts
toHaveURL()
toBeVisible()
toHaveText()
toHaveCount()
```

Предпочитать Playwright web-first assertions вместо одноразовых ручных проверок.

Например:

```ts
await expect(locator).toBeVisible();
```

предпочтительнее:

```ts
expect(await locator.isVisible()).toBe(true);
```

---

# Правила реализации

## Locators

Приоритет:

```text
getByRole
↓
getByLabel / getByPlaceholder
↓
getByText
↓
getByTestId
↓
CSS
↓
XPath
```

XPath использовать только при реальной необходимости.

---

## Auto-waiting

Использовать встроенное ожидание Playwright.

Не использовать hard sleeps:

```ts
await page.waitForTimeout(...);
```

Ждать нужно конкретное состояние:

```ts
await expect(locator).toBeVisible();
```

---

## Async / Await

Не забывать `await` у асинхронных Playwright-операций:

```ts
await page.goto(...);
await locator.click();
await locator.fill(...);
await expect(locator).toBeVisible();
```

---

## Page Objects

Page Objects должны содержать:

- locators;
- действия пользователя;
- page-specific logic.

Page Objects не должны содержать:

- конкретные credentials;
- конкретные тестовые данные;
- сценарии целого теста;
- огромные методы вида `loginAndBuyAndCheckoutAndVerify()`.

---

## Независимость тестов

Тесты не должны зависеть от порядка выполнения.

Не делать:

```text
Test 1 creates data
↓
Test 2 edits data created by Test 1
↓
Test 3 deletes the same data
```

Каждый тест должен самостоятельно готовить необходимое состояние.

---

## TypeScript

Не использовать `any`, если тип можно описать.

Предпочитать:

```ts
const
```

вместо `let`, если переменная не переназначается.

Для типов:

```ts
import type { Credentials } from "../models/Credentials";
```

Для runtime-сущностей:

```ts
import { LoginPage } from "../pages/LoginPage";
```

---

# Бонус: API test

Если останется время, добавить один API-тест с Playwright `request`.

Потренировать:

```ts
request.get(...)
response.ok()
response.status()
response.json()
```

Если у SauceDemo нет подходящего публичного API для сценария, бонус можно пропустить.

---

# Команды

Запустить все тесты:

```bash
npx playwright test
```

Только Chromium:

```bash
npx playwright test --project=chromium
```

Запуск с браузером:

```bash
npx playwright test --headed
```

UI Mode:

```bash
npx playwright test --ui
```

Debug:

```bash
npx playwright test --debug
```

HTML report:

```bash
npx playwright show-report
```

---

# Definition of Done

Проект считается завершенным, если:

- [ ] тесты проходят в Chromium;
- [ ] тесты проходят в Firefox;
- [ ] используется TypeScript без `any`;
- [ ] нет забытых `await`;
- [ ] нет `waitForTimeout`;
- [ ] XPath не используется без необходимости;
- [ ] используются Page Objects;
- [ ] Page Objects создаются custom fixtures;
- [ ] test data вынесены из тестов;
- [ ] модели описаны отдельными TypeScript-типами;
- [ ] тесты независимы друг от друга;
- [ ] используются web-first assertions;
- [ ] config содержит browser projects;
- [ ] trace включен на retry;
- [ ] screenshots сохраняются при падении;
- [ ] полный checkout flow работает;
- [ ] код читается как тестовый сценарий.

---

# Что будет проверяться на code review

## TypeScript

- корректные типы;
- `const` / `let`;
- type inference;
- `Promise`;
- `undefined`;
- отсутствие `any`;
- `import type` там, где это уместно.

## Playwright

- качество locators;
- auto-waiting;
- web-first assertions;
- корректные `await`;
- отсутствие hard sleeps.

## Архитектура

- Page Object Model;
- fixtures;
- test data;
- модели;
- отсутствие ненужного наследования и усложнений.

## Стабильность

- отсутствие race conditions;
- независимость тестов;
- отсутствие shared mutable state;
- retries не используются для маскировки flaky tests.

## Читаемость

Хороший тест должен читаться примерно так:

```text
Arrange
↓
Act
↓
Assert
```

и быть понятным без изучения внутренностей Page Objects.
