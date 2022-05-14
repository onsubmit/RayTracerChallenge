"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./extensions/NumberExtensions");
const Tuple_1 = __importDefault(require("./Tuple"));
class NumberTuple extends Tuple_1.default {
    constructor() {
        super(...arguments);
        this.valueComparisonFn = (thisValue, valueToCompareAgainst) => {
            return thisValue.compare(valueToCompareAgainst);
        };
        this.toString = () => `(${this.values.map((v) => v.toFixed(2)).join(", ")})`;
    }
}
exports.default = NumberTuple;
NumberTuple.add = (tuple1, tuple2) => {
    const sums = tuple1.values.map((value, index) => value + tuple2.at(index));
    return new NumberTuple(...sums);
};
NumberTuple.subtract = (tuple1, tuple2) => {
    const differences = tuple1.values.map((value, index) => value - tuple2.at(index));
    return new NumberTuple(...differences);
};
NumberTuple.multiply = (tuple, scalar) => {
    const products = tuple.values.map((value) => value * scalar);
    return new NumberTuple(...products);
};
NumberTuple.divide = (tuple, scalar) => {
    const quotients = tuple.values.map((value) => value / scalar);
    return new NumberTuple(...quotients);
};
NumberTuple.negate = (tuple) => {
    const negated = tuple.values.map((value) => 0 - value);
    return new NumberTuple(...negated);
};
//# sourceMappingURL=NumberTuple.js.map