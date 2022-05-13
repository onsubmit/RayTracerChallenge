import Tuple from "./Tuple";

export default class Point extends Tuple {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, 1);
  }

  static fromTuple = (tuple: Tuple): Point => new Point(tuple.x, tuple.y, tuple.z);

  static get zero(): Point {
    return Point.fromTuple(Tuple.zero);
  }
}
