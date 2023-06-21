import { StatusCodes } from "http-status-codes";

export default class ProfileNotFound extends Error {
    statusCode: StatusCodes;

    constructor(accountId: number) {
        super(`Account does not have a profile. Account_id: ${accountId}`);

        this.statusCode = StatusCodes.NOT_FOUND;
    }
}