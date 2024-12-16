"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const ErrorUtility_1 = __importDefault(require("../../../domain/constants/message/ErrorUtility"));
const ContactCategoryJoi = joi_1.default.object({
    search: joi_1.default.string().allow("").optional().messages(ErrorUtility_1.default.joiHelper("search", "string", false)),
    filterBy: joi_1.default.string()
        .allow("draft", "finalized")
        .optional()
        .messages(ErrorUtility_1.default.joiHelper("filterBy", "string", false)),
});
exports.default = ContactCategoryJoi;
