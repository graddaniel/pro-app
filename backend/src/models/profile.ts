import {
    DataTypes,
    Model
} from 'sequelize';

import SequelizeConnection from '../services/sequelize-connection';
import { AccountRoles } from '../generic/constants';

import PhotoModel from './photo';
import SwipeModel from './swipe';
import MatchModel from './matches';

const DESCRIPTION_MAX_LENGTH = 256;
const NAME_MAX_LENGTH = 32;

export default class ProfileModel extends Model {
    declare id: number;
    declare description: string;
    declare role: AccountRoles;
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
    role: {
        type: DataTypes.ENUM(...Object.values(AccountRoles)),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(NAME_MAX_LENGTH),
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
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
ProfileModel.hasMany(SwipeModel, { foreignKey: 'source_profile_id' });
ProfileModel.hasMany(SwipeModel, { foreignKey: 'target_profile_id' });
ProfileModel.hasMany(MatchModel, { foreignKey: 'customer_profile_id' });
ProfileModel.hasMany(MatchModel, { foreignKey: 'professional_profile_id' });