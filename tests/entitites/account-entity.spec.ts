import { beforeAll, describe, expect, it, jest } from "@jest/globals";
import { AccountEntity } from "../../src/application/entities/account.entity";
import { fixtures } from "../fixtures";
import { AccountStatusEnum, CreateAccount } from "../../src/application/repositories/account.repository";

jest.useFakeTimers();

describe('Account Entity', () => {
    describe('ensures default data is filled in account entity when create', () => {
        let defaultDate: Date
        beforeAll(() => {
            defaultDate = new Date('2002-07-16')
            jest.setSystemTime(defaultDate)
        })

        it('Should be instance the account entity using static create method', () => {
            expect(AccountEntity.create({} as CreateAccount)).toBeInstanceOf(AccountEntity)
        })
        it('Should be create bank account entity with createdAt as defaultDate date', () => {
            jest.setSystemTime(defaultDate)
            const accountEntity = AccountEntity.create({
                balance: 0,
                status: AccountStatusEnum.ACTIVED,
            })
            expect(accountEntity.createdAt).toStrictEqual(defaultDate)
        })  
        it('Should be create bank account entity with balance as zero', () => {
            const accountEntity = AccountEntity.create({
                balance: 0,
                status: AccountStatusEnum.ACTIVED,
            })
            expect(accountEntity.balance).toBe(0)
        })  
        it('Should be create bank account entity with id as unique id integer number', () => {
            const accountEntity = AccountEntity.create({
                balance: 0,
                status: AccountStatusEnum.ACTIVED,
            })
            expect(accountEntity.id).toStrictEqual(Date.now())
        })  
        it('Should be create bank account entity with status actived', () => {
            const accountEntity = AccountEntity.create({
                balance: 0,
                status: AccountStatusEnum.ACTIVED,
            })
            expect(accountEntity.status).toStrictEqual(AccountStatusEnum.ACTIVED)
        })  
        it('Should be create bank account entity with property updatedAt as null', () => {
            const accountEntity = AccountEntity.create({
                balance: 0,
                status: AccountStatusEnum.ACTIVED,
            })
            expect(accountEntity.updatedAt).toStrictEqual(null)
        })  
    })
    describe('Should move the account balance', () => {
        it('Should be decrease balance when use function credit bank account', () => {
            const accountEntity = AccountEntity.create({
                balance: 0,
                status: AccountStatusEnum.ACTIVED,
                id: 1,
            })
            expect(accountEntity.balance).toStrictEqual(0)

            const creditValue = 100 * 100
            const balanceExpected = 10000

            accountEntity.credit(creditValue)
            expect(accountEntity.balance).toStrictEqual(balanceExpected)
        })
        it('Should be increase balance when use function debit bank account', () => {
            const accountEntity = AccountEntity.create({
                balance: 0,
                status: AccountStatusEnum.ACTIVED,
            })
            expect(accountEntity.balance).toStrictEqual(0)

            const debitValue = 100 * 100
            const balanceExpected = -10000

            accountEntity.debit(debitValue)
            expect(accountEntity.balance).toStrictEqual(balanceExpected)
        })
    })
})