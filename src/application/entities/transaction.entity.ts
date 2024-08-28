import { CreateTransaction, TransactionStatusEnum, TransactionTypeEnum } from '../repositories/transaction.repository'

export class TransactionEntity {
    public id: number = 0
    public amount: number = 0
    public destinationReceiverAccountId: number
    public originSenderAccountId: number
    public status: TransactionStatusEnum = TransactionStatusEnum.PENDING
    public type: TransactionTypeEnum = TransactionTypeEnum.CREDIT
    public readonly createdAt = new Date()
    public updatedAt: Date | null = null

    public constructor(data: CreateTransaction) {
        this.id = data.id ?? this.createUniqueId()
        this.amount = data.amount ?? 0
        this.status = data.status
        this.type = data.type ?? null
        this.destinationReceiverAccountId = data.destinationReceiverAccountId
        this.originSenderAccountId = data.originSenderAccountId
    }

    public static create(data: CreateTransaction) {
        return new TransactionEntity(data)
    }

    private createUniqueId() {
        return Date.now()
    }
}