import { GraphQLError } from "graphql";

export class DestinationAccountNotFoundException extends GraphQLError {
    public constructor() {
        super('Destination account not found')
    }
}