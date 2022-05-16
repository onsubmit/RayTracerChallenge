import Color from "./Color";
import Point from "./Point";

export default class Light {
  readonly position: Point;
  readonly intensity: Color;

  constructor(position: Point, intensity: Color) {
    this.position = position;
    this.intensity = intensity;
  }

  compare = (light: Light): boolean => {
    if (!this.position.compare(light.position)) {
      return false;
    }

    if (!this.intensity.compare(light.intensity)) {
      return false;
    }

    return true;
  };
}
