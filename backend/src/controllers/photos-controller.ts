import { StatusCodes } from 'http-status-codes';

import type { Response } from 'express';

import type PhotosService from '../services/photos-service';
import type { AuthenticatedRequest } from '../generic/types';

export default class PhotosController {
    private photosService: PhotosService;

    constructor(photosService: PhotosService) {
        this.photosService = photosService;
    }

    postPhotos = async (
        req: AuthenticatedRequest,
        res: Response,
    ): Promise<void> => {
        const {
            id,
            username,
        } = req.currentUser;

        console.log(req.files);

        res.status(StatusCodes.OK).send();
    }
}