import Canvas from "./Canvas";
import Color from "./Color";

export default class CanvasPainter {
  private _id: string;

  private _canvasElement?: HTMLCanvasElement;
  private _context?: CanvasRenderingContext2D;

  constructor(id: string, width = 500, height = 500) {
    this._id = id;
    this.canvasElement.width = width;
    this.canvasElement.height = height;
  }

  get canvasElement(): HTMLCanvasElement {
    if (this._canvasElement) {
      return this._canvasElement;
    }

    this._canvasElement = <HTMLCanvasElement>document.getElementById(this._id);
    if (!this._canvasElement) {
      throw new Error("Can't find canvas.");
    }

    return this._canvasElement;
  }

  get context(): CanvasRenderingContext2D {
    if (this._context) {
      return this._context;
    }

    const context = this.canvasElement.getContext && this.canvasElement.getContext("2d");
    if (!context) {
      throw new Error("Can't get canvas context");
    }

    this._context = context;
    return this._context;
  }

  paint = (canvas: Canvas): void => {
    const imageData = this.context.createImageData(this.canvasElement.width, this.canvasElement.height);

    let index = 0;
    for (let r = 0; r < canvas.height; r++) {
      for (let c = 0; c < canvas.width; c++) {
        imageData.data[index++] = Math.round(255 * canvas.get(c, r).red);
        imageData.data[index++] = Math.round(255 * canvas.get(c, r).green);
        imageData.data[index++] = Math.round(255 * canvas.get(c, r).blue);
        imageData.data[index++] = Math.round(255);
      }
    }

    this.context.putImageData(imageData, 0, 0);
  };

  paintPixel = (x: number, y: number, color: Color): void => {
    this.context.fillStyle = color.hex;
    this.context.fillRect(x, y, 1, 1);
  };
}
