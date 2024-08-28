import Bottle from 'bottlejs'
import { createAccountMutation } from './accounts/create-account.mutation'
import { createTransactionMutation } from './transactions/create-transaction.mutation'

export const mutation = (container: Bottle.IContainer) => ({
    createTransaction: createTransactionMutation(container),
    createAccount: createAccountMutation(container)
})