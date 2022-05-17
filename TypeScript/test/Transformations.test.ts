import Matrix from "ts/Matrix";
import Point from "ts/Point";
import Vector from "ts/Vector";

describe("Transformations", () => {
  it("A view transformation matrix looking in positive z direction", () => {
    const from = Point.origin;
    const to = new Point(0, 0, 1);
    const up = new Vector(0, 1, 0);

    const t = Matrix.getViewTransformationMatrix(from, to, up);
    expect(t.compare(Matrix.getScalingMatrix(-1, 1, -1))).toBe(true);
  });

  it("The view transformation moves the world", () => {
    const from = new Point(0, 0, 8);
    const to = Point.origin;
    const up = new Vector(0, 1, 0);

    const t = Matrix.getViewTransformationMatrix(from, to, up);
    expect(t.compare(Matrix.getTranslationMatrix(0, 0, -8))).toBe(true);
  });

  it("An arbitrary view transformation", () => {
    const from = new Point(1, 3, 2);
    const to = new Point(4, -2, 8);
    const up = new Vector(1, 1, 0);

    const t = Matrix.getViewTransformationMatrix(from, to, up);
    const expected = new Matrix([
      [-0.50709, 0.50709, 0.67612, -2.36643],
      [0.76772, 0.60609, 0.12122, -2.82843],
      [-0.35857, 0.59761, -0.71714, 0],
      [0, 0, 0, 1],
    ]);

    expect(t.compare(expected)).toBe(true);
  });
});
