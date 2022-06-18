import Constants from "./Constants";
import Intersection from "./Intersection";
import Intersections from "./Intersections";
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
  readonly overPoint: Point;
  readonly underPoint: Point;
  readonly reflect: Vector;
  readonly exitedMaterialRefractiveIndex: number;
  readonly enteredMaterialRefractiveIndex: number;

  private constructor(
    t: number,
    shape: Shape,
    point: Point,
    eye: Vector,
    normal: Vector,
    inside: boolean,
    overPoint: Point,
    underPoint: Point,
    reflect: Vector,
    exitedMaterialRefractiveIndex: number,
    enteredMaterialRefractiveIndex: number
  ) {
    this.t = t;
    this.shape = shape;
    this.point = point;
    this.eye = eye;
    this.normal = normal;
    this.inside = inside;
    this.overPoint = overPoint;
    this.underPoint = underPoint;
    this.reflect = reflect;
    this.exitedMaterialRefractiveIndex = exitedMaterialRefractiveIndex;
    this.enteredMaterialRefractiveIndex = enteredMaterialRefractiveIndex;
  }

  static prepare = (
    intersection: Intersection,
    ray: Ray,
    intersections: Intersections = new Intersections(intersection)
  ): Computation => {
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

    const normalTimesEpsilon = normal.multiply(Constants.epsilon);
    const overPoint = point.addVector(normalTimesEpsilon);
    const underPoint = point.subtractVector(normalTimesEpsilon);
    const reflect = ray.direction.reflect(normal);

    let exitedMaterialRefractiveIndex = 0;
    let enteredMaterialRefractiveIndex = 0;
    const containers: Shape[] = [];
    for (let i = 0, length = intersections.length; i < length; i++) {
      const x = intersections.get(i);
      if (x === intersection) {
        if (!containers.length) {
          exitedMaterialRefractiveIndex = 1;
        } else {
          exitedMaterialRefractiveIndex = containers[containers.length - 1].material.refractiveIndex;
        }
      }

      const index = containers.indexOf(x.shape);
      if (index >= 0) {
        containers.splice(index, 1);
      } else {
        containers.push(x.shape);
      }

      if (x === intersection) {
        if (!containers.length) {
          enteredMaterialRefractiveIndex = 1;
        } else {
          enteredMaterialRefractiveIndex = containers[containers.length - 1].material.refractiveIndex;
        }

        break;
      }
    }

    return new Computation(
      t,
      shape,
      point,
      eye,
      normal,
      inside,
      overPoint,
      underPoint,
      reflect,
      exitedMaterialRefractiveIndex,
      enteredMaterialRefractiveIndex
    );
  };

  getSchlickApproximation = (): number => {
    // Cosine of the angle between eye and normal vectors.
    let cosine = this.eye.dot(this.normal);

    if (this.exitedMaterialRefractiveIndex > this.enteredMaterialRefractiveIndex) {
      // Total internal reflection.
      const ratio = this.exitedMaterialRefractiveIndex / this.enteredMaterialRefractiveIndex;
      const sineSquaredTheta = ratio * ratio * (1.0 - cosine * cosine);
      if (sineSquaredTheta > 1) {
        return 1.0;
      }

      const cosineTheta = Math.sqrt(1.0 - sineSquaredTheta);
      cosine = cosineTheta;
    }

    const r0 = Math.pow(
      (this.exitedMaterialRefractiveIndex - this.enteredMaterialRefractiveIndex) /
        (this.exitedMaterialRefractiveIndex + this.enteredMaterialRefractiveIndex),
      2.0
    );

    return r0 + (1 - r0) * Math.pow(1 - cosine, 5.0);
  };
}
