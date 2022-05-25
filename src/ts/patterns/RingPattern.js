"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("ts/Color"));
const Pattern_1 = __importDefault(require("./Pattern"));
class RingPattern extends Pattern_1.default {
    constructor(color1 = Color_1.default.white, color2 = Color_1.default.black) {
        super();
        this.getColorAtPoint = (point) => {
            if (Math.floor(Math.sqrt(point.x * point.x + point.z * point.z)) % 2 === 0) {
                return this.color1;
            }
            return this.color2;
        };
        this.color1 = color1;
        this.color2 = color2;
    }
}
exports.default = RingPattern;
//# sourceMappingURL=RingPattern.js.map