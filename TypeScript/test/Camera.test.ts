import Camera from "ts/Camera";
import Color from "ts/Color";
import Constants from "ts/Constants";
import Matrix from "ts/Matrix";
import Point from "ts/Point";
import Vector from "ts/Vector";
import World from "ts/World";

describe("Camera", () => {
  it("Constructing a camera", () => {
    const horizontalSize = 160;
    const verticalSize = 120;
    const fieldOfView = Constants.pi_2;

    const camera = new Camera(horizontalSize, verticalSize, fieldOfView);
    expect(camera.horizontalSize).toBe(horizontalSize);
    expect(camera.verticalSize).toBe(verticalSize);
    expect(camera.fieldOfView).toBe(fieldOfView);
    expect(camera.transform.compare(Matrix.getIdentityMatrix(4))).toBe(true);
  });

  it("The pixel size for a horizontal canvas", () => {
    const camera = new Camera(200, 125, Constants.pi_2);
    expect(camera.pixelSize.compare(0.01)).toBe(true);
  });

  it("The pixel size for a vertical canvas", () => {
    const camera = new Camera(125, 200, Constants.pi_2);
    expect(camera.pixelSize.compare(0.01)).toBe(true);
  });

  it("Constructing a ray through the center of the canvas", () => {
    const camera = new Camera(201, 101, Constants.pi_2);
    const ray = camera.getRayForPixel(100, 50);

    expect(ray.origin.compare(Point.origin)).toBe(true);
    expect(ray.direction.compare(new Vector(0, 0, -1))).toBe(true);
  });

  it("Constructing a ray through a corner of the canvas", () => {
    const camera = new Camera(201, 101, Constants.pi_2);
    const ray = camera.getRayForPixel(0, 0);

    expect(ray.origin.compare(Point.origin)).toBe(true);
    expect(ray.direction.compare(new Vector(0.66519, 0.33259, -0.66851))).toBe(true);
  });

  it("Constructing a ray through the center of the canvas", () => {
    const camera = new Camera(201, 101, Constants.pi_2);
    const ray = camera.getRayForPixel(100, 50);

    expect(ray.origin.compare(Point.origin)).toBe(true);
    expect(ray.direction.compare(new Vector(0, 0, -1))).toBe(true);
  });

  it("Rendering a world with a camera", () => {
    const from = new Point(0, 0, -5);
    const to = Point.origin;
    const up = new Vector(0, 1, 0);
    const transform = Matrix.getViewTransformationMatrix(from, to, up);
    const camera = new Camera(11, 11, Constants.pi_2, transform);

    const world = World.getDefaultWorld();
    const canvas = camera.render(world);

    expect(canvas.get(5, 5).compare(new Color(0.38066, 0.47583, 0.2855))).toBe(true);
  });
});
