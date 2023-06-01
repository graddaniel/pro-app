import {
    DataType,
    DataTypes,
    Model
} from 'sequelize';
import SequelizeConnection from '../services/sequelize-connection';

export default class PhotoModel extends Model {}

PhotoModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    url: {
        type: DataTypes.TEXT,
    }
}, {
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
});