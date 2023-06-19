import {
    DataTypes,
    Model
} from 'sequelize';

import SequelizeConnection from '../services/sequelize-connection';

export default class SwipeModel extends Model {
    declare id: number;
    declare source_profile_id: number;
    declare target_profile_id: number;
    declare accepted: boolean;
}

SwipeModel.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    accepted: {
        type: DataTypes.BOOLEAN,
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