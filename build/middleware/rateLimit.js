"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.expressRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1000 * 60, // 1 mins in milliseconds
    max: 50,
    handler: function (req, res, next) {
        res.status(429).json({ message: "You have exceeded the 50 requests in 1 minute!", status: 429 });
    },
    standardHeaders: true,
    legacyHeaders: false,
});
