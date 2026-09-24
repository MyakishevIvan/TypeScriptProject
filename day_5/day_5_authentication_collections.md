# Day 5 — Authentication + Collections

## Цель

Сделать систему аутентификации и на её основе потренировать основные коллекции TypeScript/JavaScript.

# Часть 1 — Authentication

## 1. `AuthProvider`

Создай discriminated union:

```ts
type AuthProvider =
    | { type: "password"; password: string }
    | { type: "google"; token: string }
    | { type: "github"; token: string };
```

## 2. `AuthResult`

```ts
type AuthResult =
    | { success: true; token: string }
    | { success: false; error: string };
```

## 3. `Authenticator`

Создай abstract class:

```ts
abstract class Authenticator {
    abstract authenticate(provider: AuthProvider): AuthResult;

    protected createToken(userId: number): string {
        // любая строка, содержащая userId
    }
}
```

## 4. Реализации

Создай:

- `PasswordAuthenticator`
- `GoogleAuthenticator`
- `GithubAuthenticator`

Каждый класс:

- `extends Authenticator`;
- переопределяет `authenticate()`;
- работает только со своим типом `provider`.

`PasswordAuthenticator` должен успешно аутентифицировать пользователя, если пароль непустой.

## 5. `AuthService`

Создай:

```ts
class AuthService {
    constructor(private authenticator: Authenticator) {}

    login(provider: AuthProvider): AuthResult {
        // ...
    }

    setAuthenticator(authenticator: Authenticator): void {
        // ...
    }
}
```

`AuthService` не должен использовать `instanceof` для определения типа authenticator.

## 6. Type narrowing

Создай:

```ts
function getProviderInfo(provider: AuthProvider): string
```

Используй `provider.type` для narrowing.

Результаты:

```text
password → Password authentication
google   → Google authentication
github   → GitHub authentication
```

## 7. Проверка результата

Создай:

```ts
function getAuthMessage(result: AuthResult): string
```

Используй `result.success` для narrowing.

Успешный результат:

```text
Authenticated: <token>
```

Ошибка:

```text
Authentication failed: <error>
```

# Часть 2 — Collections

Создай отдельный `CollectionManager`.

Он должен работать с пользователями, ролями и авторизованными пользователями.

Используй минимум:

```ts
users: User[]
roles: Set<UserRole>
usersById: Map<number, User>
```

## 8. Array

Реализуй:

```ts
getActiveUsers(): User[]
```

Используй `filter`.

```ts
getUserNames(): string[]
```

Используй `map`.

```ts
findUser(id: number): User | undefined
```

Используй `find`.

```ts
findUserIndex(id: number): number
```

Используй `findIndex`.

```ts
hasAdmin(): boolean
```

Используй `some`.

```ts
allUsersActive(): boolean
```

Используй `every`.

```ts
hasUserName(name: string): boolean
```

Используй `includes` на массиве имён.

```ts
sortUsersByName(): User[]
```

Используй `sort`.

Сортировка не должна ломать исходный массив пользователей.

```ts
getUsersCountByRole(): Record<UserRole, number>
```

Используй `reduce`.

```ts
logUsers(): void
```

Используй `forEach`.

## 9. `flatMap`

Добавь пользователям поле:

```ts
permissions: string[]
```

Создай:

```ts
getAllPermissions(): string[]
```

Верни единый массив всех permissions всех пользователей.

Используй `flatMap`.

## 10. Set

Используй:

```ts
roles: Set<UserRole>
```

Добавь:

```ts
addRole(role: UserRole): void
removeRole(role: UserRole): void
hasRole(role: UserRole): boolean
getRoleCount(): number
getRoles(): UserRole[]
```

Обязательно используй:

- `add`
- `delete`
- `has`
- `size`
- перебор `Set`

`getRoles()` должен возвращать `Array`, а не сам `Set`.

## 11. Map

Используй:

```ts
usersById: Map<number, User>
```

Добавь:

```ts
addUser(user: User): void
getUser(id: number): User | undefined
hasUser(id: number): boolean
removeUser(id: number): boolean
getUserCount(): number
```

Используй:

- `set`
- `get`
- `has`
- `delete`
- `size`

Добавь:

```ts
getUserIds(): number[]
getUsers(): User[]
```

Для получения данных используй:

- `keys()`
- `values()`

Также отдельно продемонстрируй `entries()` при переборе `Map`.

## 12. Collections + Authentication

Свяжи обе части.

После успешного `login()` добавляй пользователя в коллекцию авторизованных пользователей.

Используй:

```ts
Set<number>
```

для хранения ID авторизованных пользователей.

При успешной аутентификации:

```ts
authenticatedUserIds.add(user.id)
```

Добавь:

```ts
getAuthenticatedUsers(): User[]
```

Метод должен возвращать только уникальных авторизованных пользователей.

# Обязательные темы Day 5

## Authentication

- `abstract class`
- `extends`
- `implements`
- overriding
- access modifiers
- `protected`
- discriminated unions
- type narrowing
- union types
- dependency injection
- composition

## Array

- `map`
- `filter`
- `find`
- `findIndex`
- `some`
- `every`
- `includes`
- `sort`
- `reduce`
- `forEach`
- `flatMap`

## Set

- `add`
- `delete`
- `has`
- `size`
- iteration
- Set → Array

## Map

- `set`
- `get`
- `has`
- `delete`
- `size`
- `keys`
- `values`
- `entries`

## Дополнительно

- `Record`
- типизация коллекций
- `Set<number>`
- `Map<number, User>`

## Правило проверки

Проверка выполняется строго по этому ТЗ.

Не добавляй функциональность, которой нет в задании.
