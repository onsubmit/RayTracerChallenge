import Intersections from "ts/Intersections";
import Material from "ts/Material";
import Point from "ts/Point";
import Ray from "ts/Ray";
import Vector from "ts/Vector";
import Shape from "./Shape";

export default class TestShape extends Shape {
  type = "TestShape";

  savedRay?: Ray;

  constructor(material: Material = new Material()) {
    super(material);
  }

  compare = (_shape: Shape): boolean => {
    throw new Error("Method not implemented.");
  };

  protected getIntersectionsWithImpl = (ray: Ray): Intersections => {
    this.savedRay = ray;
    return new Intersections();
  };

  protected getNormalAtImpl = (point: Point): Vector => point.subtractPoint(Point.origin);
}
