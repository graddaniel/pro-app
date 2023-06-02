import { Op } from 'sequelize';

import AccountModel from '../models/account';
import AccountAlreadyExists from './errors/account-already-exists-error';
import AccountNotFoundError from './errors/account-not-found-error';
import IncorrectPasswordError from './errors/incorrect-password-error';
import JWTService from './jwt-service';
import { hash } from '../utils'

import type { AccountRoles } from '../generic/constants';

export default class AccountsService {
    login = async (
        username: string,
        password: string
    ): Promise<string> => {
        const account = await AccountModel.findOne({
            where: {
                username,
            }
        });

        if (!account) {
            throw new AccountNotFoundError();
        }

        const providedPasswordHash = hash(password);
        if (providedPasswordHash !== account.passwordHash) {
            throw new IncorrectPasswordError();
        }

        return JWTService.sign({
            id: account.id,
            username: account.username,
            email: account.email,
            role: account.role,
        });
    }

    register = async (
        username: string,
        password: string,
        email: string,
        role: AccountRoles,
    ): Promise<string> => {
        const account = await AccountModel.findOne({
            where: {
                [Op.or]: [
                    { username },
                    { email }
                ],
            }
        });

        if (account) {
            throw new AccountAlreadyExists(username, email);
        }

        const newAccount = await AccountModel.create({
            username,
            passwordHash: hash(password),
            email,
            role,
        });

        return JWTService.sign({
            id: newAccount.id,
            username: newAccount.username,
            email: newAccount.email,
            role: newAccount.role,
        });
    }
}