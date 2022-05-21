"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __importDefault(require("ts/Constants"));
const Material_1 = __importDefault(require("ts/Material"));
const Matrix_1 = __importDefault(require("ts/Matrix"));
const Point_1 = __importDefault(require("ts/Point"));
const TestShape_1 = __importDefault(require("ts/shapes/TestShape"));
const Vector_1 = __importDefault(require("ts/Vector"));
describe("Shape", () => {
    describe("Transforming", () => {
        it("The default transformation", () => {
            const s = new TestShape_1.default();
            expect(s.transformation.compare(Matrix_1.default.getIdentityMatrix(4))).toBe(true);
        });
        it("Changing a transformation", () => {
            const s = new TestShape_1.default();
            const t = Matrix_1.default.getTranslationMatrix(2, 3, 4);
            s.transformation = t;
            expect(s.transformation).toEqual(t);
        });
    });
    describe("Material", () => {
        it("A shape has a default material", () => {
            const s = new TestShape_1.default();
            expect(s.material.compare(new Material_1.default())).toBe(true);
        });
        it("A shape may be assigned a material", () => {
            const getMaterial = () => {
                const m = new Material_1.default();
                m.ambient = 1;
                return m;
            };
            const s1 = new TestShape_1.default(getMaterial());
            const s2 = new TestShape_1.default();
            s2.material = getMaterial();
            expect(s1.material.compare(getMaterial())).toBe(true);
            expect(s2.material.compare(getMaterial())).toBe(true);
            expect(s1.material.compare(s2.material)).toBe(true);
            expect(s2.material.compare(s1.material)).toBe(true);
        });
    });
    describe("Normals", () => {
        it("Computing the normal of a translated shape", () => {
            const s = new TestShape_1.default();
            s.transformation = Matrix_1.default.getTranslationMatrix(0, 1, 0);
            const n = s.getNormalAt(new Point_1.default(0, 1.70711, -0.70711));
            expect(n.compare(new Vector_1.default(0, 0.70711, -0.70711))).toBe(true);
        });
        it("Computing the normal of a transformed shape", () => {
            const s = new TestShape_1.default();
            s.transformation = s.transformation.scale(1, 0.5, 1).rotateZ(Constants_1.default.pi_5);
            const n = s.getNormalAt(new Point_1.default(0, Constants_1.default.sqrt2_2, -Constants_1.default.sqrt2_2));
            expect(n.compare(new Vector_1.default(0, 0.97014, -0.24254))).toBe(true);
        });
    });
});
//# sourceMappingURL=Shape.test.js.map