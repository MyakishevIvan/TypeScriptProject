import {Notification} from "./Notification";

export abstract class BaseNotificationSender {
    protected senderName: string

    protected constructor(senderName: string) {
        this.senderName = senderName;
    }

    getSenderName(): string {
        return this.senderName;
    }

    protected formatMessage(notification: Notification): string {
        return `${this.senderName} : ${notification.message}`;
    }


    abstract send(send: Notification): void;
}