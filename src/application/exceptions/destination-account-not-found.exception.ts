export class DestinationAccountNotFoundException extends Error {
    public constructor() {
        super('Destination account not found')
    }
}