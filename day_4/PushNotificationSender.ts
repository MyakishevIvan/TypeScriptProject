import {NotificationSender} from "./NotificationSender";
import {Notification} from "./Notification";
import {BaseNotificationSender} from "./BaseNotificationSender";

export class PushNotificationSender extends BaseNotificationSender implements NotificationSender {

    constructor() {
        super("PUSH");
    }

    send(notification: Notification): void {
        console.log(super.formatMessage(notification));
    }
}