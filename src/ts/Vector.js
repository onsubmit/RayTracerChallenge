"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NumberTuple_1 = __importDefault(require("./NumberTuple"));
const Tuple4d_1 = __importDefault(require("./Tuple4d"));
class Vector extends Tuple4d_1.default {
    constructor(x, y, z) {
        super(x, y, z, 0);
        this.multiply = (scalar) => Vector.fromNumberTuple(NumberTuple_1.default.multiply(this, scalar));
        this.divide = (scalar) => Vector.fromNumberTuple(NumberTuple_1.default.divide(this, scalar));
        this.negate = () => Vector.fromNumberTuple(Vector.negate(this));
        this.addVector = (vector) => Vector.fromNumberTuple(this.add(vector));
        this.subtractVector = (vector) => Vector.fromNumberTuple(this.subtract(vector));
        this.normalize = () => this.divide(this.magnitude);
        this.dot = (vector) => this.x * vector.x + this.y * vector.y + this.z * vector.z;
        this.cross = (vector) => {
            const x = this.y * vector.z - this.z * vector.y;
            const y = this.z * vector.x - this.x * vector.z;
            const z = this.x * vector.y - this.y * vector.x;
            return new Vector(x, y, z);
        };
        this.reflect = (normal) => this.subtractVector(normal.multiply(2 * this.dot(normal)));
        this.toString = () => `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)})`;
    }
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
}
exports.default = Vector;
Vector.fromNumberTuple = (numberTuple, force = false) => {
    if (numberTuple.length < 3) {
        throw new Error(`Tuple not long enough. Its length is ${numberTuple.length}`);
    }
    if (!force && numberTuple.length === 4 && !numberTuple.get(3).compare(0)) {
        throw new Error(`Tuple is not a vector. w=${numberTuple.get(3)}. Must be 0.`);
    }
    return new Vector(numberTuple.get(0), numberTuple.get(1), numberTuple.get(2));
};
Vector.zero = Vector.fromNumberTuple(Tuple4d_1.default.zero);
//# sourceMappingURL=Vector.js.map