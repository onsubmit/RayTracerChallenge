"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __importDefault(require("ts/Constants"));
Number.prototype.compare =
    Number.prototype.compare ||
        function (received, epsilon = Constants_1.default.epsilon) {
            if (Math.abs(received - this) < epsilon) {
                return true;
            }
            return false;
        };
//# sourceMappingURL=NumberExtensions.js.map