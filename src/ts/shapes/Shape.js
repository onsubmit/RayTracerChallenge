"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Material_1 = __importDefault(require("ts/Material"));
const Point_1 = __importDefault(require("ts/Point"));
const Transformable_1 = __importDefault(require("ts/Transformable"));
const Vector_1 = __importDefault(require("ts/Vector"));
class Shape extends Transformable_1.default {
    constructor(material = new Material_1.default()) {
        super();
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
    }
}
exports.default = Shape;
//# sourceMappingURL=Shape.js.map