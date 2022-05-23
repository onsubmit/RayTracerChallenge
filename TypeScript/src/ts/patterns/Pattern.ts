import Color from "ts/Color";
import Point from "ts/Point";
import Shape from "ts/shapes/Shape";
import Transformable from "ts/Transformable";

export default abstract class Pattern extends Transformable {
  abstract getColorAtPoint: (point: Point) => Color;

  getColorAtShape = (shape: Shape, worldPoint: Point): Color => {
    const objectPoint = shape.hasTransformation ? shape.transformation.inverse.multiplyByTuple(worldPoint) : worldPoint;
    const patternPoint = Point.fromNumberTuple(
      this.hasTransformation ? this.transformation.inverse.multiplyByTuple(objectPoint) : objectPoint
    );

    return this.getColorAtPoint(patternPoint);
  };
}
