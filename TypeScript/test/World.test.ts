import Color from "ts/Color";
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
      const light = new Light(new Point(-10, 10, 10), Color.white);

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
      const world = World.defaultWorld;
      const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));

      const intersections = world.getIntersectionsWith(ray);
      expect(intersections.length).toBe(4);
      expect(intersections.get(0).t.compare(4)).toBe(true);
      expect(intersections.get(1).t.compare(4.5)).toBe(true);
      expect(intersections.get(2).t.compare(5.5)).toBe(true);
      expect(intersections.get(3).t.compare(6)).toBe(true);
    });
  });
});
