import { AccountEntity } from "../../src/application/entities/account.entity";
import { TransactionEntity } from "../../src/application/entities/transaction.entity";
import { AccountStatusEnum } from "../../src/application/repositories/account.repository";
import { TransactionStatusEnum, TransactionTypeEnum } from "../../src/application/repositories/transaction.repository";
import { accounts } from "./accounts";
import { transactions } from "./transactions";
import { users } from "./users";

// fixtures for mock data for running api rest, graphql or tests without integration with database for now
export const fixtures = {
    transactions: {
        getMockTransactions: () => transactions.map(transaction => TransactionEntity.create({
            id: transaction.id,
            amount: transaction.amount,
            destinationReceiverAccountId: transaction.destinationReceiverAccountId,
            originSenderAccountId: transaction.originSenderAccountId,
            status: transaction.status,
            type: transaction.type
        })),
        getMockTransaction: () => TransactionEntity.create({
            id: transactions[0].id,
            amount: transactions[0].amount,
            destinationReceiverAccountId: transactions[0].destinationReceiverAccountId,
            originSenderAccountId: transactions[0].originSenderAccountId,
            status: transactions[0].status,
            type: transactions[0].type
        }),
        getMockTransactionWithStatusPending: () => transactions.find(transaction => transaction.status === TransactionStatusEnum.PENDING),
        getMockTransactionWithStatusSuccess: () => transactions.find(transaction => transaction.status === TransactionStatusEnum.SUCCESS),
        getMockTransactionWithStatusFailed: () => transactions.find(transaction => transaction.status === TransactionStatusEnum.FAILED),
        makeMockCreditTransaction: (amount: number) => transactions.push(TransactionEntity.create({
            amount,
            originSenderAccountId: accounts[0].id,
            destinationReceiverAccountId: accounts[1].id,
            status: TransactionStatusEnum.PENDING,
            type: TransactionTypeEnum.CREDIT
        })),
        makeMockDebitTransaction: (amount: number) => transactions.push(TransactionEntity.create({
            amount,
            originSenderAccountId: accounts[0].id,
            destinationReceiverAccountId: accounts[1].id,
            status: TransactionStatusEnum.PENDING,
            type: TransactionTypeEnum.DEBIT
        }))
    },
    users: {
        getUsers: () => users,
        getUser: () => users[0],
        getUserByEmail: (email: string) => users.find(user => user.email === email),
    },
    accounts: {
        getAccounts: () => accounts.map(account => AccountEntity.create({
            id: account.id,
            balance: account.balance,
            status: account.status,
            updatedAt: account.updatedAt
        })),
        getAccount: (id: number) => AccountEntity.create({
            balance: accounts[id].balance,
            status: accounts[id].status,
            id: accounts[id].id,
            updatedAt: accounts[id].updatedAt
        }),
        getAccountWithZeroBalance: () => AccountEntity.create({
            balance: 0,
            status: AccountStatusEnum.ACTIVED,
            id: 1,
            updatedAt: new Date()
        }),
        getAccountWithHundredBalance: () => AccountEntity.create({
            balance: 100,
            status: AccountStatusEnum.ACTIVED,
            id: 1,
            updatedAt: new Date()
        }),
    }
}