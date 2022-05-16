import Intersection from "./Intersection";
import Point from "./Point";
import Ray from "./Ray";
import Shape from "./shapes/Shape";
import Vector from "./Vector";

export default class Computation {
  readonly t: number;
  readonly shape: Shape;
  readonly point: Point;
  readonly eye: Vector;
  readonly normal: Vector;
  readonly inside: boolean;

  private constructor(t: number, shape: Shape, point: Point, eye: Vector, normal: Vector, inside: boolean) {
    this.t = t;
    this.shape = shape;
    this.point = point;
    this.eye = eye;
    this.normal = normal;
    this.inside = inside;
  }

  static prepare = (intersection: Intersection, ray: Ray): Computation => {
    const t = intersection.t;
    const shape = intersection.shape;

    const point = ray.getPointOnRayAtDistance(t);
    const eye = ray.direction.negate();
    let normal = shape.getNormalAt(point);

    let inside = false;
    if (normal.dot(eye) < 0) {
      inside = true;
      normal = normal.negate();
    }

    return new Computation(t, shape, point, eye, normal, inside);
  };
}
