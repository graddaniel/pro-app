import type { Request as ExpressRequest } from 'express';

import type MatchModel from '../models/matches';
import type SwipeModel from '../models/swipe';

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

export type Match = Pick<MatchModel, 'customer_profile_id' | 'professional_profile_id'>;

export type Swipe = Pick<SwipeModel, 'source_profile_id' | 'target_profile_id' | 'accepted'>;
