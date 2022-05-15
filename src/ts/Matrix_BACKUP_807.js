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
                    if (this.elements[r][c] !== matrix.elements[r][c]) {
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
        if (this.rows !== this.columns) {
            throw "Matrix not square";
        }
        if (this.rows === 2) {
            return this.elements[0][0] * this.elements[1][1] - this.elements[0][1] * this.elements[1][0];
        }
        throw "Not implemented";
    }
}
exports.default = Matrix;
//# sourceMappingURL=Matrix_BACKUP_807.js.map