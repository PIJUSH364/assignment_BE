"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contact_1 = __importDefault(require("../domain/schemas/contact/Contact"));
const BaseRepository_1 = __importDefault(require("./BaseRepository"));
class ContactRepository extends BaseRepository_1.default {
    constructor() {
        super();
    }
    model() {
        return Contact_1.default;
    }
}
exports.default = ContactRepository;
