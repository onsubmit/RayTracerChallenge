"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Matrix_1 = __importDefault(require("ts/Matrix"));
const Sphere_1 = __importDefault(require("ts/shapes/Sphere"));
describe("Sphere", () => {
    describe("Transforming", () => {
        it("A sphere's default transformation", () => {
            const s = new Sphere_1.default();
            expect(s.transformation.compare(Matrix_1.default.getIdentityMatrix(4))).toBe(true);
        });
        it("Changing a sphere's transformation", () => {
            const s = new Sphere_1.default();
            const t = Matrix_1.default.getTranslationMatrix(2, 3, 4);
            s.transformation = t;
            expect(s.transformation).toEqual(t);
        });
    });
});
//# sourceMappingURL=Sphere.test.js.map