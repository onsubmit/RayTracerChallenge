import Color from "./Color";
import Computation from "./Computation";
import Intersections from "./Intersections";
import Light from "./Light";
import Lighting from "./Lighting";
import Material from "./Material";
import Matrix from "./Matrix";
import Point from "./Point";
import Ray from "./Ray";
import Shape from "./shapes/Shape";
import Sphere from "./shapes/Sphere";

const MaxReflections = 4;

export default class World {
  private _disableShadows = false;

  light: Light;
  shapes: Shape[];

  constructor(light: Light, ...shapes: Shape[]) {
    this.light = light;
    this.shapes = shapes;
  }

  static getDefaultWorld = (): World => {
    const light = new Light(new Point(-10, 10, -10), Color.white);

    const m1 = new Material();
    m1.color = new Color(0.8, 1.0, 0.6);
    m1.diffuse = 0.7;
    m1.specular = 0.2;

    const s1 = new Sphere(m1);
    const s2 = new Sphere();
    s2.transformation = Matrix.getScalingMatrix(0.5, 0.5, 0.5);

    return new World(light, s1, s2);
  };

  addShape = (shape: Shape): void => {
    this.shapes.push(shape);
  };

  getColorAt = (ray: Ray, remaining = MaxReflections): Color => {
    const intersections = this.getIntersectionsWith(ray);
    if (!intersections.hasHit) {
      return Color.black;
    }

    const hit = intersections.hit;
    const computation = Computation.prepare(hit, ray);
    const color = this.shadeHit(computation, remaining);
    return color;
  };

  getIntersectionsWith = (ray: Ray): Intersections => {
    const intersections = this.shapes.flatMap((o) => o.getIntersectionsWith(ray).intersections);
    return new Intersections(...intersections).sortedIntersections;
  };

  disableShadows = (): void => {
    this._disableShadows = true;
  };

  isShadowed = (point: Point): boolean => {
    if (this._disableShadows) {
      return false;
    }

    const v = this.light.position.subtractPoint(point);
    const distance = v.magnitude;
    const direction = v.normalize();

    const ray = new Ray(point, direction);
    const intersections = this.getIntersectionsWith(ray);

    if (intersections.hasHit && intersections.hit.t < distance) {
      return true;
    }

    return false;
  };

  shadeHit = (computation: Computation, remaining = MaxReflections): Color => {
    const shadowed = this.isShadowed(computation.overPoint);

    const surface = Lighting.calculate(
      computation.shape.material,
      computation.shape,
      this.light,
      computation.overPoint,
      computation.eye,
      computation.normal,
      shadowed
    );

    const reflected = this.getReflectedColor(computation, remaining);
    return surface.addColor(reflected);
  };

  getReflectedColor = (computation: Computation, remaining = MaxReflections): Color => {
    if (remaining <= 0) {
      return Color.black;
    }

    if (computation.shape.material.reflective.compare(0)) {
      return Color.black;
    }

    const reflectRay = new Ray(computation.overPoint, computation.reflect);
    const color = this.getColorAt(reflectRay, remaining - 1);

    return color.multiply(computation.shape.material.reflective);
  };
}
