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
const Enumerations_1 = require("../../../domain/enumerations/Enumerations");
const ContactRepository_1 = __importDefault(require("../../../repositories/ContactRepository"));
const BaseUseCase_1 = __importDefault(require("../../BaseUseCase"));
const DeleteContactJoi_1 = __importDefault(require("./DeleteContactJoi"));
class DeleteUseCase extends BaseUseCase_1.default {
    constructor(request, response, contactRepository) {
        super(request, response);
        this.contactRepository = contactRepository;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validate(Enumerations_1.joiObjectEnum.REQUEST_PARAMS, DeleteContactJoi_1.default);
                const data = yield this.contactRepository.softDelete({ where: { id: this.pathParams.id } });
                console.log("data", data);
                return {
                    code: 200,
                    message: "user deleted successfully",
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    static create(request, response) {
        return new DeleteUseCase(request, response, new ContactRepository_1.default());
    }
}
exports.default = DeleteUseCase;
