"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQueryContactJoi = exports.UpdateContactJoi = void 0;
const joi_1 = __importDefault(require("joi"));
const ErrorUtility_1 = __importDefault(require("../../../domain/constants/message/ErrorUtility"));
exports.UpdateContactJoi = joi_1.default.object({
    name: joi_1.default.string().required().messages(ErrorUtility_1.default.joiHelper("name", "string", false)),
    email: joi_1.default.string().email().required().messages(ErrorUtility_1.default.joiHelper("email", "string", false)),
    phone_number: joi_1.default.string().required().messages(ErrorUtility_1.default.joiHelper("phone_number", "string", false)),
    status: joi_1.default.string()
        .valid("draft", "finalized")
        .required()
        .messages(ErrorUtility_1.default.joiHelper("status", "string", false)),
    tag: joi_1.default.string().optional().messages(ErrorUtility_1.default.joiHelper("tag", "string", true)),
});
exports.UpdateQueryContactJoi = joi_1.default.object({
    id: joi_1.default.string().required().messages(ErrorUtility_1.default.joiHelper("id", "string", false)),
});
