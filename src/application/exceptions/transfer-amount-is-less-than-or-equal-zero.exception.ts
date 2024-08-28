export class TransferAmountIsLessThanOrEqualZeroException extends Error {
    public constructor() {
        super('Transfer amount is less than or equal zero exception')
    }
}