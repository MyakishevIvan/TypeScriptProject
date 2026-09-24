import {NotificationSender} from "./NotificationSender";
import {EmailNotificationSender} from "./EmailNotificationSender";
import {SmsNotificationSender} from "./SmsNotificationSender";
import {PushNotificationSender} from "./PushNotificationSender";
import {NotificationService} from "./NotificationService";

const senders: NotificationSender[] = [
    new EmailNotificationSender(),
    new PushNotificationSender(),
    new SmsNotificationSender()
];

let notificationService: NotificationService | null = null;

for (const sender of senders) {
    if (notificationService === null) {
        notificationService = new NotificationService(sender);
    } else {
        notificationService.setSender(sender);
    }

    notificationService.send({id : 1234, message : "sdfs", createdAt: new Date()})
}