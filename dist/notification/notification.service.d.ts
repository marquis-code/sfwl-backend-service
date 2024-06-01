import { NotificationGateway } from './notification.gateway';
export declare class NotificationService {
    private readonly notificationGateway;
    constructor(notificationGateway: NotificationGateway);
    sendNotification(userId: any, title: string, message: string, data: any): Promise<void>;
}
