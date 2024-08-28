import Bottle from 'bottlejs'

export const listAccount = (container: Bottle.IContainer) => {
    return async () => {
        const accounts = container.AccountRepository
        return await accounts.findAll()
    }
}