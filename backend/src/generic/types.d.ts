import type { Request as ExpressRequest } from 'express';

export type AuthenticationRequest = {
    credentials: {
        username: string,
        password: string,
    }
} & ExpressRequest;

export type JWTUserInfo = {
    id: number,
    username: string,
    email: string
}

export type AuthenticatedRequest = {
    currentUser: JWTUserInfo;
} & ExpressRequest;