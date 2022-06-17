import Color from "./Color";
import Pattern from "./patterns/Pattern";

export default class Material {
  private _pattern?: Pattern;

  color: Color;
  ambient: number;
  diffuse: number;
  specular: number;
  shininess: number;
  reflective: number;
  transparency: number;
  refractiveIndex: number;

  constructor(
    color: Color = Color.white,
    ambient = 0.1,
    diffuse = 0.9,
    specular = 0.9,
    shininess = 200,
    reflective = 0,
    transparency = 0,
    refractiveIndex = 1
  ) {
    this.color = color;
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.shininess = shininess;
    this.reflective = reflective;
    this.transparency = transparency;
    this.refractiveIndex = refractiveIndex;
  }

  get hasPattern(): boolean {
    return !!this._pattern;
  }

  get pattern(): Pattern {
    if (!this._pattern) {
      throw new Error("No pattern exists");
    }

    return this._pattern;
  }

  set pattern(pattern: Pattern) {
    this._pattern = pattern;
  }

  compare = (material: Material): boolean => {
    if (!this.color.compare(material.color)) {
      return false;
    }

    if (!this.ambient.compare(material.ambient)) {
      return false;
    }

    if (!this.diffuse.compare(material.diffuse)) {
      return false;
    }

    if (!this.specular.compare(material.specular)) {
      return false;
    }

    if (!this.shininess.compare(material.shininess)) {
      return false;
    }

    return true;
  };
}
