"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Camera_1 = __importDefault(require("ts/Camera"));
const CanvasPainter_1 = __importDefault(require("ts/CanvasPainter"));
const Color_1 = __importDefault(require("ts/Color"));
const Constants_1 = __importDefault(require("ts/Constants"));
const Light_1 = __importDefault(require("ts/Light"));
const Matrix_1 = __importDefault(require("ts/Matrix"));
const CheckerPattern3d_1 = __importDefault(require("ts/patterns/CheckerPattern3d"));
const GradientPattern_1 = __importDefault(require("ts/patterns/GradientPattern"));
const StripePattern_1 = __importDefault(require("ts/patterns/StripePattern"));
const Point_1 = __importDefault(require("ts/Point"));
const Plane_1 = __importDefault(require("ts/shapes/Plane"));
const Sphere_1 = __importDefault(require("ts/shapes/Sphere"));
const Vector_1 = __importDefault(require("ts/Vector"));
const World_1 = __importDefault(require("ts/World"));
class Chapter10 {
    constructor() {
        this.getCamera = (width = 500, height = 500) => {
            const from = new Point_1.default(0, 1.5, -5);
            const to = new Point_1.default(0, 1, 0);
            const camera = new Camera_1.default(width, height, Constants_1.default.pi_3, Matrix_1.default.getViewTransformationMatrix(from, to, new Vector_1.default(0, 1, 0)));
            return camera;
        };
        this.getWorld = () => {
            const light = new Light_1.default(new Point_1.default(-10, 10, -10), new Color_1.default(0.9, 0.95, 1));
            const world = new World_1.default(light);
            const floor = new Plane_1.default();
            floor.transformation = Matrix_1.default.getTranslationMatrix(0, -0.5, 0);
            floor.material.color = new Color_1.default(0, 0.2, 0.4);
            floor.material.specular = 0;
            world.addShape(floor);
            // The large sphere in the middle is a unit sphere,
            // translated upward slightly and colored green.
            const middle = new Sphere_1.default();
            middle.transformation = Matrix_1.default.getTranslationMatrix(-0.5, 1, 0.5);
            middle.material.pattern = new StripePattern_1.default(new Color_1.default(0.1, 1, 0.5), new Color_1.default(0.1, 0.4, 0.2));
            middle.material.pattern.transformation = Matrix_1.default.getRotationMatrixZ(Constants_1.default.pi_4).scale(0.2, 1, 1);
            middle.material.diffuse = 0.7;
            middle.material.specular = 0.3;
            world.addShape(middle);
            // The smaller green sphere on the right is scaled in half.
            const right = new Sphere_1.default();
            right.transformation = Matrix_1.default.getTranslationMatrix(1.5, 0.5, -0.5).scale(0.5, 0.5, 0.5);
            right.material.pattern = new GradientPattern_1.default(new Color_1.default(0.1, 0.5, 1), new Color_1.default(0.1, 1, 0.5));
            right.material.pattern.transformation = Matrix_1.default.getRotationMatrixZ(-Constants_1.default.pi_2)
                .translate(-1, 0, 0)
                .scale(2, 1, 1);
            right.material.diffuse = 0.7;
            right.material.specular = 0.3;
            world.addShape(right);
            // The smallest sphere is scaled by a third, before being translated.
            const left = new Sphere_1.default();
            left.transformation = Matrix_1.default.getTranslationMatrix(-1.5, 0.33, -0.75).scale(0.33, 0.33, 0.33);
            left.material.pattern = new CheckerPattern3d_1.default(new Color_1.default(1, 0.1, 0.1), new Color_1.default(0.5, 0.1, 0.1));
            left.material.diffuse = 0.7;
            left.material.specular = 0.3;
            world.addShape(left);
            return world;
        };
        this.run = () => {
            const camera = this.getCamera();
            const world = this.getWorld();
            const canvas = camera.render(world);
            const painter = new CanvasPainter_1.default("canvas10");
            painter.paint(canvas);
        };
    }
}
exports.default = new Chapter10();
//# sourceMappingURL=Chapter10%20copy.js.map