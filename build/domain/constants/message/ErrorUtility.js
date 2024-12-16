"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorUtility {
}
ErrorUtility.errorMessages = (name, type) => {
    return {
        requiredMsg: ErrorUtility.requiredMsg(name),
        typeMsg: ErrorUtility.typeMsg(name, type),
        emptyMsg: ErrorUtility.emptyMsg(name),
    };
};
ErrorUtility.joiHelper = (name, type, isEmptyCheckRequired = true, isTypeCheckRequired = true, isRequiredCheckRequired = true) => {
    let errors = {};
    isRequiredCheckRequired ? (errors["any.required"] = ErrorUtility.requiredMsg(name)) : undefined;
    isTypeCheckRequired ? (errors[`${type}.base`] = ErrorUtility.typeMsg(name, type)) : undefined;
    isEmptyCheckRequired ? (errors[`any.empty`] = ErrorUtility.emptyMsg(name)) : undefined;
    return errors;
};
ErrorUtility.requiredMsg = (name) => `${name} is required`;
ErrorUtility.typeMsg = (name, type) => `${name} must be of type ${type}`;
ErrorUtility.emptyMsg = (name) => `${name} is not allowed to be empty`;
exports.default = ErrorUtility;
