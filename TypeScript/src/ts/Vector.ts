import Tuple from "./Tuple";

export default class Vector extends Tuple {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, 0);
  }

  static get zero(): Vector {
    return new Vector(0, 0, 0);
  }

  get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
}
