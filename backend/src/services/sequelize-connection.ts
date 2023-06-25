import { Sequelize, Transaction, TransactionOptions } from 'sequelize';
import cls from 'cls-hooked';
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
    private static _namespace: cls.Namespace;

    private static init = () => {
        const {
            username,
            password,
            host,
            port,
            name,
        } = config.get("database") as DatabaseConfig;

        SequelizeConnection._namespace = cls.createNamespace('sequelize-transaction');
        Sequelize.useCLS(SequelizeConnection._namespace);

        SequelizeConnection._sequelize = new Sequelize(`mysql://${username}:${password}@${host}:${port}/${name}`);
    }

    static instance = () => {
        if (!SequelizeConnection._sequelize) {
            SequelizeConnection.init();
        }

        return SequelizeConnection._sequelize;
    }

    static transaction = (option?: TransactionOptions) => (
        operation: () => Promise<void>
    ) => async function (): Promise<void> {
        let transaction = SequelizeConnection._namespace.get('transaction');
        let hasTransaction = transaction ? true : false;
        transaction = transaction || await SequelizeConnection._sequelize.transaction(option);

        try {
            await operation.apply(null, arguments)
            if (!hasTransaction) {
                await transaction.commit();
            }
        } catch (error) {
            if (!hasTransaction) {
                await transaction.rollback();
            }
            throw error;
        }
    }
}