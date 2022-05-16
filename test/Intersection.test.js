"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Intersection_1 = __importDefault(require("ts/Intersection"));
const Intersections_1 = __importDefault(require("ts/Intersections"));
const Matrix_1 = __importDefault(require("ts/Matrix"));
const Point_1 = __importDefault(require("ts/Point"));
const Ray_1 = __importDefault(require("ts/Ray"));
const Sphere_1 = __importDefault(require("ts/shapes/Sphere"));
const Vector_1 = __importDefault(require("ts/Vector"));
describe("Intersections", () => {
    describe("Intersecting rays with spheres", () => {
        it("A ray intersects a sphere at two points", () => {
            const origin = new Point_1.default(0, 0, -5);
            const direction = new Vector_1.default(0, 0, 1);
            const ray = new Ray_1.default(origin, direction);
            const s = new Sphere_1.default();
            const intersections = s.getIntersectionsWith(ray);
            expect(intersections.length).toBe(2);
            expect(intersections.at(0).t.compare(4)).toBe(true);
            expect(intersections.at(1).t.compare(6)).toBe(true);
        });
        it("A ray intersects a sphere at a tangent", () => {
            const origin = new Point_1.default(0, 1, -5);
            const direction = new Vector_1.default(0, 0, 1);
            const ray = new Ray_1.default(origin, direction);
            const s = new Sphere_1.default();
            const intersections = s.getIntersectionsWith(ray);
            expect(intersections.length).toBe(2);
            expect(intersections.at(0).t.compare(5)).toBe(true);
            expect(intersections.at(1).t.compare(5)).toBe(true);
        });
        it("A ray misses a sphere", () => {
            const origin = new Point_1.default(0, 2, -5);
            const direction = new Vector_1.default(0, 0, 1);
            const ray = new Ray_1.default(origin, direction);
            const s = new Sphere_1.default();
            const intersections = s.getIntersectionsWith(ray);
            expect(intersections.length).toBe(0);
        });
        it("A ray originates inside a sphere", () => {
            const origin = Point_1.default.origin;
            const direction = new Vector_1.default(0, 0, 1);
            const ray = new Ray_1.default(origin, direction);
            const s = new Sphere_1.default();
            const intersections = s.getIntersectionsWith(ray);
            expect(intersections.length).toBe(2);
            expect(intersections.at(0).t.compare(-1)).toBe(true);
            expect(intersections.at(1).t.compare(1)).toBe(true);
        });
        it("A sphere is behind a ray", () => {
            const origin = new Point_1.default(0, 0, 5);
            const direction = new Vector_1.default(0, 0, 1);
            const ray = new Ray_1.default(origin, direction);
            const s = new Sphere_1.default();
            const intersections = s.getIntersectionsWith(ray);
            expect(intersections.length).toBe(2);
            expect(intersections.at(0).t.compare(-6)).toBe(true);
            expect(intersections.at(1).t.compare(-4)).toBe(true);
        });
    });
    describe("Tracking intersections", () => {
        it("An intersection encapsulates t and object", () => {
            const s = new Sphere_1.default();
            const i = new Intersection_1.default(3.5, s);
            expect(i.t).toBe(3.5);
            expect(i.shape).toEqual(s);
        });
        it("Aggregating intersections", () => {
            const s = new Sphere_1.default();
            const i1 = new Intersection_1.default(1, s);
            const i2 = new Intersection_1.default(2, s);
            const intersections = new Intersections_1.default(i1, i2);
            expect(intersections.length).toBe(2);
            expect(intersections.at(0).shape).toEqual(s);
            expect(intersections.at(1).shape).toEqual(s);
        });
    });
    describe("Identifying hits", () => {
        it("The hit, when all intersections have positive t", () => {
            const s = new Sphere_1.default();
            const i1 = new Intersection_1.default(1, s);
            const i2 = new Intersection_1.default(2, s);
            const intersections = new Intersections_1.default(i1, i2);
            expect(intersections.hit).toEqual(i1);
        });
        it("The hit, when some intersections have negative t", () => {
            const s = new Sphere_1.default();
            const i1 = new Intersection_1.default(-1, s);
            const i2 = new Intersection_1.default(1, s);
            const intersections = new Intersections_1.default(i1, i2);
            expect(intersections.hit).toEqual(i2);
        });
        it("The hit, when all intersections have negative t", () => {
            const s = new Sphere_1.default();
            const i1 = new Intersection_1.default(-2, s);
            const i2 = new Intersection_1.default(-1, s);
            const intersections = new Intersections_1.default(i1, i2);
            expect(intersections.hit).toBeUndefined();
        });
        it("The hit is always the lowest nonnegative intersection", () => {
            const s = new Sphere_1.default();
            const i1 = new Intersection_1.default(5, s);
            const i2 = new Intersection_1.default(7, s);
            const i3 = new Intersection_1.default(-3, s);
            const i4 = new Intersection_1.default(2, s);
            const intersections = new Intersections_1.default(i1, i2, i3, i4);
            expect(intersections.hit).toEqual(i4);
        });
    });
    describe("Spheres", () => {
        it("Intersecting a scaled sphere with a ray", () => {
            const origin = new Point_1.default(0, 0, -5);
            const direction = new Vector_1.default(0, 0, 1);
            const ray = new Ray_1.default(origin, direction);
            const s = new Sphere_1.default();
            s.transformation = Matrix_1.default.getScalingMatrix(2, 2, 2);
            const intersections = s.getIntersectionsWith(ray);
            expect(intersections.length).toBe(2);
            expect(intersections.at(0).t).toBe(3);
            expect(intersections.at(1).t).toBe(7);
        });
    });
    it("Intersecting a translated sphere with a ray", () => {
        const origin = new Point_1.default(0, 0, -5);
        const direction = new Vector_1.default(0, 0, 1);
        const ray = new Ray_1.default(origin, direction);
        const s = new Sphere_1.default();
        s.transformation = Matrix_1.default.getTranslationMatrix(5, 0, 0);
        const intersections = s.getIntersectionsWith(ray);
        expect(intersections.length).toBe(0);
    });
});
//# sourceMappingURL=Intersection.test.js.map