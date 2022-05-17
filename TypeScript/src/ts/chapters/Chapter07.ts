import Camera from "ts/Camera";
import CanvasPainter from "ts/CanvasPainter";
import Color from "ts/Color";
import Constants from "ts/Constants";
import Light from "ts/Light";
import Matrix from "ts/Matrix";
import Point from "ts/Point";
import Sphere from "ts/shapes/Sphere";
import Vector from "ts/Vector";
import World from "ts/World";
import IChapter from "./IChapter";

class Chapter07 implements IChapter {
  run = (): void => {
    const light = new Light(new Point(-10, 10, -10), Color.white);
    const world = new World(light);
    const camera = new Camera(
      500,
      500,
      Constants.pi_3,
      Matrix.getViewTransformationMatrix(new Point(0, 1.5, -5), new Point(0, 1, 0), new Vector(0, 1, 0))
    );

    // The floor is an extremely flattened sphere with a matte texture.
    const floor = new Sphere();
    floor.transformation = Matrix.getScalingMatrix(10, 0.01, 10);
    floor.material.color = new Color(1, 0.9, 0.9);
    floor.material.specular = 0;
    world.addShape(floor);

    // The wall on the left has the same scale and color as the floor,
    // but is also rotated and translated into place.
    const leftWall = new Sphere();
    leftWall.material = floor.material;

    leftWall.transformation = Matrix.getTranslationMatrix(0, 0, 5)
      .rotateY(-Constants.pi_4)
      .rotateX(Constants.pi_2)
      .scale(10, 0.01, 10);
    world.addShape(leftWall);

    // The wall on the right is identical to the left wall,
    // but is rotated the opposite direction in y.
    const rightWall = new Sphere();
    rightWall.material = floor.material;
    rightWall.transformation = Matrix.getTranslationMatrix(0, 0, 5)
      .rotateY(Constants.pi_4)
      .rotateX(Constants.pi_2)
      .scale(10, 0.01, 10);
    world.addShape(rightWall);

    // The large sphere in the middle is a unit sphere,
    // translated upward slightly and colored green.
    const middle = new Sphere();
    middle.transformation = Matrix.getTranslationMatrix(-0.5, 1, 0.5);
    middle.material.color = new Color(0.1, 1, 0.5);
    middle.material.diffuse = 0.7;
    middle.material.specular = 0.3;
    world.addShape(middle);

    // The smaller green sphere on the right is scaled in half.
    const right = new Sphere();
    right.transformation = Matrix.getTranslationMatrix(1.5, 0.5, -0.5).scale(0.5, 0.5, 0.5);
    right.material.color = new Color(0.1, 0.5, 1);
    right.material.diffuse = 0.7;
    right.material.specular = 0.3;
    world.addShape(right);

    // The smallest sphere is scaled by a third, before being translated.
    const left = new Sphere();
    left.transformation = Matrix.getTranslationMatrix(-1.5, 0.33, -0.75).scale(0.33, 0.33, 0.33);
    left.material.color = new Color(1, 0.1, 0.1);
    left.material.diffuse = 0.7;
    left.material.specular = 0.3;
    world.addShape(left);

    const canvas = camera.render(world);

    const painter = new CanvasPainter("canvas7", canvas);
    painter.paint();
  };
}

export default new Chapter07();
