import mongoose from 'mongoose'
import { TransactionStatusEnum, TransactionTypeEnum } from '../../../application/repositories/transaction.repository'

export const transactionSchema = new mongoose.Schema({
    balance: BigInt,
    status: {
        type: String,
        values: [
            TransactionStatusEnum.PENDING,
            TransactionStatusEnum.FAILED,
            TransactionStatusEnum.SUCCESS
        ]
    },
    type: {
        type: String,
        values: [
            TransactionTypeEnum.CREDIT,
            TransactionTypeEnum.DEBIT
        ]
    },
    destinationReceiverAccountId: Number,
    originSenderAccountId: Number,
    created_at: Date,
    updated_at: Date
})