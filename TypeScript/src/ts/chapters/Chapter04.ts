import Camera from "ts/Camera";
import Canvas from "ts/Canvas";
import CanvasPainter from "ts/CanvasPainter";
import Color from "ts/Color";
import Constants from "ts/Constants";
import Matrix from "ts/Matrix";
import Point from "ts/Point";
import World from "ts/World";
import IChapter from "./IChapter";

class Chapter04 implements IChapter {
  getCamera = (_width: number, _height: number): Camera => {
    throw new Error("Chapter doesn't use a camera");
  };

  getWorld = (): World => {
    throw new Error("Chapter doesn't use a world");
  };

  run = (): void => {
    const canvasSize = 201;
    const numSegments = 12;
    const scale = (canvasSize * 3) / 8;

    const canvas = new Canvas(canvasSize, canvasSize);

    // Canvas orientation is in the x-z plane.
    // Start at 12 o'clock.
    const point = new Point(0, 0, 1);
    for (let i = 0; i < numSegments; i++) {
      const transform = Matrix.getRotationMatrixY((Constants.twoPi * i) / numSegments).scale(scale, scale, scale);
      const p = Point.fromNumberTuple(transform.multiplyByTuple(point));
      canvas.writePixelWithCenteredOrigin(p.x, p.z, Color.white);
    }

    const painter = new CanvasPainter("canvas4", canvasSize, canvasSize);
    painter.paint(canvas);
  };
}

export default new Chapter04();
