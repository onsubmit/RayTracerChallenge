import Shape from "./shapes/Shape";

export default class Intersection {
  readonly t: number;
  readonly shape: Shape;

  constructor(t: number, shape: Shape) {
    this.t = t;
    this.shape = shape;
  }
}
