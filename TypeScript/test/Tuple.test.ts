import "ts/extensions/NumberExtensions";
import Point from "ts/Point";
import Tuple from "ts/Tuple";
import Vector from "ts/Vector";

describe("Tuple", () => {
  describe("Basic", () => {
    it("A tuple with w=1.0 is a point", () => {
      const { x, y, z, w } = { x: 4.3, y: -4.2, z: 3.1, w: 1.0 };
      const t = new Tuple(x, y, z, w);

      expect(t.x.compare(x)).toBe(true);
      expect(t.y.compare(y)).toBe(true);
      expect(t.z.compare(z)).toBe(true);
      expect(t.w.compare(w)).toBe(true);
      expect(t.isPoint).toBe(true);
      expect(t.isVector).toBe(false);
    });

    it("A tuple with w=0 is a vector", () => {
      const { x, y, z, w } = { x: 4.3, y: -4.2, z: 3.1, w: 0.0 };
      const t = new Tuple(x, y, z, w);

      expect(t.x.compare(x)).toBe(true);
      expect(t.y.compare(y)).toBe(true);
      expect(t.z.compare(z)).toBe(true);
      expect(t.w.compare(w)).toBe(true);
      expect(t.isPoint).toBe(false);
      expect(t.isVector).toBe(true);
    });

    it("Point ctor creates Tuples with w=1", () => {
      const { x, y, z, w } = { x: 4, y: -4, z: 3, w: 1 };
      const p = new Point(x, y, z);
      const t = new Tuple(x, y, z, w);

      expect(p.compare(t)).toBe(true);
    });

    it("Vector ctor creates Tuples with w=0", () => {
      const { x, y, z, w } = { x: 4, y: -4, z: 3, w: 0 };
      const v = new Vector(x, y, z);
      const t = new Tuple(x, y, z, w);

      expect(v.compare(t)).toBe(true);
    });
  });

  describe("Addition", () => {
    it("Adding two tuples", () => {
      const t1 = new Tuple(3, -2, 5, 1);
      const t2 = new Tuple(-2, 3, 1, 0);

      const sum = t1.add(t2);
      expect(sum.compare(new Tuple(1, 1, 6, 1))).toBe(true);
    });
  });

  describe("Subtraction", () => {
    it("Subtracting two points", () => {
      const p1 = new Point(3, 2, 1);
      const p2 = new Point(5, 6, 7);

      const difference = p1.subtract(p2);
      expect(difference.compare(new Vector(-2, -4, -6))).toBe(true);
    });

    it("Subtracting a vector from a point", () => {
      const p = new Point(3, 2, 1);
      const v = new Vector(5, 6, 7);

      const difference = p.subtract(v);
      expect(difference.compare(new Point(-2, -4, -6))).toBe(true);
    });

    it("Subtracting two vectors", () => {
      const v1 = new Vector(3, 2, 1);
      const v2 = new Vector(5, 6, 7);

      const difference = v1.subtract(v2);
      expect(difference.compare(new Vector(-2, -4, -6))).toBe(true);
    });

    it("Subtracting a vector from the zero vector", () => {
      const v = new Vector(1, -2, 3);

      const negated = Vector.zero.subtract(v);
      expect(negated.compare(new Vector(-1, 2, -3))).toBe(true);
    });

    it("Negating a tuple", () => {
      const t = new Tuple(1, -2, 3, -4);

      const negated = t.negate();
      expect(negated.compare(new Tuple(-1, 2, -3, 4))).toBe(true);
    });
  });

  describe("Multiplication", () => {
    it("Multiplying a tuple by a scalar", () => {
      const t = new Tuple(1, -2, 3, -4);

      const product = t.multiply(3.5);
      expect(product.compare(new Tuple(3.5, -7, 10.5, -14))).toBe(true);
    });

    it("Multiplying a tuple by a fraction", () => {
      const t = new Tuple(1, -2, 3, -4);

      const product = t.multiply(0.5);
      expect(product.compare(new Tuple(0.5, -1, 1.5, -2))).toBe(true);
    });
  });

  describe("Division", () => {
    it("Dividing a tuple by a scalar", () => {
      const t = new Tuple(1, -2, 3, -4);

      const quotient = t.divide(2);
      expect(quotient.compare(new Tuple(0.5, -1, 1.5, -2))).toBe(true);
    });
  });

  describe("Vector magnitude and normalization", () => {
    it("Computing the magnitude of vector(1, 0, 0)", () => {
      const v = new Vector(1, 0, 0);

      expect(v.magnitude.compare(1)).toBe(true);
    });

    it("Computing the magnitude of vector(0, 1, 0)", () => {
      const v = new Vector(0, 1, 0);

      expect(v.magnitude.compare(1)).toBe(true);
    });

    it("Computing the magnitude of vector(0, 0, 1)", () => {
      const v = new Vector(0, 0, 1);

      expect(v.magnitude.compare(1)).toBe(true);
    });

    it("Computing the magnitude of vector(1, 2, 3)", () => {
      const v = new Vector(1, 2, 3);

      expect(v.magnitude.compare(Math.sqrt(14))).toBe(true);
    });

    it("Computing the magnitude of vector(-1, -2, -3)", () => {
      const v = new Vector(-1, -2, -3);

      expect(v.magnitude.compare(Math.sqrt(14))).toBe(true);
    });

    it("Normalizing vector(4, 0, 0) gives (1, 0, 0)", () => {
      const v = new Vector(4, 0, 0);

      const normalized = v.normalize();
      expect(normalized.compare(new Vector(1, 0, 0))).toBe(true);
    });

    it("Normalizing vector(1, 2, 3)", () => {
      const v = new Vector(1, 2, 3);

      const normalized = v.normalize();
      expect(normalized.compare(new Vector(0.26726, 0.53452, 0.80178))).toBe(true);
    });

    it("The magnitude of a normalized vector", () => {
      const v = new Vector(1, 2, 3);

      const normalized = v.normalize();
      expect(normalized.magnitude).toBe(1);
      expect(normalized.magnitude.compare(1)).toBe(true);
    });
  });

  describe("Vector dot and cross product", () => {
    it("The dot product of two vectors", () => {
      const v1 = new Vector(1, 2, 3);
      const v2 = new Vector(2, 3, 4);

      expect(v1.dot(v2)).toBe(20);
    });

    it("The cross product of two vectors", () => {
      const v1 = new Vector(1, 2, 3);
      const v2 = new Vector(2, 3, 4);

      const cross12 = v1.cross(v2);
      const cross21 = v2.cross(v1);
      expect(cross12.compare(new Vector(-1, 2, -1))).toBe(true);
      expect(cross21.compare(new Vector(1, -2, 1))).toBe(true);
    });
  });
});
