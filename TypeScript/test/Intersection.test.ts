import Computation from "ts/Computation";
import Constants from "ts/Constants";
import Intersection from "ts/Intersection";
import Intersections from "ts/Intersections";
import Matrix from "ts/Matrix";
import Point from "ts/Point";
import Ray from "ts/Ray";
import Plane from "ts/shapes/Plane";
import Sphere from "ts/shapes/Sphere";
import TestShape from "ts/shapes/TestShape";
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
      expect(intersections.get(0).t.compare(4)).toBe(true);
      expect(intersections.get(1).t.compare(6)).toBe(true);
    });

    it("A ray intersects a sphere at a tangent", () => {
      const origin = new Point(0, 1, -5);
      const direction = new Vector(0, 0, 1);

      const ray = new Ray(origin, direction);
      const s = new Sphere();

      const intersections = s.getIntersectionsWith(ray);
      expect(intersections.length).toBe(2);
      expect(intersections.get(0).t.compare(5)).toBe(true);
      expect(intersections.get(1).t.compare(5)).toBe(true);
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
      expect(intersections.get(0).t.compare(-1)).toBe(true);
      expect(intersections.get(1).t.compare(1)).toBe(true);
    });

    it("A sphere is behind a ray", () => {
      const origin = new Point(0, 0, 5);
      const direction = new Vector(0, 0, 1);

      const ray = new Ray(origin, direction);
      const s = new Sphere();

      const intersections = s.getIntersectionsWith(ray);
      expect(intersections.length).toBe(2);
      expect(intersections.get(0).t.compare(-6)).toBe(true);
      expect(intersections.get(1).t.compare(-4)).toBe(true);
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
      expect(intersections.get(0).shape).toEqual(s);
      expect(intersections.get(1).shape).toEqual(s);
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
      expect(intersections.hasHit).toBe(false);
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

    it("The hit should offset the point", () => {
      const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
      const sphere = new Sphere();
      sphere.transformation = Matrix.getTranslationMatrix(0, 0, 1);

      const intersection = new Intersection(5, sphere);
      const computation = Computation.prepare(intersection, ray);

      expect(computation.overPoint.z).toBeLessThan(-Constants.epsilon / 2);
      expect(computation.point.z).toBeGreaterThan(computation.overPoint.z);
    });

    it("The under point is offset below the surface", () => {
      const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
      const sphere = Sphere.getGlassSphere();
      sphere.transformation = Matrix.getTranslationMatrix(0, 0, 1);

      const intersection = new Intersection(5, sphere);
      const computation = Computation.prepare(intersection, ray);

      expect(computation.underPoint.z).toBeGreaterThan(Constants.epsilon / 2);
      expect(computation.point.z).toBeLessThan(computation.underPoint.z);
    });
  });

  describe("Shapes", () => {
    describe("TestShape", () => {
      it("Intersecting a scaled shape with a ray", () => {
        const origin = new Point(0, 0, -5);
        const direction = new Vector(0, 0, 1);
        const ray = new Ray(origin, direction);

        const s = new TestShape();
        s.transformation = Matrix.getScalingMatrix(2, 2, 2);

        s.getIntersectionsWith(ray);
        expect(s.savedRay?.origin.compare(new Point(0, 0, -2.5))).toBe(true);
        expect(s.savedRay?.direction.compare(new Vector(0, 0, 0.5))).toBe(true);
      });

      it("Intersecting a translated shape with a ray", () => {
        const origin = new Point(0, 0, -5);
        const direction = new Vector(0, 0, 1);
        const ray = new Ray(origin, direction);

        const s = new TestShape();
        s.transformation = Matrix.getTranslationMatrix(5, 0, 0);

        s.getIntersectionsWith(ray);
        expect(s.savedRay?.origin.compare(new Point(-5, 0, -5))).toBe(true);
        expect(s.savedRay?.direction.compare(new Vector(0, 0, 1))).toBe(true);
      });
    });

    describe("Spheres", () => {
      it("The hit, when an intersection occurs on the outside", () => {
        const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
        const shape = new Sphere();
        const intersection = new Intersection(4, shape);

        const computation = Computation.prepare(intersection, ray);
        expect(computation.inside).toBe(false);
      });

      it("The hit, when an intersection occurs on the inside", () => {
        const ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1));
        const shape = new Sphere();
        const intersection = new Intersection(1, shape);

        const computation = Computation.prepare(intersection, ray);
        expect(computation.t.compare(intersection.t)).toBe(true);
        expect(computation.shape.compare(intersection.shape)).toBe(true);
        expect(computation.point.compare(new Point(0, 0, 1))).toBe(true);
        expect(computation.eye.compare(new Vector(0, 0, -1))).toBe(true);
        expect(computation.normal.compare(new Vector(0, 0, -1))).toBe(true);
        expect(computation.inside).toBe(true);
      });
    });
  });

  describe("Computation", () => {
    it("Precomputing the state of an intersection", () => {
      const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
      const shape = new Sphere();
      const intersection = new Intersection(4, shape);

      const computation = Computation.prepare(intersection, ray);
      expect(computation.t.compare(intersection.t)).toBe(true);
      expect(computation.shape.compare(intersection.shape)).toBe(true);
      expect(computation.point.compare(new Point(0, 0, -1))).toBe(true);
      expect(computation.eye.compare(new Vector(0, 0, -1))).toBe(true);
      expect(computation.normal.compare(new Vector(0, 0, -1))).toBe(true);
    });

    it("Precomputing the reflection vector", () => {
      const shape = new Plane();
      const ray = new Ray(new Point(0, 1, -1), new Vector(0, -1, 1).normalize());
      const intersection = new Intersection(Constants.sqrt2, shape);
      const computation = Computation.prepare(intersection, ray);
      expect(computation.reflect.compare(new Vector(0, 1, 1).normalize())).toBe(true);
    });

    it("Finding n1 and n2 at various intersections", () => {
      const sphere1 = Sphere.getGlassSphere();
      sphere1.transformation = Matrix.getScalingMatrix(2, 2, 2);
      sphere1.material.refractiveIndex = 1.5;

      const sphere2 = Sphere.getGlassSphere();
      sphere2.transformation = Matrix.getTranslationMatrix(0, 0, -0.25);
      sphere2.material.refractiveIndex = 2.0;

      const sphere3 = Sphere.getGlassSphere();
      sphere3.transformation = Matrix.getTranslationMatrix(0, 0, 0.25);
      sphere3.material.refractiveIndex = 2.5;

      const ray = new Ray(new Point(0, 0, -4), new Vector(0, 0, 1));
      const intersections = new Intersections(
        new Intersection(2, sphere1),
        new Intersection(2.75, sphere2),
        new Intersection(3.25, sphere3),
        new Intersection(4.75, sphere2),
        new Intersection(5.25, sphere3),
        new Intersection(6, sphere1)
      );

      const expecteds = [
        {
          n1: 1.0,
          n2: 1.5,
        },
        {
          n1: 1.5,
          n2: 2.0,
        },
        {
          n1: 2.0,
          n2: 2.5,
        },
        {
          n1: 2.5,
          n2: 2.5,
        },
        {
          n1: 2.5,
          n2: 1.5,
        },
        {
          n1: 1.5,
          n2: 1.0,
        },
      ];

      expecteds.forEach((expected, index) => {
        const computations = Computation.prepare(intersections.get(index), ray, intersections);
        expect(computations.exitedMaterialRefractiveIndex.compare(expected.n1)).toBe(true);
        expect(computations.enteredMaterialRefractiveIndex.compare(expected.n2)).toBe(true);
      });
    });

    it("The Schlick approximation under total internal reflection", () => {
      const sphere = Sphere.getGlassSphere();
      const ray = new Ray(new Point(0, 0, Constants.sqrt2_2), new Vector(0, 1, 0));
      const intersections = new Intersections(
        new Intersection(-Constants.sqrt2_2, sphere),
        new Intersection(Constants.sqrt2_2, sphere)
      );
      const computation = Computation.prepare(intersections.get(1), ray, intersections);
      const reflectance = computation.getSchlickApproximation();
      expect(reflectance.compare(1)).toBe(true);
    });

    it("The Schlick approximation with a perpendicular viewing angle", () => {
      const sphere = Sphere.getGlassSphere();
      const ray = new Ray(Point.origin, new Vector(0, 1, 0));
      const intersections = new Intersections(new Intersection(-1, sphere), new Intersection(1, sphere));
      const computation = Computation.prepare(intersections.get(1), ray, intersections);
      const reflectance = computation.getSchlickApproximation();
      expect(reflectance.compare(0.04)).toBe(true);
    });

    it("The Schlick approximation with small angle and n2 > n1", () => {
      const sphere = Sphere.getGlassSphere();
      const ray = new Ray(new Point(0, 0.99, -2), new Vector(0, 0, 1));
      const intersections = new Intersections(new Intersection(1.8589, sphere));
      const computation = Computation.prepare(intersections.get(0), ray, intersections);
      const reflectance = computation.getSchlickApproximation();
      expect(reflectance.compare(0.48873)).toBe(true);
    });
  });
});
