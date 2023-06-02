import type { Request as ExpressRequest } from 'express';

export type Request = {
    credentials: {
        username: string,
        password: string,
    }
} & ExpressRequest;