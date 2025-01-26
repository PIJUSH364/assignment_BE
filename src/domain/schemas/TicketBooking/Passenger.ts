import { Model, DataTypes } from "sequelize";
import { postgresConnector } from "../../../core/utils/absoluteFilePath";

const gender = ['male', 'female',] as const;
type GenderType = (typeof gender)[number];

interface PassengerAttributes {
    id: number;
    name: string;
    age: string;
    email: string;
    gender: GenderType;
    hasChild: Boolean;
    hasSeniorCitizen: Boolean;
    createdAt: Date;
    updatedAt?: Date;
}




export default class PassengerModel extends Model<PassengerAttributes> implements PassengerAttributes {
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
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
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


