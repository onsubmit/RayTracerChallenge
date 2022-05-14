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
                expect(canvas.at(r, c).compare(Color_1.default.black)).toBe(true);
            }
        }
    });
    it.only("Writing pixels to a canvas", () => {
        const c = new Canvas_1.default(10, 20);
        c.writePixel(2, 3, Color_1.default.red);
        expect(c.at(2, 3).compare(Color_1.default.red)).toBe(true);
    });
});
//# sourceMappingURL=Canvas.test.js.map