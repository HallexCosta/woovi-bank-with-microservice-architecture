import Bottle from "bottlejs"

export const listTransactions = (container: Bottle.IContainer) => {
    return async () => { 
        const transactionRepository = container.TransactionRepository
        return await transactionRepository.findAll()
    }
}