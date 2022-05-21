"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("./Color"));
class Canvas {
    constructor(width, height) {
        this.get = (x, y) => {
            if (!this.pixels[y] || !this.pixels[y][x]) {
                throw new Error(`Invalid coordinates @ (${x}, ${y})`);
            }
            return this.pixels[y][x];
        };
        this.writePixel = (x, y, color) => {
            if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
                return;
            }
            x = Math.round(x);
            y = Math.round(y);
            if (!this.pixels[y] || !this.pixels[y][x]) {
                throw new Error(`Invalid coordinates @ (${x}, ${y})`);
            }
            this.pixels[y][x] = color;
        };
        this.writePixelWithCenteredOrigin = (x, y, color) => {
            const dx = this.width / 2;
            const dy = this.height / 2;
            this.writePixel(x + dx, -y + dy, color);
        };
        this.width = width;
        this.height = height;
        this.pixels = Array.from({ length: height }, () => Array.from({ length: width }, () => Color_1.default.black));
    }
}
exports.default = Canvas;
//# sourceMappingURL=Canvas.js.map