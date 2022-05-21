"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Lazy {
    constructor(valueFactory) {
        this._factory = valueFactory;
    }
    get value() {
        if (this._value !== undefined) {
            return this._value;
        }
        if (this._outcome === undefined) {
            this._outcome = this._factory();
        }
        if (this._outcome.success && this._outcome.value !== undefined) {
            this._value = this._outcome.value;
            return this._value;
        }
        throw new Error("Could not determine value");
    }
    set value(t) {
        this._value = t;
    }
    get hasValue() {
        if (this._value !== undefined) {
            return true;
        }
        if (this._outcome === undefined) {
            this._outcome = this._factory();
        }
        if (this._outcome.success) {
            return true;
        }
        return false;
    }
}
exports.default = Lazy;
//# sourceMappingURL=Lazy.js.map