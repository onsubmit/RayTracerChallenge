import "./extensions/NumberExtensions";
import NumberTuple from "./NumberTuple";

export default class Tuple4d extends NumberTuple {
  static get zero() {
    return new Tuple4d(0, 0, 0, 0);
  }

  static fromNumberTuple = (numberTuple: NumberTuple): Tuple4d =>
    new Tuple4d(numberTuple.at(0), numberTuple.at(1), numberTuple.at(2), numberTuple.at(3));

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

  add = (tuple: Tuple4d): Tuple4d => Tuple4d.fromNumberTuple(NumberTuple.add(this, tuple));
  subtract = (tuple: Tuple4d): Tuple4d => Tuple4d.fromNumberTuple(NumberTuple.subtract(this, tuple));
  multiply = (scalar: number): Tuple4d => Tuple4d.fromNumberTuple(NumberTuple.multiply(this, scalar));
  divide = (scalar: number): Tuple4d => Tuple4d.fromNumberTuple(NumberTuple.divide(this, scalar));
  negate = (): Tuple4d => Tuple4d.fromNumberTuple(NumberTuple.negate(this));

  override toString = (): string =>
    `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)}, ${this.w.toFixed(2)})`;
}
