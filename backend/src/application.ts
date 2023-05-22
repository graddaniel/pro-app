import express from 'express';
import 'express-async-errors';
import config from 'config';

import ProfilesController from './controllers/profiles-controller';

import type { Application } from 'express';


export default class Appplication {
    private app: Application;

    constructor() {

        this.app = express();

        this.app.get('/profiles', ProfilesController.getProfiles);
    }

    start = async (callback?: () => void | undefined) => {
        const API_PORT = config.get('api.port') as number;

        this.app.listen(
            API_PORT,
            callback || (() => console.log(`API is listening on port: ${API_PORT}`))
        );
    }
}