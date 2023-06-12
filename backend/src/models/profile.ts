import {
    DataTypes,
    Model
} from 'sequelize';
import SequelizeConnection from '../services/sequelize-connection';

import PhotoModel from './photo';

const DESCRIPTION_MAX_LENGTH = 256;
const NAME_MAX_LENGTH = 32;

export default class ProfileModel extends Model {
    declare id: number;
    declare description: string;
    name: string;
    age: number;
}

ProfileModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING(DESCRIPTION_MAX_LENGTH),
    },
    name: {
        type: DataTypes.STRING(NAME_MAX_LENGTH),
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // address: {}
    // services
    // price min
    // price max
}, {
    modelName: 'profile',
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
});

ProfileModel.hasMany(PhotoModel, { foreignKey: 'profileId' });
