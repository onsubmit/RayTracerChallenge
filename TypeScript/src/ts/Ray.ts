import Matrix from "./Matrix";
import Point from "./Point";
import Vector from "./Vector";

export default class Ray {
  readonly origin: Point;
  readonly direction: Vector;

  constructor(origin: Point, direction: Vector) {
    this.origin = origin;
    this.direction = direction;
  }

  getPointOnRayAtDistance = (t: number): Point => this.origin.addVector(this.direction.multiply(t));

  translate = (...coordinates: number[]): Ray => this.transform(Matrix.getTranslationMatrix(...coordinates));
  scale = (...coordinates: number[]): Ray => this.transform(Matrix.getScalingMatrix(...coordinates));

  transform = (transformation: Matrix): Ray =>
    new Ray(
      Point.fromNumberTuple(transformation.multiplyByTuple(this.origin)),
      Vector.fromNumberTuple(transformation.multiplyByTuple(this.direction))
    );
}
