"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./extensions/NumberExtensions");
const NumberTuple_1 = __importDefault(require("./NumberTuple"));
class Tuple4d extends NumberTuple_1.default {
    constructor() {
        super(...arguments);
        this.add = (tuple) => Tuple4d.fromNumberTuple(NumberTuple_1.default.add(this, tuple));
        this.subtract = (tuple) => Tuple4d.fromNumberTuple(NumberTuple_1.default.subtract(this, tuple));
        this.multiply = (scalar) => Tuple4d.fromNumberTuple(NumberTuple_1.default.multiply(this, scalar));
        this.divide = (scalar) => Tuple4d.fromNumberTuple(NumberTuple_1.default.divide(this, scalar));
        this.negate = () => Tuple4d.fromNumberTuple(NumberTuple_1.default.negate(this));
        this.toString = () => `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)}, ${this.w.toFixed(2)})`;
    }
    get x() {
        return this.get(0);
    }
    get y() {
        return this.get(1);
    }
    get z() {
        return this.get(2);
    }
    get w() {
        return this.get(3);
    }
}
exports.default = Tuple4d;
Tuple4d.zero = new Tuple4d(0, 0, 0, 0);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
Tuple4d.fromNumberTuple = (numberTuple, _ = false) => new Tuple4d(numberTuple.get(0), numberTuple.get(1), numberTuple.get(2), numberTuple.get(3));
//# sourceMappingURL=Tuple4d.js.map