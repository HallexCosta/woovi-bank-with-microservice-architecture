import Bottle from "bottlejs"
import { CreateTransactionService } from "../../../../../application/services/create-transaction.service"
import { TransactionTypeEnum } from "../../../../../application/repositories/transaction.repository"

type TransactionInput = {
    amount: number
    destinationReceiverAccountId: 1
    originSenderAccountId: 0
    type: TransactionTypeEnum
}

export const createTransactionMutation = (container: Bottle.IContainer) => {
    return async (_: any, {createTransaction}: { createTransaction: TransactionInput }) => {
        const createTransactionService = container.CreateTransactionService
        const transaction = await createTransactionService.execute({
          amount: createTransaction.amount,
          destinationReceiverAccountId: createTransaction.destinationReceiverAccountId,
          originSenderAccountId: createTransaction.originSenderAccountId
        })
        return transaction
    }
}