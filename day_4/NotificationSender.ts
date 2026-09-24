import {Notification} from "./Notification";

export interface NotificationSender{
    send(notification: Notification): void;
}