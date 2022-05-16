"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Matrix_1 = __importDefault(require("./Matrix"));
const Point_1 = __importDefault(require("./Point"));
const Vector_1 = __importDefault(require("./Vector"));
class Ray {
    constructor(origin, direction) {
        this.getPointOnRayAtDistance = (t) => this.origin.addVector(this.direction.multiply(t));
        this.translate = (...coordinates) => this.transform(Matrix_1.default.getTranslationMatrix(...coordinates));
        this.scale = (...coordinates) => this.transform(Matrix_1.default.getScalingMatrix(...coordinates));
        this.transform = (transformation) => new Ray(Point_1.default.fromNumberTuple(transformation.multiplyByTuple(this.origin)), Vector_1.default.fromNumberTuple(transformation.multiplyByTuple(this.direction)));
        this.origin = origin;
        this.direction = direction;
    }
}
exports.default = Ray;
//# sourceMappingURL=Ray.js.map