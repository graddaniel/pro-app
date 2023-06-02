import {
    DataTypes,
    Model
} from 'sequelize';

import SequelizeConnection from '../services/sequelize-connection';
import ProfileModel from './profile';

import { AccountRoles } from '../generic/constants';

const USERNAME_MAX_LENGTH = 32;
const PASSWORD_LENGTH = 64; //SHA256
const EMAIL_MAX_LENGTH = 64;

export default class AccountModel extends Model {
    declare id: number;
    declare username: string;
    declare passwordHash: string;
    declare email: string;
    declare role: AccountRoles;
}

AccountModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(USERNAME_MAX_LENGTH),
        allowNull: false,
        unique: true,
    },
    passwordHash: {
        type: DataTypes.STRING(PASSWORD_LENGTH),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(EMAIL_MAX_LENGTH),
        allowNull: false,
        unique: true,
    },
    role: {
        type: DataTypes.ENUM(...Object.values(AccountRoles)),
        allowNull: false,
    }
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
});

AccountModel.hasOne(ProfileModel, { foreignKey: 'accountId' });
