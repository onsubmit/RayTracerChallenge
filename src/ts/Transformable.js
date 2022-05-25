"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Matrix_1 = __importDefault(require("./Matrix"));
const Lazy_1 = __importDefault(require("./utils/Lazy"));
class Transformable {
    constructor() {
        this._transformation = new Lazy_1.default(() => {
            return {
                success: true,
                value: Matrix_1.default.getIdentityMatrix(4),
            };
        });
    }
    get hasTransformation() {
        return !!this._transformation;
    }
    get transformation() {
        if (this._transformation.value === null) {
            throw new Error("Transformation could not be determined");
        }
        return this._transformation.value;
    }
    set transformation(matrix) {
        this._transformation.value = matrix;
    }
}
exports.default = Transformable;
//# sourceMappingURL=Transformable.js.map