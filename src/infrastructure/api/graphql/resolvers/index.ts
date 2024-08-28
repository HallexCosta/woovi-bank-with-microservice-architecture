import { dateScalar } from '../scalars/date.scalar'
import { mutation } from './mutation'
import { query } from './query'
import { container } from '../../../container';
import { bigIntScalar } from '../scalars/big-int.scalar';

// Resolvers
const resolvers = {
  Date: dateScalar,
  BigInt: bigIntScalar,
  Query: query(container),
  Mutation: mutation(container)
};

export { resolvers }