import Color from "ts/Color";
import "ts/extensions/NumberExtensions";
import Point from "ts/Point";
import Tuple4d from "ts/Tuple4d";
import Vector from "ts/Vector";

describe("Tuple", () => {
  describe("Basic", () => {
    it("A tuple with w=1.0 is a point", () => {
      const { x, y, z, w } = { x: 4.3, y: -4.2, z: 3.1, w: 1.0 };
      const t = new Tuple4d(x, y, z, w);

      expect(t.x.compare(x)).toBe(true);
      expect(t.y.compare(y)).toBe(true);
      expect(t.z.compare(z)).toBe(true);
      expect(t.w.compare(w)).toBe(true);
      expect(t.compare(Point.fromNumberTuple(t))).toBe(true);
    });

    it("A tuple with w=0 is a vector", () => {
      const { x, y, z, w } = { x: 4.3, y: -4.2, z: 3.1, w: 0.0 };
      const t = new Tuple4d(x, y, z, w);

      expect(t.x.compare(x)).toBe(true);
      expect(t.y.compare(y)).toBe(true);
      expect(t.z.compare(z)).toBe(true);
      expect(t.w.compare(w)).toBe(true);
      expect(t.compare(Vector.fromNumberTuple(t))).toBe(true);
    });

    it("Point ctor creates Tuples with w=1", () => {
      const { x, y, z, w } = { x: 4, y: -4, z: 3, w: 1 };
      const p = new Point(x, y, z);
      const t = new Tuple4d(x, y, z, w);

      expect(p.compare(t)).toBe(true);
    });

    it("Vector ctor creates Tuples with w=0", () => {
      const { x, y, z, w } = { x: 4, y: -4, z: 3, w: 0 };
      const v = new Vector(x, y, z);
      const t = new Tuple4d(x, y, z, w);

      expect(v.compare(t)).toBe(true);
    });
  });

  describe("Addition", () => {
    it("Adding two tuples", () => {
      const t1 = new Tuple4d(3, -2, 5, 1);
      const t2 = new Tuple4d(-2, 3, 1, 0);

      const sum = t1.add(t2);
      expect(sum.compare(new Tuple4d(1, 1, 6, 1))).toBe(true);
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
      const t = new Tuple4d(1, -2, 3, -4);

      const negated = t.negate();
      expect(negated.compare(new Tuple4d(-1, 2, -3, 4))).toBe(true);
    });
  });

  describe("Multiplication", () => {
    it("Multiplying a tuple by a scalar", () => {
      const t = new Tuple4d(1, -2, 3, -4);

      const product = t.multiply(3.5);
      expect(product.compare(new Tuple4d(3.5, -7, 10.5, -14))).toBe(true);
    });

    it("Multiplying a tuple by a fraction", () => {
      const t = new Tuple4d(1, -2, 3, -4);

      const product = t.multiply(0.5);
      expect(product.compare(new Tuple4d(0.5, -1, 1.5, -2))).toBe(true);
    });
  });

  describe("Division", () => {
    it("Dividing a tuple by a scalar", () => {
      const t = new Tuple4d(1, -2, 3, -4);

      const quotient = t.divide(2);
      expect(quotient.compare(new Tuple4d(0.5, -1, 1.5, -2))).toBe(true);
    });
  });

  describe("Vector", () => {
    describe("Magnitude and normalization", () => {
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

    describe("Dot and cross product", () => {
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

    describe("Reflection", () => {
      it("Reflecting a vector approach at 45°", () => {
        const v = new Vector(1, -1, 0);
        const n = new Vector(0, 1, 0);

        const r = v.reflect(n);
        expect(r.compare(new Vector(1, 1, 0))).toBe(true);
      });

      it("Reflecting a vector off a slanted surface", () => {
        const v = new Vector(0, -1, 0);
        const n = new Vector(1, 1, 0).normalize();

        const r = v.reflect(n);
        expect(r.compare(new Vector(1, 0, 0))).toBe(true);
      });
    });
  });

  describe("Colors", () => {
    it("Colors are (red, green, blue) tuples", () => {
      const { r, g, b } = { r: -0.5, g: 0.4, b: 1.7 };
      const c = new Color(r, g, b);

      expect(c.red).toBe(r);
      expect(c.green).toBe(g);
      expect(c.blue).toBe(b);
    });

    it("Adding colors", () => {
      const c1 = new Color(0.9, 0.6, 0.75);
      const c2 = new Color(0.7, 0.1, 0.25);

      const sum = c1.addColor(c2);
      expect(sum.compare(new Color(1.6, 0.7, 1.0))).toBe(true);
    });

    it("Subtracting colors", () => {
      const c1 = new Color(0.9, 0.6, 0.75);
      const c2 = new Color(0.7, 0.1, 0.25);

      const difference = c1.subtractColor(c2);
      expect(difference.compare(new Color(0.2, 0.5, 0.5))).toBe(true);
    });

    it("Multiplying a color by a scalar", () => {
      const c = new Color(0.2, 0.3, 0.4);

      const product = c.multiply(2);
      expect(product.compare(new Color(0.4, 0.6, 0.8))).toBe(true);
    });

    it("Multiplying colors", () => {
      const c1 = new Color(1, 0.2, 0.4);
      const c2 = new Color(0.9, 1, 0.1);

      const product = c1.getHadamardProductWith(c2);
      expect(product.compare(new Color(0.9, 0.2, 0.04))).toBe(true);
    });
  });
});
