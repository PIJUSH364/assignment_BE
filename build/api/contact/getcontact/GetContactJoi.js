"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const ErrorUtility_1 = __importDefault(require("../../../domain/constants/message/ErrorUtility"));
const GetContactJoi = joi_1.default.object({
    page: joi_1.default.string().required().messages(ErrorUtility_1.default.joiHelper("page", "string", false)),
    limit: joi_1.default.string().required().messages(ErrorUtility_1.default.joiHelper("limit", "string", false)),
    search: joi_1.default.string().allow("").optional().messages(ErrorUtility_1.default.joiHelper("search", "string", false)),
    filterBy: joi_1.default.string()
        .allow("draft", "finalized")
        .optional()
        .messages(ErrorUtility_1.default.joiHelper("filterBy", "string", false)),
});
exports.default = GetContactJoi;
