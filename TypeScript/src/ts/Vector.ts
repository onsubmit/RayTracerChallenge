import Tuple from "./Tuple";

export default class Vector extends Tuple {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, 0);
  }

  static get zero() {
    return new Vector(0, 0, 0);
  }
}
