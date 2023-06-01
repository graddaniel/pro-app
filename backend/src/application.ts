import express from 'express';
import 'express-async-errors';
import config from 'config';
import bodyParser from 'body-parser';

import ProfilesController from './controllers/profiles-controller';

import type { Application } from 'express';
import ProfilesService from './services/profiles-service';
import SequelizeConnection from './services/sequelize-connection';


export default class Appplication {
    private app: Application;

    constructor() {
        const profilesService = new ProfilesService();
        const profilesController = new ProfilesController(profilesService);

        SequelizeConnection.instance().sync();

        this.app = express();

        this.app.use(bodyParser.json())

        const profilesRouter = express.Router();
        profilesRouter.get('/', profilesController.getProfiles);
        profilesRouter.post('/', profilesController.postProfiles);
        this.app.use('/profiles', profilesRouter);

        this.app.use((err, req, res, next) => {
            if (res.headersSent) {
                console.log("SENT");
                next(err);
            }
            console.log("ERROR", err)

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