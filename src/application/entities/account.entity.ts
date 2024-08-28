import { AccountStatusEnum, CreateAccount } from '../repositories/account.repository'

export class AccountEntity {
    public id: number
    public balance: number
    public status: AccountStatusEnum
    public createdAt: Date
    public updatedAt: Date | null

    /**
     * Define the default data for initiate a new account
     */
    public constructor(data: CreateAccount) {
        this.id = data.id ?? this.createUniqueId()
        this.balance = data.balance ?? 0
        this.status = data.status ?? AccountStatusEnum.ACTIVED
        this.createdAt = new Date()
        this.updatedAt = data.updatedAt ?? null
    }

    /**
     * 
     * @returns instance of account entity
     */
    public static create(data: CreateAccount) {
        const self = new AccountEntity(data)
        return self
    }

    /**
     * 
     * @returns generate unique id for account
     */
    private createUniqueId() {
        return Date.now()
    }

    /**
     * Decrease amount from balance
     * @param amount receive a float number
     * @returns the new balance
     */
    public debit(amount: number) {
        this.balance = this.balance - amount
        return this.balance
    }

    /**
     * Increase amount from balance
     * @param amount receive a float number
     * @returns the new balance
     */
    public credit(amount: number) {
        this.balance = this.balance + amount
        return this.balance
    }

    /**
     * Returns the balance stored in the account divided by 100.
     * 
     * @returns The account balance in smaller base units (float).
     */
    public getBalanceInBaseUnits(): number {
        return this.balance / 100;
    }
}