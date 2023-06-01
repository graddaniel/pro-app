import { Sequelize } from 'sequelize';
import config from 'config';

type DatabaseConfig = {
    username: string;
    password: string;
    host: string;
    port: number;
    name: string;
};

export default class SequelizeConnection {
    private static _sequelize: Sequelize;

    private static init = () => {
        const {
            username,
            password,
            host,
            port,
            name,
        } = config.get("database") as DatabaseConfig;

        SequelizeConnection._sequelize = new Sequelize(`mysql://${username}:${password}@${host}:${port}/${name}`);
    }

    static instance = () => {
        if (!SequelizeConnection._sequelize) {
            SequelizeConnection.init();
        }

        return SequelizeConnection._sequelize;
    }
}