import { DefaultPrivacyLevel } from './user';


export enum TransactionStatus {
    pending = "pending",
    incomplete = "incomplete",
    complete = "complete"
}

export enum TransactionRequestStatus {
    pending = "pending",
    accepted = "accepted",
    rejected = "rejected"
}

export interface Transaction {
    id: string;
    uuid: string;
    source: string; // Empty if payment or request; populated with bankaccount id
    amount: number;
    description: number;
    privacyLevel: DefaultPrivacyLevel;
    receiverId: string;
    senderId: string;
    balanceAtCompletion?: number;
    status: TransactionStatus;
    requestStatus: TransactionRequestStatus;
    requestResolveAt: Date | string;
    createdAt: Date;
    modifiedAt: Date;
}