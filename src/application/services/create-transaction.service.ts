import { DestinationAccountNotFoundException } from '../exceptions/destination-account-not-found.exception'
import { OriginAccountBalanceZeroException } from '../exceptions/origin-account-balance-zero.exception'
import { OriginAccountDoesNotHaveFundsToMakeTransferException } from '../exceptions/origin-account-does-not-have-funds-to-make-transfer.exception'
import { OriginAccountNotFoundException } from '../exceptions/origin-account-not-found.exception'
import { TransactionEntity } from '../entities/transaction.entity'
import { AccountRepository } from '../repositories/account.repository'
import { TransactionRepository, TransactionStatusEnum, TransactionTypeEnum } from '../repositories/transaction.repository'
import { CreateTransactionDto } from './dtos/create-transaction.dto'
import { TransferAmountIsLessThanOrEqualZeroException } from '../exceptions/transfer-amount-is-less-than-or-equal-zero.exception'

export class CreateTransactionService {
    public constructor(
        private readonly accountRepository: AccountRepository,
        private readonly transactionRepository: TransactionRepository
    ) {}
    
    public async execute(dto: CreateTransactionDto) {
        if (dto.amount <= 0) {
            throw new TransferAmountIsLessThanOrEqualZeroException()
        }

        const originAccount = await this.accountRepository.findById(dto.originSenderAccountId)
        const destinationAccount = await this.accountRepository.findById(dto.destinationReceiverAccountId)

        if (!originAccount) throw new OriginAccountNotFoundException()
        if (!destinationAccount) throw new DestinationAccountNotFoundException()

        if (originAccount.balance <= 0) {
            throw new OriginAccountBalanceZeroException()
        }

        const transaction = TransactionEntity.create({
            amount: dto.amount * 100,
            destinationReceiverAccountId: dto.destinationReceiverAccountId,
            originSenderAccountId: dto.originSenderAccountId,
            status: TransactionStatusEnum.PENDING,
            type: TransactionTypeEnum.CREDIT
        })
 
        originAccount.debit(transaction.amount)
        destinationAccount.credit(transaction.amount)

        if (originAccount.balance < 0){
            throw new OriginAccountDoesNotHaveFundsToMakeTransferException()
        }
        
        // start db transaction here 
        await this.transactionRepository.save(transaction)
        await this.accountRepository.update(originAccount)
        await this.accountRepository.update(destinationAccount)

        return transaction
    }
}