"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NumberTuple_1 = __importDefault(require("./NumberTuple"));
class Matrix {
    constructor(elements) {
        var _a, _b;
        this.at = (row, column) => {
            if (!this.elements[row] || this.elements[row][column] === undefined) {
                throw `Invalid coordinates @ (${row}, ${column})`;
            }
            return this.elements[row][column];
        };
        this.compare = (matrix) => {
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
        this.transpose = () => {
            const transposed = this.elements[0].map((_, c) => this.elements.map((row) => row[c]));
            return new Matrix(transposed);
        };
        this.multiply = (matrix) => {
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
        this.multiplyByTuple = (tuple) => {
            if (this.columns !== tuple.length) {
                throw `Invalid dimensions. Cannot multiply by this tuple. ${this.columns} !== ${tuple.length}`;
            }
            const values = Array.from({ length: this.rows }, () => 0);
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.columns; c++) {
                    values[r] += this.elements[r][c] * tuple.get(c);
                }
            }
            return new NumberTuple_1.default(...values);
        };
        this.getSubMatrix = (rowToRemove, columnToRemove) => {
            const elements = this.elements
                .filter((_, r) => r !== rowToRemove)
                .map((row) => row.filter((_, c) => c !== columnToRemove));
            return new Matrix(elements);
        };
        this.getMinor = (row, column) => {
            const submatrix = this.getSubMatrix(row, column);
            return submatrix.determinant;
        };
        this.getCofactor = (row, column) => {
            const minor = this.getMinor(row, column);
            if ((row + column) % 2 === 1) {
                return -minor;
            }
            return minor;
        };
        this.rotateX = (radians) => this.multiply(Matrix.getRotationMatrixX(radians));
        this.rotateY = (radians) => this.multiply(Matrix.getRotationMatrixY(radians));
        this.rotateZ = (radians) => this.multiply(Matrix.getRotationMatrixZ(radians));
        this.scale = (...coordinates) => this.multiply(Matrix.getScalingMatrix(...coordinates));
        this.shear = (xy, xz, yx, yz, zx, zy) => this.multiply(Matrix.getShearingMatrix(xy, xz, yx, yz, zx, zy));
        this.translate = (...coordinates) => this.multiply(Matrix.getTranslationMatrix(...coordinates));
        this.elements = elements;
        this.rows = elements.length;
        this.columns = (_b = (_a = elements[0]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    }
    static getIdentityMatrix(size) {
        const elements = Array.from({ length: size }, () => Array.from({ length: size }, () => 0));
        for (let i = 0; i < size; i++) {
            elements[i][i] = 1;
        }
        return new Matrix(elements);
    }
    static getTranslationMatrix(...coordinates) {
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
    static getScalingMatrix(...coordinates) {
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
    static getRotationMatrixX(radians) {
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
    static getRotationMatrixY(radians) {
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
    static getRotationMatrixZ(radians) {
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
    static getShearingMatrix(xy, xz, yx, yz, zx, zy) {
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
    get determinant() {
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
        }
        else {
            this.cachedDeterminant = 0;
            for (let c = 0; c < this.columns; c++) {
                this.cachedDeterminant += this.elements[0][c] * this.getCofactor(0, c);
            }
        }
        return this.cachedDeterminant;
    }
    get isInvertible() {
        return !this.determinant.compare(0);
    }
    get inverse() {
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
}
exports.default = Matrix;
//# sourceMappingURL=Matrix.js.map