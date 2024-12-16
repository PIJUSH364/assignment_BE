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
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    findOne(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.model();
            const obj = yield model.findOne(predicate);
            return obj;
        });
    }
    softDelete(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.model();
            const obj = yield model.destroy(predicate);
            return obj;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.model();
            const obj = yield model.create(data);
            return obj;
        });
    }
    update(data, prediction) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.model();
            const obj = yield model.update(data, prediction);
            return obj;
        });
    }
    find() {
        return __awaiter(this, arguments, void 0, function* (prediction = {}) {
            const model = this.model();
            const obj = yield model.findAll(prediction);
            return obj;
        });
    }
    findAndCount() {
        return __awaiter(this, arguments, void 0, function* (prediction = {}) {
            const model = this.model();
            const obj = yield model.findAndCountAll(prediction);
            return obj;
        });
    }
}
exports.default = BaseRepository;
