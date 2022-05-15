import NumberTuple from "./NumberTuple";

export default class Matrix {
  private elements: number[][];

  rows: number;
  columns: number;

  constructor(elements: number[][]) {
    this.elements = elements;

    this.rows = elements.length;
    this.columns = elements[0]?.length ?? 0;
  }

  static getIdentityMatrix(size: number): Matrix {
    const elements = Array.from({ length: size }, () => Array.from({ length: size }, () => 0));
    for (let i = 0; i < size; i++) {
      elements[i][i] = 1;
    }

    return new Matrix(elements);
  }

  static fromNumberTuple(tuple: NumberTuple): Matrix {
    const valuesAsRow = [tuple.values];
    const valuesAsColumn = valuesAsRow[0].map((_, c) => valuesAsRow.map((row) => row[c]));
    return new Matrix(valuesAsColumn);
  }

  get determinant(): number {
    if (this.rows !== this.columns) {
      throw "Matrix not square";
    }

    if (this.rows === 2) {
      return this.elements[0][0] * this.elements[1][1] - this.elements[0][1] * this.elements[1][0];
    }

    throw "Not implemented";
  }

  at = (row: number, column: number): number => {
    if (!this.elements[row] || this.elements[row][column] === undefined) {
      throw `Invalid coordinates @ (${row}, ${column})`;
    }

    return this.elements[row][column];
  };

  compare = (matrix: Matrix): boolean => {
    if (this.rows !== matrix.rows) {
      return false;
    }

    if (this.columns !== matrix.columns) {
      return false;
    }

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        if (this.elements[r][c] !== matrix.elements[r][c]) {
          return false;
        }
      }
    }

    return true;
  };

  transpose = (): Matrix => {
    const transposed = this.elements[0].map((_, c) => this.elements.map((row) => row[c]));
    return new Matrix(transposed);
  };

  multiply = (matrix: Matrix): Matrix => {
    if (this.columns !== matrix.rows) {
      throw `Invalid dimensions. Cannot multiply these matrices. ${this.columns} !== ${matrix.rows}`;
    }

    const rows = this.rows;
    const columns = matrix.columns;
    const productsPerEntry = this.columns;

    const elements = Array.from({ length: rows }, () => Array.from({ length: columns }, () => 0));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        for (let k = 0; k < productsPerEntry; k++) {
          elements[r][c] += this.elements[r][k] * matrix.elements[k][c];
        }
      }
    }

    return new Matrix(elements);
  };

  multiplyByTuple = (tuple: NumberTuple): NumberTuple => {
    const colMatrix = this.multiply(Matrix.fromNumberTuple(tuple));
    const values = colMatrix.elements[0];
    return new NumberTuple(...values);
  };

  getSubMatrix = (rowToRemove: number, columnToRemove: number): Matrix => {
    const elements = Array.from({ length: this.rows - 1 }, () => Array.from({ length: this.columns - 1 }, () => 0));

    let rowAdjustment = 0;
    for (let r = 0; r < this.rows; r++) {
      if (r === rowToRemove) {
        rowAdjustment = 1;
        continue;
      }

      let colAdjustment = 0;
      for (let c = 0; r < this.columns; c++) {
        if (c === columnToRemove) {
          colAdjustment = 1;
          continue;
        }

        elements[r - rowAdjustment][c - colAdjustment] = this.elements[r][c];
      }
    }

    return new Matrix(elements);
  };
}
