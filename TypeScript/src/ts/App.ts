import Point from "./Point";
import Vector from "./Vector";

class App {
  run = () => {
    // projectile starts one unit above the origin.
    // velocity is normalized to 1 unit/tick.
    let projectile = new Projectile(new Point(0, 1, 0), new Vector(1, 1, 0).normalize());

    // gravity -0.1 unit/tick, and win is -0.01 unit/tick.
    const environment = new Environment(new Vector(0, -0.1, 0), new Vector(-0.01, 0, 0));

    console.log(`Projectile position: ${projectile.position.toString()}`);
    while (projectile.position.y > 0) {
      projectile = this.tick(environment, projectile);
      console.log(`Projectile position: ${projectile.position.toString()}`);
    }
  };

  private tick = (environment: Environment, projectile: Projectile): Projectile => {
    const position = projectile.position.addVector(projectile.velocity);
    const velocity = projectile.velocity.addVector(environment.gravity).addVector(environment.wind);

    return new Projectile(position, velocity);
  };
}

class Projectile {
  position: Point;
  velocity: Vector;

  constructor(position: Point, velocity: Vector) {
    this.position = position;
    this.velocity = velocity;
  }
}

class Environment {
  gravity: Vector;
  wind: Vector;

  constructor(gravity: Vector, wind: Vector) {
    this.gravity = gravity;
    this.wind = wind;
  }
}

export default new App();
