"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CanvasPainter {
    constructor(id, width = 500, height = 500) {
        this.paint = (canvas) => {
            const imageData = this.context.createImageData(this.canvasElement.width, this.canvasElement.height);
            let index = 0;
            for (let r = 0; r < canvas.height; r++) {
                for (let c = 0; c < canvas.width; c++) {
                    imageData.data[index++] = Math.round(255 * canvas.get(c, r).red);
                    imageData.data[index++] = Math.round(255 * canvas.get(c, r).green);
                    imageData.data[index++] = Math.round(255 * canvas.get(c, r).blue);
                    imageData.data[index++] = Math.round(255);
                }
            }
            this.context.putImageData(imageData, 0, 0);
        };
        this.paintPixel = (x, y, color) => {
            this.context.fillStyle = color.hex;
            this.context.fillRect(x, y, 1, 1);
        };
        this._id = id;
        this.canvasElement.width = width;
        this.canvasElement.height = height;
    }
    get canvasElement() {
        if (this._canvasElement) {
            return this._canvasElement;
        }
        this._canvasElement = document.getElementById(this._id);
        if (!this._canvasElement) {
            throw new Error("Can't find canvas.");
        }
        return this._canvasElement;
    }
    get context() {
        if (this._context) {
            return this._context;
        }
        const context = this.canvasElement.getContext && this.canvasElement.getContext("2d");
        if (!context) {
            throw new Error("Can't get canvas context");
        }
        this._context = context;
        return this._context;
    }
}
exports.default = CanvasPainter;
//# sourceMappingURL=CanvasPainter.js.map