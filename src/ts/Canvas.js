"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("./Color"));
class Canvas {
    constructor(width, height) {
        this.at = (row, column) => this.pixels[row][column];
        this.writePixel = (row, column, color) => {
            this.pixels[row][column] = color;
        };
        this.width = width;
        this.height = height;
        this.pixels = Array.from({ length: height }, () => Array.from({ length: width }, () => Color_1.default.black));
    }
}
exports.default = Canvas;
//# sourceMappingURL=Canvas.js.map