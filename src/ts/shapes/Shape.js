"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Material_1 = __importDefault(require("ts/Material"));
const Matrix_1 = __importDefault(require("ts/Matrix"));
const Point_1 = __importDefault(require("ts/Point"));
const Lazy_1 = __importDefault(require("ts/utils/Lazy"));
const Vector_1 = __importDefault(require("ts/Vector"));
class Shape {
    constructor(material = new Material_1.default()) {
        this.getIntersectionsWith = (ray) => {
            if (this.hasTransformation) {
                const transformedRay = ray.transform(this.transformation.inverse);
                return this.getIntersectionsWithImpl(transformedRay);
            }
            return this.getIntersectionsWithImpl(ray);
        };
        this.getNormalAt = (point) => {
            const objectPoint = Point_1.default.fromNumberTuple(this.transformation.inverse.multiplyByTuple(point));
            const objectNormal = this.getNormalAtImpl(objectPoint);
            const worldNormal = Vector_1.default.fromNumberTuple(this.transformation.inverse.transpose().multiplyByTuple(objectNormal), true /* force */);
            return worldNormal.normalize();
        };
        this.material = material;
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
exports.default = Shape;
//# sourceMappingURL=Shape.js.map