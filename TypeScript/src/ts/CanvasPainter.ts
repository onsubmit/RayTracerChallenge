import Canvas from "./Canvas";

export default class CanvasPainter {
  private id: string;
  private canvas: Canvas;

  constructor(id: string, canvas: Canvas) {
    this.id = id;
    this.canvas = canvas;
  }

  paint = (): void => {
    const canvas = <HTMLCanvasElement>document.getElementById(this.id);
    if (!canvas) {
      throw "Can't find canvas.";
    }

    const ctx = canvas.getContext && canvas.getContext("2d");

    if (!ctx) {
      throw "Can't get canvas context";
    }

    const imageData = ctx.createImageData(canvas.width, canvas.height);

    let index = 0;
    for (let r = 0; r < canvas.height; r++) {
      for (let c = 0; c < canvas.width; c++) {
        imageData.data[index++] = Math.round(255 * this.canvas.at(r, c).red);
        imageData.data[index++] = Math.round(255 * this.canvas.at(r, c).green);
        imageData.data[index++] = Math.round(255 * this.canvas.at(r, c).blue);
        imageData.data[index++] = Math.round(255);
      }
    }

    ctx.putImageData(imageData, canvas.width, canvas.height);
  };
}
