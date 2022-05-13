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

  get isPoint(): boolean {
    return this.w === 1;
  }

  get isVector(): boolean {
    return this.w === 0;
  }

  compare(tuple: Tuple): boolean {
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
  }
}
