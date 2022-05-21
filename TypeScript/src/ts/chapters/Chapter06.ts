import Canvas from "ts/Canvas";
import CanvasPainter from "ts/CanvasPainter";
import Color from "ts/Color";
import Constants from "ts/Constants";
import Light from "ts/Light";
import Lighting from "ts/Lighting";
import Material from "ts/Material";
import Matrix from "ts/Matrix";
import Point from "ts/Point";
import Ray from "ts/Ray";
import Sphere from "ts/shapes/Sphere";
import IChapter from "./IChapter";

class Chapter06 implements IChapter {
  run = (): void => {
    const canvasSize = 501;
    const wallZ = 10;
    const wallSize = 7;

    const canvas = new Canvas(canvasSize, canvasSize);

    const rayOrigin = new Point(0, 0, -5);
    const pixelSize = wallSize / canvasSize;
    const half = wallSize / 2;

    const material = new Material(new Color(0.1, 0.5, 1), 0.05, 0.99, 0.99, 50);

    const sphere = new Sphere(material);
    sphere.transformation = Matrix.getRotationMatrixZ(Constants.pi_4).scale(1, 0.75, 1);

    const light = new Light(new Point(-10, 10, -10), Color.white);

    for (let y = 0; y < canvasSize; y++) {
      const worldY = half - pixelSize * y;
      for (let x = 0; x < canvasSize; x++) {
        const worldX = -half + pixelSize * x;

        const p = new Point(worldX, worldY, wallZ);
        const ray = new Ray(rayOrigin, p.subtractPoint(rayOrigin).normalize());
        const intersections = sphere.getIntersectionsWith(ray);

        if (intersections.hasHit) {
          const hit = intersections.hit;
          const point = ray.getPointOnRayAtDistance(hit.t);
          const normal = hit.shape.getNormalAt(point);
          const eye = ray.direction.negate();
          const color = Lighting.calculate(hit.shape.material, light, point, eye, normal, false);

          canvas.writePixel(x, y, color);
        }
      }
    }

    const painter = new CanvasPainter("canvas6", canvas);
    painter.paint();
  };
}

export default new Chapter06();
