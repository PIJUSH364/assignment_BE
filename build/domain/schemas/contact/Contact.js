"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const absoluteFilePath_1 = require("../../../core/utils/absoluteFilePath");
const crypto_1 = __importDefault(require("crypto"));
class ContactModel extends sequelize_1.Model {
}
exports.default = ContactModel;
ContactModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    contact_id: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: true,
        validate: {
            len: [5, 5],
            isAlphanumeric: true,
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tag: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "others",
    },
    status: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["draft", "finalized"],
        defaultValue: "draft",
        allowNull: false,
    },
}, {
    sequelize: absoluteFilePath_1.postgresConnector,
    modelName: "contact",
    tableName: "contacts",
    timestamps: true,
    paranoid: true,
    hooks: {
        beforeCreate: (contact) => {
            contact.contact_id = generateRandomId(5);
        },
    },
});
function generateRandomId(length) {
    return crypto_1.default
        .randomBytes(length)
        .toString("base64")
        .replace(/[^a-zA-Z0-9]/g, "")
        .substring(0, length);
}
