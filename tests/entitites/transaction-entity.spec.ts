import { describe, expect, it, jest } from "@jest/globals";
import { TransactionEntity } from "../../src/application/entities/transaction.entity";
import { TransactionStatusEnum, TransactionTypeEnum } from "../../src/application/repositories/transaction.repository";

jest.useFakeTimers();

describe('Transaction', () => {
    describe('Transaction.create', () => {
        it('Should be create transaction entity with default values', () => {
            const defaultDate = new Date('2002-07-16')
            jest.setSystemTime(defaultDate)    
            
            const destinationReceiverAccountId = 2
            const originSenderAccountId = 1
             
            const transaction =  TransactionEntity.create({
                amount: 10000, // 1000 / 100 = 100
                destinationReceiverAccountId,
                originSenderAccountId,
                status: TransactionStatusEnum.PENDING,
                type: TransactionTypeEnum.CREDIT,
            })

            expect(transaction.id).toBe(Date.now())
            expect(transaction.amount).toBe(10000)
            expect(transaction.originSenderAccountId).toBe(originSenderAccountId)
            expect(transaction.destinationReceiverAccountId).toBe(destinationReceiverAccountId)
            expect(transaction.status).toBe(TransactionStatusEnum.PENDING)
            expect(transaction.type).toBe(TransactionTypeEnum.CREDIT)
            expect(transaction.createdAt).toStrictEqual(defaultDate)
            expect(transaction.updatedAt).toBeNull()
        })
    })
})