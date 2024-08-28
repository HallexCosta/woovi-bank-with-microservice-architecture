import Koa from 'koa';
import config from './common/config';
import { AccountRepository } from './repositories/account.repository';
import { CreateTransactionService } from './services/create-transaction.service';

declare module 'koa' {
    interface DefaultContext {
        config: typeof config;
    }
}

declare module 'bottlejs' {
    interface IContainer<EntryName extends string = string> {
        [key: string]: any;
        $decorator(name: string | Decorator, func?: Decorator): this;
        $register(Obj: Bottle.IRegisterableObject): this;
        $list(container?: Bottle.IContainer): EntryName[];
        InMemoryAccountRepository: AccountRepository
        InMemoryTransactionRepository: TransactionRepository
        CreateTransactionService: CreateTransactionService
    }
}