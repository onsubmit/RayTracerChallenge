"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Material_1 = __importDefault(require("ts/Material"));
const Matrix_1 = __importDefault(require("ts/Matrix"));
const Point_1 = __importDefault(require("ts/Point"));
const Vector_1 = __importDefault(require("ts/Vector"));
class Shape {
    constructor(material = new Material_1.default()) {
        this.getIntersectionsWith = (ray) => {
            if (this.hasTransformation) {
                ray = ray.transform(this.transformation.inverse);
            }
            return this.getIntersectionsWithImpl(ray);
        };
        this.getNormalAt = (point) => {
            const objectPoint = Point_1.default.fromNumberTuple(this.transformation.inverse.multiplyByTuple(point));
            const objectNormal = objectPoint.subtractPoint(Point_1.default.origin);
            const worldNormal = Vector_1.default.fromNumberTuple(this.transformation.inverse.transpose().multiplyByTuple(objectNormal), true /* force */);
            return worldNormal.normalize();
        };
        this.material = material;
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