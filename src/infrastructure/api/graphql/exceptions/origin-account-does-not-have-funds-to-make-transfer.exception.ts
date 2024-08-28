import { GraphQLError } from "graphql";

export class OriginAccountDoesNotHaveFundsToMakeTransferException extends GraphQLError {
    public constructor() {
        super('Origin account does not have funds to make the transfer')
    }
}