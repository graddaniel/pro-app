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
    }
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

ProfileModel.hasMany(MatchModel, { foreignKey: 'customer_profile_id' });
ProfileModel.hasMany(MatchModel, { foreignKey: 'professional_profile_id' });