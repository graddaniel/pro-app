import jwt from 'jsonwebtoken';

import MissingJWTSecretError from './errors/missing-jwt-secret-error.js';
import JWTVerificationFailedError from './errors/jwt-verification-failed-error.js';

import type {
    JWTUserInfo
} from '../generic/types.js';

const TOKEN_VALIDITY_PERIOD = '1d';

export default class JWTService {
    static get secret(): string {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new MissingJWTSecretError();
        }

        return secret;
    }

    static sign(data: any): string {
        return jwt.sign(
            data,
            JWTService.secret,
            { expiresIn: TOKEN_VALIDITY_PERIOD }
        );
    }

    static verify(token: string): JWTUserInfo {
        try {
            return jwt.verify(token, JWTService.secret) as JWTUserInfo;
        } catch (error) {
            throw new JWTVerificationFailedError(error);
        }
    }
}