import NumberTuple from "./NumberTuple";

export default class Color extends NumberTuple {
  static readonly black = new Color(0, 0, 0);
  static readonly white = new Color(1, 1, 1);
  static readonly red = new Color(1, 0, 0);
  static readonly green = new Color(0, 1, 0);
  static readonly blue = new Color(0, 0, 1);

  constructor(r: number, g: number, b: number) {
    super(r, g, b);
  }

  static fromNumberTuple = (numberTuple: NumberTuple): Color =>
    new Color(numberTuple.get(0), numberTuple.get(1), numberTuple.get(2));

  get red(): number {
    return this.get(0);
  }

  get green(): number {
    return this.get(1);
  }

  get blue(): number {
    return this.get(2);
  }

  get hex(): string {
    const r = this.dec2hex(this.red);
    const g = this.dec2hex(this.green);
    const b = this.dec2hex(this.blue);

    return `#${r}${g}${b}`;
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

  private dec2hex = (num: number): string =>
    Math.round(255 * num)
      .toString(16)
      .padStart(2, "0");
}
