import {NotificationSender} from "./NotificationSender";
import {Notification} from "./Notification";
import {BaseNotificationSender} from "./BaseNotificationSender";

export class EmailNotificationSender extends BaseNotificationSender implements NotificationSender {

    constructor() {
        super("EMAIL");
    }

    send(notification: Notification): void {
        console.log(super.formatMessage(notification));
    }
}

