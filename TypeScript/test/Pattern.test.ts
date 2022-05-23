import Color from "ts/Color";
import StripePattern from "ts/patterns/StripePattern";
import Point from "ts/Point";

describe("Pattern", () => {
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
});
