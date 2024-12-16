"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utility {
    static trimInputs(obj) {
        for (let prop in obj) {
            let value = obj[prop], type = typeof value;
            if (value != null && (type == "string" || type == "object") && obj.hasOwnProperty(prop)) {
                if (type == "object") {
                    Utility.trimInputs(obj[prop]);
                }
                else {
                    obj[prop] = obj[prop].trim();
                }
            }
        }
        return obj;
    }
}
exports.default = Utility;
