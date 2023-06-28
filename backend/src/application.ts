import express from 'express';
import 'express-async-errors';
import config from 'config';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';

import AccountsController from './controllers/accounts-controller';
import ProfilesController from './controllers/profiles-controller';
import PhotosController from './controllers/photos-controller';
import AccountsService from './services/accounts-service';
import ProfilesService from './services/profiles-service';
import PhotosService from './services/photos-service';
import SequelizeConnection from './services/sequelize-connection';
import SwipesService from './services/swipes-service';
import MatchesService from './services/matches-service';
import { extractCredentials } from './middleware/extract-credentials';
import { requireJWT } from './middleware/require-jwt';

import type { Application } from 'express';


type PhotosConfig = {
    directory: string,
    maxCount: number,
}

export default class Appplication {
    private app: Application;

    constructor() {
        const swipesService = new SwipesService();
        const matchesService = new MatchesService(swipesService);

        const accountsService = new AccountsService();
        const accountsController = new AccountsController(accountsService);

        const profilesService = new ProfilesService(
            matchesService,
            swipesService
        );
        const profilesController = new ProfilesController(profilesService);

        const photosService = new PhotosService();
        const photosController = new PhotosController(photosService);

        SequelizeConnection.instance().sync();

        this.app = express();

        this.app.use(bodyParser.json());
        this.app.use(cors());

        const photosConfig = config.get('photos') as PhotosConfig;
        const upload = multer({ dest: photosConfig.directory });

        const accountsRouter = express.Router();
        accountsRouter.get('/', extractCredentials, accountsController.getAccounts);
        accountsRouter.post('/', extractCredentials, accountsController.postAccounts);
        this.app.use('/accounts', accountsRouter);

        const profilesRouter = express.Router();
        profilesRouter.get('/', requireJWT, profilesController.getProfilesToSwipe);
        profilesRouter.post('/', requireJWT, profilesController.postProfiles);
        profilesRouter.post('/swipe', requireJWT, profilesController.swipeProfile);
        profilesRouter.get('/ofAccount', requireJWT, profilesController.getProfileByAccountId);

        const photosRouter = express.Router();
        photosRouter.post('/',
            upload.array('photos', photosConfig.maxCount),
            requireJWT,
            photosController.postPhotos
        );
        profilesRouter.use('/photos', photosRouter);

        this.app.use('/profiles', profilesRouter);



        this.app.use((err, req, res, next) => {
            //TODO temp error handler
            if (res.headersSent) {
                console.log("SENT");
                next(err);
            }
            console.log("ERROR", err.statusCode, err)

            res.status(err.statusCode).send(err.message);
        })
    }

    start = async (callback?: () => void | undefined) => {
        const API_PORT = config.get('api.port') as number;

        this.app.listen(
            API_PORT,
            callback || (() => console.log(`API is listening on port: ${API_PORT}`))
        );
    }
}