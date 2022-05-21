"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Intersections_1 = __importDefault(require("ts/Intersections"));
const Material_1 = __importDefault(require("ts/Material"));
const Point_1 = __importDefault(require("ts/Point"));
const Shape_1 = __importDefault(require("./Shape"));
class TestShape extends Shape_1.default {
    constructor(material = new Material_1.default()) {
        super(material);
        this.type = "TestShape";
        this.compare = (_shape) => {
            throw new Error("Method not implemented.");
        };
        this.getIntersectionsWithImpl = (ray) => {
            this.savedRay = ray;
            return new Intersections_1.default();
        };
        this.getNormalAtImpl = (point) => point.subtractPoint(Point_1.default.origin);
    }
}
exports.default = TestShape;
//# sourceMappingURL=TestShape.js.map