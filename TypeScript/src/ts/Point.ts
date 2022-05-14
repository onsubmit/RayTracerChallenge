import Tuple from "./Tuple";
import Vector from "./Vector";

export default class Point extends Tuple {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, 1);
  }

  static fromTuple = (tuple: Tuple): Point => new Point(tuple.x, tuple.y, tuple.z);

  static get zero(): Point {
    return Point.fromTuple(Tuple.zero);
  }

  addVector = (vector: Vector): Point => Point.fromTuple(this.add(vector));
  subtractVector = (vector: Vector): Point => Point.fromTuple(this.subtract(vector));

  override toString = (): string => `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)})`;
}
