import Tuple4d from "./Tuple4d";

export default class Vector extends Tuple4d {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, 0);
  }

  static fromTuple = (tuple: Tuple4d): Vector => new Vector(tuple.x, tuple.y, tuple.z);

  static override get zero(): Vector {
    return Vector.fromTuple(Tuple4d.zero);
  }

  get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  override multiply = (scalar: number): Vector => Vector.fromTuple(Tuple4d.multiply(this, scalar));
  override divide = (scalar: number): Vector => Vector.fromTuple(Tuple4d.divide(this, scalar));
  override negate = (): Vector => Vector.fromTuple(Tuple4d.negate(this));

  addVector = (vector: Vector): Vector => Vector.fromTuple(this.add(vector));
  subtractVector = (vector: Vector): Vector => Vector.fromTuple(this.subtract(vector));

  normalize = (): Vector => this.divide(this.magnitude);
  dot = (vector: Vector): number => this.x * vector.x + this.y * vector.y + this.z * vector.z;
  cross = (vector: Vector): Vector => {
    const x = this.y * vector.z - this.z * vector.y;
    const y = this.z * vector.x - this.x * vector.z;
    const z = this.x * vector.y - this.y * vector.x;

    return new Vector(x, y, z);
  };

  override toString = (): string => `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)})`;
}
