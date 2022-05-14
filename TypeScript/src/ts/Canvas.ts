import Color from "./Color";

export default class Canvas {
  private pixels: Color[][];

  width: number;
  height: number;

  constructor(columns: number, rows: number) {
    this.width = columns;
    this.height = rows;

    this.pixels = Array.from({ length: rows }, () => Array.from({ length: columns }, () => Color.black));
  }

  at = (column: number, row: number): Color => {
    if (!this.pixels[row] || !this.pixels[row][column]) {
      throw `Invalid coordinates @ (${row}, ${column})`;
    }

    return this.pixels[row][column];
  };

  writePixel = (column: number, row: number, color: Color): void => {
    column = Math.round(column);
    row = Math.round(row);

    if (!this.pixels[row] || !this.pixels[row][column]) {
      throw `Invalid coordinates @ (${row}, ${column})`;
    }

    this.pixels[row][column] = color;
  };
}
