"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __importDefault(require("ts/Constants"));
const Material_1 = __importDefault(require("ts/Material"));
const Matrix_1 = __importDefault(require("ts/Matrix"));
const Point_1 = __importDefault(require("ts/Point"));
const Sphere_1 = __importDefault(require("ts/shapes/Sphere"));
const Vector_1 = __importDefault(require("ts/Vector"));
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
    describe("Normals", () => {
        it("The normal on a sphere at a point on the x axis", () => {
            const s = new Sphere_1.default();
            const n = s.getNormalAt(new Point_1.default(1, 0, 0));
            expect(n.compare(new Vector_1.default(1, 0, 0))).toBe(true);
        });
        it("The normal on a sphere at a point on the y axis", () => {
            const s = new Sphere_1.default();
            const n = s.getNormalAt(new Point_1.default(0, 1, 0));
            expect(n.compare(new Vector_1.default(0, 1, 0))).toBe(true);
        });
        it("The normal on a sphere at a point on the z axis", () => {
            const s = new Sphere_1.default();
            const n = s.getNormalAt(new Point_1.default(0, 0, 1));
            expect(n.compare(new Vector_1.default(0, 0, 1))).toBe(true);
        });
        it("The normal on a sphere at a nonaxial point", () => {
            const s = new Sphere_1.default();
            const n = s.getNormalAt(new Point_1.default(Constants_1.default.sqrt3_3, Constants_1.default.sqrt3_3, Constants_1.default.sqrt3_3));
            expect(n.compare(new Vector_1.default(Constants_1.default.sqrt3_3, Constants_1.default.sqrt3_3, Constants_1.default.sqrt3_3))).toBe(true);
        });
        it("The normal is a normalized vector", () => {
            const s = new Sphere_1.default();
            const n = s.getNormalAt(new Point_1.default(Constants_1.default.sqrt3_3, Constants_1.default.sqrt3_3, Constants_1.default.sqrt3_3));
            expect(n.compare(n.normalize())).toBe(true);
        });
        it("Computing the normal of a translated sphere", () => {
            const s = new Sphere_1.default();
            s.transformation = Matrix_1.default.getTranslationMatrix(0, 1, 0);
            const n = s.getNormalAt(new Point_1.default(0, 1.70711, -0.70711));
            expect(n.compare(new Vector_1.default(0, 0.70711, -0.70711))).toBe(true);
        });
        it("Computing the normal of a transformed sphere", () => {
            const s = new Sphere_1.default();
            s.transformation = s.transformation.scale(1, 0.5, 1).rotateZ(Constants_1.default.pi_5);
            const n = s.getNormalAt(new Point_1.default(0, Constants_1.default.sqrt2_2, -Constants_1.default.sqrt2_2));
            expect(n.compare(new Vector_1.default(0, 0.97014, -0.24254))).toBe(true);
        });
    });
    describe("Material", () => {
        it("A sphere has a default material", () => {
            const s = new Sphere_1.default();
            expect(s.material.compare(new Material_1.default())).toBe(true);
        });
        it("A sphere may be assigned a material", () => {
            const getMaterial = () => {
                const m = new Material_1.default();
                m.ambient = 1;
                return m;
            };
            const s1 = new Sphere_1.default(getMaterial());
            const s2 = new Sphere_1.default();
            s2.material = getMaterial();
            expect(s1.material.compare(getMaterial())).toBe(true);
            expect(s2.material.compare(getMaterial())).toBe(true);
            expect(s1.material.compare(s2.material)).toBe(true);
            expect(s2.material.compare(s1.material)).toBe(true);
        });
    });
});
//# sourceMappingURL=Sphere.test.js.map