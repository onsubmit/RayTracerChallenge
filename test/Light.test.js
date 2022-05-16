"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("ts/Color"));
const Light_1 = __importDefault(require("ts/Light"));
const Point_1 = __importDefault(require("ts/Point"));
describe("Light", () => {
    it("A point light has a position and intensity", () => {
        const position = Point_1.default.origin;
        const intensity = Color_1.default.white;
        const light = new Light_1.default(position, intensity);
        expect(light.position).toEqual(position);
        expect(light.intensity).toEqual(intensity);
    });
});
//# sourceMappingURL=Light.test.js.map