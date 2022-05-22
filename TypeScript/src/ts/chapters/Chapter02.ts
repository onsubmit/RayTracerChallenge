import Camera from "ts/Camera";
import Canvas from "ts/Canvas";
import CanvasPainter from "ts/CanvasPainter";
import Color from "ts/Color";
import Point from "ts/Point";
import Vector from "ts/Vector";
import World from "ts/World";
import IChapter from "./IChapter";
import Environment from "./shared/Environment";
import Projectile from "./shared/Projectile";

class Chapter02 implements IChapter {
  getCamera = (_width: number, _height: number): Camera => {
    throw new Error("Chapter doesn't use a camera");
  };

  getWorld = (): World => {
    throw new Error("Chapter doesn't use a world");
  };

  run = (): void => {
    const start = new Point(0, 1, 0);
    const velocity = new Vector(1, 1.8, 0).normalize().multiply(11.25);
    let projectile = new Projectile(start, velocity);

    const gravity = new Vector(0, -0.1, 0);
    const wind = new Vector(-0.01, 0, 0);
    const environment = new Environment(gravity, wind);

    const canvas = new Canvas(901, 551);

    while (projectile.position.y > 0) {
      canvas.writePixel(projectile.position.x, canvas.height - projectile.position.y, Color.white);
      projectile = this.tick(environment, projectile);
    }

    const painter = new CanvasPainter("canvas2", canvas.width, canvas.height);
    painter.paint(canvas);
  };

  private tick = (environment: Environment, projectile: Projectile): Projectile => {
    const position = projectile.position.addVector(projectile.velocity);
    const velocity = projectile.velocity.addVector(environment.gravity).addVector(environment.wind);

    return new Projectile(position, velocity);
  };
}

export default new Chapter02();
