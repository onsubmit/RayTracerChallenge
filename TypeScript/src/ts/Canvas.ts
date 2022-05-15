import Color from "./Color";

export default class Canvas {
  private pixels: Color[][];

  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.pixels = Array.from({ length: height }, () => Array.from({ length: width }, () => Color.black));
  }

  at = (x: number, y: number): Color => {
    if (!this.pixels[y] || !this.pixels[y][x]) {
      throw `Invalid coordinates @ (${x}, ${y})`;
    }

    return this.pixels[y][x];
  };

  writePixel = (x: number, y: number, color: Color): void => {
    x = Math.round(x);
    y = Math.round(y);

    if (!this.pixels[y] || !this.pixels[y][x]) {
      throw `Invalid coordinates @ (${x}, ${y})`;
    }

    this.pixels[y][x] = color;
  };

  writePixelWithCenteredOrigin = (x: number, y: number, color: Color): void => {
    const dx = this.width / 2;
    const dy = this.height / 2;

    this.writePixel(x + dx, -y + dy, color);
  };
}
