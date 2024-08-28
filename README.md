## Woovi Bank Challenger

Architecture based in concepets follow Clear Architecture from Uncle Bob.  
Code with high level uncopling between application/bussiness rules and infra (external dependencies).

> The environment variable can be found in .env.example

### Techs

- [x] Node.js
- [x] MongoDB
- [x] Typescript
- [x] GraphQL

## Libs

- [x] Koa.js as HTTP Server for Rest API
- [x] Appollo Server as HTTP Server for GraphQL
- [x] Mongoose as ODM for MongoDB
- [x] Jest as library test
- [x] Turbo Repo as Manager Monorepo
- [x] Bottle.js as a manager and injector dependencies

## Features

- [x] Make transaction between two users


# Entities

- Account
- Transaction

## Repositories Implemented

- MongoAccountsRepository
- MongoTransactionsRepository
- InMemoryAccountsRepository
- InMemoryTransactionsRepository

## Exceptions

- DestinationAccountNotFound
- OriginAccountBalanceZero
- OriginAccountDoesNotHaveFundsToMakeTransfer
- OriginAccountNotFound
- TransferAmountIsLessThanOrEqualZero

## Common
Layer with responsability shared common/helpers functions
