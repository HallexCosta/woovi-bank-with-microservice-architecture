import { TransactionEntity } from '../../src/application/entities/transaction.entity'
import { TransactionStatusEnum, TransactionTypeEnum } from '../../src/application/repositories/transaction.repository'

export const transactions = [
    {
        id: 1,
        amount: 100,
        status: TransactionStatusEnum.PENDING,
        type: TransactionTypeEnum.CREDIT,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 2,
        amount: 100,
        status: TransactionStatusEnum.SUCCESS,
        type: TransactionTypeEnum.DEBIT,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 3,
        amount: 100,
        status: TransactionStatusEnum.FAILED,
        type: TransactionTypeEnum.CREDIT,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 4,
        amount: 100,
        status: TransactionStatusEnum.FAILED,
        type: TransactionTypeEnum.CREDIT,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
].map(transaction => TransactionEntity.create({
    amount: transaction.amount,
    status: transaction.status,
    type: transaction.type,
    originSenderAccountId: 1,
    destinationReceiverAccountId: 2,
}))