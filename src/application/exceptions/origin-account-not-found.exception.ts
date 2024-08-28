export class OriginAccountNotFoundException extends Error {
    public constructor() {
        super('Origin account not found')
    }
}