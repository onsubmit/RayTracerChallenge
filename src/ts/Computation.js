"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __importDefault(require("./Constants"));
const Intersections_1 = __importDefault(require("./Intersections"));
class Computation {
    constructor(t, shape, point, eye, normal, inside, overPoint, underPoint, reflect, exitedMaterialRefractiveIndex, enteredMaterialRefractiveIndex) {
        this.getSchlickApproximation = () => {
            // Cosine of the angle between eye and normal vectors.
            let cosine = this.eye.dot(this.normal);
            if (this.exitedMaterialRefractiveIndex > this.enteredMaterialRefractiveIndex) {
                // Total internal reflection.
                const ratio = this.exitedMaterialRefractiveIndex / this.enteredMaterialRefractiveIndex;
                const sineSquaredTheta = ratio * ratio * (1.0 - cosine * cosine);
                if (sineSquaredTheta > 1) {
                    return 1.0;
                }
                const cosineTheta = Math.sqrt(1.0 - sineSquaredTheta);
                cosine = cosineTheta;
            }
            const r0 = Math.pow((this.exitedMaterialRefractiveIndex - this.enteredMaterialRefractiveIndex) /
                (this.exitedMaterialRefractiveIndex + this.enteredMaterialRefractiveIndex), 2.0);
            return r0 + (1 - r0) * Math.pow(1 - cosine, 5.0);
        };
        this.t = t;
        this.shape = shape;
        this.point = point;
        this.eye = eye;
        this.normal = normal;
        this.inside = inside;
        this.overPoint = overPoint;
        this.underPoint = underPoint;
        this.reflect = reflect;
        this.exitedMaterialRefractiveIndex = exitedMaterialRefractiveIndex;
        this.enteredMaterialRefractiveIndex = enteredMaterialRefractiveIndex;
    }
}
exports.default = Computation;
Computation.prepare = (intersection, ray, intersections = new Intersections_1.default(intersection)) => {
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
    const normalTimesEpsilon = normal.multiply(Constants_1.default.epsilon);
    const overPoint = point.addVector(normalTimesEpsilon);
    const underPoint = point.subtractVector(normalTimesEpsilon);
    const reflect = ray.direction.reflect(normal);
    let exitedMaterialRefractiveIndex = 0;
    let enteredMaterialRefractiveIndex = 0;
    const containers = [];
    for (let i = 0, length = intersections.length; i < length; i++) {
        const x = intersections.get(i);
        if (x === intersection) {
            if (!containers.length) {
                exitedMaterialRefractiveIndex = 1;
            }
            else {
                exitedMaterialRefractiveIndex = containers[containers.length - 1].material.refractiveIndex;
            }
        }
        const index = containers.indexOf(x.shape);
        if (index >= 0) {
            containers.splice(index, 1);
        }
        else {
            containers.push(x.shape);
        }
        if (x === intersection) {
            if (!containers.length) {
                enteredMaterialRefractiveIndex = 1;
            }
            else {
                enteredMaterialRefractiveIndex = containers[containers.length - 1].material.refractiveIndex;
            }
            break;
        }
    }
    return new Computation(t, shape, point, eye, normal, inside, overPoint, underPoint, reflect, exitedMaterialRefractiveIndex, enteredMaterialRefractiveIndex);
};
//# sourceMappingURL=Computation.js.map