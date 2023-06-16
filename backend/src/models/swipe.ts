import {
    DataTypes,
    Model
} from 'sequelize';

import SequelizeConnection from '../services/sequelize-connection';
import ProfileModel from './profile';

export default class SwipeModel extends Model {
    declare id: number;
    declare source_profile_id: number;
    declare target_profile_id: number;
    declare accept: 'yes' | 'no';
}

SwipeModel.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    accept: {
        type: DataTypes.ENUM('yes', 'no'),
        allowNull: false,
    }
}, {
    modelName: 'swipe',
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
    indexes: [
        {
            unique: true,
            fields: ['source_profile_id', 'target_profile_id'],
        }
    ]
});

ProfileModel.hasMany(SwipeModel, { foreignKey: 'source_profile_id' });
ProfileModel.hasMany(SwipeModel, { foreignKey: 'target_profile_id' });
