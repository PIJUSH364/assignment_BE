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
const standard_http_error_1 = __importDefault(require("standard-http-error"));
const utility_1 = __importDefault(require("../domain/service/utility"));
const Enumerations_1 = require("../domain/enumerations/Enumerations");
class BaseUseCase {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.tokenPayload = {};
    }
    validate(requestType, joiFunction = undefined) {
        this.requestBody = utility_1.default.trimInputs(this.request.body);
        this.pathParams = this.request.params;
        this.queryParams = this.request.query;
        let validateReqObj;
        if (requestType === Enumerations_1.joiObjectEnum.REQUEST_BODY) {
            validateReqObj = this.requestBody;
        }
        else if (requestType === Enumerations_1.joiObjectEnum.REQUEST_PARAMS) {
            validateReqObj = this.pathParams;
        }
        else if (requestType === Enumerations_1.joiObjectEnum.REQUEST_QUERY) {
            validateReqObj = this.queryParams;
        }
        if (validateReqObj)
            joiFunction && this.joiValidationUtil(joiFunction, validateReqObj);
    }
    joiValidationUtil(joiSchema, requestData) {
        try {
            const options = {
                allowUnknown: true,
            };
            const { error } = joiSchema.validate(requestData, options);
            if (error) {
                throw new standard_http_error_1.default(400, error.details[0].message.replace(/["]/gi, ""));
            }
        }
        catch (error) {
            console.log("error joi ======>", error);
            throw error;
        }
    }
    executeAndHandleErrors() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                let data = yield this.execute();
                if (data == null)
                    data = {};
                if (data.error)
                    throw data;
                if (typeof data === "string")
                    data = { message: data };
                const code = (_a = data.code) !== null && _a !== void 0 ? _a : 200;
                this.response.status(code).json(data);
            }
            catch (error) {
                if (error != null) {
                    let message = error.message;
                    if (error.parent && error.parent.code === "23505")
                        message = "Data already exists";
                    const code = (_b = error.code) !== null && _b !== void 0 ? _b : 400;
                    console.log("----- API Error ----- ", error);
                    this.response.status(code >= 100 && code < 600 ? code : 500).json({ code, message });
                }
                else {
                    this.response.status(400).json({
                        code: 400,
                        message: "Unable to process your request, please try again",
                    });
                }
            }
        });
    }
}
exports.default = BaseUseCase;
