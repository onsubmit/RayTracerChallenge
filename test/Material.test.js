"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("ts/Color"));
const Light_1 = __importDefault(require("ts/Light"));
const Lighting_1 = __importDefault(require("ts/Lighting"));
const Material_1 = __importDefault(require("ts/Material"));
const StripePattern_1 = __importDefault(require("ts/patterns/StripePattern"));
const Point_1 = __importDefault(require("ts/Point"));
const Sphere_1 = __importDefault(require("ts/shapes/Sphere"));
const Vector_1 = __importDefault(require("ts/Vector"));
describe("Material", () => {
    describe("Basic", () => {
        it("The default material", () => {
            const m = new Material_1.default();
            expect(m.color).toEqual(Color_1.default.white);
            expect(m.ambient).toBe(0.1);
            expect(m.diffuse).toBe(0.9);
            expect(m.specular).toBe(0.9);
            expect(m.shininess).toBe(200);
            expect(m.reflective).toBe(0);
            expect(m.transparency).toBe(0);
            expect(m.refractiveIndex).toBe(1);
        });
    });
    describe("Lighting", () => {
        it("Lighting with the eye between the light and the surface", () => {
            const m = new Material_1.default();
            const eye = new Vector_1.default(0, 0, -1);
            const normal = new Vector_1.default(0, 0, -1);
            const light = new Light_1.default(new Point_1.default(0, 0, -10), Color_1.default.white);
            const inShadow = false;
            const result = Lighting_1.default.calculate(m, new Sphere_1.default(), light, Point_1.default.origin, eye, normal, inShadow);
            expect(result.compare(new Color_1.default(1.9, 1.9, 1.9))).toBe(true);
        });
        it("Lighting with the eye between light and surface, eye offset 45°", () => {
            const m = new Material_1.default();
            const eye = new Vector_1.default(0, 1, -1).normalize();
            const normal = new Vector_1.default(0, 0, -1);
            const light = new Light_1.default(new Point_1.default(0, 0, -10), Color_1.default.white);
            const inShadow = false;
            const result = Lighting_1.default.calculate(m, new Sphere_1.default(), light, Point_1.default.origin, eye, normal, inShadow);
            expect(result.compare(new Color_1.default(1.0, 1.0, 1.0))).toBe(true);
        });
        it("Lighting with the eye opposite surface, light offset 45°", () => {
            const m = new Material_1.default();
            const eye = new Vector_1.default(0, 0, -1);
            const normal = new Vector_1.default(0, 0, -1);
            const light = new Light_1.default(new Point_1.default(0, 10, -10), Color_1.default.white);
            const inShadow = false;
            const result = Lighting_1.default.calculate(m, new Sphere_1.default(), light, Point_1.default.origin, eye, normal, inShadow);
            expect(result.compare(new Color_1.default(0.7364, 0.7364, 0.7364))).toBe(true);
        });
        it("Lighting with eye in the path of the reflection vector", () => {
            const m = new Material_1.default();
            const eye = new Vector_1.default(0, -1, -1).normalize();
            const normal = new Vector_1.default(0, 0, -1);
            const light = new Light_1.default(new Point_1.default(0, 10, -10), Color_1.default.white);
            const inShadow = false;
            const result = Lighting_1.default.calculate(m, new Sphere_1.default(), light, Point_1.default.origin, eye, normal, inShadow);
            expect(result.compare(new Color_1.default(1.6364, 1.6364, 1.6364))).toBe(true);
        });
        it("Lighting with the light behind the surface", () => {
            const m = new Material_1.default();
            const eye = new Vector_1.default(0, 0, -1);
            const normal = new Vector_1.default(0, 0, -1);
            const light = new Light_1.default(new Point_1.default(0, 0, 10), Color_1.default.white);
            const inShadow = false;
            const result = Lighting_1.default.calculate(m, new Sphere_1.default(), light, Point_1.default.origin, eye, normal, inShadow);
            expect(result.compare(new Color_1.default(0.1, 0.1, 0.1))).toBe(true);
        });
        describe("Shadows", () => {
            it("Lighting with the surface in shadow", () => {
                const m = new Material_1.default();
                const eye = new Vector_1.default(0, 0, -1);
                const normal = new Vector_1.default(0, 0, -1);
                const light = new Light_1.default(new Point_1.default(0, 0, -10), Color_1.default.white);
                const inShadow = true;
                const result = Lighting_1.default.calculate(m, new Sphere_1.default(), light, Point_1.default.origin, eye, normal, inShadow);
                expect(result.compare(new Color_1.default(0.1, 0.1, 0.1))).toBe(true);
            });
        });
        describe("Pattners", () => {
            it("Lighting with a pattern applied", () => {
                const m = new Material_1.default();
                m.pattern = new StripePattern_1.default(Color_1.default.white, Color_1.default.black);
                m.ambient = 1;
                m.diffuse = 0;
                m.specular = 0;
                const eye = new Vector_1.default(0, 0, -1);
                const normal = new Vector_1.default(0, 0, -1);
                const light = new Light_1.default(new Point_1.default(0, 0, -10), Color_1.default.white);
                const inShadow = false;
                const c1 = Lighting_1.default.calculate(m, new Sphere_1.default(), light, new Point_1.default(0.9, 0, 0), eye, normal, inShadow);
                const c2 = Lighting_1.default.calculate(m, new Sphere_1.default(), light, new Point_1.default(1.1, 0, 0), eye, normal, inShadow);
                expect(c1.compare(Color_1.default.white)).toBe(true);
                expect(c2.compare(Color_1.default.black)).toBe(true);
            });
        });
    });
});
//# sourceMappingURL=Material.test.js.map