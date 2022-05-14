import "./extensions/NumberExtensions";

export default class Tuple {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly w: number;

  constructor(x: number, y: number, z: number, w: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  static get zero() {
    return new Tuple(0, 0, 0, 0);
  }

  get isPoint(): boolean {
    return this.w === 1;
  }

  get isVector(): boolean {
    return this.w === 0;
  }

  compare = (tuple: Tuple): boolean => {
    if (!this.x.compare(tuple.x)) {
      return false;
    }

    if (!this.y.compare(tuple.y)) {
      return false;
    }

    if (!this.z.compare(tuple.z)) {
      return false;
    }

    if (!this.w.compare(tuple.w)) {
      return false;
    }

    return true;
  };

  protected static multiply = (tuple: Tuple, scalar: number): Tuple =>
    new Tuple(tuple.x * scalar, tuple.y * scalar, tuple.z * scalar, tuple.w * scalar);

  protected static divide = (tuple: Tuple, scalar: number): Tuple =>
    new Tuple(tuple.x / scalar, tuple.y / scalar, tuple.z / scalar, tuple.w / scalar);

  protected static negate = (tuple: Tuple): Tuple => Tuple.zero.subtract(tuple);

  add = (tuple: Tuple): Tuple => new Tuple(this.x + tuple.x, this.y + tuple.y, this.z + tuple.z, this.w + tuple.w);
  subtract = (tuple: Tuple): Tuple => new Tuple(this.x - tuple.x, this.y - tuple.y, this.z - tuple.z, this.w - tuple.w);
  multiply = (scalar: number): Tuple => Tuple.multiply(this, scalar);
  divide = (scalar: number): Tuple => Tuple.divide(this, scalar);
  negate = (): Tuple => Tuple.negate(this);

  toString = (): string => `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)}, ${this.w.toFixed(2)})`;
}
