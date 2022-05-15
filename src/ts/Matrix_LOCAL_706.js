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
            const colMatrix = this.multiply(Matrix.fromNumberTuple(tuple));
            const values = colMatrix.elements[0];
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
    static fromNumberTuple(tuple) {
        const valuesAsRow = [tuple.values];
        const valuesAsColumn = valuesAsRow[0].map((_, c) => valuesAsRow.map((row) => row[c]));
        return new Matrix(valuesAsColumn);
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
//# sourceMappingURL=Matrix_LOCAL_706.js.map