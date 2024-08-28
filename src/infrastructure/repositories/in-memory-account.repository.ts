import { fixtures } from "../../../tests/fixtures";
import { AccountEntity } from "../../application/entities/account.entity";
import { AccountRepository } from "../../application/repositories/account.repository";

export class InMemoryAccountRepository implements AccountRepository {
    private accounts: AccountEntity[] = [
        ...fixtures.accounts.getAccounts()
    ]

    async findById(id: number): Promise<AccountEntity | null> {
        const account = this.accounts.find(account => account.id === id)
        if (!account) return null

        return AccountEntity.create({
            balance: account.balance,
            status: account.status,
            id: account.id,
            updatedAt: null
        })
    }
    async findAll(): Promise<AccountEntity[]> {
        return this.accounts
    }
    async update(account: AccountEntity): Promise<void> {
        const accountIndex = this.accounts.findIndex(({ id }) => account.id === id)
        account.updatedAt = new Date()
        this.accounts[accountIndex] = account
    }
    async save(account: AccountEntity): Promise<void> {
        this.accounts.push(account)
    }
}