"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __importDefault(require("ts/Point"));
const Vector_1 = __importDefault(require("ts/Vector"));
const Environment_1 = __importDefault(require("./shared/Environment"));
const Projectile_1 = __importDefault(require("./shared/Projectile"));
class Chapter01 {
    constructor() {
        this.run = () => {
            // projectile starts one unit above the origin.
            // velocity is normalized to 1 unit/tick.
            let projectile = new Projectile_1.default(new Point_1.default(0, 1, 0), new Vector_1.default(1, 1, 0).normalize());
            // gravity -0.1 unit/tick, and win is -0.01 unit/tick.
            const environment = new Environment_1.default(new Vector_1.default(0, -0.1, 0), new Vector_1.default(-0.01, 0, 0));
            const pre = document.getElementById("pre1");
            if (!pre) {
                throw new Error("Can't find <pre> tag for chapter 1");
            }
            pre.innerHTML += `Projectile position: ${projectile.position.toString()}\n`;
            while (projectile.position.y > 0) {
                projectile = this.tick(environment, projectile);
                pre.innerHTML += `Projectile position: ${projectile.position.toString()}\n`;
            }
        };
        this.tick = (environment, projectile) => {
            const position = projectile.position.addVector(projectile.velocity);
            const velocity = projectile.velocity.addVector(environment.gravity).addVector(environment.wind);
            return new Projectile_1.default(position, velocity);
        };
    }
}
exports.default = new Chapter01();
//# sourceMappingURL=Chapter01.js.map