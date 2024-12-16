"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ContactRepository_1 = __importDefault(require("../../../repositories/ContactRepository"));
const BaseUseCase_1 = __importDefault(require("../../BaseUseCase"));
const Enumerations_1 = require("../../../domain/enumerations/Enumerations");
const SearchContactJoi_1 = __importDefault(require("./SearchContactJoi"));
class SearchContactUseCase extends BaseUseCase_1.default {
    constructor(request, response, contactRepository) {
        super(request, response);
        this.contactRepository = contactRepository;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validate(Enumerations_1.joiObjectEnum.REQUEST_PARAMS, SearchContactJoi_1.default);
                const searchQuery = this.pathParams.query.trim();
                // const searchQuery = "searchTerm";
                const condition = {
                    where: {
                        [sequelize_1.Op.or]: [
                            { name: { [sequelize_1.Op.iLike]: `%${searchQuery}%` } },
                            { email: { [sequelize_1.Op.iLike]: `%${searchQuery}%` } },
                            { phone_number: { [sequelize_1.Op.iLike]: `%${searchQuery}%` } },
                            { tag: { [sequelize_1.Op.iLike]: `%${searchQuery}%` } },
                            { contact_id: { [sequelize_1.Op.iLike]: `%${searchQuery}%` } },
                        ],
                    },
                };
                const data = yield this.contactRepository.find(condition);
                return {
                    code: 200,
                    message: "data fetch successfully ",
                    data,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    static create(request, response) {
        return new SearchContactUseCase(request, response, new ContactRepository_1.default());
    }
}
exports.default = SearchContactUseCase;
