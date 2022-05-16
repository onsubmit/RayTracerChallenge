import Color from "ts/Color";
import Material from "ts/Material";

describe("Material", () => {
  it("The default material", () => {
    const m = new Material();

    expect(m.color).toEqual(Color.white);
    expect(m.ambient).toBe(0.1);
    expect(m.diffuse).toBe(0.9);
    expect(m.specular).toBe(0.9);
    expect(m.shininess).toBe(200);
  });
});
