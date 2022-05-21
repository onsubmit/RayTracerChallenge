import Color from "ts/Color";
import Light from "ts/Light";
import Lighting from "ts/Lighting";
import Material from "ts/Material";
import Point from "ts/Point";
import Vector from "ts/Vector";

describe("Material", () => {
  describe("Basic", () => {
    it("The default material", () => {
      const m = new Material();

      expect(m.color).toEqual(Color.white);
      expect(m.ambient).toBe(0.1);
      expect(m.diffuse).toBe(0.9);
      expect(m.specular).toBe(0.9);
      expect(m.shininess).toBe(200);
    });
  });

  describe("Lighting", () => {
    it("Lighting with the eye between the light and the surface", () => {
      const m = new Material();
      const eye = new Vector(0, 0, -1);
      const normal = new Vector(0, 0, -1);
      const light = new Light(new Point(0, 0, -10), Color.white);
      const inShadow = false;

      const result = Lighting.calculate(m, light, Point.origin, eye, normal, inShadow);
      expect(result.compare(new Color(1.9, 1.9, 1.9))).toBe(true);
    });

    it("Lighting with the eye between light and surface, eye offset 45°", () => {
      const m = new Material();
      const eye = new Vector(0, 1, -1).normalize();
      const normal = new Vector(0, 0, -1);
      const light = new Light(new Point(0, 0, -10), Color.white);
      const inShadow = false;

      const result = Lighting.calculate(m, light, Point.origin, eye, normal, inShadow);
      expect(result.compare(new Color(1.0, 1.0, 1.0))).toBe(true);
    });

    it("Lighting with the eye opposite surface, light offset 45°", () => {
      const m = new Material();
      const eye = new Vector(0, 0, -1);
      const normal = new Vector(0, 0, -1);
      const light = new Light(new Point(0, 10, -10), Color.white);
      const inShadow = false;

      const result = Lighting.calculate(m, light, Point.origin, eye, normal, inShadow);
      expect(result.compare(new Color(0.7364, 0.7364, 0.7364))).toBe(true);
    });

    it("Lighting with eye in the path of the reflection vector", () => {
      const m = new Material();
      const eye = new Vector(0, -1, -1).normalize();
      const normal = new Vector(0, 0, -1);
      const light = new Light(new Point(0, 10, -10), Color.white);
      const inShadow = false;

      const result = Lighting.calculate(m, light, Point.origin, eye, normal, inShadow);
      expect(result.compare(new Color(1.6364, 1.6364, 1.6364))).toBe(true);
    });

    it("Lighting with the light behind the surface", () => {
      const m = new Material();
      const eye = new Vector(0, 0, -1);
      const normal = new Vector(0, 0, -1);
      const light = new Light(new Point(0, 0, 10), Color.white);
      const inShadow = false;

      const result = Lighting.calculate(m, light, Point.origin, eye, normal, inShadow);
      expect(result.compare(new Color(0.1, 0.1, 0.1))).toBe(true);
    });

    describe("Shadows", () => {
      it("Lighting with the surface in shadow", () => {
        const m = new Material();
        const eye = new Vector(0, 0, -1);
        const normal = new Vector(0, 0, -1);
        const light = new Light(new Point(0, 0, -10), Color.white);
        const inShadow = true;

        const result = Lighting.calculate(m, light, Point.origin, eye, normal, inShadow);
        expect(result.compare(new Color(0.1, 0.1, 0.1))).toBe(true);
      });
    });
  });
});
