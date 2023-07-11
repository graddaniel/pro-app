import { StatusCodes } from 'http-status-codes';
import type { Response } from 'express';

import { DECIMAL_RADIX } from '../generic/constants';

import type { AuthenticatedRequest } from '../generic/types';
import type ProfilesService from '../services/profiles-service';
import ProfileValidator from './validators/profile-validator';
import SwipeValidator from './validators/swipe-validator';

export default class ProfilesController {
    private profilesService: ProfilesService;

    constructor(profilesService: ProfilesService) {
        this.profilesService = profilesService;
    }

    getProfilesToSwipe = async (
        req: AuthenticatedRequest,
        res: Response
    ): Promise<void> => {
        const {
            id: accountId,
        } = req.currentUser;

        const profiles = await this.profilesService.getProfilesToSwipe(
            accountId
        );

        res.status(StatusCodes.OK).send(profiles);
    };

    getProfileByAccountId = async (
        req: AuthenticatedRequest,
        res: Response
    ): Promise<void> => {
        const {
            id: accountId
        } = req.currentUser;

        const profile = await this.profilesService.getProfileByAccountId(
            accountId
        );

        res.status(StatusCodes.OK).send(profile);
    };

    getMatches = async (
        req: AuthenticatedRequest,
        res: Response
    ): Promise<void> => {
        const {
            id: accountId
        } = req.currentUser;

        const profiles = await this.profilesService.getMatches(
            accountId
        );

        res.status(StatusCodes.OK).send(profiles);
    };

    postProfiles = async (
        req: AuthenticatedRequest,
        res: Response
    ): Promise<void> => {
        const {
            id: accountId
        } = req.currentUser;

        const { name, age, description, role } = req.body;

        await ProfileValidator.validateNewProfile({
            name,
            age,
            description,
            role
        });

        await this.profilesService.createProfile(
            accountId,
            name,
            age,
            description,
            role
        );

        res.status(StatusCodes.OK).send();
    };

    swipeProfile = async (
        req: AuthenticatedRequest,
        res: Response
    ): Promise<void> => {
        const {
            id: accountId
        } = req.currentUser;

        const {
            id: profileToSwipeId,
            accepted
        } = req.body;

        await SwipeValidator.validateNewSwipe({
            id: profileToSwipeId,
            accepted
        });

        await this.profilesService.swipeProfile(
            accountId,
            profileToSwipeId,
            accepted
        );

        res.status(StatusCodes.CREATED).send();
    };
}
