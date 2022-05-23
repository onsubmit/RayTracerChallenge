import Color from "ts/Color";
import Point from "ts/Point";
import Pattern from "./Pattern";

export default class TestPattern extends Pattern {
  constructor() {
    super();
  }

  getColorAtPoint = (point: Point): Color => {
    return new Color(point.x, point.y, point.z);
  };
}
