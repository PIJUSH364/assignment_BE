import { Model, DataTypes } from "sequelize";
import { postgresConnector } from "../../../core/utils/absoluteFilePath";
import BookingModel from './Booking';

const gender = ['male', 'female'] as const;
type GenderType = (typeof gender)[number];

class PassengerModel extends Model {
    id: number;
    name: string;
    age: string;
    email: string;
    gender: GenderType;
    hasChild: Boolean;
    hasSeniorCitizen: Boolean;
    createdAt: Date;
    updatedAt: Date;
}

PassengerModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('male', 'female'),
            allowNull: false,
        },
        hasChild: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        hasSeniorCitizen: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
    },
    {
        sequelize: postgresConnector,
        modelName: "passenger",
        tableName: "passenger",
        timestamps: true,
        paranoid: true,
    },
);


PassengerModel.hasMany(BookingModel, {
    foreignKey: "passengerId",
});

BookingModel.belongsTo(PassengerModel, {
    foreignKey: "passengerId",
});

export default PassengerModel

