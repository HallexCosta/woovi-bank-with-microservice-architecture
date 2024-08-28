import { TransactionTypeEnum } from '../repositories/transaction.repository'

export const transactionTypeToEnum = (type: TransactionTypeEnum) => {
    const allTypes = {
        [TransactionTypeEnum.CREDIT]: 'CREDIT',
        [TransactionTypeEnum.DEBIT]: 'DEBIT'
    }
    if (!allTypes[type]) {
        throw new Error(`Enum with type identifier ${type} not found`)
    }
    return allTypes[type]
}