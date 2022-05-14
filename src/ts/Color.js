"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NumberTuple_1 = __importDefault(require("./NumberTuple"));
class Color extends NumberTuple_1.default {
    constructor(r, g, b) {
        super(r, g, b);
        this.multiply = (scalar) => Color.fromNumberTuple(NumberTuple_1.default.multiply(this, scalar));
        this.addColor = (color) => Color.fromNumberTuple(NumberTuple_1.default.add(this, color));
        this.subtractColor = (color) => Color.fromNumberTuple(NumberTuple_1.default.subtract(this, color));
        this.getHadamardProductWith = (color) => {
            const r = this.red * color.red;
            const g = this.green * color.green;
            const b = this.blue * color.blue;
            return new Color(r, g, b);
        };
    }
    get red() {
        return this.at(0);
    }
    get green() {
        return this.at(1);
    }
    get blue() {
        return this.at(2);
    }
}
exports.default = Color;
Color.black = new Color(0, 0, 0);
Color.white = new Color(1, 1, 1);
Color.red = new Color(1, 0, 0);
Color.green = new Color(0, 1, 0);
Color.blue = new Color(0, 0, 1);
Color.fromNumberTuple = (numberTuple) => new Color(numberTuple.at(0), numberTuple.at(1), numberTuple.at(2));
//# sourceMappingURL=Color.js.map