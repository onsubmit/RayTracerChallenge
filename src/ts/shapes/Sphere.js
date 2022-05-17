"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Intersection_1 = __importDefault(require("ts/Intersection"));
const Intersections_1 = __importDefault(require("ts/Intersections"));
const Material_1 = __importDefault(require("ts/Material"));
const Point_1 = __importDefault(require("ts/Point"));
const Shape_1 = __importDefault(require("./Shape"));
class Sphere extends Shape_1.default {
    constructor(material = new Material_1.default()) {
        super(material);
        this.compare = (shape) => {
            if (!(shape instanceof Sphere)) {
                return false;
            }
            const sphere = shape;
            if (!this.origin.compare(sphere.origin)) {
                return false;
            }
            if (!this.radius.compare(sphere.radius)) {
                return false;
            }
            return true;
        };
        this.getNormalAtImpl = (point) => point.subtractPoint(this.origin);
        this.origin = new Point_1.default(0, 0, 0);
        this.radius = 1;
    }
    getIntersectionsWithImpl(ray) {
        const sphereToRay = ray.origin.subtractPoint(Point_1.default.origin);
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