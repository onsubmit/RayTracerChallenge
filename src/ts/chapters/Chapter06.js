"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Canvas_1 = __importDefault(require("ts/Canvas"));
const CanvasPainter_1 = __importDefault(require("ts/CanvasPainter"));
const Color_1 = __importDefault(require("ts/Color"));
const Constants_1 = __importDefault(require("ts/Constants"));
const Light_1 = __importDefault(require("ts/Light"));
const Lighting_1 = __importDefault(require("ts/Lighting"));
const Material_1 = __importDefault(require("ts/Material"));
const Matrix_1 = __importDefault(require("ts/Matrix"));
const Point_1 = __importDefault(require("ts/Point"));
const Ray_1 = __importDefault(require("ts/Ray"));
const Sphere_1 = __importDefault(require("ts/shapes/Sphere"));
class Chapter06 {
    constructor() {
        this.run = () => {
            const canvasSize = 501;
            const wallZ = 10;
            const wallSize = 7;
            const canvas = new Canvas_1.default(canvasSize, canvasSize);
            const rayOrigin = new Point_1.default(0, 0, -5);
            const pixelSize = wallSize / canvasSize;
            const half = wallSize / 2;
            const material = new Material_1.default(new Color_1.default(0.1, 0.5, 1), 0.05, 0.99, 0.99, 50);
            const sphere = new Sphere_1.default(material);
            sphere.transformation = Matrix_1.default.getRotationMatrixZ(Constants_1.default.pi_4).scale(1, 0.75, 1);
            const light = new Light_1.default(new Point_1.default(-10, 10, -10), Color_1.default.white);
            for (let y = 0; y < canvasSize; y++) {
                const worldY = half - pixelSize * y;
                for (let x = 0; x < canvasSize; x++) {
                    const worldX = -half + pixelSize * x;
                    const p = new Point_1.default(worldX, worldY, wallZ);
                    const ray = new Ray_1.default(rayOrigin, p.subtractPoint(rayOrigin).normalize());
                    const intersections = sphere.getIntersectionsWith(ray);
                    if (intersections.hasHit) {
                        const hit = intersections.hit;
                        const point = ray.getPointOnRayAtDistance(hit.t);
                        const normal = hit.shape.getNormalAt(point);
                        const eye = ray.direction.negate();
                        const color = Lighting_1.default.calculate(hit.shape.material, light, point, eye, normal, false);
                        canvas.writePixel(x, y, color);
                    }
                }
            }
            const painter = new CanvasPainter_1.default("canvas6", canvas);
            painter.paint();
        };
    }
}
exports.default = new Chapter06();
//# sourceMappingURL=Chapter06.js.map