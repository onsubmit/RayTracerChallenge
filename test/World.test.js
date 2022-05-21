"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("ts/Color"));
const Computation_1 = __importDefault(require("ts/Computation"));
const Intersection_1 = __importDefault(require("ts/Intersection"));
const Light_1 = __importDefault(require("ts/Light"));
const Material_1 = __importDefault(require("ts/Material"));
const Matrix_1 = __importDefault(require("ts/Matrix"));
const Point_1 = __importDefault(require("ts/Point"));
const Ray_1 = __importDefault(require("ts/Ray"));
const Sphere_1 = __importDefault(require("ts/shapes/Sphere"));
const Vector_1 = __importDefault(require("ts/Vector"));
const World_1 = __importDefault(require("ts/World"));
describe("World", () => {
    describe("Basic", () => {
        it("The default world", () => {
            const light = new Light_1.default(new Point_1.default(-10, 10, -10), Color_1.default.white);
            const m1 = new Material_1.default();
            m1.color = new Color_1.default(0.8, 1.0, 0.6);
            m1.diffuse = 0.7;
            m1.specular = 0.2;
            const s1 = new Sphere_1.default(m1);
            const s2 = new Sphere_1.default();
            s2.transformation = Matrix_1.default.getScalingMatrix(0.5, 0.5, 0.5);
            const world = new World_1.default(light, s1, s2);
            expect(world.light.compare(light)).toBe(true);
            expect(world.shapes.findIndex((o) => o.compare(s1))).toBeGreaterThanOrEqual(0);
            expect(world.shapes.findIndex((o) => o.compare(s2))).toBeGreaterThanOrEqual(0);
        });
    });
    describe("Intersections", () => {
        it("Intersect a world with a ray", () => {
            const world = World_1.default.getDefaultWorld();
            const ray = new Ray_1.default(new Point_1.default(0, 0, -5), new Vector_1.default(0, 0, 1));
            const intersections = world.getIntersectionsWith(ray);
            expect(intersections.length).toBe(4);
            expect(intersections.get(0).t.compare(4)).toBe(true);
            expect(intersections.get(1).t.compare(4.5)).toBe(true);
            expect(intersections.get(2).t.compare(5.5)).toBe(true);
            expect(intersections.get(3).t.compare(6)).toBe(true);
        });
        it("Shading an intersection", () => {
            const world = World_1.default.getDefaultWorld();
            const ray = new Ray_1.default(new Point_1.default(0, 0, -5), new Vector_1.default(0, 0, 1));
            const shape = world.shapes[0];
            const intersection = new Intersection_1.default(4, shape);
            const computation = Computation_1.default.prepare(intersection, ray);
            const color = world.shadeHit(computation);
            expect(color.compare(new Color_1.default(0.38066, 0.47583, 0.2855))).toBe(true);
        });
        it("Shading an intersection from the inside", () => {
            const world = World_1.default.getDefaultWorld();
            world.light = new Light_1.default(new Point_1.default(0, 0.25, 0), Color_1.default.white);
            const ray = new Ray_1.default(Point_1.default.origin, new Vector_1.default(0, 0, 1));
            const shape = world.shapes[1];
            const intersection = new Intersection_1.default(0.5, shape);
            const computation = Computation_1.default.prepare(intersection, ray);
            const color = world.shadeHit(computation);
            expect(color.compare(new Color_1.default(0.90498, 0.90498, 0.90498))).toBe(true);
        });
        it("The color when a ray misses", () => {
            const world = World_1.default.getDefaultWorld();
            const ray = new Ray_1.default(new Point_1.default(0, 0, -5), new Vector_1.default(0, 1, 0));
            const color = world.getColorAt(ray);
            expect(color).toEqual(Color_1.default.black);
        });
        it("The color when a ray hits", () => {
            const world = World_1.default.getDefaultWorld();
            const ray = new Ray_1.default(new Point_1.default(0, 0, -5), new Vector_1.default(0, 0, 1));
            const color = world.getColorAt(ray);
            expect(color.compare(new Color_1.default(0.38066, 0.47583, 0.2855))).toBe(true);
        });
        it("The color with an intersection behind the ray", () => {
            const world = World_1.default.getDefaultWorld();
            const outer = world.shapes[0];
            outer.material.ambient = 1;
            const inner = world.shapes[1];
            inner.material.ambient = 1;
            const ray = new Ray_1.default(new Point_1.default(0, 0, 0.75), new Vector_1.default(0, 0, -1));
            const color = world.getColorAt(ray);
            expect(color.compare(inner.material.color)).toBe(true);
        });
    });
    describe("Shadows", () => {
        it("There is no shadow when nothing is collinear with point and light", () => {
            const world = World_1.default.getDefaultWorld();
            const point = new Point_1.default(0, 10, 10);
            const isShadowed = world.isShadowed(point);
            expect(isShadowed).toBe(false);
        });
        it("The shadow when an object is between the point and the light", () => {
            const world = World_1.default.getDefaultWorld();
            const point = new Point_1.default(10, -10, 10);
            const isShadowed = world.isShadowed(point);
            expect(isShadowed).toBe(true);
        });
        it("There is no shadow when an object is behind the point", () => {
            const world = World_1.default.getDefaultWorld();
            const point = new Point_1.default(-2, 2, -2);
            const isShadowed = world.isShadowed(point);
            expect(isShadowed).toBe(false);
        });
        it("shadeHit() is given an intersection in shadow", () => {
            const light = new Light_1.default(new Point_1.default(0, 0, -10), Color_1.default.white);
            const world = new World_1.default(light);
            const s1 = new Sphere_1.default();
            world.addShape(s1);
            const s2 = new Sphere_1.default();
            s2.transformation = Matrix_1.default.getTranslationMatrix(0, 0, 10);
            world.addShape(s2);
            const ray = new Ray_1.default(new Point_1.default(0, 0, 5), new Vector_1.default(0, 0, 1));
            const intersection = new Intersection_1.default(4, s2);
            const computation = Computation_1.default.prepare(intersection, ray);
            const color = world.shadeHit(computation);
            expect(color.compare(new Color_1.default(0.1, 0.1, 0.1))).toBe(true);
        });
    });
});
//# sourceMappingURL=World.test.js.map