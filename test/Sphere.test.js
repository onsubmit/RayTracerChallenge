"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __importDefault(require("ts/Constants"));
const Point_1 = __importDefault(require("ts/Point"));
const Sphere_1 = __importDefault(require("ts/shapes/Sphere"));
const Vector_1 = __importDefault(require("ts/Vector"));
describe("Sphere", () => {
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
    });
});
//# sourceMappingURL=Sphere.test.js.map