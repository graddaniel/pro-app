import MissingAuthorizationHeaderError from './errors/missing-authorization-header-error.js';
import InvalidAuthorizationTypeError from './errors/invalid-authorization-type-error.js';
import InvalidBasicAuthorizationHeaderFormatError from './errors/invalid-basic-authorization-header-format-error.js';
import MissingCredentialsError from './errors/missing-credentials-error.js';

import type {
    Response,
    NextFunction,
} from 'express';
import type {
    Request,
} from '../generic/types.js';

export function extractCredentials(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new MissingAuthorizationHeaderError();
    }

    const [
        authorizationType,
        base64credentials
    ] = authorization.split(" ");
    if (authorizationType.toLowerCase() !== 'basic') {
        throw new InvalidAuthorizationTypeError(authorizationType.toLowerCase(), 'basic');
    }
    if (!base64credentials) {
        throw new InvalidBasicAuthorizationHeaderFormatError();
    }

    const credentialsBuffer = Buffer.from(base64credentials, 'base64');
    const credentialsString = credentialsBuffer.toString('utf-8');
    const [username, password] = credentialsString.split(':');
    if (!username || !password) {
        throw new MissingCredentialsError();
    }

    req.credentials = {
        username,
        password,
    };

    next();
}