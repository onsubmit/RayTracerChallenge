import Color from "ts/Color";
import Point from "ts/Point";
import Pattern from "./Pattern";

export default class RingPattern extends Pattern {
  readonly color1: Color;
  readonly color2: Color;

  constructor(color1 = Color.white, color2 = Color.black) {
    super();

    this.color1 = color1;
    this.color2 = color2;
  }

  getColorAtPoint = (point: Point): Color => {
    if (Math.floor(Math.sqrt(point.x * point.x + point.z * point.z)) % 2 === 0) {
      return this.color1;
    }

    return this.color2;
  };
}
