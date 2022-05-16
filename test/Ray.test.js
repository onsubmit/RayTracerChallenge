"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __importDefault(require("ts/Point"));
const Ray_1 = __importDefault(require("ts/Ray"));
const Vector_1 = __importDefault(require("ts/Vector"));
describe("Ray", () => {
    describe("Basic", () => {
        it("Creating a querying a ray", () => {
            const origin = new Point_1.default(1, 2, 3);
            const direction = new Vector_1.default(4, 5, 6);
            const ray = new Ray_1.default(origin, direction);
            expect(ray.origin.compare(origin)).toBe(true);
            expect(ray.direction.compare(direction)).toBe(true);
        });
        it("Computing a point from a distance", () => {
            const origin = new Point_1.default(2, 3, 4);
            const direction = new Vector_1.default(1, 0, 0);
            const ray = new Ray_1.default(origin, direction);
            expect(ray.getPointOnRayAtDistance(0).compare(origin)).toBe(true);
            expect(ray.getPointOnRayAtDistance(1).compare(new Point_1.default(3, 3, 4))).toBe(true);
            expect(ray.getPointOnRayAtDistance(-1).compare(new Point_1.default(1, 3, 4))).toBe(true);
            expect(ray.getPointOnRayAtDistance(2.5).compare(new Point_1.default(4.5, 3, 4))).toBe(true);
        });
    });
    describe("Transforming", () => {
        it("Translating a ray", () => {
            const origin = new Point_1.default(1, 2, 3);
            const direction = new Vector_1.default(0, 1, 0);
            const ray = new Ray_1.default(origin, direction);
            const ray2 = ray.translate(3, 4, 5);
            expect(ray2.origin.compare(new Point_1.default(4, 6, 8))).toBe(true);
            expect(ray2.direction.compare(new Vector_1.default(0, 1, 0))).toBe(true);
        });
        it("Scaling a ray", () => {
            const origin = new Point_1.default(1, 2, 3);
            const direction = new Vector_1.default(0, 1, 0);
            const ray = new Ray_1.default(origin, direction);
            const ray2 = ray.scale(2, 3, 4);
            expect(ray2.origin.compare(new Point_1.default(2, 6, 12))).toBe(true);
            expect(ray2.direction.compare(new Vector_1.default(0, 3, 0))).toBe(true);
        });
    });
});
//# sourceMappingURL=Ray.test.js.map