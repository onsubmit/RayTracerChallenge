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
class World {
    constructor(light, ...shapes) {
        this.addShape = (shape) => {
            this.shapes.push(shape);
        };
        this.getColorAt = (ray) => {
            const intersections = this.getIntersectionsWith(ray);
            if (!intersections.hasHit) {
                return Color_1.default.black;
            }
            const hit = intersections.hit;
            const computation = Computation_1.default.prepare(hit, ray);
            const color = this.shadeHit(computation);
            return color;
        };
        this.getIntersectionsWith = (ray) => {
            const intersections = this.shapes.flatMap((o) => o.getIntersectionsWith(ray).intersections);
            return new Intersections_1.default(...intersections).sortedIntersections;
        };
        this.isShadowed = (point) => {
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
        this.shadeHit = (computation) => {
            const shadowed = this.isShadowed(computation.overPoint);
            return Lighting_1.default.calculate(computation.shape.material, this.light, computation.overPoint, computation.eye, computation.normal, shadowed);
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