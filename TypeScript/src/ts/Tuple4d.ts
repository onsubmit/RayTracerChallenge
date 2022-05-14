import "./extensions/NumberExtensions";
import NumberTuple from "./NumberTuple";

export default class Tuple4d extends NumberTuple {
  static get zero() {
    return new Tuple4d(0, 0, 0, 0);
  }

  get x(): number {
    return this.at(0);
  }

  get y(): number {
    return this.at(1);
  }

  get z(): number {
    return this.at(2);
  }

  get w(): number {
    return this.at(3);
  }

  protected static multiply = (tuple: Tuple4d, scalar: number): Tuple4d =>
    new Tuple4d(tuple.x * scalar, tuple.y * scalar, tuple.z * scalar, tuple.w * scalar);

  protected static divide = (tuple: Tuple4d, scalar: number): Tuple4d =>
    new Tuple4d(tuple.x / scalar, tuple.y / scalar, tuple.z / scalar, tuple.w / scalar);

  protected static negate = (tuple: Tuple4d): Tuple4d => Tuple4d.zero.subtract(tuple);

  add = (tuple: Tuple4d): Tuple4d =>
    new Tuple4d(this.x + tuple.x, this.y + tuple.y, this.z + tuple.z, this.w + tuple.w);

  subtract = (tuple: Tuple4d): Tuple4d =>
    new Tuple4d(this.x - tuple.x, this.y - tuple.y, this.z - tuple.z, this.w - tuple.w);

  multiply = (scalar: number): Tuple4d => Tuple4d.multiply(this, scalar);
  divide = (scalar: number): Tuple4d => Tuple4d.divide(this, scalar);
  negate = (): Tuple4d => Tuple4d.negate(this);

  override toString = (): string =>
    `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)}, ${this.w.toFixed(2)})`;
}
