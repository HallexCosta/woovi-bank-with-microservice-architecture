import { AccountRepository } from '../repositories/account.repository'
import { TransactionRepository, TransactionStatusEnum, TransactionTypeEnum } from '../repositories/transaction.repository'
import { ListTransactionsDto } from './dtos/list-transactions.dto'

export class ListTransactionsService {
    public constructor(
        private readonly accountRepository: AccountRepository,
        private readonly transactionRepository: TransactionRepository
    ) {}
    
    public async execute(dto: ListTransactionsDto) {
        // console.log({dto})
        // const originAccount = await this.accountRepository.findById(dto.originSenderAccountId)
        // const destinationAccount = await this.accountRepository.findById(dto.destinationReceiverAccountId)

        // beta feature...
        return null
    }
}