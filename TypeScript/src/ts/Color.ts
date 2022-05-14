import NumberTuple from "./NumberTuple";

export default class Color extends NumberTuple {
  constructor(r: number, g: number, b: number) {
    super(r, g, b);
  }

  get red(): number {
    return this.at(0);
  }

  get green(): number {
    return this.at(1);
  }

  get blue(): number {
    return this.at(2);
  }

  static get black(): Color {
    return new Color(0, 0, 0);
  }
}
