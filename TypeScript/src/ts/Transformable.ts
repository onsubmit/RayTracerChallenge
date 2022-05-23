import Matrix from "./Matrix";
import Lazy from "./utils/Lazy";

export default abstract class Transformable {
  private _transformation: Lazy<Matrix>;

  constructor() {
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
}
