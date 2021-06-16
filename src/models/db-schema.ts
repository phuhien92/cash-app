import { User } from "./user";
import { Contact } from "./contact";
import { BankAccount } from "./bankaccount";
import { Transaction } from "./transaction";
import { Like } from "./like";
import { BankTransfer } from "./banktransfer";
import { NotificationType } from "./notification";
import { Comment } from "./comment";

export interface DbSchema {
    users: [];
    contacts: [];
    bankAccounts: BankAccount[];
    transactions: Transaction[];
    likes: Like[];
    comments: Comment[];
    notifications: NotificationType[];
    bankTransfers: BankTransfer[]
}