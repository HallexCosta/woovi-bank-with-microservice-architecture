import {buildSchema} from 'graphql'

// simple hack to not have to install external dependency on active highlight in vs-code :)
const gql = String.raw.bind(String)

const schemas = gql`
  scalar Date
  scalar BigInt

  type Query {
    listTransactions: [Transaction!]
    listAccounts: [Account!]
  }

  input CreateTransaction {
    amount: Float!
    originSenderAccountId: Int!
    destinationReceiverAccountId: Int!
  }
  input SendTransaction {
    amount: Float!
  }

  type Mutation {
    createTransaction(createTransaction: CreateTransaction!): Transaction!
    createAccount: Account
  }

  enum TransactionStatus {
    PENDING
    SUCCESS
    FAILED
  }

  enum TransactionTypes {
    CREDIT
    DEBIT
  }

  type Account {
    id: ID
    balance: BigInt
    createdAt: Date
    updatedAt: Date
  }

  type Transaction {
    id: ID
    amount: BigInt
    destinationReceiverAccountId: Int
    originSenderAccountId: Int
    # type: TransactionTypes
    status: TransactionStatus
    createdAt: Date
    updatedAt: Date
  }
`

// Schemas
const schema = buildSchema(schemas);


export { schema };