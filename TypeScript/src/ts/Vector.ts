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
  dot = (vector: Vector): number => this.x * vector.x + this.y * vector.y + this.z * vector.z;
  cross = (vector: Vector): Vector => {
    const x = this.y * vector.z - this.z * vector.y;
    const y = this.z * vector.x - this.x * vector.z;
    const z = this.x * vector.y - this.y * vector.x;

    return new Vector(x, y, z);
  };
}
