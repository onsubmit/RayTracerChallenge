import Color from "ts/Color";
import Light from "ts/Light";
import Point from "ts/Point";

describe("Light", () => {
  it("A point light has a position and intensity", () => {
    const position = Point.origin;
    const intensity = Color.white;

    const light = new Light(position, intensity);
    expect(light.position).toEqual(position);
    expect(light.intensity).toEqual(intensity);
  });
});
