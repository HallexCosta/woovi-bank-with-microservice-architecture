import Bottle from 'bottlejs'
import { MongoAccountsRepository } from '../../../../repositories/mongo-accounts.repository'
import { MongoAccountModel } from '../../../../databases/models'

export const listAccounts = (container: Bottle.IContainer) => {
    return async () => {
        // new MongoAccountsRepository(MongoAccountModel)
        return await MongoAccountModel.find()

        const accounts = container.AccountRepository
        return await accounts.findAll()
    }
}