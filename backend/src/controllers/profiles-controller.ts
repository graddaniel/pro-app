import { StatusCodes } from 'http-status-codes';

import type { Request, Response } from 'express';

import type ProfilesService from '../services/profiles-service';


export default class ProfilesController {
    private profilesService: ProfilesService;

    constructor(profilesService: ProfilesService) {
        this.profilesService = profilesService;
    }

    getProfiles = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const profiles = await this.profilesService.getProfiles();

        res.status(StatusCodes.OK).send(profiles);
    }

    postProfiles = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const {
            username,
            password,
            email,
        } = req.body;
        //TODO validation

        await this.profilesService.createProfile(
            username,
            password,
            email,
        );

        res.status(StatusCodes.OK).send();
    }
}