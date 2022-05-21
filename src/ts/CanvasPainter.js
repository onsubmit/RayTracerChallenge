"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CanvasPainter {
    constructor(id, canvas) {
        this.paint = () => {
            const canvas = document.getElementById(this.id);
            if (!canvas) {
                throw new Error("Can't find canvas.");
            }
            canvas.width = this.canvas.width;
            canvas.height = this.canvas.height;
            const ctx = canvas.getContext && canvas.getContext("2d");
            if (!ctx) {
                throw new Error("Can't get canvas context");
            }
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            let index = 0;
            for (let r = 0; r < this.canvas.height; r++) {
                for (let c = 0; c < this.canvas.width; c++) {
                    imageData.data[index++] = Math.round(255 * this.canvas.get(c, r).red);
                    imageData.data[index++] = Math.round(255 * this.canvas.get(c, r).green);
                    imageData.data[index++] = Math.round(255 * this.canvas.get(c, r).blue);
                    imageData.data[index++] = Math.round(255);
                }
            }
            ctx.putImageData(imageData, 0, 0);
        };
        this.id = id;
        this.canvas = canvas;
    }
}
exports.default = CanvasPainter;
//# sourceMappingURL=CanvasPainter.js.map