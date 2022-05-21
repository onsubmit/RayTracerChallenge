import Intersections from "ts/Intersections";
import Material from "ts/Material";
import Matrix from "ts/Matrix";
import Point from "ts/Point";
import Ray from "ts/Ray";
import Lazy from "ts/utils/Lazy";
import Vector from "ts/Vector";

export default abstract class Shape {
  private _transformation: Lazy<Matrix>;

  abstract type: string;

  material: Material;

  constructor(material: Material = new Material()) {
    this.material = material;

    this._transformation = new Lazy<Matrix>(() => {
      return {
        success: true,
        value: Matrix.getIdentityMatrix(4),
      };
    });
  }

  get hasTransformation(): boolean {
    return !!this._transformation;
  }

  get transformation(): Matrix {
    if (this._transformation.value === null) {
      throw new Error("Transformation could not be determined");
    }

    return this._transformation.value;
  }

  set transformation(matrix: Matrix) {
    this._transformation.value = matrix;
  }

  abstract getIntersectionsWithImpl(ray: Ray): Intersections;
  abstract getNormalAtImpl(point: Point): Vector;
  abstract compare(shape: Shape): boolean;

  getIntersectionsWith = (ray: Ray): Intersections => {
    if (this.hasTransformation) {
      const transformedRay = ray.transform(this.transformation.inverse);
      return this.getIntersectionsWithImpl(transformedRay);
    }

    return this.getIntersectionsWithImpl(ray);
  };

  getNormalAt = (point: Point): Vector => {
    const objectPoint = Point.fromNumberTuple(this.transformation.inverse.multiplyByTuple(point));
    const objectNormal = this.getNormalAtImpl(objectPoint);
    const worldNormal = Vector.fromNumberTuple(
      this.transformation.inverse.transpose().multiplyByTuple(objectNormal),
      true /* force */
    );

    return worldNormal.normalize();
  };
}
