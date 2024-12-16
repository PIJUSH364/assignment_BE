"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
dotenv.config();
const app = (0, express_1.default)();
const port = (_a = process.env.port) !== null && _a !== void 0 ? _a : 8000;
const index_1 = __importDefault(require("./domain/models/index"));
const rateLimit_1 = require("./middleware/rateLimit");
// require("./domain/schemas/user/User");
//route
const Route_1 = __importDefault(require("./api/contact/Route"));
// Morgan Middleware for logging
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ limit: "100mb", extended: true }));
app.use(body_parser_1.default.json({ limit: "100mb" }));
// Security helmet
app.use((0, helmet_1.default)({
    frameguard: false,
}));
app.use((0, cors_1.default)({
    exposedHeaders: ["Content-Disposition"],
    origin: "*",
}));
app.set("trust proxy", 2);
//rate limiter using express-rate-limit
app.use(rateLimit_1.expressRateLimiter);
app.get("/", (_, res) => {
    res.send("sever running...");
});
app.use("/", Route_1.default);
// invalid route
app.get("*", (_, res) => {
    res.status(404).send("Invalid Endpoint");
});
process.on("uncaughtException", (error, origin) => {
    console.log("----- Uncaught exception -----");
    console.log(error);
    console.log("----- Exception origin -----");
    console.log(origin);
    process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
    console.log("----- Unhandled Rejection at -----");
    console.log(promise);
    console.log("----- Reason -----");
    console.log(reason);
    process.exit(1);
});
// db
index_1.default.sequelize
    .sync()
    .then(() => {
    console.log(`
      
        ${process.env.NODE_ENV} database running... on ${process.env.dbHost}
      
      `);
    app.listen(port, () => {
        console.log(`
        
        Server is running on http://localhost:${port}
      
      `);
    });
})
    .catch((err) => console.log(err));
