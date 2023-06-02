import {
    DataTypes,
    Model
} from 'sequelize';
import SequelizeConnection from '../services/sequelize-connection';

import PhotoModel from './photo';

const USERNAME_MAX_LENGTH = 32;
const PASSWORD_LENGTH = 64; //SHA256
const EMAIL_MAX_LENGTH = 64;
const DESCRIPTION_MAX_LENGTH = 256;
const NAME_MAX_LENGTH = 32;

export default class ProfileModel extends Model {
    declare id: number;
    declare description: string;
}

//TODO split this into account and profile
ProfileModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING(DESCRIPTION_MAX_LENGTH),
    },
    /*name: {
        type: DataTypes.STRING(NAME_MAX_LENGTH),
        allowNull: false,
    },
    age: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }*/
    // address
    // services
    // price min
    // price max
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
});

ProfileModel.hasMany(PhotoModel, { foreignKey: 'profileId' });
