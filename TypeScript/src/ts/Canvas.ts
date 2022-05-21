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

  get = (x: number, y: number): Color => {
    if (!this.pixels[y] || !this.pixels[y][x]) {
      throw new Error(`Invalid coordinates @ (${x}, ${y})`);
    }

    return this.pixels[y][x];
  };

  writePixel = (x: number, y: number, color: Color): void => {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return;
    }

    x = Math.round(x);
    y = Math.round(y);

    if (!this.pixels[y] || !this.pixels[y][x]) {
      throw new Error(`Invalid coordinates @ (${x}, ${y})`);
    }

    this.pixels[y][x] = color;
  };

  writePixelWithCenteredOrigin = (x: number, y: number, color: Color): void => {
    const dx = this.width / 2;
    const dy = this.height / 2;

    this.writePixel(x + dx, -y + dy, color);
  };
}
