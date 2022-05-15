"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./extensions/NumberExtensions");
class Tuple {
    constructor(...values) {
        this.at = (index) => this.values[index];
        this.compare = (tuple) => {
            if (this.values.length !== tuple.values.length) {
                throw `Tuples have different lengths. ${this.values.length} !== ${tuple.values.length}`;
            }
            const foundIndex = this.values.findIndex((value, index) => !this.valueComparisonFn(value, tuple.values[index]));
            if (foundIndex < 0) {
                return true;
            }
            return false;
        };
        this.toString = () => `(${this.values.join(", ")})`;
        this.values = values;
    }
    get length() {
        return this.values.length;
    }
}
exports.default = Tuple;
//# sourceMappingURL=Tuple.js.map