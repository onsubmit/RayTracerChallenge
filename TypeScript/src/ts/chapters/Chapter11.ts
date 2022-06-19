import Camera from "ts/Camera";
import CanvasPainter from "ts/CanvasPainter";
import Color from "ts/Color";
import Constants from "ts/Constants";
import Light from "ts/Light";
import Matrix from "ts/Matrix";
import CheckerPattern3d from "ts/patterns/CheckerPattern3d";
import GradientPattern from "ts/patterns/GradientPattern";
import StripePattern from "ts/patterns/StripePattern";
import Point from "ts/Point";
import Plane from "ts/shapes/Plane";
import Sphere from "ts/shapes/Sphere";
import Vector from "ts/Vector";
import World from "ts/World";
import IChapter from "./IChapter";

class Chapter11 implements IChapter {
  getCamera = (width = 500, height = 500): Camera => {
    const from = new Point(0, 1.5, -5);
    const to = new Point(0, 1, 0);
    const camera = new Camera(
      width,
      height,
      Constants.pi_3,
      Matrix.getViewTransformationMatrix(from, to, new Vector(0, 1, 0))
    );

    return camera;
  };

  getWorld = (): World => {
    const light = new Light(new Point(-10, 10, -10), new Color(0.9, 0.95, 1));
    const world = new World(light);

    const floor = new Plane();
    floor.transformation = Matrix.getTranslationMatrix(0, -0.5, 0);
    floor.material.pattern = new CheckerPattern3d(new Color(0, 0.2, 0.4), Color.black);
    floor.material.specular = 0;
    world.addShape(floor);

    // The large sphere in the middle is a unit sphere,
    // translated upward slightly and colored green.
    const middle = new Sphere();
    middle.transformation = Matrix.getTranslationMatrix(-0.5, 1, 0.5);
    middle.material.pattern = new StripePattern(new Color(0.1, 1, 0.5), new Color(0.1, 0.4, 0.2));
    middle.material.pattern.transformation = Matrix.getRotationMatrixZ(Constants.pi_4).scale(0.2, 1, 1);
    middle.material.diffuse = 0.7;
    middle.material.specular = 0.3;
    middle.material.reflective = 0.99;
    world.addShape(middle);

    // The smaller green sphere on the right is scaled in half.
    const right = new Sphere();
    right.transformation = Matrix.getTranslationMatrix(1.5, 0.5, -0.5).scale(0.5, 0.5, 0.5);
    right.material.pattern = new GradientPattern(new Color(0.1, 0.5, 1), new Color(0.1, 1, 0.5));
    right.material.pattern.transformation = Matrix.getRotationMatrixZ(-Constants.pi_2)
      .translate(-1, 0, 0)
      .scale(2, 1, 1);
    right.material.diffuse = 0.7;
    right.material.specular = 1;
    right.material.shininess = 400;
    right.material.transparency = 0.25;
    right.material.reflective = 0.99;
    world.addShape(right);

    // The smallest sphere is scaled by a third, before being translated.
    const left = new Sphere();
    left.transformation = Matrix.getTranslationMatrix(-1.5, 0.33, -0.75).scale(0.33, 0.33, 0.33);
    left.material.pattern = new CheckerPattern3d(new Color(1, 0.1, 0.1), new Color(0.5, 0.1, 0.1));
    left.material.diffuse = 0.7;
    left.material.specular = 1;
    left.material.transparency = 0.25;
    left.material.reflective = 0.99;
    world.addShape(left);

    return world;
  };

  run = (): void => {
    const camera = this.getCamera();
    const world = this.getWorld();

    const canvas = camera.render(world);
    const painter = new CanvasPainter("canvas11");
    painter.paint(canvas);
  };
}

export default new Chapter11();
