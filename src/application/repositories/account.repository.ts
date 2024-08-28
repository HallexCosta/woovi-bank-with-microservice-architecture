import { AccountEntity } from '../entities/account.entity'

export enum AccountStatusEnum {
    INACTIVED = 'INACTIVED',
    ACTIVED = 'ACTIVED',
    BANNED = 'BANNED',
    SUSPENDED = 'SUSPENDED'
}

type Account = {
    id?: number
    balance: number
    createdAt: Date
    updatedAt?: Date | null
    status: AccountStatusEnum
}

export type CreateAccount = Omit<Account, 'createdAt'>
export type UpdateAccount = Omit<Account, 'id' | 'createdAt' | 'updatedAt'>

export interface AccountRepository {
    findById(id: number): Promise<AccountEntity | null>
    findAll(): Promise<AccountEntity[]>
    update(account: AccountEntity): Promise<void>
    save(account: CreateAccount): Promise<void>
}