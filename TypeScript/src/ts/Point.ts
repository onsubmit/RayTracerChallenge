import NumberTuple from "./NumberTuple";
import Tuple4d from "./Tuple4d";
import Vector from "./Vector";

export default class Point extends Tuple4d {
  static override readonly zero = new Point(0, 0, 0);
  static readonly origin = Point.zero;

  constructor(x: number, y: number, z: number) {
    super(x, y, z, 1);
  }

  static override fromNumberTuple = (numberTuple: NumberTuple, force = false): Point => {
    if (numberTuple.length < 3) {
      throw `Tuple not long enough. Its length is ${numberTuple.length}`;
    }

    if (!force && numberTuple.length === 4 && !numberTuple.get(3).compare(1)) {
      throw `Tuple is not a point. w=${numberTuple.get(3)}. Must be 1.`;
    }

    return new Point(numberTuple.get(0), numberTuple.get(1), numberTuple.get(2));
  };

  subtractPoint = (point: Point): Vector => Vector.fromNumberTuple(this.subtract(point));

  addVector = (vector: Vector): Point => Point.fromNumberTuple(this.add(vector));
  subtractVector = (vector: Vector): Point => Point.fromNumberTuple(this.subtract(vector));

  override toString = (): string => `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)})`;
}
