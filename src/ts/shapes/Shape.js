"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Matrix_1 = __importDefault(require("ts/Matrix"));
class Shape {
    constructor() {
        this.getIntersectionsWith = (ray) => {
            if (this.hasTransformation) {
                ray = ray.transform(this.transformation.inverse);
            }
            return this.getIntersectionsWithImpl(ray);
        };
    }
    get hasTransformation() {
        return !!this.cachedTransformation;
    }
    get transformation() {
        return this.cachedTransformation || (this.cachedTransformation = Matrix_1.default.getIdentityMatrix(4));
    }
    set transformation(matrix) {
        this.cachedTransformation = matrix;
    }
}
exports.default = Shape;
//# sourceMappingURL=Shape.js.map