import "ts/extensions/NumberExtensions";
import Point from "ts/Point";
import Tuple from "ts/Tuple";
import Vector from "ts/Vector";

describe("Tuple", () => {
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

  it("Adding two tuples", () => {
    const t1 = new Tuple(3, -2, 5, 1);
    const t2 = new Tuple(-2, 3, 1, 0);

    expect(t1.add(t2).compare(new Tuple(1, 1, 6, 1))).toBe(true);
  });

  it("Subtracting two points", () => {
    const p1 = new Point(3, 2, 1);
    const p2 = new Point(5, 6, 7);

    expect(p1.subtract(p2).compare(new Vector(-2, -4, -6))).toBe(true);
  });

  it("Subtracting a vector from a point", () => {
    const p = new Point(3, 2, 1);
    const v = new Vector(5, 6, 7);

    expect(p.subtract(v).compare(new Point(-2, -4, -6))).toBe(true);
  });

  it("Subtracting two vectors", () => {
    const v1 = new Vector(3, 2, 1);
    const v2 = new Vector(5, 6, 7);

    expect(v1.subtract(v2).compare(new Vector(-2, -4, -6))).toBe(true);
  });

  it("Subtracting a vector from the zero vector", () => {
    const v = new Vector(1, -2, 3);

    expect(Vector.zero.subtract(v).compare(new Vector(-1, 2, -3))).toBe(true);
  });

  it("Negating a tuple", () => {
    const t = new Tuple(1, -2, 3, -4);

    expect(t.negate().compare(new Tuple(-1, 2, -3, 4))).toBe(true);
  });

  it("Multiplying a tuple by a scalar", () => {
    const t = new Tuple(1, -2, 3, -4);

    expect(t.multiply(3.5).compare(new Tuple(3.5, -7, 10.5, -14))).toBe(true);
  });

  it("Multiplying a tuple by a fraction", () => {
    const t = new Tuple(1, -2, 3, -4);

    expect(t.multiply(0.5).compare(new Tuple(0.5, -1, 1.5, -2))).toBe(true);
  });

  it("Dividing a tuple by a scalar", () => {
    const t = new Tuple(1, -2, 3, -4);

    expect(t.divide(2).compare(new Tuple(0.5, -1, 1.5, -2))).toBe(true);
  });
});
