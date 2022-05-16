import Intersection from "ts/Intersection";
import Intersections from "ts/Intersections";
import Matrix from "ts/Matrix";
import Point from "ts/Point";
import Ray from "ts/Ray";
import Sphere from "ts/shapes/Sphere";
import Vector from "ts/Vector";

describe("Intersections", () => {
  describe("Intersecting rays with spheres", () => {
    it("A ray intersects a sphere at two points", () => {
      const origin = new Point(0, 0, -5);
      const direction = new Vector(0, 0, 1);

      const ray = new Ray(origin, direction);
      const s = new Sphere();

      const intersections = s.getIntersectionsWith(ray);
      expect(intersections.length).toBe(2);
      expect(intersections.at(0).t.compare(4)).toBe(true);
      expect(intersections.at(1).t.compare(6)).toBe(true);
    });

    it("A ray intersects a sphere at a tangent", () => {
      const origin = new Point(0, 1, -5);
      const direction = new Vector(0, 0, 1);

      const ray = new Ray(origin, direction);
      const s = new Sphere();

      const intersections = s.getIntersectionsWith(ray);
      expect(intersections.length).toBe(2);
      expect(intersections.at(0).t.compare(5)).toBe(true);
      expect(intersections.at(1).t.compare(5)).toBe(true);
    });

    it("A ray misses a sphere", () => {
      const origin = new Point(0, 2, -5);
      const direction = new Vector(0, 0, 1);

      const ray = new Ray(origin, direction);
      const s = new Sphere();

      const intersections = s.getIntersectionsWith(ray);
      expect(intersections.length).toBe(0);
    });

    it("A ray originates inside a sphere", () => {
      const origin = Point.origin;
      const direction = new Vector(0, 0, 1);

      const ray = new Ray(origin, direction);
      const s = new Sphere();

      const intersections = s.getIntersectionsWith(ray);
      expect(intersections.length).toBe(2);
      expect(intersections.at(0).t.compare(-1)).toBe(true);
      expect(intersections.at(1).t.compare(1)).toBe(true);
    });

    it("A sphere is behind a ray", () => {
      const origin = new Point(0, 0, 5);
      const direction = new Vector(0, 0, 1);

      const ray = new Ray(origin, direction);
      const s = new Sphere();

      const intersections = s.getIntersectionsWith(ray);
      expect(intersections.length).toBe(2);
      expect(intersections.at(0).t.compare(-6)).toBe(true);
      expect(intersections.at(1).t.compare(-4)).toBe(true);
    });
  });

  describe("Tracking intersections", () => {
    it("An intersection encapsulates t and object", () => {
      const s = new Sphere();
      const i = new Intersection(3.5, s);

      expect(i.t).toBe(3.5);
      expect(i.shape).toEqual(s);
    });

    it("Aggregating intersections", () => {
      const s = new Sphere();
      const i1 = new Intersection(1, s);
      const i2 = new Intersection(2, s);
      const intersections = new Intersections(i1, i2);

      expect(intersections.length).toBe(2);
      expect(intersections.at(0).shape).toEqual(s);
      expect(intersections.at(1).shape).toEqual(s);
    });
  });

  describe("Identifying hits", () => {
    it("The hit, when all intersections have positive t", () => {
      const s = new Sphere();
      const i1 = new Intersection(1, s);
      const i2 = new Intersection(2, s);
      const intersections = new Intersections(i1, i2);
      expect(intersections.hit).toEqual(i1);
    });

    it("The hit, when some intersections have negative t", () => {
      const s = new Sphere();
      const i1 = new Intersection(-1, s);
      const i2 = new Intersection(1, s);
      const intersections = new Intersections(i1, i2);
      expect(intersections.hit).toEqual(i2);
    });

    it("The hit, when all intersections have negative t", () => {
      const s = new Sphere();
      const i1 = new Intersection(-2, s);
      const i2 = new Intersection(-1, s);
      const intersections = new Intersections(i1, i2);
      expect(intersections.hit).toBeUndefined();
    });

    it("The hit is always the lowest nonnegative intersection", () => {
      const s = new Sphere();
      const i1 = new Intersection(5, s);
      const i2 = new Intersection(7, s);
      const i3 = new Intersection(-3, s);
      const i4 = new Intersection(2, s);
      const intersections = new Intersections(i1, i2, i3, i4);
      expect(intersections.hit).toEqual(i4);
    });
  });

  describe("Spheres", () => {
    it("Intersecting a scaled sphere with a ray", () => {
      const origin = new Point(0, 0, -5);
      const direction = new Vector(0, 0, 1);
      const ray = new Ray(origin, direction);

      const s = new Sphere();
      s.transformation = Matrix.getScalingMatrix(2, 2, 2);

      const intersections = s.getIntersectionsWith(ray);
      expect(intersections.length).toBe(2);
      expect(intersections.at(0).t).toBe(3);
      expect(intersections.at(1).t).toBe(7);
    });
  });

  it("Intersecting a translated sphere with a ray", () => {
    const origin = new Point(0, 0, -5);
    const direction = new Vector(0, 0, 1);
    const ray = new Ray(origin, direction);

    const s = new Sphere();
    s.transformation = Matrix.getTranslationMatrix(5, 0, 0);

    const intersections = s.getIntersectionsWith(ray);
    expect(intersections.length).toBe(0);
  });
});
