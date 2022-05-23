import Intersections from "ts/Intersections";
import Material from "ts/Material";
import Point from "ts/Point";
import Ray from "ts/Ray";
import Transformable from "ts/Transformable";
import Vector from "ts/Vector";

export default abstract class Shape extends Transformable {
  abstract type: string;

  material: Material;

  constructor(material: Material = new Material()) {
    super();
    this.material = material;
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
