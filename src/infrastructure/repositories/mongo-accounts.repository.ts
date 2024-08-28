import { AccountEntity } from "../../application/entities/account.entity";
import { AccountRepository, AccountStatusEnum, CreateAccount } from "../../application/repositories/account.repository";
import { MongoAccountModel, TMongoAccountModel } from "../databases/models";

export class MongoAccountsRepository implements AccountRepository {
    public constructor(private readonly accountModel: TMongoAccountModel) {}

    findById(id: number): Promise<AccountEntity | null> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<AccountEntity[]> {
        const accounts = this.accountModel.find()
        console.log(accounts)
        // return accounts
    }
    update(account: AccountEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async save(account: CreateAccount): Promise<void> {
        const accountModel = new this.accountModel({
            balance:100 * 100,
            status: AccountStatusEnum.ACTIVED,
            created_at: new Date(),
            updated_at: null
        })
        // this.accountModel.balance = 100 * 100
        // this.accountModel.status = AccountStatusEnum.ACTIVED
        // this.accountModel.created_at = new Date()
        // this.accountModel.updated_at = null
        accountModel.save()
    }
}