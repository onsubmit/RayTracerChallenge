import NumberTuple from "./NumberTuple";

export default class Color extends NumberTuple {
  constructor(r: number, g: number, b: number) {
    super(r, g, b);
  }

  static fromNumberTuple = (numberTuple: NumberTuple): Color =>
    new Color(numberTuple.at(0), numberTuple.at(1), numberTuple.at(2));

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

  multiply = (scalar: number): Color => Color.fromNumberTuple(NumberTuple.multiply(this, scalar));

  addColor = (color: Color): Color => Color.fromNumberTuple(NumberTuple.add(this, color));
  subtractColor = (color: Color): Color => Color.fromNumberTuple(NumberTuple.subtract(this, color));

  getHadamardProductWith = (color: Color): Color => {
    const r = this.red * color.red;
    const g = this.green * color.green;
    const b = this.blue * color.blue;

    return new Color(r, g, b);
  };
}
