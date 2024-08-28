import { AccountStatusEnum } from '../../src/application/repositories/account.repository'

export const accounts = [
    {
        id: 1,
        balance: 100 * 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: AccountStatusEnum.ACTIVED
    },
    {
        id: 2,
        balance: 100 * 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: AccountStatusEnum.ACTIVED
    }
]