import Intersection from "ts/Intersection";
import Intersections from "ts/Intersections";
import Material from "ts/Material";
import Point from "ts/Point";
import Ray from "ts/Ray";
import Vector from "ts/Vector";
import Shape from "./Shape";

export default class Sphere extends Shape {
  readonly origin: Point;
  readonly radius: number;

  constructor(material: Material = new Material()) {
    super(material);

    this.origin = new Point(0, 0, 0);
    this.radius = 1;
  }

  protected getNormalAtImpl = (point: Point): Vector => point.subtractPoint(this.origin);

  protected getIntersectionsWithImpl(ray: Ray): Intersections {
    const sphereToRay = ray.origin.subtractPoint(Point.origin);

    const a = ray.direction.dot(ray.direction);
    const b = 2 * ray.direction.dot(sphereToRay);
    const c = sphereToRay.dot(sphereToRay) - 1;
    const discriminant = b * b - 4 * a * c;

    if (discriminant >= 0) {
      const sqrtDiscriminant = Math.sqrt(discriminant);
      const twoA = 2 * a;

      return new Intersections(
        new Intersection((-b - sqrtDiscriminant) / twoA, this),
        new Intersection((-b + sqrtDiscriminant) / twoA, this)
      );
    }

    return new Intersections();
  }
}
