import Canvas from "ts/Canvas";
import Color from "ts/Color";

describe("Canvas", () => {
  it("Creating a canvas", () => {
    const canvas = new Canvas(10, 20);

    expect(canvas.width).toBe(10);
    expect(canvas.height).toBe(20);

    for (let r = 0; r < canvas.height; r++) {
      for (let c = 0; c < canvas.width; c++) {
        expect(canvas.at(c, r).compare(Color.black)).toBe(true);
      }
    }
  });

  it.only("Writing pixels to a canvas", () => {
    const c = new Canvas(10, 20);
    c.writePixel(3, 2, Color.red);

    expect(c.at(3, 2).compare(Color.red)).toBe(true);
  });
});
