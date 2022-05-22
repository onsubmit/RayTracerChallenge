"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Canvas_1 = __importDefault(require("./Canvas"));
const Matrix_1 = __importDefault(require("./Matrix"));
const Point_1 = __importDefault(require("./Point"));
const Ray_1 = __importDefault(require("./Ray"));
class Camera {
    constructor(horizontalSize, verticalSize, fieldOfView, transform = Matrix_1.default.getIdentityMatrix(4)) {
        this.getRayForPixel = (x, y) => {
            // The offset from the edge of the canvas to the pixel's center.
            const dx = (x + 0.5) * this.pixelSize;
            const dy = (y + 0.5) * this.pixelSize;
            // The untransformed coordinates of the piel in world space.
            // The camera looks toward -z, so +x is to the left.
            const worldX = this.halfWidth - dx;
            const worldY = this.halfHeight - dy;
            // Using the camera matrix, transform the canvas point and the origin,
            // and then compute the ray's direction vector.
            // The canvas is at z = -1.
            const pixel = Point_1.default.fromNumberTuple(this.transform.inverse.multiplyByTuple(new Point_1.default(worldX, worldY, -1)));
            const origin = Point_1.default.fromNumberTuple(this.transform.inverse.multiplyByTuple(Point_1.default.origin));
            const direction = pixel.subtractPoint(origin).normalize();
            return new Ray_1.default(origin, direction);
        };
        this.render = (world, resolution = 1) => {
            const canvas = new Canvas_1.default(this.horizontalSize, this.verticalSize);
            for (let y = 0; y < this.verticalSize; y += resolution) {
                for (let x = 0; x < this.horizontalSize; x += resolution) {
                    const color = this.getColorAt(world, x, y);
                    canvas.writePixel(x, y, color);
                }
            }
            return canvas;
        };
        this.getColorAt = (world, x, y) => {
            const ray = this.getRayForPixel(x, y);
            return world.getColorAt(ray);
        };
        this.horizontalSize = horizontalSize;
        this.verticalSize = verticalSize;
        this.fieldOfView = fieldOfView;
        this.transform = transform;
    }
    get halfView() {
        if (this._halfView === undefined) {
            this._halfView = Math.tan(this.fieldOfView / 2);
        }
        return this._halfView;
    }
    get aspect() {
        if (this._aspect === undefined) {
            this._aspect = this.horizontalSize / this.verticalSize;
        }
        return this._aspect;
    }
    get halfWidth() {
        if (this._halfWidth === undefined) {
            this._halfWidth = this.aspect >= 1 ? this.halfView : this.halfView * this.aspect;
        }
        return this._halfWidth;
    }
    get halfHeight() {
        if (this._halfHeight === undefined) {
            this._halfHeight = this.aspect >= 1 ? this.halfView / this.aspect : this.halfView;
        }
        return this._halfHeight;
    }
    get pixelSize() {
        if (this._pixelSize === undefined) {
            this._pixelSize = (this.halfWidth * 2) / this.horizontalSize;
        }
        return this._pixelSize;
    }
}
exports.default = Camera;
//# sourceMappingURL=Camera.js.map