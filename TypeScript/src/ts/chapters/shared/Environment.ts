import Vector from "ts/Vector";

export default class Environment {
  gravity: Vector;
  wind: Vector;

  constructor(gravity: Vector, wind: Vector) {
    this.gravity = gravity;
    this.wind = wind;
  }
}
