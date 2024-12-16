"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const ErrorUtility_1 = __importDefault(require("../../../domain/constants/message/ErrorUtility"));
const SearchContactJoi = joi_1.default.object({
    query: joi_1.default.string().required().messages(ErrorUtility_1.default.joiHelper("query", "string", false)),
});
exports.default = SearchContactJoi;
