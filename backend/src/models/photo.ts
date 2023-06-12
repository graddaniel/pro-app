import {
    DataType,
    DataTypes,
    Model
} from 'sequelize';
import SequelizeConnection from '../services/sequelize-connection';

export default class PhotoModel extends Model {
    declare id: number;
    declare url: string;
}

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
    modelName: 'photo',
    timestamps: false,
    sequelize: SequelizeConnection.instance(),
});