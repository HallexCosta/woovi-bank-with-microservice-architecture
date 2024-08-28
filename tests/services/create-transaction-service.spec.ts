import { beforeAll, describe, expect, it, jest } from '@jest/globals'
import { InMemoryAccountRepository } from '../../src/infrastructure/repositories/in-memory-account.repository'
import { InMemoryTransactionRepository } from '../../src/infrastructure/repositories/in-memory-transaction.repository'
import { CreateTransactionService } from '../../src/application/services/create-transaction.service'
import { AccountRepository } from '../../src/application/repositories/account.repository'
import { TransactionRepository } from '../../src/application/repositories/transaction.repository'
import { OriginAccountNotFoundException } from '../../src/application/exceptions/origin-account-not-found.exception'
import { DestinationAccountNotFoundException } from '../../src/application/exceptions/destination-account-not-found.exception'
import { fixtures } from '../fixtures'
import { OriginAccountBalanceZeroException } from '../../src/application/exceptions/origin-account-balance-zero.exception'
import { OriginAccountDoesNotHaveFundsToMakeTransferException } from '../../src/application/exceptions/origin-account-does-not-have-funds-to-make-transfer.exception'
import { TransferAmountIsLessThanOrEqualZeroException } from '../../src/application/exceptions/transfer-amount-is-less-than-or-equal-zero.exception'

describe('CreateTransactionService', () => {
    let accountsRepository: AccountRepository
    let transactionsRepository: TransactionRepository
    beforeAll(() => {
        accountsRepository = new InMemoryAccountRepository()
        transactionsRepository = new InMemoryTransactionRepository()
    })
    it('Should be inject accounts and transactions repository', () => {
        const createTransactionService = new CreateTransactionService(accountsRepository, transactionsRepository)
        expect(createTransactionService).toBeInstanceOf(CreateTransactionService)
    })
    describe('CreateTransactionService.execute', () => {
        it('Should be find orign and destination account', async () => {
            const accountsRepositoryFindByIdStub = jest.spyOn(accountsRepository, 'findById')
            const createTransactionService = new CreateTransactionService(accountsRepository, transactionsRepository)
            const originSenderAccountId = 1
            const destinationReceiverAccountId = 2
            await createTransactionService.execute({
                amount: 100,
                originSenderAccountId,
                destinationReceiverAccountId,
            })
            expect(accountsRepositoryFindByIdStub.mock.calls[0][0]).toStrictEqual(originSenderAccountId) 
            expect(accountsRepositoryFindByIdStub.mock.calls[1][0]).toStrictEqual(destinationReceiverAccountId) 

            accountsRepositoryFindByIdStub.mockClear()
        })
        it.todo('Should be insert a new transaction on database')
        it('Should be throw a new error if origin account not found', async () => {
            const accountsRepositoryFindByIdStub = jest.spyOn(accountsRepository, 'findById')
            accountsRepositoryFindByIdStub.mockResolvedValueOnce(null)
            const createTransactionService = new CreateTransactionService(accountsRepository, transactionsRepository)
            const originSenderAccountId = 1
            const destinationReceiverAccountId = 2
            const expectedToThrowError = async () => await createTransactionService.execute({
                amount: 100,
                originSenderAccountId,
                destinationReceiverAccountId,
            })
            await expect(expectedToThrowError).rejects.toThrow(OriginAccountNotFoundException)
            accountsRepositoryFindByIdStub.mockClear()
        })
        it('Should be throw a new error if destination account not found',  async () => {
            const accountsRepositoryFindByIdStub = jest.spyOn(accountsRepository, 'findById')
            accountsRepositoryFindByIdStub.mockResolvedValueOnce(fixtures.accounts.getAccount(1))
            accountsRepositoryFindByIdStub.mockResolvedValueOnce(null)
            const createTransactionService = new CreateTransactionService(accountsRepository, transactionsRepository)
            const originSenderAccountId = 1
            const destinationReceiverAccountId = 2
            const expectedToThrowError = async () => await createTransactionService.execute({
                amount: 100,
                originSenderAccountId,
                destinationReceiverAccountId,
            })
            await expect(expectedToThrowError).rejects.toThrow(DestinationAccountNotFoundException)
            accountsRepositoryFindByIdStub.mockClear()
        })
        it('Should be throw a new error if origin account has a balance less than or equal zero', async () => {
            const accountsRepositoryFindByIdStub = jest.spyOn(accountsRepository, 'findById')
            accountsRepositoryFindByIdStub.mockResolvedValueOnce(fixtures.accounts.getAccountWithZeroBalance())
            const createTransactionService = new CreateTransactionService(accountsRepository, transactionsRepository)
            const originSenderAccountId = 1
            const destinationReceiverAccountId = 2
            
            const expectedToThrowError = async () => await createTransactionService.execute({
                amount: 100,
                originSenderAccountId,
                destinationReceiverAccountId,
            })
            await expect(expectedToThrowError).rejects.toThrow(OriginAccountBalanceZeroException)
            accountsRepositoryFindByIdStub.mockClear()
        })
        it('Should be throw a new error if transfer amount is greater than funds of origin account', async () => {
            const accountsRepositoryFindByIdStub = jest.spyOn(accountsRepository, 'findById')
            accountsRepositoryFindByIdStub.mockResolvedValueOnce(fixtures.accounts.getAccountWithHundredBalance())
            const createTransactionService = new CreateTransactionService(accountsRepository, transactionsRepository)
            const originSenderAccountId = 1
            const destinationReceiverAccountId = 2
            
            const expectedToThrowError = async () => await createTransactionService.execute({
                amount: 101,
                originSenderAccountId,
                destinationReceiverAccountId,
            })
            await expect(expectedToThrowError).rejects.toThrow(OriginAccountDoesNotHaveFundsToMakeTransferException)
            accountsRepositoryFindByIdStub.mockClear()
        })
        it('Should be throw new error if transfer amount is less than or equal zero', async () => {
            const accountsRepositoryFindByIdStub = jest.spyOn(accountsRepository, 'findById')
            accountsRepositoryFindByIdStub.mockResolvedValueOnce(fixtures.accounts.getAccountWithHundredBalance())
            const createTransactionService = new CreateTransactionService(accountsRepository, transactionsRepository)
            const originSenderAccountId = 1
            const destinationReceiverAccountId = 2
            
            const expectedToThrowError1 = async () => await createTransactionService.execute({
                amount: 0,
                originSenderAccountId,
                destinationReceiverAccountId,
            })
            const expectedToThrowError2 = async () => await createTransactionService.execute({
                amount: -100,
                originSenderAccountId,
                destinationReceiverAccountId,
            })
            await expect(expectedToThrowError1).rejects.toThrow(TransferAmountIsLessThanOrEqualZeroException)
            await expect(expectedToThrowError2).rejects.toThrow(TransferAmountIsLessThanOrEqualZeroException)
            accountsRepositoryFindByIdStub.mockClear()
        })
        it.todo('Should be update destination and origin balance account when execute a create transaction service')
    })
})