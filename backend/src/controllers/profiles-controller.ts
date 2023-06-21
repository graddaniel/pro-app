import { StatusCodes } from 'http-status-codes';
import type { Response } from 'express';

import { DECIMAL_RADIX } from '../generic/constants';

import type { AuthenticatedRequest } from '../generic/types';
import type ProfilesService from '../services/profiles-service';
import type ProfileModel from '../models/profile';
import ProfileValidator from './validators/profile-validator';

export default class ProfilesController {
    private profilesService: ProfilesService;

    constructor(profilesService: ProfilesService) {
        this.profilesService = profilesService;
    }

    getProfiles = async (
        req: AuthenticatedRequest,
        res: Response
    ): Promise<void> => {
        const {
            id: accountId,
        } = req.currentUser;

        const profiles = await this.profilesService.getProfiles(
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
}
