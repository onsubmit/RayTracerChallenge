"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tuple4d_1 = __importDefault(require("./Tuple4d"));
const Vector_1 = __importDefault(require("./Vector"));
class Point extends Tuple4d_1.default {
    constructor(x, y, z) {
        super(x, y, z, 1);
        this.subtractPoint = (point) => Vector_1.default.fromNumberTuple(this.subtract(point));
        this.addVector = (vector) => Point.fromNumberTuple(this.add(vector));
        this.subtractVector = (vector) => Point.fromNumberTuple(this.subtract(vector));
        this.toString = () => `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)})`;
    }
}
exports.default = Point;
Point.zero = new Point(0, 0, 0);
Point.origin = Point.zero;
Point.fromNumberTuple = (numberTuple, force = false) => {
    if (numberTuple.length < 3) {
        throw `Tuple not long enough. Its length is ${numberTuple.length}`;
    }
    if (!force && numberTuple.length === 4 && !numberTuple.get(3).compare(1)) {
        throw `Tuple is not a point. w=${numberTuple.get(3)}. Must be 1.`;
    }
    return new Point(numberTuple.get(0), numberTuple.get(1), numberTuple.get(2));
};
//# sourceMappingURL=Point.js.map