import { GraphQLError } from "graphql";

export class OriginAccountNotFoundException extends GraphQLError {
    public constructor() {
        super('Origin account not found')
    }
}