import { StatusCodes } from 'http-status-codes';

import type { Response } from 'express';

import type AccountsService from '../services/accounts-service';
import type { Request } from '../generic/types';

export default class AccountsController {
    private accountsService: AccountsService;

    constructor(accountsService: AccountsService) {
        this.accountsService = accountsService;
    }

    getAccounts = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const {
            username,
            password,
        } = req.credentials;

        const jwtToken = await this.accountsService.login(
            username,
            password
        );

        res.status(StatusCodes.OK).send(jwtToken);
    }

    postAccounts = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const {
            username,
            password,
        } = req.credentials;

        const {
            email,
            role,
        } = req.body;
        //TODO validation

        const jwtToken = await this.accountsService.register(
            username,
            password,
            email,
            role,
        );

        res.status(StatusCodes.OK).send(jwtToken);
    }
}