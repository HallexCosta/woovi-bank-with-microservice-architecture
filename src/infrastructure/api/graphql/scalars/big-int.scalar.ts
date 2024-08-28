import { GraphQLScalarType } from "graphql";

export const bigIntScalar = new GraphQLScalarType({
    name: 'BigInt',
    description: 'Big integer type',
    serialize(value) {
      return value.toString(); // Convert outgoing BigInt to string for JSON
    },
    parseValue(value) {
      return BigInt(value); // Convert incoming string to BigInt
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return BigInt(ast.value); // Convert hard-coded AST string to BigInt
      }
      return null; // Invalid hard-coded value (not a string)
    },
});