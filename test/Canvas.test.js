"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Canvas_1 = __importDefault(require("ts/Canvas"));
const Color_1 = __importDefault(require("ts/Color"));
describe("Canvas", () => {
    it("Creating a canvas", () => {
        const canvas = new Canvas_1.default(10, 20);
        expect(canvas.width).toBe(10);
        expect(canvas.height).toBe(20);
        for (let r = 0; r < canvas.height; r++) {
            for (let c = 0; c < canvas.width; c++) {
                expect(canvas.get(c, r).compare(Color_1.default.black)).toBe(true);
            }
        }
    });
    it("Writing pixels to a canvas", () => {
        const c = new Canvas_1.default(10, 20);
        c.writePixel(3, 2, Color_1.default.red);
        expect(c.get(3, 2).compare(Color_1.default.red)).toBe(true);
    });
});
//# sourceMappingURL=Canvas.test.js.map