import Tuple from "./Tuple";

export default class Vector extends Tuple {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, 0);
  }

  static fromTuple = (tuple: Tuple): Vector => new Vector(tuple.x, tuple.y, tuple.z);

  static get zero(): Vector {
    return Vector.fromTuple(Tuple.zero);
  }

  get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  override multiply = (scalar: number): Vector => Vector.fromTuple(Tuple.multiply(this, scalar));
  override divide = (scalar: number): Vector => Vector.fromTuple(Tuple.divide(this, scalar));
  override negate = (): Vector => Vector.fromTuple(Tuple.negate(this));

  normalize = (): Vector => this.divide(this.magnitude);
}
