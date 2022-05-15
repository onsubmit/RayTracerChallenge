"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chapter01_1 = __importDefault(require("./chapters/Chapter01"));
const Chapter02_1 = __importDefault(require("./chapters/Chapter02"));
class App {
    constructor() {
        this.run = () => {
            Chapter01_1.default.run();
            Chapter02_1.default.run();
        };
    }
}
exports.default = new App();
//# sourceMappingURL=App.js.map