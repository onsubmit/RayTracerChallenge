import Color from "ts/Color";
import Matrix from "ts/Matrix";
import GradientPattern from "ts/patterns/GradientPattern";
import RingPattern from "ts/patterns/RingPattern";
import StripePattern from "ts/patterns/StripePattern";
import TestPattern from "ts/patterns/TestPattern";
import Point from "ts/Point";
import Sphere from "ts/shapes/Sphere";

describe("Pattern", () => {
  it("The default pattern transformation", () => {
    const pattern = new TestPattern();
    expect(pattern.transformation.compare(Matrix.getIdentityMatrix(4))).toBe(true);
  });

  it("Assigning a pattern", () => {
    const pattern = new TestPattern();
    pattern.transformation = Matrix.getTranslationMatrix(1, 2, 3);
    expect(pattern.transformation.compare(Matrix.getTranslationMatrix(1, 2, 3))).toBe(true);
  });

  describe("Stripe", () => {
    it("Creating a stripe pattern", () => {
      const pattern = new StripePattern();

      expect(pattern.color1).toEqual(Color.white);
      expect(pattern.color2).toEqual(Color.black);
    });

    it("A stripe pattern is constant in y", () => {
      const pattern = new StripePattern();

      expect(pattern.getColorAtPoint(Point.origin)).toEqual(Color.white);
      expect(pattern.getColorAtPoint(new Point(0, 1, 0))).toEqual(Color.white);
      expect(pattern.getColorAtPoint(new Point(0, 2, 0))).toEqual(Color.white);
    });

    it("A stripe pattern is constant in z", () => {
      const pattern = new StripePattern();

      expect(pattern.getColorAtPoint(Point.origin)).toEqual(Color.white);
      expect(pattern.getColorAtPoint(new Point(0, 0, 1))).toEqual(Color.white);
      expect(pattern.getColorAtPoint(new Point(0, 0, 2))).toEqual(Color.white);
    });

    it("A stripe pattern alternates in x", () => {
      const pattern = new StripePattern();

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

  it("A gradient lineraly interpolates between colors", () => {
    const pattern = new GradientPattern();
    expect(pattern.getColorAtPoint(Point.origin).compare(Color.white)).toBe(true);
    expect(pattern.getColorAtPoint(new Point(0.25, 0, 0)).compare(new Color(0.75, 0.75, 0.75))).toBe(true);
    expect(pattern.getColorAtPoint(new Point(0.5, 0, 0)).compare(new Color(0.5, 0.5, 0.5))).toBe(true);
    expect(pattern.getColorAtPoint(new Point(0.75, 0, 0)).compare(new Color(0.25, 0.25, 0.25))).toBe(true);
  });

  it("A ring should extend in both x and z", () => {
    const pattern = new RingPattern();
    expect(pattern.getColorAtPoint(Point.origin).compare(Color.white)).toBe(true);
    expect(pattern.getColorAtPoint(new Point(1, 0, 0)).compare(Color.black)).toBe(true);
    expect(pattern.getColorAtPoint(new Point(0, 0, 1)).compare(Color.black)).toBe(true);
    expect(pattern.getColorAtPoint(new Point(0.708, 0, 0.708)).compare(Color.black)).toBe(true);
  });

  describe("Transformations", () => {
    it("A pattern with an object transformation", () => {
      const sphere = new Sphere();
      sphere.transformation = Matrix.getScalingMatrix(2, 2, 2);

      const pattern = new TestPattern();

      const color = pattern.getColorAtShape(sphere, new Point(2, 3, 4));
      expect(color.compare(new Color(1, 1.5, 2))).toBe(true);
    });

    it("A pattern with a pattern transformation", () => {
      const sphere = new Sphere();
      const pattern = new TestPattern();
      pattern.transformation = Matrix.getScalingMatrix(2, 2, 2);

      const color = pattern.getColorAtShape(sphere, new Point(2, 3, 4));
      expect(color.compare(new Color(1, 1.5, 2))).toBe(true);
    });

    it("A pattern with both an object and a pattern transformation", () => {
      const sphere = new Sphere();
      sphere.transformation = Matrix.getScalingMatrix(2, 2, 2);

      const pattern = new TestPattern();
      pattern.transformation = Matrix.getTranslationMatrix(0.5, 1, 1.5);

      const color = pattern.getColorAtShape(sphere, new Point(2.5, 3, 3.5));
      expect(color.compare(new Color(0.75, 0.5, 0.25))).toBe(true);
    });
  });
});
