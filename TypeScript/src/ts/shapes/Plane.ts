import Constants from "ts/Constants";
import Intersection from "ts/Intersection";
import Intersections from "ts/Intersections";
import Material from "ts/Material";
import Point from "ts/Point";
import Ray from "ts/Ray";
import Vector from "ts/Vector";
import Shape from "./Shape";

export default class Plane extends Shape {
  override type = "Plane";

  private _constantNormal: Vector = new Vector(0, 1, 0);

  readonly origin: Point;
  readonly radius: number;

  constructor(material: Material = new Material()) {
    super(material);

    this.origin = new Point(0, 0, 0);
    this.radius = 1;
  }

  override compare = (shape: Shape): boolean => {
    if (!(shape instanceof Plane)) {
      return false;
    }

    return true;
  };

  override getNormalAtImpl = (_point: Point): Vector => this._constantNormal;

  override getIntersectionsWithImpl = (ray: Ray): Intersections => {
    if (Math.abs(ray.direction.y) < Constants.epsilon) {
      return new Intersections();
    }

    const t = -ray.origin.y / ray.direction.y;
    return new Intersections(new Intersection(t, this));
  };
}
