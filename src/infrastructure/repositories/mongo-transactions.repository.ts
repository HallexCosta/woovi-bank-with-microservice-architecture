import { MongoClient } from "mongodb";
import { TransactionEntity } from "../../application/entities/transaction.entity";
import { TransactionRepository } from "../../application/repositories/transaction.repository";
import { MongoTransactionModel } from "../databases/models";

export class MongoTransactionsRepository implements TransactionRepository {
    public constructor(private readonly transactionModel: {
        query: typeof MongoTransactionModel
    }) {}
    findById(id: string): Promise<TransactionEntity> {
        throw new Error("Method not implemented.");
    }
    
    // async findById(id: string): Promise<TransactionEntity> {
    //     const transactionModel = await this.transactionModel.query.findById(id)
    //     // const transactionEntity = new TransactionEntity({
    //     //     amount: transactionModel.
    //     // })
    //     return transactionModel
    // }
    async findAll(): Promise<TransactionEntity[]> {
        return await this.transactionModel.query.find()
    }
    save(transaction: TransactionEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
}