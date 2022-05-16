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
class Chapter04 {
    constructor() {
        this.run = () => {
            const canvasSize = 201;
            const numSegments = 12;
            const scale = (canvasSize * 3) / 8;
            const canvas = new Canvas_1.default(canvasSize, canvasSize);
            // Canvas orientation is in the x-z plane.
            // Start at 12 o'clock.
            let point = new Point_1.default(0, 0, 1);
            for (let i = 0; i < numSegments; i++) {
                const transform = Matrix_1.default.getRotationMatrixY((Constants_1.default.twoPi * i) / numSegments).scale(scale, scale, scale);
                const p = Point_1.default.fromNumberTuple(transform.multiplyByTuple(point));
                canvas.writePixelWithCenteredOrigin(p.x, p.z, Color_1.default.white);
            }
            const painter = new CanvasPainter_1.default("canvas4", canvas);
            painter.paint();
        };
    }
}
exports.default = new Chapter04();
//# sourceMappingURL=Chapter04.js.map