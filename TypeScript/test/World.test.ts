import Color from "ts/Color";
import Computation from "ts/Computation";
import Intersection from "ts/Intersection";
import Light from "ts/Light";
import Material from "ts/Material";
import Matrix from "ts/Matrix";
import Point from "ts/Point";
import Ray from "ts/Ray";
import Sphere from "ts/shapes/Sphere";
import Vector from "ts/Vector";
import World from "ts/World";

describe("World", () => {
  describe("Basic", () => {
    it("The default world", () => {
      const light = new Light(new Point(-10, 10, -10), Color.white);

      const m1 = new Material();
      m1.color = new Color(0.8, 1.0, 0.6);
      m1.diffuse = 0.7;
      m1.specular = 0.2;

      const s1 = new Sphere(m1);
      const s2 = new Sphere();
      s2.transformation = Matrix.getScalingMatrix(0.5, 0.5, 0.5);

      const world = new World(light, s1, s2);
      expect(world.light.compare(light)).toBe(true);
      expect(world.shapes.findIndex((o) => o.compare(s1))).toBeGreaterThanOrEqual(0);
      expect(world.shapes.findIndex((o) => o.compare(s2))).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Intersections", () => {
    it("Intersect a world with a ray", () => {
      const world = World.getDefaultWorld();
      const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));

      const intersections = world.getIntersectionsWith(ray);
      expect(intersections.length).toBe(4);
      expect(intersections.get(0).t.compare(4)).toBe(true);
      expect(intersections.get(1).t.compare(4.5)).toBe(true);
      expect(intersections.get(2).t.compare(5.5)).toBe(true);
      expect(intersections.get(3).t.compare(6)).toBe(true);
    });

    it("Shading an intersection", () => {
      const world = World.getDefaultWorld();
      const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
      const shape = world.shapes[0];
      const intersection = new Intersection(4, shape);

      const computation = Computation.prepare(intersection, ray);
      const color = world.shadeHit(computation);
      expect(color.compare(new Color(0.38066, 0.47583, 0.2855))).toBe(true);
    });

    it("Shading an intersection from the inside", () => {
      const world = World.getDefaultWorld();
      world.light = new Light(new Point(0, 0.25, 0), Color.white);
      const ray = new Ray(Point.origin, new Vector(0, 0, 1));
      const shape = world.shapes[1];
      const intersection = new Intersection(0.5, shape);

      const computation = Computation.prepare(intersection, ray);
      const color = world.shadeHit(computation);
      expect(color.compare(new Color(0.90498, 0.90498, 0.90498))).toBe(true);
    });

    it("The color when a ray misses", () => {
      const world = World.getDefaultWorld();
      const ray = new Ray(new Point(0, 0, -5), new Vector(0, 1, 0));

      const color = world.getColorAt(ray);
      expect(color).toEqual(Color.black);
    });

    it("The color when a ray hits", () => {
      const world = World.getDefaultWorld();
      const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));

      const color = world.getColorAt(ray);
      expect(color.compare(new Color(0.38066, 0.47583, 0.2855))).toBe(true);
    });

    it("The color with an intersection behind the ray", () => {
      const world = World.getDefaultWorld();
      const outer = world.shapes[0];
      outer.material.ambient = 1;

      const inner = world.shapes[1];
      inner.material.ambient = 1;

      const ray = new Ray(new Point(0, 0, 0.75), new Vector(0, 0, -1));
      const color = world.getColorAt(ray);
      expect(color.compare(inner.material.color)).toBe(true);
    });
  });

  describe("Shadows", () => {
    it("There is no shadow when nothing is collinear with point and light", () => {
      const world = World.getDefaultWorld();
      const point = new Point(0, 10, 10);

      const isShadowed = world.isShadowed(point);
      expect(isShadowed).toBe(false);
    });

    it("The shadow when an object is between the point and the light", () => {
      const world = World.getDefaultWorld();
      const point = new Point(10, -10, 10);

      const isShadowed = world.isShadowed(point);
      expect(isShadowed).toBe(true);
    });

    it("There is no shadow when an object is behind the point", () => {
      const world = World.getDefaultWorld();
      const point = new Point(-2, 2, -2);

      const isShadowed = world.isShadowed(point);
      expect(isShadowed).toBe(false);
    });

    it("shadeHit() is given an intersection in shadow", () => {
      const light = new Light(new Point(0, 0, -10), Color.white);
      const world = new World(light);

      const s1 = new Sphere();
      world.addShape(s1);

      const s2 = new Sphere();
      s2.transformation = Matrix.getTranslationMatrix(0, 0, 10);
      world.addShape(s2);

      const ray = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1));
      const intersection = new Intersection(4, s2);

      const computation = Computation.prepare(intersection, ray);
      const color = world.shadeHit(computation);

      expect(color.compare(new Color(0.1, 0.1, 0.1))).toBe(true);
    });
  });
});
