"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __importDefault(require("./Constants"));
class Computation {
    constructor(t, shape, point, eye, normal, inside, overPoint) {
        this.t = t;
        this.shape = shape;
        this.point = point;
        this.eye = eye;
        this.normal = normal;
        this.inside = inside;
        this.overPoint = overPoint;
    }
}
exports.default = Computation;
Computation.prepare = (intersection, ray) => {
    const t = intersection.t;
    const shape = intersection.shape;
    const point = ray.getPointOnRayAtDistance(t);
    const eye = ray.direction.negate();
    let normal = shape.getNormalAt(point);
    let inside = false;
    if (normal.dot(eye) < 0) {
        inside = true;
        normal = normal.negate();
    }
    const overPoint = point.addVector(normal.multiply(Constants_1.default.epsilon));
    return new Computation(t, shape, point, eye, normal, inside, overPoint);
};
//# sourceMappingURL=Computation.js.map