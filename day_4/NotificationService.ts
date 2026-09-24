import {NotificationSender} from "./NotificationSender";
import {Notification} from "./Notification";


export class NotificationService {
    constructor(private sender: NotificationSender) {
        this.sender = sender;
    }

    send(notification: Notification): void {
        this.sender.send(notification);
    }

    setSender(sender: NotificationSender): void {
        this.sender = sender
    }
}