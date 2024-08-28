export class OriginAccountDoesNotHaveFundsToMakeTransferException extends Error {
    public constructor() {
        super('Origin account does not have funds to make the transfer')
    }
}