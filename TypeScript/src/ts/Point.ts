import Tuple from "./Tuple";

export default class Point extends Tuple {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, 1);
  }

  static get zero() {
    return new Point(0, 0, 0);
  }
}
