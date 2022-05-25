"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("ts/Color"));
const Pattern_1 = __importDefault(require("./Pattern"));
class TestPattern extends Pattern_1.default {
    constructor() {
        super();
        this.getColorAtPoint = (point) => {
            return new Color_1.default(point.x, point.y, point.z);
        };
    }
}
exports.default = TestPattern;
//# sourceMappingURL=TestPattern.js.map