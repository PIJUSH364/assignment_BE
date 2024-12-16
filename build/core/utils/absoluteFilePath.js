"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresConnector = void 0;
const models_1 = __importDefault(require("../../domain/models"));
exports.postgresConnector = models_1.default.sequelize;
