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

  at = (row: number, column: number): Color => this.pixels[row][column];

  writePixel = (row: number, column: number, color: Color): void => {
    this.pixels[row][column] = color;
  };
}
