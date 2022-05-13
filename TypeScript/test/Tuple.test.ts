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
});
