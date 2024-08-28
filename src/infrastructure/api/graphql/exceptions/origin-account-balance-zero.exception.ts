import { GraphQLError } from "graphql";

export class OriginAccountBalanceZeroException extends GraphQLError {
    public constructor() {
        super('Origin account balance is less or equal than zero')
    }
}