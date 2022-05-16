import Intersections from "ts/Intersections";
import Material from "ts/Material";
import Matrix from "ts/Matrix";
import Point from "ts/Point";
import Ray from "ts/Ray";
import Lazy from "ts/utils/Lazy";
import Vector from "ts/Vector";

export default abstract class Shape {
  private _transformation: Lazy<Matrix>;

  material: Material;

  constructor(material: Material = new Material()) {
    this.material = material;

    this._transformation = new Lazy<Matrix>(() => Matrix.getIdentityMatrix(4));
  }

  get hasTransformation(): boolean {
    return !!this._transformation;
  }

  get transformation(): Matrix {
    return this._transformation.value!;
  }

  set transformation(matrix: Matrix) {
    this._transformation.value = matrix;
  }

  protected abstract getIntersectionsWithImpl(ray: Ray): Intersections;
  protected abstract getNormalAtImpl(point: Point): Vector;

  abstract compare(shape: Shape): boolean;

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
