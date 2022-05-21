import Constants from "ts/Constants";
import Point from "ts/Point";
import Sphere from "ts/shapes/Sphere";
import Vector from "ts/Vector";

describe("Sphere", () => {
  describe("Normals", () => {
    it("The normal on a sphere at a point on the x axis", () => {
      const s = new Sphere();

      const n = s.getNormalAt(new Point(1, 0, 0));
      expect(n.compare(new Vector(1, 0, 0))).toBe(true);
    });

    it("The normal on a sphere at a point on the y axis", () => {
      const s = new Sphere();

      const n = s.getNormalAt(new Point(0, 1, 0));
      expect(n.compare(new Vector(0, 1, 0))).toBe(true);
    });

    it("The normal on a sphere at a point on the z axis", () => {
      const s = new Sphere();

      const n = s.getNormalAt(new Point(0, 0, 1));
      expect(n.compare(new Vector(0, 0, 1))).toBe(true);
    });

    it("The normal on a sphere at a nonaxial point", () => {
      const s = new Sphere();

      const n = s.getNormalAt(new Point(Constants.sqrt3_3, Constants.sqrt3_3, Constants.sqrt3_3));
      expect(n.compare(new Vector(Constants.sqrt3_3, Constants.sqrt3_3, Constants.sqrt3_3))).toBe(true);
    });

    it("The normal is a normalized vector", () => {
      const s = new Sphere();

      const n = s.getNormalAt(new Point(Constants.sqrt3_3, Constants.sqrt3_3, Constants.sqrt3_3));
      expect(n.compare(n.normalize())).toBe(true);
    });
  });
});
