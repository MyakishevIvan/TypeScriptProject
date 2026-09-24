import {NotificationSender} from "./NotificationSender";
import {Notification} from "./Notification";
import {BaseNotificationSender} from "./BaseNotificationSender";

export class SmsNotificationSender extends BaseNotificationSender implements NotificationSender {

    constructor() {
        super("SMS");
    }

    send(notification: Notification): void {
        console.log(super.formatMessage(notification));
    }
}