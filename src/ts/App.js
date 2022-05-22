"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChapterWorker_1 = __importDefault(require("worker-loader!../ts/ChapterWorker"));
const CanvasPainter_1 = __importDefault(require("./CanvasPainter"));
const Chapter01_1 = __importDefault(require("./chapters/Chapter01"));
const Chapter02_1 = __importDefault(require("./chapters/Chapter02"));
const Chapter04_1 = __importDefault(require("./chapters/Chapter04"));
const Chapter05_1 = __importDefault(require("./chapters/Chapter05"));
const Chapter06_1 = __importDefault(require("./chapters/Chapter06"));
const Color_1 = __importDefault(require("./Color"));
class App {
    constructor() {
        this.run = () => {
            const chaptersNoWorld = [Chapter01_1.default, Chapter02_1.default, Chapter04_1.default, Chapter05_1.default, Chapter06_1.default];
            chaptersNoWorld.forEach((c) => c.run());
            const size = 500;
            [7, 8, 9].forEach((chapter) => {
                const painter = new CanvasPainter_1.default(`canvas${chapter}`, size, size);
                const worker = new ChapterWorker_1.default();
                worker.onmessage = (event) => {
                    const row = event.data;
                    for (const pixel of row) {
                        const { x, y, r, g, b } = pixel;
                        painter.paintPixel(x, y, new Color_1.default(r, g, b));
                    }
                };
                worker.postMessage({ chapter, width: size, height: size });
            });
        };
    }
}
exports.default = new App();
//# sourceMappingURL=App.js.map