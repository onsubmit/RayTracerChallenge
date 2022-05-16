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
class App {
    constructor() {
        this.run = () => {
            Chapter01_1.default.run();
            Chapter02_1.default.run();
            Chapter04_1.default.run();
            Chapter05_1.default.run();
            Chapter06_1.default.run();
        };
    }
}
exports.default = new App();
//# sourceMappingURL=App.js.map