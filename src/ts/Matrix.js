"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NumberTuple_1 = __importDefault(require("./NumberTuple"));
const Lazy_1 = __importDefault(require("./utils/Lazy"));
class Matrix {
    constructor(elements) {
        var _a, _b;
        this.at = (row, column) => {
            if (!this._elements[row] || this._elements[row][column] === undefined) {
                throw new Error(`Invalid coordinates @ (${row}, ${column})`);
            }
            return this._elements[row][column];
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
                    if (!this._elements[r][c].compare(matrix._elements[r][c])) {
                        return false;
                    }
                }
            }
            return true;
        };
        this.transpose = () => {
            const transposed = this._elements[0].map((_, c) => this._elements.map((row) => row[c]));
            return new Matrix(transposed);
        };
        this.multiply = (matrix) => {
            if (this.columns !== matrix.rows) {
                throw new Error(`Invalid dimensions. Cannot multiply these matrices. ${this.columns} !== ${matrix.rows}`);
            }
            const rows = this.rows;
            const columns = matrix.columns;
            const productsPerEntry = this.columns;
            const elements = Array.from({ length: rows }, () => Array.from({ length: columns }, () => 0));
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    for (let k = 0; k < productsPerEntry; k++) {
                        elements[r][c] += this._elements[r][k] * matrix._elements[k][c];
                    }
                }
            }
            return new Matrix(elements);
        };
        this.multiplyByTuple = (tuple) => {
            if (this.columns !== tuple.length) {
                throw new Error(`Invalid dimensions. Cannot multiply by this tuple. ${this.columns} !== ${tuple.length}`);
            }
            const values = Array.from({ length: this.rows }, () => 0);
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.columns; c++) {
                    values[r] += this._elements[r][c] * tuple.get(c);
                }
            }
            return new NumberTuple_1.default(...values);
        };
        this.getSubMatrix = (rowToRemove, columnToRemove) => {
            const elements = this._elements
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
        this.getDeterminant = () => {
            if (this.rows !== this.columns) {
                throw new Error("Matrix not square");
            }
            if (this.rows > 4) {
                throw new Error("Not implemented");
            }
            let determinant = 0;
            if (this.rows === 2) {
                determinant = this._elements[0][0] * this._elements[1][1] - this._elements[0][1] * this._elements[1][0];
            }
            else {
                for (let c = 0; c < this.columns; c++) {
                    determinant += this._elements[0][c] * this.getCofactor(0, c);
                }
            }
            return { success: true, value: determinant };
        };
        this.getInverse = () => {
            if (!this.isInvertible) {
                throw new Error("Matrix is not invertible");
            }
            const elements = Array.from({ length: this.rows }, () => Array.from({ length: this.columns }, () => 0));
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.columns; c++) {
                    // Note that [c, r] is intentional.
                    elements[c][r] = this.getCofactor(r, c) / this.determinant;
                }
            }
            return { success: true, value: new Matrix(elements) };
        };
        this._elements = elements;
        this.rows = elements.length;
        this.columns = (_b = (_a = elements[0]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        this._determinant = new Lazy_1.default(this.getDeterminant);
        this._inverse = new Lazy_1.default(this.getInverse);
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
        if (this._determinant.value === null) {
            throw new Error("Determinant could not be determined");
        }
        return this._determinant.value;
    }
    get isInvertible() {
        return !this.determinant.compare(0);
    }
    get inverse() {
        if (this._inverse.value === null) {
            throw new Error("Inverse could not be determined");
        }
        return this._inverse.value;
    }
}
exports.default = Matrix;
Matrix.getViewTransformationMatrix = (from, to, up) => {
    const forward = to.subtractPoint(from).normalize();
    const left = forward.cross(up.normalize());
    const trueUp = left.cross(forward);
    const orientation = new Matrix([
        [left.x, left.y, left.z, 0],
        [trueUp.x, trueUp.y, trueUp.z, 0],
        [-forward.x, -forward.y, -forward.z, 0],
        [0, 0, 0, 1],
    ]);
    return orientation.translate(-from.x, -from.y, -from.z);
};
//# sourceMappingURL=Matrix.js.map