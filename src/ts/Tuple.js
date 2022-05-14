"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./extensions/NumberExtensions");
class Tuple {
    constructor(...values) {
        this.at = (index) => this.values[index];
        this.compare = (tuple) => {
            const foundIndex = this.values.findIndex((value, index) => !this.valueComparisonFn(value, tuple.values[index]));
            if (foundIndex < 0) {
                return true;
            }
            return false;
        };
        this.toString = () => `(${this.values.join(", ")})`;
        this.values = values;
    }
}
exports.default = Tuple;
//# sourceMappingURL=Tuple.js.map