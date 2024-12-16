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
const ContactCategoryJoi_1 = __importDefault(require("./ContactCategoryJoi"));
const Enumerations_1 = require("../../../domain/enumerations/Enumerations");
class ContactCategoryUseCase extends BaseUseCase_1.default {
    constructor(request, response, contactRepository) {
        super(request, response);
        this.contactRepository = contactRepository;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                this.validate(Enumerations_1.joiObjectEnum.REQUEST_PARAMS, ContactCategoryJoi_1.default);
                const searchQuery = (_b = (_a = this.queryParams) === null || _a === void 0 ? void 0 : _a.search) === null || _b === void 0 ? void 0 : _b.trim();
                const filterValue = (_d = (_c = this.queryParams) === null || _c === void 0 ? void 0 : _c.filterBy) === null || _d === void 0 ? void 0 : _d.trim();
                let condition = {};
                if (searchQuery) {
                    condition = {
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
                }
                if (filterValue) {
                    condition = {
                        where: {
                            status: filterValue,
                        },
                    };
                }
                const data = yield this.contactRepository.find(Object.assign(Object.assign({}, condition), { attributes: [
                        "tag", // The column to group by
                        [sequelize_1.Sequelize.fn("COUNT", sequelize_1.Sequelize.col("tag")), "count"], // Count records for each tag
                    ], group: ["tag"], order: [[sequelize_1.Sequelize.literal("count"), "DESC"]] }));
                return {
                    code: 200,
                    message: "category wise data fetch successfully ",
                    data,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    static create(request, response) {
        return new ContactCategoryUseCase(request, response, new ContactRepository_1.default());
    }
}
exports.default = ContactCategoryUseCase;
