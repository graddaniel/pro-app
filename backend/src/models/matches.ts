import {
    DataTypes,
    Model
} from 'sequelize';
import SequelizeConnection from '../services/sequelize-connection';

export default class MatchModel extends Model {
    declare id: number;
    declare customer_profile_id: number;
    declare professional_profile_id: number;
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
        unique: true,
    },
    professional_profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
}, {
    modelName: 'match',
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
});
