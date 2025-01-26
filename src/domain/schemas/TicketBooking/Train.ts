
import { DataTypes, Model } from 'sequelize'
import { postgresConnector } from '../../../core/utils/absoluteFilePath';

interface TrainAttributes {
    id: number;
    TrainName: String;
    SeatCount: number;
    journeyDate: Date;
    createdAt: Date;
    updatedAt: Date;

}

export default class TrainModel extends Model<TrainAttributes> implements TrainAttributes {
    id: number;
    TrainName: String;
    SeatCount: number;
    journeyDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

TrainModel.init
    ({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        TrainName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        SeatCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        journeyDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize: postgresConnector,
        modelName: "train",
        tableName: "train",
        timestamps: true,
        paranoid: true,
    },)
