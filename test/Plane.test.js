"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __importDefault(require("ts/Point"));
const Ray_1 = __importDefault(require("ts/Ray"));
const Plane_1 = __importDefault(require("ts/shapes/Plane"));
const Vector_1 = __importDefault(require("ts/Vector"));
describe("Plane", () => {
    it("The normal of a plane is constant everywhere", () => {
        const p = new Plane_1.default();
        const n1 = p.getNormalAtImpl(Point_1.default.origin);
        const n2 = p.getNormalAtImpl(new Point_1.default(10, 0, -10));
        const n3 = p.getNormalAtImpl(new Point_1.default(-5, 0, 150));
        expect(n1.compare(new Vector_1.default(0, 1, 0))).toBe(true);
        expect(n2.compare(new Vector_1.default(0, 1, 0))).toBe(true);
        expect(n3.compare(new Vector_1.default(0, 1, 0))).toBe(true);
    });
    it("Intersect with a ray parallel to the plane", () => {
        const p = new Plane_1.default();
        const ray = new Ray_1.default(new Point_1.default(0, 10, 0), new Vector_1.default(0, 0, 1));
        const intersections = p.getIntersectionsWithImpl(ray);
        expect(intersections.hasHit).toBe(false);
    });
    it("Intersect with a coplanar ray", () => {
        const p = new Plane_1.default();
        const ray = new Ray_1.default(Point_1.default.origin, new Vector_1.default(0, 0, 1));
        const intersections = p.getIntersectionsWithImpl(ray);
        expect(intersections.hasHit).toBe(false);
    });
    it("A ray intersecting a plane from above", () => {
        const p = new Plane_1.default();
        const ray = new Ray_1.default(new Point_1.default(0, 1, 0), new Vector_1.default(0, -1, 0));
        const intersections = p.getIntersectionsWithImpl(ray);
        expect(intersections.hasHit).toBe(true);
        expect(intersections.length).toBe(1);
        const intersection = intersections.get(0);
        expect(intersection.t).toBe(1);
        expect(intersection.shape).toEqual(p);
    });
    it("A ray intersecting a plane from below", () => {
        const p = new Plane_1.default();
        const ray = new Ray_1.default(new Point_1.default(0, -1, 0), new Vector_1.default(0, 1, 0));
        const intersections = p.getIntersectionsWithImpl(ray);
        expect(intersections.hasHit).toBe(true);
        expect(intersections.length).toBe(1);
        const intersection = intersections.get(0);
        expect(intersection.t).toBe(1);
        expect(intersection.shape).toEqual(p);
    });
});
//# sourceMappingURL=Plane.test.js.map