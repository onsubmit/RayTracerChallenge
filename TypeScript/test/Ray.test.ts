import Point from "ts/Point";
import Ray from "ts/Ray";
import Vector from "ts/Vector";

describe("Ray", () => {
  describe("Basic", () => {
    it("Creating a querying a ray", () => {
      const origin = new Point(1, 2, 3);
      const direction = new Vector(4, 5, 6);
      const ray = new Ray(origin, direction);

      expect(ray.origin.compare(origin)).toBe(true);
      expect(ray.direction.compare(direction)).toBe(true);
    });

    it("Computing a point from a distance", () => {
      const origin = new Point(2, 3, 4);
      const direction = new Vector(1, 0, 0);
      const ray = new Ray(origin, direction);

      expect(ray.getPointOnRayAtDistance(0).compare(origin)).toBe(true);
      expect(ray.getPointOnRayAtDistance(1).compare(new Point(3, 3, 4))).toBe(true);
      expect(ray.getPointOnRayAtDistance(-1).compare(new Point(1, 3, 4))).toBe(true);
      expect(ray.getPointOnRayAtDistance(2.5).compare(new Point(4.5, 3, 4))).toBe(true);
    });
  });

  describe("Transforming", () => {
    it("Translating a ray", () => {
      const origin = new Point(1, 2, 3);
      const direction = new Vector(0, 1, 0);
      const ray = new Ray(origin, direction);

      const ray2 = ray.translate(3, 4, 5);
      expect(ray2.origin.compare(new Point(4, 6, 8))).toBe(true);
      expect(ray2.direction.compare(new Vector(0, 1, 0))).toBe(true);
    });

    it("Scaling a ray", () => {
      const origin = new Point(1, 2, 3);
      const direction = new Vector(0, 1, 0);
      const ray = new Ray(origin, direction);

      const ray2 = ray.scale(2, 3, 4);
      expect(ray2.origin.compare(new Point(2, 6, 12))).toBe(true);
      expect(ray2.direction.compare(new Vector(0, 3, 0))).toBe(true);
    });
  });
});
