import Camera from "ts/Camera";
import Canvas from "ts/Canvas";
import CanvasPainter from "ts/CanvasPainter";
import Color from "ts/Color";
import Constants from "ts/Constants";
import Matrix from "ts/Matrix";
import Point from "ts/Point";
import Ray from "ts/Ray";
import Sphere from "ts/shapes/Sphere";
import World from "ts/World";
import IChapter from "./IChapter";

class Chapter05 implements IChapter {
  getCamera = (_width: number, _height: number): Camera => {
    throw new Error("Chapter doesn't use a camera");
  };

  getWorld = (): World => {
    throw new Error("Chapter doesn't use a world");
  };

  run = (): void => {
    const canvasSize = 501;
    const wallZ = 10;
    const wallSize = 7;

    const canvas = new Canvas(canvasSize, canvasSize);

    const rayOrigin = new Point(0, 0, -5);
    const pixelSize = wallSize / canvasSize;
    const half = wallSize / 2;

    const sphere = new Sphere();
    sphere.transformation = Matrix.getRotationMatrixZ(Constants.pi_4).scale(1, 0.75, 1);

    for (let y = 0; y < canvasSize; y++) {
      const worldY = half - pixelSize * y;
      for (let x = 0; x < canvasSize; x++) {
        const worldX = -half + pixelSize * x;

        const p = new Point(worldX, worldY, wallZ);
        const ray = new Ray(rayOrigin, p.subtractPoint(rayOrigin).normalize());
        const intersections = sphere.getIntersectionsWith(ray);

        if (intersections.hasHit) {
          canvas.writePixel(x, y, Color.red);
        }
      }
    }

    const painter = new CanvasPainter("canvas5", canvasSize, canvasSize);
    painter.paint(canvas);
  };
}

export default new Chapter05();
