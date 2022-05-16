"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Intersection_1 = __importDefault(require("ts/Intersection"));
const Intersections_1 = __importDefault(require("ts/Intersections"));
const Point_1 = __importDefault(require("ts/Point"));
const Vector_1 = __importDefault(require("ts/Vector"));
const Shape_1 = __importDefault(require("./Shape"));
class Sphere extends Shape_1.default {
    constructor() {
        super();
        this.origin = new Point_1.default(0, 0, 0);
        this.radius = 1;
    }
    getIntersectionsWithImpl(ray) {
        const sphereToRay = Vector_1.default.fromNumberTuple(ray.origin.subtract(Point_1.default.origin));
        const a = ray.direction.dot(ray.direction);
        const b = 2 * ray.direction.dot(sphereToRay);
        const c = sphereToRay.dot(sphereToRay) - 1;
        const discriminant = b * b - 4 * a * c;
        if (discriminant >= 0) {
            const sqrtDiscriminant = Math.sqrt(discriminant);
            const twoA = 2 * a;
            return new Intersections_1.default(new Intersection_1.default((-b - sqrtDiscriminant) / twoA, this), new Intersection_1.default((-b + sqrtDiscriminant) / twoA, this));
        }
        return new Intersections_1.default();
    }
}
exports.default = Sphere;
//# sourceMappingURL=Sphere.js.map