import Intersections from "ts/Intersections";
import Matrix from "ts/Matrix";
import Ray from "ts/Ray";

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

  getIntersectionsWith = (ray: Ray): Intersections => {
    if (this.hasTransformation) {
      ray = ray.transform(this.transformation.inverse);
    }

    return this.getIntersectionsWithImpl(ray);
  };
}
