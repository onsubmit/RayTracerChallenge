"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __importDefault(require("ts/Constants"));
const Matrix_1 = __importDefault(require("ts/Matrix"));
const NumberTuple_1 = __importDefault(require("ts/NumberTuple"));
const Point_1 = __importDefault(require("ts/Point"));
const Vector_1 = __importDefault(require("ts/Vector"));
describe("Matrix", () => {
    describe("Basic", () => {
        it("Constructing and inspecting a 4x4 matrix", () => {
            const m = new Matrix_1.default([
                [1, 2, 3, 4],
                [5.5, 6.5, 7.5, 8.5],
                [9, 10, 11, 12],
                [13.5, 14.5, 15.5, 16.5],
            ]);
            expect(m.at(0, 0)).toBe(1);
            expect(m.at(0, 3)).toBe(4);
            expect(m.at(1, 0)).toBe(5.5);
            expect(m.at(1, 2)).toBe(7.5);
            expect(m.at(2, 2)).toBe(11);
            expect(m.at(3, 0)).toBe(13.5);
            expect(m.at(3, 2)).toBe(15.5);
        });
        it("A 2x2 matrix should be representable", () => {
            const m = new Matrix_1.default([
                [-3, 5],
                [1, -2],
            ]);
            expect(m.at(0, 0)).toBe(-3);
            expect(m.at(0, 1)).toBe(5);
            expect(m.at(1, 0)).toBe(1);
            expect(m.at(1, 1)).toBe(-2);
        });
        it("A 3x3 matrix should be representable", () => {
            const m = new Matrix_1.default([
                [-3, 5, 0],
                [1, -2, -7],
                [0, 1, 1],
            ]);
            expect(m.at(0, 0)).toBe(-3);
            expect(m.at(1, 1)).toBe(-2);
            expect(m.at(2, 2)).toBe(1);
        });
        it("Matrix equality with identical matrices", () => {
            const a = new Matrix_1.default([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 8, 7, 6],
                [5, 4, 3, 2],
            ]);
            const b = new Matrix_1.default([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 8, 7, 6],
                [5, 4, 3, 2],
            ]);
            expect(a.compare(b)).toBe(true);
            expect(b.compare(a)).toBe(true);
        });
        it("Matrix equality with different matrices", () => {
            const a = new Matrix_1.default([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 8, 7, 6],
                [5, 4, 3, 2],
            ]);
            const b = new Matrix_1.default([
                [2, 3, 4, 5],
                [6, 7, 8, 9],
                [8, 7, 6, 5],
                [4, 3, 2, 1],
            ]);
            expect(a.compare(b)).toBe(false);
            expect(b.compare(a)).toBe(false);
        });
    });
    describe("Multiplication", () => {
        it("Multiplying two matrices", () => {
            const a = new Matrix_1.default([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 8, 7, 6],
                [5, 4, 3, 2],
            ]);
            const b = new Matrix_1.default([
                [-2, 1, 2, 3],
                [3, 2, 1, -1],
                [4, 3, 6, 5],
                [1, 2, 7, 8],
            ]);
            const product = a.multiply(b);
            const expected = new Matrix_1.default([
                [20, 22, 50, 48],
                [44, 54, 114, 108],
                [40, 58, 110, 102],
                [16, 26, 46, 42],
            ]);
            expect(product.compare(expected)).toBe(true);
        });
        it("A matrix multiplied by a tuple", () => {
            const a = new Matrix_1.default([
                [1, 2, 3, 4],
                [2, 4, 4, 2],
                [8, 6, 4, 1],
                [0, 0, 0, 1],
            ]);
            const b = new NumberTuple_1.default(1, 2, 3, 1);
            const product = a.multiplyByTuple(b);
            expect(product.compare(new NumberTuple_1.default(18, 24, 33, 1))).toBe(true);
        });
        it("Multiplying a matrix by the identity matrix", () => {
            const a = new Matrix_1.default([
                [0, 1, 2, 4],
                [1, 2, 4, 8],
                [2, 4, 8, 16],
                [4, 8, 16, 32],
            ]);
            const i = Matrix_1.default.getIdentityMatrix(4);
            expect(a.multiply(i).compare(a)).toBe(true);
            expect(i.multiply(a).compare(a)).toBe(true);
        });
        it("Multiplying the identity matrix by a tuple", () => {
            const a = new NumberTuple_1.default(1, 2, 3, 4);
            const i = Matrix_1.default.getIdentityMatrix(4);
            expect(i.multiplyByTuple(a).compare(a)).toBe(true);
        });
    });
    describe("Transposition", () => {
        it("Transposing a matrix", () => {
            const a = new Matrix_1.default([
                [0, 9, 3, 0],
                [9, 8, 0, 8],
                [1, 8, 5, 3],
                [0, 0, 5, 8],
            ]);
            const b = new Matrix_1.default([
                [0, 9, 1, 0],
                [9, 8, 8, 0],
                [3, 0, 5, 5],
                [0, 8, 3, 8],
            ]);
            expect(a.transpose().compare(b)).toBe(true);
            expect(b.transpose().compare(a)).toBe(true);
        });
        it("Transposing the identity matrix", () => {
            const i = Matrix_1.default.getIdentityMatrix(4);
            expect(i.transpose().compare(i)).toBe(true);
        });
    });
    describe("Inverting", () => {
        it("Calculating the determinant of a 2x2 matrix", () => {
            const a = new Matrix_1.default([
                [1, 5],
                [-3, 2],
            ]);
            expect(a.determinant).toBe(17);
        });
        it("A submatrix of a 3x3 matrix is a 2x2 matrix", () => {
            const a = new Matrix_1.default([
                [1, 5, 0],
                [-3, 2, 7],
                [0, 6, -3],
            ]);
            const submatrix = a.getSubMatrix(0, 2);
            const expected = new Matrix_1.default([
                [-3, 2],
                [0, 6],
            ]);
            expect(submatrix.compare(expected)).toBe(true);
        });
        it("A submatrix of a 4x4 matrix is a 3x3 matrix", () => {
            const a = new Matrix_1.default([
                [-6, 1, 1, 6],
                [-8, 5, 8, 6],
                [-1, 0, 8, 2],
                [-7, 1, -1, 1],
            ]);
            const submatrix = a.getSubMatrix(2, 1);
            const expected = new Matrix_1.default([
                [-6, 1, 6],
                [-8, 8, 6],
                [-7, -1, 1],
            ]);
            expect(submatrix.compare(expected)).toBe(true);
        });
        it("Calculating a minor of a 3x3 matrix", () => {
            const a = new Matrix_1.default([
                [3, 5, 0],
                [2, -1, -7],
                [6, -1, 5],
            ]);
            const b = a.getSubMatrix(1, 0);
            expect(b.determinant).toBe(25);
            expect(a.getMinor(1, 0)).toBe(25);
        });
        it("Calculating a cofactor of a 3x3 matrix", () => {
            const a = new Matrix_1.default([
                [3, 5, 0],
                [2, -1, -7],
                [6, -1, 5],
            ]);
            expect(a.getMinor(0, 0)).toBe(-12);
            expect(a.getCofactor(0, 0)).toBe(-12);
            expect(a.getMinor(1, 0)).toBe(25);
            expect(a.getCofactor(1, 0)).toBe(-25);
        });
        it("Calculating the determinant of a 3x3 matrix", () => {
            const a = new Matrix_1.default([
                [1, 2, 6],
                [-5, 8, -4],
                [2, 6, 4],
            ]);
            expect(a.getCofactor(0, 0)).toBe(56);
            expect(a.getCofactor(0, 1)).toBe(12);
            expect(a.getCofactor(0, 2)).toBe(-46);
            expect(a.determinant).toBe(-196);
        });
        it("Calculating the determinant of a 4x4 matrix", () => {
            const a = new Matrix_1.default([
                [-2, -8, 3, 5],
                [-3, 1, 7, 3],
                [1, 2, -9, 6],
                [-6, 7, 7, -9],
            ]);
            expect(a.getCofactor(0, 0)).toBe(690);
            expect(a.getCofactor(0, 1)).toBe(447);
            expect(a.getCofactor(0, 2)).toBe(210);
            expect(a.getCofactor(0, 3)).toBe(51);
            expect(a.determinant).toBe(-4071);
        });
        it("Testing an intertible matrix for invertibility", () => {
            const a = new Matrix_1.default([
                [6, 4, 4, 4],
                [5, 5, 7, 6],
                [4, -9, 3, -7],
                [9, 1, 7, -6],
            ]);
            expect(a.determinant).toBe(-2120);
            expect(a.isInvertible).toBe(true);
        });
        it("Testing a noninvertible matrix for invertibility", () => {
            const a = new Matrix_1.default([
                [-4, 2, -2, -3],
                [9, 6, 2, 6],
                [0, -5, 1, -5],
                [0, 0, 0, 0],
            ]);
            expect(a.determinant).toBe(0);
            expect(a.isInvertible).toBe(false);
        });
        it("Calculating the inverse of a matrix", () => {
            const a = new Matrix_1.default([
                [-5, 2, 6, -8],
                [1, -5, 1, 8],
                [7, 7, -6, -7],
                [1, -3, 7, 4],
            ]);
            const b = a.inverse;
            expect(a.determinant).toBe(532);
            expect(a.getCofactor(2, 3)).toBe(-160);
            expect(b.at(3, 2).compare(-160 / 532)).toBe(true);
            expect(a.getCofactor(3, 2)).toBe(105);
            expect(b.at(2, 3).compare(105 / 532)).toBe(true);
            expect(b.compare(new Matrix_1.default([
                [0.21805, 0.45113, 0.2406, -0.04511],
                [-0.80827, -1.45677, -0.44361, 0.52068],
                [-0.07895, -0.22368, -0.05263, 0.19737],
                [-0.52256, -0.81391, -0.30075, 0.30639],
            ]))).toBe(true);
        });
        it("Calculating the inverse of another matrix", () => {
            const a = new Matrix_1.default([
                [8, -5, 9, 2],
                [7, 5, 6, 1],
                [-6, 0, 9, 6],
                [-3, 0, -9, -4],
            ]);
            expect(a.inverse.compare(new Matrix_1.default([
                [-0.15385, -0.15385, -0.28205, -0.53846],
                [-0.07692, 0.12308, 0.02564, 0.03077],
                [0.35897, 0.35897, 0.4359, 0.92308],
                [-0.69231, -0.69231, -0.76923, -1.92308],
            ]))).toBe(true);
        });
        it("Calculating the inverse of a third matrix", () => {
            const a = new Matrix_1.default([
                [9, 3, 0, 9],
                [-5, -2, -6, -3],
                [-4, 9, 6, 4],
                [-7, 6, 6, 2],
            ]);
            expect(a.inverse.compare(new Matrix_1.default([
                [-0.04074, -0.07778, 0.14444, -0.22222],
                [-0.07778, 0.03333, 0.36667, -0.33333],
                [-0.02901, -0.1463, -0.10926, 0.12963],
                [0.17778, 0.06667, -0.26667, 0.33333],
            ]))).toBe(true);
        });
        it("Multiplying a product by its inverse", () => {
            const a = new Matrix_1.default([
                [3, -9, 7, 3],
                [3, -8, 2, -9],
                [-4, 4, 4, 1],
                [-6, 5, -1, 1],
            ]);
            const b = new Matrix_1.default([
                [8, 2, 2, 2],
                [3, -1, 7, 0],
                [7, 0, 5, 4],
                [6, -2, 0, 5],
            ]);
            const c = a.multiply(b);
            expect(c.multiply(b.inverse).compare(a)).toBe(true);
        });
    });
    describe("Translation", () => {
        it("Multiplying by a translation matrix", () => {
            const t = Matrix_1.default.getTranslationMatrix(5, -3, 2);
            const p = new Point_1.default(-3, 4, 5);
            const product = t.multiplyByTuple(p);
            expect(product.compare(new Point_1.default(2, 1, 7))).toBe(true);
        });
        it("Multiplying by the inverse of a translation matrix", () => {
            const t = Matrix_1.default.getTranslationMatrix(5, -3, 2);
            const p = new Point_1.default(-3, 4, 5);
            const product = t.inverse.multiplyByTuple(p);
            expect(product.compare(new Point_1.default(-8, 7, 3))).toBe(true);
        });
        it("Translation does not affect vectors", () => {
            const t = Matrix_1.default.getTranslationMatrix(5, -3, 2);
            const v = new Vector_1.default(-3, 4, 5);
            const product = t.multiplyByTuple(v);
            expect(product.compare(v)).toBe(true);
        });
    });
    describe("Scaling", () => {
        it("A scaling matrix applied to a point", () => {
            const s = Matrix_1.default.getScalingMatrix(2, 3, 4);
            const p = new Point_1.default(-4, 6, 8);
            const product = s.multiplyByTuple(p);
            expect(product.compare(new Point_1.default(-8, 18, 32))).toBe(true);
        });
        it("A scaling matrix applied to a vector", () => {
            const s = Matrix_1.default.getScalingMatrix(2, 3, 4);
            const v = new Vector_1.default(-4, 6, 8);
            const product = s.multiplyByTuple(v);
            expect(product.compare(new Vector_1.default(-8, 18, 32))).toBe(true);
        });
        it("Multiplying by the inverse of a scaling matrix", () => {
            const s = Matrix_1.default.getScalingMatrix(2, 3, 4);
            const v = new Vector_1.default(-4, 6, 8);
            const product = s.inverse.multiplyByTuple(v);
            expect(product.compare(new Vector_1.default(-2, 2, 2))).toBe(true);
        });
        it("Reflection is scaling by a negative value", () => {
            const s = Matrix_1.default.getScalingMatrix(-1, 1, 1);
            const p = new Point_1.default(2, 3, 4);
            const product = s.multiplyByTuple(p);
            expect(product.compare(new Point_1.default(-2, 3, 4))).toBe(true);
        });
    });
    describe("Rotation", () => {
        it("Rotating a point around the x axis", () => {
            const p = new Point_1.default(0, 1, 0);
            const halfQuarter = Matrix_1.default.getRotationMatrixX(Constants_1.default.pi_4);
            const fullQuarter = Matrix_1.default.getRotationMatrixX(Constants_1.default.pi_2);
            expect(halfQuarter.multiplyByTuple(p).compare(new Point_1.default(0, Constants_1.default.sqrt2_2, Constants_1.default.sqrt2_2))).toBe(true);
            expect(fullQuarter.multiplyByTuple(p).compare(new Point_1.default(0, 0, 1))).toBe(true);
        });
        it("The inverse of an x-rotation rotates in the opposite direction", () => {
            const p = new Point_1.default(0, 1, 0);
            const halfQuarter = Matrix_1.default.getRotationMatrixX(Constants_1.default.pi_4);
            const product = halfQuarter.inverse.multiplyByTuple(p);
            expect(product.compare(new Point_1.default(0, Constants_1.default.sqrt2_2, -Constants_1.default.sqrt2_2))).toBe(true);
        });
        it("Rotating a point around the y axis", () => {
            const p = new Point_1.default(0, 0, 1);
            const halfQuarter = Matrix_1.default.getRotationMatrixY(Constants_1.default.pi_4);
            const fullQuarter = Matrix_1.default.getRotationMatrixY(Constants_1.default.pi_2);
            expect(halfQuarter.multiplyByTuple(p).compare(new Point_1.default(Constants_1.default.sqrt2_2, 0, Constants_1.default.sqrt2_2))).toBe(true);
            expect(fullQuarter.multiplyByTuple(p).compare(new Point_1.default(1, 0, 0))).toBe(true);
        });
        it("Rotating a point around the z axis", () => {
            const p = new Point_1.default(0, 1, 0);
            const halfQuarter = Matrix_1.default.getRotationMatrixZ(Constants_1.default.pi_4);
            const fullQuarter = Matrix_1.default.getRotationMatrixZ(Constants_1.default.pi_2);
            expect(halfQuarter.multiplyByTuple(p).compare(new Point_1.default(-Constants_1.default.sqrt2_2, Constants_1.default.sqrt2_2, 0))).toBe(true);
            expect(fullQuarter.multiplyByTuple(p).compare(new Point_1.default(-1, 0, 0))).toBe(true);
        });
    });
    describe("Shearing", () => {
        it("A shearing transformation moves x in proportion to y", () => {
            const s = Matrix_1.default.getShearingMatrix(1, 0, 0, 0, 0, 0);
            const p = new Point_1.default(2, 3, 4);
            const product = s.multiplyByTuple(p);
            expect(product.compare(new Point_1.default(5, 3, 4))).toBe(true);
        });
        it("A shearing transformation moves x in proportion to z", () => {
            const s = Matrix_1.default.getShearingMatrix(0, 1, 0, 0, 0, 0);
            const p = new Point_1.default(2, 3, 4);
            const product = s.multiplyByTuple(p);
            expect(product.compare(new Point_1.default(6, 3, 4))).toBe(true);
        });
        it("A shearing transformation moves y in proportion to x", () => {
            const s = Matrix_1.default.getShearingMatrix(0, 0, 1, 0, 0, 0);
            const p = new Point_1.default(2, 3, 4);
            const product = s.multiplyByTuple(p);
            expect(product.compare(new Point_1.default(2, 5, 4))).toBe(true);
        });
        it("A shearing transformation moves y in proportion to z", () => {
            const s = Matrix_1.default.getShearingMatrix(0, 0, 0, 1, 0, 0);
            const p = new Point_1.default(2, 3, 4);
            const product = s.multiplyByTuple(p);
            expect(product.compare(new Point_1.default(2, 7, 4))).toBe(true);
        });
        it("A shearing transformation moves z in proportion to x", () => {
            const s = Matrix_1.default.getShearingMatrix(0, 0, 0, 0, 1, 0);
            const p = new Point_1.default(2, 3, 4);
            const product = s.multiplyByTuple(p);
            expect(product.compare(new Point_1.default(2, 3, 6))).toBe(true);
        });
        it("A shearing transformation moves z in proportion to y", () => {
            const s = Matrix_1.default.getShearingMatrix(0, 0, 0, 0, 0, 1);
            const p = new Point_1.default(2, 3, 4);
            const product = s.multiplyByTuple(p);
            expect(product.compare(new Point_1.default(2, 3, 7))).toBe(true);
        });
    });
    describe("Chaining transormations", () => {
        it("Individual transformations are applied in sequence", () => {
            const p = new Point_1.default(1, 0, 1);
            const a = Matrix_1.default.getRotationMatrixX(Constants_1.default.pi_2);
            const b = Matrix_1.default.getScalingMatrix(5, 5, 5);
            const c = Matrix_1.default.getTranslationMatrix(10, 5, 7);
            // Apply rotation first
            const p2 = a.multiplyByTuple(p);
            expect(p2.compare(new Point_1.default(1, -1, 0))).toBe(true);
            // Apply scaling
            const p3 = b.multiplyByTuple(p2);
            expect(p3.compare(new Point_1.default(5, -5, 0))).toBe(true);
            // Apply translation
            const p4 = c.multiplyByTuple(p3);
            expect(p4.compare(new Point_1.default(15, 0, 7))).toBe(true);
        });
        it("Chained transformations must be applied in reverse order", () => {
            const p = new Point_1.default(1, 0, 1);
            const a = Matrix_1.default.getRotationMatrixX(Constants_1.default.pi_2);
            const b = Matrix_1.default.getScalingMatrix(5, 5, 5);
            const c = Matrix_1.default.getTranslationMatrix(10, 5, 7);
            const t = c.multiply(b).multiply(a);
            expect(t.multiplyByTuple(p).compare(new Point_1.default(15, 0, 7))).toBe(true);
        });
    });
});
//# sourceMappingURL=Matrix.test.js.map