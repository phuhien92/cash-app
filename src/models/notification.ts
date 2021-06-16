export enum PaymentNotificationStatus {
    requested = "requested",
    received = "received",
    incomplete = "incomplete"
}

export enum NotificationsType {
    payment = "payment",
    like = "like",
    comment = "comment",
}

export interface NotificationBase {
    id: string;
    uuid: string;
    userId: string;
    transactionId: string;
    isRead: boolean;
    createdAt: Date;
    modifiedAt: Date;
}

export type NotificationType = PaymentNotification | LikeNotification | CommentNotification;

export interface PaymentNotification  {

}

export interface LikeNotification {

}

export interface CommentNotification {

}