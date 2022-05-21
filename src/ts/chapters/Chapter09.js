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
const Point_1 = __importDefault(require("ts/Point"));
const Plane_1 = __importDefault(require("ts/shapes/Plane"));
const Sphere_1 = __importDefault(require("ts/shapes/Sphere"));
const Vector_1 = __importDefault(require("ts/Vector"));
const World_1 = __importDefault(require("ts/World"));
class Chapter09 {
    constructor() {
        this.run = () => {
            const light = new Light_1.default(new Point_1.default(-10, 10, -10), Color_1.default.white);
            const world = new World_1.default(light);
            const floor = new Plane_1.default();
            floor.transformation = Matrix_1.default.getTranslationMatrix(0, -1, 0);
            floor.material.color = new Color_1.default(1, 0.9, 0.9);
            floor.material.specular = 0;
            world.addShape(floor);
            const ceiling = new Plane_1.default();
            ceiling.transformation = Matrix_1.default.getTranslationMatrix(0, 10, 0);
            ceiling.material.color = new Color_1.default(0, 0.4, 0.9);
            ceiling.material.specular = 0;
            world.addShape(ceiling);
            // The large sphere in the middle is a unit sphere,
            // translated upward slightly and colored green.
            const middle = new Sphere_1.default();
            middle.transformation = Matrix_1.default.getTranslationMatrix(-0.5, 1, 0.5);
            middle.material.color = new Color_1.default(0.1, 1, 0.5);
            middle.material.diffuse = 0.7;
            middle.material.specular = 0.3;
            world.addShape(middle);
            // The smaller green sphere on the right is scaled in half.
            const right = new Sphere_1.default();
            right.transformation = Matrix_1.default.getTranslationMatrix(1.5, 0.5, -0.5).scale(0.5, 0.5, 0.5);
            right.material.color = new Color_1.default(0.1, 0.5, 1);
            right.material.diffuse = 0.7;
            right.material.specular = 0.3;
            world.addShape(right);
            // The smallest sphere is scaled by a third, before being translated.
            const left = new Sphere_1.default();
            left.transformation = Matrix_1.default.getTranslationMatrix(-1.5, 0.33, -0.75).scale(0.33, 0.33, 0.33);
            left.material.color = new Color_1.default(1, 0.1, 0.1);
            left.material.diffuse = 0.7;
            left.material.specular = 0.3;
            world.addShape(left);
            const from = new Point_1.default(0, 1.5, -5);
            const to = new Point_1.default(0, 1, 0);
            const camera = new Camera_1.default(500, 500, Constants_1.default.pi_3, Matrix_1.default.getViewTransformationMatrix(from, to, new Vector_1.default(0, 1, 0)));
            const canvas = camera.render(world);
            const painter = new CanvasPainter_1.default("canvas9", canvas);
            painter.paint();
        };
    }
}
exports.default = new Chapter09();
//# sourceMappingURL=Chapter09.js.map