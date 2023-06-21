import { StatusCodes } from "http-status-codes";
import ProfileModel from "../../models/profile";

export default class UnexpectedProfileError extends Error {
    statusCode: number;

    constructor(profile: ProfileModel) {
        super(`Unexpected profile: ${JSON.stringify(profile)}`);

        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
}