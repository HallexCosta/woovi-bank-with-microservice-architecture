import { TransactionStatusEnum } from '../repositories/transaction.repository'

export const transactionStatusToEnumMapper = (status: TransactionStatusEnum) => {
    const allStatus = {
        [TransactionStatusEnum.PENDING]: 'PENDING',
        [TransactionStatusEnum.SUCCESS]: 'SUCCESS',
        [TransactionStatusEnum.FAILED]: 'FAILED'
    }
    if (!allStatus[status]) {
        throw new Error(`Enum with status identifier ${status} not found`)
    }
    return allStatus[status]
}