import Bottle from "bottlejs";
import { AccountEntity, AccountStatusEnum } from "../../../../../application/entities/account.entity";

export const createAccountMutation = (container: Bottle.IContainer) => {
    return async () => {
        const accountRepository = container.AccountRepository
        const account = AccountEntity.create({
          balance: 0,
          status: AccountStatusEnum.ACTIVED
        })
        await accountRepository.save(account)
        console.log(await accountRepository.findAll())
        return account
      }
}