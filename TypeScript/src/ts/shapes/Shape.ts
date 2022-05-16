import Intersections from "ts/Intersections";
import Matrix from "ts/Matrix";
import Point from "ts/Point";
import Ray from "ts/Ray";
import Vector from "ts/Vector";

export default abstract class Shape {
  private cachedTransformation?: Matrix;

  get hasTransformation(): boolean {
    return !!this.cachedTransformation;
  }

  get transformation(): Matrix {
    return this.cachedTransformation || (this.cachedTransformation = Matrix.getIdentityMatrix(4));
  }

  set transformation(matrix: Matrix) {
    this.cachedTransformation = matrix;
  }

  protected abstract getIntersectionsWithImpl(ray: Ray): Intersections;
  protected abstract getNormalAtImpl(point: Point): Vector;

  getIntersectionsWith = (ray: Ray): Intersections => {
    if (this.hasTransformation) {
      ray = ray.transform(this.transformation.inverse);
    }

    return this.getIntersectionsWithImpl(ray);
  };

  getNormalAt = (point: Point): Vector => {
    const objectPoint = Point.fromNumberTuple(this.transformation.inverse.multiplyByTuple(point));
    const objectNormal = objectPoint.subtractPoint(Point.origin);
    const worldNormal = Vector.fromNumberTuple(
      this.transformation.inverse.transpose().multiplyByTuple(objectNormal),
      true /* force */
    );
    return worldNormal.normalize();
  };
}
