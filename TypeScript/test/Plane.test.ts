import Point from "ts/Point";
import Ray from "ts/Ray";
import Plane from "ts/shapes/Plane";
import Vector from "ts/Vector";

describe("Plane", () => {
  it("The normal of a plane is constant everywhere", () => {
    const p = new Plane();
    const n1 = p.getNormalAtImpl(Point.origin);
    const n2 = p.getNormalAtImpl(new Point(10, 0, -10));
    const n3 = p.getNormalAtImpl(new Point(-5, 0, 150));

    expect(n1.compare(new Vector(0, 1, 0))).toBe(true);
    expect(n2.compare(new Vector(0, 1, 0))).toBe(true);
    expect(n3.compare(new Vector(0, 1, 0))).toBe(true);
  });

  it("Intersect with a ray parallel to the plane", () => {
    const p = new Plane();
    const ray = new Ray(new Point(0, 10, 0), new Vector(0, 0, 1));

    const intersections = p.getIntersectionsWithImpl(ray);
    expect(intersections.hasHit).toBe(false);
  });

  it("Intersect with a coplanar ray", () => {
    const p = new Plane();
    const ray = new Ray(Point.origin, new Vector(0, 0, 1));

    const intersections = p.getIntersectionsWithImpl(ray);
    expect(intersections.hasHit).toBe(false);
  });

  it("A ray intersecting a plane from above", () => {
    const p = new Plane();
    const ray = new Ray(new Point(0, 1, 0), new Vector(0, -1, 0));

    const intersections = p.getIntersectionsWithImpl(ray);
    expect(intersections.hasHit).toBe(true);
    expect(intersections.length).toBe(1);

    const intersection = intersections.get(0);
    expect(intersection.t).toBe(1);
    expect(intersection.shape).toEqual(p);
  });

  it("A ray intersecting a plane from below", () => {
    const p = new Plane();
    const ray = new Ray(new Point(0, -1, 0), new Vector(0, 1, 0));

    const intersections = p.getIntersectionsWithImpl(ray);
    expect(intersections.hasHit).toBe(true);
    expect(intersections.length).toBe(1);

    const intersection = intersections.get(0);
    expect(intersection.t).toBe(1);
    expect(intersection.shape).toEqual(p);
  });
});
