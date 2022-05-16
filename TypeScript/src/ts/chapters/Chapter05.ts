import Canvas from "ts/Canvas";
import CanvasPainter from "ts/CanvasPainter";
import Color from "ts/Color";
import Constants from "ts/Constants";
import Matrix from "ts/Matrix";
import Point from "ts/Point";
import Ray from "ts/Ray";
import Sphere from "ts/shapes/Sphere";
import Vector from "ts/Vector";
import IChapter from "./IChapter";

class Chapter05 implements IChapter {
  run = () => {
    const canvasSize = 501;
    const wallZ = 10;
    const wallSize = 7;

    const canvas = new Canvas(canvasSize, canvasSize);

    const rayOrigin = new Point(0, 0, -5);
    const pixelSize = wallSize / canvasSize;
    const half = wallSize / 2;

    const sphere = new Sphere();
    sphere.transformation = Matrix.getScalingMatrix(1, 0.75, 1).rotateZ(Constants.pi_4);

    for (let y = 0; y < canvasSize; y++) {
      const worldY = half - pixelSize * y;
      for (let x = 0; x < canvasSize; x++) {
        const worldX = -half + pixelSize * x;

        const p = new Point(worldX, worldY, wallZ);
        const ray = new Ray(rayOrigin, Vector.fromNumberTuple(p.subtract(rayOrigin)).normalize());
        const intersections = sphere.getIntersectionsWith(ray);

        if (intersections.hasHit) {
          canvas.writePixel(x, y, Color.red);
        }
      }
    }

    const painter = new CanvasPainter("canvas5", canvas);
    painter.paint();
  };
}

export default new Chapter05();
