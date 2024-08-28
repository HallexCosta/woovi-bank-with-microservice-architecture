import { TransactionEntity } from "../entities/transaction.entity"

export enum TransactionStatusEnum {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED'
}

export enum TransactionTypeEnum {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
}

type Transaction = {
    id?: number
    amount: number
    originSenderAccountId: number
    destinationReceiverAccountId: number
    status: TransactionStatusEnum
    type: TransactionTypeEnum
    createdAt: Date
    updatedAt: Date
}

export type CreateTransaction = Omit<Transaction, 'createdAt' | 'updatedAt'>
export type UpdateTransaction = Omit<Transaction, 'createdAt' | 'id'>

export interface TransactionRepository {
    findById(id: string): Promise<TransactionEntity>
    findAll(): Promise<TransactionEntity[]>
    save(transaction: TransactionEntity): Promise<void>
}