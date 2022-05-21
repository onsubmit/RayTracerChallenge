import Point from "ts/Point";
import Vector from "ts/Vector";
import IChapter from "./IChapter";
import Environment from "./shared/Environment";
import Projectile from "./shared/Projectile";

class Chapter01 implements IChapter {
  run = (): void => {
    // projectile starts one unit above the origin.
    // velocity is normalized to 1 unit/tick.
    let projectile = new Projectile(new Point(0, 1, 0), new Vector(1, 1, 0).normalize());

    // gravity -0.1 unit/tick, and win is -0.01 unit/tick.
    const environment = new Environment(new Vector(0, -0.1, 0), new Vector(-0.01, 0, 0));

    const pre = document.getElementById("pre1");
    if (!pre) {
      throw new Error("Can't find <pre> tag for chapter 1");
    }

    pre.innerHTML += `Projectile position: ${projectile.position.toString()}\n`;
    while (projectile.position.y > 0) {
      projectile = this.tick(environment, projectile);
      pre.innerHTML += `Projectile position: ${projectile.position.toString()}\n`;
    }
  };

  private tick = (environment: Environment, projectile: Projectile): Projectile => {
    const position = projectile.position.addVector(projectile.velocity);
    const velocity = projectile.velocity.addVector(environment.gravity).addVector(environment.wind);

    return new Projectile(position, velocity);
  };
}

export default new Chapter01();
