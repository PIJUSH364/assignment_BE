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
const express_1 = __importDefault(require("express"));
const urlConstant_1 = __importDefault(require("../../domain/constants/urlConstant/urlConstant"));
const CreateContactUseCase_1 = __importDefault(require("./createcontact/CreateContactUseCase"));
const GetContactUseCase_1 = __importDefault(require("./getcontact/GetContactUseCase"));
const DeleteContactUseCase_1 = __importDefault(require("./deletecontact/DeleteContactUseCase"));
const UpdateContactUseCase_1 = __importDefault(require("./updatecontact/UpdateContactUseCase"));
const ContactCategoryUseCase_1 = __importDefault(require("./categoryContact/ContactCategoryUseCase"));
const router = express_1.default.Router();
router.post(urlConstant_1.default.contact.create_contact, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const useCase = CreateContactUseCase_1.default.create(request, response);
    yield useCase.executeAndHandleErrors();
}));
router.put(urlConstant_1.default.contact.update_contact, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const useCase = UpdateContactUseCase_1.default.create(request, response);
    yield useCase.executeAndHandleErrors();
}));
router.delete(urlConstant_1.default.contact.delete_contact, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const useCase = DeleteContactUseCase_1.default.create(request, response);
    yield useCase.executeAndHandleErrors();
}));
router.get(urlConstant_1.default.contact.all_contact, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const useCase = GetContactUseCase_1.default.create(request, response);
    yield useCase.executeAndHandleErrors();
}));
router.get(urlConstant_1.default.contact.count_category, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const useCase = ContactCategoryUseCase_1.default.create(request, response);
    yield useCase.executeAndHandleErrors();
}));
exports.default = router;
