"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chapter01_1 = __importDefault(require("./chapters/Chapter01"));
const Chapter02_1 = __importDefault(require("./chapters/Chapter02"));
const Chapter04_1 = __importDefault(require("./chapters/Chapter04"));
const Chapter05_1 = __importDefault(require("./chapters/Chapter05"));
const Chapter06_1 = __importDefault(require("./chapters/Chapter06"));
const Chapter07_1 = __importDefault(require("./chapters/Chapter07"));
const Chapter08_1 = __importDefault(require("./chapters/Chapter08"));
const Chapter09_1 = __importDefault(require("./chapters/Chapter09"));
class App {
    constructor() {
        this.run = () => {
            const chapters = [
                Chapter01_1.default,
                Chapter02_1.default,
                Chapter04_1.default,
                Chapter05_1.default,
                Chapter06_1.default,
                Chapter07_1.default,
                Chapter08_1.default,
                Chapter09_1.default,
            ];
            chapters[chapters.length - 1].run();
            //chapters.forEach((c) => c.run());
        };
    }
}
exports.default = new App();
//# sourceMappingURL=App.js.map