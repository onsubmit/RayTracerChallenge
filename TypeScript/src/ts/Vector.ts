import NumberTuple from "./NumberTuple";
import Tuple4d from "./Tuple4d";

export default class Vector extends Tuple4d {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, 0);
  }

  static override fromNumberTuple = (numberTuple: NumberTuple, force: boolean = false): Vector => {
    if (numberTuple.length < 3) {
      throw `Tuple not long enough. Its length is ${numberTuple.length}`;
    }

    if (!force && numberTuple.length === 4 && !numberTuple.get(3).compare(0)) {
      throw `Tuple is not a vector. w=${numberTuple.get(3)}. Must be 0.`;
    }

    return new Vector(numberTuple.get(0), numberTuple.get(1), numberTuple.get(2));
  };

  static override readonly zero: Vector = Vector.fromNumberTuple(Tuple4d.zero);

  get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  override multiply = (scalar: number): Vector => Vector.fromNumberTuple(NumberTuple.multiply(this, scalar));
  override divide = (scalar: number): Vector => Vector.fromNumberTuple(NumberTuple.divide(this, scalar));
  override negate = (): Vector => Vector.fromNumberTuple(Vector.negate(this));

  addVector = (vector: Vector): Vector => Vector.fromNumberTuple(this.add(vector));
  subtractVector = (vector: Vector): Vector => Vector.fromNumberTuple(this.subtract(vector));

  normalize = (): Vector => this.divide(this.magnitude);
  dot = (vector: Vector): number => this.x * vector.x + this.y * vector.y + this.z * vector.z;
  cross = (vector: Vector): Vector => {
    const x = this.y * vector.z - this.z * vector.y;
    const y = this.z * vector.x - this.x * vector.z;
    const z = this.x * vector.y - this.y * vector.x;

    return new Vector(x, y, z);
  };

  reflect = (normal: Vector): Vector => this.subtractVector(normal.multiply(2 * this.dot(normal)));

  override toString = (): string => `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)})`;
}
