"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Camera_1 = __importDefault(require("ts/Camera"));
const Color_1 = __importDefault(require("ts/Color"));
const Constants_1 = __importDefault(require("ts/Constants"));
const Matrix_1 = __importDefault(require("ts/Matrix"));
const Point_1 = __importDefault(require("ts/Point"));
const Vector_1 = __importDefault(require("ts/Vector"));
const World_1 = __importDefault(require("ts/World"));
describe("Camera", () => {
    it("Constructing a camera", () => {
        const horizontalSize = 160;
        const verticalSize = 120;
        const fieldOfView = Constants_1.default.pi_2;
        const camera = new Camera_1.default(horizontalSize, verticalSize, fieldOfView);
        expect(camera.horizontalSize).toBe(horizontalSize);
        expect(camera.verticalSize).toBe(verticalSize);
        expect(camera.fieldOfView).toBe(fieldOfView);
        expect(camera.transform.compare(Matrix_1.default.getIdentityMatrix(4))).toBe(true);
    });
    it("The pixel size for a horizontal canvas", () => {
        const camera = new Camera_1.default(200, 125, Constants_1.default.pi_2);
        expect(camera.pixelSize.compare(0.01)).toBe(true);
    });
    it("The pixel size for a vertical canvas", () => {
        const camera = new Camera_1.default(125, 200, Constants_1.default.pi_2);
        expect(camera.pixelSize.compare(0.01)).toBe(true);
    });
    it("Constructing a ray through the center of the canvas", () => {
        const camera = new Camera_1.default(201, 101, Constants_1.default.pi_2);
        const ray = camera.getRayForPixel(100, 50);
        expect(ray.origin.compare(Point_1.default.origin)).toBe(true);
        expect(ray.direction.compare(new Vector_1.default(0, 0, -1))).toBe(true);
    });
    it("Constructing a ray through a corner of the canvas", () => {
        const camera = new Camera_1.default(201, 101, Constants_1.default.pi_2);
        const ray = camera.getRayForPixel(0, 0);
        expect(ray.origin.compare(Point_1.default.origin)).toBe(true);
        expect(ray.direction.compare(new Vector_1.default(0.66519, 0.33259, -0.66851))).toBe(true);
    });
    it("Constructing a ray through the center of the canvas", () => {
        const camera = new Camera_1.default(201, 101, Constants_1.default.pi_2);
        const ray = camera.getRayForPixel(100, 50);
        expect(ray.origin.compare(Point_1.default.origin)).toBe(true);
        expect(ray.direction.compare(new Vector_1.default(0, 0, -1))).toBe(true);
    });
    it("Rendering a world with a camera", () => {
        const from = new Point_1.default(0, 0, -5);
        const to = Point_1.default.origin;
        const up = new Vector_1.default(0, 1, 0);
        const transform = Matrix_1.default.getViewTransformationMatrix(from, to, up);
        const camera = new Camera_1.default(11, 11, Constants_1.default.pi_2, transform);
        const world = World_1.default.getDefaultWorld();
        const canvas = camera.render(world);
        expect(canvas.get(5, 5).compare(new Color_1.default(0.38066, 0.47583, 0.2855))).toBe(true);
    });
});
//# sourceMappingURL=Camera.test.js.map