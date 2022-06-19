"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("./Color"));
const Computation_1 = __importDefault(require("./Computation"));
const Intersections_1 = __importDefault(require("./Intersections"));
const Light_1 = __importDefault(require("./Light"));
const Lighting_1 = __importDefault(require("./Lighting"));
const Material_1 = __importDefault(require("./Material"));
const Matrix_1 = __importDefault(require("./Matrix"));
const Point_1 = __importDefault(require("./Point"));
const Ray_1 = __importDefault(require("./Ray"));
const Sphere_1 = __importDefault(require("./shapes/Sphere"));
const MaxReflections = 5;
class World {
    constructor(light, ...shapes) {
        this._disableShadows = false;
        this.addShape = (shape) => {
            this.shapes.push(shape);
        };
        this.getColorAt = (ray, remaining = MaxReflections) => {
            const intersections = this.getIntersectionsWith(ray);
            if (!intersections.hasHit) {
                return Color_1.default.black;
            }
            const hit = intersections.hit;
            const computation = Computation_1.default.prepare(hit, ray, intersections);
            const color = this.shadeHit(computation, remaining);
            return color;
        };
        this.getIntersectionsWith = (ray) => {
            const intersections = this.shapes.flatMap((o) => o.getIntersectionsWith(ray).intersections);
            return new Intersections_1.default(...intersections).sortedIntersections;
        };
        this.disableShadows = () => {
            this._disableShadows = true;
        };
        this.isShadowed = (point) => {
            if (this._disableShadows) {
                return false;
            }
            const v = this.light.position.subtractPoint(point);
            const distance = v.magnitude;
            const direction = v.normalize();
            const ray = new Ray_1.default(point, direction);
            const intersections = this.getIntersectionsWith(ray);
            if (intersections.hasHit && intersections.hit.t < distance) {
                return true;
            }
            return false;
        };
        this.shadeHit = (computation, remaining = MaxReflections) => {
            const shadowed = this.isShadowed(computation.overPoint);
            const surface = Lighting_1.default.calculate(computation.shape.material, computation.shape, this.light, computation.overPoint, computation.eye, computation.normal, shadowed);
            const reflected = this.getReflectedColor(computation, remaining);
            const refracted = this.getRefractedColor(computation, remaining);
            const material = computation.shape.material;
            if (material.reflective > 0 && material.transparency > 0) {
                const reflectance = computation.getSchlickApproximation();
                return surface.addColor(reflected.multiply(reflectance)).addColor(refracted.multiply(1 - reflectance));
            }
            return surface.addColor(reflected).addColor(refracted);
        };
        this.getReflectedColor = (computation, remaining = MaxReflections) => {
            if (remaining <= 0) {
                return Color_1.default.black;
            }
            if (computation.shape.material.reflective.compare(0)) {
                return Color_1.default.black;
            }
            const reflectRay = new Ray_1.default(computation.overPoint, computation.reflect);
            const color = this.getColorAt(reflectRay, remaining - 1);
            return color.multiply(computation.shape.material.reflective);
        };
        this.getRefractedColor = (computation, remaining = MaxReflections) => {
            if (remaining <= 0) {
                return Color_1.default.black;
            }
            if (computation.shape.material.transparency.compare(0)) {
                return Color_1.default.black;
            }
            const ratio = computation.exitedMaterialRefractiveIndex / computation.enteredMaterialRefractiveIndex;
            const cosineThetaI = computation.eye.dot(computation.normal);
            const sineSquaredThetaT = ratio * ratio * (1.0 - cosineThetaI * cosineThetaI);
            if (sineSquaredThetaT > 1) {
                // Total internal reflection.
                return Color_1.default.black;
            }
            const cosineThetaT = Math.sqrt(1.0 - sineSquaredThetaT);
            // Direction of refracted ray.
            const direction = computation.normal
                .multiply(ratio * cosineThetaI - cosineThetaT)
                .subtractVector(computation.eye.multiply(ratio));
            const refractedRay = new Ray_1.default(computation.underPoint, direction);
            // Find the color of the refracted ray, accounting for opacity.
            const color = this.getColorAt(refractedRay, remaining - 1);
            return color.multiply(computation.shape.material.transparency);
        };
        this.light = light;
        this.shapes = shapes;
    }
}
exports.default = World;
World.getDefaultWorld = () => {
    const light = new Light_1.default(new Point_1.default(-10, 10, -10), Color_1.default.white);
    const m1 = new Material_1.default();
    m1.color = new Color_1.default(0.8, 1.0, 0.6);
    m1.diffuse = 0.7;
    m1.specular = 0.2;
    const s1 = new Sphere_1.default(m1);
    const s2 = new Sphere_1.default();
    s2.transformation = Matrix_1.default.getScalingMatrix(0.5, 0.5, 0.5);
    return new World(light, s1, s2);
};
//# sourceMappingURL=World.js.map