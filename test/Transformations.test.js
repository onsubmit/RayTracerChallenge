"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Matrix_1 = __importDefault(require("ts/Matrix"));
const Point_1 = __importDefault(require("ts/Point"));
const Vector_1 = __importDefault(require("ts/Vector"));
describe("Transformations", () => {
    it("A view transformation matrix looking in positive z direction", () => {
        const from = Point_1.default.origin;
        const to = new Point_1.default(0, 0, 1);
        const up = new Vector_1.default(0, 1, 0);
        const t = Matrix_1.default.getViewTransformationMatrix(from, to, up);
        expect(t.compare(Matrix_1.default.getScalingMatrix(-1, 1, -1))).toBe(true);
    });
    it("The view transformation moves the world", () => {
        const from = new Point_1.default(0, 0, 8);
        const to = Point_1.default.origin;
        const up = new Vector_1.default(0, 1, 0);
        const t = Matrix_1.default.getViewTransformationMatrix(from, to, up);
        expect(t.compare(Matrix_1.default.getTranslationMatrix(0, 0, -8))).toBe(true);
    });
    it("An arbitrary view transformation", () => {
        const from = new Point_1.default(1, 3, 2);
        const to = new Point_1.default(4, -2, 8);
        const up = new Vector_1.default(1, 1, 0);
        const t = Matrix_1.default.getViewTransformationMatrix(from, to, up);
        const expected = new Matrix_1.default([
            [-0.50709, 0.50709, 0.67612, -2.36643],
            [0.76772, 0.60609, 0.12122, -2.82843],
            [-0.35857, 0.59761, -0.71714, 0],
            [0, 0, 0, 1],
        ]);
        expect(t.compare(expected)).toBe(true);
    });
});
//# sourceMappingURL=Transformations.test.js.map