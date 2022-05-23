import Color from "ts/Color";
import Matrix from "ts/Matrix";
import StripePattern from "ts/patterns/StripePattern";
import Point from "ts/Point";
import Sphere from "ts/shapes/Sphere";

describe("Pattern", () => {
  describe("Stripe", () => {
    it("Creating a stripe pattern", () => {
      const pattern = new StripePattern(Color.white, Color.black);

      expect(pattern.color1).toEqual(Color.white);
      expect(pattern.color2).toEqual(Color.black);
    });

    it("A stripe pattern is constant in y", () => {
      const pattern = new StripePattern(Color.white, Color.black);

      expect(pattern.getColorAtPoint(Point.origin)).toEqual(Color.white);
      expect(pattern.getColorAtPoint(new Point(0, 1, 0))).toEqual(Color.white);
      expect(pattern.getColorAtPoint(new Point(0, 2, 0))).toEqual(Color.white);
    });

    it("A stripe pattern is constant in z", () => {
      const pattern = new StripePattern(Color.white, Color.black);

      expect(pattern.getColorAtPoint(Point.origin)).toEqual(Color.white);
      expect(pattern.getColorAtPoint(new Point(0, 0, 1))).toEqual(Color.white);
      expect(pattern.getColorAtPoint(new Point(0, 0, 2))).toEqual(Color.white);
    });

    it("A stripe pattern alternates in x", () => {
      const pattern = new StripePattern(Color.white, Color.black);

      expect(pattern.getColorAtPoint(Point.origin)).toEqual(Color.white);
      expect(pattern.getColorAtPoint(new Point(0.9, 0, 0))).toEqual(Color.white);
      expect(pattern.getColorAtPoint(new Point(1, 0, 0))).toEqual(Color.black);
      expect(pattern.getColorAtPoint(new Point(-0.1, 0, 0))).toEqual(Color.black);
      expect(pattern.getColorAtPoint(new Point(-1, 0, 0))).toEqual(Color.black);
      expect(pattern.getColorAtPoint(new Point(-1.1, 0, 0))).toEqual(Color.white);
    });

    describe("Transformations", () => {
      it("Stripes with an object transformation", () => {
        const sphere = new Sphere();
        sphere.transformation = Matrix.getScalingMatrix(2, 2, 2);
        const pattern = new StripePattern();

        const color = pattern.getColorAtShape(sphere, new Point(1.5, 0, 0));
        expect(color.compare(Color.white)).toBe(true);
      });

      it("Stripes with a pattern transformation", () => {
        const sphere = new Sphere();
        const pattern = new StripePattern();
        pattern.transformation = Matrix.getScalingMatrix(2, 2, 2);

        const color = pattern.getColorAtShape(sphere, new Point(1.5, 0, 0));
        expect(color.compare(Color.white)).toBe(true);
      });

      it("Stripes with both an object and a pattern transformation", () => {
        const sphere = new Sphere();
        sphere.transformation = Matrix.getScalingMatrix(2, 2, 2);
        const pattern = new StripePattern();
        pattern.transformation = Matrix.getTranslationMatrix(0.5, 0, 0);

        const color = pattern.getColorAtShape(sphere, new Point(2.5, 0, 0));
        expect(color.compare(Color.white)).toBe(true);
      });
    });
  });
});
