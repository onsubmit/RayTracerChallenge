import Point from "ts/Point";
import Vector from "ts/Vector";

export default class Projectile {
  position: Point;
  velocity: Vector;

  constructor(position: Point, velocity: Vector) {
    this.position = position;
    this.velocity = velocity;
  }
}
