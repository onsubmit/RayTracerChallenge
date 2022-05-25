import Color from "ts/Color";
import Point from "ts/Point";
import Pattern from "./Pattern";

export default class GradientPattern extends Pattern {
  readonly color1: Color;
  readonly color2: Color;

  constructor(color1 = Color.white, color2 = Color.black) {
    super();

    this.color1 = color1;
    this.color2 = color2;
  }

  getColorAtPoint = (point: Point): Color => {
    const distance = this.color2.subtractColor(this.color1);
    const fraction = point.x - Math.floor(point.x);

    return this.color1.addColor(distance.multiply(fraction));
  };
}
