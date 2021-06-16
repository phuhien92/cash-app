export enum BankTransferType {
    withdraw = 'withdraw',
    deposit = 'deposit'
}

export interface BankTransfer {
    id: string;
    uuid: string;
    type: BankTransferType;
    source: string;
    amount: number;
    transactionId: string;
    createdAt: Date;
    modifiedAt: Date
}