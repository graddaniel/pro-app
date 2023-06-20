import { StatusCodes } from "http-status-codes";

export default class ProfileNotFound extends Error {
    statusCode: StatusCodes;

    constructor() {
        super('User does not have a profile');

        this.statusCode = StatusCodes.NOT_FOUND;
    }
}