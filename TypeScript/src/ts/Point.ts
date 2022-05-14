import NumberTuple from "./NumberTuple";
import Tuple4d from "./Tuple4d";
import Vector from "./Vector";

export default class Point extends Tuple4d {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, 1);
  }

  static override fromNumberTuple = (numberTuple: NumberTuple): Point =>
    new Point(numberTuple.at(0), numberTuple.at(1), numberTuple.at(2));

  static override get zero(): Point {
    return Point.fromNumberTuple(Tuple4d.zero);
  }

  addVector = (vector: Vector): Point => Point.fromNumberTuple(this.add(vector));
  subtractVector = (vector: Vector): Point => Point.fromNumberTuple(this.subtract(vector));

  override toString = (): string => `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)})`;
}
