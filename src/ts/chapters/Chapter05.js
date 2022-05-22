"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Canvas_1 = __importDefault(require("ts/Canvas"));
const CanvasPainter_1 = __importDefault(require("ts/CanvasPainter"));
const Color_1 = __importDefault(require("ts/Color"));
const Constants_1 = __importDefault(require("ts/Constants"));
const Matrix_1 = __importDefault(require("ts/Matrix"));
const Point_1 = __importDefault(require("ts/Point"));
const Ray_1 = __importDefault(require("ts/Ray"));
const Sphere_1 = __importDefault(require("ts/shapes/Sphere"));
class Chapter05 {
    constructor() {
        this.getCamera = (_width, _height) => {
            throw new Error("Chapter doesn't use a camera");
        };
        this.getWorld = () => {
            throw new Error("Chapter doesn't use a world");
        };
        this.run = () => {
            const canvasSize = 501;
            const wallZ = 10;
            const wallSize = 7;
            const canvas = new Canvas_1.default(canvasSize, canvasSize);
            const rayOrigin = new Point_1.default(0, 0, -5);
            const pixelSize = wallSize / canvasSize;
            const half = wallSize / 2;
            const sphere = new Sphere_1.default();
            sphere.transformation = Matrix_1.default.getRotationMatrixZ(Constants_1.default.pi_4).scale(1, 0.75, 1);
            for (let y = 0; y < canvasSize; y++) {
                const worldY = half - pixelSize * y;
                for (let x = 0; x < canvasSize; x++) {
                    const worldX = -half + pixelSize * x;
                    const p = new Point_1.default(worldX, worldY, wallZ);
                    const ray = new Ray_1.default(rayOrigin, p.subtractPoint(rayOrigin).normalize());
                    const intersections = sphere.getIntersectionsWith(ray);
                    if (intersections.hasHit) {
                        canvas.writePixel(x, y, Color_1.default.red);
                    }
                }
            }
            const painter = new CanvasPainter_1.default("canvas5", canvasSize, canvasSize);
            painter.paint(canvas);
        };
    }
}
exports.default = new Chapter05();
//# sourceMappingURL=Chapter05.js.map