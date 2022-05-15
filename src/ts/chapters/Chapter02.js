"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Canvas_1 = __importDefault(require("ts/Canvas"));
const CanvasPainter_1 = __importDefault(require("ts/CanvasPainter"));
const Color_1 = __importDefault(require("ts/Color"));
const Point_1 = __importDefault(require("ts/Point"));
const Vector_1 = __importDefault(require("ts/Vector"));
const Environment_1 = __importDefault(require("./shared/Environment"));
const Projectile_1 = __importDefault(require("./shared/Projectile"));
class Chapter02 {
    constructor() {
        this.run = () => {
            const start = new Point_1.default(0, 1, 0);
            const velocity = new Vector_1.default(1, 1.8, 0).normalize().multiply(11.25);
            let projectile = new Projectile_1.default(start, velocity);
            const gravity = new Vector_1.default(0, -0.1, 0);
            const wind = new Vector_1.default(-0.01, 0, 0);
            const environment = new Environment_1.default(gravity, wind);
            const canvas = new Canvas_1.default(900, 550);
            while (projectile.position.y > 0) {
                canvas.writePixel(projectile.position.x, canvas.height - projectile.position.y, Color_1.default.white);
                projectile = this.tick(environment, projectile);
            }
            const painter = new CanvasPainter_1.default("canvas2", canvas);
            painter.paint();
        };
        this.tick = (environment, projectile) => {
            const position = projectile.position.addVector(projectile.velocity);
            const velocity = projectile.velocity.addVector(environment.gravity).addVector(environment.wind);
            return new Projectile_1.default(position, velocity);
        };
    }
}
exports.default = new Chapter02();
//# sourceMappingURL=Chapter02.js.map