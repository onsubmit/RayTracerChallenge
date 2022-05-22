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
const Sphere_1 = __importDefault(require("ts/shapes/Sphere"));
const Vector_1 = __importDefault(require("ts/Vector"));
const World_1 = __importDefault(require("ts/World"));
class Chapter08 {
    constructor() {
        this.getCamera = (width = 500, height = 500) => {
            const from = new Point_1.default(0, 1.5, -5);
            const to = new Point_1.default(0, 1, 0);
            const camera = new Camera_1.default(width, height, Constants_1.default.pi_3, Matrix_1.default.getViewTransformationMatrix(from, to, new Vector_1.default(0, 1, 0)));
            return camera;
        };
        this.getWorld = () => {
            const light = new Light_1.default(new Point_1.default(-10, 10, -10), Color_1.default.white);
            const world = new World_1.default(light);
            // The floor is an extremely flattened sphere with a matte texture.
            const floor = new Sphere_1.default();
            floor.transformation = Matrix_1.default.getScalingMatrix(10, 0.01, 10);
            floor.material.color = new Color_1.default(1, 0.9, 0.9);
            floor.material.specular = 0;
            world.addShape(floor);
            // The wall on the left has the same scale and color as the floor,
            // but is also rotated and translated into place.
            const leftWall = new Sphere_1.default();
            leftWall.material = floor.material;
            leftWall.transformation = Matrix_1.default.getTranslationMatrix(0, 0, 5)
                .rotateY(-Constants_1.default.pi_4)
                .rotateX(Constants_1.default.pi_2)
                .scale(10, 0.01, 10);
            world.addShape(leftWall);
            // The wall on the right is identical to the left wall,
            // but is rotated the opposite direction in y.
            const rightWall = new Sphere_1.default();
            rightWall.material = floor.material;
            rightWall.transformation = Matrix_1.default.getTranslationMatrix(0, 0, 5)
                .rotateY(Constants_1.default.pi_4)
                .rotateX(Constants_1.default.pi_2)
                .scale(10, 0.01, 10);
            world.addShape(rightWall);
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
            return world;
        };
        this.run = () => {
            const camera = this.getCamera();
            const world = this.getWorld();
            const canvas = camera.render(world);
            const painter = new CanvasPainter_1.default("canvas8");
            painter.paint(canvas);
        };
    }
}
exports.default = new Chapter08();
//# sourceMappingURL=Chapter08.js.map