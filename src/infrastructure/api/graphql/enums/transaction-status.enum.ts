import { GraphQLEnumType } from "graphql";

export class TransactionStatusEnum extends GraphQLEnumType {
    public constructor() {
        super({
            name: 'TransactionStatus',
            values: {
                CREDIT: {
                    value: 0
                },
                DEBIT: {
                    value: 1
                }
            }
        })
    }
}