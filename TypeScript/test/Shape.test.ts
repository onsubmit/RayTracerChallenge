import Constants from "ts/Constants";
import Material from "ts/Material";
import Matrix from "ts/Matrix";
import Point from "ts/Point";
import TestShape from "ts/shapes/TestShape";
import Vector from "ts/Vector";

describe("Shape", () => {
  describe("Transforming", () => {
    it("The default transformation", () => {
      const s = new TestShape();
      expect(s.transformation.compare(Matrix.getIdentityMatrix(4))).toBe(true);
    });

    it("Changing a transformation", () => {
      const s = new TestShape();
      const t = Matrix.getTranslationMatrix(2, 3, 4);

      s.transformation = t;
      expect(s.transformation).toEqual(t);
    });
  });

  describe("Material", () => {
    it("A shape has a default material", () => {
      const s = new TestShape();

      expect(s.material.compare(new Material())).toBe(true);
    });

    it("A shape may be assigned a material", () => {
      const getMaterial = (): Material => {
        const m = new Material();
        m.ambient = 1;
        return m;
      };

      const s1 = new TestShape(getMaterial());
      const s2 = new TestShape();
      s2.material = getMaterial();

      expect(s1.material.compare(getMaterial())).toBe(true);
      expect(s2.material.compare(getMaterial())).toBe(true);

      expect(s1.material.compare(s2.material)).toBe(true);
      expect(s2.material.compare(s1.material)).toBe(true);
    });
  });

  describe("Normals", () => {
    it("Computing the normal of a translated shape", () => {
      const s = new TestShape();
      s.transformation = Matrix.getTranslationMatrix(0, 1, 0);

      const n = s.getNormalAt(new Point(0, 1.70711, -0.70711));
      expect(n.compare(new Vector(0, 0.70711, -0.70711))).toBe(true);
    });

    it("Computing the normal of a transformed shape", () => {
      const s = new TestShape();
      s.transformation = s.transformation.scale(1, 0.5, 1).rotateZ(Constants.pi_5);

      const n = s.getNormalAt(new Point(0, Constants.sqrt2_2, -Constants.sqrt2_2));
      expect(n.compare(new Vector(0, 0.97014, -0.24254))).toBe(true);
    });
  });
});
