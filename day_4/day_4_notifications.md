# Day 4 — Notifications

## Цель

Сделать систему уведомлений с разными типами отправки.

## 1. `Notification`

Создай `interface`:

```ts
interface Notification {
    id: number;
    message: string;
    createdAt: Date;
}
```

## 2. `NotificationSender`

Создай интерфейс:

```ts
interface NotificationSender {
    send(notification: Notification): void;
}
```

## 3. Реализуй 3 отправителя

Создай классы:

- `EmailNotificationSender`
- `SmsNotificationSender`
- `PushNotificationSender`

Каждый должен:

```ts
implements NotificationSender
```

Метод `send()` должен выводить сообщение в консоль с указанием типа отправки.

Пример:

```text
[EMAIL] Order #123 shipped
[SMS] Order #123 shipped
[PUSH] Order #123 shipped
```

## 4. Абстрактный класс

Создай:

```ts
abstract class BaseNotificationSender
```

В нём:

- `protected senderName: string`
- constructor принимает `senderName`
- метод:

```ts
getSenderName(): string
```

- абстрактный метод:

```ts
abstract send(notification: Notification): void;
```

## 5. Наследование

Переделай три sender-класса так, чтобы они:

```ts
extends BaseNotificationSender
```

и одновременно:

```ts
implements NotificationSender
```

Каждый класс должен передавать своё название в `super()`:

```text
Email
SMS
Push
```

## 6. `NotificationService`

Создай класс:

```ts
NotificationService
```

Он должен принимать sender через constructor:

```ts
constructor(private sender: NotificationSender)
```

Добавь:

```ts
send(notification: Notification): void
```

Метод должен отправлять уведомление через `sender`.

`NotificationService` не должен знать, Email это, SMS или Push.

## 7. Смена отправителя

Добавь:

```ts
setSender(sender: NotificationSender): void
```

После этого:

```ts
service.send(notification);
```

должен использовать новый sender.

Пример:

```ts
const service = new NotificationService(emailSender);

service.send(notification); // EMAIL

service.setSender(smsSender);

service.send(notification); // SMS
```

## 8. Полиморфизм

Создай:

```ts
const senders: NotificationSender[] = [
    emailSender,
    smsSender,
    pushSender
];
```

Пройдись по массиву и отправь одно уведомление через каждого sender.

Код не должен проверять:

```ts
if (sender instanceof EmailNotificationSender)
```

или определять тип sender другим способом.

## 9. `protected`

Добавь в `BaseNotificationSender`:

```ts
protected formatMessage(notification: Notification): string
```

Он должен возвращать:

```text
<senderName>: <notification.message>
```

Дочерние классы должны использовать этот метод внутри `send()`.

Из внешнего кода вызвать `formatMessage()` напрямую нельзя.

# Темы Day 4

Обязательно должны использоваться:

- `interface`
- `implements`
- `abstract class`
- `extends`
- `protected`
- `private`
- overriding
- polymorphism
- composition
- dependency injection через constructor

## Правило проверки

Проверка выполняется строго по условиям этого задания. Дополнительных требований, которых нет в ТЗ, добавляться не будет.
