import cls from 'cls-hooked';
import { Sequelize } from 'sequelize';
import config from 'config';

type DatabaseConfig = {
    username: string;
    password: string;
    host: string;
    port: number;
    name: string;
};

const namespace = cls.createNamespace('sequelize');
Sequelize.useCLS(namespace);

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

    static transaction = (operation) =>
        async function (...args) {
            return namespace.get('transaction')
                ? operation.apply(null, args)
                : SequelizeConnection._sequelize.transaction(operation.bind(null, ...args));
        }
}