"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __importDefault(require("./Point"));
const Vector_1 = __importDefault(require("./Vector"));
class App {
    constructor() {
        this.run = () => {
            // projectile starts one unit above the origin.
            // velocity is normalized to 1 unit/tick.
            let projectile = new Projectile(new Point_1.default(0, 1, 0), new Vector_1.default(1, 1, 0).normalize());
            // gravity -0.1 unit/tick, and win is -0.01 unit/tick.
            const environment = new Environment(new Vector_1.default(0, -0.1, 0), new Vector_1.default(-0.01, 0, 0));
            console.log(`Projectile position: ${projectile.position.toString()}`);
            while (projectile.position.y > 0) {
                projectile = this.tick(environment, projectile);
                console.log(`Projectile position: ${projectile.position.toString()}`);
            }
        };
        this.tick = (environment, projectile) => {
            const position = projectile.position.addVector(projectile.velocity);
            const velocity = projectile.velocity.addVector(environment.gravity).addVector(environment.wind);
            return new Projectile(position, velocity);
        };
    }
}
class Projectile {
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
    }
}
class Environment {
    constructor(gravity, wind) {
        this.gravity = gravity;
        this.wind = wind;
    }
}
exports.default = new App();
//# sourceMappingURL=App.js.map