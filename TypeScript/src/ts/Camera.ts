import Canvas from "./Canvas";
import Matrix from "./Matrix";
import Point from "./Point";
import Ray from "./Ray";
import World from "./World";

export default class Camera {
  private _halfView?: number;
  private _aspect?: number;
  private _halfWidth?: number;
  private _halfHeight?: number;
  private _pixelSize?: number;

  readonly horizontalSize: number;
  readonly verticalSize: number;
  readonly fieldOfView: number;
  readonly transform: Matrix;

  constructor(
    horizontalSize: number,
    verticalSize: number,
    fieldOfView: number,
    transform: Matrix = Matrix.getIdentityMatrix(4)
  ) {
    this.horizontalSize = horizontalSize;
    this.verticalSize = verticalSize;
    this.fieldOfView = fieldOfView;
    this.transform = transform;
  }

  get halfView(): number {
    if (this._halfView === undefined) {
      this._halfView = Math.tan(this.fieldOfView / 2);
    }

    return this._halfView;
  }

  get aspect(): number {
    if (this._aspect === undefined) {
      this._aspect = this.horizontalSize / this.verticalSize;
    }

    return this._aspect;
  }

  get halfWidth(): number {
    if (this._halfWidth === undefined) {
      this._halfWidth = this.aspect >= 1 ? this.halfView : this.halfView * this.aspect;
    }

    return this._halfWidth;
  }

  get halfHeight(): number {
    if (this._halfHeight === undefined) {
      this._halfHeight = this.aspect >= 1 ? this.halfView / this.aspect : this.halfView;
    }

    return this._halfHeight;
  }

  get pixelSize(): number {
    if (this._pixelSize === undefined) {
      this._pixelSize = (this.halfWidth * 2) / this.horizontalSize;
    }

    return this._pixelSize;
  }

  getRayForPixel = (x: number, y: number): Ray => {
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
    const pixel = Point.fromNumberTuple(this.transform.inverse.multiplyByTuple(new Point(worldX, worldY, -1)));
    const origin = Point.fromNumberTuple(this.transform.inverse.multiplyByTuple(Point.origin));
    const direction = pixel.subtractPoint(origin).normalize();

    return new Ray(origin, direction);
  };

  render = (world: World, resolution = 1): Canvas => {
    const canvas = new Canvas(this.horizontalSize, this.verticalSize);

    for (let y = 0; y < this.verticalSize; y += resolution) {
      for (let x = 0; x < this.horizontalSize; x += resolution) {
        const ray = this.getRayForPixel(x, y);
        const color = world.getColorAt(ray);
        canvas.writePixel(x, y, color);
      }
    }

    return canvas;
  };
}
