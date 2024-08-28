import Bottle from 'bottlejs'
import { listAccounts } from './accounts/list-accounts.query'
import { listTransactions } from './transactions/list-transactions.query'

export const query = (container: Bottle.IContainer) => ({
    listTransactions: listTransactions(container),
    listAccounts: listAccounts(container)
})