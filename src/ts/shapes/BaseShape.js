"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Material_1 = __importDefault(require("ts/Material"));
const Shape_1 = __importDefault(require("./Shape"));
class BaseShape extends Shape_1.default {
    constructor(material = new Material_1.default()) {
        super(material);
        this.type = "BaseShape";
        this.compare = (_shape) => {
            throw new Error("Method not implemented.");
        };
        this.getIntersectionsWithImpl = (_ray) => {
            throw new Error("Method not implemented.");
        };
        this.getNormalAtImpl = (_point) => {
            throw new Error("Method not implemented.");
        };
    }
}
exports.default = BaseShape;
//# sourceMappingURL=BaseShape.js.map