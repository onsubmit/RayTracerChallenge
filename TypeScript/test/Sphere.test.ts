import Constants from "ts/Constants";
import Matrix from "ts/Matrix";
import Point from "ts/Point";
import Sphere from "ts/shapes/Sphere";
import Vector from "ts/Vector";

describe("Sphere", () => {
  describe("Transforming", () => {
    it("A sphere's default transformation", () => {
      const s = new Sphere();
      expect(s.transformation.compare(Matrix.getIdentityMatrix(4))).toBe(true);
    });

    it("Changing a sphere's transformation", () => {
      const s = new Sphere();
      const t = Matrix.getTranslationMatrix(2, 3, 4);

      s.transformation = t;
      expect(s.transformation).toEqual(t);
    });
  });

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

    it("Computing the normal of a translated sphere", () => {
      const s = new Sphere();
      s.transformation = Matrix.getTranslationMatrix(0, 1, 0);

      const n = s.getNormalAt(new Point(0, 1.70711, -0.70711));
      expect(n.compare(new Vector(0, 0.70711, -0.70711))).toBe(true);
    });

    it("Computing the normal of a transformed sphere", () => {
      const s = new Sphere();
      s.transformation = s.transformation.scale(1, 0.5, 1).rotateZ(Constants.pi_5);

      const n = s.getNormalAt(new Point(0, Constants.sqrt2_2, -Constants.sqrt2_2));
      expect(n.compare(new Vector(0, 0.97014, -0.24254))).toBe(true);
    });
  });
});
