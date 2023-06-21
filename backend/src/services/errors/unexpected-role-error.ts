import { StatusCodes } from "http-status-codes";

export default class UnexpectedRoleError extends Error {
    statusCode: number;

    constructor(role: string) {
        super(`Unexpected profile role. Role: ${role}`);

        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
}