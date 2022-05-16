import Matrix from "ts/Matrix";
import Sphere from "ts/shapes/Sphere";

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
});
