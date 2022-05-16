import "./extensions/NumberExtensions";
import NumberTuple from "./NumberTuple";

export default class Tuple4d extends NumberTuple {
  static readonly zero = new Tuple4d(0, 0, 0, 0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static fromNumberTuple = (numberTuple: NumberTuple, _ = false): Tuple4d =>
    new Tuple4d(numberTuple.get(0), numberTuple.get(1), numberTuple.get(2), numberTuple.get(3));

  get x(): number {
    return this.get(0);
  }

  get y(): number {
    return this.get(1);
  }

  get z(): number {
    return this.get(2);
  }

  get w(): number {
    return this.get(3);
  }

  add = (tuple: Tuple4d): Tuple4d => Tuple4d.fromNumberTuple(NumberTuple.add(this, tuple));
  subtract = (tuple: Tuple4d): Tuple4d => Tuple4d.fromNumberTuple(NumberTuple.subtract(this, tuple));
  multiply = (scalar: number): Tuple4d => Tuple4d.fromNumberTuple(NumberTuple.multiply(this, scalar));
  divide = (scalar: number): Tuple4d => Tuple4d.fromNumberTuple(NumberTuple.divide(this, scalar));
  negate = (): Tuple4d => Tuple4d.fromNumberTuple(NumberTuple.negate(this));

  override toString = (): string =>
    `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)}, ${this.w.toFixed(2)})`;
}
