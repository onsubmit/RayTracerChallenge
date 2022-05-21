"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __importDefault(require("ts/Constants"));
const Intersection_1 = __importDefault(require("ts/Intersection"));
const Intersections_1 = __importDefault(require("ts/Intersections"));
const Material_1 = __importDefault(require("ts/Material"));
const Point_1 = __importDefault(require("ts/Point"));
const Vector_1 = __importDefault(require("ts/Vector"));
const Shape_1 = __importDefault(require("./Shape"));
class Plane extends Shape_1.default {
    constructor(material = new Material_1.default()) {
        super(material);
        this.type = "Plane";
        this._constantNormal = new Vector_1.default(0, 1, 0);
        this.compare = (shape) => {
            if (!(shape instanceof Plane)) {
                return false;
            }
            return true;
        };
        this.getNormalAtImpl = (_point) => this._constantNormal;
        this.getIntersectionsWithImpl = (ray) => {
            if (Math.abs(ray.direction.y) < Constants_1.default.epsilon) {
                return new Intersections_1.default();
            }
            const t = -ray.origin.y / ray.direction.y;
            return new Intersections_1.default(new Intersection_1.default(t, this));
        };
        this.origin = new Point_1.default(0, 0, 0);
        this.radius = 1;
    }
}
exports.default = Plane;
//# sourceMappingURL=Plane.js.map