export class OriginAccountBalanceZeroException extends Error {
    public constructor() {
        super('Origin account balance is less or equal than zero')
    }
}