"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tuple4d_1 = __importDefault(require("./Tuple4d"));
class Point extends Tuple4d_1.default {
    constructor(x, y, z) {
        super(x, y, z, 1);
        this.addVector = (vector) => Point.fromNumberTuple(this.add(vector));
        this.subtractVector = (vector) => Point.fromNumberTuple(this.subtract(vector));
        this.toString = () => `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)})`;
    }
    static get zero() {
        return Point.fromNumberTuple(Tuple4d_1.default.zero);
    }
}
exports.default = Point;
Point.fromNumberTuple = (numberTuple) => new Point(numberTuple.at(0), numberTuple.at(1), numberTuple.at(2));
//# sourceMappingURL=Point.js.map