import Tuple4d from "./Tuple4d";
import Vector from "./Vector";

export default class Point extends Tuple4d {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, 1);
  }

  static fromTuple = (tuple: Tuple4d): Point => new Point(tuple.x, tuple.y, tuple.z);

  static override get zero(): Point {
    return Point.fromTuple(Tuple4d.zero);
  }

  addVector = (vector: Vector): Point => Point.fromTuple(this.add(vector));
  subtractVector = (vector: Vector): Point => Point.fromTuple(this.subtract(vector));

  override toString = (): string => `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)})`;
}
