import Bottle from 'bottlejs'
import { CreateTransactionService } from '../application/services/create-transaction.service'
import { MongoAccountsRepository } from './repositories/mongo-accounts.repository'
import { MongoTransactionsRepository } from './repositories/mongo-transactions.repository'
import { MongoAccountModel, MongoTransactionModel } from './databases/models'

const bottle = new Bottle()

bottle.service('AccountModel', class {
        query
        public constructor() {
            this.query = MongoAccountModel
            return 
        }
    }
)
bottle.service('TransactionModel', class {
        query
        public constructor() {
            this.query = MongoTransactionModel
            return 
        }
    }
)

const accountsRepositoryDeps = ['AccountModel']
bottle.service('AccountRepository', MongoAccountsRepository, ...accountsRepositoryDeps)
const transactionsRepositoryDeps = ['TransactionModel']
bottle.service('TransactionRepository', MongoTransactionsRepository, ...transactionsRepositoryDeps)

const createTransactionServiceDeps = ['AccountRepository', 'TransactionRepository']
bottle.service('CreateTransactionService', CreateTransactionService, ...createTransactionServiceDeps)

const container =  bottle.container

export { 
    container
}