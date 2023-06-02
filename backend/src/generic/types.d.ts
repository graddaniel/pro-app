import type { Request as ExpressRequest } from 'express';
import type { AccountRoles } from '../generic/constants';

export type AuthenticationRequest = {
    credentials: {
        username: string,
        password: string,
    }
} & ExpressRequest;

export type JWTUserInfo = {
    id: number,
    username: string,
    email: string,
    role: AccountRoles,
}

export type AuthenticatedRequest = {
    currentUser: JWTUserInfo;
} & ExpressRequest;