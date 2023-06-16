import {
    DataTypes,
    Model
} from 'sequelize';
import SequelizeConnection from '../services/sequelize-connection';
import ProfileModel from './profile';

export default class MatchModel extends Model {
    declare id: number;
}

MatchModel.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    customer_profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProfileModel,
            key: 'id'
        }
    },
    professional_profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProfileModel,
            key: 'id'
        }
    },
}, {
    modelName: 'match',
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
    indexes: [
        {
            unique: true,
            fields: ['customer_profile_id', 'professional_profile_id']
        }
    ]
});

MatchModel.hasOne(ProfileModel, { foreignKey: 'customer_profile_id' });
MatchModel.hasOne(ProfileModel, { foreignKey: 'professional_profile_id' });