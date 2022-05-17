"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Computation {
    constructor(t, shape, point, eye, normal, inside) {
        this.t = t;
        this.shape = shape;
        this.point = point;
        this.eye = eye;
        this.normal = normal;
        this.inside = inside;
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
    return new Computation(t, shape, point, eye, normal, inside);
};
//# sourceMappingURL=Computation.js.map