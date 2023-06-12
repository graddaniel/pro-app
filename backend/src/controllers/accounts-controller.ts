import { StatusCodes } from 'http-status-codes';

import AccountsValidator from './validators/accounts-validator';

import type { Response } from 'express';

import type AccountsService from '../services/accounts-service';
import type { AuthenticationRequest } from '../generic/types';

export default class AccountsController {
    private accountsService: AccountsService;

    constructor(accountsService: AccountsService) {
        this.accountsService = accountsService;
    }

    getAccounts = async (
        req: AuthenticationRequest,
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
        req: AuthenticationRequest,
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
        
        await AccountsValidator.validateNewAccount({
            username,
            password,
            email,
            role,
        });

        const jwtToken = await this.accountsService.register(
            username,
            password,
            email,
            role,
        );

        res.status(StatusCodes.OK).send(jwtToken);
    }
}