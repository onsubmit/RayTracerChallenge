"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chapter07_1 = __importDefault(require("./chapters/Chapter07"));
const Chapter08_1 = __importDefault(require("./chapters/Chapter08"));
const Chapter09_1 = __importDefault(require("./chapters/Chapter09"));
const Chapter10_1 = __importDefault(require("./chapters/Chapter10"));
const Chapter11_1 = __importDefault(require("./chapters/Chapter11"));
const chapters = new Map([
    [7, Chapter07_1.default],
    [8, Chapter08_1.default],
    [9, Chapter09_1.default],
    [10, Chapter10_1.default],
    [11, Chapter11_1.default],
]);
self.addEventListener("message", (event) => {
    const width = event.data.width;
    const height = event.data.height;
    const resolution = event.data.resolution || 1;
    const chapter = chapters.get(event.data.chapter);
    if (!chapter) {
        throw new Error(`Chapter config not found for chapter ${chapter}`);
    }
    const camera = chapter.getCamera(width, height);
    const world = chapter.getWorld();
    for (let y = 0; y < camera.verticalSize; y += resolution) {
        const row = [];
        for (let x = 0; x < camera.horizontalSize; x += resolution) {
            const color = camera.getColorAt(world, x, y);
            const r = color.red;
            const g = color.green;
            const b = color.blue;
            row.push({ x, y, r, g, b });
        }
        self.postMessage(row);
    }
});
//# sourceMappingURL=ChapterWorker.js.map