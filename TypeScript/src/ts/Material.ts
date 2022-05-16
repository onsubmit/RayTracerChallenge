import Color from "./Color";

export default class Material {
  color: Color;
  ambient: number;
  diffuse: number;
  specular: number;
  shininess: number;

  constructor(
    color: Color = Color.white,
    ambient: number = 0.1,
    diffuse: number = 0.9,
    specular: number = 0.9,
    shininess: number = 200
  ) {
    this.color = color;
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.shininess = shininess;
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
