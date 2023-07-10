import { StatusCodes } from 'http-status-codes';

export default class BusinessLogicError extends Error {
    statusCode: StatusCodes;

    constructor(message: string) {
        super(message);

        this.statusCode = StatusCodes.CONFLICT;
    }
}