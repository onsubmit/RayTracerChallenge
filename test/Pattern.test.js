"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("ts/Color"));
const Matrix_1 = __importDefault(require("ts/Matrix"));
const CheckerPattern3d_1 = __importDefault(require("ts/patterns/CheckerPattern3d"));
const GradientPattern_1 = __importDefault(require("ts/patterns/GradientPattern"));
const RingPattern_1 = __importDefault(require("ts/patterns/RingPattern"));
const StripePattern_1 = __importDefault(require("ts/patterns/StripePattern"));
const TestPattern_1 = __importDefault(require("ts/patterns/TestPattern"));
const Point_1 = __importDefault(require("ts/Point"));
const Sphere_1 = __importDefault(require("ts/shapes/Sphere"));
describe("Pattern", () => {
    it("The default pattern transformation", () => {
        const pattern = new TestPattern_1.default();
        expect(pattern.transformation.compare(Matrix_1.default.getIdentityMatrix(4))).toBe(true);
    });
    it("Assigning a pattern", () => {
        const pattern = new TestPattern_1.default();
        pattern.transformation = Matrix_1.default.getTranslationMatrix(1, 2, 3);
        expect(pattern.transformation.compare(Matrix_1.default.getTranslationMatrix(1, 2, 3))).toBe(true);
    });
    describe("Stripe", () => {
        it("Creating a stripe pattern", () => {
            const pattern = new StripePattern_1.default();
            expect(pattern.color1).toEqual(Color_1.default.white);
            expect(pattern.color2).toEqual(Color_1.default.black);
        });
        it("A stripe pattern is constant in y", () => {
            const pattern = new StripePattern_1.default();
            expect(pattern.getColorAtPoint(Point_1.default.origin)).toEqual(Color_1.default.white);
            expect(pattern.getColorAtPoint(new Point_1.default(0, 1, 0))).toEqual(Color_1.default.white);
            expect(pattern.getColorAtPoint(new Point_1.default(0, 2, 0))).toEqual(Color_1.default.white);
        });
        it("A stripe pattern is constant in z", () => {
            const pattern = new StripePattern_1.default();
            expect(pattern.getColorAtPoint(Point_1.default.origin)).toEqual(Color_1.default.white);
            expect(pattern.getColorAtPoint(new Point_1.default(0, 0, 1))).toEqual(Color_1.default.white);
            expect(pattern.getColorAtPoint(new Point_1.default(0, 0, 2))).toEqual(Color_1.default.white);
        });
        it("A stripe pattern alternates in x", () => {
            const pattern = new StripePattern_1.default();
            expect(pattern.getColorAtPoint(Point_1.default.origin)).toEqual(Color_1.default.white);
            expect(pattern.getColorAtPoint(new Point_1.default(0.9, 0, 0))).toEqual(Color_1.default.white);
            expect(pattern.getColorAtPoint(new Point_1.default(1, 0, 0))).toEqual(Color_1.default.black);
            expect(pattern.getColorAtPoint(new Point_1.default(-0.1, 0, 0))).toEqual(Color_1.default.black);
            expect(pattern.getColorAtPoint(new Point_1.default(-1, 0, 0))).toEqual(Color_1.default.black);
            expect(pattern.getColorAtPoint(new Point_1.default(-1.1, 0, 0))).toEqual(Color_1.default.white);
        });
        describe("Transformations", () => {
            it("Stripes with an object transformation", () => {
                const sphere = new Sphere_1.default();
                sphere.transformation = Matrix_1.default.getScalingMatrix(2, 2, 2);
                const pattern = new StripePattern_1.default();
                const color = pattern.getColorAtShape(sphere, new Point_1.default(1.5, 0, 0));
                expect(color.compare(Color_1.default.white)).toBe(true);
            });
            it("Stripes with a pattern transformation", () => {
                const sphere = new Sphere_1.default();
                const pattern = new StripePattern_1.default();
                pattern.transformation = Matrix_1.default.getScalingMatrix(2, 2, 2);
                const color = pattern.getColorAtShape(sphere, new Point_1.default(1.5, 0, 0));
                expect(color.compare(Color_1.default.white)).toBe(true);
            });
            it("Stripes with both an object and a pattern transformation", () => {
                const sphere = new Sphere_1.default();
                sphere.transformation = Matrix_1.default.getScalingMatrix(2, 2, 2);
                const pattern = new StripePattern_1.default();
                pattern.transformation = Matrix_1.default.getTranslationMatrix(0.5, 0, 0);
                const color = pattern.getColorAtShape(sphere, new Point_1.default(2.5, 0, 0));
                expect(color.compare(Color_1.default.white)).toBe(true);
            });
        });
    });
    it("A gradient lineraly interpolates between colors", () => {
        const pattern = new GradientPattern_1.default();
        expect(pattern.getColorAtPoint(Point_1.default.origin).compare(Color_1.default.white)).toBe(true);
        expect(pattern.getColorAtPoint(new Point_1.default(0.25, 0, 0)).compare(new Color_1.default(0.75, 0.75, 0.75))).toBe(true);
        expect(pattern.getColorAtPoint(new Point_1.default(0.5, 0, 0)).compare(new Color_1.default(0.5, 0.5, 0.5))).toBe(true);
        expect(pattern.getColorAtPoint(new Point_1.default(0.75, 0, 0)).compare(new Color_1.default(0.25, 0.25, 0.25))).toBe(true);
    });
    describe("Ring", () => {
        it("A ring should extend in both x and z", () => {
            const pattern = new RingPattern_1.default();
            expect(pattern.getColorAtPoint(Point_1.default.origin).compare(Color_1.default.white)).toBe(true);
            expect(pattern.getColorAtPoint(new Point_1.default(1, 0, 0)).compare(Color_1.default.black)).toBe(true);
            expect(pattern.getColorAtPoint(new Point_1.default(0, 0, 1)).compare(Color_1.default.black)).toBe(true);
            expect(pattern.getColorAtPoint(new Point_1.default(0.708, 0, 0.708)).compare(Color_1.default.black)).toBe(true);
        });
    });
    describe("Checkers", () => {
        it("Checkers should repeat in x", () => {
            const pattern = new CheckerPattern3d_1.default();
            expect(pattern.getColorAtPoint(Point_1.default.origin).compare(Color_1.default.white)).toBe(true);
            expect(pattern.getColorAtPoint(new Point_1.default(0.99, 0, 0)).compare(Color_1.default.white)).toBe(true);
            expect(pattern.getColorAtPoint(new Point_1.default(1.01, 0, 0)).compare(Color_1.default.black)).toBe(true);
        });
        it("Checkers should repeat in y", () => {
            const pattern = new CheckerPattern3d_1.default();
            expect(pattern.getColorAtPoint(Point_1.default.origin).compare(Color_1.default.white)).toBe(true);
            expect(pattern.getColorAtPoint(new Point_1.default(0, 0.99, 0)).compare(Color_1.default.white)).toBe(true);
            expect(pattern.getColorAtPoint(new Point_1.default(0, 1.01, 0)).compare(Color_1.default.black)).toBe(true);
        });
        it("Checkers should repeat in z", () => {
            const pattern = new CheckerPattern3d_1.default();
            expect(pattern.getColorAtPoint(Point_1.default.origin).compare(Color_1.default.white)).toBe(true);
            expect(pattern.getColorAtPoint(new Point_1.default(0, 0, 0.99)).compare(Color_1.default.white)).toBe(true);
            expect(pattern.getColorAtPoint(new Point_1.default(0, 0, 1.01)).compare(Color_1.default.black)).toBe(true);
        });
    });
    describe("Transformations", () => {
        it("A pattern with an object transformation", () => {
            const sphere = new Sphere_1.default();
            sphere.transformation = Matrix_1.default.getScalingMatrix(2, 2, 2);
            const pattern = new TestPattern_1.default();
            const color = pattern.getColorAtShape(sphere, new Point_1.default(2, 3, 4));
            expect(color.compare(new Color_1.default(1, 1.5, 2))).toBe(true);
        });
        it("A pattern with a pattern transformation", () => {
            const sphere = new Sphere_1.default();
            const pattern = new TestPattern_1.default();
            pattern.transformation = Matrix_1.default.getScalingMatrix(2, 2, 2);
            const color = pattern.getColorAtShape(sphere, new Point_1.default(2, 3, 4));
            expect(color.compare(new Color_1.default(1, 1.5, 2))).toBe(true);
        });
        it("A pattern with both an object and a pattern transformation", () => {
            const sphere = new Sphere_1.default();
            sphere.transformation = Matrix_1.default.getScalingMatrix(2, 2, 2);
            const pattern = new TestPattern_1.default();
            pattern.transformation = Matrix_1.default.getTranslationMatrix(0.5, 1, 1.5);
            const color = pattern.getColorAtShape(sphere, new Point_1.default(2.5, 3, 3.5));
            expect(color.compare(new Color_1.default(0.75, 0.5, 0.25))).toBe(true);
        });
    });
});
//# sourceMappingURL=Pattern.test.js.map