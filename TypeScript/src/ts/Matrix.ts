import NumberTuple from "./NumberTuple";

export default class Matrix {
  private elements: number[][];
  private cachedDeterminant?: number;
  private cachedInverse?: Matrix;

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

  static getTranslationMatrix(...coordinates: number[]): Matrix {
    const size = coordinates.length;
    if (size < 1) {
      ("At least one coordinate is required.");
    }

    const elements = Array.from({ length: size + 1 }, () => Array.from({ length: size + 1 }, () => 0));

    for (let i = 0; i < size; i++) {
      elements[i][i] = 1;
      elements[i][size] = coordinates[i];
    }

    elements[size][size] = 1;

    return new Matrix(elements);
  }

  static getScalingMatrix(...coordinates: number[]): Matrix {
    const size = coordinates.length;
    if (size < 1) {
      ("At least one coordinate is required.");
    }

    const elements = Array.from({ length: size + 1 }, () => Array.from({ length: size + 1 }, () => 0));

    for (let i = 0; i < size; i++) {
      elements[i][i] = coordinates[i];
    }

    elements[size][size] = 1;

    return new Matrix(elements);
  }

  static getRotationMatrixX(radians: number): Matrix {
    if (radians.compare(0)) {
      return Matrix.getIdentityMatrix(4);
    }

    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    const elements = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0));
    elements[0][0] = 1;

    elements[1][1] = cos;
    elements[1][2] = -sin;

    elements[2][1] = sin;
    elements[2][2] = cos;

    elements[3][3] = 1;

    return new Matrix(elements);
  }

  static getRotationMatrixY(radians: number): Matrix {
    if (radians.compare(0)) {
      return Matrix.getIdentityMatrix(4);
    }

    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    const elements = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0));
    elements[0][0] = cos;
    elements[0][2] = sin;

    elements[1][1] = 1;

    elements[2][0] = -sin;
    elements[2][2] = cos;

    elements[3][3] = 1;

    return new Matrix(elements);
  }

  static getRotationMatrixZ(radians: number): Matrix {
    if (radians.compare(0)) {
      return Matrix.getIdentityMatrix(4);
    }

    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    const elements = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0));
    elements[0][0] = cos;
    elements[0][1] = -sin;

    elements[1][0] = sin;
    elements[1][1] = cos;

    elements[2][2] = 1;
    elements[3][3] = 1;

    return new Matrix(elements);
  }

  static getShearingMatrix(xy: number, xz: number, yx: number, yz: number, zx: number, zy: number): Matrix {
    const elements = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0));
    elements[0][0] = 1;
    elements[1][1] = 1;
    elements[2][2] = 1;
    elements[3][3] = 1;

    elements[0][1] = xy;
    elements[0][2] = xz;

    elements[1][0] = yx;
    elements[1][2] = yz;

    elements[2][0] = zx;
    elements[2][1] = zy;

    return new Matrix(elements);
  }

  get determinant(): number {
    if (this.cachedDeterminant !== undefined) {
      return this.cachedDeterminant;
    }
    if (this.rows !== this.columns) {
      throw "Matrix not square";
    }

    if (this.rows > 4) {
      throw "Not implemented";
    }

    if (this.rows === 2) {
      this.cachedDeterminant = this.elements[0][0] * this.elements[1][1] - this.elements[0][1] * this.elements[1][0];
    } else {
      this.cachedDeterminant = 0;
      for (let c = 0; c < this.columns; c++) {
        this.cachedDeterminant += this.elements[0][c] * this.getCofactor(0, c);
      }
    }

    return this.cachedDeterminant;
  }

  get isInvertible(): boolean {
    return !this.determinant.compare(0);
  }

  get inverse(): Matrix {
    if (this.cachedInverse !== undefined) {
      return this.cachedInverse;
    }

    if (!this.isInvertible) {
      throw "Matrix is not invertible";
    }

    const elements = Array.from({ length: this.rows }, () => Array.from({ length: this.columns }, () => 0));
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        // Note that [c, r] is intentional.
        elements[c][r] = this.getCofactor(r, c) / this.determinant;
      }
    }

    this.cachedInverse = new Matrix(elements);
    return this.cachedInverse;
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
        if (!this.elements[r][c].compare(matrix.elements[r][c])) {
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
    if (this.columns !== tuple.length) {
      throw `Invalid dimensions. Cannot multiply by this tuple. ${this.columns} !== ${tuple.length}`;
    }

    const values = Array.from({ length: this.rows }, () => 0);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        values[r] += this.elements[r][c] * tuple.at(c);
      }
    }

    return new NumberTuple(...values);
  };

  getSubMatrix = (rowToRemove: number, columnToRemove: number): Matrix => {
    const elements = this.elements
      .filter((_, r) => r !== rowToRemove)
      .map((row) => row.filter((_, c) => c !== columnToRemove));

    return new Matrix(elements);
  };

  getMinor = (row: number, column: number): number => {
    const submatrix = this.getSubMatrix(row, column);
    return submatrix.determinant;
  };

  getCofactor = (row: number, column: number): number => {
    const minor = this.getMinor(row, column);

    if ((row + column) % 2 === 1) {
      return -minor;
    }

    return minor;
  };

  rotateX = (radians: number): Matrix => Matrix.getRotationMatrixX(radians).multiply(this);
  rotateY = (radians: number): Matrix => Matrix.getRotationMatrixY(radians).multiply(this);
  rotateZ = (radians: number): Matrix => Matrix.getRotationMatrixZ(radians).multiply(this);

  scale = (...coordinates: number[]): Matrix => Matrix.getScalingMatrix(...coordinates).multiply(this);

  shear = (xy: number, xz: number, yx: number, yz: number, zx: number, zy: number): Matrix =>
    Matrix.getShearingMatrix(xy, xz, yx, yz, zx, zy).multiply(this);

  translate = (...coordinates: number[]): Matrix => Matrix.getTranslationMatrix(...coordinates).multiply(this);
}
