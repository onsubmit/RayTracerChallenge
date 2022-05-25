"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __importDefault(require("ts/Point"));
const Transformable_1 = __importDefault(require("ts/Transformable"));
class Pattern extends Transformable_1.default {
    constructor() {
        super(...arguments);
        this.getColorAtShape = (shape, worldPoint) => {
            const objectPoint = shape.hasTransformation ? shape.transformation.inverse.multiplyByTuple(worldPoint) : worldPoint;
            const patternPoint = Point_1.default.fromNumberTuple(this.hasTransformation ? this.transformation.inverse.multiplyByTuple(objectPoint) : objectPoint);
            return this.getColorAtPoint(patternPoint);
        };
    }
}
exports.default = Pattern;
//# sourceMappingURL=Pattern.js.map