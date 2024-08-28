import { transactionSchema } from "../schemas/transaction.schema"
import { createSyncMongoConnect } from "../connections/mongoose"

export const MongoTransactionModel = createSyncMongoConnect().model('Transaction', transactionSchema)

// export class MongoTransactionModel {
//     public constructor(data: mongoose.Model<typeof transactionSchema>) {
//         return new TransactionModel(data)
//     }
// }
