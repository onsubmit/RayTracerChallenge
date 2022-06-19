"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("ts/Color"));
const Computation_1 = __importDefault(require("ts/Computation"));
const Constants_1 = __importDefault(require("ts/Constants"));
const Intersection_1 = __importDefault(require("ts/Intersection"));
const Intersections_1 = __importDefault(require("ts/Intersections"));
const Light_1 = __importDefault(require("ts/Light"));
const Material_1 = __importDefault(require("ts/Material"));
const Matrix_1 = __importDefault(require("ts/Matrix"));
const TestPattern_1 = __importDefault(require("ts/patterns/TestPattern"));
const Point_1 = __importDefault(require("ts/Point"));
const Ray_1 = __importDefault(require("ts/Ray"));
const Plane_1 = __importDefault(require("ts/shapes/Plane"));
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
    describe("Reflections", () => {
        it("The reflected color for a nonreflective material", () => {
            const world = World_1.default.getDefaultWorld();
            const ray = new Ray_1.default(Point_1.default.origin, new Vector_1.default(0, 0, 1));
            const shape = world.shapes[1];
            shape.material.ambient = 1;
            const intersection = new Intersection_1.default(1, shape);
            const computation = Computation_1.default.prepare(intersection, ray);
            const color = world.getReflectedColor(computation);
            expect(color.compare(Color_1.default.black)).toBe(true);
        });
        it("The reflected color for a reflective material", () => {
            const world = World_1.default.getDefaultWorld();
            const shape = new Plane_1.default();
            shape.material.reflective = 0.5;
            shape.transformation = Matrix_1.default.getTranslationMatrix(0, -1, 0);
            world.addShape(shape);
            const ray = new Ray_1.default(new Point_1.default(0, 0, -3), new Vector_1.default(0, -1, 1).normalize());
            const intersection = new Intersection_1.default(Constants_1.default.sqrt2, shape);
            const computations = Computation_1.default.prepare(intersection, ray);
            const color = world.getReflectedColor(computations);
            expect(color.compare(new Color_1.default(0.19033, 0.23791, 0.14274))).toBe(true);
        });
        it("shadeHit with a reflective material", () => {
            const world = World_1.default.getDefaultWorld();
            const shape = new Plane_1.default();
            shape.material.reflective = 0.5;
            shape.transformation = Matrix_1.default.getTranslationMatrix(0, -1, 0);
            world.addShape(shape);
            const ray = new Ray_1.default(new Point_1.default(0, 0, -3), new Vector_1.default(0, -1, 1).normalize());
            const intersection = new Intersection_1.default(Constants_1.default.sqrt2, shape);
            const computations = Computation_1.default.prepare(intersection, ray);
            const color = world.shadeHit(computations);
            expect(color.compare(new Color_1.default(0.87675, 0.92434, 0.82917))).toBe(true);
        });
        it("getColorAt with mutually reflective surfaces", () => {
            const world = World_1.default.getDefaultWorld();
            world.light = new Light_1.default(Point_1.default.origin, Color_1.default.white);
            const lower = new Plane_1.default();
            lower.material.reflective = 1;
            lower.transformation = Matrix_1.default.getTranslationMatrix(0, -1, 0);
            const upper = new Plane_1.default();
            upper.material.reflective = 1;
            upper.transformation = Matrix_1.default.getTranslationMatrix(0, 1, 0);
            world.addShape(lower);
            world.addShape(upper);
            const ray = new Ray_1.default(Point_1.default.origin, new Vector_1.default(0, 1, 0));
            const color = world.getColorAt(ray);
            expect(color).toBeDefined;
        });
        it("The reflected color at the maximum recursive depth", () => {
            const world = World_1.default.getDefaultWorld();
            world.light = new Light_1.default(Point_1.default.origin, Color_1.default.white);
            const shape = new Plane_1.default();
            shape.material.reflective = 0.5;
            shape.transformation = Matrix_1.default.getTranslationMatrix(0, -1, 0);
            world.addShape(shape);
            const ray = new Ray_1.default(new Point_1.default(0, 0, -3), new Vector_1.default(0, -1, 1).normalize());
            const intersection = new Intersection_1.default(Constants_1.default.sqrt2, shape);
            const computations = Computation_1.default.prepare(intersection, ray);
            const color = world.getReflectedColor(computations, 0);
            expect(color.compare(Color_1.default.black)).toBe(true);
        });
    });
    describe("Refractions", () => {
        it("The refracted color with an opaque surface", () => {
            const world = World_1.default.getDefaultWorld();
            const shape = world.shapes[0];
            const ray = new Ray_1.default(new Point_1.default(0, 0, -5), new Vector_1.default(0, 0, 1));
            const intersections = new Intersections_1.default(new Intersection_1.default(4, shape), new Intersection_1.default(6, shape));
            const computations = Computation_1.default.prepare(intersections.get(0), ray, intersections);
            const color = world.getRefractedColor(computations);
            expect(color.compare(Color_1.default.black)).toBe(true);
        });
        it("The refracted color at the maximum recursive depth", () => {
            const world = World_1.default.getDefaultWorld();
            const shape = world.shapes[0];
            shape.material.transparency = 1;
            shape.material.refractiveIndex = 1.5;
            const ray = new Ray_1.default(new Point_1.default(0, 0, -5), new Vector_1.default(0, 0, 1));
            const intersections = new Intersections_1.default(new Intersection_1.default(4, shape), new Intersection_1.default(6, shape));
            const computations = Computation_1.default.prepare(intersections.get(0), ray, intersections);
            const color = world.getRefractedColor(computations, 0);
            expect(color.compare(Color_1.default.black)).toBe(true);
        });
        it("The refracted color under total internal reflection", () => {
            const world = World_1.default.getDefaultWorld();
            const shape = world.shapes[0];
            shape.material.transparency = 1;
            shape.material.refractiveIndex = 1.5;
            const ray = new Ray_1.default(new Point_1.default(0, 0, Constants_1.default.sqrt2_2), new Vector_1.default(0, 1, 0));
            const intersections = new Intersections_1.default(new Intersection_1.default(-Constants_1.default.sqrt2_2, shape), new Intersection_1.default(Constants_1.default.sqrt2_2, shape));
            const computations = Computation_1.default.prepare(intersections.get(1), ray, intersections);
            const color = world.getRefractedColor(computations);
            expect(color.compare(Color_1.default.black)).toBe(true);
        });
        it("The refracted color with a refracted ray", () => {
            const world = World_1.default.getDefaultWorld();
            const shape1 = world.shapes[0];
            shape1.material.ambient = 1;
            shape1.material.pattern = new TestPattern_1.default();
            const shape2 = world.shapes[1];
            shape2.material.transparency = 1;
            shape2.material.refractiveIndex = 1.5;
            const ray = new Ray_1.default(new Point_1.default(0, 0, 0.1), new Vector_1.default(0, 1, 0));
            const intersections = new Intersections_1.default(new Intersection_1.default(-0.9899, shape1), new Intersection_1.default(-0.4899, shape2), new Intersection_1.default(0.4899, shape2), new Intersection_1.default(0.9899, shape1));
            const computations = Computation_1.default.prepare(intersections.get(2), ray, intersections);
            const color = world.getRefractedColor(computations);
            expect(color.compare(new Color_1.default(0, 0.99887, 0.04721))).toBe(true);
        });
        it("shadeHit with a transparent material", () => {
            const world = World_1.default.getDefaultWorld();
            const floor = new Plane_1.default();
            floor.transformation = Matrix_1.default.getTranslationMatrix(0, -1, 0);
            floor.material.transparency = 0.5;
            floor.material.refractiveIndex = 1.5;
            world.addShape(floor);
            const ball = new Sphere_1.default();
            ball.material.color = Color_1.default.red;
            ball.material.ambient = 0.5;
            ball.transformation = Matrix_1.default.getTranslationMatrix(0, -3.5, -0.5);
            world.addShape(ball);
            const ray = new Ray_1.default(new Point_1.default(0, 0, -3), new Vector_1.default(0, -1, 1).normalize());
            const intersections = new Intersections_1.default(new Intersection_1.default(Constants_1.default.sqrt2, floor));
            const computations = Computation_1.default.prepare(intersections.get(0), ray, intersections);
            const color = world.shadeHit(computations);
            expect(color.compare(new Color_1.default(0.93642, 0.68642, 0.68642))).toBe(true);
        });
        it("shadeHit with a reflective, transparent material", () => {
            const world = World_1.default.getDefaultWorld();
            const floor = new Plane_1.default();
            floor.transformation = Matrix_1.default.getTranslationMatrix(0, -1, 0);
            floor.material.reflective = 0.5;
            floor.material.transparency = 0.5;
            floor.material.refractiveIndex = 1.5;
            world.addShape(floor);
            const ball = new Sphere_1.default();
            ball.material.color = Color_1.default.red;
            ball.material.ambient = 0.5;
            ball.transformation = Matrix_1.default.getTranslationMatrix(0, -3.5, -0.5);
            world.addShape(ball);
            const ray = new Ray_1.default(new Point_1.default(0, 0, -3), new Vector_1.default(0, -1, 1).normalize());
            const intersections = new Intersections_1.default(new Intersection_1.default(Constants_1.default.sqrt2, floor));
            const computations = Computation_1.default.prepare(intersections.get(0), ray, intersections);
            const color = world.shadeHit(computations);
            expect(color.compare(new Color_1.default(0.93391, 0.69643, 0.69243))).toBe(true);
        });
    });
});
//# sourceMappingURL=World.test.js.map