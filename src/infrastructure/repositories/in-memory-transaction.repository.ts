import { fixtures } from '../../../tests/fixtures'
import { TransactionEntity } from '../../application/entities/transaction.entity'
import { TransactionRepository } from '../../application/repositories/transaction.repository'

export class InMemoryTransactionRepository implements TransactionRepository {
    private transactions: TransactionEntity[] = [
        ...fixtures.transactions.getMockTransactions()
    ]

    async findById(id: number): Promise<TransactionEntity> {
        const transaction = this.transactions.find(account => account.id === id)
        if (!transaction) throw new Error('Account not found')
    
        return transaction
    }
    async findAll(): Promise<TransactionEntity[]> {
        return this.transactions
    }
    async update(transaction: TransactionEntity): Promise<void> {
        const transactionIndex = this.transactions.findIndex(({ id }) => transaction.id === id)
        this.transactions[transactionIndex] = transaction
    }
    async save(transaction: TransactionEntity): Promise<void> {
        this.transactions.push(transaction)
    }
}