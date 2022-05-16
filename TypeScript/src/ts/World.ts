import Color from "./Color";
import Intersections from "./Intersections";
import Light from "./Light";
import Material from "./Material";
import Matrix from "./Matrix";
import Point from "./Point";
import Ray from "./Ray";
import Shape from "./shapes/Shape";
import Sphere from "./shapes/Sphere";
import Lazy from "./utils/Lazy";

export default class World {
  light: Light;
  shapes: Shape[];

  private static lazyDefaultWorld: Lazy<World> = new Lazy<World>(() => World.getDefaultWorld());

  static get defaultWorld(): World {
    return World.lazyDefaultWorld.value!;
  }

  constructor(light: Light, ...shapes: Shape[]) {
    this.light = light;
    this.shapes = shapes;
  }

  getIntersectionsWith = (ray: Ray): Intersections => {
    const intersections = this.shapes.flatMap((o) => o.getIntersectionsWith(ray).intersections);
    return new Intersections(...intersections).sortedIntersections;
  };

  private static getDefaultWorld = () => {
    const light = new Light(new Point(-10, 10, 10), Color.white);

    const m1 = new Material();
    m1.color = new Color(0.8, 1.0, 0.6);
    m1.diffuse = 0.7;
    m1.specular = 0.2;

    const s1 = new Sphere(m1);
    const s2 = new Sphere();
    s2.transformation = Matrix.getScalingMatrix(0.5, 0.5, 0.5);

    return new World(light, s1, s2);
  };
}
